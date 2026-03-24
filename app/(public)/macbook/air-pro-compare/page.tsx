import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import ComparisonTable from './components/ComparisonTable'
import ComparisonSections from './components/ComparisonSections'
import RecommendSection from './components/RecommendSection'
import UseCaseSection from './components/UseCaseSection'
import PriceCompareSection from './components/PriceCompareSection'
import FaqSection from './components/FaqSection'
import SummarySection from './components/SummarySection'
import { getAllMacBookModels, getLatestMacBookPriceLog } from '@/lib/queries'
import type { MacBookPriceLog } from '@/lib/types'

const PAGE_TITLE = 'MacBook AirとProどっちがいい？違いと選び方をやさしく解説'
const PAGE_DESCRIPTION =
  'MacBook AirとProの違いを冷却方式・チップ性能・ディスプレイ・ポート・中古価格の5項目で比較。用途別のおすすめ早見表で自分に合ったモデルがすぐわかります。'
const PAGE_URL = 'https://used-lab.com/macbook/air-pro-compare/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/macbook/air-pro-compare/',
    images: [{ url: '/images/content/macbook-image-05.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/macbook-image-05.jpg'],
  },
}

export const revalidate = 86400

export default async function AirProComparePage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // データ取得
  const models = await getAllMacBookModels()
  const priceEntries = await Promise.all(
    models.map(async (m) => {
      const log = await getLatestMacBookPriceLog(m.id)
      return [m.id, log] as [number, MacBookPriceLog | null]
    })
  )
  const priceMap = new Map<number, MacBookPriceLog>()
  for (const [id, log] of priceEntries) {
    if (log) priceMap.set(id, log)
  }

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.com/macbook' },
      { '@type': 'ListItem', position: 3, name: 'MacBook AirとProの違い' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: '2026-03-24',
    dateModified: dateStr,
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  }

  return (
    <main>
      <article itemScope itemType="https://schema.org/Article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="hero-wrapper">
          <Breadcrumb
            items={[
              { label: '中古MacBook完全購入ガイド', href: '/macbook' },
              { label: 'MacBook AirとProの違い' },
            ]}
          />

          <header className="hero">
            <div className="hero-bg" aria-hidden="true">
              <div className="hero-shape hero-shape-1"></div>
              <div className="hero-shape hero-shape-2"></div>
            </div>
            <div className="hero-inner l-container">
              <div className="hero-content">
                <h1 className="hero-title" itemProp="headline">
                  MacBook AirとPro<br className="sp-only" />どっちがいい？<br className="sp-only" />違いと選び方を<br className="sp-only" />やさしく解説
                </h1>
                <div className="hero-actions">
                  <a href="#comparison" className="m-btn m-btn--hero-primary">
                    <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
                    <span>比較表を見る</span>
                  </a>
                  <a href="#usecase" className="m-btn m-btn--hero-outline">
                    <i className="fa-solid fa-user-check" aria-hidden="true"></i>
                    <span>用途別おすすめ</span>
                  </a>
                </div>
                <div className="hero-meta">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  <span>
                    更新日: <time dateTime={dateStr} itemProp="dateModified">{dateDisplay}</time> | 当記事のリンクには広告が含まれています
                  </span>
                  <meta itemProp="datePublished" content="2026-03-24" />
                </div>
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image
                    src="/images/content/macbook-image-05.jpg"
                    alt="MacBook AirとProの比較イメージ"
                    className="hero-media__img"
                    width={360}
                    height={360}
                    priority
                  />
                </figure>
              </div>
            </div>
          </header>
        </div>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>「MacBook AirとPro、見た目は似ているけど何が違うの？」</p>
              <p>
                中古MacBook選びで最も多い疑問のひとつです。<strong>同じApple Siliconチップを搭載していても、冷却方式・ディスプレイ・ポート構成・価格帯に大きな違い</strong>があります。
              </p>
              <p>
                そこで本記事ではAirとProの違いを5つの観点で比較し、<strong>用途別のおすすめ早見表</strong>であなたに合ったモデルがすぐわかるように解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                おすすめモデルを知りたい方は「<a href="/macbook/recommend">中古MacBookおすすめモデル</a>」もあわせてご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li>
                <a href="#comparison" className="toc-item">
                  比較表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#cooling" className="toc-item">
                  冷却・性能 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#chip" className="toc-item">
                  チップの違い <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#display" className="toc-item">
                  ディスプレイ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#port" className="toc-item">
                  ポート・拡張性 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#external-display" className="toc-item">
                  外部ディスプレイ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#weight" className="toc-item">
                  重量・バッテリー <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#price" className="toc-item">
                  中古価格比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#usecase" className="toc-item">
                  用途別おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#recommend" className="toc-item">
                  結論 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* 記事本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">
          {/* 比較表 + 詳細セクション */}
          <section className="l-section" id="comparison" aria-labelledby="heading-comparison">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-comparison">
                MacBook AirとProの違いを比較
              </h2>
              <p className="m-section-desc">
                まずはこちらの比較表にさっと目を通した上で、各項目の詳細に進んでください
              </p>
              <ComparisonTable />
              <ComparisonSections />
            </div>
          </section>

          {/* 中古価格比較 */}
          <PriceCompareSection models={models} priceMap={priceMap} />

          {/* 用途別おすすめ */}
          <UseCaseSection />

          {/* 結論 */}
          <RecommendSection />

          {/* FAQ */}
          <FaqSection />

          {/* まとめ */}
          <SummarySection />

          <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
