import type { MacBookModel, MacBookPriceLog } from '../types'
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
 * OS寿命計算（リリース年+7年）macOS基準
 */
export function calculateOSLifespan(date: string | null) {
  return calculateOSLifespanGeneric(date, 7)
}

/**
 * 日毎の価格集計（3社の最安値平均・最高値平均、直近90日）
 */
export function aggregateDailyPrices(logs: MacBookPriceLog[]) {
  return aggregateDailyPricesGeneric(logs, (log) => ({
    mins: [log.iosys_min, log.geo_min, log.janpara_min],
    maxes: [log.iosys_max, log.geo_max, log.janpara_max],
  }))
}

/**
 * 直近3ヶ月分のログを抽出
 */
export function filterLast3Months(logs: MacBookPriceLog[]): MacBookPriceLog[] {
  return filterLast3MonthsGeneric(logs)
}

/**
 * 最新の価格レンジを取得
 */
export function calculatePriceRange(log: MacBookPriceLog | null): {
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

// --- 購入判定ロジック（MacBook版：PHP版から移植） ---

/** 最新MacBook基準値（MacBook Pro 14 M4 Pro） */
const LATEST_MACBOOK_NAME = 'MacBook Pro 14インチ（2024）'
const LATEST_MACBOOK_SCORE = 15000  // score_multi 基準値
const LATEST_MACBOOK_PRICE = 248800
const LATEST_ANNUAL = Math.round(LATEST_MACBOOK_PRICE / 7)

/** コスパ黄金期のスコア閾値 */
const GOLDEN_SCORE_THRESHOLD = 8000

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
  efficiencyRating: string
}

export interface SuitabilityItem {
  label: string
  mark: '◎' | '◯' | '△'
  icon: string
}

/**
 * チップ世代から電力効率レーティングを算出
 */
export function getEfficiencyRating(cpu: string | null): string {
  if (!cpu) return '不明'
  const upper = cpu.toUpperCase()
  if (upper.includes('M4')) return '極めて高い'
  if (upper.includes('M3')) return '非常に高い'
  if (upper.includes('M2')) return '高い'
  if (upper.includes('M1')) return '標準'
  return '不明'
}

/**
 * 購入判定を一括算出（MacBook版）
 * 18ヶ月以内 → 最新機種, score_multi >= 8000 かつ残り3年以上 → コスパ黄金期
 */
export function getVerdict(
  model: MacBookModel,
  latestPrice: MacBookPriceLog | null,
): VerdictResult {
  const multiScore = model.score_multi || 0
  const priceRange = calculatePriceRange(latestPrice)
  const priceMin = priceRange.minPrice

  const releaseYear = getReleaseYear(model.date)
  const now = new Date()
  const monthsPassed = releaseYear > 0
    ? (now.getFullYear() - releaseYear) * 12 + now.getMonth() - (getReleaseMonth(model.date) - 1)
    : 0

  const remainingYears = Math.max(0.5, 7 - monthsPassed / 12)
  const remainingYearsFormatted = Math.round(remainingYears * 10) / 10

  const performanceRatio = LATEST_MACBOOK_SCORE > 0
    ? Math.round((multiScore / LATEST_MACBOOK_SCORE) * 100)
    : 0

  const annualCost = priceMin && priceMin > 0
    ? Math.round(priceMin / remainingYears)
    : null

  // --- 判定ステータス（MacBook: 18ヶ月閾値） ---
  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (monthsPassed < 18) {
    verdictMain = '最高性能を狙うなら今'
    statusLabel = '現役バリバリ'
    rank = 'best'
  } else if (remainingYears >= 3 && multiScore >= GOLDEN_SCORE_THRESHOLD) {
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

  // --- 適合度（MacBook版：クリエイティブ作業、事務・学習、長く使える、在庫豊富、外部接続性、バッテリー持ち） ---
  const yearsPassed = Math.floor(monthsPassed / 12)

  // クリエイティブ作業：score_multi基準
  const creativeOk: '◎' | '◯' | '△' = multiScore >= 12000 ? '◎' : multiScore >= 8000 ? '◯' : '△'

  // 事務・学習：score_single基準
  const singleScore = model.score_single || 0
  const officeOk: '◎' | '◯' | '△' = singleScore >= 2500 ? '◎' : singleScore >= 2000 ? '◯' : '△'

  // 長く使える
  const longUse: '◎' | '◯' | '△' = remainingYears >= 4 ? '◎' : remainingYears >= 2 ? '◯' : '△'

  // 在庫豊富
  const stockOk: '◎' | '◯' | '△' = yearsPassed >= 1 && yearsPassed <= 4 ? '◎' : '◯'

  // 外部接続性：SDカードスロットやHDMI, port内容
  const portStr = model.port || ''
  const hasRichPorts = model.hdmi || model.slot || portStr.includes('Thunderbolt5') || portStr.includes('Thunderbolt4 × 3')
  const connectOk: '◎' | '◯' | '△' = (model.hdmi && model.slot) ? '◎' : hasRichPorts ? '◯' : '△'

  // バッテリー持ち
  const batteryStr = model.battery || ''
  const batteryOk: '◎' | '◯' | '△' = batteryStr.includes('20') || batteryStr.includes('18') || batteryStr.includes('17') ? '◎' : batteryStr.includes('15') || batteryStr.includes('16') ? '◯' : '△'

  const suitability: SuitabilityItem[] = [
    { label: 'クリエイティブ作業', mark: creativeOk, icon: 'laptop-code' },
    { label: '事務・学習', mark: officeOk, icon: 'laptop' },
    { label: '長く使える', mark: longUse, icon: 'calendar-check' },
    { label: '在庫豊富', mark: stockOk, icon: 'boxes-stacked' },
    { label: '外部接続性', mark: connectOk, icon: 'plug' },
    { label: 'バッテリー持ち', mark: batteryOk, icon: 'battery-three-quarters' },
  ]

  // --- 電力効率 ---
  const efficiencyRating = getEfficiencyRating(model.cpu)

  // --- 解説文 ---
  const descriptions: string[] = []

  const perfBase = `本機の処理性能は、最新の${LATEST_MACBOOK_NAME}の約${performanceRatio}%に相当します。`
  if (multiScore >= 10000) {
    descriptions.push(`${perfBase}動画編集やソフトウェア開発などプロフェッショナル用途でも快適にこなせる十分なパワーを持っています。`)
  } else if (multiScore >= 8000) {
    descriptions.push(`${perfBase}日常的な事務作業はもちろん、写真編集やプログラミングなど幅広い用途で快適に使えます。`)
  } else {
    descriptions.push(`${perfBase}数値が低く見えるのは基準がプロ仕様だからです。Web閲覧やオフィス作業、動画視聴などの日常利用で不満を感じることはまずない実力です。`)
  }

  const releaseDateFormatted = formatReleaseDate(model.date)
  descriptions.push(
    `Apple製品は発売（${releaseDateFormatted}）から約7年がmacOSサポートの目安です。本機の残り寿命は約${remainingYearsFormatted}年と推定されます。`
  )

  if (priceMin != null && priceMin > 0 && annualCost != null) {
    if (annualCost > LATEST_ANNUAL) {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}です。最新機の年単価（約${formatPrice(Math.round(LATEST_ANNUAL / 100) * 100)}）を上回るため、長く使うよりは「繋ぎの1台」としての検討をおすすめします。`
      )
    } else {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}。最新機（年単価 約¥${LATEST_ANNUAL.toLocaleString()}）より大幅に出費を抑えつつ、賢くMacBookを所有できる好条件です。`
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
    efficiencyRating,
  }
}

/**
 * advance データから統合フィーチャーリストを取得
 */
export function getAdvanceFeaturesList(model: MacBookModel): string[] {
  if (!model.advance) return []

  const isProModel = model.model.toLowerCase().includes('pro')
  const features: string[] = []

  if (model.advance.all_models?.features) {
    features.push(...model.advance.all_models.features)
  }

  if (isProModel) {
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
  model: MacBookModel,
  latestPrice: MacBookPriceLog | null,
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
    answer: `中古${model.model}は、中古パソコン専門店（イオシス・じゃんぱら・パソコン工房等）、総合リユース店（ゲオ・ブックオフ等）、ECモール（Amazon Renewed・楽天市場等）、フリマアプリ（メルカリ・ラクマ等）、Apple認定整備済製品で購入できます。保証が充実している専門店の利用がおすすめです。`,
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
    question: `${model.model}のmacOSアップデートはいつまで？あと何年使える？`,
    answer: osLife.isSupported
      ? `${model.model}のmacOSアップデートは${osLife.osEndYear}年頃までサポートされる見込みです。残り約${osLife.remainingYears}年使用可能と推定されます。Appleは一般的にMacを発売から約7年間macOSアップデートでサポートしています。`
      : `${model.model}のmacOSアップデートサポートは終了している可能性があります。セキュリティの観点からは新しいモデルへの買い替えをおすすめします。`,
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
