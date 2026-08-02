import { unstable_cache } from 'next/cache'
import { supabase } from './supabase'
import type {
  IPhoneModel, IPadModel, WatchModel, MacBookModel, AirPodsModel, PixelModel, GalaxyModel,
  Shop, ProductShopLink, ProductReview,
  IPhonePriceLog, IPadPriceLog, WatchPriceLog, MacBookPriceLog, AirPodsPriceLog, PixelPriceLog, GalaxyPriceLog,
  MvnoPlan,
  MvnoProvider,
  IPadAccessory, IPadAccessoryCompatibility,
  SiteConfig,
} from './types'

// ============================================================
// キャッシュタグ定数
// ============================================================
export const CACHE_TAGS = {
  iphoneModels: 'iphone-models',
  ipadModels: 'ipad-models',
  watchModels: 'watch-models',
  macbookModels: 'macbook-models',
  airpodsModels: 'airpods-models',
  pixelModels: 'pixel-models',
  galaxyModels: 'galaxy-models',
  iphonePriceLogs: 'iphone-price-logs',
  ipadPriceLogs: 'ipad-price-logs',
  watchPriceLogs: 'watch-price-logs',
  macbookPriceLogs: 'macbook-price-logs',
  airpodsPriceLogs: 'airpods-price-logs',
  pixelPriceLogs: 'pixel-price-logs',
  galaxyPriceLogs: 'galaxy-price-logs',
  shops: 'shops',
  shopLinks: 'shop-links',
  mvno: 'mvno',
  news: 'news',
  ipadAccessories: 'ipad-accessories',
  siteConfig: 'site-config',
} as const

/** カテゴリキー → 関連キャッシュタグのマッピング */
export const CATEGORY_CACHE_TAGS: Record<string, string[]> = {
  iphone: [CACHE_TAGS.iphoneModels, CACHE_TAGS.iphonePriceLogs],
  ipad: [CACHE_TAGS.ipadModels, CACHE_TAGS.ipadPriceLogs, CACHE_TAGS.ipadAccessories],
  watch: [CACHE_TAGS.watchModels, CACHE_TAGS.watchPriceLogs],
  macbook: [CACHE_TAGS.macbookModels, CACHE_TAGS.macbookPriceLogs],
  airpods: [CACHE_TAGS.airpodsModels, CACHE_TAGS.airpodsPriceLogs],
  pixel: [CACHE_TAGS.pixelModels, CACHE_TAGS.pixelPriceLogs],
  galaxy: [CACHE_TAGS.galaxyModels, CACHE_TAGS.galaxyPriceLogs],
  'ipad-accessories': [CACHE_TAGS.ipadAccessories],
  news: [CACHE_TAGS.news],
}

// ============================================================
// ファクトリ関数
// ============================================================

/**
 * モデルテーブル用の共通クエリを生成（キャッシュ付き）
 * @param activeField 現役判定カラム — NULL なら現役と判断（指定なしの場合フィルタなし）
 */
function createModelQueries<T>(table: string, tag: string, activeField?: string) {
  return {
    getBySlug: unstable_cache(
      async (slug: string): Promise<T | null> => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('slug', slug)
          .eq('show', 1)
          .single()
        // PGRST116 = "0 rows" → 正常な「見つからない」ケースなのでnullを返す
        if (error) {
          if (error.code === 'PGRST116') return null
          throw new Error(`getBySlug(${table}, ${slug}): ${error.message}`)
        }
        return data as T
      },
      [`${table}-by-slug`],
      { revalidate: 604800, tags: [tag] }
    ),

    getAll: unstable_cache(
      async (): Promise<T[]> => {
        let query = supabase.from(table).select('*').eq('show', 1)
        if (activeField) query = query.is(activeField, null)
        const { data, error } = await query.order('id', { ascending: true })
        if (error) throw new Error(`getAll(${table}): ${error.message}`)
        return (data ?? []) as T[]
      },
      [`${table}-all`],
      { revalidate: 604800, tags: [tag] }
    ),

    /** activeFieldフィルタなしで全モデルを取得（サポート終了モデル含む） */
    getAllIncludingEnded: unstable_cache(
      async (): Promise<T[]> => {
        const { data, error } = await supabase.from(table).select('*').eq('show', 1).order('id', { ascending: true })
        if (error) throw new Error(`getAllIncludingEnded(${table}): ${error.message}`)
        return (data ?? []) as T[]
      },
      [`${table}-all-including-ended`],
      { revalidate: 604800, tags: [tag] }
    ),

    getAllSlugs: unstable_cache(
      async (): Promise<string[]> => {
        let query = supabase.from(table).select('slug').eq('show', 1)
        if (activeField) query = query.is(activeField, null)
        const { data, error } = await query
        if (error) throw new Error(`getAllSlugs(${table}): ${error.message}`)
        return (data ?? []).map((d) => d.slug)
      },
      [`${table}-slugs`],
      { revalidate: 604800, tags: [tag] }
    ),
  }
}

/**
 * DBクエリの同時実行数の上限（1ワーカープロセスあたり）。
 *
 * ページ側は Promise.all で何本も同時に投げるため、ワーカー数を絞るだけでは
 * 瞬間的な同時接続数が読めない（[slug] ページは3ブランド分の価格ログを一度に引く）。
 * ここで頭を押さえることで、experimental.cpus と掛け算になった突発的なスパイクを防ぐ。
 * 待たせるだけでクエリは落とさないので、ビルド結果は変わらない。
 */
const DB_CONCURRENCY = 4
let dbInFlight = 0
const dbWaiters: (() => void)[] = []

async function acquireDbSlot(): Promise<void> {
  if (dbInFlight < DB_CONCURRENCY) {
    dbInFlight++
    return
  }
  await new Promise<void>((resolve) => dbWaiters.push(resolve))
  dbInFlight++
}

function releaseDbSlot(): void {
  dbInFlight--
  const next = dbWaiters.shift()
  if (next) next()
}

/**
 * 一時的なDB過負荷のみリトライする。
 *
 * Vercel のビルドマシンは30コアあり、全カテゴリのページを一斉にプリレンダリングする。
 * その結果 7カテゴリぶんの価格ログクエリが同時に殺到して Supabase が飽和し、
 * `canceling statement due to statement timeout` や `fetch failed` で
 * **ビルドごと失敗する**。1ページの失敗が全体を落とすため、ここで吸収する。
 *
 * 対策は3段構え。
 *   1. next.config.ts の experimental.cpus でワーカー数を抑える
 *   2. DB_CONCURRENCY で1ワーカー内の同時クエリ数を抑える
 *   3. それでも溢れた分をこのリトライで拾う
 *
 * カラム名の誤りなど恒久的な失敗は握りつぶさず即座に投げる。
 */
async function withDbRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const RETRYABLE = /statement timeout|canceling statement|fetch failed|ECONNRESET|ETIMEDOUT|503|504/i
  const MAX_ATTEMPTS = 5
  let lastError: unknown
  let lastMessage = ''

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    await acquireDbSlot()
    try {
      return await fn()
    } catch (e) {
      lastError = e
      const message = e instanceof Error ? e.message : String(e)
      if (!RETRYABLE.test(message)) throw e
      lastMessage = message
    } finally {
      releaseDbSlot()
    }

    // ここに到達するのはリトライ対象のエラーだったときだけ。
    // バックオフは枠を手放してから待つ（掴んだまま眠ると他のクエリを止めてしまう）。
    if (attempt === MAX_ATTEMPTS) break
    // 1s → 2s → 4s → 8s の指数バックオフ。
    // 原因は「ビルド開始直後に価格ログクエリが同時に殺到して Supabase が飽和する」
    // 一過性のスパイクなので、短い間隔で叩き直しても同じ混雑に当たるだけで意味がない。
    const waitMs = 1000 * 2 ** (attempt - 1)
    console.warn(`[queries] ${label} failed (${lastMessage}); retrying in ${waitMs}ms (${attempt}/${MAX_ATTEMPTS - 1})`)
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }
  throw lastError
}

/** 価格ログテーブル用の共通クエリを生成（キャッシュ付き） */
function createPriceLogQueries<T extends { model_id: number }>(table: string, tag: string) {
  return {
    getByModelId: unstable_cache(
      async (modelId: number): Promise<T[]> => {
        const data = await withDbRetry(`getByModelId(${table}, ${modelId})`, async () => {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('model_id', modelId)
            .order('logged_at', { ascending: true })
          if (error) throw new Error(`getByModelId(${table}, ${modelId}): ${error.message}`)
          return data
        })
        return (data ?? []) as T[]
      },
      [`${table}-by-model`],
      { revalidate: 86400, tags: [tag] }
    ),

    getLatest: unstable_cache(
      async (modelId: number): Promise<T | null> => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('model_id', modelId)
          .order('logged_at', { ascending: false })
          .limit(1)
          .maybeSingle()
        if (error) throw new Error(`getLatest(${table}, ${modelId}): ${error.message}`)
        return (data ?? null) as T | null
      },
      [`${table}-latest`],
      { revalidate: 86400, tags: [tag] }
    ),

    /** 複数モデルの最新価格ログを一括取得し、model_id → 最新ログのマップで返す（過去30日分のみ取得） */
    getLatestForModels: unstable_cache(
      async (modelIds: number[]): Promise<Record<number, T>> => {
        if (modelIds.length === 0) return {}
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substring(0, 10)
        const data = await withDbRetry(`getLatestForModels(${table})`, async () => {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .in('model_id', modelIds)
            .gte('logged_at', thirtyDaysAgo)
            .order('logged_at', { ascending: false })
          if (error) throw new Error(`getLatestForModels(${table}): ${error.message}`)
          return data
        })
        const map: Record<number, T> = {}
        for (const row of (data ?? []) as T[]) {
          if (!(row.model_id in map)) {
            map[row.model_id] = row
          }
        }
        return map
      },
      [`${table}-latest-for-models`],
      { revalidate: 86400, tags: [tag] }
    ),

    /** 直近90日以内で価格フィールドが1つ以上非nullな最新ログを単一モデルで返す */
    getLatestWithPrices: unstable_cache(
      async (modelId: number, priceColumns: string[]): Promise<T | null> => {
        const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substring(0, 10)
        const orFilter = priceColumns.map((c) => `${c}.not.is.null`).join(',')
        const data = await withDbRetry(`getLatestWithPrices(${table}, ${modelId})`, async () => {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('model_id', modelId)
            .gte('logged_at', ninetyDaysAgo)
            .or(orFilter)
            .order('logged_at', { ascending: false })
            .limit(1)
            .maybeSingle()
          if (error) throw new Error(`getLatestWithPrices(${table}, ${modelId}): ${error.message}`)
          return data
        })
        return (data ?? null) as T | null
      },
      [`${table}-latest-with-prices`],
      { revalidate: 86400, tags: [tag] }
    ),

    /** 直近90日以内で価格フィールドが1つ以上非nullな最新ログを model_id ごとに返す（スペック表の相場表示用） */
    getLatestWithPricesForModels: unstable_cache(
      async (modelIds: number[], priceColumns: string[]): Promise<Record<number, T>> => {
        if (modelIds.length === 0) return {}
        const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substring(0, 10)
        const orFilter = priceColumns.map((c) => `${c}.not.is.null`).join(',')
        const data = await withDbRetry(`getLatestWithPricesForModels(${table})`, async () => {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .in('model_id', modelIds)
            .gte('logged_at', ninetyDaysAgo)
            .or(orFilter)
            .order('logged_at', { ascending: false })
          if (error) throw new Error(`getLatestWithPricesForModels(${table}): ${error.message}`)
          return data
        })
        const map: Record<number, T> = {}
        for (const row of (data ?? []) as T[]) {
          if (!(row.model_id in map)) {
            map[row.model_id] = row
          }
        }
        return map
      },
      [`${table}-latest-with-prices-for-models`],
      { revalidate: 86400, tags: [tag] }
    ),

    /** 複数モデルの価格ログを一括取得し、model_id ごとにグループ化して返す（自動ページネーション）
     *  データ量が2MBを超える場合があるためunstable_cacheは使わず、ページレベルのrevalidateに委ねる
     *  @param since YYYY-MM-DD形式の日付文字列。指定するとその日以降のログのみ取得（Supabase側で絞り込み） */
    getAllByModelIds: async (modelIds: number[], since?: string): Promise<Record<number, T[]>> => {
      if (modelIds.length === 0) return {}
      const PAGE_SIZE = 1000
      const allRows: T[] = []
      let from = 0
      while (true) {
        // エラー時は break して部分データで返る作りなので、タイムアウトを黙って
        // 取りこぼすとグラフが欠けたまま公開される。リトライで拾う
        const data = await withDbRetry(`getAllByModelIds(${table})`, async () => {
          let query = supabase
            .from(table)
            .select('*')
            .in('model_id', modelIds)
            .order('logged_at', { ascending: true })
            .range(from, from + PAGE_SIZE - 1)
          if (since) query = query.gte('logged_at', since)
          const { data, error } = await query
          if (error) throw new Error(`getAllByModelIds(${table}): ${error.message}`)
          return data
        })
        if (!data || data.length === 0) break
        allRows.push(...(data as T[]))
        if (data.length < PAGE_SIZE) break
        from += PAGE_SIZE
      }
      const record: Record<number, T[]> = {}
      for (const row of allRows) {
        const arr = record[row.model_id] || []
        arr.push(row)
        record[row.model_id] = arr
      }
      return record
    },
  }
}

// ============================================================
// 各製品のクエリインスタンス
// ============================================================

const iPhoneModels = createModelQueries<IPhoneModel>('iphone_models', CACHE_TAGS.iphoneModels, 'last_ios')
const iPhonePriceLogs = createPriceLogQueries<IPhonePriceLog>('iphone_price_logs', CACHE_TAGS.iphonePriceLogs)

const iPadModels = createModelQueries<IPadModel>('ipad_models', CACHE_TAGS.ipadModels, 'last_ipados')
const iPadPriceLogs = createPriceLogQueries<IPadPriceLog>('ipad_price_logs', CACHE_TAGS.ipadPriceLogs)

const watchModels = createModelQueries<WatchModel>('watch_models', CACHE_TAGS.watchModels, 'last_watchos')
const watchPriceLogs = createPriceLogQueries<WatchPriceLog>('watch_price_logs', CACHE_TAGS.watchPriceLogs)

const macBookModels = createModelQueries<MacBookModel>('macbook_models', CACHE_TAGS.macbookModels, 'last_macos')
const macBookPriceLogs = createPriceLogQueries<MacBookPriceLog>('macbook_price_logs', CACHE_TAGS.macbookPriceLogs)

// AirPods には「最終対応OS」がないためフィルタなし（全件表示）
const airPodsModels = createModelQueries<AirPodsModel>('airpods_models', CACHE_TAGS.airpodsModels)
const airPodsPriceLogs = createPriceLogQueries<AirPodsPriceLog>('airpods_price_logs', CACHE_TAGS.airpodsPriceLogs)

// Pixel は last_android（NULL=現役）で現役判定
const pixelModels = createModelQueries<PixelModel>('pixel_models', CACHE_TAGS.pixelModels, 'last_android')
const pixelPriceLogs = createPriceLogQueries<PixelPriceLog>('pixel_price_logs', CACHE_TAGS.pixelPriceLogs)

// Galaxy も last_android（NULL=現役）で現役判定
const galaxyModels = createModelQueries<GalaxyModel>('galaxy_models', CACHE_TAGS.galaxyModels, 'last_android')
const galaxyPriceLogs = createPriceLogQueries<GalaxyPriceLog>('galaxy_price_logs', CACHE_TAGS.galaxyPriceLogs)

// ============================================================
// 名前付きエクスポート（後方互換）
// ============================================================

// iPhone
export const getIPhoneModelBySlug = iPhoneModels.getBySlug
export const getAllIPhoneModels = iPhoneModels.getAll
export const getAllIPhoneModelsIncludingEnded = iPhoneModels.getAllIncludingEnded
export const getAllIPhoneSlugs = iPhoneModels.getAllSlugs
export const getPriceLogsByModelId = iPhonePriceLogs.getByModelId
export const getLatestPriceLog = iPhonePriceLogs.getLatest
export const getAllIPhonePriceLogsByModelIds = iPhonePriceLogs.getAllByModelIds
export const getLatestIPhonePriceLogsForModels = iPhonePriceLogs.getLatestForModels
export const getLatestIPhonePriceLogsWithPricesForModels = iPhonePriceLogs.getLatestWithPricesForModels
const IPHONE_PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
export const getLatestIPhonePriceLogWithPrices = (modelId: number) =>
  iPhonePriceLogs.getLatestWithPrices(modelId, IPHONE_PRICE_COLS)

// iPad
export const getIPadModelBySlug = iPadModels.getBySlug
export const getAllIPadModels = iPadModels.getAll
export const getAllIPadModelsIncludingEnded = iPadModels.getAllIncludingEnded
export const getAllIPadSlugs = iPadModels.getAllSlugs
export const getIPadPriceLogsByModelId = iPadPriceLogs.getByModelId
export const getLatestIPadPriceLog = iPadPriceLogs.getLatest
export const getAllIPadPriceLogsByModelIds = iPadPriceLogs.getAllByModelIds
export const getLatestIPadPriceLogsForModels = iPadPriceLogs.getLatestForModels
export const getLatestIPadPriceLogsWithPricesForModels = iPadPriceLogs.getLatestWithPricesForModels
const IPAD_PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
export const getLatestIPadPriceLogWithPrices = (modelId: number) =>
  iPadPriceLogs.getLatestWithPrices(modelId, IPAD_PRICE_COLS)

// iPad Accessories
export const getAllIPadAccessories = unstable_cache(
  async (): Promise<IPadAccessory[]> => {
    const { data, error } = await supabase
      .from('ipad_accessories')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) throw new Error(`getAllIPadAccessories: ${error.message}`)
    return (data ?? []) as IPadAccessory[]
  },
  ['ipad-accessories-all'],
  { revalidate: 604800, tags: [CACHE_TAGS.ipadAccessories] }
)

export const getAllIPadAccessoryCompatibility = unstable_cache(
  async (): Promise<IPadAccessoryCompatibility[]> => {
    const { data, error } = await supabase
      .from('ipad_accessory_compatibility')
      .select('*')
    if (error) throw new Error(`getAllIPadAccessoryCompatibility: ${error.message}`)
    return (data ?? []) as IPadAccessoryCompatibility[]
  },
  ['ipad-accessory-compatibility-all'],
  { revalidate: 604800, tags: [CACHE_TAGS.ipadAccessories] }
)

export const getIPadAccessoriesByModelId = unstable_cache(
  async (modelId: number): Promise<IPadAccessory[]> => {
    const { data, error } = await supabase
      .from('ipad_accessory_compatibility')
      .select('accessory_id')
      .eq('ipad_model_id', modelId)
    if (error) throw new Error(`getIPadAccessoriesByModelId(compat, ${modelId}): ${error.message}`)

    const accessoryIds = (data ?? []).map((d) => d.accessory_id)
    if (accessoryIds.length === 0) return []

    const { data: accessories, error: accErr } = await supabase
      .from('ipad_accessories')
      .select('*')
      .in('id', accessoryIds)
      .order('display_order', { ascending: true })
    if (accErr) throw new Error(`getIPadAccessoriesByModelId(accessories, ${modelId}): ${accErr.message}`)
    return (accessories ?? []) as IPadAccessory[]
  },
  ['ipad-accessories-by-model'],
  { revalidate: 604800, tags: [CACHE_TAGS.ipadAccessories] }
)

// Watch
export const getWatchModelBySlug = watchModels.getBySlug
export const getAllWatchModels = watchModels.getAll
export const getAllWatchModelsIncludingEnded = watchModels.getAllIncludingEnded
export const getAllWatchSlugs = watchModels.getAllSlugs
export const getWatchPriceLogsByModelId = watchPriceLogs.getByModelId
export const getLatestWatchPriceLog = watchPriceLogs.getLatest
export const getAllWatchPriceLogsByModelIds = watchPriceLogs.getAllByModelIds
export const getLatestWatchPriceLogsForModels = watchPriceLogs.getLatestForModels
export const getLatestWatchPriceLogsWithPricesForModels = watchPriceLogs.getLatestWithPricesForModels
const WATCH_PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
export const getLatestWatchPriceLogWithPrices = (modelId: number) =>
  watchPriceLogs.getLatestWithPrices(modelId, WATCH_PRICE_COLS)

// MacBook
export const getMacBookModelBySlug = macBookModels.getBySlug
export const getAllMacBookModels = macBookModels.getAll
export const getAllMacBookModelsIncludingEnded = macBookModels.getAllIncludingEnded
export const getAllMacBookSlugs = macBookModels.getAllSlugs
export const getMacBookPriceLogsByModelId = macBookPriceLogs.getByModelId
export const getLatestMacBookPriceLog = macBookPriceLogs.getLatest
export const getAllMacBookPriceLogsByModelIds = macBookPriceLogs.getAllByModelIds
export const getLatestMacBookPriceLogsForModels = macBookPriceLogs.getLatestForModels
export const getLatestMacBookPriceLogsWithPricesForModels = macBookPriceLogs.getLatestWithPricesForModels
const MACBOOK_PRICE_COLS = ['min1_price', 'max1_price', 'min2_price', 'max2_price', 'min3_price', 'max3_price', 'min4_price', 'max4_price', 'min5_price', 'max5_price']
export const getLatestMacBookPriceLogWithPrices = (modelId: number) =>
  macBookPriceLogs.getLatestWithPrices(modelId, MACBOOK_PRICE_COLS)

// AirPods
export const getAirPodsModelBySlug = airPodsModels.getBySlug
export const getAllAirPodsModels = airPodsModels.getAll
export const getAllAirPodsModelsIncludingEnded = airPodsModels.getAllIncludingEnded
export const getAllAirPodsSlugs = airPodsModels.getAllSlugs
export const getAirPodsPriceLogsByModelId = airPodsPriceLogs.getByModelId
export const getLatestAirPodsPriceLog = airPodsPriceLogs.getLatest
export const getAllAirPodsPriceLogsByModelIds = airPodsPriceLogs.getAllByModelIds
export const getLatestAirPodsPriceLogsForModels = airPodsPriceLogs.getLatestForModels
export const getLatestAirPodsPriceLogsWithPricesForModels = airPodsPriceLogs.getLatestWithPricesForModels
const AIRPODS_PRICE_COLS = ['iosys_min', 'iosys_max', 'janpara_min', 'janpara_max', 'eearphone_min', 'eearphone_max']
export const getLatestAirPodsPriceLogWithPrices = (modelId: number) =>
  airPodsPriceLogs.getLatestWithPrices(modelId, AIRPODS_PRICE_COLS)

// Pixel
export const getPixelModelBySlug = pixelModels.getBySlug
export const getAllPixelModels = pixelModels.getAll
export const getAllPixelModelsIncludingEnded = pixelModels.getAllIncludingEnded
export const getAllPixelSlugs = pixelModels.getAllSlugs
export const getPixelPriceLogsByModelId = pixelPriceLogs.getByModelId
export const getLatestPixelPriceLog = pixelPriceLogs.getLatest
export const getAllPixelPriceLogsByModelIds = pixelPriceLogs.getAllByModelIds
export const getLatestPixelPriceLogsForModels = pixelPriceLogs.getLatestForModels
export const getLatestPixelPriceLogsWithPricesForModels = pixelPriceLogs.getLatestWithPricesForModels
const PIXEL_PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
export const getLatestPixelPriceLogWithPrices = (modelId: number) =>
  pixelPriceLogs.getLatestWithPrices(modelId, PIXEL_PRICE_COLS)

// Galaxy
export const getGalaxyModelBySlug = galaxyModels.getBySlug
export const getAllGalaxyModels = galaxyModels.getAll
export const getAllGalaxyModelsIncludingEnded = galaxyModels.getAllIncludingEnded
export const getAllGalaxySlugs = galaxyModels.getAllSlugs
export const getGalaxyPriceLogsByModelId = galaxyPriceLogs.getByModelId
export const getLatestGalaxyPriceLog = galaxyPriceLogs.getLatest
export const getAllGalaxyPriceLogsByModelIds = galaxyPriceLogs.getAllByModelIds
export const getLatestGalaxyPriceLogsForModels = galaxyPriceLogs.getLatestForModels
export const getLatestGalaxyPriceLogsWithPricesForModels = galaxyPriceLogs.getLatestWithPricesForModels
const GALAXY_PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
export const getLatestGalaxyPriceLogWithPrices = (modelId: number) =>
  galaxyPriceLogs.getLatestWithPrices(modelId, GALAXY_PRICE_COLS)

// ============================================================
// 共通クエリ（製品横断）
// ============================================================

// ============================================================
// MVNO プラン
// ============================================================

/** 全プラン取得 */
export const getMvnoPlans = unstable_cache(
  async (): Promise<MvnoPlan[]> => {
    const { data, error } = await supabase
      .from('mvno_plans')
      .select('*')
      .order('provider_slug', { ascending: true })
      .order('display_order', { ascending: true })
    if (error) throw new Error(`getMvnoPlans: ${error.message}`)
    return (data ?? []) as MvnoPlan[]
  },
  ['mvno-plans-all'],
  { revalidate: 604800, tags: [CACHE_TAGS.mvno] }
)

/** 事業者スラッグでプラン取得 */
export const getMvnoPlansByProvider = unstable_cache(
  async (providerSlug: string): Promise<MvnoPlan[]> => {
    const { data, error } = await supabase
      .from('mvno_plans')
      .select('*')
      .eq('provider_slug', providerSlug)
      .order('display_order', { ascending: true })
    if (error) throw new Error(`getMvnoPlansByProvider(${providerSlug}): ${error.message}`)
    return (data ?? []) as MvnoPlan[]
  },
  ['mvno-plans-by-provider'],
  { revalidate: 604800, tags: [CACHE_TAGS.mvno] }
)

/** provider_slug の一覧を取得（重複なし） */
export const getMvnoProviderSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const { data, error } = await supabase
      .from('mvno_plans')
      .select('provider_slug')
    if (error) throw new Error(`getMvnoProviderSlugs: ${error.message}`)
    return [...new Set((data ?? []).map((d) => d.provider_slug))]
  },
  ['mvno-provider-slugs'],
  { revalidate: 604800, tags: [CACHE_TAGS.mvno] }
)

// ============================================================
// MVNO 事業者（mvno_providers テーブル）
// ============================================================

/** 公開中の事業者を表示順で取得 */
export const getMvnoProviders = unstable_cache(
  async (): Promise<MvnoProvider[]> => {
    const { data, error } = await supabase
      .from('mvno_providers')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
    if (error) throw new Error(`getMvnoProviders: ${error.message}`)
    return (data ?? []) as MvnoProvider[]
  },
  ['mvno-providers'],
  { revalidate: 604800, tags: [CACHE_TAGS.mvno] }
)

// ============================================================
// 共通クエリ（製品横断）
// ============================================================

/** 価格データの最終更新日を取得（YYYY-MM-DD） */
export const getLatestPriceUpdateDate = unstable_cache(
  async (): Promise<string | null> => {
    const { data, error } = await supabase
      .from('iphone_price_logs')
      .select('logged_at')
      .order('logged_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (error) throw new Error(`getLatestPriceUpdateDate: ${error.message}`)
    return data ? data.logged_at.substring(0, 10) : null
  },
  ['latest-price-update-date'],
  { revalidate: 86400, tags: [CACHE_TAGS.iphonePriceLogs] }
)

/** カテゴリ別に価格データの最終更新日を取得（YYYY-MM-DD） */
export const getLatestPriceDatesPerCategory = unstable_cache(
  async (): Promise<Record<string, string | null>> => {
    const entries: [string, string][] = [
      ['iphone_price_logs', 'iphone'],
      ['ipad_price_logs', 'ipad'],
      ['watch_price_logs', 'watch'],
      ['macbook_price_logs', 'macbook'],
      ['airpods_price_logs', 'airpods'],
      ['pixel_price_logs', 'pixel'],
      ['galaxy_price_logs', 'galaxy'],
    ]

    const results = await Promise.all(
      entries.map(async ([table, category]) => {
        const { data, error } = await supabase
          .from(table)
          .select('logged_at')
          .order('logged_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (error) return [category, null] as const
        return [category, data ? (data.logged_at as string).substring(0, 10) : null] as const
      })
    )

    return Object.fromEntries(results)
  },
  ['latest-price-dates-per-category'],
  {
    revalidate: 86400,
    tags: [
      CACHE_TAGS.iphonePriceLogs,
      CACHE_TAGS.ipadPriceLogs,
      CACHE_TAGS.watchPriceLogs,
      CACHE_TAGS.macbookPriceLogs,
      CACHE_TAGS.airpodsPriceLogs,
    ],
  }
)

export const getShops = unstable_cache(
  async (): Promise<Shop[]> => {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .order('id', { ascending: true })
    if (error) {
      console.warn(`[queries] getShops failed, falling back to empty list: ${error.message}`)
      return []
    }
    return (data ?? []) as Shop[]
  },
  ['shops'],
  { revalidate: 604800, tags: [CACHE_TAGS.shops] }
)

/**
 * サイト共通設定（追従CTAの出し分け等）を取得。
 * 全カテゴリの layout から呼ばれるため、時間ベースの revalidate を付けると
 * 配下の全ページの ISR 間隔がその値まで短縮され Write Units が爆増する。
 * 反映は管理画面の updateSiteConfig が purgeTag(siteConfig) で即時に行うので、
 * ここはタグ無効化のみに任せる（revalidate: false）。
 */
export const getSiteConfig = unstable_cache(
  async (): Promise<SiteConfig | null> => {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
    if (error) {
      console.warn(`[queries] getSiteConfig failed, falling back to null: ${error.message}`)
      return null
    }
    return (data ?? null) as SiteConfig | null
  },
  ['site-config'],
  { revalidate: false, tags: [CACHE_TAGS.siteConfig] }
)

export async function getProductShopLinks(
  productType: string,
  productId: number
): Promise<ProductShopLink[]> {
  const { data, error } = await supabase
    .from('product_shop_links')
    .select('*')
    .eq('product_type', productType)
    .eq('product_id', productId)
  if (error) {
    console.warn(`[queries] getProductShopLinks(${productType}, ${productId}) failed, falling back to empty list: ${error.message}`)
  }
  if (error || !data) return []
  return data as ProductShopLink[]
}

export async function getAllProductShopLinksByType(
  productType: string
): Promise<ProductShopLink[]> {
  return getCachedShopLinksByType(productType)
}

const getCachedShopLinksByType = unstable_cache(
  async (productType: string): Promise<ProductShopLink[]> => {
    const { data, error } = await supabase
      .from('product_shop_links')
      .select('*')
      .eq('product_type', productType)
    if (error) {
      console.warn(`[queries] getCachedShopLinksByType(${productType}) failed, falling back to empty list: ${error.message}`)
      return []
    }
    return (data ?? []) as ProductShopLink[]
  },
  ['shop-links'],
  { revalidate: 604800, tags: [CACHE_TAGS.shopLinks] }
)

// ============================================================
// レビュー記事リンク
// ============================================================

export async function getIPhoneReviewsBySlug(modelSlug: string): Promise<ProductReview[]> {
  const { data, error } = await supabase
    .from('iphone_reviews')
    .select('*')
    .eq('model_slug', modelSlug)
  if (error) {
    console.warn(`[queries] getIPhoneReviewsBySlug(${modelSlug}) failed, falling back to empty list: ${error.message}`)
  }
  if (error || !data) return []
  return data as ProductReview[]
}

// ============================================================
// 関連記事リンク クリック数
// ============================================================

/** 指定ページから発生した関連記事クリック数を取得（1時間キャッシュ） */
export const getRelatedLinkClicks = unstable_cache(
  async (sourcePath: string): Promise<Record<string, number>> => {
    const { data, error } = await supabase
      .from('related_link_clicks')
      .select('dest_path, click_count')
      .eq('source_path', sourcePath)
    if (error) {
      console.warn(`[queries] getRelatedLinkClicks(${sourcePath}) failed, falling back to empty map: ${error.message}`)
    }
    if (error || !data) return {}
    const map: Record<string, number> = {}
    for (const row of data) {
      map[row.dest_path] = row.click_count
    }
    return map
  },
  ['related-link-clicks'],
  { revalidate: 86400, tags: ['related-link-clicks'] }
)

export async function getIPadReviewsBySlug(modelSlug: string): Promise<ProductReview[]> {
  const { data, error } = await supabase
    .from('ipad_reviews')
    .select('*')
    .eq('model_slug', modelSlug)
  if (error) {
    console.warn(`[queries] getIPadReviewsBySlug(${modelSlug}) failed, falling back to empty list: ${error.message}`)
  }
  if (error || !data) return []
  return data as ProductReview[]
}
