import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import RecommendSection from './components/RecommendSection'
import ComparisonDetails from './components/ComparisonDetails'
import FaqSection, { FAQ_ITEMS } from './components/FaqSection'
import AuthorByline from '@/app/components/AuthorByline'
import PopularSection from '@/app/components/support/PopularSection'
import WatchRelatedLinks from '@/app/components/watch/WatchRelatedLinks'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'

const PAGE_TITLE = 'Apple Watch セルラーモデルのできることを解説！GPSモデルとの違いがわかる'
const PAGE_DESCRIPTION =
  'Apple WatchのGPSモデルとセルラーモデルの違いを徹底比較。単体でできること・ランニングコスト・素材・デザインなど5つの違いを解説し、どちらを選ぶべきか結論ファーストでお伝えします。'
const PAGE_URL = 'https://used-lab.com/watch/gps-cellular-compare/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/watch/gps-cellular-compare/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/watch/gps-cellular-compare/',
    images: [{ url: '/images/content/thumbnail/apple-watch-image.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/thumbnail/apple-watch-image.jpg'],
  },
}

export default function GpsCellularComparePage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/gps-cellular-compare/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全購入ガイド', item: 'https://used-lab.com/watch' },
      { '@type': 'ListItem', position: 3, name: 'GPSモデルとセルラーモデルの違い' },
    ],
  }

  // JSON-LD: Article
    const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  // JSON-LD: FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古Apple Watch完全購入ガイド', href: '/watch' },
            { label: 'GPSモデルとセルラーモデルの違い' },
          ]}
        />

        {/* Hero */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title" itemProp="headline">
                Apple Watch セルラーモデルのできることを解説！GPSモデルとの違いがわかる
              </h1>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={dateStr} itemProp="dateModified">{dateDisplay}</time> | 当記事のリンクには広告が含まれています
                </span>
                <meta itemProp="datePublished" content={dateStr} />
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/content/thumbnail/watch-image-09.jpg"
                  alt="Apple Watch GPSモデルとセルラーモデルの比較"
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
              <p>「Apple WatchのGPSモデルとセルラーモデル、どっちを買えばいいの？」</p>
              <p>
                アップルウォッチには<strong>GPSモデルとGPS+セルラーモデル</strong>の2種類があり、購入時に迷う方は少なくありません。
              </p>
              <p>
                そこで本記事では<strong>まず結論（おすすめな人）をお伝え</strong>したうえで、両モデルの違いを5つのポイントに分けてわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古Apple Watchの選び方全般は「<a href="/watch">中古Apple Watch完全購入ガイド</a>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--2col u-list-reset">
              <li>
                <a href="#recommend" className="toc-item">
                  結論：おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#comparison" className="toc-item">
                  セルラー・GPSの違い <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
            <AuthorByline />
          </div>
        </nav>

        {/* 記事本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">
          {/* h2: 結論 */}
          <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
                結論：GPSとセルラーどっちがおすすめ？
              </h2>
              <p className="m-section-desc">
                それぞれのモデルが向いている人の特徴をまとめました。
              </p>
              <RecommendSection />
            </div>
          </section>

          {/* h2: 違い詳細 */}
          <section className="l-section" id="comparison" aria-labelledby="heading-comparison">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-comparison">
                Apple Watch セルラー・GPSモデルの違い
              </h2>
              <p className="m-section-desc">
                セルラーモデルとGPSモデルの違いを5つのポイントに分けて解説します。
              </p>
              <ComparisonDetails />
            </div>
          </section>

          {/* h2: よくある質問 */}
          <FaqSection />

          <PopularSection
            sectionTitle="目的別に人気の中古Apple Watch"
            sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
            imageSrc="/images/content/thumbnail/watch-image-08.jpg"
            imageAlt="中古Apple Watchおすすめ5選のイメージ画像"
            subtitle="目的別におすすめ機種を厳選！"
            cardTitle="中古Apple Watchおすすめ5選"
            cardDescription="健康管理を重視する人向け、コスパ重視の人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
            buttonText="おすすめ5機種を見る"
            buttonHref="/watch/recommend/"
          />

        <WatchRelatedLinks excludeHref={["/watch/gps-cellular-compare/", "/watch/recommend/"]} />
        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
