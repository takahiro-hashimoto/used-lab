/**
 * iPhone 2機種比較ページの設定
 * 各比較ペアのスラッグ、対象モデル、SEOテキストを定義
 */

export type ComparePageConfig = {
  /** URL スラッグ（ディレクトリ名） */
  slug: string
  /** 左モデルの DB スラッグ */
  leftSlug: string
  /** 右モデルの DB スラッグ */
  rightSlug: string
  /** ページタイトル（SEO） */
  title: string
  /** ページ説明文（SEO） */
  description: string
}

export const COMPARE_PAGES: ComparePageConfig[] = [
  // 同世代 Standard vs Pro
  {
    slug: 'iphone13-13pro-compare',
    leftSlug: '13normal',
    rightSlug: '13pro',
    title: '中古iPhone 13と13 Proの違いを比較｜中古で買うならどっち？',
    description: 'iPhone 13と13 Proの違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。中古で買うならどっちがお得かを解説します。',
  },
  {
    slug: 'iphone14-14pro-compare',
    leftSlug: '14normal',
    rightSlug: '14pro',
    title: '中古iPhone 14と14 Proの違いを比較｜中古で買うならどっち？',
    description: 'iPhone 14と14 Proの違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。中古で買うならどっちがお得かを解説します。',
  },
  {
    slug: 'iphone15-15pro-compare',
    leftSlug: '15normal',
    rightSlug: '15pro',
    title: '中古iPhone 15と15 Proの違いを比較｜中古で買うならどっち？',
    description: 'iPhone 15と15 Proの違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。中古で買うならどっちがお得かを解説します。',
  },
  {
    slug: 'iphone16-16pro-compare',
    leftSlug: '16normal',
    rightSlug: '16pro',
    title: '中古iPhone 16と16 Proの違いを比較｜中古で買うならどっち？',
    description: 'iPhone 16と16 Proの違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。中古で買うならどっちがお得かを解説します。',
  },
  // 世代間 Standard
  {
    slug: 'iphone13-14-compare',
    leftSlug: '13normal',
    rightSlug: '14normal',
    title: '中古iPhone 13と14の違いを比較｜中古で買うならどっち？',
    description: 'iPhone 13と14の違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。世代間の進化と価格差を検証します。',
  },
  {
    slug: 'iphone14-15-compare',
    leftSlug: '14normal',
    rightSlug: '15normal',
    title: '中古iPhone 14と15の違いを比較｜中古で買うならどっち？',
    description: 'iPhone 14と15の違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。世代間の進化と価格差を検証します。',
  },
  {
    slug: 'iphone15-16-compare',
    leftSlug: '15normal',
    rightSlug: '16normal',
    title: '中古iPhone 15と16の違いを比較｜中古で買うならどっち？',
    description: 'iPhone 15と16の違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。世代間の進化と価格差を検証します。',
  },
  // 世代間 Pro
  {
    slug: 'iphone13pro-14pro-compare',
    leftSlug: '13pro',
    rightSlug: '14pro',
    title: '中古iPhone 13 Proと14 Proの違いを比較｜中古で買うならどっち？',
    description: 'iPhone 13 Proと14 Proの違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。世代間の進化と価格差を検証します。',
  },
  {
    slug: 'iphone14pro-15pro-compare',
    leftSlug: '14pro',
    rightSlug: '15pro',
    title: '中古iPhone 14 Proと15 Proの違いを比較｜中古で買うならどっち？',
    description: 'iPhone 14 Proと15 Proの違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。世代間の進化と価格差を検証します。',
  },
  {
    slug: 'iphone15pro-16pro-compare',
    leftSlug: '15pro',
    rightSlug: '16pro',
    title: '中古iPhone 15 Proと16 Proの違いを比較｜中古で買うならどっち？',
    description: 'iPhone 15 Proと16 Proの違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。世代間の進化と価格差を検証します。',
  },
  // 特殊比較
  {
    slug: 'iphone16e-se3-compare',
    leftSlug: '16e-se',
    rightSlug: 'se3',
    title: '中古iPhone 16eとSE(第3世代)の違いを比較｜中古で買うならどっち？',
    description: 'iPhone 16eとSE(第3世代)の違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。エントリーモデル対決を検証します。',
  },
  {
    slug: 'iphone16plus-air-compare',
    leftSlug: '16plus',
    rightSlug: 'air',
    title: '中古iPhone 16 PlusとiPhone Airの違いを比較｜買うならどっち？',
    description: 'iPhone 16 PlusとiPhone Airの違いを処理性能・カメラ・バッテリー・中古価格など6項目で比較。大画面＆軽量モデル対決を検証します。',
  },
]

/** スラッグからコンフィグを取得 */
export function getCompareConfig(slug: string): ComparePageConfig | undefined {
  return COMPARE_PAGES.find((p) => p.slug === slug)
}
