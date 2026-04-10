import Link from 'next/link'

export default function DemeritSection() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ①中古市場でも依然として高価 */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-11-pro-m4-6.webp"
            alt="iPad Pro 11インチ M4の価格"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">①中古市場でも依然として高価</h3>
          <p className="media-card__desc">
            デメリットとしてまず挙げられるのが、その価格です。今回は中古で購入しましたが、2024年モデルということもあり、<Link href="/ipad/ipad-price-info/">中古相場</Link>はまだそれほど下がっていません。少しでも安く手に入れたいのであれば、もう少し時期を待ってからの購入でも良かったかもしれません。
          </p>
          <p className="media-card__desc u-mt-sm">
            とはいえ、iPadOSのサポート期間を考慮すれば、2024年モデルは<strong>2031年頃まで現役</strong>で使い続けられる計算になります。M4チップの性能があれば、今後登場する最新アプリにも長く対応できるはずですので、長期的な投資と考えれば決して悪くない選択肢だと思っています。
          </p>
          <p className="lead-link u-mt-sm">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <Link href="/ipad/used-ipad-support/">iPadはいつまで使える？機種別のサポート期間目安まとめ</Link>
          </p>
        </div>
      </div>

      {/* ②周辺機器の買い替えコストが発生する */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-11-pro-m4-7.webp"
            alt="iPad Proの周辺機器"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">②周辺機器の買い替えコストが発生する</h3>
          <p className="media-card__desc">
            Apple Pencilの互換性も悩ましい点です。Apple Pencil（第2世代）を使っている場合、iPad本体をM4モデルに買い替えると、ペンも<strong>「Apple Pencil Pro」へ買い替える必要</strong>があります。
          </p>
          <p className="media-card__desc u-mt-sm">
            このペンが約2万円ほどするため、本体価格に加えて無視できない出費となります。iPad本体の価格だけで判断せず、周辺機器を含めた「トータルコスト」で見積もっておくことが大切です。
          </p>
        </div>
      </div>

      {/* ③M4の性能をフルに活かせる場面は限定的 */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <img
            src="/images/content/photo/review/ipad-11-pro-m4-8.webp"
            alt="iPad Pro 11インチ M4の性能"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">③M4の性能をフルに活かせる場面は限定的</h3>
          <p className="media-card__desc">
            正直なところ、私の用途でもスペックは「オーバースペック気味」だと感じています。M4レベルのパワーが必須となるアプリはまだ少なく、大画面でCADを快適に動かしたいだけであれば、<Link href="/ipad/air-5/">iPad Air（M1モデル）</Link>などでも十分だったかもしれません。
          </p>
          <p className="media-card__desc u-mt-sm">
            それでもあえてProを選んだのは、やはり「LiDARスキャナ」の存在と、長く使い続けられる「OS寿命」、そして「圧倒的な薄さ」に魅力を感じたからでした。
          </p>
        </div>
      </div>
    </div>
  )
}
