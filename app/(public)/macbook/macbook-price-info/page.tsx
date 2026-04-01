import type { Metadata } from 'next'
import {
  getAllMacBookModels,
  getAllMacBookPriceLogsByModelIds,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { MacBookModel, MacBookPriceLog } from '@/lib/types'
import { filterLast3Months } from '@/lib/utils/shared-helpers'
import { PRICE_INFO_UPDATE_MONTH, CHART_COLORS, FAQ_ITEMS } from '@/lib/data/macbook-price-info'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import DashboardSection from './components/DashboardSection'
import PriceDropSection from './components/PriceDropSection'
import RankingSection from './components/RankingSection'
import PriceHistorySection from './components/PriceHistorySection'
import Image from 'next/image'
import FaqSection from './components/FaqSection'
import PopularMacBook from '@/app/components/PopularMacBook'
import MacBookRelatedLinks from '@/app/components/macbook/MacBookRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'

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
  display: string
  weight: string
  storage: string
  color: string
  image: string
  shopUrl: string
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

/** MacBook用: Top5形式の価格ログから PriceEntry を算出 */
function calcPriceFromLog(log: MacBookPriceLog): PriceEntry | null {
  const min = log.min1_price
  const max = log.max1_price
  if (!min || !max || min <= 0 || max <= 0) return null

  // min1〜min5の平均とmax1〜max5の平均を取る
  const minPrices = [log.min1_price, log.min2_price, log.min3_price, log.min4_price, log.min5_price]
    .filter((p): p is number => p != null && p > 0)
  const maxPrices = [log.max1_price, log.max2_price, log.max3_price, log.max4_price, log.max5_price]
    .filter((p): p is number => p != null && p > 0)

  const avgMin = Math.round(minPrices.reduce((a, b) => a + b, 0) / minPrices.length / 100) * 100
  const avgMax = Math.round(maxPrices.reduce((a, b) => a + b, 0) / maxPrices.length / 100) * 100
  const avg = Math.round((avgMin + avgMax) / 2 / 100) * 100

  return { date: log.logged_at.substring(0, 10), min: avgMin, max: avgMax, avg }
}

function getModelSeries(name: string): string {
  if (name.includes('Pro')) return 'Pro'
  if (name.includes('Air')) return 'Air'
  return 'Other'
}

function getModelSize(name: string): string {
  const match = name.match(/(\d+)インチ/)
  return match ? match[1] : ''
}

function seriesOrder(series: string): number {
  const order: Record<string, number> = { Air: 1, Pro: 2, Other: 3 }
  return order[series] ?? 4
}

// ============================================================
// ISR: 毎日再生成（86400秒 = 24時間）
// ============================================================

export const revalidate = 86400

// ============================================================
// メタデータ
// ============================================================

const PAGE_URL = 'https://used-lab.com/macbook/macbook-price-info/'

export async function generateMetadata(): Promise<Metadata> {
  const allModels = await getAllMacBookModels()
  const modelCount = allModels.length
  const title = `MacBookの中古相場一覧 | 歴代${modelCount}機種の価格推移を独自集計【${PRICE_INFO_UPDATE_MONTH}】`
  const description = `中古MacBook${modelCount}機種の価格相場を毎日更新。価格推移グラフ、スペック比較、最安値ランキングを掲載。楽天市場の中古ショップから実売価格を集計。`

  return {
    title,
    description,
  alternates: { canonical: '/macbook/macbook-price-info/' },
    openGraph: {
      title,
      description,
      url: '/macbook/macbook-price-info/',
      images: [{ url: '/images/content/thumbnail/graph-image.jpg', width: 360, height: 360, alt: title }],
    },
    twitter: {
      title,
      description,
      images: ['/images/content/thumbnail/graph-image.jpg'],
    },
  }
}

// ============================================================
// ページコンポーネント
// ============================================================

export default async function MacBookPriceInfoPage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllMacBookModels(),
    getAllProductShopLinksByType('macbook'),
  ])

  const priceLogsMap = await getAllMacBookPriceLogsByModelIds(allModels.map((m) => m.id))

  let colorIndex = 0
  const modelsData: ModelData[] = []

  for (const model of allModels) {
    const logs = filterLast3Months(priceLogsMap.get(model.id) || [])

    // 最小容量をログから取得
    const storageSet = new Set<number>()
    for (const log of logs) {
      if (log.storage) {
        const num = parseInt(log.storage, 10)
        if (!isNaN(num)) storageSet.add(num)
      }
    }
    const minStorage = storageSet.size > 0
      ? Math.min(...storageSet) >= 1000
        ? `${Math.min(...storageSet) / 1000}TB`
        : `${Math.min(...storageSet)}GB`
      : model.strage?.match(/(\d+)(GB|TB)/)?.[0] || null

    // 価格エントリ算出
    const dayMap = new Map<string, PriceEntry>()
    for (const log of logs) {
      const entry = calcPriceFromLog(log)
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

    modelsData.push({
      id: model.id,
      name: model.model,
      slug: model.slug,
      chip: model.cpu || '-',
      year: releaseYear,
      releaseDate: releaseYear && releaseMonth ? `${releaseYear}/${releaseMonth}` : '-',
      display: model.display || '-',
      weight: model.weight || '-',
      storage: minStorage || '-',
      color: CHART_COLORS[colorIndex % CHART_COLORS.length],
      image: model.image || '',
      shopUrl: allShopLinks.find((link) => link.product_id === model.id && link.shop_id === 1)?.url || '',
      prices,
      currentPrice,
      priceChange,
      priceChangePercent,
    })
    colorIndex++
  }

  // ランキング用（価格安い順）
  const rankingData = [...modelsData].sort((a, b) => a.currentPrice - b.currentPrice)

  // 値下がりランキング
  const priceDropRanking = modelsData
    .filter((m) => m.priceChange < 0)
    .sort((a, b) => a.priceChange - b.priceChange)
    .slice(0, 10)

  // シリーズグループ
  const seriesGroups: Record<string, number[]> = {
    Air: [],
    Pro: [],
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

  // ソート済みモデル（シリーズ順→サイズ小→新しい年順）
  const sortedModels = [...modelsData].sort((a, b) => {
    const aOrder = seriesOrder(getModelSeries(a.name))
    const bOrder = seriesOrder(getModelSeries(b.name))
    if (aOrder !== bOrder) return aOrder - bOrder
    const aSize = parseInt(getModelSize(a.name)) || 0
    const bSize = parseInt(getModelSize(b.name)) || 0
    if (aSize !== bSize) return aSize - bSize
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
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.com/macbook/' },
      { '@type': 'ListItem', position: 3, name: 'MacBookの中古相場一覧' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '中古MacBook価格比較ダッシュボード',
    description: `中古MacBook${modelCount}機種の価格相場を毎日更新。価格推移グラフ、スペック比較、最安値ランキングを掲載。`,
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
    author: {
      '@type': 'Person',
      name: 'タカヒロ',
      url: 'https://used-lab.com/about/',
      sameAs: [
        'https://twitter.com/takahiro_mono',
        'https://www.instagram.com/takahiro_mono',
        'https://www.youtube.com/@takahiro_mono',
        'https://digital-style.jp/',
        'https://nightscape.tokyo/',
      ],
    },
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

        <div className="hero-wrapper">
        <Breadcrumb
          items={[
            { label: '中古MacBook完全購入ガイド', href: '/macbook' },
            { label: 'MacBookの中古相場一覧' },
          ]}
        />

        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title" itemProp="headline">
                MacBookの中古相場一覧 | 歴代{modelCount}機種の価格推移を独自集計【{PRICE_INFO_UPDATE_MONTH}】
              </h1>
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
                  src="/images/content/thumbnail/graph-image.jpg"
                  alt="中古MacBook価格相場"
                  className="hero-media__img"
                  width={360}
                  height={360}
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
              <p>中古MacBook<strong>{modelCount}機種</strong>の価格相場を毎日更新でお届け。</p>
              <p>
                楽天市場の中古ショップから実売価格を収集し、価格推移グラフ・スペック比較・値下がりランキングなど、購入判断に役立つ情報をまとめました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<a href="/macbook/">中古MacBook購入完全ガイド</a>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
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
                <a href="#popular" className="toc-item">
                  目的別の人気機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pd-faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          <AuthorByline />
          </div>
        </nav>

        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">
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

          <FaqSection />
          <PopularMacBook />
          <MacBookRelatedLinks excludeHref={["/macbook/macbook-price-info/", "/macbook/recommend/"]} />
          <ShareBox url={PAGE_URL} text={`MacBookの中古相場一覧 | 歴代${modelCount}機種の価格推移を独自集計`} />
        </div>
      </article>
    </main>
  )
}
