// ============================================
// iPad 過去価格データ CSV インポートスクリプト
// ============================================
// 使い方: npx tsx scripts/import-ipad-csv.ts

import { config } from 'dotenv'
config({ path: '.env.local', quiet: true })

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

const CSV_PATH = '/Users/takahiro/Downloads/used-lab.jp データベース - iPad_log.csv'

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
  console.log('📥 iPad 過去データ CSV インポート開始')

  const raw = readFileSync(CSV_PATH, 'utf-8')
  const lines = raw.split('\n').filter((l) => l.trim())

  // ヘッダースキップ
  const dataLines = lines.slice(1)
  console.log(`  CSV行数: ${dataLines.length}`)

  // まず既存データの日付+model_idを取得して重複チェック用Setを作る
  console.log('  既存データを確認中...')
  const { data: existing, error: fetchError } = await supabase
    .from('ipad_price_logs')
    .select('logged_at, model_id')

  if (fetchError) {
    console.error('既存データ取得失敗:', fetchError.message)
    return
  }

  // 既存データの date(YYYY-MM-DD) + model_id のセット
  const existingSet = new Set<string>()
  const existingIds: Record<string, number> = {} // date+model_id → id（削除用には使わないが参考）
  if (existing) {
    for (const row of existing) {
      const dateKey = new Date(row.logged_at).toISOString().split('T')[0]
      const key = `${dateKey}_${row.model_id}`
      existingSet.add(key)
    }
  }
  console.log(`  既存レコード: ${existingSet.size}件`)

  // CSVパース → INSERT用データ作成
  const toInsert: Record<string, unknown>[] = []
  const toDeleteKeys: string[] = [] // 重複分は先に削除してから INSERT

  for (const line of dataLines) {
    // CSVはカンマ区切りだが、商品名にカンマが含まれうるので、先頭10フィールドだけ取得
    const parts = line.split(',')
    const dateStr = parts[0]
    const csvModelId = parseInt(parts[1], 10)
    const modelId = CSV_TO_SUPABASE_ID[csvModelId] ?? csvModelId
    const modelName = parts[2]
    const storage = parts[3]
    const iosysMin = toNum(parts[4])
    const iosysMax = toNum(parts[5])
    const geoMin = toNum(parts[6])
    const geoMax = toNum(parts[7])
    const janparaMin = toNum(parts[8])
    const janparaMax = toNum(parts[9])
    // parts[10]〜[15] はテキスト（商品名）
    const iosysMinText = toText(parts[10])
    const iosysMaxText = toText(parts[11])
    const geoMinText = toText(parts[12])
    const geoMaxText = toText(parts[13])
    const janparaMinText = toText(parts[14])
    const janparaMaxText = toText(parts[15])

    if (!dateStr || isNaN(modelId)) continue

    const loggedAt = parseDate(dateStr)
    const dateKey = loggedAt.split('T')[0]
    const key = `${dateKey}_${modelId}`

    if (existingSet.has(key)) {
      toDeleteKeys.push(key)
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

  console.log(`  インポート対象: ${toInsert.length}件`)
  console.log(`  重複（上書き）: ${toDeleteKeys.length}件`)

  // 重複分を削除
  if (toDeleteKeys.length > 0) {
    console.log('  重複データを削除中...')
    // 重複分をまとめて削除：date + model_id の組み合わせで
    for (const key of new Set(toDeleteKeys)) {
      const [dateKey, modelIdStr] = key.split('_')
      const startOfDay = `${dateKey}T00:00:00+09:00`
      const endOfDay = `${dateKey}T23:59:59+09:00`

      const { error: delError } = await supabase
        .from('ipad_price_logs')
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

  // バッチ INSERT（Supabase は 1000件ずつが推奨）
  const BATCH_SIZE = 500
  let inserted = 0

  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const batch = toInsert.slice(i, i + BATCH_SIZE)
    const { error: insertError } = await supabase.from('ipad_price_logs').insert(batch)

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
