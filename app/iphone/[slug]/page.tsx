import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getIPhoneModelBySlug,
  getAllIPhoneSlugs,
  getAllIPhoneModels,
  getShops,
  getProductShopLinks,
  getPriceLogsByModelId,
  getLatestPriceLog,
} from '@/lib/queries'
import { aggregateDailyPrices, filterLast3Months } from '@/lib/utils/iphone-helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
import TableOfContents from './components/TableOfContents'
import PurchaseVerdict from './components/PurchaseVerdict'
import ShopGrid from './components/ShopGrid'
import LifespanSection from './components/LifespanSection'
import PriceChartSection from './components/PriceChartSection'
import AdvanceFeatures from './components/AdvanceFeatures'
import CompareSection from './components/CompareSection'
import BenchmarkGeekbench from './components/BenchmarkGeekbench'
import BenchmarkAntutu from './components/BenchmarkAntutu'
import RecommendBanner from './components/RecommendBanner'
import FaqSection from './components/FaqSection'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllIPhoneSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await getIPhoneModelBySlug(slug)
  if (!model) return {}
  return {
    title: `中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説 | ユーズドラボ`,
    description: `${model.model}の中古価格相場、ベンチマークスコア、スペック比較、おすすめショップ情報を徹底解説。`,
  }
}

export default async function IPhoneDetailPage({ params }: PageProps) {
  const { slug } = await params
  const model = await getIPhoneModelBySlug(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels] = await Promise.all([
    getShops(),
    getProductShopLinks('iphone', model.id),
    getPriceLogsByModelId(model.id),
    getLatestPriceLog(model.id),
    getAllIPhoneModels(),
  ])

  // PriceChartSection用のデータをサーバーサイドで事前計算
  const recentLogs = filterLast3Months(priceLogs)
  const dailyData = aggregateDailyPrices(recentLogs)
  const latestDate = priceLogs.length > 0 ? priceLogs[priceLogs.length - 1].logged_at : null
  const latestLogs = latestDate
    ? priceLogs
        .filter((l) => l.logged_at === latestDate)
        .map((l) => ({
          storage: l.storage,
          iosys_min: l.iosys_min,
          iosys_max: l.iosys_max,
          geo_min: l.geo_min,
          geo_max: l.geo_max,
          janpara_min: l.janpara_min,
          janpara_max: l.janpara_max,
        }))
    : []


  return (
    <main>
      <article>
        <HeroSection model={model} latestPrice={latestPrice} />
        <LeadText model={model} />
        <TableOfContents />
        <PurchaseVerdict model={model} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={shopLinks} model={model} />
        <LifespanSection model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            latestLogs={latestLogs}
            latestDate={latestDate}
          />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} />
        <BenchmarkGeekbench model={model} allModels={allModels} />
        <BenchmarkAntutu model={model} allModels={allModels} />
        <RecommendBanner />
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={shopLinks} />
      </article>
    </main>
  )
}
