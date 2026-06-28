// 価格推移グラフ 埋め込み用：カテゴリ共通のデータ構築＋設定（SDK等のserver専用importなし）

import { calcAvgFromShops, buildDailyPrices, type PriceEntry } from '@/lib/utils/price-info-helpers'
import { CHART_COLORS } from '@/lib/data/iphone-price-info'
import { get90DaysAgo } from '@/lib/utils/shared-helpers'

export interface ChartSeries {
  name: string
  slug: string
  color: string
  prices: PriceEntry[]
}

/** [最安カラム名, 最高カラム名] の配列 */
export type ShopFields = [minKey: string, maxKey: string][]
export const SHOPS_DEFAULT: ShopFields = [
  ['iosys_min', 'iosys_max'],
  ['geo_min', 'geo_max'],
  ['janpara_min', 'janpara_max'],
]
export const SHOPS_AIRPODS: ShopFields = [
  ['iosys_min', 'iosys_max'],
  ['janpara_min', 'janpara_max'],
  ['eearphone_min', 'eearphone_max'],
]
// MacBookは min1〜5_price / max1〜5_price の汎用5枠
export const SHOPS_MACBOOK: ShopFields = [
  ['min1_price', 'max1_price'],
  ['min2_price', 'max2_price'],
  ['min3_price', 'max3_price'],
  ['min4_price', 'max4_price'],
  ['min5_price', 'max5_price'],
]

/** カテゴリ別の表示ラベル・相場ページパス（ボタン/埋め込み両方で使用） */
export const CHART_EMBED_CONFIG: Record<string, { label: string; priceInfoPath: string }> = {
  iphone: { label: '中古iPhone', priceInfoPath: 'iphone/price-info' },
  ipad: { label: '中古iPad', priceInfoPath: 'ipad/ipad-price-info' },
  watch: { label: '中古Apple Watch', priceInfoPath: 'watch/watch-price-info' },
  macbook: { label: '中古MacBook', priceInfoPath: 'macbook/price-info' },
  airpods: { label: '中古AirPods', priceInfoPath: 'airpods/price-info' },
}

function logToEntry(log: { logged_at: string }, shops: ShopFields): PriceEntry | null {
  const rec = log as unknown as Record<string, number | null>
  const mins: number[] = []
  const maxs: number[] = []
  for (const [minK, maxK] of shops) {
    const mn = rec[minK]
    if (typeof mn === 'number' && mn > 0) mins.push(mn)
    const mx = rec[maxK]
    if (typeof mx === 'number' && mx > 0) maxs.push(mx)
  }
  return calcAvgFromShops(mins, maxs, log.logged_at.substring(0, 10))
}

/** 指定slug（最大4件）の価格系列を構築。fetchModels/fetchLogs を渡してカテゴリ非依存に */
export async function buildChartSeries<
  M extends { id: number; slug: string; model: string | null },
  L extends { logged_at: string },
>(
  slugs: string[],
  fetchModels: () => Promise<M[]>,
  fetchLogs: (ids: number[], since: string) => Promise<Record<number, L[]>>,
  shops: ShopFields = SHOPS_DEFAULT,
): Promise<ChartSeries[]> {
  const limited = slugs.filter(Boolean).slice(0, 4)
  if (limited.length === 0) return []

  const models = await fetchModels()
  const wanted = limited
    .map((s) => models.find((m) => m.slug === s))
    .filter((m): m is M => m != null)
  if (wanted.length === 0) return []

  const logsMap = await fetchLogs(
    wanted.map((m) => m.id),
    get90DaysAgo(),
  )

  const series: ChartSeries[] = []
  let colorIndex = 0
  for (const m of wanted) {
    const prices = buildDailyPrices((logsMap[m.id] || []).map((l) => logToEntry(l, shops)))
    if (prices.length === 0) continue
    series.push({
      name: m.model ?? m.slug,
      slug: m.slug,
      color: CHART_COLORS[colorIndex % CHART_COLORS.length],
      prices,
    })
    colorIndex++
  }
  return series
}
