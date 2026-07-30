import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getIPhoneModelBySlug,
  getAllIPhoneSlugs,
  getAllIPhoneModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getPriceLogsByModelId,
  getLatestIPhonePriceLogWithPrices,
  getLatestIPhonePriceLogsWithPricesForModels,
  getIPhoneReviewsBySlug,
} from '@/lib/queries'
import SimilarPriceModels from '@/app/components/model/SimilarPriceModels'
import { buildSimilarPriceItems } from '@/lib/utils/similar-price'

const cachedGetModel = cache(getIPhoneModelBySlug)
const cachedGetLatestPrice = cache(getLatestIPhonePriceLogWithPrices)
import { aggregateDailyPrices, filterLast3Months, calculateOSLifespan, calculatePriceRange, buildIPhonePageTitle } from '@/lib/utils/iphone-helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
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
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'
import FaqSection from './components/FaqSection'
import ReviewSection from '@/app/components/ReviewSection'
import AdminEditLink from '@/app/components/AdminEditLink'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'
import { resolveLastUpdatedDate, buildStandardPriceChartData } from '@/lib/utils/shared-helpers'
import { buildInventoryInsight } from '@/lib/utils/price-stats'

export const revalidate = false

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllIPhoneSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) return {}

  const latestLog = await cachedGetLatestPrice(model.id)
  const priceRange = calculatePriceRange(latestLog)
  const osLife = calculateOSLifespan(model.date, model.last_ios)

  // 動的に価格・チップ・サポート年数を埋め込む
  // 「相場」と書いている箇所は中央値。最安値は1点だけの特価であることが多く、
  // 相場として提示すると実際には見つけられない価格になる
  const priceText = priceRange.medianPrice
    ? `（¥${priceRange.medianPrice.toLocaleString()}前後）`
    : priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const chipText = model.cpu ? `${model.cpu}搭載` : ''
  const osText = osLife.isSupported ? `iOSサポート見込み` : 'iOSサポート終了済み'

  const title = buildIPhonePageTitle(model)
  const description = `${model.model}の中古相場${priceText}や${osText}をもとに、今から中古で買うべきかを判定。${chipText ? chipText + 'の' : ''}ベンチマーク・カメラ・バッテリーを比較しながら失敗しない選び方を解説します。`

  return {
    title,
    description,
    alternates: { canonical: `/iphone/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/iphone/${slug}/`,
      images: model.image ? [{ url: `/images/iphone/${model.image}`, width: 1200, height: 630, alt: `${model.model} の外観イメージ` }] : [],
    },
    twitter: {
      title,
      description,
      images: model.image ? [`/images/iphone/${model.image}`] : [],
    },
  }
}

export default async function IPhoneDetailPage({ params }: PageProps) {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels, reviews] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('iphone'),
    getPriceLogsByModelId(model.id),
    cachedGetLatestPrice(model.id),
    getAllIPhoneModelsIncludingEnded(),
    getIPhoneReviewsBySlug(slug),
  ])

  // 「同じ予算で狙える他のモデル」用の最新価格
  // TODO(Pixel/Galaxy公開時): Pixel/Galaxy を横断対象に戻す。
  // 未公開カテゴリの機種名とリンクが本番に出てしまうため、現在は iPhone のみ。
  const PRICE_COLS = ['iosys_min', 'geo_min', 'janpara_min']
  const iphonePrices = await getLatestIPhonePriceLogsWithPricesForModels(
    allModels.map((m) => m.id),
    PRICE_COLS,
  )

  // PriceChartSection用のデータをサーバーサイドで事前計算
  const recentLogs = filterLast3Months(priceLogs)
  const dailyData = aggregateDailyPrices(recentLogs)
  const { latestDate, latestMinMaxPairs, storageNote, priceStats, totalCount } = buildStandardPriceChartData(priceLogs)
  // 流通量から在庫の状況を組み立てる（件数の記録がない過去分では null）
  const inventoryInsight = buildInventoryInsight(totalCount, model.date, new Date())
  const modelShopLinks = shopLinks.filter((l) => l.product_id === model.id)
  const iosysShop = shops.find((s) => s.id === 1)
  const fallbackIosysUrl = iosysShop?.url || undefined

  // 基準機種の相場に近いモデルをブランド横断で抽出（価格が動けば並びも自動で変わる）
  const { basePrice, items: similarItems } = buildSimilarPriceItems(
    { brand: 'iphone', id: model.id },
    [
      { brand: 'iphone', brandLabel: 'iPhone', models: allModels, prices: iphonePrices, shopLinks },
    ],
  )

  const { dateStr, dateDisplay } = resolveLastUpdatedDate({
    preferredDateStr: latestPrice?.logged_at?.substring(0, 10),
    fallbackFilePath: 'app/(public)/iphone/[slug]/page.tsx',
  })

  const iosysModelLink = modelShopLinks.find((l) => l.shop_id === 1)

  return (
    <>
    <main>
      {iosysModelLink?.url && <StickyCtaOverride href={iosysModelLink.url} />}
      <AdminEditLink categoryKey="iphone" modelId={model.id} />
      <article>
        <HeroSection model={model} latestPrice={latestPrice} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={model} />
        <TableOfContents hasReviews={reviews.length > 0} hasSimilarPrice={basePrice != null && similarItems.length > 0} />
        <div className="l-sections">
        <PurchaseVerdict model={model} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={model} />
        <LifespanSection model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            category="iphone"
            latestMinMaxPairs={latestMinMaxPairs}
            priceStats={priceStats}
            inventoryInsight={inventoryInsight}
            latestDate={latestDate}
            storageNote={storageNote}
            priceListLink={{ href: '/iphone/price-info/', label: 'iPhoneの中古相場一覧・価格推移' }}
          />
        )}

        {/* 価格推移とは別の話題（他機種への乗り換え検討）なので独立したセクションにする */}
        {basePrice != null && (
          <SimilarPriceModels modelName={model.model} basePrice={basePrice} items={similarItems} />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} fallbackIosysUrl={fallbackIosysUrl} specLinks={[{ href: '/iphone/iphone-spec-table/', label: '歴代iPhoneスペック比較表' }]}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={model} allModels={allModels} />
        <BenchmarkAntutu model={model} allModels={allModels} />
        <ReviewSection modelName={model.model} reviews={reviews} />
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={modelShopLinks} />

        </div>
      </article>
    </main>
    <IPhoneArticleFooter
          pageUrl={`https://used-lab.jp/iphone/${model.slug}/`}
          pageTitle={buildIPhonePageTitle(model)}
          excludeHref={`/iphone/${model.slug}/`}
          relatedHeading="iPhone選びのヒントになる記事"
          relatedDescription="iPhone選びをサポートする記事をまとめました。"
        />
    </>
  )
}
