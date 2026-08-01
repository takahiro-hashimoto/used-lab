import Image from 'next/image'
import Link from 'next/link'
import { PUBLISH_ANDROID_CATEGORIES } from '@/lib/data/feature-flags'

/**
 * 「いま同じ予算で狙える他の機種」を提示するブロック。
 *
 * 中古相場は日々動くため、価格が近い機種の組み合わせも日々変わる。
 * 固定の関連リンクではなく、その日の実相場から動的に算出することで
 * 「¥28,000前後ならこれも選べる」という購入検討に直結する情報になる。
 *
 * 価格推移とは独立した「他機種への乗り換え検討」の話題なので、
 * 価格セクションの入れ子ではなく独立した h2 セクションとして置く。
 */
export type SimilarPriceItem = {
  slug: string
  name: string
  price: number
  /** 詳細ページのURL。カテゴリをまたぐため呼び出し側で確定させる */
  href: string
  /** 商品画像の絶対パス。未登録なら null（プレースホルダー表示） */
  imageSrc?: string | null
  /** ブランド表示（横断時のみ。同一ブランド内では省略） */
  brandLabel?: string | null
  // --- スペック行。null の項目は行ごと出さない ---
  /** チップ名 */
  cpu?: string | null
  /** 画面サイズ（"6.9インチ"） */
  screenInch?: string | null
  /** 重量（"227g"） */
  weight?: string | null
  /** 発売年月（"2024年9月"） */
  releaseLabel?: string | null
  /** イオシスの機種別ページ。未登録なら null（ボタンを出さない） */
  iosysUrl?: string | null
}

type Props = {
  modelName: string
  /** 基準価格（この機種の現在の最安値） */
  basePrice: number
  items: SimilarPriceItem[]
}

const yen = (n: number) => `¥${Math.round(n).toLocaleString()}`

export default function SimilarPriceModels({ modelName, basePrice, items }: Props) {
  if (items.length === 0) return null
  // brandLabel は横断表示のときだけ入る（同一ブランド内では省略される）
  const hasOtherBrands = items.some((i) => i.brandLabel)

  return (
    <section className="l-section" id="similar-price" aria-labelledby="heading-similar-price">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-similar-price">
          {/* 横断対象が1ブランドだけのときに「他の中古スマホ」と書くと
              他社製品を期待させてしまうため、ブランド表示の有無で言い分ける */}
          {hasOtherBrands ? '同じ予算で狙える他の中古スマホ' : '同じ予算で狙える他のモデル'}
        </h2>
        <p className="m-section-desc">
          中古{modelName}の相場（{yen(basePrice)}前後）に近い価格で買えるモデルです。
          予算が同じでも選べる機種は複数あるため、画面サイズや重さ、性能や発売時期とあわせて比較してみてください。
        </p>

        <div className="ifd-results-grid" style={{ marginTop: 'var(--space-md)' }}>
        {items.map((item) => {
          const diff = item.price - basePrice
          const diffLabel =
            Math.abs(diff) < 1000
              ? 'ほぼ同価格'
              : diff > 0
                ? `${yen(diff)}高い`
                : `${yen(Math.abs(diff))}安い`
          // 体格（画面・重量）→ 性能 → 新しさ の順。データ未登録の項目は行を出さない
          const specs = [
            { label: '画面', value: item.screenInch },
            { label: '重量', value: item.weight },
            { label: 'CPU', value: item.cpu },
            { label: '発売', value: item.releaseLabel },
          ].filter((s): s is { label: string; value: string } => !!s.value)
          return (
            <article key={`${item.brandLabel ?? ''}-${item.slug}`} className="m-card m-card--shadow ifd-result-card">
              <div className="ifd-result-card__header">
                <div className="ifd-result-card__img-wrap">
                  {item.imageSrc ? (
                    <Image src={item.imageSrc} alt={item.name} width={80} height={80} />
                  ) : (
                    <i
                      className="fa-solid fa-mobile-screen"
                      aria-hidden="true"
                      style={{ fontSize: 28, color: 'var(--color-text-muted)', opacity: 0.5 }}
                    />
                  )}
                </div>
                <div className="ifd-result-card__info">
                  {/* 下の「詳細を見る」が遷移口なので、機種名はリンクにせず見出しとして置く */}
                  <span className="ifd-result-card__name">{item.name}</span>
                  <div className="ifd-result-card__tags">
                    {item.brandLabel && <span className="ifd-feature-tag">{item.brandLabel}</span>}
                    <span className="ifd-feature-tag">{diffLabel}</span>
                  </div>
                </div>
              </div>
              <div className="ifd-result-card__body">
                <div className="ifd-result-card__price">
                  <span className="ifd-result-card__price-label">中古相場</span>
                  <span className="ifd-result-card__price-value">{yen(item.price)}</span>
                </div>
                {specs.length > 0 && (
                  <dl className="ifd-result-card__specs">
                    {specs.map((s) => (
                      <div key={s.label}>
                        <dt>{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
              {/* 詳細（サイト内）とイオシス（購入先）を横並びに。
                  .ifd-result-card__actions は flex + .m-btn{flex:1} なので均等幅になる */}
              <div className="ifd-result-card__actions">
                <Link prefetch={false} href={item.href} className="m-btn m-btn--secondary m-btn--sm">
                  詳細を見る
                </Link>
                {item.iosysUrl && (
                  <a
                    href={item.iosysUrl}
                    className="m-btn m-btn--primary m-btn--sm"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    aria-label={`${item.name}をイオシスで見る（新しいタブで開く）`}
                  >
                    イオシスで見る
                  </a>
                )}
              </div>
            </article>
          )
        })}
        </div>

        {/* ここで挙がるのは相場が近い数機種だけなので、価格帯ごとの全体像は
            横断比較ページへ送る。Android 非公開時は3ブランド比較が成立しないため出さない */}
        {PUBLISH_ANDROID_CATEGORIES && (
          <div className="m-callout m-callout--tip u-mt-2xl">
            <span className="m-callout__label">memo</span>
            <p className="m-callout__text">
              予算から絞り込みたい方は「
              <Link prefetch={false} href="/smartphone-compare/">
                iPhone・Pixel・Galaxyを価格帯別に横断比較
              </Link>
              」もあわせてご覧ください。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
