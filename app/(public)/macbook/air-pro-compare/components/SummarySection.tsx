export default function SummarySection() {
  return (
    <section className="l-section" id="popular" aria-labelledby="heading-popular">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
          目的別に人気の中古MacBook
        </h2>
        <p className="m-section-desc">
          目的別におすすめの機種を厳選。購入するべき機種が判断できなかった方はぜひご覧ください。
        </p>
        <div className="m-card m-card--shadow popular-card">
          <figure className="popular-card-figure">
            <img
              alt="中古MacBookおすすめのイメージ画像"
              className="popular-card-img"
              width={400}
              height={500}
              loading="lazy"
              src="/images/content/thumbnail/macbook-image-04.jpg"
            />
          </figure>
          <div className="popular-card-body">
            <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
            <h3 className="popular-card-title">中古MacBookおすすめモデル</h3>
            <div className="popular-card-buttons">
              <a href="/macbook/recommend/" className="m-btn m-btn--primary">
                おすすめモデルを見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a className="m-btn m-btn--secondary" href="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fpc%2Fnotepc%2Fmacbook" target="_blank" rel="nofollow noopener noreferrer">
                イオシスで中古MacBookを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
