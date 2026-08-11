import Link from 'next/link'
import { priceStatsOf, buildInventoryInsight, buildSnapshotReport, type PriceHistogram } from '@/lib/utils/price-stats'
import type { Metadata } from 'next'
import { cache } from 'react'
import {
  getAllMacModelsIncludingEnded,
  getAllMacPriceLogsByModelIds,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { MacPriceLog } from '@/lib/types'
import { medianOf, priceBand, findModelId } from '@/lib/utils/price-copy'
import { CHART_COLORS, buildFaqItems } from '@/lib/data/mac-price-info'
import { calcAvgFromShops, calcPriceStats, buildPageDates, buildDailyPrices, buildRankingData, buildPriceDropRanking, buildInitialSelected, type PriceEntry } from '@/lib/utils/price-info-helpers'
import { buildPriceInfoTitle, buildPriceInfoMetadata, PRICE_INFO_UPDATE_MONTH } from '@/lib/utils/price-info-meta'
import { buildBreadcrumbJsonLd, buildWebApplicationJsonLd, buildDatasetJsonLd, buildFaqJsonLd } from '@/lib/utils/price-info-jsonld'
import Breadcrumb from '@/app/components/Breadcrumb'
import dynamic from 'next/dynamic'

const DashboardSection = dynamic(() => import('./components/DashboardSection'), {
  loading: () => <div style={{ height: '400px' }} />,
})
import PriceDropSection from './components/PriceDropSection'
import RankingSection from './components/RankingSection'
import PriceHistorySection from './components/PriceHistorySection'
import Image from 'next/image'
import FaqSection from './components/FaqSection'
import MacArticleFooter from '@/app/components/mac/MacArticleFooter'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'
import { get90DaysAgo } from '@/lib/utils/shared-helpers'

// ============================================================
// 型定義
// ============================================================

/** 個別機種ページと同じ「今この瞬間」のスナップショット。
 *  文章はサーバー側で組み立てて渡す（クローラーにも読ませるため） */
export type PriceDistribution = {
  histogram: PriceHistogram
  total: number
  date: string
  /** ヒストグラムの読み解き（最も厚い価格帯とその割合） */
  reportLines: string[]
  /** 流通量から見た在庫の状況。判定できない場合は null */
  inventoryText: string | null
}

export type ModelData = {
  id: number
  name: string
  slug: string
  chip: string
  year: string
  releaseDate: string
  display: string
  /** MacBook版の weight（重量）を差し替え。デスクトップの判断材料はメモリ容量 */
  memory: string
  storage: string
  supportEnded: boolean
  color: string
  image: string
  shopUrl: string
  prices: PriceEntry[]
  /** 直近ログの価格分布。サンプルが足りない機種は null（ブロックごと出さない） */
  distribution: PriceDistribution | null
  currentPrice: number
  priceChange: number
  priceChangePercent: number
}

export type { PriceEntry }

// ============================================================
// ヘルパー関数
// ============================================================

/** デスクトップMac用: Top5形式の価格ログから PriceEntry を算出（MacBookと同じスキーマ） */
function calcPriceFromLog(log: MacPriceLog): PriceEntry | null {
  const min = log.min1_price
  const max = log.max1_price
  if (!min || !max || min <= 0 || max <= 0) return null

  const minPrices = [log.min1_price, log.min2_price, log.min3_price, log.min4_price, log.min5_price]
    .filter((p): p is number => p != null && p > 0)
  const maxPrices = [log.max1_price, log.max2_price, log.max3_price, log.max4_price, log.max5_price]
    .filter((p): p is number => p != null && p > 0)

  // 価格配列がある日は分布（中央値）で算出する。記録開始前の日は従来どおり最安・最高の中間値
  return calcAvgFromShops(minPrices, maxPrices, log.logged_at.substring(0, 10), [
    log.matched_prices,
  ])
}

/**
 * デスクトップMacのシリーズ判定。
 * MacBook 用の「Air / Pro」判定が残っていたため、iMac も Mac mini も
 * すべて 'Other' に落ち、グラフの初期選択が空になっていた。
 * 判定順に注意: 'Mac Studio' より先に 'Mac mini' を見ないと取り違えないが、
 * どちらも固有名なので前方一致で判定する。
 */
function getModelSeries(name: string): string {
  if (name.startsWith('iMac')) return 'iMac'
  if (name.startsWith('Mac mini')) return 'Mac mini'
  if (name.startsWith('Mac Studio')) return 'Mac Studio'
  if (name.startsWith('Mac Pro')) return 'Mac Pro'
  return 'Other'
}

function getModelSize(name: string): string {
  const match = name.match(/(\d+)インチ/)
  return match ? match[1] : ''
}

function seriesOrder(series: string): number {
  const order: Record<string, number> = { iMac: 1, 'Mac mini': 2, 'Mac Studio': 3, 'Mac Pro': 4, Other: 5 }
  return order[series] ?? 4
}

// ============================================================
// ISR: 毎日再生成（86400秒 = 24時間）
// ============================================================

export const revalidate = false

// ============================================================
// メタデータ
// ============================================================

const PAGE_URL = 'https://used-lab.jp/mac/price-info/'

const getModels = cache(getAllMacModelsIncludingEnded)

export async function generateMetadata(): Promise<Metadata> {
  const allModels = await getModels()
  const modelCount = allModels.length
  const title = buildPriceInfoTitle('iMac・Mac mini', modelCount, PRICE_INFO_UPDATE_MONTH)
  const description = `中古のiMac・Mac mini・Mac Studio${modelCount}機種の相場・値段を毎日更新。歴代モデルの価格推移グラフ・相場一覧を掲載。`
  return buildPriceInfoMetadata({ title, description, canonicalPath: '/mac/price-info/', heroImageUrl: getHeroImage('/mac/price-info/') })
}

// ============================================================
// ページコンポーネント
// ============================================================

export default async function MacPriceInfoPage() {
  const [allModels, allShopLinks] = await Promise.all([
    getModels(),
    getAllProductShopLinksByType('mac'),
  ])

  const priceLogsMap = await getAllMacPriceLogsByModelIds(allModels.map((m) => m.id), get90DaysAgo())

  // FAQ本文に差し込む Mac mini の実勢相場（最新ログの中央値）
  // FAQ に差し込む相場の基準。流通量が最も多い Mac mini を使う
  const miniId = findModelId(allModels, 'Mac mini（2023）')
  // getAllByModelIds は logged_at 昇順なので、末尾が最新
  const miniLogs = miniId ? (priceLogsMap[miniId] ?? []) : []
  const miniLatest = miniLogs.length > 0 ? miniLogs[miniLogs.length - 1] : null
  const faqItems = buildFaqItems(priceBand(medianOf(miniLatest as unknown as Record<string, unknown>, ['matched_prices'])))

  // ショップURLの O(1) 参照用 Map (shop_id=1)
  const shopUrlMap = new Map<number, string>()
  for (const l of allShopLinks) {
    if (l.shop_id === 1) shopUrlMap.set(l.product_id, l.url)
  }

  let colorIndex = 0
  const modelsData: ModelData[] = []

  for (const model of allModels) {
    const logs = priceLogsMap[model.id] || []

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

    const prices = buildDailyPrices(logs.map(calcPriceFromLog))

    if (prices.length === 0) continue

    const { currentPrice, priceChange, priceChangePercent } = calcPriceStats(prices)

    // 「今この瞬間」の価格分布。最新ログの価格配列から作る。
    // 文章もここで確定させ、クライアント側の計算に頼らない（SSRで読ませる）
    const latestLog = logs.length > 0 ? logs[logs.length - 1] : null
    const distStats = latestLog ? priceStatsOf(latestLog) : null
    const distribution: PriceDistribution | null =
      distStats?.histogram && latestLog
        ? {
            histogram: distStats.histogram,
            total: distStats.count,
            date: latestLog.logged_at.substring(0, 10),
            reportLines: buildSnapshotReport(distStats),
            inventoryText: buildInventoryInsight(distStats.count, model.date, new Date())?.text ?? null,
          }
        : null

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
      memory: model.ram || '-',
      storage: minStorage || '-',
      supportEnded: model.last_macos !== null,
      color: CHART_COLORS[colorIndex % CHART_COLORS.length],
      image: model.image || '',
      shopUrl: shopUrlMap.get(model.id) ?? '',
      prices,
      distribution,
      currentPrice,
      priceChange,
      priceChangePercent,
    })
    colorIndex++
  }

  const rankingData = buildRankingData(modelsData)
  const priceDropRanking = buildPriceDropRanking(modelsData)

  // シリーズグループ
  // グラフの初期選択に使う。各シリーズの先頭（＝発売が新しい順で1台目）が最大2件選ばれる
  const seriesGroups: Record<string, number[]> = {
    iMac: [],
    'Mac mini': [],
    'Mac Studio': [],
    'Mac Pro': [],
  }
  // modelsData は id 昇順（＝発売が古い順）なので、そのまま入れると
  // 各シリーズの「いちばん古い機種」が初期選択になってしまう。
  // 中古で検討されるのは新しい世代なので、発売日の新しい順に並べてから積む
  const byNewest = [...modelsData].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
  for (const m of byNewest) {
    const series = getModelSeries(m.name)
    if (seriesGroups[series]) seriesGroups[series].push(m.id)
  }

  const initialSelected = buildInitialSelected(seriesGroups)

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

  const { dateStr, dateDisplay, dateModified } = buildPageDates(modelsData)

  // JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd('中古iMac・Mac miniおすすめ機種', 'https://used-lab.jp/mac/', 'iMac・Mac miniの中古相場一覧')
  const webAppJsonLd = buildWebApplicationJsonLd({
    name: '中古iMac・Mac mini価格比較ダッシュボード',
    description: `中古のiMac・Mac mini${modelCount}機種の価格相場を毎日更新。価格推移グラフ、スペック比較、相場ランキングを掲載。`,
    url: PAGE_URL,
    modelCount,
    lowestPrice: cheapestModel?.currentPrice ?? 0,
    highestPrice: rankingData[rankingData.length - 1]?.currentPrice ?? 0,
    dateModified,
  })
  const datasetJsonLd = buildDatasetJsonLd({
    productLabel: '中古iMac・Mac mini',
    url: PAGE_URL,
    modelCount,
    lowestPrice: cheapestModel?.currentPrice ?? 0,
    highestPrice: rankingData[rankingData.length - 1]?.currentPrice ?? 0,
    dateModified,
  })
  const faqJsonLd = buildFaqJsonLd(faqItems)

  return (
    <>
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
        <Breadcrumb
          items={[
            { label: '中古iMac・Mac miniおすすめ機種', href: '/mac/' },
            { label: 'iMac・Mac miniの中古相場一覧' },
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
                中古iMac・Mac miniの相場・値段一覧【{PRICE_INFO_UPDATE_MONTH}】歴代{modelCount}機種の価格推移を毎日更新
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/mac/price-info/')}
                  alt="中古iMac・Mac mini価格相場"
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
              {modelCount > 0 ? (
                <p>中古のiMac・Mac mini<strong>{modelCount}機種</strong>の価格相場を毎日更新でお届け。</p>
              ) : (
                <p>中古のiMac・Mac miniの価格相場を毎日更新でお届けします。</p>
              )}
              <p>
                楽天市場の中古ショップから実売価格を収集し、価格推移グラフ・スペック比較・値下がりランキングなど、購入判断に役立つ情報をまとめました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link prefetch={false} href="/mac/">中古iMac・Mac miniおすすめ機種</Link>」も参考にしてみてください！
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
              <h2 className="m-section-heading m-section-heading--lg">中古iMac・Mac miniの相場価格 算出方法</h2>
              <p className="m-section-desc">独自に算出した相場価格のロジックを紹介します。</p>
              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <div className="m-card m-card--shadow m-card--padded post-check-item">
                  <p className="post-check-item__heading">
                    <i className="fa-solid fa-database" aria-hidden="true"></i>1. データ収集
                  </p>
                  <div className="media-card__desc m-rich-text">
                    <p>楽天ウェブサービス（楽天市場商品検索API）を利用し、楽天市場の中古ショップの販売価格を毎日自動取得しています。</p>
                    <p>中古のiMac・Mac miniの取引量が多い主要な中古ショップを対象とすることで、市場全体の価格動向を反映しています。</p>
                    <p className="pd-method-aside">※Amazonの価格は含まれておらず、Amazon商品の価格アラートも行っていません。</p>
                  </div>
                </div>
                <div className="m-card m-card--shadow m-card--padded post-check-item">
                  <p className="post-check-item__heading">
                    <i className="fa-solid fa-filter" aria-hidden="true"></i>2. 対象条件
                  </p>
                  <div className="media-card__desc m-rich-text">
                    <p>機種ごとの最小構成モデル（例：Mac mini M4は16GB/256GB）を対象としています。</p>
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

          {modelCount > 0 ? (
            <>
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
            </>
          ) : (
            <section className="l-section" aria-label="相場データの準備状況">
              <div className="l-container">
                <div className="m-callout m-callout--tip">
                  <span className="m-callout__label">準備中</span>
                  <p className="m-callout__text">
                    iMac・Mac miniの価格ログはまだ蓄積されていません。毎日の自動取得が始まり次第、
                    価格推移グラフ・相場ランキング・値下がりランキングをこのページに掲載します。
                    各機種のスペックは「<Link prefetch={false} href="/mac/mac-spec-table/">歴代iMac・Mac miniスペック比較表</Link>」でご確認いただけます。
                  </p>
                </div>
              </div>
            </section>
          )}

          <FaqSection items={faqItems} />
        </div>
      </article>
    </main>
    <MacArticleFooter pageUrl={PAGE_URL} pageTitle={`iMac・Mac miniの中古相場一覧 | 歴代${modelCount}機種の価格推移を独自集計`} excludeHref={["/mac/price-info/", "/mac/"]} />
    </>
  )
}
