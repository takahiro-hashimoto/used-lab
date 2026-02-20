import Image from 'next/image'

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
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">フリマ・オークション購入時</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/iphone/iphone16pro.jpg"
                  alt="フリマアプリのイメージ画像"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>メルカリやヤフオクなどの個人間取引は、価格の安さが最大の魅力です。しかし、その分リスクも大きくなります。</p>
              <p>
                個人取引では<strong>赤ロム（ネットワーク制限）、バッテリー状態の詐称、アクティベーションロック未解除</strong>などのトラブルが多発します。問題が起きても保証がなく、基本的には自己責任での対応となります。
              </p>
              <p>
                「<strong>安い＝自己責任の範囲が広い</strong>」ということを理解した上で利用しましょう。中古iPhoneの購入経験がない方には正直おすすめしません。
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
                  src="/images/iphone/iphone16pro.jpg"
                  alt="中古ショップのイメージ画像"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>イオシス・にこスマ・ゲオなどの中古ショップは、検品体制や保証が整っているため、初心者でも安心して購入できます。ただし、注意すべき点もあります。</p>
              <p>
                <strong>表記ランク（A/B/Cなど）の基準はショップごとに異なります。</strong>同じ「Bランク」でも、店舗によって状態に差があることを理解しておきましょう。また、保証内容もショップごとに違うため、購入前に確認が必要です。
              </p>
              <p>
                さらに、「未使用」「美品」でも内部状態（バッテリーなど）は別問題です。外装がきれいでもバッテリーが劣化しているケースがあるため、最大容量の表示があるショップを選ぶと安心です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
