import Image from 'next/image'
import type { ModelData } from '../page'

type Props = {
  items: ModelData[]
  modelCount: number
  dateDisplay: string
}

export default function RankingSection({ items, modelCount, dateDisplay }: Props) {
  const cheapest = items[0]
  const second = items[1]
  const third = items[2]

  return (
    <section className="l-section l-section--bg-subtle" id="pd-ranking" aria-labelledby="pd-ranking-title" itemScope itemType="https://schema.org/ItemList">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-ranking-title" itemProp="name">
          価格の安い中古Apple WatchランキングTOP10
        </h2>
        <meta itemProp="numberOfItems" content={String(items.length)} />
        <p className="m-section-desc">
          {dateDisplay}現在、最安は<strong>{cheapest?.name}（&yen;{cheapest?.currentPrice.toLocaleString()}〜）</strong>。
          <br />
          {second && (
            <>次いで{second.name}（&yen;{second.currentPrice.toLocaleString()}〜）</>
          )}
          {third && (
            <>、{third.name}（&yen;{third.currentPrice.toLocaleString()}〜）</>
          )}
          と続きます。全{modelCount}機種を掲載中。
        </p>

        <ol className="pd-card-grid">
          {items.map((model, rank) => (
            <li
              key={model.id}
              className="pd-card m-card m-card--shadow"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(rank + 1)} />
              <div className="pd-card__left">
                <div className="pd-card__thumb">
                  {model.image && (
                    <Image
                      src={`/images/watch/${model.image}`}
                      alt={model.name}
                      width={60}
                      height={60}
                      className="pd-card__img"
                    />
                  )}
                </div>
                <div className="pd-card__info" itemProp="item" itemScope itemType="https://schema.org/Product">
                  <p className="pd-card__name" itemProp="name">
                    {model.iosysUrl ? (
                      <a href={model.iosysUrl} className="pd-card__link" target="_blank" rel="noopener noreferrer">{model.name}</a>
                    ) : model.name}
                  </p>
                  <p className="pd-card__meta">{model.year}年 / {model.chip}</p>
                  <meta itemProp="brand" content="Apple" />
                </div>
              </div>
              <div className="pd-card__right">
                <p className="pd-card__price-label">中古相場（{model.storage}の場合）</p>
                <p className="pd-card__price">
                  &yen;{model.currentPrice.toLocaleString()} <span className="pd-card__tilde">〜</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
