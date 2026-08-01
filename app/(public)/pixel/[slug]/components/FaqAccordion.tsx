import type { ReactNode } from 'react'

type FaqItem = {
  question: string
  answer: ReactNode
}

type Props = {
  faqs: FaqItem[]
}

export default function FaqAccordion({ faqs }: Props) {
  return (
    <dl className="m-faq-list">
      {faqs.map((faq, i) => (
        <div key={i} className="m-faq">
          <dt className="m-faq__header">
            <span className="m-faq__icon">{i + 1}</span>
            <span className="m-faq__question">{faq.question}</span>
          </dt>
          <dd className="m-faq__body">
            <div className="m-faq__answer">{faq.answer}</div>
          </dd>
        </div>
      ))}
    </dl>
  )
}
