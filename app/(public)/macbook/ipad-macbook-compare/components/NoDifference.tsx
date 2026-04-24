import ContentImage from '../../../../components/ContentImage'
export default function NoDifference() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* Webサイトの閲覧 */}
      <div id="web-browsing" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <ContentImage
            src="/images/content/thumbnail/ipad-magic-keyboard-01.jpg"
            alt="Webサイトを閲覧する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">Webサイトの閲覧</h3>
          <p className="media-card__desc">
            Webサイトの閲覧のようにシンプルに情報を得る作業では、MacBook・iPadどちらのデバイスでも使用感に大きな差はありません。
          </p>
          <p className="media-card__desc u-mt-sm">
            また、MacBook・iPadどちらも複数のアプリを一画面に表示することができるので、<strong>情報を取得しながらメモを取ったりする作業もあまり差はない</strong>と言ってよいでしょう。
          </p>
        </div>
      </div>

      {/* 動画の視聴 */}
      <div id="video-watching" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <ContentImage
            src="/images/content/thumbnail/ipad-image-05.jpg"
            alt="動画を視聴する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">動画の視聴</h3>
          <p className="media-card__desc">
            YouTubeやNetflixなどで動画を楽しむのはMacBookとiPadで差がありません。
          </p>
          <p className="media-card__desc u-mt-sm">
            Webサイトの閲覧と同様に、<strong>画面操作がほとんど必要なく受動的に情報を得るような作業はデバイスによる得意・不得意がない</strong>と考えてよいでしょう。
          </p>
        </div>
      </div>

      {/* メールやレポートの作成 */}
      <div id="email-report" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <ContentImage
            src="/images/content/thumbnail/ipad-magik-keyboard.jpg"
            alt="メールやレポートを作成する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">メールやレポートの作成</h3>
          <p className="media-card__desc">
            電子メールやレポート作成のようなシンプルな文章作成については、作業感に違いがほとんどありません。
          </p>
          <p className="media-card__desc u-mt-sm">
            ただし、MacBookにはコピーしたテキストやあらかじめ保存していたテンプレート文章をワンタッチで呼び出せる便利なアプリケーションがあります。<strong>文書作成を効率化させるならMacBookのほうがやや有利</strong>かもしれません。
          </p>
        </div>
      </div>
    </div>
  )
}
