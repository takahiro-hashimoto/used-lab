import IconCard from '@/app/components/IconCard'

// ============================================================
// 目的別のおすすめ購入先（カテゴリ共通）
//
// マーカー（strong）とリンクは重ねない。strong は .m-rich-text で黄色マーカーになるため、
// 上にリンクの下線と色が乗ると読みにくくなる。マーカーは「強調したい事実」、
// リンクは「店名から詳細への導線」と役割を分け、同じ語にはかけない。
//
// 見出しは「読者のタイプ」だけを示し、店名は本文で名指ししたうえで
// 下の詳細セクション（#detail-*）へアンカーリンクを張る。
//
// ── カテゴリで扱うショップが違う点に注意 ──
// 同じ文面を全カテゴリに流用すると、そのページに載っていない店を推してしまう。
// 実際 Apple Watch では「にこスマだけが条件を満たす」と書きながら、
// にこスマの詳細も比較表も無いという状態になっていた。
// そのため availableShopKeys（そのページに実在する店）から推奨先を切り替える。
//
//   にこスマ  … iPhone / iPad / Pixel / Galaxy にはあるが、Watch / MacBook には無い
//   Apple整備済み品 … Apple製品のページのみ。Pixel / Galaxy には無い
//
// 判断の根拠は shops テーブルの実値（2026-08 時点）:
//   にこスマ        価格◯ 在庫◎ 保証1年  赤ロム永久 写真◯ 電池◯ 送料無料
//   イオシス        価格◎ 在庫◯ 保証3ヶ月 赤ロム永久 写真× 電池× 送料640円
//   ゲオ           価格◯ 在庫◎ 保証30日 赤ロム永久 写真◯ 電池◯ 送料550円
//   じゃんぱら       価格◯ 在庫◯ 保証3ヶ月 赤ロム永久 写真◯ 電池◯ 送料770円
//   Apple整備済み品  価格◯ 在庫× 保証1年  写真× 電池× 送料無料
//   Amazon整備済み品 価格◯ 在庫△ 保証3ヶ月 写真× 電池× 送料無料
//   メルカリ        保証なし 赤ロム保証なし
//
// 価格◎はイオシスだけ。保証1年はにこスマとApple整備済み品だけ。
// ============================================================

type Props = {
  /** 「中古iPhone」「中古iPad」など、本文に出す製品名 */
  productName: string
  /** 上級者向けカードの補足。カテゴリ固有の判断材料があれば渡す */
  advancedNote?: string
  /**
   * そのページの詳細セクション（#detail-*）に実在するショップの shop_key。
   * 渡さないと、詳細が無い店にリンクしてアンカー切れになる。
   */
  availableShopKeys?: string[]
  /**
   * 赤ロム保証（ネットワーク利用制限）に言及するか。
   * 回線に紐づかない MacBook / Apple Watch では比較表にこの項目が無いため false。
   */
  mentionSimLock?: boolean
  /**
   * バッテリー最大容量の表示有無に言及するか。
   * 比較表にこの項目があるカテゴリのみ true。
   */
  mentionBattery?: boolean
}

/** 詳細セクションがあるショップだけリンクにする。無ければただのテキストで出す */
function ShopRef({
  shopKey,
  available,
  children,
}: {
  shopKey: string
  available?: string[]
  children: React.ReactNode
}) {
  if (available && !available.includes(shopKey)) return <>{children}</>
  return <a href={`#detail-${shopKey}`}>{children}</a>
}

export default function RecommendByTypeSection({
  productName,
  advancedNote,
  availableShopKeys,
  mentionSimLock = true,
  mentionBattery = true,
}: Props) {
  const has = (key: string) => !availableShopKeys || availableShopKeys.includes(key)

  // 安心枠。にこスマがあるカテゴリはにこスマ、無いカテゴリは Apple整備済み品に寄せる
  const safeIsNicosma = has('nicosma')
  // 新品同様の代替枠。Apple製品でないページには Apple整備済み品が無いので Amazon整備済み品
  const refurbKey = has('apple') ? 'apple' : 'amazon'
  const refurbName = has('apple') ? 'Apple整備済み品' : 'Amazon整備済み品'

  return (
    <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
          <i className="fa-solid fa-bullseye" aria-hidden="true"></i> 目的別｜{productName}はどこで買うのがおすすめか
        </h2>
        <p className="m-section-desc">
          先に結論から。3つのタイプごとに、おすすめの店を名指しで挙げます。
        </p>

        <div className="u-mt-xl">
          <IconCard icon="fa-solid fa-shield-halved" title={`信頼できる店で安心して買いたい人・初めて${productName}を買う人`}>
            {safeIsNicosma ? (
              <>
                <p>
                  <strong>
                    保証1年・送料無料・実物写真の掲載
                    {mentionBattery && '・バッテリー最大容量の記載'}
                    {mentionSimLock && '・赤ロム永久保証'}
                  </strong>
                  。
                  これらをすべて満たすのは、比較したなかで<ShopRef shopKey="nicosma" available={availableShopKeys}>にこスマ</ShopRef>だけです。
                </p>
                <p>
                  届くまで状態が分からない不安と、買ったあとのトラブルの両方に手当てがあります。
                  初めてなら、数千円の差より「戻れる選択肢があるか」で選んでください。
                </p>
                <p>
                  新品同様の状態にこだわるなら<ShopRef shopKey={refurbKey} available={availableShopKeys}>{refurbName}</ShopRef>も候補です。
                  {refurbKey === 'apple'
                    ? '保証1年・送料無料でバッテリーも新品ですが、在庫が薄く欲しいモデルが常にあるとは限りません。'
                    : '保証3ヶ月・送料無料で検品済みですが、在庫が安定せず欲しいモデルが常にあるとは限りません。'}
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>保証1年・送料無料・バッテリーも新品</strong>。
                  この条件が揃うのは<ShopRef shopKey="apple" available={availableShopKeys}>Apple整備済み品</ShopRef>です。
                  中古というより「新品同様を安く買う」に近い選択肢になります。
                </p>
                <p>
                  ただし<strong>在庫が薄く、欲しいモデルが常にあるとは限りません</strong>。
                  出たときに買う前提で、こまめに在庫を見る必要があります。
                </p>
                <p>
                  在庫を優先するなら<ShopRef shopKey="janpara" available={availableShopKeys}>じゃんぱら</ShopRef>が次点です。
                  保証3ヶ月に加えて実物写真が載るので、届く前に状態を確認できます（送料770円）。
                </p>
              </>
            )}
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-tags" title="価格をできるだけ抑えたい人">
            <p>
              <ShopRef shopKey="iosys" available={availableShopKeys}>イオシス</ShopRef>は<strong>価格の評価が◎になる唯一の店</strong>です。
              {mentionSimLock ? '保証3ヶ月と赤ロム永久保証も付くので' : '保証3ヶ月が付くので'}、安いだけの店ではありません。
            </p>
            <p>
              ただし<strong>個別の実物写真{mentionBattery && 'とバッテリー最大容量の記載'}がありません</strong>。状態は届くまで分からない前提で選ぶ必要があります。
              ここが気になるなら、写真{mentionBattery && 'とバッテリー表示'}があって在庫も豊富な<ShopRef shopKey="geo" available={availableShopKeys}>ゲオ</ShopRef>が次点です（保証は30日と短め）。
            </p>
          </IconCard>
        </div>

        <div className="u-mt-lg">
          <IconCard icon="fa-solid fa-gem" title="安さを最優先できる上級者">
            <p>
              候補は<ShopRef shopKey="mercari" available={availableShopKeys}>メルカリ</ShopRef>などのフリマアプリです。
              専門店より安く買える可能性はありますが、
              <strong>{mentionSimLock ? '保証がなく、赤ロム保証もありません' : '保証がありません'}</strong>。
              出品者の「美品」表記に基準はなく、状態の判断はすべて自分の責任になります。
            </p>
            <p>{advancedNote ?? '状態やサポート期間を自分で確認できる人向けです。'}</p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}
