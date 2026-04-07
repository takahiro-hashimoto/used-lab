import Image from 'next/image'

type Props = {
  sectionTitle: string
  sectionDescription: string
  imageSrc: string
  imageAlt: string
  subtitle: string
  cardTitle: string
  cardDescription: string
  buttonText: string
  buttonHref: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  sectionId?: string
  headingId?: string
}

export default function PopularSection({
  sectionTitle,
  sectionDescription,
  imageSrc,
  imageAlt,
  subtitle,
  cardTitle,
  cardDescription,
  buttonText,
  buttonHref,
  secondaryButtonText,
  secondaryButtonHref,
  sectionId = 'popular',
  headingId = 'heading-popular',
}: Props) {
  // 外部URL（placehold.co等）は <img>、ローカル画像は <Image> を使用
  const isExternal = imageSrc.startsWith('http')

  return (
    <section className="l-section" id={sectionId} aria-labelledby={headingId}>
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id={headingId}>
          {sectionTitle}
        </h2>
        <p className="m-section-desc">{sectionDescription}</p>

        <div className="m-card m-card--shadow popular-card">
          <figure className="popular-card-figure">
            {isExternal ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageSrc}
                alt={imageAlt}
                className="popular-card-img"
                width={1200}
                height={1500}
                loading="lazy"
              />
            ) : (
              <Image
                src={imageSrc}
                alt={imageAlt}
                className="popular-card-img"
                width={1200}
                height={1500}
                loading="lazy"
              />
            )}
          </figure>
          <div className="popular-card-body">
            <p className="popular-card-subtitle">{subtitle}</p>
            <p className="popular-card-title">{cardTitle}</p>
            <p className="popular-card-desc">{cardDescription}</p>
            <div className="popular-card-buttons">
              <a className="m-btn m-btn--primary" href={buttonHref}>
                {buttonText} <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
              {secondaryButtonHref && secondaryButtonText && (
                <a className="m-btn m-btn--secondary" href={secondaryButtonHref} target="_blank" rel="nofollow noopener noreferrer">
                  {secondaryButtonText} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
