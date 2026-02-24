import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import RecommendSection from './components/RecommendSection'
import ComparisonDetails from './components/ComparisonDetails'
import FaqSection, { FAQ_ITEMS } from './components/FaqSection'

const PAGE_TITLE = 'Apple Watch セルラーモデルのできることを解説！GPSモデルとの違いがわかる'
const PAGE_DESCRIPTION =
  'Apple WatchのGPSモデルとセルラーモデルの違いを徹底比較。単体でできること・ランニングコスト・素材・デザインなど5つの違いを解説し、どちらを選ぶべきか結論ファーストでお伝えします。'
const PAGE_URL = 'https://used-lab.com/watch/gps-cellular-compare/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/watch/gps-cellular-compare/',
    images: [{ url: '/images/content/apple-watch-image.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/apple-watch-image.jpg'],
  },
}

export default function GpsCellularComparePage() {
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
      { '@type': 'ListItem', position: 3, name: 'GPSモデルとセルラーモデルの違い' },
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
            { label: '中古Apple Watch完全ガイド', href: '/watch' },
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
                Apple Watch セルラーモデルの<br className="sp-only" />できることを解説！<br className="sp-only" />GPSモデルとの違いがわかる
              </h1>
              <p className="hero-description" itemProp="description">
                GPSとセルラーの違い・ランニングコスト・素材の違いなど5つのポイントを結論ファーストで比較
              </p>
              <div className="hero-actions">
                <a href="#recommend" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-user-check" aria-hidden="true"></i>
                  <span>結論を見る</span>
                </a>
                <a href="#comparison" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
                  <span>違いを比較する</span>
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
                  src="/images/content/apple-watch-image.jpg"
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
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--2col toc-list">
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
          {/* h2: 結論 */}
          <section className="l-section l-section--bg-subtle" id="recommend" aria-labelledby="heading-recommend">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
                結論：GPSとセルラーどっちがおすすめ？
              </h2>
              <p className="m-section-desc">
                それぞれのモデルが向いている人の特徴をまとめました。
              </p>
              <RecommendSection />
              <p className="m-section-desc" style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
                ここからは上記の結論に至った理由を、両モデルの違いを比較しながら詳しく解説していきます。
              </p>
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

          {/* h2: まとめ */}
          <section className="l-section" id="summary" aria-labelledby="heading-summary">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
                まとめ：まずはGPSモデルがおすすめ
              </h2>
              <p className="m-section-desc">
                両モデルの特徴を踏まえた結論です。
              </p>

              <div className="l-grid l-grid--2col l-grid--gap-lg" style={{ marginTop: 'var(--space-2xl)' }}>
                {/* GPSモデルカード */}
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="popular-card-title">
                    <i className="fa-solid fa-satellite-dish" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                    GPSモデルの特徴
                  </h3>
                  <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
                    <li>iPhoneがないと使える機能が限定的</li>
                    <li><strong>月額のランニングコストが発生しない</strong></li>
                    <li>ケース素材はアルミニウムのみ</li>
                    <li>初めてのApple Watchにおすすめ</li>
                  </ul>
                </div>

                {/* セルラーモデルカード */}
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="popular-card-title">
                    <i className="fa-solid fa-tower-cell" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                    セルラーモデルの特徴
                  </h3>
                  <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
                    <li>iPhoneなしでもできることが豊富</li>
                    <li>月額385〜550円のランニングコストが発生</li>
                    <li>ステンレス・チタニウム素材も選べる</li>
                    <li>ファミリー共有に対応</li>
                  </ul>
                </div>
              </div>

              <div className="lead-box" style={{ marginTop: 'var(--space-2xl)' }}>
                <p>
                  Apple Watch単体でできることが増えると便利なのは間違いありません。しかしランニングコストが発生することや購入費用が高くなることを考えると、<strong>まずはGPSモデルを購入するのがおすすめ</strong>というのが本記事の結論です。
                </p>
              </div>

              {/* 関連リンク */}
              <div className="l-grid l-grid--2col l-grid--gap-lg guide-spec-links" style={{ marginTop: 'var(--space-2xl)' }}>
                <a className="m-card m-card--shadow related-link-card m-card--hoverable" href="/watch">
                  <span className="related-link-card__icon m-icon-box m-icon-box--sm">
                    <i className="fa-solid fa-clock" aria-hidden="true"></i>
                  </span>
                  <h3 className="related-link-card__title">中古Apple Watch完全購入ガイド</h3>
                  <p className="related-link-card__desc">
                    Apple Watchの選び方・おすすめモデル・中古相場をわかりやすく解説。初めての方でも安心です。
                  </p>
                  <span className="related-link-card__arrow">
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
                <a className="m-card m-card--shadow related-link-card m-card--hoverable" href="/watch/recommend">
                  <span className="related-link-card__icon m-icon-box m-icon-box--sm">
                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                  </span>
                  <h3 className="related-link-card__title">中古Apple Watchおすすめモデル</h3>
                  <p className="related-link-card__desc">
                    予算や用途に合わせた中古Apple Watchのおすすめモデルを厳選して紹介しています。
                  </p>
                  <span className="related-link-card__arrow">
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
