import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import ComparisonTable from './components/ComparisonTable'
import ComparisonSections from './components/ComparisonSections'
import RecommendSection from './components/RecommendSection'
import SummarySection from './components/SummarySection'

const PAGE_TITLE = 'MacとWindowsどっちがいい？両者の違いとどんな人におすすめかをやさしく解説'
const PAGE_DESCRIPTION =
  'MacとWindowsの違いをわかりやすく比較。操作性・対応ソフト・コスパ・用途別のおすすめポイントを初心者向けにやさしく解説します。どっちを選ぶべきか迷っている方に最適なガイドです。'
const PAGE_URL = 'https://used-lab.com/macbook/windows-mac-compare/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/macbook/windows-mac-compare/',
    images: [{ url: '/images/macbook/mba-13-2024.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/macbook/mba-13-2024.jpg'],
  },
}

export default function WindowsMacComparePage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全ガイド', item: 'https://used-lab.com/macbook' },
      { '@type': 'ListItem', position: 3, name: 'MacとWindowsの違い' },
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
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古MacBook完全ガイド', href: '/macbook' },
            { label: 'MacとWindowsの違い' },
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
                MacとWindowsどっちがいい？<br className="sp-only" />両者の違いとおすすめを<br className="sp-only" />やさしく解説
              </h1>
              <p className="hero-description" itemProp="description">
                操作性・対応ソフト・コスパ・用途別に、MacとWindowsの違いを初心者にもわかりやすく徹底比較
              </p>
              <div className="hero-actions">
                <a href="#comparison" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
                  <span>比較表を見る</span>
                </a>
                <a href="#recommend" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-user-check" aria-hidden="true"></i>
                  <span>おすすめ診断</span>
                </a>
              </div>
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
                  src="/images/macbook/mba-13-2024.jpg"
                  alt="MacとWindowsの比較イメージ"
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
              <p>「パソコンを買いたいけど、MacとWindowsどっちを選べばいいの？」</p>
              <p>
                初めてのパソコン選びや買い替えで、多くの方が悩むポイントです。<strong>MacとWindowsはOS（基本ソフト）が異なり、操作感・対応ソフト・価格帯にそれぞれ特徴</strong>があります。
              </p>
              <p>
                そこで本記事ではWindowsとMacの違いを11項目にわたって比較し、<strong>あなたの使い方に合ったパソコン</strong>がどちらかを判断できるようにやさしく解説します。ぜひ最後までお付き合いください。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古MacBookの購入を検討中の方は「<a href="/macbook">中古MacBook完全購入ガイド</a>」もあわせてご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li>
                <a href="#comparison" className="toc-item">
                  比較表を見る <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#os" className="toc-item">
                  OSの違い <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#share" className="toc-item">
                  シェアの違い <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#price" className="toc-item">
                  製品数・価格帯 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#customize" className="toc-item">
                  カスタマイズ性 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#apps" className="toc-item">
                  対応ソフト・アプリ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#game" className="toc-item">
                  ゲームプレイ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#operation" className="toc-item">
                  操作性 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#keyboard" className="toc-item">
                  キーボード <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#design" className="toc-item">
                  デザイン <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#data" className="toc-item">
                  データ連携・共有 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#resale" className="toc-item">
                  リセールバリュー <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#recommend" className="toc-item">
                  おすすめ診断 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#summary" className="toc-item">
                  まとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* 記事本文 */}
        <div id="content" itemProp="articleBody">
          {/* h2: WindowsとMacのパソコンの違いを比較（比較表 + 11項目のh3カード） */}
          <section className="l-section l-section--bg-subtle" id="comparison" aria-labelledby="heading-comparison">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-comparison">
                WindowsとMacのパソコンの違いを比較
              </h2>
              <p className="m-section-desc">
                まずはこちらの比較表にさっと目を通した上で、各項目の詳細解説に進んでください
              </p>
              <ComparisonTable />
              <ComparisonSections />
            </div>
          </section>

          {/* h2: おすすめセクション */}
          <RecommendSection />

          {/* h2: まとめセクション */}
          <SummarySection />
        </div>

        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
