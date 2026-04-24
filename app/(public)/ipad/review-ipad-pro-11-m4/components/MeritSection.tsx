import Link from 'next/link'
import ContentImage from '../../../../components/ContentImage'

export default function MeritSection() {
  return (
    <div className="u-mt-2xl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* ①快適で広々としたモデリング環境 */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <ContentImage
            src="/images/content/photo/review/ipad-11-pro-m4-1.webp"
            alt="iPad Pro 11インチでモデリングする様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">①快適で広々としたモデリング環境</h3>
          <p className="media-card__desc">
            冒頭でも書いた通り、これまでは<Link href="/ipad/ipad-mini-6-review/">iPad mini（第6世代）</Link>でモデリングを行ってきました。しかし8.3インチという画面サイズでは、モデリングソフトの使用中に一部のコマンドパネルが省略されてしまうなど、作業にストレスを感じる場面がありました。
          </p>
          <p className="media-card__desc u-mt-sm">
            その点、<strong>11インチの大画面</strong>は必要なパネルがしっかり表示され、作業スペースにもゆとりが生まれます。このおかげでモデリングの効率が想像以上に向上しました。
          </p>
          <p className="media-card__desc u-mt-sm">
            ちなみに13インチモデルも店頭で検討しましたが、作業領域の広さは魅力的なものの、個人的には「少し大きすぎる」という印象でした。価格・重さ・携帯性のバランスを考えても、外出先で軽快にCADアプリを使いたい私のスタイルには、11インチがベストな選択でした。
          </p>
        </div>
      </div>

      {/* ②LiDARスキャンセンサーを搭載 */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <ContentImage
            src="/images/content/photo/review/ipad-11-pro-m4-2.webp"
            alt="iPad Pro限定のLiDARスキャンセンサー"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">②LiDARスキャンセンサーを搭載</h3>
          <p className="media-card__desc">
            今回、Proモデルを選んだ大きな理由の一つが、「実物をスキャンしてShapr3Dへ取り込む」という形に移行できないか検証したかったからです。
          </p>
          <p className="media-card__desc u-mt-sm">
            これまではノギスを使ってアナログに計測していましたが、この工程をデジタル化できれば、3Dプリンター用のデータ作成は劇的にスムーズになります。
          </p>
          <p className="media-card__desc u-mt-sm">
            正直なところ、現状のLiDARだけでmm単位の精度を出すのは難しく、スキャンデータがそのまま最終設計に使えるレベルではありません。それでも、PolycamやScaniverseといった複数のアプリを使い、より精緻なデータを撮る方法を模索するプロセス自体に大きな可能性を感じています。
          </p>
        </div>
      </div>

      {/* ③数値以上の恩恵を感じる「薄さ」 */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <ContentImage
            src="/images/content/photo/review/ipad-11-pro-m4-3.webp"
            alt="薄さが際立つiPad Pro 11インチ（M4）"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">③数値以上の恩恵を感じる「薄さ」</h3>
          <p className="media-card__desc">
            2024年モデルのiPad Proは、前モデルからさらに薄型化（5.9mm→<strong>5.3mm</strong>）されています。11インチモデルの場合、数値上の差は約0.6mmですが、実際に手に取ると想像以上に薄く感じられます。
          </p>
          <p className="media-card__desc u-mt-sm">
            この軽さと薄さのおかげで、手に持って動画を見たり、ちょっとした作業をする際の負担が減り、取り回しはかなり良くなりました。高価な買い物ではありますが、「薄さ」や「持ちやすさ」を重視するなら、2024年モデル以降のProを選ぶ価値は十分にあります。
          </p>
        </div>
      </div>

      {/* ④重いデータも難なくこなすM4チップのパワー */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <ContentImage
            src="/images/content/photo/review/ipad-11-pro-m4-4.webp"
            alt="iPad Pro 11インチM4で作業する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">④重いデータも難なくこなすM4チップのパワー</h3>
          <p className="media-card__desc">
            今回搭載されたM4チップの恩恵も多大です。iPad miniを使っていた頃は、容量の大きいモデリングデータを扱う際に動作がもっさりすることもありましたが、<strong>M4搭載のiPad Pro</strong>では、重いデータでも常にキビキビと安定して動いてくれます。
          </p>
          <p className="media-card__desc u-mt-sm">
            動画編集や3Dモデリング、CADなど、負荷の高い作業をメインにするのであれば、この圧倒的なパワーは強力な武器になります。
          </p>
          <p className="lead-link u-mt-sm">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <Link href="/ipad/ipad-spec-table/">歴代iPadのスペック比較表</Link>
          </p>
        </div>
      </div>

      {/* ⑤Apple Pencil Proによる操作性の向上 */}
      <div className="m-card m-card--shadow m-card--padded">
        <div className="media-card__img-wrap">
          <ContentImage
            src="/images/content/photo/review/ipad-11-pro-m4-5.webp"
            alt="Apple Pencil Proで作業する様子"
            className="media-card__img"
            width={240}
            height={160}
            loading="lazy"
          />
        </div>
        <div className="media-card__body">
          <h3 className="media-card__title">⑤Apple Pencil Proによる操作性の向上</h3>
          <p className="media-card__desc">
            これまでiPad miniなどで第2世代のペンを使ってきましたが、今回初めてPencil Pro対応機種を導入しました。できることの幅が大きく広がったのもポジティブな変化です。
          </p>
          <p className="media-card__desc u-mt-sm">
            特に、ツール切り替えなどがスピーディーに行えるようになったことで、作業のテンポが途切れにくくなりました。イラスト制作のようにペンを多用する作業では、この細かな進化が積み重なって大きな効率化につながるはずです。
          </p>
          <p className="lead-link u-mt-sm">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
            <Link href="/ipad/apple-pencil-compare/">Apple Pencilの違いを比較！</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
