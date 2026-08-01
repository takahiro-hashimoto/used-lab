import type { PixelModel, PixelPriceLog, ProductShopLink } from '@/lib/types'
import { generatePixelFaqsForJsonLd, buildPixelDisplayFaqs } from '../pixel-helpers'

type Props = {
  model: PixelModel
  latestPrice: PixelPriceLog | null
  shopLinks: ProductShopLink[]
}

export default function FaqSection({ model, latestPrice, shopLinks }: Props) {
  // JSON-LD用のプレーンテキスト版
  const jsonLdFaqs = generatePixelFaqsForJsonLd(model, latestPrice)

  // 表示用のJSX FAQ（イオシスのリンクを取得）
  const iosysUrl = shopLinks.find((link) => link.shop_id === 1)?.url ?? null
  const displayFaqs = buildPixelDisplayFaqs(model, latestPrice, iosysUrl)

  if (displayFaqs.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: jsonLdFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="l-section" id="faq" aria-labelledby="heading-faq">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
          中古{model.model}を購入する際によくある質問
        </h2>
        <p className="m-section-desc">
          中古{model.model}を買う前に確認しておきたい質問項目をまとめました
        </p>

        <div className="faq-list">
          {displayFaqs.map((faq, i) => (
            <div key={i} className="m-card m-card--shadow faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <div className="faq-answer m-rich-text m-rich-text--muted">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
