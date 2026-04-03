import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getWatchModelBySlug,
  getAllWatchSlugs,
  getAllWatchModels,
  getShops,
  getAllProductShopLinksByType,
  getWatchPriceLogsByModelId,
  getLatestWatchPriceLog,
} from '@/lib/queries'
import { aggregateDailyPrices, calculateOSLifespan, calculatePriceRange } from '@/lib/utils/watch-helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
import TableOfContents from './components/TableOfContents'
import PurchaseVerdict from './components/PurchaseVerdict'
import ShopGrid from './components/ShopGrid'
import LifespanSection from './components/LifespanSection'
import BasicSpecs from './components/BasicSpecs'
import PriceChartSection from '@/app/components/PriceChartSection'
import PriceTrendPlaceholder from '@/app/components/PriceTrendPlaceholder'
import AdvanceFeatures from './components/AdvanceFeatures'
import CompareSection from '@/app/components/CompareSection'
import CompareSelector from './components/CompareSelector'
import Accessories from './components/Accessories'
import PopularSection from '@/app/components/support/PopularSection'
import FaqSection from './components/FaqSection'
import WatchRelatedLinks from '@/app/components/watch/WatchRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import AdminEditLink from '@/app/components/AdminEditLink'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'

export const revalidate = 3600

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllWatchSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await getWatchModelBySlug(slug)
  if (!model) return {}

  const latestLog = await getLatestWatchPriceLog(model.id)
  const priceRange = calculatePriceRange(latestLog)
  const osLife = calculateOSLifespan(model.date)

  const priceText = priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const sizeText = model.size ? `${model.size}` : ''
  const osText = osLife.isSupported ? `watchOSサポート見込み` : 'watchOSサポート終了済み'

  const title = `中古${model.model} レビュー｜スペック・価格相場・いつまで使える？`
  const description = `${model.model}の中古相場${priceText}や${osText}をもとに、今から中古で買うべきかを判定。${sizeText ? sizeText + '・' : ''}健康機能・バッテリー持ちを比較しながら失敗しない選び方を解説します。`

  return {
    title,
    description,
    alternates: { canonical: `/watch/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/watch/${slug}/`,
      images: model.image ? [{ url: `/images/watch/${model.image}`, width: 1200, height: 630, alt: `${model.model} の外観イメージ` }] : [],
    },
    twitter: {
      title,
      description,
      images: model.image ? [`/images/watch/${model.image}`] : [],
    },
  }
}

export default async function WatchDetailPage({ params }: PageProps) {
  const { slug } = await params
  const model = await getWatchModelBySlug(slug)
  if (!model) notFound()

  // 並列データ取得
  const [shops, shopLinks, priceLogs, latestPrice, allModels] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('watch'),
    getWatchPriceLogsByModelId(model.id),
    getLatestWatchPriceLog(model.id),
    getAllWatchModels(),
  ])

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

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  const iosysModelLink = modelShopLinks.find((l) => l.shop_id === 1)

  return (
    <main>
      {iosysModelLink?.url && <StickyCtaOverride href={iosysModelLink.url} />}
      <AdminEditLink categoryKey="watch" modelId={model.id} />
      <article>
        <HeroSection model={model} latestPrice={latestPrice} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={model} latestPrice={latestPrice} />
        <TableOfContents />
        <div className="l-sections">
        <PurchaseVerdict model={model} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={model} />
        <LifespanSection model={model} />
        <BasicSpecs model={model} />

        {priceLogs.length > 0 ? (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            latestMinMaxPairs={latestMinMaxPairs}
            latestDate={latestDate}
            storageNote={storageNote}
            priceListLink={{ href: '/watch/watch-price-info/', label: 'Apple Watchの中古相場一覧・価格推移' }}
          />
        ) : (
          <PriceTrendPlaceholder modelName={model.model} />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} fallbackIosysUrl={iosysShop?.watch_url || undefined} specLinks={[{ href: '/watch/watch-spec-table/', label: '歴代Apple Watchスペック比較表' }]}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <Accessories model={model} />
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={modelShopLinks} />
        <PopularSection
          sectionTitle="目的別に人気の中古Apple Watch"
          sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
          imageSrc="/images/content/thumbnail/watch-image-08.jpg"
          imageAlt="中古Apple Watchおすすめ3選のイメージ画像"
          subtitle="目的別におすすめ機種を厳選！"
          cardTitle="中古Apple Watchおすすめ3選"
          cardDescription="健康管理を重視する人向け、コスパ重視の人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
          buttonText="おすすめ3機種を見る"
          buttonHref="/watch/recommend/"
          secondaryButtonText="イオシスで中古Apple Watchを探す"
          secondaryButtonHref="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fwearable%2Fapple%3Fnot%3Dpencil"
        />
        <WatchRelatedLinks excludeHref={[`/watch/${model.slug}/`, "/watch/recommend/"]} />
        <ShareBox url={`https://used-lab.jp/watch/${model.slug}/`} text={`中古${model.model}は今買うべき？製品寿命、基本スペック、中古相場から解説`} />
        </div>
      </article>
    </main>
  )
}
