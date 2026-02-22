export default function ChecklistSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古MacBook購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古MacBook購入後に<strong className="text-negative">トラブルになりやすいポイント</strong>を5つに絞りました。
        </p>
        <p className="m-section-desc">どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg post-check-grid">
          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-battery-half" aria-hidden="true"></i> バッテリー充放電回数を確認する
            </h3>
            <div className="caution-check-card__text">
              <p>MacBookのバッテリーは充放電回数1,000回が交換目安です。500回以下なら安心、800回を超えるとバッテリー持ちに不安が出始めます。にこスマなどバッテリー表示のあるショップで確認してから購入するのがおすすめです。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-microchip" aria-hidden="true"></i> チップ（M1/M2/M3）を確認する
            </h3>
            <div className="caution-check-card__text">
              <p>Apple Siliconチップは世代が新しいほど性能と電力効率が向上します。M1でも日常作業には十分ですが、動画編集や重い作業をする方はM2以降を選びましょう。Intel搭載モデルは性能・バッテリー持ちともに劣るため注意が必要です。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-memory" aria-hidden="true"></i> メモリとストレージを確認する
            </h3>
            <div className="caution-check-card__text">
              <p>MacBookはメモリ・ストレージの増設ができないため、購入時のスペック選びが重要です。軽い作業なら8GB/256GBで十分ですが、長く使いたい方は16GB/512GB以上を選んでおくと安心です。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-keyboard" aria-hidden="true"></i> キーボード・ディスプレイの状態
            </h3>
            <div className="caution-check-card__text">
              <p>MacBookのキーボードはテカリやヘタリが発生しやすく、ディスプレイはコーティング剥がれ（ステインゲート）が起きることがあります。個別写真のあるショップで状態を確認してから購入するのがベストです。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-mobile-screen" aria-hidden="true"></i> macOSサポート期間を確認する
            </h3>
            <div className="caution-check-card__text">
              <p>MacBookは発売から<strong>約7〜8年</strong>でmacOSのサポートが終了する傾向があります。サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎるモデル</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</p>
            </div>
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
