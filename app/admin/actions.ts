'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { CATEGORIES, type CategoryConfig, type FieldDef } from './field-definitions'

// ============================================================
// 認証
// ============================================================

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  const expected = process.env.ADMIN_PASSWORD

  if (!password || !expected || password !== expected) {
    return { error: 'パスワードが正しくありません' }
  }

  const token = process.env.ADMIN_SESSION_TOKEN!
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24h
    path: '/',
  })

  redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin/login')
}

// ============================================================
// ヘルパー
// ============================================================

function getCategoryConfig(categoryKey: string): CategoryConfig | null {
  return CATEGORIES.find((c) => c.key === categoryKey) || null
}

/** FormData → DB用オブジェクトに変換 */
function parseFormData(fields: FieldDef[], formData: FormData): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const field of fields) {
    if (field.key === 'id') continue // id は自動採番

    const raw = formData.get(field.key)

    switch (field.type) {
      case 'boolean':
        result[field.key] = raw === 'on' || raw === 'true'
        break
      case 'number': {
        const str = (raw as string)?.trim()
        result[field.key] = str ? Number(str) : null
        break
      }
      case 'json': {
        const str = (raw as string)?.trim()
        if (!str) {
          result[field.key] = null
        } else {
          try {
            result[field.key] = JSON.parse(str)
          } catch {
            result[field.key] = null
          }
        }
        break
      }
      default: {
        const str = (raw as string)?.trim()
        result[field.key] = str || null
        break
      }
    }
  }

  return result
}

// ============================================================
// CRUD
// ============================================================

export async function getModels(categoryKey: string) {
  const config = getCategoryConfig(categoryKey)
  if (!config) return []

  const { data, error } = await supabaseAdmin
    .from(config.table)
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error(`getModels(${categoryKey}):`, error.message)
    return []
  }
  return data || []
}

export async function getModelById(categoryKey: string, id: number) {
  const config = getCategoryConfig(categoryKey)
  if (!config) return null

  const { data, error } = await supabaseAdmin
    .from(config.table)
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data
}

export async function createModel(categoryKey: string, formData: FormData) {
  const config = getCategoryConfig(categoryKey)
  if (!config) return { error: 'カテゴリが見つかりません' }

  const record = parseFormData(config.fields, formData)

  const { error } = await supabaseAdmin
    .from(config.table)
    .insert(record)

  if (error) {
    console.error(`createModel(${categoryKey}):`, error.message)
    return { error: `保存に失敗しました: ${error.message}` }
  }

  revalidatePath('/', 'layout')
  redirect(`/admin/${categoryKey}`)
}

export async function updateModel(categoryKey: string, id: number, formData: FormData) {
  const config = getCategoryConfig(categoryKey)
  if (!config) return { error: 'カテゴリが見つかりません' }

  const record = parseFormData(config.fields, formData)

  const { error } = await supabaseAdmin
    .from(config.table)
    .update(record)
    .eq('id', id)

  if (error) {
    console.error(`updateModel(${categoryKey}, ${id}):`, error.message)
    return { error: `更新に失敗しました: ${error.message}` }
  }

  revalidatePath('/', 'layout')
  redirect(`/admin/${categoryKey}`)
}

// ============================================================
// iPad アクセサリ互換性
// ============================================================

/** iPad モデル一覧を取得（互換性チェックボックス用） */
export async function getIPadModelsForSelect(): Promise<{ id: number; model: string }[]> {
  const { data, error } = await supabaseAdmin
    .from('ipad_models')
    .select('id, model')
    .order('id', { ascending: true })

  if (error) {
    console.error('getIPadModelsForSelect:', error.message)
    return []
  }
  return (data || []) as { id: number; model: string }[]
}

/** アクセサリに紐づく iPad モデル ID 一覧を取得 */
export async function getAccessoryCompatibility(accessoryId: number): Promise<number[]> {
  const { data, error } = await supabaseAdmin
    .from('ipad_accessory_compatibility')
    .select('ipad_model_id')
    .eq('accessory_id', accessoryId)

  if (error) {
    console.error('getAccessoryCompatibility:', error.message)
    return []
  }
  return (data || []).map((row: { ipad_model_id: number }) => row.ipad_model_id)
}

/** 互換性を一括更新（既存を全削除 → チェック済みを INSERT） */
export async function updateAccessoryCompatibility(
  accessoryId: number,
  ipadModelIds: number[]
): Promise<{ error: string } | void> {
  // 既存の互換性レコードを全削除
  const { error: deleteError } = await supabaseAdmin
    .from('ipad_accessory_compatibility')
    .delete()
    .eq('accessory_id', accessoryId)

  if (deleteError) {
    console.error('updateAccessoryCompatibility (delete):', deleteError.message)
    return { error: `互換性の更新に失敗しました: ${deleteError.message}` }
  }

  // 新しい互換性レコードを INSERT
  if (ipadModelIds.length > 0) {
    const rows = ipadModelIds.map((ipadModelId) => ({
      accessory_id: accessoryId,
      ipad_model_id: ipadModelId,
    }))

    const { error: insertError } = await supabaseAdmin
      .from('ipad_accessory_compatibility')
      .insert(rows)

    if (insertError) {
      console.error('updateAccessoryCompatibility (insert):', insertError.message)
      return { error: `互換性の保存に失敗しました: ${insertError.message}` }
    }
  }

  revalidatePath('/', 'layout')
}

// ============================================================
// ECショップリンク（product_shop_links）
// ============================================================

/** ショップ一覧を取得 */
export async function getShopsForAdmin(): Promise<{ id: number; shop: string; shop_key: string }[]> {
  const { data, error } = await supabaseAdmin
    .from('shops')
    .select('id, shop, shop_key')
    .order('id', { ascending: true })

  if (error) {
    console.error('getShopsForAdmin:', error.message)
    return []
  }
  return (data || []) as { id: number; shop: string; shop_key: string }[]
}

/** 商品のショップリンク一覧を取得 */
export async function getProductShopLinksForAdmin(
  productType: string,
  productId: number
): Promise<{ shop_id: number; url: string }[]> {
  const { data, error } = await supabaseAdmin
    .from('product_shop_links')
    .select('shop_id, url')
    .eq('product_type', productType)
    .eq('product_id', productId)

  if (error) {
    console.error('getProductShopLinksForAdmin:', error.message)
    return []
  }
  return (data || []) as { shop_id: number; url: string }[]
}

/** ショップリンクを一括更新（既存を全削除 → INSERT） */
export async function updateProductShopLinks(
  productType: string,
  productId: number,
  links: { shop_id: number; url: string }[]
): Promise<{ error: string } | void> {
  // 既存レコードを全削除
  const { error: deleteError } = await supabaseAdmin
    .from('product_shop_links')
    .delete()
    .eq('product_type', productType)
    .eq('product_id', productId)

  if (deleteError) {
    console.error('updateProductShopLinks (delete):', deleteError.message)
    return { error: `ショップリンクの更新に失敗しました: ${deleteError.message}` }
  }

  // URL が入力されているもののみ INSERT
  const validLinks = links.filter((l) => l.url.trim())
  if (validLinks.length > 0) {
    const rows = validLinks.map((l) => ({
      product_type: productType,
      product_id: productId,
      shop_id: l.shop_id,
      url: l.url.trim(),
    }))

    const { error: insertError } = await supabaseAdmin
      .from('product_shop_links')
      .insert(rows)

    if (insertError) {
      console.error('updateProductShopLinks (insert):', insertError.message)
      return { error: `ショップリンクの保存に失敗しました: ${insertError.message}` }
    }
  }

  revalidatePath('/', 'layout')
}

export async function getModelCount(categoryKey: string): Promise<number> {
  const config = getCategoryConfig(categoryKey)
  if (!config) return 0

  const { count, error } = await supabaseAdmin
    .from(config.table)
    .select('*', { count: 'exact', head: true })

  if (error) return 0
  return count || 0
}
