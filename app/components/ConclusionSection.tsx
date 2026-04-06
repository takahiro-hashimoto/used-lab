import Image from 'next/image'
import type { ReactNode } from 'react'
import { placeholder } from '@/lib/placeholder'

type ConclusionItem = {
  id: number
  slug: string
  displayName: string
  image: string | null
  date: string | null
  desc: string
  priceLabel?: string
  storageLabel?: string
}

type Props = {
  items: ConclusionItem[]
  heading: ReactNode
  descriptions: ReactNode[]
  gridCols: '3col' | '4col' | '5col'
  imagePath: string
  placeholderText: string
}

export default function ConclusionSection({ items, heading, descriptions, gridCols, imagePath, placeholderText }: Props) {
  return (
    <section className="l-section" id="conclusion" aria-labelledby="heading-conclusion">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-conclusion">
          {heading}
        </h2>
        {descriptions.map((desc, i) => (
          <p key={i} className="m-section-desc">{desc}</p>
        ))}

        <div className={`l-grid l-grid--${gridCols} l-grid--gap-lg`}>
          {items.map((item) => {
            const releaseDate = item.date
              ? `${item.date.split('/')[0]}年${item.date.split('/')[1]}月発売`
              : ''

            return (
              <article key={item.id} className="m-card m-card--shadow listing-pick-card">
                <figure className="listing-pick-card__figure">
                  {item.image ? (
                    <Image
                      src={`/images/${imagePath}/${item.image}`}
                      alt={`${item.displayName}の外観`}
                      className="listing-pick-card__img"
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={placeholder(200, 200, placeholderText)}
                      alt={`${item.displayName}の外観`}
                      className="listing-pick-card__img"
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  )}
                </figure>
                <div className="listing-pick-card__body">
                  <p className="listing-pick-card__name">{item.displayName}</p>
                  {releaseDate && (
                    <p className="listing-pick-card__release">
                      <i className="fa-regular fa-calendar" aria-hidden="true"></i> {releaseDate}
                    </p>
                  )}
                  <p className="listing-pick-card__desc">{item.desc}</p>
                  {item.priceLabel && (
                    <div className="listing-pick-card__price">
                      {item.storageLabel && (
                        <span className="listing-pick-card__price-label">中古相場（{item.storageLabel}）</span>
                      )}
                      <span className="listing-pick-card__price-value m-price-display m-price-display--sm m-price-display--primary">{item.priceLabel}</span>
                    </div>
                  )}
                </div>
                <a href={`#detail-${item.slug}`} className="m-btn m-btn--primary m-btn--block u-w-full" aria-label={`${item.displayName}の詳細を見る`}>
                  詳しく見る <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
