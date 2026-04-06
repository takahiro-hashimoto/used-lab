export default function ConclusionSection() {
  return (
    <section className="l-section" id="conclusion" aria-labelledby="heading-conclusion">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-conclusion">
          結論｜迷ったら「中古PC専門店」から選べば失敗しない
        </h2>

        <div className="m-card m-card--shadow m-card--padded" style={{ maxWidth: 720, margin: 'var(--space-xl) auto 0' }}>
          <h3 className="summary-card__title">中古MacBookの購入先選び 3つのポイント</h3>
          <ol className="summary-card__list">
            <li><strong>安全重視・初心者</strong>なら中古PC専門店 or Apple認定整備済製品を選びましょう。保証・返品対応で安心です。</li>
            <li><strong>価格重視・知識あり</strong>ならECモールがおすすめ。ポイント還元で実質価格を抑えられます。</li>
            <li><strong>最安値を狙いたい</strong>ならフリマアプリも選択肢。ただしバッテリー・キーボードの状態は自己責任です。</li>
          </ol>
          <p className="m-desc-text" style={{ marginTop: 'var(--space-md)' }}>MacBookは仕事のメインマシンになることが多く、不具合は生産性に直結します。迷っているなら保証・返品に対応した「専門店」か「Apple整備済」を選べば失敗しにくいです。</p>
        </div>
      </div>
    </section>
  )
}
