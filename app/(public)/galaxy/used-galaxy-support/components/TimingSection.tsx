import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①Androidアップデートの保証期間が終わりに近づいた時',
    imgSrc: '/images/galaxy-article/samsung-galaxy-3.jpg',
    imgAlt: 'Samsung Galaxyのホーム画面',
    content: (
      <>
        <p>Galaxyはシリーズ・世代ごとにアップデート保証期間が決まっており、その期間が終わると最新のAndroid（One UI）やセキュリティパッチを受け取れなくなります。</p>
        <ul className="media-card__list u-mb-md">
          <li>S24以降のSシリーズ・Z Flip6／Z Fold6以降の折りたたみ：OS・セキュリティとも7年に延長</li>
          <li>S22／S23世代：セキュリティ更新5年・OSメジャー更新4回</li>
          <li>S20／S21世代・Aシリーズ：機種によりOS更新2〜4回・セキュリティ数年</li>
        </ul>
        <p>更新が止まると下記のような支障が出ます。</p>
        <ul className="media-card__list u-mb-md">
          <li>セキュリティパッチが届かず不正アクセスのリスクが高まる</li>
          <li>金融系アプリや一部アプリが次第に非対応になる</li>
          <li>Galaxy AIやかこって検索など新しい機能が届かない</li>
        </ul>
        <p>保証期間の終了時期が近づいてきたら、買い替えを検討するタイミングといえるでしょう。特に旧世代やAシリーズは保証年数が短めなので、中古で選ぶ際は残り期間に注意が必要です。</p>
      </>
    ),
  },
  {
    title: '②バッテリー持ちの劣化を感じはじめた時',
    imgSrc: '/images/galaxy-article/samsung-galaxy-5.jpg',
    imgAlt: 'スマートフォンのバッテリー状態画面',
    content: (
      <>
        <p>Galaxyのバッテリーにはリチウムイオン電池が使われており、充電を繰り返すうちに劣化して1日の電池持ちが短くなっていきます。「以前より減りが早い」と感じたら、交換または買い替えを検討するタイミングです。</p>
        <p>特にZ Flip／Z Foldなどの折りたたみはバッテリー容量が控えめな傾向があり、劣化の影響を感じやすい機種もあります。まずは正規サービスプロバイダでのバッテリー交換を検討し、発売から年数が経っている場合は買い替えとのコストを比較しましょう。</p>
      </>
    ),
    footer: (
      <>
        <h3 className="caution-how-to__heading">バッテリー状態の確認方法</h3>
        <ol className="caution-steps">
          <li className="caution-steps__item">
            <span className="caution-steps__num">1</span>
            <span className="caution-steps__text">「設定」アプリを開く</span>
          </li>
          <li className="caution-steps__item">
            <span className="caution-steps__num">2</span>
            <span className="caution-steps__text">「バッテリー」をタップ</span>
          </li>
          <li className="caution-steps__item">
            <span className="caution-steps__num">3</span>
            <span className="caution-steps__text">「バッテリー」→「バッテリー情報」で状態や使用状況を確認（対応機種）</span>
          </li>
        </ol>
      </>
    ),
  },
  {
    title: '③性能面で不満を感じはじめた時',
    imgSrc: '/images/galaxy-article/samsung-galaxy-4.jpg',
    imgAlt: 'Samsung Galaxyの性能イメージ',
    content: (
      <>
        <p>Galaxyを使う中で下記のように性能面の不満を感じ始めたら、買い替えを検討するタイミングといっていいでしょう。</p>
        <ul className="media-card__list u-mb-md">
          <li>ゲームなどをしていると処理が重く感じる</li>
          <li>発熱が頻繁に気になるようになった</li>
          <li>写真や動画の映りが微妙に感じる</li>
        </ul>
        <p>
          Galaxyは世代ごとにSoC（Snapdragon、一部Exynos／Dimensity）が進化し、処理性能・AI処理・カメラ性能が向上しています。新しい世代に買い替えることで、より快適に使えるようになります。
        </p>
        <p>
          SoCの世代でどれだけ性能が変わるのか気になる方は
          <Link prefetch={false} href="/galaxy/galaxy-spec-table/">歴代Galaxyのスペック比較</Link>
          や
          <Link prefetch={false} href="/galaxy/benchmark/">Galaxyのベンチマーク比較</Link>
          をチェックしてみてください。
        </p>
      </>
    ),
  },
  {
    title: '④端末代の支払を終えた時',
    imgSrc: '/images/galaxy-article/samsung-galaxy-2.jpg',
    imgAlt: '端末代の支払いイメージ',
    content: (
      <>
        <p>Galaxyの端末代金の支払いを終えたタイミングは、買い替えを検討する絶好の機会です。</p>
        <p>特にキャリアの分割・購入プログラムを利用している場合は、支払い完了や返却のタイミングが最大の節目となります。</p>
        <p>この時期に新しいモデルへ買い替えることで、実質的なコストを抑えながら、7年サポート対象のフラッグシップ（Sシリーズ）や折りたたみ（Zシリーズ）を長く使い続けることができます。中古のGalaxyはAシリーズ含めコスパが高く、支払い完了後の乗り換え先としても魅力的です。</p>
      </>
    ),
  },
]

export default function GalaxyTimingSection() {
  return (
    <TimingSectionBase
      sectionTitle="Galaxyを買い替えるべき4つのタイミング"
      sectionDescription="ここからはSamsung Galaxyを買い替えるべきタイミングを4つに分けて解説していきます。"
      cards={TIMING_CARDS}
      afterContent={
        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            買い替え先に迷っている方は
            <Link prefetch={false} href="/galaxy/">中古Samsung Galaxyおすすめ機種・選び方まとめ</Link>
            や
            <Link prefetch={false} href="/galaxy/battery-compare/">Galaxyのバッテリー比較</Link>
            もあわせてチェックしてみてください。
          </p>
        </div>
      }
    />
  )
}
