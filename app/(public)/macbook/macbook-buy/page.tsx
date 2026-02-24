import type { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import BuyMethodsSection from './components/BuyMethodsSection'
import ConclusionSection from './components/ConclusionSection'

const PAGE_TITLE = 'MacBookを安く買うには？おすすめの購入先7つを比較'
const PAGE_DESCRIPTION =
  'MacBookを安く買う方法を徹底解説。Apple認定整備済製品・中古ショップ・ECモール・家電量販店など7つの購入先を価格・保証・ポイント還元で比較し、最安で手に入れるコツを紹介します。'
const PAGE_URL = 'https://used-lab.com/macbook/macbook-buy/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/macbook/macbook-buy/',
    images: [{ url: '/images/macbook/macbook-air-m2.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/macbook/macbook-air-m2.jpg'],
  },
}

export default function MacBookBuyPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全ガイド', item: 'https://used-lab.com/macbook/' },
      { '@type': 'ListItem', position: 3, name: 'MacBookを安く買うには？' },
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
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古MacBook完全ガイド', href: '/macbook' },
            { label: 'MacBookを安く買うには？' },
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
                MacBookを安く買うには？<br />おすすめの購入先7つを比較
              </h1>
              <p className="hero-description" itemProp="description">
                Apple公式・ECモール・中古ショップなど、MacBookを購入できるルートは多彩。
              </p>
              <p className="hero-description">
                それぞれの価格・保証・ポイント還元を比較して、自分に合った買い方を見つけましょう。
              </p>
              <div className="hero-actions">
                <a href="#comparison" className="m-btn m-btn--hero-primary">
                  <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
                  <span>購入先を比較する</span>
                </a>
                <a href="#how-to" className="m-btn m-btn--hero-outline">
                  <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
                  <span>安く買うコツを見る</span>
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
                <img
                  src="https://used-lab.jp/wp-content/uploads/2025/07/how-to-buy-mac-heading-picturess-1024x576.jpg"
                  alt="MacBookを安く買う方法のイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
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
              <p>
                本体もOSもAppleが一貫して設計しているため、使い勝手がとても優れているのが魅力のMacシリーズ。
                かつてネットではApple公式サイトでしか購入できませんでしたが、最近はAmazonや楽天、大手家電量販店まで様々な場所で入手可能になってきています。
              </p>
              <p>豊富な選択肢があると、こんなことを思う方も多いのではないでしょうか？</p>
              <ul className="lead-box__list">
                <li>一番安くMacBook（Pro・Air）を購入できるのはどこだろう？</li>
                <li>それぞれの購入方法にどんなメリット・デメリットがあるんだろう？</li>
              </ul>
              <p>
                そこで本記事では、<strong>MacBookの主な購入ルート7つを比較</strong>し、それぞれのメリット・デメリットやお得度をわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古MacBookの選び方から知りたい方は「<a href="/macbook/">中古MacBook購入ガイド</a>」をご覧ください。
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
                <a href="#gift-rebates" className="toc-item">
                  ギフトカード×リーベイツ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#amazon" className="toc-item">
                  Amazonで買う <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#rakuten" className="toc-item">
                  楽天市場で買う <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#yahoo" className="toc-item">
                  ヤフーショッピング <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#electronics" className="toc-item">
                  家電量販店EC <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#used" className="toc-item">
                  中古ショップ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#apple-store" className="toc-item">
                  Appleストア <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* 結論（比較表） */}
        <ConclusionSection />

        {/* セクション */}
        <div itemProp="articleBody">
          <BuyMethodsSection />
        </div>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
