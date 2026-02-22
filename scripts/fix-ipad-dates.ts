// ============================================
// iPad price_logs の logged_at 年を修正するスクリプト
// ============================================
// CSVインポート時に年が1年ずれていた:
//   2024-12-xx → 正しくは 2025-12-xx
//   2025-01-xx → 正しくは 2026-01-xx
//   2025-02-xx → 正しくは 2026-02-xx
//
// 使い方: npx tsx scripts/fix-ipad-dates.ts

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  console.log('🔧 iPad price_logs の logged_at 年修正を開始')

  // まず現在のデータの日付分布を確認
  const { data: allLogs, error: fetchError } = await supabase
    .from('ipad_price_logs')
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

  // 2024-12-xx のレコードを 2025-12-xx に更新
  // 2025-01-xx のレコードを 2026-01-xx に更新
  // 2025-02-xx のレコードを 2026-02-xx に更新
  // ただし 2026-02-xx はすでに正しい可能性があるのでスキップ

  const updates: { id: number; oldDate: string; newDate: string }[] = []

  for (const log of allLogs) {
    const dateStr = log.logged_at.substring(0, 10) // YYYY-MM-DD
    const year = parseInt(dateStr.substring(0, 4), 10)
    const month = parseInt(dateStr.substring(5, 7), 10)

    let newYear: number | null = null

    if (year === 2024 && month === 12) {
      // 2024-12 → 2025-12
      newYear = 2025
    } else if (year === 2025 && (month === 1 || month === 2)) {
      // 2025-01, 2025-02 → 2026-01, 2026-02
      newYear = 2026
    }

    if (newYear !== null) {
      const newDateStr = log.logged_at.replace(
        dateStr.substring(0, 4),
        String(newYear)
      )
      updates.push({ id: log.id, oldDate: log.logged_at, newDate: newDateStr })
    }
  }

  console.log(`\n  更新対象: ${updates.length}件`)

  if (updates.length === 0) {
    console.log('  ✅ 更新対象なし。すでに正しい日付です。')
    return
  }

  // 更新をバッチで実行
  const BATCH_SIZE = 100
  let updated = 0

  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE)

    for (const item of batch) {
      const { error: updateError } = await supabase
        .from('ipad_price_logs')
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
    .from('ipad_price_logs')
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
