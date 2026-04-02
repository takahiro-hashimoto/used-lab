import IconCard from '@/app/components/IconCard'

export default function ChecklistSection() {
  return (
    <section className="l-section" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古iPhone購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古iPhone購入後に<strong className="text-negative">トラブルになりやすいポイント</strong>を4つに絞りました。
        </p>
        <p className="m-section-desc">どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg u-mt-xl">
          {/* バッテリー最大容量 */}
          <IconCard icon="fa-solid fa-battery-half" title="バッテリー最大容量は80%以上が必須">
              <p>中古iPhoneではバッテリーの劣化具合が使い心地に直結します。</p>
              <p>最大容量80%未満の場合、価格が安くても購入後に交換が必要になるケースが多く、割高になることも。</p>
          </IconCard>

          {/* ネットワーク利用制限 */}
          <IconCard icon="fa-solid fa-signal" title="ネットワーク利用制限は「○」を選ぶ">
              <p>「○」判定は分割払い完済済みの証。「△」は前の持ち主が分割払い中で、将来的に赤ロム（通信不可）になるリスクがあります。</p>
              <p>なお、<strong>SIMフリー版（Apple Store購入品）</strong>は元々判定対象外なので安心です。</p>
          </IconCard>

          {/* ショップ保証 */}
          <IconCard icon="fa-solid fa-shield-halved" title="ショップ保証の有無を確認">
              <p>初期不良や赤ロム化に対応する<strong>保証期間</strong>をチェック。イオシスなら3〜6ヶ月、にこスマなら1年保証など、ショップによって異なります。</p>
              <p>保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</p>
          </IconCard>

          {/* iOSサポート期間 */}
          <IconCard icon="fa-solid fa-mobile-screen" title="iOSサポート期間を確認する">
              <p>発売から<strong>約7年</strong>でサポート終了するのが過去の傾向です。</p>
              <p>サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎる機種</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</p>
          </IconCard>
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各モデルのサポート終了時期や注意点は
            <a href="/iphone/used-iphone-attention/">中古iPhone購入時の注意点まとめ</a>、
            <a href="/iphone/used-iphone-support/">iOSのサポート期間一覧</a>で詳しく解説しています
          </p>
        </div>
      </div>
    </section>
  )
}
