import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①発売から7年が経過しそうになった時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=MacBook',
    imgAlt: 'MacBookのイメージ',
    content: (
      <>
        <p>これまで解説した通り、MacBookは発売から約7年が経過すると、最新のmacOSアップデート対象から外れる可能性が非常に高くなります。</p>
        <p>OSの更新が止まると、最新の機能が使えないだけでなく、セキュリティのリスクが高まったり、XcodeやAdobe製品などのプロ向けアプリが次第に非対応になったりと、業務に直結する支障が出てきます。</p>
        <p>また、Appleでは販売終了から7年経った製品を「オブソリート製品」と定義しており、この指定を受けるとAppleでの修理受付が完全に終了します。</p>
        <p>発売から7年は、安全性と快適さを維持しながら使い続けられる「物理的な限界ライン」といえるでしょう。</p>
      </>
    ),
  },
  {
    title: '②バッテリーの持ちが明らかに悪くなった時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Battery',
    imgAlt: 'バッテリーの状態画面',
    content: (
      <>
        <p>MacBookのバッテリーにはリチウムポリマー電池が使用されており、充電を繰り返すうちに最大容量が減少していきます。</p>
        <p>MacBookのバッテリー充放電回数は「システム情報」→「電源」から確認できます。一般的に1,000回を超えるとバッテリーの劣化が進むとされています。</p>
        <p>バッテリーの持ちが購入時の半分以下に感じたら、バッテリー交換もしくは買い替えを検討するタイミングです。</p>
        <div className="m-callout m-callout--tip">
          <span className="m-callout__label">バッテリー状態の確認方法</span>
          <p className="m-callout__text">Appleメニュー → 「システム設定」→「バッテリー」→「バッテリーの状態」から確認できます。</p>
        </div>
      </>
    ),
  },
  {
    title: '③作業効率に不満を感じ始めた時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Performance',
    imgAlt: 'MacBookの性能イメージ',
    content: (
      <>
        <p>MacBookを使用する中で下記のような不満を感じ始めたら、買い替えを検討するタイミングです。</p>
        <ul>
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
    />
  )
}
