export default function MacbookStrengths() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
      {/* Webデザイン */}
      <div id="web-design" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/use-macbook.jpg"
          alt="MacBookでWebデザインをする様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">Webデザイン</h3>
          <p className="popular-card-desc">
            WebデザインもMacBookで作業するのがおすすめです。理由は以下の通りです。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li>Webデザインに使用するアプリが豊富にあり、効率よく制作が進められる</li>
            <li>デザイナーがよく使うフォント（ヒラギノ等）がインストール済み</li>
            <li><strong>Retinaディスプレイの高解像度と発色の圧倒的な美しさ</strong></li>
          </ul>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            iPad版のFigmaやPhotoshopもありますが、フォント数がMacよりも少ないですし、複雑な作業をするには操作感が劣ります。<strong>iPadでWebデザイン関連の作業をするのは避けたほうがいい</strong>でしょう。
          </p>
        </div>
      </div>

      {/* プログラミング */}
      <div id="programming" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-pro-use.jpg"
          alt="MacBookでプログラミングをする様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">プログラミング</h3>
          <p className="popular-card-desc">
            プログラミングをするならMacBookを使用するのがおすすめです。理由は以下の通りです。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li>開発を行う際に必要となる「ターミナル」をすぐに使用できる</li>
            <li>iOSアプリの開発ができる</li>
            <li>Boot Campを使えば「Windows」もインストールできる</li>
          </ul>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            iPadにもプログラミング用のアプリはありますが、開発環境を整える手間などを考えると現実的な選択肢ではありません。<strong>プログラミングにはキーボードが必須</strong>なので、そういった点からもMacBookを使用したほうがベターです。
          </p>
        </div>
      </div>

      {/* 動画編集 */}
      <div id="video-editing" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-mini-macbook.jpg"
          alt="MacBookで動画編集をする様子"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">動画編集</h3>
          <p className="popular-card-desc">
            本格的な動画編集をするならMacBookを使用するのがおすすめです。理由は以下の通りです。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li>ショートカットを駆使して効率よく作業ができる</li>
            <li><strong>Adobe Premiere ProやFinal Cut Proなどのアプリの機能を最大限活かせる</strong></li>
          </ul>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            iPadでも動画編集はもちろん可能ですが、例えばiPad版のAdobe Premiere Proでは機能が大幅に制限されています。これはタッチスクリーンを基準にアプリケーションが作られており、その体験を損なわないためだと考えられます。
          </p>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            どれくらい複雑な動画を作るか次第ですが、基本的にはMacBookのほうが作業がしやすいと考えたほうがよいでしょう。
          </p>
        </div>
      </div>

      {/* エクセル（Officeツール） */}
      <div id="excel" className="m-card m-card--shadow m-card--padded popular-card">
        <img
          src="/images/content/ipad-image.jpg"
          alt="エクセルでの作業イメージ"
          className="popular-card-img"
          width={240}
          height={160}
          loading="lazy"
        />
        <div className="popular-card-body">
          <h3 className="popular-card-title">エクセル（Officeツール）</h3>
          <p className="popular-card-desc">
            エクセルを使って複雑な計算や処理を行う場合にはMacBookがおすすめです。理由は以下の通りです。
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
            <li>Mac版とiPad版のエクセルではアプリのレイアウトが異なる</li>
            <li><strong>iPad版のエクセルではマクロの実行にも制限があり、複雑な処理に向かない</strong></li>
          </ul>
          <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
            簡易的な計算式を組んだりするならiPad版のエクセルでも事足りますが、仕事などで使うのであればやはりMacBookを使用するのがベターです。
          </p>
        </div>
      </div>
    </div>
  )
}
