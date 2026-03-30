import type { ReactNode } from 'react'
import IconCard from '@/app/components/IconCard'

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
            <IconCard key={card.title} icon={card.iconClass} title={card.title}>
              <p>{card.desc}</p>
            </IconCard>
          ))}
        </div>
      </div>
    </section>
  )
}
