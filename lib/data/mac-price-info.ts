/**
 * デスクトップMac 中古相場一覧ページ用 設定データ
 * 配置場所: /mac/price-info/
 *
 * MacBook版（macbook-price-info.ts）と同じ構造。設問はデスクトップ固有の
 * 論点（ディスプレイの有無・メモリ増設不可・Ultraチップの流通量）に差し替えている。
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
 * @param miniBand 例 "5万円台"。相場が取れないときは null（言及ごと省く）
 */
export function buildFaqItems(miniBand: string | null) {
  return FAQ_ITEMS.map((item) =>
    item.question === 'iMac・Mac miniはどれが中古で買いやすいですか？'
      ? {
          ...item,
          answer: miniBand
            ? item.answer.replace('__MINI_BAND__', `Mac miniは${miniBand}が中心の価格帯で、日常用途なら型落ちでも十分な性能です。`)
            : item.answer.replace('__MINI_BAND__', 'なかでもMac miniは型落ちでも日常用途なら十分な性能です。'),
        }
      : item
  )
}

/** FAQアイテム（相場の差し込み前。表示には buildFaqItems を使う） */
export const FAQ_ITEMS = [
  {
    question: 'iMac・Mac miniはどれが中古で買いやすいですか？',
    answer:
      'Mac miniが最も流通量が多く、価格帯も幅広いため購入しやすい傾向にあります。__MINI_BAND__\niMacはディスプレイ一体型のぶん配送時の破損リスクがあり、出品数もMac miniより少なめです。Mac Studioは新品価格が高くタマ数も限られるため、条件に合う個体を見つけたら早めに動く必要があります。',
  },
  {
    question: '中古のiMac・Mac miniが安くなる時期はいつですか？',
    answer:
      '新モデルが発売された直後です。Apple Siliconの新チップ搭載モデルが登場するたびに、旧世代の買取・中古価格が下がる傾向があります。\niMac・Mac miniはMacBookほど毎年更新されないため、値下がりのタイミングも不定期です。相場が動いたときに拾えるよう、価格推移を追っておくのが有効です。',
  },
  {
    question: 'iMacとMac miniは価格をどう比べればいいですか？',
    answer:
      '本体価格だけで比べると判断を誤ります。Mac miniにはディスプレイ・キーボード・マウスが付属しないため、持っていない場合はその費用を足した総額で比較してください。\niMacは24インチ4.5K RetinaディスプレイとMagic Keyboard・Magic Mouseが同梱されるので、一式そろえる前提ならiMacのほうが安く収まることがあります。',
  },
  {
    question: 'カスタマイズモデル（CTO）の中古価格はどう考えればいいですか？',
    answer:
      '当ページの価格は各モデルの最小構成（最小メモリ・最小ストレージ）に統一しています。\nCTOモデル（メモリ増設やストレージ増量済み）は流通が少なく、標準構成より高くなるのが一般的です。ただしMacは購入後にアップグレードできないため、用途に合う構成であればむしろお買い得な場合もあります。',
  },
  {
    question: '中古のiMac・Mac miniで最も注意すべき点は何ですか？',
    answer:
      'メモリ容量です。Apple Silicon搭載のMacはメモリとストレージがチップに統合されており、購入後のアップグレードが一切できません。\nMac miniとiMacはどちらも2023年モデルまで8GBが標準で、中古市場に出回っている個体の多くが8GBです。当ページの相場は最小構成が基準なので、16GB以上の個体は表示価格より高くなる点にご注意ください。',
  },
  {
    question: 'iMacは中古で買っても大丈夫ですか？',
    answer:
      'ディスプレイ一体型なので、画面の状態を必ず確認してください。輝点・ドット抜け・焼き付きがあっても本体だけの交換ができません。\nまたMagic KeyboardとMagic Mouseが同梱される製品ですが、中古では欠品していることがあります。商品説明で付属品の有無を確認してから購入してください。',
  },
]
