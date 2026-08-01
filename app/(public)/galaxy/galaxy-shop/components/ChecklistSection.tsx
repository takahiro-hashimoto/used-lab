import Link from 'next/link'
import IconCard from '@/app/components/IconCard'

export default function ChecklistSection() {
  return (
    <section className="l-section" id="checklist" aria-labelledby="heading-checklist">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-checklist">
          中古Samsung Galaxy購入直前の最終チェックリスト
        </h2>
        <p className="m-section-desc">
          中古Galaxy購入後に<strong className="text-negative">トラブルになりやすいポイント</strong>を4つに絞りました。
        </p>
        <p className="m-section-desc">どれも実際の購入者が見落としがちな項目なので、必ず確認しておきましょう。</p>

        <div className="l-grid l-grid--2col l-grid--gap-lg u-mt-xl">
          {/* バッテリー最大容量 */}
          <IconCard icon="fa-solid fa-battery-half" title="バッテリーの劣化状態を確認する">
              <p>中古Galaxyではバッテリーの劣化具合が使い心地に直結します。</p>
              <p>劣化が進んだ個体は価格が安くても購入後に交換が必要になるケースが多く、割高になることも。状態表記のあるショップで選ぶのが安心です。</p>
          </IconCard>

          {/* ネットワーク利用制限 */}
          <IconCard icon="fa-solid fa-signal" title="ネットワーク利用制限は「○」を選ぶ">
              <p>「○」判定は分割払い完済済みの証。「△」は前の持ち主が分割払い中で、将来的に赤ロム（通信不可）になるリスクがあります。</p>
              <p>なお、<strong>SIMフリー版（SIMロック解除済み）</strong>なら格安SIMを含めどのキャリアでも使えて安心です。</p>
          </IconCard>

          {/* ショップ保証 */}
          <IconCard icon="fa-solid fa-shield-halved" title="ショップ保証の有無を確認">
              <p>初期不良や赤ロム化に対応する<strong>保証期間</strong>をチェック。イオシスなら3〜6ヶ月、にこスマなら1年保証など、ショップによって異なります。</p>
              <p>保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</p>
          </IconCard>

          {/* Androidサポート期間 */}
          <IconCard icon="fa-solid fa-mobile-screen" title="Androidアップデートの保証期間を確認する">
              <p>S24・S25世代やFlip6/Fold6は<strong>OS・セキュリティ更新が最大7年</strong>と長め。一方、旧世代やAシリーズは更新期間が短めです。</p>
              <p>サポートが切れるとセキュリティリスクが高まるため、<strong>更新期間が残っている機種</strong>を選びましょう。各モデルのサポート期限は下記の記事で確認できます。</p>
          </IconCard>
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各モデルのサポート終了時期の目安は
            <Link prefetch={false} href="/galaxy/used-galaxy-support/">中古Galaxyのサポート期間の目安</Link>で詳しく解説しています
          </p>
        </div>
      </div>
    </section>
  )
}
