import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { forModelPage } from '@/lib/data/shop-ids'
import {
  getGalaxyModelBySlug,
  getAllGalaxySlugs,
  getAllGalaxyModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getGalaxyPriceLogsByModelId,
  getLatestGalaxyPriceLogWithPrices,
  getAllIPhoneModels,
  getAllPixelModels,
  getLatestIPhonePriceLogsWithPricesForModels,
  getLatestPixelPriceLogsWithPricesForModels,
  getLatestGalaxyPriceLogsWithPricesForModels,
} from '@/lib/queries'
import SimilarPriceModels from '@/app/components/model/SimilarPriceModels'
import { buildSimilarPriceItems } from '@/lib/utils/similar-price'
import { aggregateDailyPrices, filterLast3Months, resolveLastUpdatedDate, buildStandardPriceChartData } from '@/lib/utils/shared-helpers'
import { buildInventoryInsight } from '@/lib/utils/price-stats'
import { buildGalaxyPageTitle, calculateGalaxyPriceRange, calculateGalaxySupport } from './lib/helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
import { getGalaxyAdvanceFeaturesList } from './lib/helpers'
import TableOfContents from './components/TableOfContents'
import PurchaseVerdict from './components/PurchaseVerdict'
import ShopGrid from './components/ShopGrid'
import LifespanSection from './components/LifespanSection'
import PriceChartSection from '@/app/components/PriceChartSection'
import AdvanceFeatures from './components/AdvanceFeatures'
import CompareSection from '@/app/components/CompareSection'
import CompareSelector from './components/CompareSelector'
import BenchmarkGeekbench from './components/BenchmarkGeekbench'
import BenchmarkAntutu from './components/BenchmarkAntutu'
import GalaxyArticleFooter from '@/app/components/galaxy/GalaxyArticleFooter'
import FaqSection from './components/FaqSection'
import ReviewSection from '@/app/components/ReviewSection'
import AdminEditLink from '@/app/components/AdminEditLink'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'

const cachedGetModel = cache(getGalaxyModelBySlug)
const cachedGetLatestPrice = cache(getLatestGalaxyPriceLogWithPrices)

export const revalidate = false

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllGalaxySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) return {}

  const latestLog = await cachedGetLatestPrice(model.id)
  const priceRange = calculateGalaxyPriceRange(latestLog)
  const support = calculateGalaxySupport(model)

  // 動的に価格・チップ・サポート状況を埋め込む
  // 「相場」と書いている箇所は中央値。最安値は1点だけの特価であることが多く、
  // 相場として提示すると実際には見つけられない価格になる
  const priceText = priceRange.medianPrice
    ? `（¥${priceRange.medianPrice.toLocaleString()}前後）`
    : priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const chipText = model.cpu ? `${model.cpu}搭載` : ''
  const osText = support.ended ? 'Android・セキュリティ更新は終了済み' : 'Android・セキュリティ更新の残り年数'

  const title = buildGalaxyPageTitle(model)
  const description = `${model.model}の中古相場${priceText}や${osText}をもとに、今から中古で買うべきかを判定。${chipText ? chipText + 'の' : ''}ベンチマーク・カメラ・バッテリーやGalaxy AI・S Penを比較しながら失敗しない選び方を解説します。`

  return {
    title,
    description,
    alternates: { canonical: `/galaxy/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/galaxy/${slug}/`,
      images: model.image ? [{ url: `/images/galaxy/${model.image}`, width: 1200, height: 630, alt: `${model.model} の外観イメージ` }] : [],
    },
    twitter: {
      title,
      description,
      images: model.image ? [`/images/galaxy/${model.image}`] : [],
    },
  }
}

export default async function GalaxyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) notFound()

  // 並列データ取得（galaxy_reviews テーブルは存在しないため reviews は空配列）
  const [shops, rawShopLinks, priceLogs, latestPrice, allModels] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('galaxy'),
    getGalaxyPriceLogsByModelId(model.id),
    cachedGetLatestPrice(model.id),
    getAllGalaxyModelsIncludingEnded(),
  ])

  // 描画しないショップ（プロディグ・Amazon整備済み品など）は
  // ここで落とす。渡すと RSC ペイロードに載るだけで表示はされない
  const shopLinks = forModelPage(rawShopLinks)
  const reviews: never[] = []

  // 「同じ予算で狙える他のモデル」用: iPhone / Pixel / Galaxy 横断の最新価格
  const PRICE_COLS = ['iosys_min', 'geo_min', 'janpara_min']
  // 他ブランドのイオシスリンクも必要（カードの「イオシスで見る」用）。
  // getAllProductShopLinksByType は revalidate 604800 の共通キャッシュなので追加負荷はない。
  const [iphoneModels, pixelModels, iphoneShopLinks, pixelShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllPixelModels(),
    getAllProductShopLinksByType('iphone'),
    getAllProductShopLinksByType('pixel'),
  ])
  const [iphonePrices, pixelPrices, galaxyPrices] = await Promise.all([
    getLatestIPhonePriceLogsWithPricesForModels(iphoneModels.map((m) => m.id), PRICE_COLS),
    getLatestPixelPriceLogsWithPricesForModels(pixelModels.map((m) => m.id), PRICE_COLS),
    getLatestGalaxyPriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS),
  ])
  const { basePrice, items: similarItems } = buildSimilarPriceItems(
    { brand: 'galaxy', id: model.id },
    [
      { brand: 'galaxy', brandLabel: 'Samsung Galaxy', models: allModels, prices: galaxyPrices, shopLinks },
      { brand: 'iphone', brandLabel: 'iPhone', models: iphoneModels, prices: iphonePrices, shopLinks: iphoneShopLinks },
      { brand: 'pixel', brandLabel: 'Google Pixel', models: pixelModels, prices: pixelPrices, shopLinks: pixelShopLinks },
    ],
  )

  // PriceChartSection用のデータをサーバーサイドで事前計算（価格ログが空でも安全に動作）
  const recentLogs = filterLast3Months(priceLogs)
  const dailyData = aggregateDailyPrices(recentLogs, (log) => ({
    mins: [log.iosys_min, log.geo_min, log.janpara_min],
    maxes: [log.iosys_max, log.geo_max, log.janpara_max],
    counts: [log.iosys_count, log.geo_count, log.janpara_count],
  }))
  const { latestDate, latestMinMaxPairs, storageNote, priceStats, totalCount } = buildStandardPriceChartData(priceLogs)
  // 流通量から在庫の状況を組み立てる（件数の記録がない過去分では null）
  const inventoryInsight = buildInventoryInsight(totalCount, model.date, new Date())
  const modelShopLinks = shopLinks.filter((l) => l.product_id === model.id)
  const iosysShop = shops.find((s) => s.id === 1)
  const fallbackIosysUrl = iosysShop?.galaxy_url || iosysShop?.url || undefined

  const { dateStr, dateDisplay } = resolveLastUpdatedDate({
    preferredDateStr: latestPrice?.logged_at?.substring(0, 10),
    fallbackFilePath: 'app/(public)/galaxy/[slug]/page.tsx',
  })

  const iosysModelLink = modelShopLinks.find((l) => l.shop_id === 1)

  return (
    <>
    <main>
      {iosysModelLink?.url && <StickyCtaOverride href={iosysModelLink.url} />}
      <AdminEditLink categoryKey="galaxy" modelId={model.id} />
      <article>
        <HeroSection model={model} latestPrice={latestPrice} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={model} />
        <TableOfContents hasUpgrade={getGalaxyAdvanceFeaturesList(model).length > 0} hasReviews={reviews.length > 0} hasSimilarPrice={basePrice != null && similarItems.length > 0} />
        <div className="l-sections">
        <PurchaseVerdict model={model} latestPrice={latestPrice} allModels={allModels} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={model} />
        <LifespanSection model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            category="galaxy"
            latestMinMaxPairs={latestMinMaxPairs}
            priceStats={priceStats}
            inventoryInsight={inventoryInsight}
            latestDate={latestDate}
            storageNote={storageNote}
            priceListLink={{ href: '/galaxy/price-info/', label: 'Samsung Galaxyの中古相場一覧・価格推移' }}
          />
        )}

        {/* 価格推移とは別の話題（他機種への乗り換え検討）なので独立したセクションにする */}
        {basePrice != null && (
          <SimilarPriceModels modelName={model.model} basePrice={basePrice} items={similarItems} />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} fallbackIosysUrl={fallbackIosysUrl} specLinks={[{ href: '/galaxy/galaxy-spec-table/', label: '歴代Galaxyスペック比較表' }]}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={model} allModels={allModels} />
        <BenchmarkAntutu model={model} allModels={allModels} />
        <ReviewSection modelName={model.model} reviews={reviews} />
        <FaqSection model={model} latestPrice={latestPrice} allModels={allModels} shopLinks={modelShopLinks} />

        </div>
      </article>
    </main>
    <GalaxyArticleFooter
          pageUrl={`https://used-lab.jp/galaxy/${model.slug}/`}
          pageTitle={buildGalaxyPageTitle(model)}
          excludeHref={`/galaxy/${model.slug}/`}
          relatedHeading="Galaxy選びのヒントになる記事"
          relatedDescription="Galaxy選びをサポートする記事をまとめました。"
        />
    </>
  )
}
