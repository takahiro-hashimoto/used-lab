export default function RecommendSection() {
  return (
    <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
          結論：こんな人はAir、こんな人はPro
        </h2>
        <p className="m-section-desc">
          これまでの比較を踏まえて、AirとProそれぞれがどんな方に向いているかをまとめます
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {/* Airがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">
              <i className="fa-solid fa-feather" aria-hidden="true" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-primary)' }}></i>
              Airがおすすめな人
            </h3>
            <ul className="info-card__list">
              <li>Web閲覧・事務作業・SNSがメインの人</li>
              <li>持ち運びの軽さを重視する人</li>
              <li>予算を抑えたい人・コスパ重視の人</li>
              <li>大学生・新社会人でパソコンが必要な人</li>
              <li>完全な静音環境で作業したい人</li>
              <li>初めてMacを使う人</li>
            </ul>
            <p className="media-card__desc u-mt-lg">
              <strong>8割のユーザーにはMacBook Airで十分</strong>です。日常的な作業であればAirで快適に使えます。
            </p>
          </div>

          {/* Proがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">
              <i className="fa-solid fa-bolt" aria-hidden="true" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-primary)' }}></i>
              Proがおすすめな人
            </h3>
            <ul className="info-card__list">
              <li>動画編集・3Dレンダリングを日常的に行う人</li>
              <li>大規模なプログラムのビルドが必要な人</li>
              <li>音楽制作（DTM）でトラック数が多い人</li>
              <li>HDMI・SDカードスロットを頻繁に使う人</li>
              <li>外部ディスプレイを複数接続したい人</li>
              <li>ProMotion 120Hzの表示が必要な人</li>
            </ul>
            <p className="media-card__desc u-mt-lg">
              Proを選ぶべきなのは<strong>「明確にProが必要な理由がある」場合</strong>です。
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
