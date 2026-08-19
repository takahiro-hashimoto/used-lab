import Image from 'next/image'
import PriceHistogram from '@/app/components/PriceHistogram'
import type { PriceHistogram as PriceHistogramData } from '@/lib/utils/price-stats'
import type { PriceEntry } from '@/lib/utils/price-info-helpers'
import { crossesLogicChange, isBeforeLogicChange } from '@/lib/data/price-source-note'

// ============================================================
// 価格推移セクション（price-info 各ページ共通）
//
// 以前はカテゴリごとに同じファイルを置いていた。6ファイル・約1,500行の
// 99%が同一で、差分はカテゴリ名・画像パスなど数箇所の文字列だけだった。
// コピーは修正を6回書く構造そのもので、実際に embed ボタンでは
// コピー間の取り残しが404を生んだ（EmbedCodeButton のコメント参照）。
// 差分はすべて props で明示的に渡す。
// ============================================================

/** 各ページの ModelData から、このセクションが読むフィールドだけを抜いた形 */
export type PriceHistoryModel = {
  id: number
  name: string
  slug: string
  image: string
  chip: string
  year: string
  releaseDate: string
  /** AirPods には容量の概念が無いので任意 */
  storage?: string
  prices: PriceEntry[]
  distribution: {
    histogram: PriceHistogramData
    total: number
    date: string
    reportLines: string[]
    inventoryText: string | null
  } | null
}

type Props = {
  models: PriceHistoryModel[]
  /** 見出しに出すカテゴリ名。例 'iPhone'・'iMac・Mac mini' */
  categoryLabel: string
  /** 画像と機種ページの基点。'iphone' → /images/iphone/… と /iphone/{slug}/ */
  categoryPath: string
  /** 機種名を個別ページへリンクする。機種ページを持たない AirPods だけ false */
  linkModelName?: boolean
  /** 機種名の後ろにチップ名を付ける（MacBook / Mac の同名機種を区別する） */
  appendChipToName?: boolean
  /** メタ行の形式。year-chip =「2023年発売 / A16」/ release-month =「発売日 2023年9月」 */
  meta?: 'year-chip' | 'release-month'
  /** 中古相場ラベルに容量を出す。容量の概念が無い AirPods だけ false */
  showStorage?: boolean
  /** 月別サマリーの列数。機種数が少ない AirPods だけ 3 */
  monthlyGridCols?: 3 | 4
}

type MonthlySummary = {
  month: string
  label: string
  avg: number
  min: number
  max: number
}

function calcMonthlySummary(prices: PriceEntry[]): MonthlySummary[] {
  const monthly = new Map<string, { avgs: number[]; min: number; max: number }>()
  for (const p of prices) {
    const ym = p.date.substring(0, 7)
    if (!monthly.has(ym)) {
      monthly.set(ym, { avgs: [], min: Infinity, max: 0 })
    }
    const bucket = monthly.get(ym)!
    bucket.avgs.push(p.avg)
    bucket.min = Math.min(bucket.min, p.min)
    bucket.max = Math.max(bucket.max, p.max)
  }

  return [...monthly.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([ym, data]) => {
      const [y, m] = ym.split('-')
      return {
        month: ym,
        label: `${y}年${parseInt(m)}月`,
        avg: Math.round(data.avgs.reduce((a, b) => a + b, 0) / data.avgs.length / 100) * 100,
        min: data.min,
        max: data.max,
      }
    })
}

const DAY_NAMES = ['日', '月', '火', '水', '木', '金', '土']

/** "2025/9" → 202509。比較用の数値キー */
function releaseKey(releaseDate: string): number {
  const [y, m] = releaseDate.split('/').map(Number)
  return (y || 0) * 100 + (m || 0)
}

/**
 * 表示名を組み立てる（appendChipToName 用）。
 * 同名機種の区別のため model 側にもチップ名が入っている場合があるので、
 * 既に含まれていれば付け足さない（"14インチ M3 M3" になるのを防ぐ）
 */
function buildDisplayName(name: string, chip: string): string {
  const base = name.replace(/（\d{4}）/, ' ').replace(/\s+/g, ' ').trim()
  return chip && !base.includes(chip) ? `${base} ${chip}` : base
}

export default function PriceHistorySection({
  models,
  categoryLabel,
  categoryPath,
  linkModelName = true,
  appendChipToName = false,
  meta = 'year-chip',
  showStorage = true,
  monthlyGridCols = 4,
}: Props) {
  return (
    <section className="l-section" id="pd-history" aria-labelledby="pd-history-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-history-title">
          {categoryLabel} 価格推移データ（過去90日間）
        </h2>
        <p className="m-section-desc">各モデルの価格推移を日別・月別で確認できます。</p>

        {/* 系統別ではなく発売日の新しい順に並べる。
            相場を見に来た人は「今の機種から順に」見たいため。
            同月発売は元の並びを保つ */}
        {[...models].sort((a, b) => releaseKey(b.releaseDate) - releaseKey(a.releaseDate)).map((model) => {
          if (model.prices.length === 0) return null

          const monthlySummary = calcMonthlySummary(model.prices)
          // 集計基準の変更をまたぐ差分は算出方法の変更を含むため値動きにならない。
          // 同一基準（中央値）で最も古い日を起点にし、日が経つにつれ期間が伸びる
          const latestEntryForTrend = model.prices[model.prices.length - 1]
          const trendStart = crossesLogicChange(model.prices[0].date, latestEntryForTrend.date)
            ? model.prices.find((p) => !isBeforeLogicChange(p.date))
            : model.prices[0]
          const trendDays =
            trendStart && trendStart.date !== latestEntryForTrend.date
              ? Math.round(
                  (new Date(latestEntryForTrend.date).getTime() - new Date(trendStart.date).getTime()) / 86400000
                )
              : 0
          const totalChange = trendDays > 0 ? latestEntryForTrend.avg - trendStart!.avg : 0

          const reversedPrices = [...model.prices].reverse()
          // 件数の記録は 2026-07-30 以降のみ。1日もなければ列自体を出さない
          const hasCounts = reversedPrices.some((p) => p.count != null)
          const latestEntry = model.prices[model.prices.length - 1]

          const displayName = appendChipToName ? buildDisplayName(model.name, model.chip) : model.name

          return (
            // 閉じていてもHTMLに残るよう <details> を使う。
            // {isOpen && ...} だと日別・月別データがクローラーに一切見えない
            <details key={model.id} className="pd-history-model">
              <summary className="pd-history-summary">
                <div className="pd-history-summary-left pd-history-summary-left--thumb">
                  {model.image && (
                    <Image
                      src={`/images/${categoryPath}/${model.image}`}
                      alt=""
                      width={56}
                      height={56}
                      className="pd-history-model-thumb"
                    />
                  )}
                  <div className="pd-history-summary-text">
                    {linkModelName ? (
                      <h3 className="pd-history-model-name">
                        <a href={`/${categoryPath}/${model.slug}/`} className="pd-history-model-link">{displayName}</a>
                      </h3>
                    ) : (
                      <h3 className="pd-history-model-name">{displayName}</h3>
                    )}
                    {meta === 'year-chip' ? (
                      <span className="pd-history-model-meta">{model.year}年発売 / {model.chip}</span>
                    ) : (
                      <span className="pd-history-model-meta">発売日 {model.releaseDate.replace(/^(\d{4})\/0?(\d+)$/, '$1年$2月')}</span>
                    )}
                  </div>
                </div>
                <span className="pd-history-summary-right">
                  <div className="pd-history-summary-price">
                    <span className="pd-history-price-range">
                      {showStorage ? (
                        <small className="pd-history-price-range__label">中古相場（{model.storage}）</small>
                      ) : (
                        <small className="pd-history-price-range__label">中古相場</small>
                      )}
                      {/* 他の一覧・詳細ページと同じ実勢相場（中央値）。
                          最安値を出すと1点限りの特価が相場に見えてしまう */}
                      &yen;{latestEntry.avg.toLocaleString()}
                    </span>
                    <span className={`pd-history-trend${totalChange < 0 ? ' is-down' : totalChange > 0 ? ' is-up' : ''}`}>
                      {totalChange !== 0 ? (
                        <>{trendDays}日間で&yen;{Math.abs(totalChange).toLocaleString()}{totalChange < 0 ? '値下がり' : '値上がり'}傾向</>
                      ) : (
                        <>{trendDays > 0 ? `${trendDays}日間で価格変動なし` : '比較できる期間のデータがまだありません'}</>
                      )}
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-down pd-history-toggle" aria-hidden="true"></i>
                </span>
              </summary>

              <div className="pd-history-content">
                  {/* 月別サマリー */}
                  {monthlySummary.length > 0 && (
                    <div className="u-mt-lg u-mb-xl">
                      <h4 className="pd-history-subtitle">月別平均価格</h4>
                      <div className={`l-grid l-grid--${monthlyGridCols}col l-grid--gap-lg`}>
                        {monthlySummary.map((ms) => (
                          <div key={ms.month} className="m-card m-card--sm m-stat-card monthly-card">
                            <p className="m-stat-card__label">{ms.label}</p>
                            <p className="m-stat-card__value">&yen;{ms.avg.toLocaleString()}</p>
                            <p className="m-stat-card__note">
                              &yen;{ms.min.toLocaleString()} 〜 &yen;{ms.max.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 日別データ */}
                  <div className="u-mt-lg">
                    <h4 className="pd-history-subtitle">日別価格データ</h4>
                    <div className="price-table-wrap">
                      <table className="m-table">
                        <caption className="visually-hidden">{model.name}の価格推移データ</caption>
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
                          {reversedPrices.map((price, idx) => {
                            const d = new Date(price.date)
                            const dateShort = `${d.getMonth() + 1}/${d.getDate()}`
                            const dayOfWeek = DAY_NAMES[d.getDay()]
                            const prevPrice = idx < reversedPrices.length - 1 ? reversedPrices[idx + 1] : null
                            // 集計基準の変更をまたぐ差分は段差そのもの。値動きとして出すと誤解を招く
                            const crossesChange = prevPrice != null && crossesLogicChange(prevPrice.date, price.date)
                            const dayChange = prevPrice && !crossesChange ? price.avg - prevPrice.avg : null

                            return (
                              <tr key={price.date}>
                                <td>
                                  <time dateTime={price.date}>
                                    {dateShort}({dayOfWeek})
                                  </time>
                                </td>
                                <td>&yen;{price.min.toLocaleString()}</td>
                                <td>&yen;{price.max.toLocaleString()}</td>
                                <td>
                                  <strong>&yen;{price.avg.toLocaleString()}</strong>
                                </td>
                                <td
                                  className={
                                    dayChange != null && dayChange > 0
                                      ? 'm-table-up'
                                      : dayChange != null && dayChange < 0
                                        ? 'm-table-down'
                                        : 'm-table-flat'
                                  }
                                >
                                  {dayChange != null && dayChange !== 0 ? (
                                    <>
                                      {dayChange > 0 ? '+' : ''}
                                      {dayChange.toLocaleString()}
                                    </>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                {hasCounts && (
                                  <td>{price.count == null ? '-' : `${price.count}件`}</td>
                                )}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 日別・月別は時系列。ここから先は「今この瞬間」のスナップショットなので、
                      個別機種ページと同じく後ろに置いて性質の違いを示す */}
                  {model.distribution && (
                    <div className="u-mt-xl">
                      <h4 className="pd-history-subtitle">在庫と価格分布</h4>
                      <PriceHistogram
                        histogram={model.distribution.histogram}
                        modelName={model.name}
                        total={model.distribution.total}
                        date={model.distribution.date}
                      />
                      {(model.distribution.reportLines.length > 0 || model.distribution.inventoryText) && (
                        <div className="price-report">
                          {model.distribution.reportLines.map((line, i) => (
                            <p key={i} className="price-report__text">{line}</p>
                          ))}
                          {model.distribution.inventoryText && (
                            <p className="price-report__text">{model.distribution.inventoryText}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}
