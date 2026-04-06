import Link from 'next/link'
import Image from 'next/image'
import { placeholder } from '@/lib/placeholder'

interface ProductCardProps {
  variant: 'compact' | 'detail'
  modelId: number
  modelName: string
  imageUrl: string | null
  imageFallbackText?: string
  metaText: string
  // detail variant only
  tagLabel?: string
  specs?: string[]
  description?: string
  // price
  priceLabel: string
  priceValue: string
  // CTA
  shopUrl?: string | null
  fallbackHref?: string
  fallbackText?: string
}

export default function ProductCard({
  variant,
  modelId,
  modelName,
  imageUrl,
  imageFallbackText,
  metaText,
  tagLabel,
  specs,
  description,
  priceLabel,
  priceValue,
  shopUrl,
  fallbackHref,
  fallbackText = '在庫情報を見る',
}: ProductCardProps) {
  const fallbackImg = imageFallbackText || modelName
  const btnStyle: React.CSSProperties = { lineHeight: 1.5 }

  if (variant === 'compact') {
    return (
      <div key={modelId} className="price-card m-card m-card--shadow">
        <figure className="price-card__img">
          <Image
            src={imageUrl || placeholder(80, 80, fallbackImg)}
            alt={modelName}
            width={80}
            height={80}
            loading="lazy"
          />
        </figure>
        <div className="price-card__info">
          <p className="price-card__name">{modelName}</p>
          <p className="price-card__meta">{metaText}</p>
        </div>
        <div className="price-card__price">
          <span className="price-card__label">{priceLabel}</span>
          <span className="price-card__value m-price-display m-price-display--sm m-price-display--primary">{priceValue} 〜</span>
          {shopUrl && (
            <div className="price-card__cta">
              <a href={shopUrl} className="m-btn m-btn--primary m-btn--sm" style={btnStyle} target="_blank" rel="noopener noreferrer nofollow" aria-label={`${modelName}の在庫情報を見る`}>
                在庫情報を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  // detail variant
  return (
    <div key={modelId} className="guide-recommend m-card m-card--shadow">
      <div className="guide-recommend__inner">
        <figure className="guide-recommend__img">
          <Image
            src={imageUrl || placeholder(120, 140, fallbackImg)}
            alt={modelName}
            width={120}
            height={140}
            loading="lazy"
          />
        </figure>
        <div className="guide-recommend__body">
          <div className="guide-recommend__header sp-col">
            <p className="guide-recommend__name sp-text-base">{modelName}</p>
            {tagLabel && <span className="guide-recommend__tag">{tagLabel}</span>}
          </div>
          {specs && (
            <ul className="guide-recommend__specs sp-hidden">
              {specs.map((spec, j) => (
                <li key={j}>{spec}</li>
              ))}
            </ul>
          )}
          {description && <p className="guide-recommend__desc">{description}</p>}
        </div>
        <div className="guide-recommend__aside">
          {priceValue && (
            <>
              <span className="guide-recommend__price-label">{priceLabel}</span>
              <span className="guide-recommend__price-value m-price-display m-price-display--md m-price-display--primary">{priceValue}〜</span>
            </>
          )}
          {shopUrl ? (
            <a href={shopUrl} className="m-btn m-btn--primary m-btn--sm" style={btnStyle} target="_blank" rel="noopener noreferrer nofollow" aria-label={`${modelName}の${fallbackText}`}>
              <span>{fallbackText}</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
          ) : fallbackHref ? (
            <Link href={fallbackHref} className="m-btn m-btn--primary m-btn--sm" style={btnStyle} aria-label={`${modelName}の${fallbackText}`}>
              <span>{fallbackText}</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
