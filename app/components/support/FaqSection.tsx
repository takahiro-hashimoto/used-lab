type FaqItem = {
  question: string
  answer: string
}

type Props = {
  title: string
  description: string
  items: FaqItem[]
  children?: React.ReactNode
}

export type { FaqItem }

/** [text](url) 形式のリンクをReactノードに変換 */
function parseLinks(text: string): React.ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/)
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (match) {
      return <a key={i} href={match[2]}>{match[1]}</a>
    }
    return part
  })
}

export default function FaqSection({ title, description, items, children }: Props) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          {title}
        </h2>
        <p className="m-section-desc">{description}</p>

        <div className="faq-list">
          {items.map((item) => (
            <div key={item.question} className="m-card faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">
                {item.answer.includes('<') ? (
                  item.answer.split('\n').map((paragraph, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))
                ) : (
                  item.answer.split('\n').map((paragraph, i) => (
                    <p key={i}>{parseLinks(paragraph)}</p>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        {children}
      </div>
    </section>
  )
}
