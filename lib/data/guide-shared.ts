// ============================================================
// ガイドページ共通定数（iphone / ipad / watch / macbook）
// ============================================================

import type { VendorCardItem } from '@/app/components/VendorCardGrid'

// ---------- ショップ比較カード: 共通ベースデータ ----------
type VendorCardBase = Omit<VendorCardItem, 'href' | 'ctaText'>

const VENDOR_CARD_BASES: VendorCardBase[] = [
  {
    name: 'イオシス',
    recommended: true,
    badgeText: '迷ったらココ！',
    tag: '保証延長サービス',
    specs: [
      { label: '価格', value: '◎' },
      { label: '保証期間', value: '3ヶ月' },
      { label: '赤ロム保証', value: '永久保証' },
      { label: 'バッテリー保証', value: '×' },
      { label: '実物写真', value: '×' },
      { label: '配送料', value: '640円' },
    ],
  },
  {
    name: 'にこスマ',
    tag: 'にこスマあんしん保険',
    specs: [
      { label: '価格', value: '○' },
      { label: '保証期間', value: '1年間' },
      { label: '赤ロム保証', value: '永久保証' },
      { label: 'バッテリー保証', value: '○' },
      { label: '実物写真', value: '○' },
      { label: '配送料', value: '無料' },
    ],
  },
  {
    name: 'ゲオ',
    tag: 'ゲオ中古モバイル保証',
    specs: [
      { label: '価格', value: '○' },
      { label: '保証期間', value: '30日間' },
      { label: '赤ロム保証', value: '永久保証' },
      { label: 'バッテリー保証', value: '○' },
      { label: '実物写真', value: '○' },
      { label: '配送料', value: '550円' },
    ],
  },
  {
    name: 'リコレ',
    tag: 'ビック月額スマホ保証',
    specs: [
      { label: '価格', value: '○' },
      { label: '保証期間', value: '30日間' },
      { label: '赤ロム保証', value: '3年間' },
      { label: 'バッテリー保証', value: '○' },
      { label: '実物写真', value: '○' },
      { label: '配送料', value: '550円' },
    ],
  },
  {
    name: 'じゃんぱら',
    tag: 'じゃんぱらあんしん保証',
    specs: [
      { label: '価格', value: '○' },
      { label: '保証期間', value: '3ヶ月' },
      { label: '赤ロム保証', value: '永久保証' },
      { label: 'バッテリー保証', value: '○' },
      { label: '実物写真', value: '○' },
      { label: '配送料', value: '770円' },
    ],
  },
  {
    name: 'Amazon整備済み品',
    specs: [
      { label: '価格', value: '○' },
      { label: '保証期間', value: '3ヶ月' },
      { label: '赤ロム保証', value: '出品者による' },
      { label: 'バッテリー保証', value: '×' },
      { label: '実物写真', value: '×' },
      { label: '配送料', value: '無料' },
    ],
  },
]

/** 共通ベースデータに製品固有のURL・CTAテキストを付与してカード配列を生成 */
export function buildVendorCards(
  urls: Record<string, string>,
  ctaText: string,
): VendorCardItem[] {
  return VENDOR_CARD_BASES.map((base) => ({
    ...base,
    href: urls[base.name] ?? '',
    ctaText,
  }))
}
