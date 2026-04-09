export default function MacbookStrengths() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* Webデザイン */}
      <div id="web-design" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/use-macbook.jpg"
            alt="MacBookでWebデザインをする様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">Webデザイン</h3>
          <p className="media-card__desc">
            以下の理由から、WebデザインもMacBookで作業するのがおすすめです。
          </p>
          <ul className="media-card__list u-mb-md">
            <li>Webデザインに使うアプリが豊富で、効率よく制作が進められる</li>
            <li>デザイナーがよく使うフォントがインストール済み</li>
            <li>Retinaディスプレイの高解像度と発色の圧倒的な美しさ</li>
          </ul>
          <p className="media-card__desc">
            iPad版のFigmaやPhotoshopもありますが、フォント数がMacよりも少ないですし、複雑な作業をするには操作感が劣ります。<strong>iPadでWebデザイン関連の作業をするのは避けたほうがいい</strong>でしょう。
          </p>
        </div>
      </div>

      {/* プログラミング */}
      <div id="programming" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/ipad-pro-use.jpg"
            alt="MacBookでプログラミングをする様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">プログラミング</h3>
          <p className="media-card__desc">
            プログラミングをするならMacBookを使用するのがおすすめです。理由は以下の通りです。
          </p>
          <ul className="media-card__list u-mb-md">
            <li>開発に必要な「ターミナル」がすぐに使える</li>
            <li>iOSアプリの開発もできる</li>
            <li>Boot Campを使えば「Windows」のインストールも可能</li>
          </ul>
          <p className="media-card__desc">iPadにもプログラミング用のアプリはありますが、開発環境を整える手間などを考えると現実的な選択肢ではありません。</p>
          <p className="media-card__desc">また、プログラミングにはキーボードが必須なので、そういった点からもMacBookを使用したほうがベターです。</p>
        </div>
      </div>

      {/* 動画編集 */}
      <div id="video-editing" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/ipad-mini-macbook.jpg"
            alt="MacBookで動画編集をする様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">動画編集</h3>
          <p className="media-card__desc">
            本格的な動画編集をするならMacBookを使用するのがおすすめです。理由は以下の通りです。
          </p>
          <ul className="media-card__list u-mb-md">
            <li>ショートカットを駆使して効率よく作業ができる</li>
            <li>Adobe Premiere ProやFinal Cut Proなどを最大限活かせる</li>
          </ul>
          <p className="media-card__desc">例えばiPad版のAdobe Premiere Proでは機能が大幅に制限されています。これはタッチスクリーンを基準にアプリケーションが作られており、その体験を損なわないためだと考えられます。
          </p>
          <p className="media-card__desc">
            どれくらい複雑な動画を作るか次第ですが、基本的にはMacBookのほうが作業がしやすいと考えたほうがよいでしょう。
          </p>
        </div>
      </div>

      {/* エクセル（Officeツール） */}
      <div id="excel" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/ipad-image.jpg"
            alt="エクセルでの作業イメージ"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">エクセル（Officeツール）</h3>
          <p className="media-card__desc">
            エクセルを使って複雑な計算や処理を行う場合にはMacBookがおすすめです。理由は以下の通りです。
          </p>
          <ul className="media-card__list u-mb-md">
            <li>Mac版とiPad版のエクセルではアプリのレイアウトが異なる</li>
            <li>iPadはマクロの実行に制限があり、複雑な処理に向かない</li>
          </ul>
          <p className="media-card__desc u-mt-sm">
            簡易的な計算式を組んだりするならiPad版のエクセルでも事足りますが、仕事などで使うのであればやはりMacBookを使用するのがベターです。
          </p>
        </div>
      </div>
    </div>
  )
}
