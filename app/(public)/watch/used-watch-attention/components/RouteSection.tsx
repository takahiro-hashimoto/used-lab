import MediaCard from '@/app/components/MediaCard'

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
        <MediaCard
          src="/images/content/thumbnail/apple-watch-image.jpg"
          alt="フリマアプリのイメージ画像"
          title="フリマ・オークション購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>メルカリやヤフオクなどの個人間取引は、価格の安さが最大の魅力です。しかし、Apple Watchの中古取引では特有のリスクがあります。</p>
            <p>
              Apple Watchは画面が小さいため、写真だけでは傷やバッテリー状態を正確に判断できません。また、アクティベーションロックの解除漏れが最も多いトラブルで、購入後にペアリングできないケースが後を絶ちません。
            </p>
            <p>
              さらに、Apple WatchはiPhoneとセットで使う製品のため、ペアリング解除が正しく行われたかを写真だけでは確認できないのが難点です。中古Apple Watchの購入経験がない方には正直おすすめしません。
            </p>
          </div>
        </MediaCard>

        {/* 中古ショップ */}
        <MediaCard
          src="/images/content/thumbnail/watch-image-03.jpg"
          alt="中古ショップのイメージ画像"
          title="中古ショップ購入時"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>イオシス・ゲオなどの中古ショップは、検品体制や保証が整っているため初心者でも安心して購入できます。アクティベーションロックの解除確認も行われています。</p>
            <p>
              ただし、表記ランク（A/B/Cなど）の基準はショップごとに異なります。Apple Watchはケースの傷が目立ちやすく、同じ「Bランク」でも状態に差があることを理解しておきましょう。
            </p>
            <p>
              また、Apple Watchはバッテリー残量を掲載していないショップがほとんどです。できるだけ状態ランクの高い端末（A〜Bランク）を選ぶことで、バッテリー劣化のリスクを抑えられます。
            </p>
          </div>
        </MediaCard>

        {/* Apple認定整備済製品 */}
        <MediaCard
          src="/images/content/thumbnail/apple-watch-type.jpg"
          alt="Apple認定整備済製品のイメージ"
          title="Apple認定整備済製品（リファービッシュ）"
          width={800}
          height={450}
          aside
        >
          <div className="media-card__desc m-rich-text">
            <p>
              Appleが公式に販売する整備済製品は、<strong>新品同様のバッテリー・外装に交換済み</strong>で1年間のハードウェア保証も付きます。中古Apple Watchを検討する際は、まず整備済製品の在庫をチェックするのがおすすめです。
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
