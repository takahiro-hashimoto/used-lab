import PriceChart from '@/app/components/PriceChart'

type DailyDataType = {
  labels: string[]
  avgMin: (number | null)[]
  avgMax: (number | null)[]
}

type Props = {
  dailyData: DailyDataType
  modelName: string
  /** LatestLog の min/max を数値配列で渡す（calculateAvgPriceRange 用） */
  latestMinMaxPairs: { mins: number[]; maxes: number[] }[]
  latestDate: string | null
  /** 集計対象の補足テキスト（例: ストレージ容量） */
  storageNote?: string
  /** 注釈のショップ説明テキスト */
  shopDescription?: string
  /** セクション背景クラス */
  bgSubtle?: boolean
}

function formatPrice(price: number | null): string {
  if (price == null) return '-'
  return `¥${price.toLocaleString()}`
}

function calculateAvgPriceRange(pairs: { mins: number[]; maxes: number[] }[]): { min: number | null; max: number | null } {
  const allMins: number[] = []
  const allMaxes: number[] = []
  for (const pair of pairs) {
    const mins = pair.mins.filter(v => v > 0)
    const maxes = pair.maxes.filter(v => v > 0)
    if (mins.length > 0) allMins.push(Math.round(mins.reduce((a, b) => a + b, 0) / mins.length / 100) * 100)
    if (maxes.length > 0) allMaxes.push(Math.round(maxes.reduce((a, b) => a + b, 0) / maxes.length / 100) * 100)
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
  return [7, 30, 90].map(days => {
    const periodLabel = `${days}日間`
    const targetIdx = latestIdx - days
    if (targetIdx < 0 || avgMin[targetIdx] == null) {
      return { period: periodLabel, days, change: null, direction: 'stable' as const }
    }
    const pastVal = avgMin[targetIdx]!
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
        avgPrice: allPrices.length > 0 ? Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length / 100) * 100 : null,
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
    const avg = (min != null && max != null) ? Math.round((min + max) / 2 / 100) * 100 : null
    let prevAvg: number | null = null
    if (i > 0 && avgMin[i - 1] != null && avgMax[i - 1] != null) {
      prevAvg = Math.round((avgMin[i - 1]! + avgMax[i - 1]!) / 2 / 100) * 100
    }
    const change = (avg != null && prevAvg != null) ? avg - prevAvg : null
    const changeDirection: 'up' | 'down' | 'stable' = change != null ? (change > 0 ? 'up' : change < 0 ? 'down' : 'stable') : 'stable'
    rows.push({
      dateStr: labels[i].replace(/-/g, '/'),
      dateTime: labels[i],
      min, max, avg, change, changeDirection,
    })
  }
  return rows
}

export default function PriceChartSection({
  dailyData, modelName, latestMinMaxPairs, latestDate, storageNote, shopDescription, bgSubtle = false,
}: Props) {
  const range = calculateAvgPriceRange(latestMinMaxPairs)
  const trendChanges = calculateTrendChanges(dailyData)
  const monthlySummary = calculateMonthlySummary(dailyData)
  const dailyRows = calculateDailyTableData(dailyData)

  const defaultShopDesc = '各ECサイトの販売価格を定期的に集計したものです。実際の購入価格は在庫状況やタイミングにより変動する場合があります。'

  return (
    <section className={`l-section${bgSubtle ? ' l-section--bg-subtle' : ''}`} id="price-trend" aria-labelledby="heading-price-trend">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-price-trend">
          中古{modelName}の価格推移
        </h2>
        <p className="m-section-desc">
          主要ECサイトの販売価格を定期的に集計し、中古相場の推移をグラフと表で可視化しています。
        </p>

        <div className="m-card m-card--shadow">
          {range.min != null && (
            <div className="price-summary">
              <div>
                <p className="price-current-label">現在の相場（税込）</p>
                <p className="price-current-value m-price-display m-price-display--lg">
                  &yen;{range.min?.toLocaleString()} 〜 &yen;{range.max?.toLocaleString()}
                </p>
                {storageNote && (
                  <p className="price-current-note">
                    集計対象：{modelName} {storageNote}
                  </p>
                )}
                {!storageNote && (
                  <p className="price-current-note">
                    集計対象：{modelName}
                  </p>
                )}
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
              <PriceChart
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

          <p className="price-info-note">
            <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
            <span>掲載価格は{shopDescription || defaultShopDesc}</span>
          </p>
        </div>

        <div className="m-card m-card--shadow price-details-card">
          <h3 className="price-details-card-heading">{modelName}の価格推移 詳細</h3>

          {monthlySummary.length > 0 && (
            <>
              <h4 className="price-details-heading">月別平均価格</h4>
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
              <h4 className="price-details-heading">日別価格データ</h4>
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
                          {row.change != null && row.change !== 0 ? (
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
      </div>
    </section>
  )
}
