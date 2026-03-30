import IconCard from '@/app/components/IconCard'

export default function BuyingOptionsSection() {
  return (
    <section className="l-section" id="shops" aria-labelledby="heading-shops">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-shops">
          中古iPhoneはどこで買える？主な購入先4つ
        </h2>
        <p className="m-section-desc">中古iPhoneを購入できる場所は大きく分けて4つあります。</p>
        <p className="m-section-desc">それぞれの特徴を簡単に把握しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg post-check-grid">
          {/* 中古スマホ専門店 */}
          <IconCard icon="fa-solid fa-store" title="中古スマホ専門店">
              <p>イオシス、にこスマ、ゲオなど、中古スマホを専門に扱うショップ。独自の保証制度や検品体制を整えています。</p>
          </IconCard>

          {/* キャリア認定中古 */}
          <IconCard icon="fa-solid fa-mobile-screen-button" title="キャリア認定中古">
              <p>ドコモ、au、ソフトバンクなどの通信キャリアが販売する認定整備済みiPhone。キャリア独自の保証が付帯します。</p>
          </IconCard>

          {/* ECモール */}
          <IconCard icon="fa-solid fa-cart-shopping" title="ECモール（Amazon / 楽天など）">
              <p>Amazonや楽天市場などのECモールに出店している中古ショップから購入。ポイント還元などのメリットがあります。</p>
          </IconCard>

          {/* フリマアプリ・個人売買 */}
          <IconCard icon="fa-solid fa-comments-dollar" title="フリマアプリ・個人売買">
              <p>メルカリやヤフオクなど、個人間で売買できるプラットフォーム。価格の安さが魅力ですが、自己責任の範囲が広くなります。</p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}
