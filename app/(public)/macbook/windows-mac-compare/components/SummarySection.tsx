import ComparisonTable from './ComparisonTable'

export default function SummarySection() {
  return (
    <section className="l-section l-section--bg-subtle" id="summary" aria-labelledby="heading-summary">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
          MacとWindowsどっちがいい？まとめ
        </h2>
        <p className="m-section-desc">
          パソコンを初めて選ぶ方やOSの乗り換えを検討している方に向けて、主な比較項目をおさらいします
        </p>

        <ComparisonTable />

        <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
          <p className="popular-card-desc">
            ぜひ両者のメリット・デメリットを把握した上で、自分の用途にピッタリ合うパソコンを購入してください。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            Macの購入を検討中の方は、中古のMacBookも選択肢に入れてみてはいかがでしょうか。中古でも状態のよい製品を選べばお得に高性能なMacを手に入れることができます。
          </p>
          <div style={{ marginTop: 'var(--space-md)' }}>
            <a href="/macbook" className="m-btn m-btn--primary">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              <span>中古MacBook完全購入ガイドを見る</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
