import Link from 'next/link'

type FaqItem = {
  question: string
  answer: string
}

type Props = {
  title: string
  description: string
  items: FaqItem[]
  children?: React.ReactNode
  className?: string
}

export type { FaqItem }

/** [text](url) と <a href="...">text</a> の両形式をHTMLタグなしのプレーンテキストに変換（JSON-LD用） */
function toPlainText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<a [^>]+>([^<]*)<\/a>/g, '$1')
    .replace(/<[^>]+>/g, '')
}

/** [text](url) と <a href="...">text</a> の両形式をReactノードに変換。内部リンクはLink、外部はa */
function parseFaqAnswer(text: string): React.ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|<a [^>]+>[^<]*<\/a>)/)
  return parts.map((part, i) => {
    const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (mdMatch) {
      const [, label, href] = mdMatch
      return href.startsWith('/')
        ? <Link key={i} href={href}>{label}</Link>
        : <a key={i} href={href} rel="noopener noreferrer">{label}</a>
    }

    const htmlMatch = part.match(/^<a ([^>]+)>([^<]*)<\/a>$/)
    if (htmlMatch) {
      const href = (htmlMatch[1].match(/href="([^"]*)"/) ?? [])[1] ?? '#'
      const rel = (htmlMatch[1].match(/rel="([^"]*)"/) ?? [])[1]
      return href.startsWith('/')
        ? <Link key={i} href={href}>{htmlMatch[2]}</Link>
        : <a key={i} href={href} rel={rel ?? 'noopener noreferrer'}>{htmlMatch[2]}</a>
    }
    return part
  })
}

export default function FaqSection({ title, description, items, children, className }: Props) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
          .split('\n')
          .map(toPlainText)
          .join(' ')
          .trim(),
      },
    })),
  }

  return (
    <section className={`l-section${className ? ` ${className}` : ''}`} id="faq" aria-labelledby="heading-faq">
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
                {item.answer.split('\n').map((paragraph, i) => (
                  <p key={i}>{parseFaqAnswer(paragraph)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        {children}
      </div>
    </section>
  )
}
