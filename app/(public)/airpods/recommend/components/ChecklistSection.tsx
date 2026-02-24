export default function ChecklistSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古AirPods購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古AirPods購入後に<strong>トラブルになりやすいポイント</strong>を4つに絞りました。
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
              <h3 className="criteria-card__title">バッテリーの劣化状態を確認</h3>
            </div>
            <p className="criteria-card__desc">
              AirPodsはバッテリー交換が難しい製品です。中古品では使用年数に応じてバッテリーが劣化しており、新品時より再生時間が短くなっている場合があります。商品説明やショップに確認して、極端に駆動時間が短くないか確認しましょう。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue">
                <i className="fa-solid fa-box-open" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">充電ケースの状態を確認</h3>
            </div>
            <p className="criteria-card__desc">
              イヤホン本体だけでなく、充電ケースのバッテリーも劣化します。ケースが膨張していないか、充電端子に損傷がないか、蓋の開閉がスムーズかなどを確認しましょう。ケースだけの交換はAppleでも対応可能ですが、費用がかかります。
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
              初期不良やペアリング不良に対応する<strong>保証期間</strong>をチェック。イオシスなら3ヶ月保証など、ショップによって異なります。保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue">
                <i className="fa-solid fa-plug" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">充電端子を確認する（Lightning / USB-C）</h3>
            </div>
            <p className="criteria-card__desc">
              AirPodsは世代によって充電端子がLightningまたはUSB-Cと異なります。iPhone 15以降やMacBookとケーブルを統一したい場合は<strong>USB-C対応モデル</strong>を選びましょう。今回おすすめしている{' '}3機種はすべてUSB-C対応です。
            </p>
          </div>
        </div>

        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各モデルのサポート終了時期や注意点は
            <a href="/airpods/used-airpods-attention/">中古AirPods購入時の注意点まとめ</a>、
            <a href="/airpods/used-airpods-support/">サポート期間一覧</a>で詳しく解説しています
          </p>
        </div>
      </div>
    </section>
  )
}
