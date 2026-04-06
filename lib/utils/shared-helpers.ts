/**
 * 共通ヘルパー関数
 * 全製品タイプで共有する汎用ユーティリティ
 */

import { execSync } from 'child_process'
import type { Shop, ProductShopLink, FallbackShop, BasePriceLog } from '@/lib/types'

/**
 * 指定ファイルの git 最終コミット日を取得
 * 相場ページ以外の更新日表示に使用（相場ページは毎日更新のため new Date() を使用）
 */
export function getGitDateForFile(filePath: string): { dateStr: string; dateDisplay: string } {
  try {
    const result = execSync(`git log -1 --format=%aI -- "${filePath}"`, { encoding: 'utf-8' }).trim()
    if (result) {
      const date = new Date(result)
      const dateStr = date.toISOString().split('T')[0]
      const dateDisplay = date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
      return { dateStr, dateDisplay }
    }
  } catch {
    // git が利用できない場合はフォールバック
  }
  const today = new Date()
  return {
    dateStr: today.toISOString().split('T')[0],
    dateDisplay: today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }),
  }
}

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

/** プロトコルなしURLに https:// を補完 */
function normalizeUrl(url: string): string {
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
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
    return filteredLinks.map((l) => ({ shop_id: l.shop_id, url: normalizeUrl(l.url), shopName: shopNames[l.shop_id] }))
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

/** ショップ比較テーブル用: null を '-' に変換 */
export function getSymbol(value: string | null): string {
  if (!value) return '-'
  return value
}

/** 3ショップ（イオシス・ゲオ・じゃんぱら）の最安値を取得 */
export function getMinPrice(price: BasePriceLog | null): string {
  if (!price) return '-'
  const mins = [price.iosys_min, price.geo_min, price.janpara_min].filter(
    (v): v is number => v != null && v > 0
  )
  if (mins.length === 0) return '-'
  return formatPrice(Math.min(...mins))
}

/** 直近3ヶ月分のログを抽出（任意のPriceLog型に対応） */
export function filterLast3Months<T extends { logged_at: string }>(logs: T[]): T[] {
  if (logs.length === 0) return []
  const now = new Date()
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
  const cutoff = threeMonthsAgo.toISOString().substring(0, 10)
  return logs.filter(l => l.logged_at >= cutoff)
}

/** 年間コスト計算 */
export function calculateAnnualCost(
  avgPrice: number | null,
  remainingOSYears: number
): number | null {
  if (!avgPrice || remainingOSYears <= 0 || avgPrice <= 0) return null
  return Math.round(avgPrice / remainingOSYears)
}

// ---------- JSON-LD 生成 ----------

export function buildBreadcrumbJsonLd(items: { name: string; item?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      ...(entry.item ? { item: entry.item } : {}),
    })),
  }
}

export function buildArticleJsonLd(opts: {
  headline: string
  description: string
  dateStr: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.dateStr,
    dateModified: opts.dateStr,
    author: {
      '@type': 'Person',
      name: 'タカヒロ',
      url: 'https://used-lab.jp/profile/',
      sameAs: [
        'https://twitter.com/takahiro_mono',
        'https://www.instagram.com/takahiro_mono',
        'https://www.youtube.com/@takahiro_mono',
        'https://digital-style.jp/',
        'https://nightscape.tokyo/',
      ],
    },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
  }
}

export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
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
export function calculateOSLifespan(date: string | null, supportYears: number = 7, lastOs: string | null = null): {
  releaseYear: number
  osEndYear: number
  remainingYears: number
  isSupported: boolean
} {
  const releaseYear = getReleaseYear(date)
  if (releaseYear === 0) {
    return { releaseYear: 0, osEndYear: 0, remainingYears: 0, isSupported: false }
  }
  // lastOsが設定されていればサポート終了確定
  if (lastOs) {
    const osEndYear = releaseYear + supportYears
    return { releaseYear, osEndYear, remainingYears: 0, isSupported: false }
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
