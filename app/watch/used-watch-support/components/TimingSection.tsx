import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①発売から5年が経過しそうになった時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Watch',
    imgAlt: 'Apple Watchのイメージ',
    content: (
      <>
        <p>これまで解説した通り、Apple Watchは発売から約5年が経過すると、最新のwatchOSアップデート対象から外れる可能性が非常に高くなります。iPhoneの約7年と比べるとサポート期間が短い点に注意が必要です。</p>
        <p>OSの更新が止まると、最新の健康管理機能やフィットネス機能が使えなくなるだけでなく、セキュリティリスクが高まったり、主要アプリが次第に非対応になったりといった支障が出てきます。</p>
        <p>また、Appleでは販売終了から7年経った製品を「オブソリート製品」と定義しており、この指定を受けるとAppleでの修理受付が完全に終了します。</p>
        <p>毎日腕に付けて使うApple Watchにとって、バッテリー交換などの公式サポートが受けられなくなることは致命的です。発売から5年が、安全性と快適さを維持しながら使い続けられる限界ラインといえるでしょう。</p>
      </>
    ),
  },
  {
    title: '②バッテリーの持ちが1日持たなくなった時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Battery',
    imgAlt: 'バッテリーの状態画面',
    content: (
      <>
        <p>Apple Watchのバッテリーにはリチウムイオン電池が使用されており、充電を繰り返すうちに最大容量が減少していきます。</p>
        <p>Apple Watchは毎日充電が前提のデバイスのため、バッテリーの劣化がiPhoneよりも早く進む傾向があります。1日の使用に耐えられなくなったと感じたら買い替えの検討タイミングです。</p>
        <p>Apple Watchのバッテリー最大容量は、Apple Watchの設定アプリ →「バッテリー」→「バッテリーの状態」から確認できます。80%を下回っていたら注意信号です。</p>
      </>
    ),
  },
  {
    title: '③欲しいヘルスケア機能が搭載された時',
    imgSrc: 'https://placehold.co/400x520/f5f5f7/1d1d1f?text=Health',
    imgAlt: 'ヘルスケア機能のイメージ',
    content: (
      <>
        <p>Apple Watchは毎世代ヘルスケア・フィットネス関連の機能が大幅に進化しています。特に近年は下記のような機能が追加されています。</p>
        <ul>
          <li>血圧測定機能（Series 11〜）</li>
          <li>睡眠時無呼吸の検出（Series 10〜）</li>
          <li>ダブルタップジェスチャー（Series 9〜）</li>
          <li>皮膚温度センサー（Series 8〜）</li>
        </ul>
        <p>
          これらの機能に魅力を感じた場合は、買い替えの良いタイミングです。
          各世代の機能差が気になる方は
          <Link href="/watch/watch-spec-table">歴代Apple Watchのスペック比較</Link>
          をチェックしてみてください。
        </p>
      </>
    ),
  },
]

export default function WatchTimingSection() {
  return (
    <TimingSectionBase
      sectionTitle="Apple Watchを買い替えるべき3つのタイミング"
      sectionDescription="ここからはApple Watchを買い替えるべきタイミングを3つに分けて解説していきます。"
      cards={TIMING_CARDS}
    />
  )
}
