import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getIPhoneModelBySlug,
  getAllIPhoneSlugs,
  getAllIPhoneModels,
  getShops,
  getAllProductShopLinksByType,
  getPriceLogsByModelId,
  getLatestPriceLog,
  getIPhoneReviewsBySlug,
} from '@/lib/queries'
import { aggregateDailyPrices, filterLast3Months, calculateOSLifespan, calculatePriceRange } from '@/lib/utils/iphone-helpers'
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
import RelatedArticles from './components/RelatedArticles'
import FaqSection from './components/FaqSection'
import ReviewSection from '@/app/components/ReviewSection'
import ShareBox from '@/app/components/ShareBox'
import AdminEditLink from '@/app/components/AdminEditLink'

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

  const latestLog = await getLatestPriceLog(model.id)
  const priceRange = calculatePriceRange(latestLog)
  const osLife = calculateOSLifespan(model.date)

  // 動的に価格・チップ・サポート年数を埋め込む
  const priceText = priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const chipText = model.cpu ? `${model.cpu}搭載` : ''
  const osText = osLife.isSupported ? `iOSサポート見込み` : 'iOSサポート終了済み'

  const title = `中古${model.model} レビュー｜スペック・価格相場・いつまで使える？`
  const description = `${model.model}の中古相場${priceText}や${osText}をもとに、今から中古で買うべきかを判定。${chipText ? chipText + 'の' : ''}ベンチマーク・カメラ・バッテリーを比較しながら失敗しない選び方を解説します。`

  return {
    title,
    description,
    alternates: { canonical: `/iphone/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/iphone/${slug}/`,
      images: model.image ? [{ url: `/images/iphone/${model.image}`, width: 360, height: 360, alt: `${model.model} の外観イメージ` }] : [],
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
  const model = await getIPhoneModelBySlug(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels, reviews] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('iphone'),
    getPriceLogsByModelId(model.id),
    getLatestPriceLog(model.id),
    getAllIPhoneModels(),
    getIPhoneReviewsBySlug(slug),
  ])

  // PriceChartSection用のデータをサーバーサイドで事前計算
  const recentLogs = filterLast3Months(priceLogs)
  const dailyData = aggregateDailyPrices(recentLogs)
  const latestDate = priceLogs.length > 0 ? priceLogs[priceLogs.length - 1].logged_at : null
  const latestLogEntries = latestDate
    ? priceLogs.filter((l) => l.logged_at === latestDate)
    : []
  const latestMinMaxPairs = latestLogEntries.map((l) => ({
    mins: [l.iosys_min, l.geo_min, l.janpara_min].filter((v): v is number => v != null),
    maxes: [l.iosys_max, l.geo_max, l.janpara_max].filter((v): v is number => v != null),
  }))
  const storageNote = latestLogEntries[0]?.storage || ''
  const modelShopLinks = shopLinks.filter((l) => l.product_id === model.id)


  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <main>
      <AdminEditLink categoryKey="iphone" modelId={model.id} />
      <article>
        <HeroSection model={model} latestPrice={latestPrice} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={model} latestPrice={latestPrice} />
        <TableOfContents />
        <div className="l-sections">
        <PurchaseVerdict model={model} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={model} />
        <LifespanSection model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            latestMinMaxPairs={latestMinMaxPairs}
            latestDate={latestDate}
            storageNote={storageNote}
            priceListLink={{ href: '/iphone/price-info/', label: 'iPhoneの中古相場一覧・価格推移' }}
          />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} specLinks={[{ href: '/iphone/iphone-spec-table/', label: '歴代iPhoneスペック比較表' }]}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={model} allModels={allModels} />
        <BenchmarkAntutu model={model} allModels={allModels} />
        <ReviewSection modelName={model.model} reviews={reviews} />
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={modelShopLinks} />
        <RelatedArticles model={model} />
        <ShareBox url={`https://used-lab.com/iphone/${model.slug}/`} text={`中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`} />
        </div>
      </article>
    </main>
  )
}
