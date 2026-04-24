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
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'
import FaqSection from './components/FaqSection'
import ReviewSection from '@/app/components/ReviewSection'
import AdminEditLink from '@/app/components/AdminEditLink'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'
import { getCompareLinksForModel } from '@/app/(public)/iphone/_compare/config'
import { resolveLastUpdatedDate } from '@/lib/utils/shared-helpers'

export const revalidate = 3600

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
  const osLife = calculateOSLifespan(model.date, model.last_ios)

  // 動的に価格・チップ・サポート年数を埋め込む
  const priceText = priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const chipText = model.cpu ? `${model.cpu}搭載` : ''
  const osText = osLife.isSupported ? `iOSサポート見込み` : 'iOSサポート終了済み'

  const title = `中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`
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
  const iosysShop = shops.find((s) => s.id === 1)
  const fallbackIosysUrl = iosysShop?.url || undefined

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
        <TableOfContents hasReviews={reviews.length > 0} />
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
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} compareLinks={getCompareLinksForModel(model.slug)} fallbackIosysUrl={fallbackIosysUrl} specLinks={[{ href: '/iphone/iphone-spec-table/', label: '歴代iPhoneスペック比較表' }]}>
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
          pageTitle={`中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`}
          excludeHref={`/iphone/${model.slug}/`}
          relatedHeading="iPhone選びのヒントになる記事"
          relatedDescription="iPhone選びをサポートする記事をまとめました。"
        />
    </>
  )
}
