// ============================================
// 中古相場の算出方法についての説明文（一元管理）
// ============================================
// カテゴリトップの詳細解説・各カテゴリの価格情報ページなど、
// 「中古相場の算出方法について」を掲載する全箇所で共通利用する。
// 文言はこの1ファイルで管理し、カテゴリ別に異なる部分（取得元ショップ・
// 相場算出の対象モデル）だけを変数化する。

export type PriceCategory = 'iphone' | 'ipad' | 'watch' | 'airpods' | 'macbook'

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
  return `本記事に掲載している中古相場は、楽天ウェブサービス（楽天市場商品検索API）を通じて、${shops}の販売価格を毎日自動で集計し、${modelBasis}の最安値・最高値をもとに算出しています。価格は100円単位に丸めて表示しており、在庫状況やタイミングにより実際の購入価格と異なる場合があります。なお、価格推移グラフ・価格表にAmazonの価格は含まれておらず、Amazonの商品について価格アラートの発行も行っていません。`
}
