import type { ReactNode } from 'react'

type CriteriaCard = {
  iconClass: string
  iconColor: 'blue' | 'green' | 'red'
  title: string
  desc: ReactNode
}

type Props = {
  recommendCount: number
  recommendCountLabel: string
  descriptions: ReactNode[]
  cards: CriteriaCard[]
}

export default function CriteriaSection({ recommendCount, recommendCountLabel, descriptions, cards }: Props) {
  return (
    <section className="l-section" id="criteria" aria-labelledby="heading-criteria">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-criteria">
          なぜこの{recommendCountLabel}なのか?選んだ判断基準
        </h2>
        {descriptions.map((desc, i) => (
          <p key={i} className="m-section-desc">{desc}</p>
        ))}

        <div className="l-grid l-grid--3col l-grid--gap-lg">
          {cards.map((card) => (
            <div key={card.title} className="m-card m-card--shadow criteria-card">
              <div className="criteria-card__head">
                <span className={`criteria-card__icon criteria-card__icon--${card.iconColor} m-icon-box m-icon-box--lg`}>
                  <i className={card.iconClass} aria-hidden="true"></i>
                </span>
                <h3 className="criteria-card__title">{card.title}</h3>
              </div>
              <p className="criteria-card__desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
