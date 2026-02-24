import type { ProductReview } from '@/lib/types'

type Props = {
  modelName: string
  reviews: ProductReview[]
}

export default function ReviewSection({ modelName, reviews }: Props) {
  if (reviews.length === 0) return null

  return (
    <section className="l-section l-section--bg-subtle" id="reviews" aria-labelledby="heading-reviews">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-reviews">
          {modelName}のレビュー記事
        </h2>
        <p className="m-section-desc">
          {modelName}を実際に使用したレビュー記事をまとめました。購入前の参考にご覧ください。
        </p>

        <div className="review-list">
          {reviews.map((review) => (
            <a
              key={review.id}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="m-card m-card--shadow review-card m-card--hoverable"
            >
              <div className="review-card__body">
                <span className="review-card__site">{review.site_name}</span>
                <h3 className="review-card__title">{review.title}</h3>
              </div>
              <span className="review-card__arrow">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
