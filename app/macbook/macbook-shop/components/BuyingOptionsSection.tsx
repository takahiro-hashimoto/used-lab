export default function BuyingOptionsSection() {
  return (
    <section className="l-section" id="shops" aria-labelledby="heading-shops">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-shops">
          中古MacBookはどこで買える？主な購入先4つ
        </h2>
        <p className="m-section-desc">中古MacBookを購入できる場所は大きく分けて4つあります。</p>
        <p className="m-section-desc">それぞれの特徴を簡単に把握しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg post-check-grid">
          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-store" aria-hidden="true"></i> 中古PC専門店
            </h3>
            <div className="caution-check-card__text">
              <p>イオシス、にこスマ、ゲオなど、中古PC・スマホを専門に扱うショップ。独自の保証制度や検品体制を整えています。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-apple-whole" aria-hidden="true"></i> Apple認定整備済製品
            </h3>
            <div className="caution-check-card__text">
              <p>Apple公式が整備した中古MacBook。新品同様のバッテリーと外装、1年間のメーカー保証が付帯します。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i> ECモール（Amazon / 楽天など）
            </h3>
            <div className="caution-check-card__text">
              <p>Amazonや楽天市場などのECモールに出店している中古ショップから購入。ポイント還元などのメリットがあります。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-comments-dollar" aria-hidden="true"></i> フリマアプリ・個人売買
            </h3>
            <div className="caution-check-card__text">
              <p>メルカリやラクマなど、個人間で売買できるプラットフォーム。価格の安さが魅力ですが、自己責任の範囲が広くなります。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
