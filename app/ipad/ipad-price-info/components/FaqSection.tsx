import { FAQ_ITEMS } from '@/lib/data/ipad-price-info'

export default function FaqSection() {
  return (
    <section className="l-section" id="pd-faq" aria-labelledby="pd-faq-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-faq-title">
          よくある質問
        </h2>
        <p className="m-section-desc">中古iPad購入に関するよくある疑問にお答えします。</p>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="faq-item m-card m-card--shadow">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer">
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
