import IconCard from '@/app/components/IconCard'

export default function ChecklistSection() {
  return (
    <section className="l-section" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古MacBook購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古MacBook購入後に<strong className="text-negative">トラブルになりやすいポイント</strong>を5つに絞りました。
        </p>
        <p className="m-section-desc">どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg u-mt-xl">
          <IconCard icon="fa-solid fa-battery-half" title="バッテリー充放電回数を確認する">
            <p>MacBookのバッテリーは充放電回数1,000回が交換目安です。</p>
            <p>500回以下なら安心、800回を超えるとバッテリー持ちに不安が出始めます。にこスマなどバッテリー表示のあるショップで確認してから購入するのがおすすめです。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-microchip" title="チップ（M1/M2/M3）を確認する">
            <p>Apple Siliconチップは世代が新しいほど性能と電力効率が向上します。</p>
            <p>M1でも日常作業には十分ですが、動画編集や重い作業をする方はM2以降を選びましょう。Intel搭載モデルは性能・バッテリー持ちともに劣るため注意が必要です。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-memory" title="メモリとストレージを確認する">
            <p>MacBookはメモリ・ストレージの増設ができないため、購入時のスペック選びが重要です。</p>
            <p>軽い作業なら8GB/256GBで十分ですが、長く使いたい方は16GB/512GB以上を選んでおくと安心です。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-keyboard" title="キーボード・ディスプレイの状態">
            <p>MacBookのキーボードはテカリやヘタリが発生しやすく、ディスプレイはコーティング剥がれ（ステインゲート）が起きることがあります。</p>
            <p>個別写真のあるショップで状態を確認してから購入するのがベストです。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-mobile-screen" title="macOSサポート期間を確認する">
            <p>MacBookは発売から<strong>約7〜8年</strong>でmacOSのサポートが終了する傾向があります。</p>
            <p>サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎるモデル</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</p>
          </IconCard>
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
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
