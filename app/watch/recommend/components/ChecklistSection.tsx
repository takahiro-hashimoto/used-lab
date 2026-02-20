export default function ChecklistSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古Apple Watch購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古Apple Watch購入後に<strong>トラブルになりやすいポイント</strong>を4つに絞りました。
        </p>
        <p className="m-section-desc">
          どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue">
                <i className="fa-solid fa-battery-three-quarters" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">バッテリーの劣化具合を確認する</h3>
            </div>
            <p className="criteria-card__desc">
              中古Apple Watchではバッテリーの劣化が使い心地に直結します。最大容量80%未満の場合、1日持たなくなることも。ショップの商品説明でバッテリー状態を確認しましょう。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue">
                <i className="fa-solid fa-ruler" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">ケースサイズを確認する</h3>
            </div>
            <p className="criteria-card__desc">
              Apple Watchはモデルによって40/41/42mm（小）と44/45/46/49mm（大）のサイズがあります。手首の太さに合わないサイズだと着け心地が悪くなるため、<strong>事前にサイズを確認</strong>しましょう。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">ショップ保証の有無を確認</h3>
            </div>
            <p className="criteria-card__desc">
              初期不良に対応する<strong>保証期間</strong>をチェック。イオシスなら3ヶ月保証など、ショップによって保証内容は異なります。保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue">
                <i className="fa-solid fa-clock-rotate-left" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">watchOSサポート期間を確認する</h3>
            </div>
            <p className="criteria-card__desc">
              発売から約5年でサポート終了するのが過去の傾向です。サポートが切れると新しい文字盤やアプリが使えなくなるため、<strong>発売が古すぎる機種</strong>は避けましょう。
            </p>
          </div>
        </div>

        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各モデルのサポート終了時期や注意点は
            <a href="/watch/used-watch-attention/">中古Apple Watch購入時の注意点まとめ</a>、
            <a href="/watch/used-watch-support/">watchOSのサポート期間一覧</a>で詳しく解説しています
          </p>
        </div>
      </div>
    </section>
  )
}
