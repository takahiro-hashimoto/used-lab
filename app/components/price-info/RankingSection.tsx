import Image from 'next/image'
import Link from 'next/link'
import type { PriceCardModel, PriceCardConfig } from './card-config'

// ============================================================
// 中古相場が安い機種ランキング（price-info 各ページ共通）
//
// 以前はカテゴリごとに同じファイルを置いていた（6ファイルの9割が同一）。
// カテゴリ差はすべて config で受ける。設定の中身は card-config.ts を参照。
// ============================================================

type Props<M extends PriceCardModel> = {
  items: M[]
  modelCount: number
  dateDisplay: string
  config: PriceCardConfig<M>
}

export default function RankingSection<M extends PriceCardModel>({
  items,
  modelCount,
  dateDisplay,
  config,
}: Props<M>) {
  const cheapest = items[0]
  const second = items[1]
  const third = items[2]

  return (
    <section className="l-section" id="pd-ranking" aria-labelledby="pd-ranking-title" itemScope itemType="https://schema.org/ItemList">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-ranking-title" itemProp="name">
          中古相場が安い{config.categoryLabel}ランキングTOP10
        </h2>
        <meta itemProp="numberOfItems" content={String(items.length)} />
        <p className="m-section-desc">
          {dateDisplay}現在、相場がもっとも安いのは<strong>{cheapest?.name}（&yen;{cheapest?.currentPrice.toLocaleString()}）</strong>。
          <br />
          {second && (
            <>次いで{second.name}（&yen;{second.currentPrice.toLocaleString()}）</>
          )}
          {third && (
            <>、{third.name}（&yen;{third.currentPrice.toLocaleString()}）</>
          )}
          と続きます。全{modelCount}機種を掲載中。
        </p>

        <ol className="u-list-reset u-mb-2xl ifd-results-grid">
          {items.map((model, rank) => (
            <li
              key={model.id}
              className="m-card m-card--shadow ifd-result-card"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(rank + 1)} />
              <div className="ifd-result-card__header">
                <div className="ifd-result-card__img-wrap">
                  <span className="ifd-result-card__rank" aria-hidden="true">{rank + 1}</span>
                  {model.image && (
                    <Image
                      src={`/images/${config.categoryPath}/${model.image}`}
                      alt={model.name}
                      width={80}
                      height={80}
                    />
                  )}
                </div>
                <div className="ifd-result-card__info" itemProp="item" itemScope itemType="https://schema.org/Product">
                  <Link prefetch={false} href={`/${config.categoryPath}/${model.slug}/`} className="ifd-result-card__name" itemProp="name">
                    {model.name}
                  </Link>
                  <meta itemProp="brand" content={config.brand} />
                  <div className="ifd-result-card__tags">
                    {model.supportEnded ? (
                      <span className="ifd-tag ifd-tag--ended">
                        <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> サポート終了
                      </span>
                    ) : (
                      <span className="ifd-tag ifd-tag--supported">
                        <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> {config.supportTag(model)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="ifd-result-card__body">
                <div className="ifd-result-card__price">
                  {config.showStorage ? (
                    <span className="ifd-result-card__price-label">中古相場（{model.storage}）</span>
                  ) : (
                    <span className="ifd-result-card__price-label">中古相場</span>
                  )}
                  <span className="ifd-result-card__price-value">
                    ¥{model.currentPrice.toLocaleString()}
                  </span>
                </div>
                <dl className="ifd-result-card__specs">
                  {config.specs(model).map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
                {config.showFeatureTags && model.featureTags && model.featureTags.length > 0 && (
                  <div className="ifd-result-card__feature-tags">
                    {model.featureTags.map((tag) => (
                      <span key={tag} className="ifd-feature-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="ifd-result-card__actions">
                {(() => {
                  const cta = config.cta(model)
                  return cta && (
                    <a
                      href={cta.href}
                      className="m-btn m-btn--primary m-btn--sm"
                      rel={cta.rel}
                      target="_blank"
                      aria-label={cta.ariaLabel}
                    >
                      {cta.children}
                    </a>
                  )
                })()}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
