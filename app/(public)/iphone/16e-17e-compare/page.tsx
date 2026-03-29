import type { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import ComparisonTable from './components/ComparisonTable'
import ComparisonSections from './components/ComparisonSections'
import RecommendSection from './components/RecommendSection'
import FaqSection from './components/FaqSection'
import SummarySection from './components/SummarySection'

const PAGE_TITLE = 'iPhone 16eと17eどっちがいい？違いと選び方をやさしく解説'
const PAGE_DESCRIPTION =
  'iPhone 16eと17eの違いをチップ・モデム・カメラ・ストレージ・充電・操作性の6項目で比較。用途別のおすすめで自分に合ったモデルがすぐわかります。'
const PAGE_URL = 'https://used-lab.com/iphone/16e-17e-compare/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/16e-17e-compare/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/16e-17e-compare/',
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
}

export const revalidate = 86400

export default function IPhone16e17eComparePage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.com/iphone' },
      { '@type': 'ListItem', position: 3, name: 'iPhone 16eと17eの違い' },
    ],
  }

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
          <Breadcrumb
            items={[
              { label: '中古iPhone完全購入ガイド', href: '/iphone' },
              { label: 'iPhone 16eと17eの違い' },
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
                  iPhone 16eと17e<br className="sp-only" />どっちがいい？<br className="sp-only" />違いと選び方を<br className="sp-only" />やさしく解説
                </h1>
                <div className="hero-actions">
                  <a href="#comparison" className="m-btn m-btn--hero-primary">
                    <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
                    <span>比較表を見る</span>
                  </a>
                  <a href="#recommend" className="m-btn m-btn--hero-outline">
                    <i className="fa-solid fa-user-check" aria-hidden="true"></i>
                    <span>おすすめを見る</span>
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
            </div>
          </header>
        </div>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>「iPhone 16eと17e、どちらを買うべき？」</p>
              <p>
                Appleの手頃な価格帯モデルとして人気のeシリーズ。<strong>チップ世代・モバイル通信モデム・ストレージ構成・MagSafe充電速度・カメラコントロールの有無</strong>に違いがあります。
              </p>
              <p>
                本記事ではiPhone 16eと17eの違いを項目ごとに比較し、<strong>あなたに合ったモデルがすぐわかる</strong>ように解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                他のモデルも含めて検討したい方は「<a href="/iphone/recommend">中古iPhoneおすすめモデル</a>」もあわせてご覧ください。
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
                <a href="#chip" className="toc-item">
                  チップ・モデム <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#camera" className="toc-item">
                  カメラ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#display" className="toc-item">
                  ディスプレイ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#storage" className="toc-item">
                  ストレージ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#design" className="toc-item">
                  デザイン・サイズ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#charging" className="toc-item">
                  充電・MagSafe <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#controls" className="toc-item">
                  操作性 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
          {/* 比較表 */}
          <section className="l-section" id="comparison" aria-labelledby="heading-comparison">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-comparison">
                iPhone 16eと17eの違いを比較
              </h2>
              <p className="m-section-desc">
                まずはこちらの比較表にさっと目を通した上で、各項目の詳細に進んでください
              </p>
              <ComparisonTable />
              <ComparisonSections />
            </div>
          </section>

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
