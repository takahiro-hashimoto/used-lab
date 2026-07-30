import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAirPodsModelBySlug,
  getAllAirPodsSlugs,
  getAllAirPodsModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getAirPodsPriceLogsByModelId,
  getLatestAirPodsPriceLogWithPrices,
} from '@/lib/queries'
import { aggregateDailyPrices } from '@/lib/utils/airpods-helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
import TableOfContents from './components/TableOfContents'
import PurchaseVerdict from './components/PurchaseVerdict'
import ShopGrid from './components/ShopGrid'
import LifespanSection from './components/LifespanSection'
import BasicSpecs from './components/BasicSpecs'
import PriceChartSection from '@/app/components/PriceChartSection'
import CompareSection from '@/app/components/CompareSection'
import CompareSelector from './components/CompareSelector'
import AirPodsPopularSection from '@/app/components/support/popular/AirPodsPopularSection'
import FaqSection from './components/FaqSection'
import AirPodsRelatedLinks from '@/app/components/airpods/AirPodsRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import AdminEditLink from '@/app/components/AdminEditLink'
import AuthorByline from '@/app/components/AuthorByline'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'
import { resolveLastUpdatedDate } from '@/lib/utils/shared-helpers'
import { calculatePriceStats, buildInventoryInsight } from '@/lib/utils/price-stats'

const cachedGetModel = cache(getAirPodsModelBySlug)

export const revalidate = false

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllAirPodsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) return {}
  const displayName = model.model ? `${model.name}（${model.model}）` : model.name
  const title = `中古${displayName}はいつまで使える？相場・製品寿命・スペックを解説`
  const description = `${displayName}の中古相場やスペックをもとに、今から中古で買うべきかを判定。音質・ノイズキャンセリング・バッテリーを比較しながら失敗しない選び方を解説します。`
  return {
    title,
    description,
    alternates: { canonical: `/airpods/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/airpods/${slug}/`,
      images: model.image ? [{ url: `/images/airpods/${model.image}`, width: 1200, height: 630, alt: `${displayName} の外観イメージ` }] : [],
    },
    twitter: {
      title,
      description,
      images: model.image ? [`/images/airpods/${model.image}`] : [],
    },
  }
}

export default async function AirPodsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('airpods'),
    getAirPodsPriceLogsByModelId(model.id),
    getLatestAirPodsPriceLogWithPrices(model.id),
    getAllAirPodsModelsIncludingEnded(),
  ])

  // PriceChartSection用のデータをサーバーサイドで事前計算
  // aggregateDailyPrices内で直近90日に絞られるため、filterLast3Monthsは不要
  const dailyData = aggregateDailyPrices(priceLogs)
  const latestPricedLog = [...priceLogs].reverse().find(
    (l) => l.iosys_min != null || l.janpara_min != null || l.eearphone_min != null
  )
  const latestDate = latestPricedLog?.logged_at ?? null
  const latestLogEntries = latestDate ? priceLogs.filter((l) => l.logged_at === latestDate) : []
  const latestMinMaxPairs = latestLogEntries.map((l) => ({
    mins: [l.iosys_min, l.janpara_min, l.eearphone_min].filter((v): v is number => v != null),
    maxes: [l.iosys_max, l.janpara_max, l.eearphone_max].filter((v): v is number => v != null),
  }))
  // 中央値ベースの相場と在庫の状況（2026-07-30 より前のログしかない場合は null）
  const priceStats = calculatePriceStats(
    latestLogEntries.flatMap((l) => [l.iosys_prices, l.janpara_prices, l.eearphone_prices])
  )
  const airpodsCounts = latestLogEntries
    .flatMap((l) => [l.iosys_count, l.janpara_count, l.eearphone_count])
    .filter((c): c is number => c != null)
  const inventoryInsight = buildInventoryInsight(
    airpodsCounts.length > 0 ? airpodsCounts.reduce((a, b) => a + b, 0) : null,
    model.date,
    new Date()
  )
  const displayName = model.model ? `${model.name}（${model.model}）` : model.name
  const modelShopLinks = shopLinks.filter((l) => l.product_id === model.id)
  const iosysShop = shops.find((s) => s.id === 1)

  const { dateStr, dateDisplay } = resolveLastUpdatedDate({
    preferredDateStr: latestPrice?.logged_at?.substring(0, 10),
    fallbackFilePath: 'app/(public)/airpods/[slug]/page.tsx',
  })

  const iosysModelLink = modelShopLinks.find((l) => l.shop_id === 1)

  return (
    <main>
      {iosysModelLink?.url && <StickyCtaOverride href={iosysModelLink.url} />}
      <AdminEditLink categoryKey="airpods" modelId={model.id} />
      <article>
        <HeroSection model={model} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={model} />
        <TableOfContents />
        <div className="l-sections">
        <PurchaseVerdict model={model} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={model} />
        <LifespanSection model={model} />
        <BasicSpecs model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={displayName}
            category="airpods"
            latestMinMaxPairs={latestMinMaxPairs}
            priceStats={priceStats}
            inventoryInsight={inventoryInsight}
            latestDate={latestDate}
          />
        )}

        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} fallbackIosysUrl={iosysShop?.airpods_url || undefined} displayName={displayName}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <div className="deferred-render">
          <FaqSection model={model} latestPrice={latestPrice} shopLinks={modelShopLinks} />
        </div>
        <div className="deferred-render deferred-render--article-footer">
          <AirPodsPopularSection />
          <AirPodsRelatedLinks excludeHref={`/airpods/${model.slug}/`} />
          <div className="l-section l-section--sm">
            <div className="l-container">
              <AuthorByline />
            </div>
          </div>
          <ShareBox url={`https://used-lab.jp/airpods/${model.slug}/`} text={`中古${model.name}（${model.model}）はいつまで使える？相場・製品寿命・スペックを解説`} />
        </div>
        </div>
      </article>
    </main>
  )
}
