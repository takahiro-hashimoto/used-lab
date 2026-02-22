import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllWatchModels } from '@/lib/queries'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import WatchOsSupportMatrix from './components/WatchOsSupportMatrix'
import LifespanTable from './components/LifespanTable'
import TimingSection from './components/TimingSection'
import PopularSection from './components/PopularSection'
import FaqSection from './components/FaqSection'

const PAGE_TITLE = 'Apple Watchはいつまで使える？機種別のサポート期間目安まとめ。買い替えるべき3つのタイミングも解説。'
const PAGE_DESCRIPTION =
  'Apple Watchの寿命とサポート期間を機種別に一覧で紹介。watchOSアップデート終了時期の目安や、買い替えるべき3つのタイミングもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.com/watch/used-watch-support/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/watch/used-watch-support/',
    images: [{ url: '/images/watch/watch-ultra3.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/watch/watch-ultra3.jpg'],
  },
}

export default async function UsedWatchSupportPage() {
  const allModels = await getAllWatchModels()
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全ガイド', item: 'https://used-lab.com/watch' },
      { '@type': 'ListItem', position: 3, name: 'Apple Watchはいつまで使える？' },
    ],
  }

  // JSON-LD: Article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: dateStr,
    dateModified: dateStr,
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  }

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

        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古Apple Watch完全ガイド', href: '/watch' },
            { label: 'Apple Watchはいつまで使える？' },
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
                Apple Watchはいつまで使える？<br />機種別のサポート期間目安まとめ
              </h1>
              <p className="hero-description">
                watchOSサポート期間、修理受付の目安、買い替えるべきタイミングを機種別に徹底解説
              </p>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={dateStr}>{dateDisplay}</time> | 当記事のリンクには広告が含まれています
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/watch/watch-ultra3.jpg"
                  alt="Apple Watchの寿命・サポート期間イメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                  priority
                />
              </figure>
            </div>
          </div>
        </header>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>Apple Watchを長く使っている方や中古Apple Watchの購入を検討中の方は、機種別の寿命が気になるのではないでしょうか。</p>
              <p>本記事では<strong>「watchOS別サポート状況一覧表」</strong>を紹介した上で、歴代Apple Watchのサポート期間一覧（予想）をまとめています。</p>
              <p>記事後半には<strong>Apple Watchを買い替えるべき3つのタイミング</strong>も解説。お手持ちのApple Watchの寿命や買い替え時期がすっきりわかるので、ぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<a href="/watch">中古Apple Watch購入ガイド</a>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--2col toc-list">
              <li>
                <a href="#support-table" className="toc-item">
                  watchOS別サポート機種一覧表{' '}
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
        </nav>

        {/* セクション */}
        <WatchOsSupportMatrix models={allModels} />
        <LifespanTable />
        <TimingSection />
        <PopularSection />
        <FaqSection />
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
