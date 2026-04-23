/**
 * 買い時判断セクション
 * 直近30日・90日の中古相場推移から購入タイミングを判断する
 */

import Link from 'next/link'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import { getShortName } from './helpers'
import styles from './ComparePriceTrend.module.css'

type Props = {
  modelL: IPhoneModel
  modelR: IPhoneModel
  priceLogsL: IPhonePriceLog[]
  priceLogsR: IPhonePriceLog[]
}

type Trend = '下落中' | '横ばい' | '上昇中'

type TrendAnalysis = {
  trend: Trend
  pctChange: number
}

type Verdict = {
  text: string
  color: 'green' | 'yellow' | 'red'
}

/* ---------- helpers ---------- */

/** 1件のログから平均価格を算出（null は除外） */
function avgPrice(log: IPhonePriceLog): number | null {
  const vals = [log.iosys_min, log.geo_min, log.janpara_min].filter(
    (v): v is number => v != null,
  )
  if (vals.length === 0) return null
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

/** 指定日数以内のログを返す */
function logsWithinDays(
  logs: IPhonePriceLog[],
  days: number,
): IPhonePriceLog[] {
  const now = Date.now()
  const cutoff = now - days * 24 * 60 * 60 * 1000
  return logs.filter((l) => new Date(l.logged_at).getTime() >= cutoff)
}

/** 最初の7日間と最後の7日間の平均を比較してトレンドを判定 */
function analyzeTrend(logs: IPhonePriceLog[]): TrendAnalysis | null {
  if (logs.length < 7) return null

  const sorted = [...logs].sort(
    (a, b) => new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime(),
  )

  // 最初の7日間
  const earliest = new Date(sorted[0].logged_at).getTime()
  const firstWeekEnd = earliest + 7 * 24 * 60 * 60 * 1000
  const firstWeekLogs = sorted.filter(
    (l) => new Date(l.logged_at).getTime() < firstWeekEnd,
  )

  // 最後の7日間
  const latest = new Date(sorted[sorted.length - 1].logged_at).getTime()
  const lastWeekStart = latest - 7 * 24 * 60 * 60 * 1000
  const lastWeekLogs = sorted.filter(
    (l) => new Date(l.logged_at).getTime() >= lastWeekStart,
  )

  const firstAvgs = firstWeekLogs.map(avgPrice).filter((v): v is number => v != null)
  const lastAvgs = lastWeekLogs.map(avgPrice).filter((v): v is number => v != null)

  if (firstAvgs.length === 0 || lastAvgs.length === 0) return null

  const firstMean = firstAvgs.reduce((a, b) => a + b, 0) / firstAvgs.length
  const lastMean = lastAvgs.reduce((a, b) => a + b, 0) / lastAvgs.length

  if (firstMean === 0) return null

  const pctChange = ((lastMean - firstMean) / firstMean) * 100

  let trend: Trend
  if (pctChange <= -3) {
    trend = '下落中'
  } else if (pctChange >= 3) {
    trend = '上昇中'
  } else {
    trend = '横ばい'
  }

  return { trend, pctChange: Math.round(pctChange * 10) / 10 }
}

/** 30日 + 90日トレンドから買い時判定 */
function getVerdict(
  trend30: TrendAnalysis | null,
  trend90: TrendAnalysis | null,
): Verdict {
  if (!trend30) {
    return { text: 'データ不足', color: 'yellow' }
  }

  if (trend30.trend === '下落中') {
    return { text: '様子見がおすすめ（値下がり傾向）', color: 'yellow' }
  }

  if (trend30.trend === '上昇中') {
    return { text: '早めの購入がおすすめ（値上がり傾向）', color: 'red' }
  }

  // 30日横ばい
  if (trend90 && trend90.trend === '下落中') {
    return { text: 'そろそろ底値（買い時に近い）', color: 'green' }
  }

  return { text: '今が買い時（価格安定）', color: 'green' }
}

function trendArrow(trend: Trend): string {
  if (trend === '上昇中') return '↗'
  if (trend === '下落中') return '↘'
  return '→'
}

function trendClassName(trend: Trend): string {
  if (trend === '上昇中') return styles.trendUp
  if (trend === '下落中') return styles.trendDown
  return styles.trendFlat
}

function verdictClassName(color: Verdict['color']): string {
  if (color === 'green') return styles.verdictGreen
  if (color === 'red') return styles.verdictRed
  return styles.verdictYellow
}

/* ---------- sub-components ---------- */

function TrendCard({
  model,
  priceLogs,
}: {
  model: IPhoneModel
  priceLogs: IPhonePriceLog[]
}) {
  const logs30 = logsWithinDays(priceLogs, 30)
  const logs90 = logsWithinDays(priceLogs, 90)

  const trend30 = analyzeTrend(logs30)
  const trend90 = analyzeTrend(logs90)

  const verdict = getVerdict(trend30, trend90)

  return (
    <div className={styles.card}>
      <p className={styles.modelName}>{model.model}</p>

      {trend30 ? (
        <div className={styles.trendRow}>
          <span className={styles.trendLabel}>30日間の推移</span>
          <span className={`${styles.trendValue} ${trendClassName(trend30.trend)}`}>
            {trendArrow(trend30.trend)}
            {trend30.trend === '上昇中' ? '上昇' : trend30.trend === '下落中' ? '下落' : '横ばい'}
            （{trend30.pctChange > 0 ? '+' : ''}
            {trend30.pctChange}%）
          </span>
        </div>
      ) : (
        <div className={styles.trendRow}>
          <span className={styles.trendLabel}>30日間の推移</span>
          <span className={`${styles.trendValue} ${styles.trendFlat}`}>データ不足</span>
        </div>
      )}

      {trend90 ? (
        <div className={styles.trendRow}>
          <span className={styles.trendLabel}>90日間の推移</span>
          <span className={`${styles.trendValue} ${trendClassName(trend90.trend)}`}>
            {trendArrow(trend90.trend)}
            {trend90.trend === '上昇中' ? '上昇' : trend90.trend === '下落中' ? '下落' : '横ばい'}
            （{trend90.pctChange > 0 ? '+' : ''}
            {trend90.pctChange}%）
          </span>
        </div>
      ) : (
        <div className={styles.trendRow}>
          <span className={styles.trendLabel}>90日間の推移</span>
          <span className={`${styles.trendValue} ${styles.trendFlat}`}>データ不足</span>
        </div>
      )}

      <span className={`${styles.verdictBadge} ${verdictClassName(verdict.color)}`}>
        {verdict.text}
      </span>
    </div>
  )
}

/* ---------- main component ---------- */

export default function ComparePriceTrend({
  modelL,
  modelR,
  priceLogsL,
  priceLogsR,
}: Props) {
  // 少なくとも7日分のログがないモデルがある場合は表示しない
  const logs30L = logsWithinDays(priceLogsL, 30)
  const logs30R = logsWithinDays(priceLogsR, 30)

  if (logs30L.length < 7 && logs30R.length < 7) return null

  const shortL = getShortName(modelL)
  const shortR = getShortName(modelR)

  return (
    <section className="l-section" id="timing" aria-labelledby="heading-timing">
      <div className="l-container">
        <h2
          className="m-section-heading m-section-heading--lg"
          id="heading-timing"
        >
          買い時はいつ？
        </h2>
        <p className="m-section-desc">
          直近の中古相場の推移から、購入タイミングを判断します。
        </p>

        <div className={styles.grid}>
          <TrendCard model={modelL} priceLogs={priceLogsL} />
          <TrendCard model={modelR} priceLogs={priceLogsR} />
        </div>

        <div className="m-callout m-callout--tip">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            最新の中古相場の推移は「
            <Link href="/iphone/price-info/">中古iPhone相場ダッシュボード</Link>
            」で確認できます。
          </p>
        </div>
      </div>
    </section>
  )
}
