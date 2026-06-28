// Amazon整備済み品ページのカテゴリ内タイプ別フィルタ定義（SDK非依存・サーバ/クライアント両用）

export type SubFilter = { value: string; label: string }

/** カテゴリ別「おすすめ中古まとめ」への内部リンク（H2下の説明文で使用） */
export const RENEWED_CATEGORY_LINKS: Record<string, { href: string; label: string }> = {
  iphone: { href: '/iphone/', label: 'おすすめの中古iPhoneまとめ' },
  ipad: { href: '/ipad/', label: 'おすすめの中古iPadまとめ' },
  mac: { href: '/macbook/', label: 'おすすめの中古MacBookまとめ' },
  watch: { href: '/watch/', label: 'おすすめの中古Apple Watchまとめ' },
  airpods: { href: '/airpods/', label: 'おすすめの中古AirPodsまとめ' },
}

/** 表示用にタイトルから「【整備済み品】」表記を取り除く（ページ全体が整備済み品のため冗長） */
export function cleanRenewedTitle(title: string): string {
  return title
    .replace(/^\s*【\s*整備済み品\s*】\s*/, '') // 先頭の【整備済み品】
    .replace(/\s*[（(]\s*整備済み品\s*[)）]\s*$/, '') // 末尾の(整備済み品)
    .trim()
}

/** カテゴリごとのタイプ別フィルタ（表示順） */
export const RENEWED_SUBFILTERS: Record<string, SubFilter[]> = {
  iphone: [
    { value: 'normal', label: 'ノーマル' },
    { value: 'plus', label: 'Plus' },
    { value: 'se', label: 'SE' },
    { value: 'pro', label: 'Pro' },
    { value: 'promax', label: 'Pro Max' },
  ],
  ipad: [
    { value: 'mini', label: 'mini' },
    { value: 'normal', label: '無印' },
    { value: 'air', label: 'Air' },
    { value: 'pro', label: 'Pro' },
  ],
  mac: [
    { value: 'macbookpro', label: 'MacBook Pro' },
    { value: 'macbookair', label: 'MacBook Air' },
    { value: 'imac', label: 'iMac' },
    { value: 'macmini', label: 'Mac mini' },
  ],
  watch: [
    { value: 'se', label: 'SE' },
    { value: 'normal', label: 'ノーマル' },
    { value: 'ultra', label: 'Ultra' },
  ],
  airpods: [
    { value: 'normal', label: '無印' },
    { value: 'pro', label: 'Pro' },
    { value: 'max', label: 'Max' },
  ],
}

/** タイトルからカテゴリ内のタイプ値を判定（フィルタの value に対応） */
export function renewedSubType(title: string, category: string): string {
  switch (category) {
    case 'iphone':
      if (/Pro\s*Max/i.test(title)) return 'promax'
      if (/Pro/i.test(title)) return 'pro'
      if (/Plus/i.test(title)) return 'plus'
      if (/\bSE\b/i.test(title)) return 'se'
      return 'normal'
    case 'ipad':
      if (/iPad\s*Pro/i.test(title)) return 'pro'
      if (/iPad\s*Air/i.test(title)) return 'air'
      if (/iPad\s*mini/i.test(title)) return 'mini'
      return 'normal'
    case 'mac':
      if (/MacBook\s*Pro/i.test(title)) return 'macbookpro'
      if (/MacBook\s*Air/i.test(title)) return 'macbookair'
      if (/iMac/i.test(title)) return 'imac'
      if (/Mac\s*mini/i.test(title)) return 'macmini'
      return 'other' // Mac Studio / Mac Pro 等
    case 'watch':
      if (/Ultra/i.test(title)) return 'ultra'
      if (/\bSE\b/i.test(title)) return 'se'
      return 'normal'
    case 'airpods':
      if (/Pro/i.test(title)) return 'pro'
      if (/Max/i.test(title)) return 'max'
      return 'normal'
    default:
      return 'other'
  }
}
