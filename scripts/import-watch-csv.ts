// ============================================
// Watch 過去価格データ CSV インポートスクリプト
// ============================================
// 使い方: npx tsx scripts/import-watch-csv.ts

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

const CSV_PATH = '/Users/takahiro/Downloads/used-lab.jp データベース - watch_log.csv'

// CSVの日付(MM/dd)を TIMESTAMPTZ に変換
// 12月 → 2024年、1月〜 → 2025年
function parseDate(mmdd: string): string {
  const [mm, dd] = mmdd.split('/')
  const month = parseInt(mm, 10)
  const year = month >= 12 ? 2024 : 2025
  return `${year}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}T00:00:00+09:00`
}

// "-" や 空文字を null に変換、数値に変換
function toNum(val: string): number | null {
  if (!val || val.trim() === '' || val.trim() === '-') return null
  const n = parseInt(val.trim(), 10)
  return isNaN(n) ? null : n
}

// テキストを null or string に変換
function toText(val: string): string | null {
  if (!val || val.trim() === '' || val.trim() === '-') return null
  return val.trim()
}

async function main() {
  console.log('📥 Watch 過去データ CSV インポート開始')

  // 1. watch_models から model_name → id のマッピングを構築
  const { data: models, error: modelsErr } = await supabase
    .from('watch_models')
    .select('id, model')
    .order('id', { ascending: true })

  if (modelsErr || !models) {
    console.error('watch_models 取得失敗:', modelsErr?.message)
    return
  }

  const nameToId: Record<string, number> = {}
  for (const m of models) {
    nameToId[m.model] = m.id
  }
  console.log('  モデルマッピング:')
  for (const [name, id] of Object.entries(nameToId)) {
    console.log(`    "${name}" → ID ${id}`)
  }

  // 2. CSV読み込み
  const raw = readFileSync(CSV_PATH, 'utf-8')
  const lines = raw.split('\n').filter((l) => l.trim())
  const dataLines = lines.slice(1) // ヘッダースキップ
  console.log(`  CSV行数: ${dataLines.length}`)

  // 3. 既存データ確認（重複チェック用）
  console.log('  既存データを確認中...')
  let existing: { logged_at: string; model_id: number }[] = []
  let offset = 0
  const LIMIT = 1000
  while (true) {
    const { data, error } = await supabase
      .from('watch_price_logs')
      .select('logged_at, model_id')
      .order('id', { ascending: true })
      .range(offset, offset + LIMIT - 1)
    if (error) { console.error('既存データ取得失敗:', error.message); return }
    if (!data || data.length === 0) break
    existing = existing.concat(data)
    if (data.length < LIMIT) break
    offset += LIMIT
  }

  const existingSet = new Set<string>()
  for (const row of existing) {
    const dateKey = new Date(row.logged_at).toISOString().split('T')[0]
    existingSet.add(`${dateKey}_${row.model_id}`)
  }
  console.log(`  既存レコード: ${existingSet.size}件`)

  // 4. CSVパース → INSERT用データ作成
  const toInsert: Record<string, unknown>[] = []
  const toDeleteKeys = new Set<string>()
  let skippedUnknown = 0

  for (const line of dataLines) {
    const parts = line.split(',')
    const dateStr = parts[0]
    const csvModelId = parseInt(parts[1], 10)
    const modelName = parts[2]
    const storage = parts[3]
    const iosysMin = toNum(parts[4])
    const iosysMax = toNum(parts[5])
    const geoMin = toNum(parts[6])
    const geoMax = toNum(parts[7])
    const janparaMin = toNum(parts[8])
    const janparaMax = toNum(parts[9])
    const iosysMinText = toText(parts[10])
    const iosysMaxText = toText(parts[11])
    const geoMinText = toText(parts[12])
    const geoMaxText = toText(parts[13])
    const janparaMinText = toText(parts[14])
    const janparaMaxText = toText(parts[15])

    if (!dateStr || isNaN(csvModelId)) continue

    // model_name でSupabase IDを取得
    const modelId = nameToId[modelName]
    if (modelId === undefined) {
      skippedUnknown++
      if (skippedUnknown <= 5) {
        console.warn(`  ⚠️ 不明なモデル名: "${modelName}" (CSV ID=${csvModelId})`)
      }
      continue
    }

    const loggedAt = parseDate(dateStr)
    const dateKey = loggedAt.split('T')[0]
    const key = `${dateKey}_${modelId}`

    if (existingSet.has(key)) {
      toDeleteKeys.add(key)
    }

    toInsert.push({
      logged_at: loggedAt,
      model_id: modelId,
      model_name: modelName,
      storage: storage || null,
      iosys_min: iosysMin,
      iosys_max: iosysMax,
      iosys_min_text: iosysMinText,
      iosys_max_text: iosysMaxText,
      geo_min: geoMin,
      geo_max: geoMax,
      geo_min_text: geoMinText,
      geo_max_text: geoMaxText,
      janpara_min: janparaMin,
      janpara_max: janparaMax,
      janpara_min_text: janparaMinText,
      janpara_max_text: janparaMaxText,
    })
  }

  if (skippedUnknown > 0) {
    console.warn(`  ⚠️ 不明モデル名でスキップ: ${skippedUnknown}件`)
  }
  console.log(`  インポート対象: ${toInsert.length}件`)
  console.log(`  重複（上書き）: ${toDeleteKeys.size}件`)

  // 5. 重複分を削除
  if (toDeleteKeys.size > 0) {
    console.log('  重複データを削除中...')
    for (const key of toDeleteKeys) {
      const [dateKey, modelIdStr] = key.split('_')
      const startOfDay = `${dateKey}T00:00:00+09:00`
      const endOfDay = `${dateKey}T23:59:59+09:00`

      const { error: delError } = await supabase
        .from('watch_price_logs')
        .delete()
        .eq('model_id', parseInt(modelIdStr, 10))
        .gte('logged_at', startOfDay)
        .lte('logged_at', endOfDay)

      if (delError) {
        console.error(`  削除エラー: ${key}`, delError.message)
      }
    }
    console.log('  削除完了')
  }

  // 6. バッチ INSERT
  const BATCH_SIZE = 500
  let inserted = 0

  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const batch = toInsert.slice(i, i + BATCH_SIZE)
    const { error: insertError } = await supabase.from('watch_price_logs').insert(batch)

    if (insertError) {
      console.error(`  INSERT エラー (${i}〜${i + batch.length}):`, insertError.message)
    } else {
      inserted += batch.length
      console.log(`  ✅ ${inserted} / ${toInsert.length} 件完了`)
    }
  }

  console.log(`\n📥 インポート完了: ${inserted}件挿入`)
}

main().catch((err) => {
  console.error('❌ エラー:', err)
  process.exit(1)
})
