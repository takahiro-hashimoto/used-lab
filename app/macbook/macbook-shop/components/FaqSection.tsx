import { MACBOOK_SHOP_FAQ_ITEMS } from '@/lib/data/macbook-shop'

export default function FaqSection() {
  return (
    <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          よくある質問
        </h2>
        <p className="m-section-desc">中古MacBook購入先に関してよくある質問をまとめました。</p>

        <div className="faq-list">
          {MACBOOK_SHOP_FAQ_ITEMS.map((item, i) => (
            <div key={i} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
