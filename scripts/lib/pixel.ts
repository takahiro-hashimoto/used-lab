// ============================================
// Pixel 価格取得
// ============================================

import { getSupabase } from './supabase-client'
import { RAKUTEN_SHOPS, GENRE_SMARTPHONE } from './config'
import { searchAndMatch } from './rakuten-api'
import { extractMinCapacity, getTodayJST, getNowISOJST, isExcludedCondition, type PriceResult } from './utils'

/** 比較用に正規化（小文字・空白/ハイフン除去） */
function norm(s: string): string {
  return s.toLowerCase().replace(/[\s\-‐―ー]/g, '')
}

/** モデル名 → マッチング用キー（"Google Pixel 9 Pro XL" → "pixel9proxl"） */
function modelKey(modelName: string): string {
  return norm(modelName.replace(/google/i, ''))
}

/**
 * 楽天の商品名が対象モデルと厳密一致するか。
 * Pixel の派生は 無印 / Pro / Pro XL / a の4系統。
 * 例: "pixel9" は "pixel9pro" / "pixel9proxl" / "pixel9a" を誤マッチしない。
 */
function isExactPixelModelMatch(itemName: string, modelName: string): boolean {
  const n = norm(itemName)
  if (isExcludedCondition(itemName)) return false

  const m = modelKey(modelName)
  const idx = n.indexOf(m)
  if (idx === -1) return false

  const after = n.slice(idx + m.length)

  if (m.endsWith('proxl')) {
    return true
  }
  if (m.endsWith('pro')) {
    // "9 Pro" が "9 Pro XL" を拾わないように
    if (after.startsWith('xl')) return false
    return true
  }
  if (m.endsWith('a')) {
    // aシリーズ（pixel6a 等）はキーに 'a' を含むので基本OK
    return true
  }
  // 無印: 直後が 'a' / 'pro' なら別モデル
  if (after.startsWith('a') || after.startsWith('pro')) return false
  return true
}

/** 無印/Pro を絞るためのサーバー側 NGKeyword（'a' は誤爆リスクが高いので matchFn に委ねる） */
function getPixelNgKeyword(modelName: string): string | null {
  const m = modelKey(modelName)
  if (m.endsWith('proxl')) return null
  if (m.endsWith('pro')) return 'XL'
  if (m.endsWith('a')) return 'Pro'
  return 'Pro' // 無印: Pro系を除外（aは matchFn で除外）
}

export async function fetchPixelPrices(): Promise<void> {
  console.log('\n📱 ========== Pixel 価格取得開始 ==========')

  const supabase = getSupabase()

  const { data: models, error } = await supabase
    .from('pixel_models')
    .select('id, model, strage')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (error || !models) {
    console.error('Pixel モデル取得失敗:', error)
    return
  }

  console.log(`  対象モデル: ${models.length}件`)

  for (const model of models) {
    const modelName: string = model.model
    const minCapacity = extractMinCapacity(model.strage)
    // "Google " を除いた no-space + 容量（例: "Pixel9ProXL 128GB"）
    const searchModelName = modelName.replace(/google/i, '').replace(/\s+/g, '')
    const searchKeyword = minCapacity ? `${searchModelName} ${minCapacity}` : searchModelName
    const ngKeyword = getPixelNgKeyword(modelName)

    console.log(`\n🚀 ${modelName} (${minCapacity || '-'})`)

    const prices: Record<string, PriceResult> = {}

    for (const shop of RAKUTEN_SHOPS) {
      const result = await searchAndMatch({
        shopCode: shop.code,
        shopName: shop.name,
        keyword: searchKeyword,
        genreId: GENRE_SMARTPHONE,
        ngKeyword,
        matchFn: (itemName) => isExactPixelModelMatch(itemName, modelName),
      })
      prices[shop.key] = result
    }

    // 当日(JST)の既存データを削除（最新を優先）
    const todayJST = getTodayJST()
    await supabase
      .from('pixel_price_logs')
      .delete()
      .eq('model_id', model.id)
      .gte('logged_at', `${todayJST}T00:00:00+09:00`)
      .lte('logged_at', `${todayJST}T23:59:59+09:00`)

    const { error: insertError } = await supabase.from('pixel_price_logs').insert({
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

  console.log('\n📱 ========== Pixel 価格取得完了 ==========')
}
