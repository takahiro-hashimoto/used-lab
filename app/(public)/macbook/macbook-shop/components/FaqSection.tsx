import { MACBOOK_SHOP_FAQ_ITEMS } from '@/lib/data/macbook-shop'

export default function FaqSection() {
  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          よくある質問
        </h2>
        <p className="m-section-desc">中古MacBook購入先に関してよくある質問をまとめました。</p>

        <div className="faq-list">
          {MACBOOK_SHOP_FAQ_ITEMS.map((item, i) => (
            <div key={i} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">
                {item.answer.split('\n').map((p, j) => <p key={j}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>

        <div className="m-callout m-callout--muted u-mt-2xl">
          <span className="m-callout__label">関連</span>
          <p className="m-callout__text">
            <a href="https://prorea.jp/programming/columns/recommend-programming-school-commuting/" target="_blank" rel="noreferrer noopener">通学型おすすめプログラミングスクール比較12選！挫折せず続けるならオフラインがおすすめ</a>
          </p>
        </div>
      </div>
    </section>
  )
}
