export default function IpadStrengths() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ノートを取る */}
      <div id="note-taking" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/thumbnail/ipad-image-12.jpg"
            alt="iPadとApple Pencilでノートを取る様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">ノートを取る</h3>
          <p className="media-card__desc">
            iPadの強力な武器のひとつが<strong>Apple Pencilを利用できる</strong>という点です。Apple Pencilがあれば授業のノートを取ったり、手書きでメモを取るのが簡単に行えます。
          </p>
          <p className="media-card__desc">iPadでノートを取れるメリットはさらに下記のような点も。</p>
          <ul className="media-card__list">
            <li>メモした内容をPDF化して共有できる</li>
            <li>ペンの色や太さなどを自由に調整できる</li>
            <li>タグ付けやリンクの挿入も可能</li>
          </ul>
          <p className="media-card__desc">より直感的に思考のアプトプットがしたい方はiPadを検討しましょう。</p>
        </div>
      </div>

      {/* イラストを描く */}
      <div id="illustration" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/thumbnail/ipad-illust.jpg"
            alt="iPadでイラストを描く様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">イラストを描く</h3>
          <p className="media-card__desc">
            ノートを取る以外にも、iPadの描画性能を活かすことでイラスト制作にも向いています。MacBookで絵を描く場合はペンタブレットをつなぐ必要がありますが、<strong>iPadとApple Pencilがあれば直接イラストを描くことが可能</strong>です。
          </p>
          <p className="media-card__desc">
            また、Apple Pencilは筆圧感知機能も備わっており、線の強弱も実際のペンのように再現できるのも魅力的なポイントです。
          </p>
          <p className="media-card__desc">
            120Hzの高リフレッシュレートを誇るiPad Proならリアルな紙とペンに近い感覚でイラストが描けるので、本格的なイラスト制作をしたい方はぜひiPad Proの購入を検討しましょう。
          </p>
        </div>
      </div>

      {/* 写真編集 */}
      <div id="photo-editing" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/thumbnail/ipad-image-01.jpg"
            alt="iPadで写真編集をする様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">写真編集</h3>
          <p className="media-card__desc">写真の編集はiPadのほうが向いています。理由は以下の通りです。</p>
          <ul className="media-card__list">
            <li>明るさ・色味などのパラメータ調整はタッチ操作のほうが便利</li>
            <li>携帯性に優れており、場所を選ばずに編集できる</li>
          </ul>
          <p className="media-card__desc">
            Mac版のLightroom Classicと比べると機能が制限されてしまうデメリットもありますが、シンプルな現像作業を繰り返すのであれば、iPadで十分でしょう。
          </p>
        </div>
      </div>

      {/* 電子書籍の閲覧 */}
      <div id="ebook" className="m-card m-card--shadow m-card--padded media-card--aside">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/thumbnail/ipad-image-02.jpg"
            alt="iPadで電子書籍を読む様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">電子書籍の閲覧</h3>
          <p className="media-card__desc">電子書籍の雑誌やビジネス書などを読む作業もiPadのほうが得意。</p>
          <p className="media-card__desc">タッチ操作でさくさくページ送りできる感覚はリアルな書籍に近いものがあり、相性がとても良いからです。</p>
          <p className="media-card__desc">
            MacBookでもKindleなどで購入した書籍は楽しめますが、iPadのほうが場所を選ばずに読書が楽しめるので、携帯性という観点からもiPadがおすすめです。
          </p>
        </div>
      </div>
    </div>
  )
}
