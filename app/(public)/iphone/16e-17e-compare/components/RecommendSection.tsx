export default function RecommendSection() {
  return (
    <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
          結論：こんな人は16e、こんな人は17e
        </h2>
        <p className="m-section-desc">
          これまでの比較を踏まえて、それぞれがどんな方に向いているかをまとめます
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {/* 16eがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">
              <i className="fa-solid fa-coins" aria-hidden="true" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-primary)' }}></i>
              iPhone 16eがおすすめな人
            </h3>
            <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2.2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-md)' }}>
              <li>128GBストレージで十分な人</li>
              <li>カメラコントロールボタンを使いたい人</li>
              <li>MagSafe 25W充電を活用したい人</li>
              <li>中古で安く手に入れたい人</li>
              <li>カラーでコーラルやティールが欲しい人</li>
            </ul>
            <p className="popular-card-desc" style={{ marginTop: 'var(--space-lg)' }}>
              中古市場では<strong>16eの方が価格がこなれており、コスパ重視なら最適</strong>です。カメラコントロールとMagSafe 25Wは16eだけの強みです。
            </p>
          </div>

          {/* 17eがおすすめな人 */}
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="popular-card-title">
              <i className="fa-solid fa-microchip" aria-hidden="true" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-primary)' }}></i>
              iPhone 17eがおすすめな人
            </h3>
            <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2.2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-md)' }}>
              <li>最新のA19チップの性能が欲しい人</li>
              <li>Apple自社モデム（C1X）による省電力に期待する人</li>
              <li>できるだけ長くiOSサポートを受けたい人</li>
              <li>最低256GBのストレージが必要な人</li>
              <li>ソフトピンクのカラーが気に入った人</li>
            </ul>
            <p className="popular-card-desc" style={{ marginTop: 'var(--space-lg)' }}>
              <strong>長期利用を重視するなら17e</strong>です。チップが新しい分、iOSサポート期間も長くなることが期待できます。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
