/**
 * 共通ヘルパー関数
 * 全製品タイプで共有する汎用ユーティリティ
 */

import type { Shop, ProductShopLink, FallbackShop } from '@/lib/types'

/**
 * shops テーブルからフォールバック用ショップリンクを生成
 * product_shop_links にデータが無い場合に使用される
 */
export function buildFallbackShops(
  shops: Shop[],
  shopIds: number[],
  urlField: keyof Shop,
): FallbackShop[] {
  return shopIds
    .map((shopId) => {
      const shop = shops.find((s) => s.id === shopId)
      const url = shop?.[urlField]
      if (!shop || typeof url !== 'string' || !url) return null
      return { shop_id: shop.id, url, shopName: shop.shop }
    })
    .filter((item): item is FallbackShop => item != null)
}

/**
 * product_shop_links → displayLinks を生成
 * filteredLinks があればそちらを優先、なければ fallbackShops を使用
 */
export function buildDisplayLinks(
  shopLinks: ProductShopLink[],
  fallbackShops: FallbackShop[],
  shopNames: Record<number, string>,
): FallbackShop[] {
  const filteredLinks = shopLinks.filter((l) => shopNames[l.shop_id])
  if (filteredLinks.length > 0) {
    return filteredLinks.map((l) => ({ shop_id: l.shop_id, url: l.url, shopName: shopNames[l.shop_id] }))
  }
  return fallbackShops.filter((s) => shopNames[s.shop_id])
}

/** リリース日(YYYY/M/DD)から年を取得 */
export function getReleaseYear(date: string | null): number {
  if (!date) return 0
  const year = parseInt(date.split('/')[0], 10)
  return isNaN(year) ? 0 : year
}

/** リリース月を取得 */
export function getReleaseMonth(date: string | null): number {
  if (!date) return 1
  const parts = date.split('/')
  if (parts.length >= 2) {
    const m = parseInt(parts[1], 10)
    return isNaN(m) ? 1 : m
  }
  return 1
}

/** リリース日を "YYYY年M月" にフォーマット */
export function formatReleaseDate(date: string | null): string {
  if (!date) return ''
  const parts = date.split('/')
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

/** 価格を円表記にフォーマット */
export function formatPrice(price: number | null): string {
  if (price == null) return '-'
  return `¥${price.toLocaleString()}`
}

/** 直近3ヶ月分のログを抽出（任意のPriceLog型に対応） */
export function filterLast3Months<T extends { logged_at: string }>(logs: T[]): T[] {
  if (logs.length === 0) return []
  const now = new Date()
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
  const cutoff = threeMonthsAgo.toISOString().substring(0, 10)
  return logs.filter(l => l.logged_at >= cutoff)
}

/** 修理寿命計算（リリース年+9年） */
export function calculateRepairLifespan(date: string | null): {
  releaseYear: number
  repairEndYear: number
  remainingYears: number
  isSupported: boolean
} {
  const releaseYear = getReleaseYear(date)
  if (releaseYear === 0) {
    return { releaseYear: 0, repairEndYear: 0, remainingYears: 0, isSupported: false }
  }
  const repairEndYear = releaseYear + 9
  const currentYear = new Date().getFullYear()
  const remainingYears = repairEndYear - currentYear
  return {
    releaseYear,
    repairEndYear,
    remainingYears: Math.max(0, remainingYears),
    isSupported: remainingYears > 0,
  }
}

/** OS/ファームウェアサポート寿命計算 */
export function calculateOSLifespan(date: string | null, supportYears: number = 7): {
  releaseYear: number
  osEndYear: number
  remainingYears: number
  isSupported: boolean
} {
  const releaseYear = getReleaseYear(date)
  if (releaseYear === 0) {
    return { releaseYear: 0, osEndYear: 0, remainingYears: 0, isSupported: false }
  }
  const osEndYear = releaseYear + supportYears
  const currentYear = new Date().getFullYear()
  const remainingYears = osEndYear - currentYear
  return {
    releaseYear,
    osEndYear,
    remainingYears: Math.max(0, remainingYears),
    isSupported: remainingYears > 0,
  }
}

/**
 * 日毎の価格集計（指定ショップの最安値平均・最高値平均、直近90日）
 * extractPrices: ログから各ショップの min/max 配列を返すコールバック
 */
export function aggregateDailyPrices<T extends { logged_at: string }>(
  logs: T[],
  extractPrices: (log: T) => { mins: (number | null)[]; maxes: (number | null)[] }
): {
  labels: string[]
  avgMin: (number | null)[]
  avgMax: (number | null)[]
} {
  const dayMap = new Map<string, { mins: number[]; maxes: number[] }>()

  for (const log of logs) {
    const day = log.logged_at.substring(0, 10)
    if (!dayMap.has(day)) {
      dayMap.set(day, { mins: [], maxes: [] })
    }
    const bucket = dayMap.get(day)!
    const { mins, maxes } = extractPrices(log)

    const minPrices = mins.filter((v): v is number => v != null && v > 0)
    const maxPrices = maxes.filter((v): v is number => v != null && v > 0)

    if (minPrices.length > 0) {
      bucket.mins.push(Math.round(minPrices.reduce((a, b) => a + b, 0) / minPrices.length / 100) * 100)
    }
    if (maxPrices.length > 0) {
      bucket.maxes.push(Math.round(maxPrices.reduce((a, b) => a + b, 0) / maxPrices.length / 100) * 100)
    }
  }

  const sortedDays = [...dayMap.keys()].sort()
  const recentDays = sortedDays.slice(-90)
  const avg = (arr: number[]) => arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length / 100) * 100 : null

  return {
    labels: recentDays,
    avgMin: recentDays.map(d => avg(dayMap.get(d)!.mins)),
    avgMax: recentDays.map(d => avg(dayMap.get(d)!.maxes)),
  }
}

/**
 * 最新の価格レンジを取得
 * shops: ショップ名とmin/maxの配列
 */
export function calculatePriceRange(
  shops: { name: string; min: number | null; max: number | null }[]
): {
  minPrice: number | null
  maxPrice: number | null
  shops: { name: string; min: number | null; max: number | null }[]
} {
  const allMins = shops.map(s => s.min).filter((v): v is number => v != null)
  const allMaxes = shops.map(s => s.max).filter((v): v is number => v != null)

  return {
    minPrice: allMins.length > 0 ? Math.min(...allMins) : null,
    maxPrice: allMaxes.length > 0 ? Math.max(...allMaxes) : null,
    shops,
  }
}
