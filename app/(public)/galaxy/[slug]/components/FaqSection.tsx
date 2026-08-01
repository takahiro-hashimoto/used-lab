import type { ReactNode } from 'react'
import type { GalaxyModel, GalaxyPriceLog, ProductShopLink } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/shared-helpers'
import {
  generateGalaxyFaqsForJsonLd,
  getGalaxyVerdict,
  getGalaxyAdvanceFeaturesList,
  calculateGalaxySupport,
  formatSupportUntil,
} from '../lib/helpers'

type Props = {
  model: GalaxyModel
  latestPrice: GalaxyPriceLog | null
  allModels: GalaxyModel[]
  shopLinks: ProductShopLink[]
}

export default function FaqSection({ model, latestPrice, allModels, shopLinks }: Props) {
  const jsonLdFaqs = generateGalaxyFaqsForJsonLd(model, latestPrice, allModels)
  const displayFaqs = buildDisplayFaqs(model, latestPrice, allModels, shopLinks)

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

function buildDisplayFaqs(
  model: GalaxyModel,
  latestPrice: GalaxyPriceLog | null,
  allModels: GalaxyModel[],
  shopLinks: ProductShopLink[],
): { question: string; answer: ReactNode }[] {
  const faqs: { question: string; answer: ReactNode }[] = []
  const v = getGalaxyVerdict(model, latestPrice, allModels)
  const support = calculateGalaxySupport(model)

  // Q1: 購入判定
  faqs.push({
    question: `中古${model.model}は今から購入するのあり？`,
    answer: (
      <>
        <p>結論から言うと、「{v.verdictMain}」と言えます。</p>
        {v.descriptions.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </>
    ),
  })

  // Q2: どこで買える？
  faqs.push({
    question: `中古${model.model}はどこで買える？`,
    answer: (
      <>
        <p>中古{model.model}の購入先としては下記が考えられます。おすすめは中古スマホ専門店での購入。購入から一定期間内にトラブルがあった際にショップ独自の保証を受けることができるからです。</p>
        <ul>
          <li>中古スマホ専門店</li>
          <li>大手キャリアの認定中古品</li>
          <li>ネットオークションやフリマアプリ</li>
        </ul>
      </>
    ),
  })

  // Q3: おすすめサイト（イオシスのリンクを取得）
  const iosysLink = shopLinks.find((link) => link.shop_id === 1)
  faqs.push({
    question: `中古${model.model}購入におすすめのサイトはどこ？`,
    answer: (
      <>
        <p>
          イオシスがおすすめです。中古スマホの価格が他のサイトに比べて安い場合が多く、お得にGalaxyを購入することができるからです。購入後の保証期間や赤ロム保証があるのもおすすめのポイント。
        </p>
        {iosysLink && (
          <p>
            <a href={iosysLink.url} target="_blank" rel="noopener noreferrer nofollow">
              イオシスで中古{model.model}を見る →
            </a>
          </p>
        )}
      </>
    ),
  })

  // Q4: 発売日
  const releaseDate = formatReleaseDate(model.date)
  faqs.push({
    question: `${model.model}の発売日はいつ？`,
    answer: (
      <p>
        {releaseDate
          ? `${model.model}の発売日は${releaseDate}です。`
          : `${model.model}の発売日は公開されていません。`
        }
      </p>
    ),
  })

  // Q5: Android・セキュリティ更新
  faqs.push({
    question: `${model.model}のAndroid・セキュリティ更新はいつまで？あと何年使える？`,
    answer: support.ended ? (
      <p>
        {model.model}のAndroid・セキュリティ更新のサポートは終了している可能性があります。
        セキュリティの観点からは新しいモデルへの買い替えをおすすめします。
      </p>
    ) : support.supportUntil ? (
      <p>
        {model.model}は<strong>{formatSupportUntil(support.supportUntil)}頃</strong>まで安全に使えることが予想されます。
        残り約{v.remainingYears}年使用可能と推定されます。
      </p>
    ) : (
      <p>
        {model.model}のOS・セキュリティ更新は残り約{v.remainingYears}年と推定されます。
      </p>
    ),
  })

  // Q6: 進化したポイント
  const advanceFeatures = getGalaxyAdvanceFeaturesList(model)
  if (advanceFeatures.length > 0) {
    faqs.push({
      question: `${model.model}は前モデルからどんな点が進化していますか？`,
      answer: (
        <>
          <p>下記が主にアップデートされたポイントです。</p>
          <ul>
            {advanceFeatures.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </>
      ),
    })
  }

  return faqs
}
