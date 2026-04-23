import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import {
  getAllAirPodsModels,
  getShops,
  getAllProductShopLinksByType,
  getLatestAirPodsPriceLog,
} from '@/lib/queries'
import type { AirPodsModel } from '@/lib/types'
import { buildFallbackShops, buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import {
  RECOMMEND_DATE_LABEL,
  RECOMMEND_YEAR,
  RECOMMEND_SLUGS,
  RECOMMEND_COUNT,
  RECOMMEND_COUNT_LABEL,
  RECOMMEND_META,
  SHOP_SECTION_IDS,
  FAQ_JSONLD_ITEMS,
} from '@/lib/data/airpods-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import AirPodsRelatedLinks from '@/app/components/airpods/AirPodsRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import ConclusionSection from '@/app/components/ConclusionSection'
import CriteriaSection from '@/app/components/CriteriaSection'
import RecommendDetailSection from './components/RecommendDetailSection'
import CompareTableSection from './components/CompareTableSection'
import ChecklistSection from '@/app/components/ChecklistSection'
import ShopSection from '@/app/components/ShopSection'
import AirPodsFaqSection from './components/AirPodsFaqSection'
import AuthorByline from '@/app/components/AuthorByline'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 3600

const PAGE_TITLE = `中古AirPodsおすすめ${RECOMMEND_COUNT}機種を解説。狙い目の型落ちモデルはどれ？【${RECOMMEND_DATE_LABEL}版】`
const PAGE_DESCRIPTION =
  `${RECOMMEND_DATE_LABEL}現在、中古AirPodsのおすすめ${RECOMMEND_COUNT}機種を目的別に解説。ファームウェアサポート期間・機能・価格のバランスが良いモデルだけを厳選しました。`
const PAGE_URL = 'https://used-lab.jp/airpods/recommend/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/airpods/recommend/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/airpods/recommend/',
    images: [{ url: getHeroImage('/airpods/recommend/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/airpods/recommend/')],
  },
}

export default async function AirPodsRecommendPage() {
  const [allModels, shops, allShopLinks] = await Promise.all([
    getAllAirPodsModels(),
    getShops(),
    getAllProductShopLinksByType('airpods'),
  ])

  // おすすめモデルを抽出
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is AirPodsModel => m != null)

  // 各モデルの最新価格を並列取得
  const latestPrices = await Promise.all(
    recommendModels.map((m) => getLatestAirPodsPriceLog(m.id))
  )

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/airpods/recommend/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古AirPods完全ガイド', item: 'https://used-lab.jp/airpods' },
      { '@type': 'ListItem', position: 3, name: `中古AirPodsおすすめ${RECOMMEND_COUNT}選` },
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
    mainEntity: FAQ_JSONLD_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  // ConclusionSection用データ
  const conclusionItems = recommendModels.map((model) => ({
    id: model.id,
    slug: model.slug,
    displayName: model.name,
    image: model.image,
    date: model.date,
    desc: RECOMMEND_META[model.slug]?.desc || '',
  }))

  const fallbackShops = buildFallbackShops(shops, SHOP_SECTION_IDS, 'airpods_url')

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
      ancLabel: meta?.ancLabel || '-',
      batteryLabel: meta?.batteryLabel || '-',
      targetUser: meta?.targetUser || '-',
    }
  })

  // ShopSection用データ（shopsテーブルのairpods_urlから取得）
  const shopItems = SHOP_SECTION_IDS
    .map((shopId) => {
      const shop = shops.find((s) => s.id === shopId)
      if (!shop || !shop.airpods_url) return null
      return { shop, url: shop.airpods_url }
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
            { label: '中古AirPods完全ガイド', href: '/airpods' },
            { label: `中古AirPodsおすすめ${RECOMMEND_COUNT}選` },
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
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp showAuthor />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/airpods/recommend/')}
                  alt={`中古AirPodsおすすめ${RECOMMEND_COUNT}選のイメージ`}
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
              <p>「中古AirPodsって、結局どれを選べばいいの？」</p>
              <p>
                {RECOMMEND_DATE_LABEL}現在、AirPodsシリーズの選択肢は豊富ですが、ファームウェアサポート期間・機能・価格のバランスを
                考えると、おすすめできる機種は意外と限られています。
              </p>
              <p>
                この記事では、今買っても後悔しない中古AirPods {RECOMMEND_COUNT}機種を厳選し、それぞれの特徴と向いている人を
                詳しく解説します。
              </p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link href="/airpods/">中古AirPods購入完全ガイド</Link>」も参考にしてみてください！</p>
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
          </div>
        </nav>
        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">
          <ConclusionSection
            items={conclusionItems}
            heading={<>【結論】{RECOMMEND_YEAR}年現在のおすすめ中古AirPods{RECOMMEND_COUNT}機種</>}
            descriptions={[
              <>迷っているなら、まずはこの{RECOMMEND_COUNT}機種から選べば大きな失敗はありません。</>,
              <>{RECOMMEND_YEAR}年時点で「サポートが十分に残っている」「中古価格と機能のバランスが良い」モデルだけに絞っています。</>,
            ]}
            gridCols="3col"
            imagePath="airpods"
            placeholderText="AirPods"
          />
          <CriteriaSection
            recommendCount={RECOMMEND_COUNT}
            recommendCountLabel={RECOMMEND_COUNT_LABEL}
            descriptions={[
              '中古AirPodsを選ぶなら、「長く使えるか」「必要な機能があるか」「価格に見合っているか」の3つが重要。',
              <>この基準を満たし、用途別に最適なモデルを{RECOMMEND_COUNT}つに絞り込みました。</>,
            ]}
            cards={[
              {
                iconClass: 'fa-solid fa-shield-halved',
                iconColor: 'blue',
                title: 'ファームウェアサポートが十分に残っている',
                desc: <>サポートが切れると新機能の追加やセキュリティ修正が受けられなくなります。<strong>2029年以降までサポートされる機種</strong>だけを選んでいます。</>,
              },
              {
                iconClass: 'fa-solid fa-bolt',
                iconColor: 'green',
                title: '用途に合った機能を搭載している',
                desc: 'ノイズキャンセリング・空間オーディオ・防水性能・USB-C対応など、使い方に合った機能があるモデルを選定しています。',
              },
              {
                iconClass: 'fa-solid fa-coins',
                iconColor: 'red',
                title: '中古価格と機能のバランスが良い',
                desc: '「残りのサポート期間」と「実際の中古相場」から、コストパフォーマンスを評価しています。機能の割に価格がこなれたモデルを優先的に選んでいます。',
              },
            ]}
          />
          <RecommendDetailSection items={detailItems} />
          <CompareTableSection items={compareItems} />
          <ChecklistSection
            productName="AirPods"
            items={[
              {
                iconClass: 'fa-solid fa-battery-three-quarters',
                title: 'バッテリーの劣化状態を確認',
                desc: <><p>AirPodsはバッテリー交換が難しい製品です。中古品では使用年数に応じてバッテリーが劣化しており、新品時より再生時間が短くなっている場合があります。</p><p>商品説明やショップに確認して、極端に駆動時間が短くないか確認しましょう。</p></>,
              },
              {
                iconClass: 'fa-solid fa-box-open',
                title: '充電ケースの状態を確認',
                desc: <><p>イヤホン本体だけでなく、充電ケースのバッテリーも劣化します。ケースが膨張していないか、充電端子に損傷がないか、蓋の開閉がスムーズかなどを確認しましょう。</p><p>ケースだけの交換はAppleでも対応可能ですが、費用がかかります。</p></>,
              },
              {
                iconClass: 'fa-solid fa-shield-halved',
                title: 'ショップ保証の有無を確認',
                desc: <><p>初期不良やペアリング不良に対応する<strong>保証期間</strong>をチェック。イオシスなら3ヶ月保証など、ショップによって異なります。</p><p>保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</p></>,
              },
              {
                iconClass: 'fa-solid fa-plug',
                title: '充電端子を確認する（Lightning / USB-C）',
                desc: <><p>AirPodsは世代によって充電端子がLightningまたはUSB-Cと異なります。iPhone 15以降やMacBookとケーブルを統一したい場合は<strong>USB-C対応モデル</strong>を選びましょう。</p><p>今回おすすめしている3機種はすべてUSB-C対応です。</p></>,
              },
            ]}
            memoLinks={[
              { href: '/airpods/used-airpods-attention/', label: '中古AirPods購入時の注意点まとめ' },
              { href: '/airpods/used-airpods-support/', label: 'サポート期間一覧' },
            ]}
          />
          <ShopSection
            items={shopItems}
            productName="AirPods"
            description="信頼性の高い中古ショップを厳選し、保証期間や配送料の有無などをまとめました。"
            specRows={[
              { label: '価格', field: 'price' },
              { label: '保証期間', field: 'support' },
              { label: '赤ロム保証', field: 'block' },
              { label: '実物写真', field: 'photo' },
              { label: '配送料', field: 'postage' },
            ]}
          />
          <AirPodsFaqSection />
        <AirPodsRelatedLinks excludeHref="/airpods/recommend/" />
        <div className="l-section l-section--sm">
          <div className="l-container">
            <AuthorByline />
          </div>
        </div>

                <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
