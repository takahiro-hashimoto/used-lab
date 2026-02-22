// 2025-01 → 2026-01、2025-02 → 2026-02 に修正
import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function fix() {
  // 2025-01 のデータを 2026-01 に更新
  const { data: janData } = await supabase
    .from('watch_price_logs')
    .select('id, logged_at')
    .gte('logged_at', '2025-01-01')
    .lt('logged_at', '2025-02-01')

  console.log(`2025-01 のレコード: ${janData?.length ?? 0}件`)

  let updated = 0
  for (const row of janData ?? []) {
    const newDate = row.logged_at.replace('2025-01', '2026-01')
    const { error } = await supabase
      .from('watch_price_logs')
      .update({ logged_at: newDate })
      .eq('id', row.id)
    if (!error) updated++
  }
  console.log(`✅ ${updated}件を 2026-01 に更新`)

  // 2025-02 のデータを 2026-02 に更新
  const { data: febData } = await supabase
    .from('watch_price_logs')
    .select('id, logged_at')
    .gte('logged_at', '2025-02-01')
    .lt('logged_at', '2025-03-01')

  console.log(`\n2025-02 のレコード: ${febData?.length ?? 0}件`)

  let updated2 = 0
  for (const row of febData ?? []) {
    const newDate = row.logged_at.replace('2025-02', '2026-02')
    const { error } = await supabase
      .from('watch_price_logs')
      .update({ logged_at: newDate })
      .eq('id', row.id)
    if (!error) updated2++
  }
  console.log(`✅ ${updated2}件を 2026-02 に更新`)

  // 最終確認
  const { data: all } = await supabase
    .from('watch_price_logs')
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
