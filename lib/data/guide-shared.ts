// ============================================================
// ガイドページ共通定数（iphone / ipad / watch / macbook）
// ============================================================

import type { VendorCardItem } from '@/app/components/VendorCardGrid'
import type { Shop } from '@/lib/types'

// ---------- DB shops → VendorCardItem 変換 ----------

type ProductUrlKey = 'url' | 'ipad_url' | 'watch_url' | 'macbook_url' | 'airpods_url'

/** Shop レコードから VendorCardGrid 用のスペック配列を組み立てる */
function buildSpecsFromShop(shop: Shop): { label: string; value: string }[] {
  return [
    { label: '価格', value: shop.price || '–' },
    { label: '保証期間', value: shop.support || '–' },
    { label: '赤ロム保証', value: shop.block || '–' },
    { label: 'バッテリー保証', value: shop.battery || '×' },
    { label: '実物写真', value: shop.photo || '×' },
    { label: '配送料', value: shop.postage || '–' },
  ]
}

type BuildOptions = {
  /** 非表示にする shop_key の配列 */
  exclude?: string[]
  /** 先頭に並べたい shop_key の配列（指定順で先頭に、残りは元の並び順） */
  priorityOrder?: string[]
}

/**
 * DB の shops 配列から VendorCardItem[] を生成する。
 * urlKey で指定した列が NULL でないショップだけを返す。
 */
export function buildVendorCardsFromShops(
  shops: Shop[],
  urlKey: ProductUrlKey,
  ctaText: string,
  options?: BuildOptions,
): VendorCardItem[] {
  const { exclude = [], priorityOrder = [] } = options ?? {}

  let filtered = shops.filter((s) => s[urlKey] != null && !exclude.includes(s.shop_key))

  if (priorityOrder.length > 0) {
    const priorityMap = new Map(priorityOrder.map((key, i) => [key, i]))
    filtered = [...filtered].sort((a, b) => {
      const pa = priorityMap.get(a.shop_key) ?? Infinity
      const pb = priorityMap.get(b.shop_key) ?? Infinity
      return pa - pb
    })
  }

  return filtered.map((s) => ({
    name: s.shop,
    recommended: s.shop_key === 'iosys',
    tag: s.extension_name && s.extension_name !== '-' ? s.extension_name : undefined,
    specs: buildSpecsFromShop(s),
    href: s[urlKey]!,
    ctaText,
  }))
}
