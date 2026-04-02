export default function MeritSection() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ①マップを更新する必要がない */}
      <div id="merit-map" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/ipad-car-navi-old-02.webp"
            alt="iPad miniをカーナビ化した様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">①マップを更新する必要がない</h3>
          <p className="media-card__desc">
            車載カーナビの地図が古くなると、カーナビが認識していない道をひた走る羽目になったり、目的地を検索してもヒットしないことがあります。マップを更新する場合ディーラーに頼むと<strong>2〜3万円の費用</strong>がかかるのも地味に痛いポイントです。
          </p>
          <p className="media-card__desc u-mt-sm">
            しかしiPadをカーナビ化して<strong>GoogleマップやYahoo!カーナビ</strong>といったアプリを導入すれば、常に最新の地図情報をもとに道案内をしてもらうことが可能。更新を気にすることなく、いつも最新の地図で目的地に向かえるのはとても便利です。
          </p>
          <p className="media-card__desc u-mt-sm">
            Yahoo!カーナビは道案内の精度もわかりやすさも優秀で、よく行く目的地の登録や音声操作にも対応。カーナビとして使いたい機能は一通り揃っています。
          </p>
        </div>
      </div>

      {/* ②渋滞情報の精度もすばらしい */}
      <div id="merit-traffic" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/ipad-car-navi-01.webp"
            alt="iPadカーナビの渋滞情報表示"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">②渋滞情報の精度もすばらしい</h3>
          <p className="media-card__desc">
            GoogleマップやYahoo!カーナビも渋滞情報を加味した経路案内に対応しており、<strong>場合によっては車載カーナビより高い予測精度を得られる</strong>こともあります。
          </p>
          <p className="media-card__desc">
            各アプリは独自のロジックで渋滞情報を算出しているため、アプリごとに得意な場面が異なります。詳しい比較は下記をご覧ください。
          </p>
          <p className="lead-link">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <a href="#navi-app">おすすめカーナビアプリ比較を見る</a>
          </p>
        </div>
      </div>

      {/* ③画面が大きくてみやすい */}
      <div id="merit-display" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/compare-ipad-size-1.webp"
            alt="iPadの画面サイズ比較"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">③画面が大きくてみやすい</h3>
          <p className="media-card__desc">
            車載カーナビのディスプレイは5インチ〜8インチが一般的ですが、iPadは一番小さいminiサイズでも<strong>8.3インチ</strong>の大きさがあり、一般的なカーナビよりも広い画面で情報を確認できます。
          </p>
          <p className="media-card__desc u-mt-sm">
            さらにiPadの現行モデルはすべて<strong>Retinaディスプレイ</strong>を搭載。画面の大きさに加え、高精細な映像が見られるのもiPadをカーナビ化する魅力のひとつです。
          </p>
        </div>
      </div>

      {/* ④直感的な操作ができる */}
      <div id="merit-ui" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/ipad-car-navi-05.webp"
            alt="iPadで地図アプリをタッチ操作する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">④直感的な操作ができる</h3>
          <p className="media-card__desc">
            古いカーナビは文字入力が「あいうえお順」だったり、検索結果が反映されるまでの処理速度も遅かったりと、操作性に不満を感じることが少なくありません。
          </p>
          <p className="media-card__desc u-mt-sm">
            iPadなら<strong>キーボード入力でさっと目的地を入力</strong>したり、<strong>Siriに話しかけてルート案内を開始</strong>することも可能。地図のピンチイン・ピンチアウトも滑らかで、レスポンスも早いので操作周りで煩わしい思いをすることはほぼゼロになります。
          </p>
        </div>
      </div>

      {/* ⑤音楽や動画の再生もしやすい */}
      <div id="merit-media" className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/ipad-car-navi-02.webp"
            alt="iPadで音楽アプリを再生する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">⑤音楽や動画の再生もしやすい</h3>
          <p className="media-card__desc">
            車載カーナビでは音源をCDからHDDに取り込んだり、SDカードに入れてから再生するのが一般的。手軽にインターネットから音楽を再生できる時代にこの運用はやや不便です。
          </p>
          <p className="media-card__desc u-mt-sm">
            iPadをカーナビ化すれば、<strong>Apple MusicやSpotifyなど使い慣れたアプリからそのまま再生</strong>することが可能。Bluetoothで車のスピーカーに接続すれば、最新の曲やお気に入りのプレイリストを高音質で楽しめます。
          </p>
          <p className="media-card__desc u-mt-sm">
            もちろん動画視聴も可能で、BGM代わりにYouTubeやPrime Videoなどの<strong>VODアプリを再生</strong>することもできます。
          </p>
        </div>
      </div>
    </div>
  )
}
