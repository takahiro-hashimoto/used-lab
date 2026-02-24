import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getIPadModelBySlug,
  getAllIPadSlugs,
  getAllIPadModels,
  getShops,
  getProductShopLinks,
  getIPadPriceLogsByModelId,
  getLatestIPadPriceLog,
  getAllIPadAccessories,
  getAllIPadAccessoryCompatibility,
  getIPadReviewsBySlug,
} from '@/lib/queries'
import { aggregateDailyPrices, buildAccessoryLookup, getPencilTextFromAccessories, getKeyboardTextFromAccessories } from '@/lib/utils/ipad-helpers'
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
import RecommendBanner from './components/RecommendBanner'
import FaqSection from './components/FaqSection'
import AccessorySection from './components/AccessorySection'
import ReviewSection from '@/app/components/ReviewSection'
import ShareBox from '@/app/components/ShareBox'

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
  const title = `中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説 | ユーズドラボ`
  const description = `${model.model}の中古価格相場、ベンチマークスコア、スペック比較、おすすめショップ情報を徹底解説。`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/ipad/${slug}/`,
      images: model.image ? [{ url: `/images/ipad/${model.image}`, width: 360, height: 360, alt: `${model.model} の外観イメージ` }] : [],
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
    getProductShopLinks('ipad', model.id),
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

  return (
    <main>
      <article>
        <HeroSection model={enrichedModel} latestPrice={latestPrice} />
        <LeadText model={enrichedModel} />
        <TableOfContents />
        <PurchaseVerdict model={enrichedModel} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={shopLinks} model={enrichedModel} />
        <LifespanSection model={enrichedModel} />

        {priceLogs.length > 0 ? (
          <PriceChartSection
            dailyData={dailyData}
            modelName={enrichedModel.model}
            latestMinMaxPairs={latestMinMaxPairs}
            latestDate={latestDate}
            storageNote={storageNote}
          />
        ) : (
          <PriceTrendPlaceholder modelName={enrichedModel.model} />
        )}

        <AdvanceFeatures model={enrichedModel} />
        <CompareSection model={enrichedModel} allModels={enrichedAllModels} shopLinks={shopLinks}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={enrichedModel} allModels={enrichedAllModels} />
        <BenchmarkAntutu model={enrichedModel} allModels={enrichedAllModels} />
        <AccessorySection model={enrichedModel} accessories={accessoryLookup.get(model.id) || []} />
        <ReviewSection modelName={enrichedModel.model} reviews={reviews} />
        <RecommendBanner />
        <FaqSection model={enrichedModel} latestPrice={latestPrice} shopLinks={shopLinks} />
        <ShareBox url={`https://used-lab.com/ipad/${enrichedModel.slug}/`} text={`中古${enrichedModel.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`} bgSubtle />
      </article>
    </main>
  )
}
