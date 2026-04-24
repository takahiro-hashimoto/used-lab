import Image from 'next/image'
import type { ModelData } from '../page'

type Props = {
  items: ModelData[]
  dateDisplay: string
}

export default function PriceDropSection({ items, dateDisplay }: Props) {
  const topDrop = items[0]

  return (
    <section className="l-section" id="pd-price-drop" aria-labelledby="pd-price-drop-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-price-drop-title">
          過去30日で値下がりした中古iPhone TOP10
        </h2>
        {topDrop && (
          <p className="m-section-desc">
            直近30日間で最も値下がりしたのは<strong>{topDrop.name}</strong>で、
            <strong>
              {Math.abs(topDrop.priceChange).toLocaleString()}円（{Math.abs(topDrop.priceChangePercent)}%）
            </strong>
            ダウン。
            <br />
            新型発売や在庫状況により価格は日々変動するため、こまめなチェックがおすすめです。（{dateDisplay}時点）
          </p>
        )}

        <ol className="u-list-reset u-mb-2xl price-card-list">
          {items.map((model) => (
            <li key={model.id} className="price-card m-card m-card--shadow">
              <figure className="price-card__img">
                {model.image && (
                  <Image
                    src={`/images/iphone/${model.image}`}
                    alt={model.name}
                    width={80}
                    height={80}
                  />
                )}
              </figure>
              <div className="price-card__info">
                <h3 className="price-card__name">
                  <a href={`/iphone/${model.slug}/`} className="price-card__link">{model.name}</a>
                </h3>
                <p className="price-card__meta">{model.year}年 / {model.chip}</p>
              </div>
              <div className="price-card__price">
                <span className="price-card__label">中古相場（{model.storage}）</span>
                <span className="price-card__value m-price-display m-price-display--sm m-price-display--primary">
                  &yen;{model.currentPrice.toLocaleString()} <span className="price-card__tilde">〜</span>
                </span>
                <span className="price-card__change">
                  {model.priceChange.toLocaleString()}円<small>（{model.priceChangePercent}%）</small>
                </span>
                {model.iosysUrl && (
                  <div className="price-card__cta">
                    <a href={model.iosysUrl} className="m-btn m-btn--primary m-btn--sm" target="_blank" rel="noopener noreferrer nofollow">
                      在庫情報を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </a>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
