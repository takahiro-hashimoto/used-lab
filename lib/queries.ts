import { supabase } from './supabase'
import type { IPhoneModel, Shop, ProductShopLink, IPhonePriceLog } from './types'

export async function getIPhoneModelBySlug(slug: string): Promise<IPhoneModel | null> {
  const { data, error } = await supabase
    .from('iphone_models')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as IPhoneModel
}

export async function getAllIPhoneModels(): Promise<IPhoneModel[]> {
  const { data, error } = await supabase
    .from('iphone_models')
    .select('*')
    .eq('show', 1)
    .order('id', { ascending: true })

  if (error || !data) return []
  return data as IPhoneModel[]
}

export async function getAllIPhoneSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('iphone_models')
    .select('slug')
    .eq('show', 1)

  if (error || !data) return []
  return data.map((d) => d.slug)
}

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

export async function getPriceLogsByModelId(
  modelId: number
): Promise<IPhonePriceLog[]> {
  const { data, error } = await supabase
    .from('iphone_price_logs')
    .select('*')
    .eq('model_id', modelId)
    .order('logged_at', { ascending: true })

  if (error || !data) return []
  return data as IPhonePriceLog[]
}

export async function getLatestPriceLog(
  modelId: number
): Promise<IPhonePriceLog | null> {
  const { data, error } = await supabase
    .from('iphone_price_logs')
    .select('*')
    .eq('model_id', modelId)
    .order('logged_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error || !data) return null
  return data as IPhonePriceLog
}
