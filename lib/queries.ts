import { supabase } from './supabase'
import type {
  IPhoneModel, IPadModel, WatchModel, MacBookModel, AirPodsModel,
  Shop, ProductShopLink,
  IPhonePriceLog, IPadPriceLog, WatchPriceLog, MacBookPriceLog, AirPodsPriceLog,
} from './types'

// ============================================================
// ファクトリ関数
// ============================================================

/** モデルテーブル用の共通クエリを生成 */
function createModelQueries<T>(table: string) {
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
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('show', 1)
        .order('id', { ascending: true })
      if (error || !data) return []
      return data as T[]
    },

    async getAllSlugs(): Promise<string[]> {
      const { data, error } = await supabase
        .from(table)
        .select('slug')
        .eq('show', 1)
      if (error || !data) return []
      return data.map((d) => d.slug)
    },
  }
}

/** 価格ログテーブル用の共通クエリを生成 */
function createPriceLogQueries<T>(table: string) {
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
  }
}

// ============================================================
// 各製品のクエリインスタンス
// ============================================================

const iPhoneModels = createModelQueries<IPhoneModel>('iphone_models')
const iPhonePriceLogs = createPriceLogQueries<IPhonePriceLog>('iphone_price_logs')

const iPadModels = createModelQueries<IPadModel>('ipad_models')
const iPadPriceLogs = createPriceLogQueries<IPadPriceLog>('ipad_price_logs')

const watchModels = createModelQueries<WatchModel>('watch_models')
const watchPriceLogs = createPriceLogQueries<WatchPriceLog>('watch_price_logs')

const macBookModels = createModelQueries<MacBookModel>('macbook_models')
const macBookPriceLogs = createPriceLogQueries<MacBookPriceLog>('macbook_price_logs')

const airPodsModels = createModelQueries<AirPodsModel>('airpods_models')
const airPodsPriceLogs = createPriceLogQueries<AirPodsPriceLog>('airpods_price_logs')

// ============================================================
// 名前付きエクスポート（後方互換）
// ============================================================

// iPhone
export const getIPhoneModelBySlug = iPhoneModels.getBySlug
export const getAllIPhoneModels = iPhoneModels.getAll
export const getAllIPhoneSlugs = iPhoneModels.getAllSlugs
export const getPriceLogsByModelId = iPhonePriceLogs.getByModelId
export const getLatestPriceLog = iPhonePriceLogs.getLatest

// iPad
export const getIPadModelBySlug = iPadModels.getBySlug
export const getAllIPadModels = iPadModels.getAll
export const getAllIPadSlugs = iPadModels.getAllSlugs
export const getIPadPriceLogsByModelId = iPadPriceLogs.getByModelId
export const getLatestIPadPriceLog = iPadPriceLogs.getLatest

// Watch
export const getWatchModelBySlug = watchModels.getBySlug
export const getAllWatchModels = watchModels.getAll
export const getAllWatchSlugs = watchModels.getAllSlugs
export const getWatchPriceLogsByModelId = watchPriceLogs.getByModelId
export const getLatestWatchPriceLog = watchPriceLogs.getLatest

// MacBook
export const getMacBookModelBySlug = macBookModels.getBySlug
export const getAllMacBookModels = macBookModels.getAll
export const getAllMacBookSlugs = macBookModels.getAllSlugs
export const getMacBookPriceLogsByModelId = macBookPriceLogs.getByModelId
export const getLatestMacBookPriceLog = macBookPriceLogs.getLatest

// AirPods
export const getAirPodsModelBySlug = airPodsModels.getBySlug
export const getAllAirPodsModels = airPodsModels.getAll
export const getAllAirPodsSlugs = airPodsModels.getAllSlugs
export const getAirPodsPriceLogsByModelId = airPodsPriceLogs.getByModelId
export const getLatestAirPodsPriceLog = airPodsPriceLogs.getLatest

// ============================================================
// 共通クエリ（製品横断）
// ============================================================

export async function getShops(): Promise<Shop[]> {
  const { data, error } = await supabase
    .from('shops')
    .select('*')
    .order('id', { ascending: true })
  if (error || !data) return []
  return data as Shop[]
}

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
  const { data, error } = await supabase
    .from('product_shop_links')
    .select('*')
    .eq('product_type', productType)
  if (error || !data) return []
  return data as ProductShopLink[]
}
