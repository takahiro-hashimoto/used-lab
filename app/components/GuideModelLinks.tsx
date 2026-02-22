import Link from 'next/link'

type ModelItem = {
  slug: string
  name: string
  meta: string
}

type Props = {
  /** URL prefix: e.g. '/iphone', '/ipad', '/watch', '/macbook' */
  basePath: string
  heading: string
  description: string
  categories: { label: string; items: ModelItem[] }[]
}

export default function GuideModelLinks({ basePath, heading, description, categories }: Props) {
  return (
    <div className="guide-model-links">
      <h3 className="guide-model-links__heading">{heading}</h3>
      <p className="guide-model-links__desc">{description}</p>

      {categories.map((cat) => (
        <div key={cat.label}>
          <h4 className="guide-model-links__category">{cat.label}</h4>
          <div className="l-grid l-grid--3col l-grid--gap-lg guide-model-grid">
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
