export default function RecommendSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* MacBookがおすすめな人 */}
      <div id="recommend-macbook" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/use-macbook.jpg"
            alt="MacBookがおすすめな人"
            className="media-card__img"
            width={800}
            height={450}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">MacBookがおすすめな人</h3>
          <p className="media-card__desc">
            MacBookはプログラミングや動画編集といった作業をするのにとても最適な端末です。こういった作業を高いレベルでこなせるようになりたい方はMacBookを選択しましょう。
          </p>
          <p className="media-card__desc">
            また、複雑な作業をする予定はないけれどApple Pencilにあまり魅力を感じなかった方もMacBookを選んだほうがベターです。例えばMacBook Air M1搭載モデルでできることや処理性能をiPadで代替すると購入価格も高くなるので、コスパのよい選択肢とは言えません。
          </p>
          <ul className="media-card__list">
            <li><strong>プログラミング・Webデザイン・動画編集</strong>が主な利用用途</li>
            <li>細かくデータの管理を行いたい</li>
            <li>大きい画面で作業したい</li>
            <li>複数の外部デバイスに接続する</li>
            <li>Apple Pencilを必要としない</li>
          </ul>
        </div>
      </div>

      {/* iPadがおすすめな人 */}
      <div id="recommend-ipad" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/ipad/ipad-11-pro-m4-8.webp"
            alt="iPadがおすすめな人"
            className="media-card__img"
            width={800}
            height={450}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">iPadがおすすめな人</h3>
          <p className="media-card__desc">
            iPadの強力な武器は<strong>Apple Pencilが使える</strong>ということです。iPadで絵やイラストを描きたい方や、iPadを用いて勉強したい学生の方などはiPadを選びましょう。
          </p>
          <p className="media-card__desc">
            また、将来的に本格的に動画を作りたい・プログラミングをしたいといったニーズがなく、あくまでライトに動画や電子書籍の閲覧を楽しみたいといった方もiPadがおすすめです。
          </p>
          <ul className="media-card__list">
            <li><strong>Apple Pencilでノートを取りたい</strong></li>
            <li><strong>Apple Pencilでイラストを描きたい</strong></li>
            <li>スマホよりも大きい画面で動画を楽しみたい</li>
            <li>電子書籍を読みたい</li>
            <li>将来的にクリエイティブなソフトを使う予定はない</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
