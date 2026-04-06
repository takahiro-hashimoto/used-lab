export default function SummarySection() {
  return (
    <section className="l-section" id="summary" aria-labelledby="heading-summary">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
          おすすめの中古iPhone
        </h2>
        <p className="m-section-desc">
          どちらにするか迷ったら、おすすめモデル一覧もチェックしてみてください
        </p>
        <div className="m-card m-card--shadow popular-card">
          <div className="popular-card-body">
            <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
            <h3 className="popular-card-title">中古iPhoneおすすめモデル</h3>
            <div className="popular-card-buttons">
              <a href="/iphone/recommend/" className="m-btn m-btn--primary">
                おすすめモデルを見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a className="m-btn m-btn--secondary" href="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fiphone" target="_blank" rel="nofollow noopener noreferrer">
                イオシスで中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
