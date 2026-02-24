import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAirPodsModelBySlug,
  getAllAirPodsSlugs,
  getAllAirPodsModels,
  getShops,
  getProductShopLinks,
  getAirPodsPriceLogsByModelId,
  getLatestAirPodsPriceLog,
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
import RecommendBanner from './components/RecommendBanner'
import FaqSection from './components/FaqSection'
import ShareBox from '@/app/components/ShareBox'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllAirPodsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await getAirPodsModelBySlug(slug)
  if (!model) return {}
  const displayName = model.model ? `${model.name}（${model.model}）` : model.name
  const title = `中古${displayName}は今買うべき？サポート期間、基本スペック、中古相場から解説 | ユーズドラボ`
  const description = `${displayName}の中古価格相場、スペック比較、おすすめショップ情報を徹底解説。`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/airpods/${slug}/`,
      images: model.image ? [{ url: `/images/airpods/${model.image}`, width: 360, height: 360, alt: `${displayName} の外観イメージ` }] : [],
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
  const model = await getAirPodsModelBySlug(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels] = await Promise.all([
    getShops(),
    getProductShopLinks('airpods', model.id),
    getAirPodsPriceLogsByModelId(model.id),
    getLatestAirPodsPriceLog(model.id),
    getAllAirPodsModels(),
  ])

  // PriceChartSection用のデータをサーバーサイドで事前計算
  // aggregateDailyPrices内で直近90日に絞られるため、filterLast3Monthsは不要
  const dailyData = aggregateDailyPrices(priceLogs)
  const latestDate = priceLogs.length > 0 ? priceLogs[priceLogs.length - 1].logged_at : null
  const latestLogEntries = latestDate ? priceLogs.filter((l) => l.logged_at === latestDate) : []
  const latestMinMaxPairs = latestLogEntries.map((l) => ({
    mins: [l.iosys_min, l.janpara_min, l.eearphone_min].filter((v): v is number => v != null),
    maxes: [l.iosys_max, l.janpara_max, l.eearphone_max].filter((v): v is number => v != null),
  }))
  const displayName = model.model ? `${model.name}（${model.model}）` : model.name

  return (
    <main>
      <article>
        <HeroSection model={model} />
        <LeadText model={model} />
        <TableOfContents />
        <PurchaseVerdict model={model} />
        <ShopGrid shops={shops} shopLinks={shopLinks} model={model} />
        <LifespanSection model={model} />
        <BasicSpecs model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={displayName}
            latestMinMaxPairs={latestMinMaxPairs}
            latestDate={latestDate}
            shopDescription="イオシス・じゃんぱら・eイヤホンの販売価格を定期的に集計したものです。実際の購入価格は在庫状況やタイミングにより変動する場合があります。"
            bgSubtle
          />
        )}

        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} displayName={displayName}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <RecommendBanner />
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={shopLinks} />
        <ShareBox url={`https://used-lab.com/airpods/${model.slug}/`} text={`中古${model.name}（${model.model}）は今買うべき？サポート期間、基本スペック、中古相場から解説`} bgSubtle />
      </article>
    </main>
  )
}
