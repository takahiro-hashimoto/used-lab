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
    <section className="l-section" id="pd-ranking" aria-labelledby="pd-ranking-title" itemScope itemType="https://schema.org/ItemList">
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

        <ol className="price-card-grid l-grid l-grid--2col l-grid--gap-lg">
          {items.map((model, rank) => (
            <li
              key={model.id}
              className="price-card m-card m-card--shadow"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(rank + 1)} />
              <figure className="price-card__img">
                {model.image && (
                  <img
                    src={`/images/watch/${model.image}`}
                    alt={model.name}
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                )}
              </figure>
              <div className="price-card__info" itemProp="item" itemScope itemType="https://schema.org/Product">
                <h3 className="price-card__name" itemProp="name">
                  {model.iosysUrl ? (
                    <a href={model.iosysUrl} className="price-card__link" target="_blank" rel="noopener noreferrer">{model.name}</a>
                  ) : model.name}
                </h3>
                <p className="price-card__meta">{model.year}年 / {model.chip}</p>
                <meta itemProp="brand" content="Apple" />
              </div>
              <div className="price-card__price">
                <span className="price-card__label">中古相場（{model.storage}）</span>
                <span className="price-card__value m-price-display m-price-display--sm m-price-display--primary">
                  &yen;{model.currentPrice.toLocaleString()} <span className="price-card__tilde">〜</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
