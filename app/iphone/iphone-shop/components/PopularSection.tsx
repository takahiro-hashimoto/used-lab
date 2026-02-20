export default function PopularSection() {
  return (
    <section className="l-section" id="popular" aria-labelledby="heading-popular">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
          目的別に人気の中古iPhone
        </h2>
        <p className="m-section-desc">目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。</p>
        <div className="m-card m-card--shadow popular-card">
          <figure className="popular-card-figure">
            <img
              src="https://placehold.co/400x500/e8e8ed/6e6e73?text=iPhone"
              alt="中古iPhoneおすすめ5選のイメージ画像"
              className="popular-card-img"
              width={400}
              height={500}
              loading="lazy"
            />
          </figure>
          <div className="popular-card-body">
            <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
            <h3 className="popular-card-title">中古iPhoneおすすめ5選</h3>
            <p className="popular-card-desc">
              カメラ性能を重視する人向け、大画面で動画やSNSを楽しみたい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。
            </p>
            <div>
              <a href="/iphone/recommend/" className="m-btn m-btn--primary">
                おすすめ5機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
