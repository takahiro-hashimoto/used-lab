// ============================================
// Amazon Creators API クライアント（PA-APIの後継）
// ============================================
// Amazon整備済み(Renewed)のApple製品を公式APIで取得する。
//   - 認証は OAuth2 Bearer（SDKが内部処理）。credential_id/secret/version を渡すだけ。
//   - 日本マーケットプレイス（www.amazon.co.jp）
//   - SDK: amazon-creators-api（公式JS SDKの型付きラッパー）
//
// 重要（規約）:
//   価格は短時間しか保持しない方針。DBに価格履歴を蓄積せず、
//   リクエスト時取得＋短時間ISRでキャッシュする使い方を想定する。
// ============================================

import {
  ApiClient,
  TypedDefaultApi,
  SearchItemsRequestContent,
  SearchItemsResource,
  SortBy,
} from 'amazon-creators-api'

const MARKETPLACE = 'www.amazon.co.jp'

function env() {
  return {
    credentialId: process.env.AMAZON_CREATORS_CREDENTIAL_ID ?? '',
    credentialSecret: process.env.AMAZON_CREATORS_CREDENTIAL_SECRET ?? '',
    version: process.env.AMAZON_CREATORS_VERSION ?? '',
    partnerTag: process.env.AMAZON_CREATORS_PARTNER_TAG ?? '',
  }
}

export function hasAmazonCredentials(): boolean {
  const e = env()
  return Boolean(e.credentialId && e.credentialSecret && e.version && e.partnerTag)
}

let _api: TypedDefaultApi | null = null
function getApi(): TypedDefaultApi {
  if (_api) return _api
  const e = env()
  const client = new ApiClient()
  client.credentialId = e.credentialId
  client.credentialSecret = e.credentialSecret
  client.version = e.version
  _api = new TypedDefaultApi(client)
  return _api
}

/** 正規化済みのAmazon商品 */
export interface AmazonItem {
  asin: string
  title: string
  url: string
  imageUrl: string | null
  price: number | null
  priceDisplay: string | null
  condition: string | null
}

// レスポンスの必要部分のみ型定義（SDKは plain JSON を返すため緩く受ける）
interface RawItem {
  asin?: string
  detailPageURL?: string
  itemInfo?: { title?: { displayValue?: string } }
  images?: { primary?: { medium?: { url?: string } } }
  offersV2?: {
    listings?: Array<{
      price?: { money?: { amount?: number; displayAmount?: string } }
      condition?: { value?: string }
    }>
  }
}

const SEARCH_RESOURCES = [
  'images.primary.medium',
  'itemInfo.title',
  'offersV2.listings.price',
  'offersV2.listings.condition',
  'offersV2.listings.availability',
]

function normalize(res: unknown): AmazonItem[] {
  const items = (res as { searchResult?: { items?: RawItem[] } })?.searchResult?.items
  if (!Array.isArray(items)) return []
  return items.map((it) => {
    const listing = it.offersV2?.listings?.[0]
    return {
      asin: it.asin ?? '',
      title: it.itemInfo?.title?.displayValue ?? '',
      url: it.detailPageURL ?? '',
      imageUrl: it.images?.primary?.medium?.url ?? null,
      price: typeof listing?.price?.money?.amount === 'number' ? listing.price.money.amount : null,
      priceDisplay: listing?.price?.money?.displayAmount ?? null,
      condition: listing?.condition?.value ?? null,
    }
  })
}

/** カテゴリ別の検索定義（整備済み品はタイトルに「整備済み品」が入る） */
// 1キーワード=最大100件のAPI上限があるため、機種が多いカテゴリは
// キーワードを複数に分割して網羅性を上げる（結果はASINで重複排除）。
// searchIndex: iPhone/iPad/Watch は Electronics、Mac（デスクトップ含む）は Computers。
export const RENEWED_CATEGORIES = [
  { key: 'iphone', label: 'iPhone', searchIndex: 'Electronics', keywords: ['整備済み iPhone'] },
  {
    key: 'ipad',
    label: 'iPad',
    searchIndex: 'Electronics',
    keywords: ['整備済み iPad', '整備済み iPad Pro', '整備済み iPad Air', '整備済み iPad mini'],
  },
  {
    key: 'mac',
    label: 'Mac / MacBook',
    searchIndex: 'Computers',
    keywords: ['整備済み MacBook', '整備済み Mac mini', '整備済み iMac', '整備済み Mac Studio'],
  },
  { key: 'watch', label: 'Apple Watch', searchIndex: 'Electronics', keywords: ['整備済み Apple Watch'] },
  { key: 'airpods', label: 'AirPods', searchIndex: 'Electronics', keywords: ['整備済み AirPods'] },
] as const

export interface RenewedGroup {
  key: string
  label: string
  items: AmazonItem[]
}

/** 整備済み品らしさ（タイトルに「整備済」を含む） */
function isRenewed(it: AmazonItem): boolean {
  return /整備済/.test(it.title)
}

export type DeviceCategory = 'iphone' | 'ipad' | 'mac' | 'watch' | 'airpods'

// シンプルな肯定マッチ：商品名が「Apple/アップル + （任意のサイズ表記）+ 機種名」になっているものだけ採用。
// 他社製品・アクセサリ・別カテゴリのApple製品は、この並びにならないため自然に除外される。
const CATEGORY_MATCH: Record<DeviceCategory, RegExp> = {
  iphone: /(Apple|アップル)\s*iPhone/i,
  ipad: /(Apple|アップル)\s*(?:\d+(?:\.\d+)?インチ\s*)?iPad/i,
  mac: /(Apple|アップル)\s*(?:\d+(?:\.\d+)?インチ\s*)?(MacBook|iMac|Mac\s?mini|Mac\s?Studio|Mac\s?Pro)/i,
  // Watchは機種名自体に Apple を含むため、後ろに機種トークンが続くものに限定（充電器等の「対応」表記を除外）
  watch: /Apple\s?Watch\s*(Series|SE|Ultra|Nike|Herm|\d+\s?mm|GPS|Cellular)/i,
  // AirPods は Apple 固有名のため機種名のみでOK
  airpods: /AirPods/i,
}

/** タイトルがそのカテゴリの実機か */
export function matchesCategory(title: string, key: DeviceCategory): boolean {
  return CATEGORY_MATCH[key].test(title)
}

/** タイトルが属するカテゴリ（対象5種以外は null）。新着一覧の判定用 */
export function classifyDevice(title: string): DeviceCategory | null {
  for (const key of ['airpods', 'watch', 'ipad', 'mac', 'iphone'] as DeviceCategory[]) {
    if (CATEGORY_MATCH[key].test(title)) return key
  }
  return null
}

/** タイトルから機種番号などを推定し、新しいほど大きい値を返す（並び替え用・大体でOK） */
export function modelRank(title: string, key: DeviceCategory): number {
  const num = (re: RegExp): number | null => {
    const m = title.match(re)
    return m ? parseInt(m[1], 10) : null
  }
  switch (key) {
    case 'iphone': {
      const n = num(/iPhone\s?(\d{1,2})/i)
      if (n != null) return n // iPhone 15 → 15
      if (/iPhone\s?Air/i.test(title)) return 17 // 2025年モデル相当
      if (/iPhone\s?SE/i.test(title)) return 13 // SE(第3世代)は新しめ→13相当
      return 0
    }
    case 'ipad': {
      const chip = num(/\bM(\d)\b/i)
      if (chip != null) return 20 + chip // Pro/Air の新Mチップ系を上位に
      const gen = num(/第\s?(\d{1,2})\s?世代/)
      if (gen != null) return gen
      return 0
    }
    case 'mac': {
      const year = num(/(20\d\d)/)
      if (year != null) return year // 発売年で新しい順
      const chip = num(/\bM(\d)\b/i)
      if (chip != null) return 2018 + chip
      return 0
    }
    case 'watch': {
      if (/Ultra/i.test(title)) return 100 + (num(/Ultra\s?(\d)/i) ?? 1)
      const s = num(/Series\s?(\d+)/i)
      if (s != null) return s
      if (/SE/i.test(title)) return 2
      return 0
    }
    case 'airpods': {
      if (/Pro/i.test(title)) return 3
      if (/Max/i.test(title)) return 2
      return num(/第\s?(\d)\s?世代/) ?? 1
    }
  }
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

// Creators API の searchItems は 1ページ最大10件・itemPage は最大10。
// → 1キーワードあたり最大100件まで取得できる。
const PAGE_SIZE = 10
const MAX_PAGES = 10
const PAGE_DELAY_MS = 300 // レート制限(429)対策の小休止

/** 1ページ取得（一時的なfetch失敗・429に強くするため数回リトライ）。失敗が続けば null */
async function searchPageWithRetry(
  keywords: string,
  itemPage: number,
  opts: { sortBy?: string; searchIndex?: string } = {},
  retries = 3,
): Promise<AmazonItem[] | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await searchAppleRenewed(keywords, PAGE_SIZE, { itemPage, ...opts })
    } catch (err) {
      console.error(`[amazon] searchItems 失敗 attempt=${attempt + 1}/${retries + 1} kw="${keywords}" page=${itemPage}:`, err)
      if (attempt < retries) await sleep(700 * (attempt + 1)) // バックオフ
    }
  }
  return null
}

/**
 * 1キーワードをページ送りで上限まで取得。
 * 整備済み・在庫あり（価格あり）・指定カテゴリの実機のみ採用し、ASINで重複排除。
 */
async function fetchAllPages(
  keywords: string,
  maxPages: number,
  categoryKey: DeviceCategory,
  searchIndex: string,
): Promise<AmazonItem[]> {
  const seen = new Set<string>()
  const out: AmazonItem[] = []
  for (let p = 1; p <= maxPages; p++) {
    const pageItems = await searchPageWithRetry(keywords, p, { searchIndex })
    if (pageItems === null) break // リトライしても失敗。取得済み分で打ち切る
    for (const it of pageItems) {
      // 整備済み / 在庫あり（価格あり）/ このカテゴリの実機 のみ
      if (!isRenewed(it) || it.priceDisplay == null) continue
      if (!matchesCategory(it.title, categoryKey)) continue
      if (it.asin && !seen.has(it.asin)) {
        seen.add(it.asin)
        out.push(it)
      }
    }
    if (pageItems.length < PAGE_SIZE) break // 最終ページに到達
    await sleep(PAGE_DELAY_MS)
  }
  return out
}

/** 同時実行数を制限して並列処理する（429回避と高速化の両立） */
async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

// 同時に投げるキーワード取得の数（多いほど速いが429リスク増）
const FETCH_CONCURRENCY = 3

/**
 * カテゴリ別にAmazon整備済み品をできるだけ多く取得（ページ表示用）。
 * (カテゴリ×キーワード) を最大 FETCH_CONCURRENCY 本まで並列で取得して高速化する。
 * 各キーワード内のページ送りは直列＋リトライでレート制限に配慮。
 */
export async function searchRenewedGroups(maxPages = MAX_PAGES): Promise<RenewedGroup[]> {
  if (!hasAmazonCredentials()) {
    console.error('[amazon] 環境変数未設定: AMAZON_CREATORS_CREDENTIAL_ID / _SECRET / _VERSION / _PARTNER_TAG を Vercel に登録してください')
    return []
  }

  // 全カテゴリのキーワードを1つの仕事リストにまとめる
  const jobs = RENEWED_CATEGORIES.flatMap((cat) => cat.keywords.map((kw) => ({ cat, kw })))

  const jobResults = await mapLimit(jobs, FETCH_CONCURRENCY, async ({ cat, kw }) => ({
    catKey: cat.key as DeviceCategory,
    items: await fetchAllPages(kw, maxPages, cat.key, cat.searchIndex),
  }))

  // カテゴリごとに集約・重複排除・新しい順ソート
  const groups: RenewedGroup[] = []
  for (const cat of RENEWED_CATEGORIES) {
    const seen = new Set<string>()
    const items: AmazonItem[] = []
    for (const r of jobResults) {
      if (r.catKey !== cat.key) continue
      for (const it of r.items) {
        if (it.asin && !seen.has(it.asin)) {
          seen.add(it.asin)
          items.push(it)
        }
      }
    }
    items.sort((a, b) => modelRank(b.title, cat.key) - modelRank(a.title, cat.key))
    if (items.length > 0) groups.push({ key: cat.key, label: cat.label, items })
  }
  return groups
}

interface SearchOpts {
  /** 'NewestArrivals' で新着順 */
  sortBy?: string
  /** ページ番号（1始まり、1ページ最大10件） */
  itemPage?: number
  /** 検索インデックス（既定 Electronics）。Macは Computers の場合あり */
  searchIndex?: string
}

/** Amazon整備済み(Renewed)のApple製品を検索して正規化して返す */
export async function searchAppleRenewed(
  keywords = 'Apple',
  itemCount = 10,
  opts: SearchOpts = {},
): Promise<AmazonItem[]> {
  if (!hasAmazonCredentials()) {
    throw new Error(
      '[amazon] Creators API の認証情報が未設定です（AMAZON_CREATORS_CREDENTIAL_ID / _SECRET / _VERSION / _PARTNER_TAG）',
    )
  }
  const e = env()
  const api = getApi()

  // Creators API の condition は [New, Any] のみ（Refurbished不可）。
  // よって整備済み(Renewed)はキーワードで狙い、結果側の condition 値で判別する。
  const req = new SearchItemsRequestContent()
  req.keywords = keywords
  req.partnerTag = e.partnerTag
  req.itemCount = itemCount
  req.searchIndex = opts.searchIndex ?? 'Electronics'
  req.resources = SEARCH_RESOURCES.map((r) => SearchItemsResource.constructFromObject(r))
  if (opts.sortBy) req.sortBy = SortBy.constructFromObject(opts.sortBy)
  if (opts.itemPage) req.itemPage = opts.itemPage

  const res = await api.searchItems(MARKETPLACE, req)
  return normalize(res)
}

