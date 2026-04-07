import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllIPhoneModels, getAllIPhoneModelsIncludingEnded } from '@/lib/queries'
import Breadcrumb from '@/app/components/Breadcrumb'
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'
import IosSupportMatrix from './components/IosSupportMatrix'
import LifespanTable from './components/LifespanTable'
import TimingSection from './components/TimingSection'
import FaqSection from './components/FaqSection'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 86400

const PAGE_TITLE = 'iPhoneはいつまで使える？機種別のサポート期間目安まとめ。買い替えるべき4つのタイミングも解説。'
const PAGE_DESCRIPTION =
  'iPhoneの寿命とサポート期間を機種別に一覧で紹介。iOSアップデート終了時期の目安や、買い替えるべき4つのタイミングもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.jp/iphone/used-iphone-support/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/used-iphone-support/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/used-iphone-support/',
    images: [{ url: getHeroImage('/iphone/used-iphone-support/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/iphone/used-iphone-support/')],
  },
}

export default async function UsedIphoneSupportPage() {
  const [allModels, allModelsWithEnded] = await Promise.all([
    getAllIPhoneModels(),
    getAllIPhoneModelsIncludingEnded(),
  ])
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/used-iphone-support/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.jp/iphone' },
      { '@type': 'ListItem', position: 3, name: 'iPhoneはいつまで使える？' },
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
            { label: '中古iPhone完全購入ガイド', href: '/iphone' },
            { label: 'iPhoneはいつまで使える？' },
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
                iPhoneはいつまで使える？機種別のサポート期間目安まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/iphone/used-iphone-support/')}
                  alt="iPhoneの寿命・サポート期間イメージ"
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
              <p>iPhoneを長く使っている方や中古iPhoneの購入を検討中の方は、機種別の寿命が気になるのではないでしょうか。</p>
              <p>本記事では<strong>「iOS別サポート状況一覧表」</strong>を紹介した上で、歴代iPhoneのサポート期間一覧（予想）をまとめています。</p>
              <p>記事後半には<strong>iPhoneを買い替えるべき4つのタイミング</strong>も解説。お手持ちのiPhoneの寿命や買い替え時期がすっきりわかるので、ぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<a href="/iphone">中古iPhone購入ガイド</a>」をご覧ください。
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
                  iOS別サポート機種一覧表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#lifespan-table" className="toc-item">
                  サポート期間一覧{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#timing" className="toc-item">
                  買い替えるべき4つのタイミング{' '}
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
        <IosSupportMatrix models={allModelsWithEnded} />
        <LifespanTable models={allModelsWithEnded} />
        <TimingSection />
        <FaqSection />
        <IPhoneArticleFooter
          pageUrl={PAGE_URL}
          pageTitle={PAGE_TITLE}
          excludeHref={["/iphone/used-iphone-support/", "/iphone/recommend/"]}
        />
        </div>
      </article>
    </main>
  )
}
