import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  // model_id=1 (iPad 第9世代) のデータを確認
  const { data, error } = await supabase
    .from('ipad_price_logs')
    .select('id, model_id, model_name, logged_at')
    .eq('model_id', 1)
    .order('logged_at', { ascending: true })
    .limit(5)

  console.log('=== iPad 第9世代 (model_id=1) 最初の5件 ===')
  for (const row of data ?? []) {
    console.log(`  id=${row.id} logged_at="${row.logged_at}" model_name="${row.model_name}"`)
  }

  // 最後の5件
  const { data: last } = await supabase
    .from('ipad_price_logs')
    .select('id, model_id, model_name, logged_at')
    .eq('model_id', 1)
    .order('logged_at', { ascending: false })
    .limit(5)

  console.log('\n=== iPad 第9世代 (model_id=1) 最後の5件 ===')
  for (const row of (last ?? []).reverse()) {
    console.log(`  id=${row.id} logged_at="${row.logged_at}" model_name="${row.model_name}"`)
  }

  // filterLast3Months のシミュレーション
  const now = new Date()
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
  const cutoff = threeMonthsAgo.toISOString().substring(0, 10)
  console.log(`\n=== filterLast3Months cutoff: "${cutoff}" (now: ${now.toISOString()}) ===`)

  // 全件のlogged_atを取得
  const { data: allData } = await supabase
    .from('ipad_price_logs')
    .select('logged_at')
    .eq('model_id', 1)
    .order('logged_at', { ascending: true })

  const allDates = (allData ?? []).map(d => d.logged_at)
  const filtered = allDates.filter(la => la >= cutoff)
  console.log(`  全件: ${allDates.length}, filterLast3Months後: ${filtered.length}`)
  if (filtered.length > 0) {
    console.log(`  フィルタ後の最初: "${filtered[0]}"`)
    console.log(`  フィルタ後の最後: "${filtered[filtered.length - 1]}"`)
  }

  // logged_atの文字列比較テスト
  const sample = allDates[0]
  console.log(`\n=== 文字列比較テスト ===`)
  console.log(`  sample logged_at: "${sample}"`)
  console.log(`  cutoff: "${cutoff}"`)
  console.log(`  sample >= cutoff ? ${sample >= cutoff}`)
  console.log(`  sample.substring(0,10): "${sample?.substring(0, 10)}"`)
}

check().catch(console.error)
