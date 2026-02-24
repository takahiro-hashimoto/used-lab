export default function ChecklistSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古MacBook購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古MacBook購入後に<strong>トラブルになりやすいポイント</strong>を4つに絞りました。
        </p>
        <p className="m-section-desc">
          どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue m-icon-box m-icon-box--sm">
                <i className="fa-solid fa-battery-three-quarters" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">バッテリーの充放電回数を確認</h3>
            </div>
            <p className="criteria-card__desc">
              MacBookのバッテリーは約1,000回の充放電サイクルが目安です。充放電回数が多いほどバッテリーの劣化が進んでおり、駆動時間が短くなります。購入前に「システム情報」から確認できるか、ショップに問い合わせましょう。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue m-icon-box m-icon-box--sm">
                <i className="fa-solid fa-hard-drive" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">ストレージ容量を確認する</h3>
            </div>
            <p className="criteria-card__desc">
              MacBookはストレージの後から増設ができません。Web閲覧・事務作業メインなら256GBでも十分ですが、写真や動画編集をする場合は512GB以上を選びましょう。容量不足はクラウドや外付けSSDで補う手もあります。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue m-icon-box m-icon-box--sm">
                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">ショップ保証の有無を確認</h3>
            </div>
            <p className="criteria-card__desc">
              初期不良やバッテリー異常に対応する<strong>保証期間</strong>をチェック。イオシスなら3ヶ月保証、じゃんぱらなら1ヶ月保証など、ショップによって異なります。保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。
            </p>
          </div>

          <div className="m-card m-card--shadow criteria-card">
            <div className="criteria-card__head">
              <span className="criteria-card__icon criteria-card__icon--sm criteria-card__icon--blue m-icon-box m-icon-box--sm">
                <i className="fa-solid fa-laptop" aria-hidden="true"></i>
              </span>
              <h3 className="criteria-card__title">macOSサポート期間を確認する</h3>
            </div>
            <p className="criteria-card__desc">
              発売から約7年でサポート終了するのが過去の傾向です。サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎる機種</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。
            </p>
          </div>
        </div>

        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各モデルのサポート終了時期や注意点は
            <a href="/macbook/used-macbook-attention/">中古MacBook購入時の注意点まとめ</a>、
            <a href="/macbook/used-macbook-support/">macOSのサポート期間一覧</a>で詳しく解説しています
          </p>
        </div>
      </div>
    </section>
  )
}
