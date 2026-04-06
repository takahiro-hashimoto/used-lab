import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①発売から7年が経過しそうになった時',
    imgSrc: '/images/content/thumbnail/iphone-image-02.jpg',
    imgAlt: 'iPhoneのホーム画面',
    content: (
      <>
        <p>iPhoneは発売から約7年が経過すると、最新のiOSアップデート対象から外れる可能性が非常に高くなります。</p>
        <p>OSの更新が止まるとセキュリティリスクが高まるほか、LINEや金融系アプリなどが次第に非対応になり、日常利用に支障が出てきます。</p>
        <p>また、Appleは販売終了から7年経った製品を「オブソリート製品」に指定し、バッテリー交換を含むすべての修理受付を終了します。発売から7年が、安心して使い続けられる限界ラインといえるでしょう。</p>
      </>
    ),
  },
  {
    title: '②バッテリー最大容量が80%を下回った時',
    imgSrc: '/images/content/thumbnail/iphone-battery-limit.jpg',
    imgAlt: 'バッテリーの状態画面',
    content: (
      <>
        <p>iPhoneのバッテリーにはリチウムイオン電池が使用されています。このバッテリーは充電を繰り返すうちに劣化し、充電できる最大容量が減っていく性質があり、電池の減りの速さを感じた時も買い替えを検討するタイミングとなります。</p>
        <p>iPhoneの「バッテリー最大容量」をチェックしたときに80%を下回っているかどうかを一つの目安としましょう。</p>
        <p>ちなみに筆者の過去の経験からすると毎日iPhoneを充電すると2〜3年でバッテリー最大容量80%を下回る傾向がありました。</p>
      </>
    ),
    footer: (
      <>
        <h3 className="caution-how-to__heading">バッテリー最大容量の確認方法</h3>
        <ol className="caution-steps">
          <li className="caution-steps__item">
            <span className="caution-steps__num">1</span>
            <span className="caution-steps__text">設定アプリを開く</span>
          </li>
          <li className="caution-steps__item">
            <span className="caution-steps__num">2</span>
            <span className="caution-steps__text">「バッテリー」をタップ</span>
          </li>
          <li className="caution-steps__item">
            <span className="caution-steps__num">3</span>
            <span className="caution-steps__text">「バッテリーの状態」をタップ</span>
          </li>
        </ol>
      </>
    ),
  },
  {
    title: '③性能面で不満を感じはじめた時',
    imgSrc: '/images/content/thumbnail/iphone-image-03.jpg',
    imgAlt: 'iPhoneの性能イメージ',
    content: (
      <>
        <p>iPhoneを使用する中で下記のように性能面の不満を感じ始めたら、買い替えを検討するタイミングといっていいでしょう。</p>
        <ul className="media-card__list">
          <li>ゲームなどをしていると処理が重く感じる</li>
          <li>発熱が頻繁に気になるようになった</li>
          <li>写真や動画の映りが微妙に感じる</li>
        </ul>
        <p>
          iPhoneは毎年新しいシリーズになるごとに処理性能やカメラ性能が向上しているので、買い替えることでより快適にスマホを使用できるようになります。
        </p>
        <p>
          iPhoneがどのような進化を遂げているのか気になった方は
          <Link href="/iphone/iphone-spec-table">歴代iPhoneのスペック比較</Link>
          をチェックしてみてください。
        </p>
      </>
    ),
  },
  {
    title: '④端末代の支払を終えた時',
    imgSrc: '/images/content/thumbnail/used-iphone-ios-support.jpg',
    imgAlt: '端末代の支払いイメージ',
    content: (
      <>
        <p>iPhoneの端末代金の支払いを終えたタイミングは、買い替えを検討する絶好の機会です。</p>
        <p>特に大手キャリアが提供する「端末購入プログラム」を利用している場合は、購入から約2年（25ヶ月目）が最大の節目となります。</p>
        <p>この時期に端末を返却して新しいモデルに買い替えることで、残りのローン支払いが免除され、実質的なコストを最小限に抑えながら常に最新のiPhoneを使い続けることができます。</p>
      </>
    ),
  },
]

export default function IPhoneTimingSection() {
  return (
    <TimingSectionBase
      sectionTitle="iPhoneを買い替えるべき4つのタイミング"
      sectionDescription="ここからはiPhoneを買い替えるべきタイミングを4つに分けて解説していきます。"
      cards={TIMING_CARDS}
    />
  )
}
