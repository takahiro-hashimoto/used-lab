import type { Metadata } from 'next'
import { getShops } from '@/lib/queries'
import type { Shop } from '@/lib/types'
import {
  SHOP_PAGE_DATE_LABEL,
  SHOP_DETAIL_ORDER,
  SHOP_DETAIL_META,
  SHOP_FAQ_ITEMS,
} from '@/lib/data/iphone-shop'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import BuyingOptionsSection from './components/BuyingOptionsSection'
import ShopComparisonSection from './components/ShopComparisonSection'
import RecommendByTypeSection from './components/RecommendByTypeSection'
import ShopDetailSection from './components/ShopDetailSection'
import FleaMarketSection from './components/FleaMarketSection'
import ChecklistSection from './components/ChecklistSection'
import PopularSection from './components/PopularSection'
import FaqSection from './components/FaqSection'

const PAGE_TITLE = `中古iPhoneを買うならどこ？ECサイト・ショップのおすすめを紹介【${SHOP_PAGE_DATE_LABEL}】`
const PAGE_DESCRIPTION = `中古iPhoneを買うならどこがおすすめ？信頼できるECサイト・ショップを保証・価格・品質の観点から徹底比較。最適な購入先を紹介します【${SHOP_PAGE_DATE_LABEL}】`
const PAGE_URL = 'https://used-lab.com/iphone/iphone-shop/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/iphone/iphone-shop/',
    images: [{ url: '/images/iphone/iphone16pro.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/iphone/iphone16pro.jpg'],
  },
}

export default async function IPhoneShopPage() {
  const shops = await getShops()

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
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全ガイド', item: 'https://used-lab.com/iphone/' },
      { '@type': 'ListItem', position: 3, name: '中古iPhoneを買うならどこ？' },
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SHOP_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  // ShopDetailSection用データ: shop_keyでマッチング
  const shopDetailItems = SHOP_DETAIL_ORDER
    .map((key) => {
      const shop = shops.find((s) => s.shop_key === key)
      const meta = SHOP_DETAIL_META[key]
      if (!shop || !meta) return null
      return { shop, meta }
    })
    .filter((item): item is { shop: Shop; meta: (typeof SHOP_DETAIL_META)[string] } => item != null)

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

        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPhone完全ガイド', href: '/iphone' },
            { label: '中古iPhoneを買うならどこ？' },
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
                中古iPhoneを買うならどこ？<br />ECサイト・ショップのおすすめを紹介
              </h1>
              <p className="hero-description" itemProp="description">
                信頼できるECサイト・ショップを保証・価格・品質の観点から徹底比較【{SHOP_PAGE_DATE_LABEL}】
              </p>
              <div className="hero-actions">
                <a href="#shops-detail" className="m-btn m-btn--hero-primary">
                  <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
                  <span>おすすめショップを見る</span>
                </a>
                <a href="#shops" className="m-btn m-btn--hero-outline">
                  <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
                  <span>選び方を確認</span>
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
                  src="https://placehold.co/360x360/1a1a2e/ffffff?text=Where+to+Buy"
                  alt="中古iPhoneの購入先イメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                />
              </figure>
            </div>
          </div>
        </header>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>中古iPhoneを買おうと思ったとき、いちばん迷うのが「どこで買うのが正解なのか」という点です。</p>
              <p>
                中古ショップ、キャリア認定中古、ECモール、フリマアプリなど選択肢は多いものの、
                <strong>価格や保証、リスクはそれぞれ大きく異なります。</strong>
              </p>
              <p>
                この記事では、中古iPhoneを購入できる主な場所を比較しながら、「安全に買いたい人」「できるだけ安く買いたい人」「初めて中古を買う人」など、タイプ別におすすめの買い方を整理して解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<a href="/iphone/">中古iPhone購入ガイド</a>」をご覧ください。
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
                <a href="#shops" className="toc-item">
                  主な購入先4つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#comparison" className="toc-item">
                  購入先ごとの比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#recommend" className="toc-item">
                  目的別おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#shops-detail" className="toc-item">
                  購入先の詳細 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#flea-market" className="toc-item">
                  フリマは大丈夫？ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#checklist" className="toc-item">
                  失敗しないチェックポイント <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* セクション */}
        <div itemProp="articleBody">
          <BuyingOptionsSection />
          <ShopComparisonSection />
          <RecommendByTypeSection />
          <ShopDetailSection items={shopDetailItems} />
          <FleaMarketSection />
          <ChecklistSection />
          <PopularSection />
          <FaqSection />
        </div>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
