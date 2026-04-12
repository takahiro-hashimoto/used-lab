import { unstable_cache } from 'next/cache'
import { supabase } from './supabase'
import type {
  IPhoneModel, IPadModel, WatchModel, MacBookModel, AirPodsModel,
  Shop, ProductShopLink, ProductReview,
  IPhonePriceLog, IPadPriceLog, WatchPriceLog, MacBookPriceLog, AirPodsPriceLog,
  MvnoPlan,
  MvnoProvider,
  IPadAccessory, IPadAccessoryCompatibility,
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
  iphonePriceLogs: 'iphone-price-logs',
  ipadPriceLogs: 'ipad-price-logs',
  watchPriceLogs: 'watch-price-logs',
  macbookPriceLogs: 'macbook-price-logs',
  airpodsPriceLogs: 'airpods-price-logs',
  shops: 'shops',
  shopLinks: 'shop-links',
  mvno: 'mvno',
  news: 'news',
  ipadAccessories: 'ipad-accessories',
} as const

/** カテゴリキー → 関連キャッシュタグのマッピング */
export const CATEGORY_CACHE_TAGS: Record<string, string[]> = {
  iphone: [CACHE_TAGS.iphoneModels, CACHE_TAGS.iphonePriceLogs],
  ipad: [CACHE_TAGS.ipadModels, CACHE_TAGS.ipadPriceLogs, CACHE_TAGS.ipadAccessories],
  watch: [CACHE_TAGS.watchModels, CACHE_TAGS.watchPriceLogs],
  macbook: [CACHE_TAGS.macbookModels, CACHE_TAGS.macbookPriceLogs],
  airpods: [CACHE_TAGS.airpodsModels, CACHE_TAGS.airpodsPriceLogs],
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
        if (error) throw new Error(`getBySlug(${table}, ${slug}): ${error.message}`)
        return (data ?? null) as T | null
      },
      [`${table}-by-slug`],
      { revalidate: 3600, tags: [tag] }
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
      { revalidate: 3600, tags: [tag] }
    ),

    /** activeFieldフィルタなしで全モデルを取得（サポート終了モデル含む） */
    getAllIncludingEnded: unstable_cache(
      async (): Promise<T[]> => {
        const { data, error } = await supabase.from(table).select('*').eq('show', 1).order('id', { ascending: true })
        if (error) throw new Error(`getAllIncludingEnded(${table}): ${error.message}`)
        return (data ?? []) as T[]
      },
      [`${table}-all-including-ended`],
      { revalidate: 3600, tags: [tag] }
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
      { revalidate: 3600, tags: [tag] }
    ),
  }
}

/** 価格ログテーブル用の共通クエリを生成（キャッシュ付き） */
function createPriceLogQueries<T extends { model_id: number }>(table: string, tag: string) {
  return {
    getByModelId: unstable_cache(
      async (modelId: number): Promise<T[]> => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('model_id', modelId)
          .order('logged_at', { ascending: true })
        if (error) throw new Error(`getByModelId(${table}, ${modelId}): ${error.message}`)
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

    /** 複数モデルの価格ログを一括取得し、model_id ごとにグループ化して返す（自動ページネーション）
     *  データ量が2MBを超える場合があるためunstable_cacheは使わず、ページレベルのrevalidateに委ねる */
    getAllByModelIds: async (modelIds: number[]): Promise<Record<number, T[]>> => {
      if (modelIds.length === 0) return {}
      const PAGE_SIZE = 1000
      const allRows: T[] = []
      let from = 0
      while (true) {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .in('model_id', modelIds)
          .order('logged_at', { ascending: true })
          .range(from, from + PAGE_SIZE - 1)
        if (error || !data || data.length === 0) break
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

// iPad
export const getIPadModelBySlug = iPadModels.getBySlug
export const getAllIPadModels = iPadModels.getAll
export const getAllIPadModelsIncludingEnded = iPadModels.getAllIncludingEnded
export const getAllIPadSlugs = iPadModels.getAllSlugs
export const getIPadPriceLogsByModelId = iPadPriceLogs.getByModelId
export const getLatestIPadPriceLog = iPadPriceLogs.getLatest
export const getAllIPadPriceLogsByModelIds = iPadPriceLogs.getAllByModelIds

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
  { revalidate: 3600, tags: [CACHE_TAGS.ipadAccessories] }
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
  { revalidate: 3600, tags: [CACHE_TAGS.ipadAccessories] }
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
  { revalidate: 3600, tags: [CACHE_TAGS.ipadAccessories] }
)

// Watch
export const getWatchModelBySlug = watchModels.getBySlug
export const getAllWatchModels = watchModels.getAll
export const getAllWatchModelsIncludingEnded = watchModels.getAllIncludingEnded
export const getAllWatchSlugs = watchModels.getAllSlugs
export const getWatchPriceLogsByModelId = watchPriceLogs.getByModelId
export const getLatestWatchPriceLog = watchPriceLogs.getLatest
export const getAllWatchPriceLogsByModelIds = watchPriceLogs.getAllByModelIds

// MacBook
export const getMacBookModelBySlug = macBookModels.getBySlug
export const getAllMacBookModels = macBookModels.getAll
export const getAllMacBookModelsIncludingEnded = macBookModels.getAllIncludingEnded
export const getAllMacBookSlugs = macBookModels.getAllSlugs
export const getMacBookPriceLogsByModelId = macBookPriceLogs.getByModelId
export const getLatestMacBookPriceLog = macBookPriceLogs.getLatest
export const getAllMacBookPriceLogsByModelIds = macBookPriceLogs.getAllByModelIds

// AirPods
export const getAirPodsModelBySlug = airPodsModels.getBySlug
export const getAllAirPodsModels = airPodsModels.getAll
export const getAllAirPodsSlugs = airPodsModels.getAllSlugs
export const getAirPodsPriceLogsByModelId = airPodsPriceLogs.getByModelId
export const getLatestAirPodsPriceLog = airPodsPriceLogs.getLatest
export const getAllAirPodsPriceLogsByModelIds = airPodsPriceLogs.getAllByModelIds

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
  { revalidate: 3600, tags: [CACHE_TAGS.mvno] }
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
  { revalidate: 3600, tags: [CACHE_TAGS.mvno] }
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
  { revalidate: 3600, tags: [CACHE_TAGS.mvno] }
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
  { revalidate: 3600, tags: [CACHE_TAGS.mvno] }
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

export const getShops = unstable_cache(
  async (): Promise<Shop[]> => {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .order('id', { ascending: true })
    if (error) throw new Error(`getShops: ${error.message}`)
    return (data ?? []) as Shop[]
  },
  ['shops'],
  { revalidate: 3600, tags: [CACHE_TAGS.shops] }
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
    if (error) throw new Error(`getCachedShopLinksByType(${productType}): ${error.message}`)
    return (data ?? []) as ProductShopLink[]
  },
  ['shop-links'],
  { revalidate: 3600, tags: [CACHE_TAGS.shopLinks] }
)

// ============================================================
// レビュー記事リンク
// ============================================================

export async function getIPhoneReviewsBySlug(modelSlug: string): Promise<ProductReview[]> {
  const { data, error } = await supabase
    .from('iphone_reviews')
    .select('*')
    .eq('model_slug', modelSlug)
  if (error || !data) return []
  return data as ProductReview[]
}

// ============================================================
// 関連記事リンク クリック数
// ============================================================

/** 指定ページから発生した関連記事クリック数を取得 */
export async function getRelatedLinkClicks(
  sourcePath: string
): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('related_link_clicks')
    .select('dest_path, click_count')
    .eq('source_path', sourcePath)
  if (error || !data) return {}
  const map: Record<string, number> = {}
  for (const row of data) {
    map[row.dest_path] = row.click_count
  }
  return map
}

export async function getIPadReviewsBySlug(modelSlug: string): Promise<ProductReview[]> {
  const { data, error } = await supabase
    .from('ipad_reviews')
    .select('*')
    .eq('model_slug', modelSlug)
  if (error || !data) return []
  return data as ProductReview[]
}
