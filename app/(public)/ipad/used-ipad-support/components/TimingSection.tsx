import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①発売から7年が経過しそうになった時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=iPad',
    imgAlt: 'iPadのホーム画面',
    content: (
      <>
        <p>これまで解説した通り、iPadは発売から約7年が経過すると、最新のiPadOSアップデート対象から外れる可能性が非常に高くなります。</p>
        <p>OSの更新が止まると、最新の機能が使えないだけでなく、セキュリティのリスクが高まったり、主要アプリが次第に非対応になって使えなくなったりといった、日常利用に直結する支障が出てきます。</p>
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
        <p>iPadのバッテリーにはリチウムイオン電池が使用されており、充電を繰り返すうちに最大容量が減少していきます。</p>
        <p>画面が大きいiPadはiPhoneよりバッテリー消費が多く、劣化を実感しやすい傾向があります。充電の減りが早いと感じたら買い替えの検討タイミングです。</p>
        <p>iPadにはiPhoneのような「バッテリー最大容量」の表示がないため、充電の持ち時間で体感的に判断する必要があります。購入時に比べて明らかに持ちが悪くなったと感じたら注意信号です。</p>
      </>
    ),
  },
  {
    title: '③用途に対して性能が不足してきた時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Performance',
    imgAlt: 'iPadの性能イメージ',
    content: (
      <>
        <p>iPadを使用する中で下記のような不満を感じ始めたら、買い替えを検討するタイミングです。</p>
        <ul>
          <li>Apple Pencilでのイラスト作成や動画編集が重く感じる</li>
          <li>マルチタスク（Split View等）の切り替えがもたつく</li>
          <li>ゲームプレイ中にカクつきや発熱が気になる</li>
        </ul>
        <p>
          iPadは毎世代チップ性能が大幅に向上しているため、買い替えることで作業効率が大きく改善されます。
          各世代の性能差が気になる方は
          <Link href="/ipad/ipad-spec-table">歴代iPadのスペック比較</Link>
          をチェックしてみてください。
        </p>
      </>
    ),
  },
]

export default function IPadTimingSection() {
  return (
    <TimingSectionBase
      sectionTitle="iPadを買い替えるべき3つのタイミング"
      sectionDescription="ここからはiPadを買い替えるべきタイミングを3つに分けて解説していきます。"
      cards={TIMING_CARDS}
    />
  )
}
