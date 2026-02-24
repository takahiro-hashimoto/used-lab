export default function NoDifference() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* Webサイトの閲覧 */}
      <div id="web-browsing" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-image.jpg"
          alt="Webサイトを閲覧する様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">Webサイトの閲覧</h3>
          <p className="popular-card-desc">
            Webサイトの閲覧のようにシンプルに情報を得る作業では、MacBook・iPadどちらのデバイスでも使用感に大きな差はありません。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            また、MacBook・iPadどちらも複数のアプリを一画面に表示することができるので、<strong>情報を取得しながらメモを取ったりする作業もあまり差はない</strong>と言ってよいでしょう。
          </p>
        </div>
      </div>

      {/* 動画の視聴 */}
      <div id="video-watching" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-mini-macbook.jpg"
          alt="動画を視聴する様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">動画の視聴</h3>
          <p className="popular-card-desc">
            YouTubeやNetflixなどで動画を楽しむのはMacBookとiPadで差がありません。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            Webサイトの閲覧と同様に、<strong>画面操作がほとんど必要なく受動的に情報を得るような作業はデバイスによる得意・不得意がない</strong>と考えてよいでしょう。
          </p>
        </div>
      </div>

      {/* メールやレポートの作成 */}
      <div id="email-report" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/use-macbook.jpg"
          alt="メールやレポートを作成する様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">メールやレポートの作成</h3>
          <p className="popular-card-desc">
            電子メールやレポート作成のようなシンプルな文章作成については、作業感に違いがほとんどありません。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            ただし、MacBookにはコピーしたテキストやあらかじめ保存していたテンプレート文章をワンタッチで呼び出せる便利なアプリケーションがあります。<strong>文書作成を効率化させるならMacBookのほうがやや有利</strong>かもしれません。
          </p>
        </div>
      </div>
    </div>
  )
}
