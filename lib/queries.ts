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
// ファクトリ関数
// ============================================================

/**
 * モデルテーブル用の共通クエリを生成
 * @param activeField 現役判定カラム — NULL なら現役と判断（指定なしの場合フィルタなし）
 */
function createModelQueries<T>(table: string, activeField?: string) {
  return {
    async getBySlug(slug: string): Promise<T | null> {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('slug', slug)
        .single()
      if (error || !data) return null
      return data as T
    },

    async getAll(): Promise<T[]> {
      let query = supabase.from(table).select('*')
      if (activeField) query = query.is(activeField, null)
      const { data, error } = await query.order('id', { ascending: true })
      if (error || !data) return []
      return data as T[]
    },

    /** activeFieldフィルタなしで全モデルを取得（サポート終了モデル含む） */
    async getAllIncludingEnded(): Promise<T[]> {
      const { data, error } = await supabase.from(table).select('*').order('id', { ascending: true })
      if (error || !data) return []
      return data as T[]
    },

    async getAllSlugs(): Promise<string[]> {
      let query = supabase.from(table).select('slug')
      if (activeField) query = query.is(activeField, null)
      const { data, error } = await query
      if (error || !data) return []
      return data.map((d) => d.slug)
    },
  }
}

/** 価格ログテーブル用の共通クエリを生成 */
function createPriceLogQueries<T extends { model_id: number }>(table: string) {
  return {
    async getByModelId(modelId: number): Promise<T[]> {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('model_id', modelId)
        .order('logged_at', { ascending: true })
      if (error || !data) return []
      return data as T[]
    },

    async getLatest(modelId: number): Promise<T | null> {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('model_id', modelId)
        .order('logged_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      if (error || !data) return null
      return data as T
    },

    /** 複数モデルの価格ログを一括取得し、model_id ごとにグループ化して返す（自動ページネーション） */
    async getAllByModelIds(modelIds: number[]): Promise<Map<number, T[]>> {
      if (modelIds.length === 0) return new Map()
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
      const map = new Map<number, T[]>()
      for (const row of allRows) {
        const arr = map.get(row.model_id) || []
        arr.push(row)
        map.set(row.model_id, arr)
      }
      return map
    },
  }
}

// ============================================================
// 各製品のクエリインスタンス
// ============================================================

const iPhoneModels = createModelQueries<IPhoneModel>('iphone_models', 'last_ios')
const iPhonePriceLogs = createPriceLogQueries<IPhonePriceLog>('iphone_price_logs')

const iPadModels = createModelQueries<IPadModel>('ipad_models', 'last_ipados')
const iPadPriceLogs = createPriceLogQueries<IPadPriceLog>('ipad_price_logs')

const watchModels = createModelQueries<WatchModel>('watch_models', 'last_watchos')
const watchPriceLogs = createPriceLogQueries<WatchPriceLog>('watch_price_logs')

const macBookModels = createModelQueries<MacBookModel>('macbook_models', 'last_macos')
const macBookPriceLogs = createPriceLogQueries<MacBookPriceLog>('macbook_price_logs')

// AirPods には「最終対応OS」がないためフィルタなし（全件表示）
const airPodsModels = createModelQueries<AirPodsModel>('airpods_models')
const airPodsPriceLogs = createPriceLogQueries<AirPodsPriceLog>('airpods_price_logs')

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
export async function getAllIPadAccessories(): Promise<IPadAccessory[]> {
  const { data, error } = await supabase
    .from('ipad_accessories')
    .select('*')
    .order('display_order', { ascending: true })
  if (error || !data) return []
  return data as IPadAccessory[]
}

export async function getAllIPadAccessoryCompatibility(): Promise<IPadAccessoryCompatibility[]> {
  const { data, error } = await supabase
    .from('ipad_accessory_compatibility')
    .select('*')
  if (error || !data) return []
  return data as IPadAccessoryCompatibility[]
}

export async function getIPadAccessoriesByModelId(modelId: number): Promise<IPadAccessory[]> {
  const { data, error } = await supabase
    .from('ipad_accessory_compatibility')
    .select('accessory_id')
    .eq('ipad_model_id', modelId)
  if (error || !data) return []

  const accessoryIds = data.map((d) => d.accessory_id)
  if (accessoryIds.length === 0) return []

  const { data: accessories, error: accErr } = await supabase
    .from('ipad_accessories')
    .select('*')
    .in('id', accessoryIds)
    .order('display_order', { ascending: true })
  if (accErr || !accessories) return []
  return accessories as IPadAccessory[]
}

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
export async function getMvnoPlans(): Promise<MvnoPlan[]> {
  const { data, error } = await supabase
    .from('mvno_plans')
    .select('*')
    .order('provider_slug', { ascending: true })
    .order('display_order', { ascending: true })
  if (error || !data) return []
  return data as MvnoPlan[]
}

/** 事業者スラッグでプラン取得 */
export async function getMvnoPlansByProvider(providerSlug: string): Promise<MvnoPlan[]> {
  const { data, error } = await supabase
    .from('mvno_plans')
    .select('*')
    .eq('provider_slug', providerSlug)
    .order('display_order', { ascending: true })
  if (error || !data) return []
  return data as MvnoPlan[]
}

/** provider_slug の一覧を取得（重複なし） */
export async function getMvnoProviderSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('mvno_plans')
    .select('provider_slug')
  if (error || !data) return []
  return [...new Set(data.map((d) => d.provider_slug))]
}

// ============================================================
// MVNO 事業者（mvno_providers テーブル）
// ============================================================

/** 公開中の事業者を表示順で取得 */
export async function getMvnoProviders(): Promise<MvnoProvider[]> {
  const { data, error } = await supabase
    .from('mvno_providers')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })
  if (error || !data) return []
  return data as MvnoProvider[]
}

// ============================================================
// 共通クエリ（製品横断）
// ============================================================

export const getShops = unstable_cache(
  async (): Promise<Shop[]> => {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .order('id', { ascending: true })
    if (error || !data) return []
    return data as Shop[]
  },
  ['shops'],
  { revalidate: 3600 } // 1時間キャッシュ
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
    if (error || !data) return []
    return data as ProductShopLink[]
  },
  ['shop-links'],
  { revalidate: 3600 } // 1時間キャッシュ
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

export async function getIPadReviewsBySlug(modelSlug: string): Promise<ProductReview[]> {
  const { data, error } = await supabase
    .from('ipad_reviews')
    .select('*')
    .eq('model_slug', modelSlug)
  if (error || !data) return []
  return data as ProductReview[]
}
