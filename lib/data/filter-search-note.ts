// ============================================================
// 機種診断シミュレーターの「算出ロジックと中古価格データについて」本文
//
// 4カテゴリで同じ説明を各ページに手書きすると、価格の基準を変えたときに
// 書き換え漏れが出る（実際に「最安値データを参照」という記述が
// 中央値移行後も残っていた）。文面はここで一元管理する。
// ============================================================

type NoteConfig = {
  /** 「当◯◯診断シミュレーター」「中古◯◯の取引量」に入る製品名 */
  product: string
  /** 集計対象ショップ */
  shops: string[]
  /** OSサポートの目安。AirPods のようにOS更新の概念がない製品は null */
  os: { name: string; years: number } | null
  /** 価格が変動する要因（カテゴリ固有） */
  variance: string
}

const CONFIG: Record<string, NoteConfig> = {
  iphone: {
    product: 'iPhone',
    shops: ['イオシス', 'ゲオ', 'じゃんぱら'],
    os: { name: 'iOS', years: 7 },
    variance: '容量（GB）、本体状態、各店舗の在庫状況',
  },
  ipad: {
    product: 'iPad',
    shops: ['イオシス', 'ゲオ', 'じゃんぱら'],
    os: { name: 'iPadOS', years: 7 },
    variance: '容量（GB）、本体状態、Wi-Fi／セルラーモデル、各店舗の在庫状況',
  },
  watch: {
    product: 'Apple Watch',
    shops: ['イオシス', 'ゲオ', 'じゃんぱら'],
    // watchOS は他製品より短い。lib/utils/watch-helpers.ts の calculateOSLifespan と揃える
    os: { name: 'watchOS', years: 5 },
    variance: 'ケースサイズ・素材、本体状態、GPS／セルラーモデル、各店舗の在庫状況',
  },
  airpods: {
    product: 'AirPods',
    shops: ['イオシス', 'じゃんぱら', 'eイヤホン'],
    os: null,
    variance: '本体状態、付属品の有無、各店舗の在庫状況',
  },
}

export type FilterSearchNoteCategory = keyof typeof CONFIG

/** 診断ロジック説明セクションの本文。段落ごとに配列で返す */
export function filterSearchNoteParagraphs(category: FilterSearchNoteCategory): string[] {
  const { product, shops, os, variance } = CONFIG[category]
  const shopList = shops.map((s) => `「${s}」`).join('')

  const osSentence = os
    ? `また、${os.name}のサポート目安は、Appleのこれまでの傾向（発売から約${os.years}年間）をもとに算出しています。`
    : ''

  return [
    `当${product}診断シミュレーターでは、${shopList}の大手3社（いずれも楽天市場出店）の在庫データを楽天ウェブサービス（楽天市場商品検索API）経由で毎日取得し、中古価格を更新しています。中古${product}の取引量が多い主要3社を対象とすることで、市場全体の価格動向を反映しています。`,
    `診断では、用途・予算・こだわり条件をAND条件で組み合わせ、最適な${product}を抽出しています。${osSentence}`,
    '表示価格は、その日に販売中だった商品の実勢価格（中央値）です。特価品1点の価格に左右されないよう、機種ページや相場一覧と同じ基準で算出しています。',
    '※Amazonの価格は集計対象外であり、Amazon商品の価格アラートも行っていません。',
    `※中古価格は${variance}によって変動します。最新価格は各販売店サイトでご確認ください。`,
  ]
}
