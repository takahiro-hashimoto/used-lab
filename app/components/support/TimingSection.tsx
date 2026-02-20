import type { ReactNode } from 'react'

type TimingCard = {
  title: string
  imgSrc: string
  imgAlt: string
  content: ReactNode
}

type Props = {
  sectionTitle: string
  sectionDescription: string
  cards: TimingCard[]
}

export type { TimingCard }

export default function TimingSection({ sectionTitle, sectionDescription, cards }: Props) {
  return (
    <section className="l-section" id="timing" aria-labelledby="heading-timing">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-timing">
          {sectionTitle}
        </h2>
        <p className="m-section-desc">{sectionDescription}</p>

        {cards.map((card) => (
          <div key={card.title} className="m-card m-card--shadow m-card--padded">
            <h3 className="m-sub-heading m-sub-heading--no-mt">{card.title}</h3>
            <div className="timing-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="timing-card__img"
                src={card.imgSrc}
                alt={card.imgAlt}
                width={400}
                height={520}
                loading="lazy"
              />
              <div className="timing-card__body">{card.content}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
