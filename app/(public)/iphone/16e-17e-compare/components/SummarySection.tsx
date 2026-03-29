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
            <p className="popular-card-desc">
              コスパ重視、カメラ重視、長期利用など目的別に買うべきモデルを紹介。ベンチマークスコアやiOSサポート期間など購入前にチェックすべき項目も網羅しています。
            </p>
            <div>
              <a href="/iphone/recommend/" className="m-btn m-btn--primary">
                おすすめモデルを見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
