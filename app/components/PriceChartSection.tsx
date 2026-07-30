import PriceChartLoader from '@/app/components/PriceChartLoader'
import PriceHistogram from '@/app/components/PriceHistogram'
import { buildSnapshotReport, type PriceStats, type InventoryInsight } from '@/lib/utils/price-stats'
import {
  priceSourceNoteParagraphs,
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
  /** その日の流通量（全ショップ合計）。2026-07-30 より前は記録がないため null */
  counts?: (number | null)[]
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
   * 最新ログの価格分布。渡された場合は中央値ベースで相場を表示する。
   * 2026-07-30 より前のログしかない機種では null になるため、その場合は
   * 従来どおり最安値〜最高値で表示する。
   */
  priceStats?: PriceStats | null
  /** 流通量から組み立てた在庫の状況。null なら表示しない */
  inventoryInsight?: InventoryInsight | null
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
  /** その日の流通量。記録がない日は null */
  count: number | null
  /** 前日からの在庫の増減。どちらかの日に記録がなければ null */
  countChange: number | null
}

function calculateDailyTableData(dailyData: DailyDataType): DailyRow[] {
  const { labels, avgMin, avgMax, counts } = dailyData
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
    // 在庫数は集計基準の変更と無関係（除外ロジックの影響は受けるが段差にはならない）ため、
    // 価格の増減と違ってまたぐ日でも差分を出してよい
    const count = counts?.[i] ?? null
    const prevCount = i > 0 ? counts?.[i - 1] ?? null : null
    const countChange = count != null && prevCount != null ? count - prevCount : null

    rows.push({
      dateStr: labels[i].replace(/-/g, '/'),
      dateTime: labels[i],
      min, max, avg: dayAvg, change, changeDirection, count, countChange,
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
  stats: PriceStats | null | undefined,
): string[] {
  if (range.min == null) return []
  const yen = (n: number) => `¥${Math.round(n).toLocaleString()}`
  const find = (d: number) => trendChanges.find((t) => t.days === d && t.change != null)
  const d30 = find(30)
  const d90 = find(90)
  const short = find(7)
  const lines: string[] = []

  // 分布が取れている機種では、件数・中央値・価格帯は相場ヘッダーに出ているため
  // ここでは繰り返さず、値動きの話だけをする。
  // 「今どの価格帯に何件あるか」は時系列ではないので価格分布ブロック側へ回す
  if (!stats) {
    lines.push(
      `直近の集計では、中古${modelName}の相場は${yen(range.min)}〜${yen(range.max!)}で推移しています。`,
    )
  }

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

/**
 * 価格分布から読み取れることを1文にする。
 * 棒グラフを見れば「どこが厚いか」は分かるが、それが全体の何割かまでは読み取れないため、
 * 比率を添えて狙い目の価格帯として提示する。
 */
export default function PriceChartSection({
  dailyData, modelName, category, latestMinMaxPairs, storageNote, priceListLink,
  priceStats, inventoryInsight,
}: Props) {
  const range = calculateAvgPriceRange(latestMinMaxPairs)
  const trendChanges = calculateTrendChanges(dailyData)
  const monthlySummary = calculateMonthlySummary(dailyData)
  const dailyRows = calculateDailyTableData(dailyData)
  const hasCounts = dailyRows.some((r) => r.count != null)
  const pricePosition = calculatePricePosition(dailyData)
  const trendReport = buildTrendReport(modelName, range, trendChanges, monthlySummary, pricePosition, priceStats)
  // ヒストグラムから読み取れる内容の言語化。時系列の話とは分けて価格分布ブロックに置く
  const snapshotReport = buildSnapshotReport(priceStats)
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
          {(priceStats != null || range.min != null) && (
            <div className="price-summary">
              <div>
                {/* ラベルと価格は1行にまとめる。縦積みにすると価格までの視線移動が長くなるため */}
                <div className="price-current-head">
                  <p className="price-current-label">現在の相場（税込）</p>
                  {priceStats ? (
                    // 最安値ではなく中央値を主役に置く。最安値は1点だけの外れ値であることが多く、
                    // その価格で買える商品が実際には見つからないため
                    <p className="price-current-value m-price-display m-price-display--lg">
                      &yen;{priceStats.median.toLocaleString()}
                    </p>
                  ) : (
                    <p className="price-current-value m-price-display m-price-display--lg">
                      &yen;{range.min?.toLocaleString()} 〜 &yen;{range.max?.toLocaleString()}
                    </p>
                  )}
                </div>
                <p className="price-current-note">
                  集計対象：{modelName}{storageNote ? ` ${storageNote}` : ''}
                  {priceStats && (
                    <>／ 販売中の{priceStats.count}件から算出（最安 &yen;{priceStats.min.toLocaleString()}）</>
                  )}
                </p>
              </div>
              {/* 3つとも「-」なら箱だけが並んで意味をなさないので出さない
                  （集計基準の変更をまたぐ間は増減を抑制しているため起こりうる） */}
              {trendChanges.some(tc => tc.change != null) && (
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

          {/* 値動きの解説。カコミにせず本文として読ませる
              （グラフのすぐ下に囲みが連続すると視覚的に重くなるため） */}
          {/* 分布ブロックが出ない機種（サンプルが少ない）では、在庫の状況を
              値動きの解説側に添えて情報を落とさない */}
          {(trendReport.length > 0 || (!priceStats?.histogram && inventoryInsight)) && (
            <div className="price-report">
              {trendReport.map((line, i) => (
                <p key={i} className="price-report__text">{line}</p>
              ))}
              {!priceStats?.histogram && inventoryInsight && (
                <p className="price-report__text">{inventoryInsight.text}</p>
              )}
            </div>
          )}

          {/* 月別・日別の生データは、読者が常に見たいものではない一方、
              相場の裏付けとして検索エンジン・AIクローラーには読ませたい。
              <details> なら閉じていてもHTMLに残るため、両立できる（JSでの遅延描画は不可） */}
          <details className="price-details-inline">
            <summary className="price-details-summary">
              {modelName}の価格推移 詳細（月別・日別データ）
            </summary>

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
                        {/* 記録が1日もない期間は列ごと出さない（"-"だけの列は情報がない） */}
                        {hasCounts && <th scope="col">在庫数</th>}
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
                          {hasCounts && (
                            <td>
                              {row.count == null ? (
                                <>-</>
                              ) : (
                                <>
                                  {row.count}件
                                  {row.countChange != null && row.countChange !== 0 && (
                                    <span className={row.countChange > 0 ? 'm-table-up' : 'm-table-down'}>
                                      {' '}({row.countChange > 0 ? '+' : ''}{row.countChange})
                                    </span>
                                  )}
                                </>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </details>

        </div>

        {/* ここまでが時系列（相場の推移とその詳細）。
            以降は「今この瞬間」のスナップショットなので、カードを分けて性質の違いを示す */}
        {priceStats?.histogram && (
          <div className="m-card m-card--shadow price-snapshot-card">
            {/* 価格推移(h2)の下位トピックなので h3。見出し階層を飛ばさない */}
            <h3 className="price-details-card-heading">
              中古{modelName}の在庫と価格分布
            </h3>

            {(
              <PriceHistogram
                histogram={priceStats.histogram}
                modelName={modelName}
                total={priceStats.count}
                // 日別テーブルと日付表記がズレないよう、グラフと同じラベルから取る
                date={dailyData.labels[dailyData.labels.length - 1] ?? null}
              />
            )}

            {(snapshotReport.length > 0 || inventoryInsight) && (
              <div className="price-report">
                {snapshotReport.map((line, i) => (
                  <p key={i} className="price-report__text">{line}</p>
                ))}
                {inventoryInsight && (
                  <p className="price-report__text">{inventoryInsight.text}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* 注記はセクション末尾に1つにまとめる。
            カコミが並ぶと重く見えるうえ、どちらも「相場の読み方」の話で切り分ける理由がない */}
        <div className="m-callout m-callout--muted u-mt-2xl">
          <span className="m-callout__label"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> 中古相場の算出方法について</span>
          {/* 分布から算出できた機種だけ、中央値ベースである旨の説明に切り替える。
              長文にすると読み飛ばされるため、段落と箇条書きに分けて描画する */}
          {priceSourceNoteParagraphs(category, priceStats ? 'median' : 'minmax').map((block, i) =>
            block.type === 'ul' ? (
              <ul key={i} className="m-callout__list">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p
                key={i}
                className="m-callout__text"
                style={{ margin: i === 0 ? 0 : 'var(--space-sm) 0 0' }}
              >
                {block.text}
              </p>
            )
          )}

          {/* 集計基準の変更は期間限定の注記。恒常的な説明とは区切り線で分ける */}
          {logicChangeNote && (
            <>
              <hr className="m-callout__divider" />
              <p className="m-callout__text" style={{ margin: 0 }}>{logicChangeNote}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
