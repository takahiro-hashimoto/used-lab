// ============================================
// Galaxy 価格取得
// ============================================
// 日本の中古出品はキャリア型番（SC-xxx / SCGxx）併記が多いため、
// モデル名に加えて型番でも検索・マッチングしてリコールを上げる。

import { getSupabase } from './supabase-client'
import { RAKUTEN_SHOPS, GENRE_SMARTPHONE } from './config'
import { searchMultiKeywordAndMatch } from './rakuten-api'
import { extractMinCapacity, getTodayJST, getNowISOJST, isExcludedCondition, type PriceResult } from './utils'

/** 比較用に正規化（小文字・空白/ハイフン除去） */
function norm(s: string): string {
  return s.toLowerCase().replace(/[\s\-‐―ー]/g, '')
}

/** モデル名 → マッチ用キー（"Samsung Galaxy A54 5G" → "galaxya54"、末尾5Gは除去） */
function modelKey(modelName: string): string {
  return norm(modelName.replace(/samsung/i, '')).replace(/5g$/, '')
}

/** "SC-52C / SCG14"・"SCG03 (au)" などから型番トークンを抽出 */
function extractModelNumbers(modelNumber: string | null): string[] {
  if (!modelNumber) return []
  const tokens = modelNumber.split(/[\s/／]+/).map((t) => t.trim())
  return tokens.filter((t) => /^(sc-?\w+|scg\w+|sm-?\w+)$/i.test(t))
}

/**
 * 楽天の商品名が対象モデルと厳密一致するか。
 * 判定は「型番トークン一致」または「モデル名一致（派生ガード付き）」。
 * Galaxy の派生: S系（無印/Plus/Ultra/FE）, A系, Z Flip, Z Fold。
 */
/**
 * 商品名の容量が最小構成と一致するか（容量表記が無ければ判定しない）。
 *
 * 検索キーワードに型番（SC-52E など）を使う都合上、容量で絞れない。
 * 型番検索は全容量の在庫を返すため、ここで足切りしないと 512GB や 1TB が
 * 最小構成の相場に混ざる（2026-08-10 に S24 Ultra の最高値が 1TB だった）。
 */
export function capacityMatches(itemName: string, minCapacity: string | null): boolean {
  if (!minCapacity) return true
  const toGB = (t: string) => {
    const m = t.match(/(\d+)\s*(GB|TB)/i)
    if (!m) return 0
    return m[2].toUpperCase() === 'TB' ? parseInt(m[1]) * 1024 : parseInt(m[1])
  }
  const expect = toGB(minCapacity)
  if (!expect) return true
  const found = (itemName.match(/(\d+)\s*(GB|TB)/gi) || [])
    .map(toGB)
    // 64GB未満はメモリ（RAM）の表記。ストレージとみなさない
    .filter((v) => v >= 64)
  if (found.length === 0) return true
  return Math.min(...found) === expect
}

function isExactGalaxyModelMatch(
  itemName: string,
  modelName: string,
  numberTokens: string[],
  minCapacity: string | null = null
): boolean {
  const n = norm(itemName)
  if (isExcludedCondition(itemName)) return false
  if (!capacityMatches(itemName, minCapacity)) return false

  // 型番一致（最も確実）
  for (const t of numberTokens) {
    if (n.includes(norm(t))) return true
  }

  const m = modelKey(modelName)
  const idx = n.indexOf(m)
  if (idx === -1) return false
  const after = n.slice(idx + m.length)

  // Ultra 明示モデル
  if (m.endsWith('ultra')) return true

  // Z Flip / Z Fold / A系はキーに種別と数字を含むので基本OK
  // ただし "Z Fold8" が "Z Fold8 Ultra" を拾わないよう直後の ultra は除外
  if (m.includes('zflip') || m.includes('zfold') || /galaxya\d/.test(m)) {
    if (after.startsWith('ultra')) return false
    return true
  }

  // S系 無印: 直後が ultra/plus/+/fe なら別モデル
  if (after.startsWith('ultra') || after.startsWith('plus') || after.startsWith('+') || after.startsWith('fe')) {
    return false
  }
  return true
}

/** サーバー側 NGKeyword（ノイズ低減。matchFn で最終判定するので補助的） */
function getGalaxyNgKeyword(modelName: string): string | null {
  const m = modelKey(modelName)
  if (m.includes('zflip')) return 'Fold'
  if (m.includes('zfold')) return 'Flip'
  if (m.endsWith('ultra')) return 'Plus FE'
  if (/galaxys\d+$/.test(m)) return 'Ultra Plus FE' // S系無印
  return null
}

export async function fetchGalaxyPrices(): Promise<void> {
  console.log('\n📱 ========== Galaxy 価格取得開始 ==========')

  const supabase = getSupabase()

  const { data: models, error } = await supabase
    .from('galaxy_models')
    .select('id, model, strage, model_number')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (error || !models) {
    console.error('Galaxy モデル取得失敗:', error)
    return
  }

  console.log(`  対象モデル: ${models.length}件`)

  for (const model of models) {
    const modelName: string = model.model
    const minCapacity = extractMinCapacity(model.strage)
    const numberTokens = extractModelNumbers(model.model_number)
    // "Samsung " を除いた no-space（例: "GalaxyS22Ultra"）
    const nameNoSpace = modelName.replace(/samsung/i, '').replace(/\s+/g, '')
    const nameKeyword = minCapacity ? `${nameNoSpace} ${minCapacity}` : nameNoSpace
    // モデル名＋型番トークンを検索キーワードに（型番はキャリア出品で強力）
    const keywords = [nameKeyword, ...numberTokens]
    const ngKeyword = getGalaxyNgKeyword(modelName)

    console.log(`\n🚀 ${modelName} (${minCapacity || '-'}) [${numberTokens.join(', ') || '型番なし'}]`)

    const prices: Record<string, PriceResult> = {}

    for (const shop of RAKUTEN_SHOPS) {
      const result = await searchMultiKeywordAndMatch({
        shopCode: shop.code,
        shopName: shop.name,
        keywords,
        genreId: GENRE_SMARTPHONE,
        ngKeyword,
        matchFn: (itemName) => isExactGalaxyModelMatch(itemName, modelName, numberTokens, minCapacity),
      })
      prices[shop.key] = result
    }

    // 当日(JST)の既存データを削除（最新を優先）
    const todayJST = getTodayJST()
    await supabase
      .from('galaxy_price_logs')
      .delete()
      .eq('model_id', model.id)
      .gte('logged_at', `${todayJST}T00:00:00+09:00`)
      .lte('logged_at', `${todayJST}T23:59:59+09:00`)

    const { error: insertError } = await supabase.from('galaxy_price_logs').insert({
      logged_at: getNowISOJST(),
      model_id: model.id,
      model_name: modelName,
      storage: minCapacity || null,
      iosys_min: prices.iosys.min === '-' ? null : prices.iosys.min,
      iosys_max: prices.iosys.max === '-' ? null : prices.iosys.max,
      iosys_min_text: prices.iosys.minItemName === '-' ? null : prices.iosys.minItemName,
      iosys_max_text: prices.iosys.maxItemName === '-' ? null : prices.iosys.maxItemName,
      geo_min: prices.geo.min === '-' ? null : prices.geo.min,
      geo_max: prices.geo.max === '-' ? null : prices.geo.max,
      geo_min_text: prices.geo.minItemName === '-' ? null : prices.geo.minItemName,
      geo_max_text: prices.geo.maxItemName === '-' ? null : prices.geo.maxItemName,
      janpara_min: prices.janpara.min === '-' ? null : prices.janpara.min,
      janpara_max: prices.janpara.max === '-' ? null : prices.janpara.max,
      janpara_min_text: prices.janpara.minItemName === '-' ? null : prices.janpara.minItemName,
      janpara_max_text: prices.janpara.maxItemName === '-' ? null : prices.janpara.maxItemName,
      // 流通量の目安（適用日以降のみ記録）
      iosys_count: prices.iosys.count,
      geo_count: prices.geo.count,
      janpara_count: prices.janpara.count,
      // 取得した全商品の価格（中央値・分布の算出用。適用日以降のみ記録）
      iosys_prices: prices.iosys.prices,
      geo_prices: prices.geo.prices,
      janpara_prices: prices.janpara.prices,
    })

    if (insertError) {
      console.error(`  ❌ DB INSERT失敗: ${modelName}`, insertError.message)
    } else {
      console.log(`  📤 DB保存完了: ${modelName}`)
    }
  }

  console.log('\n📱 ========== Galaxy 価格取得完了 ==========')
}
