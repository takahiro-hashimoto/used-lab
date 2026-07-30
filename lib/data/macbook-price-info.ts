/**
 * MacBook 中古相場一覧ページ用 設定データ
 * 配置場所: /macbook/price-info/
 */

/** チャートカラー（最大12色） */
export const CHART_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16',
  '#f97316', '#14b8a6', '#6366f1', '#a855f7',
]

/**
 * FAQアイテム。
 *
 * 相場に触れる設問だけ、その日の実勢価格（中央値）を差し込む。
 * 固定値で書くと、書いた時点の相場のまま古びていくため。
 *
 * @param m1AirBand 例 "7万円台"。相場が取れないときは null（言及ごと省く）
 */
export function buildFaqItems(m1AirBand: string | null) {
  return FAQ_ITEMS.map((item) =>
    item.question === 'MacBook AirとProではどちらが中古で買いやすいですか？'
      ? {
          ...item,
          answer: m1AirBand
            ? item.answer.replace('__M1_AIR_BAND__', `特にM1 MacBook Airは${m1AirBand}が中心で、日常用途なら十分な性能です。`)
            : item.answer.replace('__M1_AIR_BAND__', 'なかでもM1 MacBook Airは日常用途なら十分な性能です。'),
        }
      : item
  )
}

/** FAQアイテム（相場の差し込み前。表示には buildFaqItems を使う） */
export const FAQ_ITEMS = [
  {
    question: '中古MacBookが一番安くなる時期はいつですか？',
    answer:
      '新型MacBookが発売された直後が最も安くなりやすい時期です。\nApple Siliconの新チップ搭載モデルが登場するたびに、旧世代モデルの買取・中古価格が下がる傾向があります。特にWWDC（6月）や秋の新製品発表後は狙い目です。',
  },
  {
    question: 'MacBook AirとProではどちらが中古で買いやすいですか？',
    answer:
      'MacBook Airの方が流通量が多く、価格帯も幅広いため購入しやすい傾向にあります。__M1_AIR_BAND__\nProはカスタマイズ構成のばらつきが大きく、最小構成の在庫が見つかりやすい反面、高スペック構成は割高になりがちです。',
  },
  {
    question: 'カスタマイズモデル（CTO）の中古価格はどう考えればいいですか？',
    answer:
      '当ページの価格は各モデルの最小構成（最小メモリ・最小ストレージ）に統一しています。\nCTOモデル（メモリ増設やストレージ増量済み）は流通が少なく、標準構成より2〜5万円程度高くなるのが一般的です。ただしCTOモデルは後からアップグレードできないため、用途に合えばむしろお買い得な場合もあります。',
  },
  {
    question: '中古MacBookのバッテリー状態はどう確認すればいいですか？',
    answer:
      'macOSの「システム設定」→「バッテリー」→「バッテリーの状態」から充放電回数と最大容量を確認できます。\nApple公式ではMacBook Air/Proとも最大充放電回数1,000回を基準としています。中古購入時は充放電回数300回以下を目安にすると、まだ十分なバッテリー寿命が期待できます。',
  },
  {
    question: 'Apple Silicon搭載の中古MacBookで注意すべき点はありますか？',
    answer:
      'M1以降のApple Silicon搭載MacBookはメモリとストレージが基板に直付けされており、購入後のアップグレードが一切できません。\nそのため、メモリ8GBモデルで動画編集やプログラミングをしたい場合は、最初から16GB以上のモデルを選ぶことをおすすめします。当ページの最安値は最小構成を基準にしていますが、用途に合わせた構成選びが重要です。',
  },
]
