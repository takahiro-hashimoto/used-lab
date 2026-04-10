import MediaCard from '@/app/components/MediaCard'

export default function RouteSection() {
  return (
    <section className="l-section" id="route" aria-labelledby="heading-route">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-route">
          中古iPad 購入ルート別の注意点
        </h2>
        <p className="m-section-desc">同じ中古iPadでも、どこで買うかによってリスクの種類が変わります。</p>
        <p className="m-section-desc">購入先ごとの特徴を理解しておきましょう。</p>

        {/* フリマ・オークション */}
        <MediaCard
          src="/images/content/thumbnail/ipad-magic-keyboard-01.jpg"
          alt="フリマアプリのイメージ画像"
          title="フリマ・オークション購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>メルカリやヤフオクなどの個人間取引は、価格の安さが最大の魅力です。しかし、その分リスクも大きくなります。</p>
            <p>
              iPadの個人取引では<strong>バッテリー状態の詐称、アクティベーションロック未解除、付属品（Apple Pencil・キーボード）の動作不良</strong>などのトラブルが多発します。特にiPadはバッテリー最大容量が本体で確認できないため、出品者の自己申告を信じるしかありません。
            </p>
            <p>
              「安い＝自己責任の範囲が広い」ということを理解した上で利用しましょう。
            </p>
          </div>
        </MediaCard>

        {/* 中古ショップ */}
        <MediaCard
          src="/images/content/thumbnail/ipad-all.jpg"
          alt="中古ショップのイメージ画像"
          title="中古ショップ購入時"
          width={800}
          height={450}
          aside
          imgStyle={{ border: '1px solid var(--color-border-light)' }}
        >
          <div className="media-card__desc m-rich-text">
            <p>イオシス・じゃんぱら・ゲオなどの中古ショップは、検品体制や保証が整っているため初心者でも安心です。ただし、注意すべき点もあります。</p>
            <p>
              <strong>表記ランク（A/B/Cなど）の基準はショップごとに異なります。</strong>特にiPadは画面が大きいため、小さな傷でも目立ちやすく、「Bランク」の状態に差が出やすいです。
            </p>
            <p>
              また、iPadはモデル名が非常にわかりにくい（「iPad Air 第4世代」と「iPad Air 第5世代」の見た目はほぼ同じ）ため、型番（モデル番号）まで確認することをおすすめします。
            </p>
          </div>
        </MediaCard>

        {/* Apple認定整備済製品 */}
        <MediaCard
          src="/images/content/thumbnail/ipad-image-06.jpg"
          alt="Apple認定整備済製品のイメージ画像"
          title="Apple認定整備済製品（リファービッシュ）"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>Appleが公式に販売する整備済製品は、新品同様のバッテリー・外装に交換済みで1年間のハードウェア保証も付きます。iPadの中古を検討する際は、整備済製品の在庫をチェックするのもおすすめです。</p>
            <p>ただし、整備済製品は在庫が不安定で欲しいモデルが常にあるとは限りません。また、価格は新品の約15%引き程度で、中古ショップの同スペック品より高い場合もあります。</p>
            <p><strong>予算を重視するなら中古ショップ、品質と保証を重視するなら整備済製品</strong>と使い分けましょう。</p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
