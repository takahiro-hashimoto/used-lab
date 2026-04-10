import MediaCard from '@/app/components/MediaCard'

export default function RouteSection() {
  return (
    <section className="l-section" id="route" aria-labelledby="heading-route">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-route">
          中古iPhone 購入ルート別の注意点
        </h2>
        <p className="m-section-desc">同じ中古iPhoneでも、どこで買うかによって「地雷の種類」が違います。</p>
        <p className="m-section-desc">購入先ごとのリスクを理解しておきましょう。</p>

        {/* フリマ・オークション */}
        <MediaCard
          src="/images/content/thumbnail/activate-lock.png"
          alt="フリマアプリのイメージ画像"
          title="フリマ・オークション購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>メルカリやヤフオクなどの個人間取引は、価格の安さが最大の魅力です。しかし、その分リスクも大きくなります。</p>
            <p>
              個人取引では赤ロム（ネットワーク制限）、バッテリー状態の詐称、アクティベーションロック未解除などのトラブルが多発します。問題が起きても保証がなく、基本的には自己責任での対応となります。
            </p>
            <p>
              「<strong>安い＝自己責任の範囲が広い</strong>」ということを理解した上で利用しましょう。中古iPhoneの購入経験がない方には正直おすすめしません。
            </p>
          </div>
        </MediaCard>

        {/* 中古ショップ */}
        <MediaCard
          src="/images/content/thumbnail/used-iphone-shop.jpg"
          alt="中古ショップのイメージ画像"
          title="中古ショップ購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>イオシス・にこスマ・ゲオなどの中古ショップは、検品体制や保証が整っているため、初心者でも安心して購入できます。ただし、注意すべき点もあります。</p>
            <p>
              表記ランク（A/B/Cなど）の基準はショップごとに異なります。同じ「Bランク」でも、店舗によって状態に差があることを理解しておきましょう。また、保証内容もショップごとに違うため、購入前に確認が必要です。
            </p>
            <p>
              さらに、「未使用」「美品」でも内部状態（バッテリーなど）は別問題です。外装がきれいでもバッテリーが劣化しているケースがあるため、最大容量の表示があるショップを選ぶと安心です。
            </p>
          </div>
        </MediaCard>

        {/* Apple認定整備済製品 */}
        <MediaCard
          src="/images/content/thumbnail/iphone-image-03.jpg"
          alt="Apple認定整備済製品のイメージ"
          title="Apple認定整備済製品（リファービッシュ）"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Appleが公式に販売する整備済製品は、<strong>新品同様のバッテリー・外装に交換済み</strong>で1年間のハードウェア保証も付きます。中古iPhoneを検討する際は、まず整備済製品の在庫をチェックするのがおすすめです。
            </p>
            <p>
              ただし、整備済製品は在庫が不安定で欲しいモデルが常にあるとは限りません。また、価格は新品の約15%引き程度で、中古ショップの同スペック品より高い場合もあります。
            </p>
            <p>
              予算を重視するなら中古ショップ、品質と保証を重視するなら整備済製品と使い分けましょう。
            </p>
          </div>
        </MediaCard>
      </div>
    </section>
  )
}
