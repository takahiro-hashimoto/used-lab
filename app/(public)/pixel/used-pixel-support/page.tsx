import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllPixelModels, getAllPixelModelsIncludingEnded } from '@/lib/queries'
import Breadcrumb from '@/app/components/Breadcrumb'
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'
import SupportMatrix from './components/SupportMatrix'
import SupportTimelineMatrix from '@/app/components/support/SupportTimelineMatrix'
import LifespanTable from './components/LifespanTable'
import TimingSection from './components/TimingSection'
import FaqSection from './components/FaqSection'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

const PAGE_TITLE = '中古Google Pixelはいつまで使える？サポート期間・Androidアップデート目安まとめ'
const PAGE_DESCRIPTION =
  'Google Pixelの寿命とサポート期間を機種別に一覧で紹介。Androidアップデートの保証年数（Pixel 8以降は7年）や終了予定の目安、買い替えるべき4つのタイミングもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.jp/pixel/used-pixel-support/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/pixel/used-pixel-support/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/pixel/used-pixel-support/',
    images: [{ url: getHeroImage('/pixel/used-pixel-support/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/pixel/used-pixel-support/')],
  },
}

export default async function UsedPixelSupportPage() {
  const [, allModelsWithEnded] = await Promise.all([
    getAllPixelModels(),
    getAllPixelModelsIncludingEnded(),
  ])
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/used-pixel-support/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/pixel/' },
      { '@type': 'ListItem', position: 3, name: '中古Google Pixelはいつまで使える？' },
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
            { label: '中古Google Pixelおすすめ機種・選び方まとめ', href: '/pixel/' },
            { label: '中古Google Pixelはいつまで使える？' },
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
                中古Google Pixelはいつまで使える？サポート期間・Androidアップデート目安まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/pixel/used-pixel-support/')}
                  alt="Google Pixelの寿命・サポート期間イメージ"
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
              <p>Google Pixelを長く使っている方や中古Pixelの購入を検討中の方は、機種別にどのくらいサポートされるのかが気になるのではないでしょうか。</p>
              <p>本記事では<strong>「Pixel機種別サポート期間一覧表」</strong>を紹介した上で、世代別のサポート終了予定と寿命目安をまとめています。</p>
              <p>記事後半には<strong>Pixelを買い替えるべき4つのタイミング</strong>も解説。お手持ちのPixelの寿命や買い替え時期がすっきりわかるので、ぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link prefetch={false} href="/pixel/">中古Google Pixelおすすめ機種・選び方まとめ</Link>」をご覧ください。
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
                  Pixel機種別サポート期間一覧表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                {/* このカテゴリのローカル LifespanTable は section id が after-support */}
                <a href="#after-support" className="toc-item">
                  サポート期間・寿命目安{' '}
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
          </div>
        </nav>
        <div className="l-sections">
        {/* セクション */}
        <SupportTimelineMatrix brand="pixel" brandLabel="Google Pixel" models={allModelsWithEnded} />
        <SupportMatrix models={allModelsWithEnded} />
        <LifespanTable />
        <TimingSection />
        <FaqSection />
        </div>
      </article>
    </main>
    <PixelArticleFooter
          pageUrl={PAGE_URL}
          pageTitle={PAGE_TITLE}
          excludeHref={["/pixel/used-pixel-support/"]}
        />
    </>
  )
}
