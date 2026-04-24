import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getIPadModelBySlug,
  getAllIPadSlugs,
  getAllIPadModels,
  getShops,
  getAllProductShopLinksByType,
  getIPadPriceLogsByModelId,
  getLatestIPadPriceLog,
  getAllIPadAccessories,
  getAllIPadAccessoryCompatibility,
  getIPadReviewsBySlug,
} from '@/lib/queries'
import { aggregateDailyPrices, buildAccessoryLookup, getPencilTextFromAccessories, getKeyboardTextFromAccessories, calculateOSLifespan, calculatePriceRange } from '@/lib/utils/ipad-helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
import TableOfContents from './components/TableOfContents'
import PurchaseVerdict from './components/PurchaseVerdict'
import ShopGrid from './components/ShopGrid'
import LifespanSection from './components/LifespanSection'
import PriceChartSection from '@/app/components/PriceChartSection'
import PriceTrendPlaceholder from '@/app/components/PriceTrendPlaceholder'
import AdvanceFeatures from './components/AdvanceFeatures'
import CompareSection from '@/app/components/CompareSection'
import CompareSelector from './components/CompareSelector'
import BenchmarkGeekbench from './components/BenchmarkGeekbench'
import BenchmarkAntutu from './components/BenchmarkAntutu'
import FaqSection from './components/FaqSection'
import AccessorySection from './components/AccessorySection'
import ReviewSection from '@/app/components/ReviewSection'
import IPadArticleFooter from '@/app/components/ipad/IPadArticleFooter'
import AdminEditLink from '@/app/components/AdminEditLink'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'
import { resolveLastUpdatedDate } from '@/lib/utils/shared-helpers'

export const revalidate = 86400

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllIPadSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await getIPadModelBySlug(slug)
  if (!model) return {}

  const latestLog = await getLatestIPadPriceLog(model.id)
  const priceRange = calculatePriceRange(latestLog)
  const osLife = calculateOSLifespan(model.date, model.last_ipados)

  const priceText = priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const chipText = model.cpu ? `${model.cpu}搭載` : ''
  const osText = osLife.isSupported ? `iPadOSサポート見込み` : 'iPadOSサポート終了済み'

  const title = `中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`
  const description = `${model.model}の中古相場${priceText}や${osText}をもとに、今から中古で買うべきかを判定。${chipText ? chipText + 'の' : ''}ベンチマーク・描画性能・Apple Pencil対応を比較しながら失敗しない選び方を解説します。`

  return {
    title,
    description,
    alternates: { canonical: `/ipad/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/ipad/${slug}/`,
      images: model.image ? [{ url: `/images/ipad/${model.image}`, width: 1200, height: 630, alt: `${model.model} の外観イメージ` }] : [],
    },
    twitter: {
      title,
      description,
      images: model.image ? [`/images/ipad/${model.image}`] : [],
    },
  }
}

export default async function IPadDetailPage({ params }: PageProps) {
  const { slug } = await params
  const model = await getIPadModelBySlug(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels, allAccessories, allCompatibility, reviews] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('ipad'),
    getIPadPriceLogsByModelId(model.id),
    getLatestIPadPriceLog(model.id),
    getAllIPadModels(),
    getAllIPadAccessories(),
    getAllIPadAccessoryCompatibility(),
    getIPadReviewsBySlug(slug),
  ])
  const accessoryLookup = buildAccessoryLookup(allAccessories, allCompatibility)

  // pencil/keyboard をアクセサリテーブルから導出
  const enrichedModel = {
    ...model,
    pencil: getPencilTextFromAccessories(accessoryLookup.get(model.id) || []),
    keyboard: getKeyboardTextFromAccessories(accessoryLookup.get(model.id) || []),
  }
  const enrichedAllModels = allModels.map((m) => ({
    ...m,
    pencil: getPencilTextFromAccessories(accessoryLookup.get(m.id) || []),
    keyboard: getKeyboardTextFromAccessories(accessoryLookup.get(m.id) || []),
  }))

  // PriceChartSection用のデータをサーバーサイドで事前計算
  // aggregateDailyPrices内で直近90日に絞られるため、filterLast3Monthsは不要
  const dailyData = aggregateDailyPrices(priceLogs)
  const latestDate = priceLogs.length > 0 ? priceLogs[priceLogs.length - 1].logged_at : null
  const latestLogEntries = latestDate ? priceLogs.filter((l) => l.logged_at === latestDate) : []
  const latestMinMaxPairs = latestLogEntries.map((l) => ({
    mins: [l.iosys_min, l.geo_min, l.janpara_min].filter((v): v is number => v != null),
    maxes: [l.iosys_max, l.geo_max, l.janpara_max].filter((v): v is number => v != null),
  }))
  const storageNote = latestLogEntries[0]?.storage || ''
  const modelShopLinks = shopLinks.filter((l) => l.product_id === model.id)
  const iosysShop = shops.find((s) => s.id === 1)

  const { dateStr, dateDisplay } = resolveLastUpdatedDate({
    preferredDateStr: latestPrice?.logged_at?.substring(0, 10),
    fallbackFilePath: 'app/(public)/ipad/[slug]/page.tsx',
  })

  const iosysModelLink = modelShopLinks.find((l) => l.shop_id === 1)

  return (
    <>
    <main>
      {iosysModelLink?.url && <StickyCtaOverride href={iosysModelLink.url} />}
      <AdminEditLink categoryKey="ipad" modelId={model.id} />
      <article>
        <HeroSection model={enrichedModel} latestPrice={latestPrice} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={enrichedModel} latestPrice={latestPrice} />
        <TableOfContents />
        <div className="l-sections">
        <PurchaseVerdict model={enrichedModel} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={enrichedModel} />
        <LifespanSection model={enrichedModel} />

        {priceLogs.length > 0 ? (
          <PriceChartSection
            dailyData={dailyData}
            modelName={enrichedModel.model}
            latestMinMaxPairs={latestMinMaxPairs}
            latestDate={latestDate}
            storageNote={storageNote}
            priceListLink={{ href: '/ipad/ipad-price-info/', label: 'iPadの中古相場一覧・価格推移' }}
          />
        ) : (
          <PriceTrendPlaceholder modelName={enrichedModel.model} />
        )}

        <AdvanceFeatures model={enrichedModel} />
        <CompareSection model={enrichedModel} allModels={enrichedAllModels} shopLinks={shopLinks} fallbackIosysUrl={iosysShop?.ipad_url || undefined} specLinks={[{ href: '/ipad/ipad-spec-table/', label: '歴代iPadスペック比較表' }]}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={enrichedModel} allModels={enrichedAllModels} />
        <BenchmarkAntutu model={enrichedModel} allModels={enrichedAllModels} />
        <AccessorySection model={enrichedModel} accessories={accessoryLookup.get(model.id) || []} />
        <ReviewSection modelName={enrichedModel.model} reviews={reviews} />
        <FaqSection model={enrichedModel} latestPrice={latestPrice} shopLinks={modelShopLinks} />


</div>
      </article>
    </main>
    <IPadArticleFooter pageUrl={`https://used-lab.jp/ipad/${enrichedModel.slug}/`} pageTitle={`中古${enrichedModel.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`} excludeHref={`/ipad/${enrichedModel.slug}/`} />
    </>
  )
}
