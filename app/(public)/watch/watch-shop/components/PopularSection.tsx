export default function PopularSection() {
  return (
    <section className="l-section" id="popular" aria-labelledby="heading-popular">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
          目的別に人気の中古Apple Watch
        </h2>
        <p className="m-section-desc">目的別におすすめの機種を厳選。購入すべき中古Apple Watchをさくっと知りたい方はぜひご覧ください。</p>
        <div className="m-card m-card--shadow popular-card">
          <figure className="popular-card-figure">
            <img
              src="https://placehold.co/400x500/e8e8ed/6e6e73?text=Apple+Watch"
              alt="中古Apple Watchおすすめ3選のイメージ画像"
              className="popular-card-img"
              width={400}
              height={500}
              loading="lazy"
            />
          </figure>
          <div className="popular-card-body">
            <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
            <h3 className="popular-card-title">中古Apple Watchおすすめ3選</h3>
            <p className="popular-card-desc">
              万能モデル、コスパ重視、アウトドア向けなど目的別に買うべきモデルを紹介。健康機能やバッテリー持ち、watchOSサポート期間など購入前にチェックすべき項目も網羅しています。
            </p>
            <div>
              <a href="/watch/recommend/" className="m-btn m-btn--primary">
                おすすめ3機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
