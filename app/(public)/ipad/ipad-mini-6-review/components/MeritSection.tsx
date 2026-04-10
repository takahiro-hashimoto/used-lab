import Link from 'next/link'

export default function MeritSection() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ①コンパクトだけど見やすいディスプレイ */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-01.webp"
            alt="iPad mini 6と5の画面比較"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">①コンパクトだけど見やすいディスプレイ</h3>
          <p className="media-card__desc">
            iPad mini 5では7.9インチだったディスプレイは指紋認証ボタンを排除したことで<strong>8.3インチ</strong>にアップしました。
          </p>
          <p className="media-card__desc u-mt-sm">
            0.4インチという数字だけ見ると大したことがないようにも思えますが、この恩恵はかなり大きい。見た目がとてもすっきりしますし、<span className="marker-yellow">情報取得効率もぐっとアップ</span>します。
          </p>
          <p className="media-card__desc u-mt-sm">
            隙間時間に電子書籍を読んだり、動画を閲覧するのには全く不満を感じることはありませんでした。
          </p>
        </div>
      </div>

      {/* ②カーナビ化するのにも絶妙なサイズ感 */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-02.webp"
            alt="iPad miniをカーナビとして使用する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">②カーナビ化するのにも絶妙なサイズ感</h3>
          <p className="media-card__desc">
            iPad miniのコンパクトなサイズ感は外出してコンテンツ消費をする以外にもカーナビ化するのにも相性抜群でした。
          </p>
          <p className="media-card__desc u-mt-sm">
            そこそこ大きな画面でルート案内も見やすいし、文字入力のしやすさも抜群。軽量な端末ということもあって市販のアクセサリーでしっかりホールドできる安心感もありました。
          </p>
          <p className="media-card__desc u-mt-sm">
            カーナビの更新にかかるコストを払うのに躊躇っている方にもiPad miniはとてもおすすめです。
          </p>
          <p className="lead-link u-mt-sm">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <Link href="/ipad/car-navigation-system/">iPadをカーナビ化するメリットが凄い！</Link>
          </p>
        </div>
      </div>

      {/* ③Apple Pencil 2対応なのが嬉しい */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-03.webp"
            alt="iPad mini 6でイラストを書く様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">③Apple Pencil 2対応なのが嬉しい</h3>
          <p className="media-card__desc">
            iPhoneやMacBookにはないiPadならではの強みといえばApple Pencil。iPad mini 6はApple Pencil 2に対応していて下記のような恩恵を受けることができます。
          </p>
          <ul className="media-card__desc u-mt-sm">
            <li>ワイヤレスで充電やペアリングができる</li>
            <li>側面をダブルタップすることで素早くツールを切り替えられる</li>
            <li>Apple PencilをiPadの側面に磁力で固定して持ち運べる</li>
          </ul>
          <p className="media-card__desc u-mt-sm">
            Apple Pencil第一世代に比べるとかなりユーザー体験がよくなったと感じるので、この点はとても満足です。
          </p>
          <p className="media-card__desc u-mt-sm">
            最新機種はApple Pencil Proが主流になってきていますが、<span className="marker-orange">個人的にはProモデル限定の機能はオーバースペック</span>に感じます。ぱっとメモを取ったり簡単なイラストを書くぐらいの作業であればiPad mini 6 + Apple Pencil 2の組み合わせで今でも問題ないでしょう。
          </p>
          <p className="lead-link u-mt-sm">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <Link href="/ipad/apple-pencil-compare/">Apple Pencilの違いを比較！あなたにぴったりのアップルペンシルがわかる</Link>
          </p>
        </div>
      </div>

      {/* ④USB-Cポート搭載で充電のしやすさがアップ */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-04.webp"
            alt="iPad mini 6とUSB-Cケーブル"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">④USB-Cポート搭載で充電のしやすさがアップ</h3>
          <p className="media-card__desc">
            前機種まで採用されていたLightning端子に代わり、iPad mini 6からは待望のUSB-Cポートが搭載されました。
          </p>
          <p className="media-card__desc u-mt-sm">
            個人的に所有デバイスの「USB-C統一」を進めているため、充電環境を一本化できるメリットは計り知れません。さらに、周辺機器を他のデバイスと共用できるようになったことで、持ち運ぶケーブル類を最小限に抑えられるように。
          </p>
          <p className="media-card__desc u-mt-sm">
            <span className="marker-yellow">装備を軽くしつつも、必要な拡張性は維持できる。</span>この絶妙なバランスのおかげで、サブ機としての機動力がさらに磨かれたと感じています。
          </p>
        </div>
      </div>

      {/* ⑤MagSafe対応アクセサリーも使える */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-05.webp"
            alt="iPad mini 6とMagSafeスタンドで作業する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">⑤MagSafe対応アクセサリーも使える</h3>
          <p className="media-card__desc">
            iPad mini 6はその軽さゆえにMagSafeリングを貼るとMagSafe対応のスタンドを使用することができるのも大きな魅力でした。
          </p>
          <p className="media-card__desc u-mt-sm">
            さまざまなスタンドを試してきましたが、中でもLeofotoのMagSafeスタンドとの組み合わせは秀逸。必要な時だけパチっと吸着させ、不要な時はサッと取り外して身軽になる。この軽快な使い心地が、iPad mini 6の機動力をさらに高めてくれています。
          </p>
          <p className="media-card__desc u-mt-sm">
            「究極のモバイル作業環境」を実現してくれる、ガジェット好きのロマンが詰まった一台だと感じています。
          </p>
        </div>
      </div>

      {/* ⑥日常のブラウジングやSNSはサクサク */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-mini-6-06.webp"
            alt="iPad mini 6を使用する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">⑥日常のブラウジングやSNSはサクサク</h3>
          <p className="media-card__desc">
            iPad mini 6はA15チップを搭載していて、Antutuベンチマークスコアは前モデルから<strong>40%もアップ</strong>しています。加えてWi-Fi 6にも対応しているので、日常のブラウジングやSNSはとにかくサクサクです。
          </p>
          <p className="media-card__desc u-mt-sm">
            3年ほど使用している今も日常的な操作において、パフォーマンス不足でストレスを感じる場面はほとんどありません。
          </p>
        </div>
      </div>
    </div>
  )
}
