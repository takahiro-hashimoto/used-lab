import IconCard from '@/app/components/IconCard'

export default function ChecklistSection() {
  return (
    <section className="l-section" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古iPad購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古iPad購入後に<strong className="text-negative">トラブルになりやすいポイント</strong>を5つに絞りました。
        </p>
        <p className="m-section-desc">どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg u-mt-xl">
          <IconCard icon="fa-solid fa-battery-half" title="バッテリー最大容量は80%以上が目安">
              <p>中古iPadではバッテリーの劣化具合が使い心地に直結します。</p>
              <p>iPadはiPhoneと異なり標準設定からバッテリー最大容量を確認できないため、販売店の記載を確認するか、にこスマなどバッテリー表示のあるショップで購入するのがおすすめです。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-signal" title="Cellularモデルは「○」を選ぶ">
              <p>Cellularモデルの場合、<strong>「○」判定</strong>は分割払い完済済みの証。「△」は前の持ち主が分割払い中で、将来的に赤ロム（通信不可）になるリスクがあります。</p>
              <p>Wi-Fiモデルはネットワーク利用制限の対象外なので、この確認は不要です。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-shield-halved" title="ショップ保証の有無を確認">
              <p>初期不良や赤ロム化に対応する<strong>保証期間</strong>をチェック。イオシスなら3〜6ヶ月、にこスマなら1年保証など、ショップによって異なります。</p>
              <p>保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-pencil" title="Apple Pencilの対応世代を確認">
              <p>Apple Pencilには第1世代・第2世代・USB-C・Proの4種類があり、iPadごとに対応が異なります。</p>
              <p>手書きメモやイラスト制作を考えている方は、購入前に対応Pencilを必ず確認しましょう。</p>
          </IconCard>

          <IconCard icon="fa-solid fa-mobile-screen" title="iPadOSサポート期間を確認する">
              <p>発売から<strong>約7年</strong>でサポート終了するのが過去の傾向です。</p>
              <p>サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎる機種</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</p>
          </IconCard>
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
