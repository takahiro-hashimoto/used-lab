import type { WatchModel, WatchPriceLog } from '../types'
import {
  getReleaseYear,
  getReleaseMonth,
  formatReleaseDate,
  formatPrice,
  filterLast3Months as filterLast3MonthsGeneric,
  calculateOSLifespan as calculateOSLifespanGeneric,
  aggregateDailyPrices as aggregateDailyPricesGeneric,
  calculatePriceRange as calculatePriceRangeGeneric,
} from './shared-helpers'

// Re-export shared functions that have the same signature
export { formatReleaseDate, formatPrice } from './shared-helpers'

/**
 * OS寿命計算（リリース年+5年）watchOS基準
 */
export function calculateOSLifespan(date: string | null) {
  return calculateOSLifespanGeneric(date, 5)
}

/**
 * 修理寿命計算（リリース年+7年）
 * Watch版は7年（他製品の9年とは異なる）
 */
export function calculateRepairLifespan(date: string | null): {
  releaseYear: number
  repairEndYear: number
  remainingYears: number
  isSupported: boolean
} {
  const releaseYear = getReleaseYear(date)
  if (releaseYear === 0) {
    return { releaseYear: 0, repairEndYear: 0, remainingYears: 0, isSupported: false }
  }
  const repairEndYear = releaseYear + 7
  const currentYear = new Date().getFullYear()
  const remainingYears = repairEndYear - currentYear
  return {
    releaseYear,
    repairEndYear,
    remainingYears: Math.max(0, remainingYears),
    isSupported: remainingYears > 0,
  }
}

/**
 * 日毎の価格集計（3社の最安値平均・最高値平均、直近90日）
 */
export function aggregateDailyPrices(logs: WatchPriceLog[]) {
  return aggregateDailyPricesGeneric(logs, (log) => ({
    mins: [log.iosys_min, log.geo_min, log.janpara_min],
    maxes: [log.iosys_max, log.geo_max, log.janpara_max],
  }))
}

/**
 * 直近3ヶ月分のログを抽出
 */
export function filterLast3Months(logs: WatchPriceLog[]): WatchPriceLog[] {
  return filterLast3MonthsGeneric(logs)
}

/**
 * 最新の価格レンジを取得
 */
export function calculatePriceRange(log: WatchPriceLog | null): {
  minPrice: number | null
  maxPrice: number | null
  shops: { name: string; min: number | null; max: number | null }[]
} {
  if (!log) return { minPrice: null, maxPrice: null, shops: [] }
  return calculatePriceRangeGeneric([
    { name: 'イオシス', min: log.iosys_min, max: log.iosys_max },
    { name: 'ゲオ', min: log.geo_min, max: log.geo_max },
    { name: 'じゃんぱら', min: log.janpara_min, max: log.janpara_max },
  ])
}

// --- 購入判定ロジック（Watch版：PHP版から移植） ---

/** 最新Apple Watch基準値（Apple Watch Series 10） */
const LATEST_WATCH_NAME = 'Apple Watch Series 10'
const LATEST_WATCH_PRICE = 59800
const LATEST_ANNUAL = Math.round(LATEST_WATCH_PRICE / 5)

export type VerdictRank = 'best' | 'good' | 'wait'

export interface VerdictResult {
  verdictMain: string
  statusLabel: string
  rank: VerdictRank
  performanceRatio: number
  remainingYears: number
  annualCost: number | null
  priceMin: number | null
  descriptions: string[]
  suitability: SuitabilityItem[]
}

export interface SuitabilityItem {
  label: string
  mark: '◎' | '◯' | '△'
  icon: string
}

/**
 * 購入判定を一括算出（Watch版）
 * 性能比は年数ベース: max(30, 100 - yearsPassed * 10)
 */
export function getVerdict(
  model: WatchModel,
  latestPrice: WatchPriceLog | null,
): VerdictResult {
  const priceRange = calculatePriceRange(latestPrice)
  const priceMin = priceRange.minPrice

  const releaseYear = getReleaseYear(model.date)
  const now = new Date()
  const monthsPassed = releaseYear > 0
    ? (now.getFullYear() - releaseYear) * 12 + now.getMonth() - (getReleaseMonth(model.date) - 1)
    : 0

  const remainingYears = Math.max(0.5, 5 - monthsPassed / 12)
  const remainingYearsFormatted = Math.round(remainingYears * 10) / 10

  // Watch: 性能比は年数ベース
  const yearsPassed = Math.floor(monthsPassed / 12)
  const performanceRatio = Math.max(30, 100 - yearsPassed * 10)

  const annualCost = priceMin && priceMin > 0
    ? Math.round(priceMin / remainingYears)
    : null

  // --- 判定ステータス ---
  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (monthsPassed < 12) {
    verdictMain = '最高性能を狙うなら今'
    statusLabel = '現役バリバリ'
    rank = 'best'
  } else if (remainingYears >= 2 && model.always_on_display) {
    verdictMain = '今が買い時！'
    statusLabel = 'コスパ黄金期'
    rank = 'best'
  } else if (remainingYears >= 2) {
    verdictMain = '悪くない選択'
    statusLabel = '実力派ミドル'
    rank = 'good'
  } else {
    verdictMain = '見送り推奨'
    statusLabel = '寿命間近'
    rank = 'wait'
  }

  // --- 適合度（Watch版：健康管理、普段使い、長く使える、在庫豊富、割安感、急速充電） ---
  const healthOk: '◎' | '◯' | '△' = (model.blood_oxygen && model.cardiogram) ? '◎' : (model.blood_oxygen || model.cardiogram) ? '◯' : '△'
  const dailyOk: '◎' | '◯' | '△' = model.always_on_display ? '◎' : '◯'
  const longUse: '◎' | '◯' | '△' = remainingYears >= 3 ? '◎' : remainingYears >= 1.5 ? '◯' : '△'
  const stockOk: '◎' | '◯' | '△' = yearsPassed >= 1 && yearsPassed <= 3 ? '◎' : '◯'
  const priceOk: '◎' | '◯' | '△' = annualCost != null
    ? (annualCost < LATEST_ANNUAL * 0.8 ? '◎' : annualCost <= LATEST_ANNUAL ? '◯' : '△')
    : '◯'
  const chargeOk: '◎' | '◯' | '△' = model.fast_charge ? '◎' : '△'

  const suitability: SuitabilityItem[] = [
    { label: '健康管理', mark: healthOk, icon: 'heart-pulse' },
    { label: '普段使い', mark: dailyOk, icon: 'bell' },
    { label: '長く使える', mark: longUse, icon: 'calendar-check' },
    { label: '在庫豊富', mark: stockOk, icon: 'boxes-stacked' },
    { label: '割安感', mark: priceOk, icon: 'yen-sign' },
    { label: '急速充電', mark: chargeOk, icon: 'bolt' },
  ]

  // --- 解説文 ---
  const descriptions: string[] = []

  const perfBase = `本機の処理性能は、最新の${LATEST_WATCH_NAME}の約${performanceRatio}%に相当します。`
  if (yearsPassed <= 2) {
    descriptions.push(`${perfBase}通知確認やフィットネスはもちろん、最新のwatchOS機能もスムーズに使える十分な処理力があります。`)
  } else {
    descriptions.push(`${perfBase}数値が低めに見えますが、通知確認やワークアウト計測などの基本動作は問題なくこなせる実力です。`)
  }

  const releaseDateFormatted = formatReleaseDate(model.date)
  descriptions.push(
    `Apple Watchは発売（${releaseDateFormatted}）から約5年がwatchOSサポートの目安です。本機の残り寿命は約${remainingYearsFormatted}年と推定されます。`
  )

  if (priceMin != null && priceMin > 0 && annualCost != null) {
    if (annualCost > LATEST_ANNUAL) {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}です。最新機の年単価（約${formatPrice(Math.round(LATEST_ANNUAL / 100) * 100)}）を上回るため、長く使うよりは「繋ぎの1台」としての検討をおすすめします。`
      )
    } else {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}。最新機（年単価 約¥${LATEST_ANNUAL.toLocaleString()}）より大幅に出費を抑えつつ、賢くApple Watchを所有できる好条件です。`
      )
    }
  }

  return {
    verdictMain,
    statusLabel,
    rank,
    performanceRatio,
    remainingYears: remainingYearsFormatted,
    annualCost,
    priceMin,
    descriptions,
    suitability,
  }
}

/**
 * advance データから統合フィーチャーリストを取得
 */
export function getAdvanceFeaturesList(model: WatchModel): string[] {
  if (!model.advance) return []

  const isUltra = model.model.toLowerCase().includes('ultra')
  const features: string[] = []

  if (model.advance.all_models?.features) {
    features.push(...model.advance.all_models.features)
  }

  if (isUltra) {
    if (model.advance.pro_only?.features) {
      features.push(...model.advance.pro_only.features)
    }
  } else {
    if (model.advance.standard_only?.features) {
      features.push(...model.advance.standard_only.features)
    }
  }

  return [...new Set(features)]
}

/**
 * モデルデータからFAQ（JSON-LD用のプレーンテキスト）を自動生成
 */
export function generateFaqsForJsonLd(
  model: WatchModel,
  latestPrice: WatchPriceLog | null,
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  const v = getVerdict(model, latestPrice)
  const osLife = calculateOSLifespan(model.date)

  faqs.push({
    question: `中古${model.model}は今から購入するのはあり？`,
    answer: `${v.verdictMain}（${v.statusLabel}）。${v.descriptions.join(' ')}`,
  })

  faqs.push({
    question: `中古${model.model}はどこで買える？`,
    answer: `中古${model.model}は、中古スマートウォッチ専門店（イオシス・じゃんぱら等）、総合リユース店（ゲオ・ブックオフ等）、ECモール（Amazon Renewed・楽天市場等）、フリマアプリ（メルカリ・ラクマ等）、Apple認定整備済製品で購入できます。保証が充実している専門店の利用がおすすめです。`,
  })

  faqs.push({
    question: `中古${model.model}購入におすすめのサイトはどこ？`,
    answer: `最もおすすめなのはイオシスです。3ヶ月の保証が付いており、在庫数も豊富です。価格の安さと商品の品質を重視する方に最適です。`,
  })

  const releaseDate = formatReleaseDate(model.date)
  faqs.push({
    question: `${model.model}の発売日はいつ？`,
    answer: releaseDate
      ? `${model.model}の発売日は${releaseDate}です。`
      : `${model.model}の発売日は公開されていません。`,
  })

  faqs.push({
    question: `${model.model}のwatchOSアップデートはいつまで？あと何年使える？`,
    answer: osLife.isSupported
      ? `${model.model}のwatchOSアップデートは${osLife.osEndYear}年頃までサポートされる見込みです。残り約${osLife.remainingYears}年使用可能と推定されます。Appleは一般的にApple Watchを発売から約5年間watchOSアップデートでサポートしています。`
      : `${model.model}のwatchOSアップデートサポートは終了している可能性があります。セキュリティの観点からは新しいモデルへの買い替えをおすすめします。`,
  })

  const advanceFeatures = getAdvanceFeaturesList(model)
  if (advanceFeatures.length > 0) {
    faqs.push({
      question: `${model.model}は前モデルからどんな点が進化していますか？`,
      answer: `${model.model}の主な進化ポイントは以下の通りです。${advanceFeatures.join('、')}。`,
    })
  } else {
    faqs.push({
      question: `${model.model}は前モデルからどんな点が進化していますか？`,
      answer: `${model.model}の進化ポイントの詳細については、本ページの「進化したポイント」セクションをご覧ください。`,
    })
  }

  return faqs
}
