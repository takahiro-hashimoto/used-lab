import type { IPadModel, IPadPriceLog } from '../types'
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
 * OS寿命計算（リリース年+7年）
 */
export function calculateOSLifespan(date: string | null) {
  return calculateOSLifespanGeneric(date, 7)
}

/**
 * 日毎の価格集計（3社の最安値平均・最高値平均、直近90日）
 */
export function aggregateDailyPrices(logs: IPadPriceLog[]) {
  return aggregateDailyPricesGeneric(logs, (log) => ({
    mins: [log.iosys_min, log.geo_min, log.janpara_min],
    maxes: [log.iosys_max, log.geo_max, log.janpara_max],
  }))
}

/**
 * 直近3ヶ月分のログを抽出
 */
export function filterLast3Months(logs: IPadPriceLog[]): IPadPriceLog[] {
  return filterLast3MonthsGeneric(logs)
}

/**
 * 最新の価格レンジを取得
 */
export function calculatePriceRange(log: IPadPriceLog | null): {
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

// --- 購入判定ロジック（iPad版：PHP版から移植） ---

/** 最新iPad基準値（iPad Pro 13 M5） */
const LATEST_IPAD_NAME = 'iPad Pro 13 第2世代'
const LATEST_IPAD_SCORE = 15306  // score_multi (iPad Pro 13 M5)
const LATEST_IPAD_PRICE = 218800
const LATEST_ANNUAL = Math.round(LATEST_IPAD_PRICE / 5)

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
 * Apple Pencil互換性判定
 */
function getPencilMark(pencil: string | null): '◎' | '◯' | '△' | '×' {
  if (!pencil || pencil === '×') return '×'
  const lower = pencil.toLowerCase()
  if (lower.includes('pro') || lower.includes('第2世代')) return '◎'
  if (lower.includes('usb-c') || lower.includes('usb‑c')) return '◯'
  if (lower.includes('第1世代')) return '△'
  return '◯'
}

/**
 * 購入判定を一括算出（iPad版）
 */
export function getVerdict(
  model: IPadModel,
  latestPrice: IPadPriceLog | null,
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

  const performanceRatio = LATEST_IPAD_SCORE > 0
    ? Math.round((multiScore / LATEST_IPAD_SCORE) * 100)
    : 0

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
  } else if (remainingYears >= 3 && multiScore >= 4000) {
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

  // --- 適合度（iPad版：カメラ→ペン入力） ---
  const yearsPassed = Math.floor(monthsPassed / 12)
  const gameOk: '◎' | '◯' | '△' = multiScore >= 6000 ? '◎' : multiScore >= 4000 ? '◯' : '△'
  const dailyOk: '◎' | '◯' | '△' = multiScore >= 3000 ? '◎' : '◯'
  const longUse: '◎' | '◯' | '△' = remainingYears >= 4 ? '◎' : remainingYears >= 2 ? '◯' : '△'
  const stockOk: '◎' | '◯' | '△' = yearsPassed >= 1 && yearsPassed <= 4 ? '◎' : '◯'
  const priceOk: '◎' | '◯' | '△' = annualCost != null
    ? (annualCost < LATEST_ANNUAL * 0.8 ? '◎' : annualCost <= LATEST_ANNUAL ? '◯' : '△')
    : '◯'
  const pencilRaw = getPencilMark(model.pencil)
  const pencilOk: '◎' | '◯' | '△' = pencilRaw === '×' ? '△' : pencilRaw

  const suitability: SuitabilityItem[] = [
    { label: 'ゲーム・編集', mark: gameOk, icon: 'gamepad' },
    { label: '動画視聴', mark: dailyOk, icon: 'smartphone' },
    { label: '長く使える', mark: longUse, icon: 'calendar' },
    { label: '在庫豊富', mark: stockOk, icon: 'box' },
    { label: '割安感', mark: priceOk, icon: 'yen' },
    { label: 'ペン入力', mark: pencilOk, icon: 'pencil' },
  ]

  // --- 解説文 ---
  const descriptions: string[] = []

  const perfBase = `本機の処理性能は、最新の${LATEST_IPAD_NAME}の約${performanceRatio}%に相当します。`
  if (multiScore >= 5000) {
    descriptions.push(`${perfBase}動画編集やイラスト制作などクリエイティブ用途でも快適に使える十分なパワーを持っています。`)
  } else {
    descriptions.push(`${perfBase}数値が低く見えるのは最新機がプロ仕様だからです。動画視聴やWeb閲覧などの日常利用で不満を感じることはまずない実力です。`)
  }

  const releaseDateFormatted = formatReleaseDate(model.date)
  descriptions.push(
    `Apple製品は発売（${releaseDateFormatted}）から約7年がOSサポートの目安です。本機の残り寿命は約${remainingYearsFormatted}年と推定されます。`
  )

  if (priceMin != null && priceMin > 0 && annualCost != null) {
    if (annualCost > LATEST_ANNUAL) {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}です。最新機の年単価（約${formatPrice(Math.round(LATEST_ANNUAL / 100) * 100)}）を上回るため、長く使うよりは「繋ぎの1台」としての検討をおすすめします。`
      )
    } else {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}。最新機（年単価 約¥44,000）より大幅に出費を抑えつつ、賢くiPadを所有できる好条件です。`
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
export function getAdvanceFeaturesList(model: IPadModel): string[] {
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
  model: IPadModel,
  latestPrice: IPadPriceLog | null,
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
    answer: `中古${model.model}は、中古タブレット専門店（イオシス・じゃんぱら等）、総合リユース店（ゲオ・ブックオフ等）、ECモール（Amazon Renewed・楽天市場等）、フリマアプリ（メルカリ・ラクマ等）、Apple認定整備済製品で購入できます。保証が充実している専門店の利用がおすすめです。`,
  })

  faqs.push({
    question: `中古${model.model}購入におすすめのサイトはどこ？`,
    answer: `最もおすすめなのはイオシスです。3ヶ月の保証と赤ロム永久保証が付いており、在庫数も豊富です。価格の安さと商品の品質を重視する方に最適です。`,
  })

  const releaseDate = formatReleaseDate(model.date)
  faqs.push({
    question: `${model.model}の発売日はいつ？`,
    answer: releaseDate
      ? `${model.model}の発売日は${releaseDate}です。`
      : `${model.model}の発売日は公開されていません。`,
  })

  faqs.push({
    question: `${model.model}のiPadOSアップデートはいつまで？あと何年使える？`,
    answer: osLife.isSupported
      ? `${model.model}のiPadOSアップデートは${osLife.osEndYear}年頃までサポートされる見込みです。残り約${osLife.remainingYears}年使用可能と推定されます。Appleは一般的にiPadを発売から約7年間iPadOSアップデートでサポートしています。`
      : `${model.model}のiPadOSアップデートサポートは終了している可能性があります。セキュリティの観点からは新しいモデルへの買い替えをおすすめします。`,
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
