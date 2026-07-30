import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import { cache } from 'react'
import {
  getAllAirPodsModelsIncludingEnded,
  getAllAirPodsPriceLogsByModelIds,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { AirPodsPriceLog } from '@/lib/types'
import { CHART_COLORS, FAQ_ITEMS } from '@/lib/data/airpods-price-info'
import { calcAvgFromShops, calcPriceStats, buildPageDates, buildDailyPrices, buildRankingData, buildPriceDropRanking, buildInitialSelected, type PriceEntry } from '@/lib/utils/price-info-helpers'
import { buildBreadcrumbJsonLd, buildWebApplicationJsonLd, buildDatasetJsonLd, buildFaqJsonLd } from '@/lib/utils/price-info-jsonld'
import { buildPriceInfoTitle, buildPriceInfoMetadata, PRICE_INFO_UPDATE_MONTH } from '@/lib/utils/price-info-meta'
import Breadcrumb from '@/app/components/Breadcrumb'
import AirPodsRelatedLinks from '@/app/components/airpods/AirPodsRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import dynamic from 'next/dynamic'

const DashboardSection = dynamic(() => import('./components/DashboardSection'), {
  loading: () => <div style={{ height: '400px' }} />,
})
import PriceDropSection from './components/PriceDropSection'
import RankingSection from './components/RankingSection'
import PriceHistorySection from './components/PriceHistorySection'
import AirPodsPopularSection from '@/app/components/support/popular/AirPodsPopularSection'
import FaqSection from './components/FaqSection'
import AuthorByline from '@/app/components/AuthorByline'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'
import { get90DaysAgo } from '@/lib/utils/shared-helpers'

// ============================================================
// 型定義
// ============================================================

export type ModelData = {
  id: number
  name: string
  slug: string
  chip: string
  year: string
  releaseDate: string
  type: string
  battery: string
  supportUntil: string
  supportEnded: boolean
  color: string
  image: string
  iosysUrl: string
  prices: PriceEntry[]
  currentPrice: number
  priceChange: number
  priceChangePercent: number
}

export type { PriceEntry }

// ============================================================
// ヘルパー関数
// ============================================================

function calcAvgPriceFromLog(log: AirPodsPriceLog): PriceEntry | null {
  const minPrices: number[] = []
  const maxPrices: number[] = []

  // AirPodsはイオシス・じゃんぱら・eイヤホンの3店舗
  if (log.iosys_min && log.iosys_min > 0) minPrices.push(log.iosys_min)
  if (log.janpara_min && log.janpara_min > 0) minPrices.push(log.janpara_min)
  if (log.eearphone_min && log.eearphone_min > 0) minPrices.push(log.eearphone_min)

  if (log.iosys_max && log.iosys_max > 0) maxPrices.push(log.iosys_max)
  if (log.janpara_max && log.janpara_max > 0) maxPrices.push(log.janpara_max)
  if (log.eearphone_max && log.eearphone_max > 0) maxPrices.push(log.eearphone_max)

  // 価格配列がある日は分布（中央値）で算出する。記録開始前の日は従来どおり最安・最高の中間値
  return calcAvgFromShops(minPrices, maxPrices, log.logged_at.substring(0, 10), [
    log.iosys_prices,
    log.janpara_prices,
    log.eearphone_prices,
  ])
}

function getModelSeries(name: string): string {
  if (name.includes('Max')) return 'Max'
  if (name.includes('Pro')) return 'Pro'
  return 'Standard'
}

function seriesOrder(series: string): number {
  const order: Record<string, number> = { Max: 1, Pro: 2, Standard: 3 }
  return order[series] ?? 4
}

// ============================================================
// ISR: 毎日再生成（86400秒 = 24時間）
// ============================================================

export const revalidate = false

// ============================================================
// メタデータ
// ============================================================

const PAGE_URL = 'https://used-lab.jp/airpods/price-info/'

const getModels = cache(getAllAirPodsModelsIncludingEnded)

export async function generateMetadata(): Promise<Metadata> {
  const allModels = await getModels()
  const modelCount = allModels.length
  const title = buildPriceInfoTitle('AirPods', modelCount, PRICE_INFO_UPDATE_MONTH)
  const description = `中古AirPods${modelCount}機種の相場・値段を毎日更新。AirPods Pro・AirPods 4など歴代モデルの価格推移グラフ・最安値一覧を掲載。`
  return buildPriceInfoMetadata({ title, description, canonicalPath: '/airpods/price-info/', heroImageUrl: getHeroImage('/airpods/price-info/') })
}

// ============================================================
// ページコンポーネント
// ============================================================

export default async function AirPodsPriceInfoPage() {
  const [allModels, allShopLinks] = await Promise.all([
    getModels(),
    getAllProductShopLinksByType('airpods'),
  ])

  const priceLogsMap = await getAllAirPodsPriceLogsByModelIds(allModels.map((m) => m.id), get90DaysAgo())

  // ショップURLの O(1) 参照用 Map (shop_id=1: iosys)
  const iosysUrlMap = new Map<number, string>()
  for (const l of allShopLinks) {
    if (l.shop_id === 1) iosysUrlMap.set(l.product_id, l.url)
  }

  let colorIndex = 0
  const modelsData: ModelData[] = []

  for (let i = 0; i < allModels.length; i++) {
    const model = allModels[i]
    const logs = priceLogsMap[model.id] || []

    const prices = buildDailyPrices(logs.map(calcAvgPriceFromLog))

    if (prices.length === 0) continue

    const { currentPrice, priceChange, priceChangePercent } = calcPriceStats(prices)

    const releaseYear = model.date ? model.date.split('/')[0] : ''
    const releaseMonth = model.date ? model.date.split('/')[1] : ''

    // ファームウェアサポート（リリース年+7年）
    const releaseYearNum = parseInt(releaseYear, 10)
    const endYear = releaseYearNum > 0 ? releaseYearNum + 7 : 0

    modelsData.push({
      id: model.id,
      name: model.name,
      slug: model.slug,
      chip: model.chip || '-',
      year: releaseYear,
      releaseDate: releaseYear && releaseMonth ? `${releaseYear}/${releaseMonth}` : '-',
      type: model.type || '-',
      battery: model.battery_earphone || '-',
      supportUntil: endYear > 0 ? `${endYear}年頃` : '-',
      supportEnded: endYear > 0 && endYear < new Date().getFullYear(),
      color: CHART_COLORS[colorIndex % CHART_COLORS.length],
      image: model.image || '',
      iosysUrl: iosysUrlMap.get(model.id) ?? '',
      prices,
      currentPrice,
      priceChange,
      priceChangePercent,
    })
    colorIndex++
  }

  const rankingData = buildRankingData(modelsData)
  const priceDropRanking = buildPriceDropRanking(modelsData)

  // シリーズグループ
  const seriesGroups: Record<string, number[]> = {
    Max: [],
    Pro: [],
    Standard: [],
  }
  for (const m of modelsData) {
    const series = getModelSeries(m.name)
    if (seriesGroups[series]) seriesGroups[series].push(m.id)
  }

  const initialSelected = buildInitialSelected(seriesGroups)

  // ソート済みモデル（シリーズ順→新しい年順）
  const sortedModels = [...modelsData].sort((a, b) => {
    const aOrder = seriesOrder(getModelSeries(a.name))
    const bOrder = seriesOrder(getModelSeries(b.name))
    if (aOrder !== bOrder) return aOrder - bOrder
    return parseInt(b.year) - parseInt(a.year)
  })

  const modelCount = modelsData.length
  const cheapestModel = rankingData[0]

  const { dateStr, dateDisplay, dateModified } = buildPageDates(modelsData)

  // JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd('中古AirPodsおすすめ機種・選び方ガイド', 'https://used-lab.jp/airpods/', 'AirPodsの中古相場一覧')
  const webAppJsonLd = buildWebApplicationJsonLd({
    name: '中古AirPods価格比較ダッシュボード',
    description: `中古AirPods${modelCount}機種の価格相場を毎日更新。価格推移グラフ、最安値ランキングを掲載。`,
    url: PAGE_URL,
    modelCount,
    lowestPrice: cheapestModel?.currentPrice ?? 0,
    highestPrice: rankingData[rankingData.length - 1]?.currentPrice ?? 0,
    dateModified,
  })
  const datasetJsonLd = buildDatasetJsonLd({
    productLabel: '中古AirPods',
    url: PAGE_URL,
    modelCount,
    lowestPrice: cheapestModel?.currentPrice ?? 0,
    highestPrice: rankingData[rankingData.length - 1]?.currentPrice ?? 0,
    dateModified,
  })
  const faqJsonLd = buildFaqJsonLd(FAQ_ITEMS)

  return (
    <main>
      <article itemScope itemType="https://schema.org/Article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="hero-wrapper">


        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古AirPodsおすすめ機種・選び方ガイド', href: '/airpods/' },
            { label: 'AirPodsの中古相場一覧' },
          ]}
        />

        {/* Hero */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title" itemProp="headline">
                中古AirPodsの相場・値段一覧【{PRICE_INFO_UPDATE_MONTH}】歴代{modelCount}機種の価格推移を毎日更新
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp showAuthor />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/airpods/price-info/')}
                  alt="中古AirPods価格相場"
                  className="hero-media__img"
                  width={360}
                  height={360}
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </figure>
            </div>
          </div>
        </header>
        </div>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>中古AirPods<strong>{modelCount}機種</strong>の価格相場を毎日更新でお届け。</p>
              <p>
                イオシス・じゃんぱら・eイヤホンの実売価格をもとに、価格推移グラフ・値下がりランキングなど、購入判断に役立つ情報をまとめました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link prefetch={false} href="/airpods/">中古AirPodsおすすめ機種・選び方ガイド</Link>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li>
                <a href="#pd-method" className="toc-item">
                  相場価格の算出方法 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pd-dashboard" className="toc-item">
                  中古相場と価格推移 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pd-price-drop" className="toc-item">
                  値下がりTOP10 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pd-ranking" className="toc-item">
                  価格ランキング <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pd-history" className="toc-item">
                  価格推移データ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pd-faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          </div>
        </nav>
        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">


          {/* 算出方法 */}
          <section className="l-section l-section--sm" id="pd-method">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg">中古AirPodsの相場価格 算出方法</h2>
              <p className="m-section-desc">独自に算出した相場価格のロジックを紹介します。</p>
              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <div className="m-card m-card--shadow m-card--padded post-check-item">
                  <p className="post-check-item__heading">
                    <i className="fa-solid fa-database" aria-hidden="true"></i>1. データ収集
                  </p>
                  <div className="media-card__desc m-rich-text">
                    <p>楽天ウェブサービス（楽天市場商品検索API）を利用し、イオシス・じゃんぱら・eイヤホン（いずれも楽天市場出店）の販売価格を毎日自動取得しています。</p>
                    <p>中古AirPodsの取引量が多い主要3ショップを対象とすることで、市場全体の価格動向を反映しています。</p>
                    <p className="pd-method-aside">※Amazonの価格は含まれておらず、Amazon商品の価格アラートも行っていません。</p>
                  </div>
                </div>
                <div className="m-card m-card--shadow m-card--padded post-check-item">
                  <p className="post-check-item__heading">
                    <i className="fa-solid fa-filter" aria-hidden="true"></i>2. 対象条件
                  </p>
                  <div className="media-card__desc m-rich-text">
                    <p>機種ごとの標準モデルを対象としています。</p>
                    <p>また、以下の商品は価格が大きく異なるため集計対象外です。</p>
                    <ul className="pd-method-exclude">
                      <li>新品・未使用品</li>
                      <li>バッテリー残量80％未満</li>
                      <li>画面割れ・ジャンクなど「難あり」商品</li>
                    </ul>
                  </div>
                </div>
                <div className="m-card m-card--shadow m-card--padded post-check-item">
                  <p className="post-check-item__heading">
                    <i className="fa-solid fa-chart-line" aria-hidden="true"></i>3. 相場価格の算出方法
                  </p>
                  <div className="media-card__desc m-rich-text">
                    <p>該当する販売中の商品をすべて集計し、その中央値を相場価格としています。最安値は1点だけの外れ値であることが多く、実際には見つけられない価格になりがちなためです。月別に表示している価格帯は、その期間に確認できた最安値〜最高値です。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <DashboardSection
            modelsData={modelsData}
            initialSelected={initialSelected}
          />

          {priceDropRanking.length > 0 && (
            <PriceDropSection items={priceDropRanking} dateDisplay={dateDisplay} />
          )}

          <RankingSection
            items={rankingData.slice(0, 10)}
            modelCount={modelCount}
            dateDisplay={dateDisplay}
          />

          <PriceHistorySection models={sortedModels} />

          <div className="deferred-render">
            <FaqSection />
          </div>
          <div className="deferred-render deferred-render--article-footer">
            <AirPodsPopularSection />
            <AirPodsRelatedLinks excludeHref="/airpods/price-info/" />
            <div className="l-section l-section--sm">
              <div className="l-container">
                <AuthorByline />
              </div>
            </div>
            <ShareBox url={PAGE_URL} text={`AirPodsの中古相場一覧 | 歴代${modelCount}機種の価格推移を独自集計`} />
          </div>
        </div>
      </article>
    </main>
  )
}
