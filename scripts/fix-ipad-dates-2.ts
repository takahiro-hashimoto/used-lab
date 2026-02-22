// 2025-02 → 2026-02 に修正するスクリプト
import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function fix() {
  const { data, error } = await supabase
    .from('ipad_price_logs')
    .select('id, logged_at')
    .gte('logged_at', '2025-02-01')
    .lt('logged_at', '2025-03-01')
    .order('logged_at', { ascending: true })

  if (error) {
    console.error('取得失敗:', error.message)
    return
  }
  if (!data || data.length === 0) {
    console.log('2025-02 のレコードなし。完了。')
    return
  }

  console.log(`2025-02 のレコード: ${data.length}件`)
  console.log(`サンプル: ${data[0].logged_at}`)

  let updated = 0
  for (const row of data) {
    const newDate = row.logged_at.replace('2025-02', '2026-02')
    const { error: upErr } = await supabase
      .from('ipad_price_logs')
      .update({ logged_at: newDate })
      .eq('id', row.id)
    if (upErr) {
      console.error(`更新失敗 id=${row.id}:`, upErr.message)
    } else {
      updated++
    }
  }
  console.log(`✅ ${updated}件を 2026-02 に更新`)

  // 最終確認
  const { data: all } = await supabase
    .from('ipad_price_logs')
    .select('logged_at')

  const ymCount: Record<string, number> = {}
  for (const row of all ?? []) {
    const ym = row.logged_at.substring(0, 7)
    ymCount[ym] = (ymCount[ym] || 0) + 1
  }
  console.log('\n最終日付分布:')
  for (const [ym, count] of Object.entries(ymCount).sort()) {
    console.log(`  ${ym}: ${count}件`)
  }
}

fix().catch(console.error)
