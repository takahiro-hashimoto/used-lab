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
export function calculateOSLifespan(date: string | null, lastOs: string | null = null) {
  return calculateOSLifespanGeneric(date, 7, lastOs)
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
  const osLife = calculateOSLifespan(model.date, model.last_ios)

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
 * モデルデータからFAQ（JSON-LD用のプレーンテキスト）を自動生成
 */
export function generateFaqsForJsonLd(
  model: IPhoneModel,
  latestPrice: IPhonePriceLog | null,
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  const v = getVerdict(model, latestPrice)
  const osLife = calculateOSLifespan(model.date, model.last_ios)

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

// --- サポート期間一覧データ生成 ---

import type { LifespanEntryWithModels } from '@/app/components/support/LifespanTable'

/**
 * モデル名からシリーズグループキーを抽出
 * iPhone17 Pro Max → "17", iPhone16e → "16e", iPhone SE 第3世代 → "SE3", iPhone Air → "Air"
 */
function getSeriesKey(modelName: string): string {
  // iPhone SE 第N世代
  const seMatch = modelName.match(/iPhone\s*SE\s*第(\d)世代/)
  if (seMatch) return `SE${seMatch[1]}`
  // iPhone Air
  if (/iPhone\s*Air/i.test(modelName)) return 'Air'
  // iPhone16e など末尾e付き
  const eMatch = modelName.match(/iPhone\s*(\d+e)/i)
  if (eMatch) return eMatch[1]
  // iPhone17 / iPhone 17 Pro / iPhone16 Pro Max
  const numMatch = modelName.match(/iPhone\s*(\d+)/i)
  if (numMatch) return numMatch[1]
  return modelName
}

/**
 * グループキーからシリーズ表示名を生成
 */
function getSeriesName(key: string): string {
  if (key.startsWith('SE')) {
    const gen = key.replace('SE', '')
    return `iPhone SE（第${gen}世代）`
  }
  return `iPhone ${key}シリーズ`
}

/** シリーズキーからソート用の数値を取得（大きいほど新しい） */
function getSeriesSortOrder(key: string): number {
  if (key.startsWith('SE')) return parseInt(key.replace('SE', ''), 10) * 0.1
  if (key === 'Air') return 0
  const num = parseInt(key, 10)
  return isNaN(num) ? 0 : num
}

/**
 * DBモデル配列からサポート期間一覧テーブル用データを生成
 * グルーピング: リリース年月（同時発売モデルを1シリーズにまとめる）
 */
export function buildIPhoneLifespanData(models: IPhoneModel[]): LifespanEntryWithModels[] {
  // まずリリース年月でグルーピング
  const dateGroups = new Map<string, IPhoneModel[]>()
  for (const m of models) {
    if (!m.date) continue
    const year = getReleaseYear(m.date)
    const month = getReleaseMonth(m.date)
    if (year === 0) continue
    const key = `${year}_${month}`
    const existing = dateGroups.get(key)
    if (existing) existing.push(m)
    else dateGroups.set(key, [m])
  }

  const entries: LifespanEntryWithModels[] = []
  for (const [dateKey, groupModels] of dateGroups) {
    const [yearStr, monthStr] = dateKey.split('_')
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)

    // 同じ年月でもSEと数字シリーズは分ける
    const subGroups = new Map<string, IPhoneModel[]>()
    for (const m of groupModels) {
      const sk = getSeriesKey(m.model)
      // Airは同時期の数字シリーズに統合
      const normalizedKey = sk === 'Air'
        ? (Array.from(new Set(groupModels.map(gm => getSeriesKey(gm.model)))).find(k => /^\d+$/.test(k)) || sk)
        : sk
      const existing = subGroups.get(normalizedKey)
      if (existing) existing.push(m)
      else subGroups.set(normalizedKey, [m])
    }

    for (const [seriesKey, seriesModels] of subGroups) {
      const osEndYear = year + 7
      const repairEndYear = year + 9
      const osEnded = seriesModels.every(m => m.last_ios != null)

      entries.push({
        series: getSeriesName(seriesKey),
        releaseDate: `${year}年${month}月発売`,
        models: seriesModels.map(m => ({
          label: m.model,
          href: `/iphone/${m.slug}`,
        })),
        osEnd: `${osEndYear}年${month}月`,
        repairEnd: `${repairEndYear}年${month}月`,
        osEnded,
      })
    }
  }

  // リリース年月降順
  entries.sort((a, b) => {
    const [yearA, monthA] = a.releaseDate.match(/(\d{4})年(\d+)月/)?.slice(1).map(Number) || [0, 0]
    const [yearB, monthB] = b.releaseDate.match(/(\d{4})年(\d+)月/)?.slice(1).map(Number) || [0, 0]
    if (yearA !== yearB) return yearB - yearA
    if (monthA !== monthB) return monthB - monthA
    // 同年月内: 数字シリーズ→SE順
    const orderA = getSeriesSortOrder(getSeriesKey(a.models[0]?.label || ''))
    const orderB = getSeriesSortOrder(getSeriesKey(b.models[0]?.label || ''))
    return orderB - orderA
  })

  return entries
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
  // ゾーン定義: お得ゾーン=残り3〜4年, 割高=残り>4年, 非推奨=残り<3年
  // ValueZoneChart と整合させた閾値
  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (monthsPassed < 12) {
    // 発売1年未満 → 割高ゾーンだが最新性能
    verdictMain = '最高性能を狙うなら今'
    statusLabel = '現役バリバリ'
    rank = 'best'
  } else if (remainingYears >= 3 && multiScore >= 3500) {
    // お得ゾーン（残り3年以上）＋性能十分
    verdictMain = '今が買い時！'
    statusLabel = 'コスパ黄金期'
    rank = 'best'
  } else if (remainingYears >= 3) {
    // お得ゾーン（残り3年以上）だがスコア低め
    verdictMain = '悪くない選択'
    statusLabel = '実力派ミドル'
    rank = 'good'
  } else {
    // 非推奨ゾーン（残り3年未満）
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
