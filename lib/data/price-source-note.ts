// ============================================
// 中古相場の算出方法についての説明文（一元管理）
// ============================================
// カテゴリトップの詳細解説・各カテゴリの価格情報ページなど、
// 「中古相場の算出方法について」を掲載する全箇所で共通利用する。
// 文言はこの1ファイルで管理し、カテゴリ別に異なる部分（取得元ショップ・
// 相場算出の対象モデル）だけを変数化する。

export type PriceCategory = 'iphone' | 'ipad' | 'watch' | 'airpods' | 'macbook' | 'mac' | 'pixel' | 'galaxy'

type PriceSourceParts = {
  /** 取得元ショップの説明（例: イオシス・ゲオ・じゃんぱらの3ショップ（いずれも楽天市場出店）） */
  shops: string
  /** 「〜の販売価格を毎日自動で取得しています」に続く形のショップ名（件数表現を含めない） */
  shopsPlain: string
  /** 相場算出の対象モデル（例: 各機種の最小容量モデル（例：iPhone 15は128GB）） */
  modelBasis: string
  /** 「中古〜の取引量が多い」に入る製品名 */
  productLabel: string
  /** 対象ショップの言い回し（例: 主要3ショップ） */
  shopScope: string
}

const SHOPS_3 = 'イオシス・ゲオ・じゃんぱらの3ショップ（いずれも楽天市場出店）'
const SHOPS_3_PLAIN = 'イオシス・ゲオ・じゃんぱら（いずれも楽天市場出店）'

const PRICE_SOURCE_PARTS: Record<PriceCategory, PriceSourceParts> = {
  iphone: {
    shops: SHOPS_3,
    shopsPlain: SHOPS_3_PLAIN,
    modelBasis: '機種ごとの最小容量モデル（例：iPhone 15は128GB）',
    productLabel: 'iPhone',
    shopScope: '主要3ショップ',
  },
  pixel: {
    shops: SHOPS_3,
    shopsPlain: SHOPS_3_PLAIN,
    modelBasis: '機種ごとの最小容量モデル（例：Pixel 8は128GB）',
    productLabel: 'Google Pixel',
    shopScope: '主要3ショップ',
  },
  galaxy: {
    shops: SHOPS_3,
    shopsPlain: SHOPS_3_PLAIN,
    modelBasis: '機種ごとの最小容量モデル（例：Galaxy S23は256GB）',
    productLabel: 'Galaxy',
    shopScope: '主要3ショップ',
  },
  ipad: {
    shops: SHOPS_3,
    shopsPlain: SHOPS_3_PLAIN,
    modelBasis: '機種ごとの最小容量モデル',
    productLabel: 'iPad',
    shopScope: '主要3ショップ',
  },
  watch: {
    shops: SHOPS_3,
    shopsPlain: SHOPS_3_PLAIN,
    modelBasis: '機種ごとの最小容量モデル',
    productLabel: 'Apple Watch',
    shopScope: '主要3ショップ',
  },
  airpods: {
    shops: 'イオシス・じゃんぱら・eイヤホンの3ショップ（いずれも楽天市場出店）',
    shopsPlain: 'イオシス・じゃんぱら・eイヤホン（いずれも楽天市場出店）',
    modelBasis: '各機種',
    productLabel: 'AirPods',
    shopScope: '主要3ショップ',
  },
  macbook: {
    shops: '楽天市場の中古ショップ',
    shopsPlain: '楽天市場の中古ショップ',
    modelBasis: '機種ごとの最小構成モデル（例：MacBook Air M2は8GB/256GB）',
    productLabel: 'MacBook',
    shopScope: '主要な中古ショップ',
  },
  // デスクトップMac。MacBook と同じくショップ横断で楽天市場を検索している
  mac: {
    shops: '楽天市場の中古ショップ',
    shopsPlain: '楽天市場の中古ショップ',
    modelBasis: '機種ごとの最小構成モデル（例：Mac mini M4は16GB/256GB）',
    productLabel: 'iMac・Mac mini',
    shopScope: '主要な中古ショップ',
  },
}

/**
 * 中古相場の算出方法についての説明文を返す（最安値・最高値ベースのページ用）。
 * 共通テンプレートにカテゴリ別の可変部を差し込んで生成する。
 */
export function priceSourceNote(category: PriceCategory): string {
  const { shops, modelBasis } = PRICE_SOURCE_PARTS[category]
  return `本記事の中古相場は、楽天ウェブサービス（楽天市場商品検索API）を通じて${shops}の販売価格を毎日自動で取得しています。相場は${modelBasis}の最安値・最高値をもとに算出しています。新品・未使用品、バッテリー残量80%未満、画面割れ・ジャンクなど「難あり」表記の商品は除外しています。価格は100円単位に丸めており、在庫状況により実際の購入価格と異なる場合があります。なお、Amazonの価格は含まれておらず、Amazonの商品について価格アラートの発行も行っていません。`
}

/**
 * Amazonアソシエイト運営規約に基づく免責文（スペック比較表など、表の直下に1行で置く用）。
 *
 * 規約上、価格追跡・価格アラートを行う場合は「Amazonの価格は含まない」「Amazonの商品に
 * アラートを出さない」の2点を明記する必要がある。文言が複数ファイルに散ると変更漏れが起きるため、
 * 表示箇所が増えてもこの定数だけを参照すること。
 */
export const AMAZON_PRICE_DISCLAIMER =
  '※ 中古相場・価格推移グラフにAmazonの価格は含まれておらず、Amazonの商品について価格アラートの発行も行っていません。'

/** 注記の構成要素。除外条件は箇条書きのほうが読み取りやすいためリストを持てるようにする */
export type NoteBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

/** 集計対象外の商品。price-info の「対象条件」カードと同じ並び */
const EXCLUDED_ITEMS = [
  '新品・未使用品',
  'バッテリー残量80％未満',
  '画面割れ・ジャンクなど「難あり」商品',
]

/**
 * 個別機種ページ用の説明文をブロックごとに返す。
 * 1つの長文にすると読み飛ばされるため、段落と箇条書きに分けて
 * 呼び出し側で <p> / <ul> として描画する。
 *
 * @param basis 'median' は価格分布から算出できた機種用。
 *   'minmax' は分布が未記録（2026-07-30 より前のログしかない）機種用のフォールバック。
 */
export function priceSourceNoteParagraphs(
  category: PriceCategory,
  basis: 'minmax' | 'median' = 'median'
): NoteBlock[] {
  if (basis === 'minmax') return [{ type: 'p', text: priceSourceNote(category) }]

  const { shopsPlain, modelBasis } = PRICE_SOURCE_PARTS[category]
  return [
    { type: 'p', text: `本記事の中古相場は、楽天ウェブサービス（楽天市場商品検索API）を利用し、${shopsPlain}の販売価格を毎日自動で取得して算出しています。` },
    { type: 'p', text: `相場は${modelBasis}を対象とし、中央値を採用しています。また、以下の商品は価格が大きく異なるため集計対象外です。` },
    { type: 'ul', items: EXCLUDED_ITEMS },
    { type: 'p', text: '※Amazonの価格は集計対象に含まれておらず、Amazon商品の価格アラートも行っていません。' },
  ]
}

/**
 * データの取得元だけを説明する短縮版を段落ごとに返す。
 *
 * カテゴリトップやおすすめ記事など、相場を「参考値」として添えているページ用。
 * これらのページは価格の詳細な算出根拠まで求められていないため、
 * 出典と対象ショップに絞る。算出方法まで説明するのは
 * 個別機種ページ（priceSourceNoteParagraphs）と価格情報ページの役割。
 */
export function priceSourceShortParagraphs(category: PriceCategory): string[] {
  const { shopsPlain, productLabel, shopScope } = PRICE_SOURCE_PARTS[category]
  return [
    `楽天ウェブサービス（楽天市場商品検索API）を利用し、${shopsPlain}の販売価格を毎日自動取得しています。`,
    `中古${productLabel}の取引量が多い${shopScope}を対象とすることで、市場全体の価格動向を反映しています。`,
    `※Amazonの価格は含まれておらず、Amazon商品の価格アラートも行っていません。`,
  ]
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
  // ページによってグラフの内容が違う（個別機種は上限/下限、相場一覧は平均相場）ため、
  // 「下限が上がる」のような特定のグラフ前提の書き方はしない
  return `${y}年${m}月${d}日の集計分より、バッテリー劣化品や「難あり」表記の商品を集計対象から除外し、相場価格の算出方法を中央値に変更しました。この日を境に表示価格が変わっていますが、相場そのものが動いたのではなく集計方法の変更によるものです。変更日をまたぐ期間の増減は「-」と表示し、値動きとしての判定を行っていません。`
}
