// ============================================
// 楽天API 共通呼び出しロジック
// ============================================

import {
  env,
  RAKUTEN_API_BASE,
} from './config'
import { sleep, EMPTY_RESULT, fetchJsonWithRetry, type PriceResult } from './utils'

export interface RakutenItem {
  itemCode: string
  itemName: string
  itemPrice: number
  availability: number
}

/** 楽天商品検索APIのレスポンス（利用している項目のみ） */
export interface RakutenSearchResponse {
  Items?: { Item: RakutenItem }[]
  count?: number
  error?: string
  error_description?: string
}

interface RakutenSearchParams {
  shopCode: string
  keyword: string
  genreId?: string
  ngKeyword?: string | null
  page?: number
}

/** 楽天APIを1回呼び出して結果を返す */
async function callRakutenApi(params: RakutenSearchParams): Promise<{
  items: RakutenItem[]
  count: number
}> {
  const { shopCode, keyword, genreId, ngKeyword, page = 1 } = params
  const e = env()

  const url = new URL(RAKUTEN_API_BASE)
  url.searchParams.set('applicationId', e.RAKUTEN_APP_ID)
  url.searchParams.set('accessKey', e.RAKUTEN_ACCESS_KEY) // 2026年刷新で必須
  url.searchParams.set('affiliateId', e.RAKUTEN_AFFILIATE_ID)
  url.searchParams.set('shopCode', shopCode)
  url.searchParams.set('keyword', keyword)
  url.searchParams.set('hits', '30')
  url.searchParams.set('page', String(page))
  url.searchParams.set('sort', '+itemPrice')
  if (genreId) url.searchParams.set('genreId', genreId)
  if (ngKeyword) url.searchParams.set('NGKeyword', ngKeyword)

  // 新APIは登録ドメインからのアクセスを想定。Origin/Refererヘッダーが無いと403になる
  const json = await fetchJsonWithRetry<RakutenSearchResponse>(
    url.toString(),
    { Origin: e.RAKUTEN_ORIGIN, Referer: e.RAKUTEN_ORIGIN },
    `shop=${shopCode} kw="${keyword}"`
  )
  if (json == null) return { items: [], count: 0 }

  if (json.error) {
    console.error(`  ⚠️ 楽天APIエラー応答: ${json.error} ${json.error_description ?? ''} shop=${shopCode} kw="${keyword}"`)
    return { items: [], count: 0 }
  }
  if (!json.Items || json.Items.length === 0) {
    return { items: [], count: 0 }
  }

  const items: RakutenItem[] = json.Items.map((itemData) => itemData.Item)
  return { items, count: json.count ?? 0 }
}

/**
 * 楽天APIで複数ページ検索し、マッチング関数で絞り込んだ結果から最安・最高値を返す
 * 単一キーワード版
 */
export async function searchAndMatch(params: {
  shopCode: string
  shopName: string
  keyword: string
  genreId?: string
  ngKeyword?: string | null
  maxPages?: number
  matchFn: (itemName: string) => boolean
}): Promise<PriceResult> {
  const { shopCode, shopName, keyword, genreId, ngKeyword, maxPages = 4, matchFn } = params

  const matchedItems: RakutenItem[] = []
  const itemCodeSet = new Set<string>()

  for (let page = 1; page <= maxPages; page++) {
    await sleep(1100)

    const { items, count } = await callRakutenApi({
      shopCode,
      keyword,
      genreId,
      ngKeyword,
      page,
    })

    if (items.length === 0) break

    for (const item of items) {
      if (!itemCodeSet.has(item.itemCode) && matchFn(item.itemName)) {
        matchedItems.push(item)
        itemCodeSet.add(item.itemCode)
      }
    }

    if (count <= page * 30) break
  }

  return pickMinMax(matchedItems, shopName)
}

/**
 * 楽天APIで複数キーワード × 複数ページ検索し、マッチング関数で絞り込む
 * 複数キーワード版（Watch, AirPods用）
 */
export async function searchMultiKeywordAndMatch(params: {
  shopCode: string
  shopName: string
  keywords: string[]
  genreId?: string
  ngKeyword?: string | null
  maxPages?: number
  matchFn: (itemName: string) => boolean
}): Promise<PriceResult> {
  const { shopCode, shopName, keywords, genreId, ngKeyword, maxPages = 4, matchFn } = params

  const matchedItems: RakutenItem[] = []
  const itemCodeSet = new Set<string>()

  for (const keyword of keywords) {
    for (let page = 1; page <= maxPages; page++) {
      await sleep(1100)

      const { items, count } = await callRakutenApi({
        shopCode,
        keyword,
        genreId,
        ngKeyword,
        page,
      })

      if (items.length === 0) break

      for (const item of items) {
        if (!itemCodeSet.has(item.itemCode) && matchFn(item.itemName)) {
          matchedItems.push(item)
          itemCodeSet.add(item.itemCode)
        }
      }

      if (count <= page * 30) break
    }
  }

  return pickMinMax(matchedItems, shopName)
}

/**
 * iPad用: 複数戦略(世代/CPU/年)で検索し、マッチした結果を返す
 */
export async function searchWithStrategies(params: {
  shopCode: string
  shopName: string
  strategies: { type: string; keyword: string }[]
  genreId?: string
  getNgKeyword: (strategyType: string) => string | null
  maxPages?: number
  matchFn: (itemName: string) => boolean
}): Promise<PriceResult> {
  const { shopCode, shopName, strategies, genreId, getNgKeyword, maxPages = 4, matchFn } = params

  const matchedItems: RakutenItem[] = []
  const itemCodeSet = new Set<string>()

  for (const strategy of strategies) {
    const ngKeyword = getNgKeyword(strategy.type)

    for (let page = 1; page <= maxPages; page++) {
      await sleep(1100)

      const { items, count } = await callRakutenApi({
        shopCode,
        keyword: strategy.keyword,
        genreId,
        ngKeyword,
        page,
      })

      if (items.length === 0) break

      for (const item of items) {
        if (!itemCodeSet.has(item.itemCode) && matchFn(item.itemName)) {
          matchedItems.push(item)
          itemCodeSet.add(item.itemCode)
        }
      }

      if (count <= page * 30) break
    }
  }

  return pickMinMax(matchedItems, shopName)
}

/** マッチした商品から最安・最高値を取得 */
function pickMinMax(matchedItems: RakutenItem[], shopName: string): PriceResult {
  if (matchedItems.length === 0) {
    console.log(`  [${shopName}] 📭 ヒットなし`)
    return EMPTY_RESULT
  }

  const availableItems = matchedItems.filter((i) => i.availability === 1)
  const targetItems = availableItems.length > 0 ? availableItems : matchedItems

  let minItem = targetItems[0]
  let maxItem = targetItems[0]
  for (const item of targetItems) {
    if (item.itemPrice < minItem.itemPrice) minItem = item
    if (item.itemPrice > maxItem.itemPrice) maxItem = item
  }

  console.log(
    `  [${shopName}] ✅ ${targetItems.length}件 MIN:${minItem.itemPrice}円 MAX:${maxItem.itemPrice}円`
  )

  return {
    min: minItem.itemPrice,
    max: maxItem.itemPrice,
    minItemName: minItem.itemName,
    maxItemName: maxItem.itemName,
    // 相場算出に使った件数＝そのショップの流通量の目安として保存する
    count: targetItems.length,
  }
}
