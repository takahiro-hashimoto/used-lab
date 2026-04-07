import type { ReactNode } from 'react'
import MediaCard from '@/app/components/MediaCard'

type TimingCard = {
  title: string
  imgSrc: string
  imgAlt: string
  content: ReactNode
  footer?: ReactNode
}

type Props = {
  sectionTitle: string
  sectionDescription: string
  cards: TimingCard[]
  afterContent?: ReactNode
}

export type { TimingCard }

export default function TimingSection({ sectionTitle, sectionDescription, cards, afterContent }: Props) {
  return (
    <section className="l-section" id="timing" aria-labelledby="heading-timing">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-timing">
          {sectionTitle}
        </h2>
        <p className="m-section-desc">{sectionDescription}</p>

        {cards.map((card) => (
          <MediaCard
            key={card.title}
            src={card.imgSrc}
            alt={card.imgAlt}
            title={card.title}
            width={800}
            height={450}
            aside
            footer={card.footer}
          >
            {card.content}
          </MediaCard>
        ))}
        {afterContent}
      </div>
    </section>
  )
}
