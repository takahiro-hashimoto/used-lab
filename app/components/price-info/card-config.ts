import type { ReactNode } from 'react'

// ============================================================
// price-info のランキング系カード（RankingSection / PriceDropSection）の
// カテゴリ別設定。
//
// 2つのセクションは同じカード（ifd-result-card）を使い、カテゴリごとの
// 違い（スペック行・サポート表記・CTA）も共通している。設定を1つに
// まとめて両方へ渡すことで、片方だけ直して食い違う事故を防ぐ。
// 各ページで定義し、値はすべて明示的に書く（コピペの取り残しを防ぐ
// EmbedCodeButton と同じ方針）。
// ============================================================

/** カードが読むフィールドだけの構造的型。各ページの ModelData がそのまま満たす */
export type PriceCardModel = {
  id: number
  name: string
  slug: string
  image: string
  releaseDate: string
  supportEnded: boolean
  currentPrice: number
  priceChange: number
  priceChangePercent: number
  /** AirPods には容量の概念が無い */
  storage?: string
  /** featureTags を持つのは iPhone / Pixel / Galaxy だけ */
  featureTags?: string[]
}

export type PriceCardCta = {
  href: string
  rel: string
  ariaLabel: string
  children: ReactNode
}

export type PriceCardConfig<M extends PriceCardModel> = {
  /** 見出しに出すカテゴリ名。例 'iPhone'・'iMac・Mac mini' */
  categoryLabel: string
  /** 画像と機種ページの基点。'iphone' → /images/iphone/… と /iphone/{slug}/ */
  categoryPath: string
  /** schema.org の brand（RankingSection のみ使用） */
  brand: string
  /** サポート中タグの文言。例 `OSサポート 2029年秋まで` / `macOSサポート対象` */
  supportTag: (m: M) => string
  /** 中古相場ラベルに容量を出す。容量の概念が無い AirPods だけ false */
  showStorage: boolean
  /** スペック定義リストの行。[ラベル, 値] の順に表示される */
  specs: (m: M) => Array<[string, string]>
  /** featureTags を表示する（フィールドを持つカテゴリのみ true） */
  showFeatureTags: boolean
  /** ショップ導線。URLが無い機種は null でボタンごと出さない */
  cta: (m: M) => PriceCardCta | null
}

/** "2025/9" → "2025年9月"。airpods / macbook / mac のスペック行で使う
 *  （iPhone / Pixel / Galaxy は各ページの cardFormat.ts に同じものがある） */
export function formatRelease(releaseDate: string): string {
  const [y, m] = releaseDate.split('/')
  return y && m ? `${y}年${m}月` : releaseDate
}
