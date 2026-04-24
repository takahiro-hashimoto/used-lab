// ============================================
// iPad model_id 修正スクリプト v2
// ============================================
// model_name を基にして正しい model_id を再マッピング
// 使い方: npx tsx scripts/fix-ipad-model-ids-v2.ts

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  console.log('🔧 iPad model_id 修正 v2 開始（model_name ベース）')

  // 1. ipad_models からモデル名→IDのマッピングを構築
  const { data: models, error: modelsErr } = await supabase
    .from('ipad_models')
    .select('id, model')
    .order('id', { ascending: true })

  if (modelsErr || !models) {
    console.error('ipad_models 取得失敗:', modelsErr?.message)
    return
  }

  const nameToId: Record<string, number> = {}
  for (const m of models) {
    nameToId[m.model] = m.id
    console.log(`  ${m.model} → ID ${m.id}`)
  }

  // 2. 全price_logsを取得（1000件制限回避）
  let allLogs: { id: number; model_id: number; model_name: string }[] = []
  let offset = 0
  const LIMIT = 1000
  while (true) {
    const { data, error } = await supabase
      .from('ipad_price_logs')
      .select('id, model_id, model_name')
      .order('id', { ascending: true })
      .range(offset, offset + LIMIT - 1)
    if (error) { console.error(error); break }
    if (!data || data.length === 0) break
    allLogs = allLogs.concat(data)
    if (data.length < LIMIT) break
    offset += LIMIT
  }

  console.log(`\n  総レコード数: ${allLogs.length}`)

  // 3. model_name で正しい model_id を特定し、ずれているものを修正
  const toFix: { id: number; currentModelId: number; correctModelId: number; modelName: string }[] = []

  for (const log of allLogs) {
    const correctId = nameToId[log.model_name]
    if (correctId === undefined) {
      console.warn(`  ⚠️ model_name "${log.model_name}" が ipad_models に見つかりません (log id=${log.id})`)
      continue
    }
    if (log.model_id !== correctId) {
      toFix.push({
        id: log.id,
        currentModelId: log.model_id,
        correctModelId: correctId,
        modelName: log.model_name,
      })
    }
  }

  console.log(`  修正対象: ${toFix.length}件`)

  if (toFix.length === 0) {
    console.log('  修正不要です ✅')
    return
  }

  // 修正内容をサマリー表示
  const summary: Record<string, number> = {}
  for (const f of toFix) {
    const key = `${f.modelName}: ${f.currentModelId} → ${f.correctModelId}`
    summary[key] = (summary[key] || 0) + 1
  }
  console.log('\n  修正内容:')
  for (const [key, count] of Object.entries(summary)) {
    console.log(`    ${key} (${count}件)`)
  }

  // 4. model_name ごとにまとめてUPDATE（効率的）
  const nameGroups = new Map<string, number>()
  for (const f of toFix) {
    nameGroups.set(f.modelName, f.correctModelId)
  }

  let updated = 0
  for (const [modelName, correctId] of nameGroups) {
    const { error: updateError } = await supabase
      .from('ipad_price_logs')
      .update({ model_id: correctId })
      .eq('model_name', modelName)
      .neq('model_id', correctId)

    if (updateError) {
      console.error(`  ❌ UPDATE失敗 (${modelName}):`, updateError.message)
    } else {
      const affected = toFix.filter(f => f.modelName === modelName).length
      updated += affected
      console.log(`  ✅ ${modelName}: model_id → ${correctId} (${affected}件)`)
    }
  }

  console.log(`\n🔧 修正完了: ${updated}件更新`)
}

main().catch((err) => {
  console.error('❌ エラー:', err)
  process.exit(1)
})
