import Image from 'next/image'

export default function RouteSection() {
  return (
    <section className="l-section" id="route" aria-labelledby="heading-route">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-route">
          中古Apple Watch 購入ルート別の注意点
        </h2>
        <p className="m-section-desc">同じ中古Apple Watchでも、どこで買うかによってリスクの種類が異なります。</p>
        <p className="m-section-desc">購入先ごとの注意点を理解しておきましょう。</p>

        {/* フリマ・オークション */}
        <div className="m-card m-card--shadow m-card--padded caution-check-card">
          <h3 className="caution-check-card__heading">フリマ・オークション購入時</h3>
          <div className="caution-check-card__body">
            <div className="caution-check-card__visual">
              <figure className="caution-check-card__image">
                <Image
                  src="/images/watch/watch-10.jpg"
                  alt="フリマアプリのイメージ画像"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>メルカリやヤフオクなどの個人間取引は、価格の安さが最大の魅力です。しかし、Apple Watchの中古取引では特有のリスクがあります。</p>
              <p>
                Apple Watchは画面が小さいため、<strong>写真だけでは傷やバッテリー状態を正確に判断できません</strong>。また、アクティベーションロックの解除漏れが最も多いトラブルで、購入後にペアリングできないケースが後を絶ちません。
              </p>
              <p>
                さらに、Apple WatchはiPhoneとセットで使う製品のため、<strong>ペアリング解除が正しく行われたかを写真だけでは確認できない</strong>のが難点です。中古Apple Watchの購入経験がない方には正直おすすめしません。
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
                  src="/images/watch/watch-10.jpg"
                  alt="中古ショップのイメージ画像"
                  width={220}
                  height={160}
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="caution-check-card__text">
              <p>イオシス・ゲオなどの中古ショップは、検品体制や保証が整っているため初心者でも安心して購入できます。アクティベーションロックの解除確認も行われています。</p>
              <p>
                ただし、<strong>表記ランク（A/B/Cなど）の基準はショップごとに異なります。</strong>Apple Watchはケースの傷が目立ちやすく、同じ「Bランク」でも状態に差があることを理解しておきましょう。
              </p>
              <p>
                また、Apple Watchは<strong>バッテリー残量を掲載していないショップがほとんど</strong>です。できるだけ状態ランクの高い端末（A〜Bランク）を選ぶことで、バッテリー劣化のリスクを抑えられます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
