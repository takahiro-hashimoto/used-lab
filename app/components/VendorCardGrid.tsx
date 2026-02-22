export type VendorCardItem = {
  name: string
  recommended?: boolean
  badgeText?: string
  tag?: string
  specs: { label: string; value: string }[]
  href: string
  ctaText: string
}

type Props = {
  cards: VendorCardItem[]
}

function renderSpecValue(value: string) {
  switch (value) {
    case '◎':
      return <span className="m-rating__icon m-rating__icon--excellent">◎</span>
    case '○':
      return <span className="m-rating__icon m-rating__icon--good" aria-label="あり">○</span>
    case '×':
      return <span className="m-spec-row__cross" aria-label="なし">×</span>
    case '無料':
      return <span className="m-spec-row__free">無料</span>
    default:
      return <>{value}</>
  }
}

export default function VendorCardGrid({ cards }: Props) {
  if (cards.length === 0) return null

  return (
    <div className="l-grid l-grid--3col l-grid--gap-lg">
      {cards.map((card) => (
        <article
          key={card.name}
          className={`m-card m-card--shadow m-vendor-card${card.recommended ? ' m-vendor-card--recommended' : ''}`}
        >
          {card.badgeText && (
            <span className="m-badge m-badge--primary m-vendor-card__badge">{card.badgeText}</span>
          )}
          <div className="m-vendor-card__header">
            <h3 className="m-vendor-card__name">{card.name}</h3>
            {card.tag && <span className="m-tag">{card.tag}</span>}
          </div>
          <dl className="m-vendor-card__specs">
            {card.specs.map((spec) => (
              <div key={spec.label} className="m-spec-row">
                <dt>{spec.label}</dt>
                <dd>{renderSpecValue(spec.value)}</dd>
              </div>
            ))}
          </dl>
          <a
            href={card.href}
            className="m-btn m-btn--primary m-btn--block"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            {card.ctaText}{' '}
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </article>
      ))}
    </div>
  )
}
