import Image from 'next/image'

export default function RouteSection() {
  return (
    <section className="l-section" id="route" aria-labelledby="heading-route">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-route">
          中古MacBook 購入ルート別の注意点
        </h2>
        <p className="m-section-desc">同じ中古MacBookでも、どこで買うかによってリスクの種類が異なります。</p>
        <p className="m-section-desc">購入先ごとの注意点を理解しておきましょう。</p>

        {/* フリマ・オークション */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">フリマ・オークション購入時</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/macbook/mba-13-2024.jpg"
                  alt="フリマアプリのイメージ画像"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>メルカリやヤフオクなどの個人間取引は、中古ショップより安く買える可能性があります。しかし、MacBookの中古取引では特有のリスクがあります。</p>
              <p>
                MacBookは高額商品のため、<strong>スペックの詐称（Intel MacをM1と偽る等）やバッテリー状態の偽り</strong>がトラブルの原因になります。また、アクティベーションロックの解除漏れや、水没歴を隠した出品も見られます。
              </p>
              <p>
                さらに、MacBookはキーボードやディスプレイの不具合が<strong>写真だけでは判断できない</strong>のが難点です。中古MacBookの購入経験がない方には正直おすすめしません。
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
                  src="/images/macbook/mba-13-2024.jpg"
                  alt="中古ショップのイメージ画像"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>イオシス・じゃんぱら・ゲオなどの中古ショップは、検品体制や保証が整っているため初心者でも安心して購入できます。アクティベーションロックの解除確認も行われています。</p>
              <p>
                ただし、<strong>表記ランク（A/B/Cなど）の基準はショップごとに異なります。</strong>MacBookは天板やパームレストの傷が目立ちやすく、同じ「Bランク」でも見た目の印象に差があることを理解しておきましょう。
              </p>
              <p>
                また、MacBookは<strong>同じモデル名でもメモリ・ストレージ構成が複数ある</strong>ため、スペック表記を必ず確認してください。「MacBook Air M2」とだけ書かれていても、8GB/256GBと16GB/512GBでは価格も使い勝手も大きく異なります。
              </p>
            </div>
          </div>
        </div>

        {/* Apple認定整備済製品 */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">Apple認定整備済製品（リファービッシュ）</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/macbook/mba-13-2024.jpg"
                  alt="Apple認定整備済製品のイメージ"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>
                Appleが公式に販売する整備済製品は、<strong>新品同様のバッテリー・外装に交換済み</strong>で1年間のハードウェア保証も付きます。MacBookの中古を検討する際は、まず整備済製品の在庫をチェックするのがおすすめです。
              </p>
              <p>
                ただし、整備済製品は<strong>在庫が不安定で欲しいモデルが常にあるとは限りません</strong>。また、価格は新品の約15%引き程度で、中古ショップの同スペック品より高い場合もあります。
              </p>
              <p>
                予算を重視するなら中古ショップ、<strong>品質と保証を重視するなら整備済製品</strong>と使い分けましょう。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
