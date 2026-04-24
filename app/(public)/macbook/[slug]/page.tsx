import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getMacBookModelBySlug,
  getAllMacBookSlugs,
  getAllMacBookModels,
  getShops,
  getAllProductShopLinksByType,
  getMacBookPriceLogsByModelId,
  getLatestMacBookPriceLog,
} from '@/lib/queries'
import { aggregateDailyPrices, filterLast3Months, calculateOSLifespan, calculatePriceRange } from '@/lib/utils/macbook-helpers'
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
import FaqSection from './components/FaqSection'
import MacBookArticleFooter from '@/app/components/macbook/MacBookArticleFooter'
import AdminEditLink from '@/app/components/AdminEditLink'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'
import { resolveLastUpdatedDate } from '@/lib/utils/shared-helpers'

export const revalidate = 86400

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

  const latestLog = await getLatestMacBookPriceLog(model.id)
  const priceRange = calculatePriceRange(latestLog)
  const osLife = calculateOSLifespan(model.date, model.last_macos)

  const priceText = priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const chipText = model.cpu ? `${model.cpu}搭載` : ''
  const osText = osLife.isSupported ? `macOSサポート見込み` : 'macOSサポート終了済み'

  const title = `中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`
  const description = `${model.model}の中古相場${priceText}や${osText}をもとに、今から中古で買うべきかを判定。${chipText ? chipText + 'の' : ''}Geekbenchスコア・拡張性を比較しながら失敗しない選び方を解説します。`

  return {
    title,
    description,
    alternates: { canonical: `/macbook/${slug}/` },
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
    getAllProductShopLinksByType('macbook'),
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
    mins: [l.min1_price, l.min2_price, l.min3_price, l.min4_price, l.min5_price].filter((v): v is number => v != null),
    maxes: [l.max1_price, l.max2_price, l.max3_price, l.max4_price, l.max5_price].filter((v): v is number => v != null),
  }))
  const storageNote = latestLogEntries[0]?.storage || ''
  const modelShopLinks = shopLinks.filter((l) => l.product_id === model.id)
  const iosysShop = shops.find((s) => s.id === 1)

  const { dateStr, dateDisplay } = resolveLastUpdatedDate({
    preferredDateStr: latestPrice?.logged_at?.substring(0, 10),
    fallbackFilePath: 'app/(public)/macbook/[slug]/page.tsx',
  })

  const iosysModelLink = modelShopLinks.find((l) => l.shop_id === 1)

  return (
    <>
    <main>
      {iosysModelLink?.url && <StickyCtaOverride href={iosysModelLink.url} />}
      <AdminEditLink categoryKey="macbook" modelId={model.id} />
      <article>
        <HeroSection model={model} latestPrice={latestPrice} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={model} latestPrice={latestPrice} />
        <TableOfContents />
        <div className="l-sections">
        <PurchaseVerdict model={model} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={model} />
        <LifespanSection model={model} />
        <BasicSpecs model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            latestMinMaxPairs={latestMinMaxPairs}
            latestDate={latestDate}
            storageNote={storageNote}
            priceListLink={{ href: '/macbook/price-info/', label: 'MacBookの中古相場一覧' }}
          />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} fallbackIosysUrl={iosysShop?.macbook_url || undefined} specLinks={[{ href: '/macbook/macbook-spec-table/', label: '歴代MacBookスペック比較表' }]}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={model} allModels={allModels} />
        <Accessories model={model} />
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={modelShopLinks} />
        </div>
      </article>
    </main>
    <MacBookArticleFooter pageUrl={`https://used-lab.jp/macbook/${model.slug}/`} pageTitle={`中古${model.model}は今買うべき？製品寿命、基本スペック、ベンチマークスコア、中古相場から解説`} excludeHref={[`/macbook/${model.slug}/`, "/macbook/recommend/"]} />
    </>
  )
}
