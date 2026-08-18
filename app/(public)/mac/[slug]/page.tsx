import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { forModelPage } from '@/lib/data/shop-ids'
import {
  getMacModelBySlug,
  getAllMacSlugs,
  getAllMacModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getMacPriceLogsByModelId,
  getLatestMacPriceLogWithPrices,
} from '@/lib/queries'
import { aggregateDailyPrices, filterLast3Months, calculateOSLifespan, calculatePriceRange } from '@/lib/utils/macbook-helpers'
import HeroSection from './components/HeroSection'
import LeadText from './components/LeadText'
import { advanceFeaturesOf } from './components/AdvanceFeatures'
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
import FaqSection from './components/FaqSection'
import MacArticleFooter from '@/app/components/mac/MacArticleFooter'
import AdminEditLink from '@/app/components/AdminEditLink'
import StickyCtaOverride from '@/app/components/StickyCtaOverride'
import { resolveLastUpdatedDate } from '@/lib/utils/shared-helpers'
import { calculatePriceStats, buildInventoryInsight } from '@/lib/utils/price-stats'
import { hasModelImage } from '@/lib/generated/model-images'

const cachedGetModel = cache(getMacModelBySlug)
const cachedGetLatestPrice = cache(getLatestMacPriceLogWithPrices)

export const revalidate = false

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllMacSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await cachedGetModel(slug)
  if (!model) return {}

  const latestLog = await cachedGetLatestPrice(model.id)
  const priceRange = calculatePriceRange(latestLog)
  const osLife = calculateOSLifespan(model.date, model.last_macos)

  // 「相場」と書いている箇所は中央値。最安値は1点だけの特価であることが多く、
  // 相場として提示すると実際には見つけられない価格になる
  const priceText = priceRange.medianPrice
    ? `（¥${priceRange.medianPrice.toLocaleString()}前後）`
    : priceRange.minPrice ? `（¥${priceRange.minPrice.toLocaleString()}〜）` : ''
  const chipText = model.cpu ? `${model.cpu}搭載` : ''
  const osText = osLife.isSupported ? `macOSサポート見込み` : 'macOSサポート終了済み'

  const title = `中古${model.model}はいつまで使える？相場・製品寿命・スペックを解説`
  const description = `${model.model}の中古相場${priceText}や${osText}をもとに、今から中古で買うべきかを判定。${chipText ? chipText + 'の' : ''}Geekbenchスコア・拡張性を比較しながら失敗しない選び方を解説します。`

  return {
    title,
    description,
    alternates: { canonical: `/mac/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/mac/${slug}/`,
      images: model.image ? [{ url: `/images/mac/${model.image}`, width: 1200, height: 630, alt: `${model.model} の外観イメージ` }] : [],
    },
    twitter: {
      title,
      description,
      images: model.image ? [`/images/mac/${model.image}`] : [],
    },
  }
}

/**
 * 機種画像は public/images/mac/ に配置中。
 * 実ファイルが無いまま image を渡すと next/image が 500 を返すため、
 * 存在しないものは null にしてコンポーネント側のプレースホルダーへ倒す。
 * 画像を置けばコードを触らずに切り替わる。
 */
function withExistingImage<T extends { image: string | null }>(m: T): T {
  return m.image && !hasModelImage('mac', m.image) ? { ...m, image: null } : m
}

export default async function MacBookDetailPage({ params }: PageProps) {
  const { slug } = await params
  const rawModel = await cachedGetModel(slug)
  if (!rawModel) notFound()
  const model = withExistingImage(rawModel)

  // 並列データ取得
  const [shops, rawShopLinks, priceLogs, latestPrice, rawAllModels] = await Promise.all([
    getShops(),
    getAllProductShopLinksByType('mac'),
    getMacPriceLogsByModelId(rawModel.id),
    cachedGetLatestPrice(rawModel.id),
    getAllMacModelsIncludingEnded(),
  ])

  // 描画しないショップ（プロディグ・Amazon整備済み品など）は
  // ここで落とす。渡すと RSC ペイロードに載るだけで表示はされない
  const shopLinks = forModelPage(rawShopLinks)
  const allModels = rawAllModels.map(withExistingImage)

  // PriceChartSection用のデータをサーバーサイドで事前計算
  const recentLogs = filterLast3Months(priceLogs)
  const dailyData = aggregateDailyPrices(recentLogs)
  const latestPricedLog = [...priceLogs].reverse().find(
    (l) => l.min1_price != null || l.min2_price != null || l.min3_price != null || l.min4_price != null || l.min5_price != null
  )
  const latestDate = latestPricedLog?.logged_at ?? null
  const latestLogEntries = latestDate ? priceLogs.filter((l) => l.logged_at === latestDate) : []
  const latestMinMaxPairs = latestLogEntries.map((l) => ({
    mins: [l.min1_price, l.min2_price, l.min3_price, l.min4_price, l.min5_price].filter((v): v is number => v != null),
    maxes: [l.max1_price, l.max2_price, l.max3_price, l.max4_price, l.max5_price].filter((v): v is number => v != null),
  }))
  const storageNote = latestLogEntries[0]?.storage || ''
  // MacBookはショップ横断で検索するため、価格・件数は1本にまとまっている
  const priceStats = calculatePriceStats(latestLogEntries.map((l) => l.matched_prices))
  const macCounts = latestLogEntries
    .map((l) => l.matched_count)
    .filter((c): c is number => c != null)
  const inventoryInsight = buildInventoryInsight(
    macCounts.length > 0 ? macCounts.reduce((a, b) => a + b, 0) : null,
    model.date,
    new Date()
  )
  const modelShopLinks = shopLinks.filter((l) => l.product_id === model.id)
  const iosysShop = shops.find((s) => s.id === 1)

  const { dateStr, dateDisplay } = resolveLastUpdatedDate({
    preferredDateStr: latestPrice?.logged_at?.substring(0, 10),
    fallbackFilePath: 'app/(public)/mac/[slug]/page.tsx',
  })

  const iosysModelLink = modelShopLinks.find((l) => l.shop_id === 1)

  return (
    <>
    <main>
      {iosysModelLink?.url && <StickyCtaOverride href={iosysModelLink.url} />}
      <AdminEditLink categoryKey="mac" modelId={model.id} />
      <article>
        <HeroSection model={model} latestPrice={latestPrice} dateStr={dateStr} dateDisplay={dateDisplay} />
        <LeadText model={model} latestPrice={latestPrice} />
        {/* 描画されないセクションは目次からも外す（リンク切れ防止）。
            price-trend は価格ログが1件も無い機種で消える（例: 相場が未取得の Mac Studio 2023） */}
        <TableOfContents
          omitIds={[
            ...(advanceFeaturesOf(model).length > 0 ? [] : ['upgrade']),
            ...(priceLogs.length > 0 ? [] : ['price-trend']),
          ]}
        />
        <div className="l-sections">
        <PurchaseVerdict model={model} latestPrice={latestPrice} />
        <ShopGrid shops={shops} shopLinks={modelShopLinks} model={model} />
        <LifespanSection model={model} />
        <BasicSpecs model={model} />

        {priceLogs.length > 0 && (
          <PriceChartSection
            dailyData={dailyData}
            modelName={model.model}
            category="mac"
            latestMinMaxPairs={latestMinMaxPairs}
            priceStats={priceStats}
            inventoryInsight={inventoryInsight}
            latestDate={latestDate}
            storageNote={storageNote}
            priceListLink={{ href: '/mac/price-info/', label: 'iMac・Mac miniの中古相場一覧' }}
          />
        )}

        <AdvanceFeatures model={model} />
        <CompareSection model={model} allModels={allModels} shopLinks={shopLinks} fallbackIosysUrl={iosysShop?.mac_url ?? iosysShop?.macbook_url ?? undefined} specLinks={[{ href: '/mac/mac-spec-table/', label: '歴代iMac・Mac miniスペック比較表' }]}>
          {(props) => <CompareSelector {...props} />}
        </CompareSection>
        <BenchmarkGeekbench model={model} allModels={allModels} />
        {/* アクセサリー（accessory_case/film＝Amazonアフィリンク）は一時的に非表示（Amazonアソシエイト対応）。復活時はコメント解除 */}
        <FaqSection model={model} latestPrice={latestPrice} shopLinks={modelShopLinks} />
        </div>
      </article>
    </main>
    <MacArticleFooter pageUrl={`https://used-lab.jp/mac/${model.slug}/`} pageTitle={`中古${model.model}はいつまで使える？相場・製品寿命・スペックを解説`} excludeHref={[`/mac/${model.slug}/`, "/mac/"]} />
    </>
  )
}
