import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllMacBookModels, getAllMacBookModelsIncludingEnded } from '@/lib/queries'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import MacOsSupportMatrix from './components/MacOsSupportMatrix'
import LifespanTable from './components/LifespanTable'
import TimingSection from './components/TimingSection'
import MacBookPopularSection from '@/app/components/support/popular/MacBookPopularSection'
import FaqSection from './components/FaqSection'
import MacBookRelatedLinks from '@/app/components/macbook/MacBookRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 3600

const PAGE_TITLE = 'MacBookはいつまで使える？各機種ごとの寿命や買い替えのタイミングを解説'
const PAGE_DESCRIPTION =
  'MacBookの寿命とサポート期間を機種別に一覧で紹介。macOSアップデート終了時期の目安や、買い替えるべき3つのタイミングもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.jp/macbook/used-macbook-support/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/used-macbook-support/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/used-macbook-support/',
    images: [{ url: getHeroImage('/macbook/used-macbook-support/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/macbook/used-macbook-support/')],
  },
}

export default async function UsedMacbookSupportPage() {
  const [allModels, allModelsWithEnded] = await Promise.all([
    getAllMacBookModels(),
    getAllMacBookModelsIncludingEnded(),
  ])
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/used-macbook-support/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.jp/macbook' },
      { '@type': 'ListItem', position: 3, name: 'MacBookはいつまで使える？' },
    ],
  }

  // JSON-LD: Article
    const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  return (
    <main>
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古MacBook完全購入ガイド', href: '/macbook' },
            { label: 'MacBookはいつまで使える？' },
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
              <h1 className="hero-title">
                MacBookはいつまで使える？各機種ごとの寿命や買い替えタイミング
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/macbook/used-macbook-support/')}
                  alt="MacBookの寿命・サポート期間イメージ"
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
              <p>MacBookを長く使っている方や中古MacBookの購入を検討中の方は、機種別の寿命が気になるのではないでしょうか。</p>
              <p>本記事では<strong>「macOS別サポート状況一覧表」</strong>を紹介した上で、歴代MacBookのサポート期間一覧（予想）をまとめています。</p>
              <p>記事後半には<strong>MacBookを買い替えるべき3つのタイミング</strong>も解説。お手持ちのMacBookの寿命や買い替え時期がすっきりわかるので、ぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<a href="/macbook">中古MacBook購入ガイド</a>」をご覧ください。
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
                <a href="#support-table" className="toc-item">
                  macOS別サポート機種一覧表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#lifespan-table" className="toc-item">
                  サポート期間一覧（寿命予想）{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#timing" className="toc-item">
                  買い替えるべき3つのタイミング{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
            </div>
          <AuthorByline />
          </div>
        </nav>
        <div className="l-sections">
        {/* セクション */}
        <MacOsSupportMatrix models={allModelsWithEnded} />
        <LifespanTable models={allModelsWithEnded} />
        <TimingSection />
        <FaqSection />
        <MacBookPopularSection />
        <MacBookRelatedLinks excludeHref={["/macbook/used-macbook-support/", "/macbook/recommend/"]}>
          <div className="m-callout m-callout--muted u-mt-3xl">
            <span className="m-callout__label">関連</span>
            <p className="m-callout__text">
              <a href="https://www.kaden-max.com/" target="_blank" rel="noreferrer noopener">リサイクルショップ「出張買取MAX」24時間電話受付！査定費・作業費・出張費無料</a>
            </p>
          </div>
        </MacBookRelatedLinks>
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
