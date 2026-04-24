export type PriceEntry = {
  date: string
  min: number
  max: number
  avg: number
}

// JST date helpers — price-info pages are built on UTC servers (Vercel)
function getJSTDateStr(): string {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

function formatDateDisplay(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  return `${y}年${Number(m)}月${Number(d)}日`
}

/** 平均算出: min/maxの配列から PriceEntry の avg/min/max を返す */
export function calcAvgFromShops(
  minPrices: number[],
  maxPrices: number[],
  date: string,
): PriceEntry | null {
  if (minPrices.length === 0 || maxPrices.length === 0) return null
  const avgMin = Math.round(minPrices.reduce((a, b) => a + b, 0) / minPrices.length / 100) * 100
  const avgMax = Math.round(maxPrices.reduce((a, b) => a + b, 0) / maxPrices.length / 100) * 100
  const avg = Math.round((avgMin + avgMax) / 2 / 100) * 100
  return { date, min: avgMin, max: avgMax, avg }
}

/** 価格変化算出: ソート済み prices から currentPrice / priceChange / priceChangePercent を返す */
export function calcPriceStats(prices: PriceEntry[]): {
  currentPrice: number
  priceChange: number
  priceChangePercent: number
} {
  const currentPrice = prices[prices.length - 1].avg

  let oldPrice = prices[0].avg
  // JST offset prevents UTC midnight from shifting the 30-day window
  const cutoffStr = new Date(Date.now() + 9 * 60 * 60 * 1000 - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  for (const p of prices) {
    if (p.date >= cutoffStr) {
      oldPrice = p.avg
      break
    }
  }

  const priceChange = currentPrice - oldPrice
  const priceChangePercent = oldPrice > 0 ? Math.round((priceChange / oldPrice) * 1000) / 10 : 0
  return { currentPrice, priceChange, priceChangePercent }
}

/** 日毎に集約: 同一日は後エントリで上書き、日付昇順でソート */
export function buildDailyPrices(entries: Array<PriceEntry | null>): PriceEntry[] {
  const dayMap = new Map<string, PriceEntry>()
  for (const entry of entries) {
    if (!entry) continue
    dayMap.set(entry.date, entry)
  }
  return [...dayMap.values()].sort((a, b) => a.date.localeCompare(b.date))
}

/** ランキング用: 価格安い順のコピーを返す */
export function buildRankingData<T extends { currentPrice: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.currentPrice - b.currentPrice)
}

/** 値下がりランキング: priceChange < 0 のみ、下落幅大きい順 */
export function buildPriceDropRanking<T extends { priceChange: number }>(items: T[], limit = 10): T[] {
  return items.filter((m) => m.priceChange < 0).sort((a, b) => a.priceChange - b.priceChange).slice(0, limit)
}

/** 各シリーズから1機種ずつ最大 max 件の初期選択ID */
export function buildInitialSelected(seriesGroups: Record<string, number[]>, max = 2): number[] {
  const selected: number[] = []
  for (const ids of Object.values(seriesGroups)) {
    if (ids.length > 0 && selected.length < max) selected.push(ids[0])
  }
  return selected
}

/** modelsData の最新価格日付を ISO 8601 文字列で返す（フォールバック: 現在時刻） */
export function getLatestPriceDate(modelsData: { prices: PriceEntry[] }[]): string {
  let max = ''
  for (const m of modelsData) {
    const last = m.prices[m.prices.length - 1]?.date ?? ''
    if (last > max) max = last
  }
  return max ? `${max}T00:00:00.000Z` : new Date().toISOString()
}

export type PageDates = {
  dateStr: string
  dateDisplay: string
  dateModified: string
  dateSource: 'price_logs' | 'now'
}

/** price-info ページの日付を一か所で組み立てる */
export function buildPageDates(modelsData: { prices: PriceEntry[] }[]): PageDates {
  const dateStr = getJSTDateStr()
  let max = ''
  for (const m of modelsData) {
    const last = m.prices[m.prices.length - 1]?.date ?? ''
    if (last > max) max = last
  }
  return {
    dateStr,
    dateDisplay: formatDateDisplay(dateStr),
    dateModified: max ? `${max}T00:00:00.000Z` : new Date().toISOString(),
    dateSource: max ? 'price_logs' : 'now',
  }
}
