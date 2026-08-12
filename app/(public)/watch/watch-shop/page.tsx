import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getShops } from '@/lib/queries'
import type { Shop } from '@/lib/types'
import {
  SHOP_PAGE_DATE_LABEL,
  WATCH_SHOP_DETAIL_ORDER,
  WATCH_SHOP_DETAIL_COUNT,
  WATCH_SHOP_DETAIL_META,
  WATCH_SHOP_FAQ_ITEMS,
} from '@/lib/data/watch-shop'
import Breadcrumb from '@/app/components/Breadcrumb'
import WatchArticleFooter from '@/app/components/watch/WatchArticleFooter'
import ShopComparisonTable from '@/app/components/shop/ShopComparisonTable'
import type { SpecRow } from '@/app/components/shop/ShopDetailSection'
import BuyingOptionsSection from './components/BuyingOptionsSection'
import OlderModelSection from './components/OlderModelSection'
import PhysicalStoreSection from '@/app/components/shop/PhysicalStoreSection'
import SelectionCriteriaSection from './components/SelectionCriteriaSection'
import ShopComparisonSection from './components/ShopComparisonSection'
import RecommendByTypeSection from '@/app/components/shop/RecommendByTypeSection'
import ShopDetailSection from './components/ShopDetailSection'
import FleaMarketSection from './components/FleaMarketSection'
import ChecklistSection from './components/ChecklistSection'
import ConclusionSection from './components/ConclusionSection'
import FaqSection from './components/FaqSection'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

// タイトルは検索実績に合わせている。
// Watch は「どこで買う」系が中心（合計約700表示）で、次に「型落ち」（約300表示）、
// 「未使用品」（約110表示）という固有クラスタがある。
// 旧タイトルは全角38.5文字で、末尾の年号まで表示されていなかった。
const PAGE_TITLE = `中古Apple Watchはどこで買う？型落ち・未使用品も比較【${SHOP_PAGE_DATE_LABEL}】`
const PAGE_DESCRIPTION = `中古アップルウォッチはどこで買うのがいい？おすすめ購入先${WATCH_SHOP_DETAIL_COUNT}店を保証・価格・送料で比較しました。型落ちモデルや未使用品の狙い方、実店舗で買う場合の注意点まで解説します【${SHOP_PAGE_DATE_LABEL}】`
const PAGE_URL = 'https://used-lab.jp/watch/watch-shop/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/watch/watch-shop/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/watch/watch-shop/',
    images: [{ url: getHeroImage('/watch/watch-shop/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/watch/watch-shop/')],
  },
}

export default async function WatchShopPage() {
  const shops = await getShops()

  // 比較表用: watch_url が存在するショップを抽出
  const comparisonShops = shops.filter((s) => s.watch_url != null)
  const comparisonSpecRows: SpecRow[] = [
    { label: '価格', getValue: (s) => s.price },
    { label: '在庫', getValue: (s) => s.stock },
    { label: '保証期間', getValue: (s) => s.support || '-' },
    { label: '独自保証', getValue: (s) => s.extension },
    { label: '実物写真', getValue: (s) => s.photo },
    { label: '配送料', getValue: (s) => s.postage },
  ]

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/watch-shop/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watchおすすめ機種・選び方ガイド', item: 'https://used-lab.jp/watch/' },
      { '@type': 'ListItem', position: 3, name: '中古Apple Watchを買うならどこ？' },
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
    mainEntity: WATCH_SHOP_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  // ShopDetailSection用データ: shop_keyでマッチング
  const shopDetailItems = WATCH_SHOP_DETAIL_ORDER
    .map((key) => {
      const shop = shops.find((s) => s.shop_key === key)
      const meta = WATCH_SHOP_DETAIL_META[key]
      if (!shop || !meta || shop.watch_url == null) return null
      return { shop, meta }
    })
    .filter((item): item is { shop: Shop; meta: (typeof WATCH_SHOP_DETAIL_META)[string] } => item != null)

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
            { label: '中古Apple Watchおすすめ機種・選び方ガイド', href: '/watch/' },
            { label: '中古Apple Watchを買うならどこ？' },
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
                {PAGE_TITLE}
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/watch/watch-shop/')}
                  alt="中古Apple Watchの購入先イメージ"
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
              <p>中古Apple Watchを買おうと思ったとき、いちばん迷うのが「どこで買うのが正解なのか」という点です。</p>
              <p>
                中古ショップ、ECモール、フリマアプリなど選択肢は多いものの、
                <strong>価格や保証、リスクはそれぞれ大きく異なります。</strong>
              </p>
              <p>
                Apple Watchは毎日肌に触れるデバイスだからこそ、ケースの傷やバッテリーの状態が使用感に直結します。
                この記事では、中古Apple Watchを購入できる主な場所を比較しながら、タイプ別におすすめの買い方を整理して解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link prefetch={false} href="/watch/">中古Apple Watchおすすめ機種・選び方まとめ</Link>」をご覧ください。
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
                  選び方5つのポイント <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
          <RecommendByTypeSection productName="中古Apple Watch" advancedNote="バッテリー状態・ケースサイズ・GPS / Cellularの違い・watchOSのサポート期間を自分で確認できる人向けです。"
            availableShopKeys={shopDetailItems.map((i) => i.shop.shop_key)}
            mentionSimLock={false}
            mentionBattery={false} />
          <ShopDetailSection items={shopDetailItems} />
          {/* ショップ比較表 */}
          <section className="l-section" id="shop-table" aria-labelledby="heading-shop-table">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-shop-table">
                中古Apple Watch取り扱いショップ比較表
              </h2>
              <p className="m-section-desc">中古Apple Watchを取り扱うショップの保証・価格・サービスを一覧で比較できます。</p>
              <ShopComparisonTable
                shops={comparisonShops}
                specRows={comparisonSpecRows}
                caption="中古Apple Watch取り扱いショップ比較表"
                getShopUrl={(s) => s.watch_url}
                ctaText="詳細を見る"
              />
            </div>
          </section>

          <OlderModelSection />
          <PhysicalStoreSection productName="中古Apple Watch" />
          <SelectionCriteriaSection />
          <FleaMarketSection />
          <ChecklistSection />
          <FaqSection />
          <ConclusionSection />
        </div>
      </article>
    </main>
    <WatchArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/watch/watch-shop/"]} />
    </>
  )
}
