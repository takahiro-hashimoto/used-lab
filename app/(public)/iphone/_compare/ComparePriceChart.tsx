/**
 * 2モデル価格推移比較セクション
 * DashboardSection風のインタラクティブチャート + 価格サマリー
 */

import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import { filterLast3Months } from '@/lib/utils/iphone-helpers'
import { calcAvgPriceRange, getShortName } from './helpers'
import ComparePriceChartClient from './ComparePriceChartClient'
import type { ChartModelData } from './ComparePriceChartClient'
import priceStyles from './ComparePriceChart.module.css'

type Props = {
  modelL: IPhoneModel
  modelR: IPhoneModel
  priceLogsL: IPhonePriceLog[]
  priceLogsR: IPhonePriceLog[]
  latestL: IPhonePriceLog | null
  latestR: IPhonePriceLog | null
}

const CHART_COLORS = ['#3b82f6', '#10b981']

/** 価格ログから日毎のエントリを算出 */
function calcAvgPriceFromLog(log: IPhonePriceLog): { date: string; min: number; max: number; avg: number } | null {
  const minPrices: number[] = []
  const maxPrices: number[] = []

  if (log.iosys_min && log.iosys_min > 0) minPrices.push(log.iosys_min)
  if (log.geo_min && log.geo_min > 0) minPrices.push(log.geo_min)
  if (log.janpara_min && log.janpara_min > 0) minPrices.push(log.janpara_min)

  if (log.iosys_max && log.iosys_max > 0) maxPrices.push(log.iosys_max)
  if (log.geo_max && log.geo_max > 0) maxPrices.push(log.geo_max)
  if (log.janpara_max && log.janpara_max > 0) maxPrices.push(log.janpara_max)

  if (minPrices.length === 0 || maxPrices.length === 0) return null

  const avgMin = Math.round(minPrices.reduce((a, b) => a + b, 0) / minPrices.length / 100) * 100
  const avgMax = Math.round(maxPrices.reduce((a, b) => a + b, 0) / maxPrices.length / 100) * 100
  const avg = Math.round((avgMin + avgMax) / 2 / 100) * 100

  return { date: log.logged_at.substring(0, 10), min: avgMin, max: avgMax, avg }
}

function buildChartModelData(
  model: IPhoneModel,
  logs: IPhonePriceLog[],
  color: string,
): ChartModelData | null {
  const recent = filterLast3Months(logs)
  const dayMap = new Map<string, { date: string; min: number; max: number; avg: number }>()
  for (const log of recent) {
    const entry = calcAvgPriceFromLog(log)
    if (!entry) continue
    dayMap.set(entry.date, entry)
  }
  const prices = [...dayMap.values()].sort((a, b) => a.date.localeCompare(b.date))
  if (prices.length === 0) return null

  return {
    name: model.model,
    color,
    slug: model.slug,
    prices,
    currentPrice: prices[prices.length - 1].avg,
  }
}

export default function ComparePriceChart({ modelL, modelR, priceLogsL, priceLogsR, latestL, latestR }: Props) {
  const shortL = getShortName(modelL)
  const shortR = getShortName(modelR)
  const rangeL = calcAvgPriceRange(latestL)
  const rangeR = calcAvgPriceRange(latestR)

  // チャート用データを構築
  const chartModels: ChartModelData[] = []
  const chartDataL = buildChartModelData(modelL, priceLogsL, CHART_COLORS[0])
  const chartDataR = buildChartModelData(modelR, priceLogsR, CHART_COLORS[1])
  if (chartDataL) chartModels.push(chartDataL)
  if (chartDataR) chartModels.push(chartDataR)

  if (chartModels.length === 0) return null

  return (
    <section className="l-section" id="price-chart" aria-labelledby="heading-price-chart">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-price-chart">
          iPhone {shortL}と{shortR}の中古価格相場
        </h2>
        <p className="m-section-desc">
          イオシス・ゲオ・じゃんぱらの実売価格から算出した中古相場の推移を比較できます。
        </p>

        {/* 価格サマリーカード */}
        <div className={priceStyles.grid}>
          <PriceSummaryCard name={modelL.model} range={rangeL} />
          <PriceSummaryCard name={modelR.model} range={rangeR} />
        </div>

        {/* インタラクティブチャート */}
        <ComparePriceChartClient models={chartModels} />

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            全モデルの中古相場を比較したい方は「<a href="/iphone/price-info/">iPhoneの中古相場一覧・価格推移</a>」をご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}

function PriceSummaryCard({ name, range }: {
  name: string
  range: { min: number | null; max: number | null; avg: number | null }
}) {
  return (
    <div className="m-card m-stat-card m-stat-card--lg" style={{ textAlign: 'center' }}>
      <span style={{ fontWeight: 700 }}>{name}</span>
      {range.avg != null ? (
        <>
          <p className="m-stat-card__value" style={{ color: 'var(--color-primary)' }}>
            &yen;{range.avg.toLocaleString()}〜
          </p>
          <p className="m-stat-card__note">
            最安値 &yen;{range.min?.toLocaleString()} 〜 最高値 &yen;{range.max?.toLocaleString()}
          </p>
        </>
      ) : (
        <p className="m-stat-card__note">価格データなし</p>
      )}
    </div>
  )
}
