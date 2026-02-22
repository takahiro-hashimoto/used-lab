export default function ChecklistSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古iPad購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古iPad購入後に<strong className="text-negative">トラブルになりやすいポイント</strong>を5つに絞りました。
        </p>
        <p className="m-section-desc">どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg post-check-grid">
          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-battery-half" aria-hidden="true"></i> バッテリー最大容量は80%以上が目安
            </h3>
            <div className="caution-check-card__text">
              <p>中古iPadではバッテリーの劣化具合が使い心地に直結します。iPadはiPhoneと異なり標準設定からバッテリー最大容量を確認できないため、販売店の記載を確認するか、にこスマなどバッテリー表示のあるショップで購入するのがおすすめです。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-signal" aria-hidden="true"></i> Cellularモデルは「○」を選ぶ
            </h3>
            <div className="caution-check-card__text">
              <p>Cellularモデルの場合、<strong>「○」判定</strong>は分割払い完済済みの証。「△」は前の持ち主が分割払い中で、将来的に赤ロム（通信不可）になるリスクがあります。Wi-Fiモデルはネットワーク利用制限の対象外なので、この確認は不要です。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> ショップ保証の有無を確認
            </h3>
            <div className="caution-check-card__text">
              <p>初期不良や赤ロム化に対応する<strong>保証期間</strong>をチェック。イオシスなら3〜6ヶ月、にこスマなら1年保証など、ショップによって異なります。保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-pencil" aria-hidden="true"></i> Apple Pencilの対応世代を確認
            </h3>
            <div className="caution-check-card__text">
              <p>Apple Pencilには第1世代・第2世代・USB-C・Proの4種類があり、iPadごとに対応が異なります。手書きメモやイラスト制作を考えている方は、購入前に対応Pencilを必ず確認しましょう。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-mobile-screen" aria-hidden="true"></i> iPadOSサポート期間を確認する
            </h3>
            <div className="caution-check-card__text">
              <p>発売から<strong>約7年</strong>でサポート終了するのが過去の傾向です。サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎる機種</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</p>
            </div>
          </div>
        </div>

        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各モデルのサポート終了時期や注意点は
            <a href="/ipad/used-ipad-attention/">中古iPad購入時の注意点まとめ</a>、
            <a href="/ipad/used-ipad-support/">iPadOSのサポート期間一覧</a>で詳しく解説しています
          </p>
        </div>
      </div>
    </section>
  )
}
