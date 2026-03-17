// ============================================
// iPhone 価格取得
// ============================================

import { getSupabase } from './supabase-client'
import { RAKUTEN_SHOPS, GENRE_SMARTPHONE } from './config'
import { searchAndMatch } from './rakuten-api'
import { extractMinCapacity, getTodayJST, getNowISOJST, type PriceResult } from './utils'

// NGキーワードマッピング
const IPHONE_NG_KEYWORD_MAP: Record<string, string> = {
  'iPhone17': 'Pro Plus Max Air',
  'iPhone17 Pro': 'Max Plus Air',
  'iPhone17 Pro Max': 'Plus Air',
  'iPhone Air': 'Pro Max Plus 17',
  'iPhone 16': 'Pro Plus 16e Max',
  'iPhone 16 Plus': 'Pro 16e Max',
  'iPhone 16 Pro': 'Max 16e Plus',
  'iPhone 16 Pro Max': '16e Plus',
  'iPhone 16e': 'Pro Plus Max',
  'iPhone 15': 'Pro Plus Max',
  'iPhone 15 Plus': 'Pro Max',
  'iPhone 15 Pro': 'Max Plus',
  'iPhone 15 Pro Max': 'Plus',
  'iPhone 14': 'Pro Plus Max',
  'iPhone 14 Plus': 'Pro Max',
  'iPhone 14 Pro': 'Max Plus',
  'iPhone 14 Pro Max': 'Plus',
  'iPhone 13': 'Pro mini Max',
  'iPhone 13 mini': 'Pro Max',
  'iPhone 13 Pro': 'Max mini',
  'iPhone 13 Pro Max': 'mini',
  'iPhone 12': 'Pro mini Max',
  'iPhone 12 mini': 'Pro Max',
  'iPhone 12 Pro': 'Max mini',
  'iPhone 12 Pro Max': 'mini',
  'iPhone 11': 'Pro Max',
  'iPhone 11 Pro': 'Max',
  'iPhone 11 Pro Max': '',
  'iPhone SE 第3世代': '',
  'iPhone SE 第2世代': '',
  'iPhone XS': 'Max',
  'iPhone XS Max': '',
  'iPhone XR': '',
  'iPhone X': 'XS XR',
}

function getIphoneNgKeyword(modelName: string): string | null {
  if (IPHONE_NG_KEYWORD_MAP.hasOwnProperty(modelName)) {
    return IPHONE_NG_KEYWORD_MAP[modelName] || null
  }
  const normalizedModel = modelName.toLowerCase().replace(/\s+/g, '')
  for (const key in IPHONE_NG_KEYWORD_MAP) {
    if (key.toLowerCase().replace(/\s+/g, '') === normalizedModel) {
      return IPHONE_NG_KEYWORD_MAP[key] || null
    }
  }
  return null
}

function isExactIphoneModelMatch(itemName: string, modelName: string): boolean {
  const nItem = itemName.toLowerCase().replace(/\s+/g, '')
  const nModel = modelName.toLowerCase().replace(/\s+/g, '')
  const excludePatterns = ['mini', 'pro', 'max', 'plus', 'air']

  // 未使用を含む場合は除外
  if (nItem.includes('未使用')) return false

  // SE判定
  if (nModel.includes('se')) {
    const modelGenMatch = nModel.match(/se第(\d)世代/)
    if (modelGenMatch) {
      const modelGen = modelGenMatch[1]
      const itemGenMatch = nItem.match(/第(\d)世代/) || nItem.match(/se(\d)[^0-9]/)
      if (itemGenMatch) return itemGenMatch[1] === modelGen && nItem.includes('iphonese')
      return false
    }
  }

  // 16e対策
  const modelNumMatch = nModel.match(/iphone(\d+)$/)
  if (modelNumMatch && nItem.includes(`iphone${modelNumMatch[1]}e`)) return false
  if (nModel.match(/iphone\d+e$/)) return nItem.includes(nModel)

  // Pro（Pro Max以外）の場合、Pro Maxを除外
  if (nModel.includes('pro') && !nModel.includes('max')) {
    if (nItem.includes('promax') || nItem.includes('pro max')) return false
  }

  // Plus以外の場合、Plusを除外
  if (!nModel.includes('plus')) {
    if (nItem.includes('plus')) return false
  }

  // mini以外の場合、miniを除外
  if (!nModel.includes('mini')) {
    if (nItem.includes('mini')) return false
  }

  // 通常マッチング
  if (excludePatterns.some((p) => nModel.includes(p))) {
    return nItem.includes(nModel)
  } else {
    if (!nItem.includes(nModel)) return false
    const modelIndex = nItem.indexOf(nModel)
    const afterModel = nItem.substring(modelIndex + nModel.length)
    for (const pattern of excludePatterns) {
      if (afterModel.startsWith(pattern)) return false
    }
    return true
  }
}

export async function fetchIphonePrices(): Promise<void> {
  console.log('\n📱 ========== iPhone 価格取得開始 ==========')

  const supabase = getSupabase()

  const { data: models, error } = await supabase
    .from('iphone_models')
    .select('id, model, strage')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (error || !models) {
    console.error('iPhone モデル取得失敗:', error)
    return
  }

  console.log(`  対象モデル: ${models.length}件`)

  for (const model of models) {
    const modelName: string = model.model
    const minCapacity = extractMinCapacity(model.strage)
    const searchModelName = modelName.replace(/\s+/g, '')
    const searchKeyword = minCapacity ? `${searchModelName} ${minCapacity}` : searchModelName
    const ngKeyword = getIphoneNgKeyword(modelName)

    console.log(`\n🚀 ${modelName} (${minCapacity || '-'})`)

    const prices: Record<string, PriceResult> = {}

    for (const shop of RAKUTEN_SHOPS) {
      const result = await searchAndMatch({
        shopCode: shop.code,
        shopName: shop.name,
        keyword: searchKeyword,
        genreId: GENRE_SMARTPHONE,
        ngKeyword,
        matchFn: (itemName) => isExactIphoneModelMatch(itemName, modelName),
      })
      prices[shop.key] = result
    }

    // 当日(JST)の既存データを削除（最新を優先）
    const todayJST = getTodayJST()
    await supabase
      .from('iphone_price_logs')
      .delete()
      .eq('model_id', model.id)
      .gte('logged_at', `${todayJST}T00:00:00+09:00`)
      .lte('logged_at', `${todayJST}T23:59:59+09:00`)

    const { error: insertError } = await supabase.from('iphone_price_logs').insert({
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
    })

    if (insertError) {
      console.error(`  ❌ DB INSERT失敗: ${modelName}`, insertError.message)
    } else {
      console.log(`  📤 DB保存完了: ${modelName}`)
    }
  }

  console.log('\n📱 ========== iPhone 価格取得完了 ==========')
}
