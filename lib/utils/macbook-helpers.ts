import type { MacBookModel, MacBookPriceLog } from '../types'
import {
  getReleaseYear,
  getReleaseMonth,
  formatReleaseDate,
  formatPrice,
  filterLast3Months as filterLast3MonthsGeneric,
  calculateOSLifespan as calculateOSLifespanGeneric,
  aggregateDailyPrices as aggregateDailyPricesGeneric,
} from './shared-helpers'

// Re-export shared functions that have the same signature
export { calculateRepairLifespan } from './shared-helpers'
export { formatReleaseDate, formatPrice } from './shared-helpers'

/**
 * OS寿命計算（リリース年+7年）macOS基準
 */
export function calculateOSLifespan(date: string | null, lastOs: string | null = null) {
  return calculateOSLifespanGeneric(date, 7, lastOs)
}

/**
 * 日毎の価格集計（Top5の最安値・最高値から算出）
 */
export function aggregateDailyPrices(logs: MacBookPriceLog[]) {
  return aggregateDailyPricesGeneric(logs, (log) => ({
    mins: [log.min1_price, log.min2_price, log.min3_price, log.min4_price, log.min5_price],
    maxes: [log.max1_price, log.max2_price, log.max3_price, log.max4_price, log.max5_price],
    counts: [log.matched_count],
  }))
}

/**
 * 直近3ヶ月分のログを抽出
 */
export function filterLast3Months(logs: MacBookPriceLog[]): MacBookPriceLog[] {
  return filterLast3MonthsGeneric(logs)
}

/**
 * 最新の価格レンジを取得（Top5形式）
 */
export function calculatePriceRange(log: MacBookPriceLog | null): {
  minPrice: number | null
  maxPrice: number | null
  /** 相場の中心（中央値）。「相場は〜」と書く箇所で使う */
  medianPrice: number | null
  /** 現実的な最安値（下位10%点）。「〜から手に入る」と書く箇所で使う */
  realisticMinPrice: number | null
  shops: { name: string; min: number | null; max: number | null }[]
} {
  if (!log) return { minPrice: null, maxPrice: null, medianPrice: null, realisticMinPrice: null, shops: [] }
  const minPrices = [log.min1_price, log.min2_price, log.min3_price, log.min4_price, log.min5_price]
    .filter((v): v is number => v != null && v > 0)
  const maxPrices = [log.max1_price, log.max2_price, log.max3_price, log.max4_price, log.max5_price]
    .filter((v): v is number => v != null && v > 0)
  const stats = priceStatsOf(log)
  return {
    minPrice: minPrices.length > 0 ? Math.min(...minPrices) : null,
    maxPrice: maxPrices.length > 0 ? Math.max(...maxPrices) : null,
    medianPrice: stats?.median ?? null,
    realisticMinPrice: stats?.realisticMin ?? null,
    shops: [
      { name: log.min1_shop_name || '楽天', min: log.min1_price, max: log.max1_price },
    ],
  }
}

// --- サポート期間一覧データ生成 ---

import type { LifespanEntryWithModels } from '@/app/components/support/LifespanTable'
import { priceStatsOf } from '@/lib/utils/price-stats'
import { CURRENT_MODELS, annualCostOf } from '@/lib/data/current-models'

/** モデル名からプロダクトライン（Pro / Air）を抽出 */
function getProductLine(modelName: string): string {
  if (modelName.includes('Pro')) return 'MacBook Pro'
  return 'MacBook Air'
}

const LINE_ORDER = ['MacBook Pro', 'MacBook Air']

/**
 * DBモデル配列からサポート期間一覧テーブル用データを生成
 * グルーピング: プロダクトライン + リリース年 + リリース月（同年に複数回発売があるため）
 */
export function buildMacBookLifespanData(models: MacBookModel[]): LifespanEntryWithModels[] {
  const groups = new Map<string, { line: string; year: number; month: number; models: MacBookModel[] }>()

  for (const m of models) {
    if (!m.date) continue
    const line = getProductLine(m.model)
    const year = getReleaseYear(m.date)
    const month = getReleaseMonth(m.date)
    if (year === 0) continue

    const key = `${line}_${year}_${month}`
    const existing = groups.get(key)
    if (existing) {
      existing.models.push(m)
    } else {
      groups.set(key, { line, year, month, models: [m] })
    }
  }

  const entries: LifespanEntryWithModels[] = []
  for (const group of groups.values()) {
    const osEndYear = group.year + 7
    const repairEndYear = group.year + 9
    const osEnded = group.models.every(m => m.last_macos != null)

    entries.push({
      series: `${group.line} ${group.year}`,
      releaseDate: `${group.year}年${group.month}月発売`,
      models: group.models.map(m => ({
        label: m.shortname || m.model,
        href: `/macbook/${m.slug}`,
      })),
      osEnd: `${osEndYear}年${group.month}月`,
      repairEnd: `${repairEndYear}年${group.month}月`,
      osEnded,
    })
  }

  // プロダクトライン順 → リリース年月降順
  entries.sort((a, b) => {
    const lineA = LINE_ORDER.indexOf(a.series.replace(/ \d{4}$/, ''))
    const lineB = LINE_ORDER.indexOf(b.series.replace(/ \d{4}$/, ''))
    if (lineA !== lineB) return lineA - lineB
    const [yearA, monthA] = a.releaseDate.match(/(\d{4})年(\d+)月/)?.slice(1).map(Number) || [0, 0]
    const [yearB, monthB] = b.releaseDate.match(/(\d{4})年(\d+)月/)?.slice(1).map(Number) || [0, 0]
    if (yearA !== yearB) return yearB - yearA
    return monthB - monthA
  })

  return entries
}

// --- 購入判定ロジック（MacBook版：PHP版から移植） ---

// 現行機種の定義は lib/data/current-models.ts に集約している。
const LATEST_MACBOOK = CURRENT_MODELS.macbook.basis
const LATEST_MACBOOK_NAME = LATEST_MACBOOK.name
const LATEST_MACBOOK_SCORE = LATEST_MACBOOK.score ?? 0
const LATEST_MACBOOK_PRICE = LATEST_MACBOOK.newPrice
const LATEST_ANNUAL = annualCostOf(LATEST_MACBOOK)

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
  /** 在庫の実数から組み立てた一文（FAQで再掲しないよう descriptions とは分ける） */
  stockNote: string | null
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

  // 年間コスト（サポート切れは算出しない）
  // 実勢相場（中央値）で計算する。最安値は1点だけの特価であることが多く、
  // その価格を前提にした年単価は読者が実際に払う金額より安く見えてしまう。
  // 分布の記録がないログ（2026-07-30以前）では従来どおり最安値にフォールバック
  const marketStats = priceStatsOf(latestPrice)
  const costBasis = marketStats?.median ?? priceMin
  const annualCost = costBasis && costBasis > 0 && !model.last_macos
    ? Math.round(costBasis / remainingYears)
    : null

  // --- 判定ステータス（MacBook: 18ヶ月閾値） ---
  // ゾーン定義: お得ゾーン=残り3〜4年, 割高=残り>4年, 非推奨=残り<3年
  // ValueZoneChart と整合させた閾値
  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (model.last_macos) {
    verdictMain = '見送り推奨'
    statusLabel = 'サポート切れ'
    rank = 'wait'
  } else if (monthsPassed < 18) {
    verdictMain = '最高性能を狙うなら今'
    statusLabel = '現役バリバリ'
    rank = 'best'
  } else if (remainingYears >= 3 && multiScore >= GOLDEN_SCORE_THRESHOLD) {
    // 性能・寿命だけで「買い時」と断定しない。実勢相場が新品の最新機を
    // 上回る時期の機種まで買い時になってしまうため、価格もゲートにする
    if (costBasis != null && costBasis >= LATEST_MACBOOK_PRICE) {
      verdictMain = '新品の最新機も要検討'
      statusLabel = '相場高止まり'
      rank = 'good'
    } else if (annualCost != null && annualCost > LATEST_ANNUAL) {
      verdictMain = '悪くない選択'
      statusLabel = '高値圏'
      rank = 'good'
    } else {
      verdictMain = '今が買い時！'
      statusLabel = 'コスパ黄金期'
      rank = 'best'
    }
  } else if (remainingYears >= 3) {
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
  // 在庫は発売年からの推測ではなく、その日に実際に確認できた件数で判定する。
  // 件数の記録がない過去データでは従来どおり経過年数にフォールバックする
  const stockCount = [latestPrice?.matched_count]
    .filter((v): v is number => v != null)
  const stockOk: '◎' | '◯' | '△' = stockCount.length > 0
    ? (() => {
        const total = stockCount.reduce((a, b) => a + b, 0)
        return total >= 100 ? '◎' : total >= 20 ? '◯' : '△'
      })()
    : (yearsPassed >= 1 && yearsPassed <= 4 ? '◎' : '◯')

  // 在庫の実数は「買えるかどうか」に直結するため、判断が変わる水準のときだけ一文を添える
  let stockNote: string | null = null
  const spread = marketStats ? marketStats.q3 - marketStats.q1 : null
  const spreadRatio = marketStats && spread != null ? spread / marketStats.median : null
  if (stockCount.length > 0) {
    const stockTotal = stockCount.reduce((a, b) => a + b, 0)
    if (stockTotal === 0) {
      stockNote = '現在、集計対象のショップでは在庫が確認できませんでした。中古市場から姿を消しつつあるため、購入できるタイミングは限られます。'
    } else if (stockTotal <= 10) {
      stockNote = `販売中の在庫は${stockTotal}件と少なく、状態や色を選ぶ余裕はほとんどありません。狙っている場合は見つけた時点で判断することをおすすめします。`
    } else if (stockTotal >= 150) {
      // 在庫が多くても価格が横並びなら「比較で安く買える」とは言えない
      stockNote = spreadRatio != null && spreadRatio <= 0.05
        ? `販売中の在庫は${stockTotal}件と豊富です。価格はどのショップもほぼ横並びのため、金額よりバッテリー状態や付属品の良い個体を選ぶのがおすすめです。`
        : `販売中の在庫は${stockTotal}件と豊富で、ショップ間の価格競争が起きやすい状況です。急いで決めず、複数のショップを比較すると条件の良い個体を見つけやすくなります。`
    }
  }
  // 価格のばらつきが大きい機種は「比較すること自体に金銭的価値がある」
  if (marketStats && spread != null && spreadRatio != null && spreadRatio >= 0.2) {
    const spreadNote = `同じ中古でも状態やショップにより${formatPrice(marketStats.q1)}〜${formatPrice(marketStats.q3)}と幅があり、選び方しだいで約${formatPrice(Math.round(spread / 1000) * 1000)}変わります。購入前の比較が特に効く機種です。`
    stockNote = stockNote ? `${stockNote}${spreadNote}` : spreadNote
  }

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

  if (annualCost != null) {
    // 何をどう割った数字なのかを明示する。根拠の見えない「年単価」は説得力を持たない
    const basisText = marketStats
      ? `実勢相場（中央値 ${formatPrice(marketStats.median)}）で購入した場合、1年あたりのコストは約${formatPrice(annualCost)}です。`
      : `1年あたりのコストは約${formatPrice(annualCost)}です。`
    const latestAnnualText = `最新機を新品で買い7年使う場合の年単価（約${formatPrice(Math.round(LATEST_ANNUAL / 100) * 100)}）`
    if (annualCost > LATEST_ANNUAL && costBasis != null && costBasis >= LATEST_MACBOOK_PRICE) {
      descriptions.push(
        `${basisText}実勢相場が${LATEST_MACBOOK_NAME}の新品価格（${formatPrice(LATEST_MACBOOK_PRICE)}）を上回っており、価格面のメリットはありません。この機種のサイズや機能に明確なこだわりがなければ、新品の最新機も含めて検討するのが合理的です。`
      )
    } else if (annualCost > LATEST_ANNUAL && remainingYears >= 3) {
      descriptions.push(
        `${basisText}${latestAnnualText}を上回っており、中古としての値下がりはまだ小さい時期です。急がなければ相場がこなれるのを待つ選択肢もあります。`
      )
    } else if (annualCost > LATEST_ANNUAL) {
      descriptions.push(
        `${basisText}${latestAnnualText}を上回るため、長く使うよりは「繋ぎの1台」としての検討をおすすめします。`
      )
    } else {
      descriptions.push(
        `${basisText}${latestAnnualText}を下回り、出費を抑えつつ賢くMacBookを所有できる好条件です。`
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
    stockNote,
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
  const osLife = calculateOSLifespan(model.date, model.last_macos)

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
