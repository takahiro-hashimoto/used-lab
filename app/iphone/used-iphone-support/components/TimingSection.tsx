import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①発売から7年が経過しそうになった時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=iPhone',
    imgAlt: 'iPhoneのホーム画面',
    content: (
      <>
        <p>これまで解説した通り、iPhoneは発売から約7年が経過すると、最新のiOSアップデート対象から外れる可能性が非常に高くなります。</p>
        <p>OSの更新が止まると、最新の機能が使えないだけでなく、セキュリティのリスクが高まったり、LINEや金融系アプリ、SNSなどの主要アプリが次第に非対応になって使えなくなったりといった、日常生活に直結する支障が出てきます。</p>
        <p>また、Appleでは販売終了から7年経った製品を「オブソリート製品」と定義しており、この指定を受けるとAppleでの修理受付が完全に終了します。</p>
        <p>特に毎日持ち歩き、頻繁に充電を繰り返すiPhoneにとって、「バッテリー交換」などの公式サポートが受けられなくなることは致命的です。そのため、発売から7年は、安全性と快適さを維持しながら使い続けられる「物理的な限界ライン」といえるでしょう。</p>
      </>
    ),
  },
  {
    title: '②バッテリー最大容量が80%を下回った時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Battery',
    imgAlt: 'バッテリーの状態画面',
    content: (
      <>
        <p>iPhoneのバッテリーにはリチウムイオン電池が使用されています。このバッテリーは充電を繰り返すうちに劣化し、充電できる最大容量が減っていく性質があり、電池の減りの速さを感じた時も買い替えを検討するタイミングとなります。</p>
        <p>iPhoneの「バッテリー最大容量」をチェックしたときに80%を下回っているかどうかを一つの目安としましょう。</p>
        <p>ちなみに筆者の過去の経験からすると毎日iPhoneを充電すると2〜3年でバッテリー最大容量80%を下回る傾向がありました。</p>
        <div className="m-callout m-callout--tip">
          <span className="m-callout__label">バッテリー最大容量の確認方法</span>
          <p className="m-callout__text">設定アプリを開く → 「バッテリー」をタップ → 「バッテリーの状態」をタップ</p>
        </div>
      </>
    ),
  },
  {
    title: '③性能面で不満を感じはじめた時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Performance',
    imgAlt: 'iPhoneの性能イメージ',
    content: (
      <>
        <p>iPhoneを使用する中で下記のように性能面の不満を感じ始めたら、買い替えを検討するタイミングといっていいでしょう。</p>
        <ul>
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
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Payment',
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
