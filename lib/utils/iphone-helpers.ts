import type { IPhoneModel, IPhonePriceLog } from '../types'
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
 * WordPressテンプレートのcalculate_price_range方式に準拠:
 * 各日の3社min値を平均, 各日の3社max値を平均, 100円単位に丸め
 *
 * 同一日に複数ストレージのログがある場合は全ストレージを統合して平均を算出
 */
export function aggregateDailyPrices(logs: IPhonePriceLog[]) {
  return aggregateDailyPricesGeneric(logs, (log) => ({
    mins: [log.iosys_min, log.geo_min, log.janpara_min],
    maxes: [log.iosys_max, log.geo_max, log.janpara_max],
  }))
}

/**
 * 直近3ヶ月分のログを抽出
 */
export function filterLast3Months(logs: IPhonePriceLog[]): IPhonePriceLog[] {
  return filterLast3MonthsGeneric(logs)
}

/**
 * 最新の価格レンジを取得
 */
export function calculatePriceRange(log: IPhonePriceLog | null): {
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

/**
 * コスパ計算（AnTuTuスコア / 平均価格(万円)）
 */
export function calculateCostPerformance(model: IPhoneModel, avgPrice: number): number | null {
  const antutuTotal = (model.antutu_cpu || 0) + (model.antutu_gpu || 0) +
                      (model.antutu_mem || 0) + (model.antutu_ux || 0)
  if (antutuTotal === 0 || avgPrice <= 0) return null
  return Math.round(antutuTotal / (avgPrice / 10000))
}

/**
 * ユーザータイプ別の適性判定
 */
export function getUserSuitability(model: IPhoneModel): {
  label: string
  suitable: 'good' | 'fair' | 'poor'
  reason: string
}[] {
  const antutuTotal = (model.antutu_cpu || 0) + (model.antutu_gpu || 0) +
                      (model.antutu_mem || 0) + (model.antutu_ux || 0)
  const osLife = calculateOSLifespan(model.date)

  return [
    {
      label: 'ライトユーザー',
      suitable: osLife.remainingYears >= 2 ? 'good' : osLife.remainingYears >= 1 ? 'fair' : 'poor',
      reason: osLife.remainingYears >= 2
        ? 'OSサポートも十分で安心'
        : 'OSサポート残り僅か',
    },
    {
      label: 'ビジネス利用',
      suitable: osLife.remainingYears >= 3 && model.apple_intelligence ? 'good'
        : osLife.remainingYears >= 2 ? 'fair' : 'poor',
      reason: model.apple_intelligence
        ? 'Apple Intelligence対応で業務効率化'
        : 'Apple Intelligence非対応',
    },
    {
      label: 'カメラ重視',
      suitable: model.night_mode && model.cinematic_mode && model.portrait_mode ? 'good'
        : model.night_mode && model.portrait_mode ? 'fair' : 'poor',
      reason: model.apple_proraw
        ? 'ProRAW対応の高性能カメラ'
        : model.night_mode ? 'ナイトモード搭載' : 'カメラ機能が限定的',
    },
    {
      label: 'ゲーマー',
      suitable: antutuTotal >= 1500000 ? 'good'
        : antutuTotal >= 800000 ? 'fair' : 'poor',
      reason: antutuTotal >= 1500000
        ? '最新ゲームも快適にプレイ可能'
        : antutuTotal >= 800000 ? '大半のゲームは快適' : '高負荷ゲームは厳しい',
    },
  ]
}

/**
 * 年間コスト計算
 */
export function calculateAnnualCost(
  avgPrice: number,
  remainingOSYears: number
): number | null {
  if (remainingOSYears <= 0 || avgPrice <= 0) return null
  return Math.round(avgPrice / remainingOSYears)
}

/**
 * モデルデータからFAQ（JSON-LD用のプレーンテキスト）を自動生成
 */
export function generateFaqsForJsonLd(
  model: IPhoneModel,
  latestPrice: IPhonePriceLog | null,
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  const v = getVerdict(model, latestPrice)
  const osLife = calculateOSLifespan(model.date)

  // Q1: 購入判定
  faqs.push({
    question: `中古${model.model}は今から購入するのはあり？`,
    answer: `${v.verdictMain}（${v.statusLabel}）。${v.descriptions.join(' ')}`,
  })

  // Q2: どこで買える？
  faqs.push({
    question: `中古${model.model}はどこで買える？`,
    answer: `中古${model.model}は、中古スマホ専門店（イオシス・じゃんぱら等）、総合リユース店（ゲオ・ブックオフ等）、ECモール（Amazon Renewed・楽天市場等）、フリマアプリ（メルカリ・ラクマ等）、Apple認定整備済製品で購入できます。保証や赤ロム対策が充実している専門店の利用がおすすめです。`,
  })

  // Q3: おすすめサイト
  faqs.push({
    question: `中古${model.model}購入におすすめのサイトはどこ？`,
    answer: `最もおすすめなのはイオシスです。3ヶ月の保証と赤ロム永久保証が付いており、在庫数も豊富です。価格の安さと商品の品質を重視する方に最適です。`,
  })

  // Q4: 発売日
  const releaseDate = formatReleaseDate(model.date)
  faqs.push({
    question: `${model.model}の発売日はいつ？`,
    answer: releaseDate
      ? `${model.model}の発売日は${releaseDate}です。`
      : `${model.model}の発売日は公開されていません。`,
  })

  // Q5: iOSアップデート
  faqs.push({
    question: `${model.model}のiOSアップデートはいつまで？あと何年使える？`,
    answer: osLife.isSupported
      ? `${model.model}のiOSアップデートは${osLife.osEndYear}年頃までサポートされる見込みです。残り約${osLife.remainingYears}年使用可能と推定されます。Appleは一般的にiPhoneを発売から約7年間iOSアップデートでサポートしています。`
      : `${model.model}のiOSアップデートサポートは終了している可能性があります。セキュリティの観点からは新しいモデルへの買い替えをおすすめします。`,
  })

  // Q6: 進化したポイント
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

/**
 * advance データから統合フィーチャーリストを取得（Pro/Standard振り分け付き）
 */
export function getAdvanceFeaturesList(model: IPhoneModel): string[] {
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

// --- 購入判定ロジック（PHP版から移植） ---

/** 最新iPhone基準値 */
const LATEST_IPHONE_NAME = 'iPhone 17'
const LATEST_IPHONE_SCORE = 9143  // score_multi
const LATEST_IPHONE_PRICE = 129800
const LATEST_ANNUAL = Math.round(LATEST_IPHONE_PRICE / 5)

export type VerdictRank = 'best' | 'good' | 'wait'

export interface VerdictResult {
  /** メインの判定文 */
  verdictMain: string
  /** ステータスラベル */
  statusLabel: string
  /** ランク (best / good / wait) */
  rank: VerdictRank
  /** 性能比（%） */
  performanceRatio: number
  /** 残り寿命（年） */
  remainingYears: number
  /** 年間コスト */
  annualCost: number | null
  /** 中古最安値 */
  priceMin: number | null
  /** 解説テキスト（配列） */
  descriptions: string[]
  /** 適合度 */
  suitability: SuitabilityItem[]
}

export interface SuitabilityItem {
  label: string
  mark: '◎' | '◯' | '△'
  icon: string
}

/**
 * 購入判定を一括算出
 */
export function getVerdict(
  model: IPhoneModel,
  latestPrice: IPhonePriceLog | null,
): VerdictResult {
  // 基礎データ
  const multiScore = model.score_multi || 0
  const priceRange = calculatePriceRange(latestPrice)
  const priceMin = priceRange.minPrice

  // 発売からの経過
  const releaseYear = getReleaseYear(model.date)
  const now = new Date()
  const monthsPassed = releaseYear > 0
    ? (now.getFullYear() - releaseYear) * 12 + now.getMonth() - (getReleaseMonth(model.date) - 1)
    : 0

  // 残り寿命（月ベースで計算、最低0.5年）
  const remainingYears = Math.max(0.5, 7 - monthsPassed / 12)
  const remainingYearsFormatted = Math.round(remainingYears * 10) / 10

  // 性能比
  const performanceRatio = LATEST_IPHONE_SCORE > 0
    ? Math.round((multiScore / LATEST_IPHONE_SCORE) * 100)
    : 0

  // 年間コスト
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
  } else if (remainingYears >= 3 && multiScore >= 3500) {
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

  // --- 適合度 ---
  const yearsPassed = Math.floor(monthsPassed / 12)
  const gameOk: '◎' | '◯' | '△' = multiScore >= 6000 ? '◎' : multiScore >= 3500 ? '◯' : '△'
  const dailyOk: '◎' | '◯' | '△' = multiScore >= 3000 ? '◎' : '◯'
  const longUse: '◎' | '◯' | '△' = remainingYears >= 4 ? '◎' : remainingYears >= 2 ? '◯' : '△'
  const stockOk: '◎' | '◯' | '△' = yearsPassed >= 1 && yearsPassed <= 4 ? '◎' : '◯'
  const priceOk: '◎' | '◯' | '△' = annualCost != null
    ? (annualCost < LATEST_ANNUAL * 0.8 ? '◎' : annualCost <= LATEST_ANNUAL ? '◯' : '△')
    : '◯'
  const cameraOk: '◎' | '◯' | '△' = yearsPassed <= 2 ? '◎' : yearsPassed <= 4 ? '◯' : '△'

  const suitability: SuitabilityItem[] = [
    { label: 'ゲーム', mark: gameOk, icon: 'gamepad' },
    { label: '普段使い', mark: dailyOk, icon: 'smartphone' },
    { label: '長く使える', mark: longUse, icon: 'calendar' },
    { label: '在庫豊富', mark: stockOk, icon: 'box' },
    { label: '割安感', mark: priceOk, icon: 'yen' },
    { label: 'カメラ性能', mark: cameraOk, icon: 'camera' },
  ]

  // --- 解説文 ---
  const descriptions: string[] = []

  const perfBase = `本機の処理性能は、最新の${LATEST_IPHONE_NAME}の約${performanceRatio}%に相当します。`
  if (multiScore >= 5000) {
    descriptions.push(`${perfBase}日常のSNSや動画視聴はもちろん、高画質なゲームプレイにおいても十分すぎるパワーを維持しています。`)
  } else {
    descriptions.push(`${perfBase}数値が低く見えるのは最新機がプロ仕様だからです。SNSやWeb閲覧などの日常利用で不満を感じることはまずない実力です。`)
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
        `1年あたりのコストは約${formatPrice(annualCost)}。最新機（年単価 約¥32,000）より大幅に出費を抑えつつ、賢くiPhoneを所有できる好条件です。`
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
 * 全ショップの最安値を取得
 */
export function getOverallMinPrice(log: IPhonePriceLog | null): number | null {
  if (!log) return null
  const prices = [log.iosys_min, log.geo_min, log.janpara_min].filter((v): v is number => v != null)
  return prices.length > 0 ? Math.min(...prices) : null
}
