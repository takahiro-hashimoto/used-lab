import Link from 'next/link'
import TimingSectionBase from '@/app/components/support/TimingSection'
import type { TimingCard } from '@/app/components/support/TimingSection'

const TIMING_CARDS: TimingCard[] = [
  {
    title: '①発売から7年が経過しそうになった時',
    imgSrc: '/images/mac-article/imac-02.jpg',
    imgAlt: 'macOSが動作するiMacのイメージ',
    content: (
      <>
        <p>iMac・Mac miniは発売から約7年が経過すると、最新のmacOSアップデート対象から外れる可能性が非常に高くなります。</p>
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
    title: '②周辺機器や拡張性が足りなくなった時',
    imgSrc: '/images/mac-article/imac-05.jpg',
    imgAlt: 'iMacに周辺機器を接続しているイメージ',
    content: (
      <>
        <p>iMac・Mac miniはバッテリーの劣化がないぶん、買い替えの判断材料は「拡張性が足りているか」に移ります。</p>
        <p>わかりやすい上限が外部ディスプレイの対応台数です。無印チップは2〜3台までですが、Pro・Max・Ultraでは5〜8台に対応します。モニターを増やしたくなったタイミングは買い替えを考える潮時です。</p>
        <p>メモリとストレージは購入後に増設できません。作業中にスワップが頻発する、空き容量が常にひっ迫しているという状態なら、外付けで凌ぐより買い替えたほうが快適です。</p>
      </>
    ),
    footer: (
      <>
        <h3 className="caution-how-to__heading">メモリ使用状況の確認方法</h3>
        <ol className="caution-steps">
          <li className="caution-steps__item"><span className="caution-steps__num">1</span><span>「アプリケーション」→「ユーティリティ」→「アクティビティモニタ」を開く</span></li>
          <li className="caution-steps__item"><span className="caution-steps__num">2</span><span>「メモリ」タブをクリック</span></li>
          <li className="caution-steps__item"><span className="caution-steps__num">3</span><span>下部の「メモリプレッシャー」が黄色・赤なら容量不足</span></li>
        </ol>
      </>
    ),
  },
  {
    title: '③作業効率に不満を感じ始めた時',
    imgSrc: '/images/mac-article/imac-01.jpg',
    imgAlt: 'iMacで作業しているイメージ',
    content: (
      <>
        <p>iMac・Mac miniを使用する中で下記のような不満を感じ始めたら、買い替えを検討するタイミングです。</p>
        <ul className="media-card__list u-mb-md">
          <li>動画編集や書き出しに時間がかかるようになった</li>
          <li>複数アプリの同時起動でもたつくことが増えた</li>
          <li>ファンの音が常に気になる（Intel Macの場合）</li>
        </ul>
        <p>
          特にIntelチップからApple Silicon（M1以降）への買い替えは、性能・バッテリー持ち・静音性すべてにおいて劇的な向上が実感できます。
          各世代の性能差が気になる方は
          <Link prefetch={false} href="/mac/mac-spec-table/">歴代iMac・Mac miniのスペック比較</Link>
          をチェックしてみてください。
        </p>
      </>
    ),
  },
]

export default function MacTimingSection() {
  return (
    <TimingSectionBase
      sectionTitle="Macを買い替えるべき3つのタイミング"
      sectionDescription="ここからはMacを買い替えるべきタイミングを3つに分けて解説していきます。"
      cards={TIMING_CARDS}
      afterContent={
        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            買い替えを決めたら、購入前の注意点もあわせてチェックしておきましょう。
            <Link prefetch={false} href="/mac/#attention">中古のiMac・Mac miniで失敗しないための3点</Link>にまとめています。
          </p>
        </div>
      }
    />
  )
}
