import { SHOP_FAQ_ITEMS } from '@/lib/data/iphone-shop'

export default function FaqSection() {
  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          よくある質問
        </h2>
        <p className="m-section-desc">中古iPhone購入先に関してよくある質問をまとめました。</p>

        <div className="faq-list">
          {SHOP_FAQ_ITEMS.map((item, i) => (
            <div key={i} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="m-callout m-callout--muted" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">関連</span>
          <p className="m-callout__text">
            <a href="https://smapple-tenjin.com/">iPhone修理福岡 ならスマップル天神店</a><br />
            <a href="https://smapple-omiya.com/">iPhone修理大宮 ならスマップル大宮店</a><br />
            <a href="https://smapple-sendai.com/">iPhone修理仙台 スマップル仙台店</a><br />
            <a href="https://www.a-sas.ne.jp/" target="_blank" rel="noreferrer noopener">【誰でもスマホ】 携帯ブラックでも契約できる格安SIM</a>
          </p>
        </div>
      </div>
    </section>
  )
}
