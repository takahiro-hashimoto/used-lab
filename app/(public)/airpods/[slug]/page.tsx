import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAirPodsModelBySlug,
  getAllAirPodsSlugs,
  getAllAirPodsModels,
  getShops,
  getAllProductShopLinksByType,
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
import AirPodsPopularSection from '@/app/components/support/popular/AirPodsPopularSection'
import FaqSection from './components/FaqSection'
import AirPodsRelatedLinks from '@/app/components/airpods/AirPodsRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import AdminEditLink from '@/app/components/AdminEditLink'
import AuthorByline from '@/app/components/AuthorByline'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'
import { resolveLastUpdatedDate } from '@/lib/utils/shared-helpers'

export const revalidate = 3600

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
  const title = `中古${displayName}は今買うべき？サポート期間、基本スペック、中古相場から解説`
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
  const model = await getAirPodsModelBySlug(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('airpods'),
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
            latestMinMaxPairs={latestMinMaxPairs}
            latestDate={latestDate}
            shopDescription="イオシス・じゃんぱら・eイヤホンの販売価格を定期的に集計したものです。実際の購入価格は在庫状況やタイミングにより変動する場合があります。"
           
          />
        )}

        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} fallbackIosysUrl={iosysShop?.airpods_url || undefined} displayName={displayName}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={modelShopLinks} />
        <AirPodsPopularSection />
        <AirPodsRelatedLinks excludeHref={`/airpods/${model.slug}/`} />
        <div className="l-section l-section--sm">
          <div className="l-container">
            <AuthorByline />
          </div>
        </div>
        <ShareBox url={`https://used-lab.jp/airpods/${model.slug}/`} text={`中古${model.name}（${model.model}）は今買うべき？サポート期間、基本スペック、中古相場から解説`} />
        </div>
      </article>
    </main>
  )
}
