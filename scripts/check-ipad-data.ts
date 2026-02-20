import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  // ipad_modelsのID・名前一覧
  const { data: models } = await supabase
    .from('ipad_models')
    .select('id, model')
    .order('id', { ascending: true })

  console.log('=== ipad_models 一覧 ===')
  const modelMap: Record<number, string> = {}
  for (const m of models ?? []) {
    modelMap[m.id] = m.model
    console.log(`  ID ${m.id}: ${m.model}`)
  }

  // price_logsの全データ（1000件制限回避）
  let allLogs: { model_id: number; model_name: string; logged_at: string }[] = []
  let offset = 0
  const LIMIT = 1000
  while (true) {
    const { data, error } = await supabase
      .from('ipad_price_logs')
      .select('model_id, model_name, logged_at')
      .order('id', { ascending: true })
      .range(offset, offset + LIMIT - 1)
    if (error) { console.error(error); break }
    if (!data || data.length === 0) break
    allLogs = allLogs.concat(data)
    if (data.length < LIMIT) break
    offset += LIMIT
  }

  console.log(`\n=== ipad_price_logs 総レコード数: ${allLogs.length} ===\n`)

  // model_idごとに集計
  const groups: Record<number, { names: Set<string>; count: number; dates: Set<string> }> = {}
  for (const row of allLogs) {
    if (!groups[row.model_id]) {
      groups[row.model_id] = { names: new Set(), count: 0, dates: new Set() }
    }
    groups[row.model_id].count++
    groups[row.model_id].names.add(row.model_name)
    const d = new Date(row.logged_at).toISOString().split('T')[0]
    groups[row.model_id].dates.add(d)
  }

  console.log('model_id | DB上のモデル名 | log内のmodel_name | レコード数 | 日数')
  console.log('---------|---------------|-------------------|-----------|-----')
  for (const [id, g] of Object.entries(groups).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    const dbName = modelMap[Number(id)] ?? '(不明)'
    const logNames = [...g.names].join(', ')
    const match = dbName === logNames ? '✅' : '❌ ミスマッチ'
    console.log(`${id.padStart(3)} | ${dbName.padEnd(20)} | ${logNames.padEnd(20)} | ${String(g.count).padStart(4)}件 | ${g.dates.size}日分 ${match}`)
  }
}

check().catch(console.error)
