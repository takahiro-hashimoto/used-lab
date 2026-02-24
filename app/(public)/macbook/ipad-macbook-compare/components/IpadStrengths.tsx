export default function IpadStrengths() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* ノートを取る */}
      <div id="note-taking" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/apple-pencil-squeeze-gesture.jpg"
          alt="iPadとApple Pencilでノートを取る様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">ノートを取る</h3>
          <p className="popular-card-desc">
            iPadの強力な武器のひとつが<strong>Apple Pencilを利用できる</strong>という点です。Apple Pencilがあれば授業のノートを取ったり、手書きでメモを取るのが簡単に行えます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            iPadでノートを取れるメリットはさらに下記のような点もあげられます。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li>メモした内容をPDF化して共有できる</li>
            <li>ペンの色や太さなどを自由に調整できる</li>
            <li>タグ付けしたり、リンクを挿入したりすることもできる</li>
          </ul>
        </div>
      </div>

      {/* イラストを描く */}
      <div id="illustration" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-pro-use.jpg"
          alt="iPadでイラストを描く様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">イラストを描く</h3>
          <p className="popular-card-desc">
            ノートを取る以外にも、iPadの描画性能を活かすことでイラスト制作にも向いています。MacBookで絵を描く場合はペンタブレットをつなぐ必要がありますが、<strong>iPadとApple Pencilがあれば直接イラストを描くことが可能</strong>です。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            また、Apple Pencilは筆圧感知機能も備わっており、線の強弱も実際のペンのように再現できるのも魅力的なポイントです。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            120Hzの高リフレッシュレートを誇るiPad Proならリアルな紙とペンに近い感覚でイラストが描けるので、本格的なイラスト制作をしたい方はぜひiPad Proの購入を検討しましょう。
          </p>
        </div>
      </div>

      {/* 写真編集 */}
      <div id="photo-editing" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-split-view.jpg"
          alt="iPadで写真編集をする様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">写真編集</h3>
          <p className="popular-card-desc">
            動画編集はMacBookで作業したほうがはかどると感じますが、写真の編集はiPadのほうが向いていると感じます。理由は以下の通りです。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li>明るさや色味など各種パラメータを調整する作業は<strong>タッチ操作との相性が良い</strong></li>
            <li>携帯性に優れており、場所を選ばずに写真編集ができる</li>
            <li>外部カメラもあるので撮影した写真をそのまま編集できる</li>
          </ul>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            Mac版のLightroom Classicと比べると機能が制限されてしまうデメリットもあるので、より複雑な編集作業をする場合はMacを使ったほうがよいです。しかしシンプルな現像作業を繰り返すのであれば、iPadで十分でしょう。
          </p>
        </div>
      </div>

      {/* 電子書籍の閲覧 */}
      <div id="ebook" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-image.jpg"
          alt="iPadで電子書籍を読む様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">電子書籍の閲覧</h3>
          <p className="popular-card-desc">
            電子書籍の雑誌やビジネス書などを読む作業もiPadのほうが得意です。<strong>タッチ操作でさくさくページ送りできる感覚はリアルな書籍に近い</strong>ものがあり、相性がとても良いからです。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            MacBookでもKindleなどで購入した書籍は楽しめますが、iPadのほうが場所を選ばずに読書が楽しめるので、携帯性という観点からもiPadがおすすめです。
          </p>
        </div>
      </div>
    </div>
  )
}
