import type { FaqItem } from './types'

interface Props {
  productName: string
  faqItems: FaqItem[]
}

export default function FaqSection({ productName, faqItems }: Props) {
  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          よくある質問
        </h2>
        <p className="m-section-desc">中古{productName}購入時の注意点に関してよくある質問をまとめました。</p>

        <div className="faq-list">
          {faqItems.map((item, i) => (
            <div key={i} className="m-card faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
