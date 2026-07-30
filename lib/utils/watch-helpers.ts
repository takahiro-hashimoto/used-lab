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
import { calculatePriceStats } from '@/lib/utils/price-stats'

// Re-export shared functions that have the same signature
export { formatReleaseDate, formatPrice } from './shared-helpers'

/**
 * OS寿命計算（リリース年+5年）watchOS基準
 */
export function calculateOSLifespan(date: string | null, lastOs: string | null = null) {
  return calculateOSLifespanGeneric(date, 5, lastOs)
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
    counts: [log.iosys_count, log.geo_count, log.janpara_count],
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
  /** 相場の中心（中央値）。「相場は〜」と書く箇所で使う */
  medianPrice: number | null
  /** 現実的な最安値（下位10%点）。「〜から手に入る」と書く箇所で使う */
  realisticMinPrice: number | null
  shops: { name: string; min: number | null; max: number | null }[]
} {
  if (!log) return { minPrice: null, maxPrice: null, medianPrice: null, realisticMinPrice: null, shops: [] }
  return calculatePriceRangeGeneric([
    { name: 'イオシス', min: log.iosys_min, max: log.iosys_max },
    { name: 'ゲオ', min: log.geo_min, max: log.geo_max },
    { name: 'じゃんぱら', min: log.janpara_min, max: log.janpara_max },
  ], [log.iosys_prices, log.geo_prices, log.janpara_prices])
}


// --- サポート期間一覧データ生成 ---

import type { LifespanEntryWithHref } from '@/app/components/support/LifespanTable'

/**
 * DBモデル配列からサポート期間一覧テーブル用データを生成
 * Watch: 1モデル=1行、グルーピング不要。OS+5年、修理+7年。
 */
export function buildWatchLifespanData(models: WatchModel[]): LifespanEntryWithHref[] {
  const entries: LifespanEntryWithHref[] = []

  for (const m of models) {
    if (!m.date) continue
    const year = getReleaseYear(m.date)
    const month = getReleaseMonth(m.date)
    if (year === 0) continue

    const osEndYear = year + 5
    const repairEndYear = year + 7
    const osEnded = m.last_watchos != null

    entries.push({
      series: m.model,
      href: `/watch/${m.slug}`,
      releaseDate: `${year}年${month}月発売`,
      osEnd: `${osEndYear}年${month}月`,
      repairEnd: `${repairEndYear}年${month}月`,
      osEnded,
    })
  }

  // リリース年月降順
  entries.sort((a, b) => {
    const [yearA, monthA] = a.releaseDate.match(/(\d{4})年(\d+)月/)?.slice(1).map(Number) || [0, 0]
    const [yearB, monthB] = b.releaseDate.match(/(\d{4})年(\d+)月/)?.slice(1).map(Number) || [0, 0]
    if (yearA !== yearB) return yearB - yearA
    return monthB - monthA
  })

  return entries
}

// --- 購入判定ロジック（Watch版：PHP版から移植） ---

/** 最新Apple Watch基準値（Apple Watch Series 10） */
const LATEST_WATCH_NAME = 'Apple Watch Series 10'
const LATEST_WATCH_PRICE = 59800
// Ultra はプレミアムラインで、標準ラインの Series と価格帯がまったく違う。
// 同じ土俵で比べると Ultra は常に「新品より高い」と判定されてしまうため、
// Ultra 系だけは Ultra の新品価格を比較対象にする
const LATEST_ULTRA_NAME = 'Apple Watch Ultra 3'
const LATEST_ULTRA_PRICE = 128800

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

  // 年間コスト（サポート切れは算出しない）
  // 実勢相場（中央値）で計算する。最安値は1点だけの特価であることが多く、
  // その価格を前提にした年単価は読者が実際に払う金額より安く見えてしまう。
  // 分布の記録がないログ（2026-07-30以前）では従来どおり最安値にフォールバック
  // 同一ラインの新品と比べる（Ultra を Series と比べない）
  const isUltraLine = /ultra/i.test(model.slug ?? '') || /Ultra/i.test(model.model ?? '')
  const latestName = isUltraLine ? LATEST_ULTRA_NAME : LATEST_WATCH_NAME
  const latestNewPrice = isUltraLine ? LATEST_ULTRA_PRICE : LATEST_WATCH_PRICE
  const latestAnnual = Math.round(latestNewPrice / 5)

  const marketStats = calculatePriceStats([
    latestPrice?.iosys_prices,
    latestPrice?.geo_prices,
    latestPrice?.janpara_prices,
  ])
  const costBasis = marketStats?.median ?? priceMin
  const annualCost = costBasis && costBasis > 0 && !model.last_watchos
    ? Math.round(costBasis / remainingYears)
    : null

  // --- 判定ステータス ---
  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (model.last_watchos) {
    verdictMain = '見送り推奨'
    statusLabel = 'サポート切れ'
    rank = 'wait'
  } else if (monthsPassed < 12) {
    verdictMain = '最高性能を狙うなら今'
    statusLabel = '現役バリバリ'
    rank = 'best'
  } else if (remainingYears >= 2 && model.always_on_display) {
    // 性能・寿命だけで「買い時」と断定しない。実勢相場が新品の最新機を
    // 上回る時期の機種まで買い時になってしまうため、価格もゲートにする
    if (costBasis != null && costBasis >= latestNewPrice) {
      verdictMain = '新品の最新機も要検討'
      statusLabel = '相場高止まり'
      rank = 'good'
    } else if (annualCost != null && annualCost > latestAnnual) {
      verdictMain = '悪くない選択'
      statusLabel = '高値圏'
      rank = 'good'
    } else {
      verdictMain = '今が買い時！'
      statusLabel = 'コスパ黄金期'
      rank = 'best'
    }
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
  // 在庫は発売年からの推測ではなく、その日に実際に確認できた件数で判定する。
  // 件数の記録がない過去データでは従来どおり経過年数にフォールバックする
  const stockCount = [latestPrice?.iosys_count, latestPrice?.geo_count, latestPrice?.janpara_count]
    .filter((v): v is number => v != null)
  const stockOk: '◎' | '◯' | '△' = stockCount.length > 0
    ? (() => {
        const total = stockCount.reduce((a, b) => a + b, 0)
        return total >= 100 ? '◎' : total >= 20 ? '◯' : '△'
      })()
    : (yearsPassed >= 1 && yearsPassed <= 3 ? '◎' : '◯')

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
  const priceOk: '◎' | '◯' | '△' = annualCost != null
    ? (annualCost < latestAnnual * 0.8 ? '◎' : annualCost <= latestAnnual ? '◯' : '△')
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

  if (annualCost != null) {
    // 何をどう割った数字なのかを明示する。根拠の見えない「年単価」は説得力を持たない
    const basisText = marketStats
      ? `実勢相場（中央値 ${formatPrice(marketStats.median)}）で購入した場合、1年あたりのコストは約${formatPrice(annualCost)}です。`
      : `1年あたりのコストは約${formatPrice(annualCost)}です。`
    const latestAnnualText = `最新機を新品で買い5年使う場合の年単価（約${formatPrice(Math.round(latestAnnual / 100) * 100)}）`
    if (annualCost > latestAnnual && costBasis != null && costBasis >= latestNewPrice) {
      descriptions.push(
        `${basisText}実勢相場が${latestName}の新品価格（${formatPrice(latestNewPrice)}）を上回っており、価格面のメリットはありません。この機種のサイズや機能に明確なこだわりがなければ、新品の最新機も含めて検討するのが合理的です。`
      )
    } else if (annualCost > latestAnnual && remainingYears >= 3) {
      descriptions.push(
        `${basisText}${latestAnnualText}を上回っており、中古としての値下がりはまだ小さい時期です。急がなければ相場がこなれるのを待つ選択肢もあります。`
      )
    } else if (annualCost > latestAnnual) {
      descriptions.push(
        `${basisText}${latestAnnualText}を上回るため、長く使うよりは「繋ぎの1台」としての検討をおすすめします。`
      )
    } else {
      descriptions.push(
        `${basisText}${latestAnnualText}を下回り、出費を抑えつつ賢くApple Watchを所有できる好条件です。`
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
  const osLife = calculateOSLifespan(model.date, model.last_watchos)

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
