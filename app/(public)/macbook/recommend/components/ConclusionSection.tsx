import Image from 'next/image'
import type { MacBookModel, MacBookPriceLog } from '@/lib/types'
import { formatPrice } from '@/lib/utils/shared-helpers'
import { calculatePriceRange, calculateOSLifespan } from '@/lib/utils/macbook-helpers'
import { RECOMMEND_YEAR, RECOMMEND_COUNT } from '@/lib/data/macbook-recommend'

type RecommendModel = {
  model: MacBookModel
  latestPrice: MacBookPriceLog | null
  label: string
  desc: string
}

type Props = {
  items: RecommendModel[]
}

export default function ConclusionSection({ items }: Props) {
  return (
    <section className="l-section l-section--bg-subtle" id="conclusion" aria-labelledby="heading-conclusion">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-conclusion">
          【結論】{RECOMMEND_YEAR}年現在のおすすめ中古MacBook{RECOMMEND_COUNT}機種
        </h2>
        <p className="m-section-desc">
          迷っているなら、まずはこの{RECOMMEND_COUNT}機種から選べば大きな失敗はありません。
        </p>
        <p className="m-section-desc">
          {RECOMMEND_YEAR}年時点で「macOSサポートが十分に残っている」「中古価格と性能のバランスが良い」モデルだけに絞っています。
        </p>

        <div className="l-grid l-grid--4col l-grid--gap-lg">
          {items.map(({ model, latestPrice, desc }) => {
            const priceRange = calculatePriceRange(latestPrice)
            const osLife = calculateOSLifespan(model.date)
            const releaseDate = model.date
              ? `${model.date.split('/')[0]}年${model.date.split('/')[1]}月発売`
              : ''

            return (
              <article key={model.id} className="m-card m-card--shadow listing-pick-card">
                <figure className="listing-pick-card__figure">
                  {model.image ? (
                    <Image
                      src={`/images/macbook/${model.image}`}
                      alt={`${model.model}の外観`}
                      className="listing-pick-card__img"
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src="https://placehold.co/200x200/f5f5f7/1d1d1f?text=MacBook"
                      alt={`${model.model}の外観`}
                      className="listing-pick-card__img"
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  )}
                </figure>
                <div className="listing-pick-card__body">
                  <h3 className="listing-pick-card__name">{model.shortname || model.model}</h3>
                  {releaseDate && (
                    <p className="listing-pick-card__release">
                      <i className="fa-regular fa-calendar" aria-hidden="true"></i> {releaseDate}
                    </p>
                  )}
                  <p className="listing-pick-card__desc">{desc}</p>
                </div>
                <a href={`#detail-${model.slug}`} className="m-btn m-btn--primary m-btn--block listing-pick-card__btn">
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
