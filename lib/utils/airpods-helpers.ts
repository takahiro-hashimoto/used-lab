import type { AirPodsModel, AirPodsPriceLog } from '../types'
import {
  getReleaseYear,
  getReleaseMonth,
  formatReleaseDate,
  formatPrice,
  filterLast3Months as filterLast3MonthsGeneric,
  calculateRepairLifespan,
  calculateOSLifespan as calculateOSLifespanGeneric,
  aggregateDailyPrices as aggregateDailyPricesGeneric,
  calculatePriceRange as calculatePriceRangeGeneric,
} from './shared-helpers'

// Re-export shared functions that have the same signature
export { calculateRepairLifespan } from './shared-helpers'
export { formatReleaseDate, formatPrice } from './shared-helpers'

/**
 * ファームウェアサポート寿命計算（リリース年+7年）
 * 内部的にはcalculateOSLifespanを使用し、プロパティ名を変換
 */
export function calculateFirmwareLifespan(date: string | null): {
  releaseYear: number
  endYear: number
  remainingYears: number
  isSupported: boolean
} {
  const result = calculateOSLifespanGeneric(date, 7)
  return {
    releaseYear: result.releaseYear,
    endYear: result.osEndYear,
    remainingYears: result.remainingYears,
    isSupported: result.isSupported,
  }
}

/**
 * 日毎の価格集計（3社の最安値平均・最高値平均、直近90日）
 * AirPodsは iosys, janpara, eearphone の3店舗
 */
export function aggregateDailyPrices(logs: AirPodsPriceLog[]) {
  return aggregateDailyPricesGeneric(logs, (log) => ({
    mins: [log.iosys_min, log.janpara_min, log.eearphone_min],
    maxes: [log.iosys_max, log.janpara_max, log.eearphone_max],
  }))
}

/**
 * 直近3ヶ月分のログを抽出
 */
export function filterLast3Months(logs: AirPodsPriceLog[]): AirPodsPriceLog[] {
  return filterLast3MonthsGeneric(logs)
}

/**
 * 最新の価格レンジを取得（AirPods: iosys, janpara, eearphone）
 */
export function calculatePriceRange(log: AirPodsPriceLog | null): {
  minPrice: number | null
  maxPrice: number | null
  shops: { name: string; min: number | null; max: number | null }[]
} {
  if (!log) return { minPrice: null, maxPrice: null, shops: [] }
  return calculatePriceRangeGeneric([
    { name: 'イオシス', min: log.iosys_min, max: log.iosys_max },
    { name: 'じゃんぱら', min: log.janpara_min, max: log.janpara_max },
    { name: 'eイヤホン', min: log.eearphone_min, max: log.eearphone_max },
  ])
}

// --- 購入判定ロジック（AirPods版：PHP版から移植） ---

export type VerdictRank = 'best' | 'good' | 'wait'

export interface VerdictResult {
  verdictMain: string
  statusLabel: string
  rank: VerdictRank
  remainingYears: number
  yearsPassed: number
  descriptions: string[]
  suitability: SuitabilityItem[]
}

export interface SuitabilityItem {
  label: string
  mark: '◎' | '◯' | '△'
  icon: string
}

/**
 * 購入判定を一括算出（AirPods版）
 * 12ヶ月以内 → 最新モデル, 残り3年以上 → コスパ黄金期
 * ベンチマークスコアなし、チップ世代とサポート期間で判定
 */
export function getVerdict(
  model: AirPodsModel,
): VerdictResult {
  const releaseYear = getReleaseYear(model.date)
  const now = new Date()
  const monthsPassed = releaseYear > 0
    ? (now.getFullYear() - releaseYear) * 12 + now.getMonth() - (getReleaseMonth(model.date) - 1)
    : 0

  const remainingYears = Math.max(0.5, 7 - monthsPassed / 12)
  const remainingYearsFormatted = Math.round(remainingYears * 10) / 10
  const yearsPassed = Math.floor(monthsPassed / 12)

  // --- 判定ステータス ---
  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (monthsPassed < 12) {
    verdictMain = '最新モデルで安心'
    statusLabel = '現役バリバリ'
    rank = 'best'
  } else if (remainingYears >= 3) {
    verdictMain = '今が買い時！'
    statusLabel = 'コスパ黄金期'
    rank = 'best'
  } else if (remainingYears >= 1.5) {
    verdictMain = '悪くない選択'
    statusLabel = '実力派ミドル'
    rank = 'good'
  } else {
    verdictMain = '見送り推奨'
    statusLabel = '寿命間近'
    rank = 'wait'
  }

  // --- 適合度（AirPods版） ---
  const dailyOk: '◎' | '◯' | '△' = remainingYears >= 2 ? '◎' : remainingYears >= 1 ? '◯' : '△'
  const longUse: '◎' | '◯' | '△' = remainingYears >= 4 ? '◎' : remainingYears >= 2 ? '◯' : '△'
  const priceOk: '◎' | '◯' | '△' = monthsPassed >= 24 ? '◎' : monthsPassed >= 12 ? '◯' : '△'
  const stockOk: '◎' | '◯' | '△' = '◯'
  const ancOk: '◎' | '◯' | '△' = model.anc ? '◎' : '△'
  const spatialOk: '◎' | '◯' | '△' = model.spatial_audio ? '◎' : '△'

  const suitability: SuitabilityItem[] = [
    { label: '普段使い', mark: dailyOk, icon: 'headphones' },
    { label: '長く使える', mark: longUse, icon: 'calendar-check' },
    { label: '割安感', mark: priceOk, icon: 'yen-sign' },
    { label: '在庫豊富', mark: stockOk, icon: 'boxes-stacked' },
    { label: 'ノイキャン', mark: ancOk, icon: 'volume-xmark' },
    { label: '空間オーディオ', mark: spatialOk, icon: 'cube' },
  ]

  // --- 解説文 ---
  const descriptions: string[] = []
  const releaseDateFormatted = formatReleaseDate(model.date)

  if (remainingYears >= 3) {
    descriptions.push(
      `発売から${yearsPassed}年が経過していますが、まだ約${remainingYearsFormatted}年のサポート期間が見込めます。`
    )
    descriptions.push(
      `中古市場での価格もこなれてきており、コストパフォーマンスに優れた選択肢です。日常使いには十分な性能を維持しています。`
    )
  } else if (remainingYears >= 1.5) {
    descriptions.push(
      `発売（${releaseDateFormatted}）から時間が経過しており、残りのサポート期間は約${remainingYearsFormatted}年です。`
    )
    descriptions.push(
      `短期間の利用や、初期費用を抑えたい方には適していますが、長く使いたい場合は新しいモデルの検討をおすすめします。`
    )
  } else {
    descriptions.push(
      `発売から${yearsPassed}年以上が経過しており、サポート終了が近づいています。`
    )
    descriptions.push(
      `あと1〜2世代新しいモデルへの検討をおすすめします。`
    )
  }

  return {
    verdictMain,
    statusLabel,
    rank,
    remainingYears: remainingYearsFormatted,
    yearsPassed,
    descriptions,
    suitability,
  }
}

/**
 * モデルデータからFAQ（JSON-LD用のプレーンテキスト）を自動生成
 */
export function generateFaqsForJsonLd(
  model: AirPodsModel,
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  const v = getVerdict(model)
  const fwLife = calculateFirmwareLifespan(model.date)

  faqs.push({
    question: `中古${model.name}（${model.model}）はどこで買える？`,
    answer: `中古${model.name}（${model.model}）の購入先としては中古スマホ専門店、大手キャリアの認定中古品、ネットオークションやフリマアプリなどが考えられます。`,
  })

  faqs.push({
    question: `中古で${model.name}（${model.model}）を買うのにおすすめの販売店はどこ？`,
    answer: `イオシスがおすすめです。中古スマホの価格が他のサイトに比べて安い場合が多く、お得にAirPodsを購入することができるからです。`,
  })

  const releaseDate = formatReleaseDate(model.date)
  faqs.push({
    question: `${model.name}（${model.model}）の発売日はいつ？`,
    answer: releaseDate
      ? `${model.name}（${model.model}）の発売日は${releaseDate}です。`
      : `${model.name}（${model.model}）の発売日は公開されていません。`,
  })

  faqs.push({
    question: `${model.name}（${model.model}）はいつまで使える？`,
    answer: fwLife.isSupported
      ? `${model.name}（${model.model}）は${fwLife.endYear}年頃(±1年)まで安全に使えることが予想されます。`
      : `${model.name}（${model.model}）のサポートは終了している可能性があります。新しいモデルへの買い替えをおすすめします。`,
  })

  return faqs
}
