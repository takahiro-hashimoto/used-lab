/**
 * 共通ヘルパー関数
 * 全製品タイプで共有する汎用ユーティリティ
 */

import type { Shop, ProductShopLink, FallbackShop, BasePriceLog } from '@/lib/types'
import { PAGE_DATES } from '@/lib/data/page-dates'
import { getHeroImage } from '@/lib/data/hero-images'
import { calculatePriceStats, type PriceStats } from '@/lib/utils/price-stats'

const SITE_LAUNCH_DATE = '2024-08-01'
const JAPAN_LOCALE = 'ja-JP'
const JAPAN_TIME_ZONE = 'Asia/Tokyo'

function parseJstDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00+09:00`)
}

export function formatDateDisplay(dateStr: string): string {
  return parseJstDate(dateStr).toLocaleDateString(JAPAN_LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: JAPAN_TIME_ZONE,
  })
}

export function formatDateSlash(dateStr: string): string {
  return parseJstDate(dateStr).toLocaleDateString(JAPAN_LOCALE, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: JAPAN_TIME_ZONE,
  })
}

export function resolveLastUpdatedDate(options: {
  preferredDateStr?: string | null
  fallbackFilePath: string
}): { dateStr: string; dateDisplay: string } {
  const fallback = getGitDateForFile(options.fallbackFilePath)
  const dateStr = options.preferredDateStr ?? fallback.dateStr
  return {
    dateStr,
    dateDisplay: formatDateDisplay(dateStr),
  }
}

/**
 * 静的ページの最終更新日を返す。
 * lib/data/page-dates.ts に登録された日付を使用（手動管理）。
 * 未登録の場合はサイト開設日にフォールバック。
 * ページを更新したら page-dates.ts の日付も更新すること。
 */
export function getGitDateForFile(filePath: string): { dateStr: string; dateDisplay: string } {
  const dateStr = PAGE_DATES[filePath] ?? SITE_LAUNCH_DATE
  return {
    dateStr,
    dateDisplay: formatDateDisplay(dateStr),
  }
}

/**
 * 本日（JST）の日付を {dateStr: "YYYY-MM-DD", dateDisplay} で返す。
 * 毎日自動更新するページの「更新日」表示用（ISR再生成時に最新化される）。
 */
export function getTodayDate(): { dateStr: string; dateDisplay: string } {
  const dateStr = new Date().toLocaleDateString('sv-SE', { timeZone: JAPAN_TIME_ZONE })
  return {
    dateStr,
    dateDisplay: formatDateDisplay(dateStr),
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
  if (!url) return url
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('//')) return `https:${url}`
  return `https://${url}`
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

/** Supabase クエリの since パラメータ用に「90日前」の YYYY-MM-DD 文字列を返す */
export function get90DaysAgo(): string {
  const d = new Date()
  d.setDate(d.getDate() - 90)
  return d.toISOString().substring(0, 10)
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
  dateModified?: string
  url: string
  image?: string
}) {
  const imagePath = opts.image ?? getHeroImage(new URL(opts.url, 'https://used-lab.jp').pathname)
  const imageUrl = imagePath.startsWith('http') ? imagePath : `https://used-lab.jp${imagePath}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    image: [imageUrl],
    datePublished: opts.dateStr,
    dateModified: opts.dateModified ?? opts.dateStr,
    inLanguage: 'ja',
    author: {
      '@type': 'Person',
      name: 'タカヒロ',
      url: 'https://used-lab.jp/profile/',
      image: 'https://used-lab.jp/images/content/thumbnail/my-icon.webp',
      jobTitle: 'Webディレクター / ブロガー',
      description: 'IT企業でWebデザイナー、フロントエンドエンジニア、Webディレクターを経て現在はプロジェクトマネージャー。2015年からガジェットブログ「デジスタ」を運営し、300以上の製品をレビュー。GoodsPress・ITmedia等で連載・監修実績多数。',
      knowsAbout: ['iPhone', 'iPad', 'MacBook', 'Apple Watch', 'AirPods', '中古Apple製品', 'ガジェット'],
      sameAs: [
        'https://twitter.com/takahiro_mono',
        'https://www.instagram.com/takahiro_mono',
        'https://www.youtube.com/@takahiro_mono',
        'https://note.com/takahiro_mono',
        'https://digital-style.jp/',
        'https://nightscape.tokyo/',
        'https://news.google.com/publications/CAAqBwgKMOzgvwsw-fvWAw?hl=ja&gl=JP&ceid=JP:ja',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'ユーズドラボ',
      logo: {
        '@type': 'ImageObject',
        url: 'https://used-lab.jp/images/logo.svg',
      },
    },
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

/**
 * 標準3店舗(イオシス・ゲオ・じゃんぱら)の PriceChartSection 用データをまとめて計算する。
 * iphone / ipad / watch の [slug]/page.tsx で共通利用。
 */
export function buildStandardPriceChartData(priceLogs: BasePriceLog[]): {
  latestDate: string | null
  latestMinMaxPairs: { mins: number[]; maxes: number[] }[]
  storageNote: string
  /** 最新ログの価格分布。2026-07-30 より前のログしかない場合は null */
  priceStats: PriceStats | null
  /** 最新ログの流通量（3ショップ合計）。記録がない場合は null */
  totalCount: number | null
} {
  // 価格が全ショップnullの日を避け、価格がある最新日を採用（価格取得不調時のフォールバック）
  const latestPricedLog = [...priceLogs].reverse().find(
    (l) => l.iosys_min != null || l.geo_min != null || l.janpara_min != null
  )
  const latestDate = latestPricedLog?.logged_at ?? null
  const latestLogEntries = latestDate ? priceLogs.filter((l) => l.logged_at === latestDate) : []
  const latestMinMaxPairs = latestLogEntries.map((l) => ({
    mins: [l.iosys_min, l.geo_min, l.janpara_min].filter((v): v is number => v != null),
    maxes: [l.iosys_max, l.geo_max, l.janpara_max].filter((v): v is number => v != null),
  }))
  const storageNote = latestLogEntries[0]?.storage ?? ''

  // 同じ日に複数行ある場合（容量違いなど）は全行の価格をまとめて分布を出す
  const priceStats = calculatePriceStats(
    latestLogEntries.flatMap((l) => [l.iosys_prices, l.geo_prices, l.janpara_prices])
  )
  const counts = latestLogEntries.flatMap((l) => [l.iosys_count, l.geo_count, l.janpara_count])
  const recorded = counts.filter((c): c is number => c != null)
  const totalCount = recorded.length > 0 ? recorded.reduce((a, b) => a + b, 0) : null

  return { latestDate, latestMinMaxPairs, storageNote, priceStats, totalCount }
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
  extractPrices: (log: T) => {
    mins: (number | null)[]
    maxes: (number | null)[]
    /** その日の該当商品数（ショップごと）。2026-07-30 より前のログには無いので任意 */
    counts?: (number | null | undefined)[]
  }
): {
  labels: string[]
  avgMin: (number | null)[]
  avgMax: (number | null)[]
  /** その日の流通量（全ショップ合計）。記録がない日は null */
  counts: (number | null)[]
} {
  const dayMap = new Map<string, { mins: number[]; maxes: number[]; count: number | null }>()

  for (const log of logs) {
    const day = log.logged_at.substring(0, 10)
    if (!dayMap.has(day)) {
      dayMap.set(day, { mins: [], maxes: [], count: null })
    }
    const bucket = dayMap.get(day)!
    const { mins, maxes, counts } = extractPrices(log)

    const minPrices = mins.filter((v): v is number => v != null && v > 0)
    const maxPrices = maxes.filter((v): v is number => v != null && v > 0)

    if (minPrices.length > 0) {
      bucket.mins.push(Math.round(minPrices.reduce((a, b) => a + b, 0) / minPrices.length / 100) * 100)
    }
    if (maxPrices.length > 0) {
      bucket.maxes.push(Math.round(maxPrices.reduce((a, b) => a + b, 0) / maxPrices.length / 100) * 100)
    }

    // 同じ日に複数行ある場合（容量違いなど）は合算する。
    // 1件も記録がない日は 0 ではなく null のまま残し、「在庫ゼロ」と区別する
    const recorded = (counts ?? []).filter((c): c is number => c != null)
    if (recorded.length > 0) {
      bucket.count = (bucket.count ?? 0) + recorded.reduce((a, b) => a + b, 0)
    }
  }

  const sortedDays = [...dayMap.keys()].sort()
  const recentDays = sortedDays.slice(-90)
  const avg = (arr: number[]) => arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length / 100) * 100 : null

  return {
    labels: recentDays,
    avgMin: recentDays.map(d => avg(dayMap.get(d)!.mins)),
    avgMax: recentDays.map(d => avg(dayMap.get(d)!.maxes)),
    counts: recentDays.map(d => dayMap.get(d)!.count),
  }
}

/**
 * 最新の価格レンジを取得
 * shops: ショップ名とmin/maxの配列
 */
export function calculatePriceRange(
  shops: { name: string; min: number | null; max: number | null }[],
  /**
   * その日に取得した全商品の価格（ショップごと）。渡すと分布から
   * medianPrice / realisticMinPrice を算出できる。2026-07-30 より前は記録がない。
   */
  priceArrays?: (number[] | null | undefined)[]
): {
  minPrice: number | null
  maxPrice: number | null
  /** 相場の中心（中央値）。「〜の相場は」と書く箇所はこちらを使う */
  medianPrice: number | null
  /**
   * 現実的な最安値（下位10%点）。「〜から手に入る」と書く箇所はこちらを使う。
   * 生の最安値は1点だけの特価であることが多く、その価格では実際に見つからない
   */
  realisticMinPrice: number | null
  shops: { name: string; min: number | null; max: number | null }[]
} {
  const allMins = shops.map(s => s.min).filter((v): v is number => v != null)
  const allMaxes = shops.map(s => s.max).filter((v): v is number => v != null)
  const stats = priceArrays ? calculatePriceStats(priceArrays) : null

  return {
    minPrice: allMins.length > 0 ? Math.min(...allMins) : null,
    maxPrice: allMaxes.length > 0 ? Math.max(...allMaxes) : null,
    medianPrice: stats?.median ?? null,
    realisticMinPrice: stats?.realisticMin ?? null,
    shops,
  }
}
