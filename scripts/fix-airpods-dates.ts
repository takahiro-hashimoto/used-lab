// ============================================
// AirPods price_logs の logged_at 年を修正するスクリプト
// ============================================
// 2024-12 → 2025-12, 2025-01 → 2026-01, 2025-02 → 2026-02
// 使い方: npx tsx scripts/fix-airpods-dates.ts

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  console.log('🔧 AirPods price_logs の logged_at 年修正を開始')

  const { data: allLogs, error } = await supabase
    .from('airpods_price_logs')
    .select('id, logged_at')
    .order('logged_at', { ascending: true })

  if (error || !allLogs) {
    console.error('❌ データ取得失敗:', error?.message)
    return
  }

  console.log(`  全レコード数: ${allLogs.length}`)

  // 修正前の分布
  const beforeCount: Record<string, number> = {}
  for (const log of allLogs) {
    const ym = log.logged_at.substring(0, 7)
    beforeCount[ym] = (beforeCount[ym] || 0) + 1
  }
  console.log('\n  【修正前】年月ごとのレコード数:')
  for (const [ym, count] of Object.entries(beforeCount).sort()) {
    console.log(`    ${ym}: ${count}件`)
  }

  // 修正対象を収集
  const updates: { id: number; newDate: string }[] = []

  for (const log of allLogs) {
    const dateStr = log.logged_at.substring(0, 10)
    const year = parseInt(dateStr.substring(0, 4), 10)
    const month = parseInt(dateStr.substring(5, 7), 10)

    let newYear: number | null = null

    if (year === 2024 && month === 12) {
      newYear = 2025
    } else if (year === 2025 && (month === 1 || month === 2)) {
      newYear = 2026
    }

    if (newYear !== null) {
      const newDateStr = log.logged_at.replace(String(year), String(newYear))
      updates.push({ id: log.id, newDate: newDateStr })
    }
  }

  console.log(`\n  更新対象: ${updates.length}件`)

  if (updates.length === 0) {
    console.log('  ✅ 更新対象なし。すでに正しい日付です。')
    return
  }

  // バッチ更新
  let updated = 0
  for (const item of updates) {
    const { error: upErr } = await supabase
      .from('airpods_price_logs')
      .update({ logged_at: item.newDate })
      .eq('id', item.id)

    if (upErr) {
      console.error(`  ❌ ID=${item.id} 更新失敗:`, upErr.message)
    } else {
      updated++
    }

    if (updated % 100 === 0 && updated > 0) {
      console.log(`  ✅ ${updated} / ${updates.length} 件更新完了`)
    }
  }
  console.log(`  ✅ ${updated} / ${updates.length} 件更新完了`)

  // 修正後の分布
  const { data: afterLogs } = await supabase
    .from('airpods_price_logs')
    .select('logged_at')

  const afterCount: Record<string, number> = {}
  for (const log of afterLogs ?? []) {
    const ym = log.logged_at.substring(0, 7)
    afterCount[ym] = (afterCount[ym] || 0) + 1
  }
  console.log('\n  【修正後】年月ごとのレコード数:')
  for (const [ym, count] of Object.entries(afterCount).sort()) {
    console.log(`    ${ym}: ${count}件`)
  }

  console.log(`\n🔧 完了: ${updated}件の logged_at を更新しました`)
}

main().catch((err) => {
  console.error('❌ エラー:', err)
  process.exit(1)
})
