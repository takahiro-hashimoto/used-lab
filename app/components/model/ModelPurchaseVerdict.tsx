import RatingMark from '@/app/components/RatingMark'

type RatingItem = {
  icon: string
  label: string
  value: string | React.ReactNode
}

type SuitabilityItem = {
  label: string
  icon: string
  mark: string
}

type Props = {
  modelName: string
  description: string
  verdict: {
    rank: string
    verdictMain: string
    statusLabel: string
    descriptions: string[]
    suitability: SuitabilityItem[]
  }
  topRatings: RatingItem[]
  suitIcons: Record<string, string>
}

export type { RatingItem, SuitabilityItem }

export default function ModelPurchaseVerdict({
  modelName,
  description,
  verdict: v,
  topRatings,
  suitIcons,
}: Props) {
  return (
    <section className="l-section" id="buy-now" aria-labelledby="heading-buy-now">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-buy-now">
          {modelName}
        </h2>
        <p className="m-section-desc">{description}</p>

        <div className="m-card conclusion-card">
          {/* ヘッダー：見出し＋ラベル */}
          <div className={`conclusion-header conclusion-header--${v.rank}`}>
            <p className="conclusion-headline">{v.verdictMain}</p>
            <span className="m-badge m-badge--translucent">
              <i className="fa-solid fa-star" aria-hidden="true"></i> {v.statusLabel}
            </span>
          </div>

          {/* 結論テキスト */}
          <div className="u-mb-lg m-rich-text">
            {v.descriptions.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          {/* 評価マトリックス */}
          <dl className="l-grid l-grid--3col">
            {topRatings.map((r) => (
              <div key={r.label} className="m-rating">
                <dt className="m-rating__label">
                  <i className={r.icon} aria-hidden="true"></i> {r.label}
                </dt>
                <dd className="m-rating__value">{r.value}</dd>
              </div>
            ))}

            {v.suitability.map((item) => (
              <div key={item.label} className="m-rating">
                <dt className="m-rating__label">
                  <i className={suitIcons[item.icon] || 'fa-solid fa-circle'} aria-hidden="true"></i>{' '}
                  {item.label}
                </dt>
                <dd className="m-rating__icon">
                  <RatingMark mark={item.mark} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
