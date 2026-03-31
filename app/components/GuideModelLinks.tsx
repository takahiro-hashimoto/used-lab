import Link from 'next/link'

type ModelItem = {
  slug: string
  name: string
  meta: string
}

type Props = {
  /** URL prefix: e.g. '/iphone', '/ipad', '/watch', '/macbook' */
  basePath: string
  heading?: string
  headingClassName?: string
  description?: string
  categories: { label: string; items: ModelItem[] }[]
}

export default function GuideModelLinks({ basePath, heading, headingClassName, description, categories }: Props) {
  return (
    <div className="guide-model-links">
      {heading && <h3 className={`guide-model-links__heading${headingClassName ? ` ${headingClassName}` : ''}`}>{heading}</h3>}
      {description && <p className="guide-model-links__desc">{description}</p>}

      {categories.map((cat, i) => (
        <div key={cat.label || i}>
          {cat.label && <h4 className="guide-model-links__category">{cat.label}</h4>}
          <div className="l-grid l-grid--3col l-grid--gap-md u-mb-2xl">
            {cat.items.map((item) => (
              <Link key={item.slug} href={`${basePath}/${item.slug}/`} className="guide-model-item m-card">
                <span className="guide-model-item__name">{item.name}</span>
                <span className="guide-model-item__meta">{item.meta}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
