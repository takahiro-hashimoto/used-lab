type GlossaryItem = {
  title: string
  desc: string
}

type Props = {
  productName: string
  items: GlossaryItem[]
}

export default function GlossarySection({ productName, items }: Props) {
  return (
    <section className="l-section l-section--bg-subtle" id="glossary" aria-labelledby="heading-glossary">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-glossary">
          {productName} 各機能の用語解説
        </h2>
        <p className="m-section-desc">
          {productName}のスペック表に登場する主要な機能や用語をわかりやすく解説します。<br />
          各機能の意味を理解することで、自分に合った{productName}選びに役立ちます。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg glossary-grid">
          {items.map((item) => (
            <div key={item.title} className="m-card m-card--shadow glossary-grid__item">
              <p className="glossary-grid__title">{item.title}</p>
              <p className="glossary-grid__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
