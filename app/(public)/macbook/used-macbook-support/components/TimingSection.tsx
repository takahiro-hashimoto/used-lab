import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①発売から7年が経過しそうになった時',
    imgSrc: '/images/content/thumbnail/macbook-image-01.jpg',
    imgAlt: 'MacBookのイメージ',
    content: (
      <>
        <p>MacBookは発売から約7年が経過すると、最新のmacOSアップデート対象から外れる可能性が非常に高くなります。</p>
        <p>OSの更新が止まると下記のような支障が出ます。</p>
        <ul className="media-card__list u-mb-md">
          <li>最新のmacOS機能が使えなくなる</li>
          <li>セキュリティアップデートが届かずリスクが高まる</li>
          <li>XcodeやAdobe製品などプロ向けアプリが次第に非対応になる</li>
        </ul>
        <p>また、Appleでは販売終了から7年経った製品を「オブソリート製品」と定義しており、この指定を受けるとAppleでの修理受付が完全に終了します。</p>
      </>
    ),
  },
  {
    title: '②バッテリーの持ちが明らかに悪くなった時',
    imgSrc: '/images/content/thumbnail/macbook-charge.jpg',
    imgAlt: 'バッテリーの状態画面',
    content: (
      <>
        <p>MacBookのバッテリーにはリチウムポリマー電池が使用されており、充電を繰り返すうちに最大容量が減少していきます。</p>
        <p>MacBookのバッテリー充放電回数は「システム情報」→「電源」から確認できます。一般的に1,000回を超えるとバッテリーの劣化が進むとされています。</p>
        <p>バッテリーの持ちが購入時の半分以下に感じたら、バッテリー交換もしくは買い替えを検討するタイミングです。</p>
      </>
    ),
    footer: (
      <>
        <h3 className="caution-how-to__heading">バッテリー状態の確認方法</h3>
        <ol className="caution-steps">
          <li className="caution-steps__item"><span className="caution-steps__num">1</span><span>画面左上の  メニュー →「システム設定」</span></li>
          <li className="caution-steps__item"><span className="caution-steps__num">2</span><span>「バッテリー」をクリック</span></li>
          <li className="caution-steps__item"><span className="caution-steps__num">3</span><span>「バッテリーの状態」をクリック</span></li>
        </ol>
      </>
    ),
  },
  {
    title: '③作業効率に不満を感じ始めた時',
    imgSrc: '/images/content/thumbnail/macbook-image-02.jpg',
    imgAlt: 'MacBookの性能イメージ',
    content: (
      <>
        <p>MacBookを使用する中で下記のような不満を感じ始めたら、買い替えを検討するタイミングです。</p>
        <ul className="media-card__list u-mb-md">
          <li>動画編集や書き出しに時間がかかるようになった</li>
          <li>複数アプリの同時起動でもたつくことが増えた</li>
          <li>ファンの音が常に気になる（Intel Macの場合）</li>
        </ul>
        <p>
          特にIntelチップからApple Silicon（M1以降）への買い替えは、性能・バッテリー持ち・静音性すべてにおいて劇的な向上が実感できます。
          各世代の性能差が気になる方は
          <Link href="/macbook/macbook-spec-table">歴代MacBookのスペック比較</Link>
          をチェックしてみてください。
        </p>
      </>
    ),
  },
]

export default function MacBookTimingSection() {
  return (
    <TimingSectionBase
      sectionTitle="MacBookを買い替えるべき3つのタイミング"
      sectionDescription="ここからはMacBookを買い替えるべきタイミングを3つに分けて解説していきます。"
      cards={TIMING_CARDS}
      afterContent={
        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            買い替えを決めたら、購入前の注意点もあわせてチェックしておきましょう。
            <Link href="/macbook/used-macbook-attention/">中古MacBookの注意点まとめ</Link>で詳しく解説しています。
          </p>
        </div>
      }
    />
  )
}
