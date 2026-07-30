import PriceChartLoader from '@/app/components/PriceChartLoader'
import {
  priceSourceNote,
  priceLogicChangeNote,
  isBeforeLogicChange,
  crossesLogicChange,
  isMonthPureNewBasis,
  type PriceCategory,
} from '@/lib/data/price-source-note'

type DailyDataType = {
  labels: string[]
  avgMin: (number | null)[]
  avgMax: (number | null)[]
}

type Props = {
  dailyData: DailyDataType
  modelName: string
  /** 中古相場の算出方法の注記に使うカテゴリ（price-source-note で一元管理） */
  category: PriceCategory
  /** LatestLog の min/max を数値配列で渡す（calculateAvgPriceRange 用） */
  latestMinMaxPairs: { mins: number[]; maxes: number[] }[]
  latestDate: string | null
  /** 集計対象の補足テキスト（例: ストレージ容量） */
  storageNote?: string
  /** 中古相場一覧ページへのリンク */
  priceListLink?: { href: string; label: string }
  /**
   * セクション末尾に差し込む追加ブロック（「同じ予算で狙える他のモデル」など）。
   * 価格の文脈が続く内容を h3 として本セクション内に置くために使う。
   */
  children?: React.ReactNode
}

function formatPrice(price: number | null): string {
  if (price == null) return '-'
  return `¥${price.toLocaleString()}`
}

function roundTo100(value: number): number {
  return Math.round(value / 100) * 100
}

function avg(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length
}

function calculateAvgPriceRange(pairs: { mins: number[]; maxes: number[] }[]): { min: number | null; max: number | null } {
  const allMins: number[] = []
  const allMaxes: number[] = []
  for (const pair of pairs) {
    const mins = pair.mins.filter(v => v > 0)
    const maxes = pair.maxes.filter(v => v > 0)
    if (mins.length > 0) allMins.push(roundTo100(avg(mins)))
    if (maxes.length > 0) allMaxes.push(roundTo100(avg(maxes)))
  }
  return {
    min: allMins.length > 0 ? Math.min(...allMins) : null,
    max: allMaxes.length > 0 ? Math.max(...allMaxes) : null,
  }
}

type TrendChange = {
  period: string
  days: number
  change: number | null
  direction: 'up' | 'down' | 'stable'
}

function calculateTrendChanges(dailyData: DailyDataType): TrendChange[] {
  const { labels, avgMin } = dailyData
  const len = labels.length
  if (len === 0) return []
  let latestIdx = -1
  for (let i = len - 1; i >= 0; i--) {
    if (avgMin[i] != null) { latestIdx = i; break }
  }
  if (latestIdx < 0) return []
  const latestVal = avgMin[latestIdx]!
  // 配列インデックスで N 日前を数えると、価格取得が止まった欠測期間の分だけ日付がズレる
  // （実際 2026/6/27〜7/12 に欠測があり 30日前・90日前が取れなくなっていた）。
  // labels は日付文字列なので、実日付から最も近い過去データを探す。
  const dayMs = 86_400_000
  const latestTime = new Date(labels[latestIdx]).getTime()
  return [7, 30, 90].map(days => {
    const periodLabel = `${days}日間`
    const targetTime = latestTime - days * dayMs
    // 目標日以前で最も新しい（＝目標日に最も近い）データ点を採用
    let pastVal: number | null = null
    let pastLabel: string | null = null
    for (let i = latestIdx - 1; i >= 0; i--) {
      if (avgMin[i] == null) continue
      if (new Date(labels[i]).getTime() <= targetTime) { pastVal = avgMin[i]!; pastLabel = labels[i]; break }
    }
    // 比較元が旧基準（劣化品を含む）の日だと、差分に集計基準の段差が混ざり
    // 「値上がりした」と誤って伝えてしまう。またぐ期間は増減を出さない
    if (pastVal == null || (pastLabel && crossesLogicChange(pastLabel, labels[latestIdx]))) {
      return { period: periodLabel, days, change: null, direction: 'stable' as const }
    }
    const change = latestVal - pastVal
    const direction: 'up' | 'down' | 'stable' = change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    return { period: periodLabel, days, change, direction }
  })
}

type MonthlySummary = {
  month: string
  dateTime: string
  avgPrice: number | null
  minPrice: number | null
  maxPrice: number | null
}

function calculateMonthlySummary(dailyData: DailyDataType): MonthlySummary[] {
  const { labels, avgMin, avgMax } = dailyData
  const monthMap = new Map<string, { mins: number[]; maxes: number[] }>()
  for (let i = 0; i < labels.length; i++) {
    const ym = labels[i].substring(0, 7)
    if (!monthMap.has(ym)) monthMap.set(ym, { mins: [], maxes: [] })
    const bucket = monthMap.get(ym)!
    if (avgMin[i] != null) bucket.mins.push(avgMin[i]!)
    if (avgMax[i] != null) bucket.maxes.push(avgMax[i]!)
  }
  return [...monthMap.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 3)
    .map(([ym, { mins, maxes }]) => {
      const allPrices = [...mins, ...maxes]
      const [y, m] = ym.split('-')
      return {
        month: `${y}年${parseInt(m)}月`,
        dateTime: ym,
        avgPrice: allPrices.length > 0 ? roundTo100(avg(allPrices)) : null,
        minPrice: mins.length > 0 ? Math.min(...mins) : null,
        maxPrice: maxes.length > 0 ? Math.max(...maxes) : null,
      }
    })
}

type DailyRow = {
  dateStr: string
  dateTime: string
  min: number | null
  max: number | null
  avg: number | null
  change: number | null
  changeDirection: 'up' | 'down' | 'stable'
}

function calculateDailyTableData(dailyData: DailyDataType): DailyRow[] {
  const { labels, avgMin, avgMax } = dailyData
  const rows: DailyRow[] = []
  for (let i = labels.length - 1; i >= Math.max(0, labels.length - 30); i--) {
    const min = avgMin[i]
    const max = avgMax[i]
    const dayAvg = (min != null && max != null) ? roundTo100((min + max) / 2) : null
    let prevAvg: number | null = null
    if (i > 0 && avgMin[i - 1] != null && avgMax[i - 1] != null) {
      prevAvg = roundTo100((avgMin[i - 1]! + avgMax[i - 1]!) / 2)
    }
    // 集計基準が変わった日の前日比は段差そのものなので、値動きとしては出さない
    const crossesChange = i > 0 && crossesLogicChange(labels[i - 1], labels[i])
    const change = (dayAvg != null && prevAvg != null && !crossesChange) ? dayAvg - prevAvg : null
    const changeDirection: 'up' | 'down' | 'stable' = change != null ? (change > 0 ? 'up' : change < 0 ? 'down' : 'stable') : 'stable'
    rows.push({
      dateStr: labels[i].replace(/-/g, '/'),
      dateTime: labels[i],
      min, max, avg: dayAvg, change, changeDirection,
    })
  }
  return rows
}

/**
 * 価格推移の一言レポートを実データから生成する。
 * 相場が動けば文面も自動で変わるため、固定文言のような陳腐化が起きない。
 * 断定を避け、あくまで集計値の要約にとどめる（相場は日々変動するため）。
 */
/**
 * 記録期間内での「現在値の位置」を求める（0%=期間中の最安 / 100%=最高）。
 * 買い時判断の材料になる、価格履歴を持つサイトだけが出せる指標。
 */
function calculatePricePosition(dailyData: DailyDataType): {
  low: number
  high: number
  current: number
  percentile: number
  days: number
} | null {
  const vals: number[] = []
  let current: number | null = null
  for (let i = 0; i < dailyData.labels.length; i++) {
    const v = dailyData.avgMin[i]
    if (v == null) continue
    // 旧基準の日は下限が劣化品まで下がっているため、混ぜると期間最安が実態より低くなり
    // 現在値がほぼ常に「高値圏」と判定されてしまう。同一基準の日だけで位置を出す
    if (isBeforeLogicChange(dailyData.labels[i])) continue
    vals.push(v)
    current = v // 最後に見つかった値＝最新
  }
  if (vals.length < 14 || current == null) return null // 期間が短すぎる場合は判定しない
  const low = Math.min(...vals)
  const high = Math.max(...vals)
  if (high === low) return null
  return {
    low,
    high,
    current,
    percentile: Math.round(((current - low) / (high - low)) * 100),
    days: vals.length,
  }
}

function buildTrendReport(
  modelName: string,
  range: { min: number | null; max: number | null },
  trendChanges: TrendChange[],
  monthlySummary: MonthlySummary[],
  position: ReturnType<typeof calculatePricePosition>,
): string[] {
  if (range.min == null) return []
  const yen = (n: number) => `¥${Math.round(n).toLocaleString()}`
  const find = (d: number) => trendChanges.find((t) => t.days === d && t.change != null)
  const d30 = find(30)
  const d90 = find(90)
  const short = find(7)
  const lines: string[] = []

  // 1文目: 現在の相場水準
  lines.push(
    `直近の集計では、中古${modelName}の相場は${yen(range.min)}〜${yen(range.max!)}で推移しています。`,
  )

  // 2文目: 中期（30日 or 90日）の方向感。値動きの大きさで表現を変える
  const mid = d30 ?? d90
  if (mid && mid.change != null) {
    const abs = Math.abs(mid.change)
    const ratio = abs / range.min
    const scale = ratio < 0.02 ? 'ほぼ横ばい' : ratio < 0.05 ? 'ゆるやかに' : '大きく'
    if (mid.direction === 'down') {
      lines.push(
        scale === 'ほぼ横ばい'
          ? `この${mid.days}日間は${yen(abs)}の下落にとどまり、相場はほぼ横ばいです。`
          : `この${mid.days}日間で${yen(abs)}${scale === '大きく' ? 'も' : ''}値下がりしており、${scale}下落する流れが続いています。`,
      )
    } else if (mid.direction === 'up') {
      lines.push(
        scale === 'ほぼ横ばい'
          ? `この${mid.days}日間の変動は${yen(abs)}程度で、相場はほぼ横ばいです。`
          : `この${mid.days}日間で${yen(abs)}${scale === '大きく' ? 'も' : ''}値上がりしており、${scale}上昇する流れが続いています。`,
      )
    } else {
      lines.push(`この${mid.days}日間は目立った変動がなく、相場は落ち着いています。`)
    }
  }

  // 3文目: 直近1週間の動きと、買い時の目安（値動きの向きで示唆を変える）
  if (short && short.change != null && Math.abs(short.change) / range.min >= 0.01) {
    lines.push(
      short.direction === 'down'
        ? `直近1週間でも${yen(Math.abs(short.change))}下がっており、価格が動いている時期です。急ぎでなければもう少し様子を見る余地があります。`
        : `直近1週間は${yen(Math.abs(short.change))}上昇しています。在庫が減ると値上がりしやすいため、狙っている場合は早めの検討がおすすめです。`,
    )
  } else if (monthlySummary.length >= 2) {
    const [cur, prev] = monthlySummary
    // 変更日を含む月は新旧の基準が混在するため、月別平均どうしを比較しない
    const comparable = isMonthPureNewBasis(cur.dateTime) && isMonthPureNewBasis(prev.dateTime)
    if (comparable && cur.avgPrice != null && prev.avgPrice != null) {
      const diff = cur.avgPrice - prev.avgPrice
      if (Math.abs(diff) / prev.avgPrice >= 0.01) {
        lines.push(
          `月別の平均でも${prev.month}の${yen(prev.avgPrice)}から${cur.month}は${yen(cur.avgPrice)}へと、${diff < 0 ? '下落' : '上昇'}傾向が見られます。`,
        )
      }
    }
  }

  // 4文目: 記録期間内での価格の位置（買い時の目安）。履歴を持つサイトだけが出せる指標
  if (position) {
    const { low, high, percentile, days } = position
    const span = days >= 60 ? `約${Math.round(days / 30)}ヶ月` : `${days}日`
    const verdict =
      percentile <= 15
        ? `記録している${span}の中では最安値に近く、買い時としては狙いやすい水準です。`
        : percentile <= 40
          ? `記録している${span}の中では安値寄りの水準です。`
          : percentile >= 85
            ? `記録している${span}の中では高値圏にあり、急ぎでなければ値下がりを待つ選択肢もあります。`
            : percentile >= 60
              ? `記録している${span}の中ではやや高値圏です。`
              : `記録している${span}の中では平均的な水準です。`
    lines.push(`集計期間の最安は${yen(low)}、最高は${yen(high)}で、${verdict}`)
  }

  return lines
}

export default function PriceChartSection({
  dailyData, modelName, category, latestMinMaxPairs, storageNote, priceListLink, children,
}: Props) {
  const range = calculateAvgPriceRange(latestMinMaxPairs)
  const trendChanges = calculateTrendChanges(dailyData)
  const monthlySummary = calculateMonthlySummary(dailyData)
  const dailyRows = calculateDailyTableData(dailyData)
  const pricePosition = calculatePricePosition(dailyData)
  const trendReport = buildTrendReport(modelName, range, trendChanges, monthlySummary, pricePosition)
  // 集計基準の変更日をまたぐ期間を表示しているときだけ、グラフの段差を説明する
  const logicChangeNote = priceLogicChangeNote(dailyData.labels)

  return (
    <section className="l-section" id="price-trend" aria-labelledby="heading-price-trend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-price-trend">
          中古{modelName}の価格推移
        </h2>
        <p className="m-section-desc">
          主要ECサイトの販売価格を定期的に集計し、中古相場の推移をグラフと表で可視化しています。
        </p>
        {priceListLink && (
          <p className="m-section-desc">
            中古相場を比較したい方は「<a href={priceListLink.href} style={{ color: 'var(--color-primary)' }}>{priceListLink.label}</a>」もあわせてご覧ください。
          </p>
        )}

        <div className="m-card m-card--shadow">
          {range.min != null && (
            <div className="price-summary">
              <div>
                <p className="price-current-label">現在の相場（税込）</p>
                <p className="price-current-value m-price-display m-price-display--lg">
                  &yen;{range.min?.toLocaleString()} 〜 &yen;{range.max?.toLocaleString()}
                </p>
                <p className="price-current-note">
                  集計対象：{modelName}{storageNote ? ` ${storageNote}` : ''}
                </p>
              </div>
              {trendChanges.length > 0 && (
                <dl className="price-trends">
                  {trendChanges.map(tc => (
                    <div key={tc.days} className="price-trend-item">
                      <dt className="price-trend-period">{tc.period}</dt>
                      <dd className={`price-trend-value price-trend-value--${tc.direction === 'up' ? 'up' : tc.direction === 'down' ? 'down' : 'flat'}`}>
                        {tc.change != null ? (
                          <>
                            {tc.direction === 'up' && <i className="fa-solid fa-caret-up" aria-hidden="true"></i>}
                            {tc.direction === 'down' && <i className="fa-solid fa-caret-down" aria-hidden="true"></i>}
                            {tc.direction === 'stable' && <i className="fa-solid fa-minus" aria-hidden="true"></i>}
                            {' '}&yen;{Math.abs(tc.change).toLocaleString()}
                          </>
                        ) : '-'}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}

          <figure className="price-chart" aria-label={`中古${modelName}の価格推移チャート`}>
            <div style={{ height: 300 }}>
              <PriceChartLoader
                labels={dailyData.labels}
                avgMin={dailyData.avgMin}
                avgMax={dailyData.avgMax}
                modelName={modelName}
              />
            </div>
            <figcaption className="m-legend">
              <span className="m-legend__item m-legend__item--max">上限価格</span>
              <span className="m-legend__item m-legend__item--min">下限価格</span>
            </figcaption>
          </figure>

          {trendReport.length > 0 && (
            <div className="m-callout m-callout--tip" style={{ margin: 'var(--space-xl) var(--space-lg) var(--space-lg)' }}>
              <span className="m-callout__label">
                <i className="fa-solid fa-chart-line" aria-hidden="true"></i> 中古相場の分析
              </span>
              {trendReport.map((line, i) => (
                <p key={i} className="m-callout__text" style={{ margin: i === 0 ? 0 : 'var(--space-xs) 0 0' }}>
                  {line}
                </p>
              ))}
            </div>
          )}

          {logicChangeNote && (
            <div
              className="m-callout m-callout--muted"
              style={{
                margin: trendReport.length > 0
                  ? 'var(--space-md) var(--space-lg) var(--space-lg)'
                  : 'var(--space-xl) var(--space-lg) var(--space-lg)',
              }}
            >
              <span className="m-callout__label">
                <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i> 集計基準の変更について
              </span>
              <p className="m-callout__text">{logicChangeNote}</p>
            </div>
          )}
        </div>

        <div className="m-card m-card--shadow price-details-card">
          <p className="price-details-card-heading">{modelName}の価格推移 詳細</p>

          {monthlySummary.length > 0 && (
            <>
              <p className="price-details-heading">月別平均価格</p>
              <div className="l-grid l-grid--3col l-grid--gap-lg l-grid--mb-2xl">
                {monthlySummary.map(ms => (
                  <div key={ms.dateTime} className="m-card m-card--sm m-stat-card monthly-card">
                    <p className="m-stat-card__label"><time dateTime={ms.dateTime}>{ms.month}</time></p>
                    <p className="m-stat-card__value">{formatPrice(ms.avgPrice)}</p>
                    <p className="m-stat-card__note">
                      {formatPrice(ms.minPrice)} 〜 {formatPrice(ms.maxPrice)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {dailyRows.length > 0 && (
            <>
              <p className="price-details-heading">日別価格データ</p>
              <div className="price-table-wrap">
                <table className="m-table">
                  <caption className="visually-hidden">{modelName}の日別中古価格データ</caption>
                  <thead>
                    <tr>
                      <th scope="col">日付</th>
                      <th scope="col">最安値</th>
                      <th scope="col">最高値</th>
                      <th scope="col">平均相場</th>
                      <th scope="col">前日比</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyRows.map(row => (
                      <tr key={row.dateTime}>
                        <td><time dateTime={row.dateTime}>{row.dateStr}</time></td>
                        <td>{formatPrice(row.min)}</td>
                        <td>{formatPrice(row.max)}</td>
                        <td>{formatPrice(row.avg)}</td>
                        <td className={
                          row.change != null && row.change > 0 ? 'm-table-up'
                          : row.change != null && row.change < 0 ? 'm-table-down'
                          : 'm-table-flat'
                        }>
                          {row.change == null ? (
                            <>-</>
                          ) : row.change !== 0 ? (
                            <>{row.change > 0 ? '+' : ''}&yen;{row.change.toLocaleString()}</>
                          ) : (
                            <>±0</>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {children}

        <div className="m-callout m-callout--muted u-mt-2xl">
          <span className="m-callout__label"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> 中古相場の算出方法について</span>
          <p className="m-callout__text">
            {priceSourceNote(category)}
          </p>
        </div>
      </div>
    </section>
  )
}
