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

          <div className="l-grid l-grid--2col u-mt-xl" style={{ gap: 'var(--space-lg)' }}>
            {/* Windows */}
            <div className="m-card m-card--shadow m-card--padded">
              <h3 className="popular-card-title">
                <i className="fa-brands fa-windows" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                Windowsが向いている人
              </h3>
              <ul className="info-card__list">
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
              <ul className="info-card__list">
                <li>長時間バッテリーで持ち運びたい</li>
                <li>iPhone・iPadと連携して使いたい</li>
                <li>デザイン・動画編集・プログラミング用途</li>
                <li>選択肢が多すぎると迷ってしまう</li>
                <li>リセールバリュー重視で長く使いたい</li>
              </ul>
              <p className="media-card__desc u-mt-lg">Macを選んだ方は<a href="/macbook/recommend/">おすすめの中古MacBook</a>もあわせてご覧ください。</p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
