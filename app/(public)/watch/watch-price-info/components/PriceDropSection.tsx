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
          過去30日で値下がりした中古Apple Watch TOP10
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

        <ol className="pd-card-grid">
          {items.map((model) => (
            <li key={model.id} className="pd-card m-card m-card--shadow">
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
                <div className="pd-card__info">
                  <p className="pd-card__name">
                    {model.iosysUrl ? (
                      <a href={model.iosysUrl} className="pd-card__link" target="_blank" rel="noopener noreferrer">{model.name}</a>
                    ) : model.name}
                  </p>
                  <p className="pd-card__meta">{model.year}年 / {model.chip}</p>
                </div>
              </div>
              <div className="pd-card__right">
                <p className="pd-card__price-label">中古相場（{model.storage}の場合）</p>
                <p className="pd-card__price m-price-display m-price-display--md">
                  &yen;{model.currentPrice.toLocaleString()} <span className="pd-card__tilde">〜</span>
                </p>
                <p className="pd-card__change">
                  {model.priceChange.toLocaleString()}円<small>（{model.priceChangePercent}%）</small>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
