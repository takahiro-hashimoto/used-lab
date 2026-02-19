import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getMacBookModelBySlug,
  getAllMacBookSlugs,
  getAllMacBookModels,
  getShops,
  getProductShopLinks,
  getMacBookPriceLogsByModelId,
  getLatestMacBookPriceLog,
} from '@/lib/queries'
import { aggregateDailyPrices, filterLast3Months } from '@/lib/utils/macbook-helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
import TableOfContents from './components/TableOfContents'
import PurchaseVerdict from './components/PurchaseVerdict'
import ShopGrid from './components/ShopGrid'
import LifespanSection from './components/LifespanSection'
import BasicSpecs from './components/BasicSpecs'
import PriceChartSection from '@/app/components/PriceChartSection'
import AdvanceFeatures from './components/AdvanceFeatures'
import CompareSection from '@/app/components/CompareSection'
import CompareSelector from './components/CompareSelector'
import BenchmarkGeekbench from './components/BenchmarkGeekbench'
import Accessories from './components/Accessories'
import RecommendBanner from './components/RecommendBanner'
import FaqSection from './components/FaqSection'
import ShareBox from '@/app/components/ShareBox'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllMacBookSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await getMacBookModelBySlug(slug)
  if (!model) return {}
  const title = `中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説 | ユーズドラボ`
  const description = `${model.model}の中古価格相場、ベンチマークスコア、スペック比較、おすすめショップ情報を徹底解説。`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/macbook/${slug}/`,
      images: model.image ? [{ url: `/images/macbook/${model.image}`, width: 480, height: 320, alt: `${model.model} の外観イメージ` }] : [],
    },
    twitter: {
      title,
      description,
      images: model.image ? [`/images/macbook/${model.image}`] : [],
    },
  }
}

export default async function MacBookDetailPage({ params }: PageProps) {
  const { slug } = await params
  const model = await getMacBookModelBySlug(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels] = await Promise.all([
    getShops(),
    getProductShopLinks('macbook', model.id),
    getMacBookPriceLogsByModelId(model.id),
    getLatestMacBookPriceLog(model.id),
    getAllMacBookModels(),
  ])

  // PriceChartSection用のデータをサーバーサイドで事前計算
  const recentLogs = filterLast3Months(priceLogs)
  const dailyData = aggregateDailyPrices(recentLogs)
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
        <HeroSection model={model} latestPrice={latestPrice} />
        <LeadText model={model} />
        <TableOfContents />
        <PurchaseVerdict model={model} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={shopLinks} model={model} />
        <LifespanSection model={model} />
        <BasicSpecs model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            latestMinMaxPairs={latestMinMaxPairs}
            latestDate={latestDate}
            storageNote={storageNote}
          />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={model} allModels={allModels} />
        <Accessories model={model} />
        <RecommendBanner />
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={shopLinks} />
        <ShareBox url={`https://used-lab.com/macbook/${model.slug}/`} text={`中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`} bgSubtle />
      </article>
    </main>
  )
}
