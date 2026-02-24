export default function ChecklistSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古Apple Watch購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古Apple Watch購入後に<strong className="text-negative">トラブルになりやすいポイント</strong>を5つに絞りました。
        </p>
        <p className="m-section-desc">どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg post-check-grid">
          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-battery-half" aria-hidden="true"></i> バッテリー最大容量は80%以上が目安
            </h3>
            <div className="caution-check-card__text m-rich-text">
              <p>Apple Watchはバッテリー持ちが使い心地に直結します。新品時は最大18時間（Ultraは最大36時間）ですが、80%を下回ると1日持たない可能性が高くなります。にこスマなどバッテリー表示のあるショップで確認してから購入するのがおすすめです。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-ruler" aria-hidden="true"></i> ケースサイズを確認する
            </h3>
            <div className="caution-check-card__text m-rich-text">
              <p>Apple Watchにはモデルごとに複数のケースサイズがあります（40mm/44mm、41mm/45mmなど）。手首の太さや好みに合ったサイズを選びましょう。バンドの互換性もサイズに依存するため、既にバンドを持っている場合は特に注意が必要です。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-heart-pulse" aria-hidden="true"></i> 必要な健康機能を確認する
            </h3>
            <div className="caution-check-card__text m-rich-text">
              <p>心電図・血中酸素濃度・皮膚温センサーなどの健康機能は、モデルによって搭載の有無が異なります。健康管理目的でApple Watchを購入する方は、必要な機能が搭載されているモデルかどうかを事前に確認しましょう。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-signal" aria-hidden="true"></i> GPS / Cellularモデルの違い
            </h3>
            <div className="caution-check-card__text m-rich-text">
              <p>GPSモデルはiPhoneが近くにある状態で通信しますが、CellularモデルはiPhoneなしでも単独通信が可能です。ランニングなどiPhoneを持たずに外出する場面が多い方はCellularモデルが便利ですが、大半の方はGPSモデルで十分です。</p>
            </div>
          </div>

          <div className="m-card m-card--shadow m-card--padded post-check-item">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-mobile-screen" aria-hidden="true"></i> watchOSサポート期間を確認する
            </h3>
            <div className="caution-check-card__text m-rich-text">
              <p>発売から<strong>約6〜7年</strong>でサポート終了するのが過去の傾向です。サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎるモデル</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</p>
            </div>
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
