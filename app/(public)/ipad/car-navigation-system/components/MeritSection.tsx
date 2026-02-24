export default function MeritSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* ①マップを更新する必要がない */}
      <div id="merit-map" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-car-navi-02.jpg"
          alt="iPad miniをカーナビ化した様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">①マップを更新する必要がない</h3>
          <p className="popular-card-desc">
            車載カーナビの地図が古くなると、カーナビが認識していない道をひた走る羽目になったり、目的地を検索してもヒットしないことがあります。マップを更新する場合ディーラーに頼むと<strong>2〜3万円の費用</strong>がかかるのも地味に痛いポイントです。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            しかしiPadをカーナビ化して<strong>GoogleマップやYahoo!カーナビ</strong>といったアプリを導入すれば、常に最新の地図情報をもとに道案内をしてもらうことが可能。更新を気にすることなく、いつも最新の地図で目的地に向かえるのはとても便利です。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            Yahoo!カーナビは道案内の精度もわかりやすさも優秀で、よく行く目的地の登録や音声操作にも対応。カーナビとして使いたい機能は一通り揃っています。
          </p>
        </div>
      </div>

      {/* ②渋滞情報の精度もすばらしい */}
      <div id="merit-traffic" className="m-card m-card--shadow m-card--padded popular-card popular-card--vertical">
        <div className="popular-card-body">
          <h3 className="popular-card-title">②渋滞情報の精度もすばらしい</h3>
          <p className="popular-card-desc">
            カーナビの大きなメリットのひとつが渋滞情報の提供です。この点は車載カーナビに軍配が上がるかと思いきや、GoogleマップやYahoo!カーナビも渋滞情報を加味して経路案内をしてくれるので、まったく困ることはありません。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            渋滞情報の算出ロジックにはそれぞれ下記のような違いがあり、<strong>場合によってはiPadのほうが高い予測精度を得られる</strong>こともあります。
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
          <div className="m-card" style={{ padding: 'var(--space-lg)' }}>
            <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              <i className="fa-solid fa-car" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
              車載カーナビ（VICS）
            </p>
            <p className="popular-card-desc">
              日本道路交通情報や渋滞感知器（電波ビーコン、光ビーコン）の情報を、FM多重放送や道路に設置されたビーコンからカーナビに届けるシステム。
            </p>
          </div>
          <div className="m-card" style={{ padding: 'var(--space-lg)' }}>
            <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              <i className="fa-brands fa-google" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
              Googleマップ
            </p>
            <p className="popular-card-desc">
              Googleマップ利用者の位置情報や移動速度から、混雑具合をリアルタイムに算出。
            </p>
          </div>
          <div className="m-card" style={{ padding: 'var(--space-lg)' }}>
            <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              <i className="fa-solid fa-route" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
              Yahoo!カーナビ
            </p>
            <p className="popular-card-desc">
              VICS情報に加え、他のアプリ利用者による渋滞情報（プローブ）も反映して混雑具合を算出。
            </p>
          </div>
        </div>
      </div>

      {/* ③画面が大きくてみやすい */}
      <div id="merit-display" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-image.jpg"
          alt="iPadの画面サイズ比較"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">③画面が大きくてみやすい</h3>
          <p className="popular-card-desc">
            車載カーナビのディスプレイは5インチ〜8インチが一般的ですが、iPadは一番小さいminiサイズでも<strong>8.3インチ</strong>の大きさがあり、一般的なカーナビよりも広い画面で情報を確認できます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            さらにiPadの現行モデルはすべて<strong>Retinaディスプレイ</strong>を搭載。画面の大きさに加え、高精細な映像が見られるのもiPadをカーナビ化する魅力のひとつです。
          </p>
        </div>
      </div>

      {/* ④直感的な操作ができる */}
      <div id="merit-ui" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-pro-use.jpg"
          alt="iPadで地図アプリをタッチ操作する様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">④直感的な操作ができる</h3>
          <p className="popular-card-desc">
            古いカーナビは文字入力が「あいうえお順」だったり、検索結果が反映されるまでの処理速度も遅かったりと、操作性に不満を感じることが少なくありません。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            iPadなら<strong>キーボード入力でさっと目的地を入力</strong>したり、<strong>音声操作でルート案内を開始</strong>することも可能。レスポンスも早いので、操作周りで煩わしい思いをすることはほぼゼロになります。
          </p>
        </div>
      </div>

      {/* ⑤音楽や動画の再生もしやすい */}
      <div id="merit-media" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-mini-6-reading.jpg"
          alt="iPadで音楽アプリを再生する様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">⑤音楽や動画の再生もしやすい</h3>
          <p className="popular-card-desc">
            車載カーナビでは音源をCDからHDDに取り込んだり、SDカードに入れてから再生するのが一般的。手軽にインターネットから音楽を再生できる時代にこの運用はやや不便です。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            iPadをカーナビ化すれば、<strong>いつも聴いている音楽を使い慣れたアプリからそのまま再生</strong>することが可能。最新の曲やお気に入りのプレイリストを車の中で快適に楽しめます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            もちろん動画視聴も可能で、BGM代わりにYouTubeやPrime Videoなどの<strong>VODアプリを再生</strong>することもできます。
          </p>
        </div>
      </div>
    </div>
  )
}
