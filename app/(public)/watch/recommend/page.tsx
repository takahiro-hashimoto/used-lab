import type { Metadata } from 'next'
import Image from 'next/image'
import {
  getAllWatchModels,
  getAllWatchModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getLatestWatchPriceLog,
} from '@/lib/queries'
import type { WatchModel, WatchPriceLog } from '@/lib/types'
import { buildFallbackShops, buildBreadcrumbJsonLd, buildArticleJsonLd, buildFaqJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import {
  RECOMMEND_DATE_LABEL,
  RECOMMEND_YEAR,
  RECOMMEND_SLUGS,
  RECOMMEND_COUNT,
  RECOMMEND_COUNT_LABEL,
  RECOMMEND_META,
  SHOP_SECTION_IDS,
  FAQ_JSONLD_ITEMS,
} from '@/lib/data/watch-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import ConclusionSection from '@/app/components/ConclusionSection'
import CriteriaSection from '@/app/components/CriteriaSection'
import RecommendDetailSection from './components/RecommendDetailSection'
import CompareTableSection from './components/CompareTableSection'
import ChecklistSection from '@/app/components/ChecklistSection'
import ShopSection from '@/app/components/ShopSection'
import WatchFaqSection from './components/WatchFaqSection'
import WatchRelatedLinks from '@/app/components/watch/WatchRelatedLinks'
import dynamic from 'next/dynamic'

const ValueZoneChart = dynamic(() => import('@/app/components/ValueZoneChart'), {
  loading: () => <div style={{ height: '300px' }} />,
})
import AuthorByline from '@/app/components/AuthorByline'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 3600

const PAGE_TITLE = `中古Apple Watchのおすすめ${RECOMMEND_COUNT}機種を解説。狙い目の型落ちモデルはどれ？【${RECOMMEND_DATE_LABEL}版】`
const PAGE_DESCRIPTION =
  `${RECOMMEND_DATE_LABEL}現在、中古Apple Watchのおすすめ${RECOMMEND_COUNT}機種を目的別に解説。watchOSサポート期間・性能・価格のバランスが良いモデルだけを厳選しました。`
const PAGE_URL = 'https://used-lab.com/watch/recommend/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/watch/recommend/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/watch/recommend/',
    images: [{ url: '/images/watch/watch-9.jpg', width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/watch/watch-9.jpg'],
  },
}

export default async function WatchRecommendPage() {
  const [allModels, allModelsIncludingEnded, shops, allShopLinks] = await Promise.all([
    getAllWatchModels(),
    getAllWatchModelsIncludingEnded(),
    getShops(),
    getAllProductShopLinksByType('watch'),
  ])

  // おすすめモデルを抽出
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is WatchModel => m != null)

  // 各モデルの最新価格を並列取得
  const latestPrices = await Promise.all(
    recommendModels.map((m) => getLatestWatchPriceLog(m.id))
  )

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/recommend/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
    { name: '中古Apple Watch完全購入ガイド', item: 'https://used-lab.com/watch' },
    { name: `中古Apple Watchおすすめ${RECOMMEND_COUNT}選` },
  ])
  const articleJsonLd = buildArticleJsonLd({ headline: PAGE_TITLE, description: PAGE_DESCRIPTION, dateStr, url: PAGE_URL })
  const faqJsonLd = buildFaqJsonLd(FAQ_JSONLD_ITEMS)

  // ConclusionSection用データ
  const conclusionItems = recommendModels.map((model) => ({
    id: model.id,
    slug: model.slug,
    displayName: model.model,
    image: model.image,
    date: model.date,
    desc: RECOMMEND_META[model.slug]?.desc || '',
  }))

  const fallbackShops = buildFallbackShops(shops, SHOP_SECTION_IDS, 'watch_url')

  // RecommendDetailSection用データ
  const detailItems = recommendModels.map((model, i) => {
    const meta = RECOMMEND_META[model.slug]
    const modelShopLinks = allShopLinks.filter((l) => l.product_id === model.id)
    return {
      model,
      latestPrice: latestPrices[i],
      shopLinks: modelShopLinks,
      fallbackShops,
      label: meta?.label || '',
      subtitle: meta?.subtitle || '',
      description: meta?.description || [],
      good: meta?.good || [],
      bad: meta?.bad || [],
    }
  })

  // CompareTableSection用データ
  const compareItems = recommendModels.map((model, i) => {
    const meta = RECOMMEND_META[model.slug]
    const modelShopLinks = allShopLinks.filter((l) => l.product_id === model.id)
    return {
      model,
      latestPrice: latestPrices[i],
      shopLinks: modelShopLinks,
      healthLabel: meta?.healthLabel || '-',
      batteryLabel: meta?.batteryLabel || '-',
      targetUser: meta?.targetUser || '-',
    }
  })

  // ShopSection用データ（shopsテーブルのwatch_urlから取得）
  const shopItems = SHOP_SECTION_IDS
    .map((shopId) => {
      const shop = shops.find((s) => s.id === shopId)
      if (!shop || !shop.watch_url) return null
      return { shop, url: shop.watch_url }
    })
    .filter((item): item is { shop: (typeof shops)[number]; url: string } => item != null)

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
            { label: '中古Apple Watch完全購入ガイド', href: '/watch' },
            { label: `中古Apple Watchおすすめ${RECOMMEND_COUNT}選` },
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
                  src="/images/content/thumbnail/watch-image-08.jpg"
                  alt={`中古Apple Watchおすすめ${RECOMMEND_COUNT}選のイメージ`}
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
              <p>「中古Apple Watchって、結局どれを選べばいいの？」</p>
              <p>
                {RECOMMEND_DATE_LABEL}現在、型落ちモデルの選択肢は豊富ですが、watchOSサポート期間・機能・価格のバランスを
                考えると、おすすめできる機種は意外と限られています。
              </p>
              <p>
                この記事では、今買っても後悔しない中古Apple Watch {RECOMMEND_COUNT}機種を厳選し、それぞれの特徴と向いている人を
                詳しく解説します。
              </p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<a href="/watch/">中古Apple Watch購入完全ガイド</a>」も参考にしてみてください！</p>
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
                <a href="#conclusion" className="toc-item">
                  結論：選ぶべき{RECOMMEND_COUNT_LABEL} <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#criteria" className="toc-item">
                  選んだ判断基準 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#value-zone" className="toc-item">
                  お得ゾーンとは？ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#detail" className="toc-item">
                  おすすめ{RECOMMEND_COUNT_LABEL}の詳細 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#compare" className="toc-item">
                  スペック比較表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#checklist" className="toc-item">
                  購入前の最終チェック <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#shops" className="toc-item">
                  おすすめショップ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          <AuthorByline />
          </div>
        </nav>

        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">
          <ConclusionSection
            items={conclusionItems}
            heading={<>【結論】{RECOMMEND_YEAR}年現在のおすすめ中古Apple Watch{RECOMMEND_COUNT}機種</>}
            descriptions={[
              <>迷っているなら、まずはこの{RECOMMEND_COUNT}機種から選べば大きな失敗はありません。</>,
              <>{RECOMMEND_YEAR}年時点で「watchOSサポートが十分に残っている」「中古価格と機能のバランスが良い」モデルだけに絞っています。</>,
            ]}
            gridCols="3col"
            imagePath="watch"
            placeholderText="Watch"
          />
          <CriteriaSection
            recommendCount={RECOMMEND_COUNT}
            recommendCountLabel={RECOMMEND_COUNT_LABEL}
            descriptions={[
              '中古Apple Watchを選ぶなら、「長く使えるか」「用途に合った機能があるか」「価格に見合っているか」の3つが重要。',
              <>この基準を満たし、用途別に最適なモデルを{RECOMMEND_COUNT}つに絞り込みました。</>,
            ]}
            cards={[
              {
                iconClass: 'fa-solid fa-shield-halved',
                iconColor: 'blue',
                title: 'watchOSサポートが十分に残っている',
                desc: <>サポートが切れるとセキュリティリスクが高まり、新しい文字盤やアプリも使えなくなります。<strong>2029年頃までサポートされる機種</strong>だけを選んでいます。</>,
              },
              {
                iconClass: 'fa-solid fa-heart-pulse',
                iconColor: 'green',
                title: '用途に合った機能が揃っている',
                desc: '常時表示・健康センサー・バッテリー持ちなど、重視するポイントは人それぞれ。それぞれの用途で満足できる機能を備えたモデルを選定しています。',
              },
              {
                iconClass: 'fa-solid fa-coins',
                iconColor: 'red',
                title: '中古価格と性能のバランスが良い',
                desc: '「残りのサポート期間」と「実際の中古相場」から、1年あたりのコストを計算しています。年単価が最も安くなる機種を優先的に選んでいます。',
              },
            ]}
          />
          <ValueZoneChart
            productName="Apple Watch"
            osName="watchOS"
            supportYears={5}
            sweetMin={2}
            sweetMax={3}
            series={[
              { label: 'Apple Watch Series 4', representativeSlug: 'series4' },
              { label: 'Apple Watch Series 5', representativeSlug: 'series5' },
              { label: 'Apple Watch SE（第1世代）', representativeSlug: 'se' },
              { label: 'Apple Watch Series 6', representativeSlug: 'series6' },
              { label: 'Apple Watch Series 7', representativeSlug: 'series7' },
              { label: 'Apple Watch SE（第2世代）', representativeSlug: 'se2-2' },
              { label: 'Apple Watch Series 8', representativeSlug: 'series8' },
              { label: 'Apple Watch Ultra', representativeSlug: 'ultra' },
              { label: 'Apple Watch Series 9', representativeSlug: 'series9' },
              { label: 'Apple Watch Ultra 2', representativeSlug: 'ultra2' },
              { label: 'Apple Watch Series 10', representativeSlug: 'series10' },
              { label: 'Apple Watch SE（第3世代）', representativeSlug: 'se3-2' },
              { label: 'Apple Watch Ultra 3', representativeSlug: 'ultra3' },
              { label: 'Apple Watch Series 11', representativeSlug: 'series11' },
            ]}
            allModels={allModelsIncludingEnded}
          />
          <RecommendDetailSection items={detailItems} />
          <CompareTableSection items={compareItems} />
          <ChecklistSection
            productName="Apple Watch"
           
            items={[
              {
                iconClass: 'fa-solid fa-battery-three-quarters',
                title: 'バッテリーの劣化具合を確認する',
                desc: '中古Apple Watchではバッテリーの劣化が使い心地に直結します。最大容量80%未満の場合、1日持たなくなることも。ショップの商品説明でバッテリー状態を確認しましょう。',
              },
              {
                iconClass: 'fa-solid fa-ruler',
                title: 'ケースサイズを確認する',
                desc: <>Apple Watchはモデルによって40/41/42mm（小）と44/45/46/49mm（大）のサイズがあります。手首の太さに合わないサイズだと着け心地が悪くなるため、<strong>事前にサイズを確認</strong>しましょう。</>,
              },
              {
                iconClass: 'fa-solid fa-shield-halved',
                title: 'ショップ保証の有無を確認',
                desc: <>初期不良に対応する<strong>保証期間</strong>をチェック。イオシスなら3ヶ月保証など、ショップによって保証内容は異なります。保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</>,
              },
              {
                iconClass: 'fa-solid fa-clock-rotate-left',
                title: 'watchOSサポート期間を確認する',
                desc: <>発売から約5年でサポート終了するのが過去の傾向です。サポートが切れると新しい文字盤やアプリが使えなくなるため、<strong>発売が古すぎる機種</strong>は避けましょう。</>,
              },
            ]}
            memoLinks={[
              { href: '/watch/used-watch-attention/', label: '中古Apple Watch購入時の注意点まとめ' },
              { href: '/watch/used-watch-support/', label: 'watchOSのサポート期間一覧' },
            ]}
          />
          <ShopSection
            items={shopItems}
            productName="Apple Watch"
           
            description="信頼性の高い中古ショップを厳選し、保証期間などをまとめました。"
            specRows={[
              { label: '価格', field: 'price' },
              { label: '保証期間', field: 'support' },
              { label: '実物写真', field: 'photo' },
              { label: '配送料', field: 'postage' },
            ]}
          />
          <WatchFaqSection />
        <WatchRelatedLinks heading="Apple Watch選びをもっと深掘りする" description="購入先の比較や相場チェックなど、Apple Watch選びに役立つ記事をまとめました。" excludeHref="/watch/recommend/" />
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
