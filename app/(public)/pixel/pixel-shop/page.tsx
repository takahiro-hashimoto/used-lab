import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getShops } from '@/lib/queries'
import type { Shop } from '@/lib/types'
import {
  SHOP_PAGE_DATE_LABEL,
  SHOP_DETAIL_ORDER,
  SHOP_DETAIL_META,
  SHOP_FAQ_ITEMS,
} from '@/lib/data/pixel-shop'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShopComparisonTable from '@/app/components/shop/ShopComparisonTable'
import type { SpecRow } from '@/app/components/shop/ShopDetailSection'
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'
import BuyingOptionsSection from './components/BuyingOptionsSection'
import SelectionCriteriaSection from './components/SelectionCriteriaSection'
import ShopComparisonSection from './components/ShopComparisonSection'
import RecommendByTypeSection from './components/RecommendByTypeSection'
import ShopDetailSection from './components/ShopDetailSection'
import FleaMarketSection from './components/FleaMarketSection'
import ChecklistSection from './components/ChecklistSection'
import FaqSection from './components/FaqSection'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

const PAGE_TITLE = `中古Google Pixelを買うならどこ？ECサイト・ショップのおすすめを紹介【${SHOP_PAGE_DATE_LABEL}】`
const PAGE_DESCRIPTION = `中古Google Pixelを買うならどこがおすすめ？信頼できるECサイト・ショップを保証・価格・品質の観点から徹底比較。最適な購入先を紹介します【${SHOP_PAGE_DATE_LABEL}】`
const PAGE_URL = 'https://used-lab.jp/pixel/pixel-shop/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/pixel/pixel-shop/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/pixel/pixel-shop/',
    images: [{ url: getHeroImage('/pixel/pixel-shop/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/pixel/pixel-shop/')],
  },
}

export default async function PixelShopPage() {
  const shops = await getShops()

  // 比較表用: url（デフォルト）を持つショップを抽出。ただし Apple整備済み品はPixel非対応のため除外
  const comparisonShops = shops.filter((s) => s.url != null && s.shop_key !== 'apple')
  const comparisonSpecRows: SpecRow[] = [
    { label: '価格', getValue: (s) => s.price },
    { label: '在庫', getValue: (s) => s.stock },
    { label: '保証期間', getValue: (s) => s.support || '-' },
    { label: '独自保証', getValue: (s) => s.extension },
    { label: '赤ロム保証', getValue: (s) => s.block || '-' },
    { label: '実物写真', getValue: (s) => s.photo },
    { label: 'バッテリー表示', getValue: (s) => s.battery },
    { label: '配送料', getValue: (s) => s.postage },
  ]

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/pixel-shop/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/pixel/' },
      { '@type': 'ListItem', position: 3, name: '中古Google Pixelを買うならどこ？' },
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
    mainEntity: SHOP_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  // ShopDetailSection用データ: shop_keyでマッチング（SHOP_DETAIL_ORDER は 'apple' を含まない）
  const shopDetailItems = SHOP_DETAIL_ORDER
    .map((key) => {
      const shop = shops.find((s) => s.shop_key === key)
      const meta = SHOP_DETAIL_META[key]
      if (!shop || !meta || shop.url == null) return null
      return { shop, meta }
    })
    .filter((item): item is { shop: Shop; meta: (typeof SHOP_DETAIL_META)[string] } => item != null)

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
            { label: '中古Google Pixelおすすめ機種・選び方まとめ', href: '/pixel/' },
            { label: '中古Google Pixelを買うならどこ？' },
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
                中古Google Pixelを買うならどこ？ECサイト・ショップのおすすめを紹介
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/pixel/pixel-shop/')}
                  alt="中古Google Pixelの購入先イメージ"
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
              <p>中古Google Pixelを買おうと思ったとき、いちばん迷うのが「どこで買うのが正解なのか」という点です。</p>
              <p>
                中古スマホ専門店、キャリア認定中古、ECモール、フリマアプリなど選択肢は多いものの、
                <strong>価格や保証、リスクはそれぞれ大きく異なります。</strong>
              </p>
              <p>
                この記事では、中古Google Pixelを購入できる主な場所を比較しながら、「安全に買いたい人」「できるだけ安く買いたい人」「初めて中古を買う人」など、タイプ別におすすめの買い方を整理して解説します。
              </p>
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
                中古Google Pixel取り扱いショップ比較表
              </h2>
              <p className="m-section-desc">中古Google Pixelを取り扱うショップの保証・価格・サービスを一覧で比較できます。</p>
              <ShopComparisonTable
                shops={comparisonShops}
                specRows={comparisonSpecRows}
                caption="中古Google Pixel取り扱いショップ比較表"
                getShopUrl={(s) => s.pixel_url ?? s.url}
                ctaText="詳細を見る"
              />
            </div>
          </section>

          <SelectionCriteriaSection />
          <FleaMarketSection />
          <ChecklistSection />
          <FaqSection />

        </div>
      </article>
    </main>
    <PixelArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/pixel/pixel-shop/"]} />
    </>
  )
}
