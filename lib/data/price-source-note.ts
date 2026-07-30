// ============================================
// 中古相場の算出方法についての説明文（一元管理）
// ============================================
// カテゴリトップの詳細解説・各カテゴリの価格情報ページなど、
// 「中古相場の算出方法について」を掲載する全箇所で共通利用する。
// 文言はこの1ファイルで管理し、カテゴリ別に異なる部分（取得元ショップ・
// 相場算出の対象モデル）だけを変数化する。

export type PriceCategory = 'iphone' | 'ipad' | 'watch' | 'airpods' | 'macbook' | 'pixel' | 'galaxy'

type PriceSourceParts = {
  /** 取得元ショップの説明（例: イオシス・ゲオ・じゃんぱらの3ショップ（いずれも楽天市場出店）） */
  shops: string
  /** 相場算出の対象モデル（例: 各機種の最小容量モデル（例：iPhone 15なら128GB）） */
  modelBasis: string
}

const PRICE_SOURCE_PARTS: Record<PriceCategory, PriceSourceParts> = {
  iphone: {
    shops: 'イオシス・ゲオ・じゃんぱらの3ショップ（いずれも楽天市場出店）',
    modelBasis: '各機種の最小容量モデル（例：iPhone 15なら128GB）',
  },
  pixel: {
    shops: 'イオシス・ゲオ・じゃんぱらの3ショップ（いずれも楽天市場出店）',
    modelBasis: '各機種の最小容量モデル（例：Pixel 8なら128GB）',
  },
  galaxy: {
    shops: 'イオシス・ゲオ・じゃんぱらの3ショップ（いずれも楽天市場出店）',
    modelBasis: '各機種の最小容量モデル（例：Galaxy S23なら256GB）',
  },
  ipad: {
    shops: 'イオシス・ゲオ・じゃんぱらの3ショップ（いずれも楽天市場出店）',
    modelBasis: '各機種の最小容量モデル',
  },
  watch: {
    shops: 'イオシス・ゲオ・じゃんぱらの3ショップ（いずれも楽天市場出店）',
    modelBasis: '各機種の最小容量モデル',
  },
  airpods: {
    shops: 'イオシス・じゃんぱら・eイヤホンの3ショップ（いずれも楽天市場出店）',
    modelBasis: '各機種',
  },
  macbook: {
    shops: '楽天市場の中古ショップ',
    modelBasis: '各機種の最小構成モデル（例：MacBook Air M2なら8GB/256GB）',
  },
}

/**
 * 中古相場の算出方法についての説明文を返す。
 * 共通テンプレートにカテゴリ別の可変部を差し込んで生成する。
 */
export function priceSourceNote(category: PriceCategory): string {
  const { shops, modelBasis } = PRICE_SOURCE_PARTS[category]
  return `本記事に掲載している中古相場は、楽天ウェブサービス（楽天市場商品検索API）を通じて、${shops}の販売価格を毎日自動で集計し、${modelBasis}の最安値・最高値をもとに算出しています。集計対象は通常状態の中古品のみで、新品・未使用品のほか、バッテリー残量が80%を下回る個体や、画面割れ・ジャンク・部品取りなど「難あり」表記の商品は、通常の中古品とは価格帯が大きく異なるため除外しています。価格は100円単位に丸めて表示しており、在庫状況やタイミングにより実際の購入価格と異なる場合があります。なお、価格推移グラフ・価格表にAmazonの価格は含まれておらず、Amazonの商品について価格アラートの発行も行っていません。`
}

// ============================================
// 集計基準の変更に関する注記
// ============================================
// 2026-07-30 の取得分から、バッテリー劣化品・難あり品を集計対象から除外した。
// 除外前は、こうした商品が最安値として拾われ相場の下限を実態より低く見せていたため、
// 変更日を境にグラフの下限が切り上がる（＝値上がりではない）。
// 誤読を避けるため、変更日をまたぐ期間を表示しているときだけ注記を出す。
//
// 注意: この日付は「全カテゴリがその日に新基準で取得できている」ことが前提。
// 変更する場合は、その日の *_price_logs に件数（*_count）が全カテゴリ入っているか
// 必ず確認すること（件数が入っている＝新スクリプトで取得された証拠）。

/** 集計基準を変更した日（この日の取得分から新基準） */
export const PRICE_LOGIC_CHANGE_DATE = '2026-07-30'

/** 旧基準（劣化品を含む）で集計された日か。labels は "YYYY-MM-DD" */
export function isBeforeLogicChange(date: string): boolean {
  return date < PRICE_LOGIC_CHANGE_DATE
}

/**
 * 2つの日付が集計基準の変更をまたぐか。
 * またぐ区間の差分は「値動き」ではなく「基準変更による段差」を含むため、
 * 増減の判定・レポートには使わない。
 */
export function crossesLogicChange(from: string, to: string): boolean {
  return isBeforeLogicChange(from) && !isBeforeLogicChange(to)
}

/**
 * その月（"YYYY-MM"）が新基準の日だけで構成されるか。
 * 変更日を含む月は新旧が混在するため、月別平均どうしの比較には使えない。
 */
export function isMonthPureNewBasis(ym: string): boolean {
  const changeMonth = PRICE_LOGIC_CHANGE_DATE.substring(0, 7)
  if (ym > changeMonth) return true
  // 変更日が月初なら、その月は初日から新基準
  return ym === changeMonth && PRICE_LOGIC_CHANGE_DATE.endsWith('-01')
}

/**
 * 表示中の価格推移が集計基準の変更日をまたぐ場合に、注記文を返す。
 * またがない（変更日より後のデータしかない）場合は null。
 *
 * @param labels 価格推移グラフの日付ラベル（"YYYY-MM-DD" 昇順）
 */
export function priceLogicChangeNote(labels: string[]): string | null {
  if (labels.length === 0) return null
  const first = labels[0]
  const last = labels[labels.length - 1]
  // グラフが変更日より前から始まり、変更日以降まで続いている場合のみ表示する
  if (first >= PRICE_LOGIC_CHANGE_DATE) return null
  if (last < PRICE_LOGIC_CHANGE_DATE) return null

  // 文言と定数がズレないよう、日付は定数から組み立てる
  const [y, m, d] = PRICE_LOGIC_CHANGE_DATE.split('-').map(Number)
  return `${y}年${m}月${d}日の集計分より、バッテリー劣化品や「難あり」表記の商品を集計対象から除外しています。これらは通常の中古品より大幅に安く、相場の下限を実態より低く見せていたためです。この日を境にグラフの下限価格が上がっていますが、相場そのものが値上がりしたわけではなく、集計基準の変更によるものです。そのため、変更日をまたぐ期間の増減（7日間・30日間・90日間の変動や前日比）は「-」と表示し、値動きとしての判定を行っていません。新しい基準でのデータが揃いしだい、順次表示を再開します。`
}
