import type { ReactNode } from 'react'
import type { IPadModel, IPadPriceLog, ProductShopLink } from '@/lib/types'
import {
  generateFaqsForJsonLd,
  getVerdict,
  calculateOSLifespan,
  getAdvanceFeaturesList,
  formatReleaseDate,
} from '@/lib/utils/ipad-helpers'

type Props = {
  model: IPadModel
  latestPrice: IPadPriceLog | null
  shopLinks: ProductShopLink[]
}

export default function FaqSection({ model, latestPrice, shopLinks }: Props) {
  // JSON-LD用のプレーンテキスト版
  const jsonLdFaqs = generateFaqsForJsonLd(model, latestPrice)

  // 表示用のJSX FAQ
  const displayFaqs = buildDisplayFaqs(model, latestPrice, shopLinks)

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
              <div className="faq-answer">{faq.answer}</div>
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

/**
 * 表示用のJSX FAQ を構築
 */
function buildDisplayFaqs(
  model: IPadModel,
  latestPrice: IPadPriceLog | null,
  shopLinks: ProductShopLink[],
): { question: string; answer: ReactNode }[] {
  const faqs: { question: string; answer: ReactNode }[] = []
  const v = getVerdict(model, latestPrice)
  const osLife = calculateOSLifespan(model.date)

  // Q1: 購入判定
  faqs.push({
    question: `中古${model.model}は今から購入するのあり？`,
    answer: (
      <>
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
        <p>中古{model.model}の購入先としては下記が考えられます。おすすめは中古タブレット専門店での購入。購入から一定期間内にトラブルがあった際にショップ独自の保証を受けることができるからです。</p>
        <ul>
          <li>中古タブレット専門店</li>
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
          イオシスがおすすめです。中古タブレットの価格が他のサイトに比べて安い場合が多く、お得にiPadを購入することができるからです。購入後の保証期間も長く、独自の保証延長サービスがあるのもおすすめのポイント。
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

  // Q5: iPadOSアップデート
  const releaseMonth = model.date ? parseInt(model.date.split('/')[1] || '9', 10) || 9 : 9
  faqs.push({
    question: `${model.model}のiPadOSアップデートはいつまで？あと何年使える？`,
    answer: osLife.isSupported ? (
      <p>
        {model.model}は<strong>{osLife.osEndYear}年{releaseMonth}月(±1年)</strong> 頃まで安全に使えることが予想されます。
      </p>
    ) : (
      <p>
        {model.model}のiPadOSアップデートサポートは終了している可能性があります。
        セキュリティの観点からは新しいモデルへの買い替えをおすすめします。
      </p>
    ),
  })

  // Q6: 進化したポイント
  const advanceFeatures = getAdvanceFeaturesList(model)
  faqs.push({
    question: `${model.model}は前モデルからどんな点が進化していますか？`,
    answer: advanceFeatures.length > 0 ? (
      <>
        <p>下記が主にアップデートされたポイントです。</p>
        <ul>
          {advanceFeatures.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </>
    ) : (
      <p>
        {model.model}の進化ポイントの詳細については、本ページの「進化したポイント」セクションをご覧ください。
      </p>
    ),
  })

  return faqs
}
