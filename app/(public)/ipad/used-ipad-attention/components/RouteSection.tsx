import Image from 'next/image'

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
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">フリマ・オークション購入時</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/ipad/ipad-pro-13-2.jpg"
                  alt="フリマアプリのイメージ画像"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text m-rich-text">
              <p>メルカリやヤフオクなどの個人間取引は、価格の安さが最大の魅力です。しかし、その分リスクも大きくなります。</p>
              <p>
                iPadの個人取引では<strong>バッテリー状態の詐称、アクティベーションロック未解除、付属品（Apple Pencil・キーボード）の動作不良</strong>などのトラブルが多発します。特にiPadはバッテリー最大容量が本体で確認できないため、出品者の自己申告を信じるしかありません。
              </p>
              <p>
                「<strong>安い＝自己責任の範囲が広い</strong>」ということを理解した上で利用しましょう。中古iPadの購入経験がない方にはおすすめしません。
              </p>
            </div>
          </div>
        </div>

        {/* 中古ショップ */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">中古ショップ購入時</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/ipad/ipad-air-6-11.jpg"
                  alt="中古ショップのイメージ画像"
                  width={280}
                  height={200}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text m-rich-text">
              <p>イオシス・じゃんぱら・ゲオなどの中古ショップは、検品体制や保証が整っているため初心者でも安心です。ただし、注意すべき点もあります。</p>
              <p>
                <strong>表記ランク（A/B/Cなど）の基準はショップごとに異なります。</strong>特にiPadは画面が大きいため、小さな傷でも目立ちやすく、「Bランク」の状態に差が出やすいです。
              </p>
              <p>
                また、iPadは<strong>モデル名が非常にわかりにくい</strong>（「iPad Air 第4世代」と「iPad Air 第5世代」の見た目はほぼ同じ）ため、型番（モデル番号）まで確認することをおすすめします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
