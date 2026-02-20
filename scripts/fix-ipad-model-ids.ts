// ============================================
// iPad 過去データの model_id 修正スクリプト
// ============================================
// CSV の model_id → Supabase の model_id にマッピング修正
// 使い方: npx tsx scripts/fix-ipad-model-ids.ts

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

// CSV model_id → Supabase model_id マッピング
const CSV_TO_SUPABASE_ID: Record<number, number> = {
  10: 1,  // iPad 第9世代
  11: 2,  // iPad 第10世代
  12: 3,  // iPad 第11世代
  20: 4,  // iPad mini 第5世代
  21: 5,  // iPad mini 第6世代
  22: 6,  // iPad mini 第7世代
  30: 7,  // iPad Air 第4世代
  31: 8,  // iPad Air 第5世代
  32: 9,  // iPad Air 11 第6世代
  33: 10, // iPad Air 13 第6世代
  34: 11, // iPad Air 11 第7世代
  35: 12, // iPad Air 13 第7世代
  40: 13, // iPad Pro 11 第2世代
  41: 14, // iPad Pro 11 第3世代
  42: 15, // iPad Pro 11 第4世代
  43: 16, // iPad Pro 11 第5世代
  44: 17, // iPad Pro 11 第6世代
  50: 18, // iPad Pro 12.9 第4世代
  51: 19, // iPad Pro 12.9 第5世代
  52: 20, // iPad Pro 12.9 第6世代
  53: 21, // iPad Pro 13 第1世代
  54: 22, // iPad Pro 13 第2世代
}

async function main() {
  console.log('🔧 iPad model_id 修正開始')

  // 現在のデータを確認
  const { data: records, error: fetchError } = await supabase
    .from('ipad_price_logs')
    .select('id, model_id, model_name')

  if (fetchError) {
    console.error('データ取得失敗:', fetchError.message)
    return
  }

  if (!records || records.length === 0) {
    console.log('  修正対象のレコードがありません')
    return
  }

  console.log(`  総レコード数: ${records.length}`)

  // CSVのmodel_id（10, 11, 20, ...）を持つレコードを特定
  const csvModelIds = new Set(Object.keys(CSV_TO_SUPABASE_ID).map(Number))
  const toFix = records.filter((r) => csvModelIds.has(r.model_id))

  console.log(`  修正対象: ${toFix.length}件`)

  if (toFix.length === 0) {
    console.log('  修正不要です')
    return
  }

  // model_id ごとにまとめてUPDATE
  let updated = 0
  for (const [csvIdStr, supabaseId] of Object.entries(CSV_TO_SUPABASE_ID)) {
    const csvId = parseInt(csvIdStr, 10)
    const targetRecords = toFix.filter((r) => r.model_id === csvId)

    if (targetRecords.length === 0) continue

    console.log(`  ${csvId} → ${supabaseId} (${targetRecords[0].model_name}): ${targetRecords.length}件`)

    const { error: updateError } = await supabase
      .from('ipad_price_logs')
      .update({ model_id: supabaseId })
      .eq('model_id', csvId)

    if (updateError) {
      console.error(`  ❌ UPDATE失敗 (${csvId} → ${supabaseId}):`, updateError.message)
    } else {
      updated += targetRecords.length
      console.log(`  ✅ 完了`)
    }
  }

  console.log(`\n🔧 修正完了: ${updated}件更新`)
}

main().catch((err) => {
  console.error('❌ エラー:', err)
  process.exit(1)
})
