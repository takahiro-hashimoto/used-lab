import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①発売から5年が経過しそうになった時',
    imgSrc: '/images/content/thumbnail/watch-image-06.jpg',
    imgAlt: 'Apple Watchのイメージ',
    content: (
      <>
        <p>Apple Watchは発売から約5年が経過すると、最新のwatchOSアップデート対象から外れる可能性が非常に高くなります。</p>
        <p>OSの更新が止まると下記のような支障が出ます。</p>
        <ul className="media-card__list u-mb-md">
          <li>最新の健康管理・フィットネス機能が使えなくなる</li>
          <li>セキュリティアップデートが届かずリスクが高まる</li>
        </ul>
        <p>またAppleでは販売終了から7年経った製品をオブソリート製品と定義しており、この指定を受けるとAppleでの修理受付が完全に終了します。</p>
        <p>安全性と快適さを維持しながら使い続けられる限界ラインは5年程度と考えましょう。</p>
      </>
    ),
  },
  {
    title: '②欲しいヘルスケア機能が搭載された時',
    imgSrc: '/images/content/thumbnail/watch-image-10.jpg',
    imgAlt: 'ヘルスケア機能のイメージ',
    content: (
      <>
        <p>Apple Watchは毎世代ヘルスケア・フィットネス関連の機能が大幅に進化しています。特に近年は下記のような機能が追加されています。</p>
        <ul className="media-card__list u-mb-md">
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
  {
    title: '③バッテリーの持ちが1日持たなくなった時',
    imgSrc: '/images/content/thumbnail/watch-charge.jpg',
    imgAlt: 'Apple Watchのバッテリーの状態確認画面',
    content: (
      <>
        <p>Apple Watchのバッテリーにはリチウムイオン電池が使用されており、充電を繰り返すうちに<strong>充電できる最大容量が減っていく</strong>性質があります。</p>
        <p>Apple Watchは毎日充電が前提のデバイスのため、バッテリーの劣化がiPhoneよりも早く進む傾向があります。<strong>バッテリー最大容量が80%を下回ると</strong>、1日の使用に耐えられなくなるケースが増えてきます。</p>
        <p>1日持たないと感じたら、まずは下記の手順で最大容量を確認してみましょう。</p>
      </>
    ),
    footer: (
      <>
        <h3 className="caution-how-to__heading">バッテリー最大容量の確認方法</h3>
        <ol className="caution-steps">
          <li className="caution-steps__item">
            <span className="caution-steps__num">1</span>
            <span>Apple Watchの設定アプリを開く</span>
          </li>
          <li className="caution-steps__item">
            <span className="caution-steps__num">2</span>
            <span>「バッテリー」をタップ</span>
          </li>
          <li className="caution-steps__item">
            <span className="caution-steps__num">3</span>
            <span>「バッテリーの状態」をタップ</span>
          </li>
        </ol>
        <div className="m-callout m-callout--subtle caution-links-box">
          <ul className="caution-links-box__list">
            <li>
              <Link href="/watch/used-watch-attention/">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 中古Apple Watch購入時の注意点まとめ
              </Link>
            </li>
          </ul>
        </div>
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
