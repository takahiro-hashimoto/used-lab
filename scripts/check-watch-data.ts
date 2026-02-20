import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  const { data: models } = await supabase
    .from('watch_models')
    .select('id, model')
    .order('id', { ascending: true })

  const modelMap: Record<number, string> = {}
  for (const m of models ?? []) modelMap[m.id] = m.model

  let allLogs: { model_id: number; model_name: string; logged_at: string }[] = []
  let offset = 0
  while (true) {
    const { data } = await supabase
      .from('watch_price_logs')
      .select('model_id, model_name, logged_at')
      .order('id', { ascending: true })
      .range(offset, offset + 999)
    if (!data || data.length === 0) break
    allLogs = allLogs.concat(data)
    if (data.length < 1000) break
    offset += 1000
  }

  console.log(`総レコード数: ${allLogs.length}\n`)

  const groups: Record<number, { names: Set<string>; count: number; dates: Set<string> }> = {}
  for (const row of allLogs) {
    if (!groups[row.model_id]) groups[row.model_id] = { names: new Set(), count: 0, dates: new Set() }
    groups[row.model_id].count++
    groups[row.model_id].names.add(row.model_name)
    groups[row.model_id].dates.add(new Date(row.logged_at).toISOString().split('T')[0])
  }

  for (const [id, g] of Object.entries(groups).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    const dbName = modelMap[Number(id)] ?? '(不明)'
    const logNames = [...g.names].join(', ')
    const match = dbName === logNames ? '✅' : '❌'
    console.log(`ID ${id.padStart(2)}: ${dbName.padEnd(22)} | log: ${logNames.padEnd(22)} | ${g.count}件 ${g.dates.size}日分 ${match}`)
  }
}

check().catch(console.error)
