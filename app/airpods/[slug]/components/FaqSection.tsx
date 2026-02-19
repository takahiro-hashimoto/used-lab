import type { ReactNode } from 'react'
import type { AirPodsModel, AirPodsPriceLog, ProductShopLink } from '@/lib/types'
import {
  generateFaqsForJsonLd,
  getVerdict,
  calculateFirmwareLifespan,
  formatReleaseDate,
} from '@/lib/utils/airpods-helpers'

type Props = {
  model: AirPodsModel
  latestPrice: AirPodsPriceLog | null
  shopLinks: ProductShopLink[]
}

export default function FaqSection({ model, latestPrice, shopLinks }: Props) {
  // JSON-LD用のプレーンテキスト版
  const jsonLdFaqs = generateFaqsForJsonLd(model)

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
          中古{model.name}（{model.model}）を購入する際によくある質問
        </h2>
        <p className="m-section-desc">
          中古{model.name}を買う前に確認しておきたい質問項目をまとめました
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
  model: AirPodsModel,
  latestPrice: AirPodsPriceLog | null,
  shopLinks: ProductShopLink[],
): { question: string; answer: ReactNode }[] {
  const faqs: { question: string; answer: ReactNode }[] = []
  const v = getVerdict(model)
  const fwLife = calculateFirmwareLifespan(model.date)

  // Q1: 購入判定
  faqs.push({
    question: `中古${model.name}（${model.model}）は今から購入するのあり？`,
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
    question: `中古${model.name}（${model.model}）はどこで買える？`,
    answer: (
      <>
        <p>中古{model.name}の購入先としては下記が考えられます。おすすめは中古スマホ・ガジェット専門店での購入。購入から一定期間内にトラブルがあった際にショップ独自の保証を受けることができるからです。</p>
        <ul>
          <li>中古スマホ・ガジェット専門店</li>
          <li>総合リユースショップ</li>
          <li>ネットオークションやフリマアプリ</li>
        </ul>
      </>
    ),
  })

  // Q3: おすすめサイト（イオシスのリンクを取得）
  const iosysLink = shopLinks.find((link) => link.shop_id === 1)
  faqs.push({
    question: `中古で${model.name}（${model.model}）を買うのにおすすめの販売店はどこ？`,
    answer: (
      <>
        <p>
          イオシスがおすすめです。中古AirPodsの価格が他のサイトに比べて安い場合が多く、お得にAirPodsを購入することができるからです。購入後の保証期間も長く、独自の保証延長サービスがあるのもおすすめのポイント。
        </p>
        {iosysLink && (
          <p>
            <a href={iosysLink.url} target="_blank" rel="noopener noreferrer nofollow">
              イオシスで中古{model.name}を見る →
            </a>
          </p>
        )}
      </>
    ),
  })

  // Q4: 発売日
  const releaseDate = formatReleaseDate(model.date)
  faqs.push({
    question: `${model.name}（${model.model}）の発売日はいつ？`,
    answer: (
      <p>
        {releaseDate
          ? `${model.name}（${model.model}）の発売日は${releaseDate}です。`
          : `${model.name}（${model.model}）の発売日は公開されていません。`
        }
      </p>
    ),
  })

  // Q5: ファームウェアサポート
  faqs.push({
    question: `${model.name}（${model.model}）はいつまで使える？`,
    answer: fwLife.isSupported ? (
      <p>
        {model.name}（{model.model}）は<strong>{fwLife.endYear}年頃(±1年)</strong> まで安全に使えることが予想されます。
      </p>
    ) : (
      <p>
        {model.name}（{model.model}）のファームウェアサポートは終了している可能性があります。
        新しいモデルへの買い替えをおすすめします。
      </p>
    ),
  })

  return faqs
}
