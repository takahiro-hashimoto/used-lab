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
}: Props) {
  // 外部URL（placehold.co等）は <img>、ローカル画像は <Image> を使用
  const isExternal = imageSrc.startsWith('http')

  return (
    <section className="l-section l-section--bg-subtle" id="popular" aria-labelledby="heading-popular">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
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
                width={400}
                height={500}
                loading="lazy"
              />
            ) : (
              <Image
                src={imageSrc}
                alt={imageAlt}
                className="popular-card-img"
                width={400}
                height={500}
                loading="lazy"
              />
            )}
          </figure>
          <div className="popular-card-body">
            <p className="popular-card-subtitle">{subtitle}</p>
            <p className="popular-card-title">{cardTitle}</p>
            <p className="popular-card-desc">{cardDescription}</p>
            <div>
              <a className="m-btn m-btn--primary" href={buttonHref}>
                {buttonText} <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
