/**
 * フィルター診断コンポーネント共通型定義
 */

/** ショップリンク（product_shop_links の簡易型） */
export type ShopLink = {
  product_id: number
  shop_id: number
  url: string
}

/** 用途オプション（STEP 1） */
export type PurposeOption<K extends string> = {
  key: K
  icon: string
  label: string
  desc: string
}

/** 予算オプション（STEP 2） */
export type BudgetOption<K extends string> = {
  key: K
  label: string
  desc: string
}
