import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import MacBookArticleFooter from '@/app/components/macbook/MacBookArticleFooter'
import ComparisonTable from './components/ComparisonTable'
import HeroMeta from '@/app/components/HeroMeta'
import ComparisonSections from './components/ComparisonSections'
import RecommendSection from './components/RecommendSection'
import UseCaseSection from './components/UseCaseSection'
import FaqSection from './components/FaqSection'
import AudienceSection from './components/AudienceSection'
import CostPerformanceSection from './components/CostPerformanceSection'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'

const PAGE_TITLE = 'MacBook AirとNeoどっちがいい？違いと選び方をやさしく解説'
const PAGE_DESCRIPTION =
  'MacBook AirとNeoの違いをチップ性能・AI機能・メモリ・ポート・価格の5項目で比較。用途別のおすすめ早見表で自分に合ったモデルがすぐわかります。'
const PAGE_URL = 'https://used-lab.jp/macbook/air-neo-compare/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/air-neo-compare/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/air-neo-compare/',
    images: [{ url: getHeroImage('/macbook/air-neo-compare/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/macbook/air-neo-compare/')],
  },
}

export const revalidate = false

export default async function AirNeoComparePage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/air-neo-compare/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBookおすすめ機種・選び方ガイド', item: 'https://used-lab.jp/macbook' },
      { '@type': 'ListItem', position: 3, name: 'MacBook AirとNeoの違い' },
    ],
  }

  const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  return (
    <>
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
              { label: '中古MacBookおすすめ機種・選び方ガイド', href: '/macbook/' },
              { label: 'MacBook AirとNeoの違い' },
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
                  MacBook AirとNeoどっちがいい？違いと選び方をやさしく解説
                </h1>
                <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image
                    src={getHeroImage('/macbook/air-neo-compare/')}
                    alt="MacBook AirとNeoの比較イメージ"
                    className="hero-media__img"
                    width={360}
                    height={360}
                    priority
                    sizes="(max-width: 768px) 100vw, 360px"
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
              <p>「MacBook AirとNeo、どちらを買えばいいの？」</p>
              <p>
                2026年に登場したMacBook Neoは、iPhoneと同じ<strong>A18 Proチップ</strong>を搭載した新しいMacです。MacBook Airより価格が抑えられている分、<strong>いくつかスペックが絞られている点</strong>があります。
              </p>
              <p>
                そこで本記事ではAirとNeoの違いを5つの観点で比較し、<strong>用途別のおすすめ早見表</strong>であなたに合ったモデルがすぐわかるように解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                MacBookをお得に手に入れるなら中古で購入するのがおすすめ。気になった方は<Link href="/macbook/recommend">中古MacBookおすすめ機種・選び方ガイド</Link>をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
              <p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
              <ol className="l-grid l-grid--3col u-list-reset">
                <li>
                  <a href="#comparison" className="toc-item">
                    比較表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#chip" className="toc-item">
                    違いの要点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#usecase" className="toc-item">
                    用途別おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#cost-performance" className="toc-item">
                    コスパ比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
          </div>
        </nav>

        {/* 記事本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">
          {/* 比較表 + 詳細セクション */}
          <section className="l-section" id="comparison" aria-labelledby="heading-comparison">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-comparison">
                MacBook AirとNeoの違いを比較
              </h2>
              <p className="m-section-desc">
                まずはこちらの比較表にさっと目を通した上で、各項目の詳細に進んでください
              </p>
              <ComparisonTable />
              <ComparisonSections />
            </div>
          </section>

          {/* 用途別おすすめ */}
          <UseCaseSection />

          {/* 属性別おすすめ */}
          <AudienceSection />

          {/* コスパ比較 */}
          <CostPerformanceSection />

          {/* 結論 */}
          <RecommendSection />

          {/* FAQ */}
          <FaqSection />
        </div>
      </article>
    </main>
    <MacBookArticleFooter
      pageUrl={PAGE_URL}
      pageTitle={PAGE_TITLE}
      excludeHref={['/macbook/air-neo-compare/', '/macbook/recommend/']}
    />
    </>
  )
}
