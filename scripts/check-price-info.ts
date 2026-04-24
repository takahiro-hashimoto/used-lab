// Smoke check for price-info shared helpers
// Run: node --import tsx scripts/check-price-info.ts
import {
  buildDailyPrices,
  buildRankingData,
  buildPriceDropRanking,
  buildInitialSelected,
  buildPageDates,
  type PriceEntry,
} from '../lib/utils/price-info-helpers'

let passed = 0
let failed = 0

function assert(label: string, condition: boolean) {
  if (condition) {
    console.log(`  [ok] ${label}`)
    passed++
  } else {
    console.error(`  [FAIL] ${label}`)
    failed++
  }
}

// ---- buildDailyPrices ----
const e1: PriceEntry = { date: '2025-01-02', min: 100, max: 200, avg: 150 }
const e2: PriceEntry = { date: '2025-01-01', min: 90, max: 190, avg: 140 }
const e1dup: PriceEntry = { date: '2025-01-02', min: 110, max: 210, avg: 160 }

const daily = buildDailyPrices([e1, null, e2, e1dup])
assert('buildDailyPrices: deduplicates same date', daily.length === 2)
assert('buildDailyPrices: sorted ascending', daily[0].date === '2025-01-01')
assert('buildDailyPrices: later entry wins on duplicate date', daily[1].avg === 160)
assert('buildDailyPrices: ignores null', !daily.some((p) => !p))

// ---- buildRankingData ----
const items = [
  { id: 1, currentPrice: 30000, priceChange: -1000 },
  { id: 2, currentPrice: 10000, priceChange: -500 },
  { id: 3, currentPrice: 20000, priceChange: 200 },
]
const ranked = buildRankingData(items)
assert('buildRankingData: cheapest first', ranked[0].currentPrice === 10000)
assert('buildRankingData: does not mutate original', items[0].currentPrice === 30000)

// ---- buildPriceDropRanking ----
const drops = buildPriceDropRanking(items)
assert('buildPriceDropRanking: excludes positive change', drops.length === 2)
assert('buildPriceDropRanking: largest drop first', drops[0].priceChange === -1000)

const drops5 = buildPriceDropRanking(
  Array.from({ length: 15 }, (_, i) => ({ id: i, currentPrice: 0, priceChange: -(i + 1) })),
  5,
)
assert('buildPriceDropRanking: respects limit', drops5.length === 5)

// ---- buildInitialSelected ----
const groups = { Pro: [10, 11, 12], Air: [20, 21], Other: [] }
const sel2 = buildInitialSelected(groups)
assert('buildInitialSelected: default max=2', sel2.length === 2)
assert('buildInitialSelected: first id from each group', sel2[0] === 10 && sel2[1] === 20)

const sel1 = buildInitialSelected(groups, 1)
assert('buildInitialSelected: respects custom max', sel1.length === 1)

const selEmpty = buildInitialSelected({ A: [], B: [] })
assert('buildInitialSelected: empty groups return empty', selEmpty.length === 0)

// ---- buildPageDates ----
const modelsWithPrices = [
  { prices: [{ date: '2025-03-10', min: 0, max: 0, avg: 0 }] },
  { prices: [{ date: '2025-03-15', min: 0, max: 0, avg: 0 }] },
]
const dates = buildPageDates(modelsWithPrices)
assert('buildPageDates: dateSource = price_logs when data exists', dates.dateSource === 'price_logs')
assert('buildPageDates: dateModified contains latest date', dates.dateModified.startsWith('2025-03-15'))
assert('buildPageDates: dateStr is YYYY-MM-DD', /^\d{4}-\d{2}-\d{2}$/.test(dates.dateStr))
assert('buildPageDates: dateDisplay is Japanese format', dates.dateDisplay.includes('年'))

const datesNoData = buildPageDates([{ prices: [] }])
assert('buildPageDates: dateSource = now when no prices', datesNoData.dateSource === 'now')

// ---- summary ----
console.log(`\n[verify:price-info] ${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
