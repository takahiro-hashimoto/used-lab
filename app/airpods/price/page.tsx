import type { Metadata } from 'next'
import {
  getAllAirPodsModels,
  getAirPodsPriceLogsByModelId,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { AirPodsModel, AirPodsPriceLog, ProductShopLink } from '@/lib/types'
import { filterLast3Months } from '@/lib/utils/shared-helpers'
import { PRICE_INFO_UPDATE_MONTH, CHART_COLORS, FAQ_ITEMS } from '@/lib/data/airpods-price-info'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import DashboardSection from './components/DashboardSection'
import PriceDropSection from './components/PriceDropSection'
import RankingSection from './components/RankingSection'
import PriceHistorySection from './components/PriceHistorySection'
import RecommendBanner from '@/app/airpods/[slug]/components/RecommendBanner'
import FaqSection from './components/FaqSection'

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
  color: string
  image: string
  iosysUrl: string
  prices: PriceEntry[]
  currentPrice: number
  priceChange: number
  priceChangePercent: number
}

export type PriceEntry = {
  date: string
  min: number
  max: number
  avg: number
}

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

  if (minPrices.length === 0 || maxPrices.length === 0) return null

  const avgMin = Math.round(minPrices.reduce((a, b) => a + b, 0) / minPrices.length / 100) * 100
  const avgMax = Math.round(maxPrices.reduce((a, b) => a + b, 0) / maxPrices.length / 100) * 100
  const avg = Math.round((avgMin + avgMax) / 2 / 100) * 100

  return { date: log.logged_at.substring(0, 10), min: avgMin, max: avgMax, avg }
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

export const revalidate = 86400

// ============================================================
// メタデータ
// ============================================================

const PAGE_URL = 'https://used-lab.com/airpods/price/'

export async function generateMetadata(): Promise<Metadata> {
  const allModels = await getAllAirPodsModels()
  const modelCount = allModels.length
  const title = `AirPodsの中古相場一覧 | 歴代${modelCount}機種の価格推移を独自集計【${PRICE_INFO_UPDATE_MONTH}】 | ユーズドラボ`
  const description = `中古AirPods${modelCount}機種の価格相場を毎日更新。価格推移グラフ、最安値ランキングを掲載。イオシス・じゃんぱら・eイヤホンの実売価格を集計。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: '/airpods/price/',
      images: [{ url: '/images/airpods/mtjv3j:a.jpg', width: 360, height: 360, alt: title }],
    },
    twitter: {
      title,
      description,
      images: ['/images/airpods/mtjv3j:a.jpg'],
    },
  }
}

// ============================================================
// ページコンポーネント
// ============================================================

export default async function AirPodsPriceInfoPage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllAirPodsModels(),
    getAllProductShopLinksByType('airpods'),
  ])

  // 全モデルの価格ログを並列取得（直近90日）
  const allPriceLogs = await Promise.all(
    allModels.map((m) => getAirPodsPriceLogsByModelId(m.id))
  )

  // ModelData構築
  let colorIndex = 0
  const modelsData: ModelData[] = []

  for (let i = 0; i < allModels.length; i++) {
    const model = allModels[i]
    const logs = filterLast3Months(allPriceLogs[i])

    // AirPodsにはstorageフィールドがないためスキップ

    // 価格エントリ算出（日毎に集約）
    const dayMap = new Map<string, PriceEntry>()
    for (const log of logs) {
      const entry = calcAvgPriceFromLog(log)
      if (!entry) continue
      dayMap.set(entry.date, entry)
    }
    const prices = [...dayMap.values()].sort((a, b) => a.date.localeCompare(b.date))

    if (prices.length === 0) continue

    const currentPrice = prices[prices.length - 1].avg

    // 30日前との価格差
    let oldPrice = prices[0].avg
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const cutoffStr = thirtyDaysAgo.toISOString().substring(0, 10)
    for (const p of prices) {
      if (p.date >= cutoffStr) {
        oldPrice = p.avg
        break
      }
    }
    const priceChange = currentPrice - oldPrice
    const priceChangePercent = oldPrice > 0 ? Math.round((priceChange / oldPrice) * 1000) / 10 : 0

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
      color: CHART_COLORS[colorIndex % CHART_COLORS.length],
      image: model.image || '',
      iosysUrl: allShopLinks.find((link) => link.product_id === model.id && link.shop_id === 1)?.url || '',
      prices,
      currentPrice,
      priceChange,
      priceChangePercent,
    })
    colorIndex++
  }

  // ランキング用（価格安い順）
  const rankingData = [...modelsData].sort((a, b) => a.currentPrice - b.currentPrice)

  // 値下がりランキング（price_changeがマイナスで大きい順）
  const priceDropRanking = modelsData
    .filter((m) => m.priceChange < 0)
    .sort((a, b) => a.priceChange - b.priceChange)
    .slice(0, 10)

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

  // 初期選択（各シリーズから1機種ずつ、最大2）
  const initialSelected: number[] = []
  for (const ids of Object.values(seriesGroups)) {
    if (ids.length > 0 && initialSelected.length < 2) {
      initialSelected.push(ids[0])
    }
  }

  // ソート済みモデル（シリーズ順→新しい年順）
  const sortedModels = [...modelsData].sort((a, b) => {
    const aOrder = seriesOrder(getModelSeries(a.name))
    const bOrder = seriesOrder(getModelSeries(b.name))
    if (aOrder !== bOrder) return aOrder - bOrder
    return parseInt(b.year) - parseInt(a.year)
  })

  const modelCount = modelsData.length
  const cheapestModel = rankingData[0]
  const cheapestPrice = cheapestModel ? cheapestModel.currentPrice.toLocaleString() : '---'

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古AirPods完全ガイド', item: 'https://used-lab.com/airpods/' },
      { '@type': 'ListItem', position: 3, name: 'AirPodsの中古相場一覧' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '中古AirPods価格比較ダッシュボード',
    description: `中古AirPods${modelCount}機種の価格相場を毎日更新。価格推移グラフ、最安値ランキングを掲載。`,
    url: PAGE_URL,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'JPY',
      lowPrice: cheapestModel?.currentPrice ?? 0,
      highPrice: rankingData[rankingData.length - 1]?.currentPrice ?? 0,
      offerCount: modelCount,
    },
    author: { '@type': 'Organization', name: 'ユーズドラボ' },
    dateModified: new Date().toISOString(),
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古AirPods完全ガイド', href: '/airpods' },
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
                AirPodsの中古相場一覧 | 歴代{modelCount}機種の価格推移を独自集計【{PRICE_INFO_UPDATE_MONTH}】
              </h1>
              <div className="hero-badges">
                <span className="m-badge m-badge--translucent">全{modelCount}機種掲載</span>
                <span className="m-badge m-badge--translucent">毎日自動更新</span>
                <span className="m-badge m-badge--translucent">最安 &yen;{cheapestPrice}〜</span>
                <span className="m-badge m-badge--translucent">イオシス・じゃんぱら・eイヤホン</span>
              </div>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={dateStr} itemProp="dateModified">{dateDisplay}</time> | 当記事のリンクには広告が含まれています
                </span>
                <meta itemProp="datePublished" content={dateStr} />
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <img
                  src="/images/airpods/mtjv3j:a.jpg"
                  alt="中古AirPods価格相場"
                  className="hero-media__img"
                  width={360}
                  height={360}
                />
              </figure>
            </div>
          </div>
        </header>

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
                情報を網羅的に得たい方は「<a href="/airpods/">中古AirPods購入完全ガイド</a>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
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
                <a href="#popular" className="toc-item">
                  目的別の人気機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
        </nav>

        {/* セクション */}
        <div itemProp="articleBody">
          <DashboardSection
            modelsData={modelsData}
            initialSelected={initialSelected}
            seriesGroups={seriesGroups}
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

          <RecommendBanner />

          <FaqSection />
        </div>

        <ShareBox url={PAGE_URL} text={`AirPodsの中古相場一覧 | 歴代${modelCount}機種の価格推移を独自集計`} bgSubtle />
      </article>
    </main>
  )
}
