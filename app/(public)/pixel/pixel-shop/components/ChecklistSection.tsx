import Link from 'next/link'
import IconCard from '@/app/components/IconCard'

export default function ChecklistSection() {
  return (
    <section className="l-section" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古Google Pixel購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古Google Pixel購入後に<strong className="text-negative">トラブルになりやすいポイント</strong>を4つに絞りました。
        </p>
        <p className="m-section-desc">どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg u-mt-xl">
          {/* バッテリー最大容量 */}
          <IconCard icon="fa-solid fa-battery-half" title="バッテリーの状態は80%以上が目安">
              <p>中古Pixelではバッテリーの劣化具合が使い心地に直結します。</p>
              <p>劣化が進んだ個体は価格が安くても購入後に交換が必要になるケースが多く、割高になることも。状態表記のあるショップで購入しましょう。</p>
          </IconCard>

          {/* ネットワーク利用制限 */}
          <IconCard icon="fa-solid fa-signal" title="ネットワーク利用制限は「○」を選ぶ">
              <p>「○」判定は分割払い完済済みの証。「△」は前の持ち主が分割払い中で、将来的に赤ロム（通信不可）になるリスクがあります。</p>
              <p>なお、<strong>SIMフリー版（Googleストア購入品）</strong>は元々判定対象外なので安心です。</p>
          </IconCard>

          {/* ショップ保証 */}
          <IconCard icon="fa-solid fa-shield-halved" title="ショップ保証の有無を確認">
              <p>初期不良や赤ロム化に対応する<strong>保証期間</strong>をチェック。イオシスなら3〜6ヶ月、にこスマなら1年保証など、ショップによって異なります。</p>
              <p>保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</p>
          </IconCard>

          {/* Androidサポート期間 */}
          <IconCard icon="fa-solid fa-mobile-screen" title="Androidサポート期間を確認する">
              <p>Pixel 8以降はOS・セキュリティ更新が<strong>7年</strong>、Pixel 6/7世代はセキュリティ更新が5年保証されています。</p>
              <p>サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎる機種</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</p>
          </IconCard>
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各モデルのサポート終了時期や選び方は
            <Link prefetch={false} href="/pixel/used-pixel-support/">中古Pixelのサポート期間の目安</Link>、
            <Link prefetch={false} href="/pixel/">中古Google Pixelおすすめ機種・選び方まとめ</Link>で詳しく解説しています
          </p>
        </div>
      </div>
    </section>
  )
}
