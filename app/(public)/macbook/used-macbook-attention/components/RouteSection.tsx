import MediaCard from '@/app/components/MediaCard'

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
        <MediaCard
          src="/images/content/thumbnail/macbook-type.jpg"
          alt="フリマアプリのイメージ画像"
          title="フリマ・オークション購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>メルカリやヤフオクなどの個人間取引は、中古ショップより安く買える可能性があります。しかし、MacBookの中古取引では特有のリスクがあります。</p>
            <p>
              MacBookは高額商品のため、<strong>スペックの詐称（Intel MacをM1と偽る等）やバッテリー状態の偽り</strong>がトラブルの原因になります。また、アクティベーションロックの解除漏れや、水没歴を隠した出品も見られます。
            </p>
            <p>
              さらに、MacBookはキーボードやディスプレイの不具合が<strong>写真だけでは判断できない</strong>のが難点です。中古MacBookの購入経験がない方には正直おすすめしません。
            </p>
          </div>
        </MediaCard>

        {/* 中古ショップ */}
        <MediaCard
          src="/images/content/thumbnail/macbook-front.jpg"
          alt="中古ショップのイメージ画像"
          title="中古ショップ購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>イオシス・じゃんぱら・ゲオなどの中古ショップは、検品体制や保証が整っているため初心者でも安心して購入できます。アクティベーションロックの解除確認も行われています。</p>
            <p>
              ただし、<strong>表記ランク（A/B/Cなど）の基準はショップごとに異なります。</strong>MacBookは天板やパームレストの傷が目立ちやすく、同じ「Bランク」でも見た目の印象に差があることを理解しておきましょう。
            </p>
            <p>
              また、MacBookは<strong>同じモデル名でもメモリ・ストレージ構成が複数ある</strong>ため、スペック表記を必ず確認してください。「MacBook Air M2」とだけ書かれていても、8GB/256GBと16GB/512GBでは価格も使い勝手も大きく異なります。ストレージ選びに迷ったら「<a href="/macbook/storage-guide/">ストレージ容量ガイド</a>」も参考にしてください。
            </p>
          </div>
        </MediaCard>

        {/* Apple認定整備済製品 */}
        <MediaCard
          src="/images/content/thumbnail/macbook-image-05.jpg"
          alt="Apple認定整備済製品のイメージ"
          title="Apple認定整備済製品（リファービッシュ）"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
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
        </MediaCard>
      </div>
    </section>
  )
}
