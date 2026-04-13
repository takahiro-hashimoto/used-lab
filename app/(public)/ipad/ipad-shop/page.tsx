import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getShops } from '@/lib/queries'
import type { Shop } from '@/lib/types'
import {
  SHOP_PAGE_DATE_LABEL,
  IPAD_SHOP_DETAIL_ORDER,
  IPAD_SHOP_DETAIL_META,
  IPAD_SHOP_FAQ_ITEMS,
} from '@/lib/data/ipad-shop'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShopComparisonTable from '@/app/components/shop/ShopComparisonTable'
import type { SpecRow } from '@/app/components/shop/ShopDetailSection'
import BuyingOptionsSection from './components/BuyingOptionsSection'
import SelectionCriteriaSection from './components/SelectionCriteriaSection'
import ShopComparisonSection from './components/ShopComparisonSection'
import RecommendByTypeSection from './components/RecommendByTypeSection'
import ShopDetailSection from './components/ShopDetailSection'
import FleaMarketSection from './components/FleaMarketSection'
import ChecklistSection from './components/ChecklistSection'
import ConclusionSection from './components/ConclusionSection'
import FaqSection from './components/FaqSection'
import IPadArticleFooter from '@/app/components/ipad/IPadArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 3600

const PAGE_TITLE = `中古iPadを買うならどこ？ECサイト・ショップのおすすめを紹介【${SHOP_PAGE_DATE_LABEL}】`
const PAGE_DESCRIPTION = `中古iPadを買うならどこがおすすめ？信頼できるECサイト・ショップを保証・価格・品質の観点から徹底比較。最適な購入先を紹介します【${SHOP_PAGE_DATE_LABEL}】`
const PAGE_URL = 'https://used-lab.jp/ipad/ipad-shop/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/ipad-shop/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/ipad-shop/',
    images: [{ url: getHeroImage('/ipad/ipad-shop/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/ipad/ipad-shop/')],
  },
}

export default async function IPadShopPage() {
  const shops = await getShops()

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/ipad-shop/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.jp/ipad/' },
      { '@type': 'ListItem', position: 3, name: '中古iPadを買うならどこ？' },
    ],
  }

    const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: IPAD_SHOP_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  // 比較表用: ipad_url が存在するショップを抽出
  const comparisonShops = shops.filter((s) => s.ipad_url != null)
  const comparisonSpecRows: SpecRow[] = [
    { label: '価格', getValue: (s) => s.price },
    { label: '在庫', getValue: (s) => s.stock },
    { label: '保証期間', getValue: (s) => s.support || '-' },
    { label: '独自保証', getValue: (s) => s.extension },
    { label: '赤ロム保証', getValue: (s) => s.block || '-' },
    { label: '実物写真', getValue: (s) => s.photo },
    { label: '配送料', getValue: (s) => s.postage },
  ]

  // ShopDetailSection用データ: shop_keyでマッチング
  const shopDetailItems = IPAD_SHOP_DETAIL_ORDER
    .map((key) => {
      const shop = shops.find((s) => s.shop_key === key)
      const meta = IPAD_SHOP_DETAIL_META[key]
      if (!shop || !meta || shop.ipad_url == null) return null
      return { shop, meta }
    })
    .filter((item): item is { shop: Shop; meta: (typeof IPAD_SHOP_DETAIL_META)[string] } => item != null)

  return (
    <>
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
            { label: '中古iPad完全購入ガイド', href: '/ipad' },
            { label: '中古iPadを買うならどこ？' },
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
                中古iPadを買うならどこ？ECサイト・ショップのおすすめを紹介
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/ipad/ipad-shop/')}
                  alt="中古iPadの購入先イメージ"
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
              <p>中古iPadを買おうと思ったとき、いちばん迷うのが「どこで買うのが正解なのか」という点です。</p>
              <p>
                中古ショップ、ECモール、フリマアプリなど選択肢は多いものの、
                <strong>価格や保証、リスクはそれぞれ大きく異なります。</strong>
              </p>
              <p>
                この記事では、中古iPadを購入できる主な場所を比較しながら、「安全に買いたい人」「できるだけ安く買いたい人」「初めて中古を買う人」など、タイプ別におすすめの買い方を整理して解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link href="/ipad/">中古iPad購入ガイド</Link>」をご覧ください。
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
                <a href="#criteria" className="toc-item">
                  選び方6つのポイント <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#flea-market" className="toc-item">
                  フリマは大丈夫？ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#checklist" className="toc-item">
                  購入前のチェックリスト <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
          </div>
        </nav>

        {/* セクション */}
        <div className="l-sections">
          <BuyingOptionsSection />
          <ShopComparisonSection />
          <RecommendByTypeSection />
          <ShopDetailSection items={shopDetailItems} />
          {/* ショップ比較表 */}
          <section className="l-section" id="shop-table" aria-labelledby="heading-shop-table">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-shop-table">
                中古iPad取り扱いショップ比較表
              </h2>
              <p className="m-section-desc">中古iPadを取り扱うショップの保証・価格・サービスを一覧で比較できます。</p>
              <ShopComparisonTable
                shops={comparisonShops}
                specRows={comparisonSpecRows}
                caption="中古iPad取り扱いショップ比較表"
                getShopUrl={(s) => s.ipad_url}
                ctaText="詳細を見る"
              />
            </div>
          </section>

          <SelectionCriteriaSection />
          <FleaMarketSection />
          <ChecklistSection />
          <FaqSection />
          <ConclusionSection />


        </div>
      </article>
    </main>
    <IPadArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/ipad/ipad-shop/", "/ipad/recommend/"]}>
          <div className="m-callout m-callout--muted" style={{ marginTop: 'var(--space-3xl)' }}><span className="m-callout__label">関連</span><p className="m-callout__text"><a href="https://atam-academy.com/" target="_blank" rel="noopener noreferrer" aria-label="オンラインイラスト教室アタムアカデミー｜iPadで学ぶ子供向けアート教育（新しいタブで開く）">オンラインイラスト教室アタムアカデミー｜iPadで学ぶ子供向けアート教育</a></p></div>
        </IPadArticleFooter>
    </>
  )
}
