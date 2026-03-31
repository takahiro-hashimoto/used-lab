export default function SummarySection() {
  return (
    <>
      <section className="l-section" id="summary" aria-labelledby="heading-summary">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
            MacとWindowsどっちがいい？まとめ
          </h2>
          <p className="m-section-desc">
            両者の特徴を一言でまとめると以下のとおり。どちらが優れているかではなく、自分の使い方に合ったOSを選ぶことが重要です。
          </p>

          <div className="l-grid l-grid--2col" style={{ gap: 'var(--space-lg)', marginTop: 'var(--space-xl)' }}>
            {/* Windows */}
            <div className="m-card m-card--shadow m-card--padded">
              <h3 className="popular-card-title">
                <i className="fa-brands fa-windows" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                Windowsが向いている人
              </h3>
              <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
                <li>予算や用途に合わせて柔軟に選びたい</li>
                <li>Officeやビジネスソフトを多用する</li>
                <li>PCゲームを楽しみたい</li>
                <li>パーツ交換やカスタマイズがしたい</li>
                <li>職場・学校がWindows環境</li>
              </ul>
            </div>

            {/* Mac */}
            <div className="m-card m-card--shadow m-card--padded">
              <h3 className="popular-card-title">
                <i className="fa-brands fa-apple" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                Macが向いている人
              </h3>
              <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
                <li>長時間バッテリーで持ち運びたい</li>
                <li>iPhone・iPadと連携して使いたい</li>
                <li>デザイン・動画編集・プログラミング用途</li>
                <li>選択肢が多すぎると迷ってしまう</li>
                <li>リセールバリュー重視で長く使いたい</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="l-section" id="popular" aria-labelledby="heading-popular">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
            目的別に人気の中古MacBook
          </h2>
          <p className="m-section-desc">
            目的別におすすめの機種を厳選。購入すべき中古MacBookをさくっと知りたい方はぜひご覧ください。
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
              <p className="popular-card-desc">
                コスパ重視、クリエイティブ向け、持ち運び重視など目的別に買うべきモデルを紹介。チップ性能やメモリ、バッテリー持ち、macOSサポート期間など購入前にチェックすべき項目も網羅しています。
              </p>
              <div>
                <a href="/macbook/recommend/" className="m-btn m-btn--primary">
                  おすすめモデルを見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
