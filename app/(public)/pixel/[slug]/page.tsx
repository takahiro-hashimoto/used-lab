import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { forModelPage } from '@/lib/data/shop-ids'
import {
  getPixelModelBySlug,
  getAllPixelSlugs,
  getAllPixelModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getPixelPriceLogsByModelId,
  getLatestPixelPriceLogWithPrices,
  getAllIPhoneModels,
  getAllGalaxyModels,
  getLatestIPhonePriceLogsWithPricesForModels,
  getLatestPixelPriceLogsWithPricesForModels,
  getLatestGalaxyPriceLogsWithPricesForModels,
} from '@/lib/queries'
import type { ProductReview } from '@/lib/types'
import SimilarPriceModels from '@/app/components/model/SimilarPriceModels'
import { buildSimilarPriceItems } from '@/lib/utils/similar-price'

const cachedGetModel = cache(getPixelModelBySlug)
const cachedGetLatestPrice = cache(getLatestPixelPriceLogWithPrices)

import { filterLast3Months, aggregateDailyPrices, resolveLastUpdatedDate, buildStandardPriceChartData } from '@/lib/utils/shared-helpers'
import { buildInventoryInsight } from '@/lib/utils/price-stats'
import { buildPixelPageTitle, calculatePixelPriceRange, calculatePixelSupport } from './pixel-helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
import { getPixelAdvanceFeaturesList } from './pixel-helpers'
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
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'
import FaqSection from './components/FaqSection'
import ReviewSection from '@/app/components/ReviewSection'
import AdminEditLink from '@/app/components/AdminEditLink'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'

export const revalidate = false

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllPixelSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) return {}

  const latestLog = await cachedGetLatestPrice(model.id)
  const priceRange = calculatePixelPriceRange(latestLog)
  const support = calculatePixelSupport(model)

  // 「相場」と書いている箇所は中央値。最安値は1点だけの特価であることが多く、
  // 相場として提示すると実際には見つけられない価格になる
  const priceText = priceRange.medianPrice
    ? `（¥${priceRange.medianPrice.toLocaleString()}前後）`
    : priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const chipText = model.cpu ? `${model.cpu}搭載` : ''
  const supportText = support.supportEnded
    ? 'アップデート保証は終了済み'
    : `Android・セキュリティ更新は${support.supportUntilDisplay}頃まで`

  const title = buildPixelPageTitle(model)
  const description = `${model.model}の中古相場${priceText}や${supportText}をもとに、今から中古で買うべきかを判定。${chipText ? chipText + 'の' : ''}ベンチマーク・カメラ・AI機能を比較しながら失敗しない選び方を解説します。`

  return {
    title,
    description,
    alternates: { canonical: `/pixel/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/pixel/${slug}/`,
      images: model.image ? [{ url: `/images/pixel/${model.image}`, width: 1200, height: 630, alt: `${model.model} の外観イメージ` }] : [],
    },
    twitter: {
      title,
      description,
      images: model.image ? [`/images/pixel/${model.image}`] : [],
    },
  }
}

export default async function PixelDetailPage({ params }: PageProps) {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) notFound()

  // 並列データ取得（pixel_reviews テーブルは存在しないため reviews は空固定）
  const [shops, rawShopLinks, priceLogs, latestPrice, allModels] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('pixel'),
    getPixelPriceLogsByModelId(model.id),
    cachedGetLatestPrice(model.id),
    getAllPixelModelsIncludingEnded(),
  ])

  // 描画しないショップ（プロディグ・Amazon整備済み品など）は
  // ここで落とす。渡すと RSC ペイロードに載るだけで表示はされない
  const shopLinks = forModelPage(rawShopLinks)
  const reviews: ProductReview[] = []

  // 「同じ予算で狙える他のモデル」用: iPhone / Pixel / Galaxy 横断の最新価格
  const PRICE_COLS = ['iosys_min', 'geo_min', 'janpara_min']
  // 他ブランドのイオシスリンクも必要（カードの「イオシスで見る」用）。
  // getAllProductShopLinksByType は revalidate 604800 の共通キャッシュなので追加負荷はない。
  const [iphoneModels, galaxyModels, iphoneShopLinks, galaxyShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllGalaxyModels(),
    getAllProductShopLinksByType('iphone'),
    getAllProductShopLinksByType('galaxy'),
  ])
  const [iphonePrices, pixelPrices, galaxyPrices] = await Promise.all([
    getLatestIPhonePriceLogsWithPricesForModels(iphoneModels.map((m) => m.id), PRICE_COLS),
    getLatestPixelPriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS),
    getLatestGalaxyPriceLogsWithPricesForModels(galaxyModels.map((m) => m.id), PRICE_COLS),
  ])
  const { basePrice, items: similarItems } = buildSimilarPriceItems(
    { brand: 'pixel', id: model.id },
    [
      { brand: 'pixel', brandLabel: 'Google Pixel', models: allModels, prices: pixelPrices, shopLinks },
      { brand: 'iphone', brandLabel: 'iPhone', models: iphoneModels, prices: iphonePrices, shopLinks: iphoneShopLinks },
      { brand: 'galaxy', brandLabel: 'Samsung Galaxy', models: galaxyModels, prices: galaxyPrices, shopLinks: galaxyShopLinks },
    ],
  )

  // PriceChartSection用のデータをサーバーサイドで事前計算（価格ログは現在空でも壊れない）
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
  const fallbackIosysUrl = iosysShop?.url || undefined

  const { dateStr, dateDisplay } = resolveLastUpdatedDate({
    preferredDateStr: latestPrice?.logged_at?.substring(0, 10),
    fallbackFilePath: 'app/(public)/pixel/[slug]/page.tsx',
  })

  const iosysModelLink = modelShopLinks.find((l) => l.shop_id === 1)

  return (
    <>
    <main>
      {iosysModelLink?.url && <StickyCtaOverride href={iosysModelLink.url} />}
      <AdminEditLink categoryKey="pixel" modelId={model.id} />
      <article>
        <HeroSection model={model} latestPrice={latestPrice} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={model} />
        <TableOfContents hasUpgrade={getPixelAdvanceFeaturesList(model).length > 0} hasReviews={false} hasSimilarPrice={basePrice != null && similarItems.length > 0} />
        <div className="l-sections">
        <PurchaseVerdict model={model} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={model} />
        <LifespanSection model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            category="pixel"
            latestMinMaxPairs={latestMinMaxPairs}
            priceStats={priceStats}
            inventoryInsight={inventoryInsight}
            latestDate={latestDate}
            storageNote={storageNote}
            priceListLink={{ href: '/pixel/price-info/', label: 'Google Pixelの中古相場一覧・価格推移' }}
          />
        )}

        {/* 価格推移とは別の話題（他機種への乗り換え検討）なので独立したセクションにする */}
        {basePrice != null && (
          <SimilarPriceModels modelName={model.model} basePrice={basePrice} items={similarItems} />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} fallbackIosysUrl={fallbackIosysUrl} specLinks={[{ href: '/pixel/pixel-spec-table/', label: '歴代Google Pixelスペック比較表' }]}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={model} allModels={allModels} />
        <BenchmarkAntutu model={model} allModels={allModels} />
        <ReviewSection modelName={model.model} reviews={reviews} />
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={modelShopLinks} />

        </div>
      </article>
    </main>
    <PixelArticleFooter
          pageUrl={`https://used-lab.jp/pixel/${model.slug}/`}
          pageTitle={buildPixelPageTitle(model)}
          excludeHref={`/pixel/${model.slug}/`}
          relatedHeading="Pixel選びのヒントになる記事"
          relatedDescription="Pixel選びをサポートする記事をまとめました。"
        />
    </>
  )
}
