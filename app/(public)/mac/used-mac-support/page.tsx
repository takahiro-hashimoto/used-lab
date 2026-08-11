import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllMacModels, getAllMacModelsIncludingEnded } from '@/lib/queries'
import Breadcrumb from '@/app/components/Breadcrumb'
import MacArticleFooter from '@/app/components/mac/MacArticleFooter'
import MacOsSupportMatrix from './components/MacOsSupportMatrix'
import LifespanTable from './components/LifespanTable'
import TimingSection from './components/TimingSection'
import FaqSection from './components/FaqSection'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = false

const PAGE_TITLE = 'iMac・Mac miniはいつまで使える？各機種ごとの寿命や買い替えのタイミングを解説'
const PAGE_DESCRIPTION =
  'iMac・Mac miniの寿命とサポート期間を機種別に一覧で紹介。macOSアップデート終了時期の目安や、買い替えるべき3つのタイミングもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.jp/mac/used-mac-support/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/mac/used-mac-support/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/mac/used-mac-support/',
    images: [{ url: getHeroImage('/mac/used-mac-support/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/mac/used-mac-support/')],
  },
}

export default async function UsedMacbookSupportPage() {
  const [, allModelsWithEnded] = await Promise.all([
    getAllMacModels(),
    getAllMacModelsIncludingEnded(),
  ])
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/mac/used-mac-support/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iMac・Mac miniおすすめ機種', item: 'https://used-lab.jp/mac/' },
      { '@type': 'ListItem', position: 3, name: 'iMac・Mac miniはいつまで使える？' },
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
    <>
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
            { label: '中古iMac・Mac miniおすすめ機種', href: '/mac/' },
            { label: 'iMac・Mac miniはいつまで使える？' },
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
                iMac・Mac miniはいつまで使える？各機種ごとの寿命や買い替えタイミングを解説
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/mac/used-mac-support/')}
                  alt="iMac・Mac miniの寿命・サポート期間イメージ"
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
              <p>iMac・Mac miniを長く使っている方や中古iMac・Mac miniの購入を検討中の方は、機種別の寿命が気になるのではないでしょうか。</p>
              <p>本記事では<strong>「macOS別サポート状況一覧表」</strong>を紹介した上で、歴代iMac・Mac miniのサポート期間一覧（予想）をまとめています。</p>
              <p>記事後半には<strong>iMac・Mac miniを買い替えるべき3つのタイミング</strong>も解説。お手持ちのiMac・Mac miniの寿命や買い替え時期がすっきりわかるので、ぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link prefetch={false} href="/mac/">中古iMac・Mac miniおすすめ機種・選び方まとめ</Link>」をご覧ください。
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
          </div>
        </nav>
        <div className="l-sections">
        {/* セクション */}
        <MacOsSupportMatrix models={allModelsWithEnded} />
        <LifespanTable models={allModelsWithEnded} />
        <TimingSection />
        <FaqSection />
        </div>
      </article>
    </main>
    <MacArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/mac/used-mac-support/", "/mac/"]}>
          <div className="m-callout m-callout--muted u-mt-3xl">
            <span className="m-callout__label">関連</span>
            <p className="m-callout__text">
              <a href="https://www.kaden-max.com/" target="_blank" rel="noreferrer noopener">リサイクルショップ「出張買取MAX」24時間電話受付！査定費・作業費・出張費無料</a>
            </p>
          </div>
        </MacArticleFooter>
    </>
  )
}
