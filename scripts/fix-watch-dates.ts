// ============================================
// Watch price_logs の logged_at 年を修正するスクリプト
// ============================================
// 2024-xx → 2025-xx に修正
// 使い方: npx tsx scripts/fix-watch-dates.ts

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  console.log('🔧 Watch price_logs の logged_at 年修正を開始')

  // 現在のデータの日付分布を確認
  const { data: allLogs, error: fetchError } = await supabase
    .from('watch_price_logs')
    .select('id, logged_at')
    .order('logged_at', { ascending: true })

  if (fetchError || !allLogs) {
    console.error('❌ データ取得失敗:', fetchError?.message)
    return
  }

  console.log(`  全レコード数: ${allLogs.length}`)

  // 日付分布を表示
  const yearMonthCount: Record<string, number> = {}
  for (const log of allLogs) {
    const ym = log.logged_at.substring(0, 7)
    yearMonthCount[ym] = (yearMonthCount[ym] || 0) + 1
  }
  console.log('\n  【修正前】年月ごとのレコード数:')
  for (const [ym, count] of Object.entries(yearMonthCount).sort()) {
    console.log(`    ${ym}: ${count}件`)
  }

  // 2024-xx → 2025-xx に更新
  const updates: { id: number; oldDate: string; newDate: string }[] = []

  for (const log of allLogs) {
    const year = parseInt(log.logged_at.substring(0, 4), 10)

    if (year === 2024) {
      const newDateStr = log.logged_at.replace('2024-', '2025-')
      updates.push({ id: log.id, oldDate: log.logged_at, newDate: newDateStr })
    }
  }

  console.log(`\n  更新対象: ${updates.length}件`)

  if (updates.length === 0) {
    console.log('  ✅ 更新対象なし。すでに正しい日付です。')
    return
  }

  // 更新をバッチで実行
  let updated = 0
  const BATCH_SIZE = 100

  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE)

    for (const item of batch) {
      const { error: updateError } = await supabase
        .from('watch_price_logs')
        .update({ logged_at: item.newDate })
        .eq('id', item.id)

      if (updateError) {
        console.error(`  ❌ ID=${item.id} 更新失敗:`, updateError.message)
      } else {
        updated++
      }
    }

    console.log(`  ✅ ${updated} / ${updates.length} 件更新完了`)
  }

  // 修正後の日付分布を確認
  const { data: afterLogs } = await supabase
    .from('watch_price_logs')
    .select('logged_at')
    .order('logged_at', { ascending: true })

  if (afterLogs) {
    const afterCount: Record<string, number> = {}
    for (const log of afterLogs) {
      const ym = log.logged_at.substring(0, 7)
      afterCount[ym] = (afterCount[ym] || 0) + 1
    }
    console.log('\n  【修正後】年月ごとのレコード数:')
    for (const [ym, count] of Object.entries(afterCount).sort()) {
      console.log(`    ${ym}: ${count}件`)
    }
  }

  console.log(`\n🔧 完了: ${updated}件の logged_at を更新しました`)
}

main().catch((err) => {
  console.error('❌ エラー:', err)
  process.exit(1)
})
