type Props = {
  /** 相場を差し込み済みのFAQ（lib/data/mac-price-info の buildFaqItems で生成） */
  items: { question: string; answer: string }[]
}

export default function FaqSection({ items }: Props) {
  return (
    <section className="l-section" id="pd-faq" aria-labelledby="pd-faq-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-faq-title">
          よくある質問
        </h2>
        <p className="m-section-desc">中古のiMac・Mac mini購入に関するよくある疑問にお答えします。</p>

        <div className="faq-list">
          {items.map((item, i) => (
            <div key={i} className="faq-item m-card m-card--shadow">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">
                {item.answer.split('\n').map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
