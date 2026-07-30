import type { IPadModel, IPadPriceLog, IPadAccessory, IPadAccessoryCompatibility } from '../types'
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
 */
export function aggregateDailyPrices(logs: IPadPriceLog[]) {
  return aggregateDailyPricesGeneric(logs, (log) => ({
    mins: [log.iosys_min, log.geo_min, log.janpara_min],
    maxes: [log.iosys_max, log.geo_max, log.janpara_max],
    counts: [log.iosys_count, log.geo_count, log.janpara_count],
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


// --- アクセサリヘルパー ---

/** Pencil の短縮ラベルを取得 */
function getPencilShortLabel(name: string): string {
  if (name.includes('第1世代')) return '第1世代'
  if (name.includes('第2世代')) return '第2世代'
  if (name.includes('USB-C')) return 'USB-C'
  if (name.includes('Pro')) return 'Pro'
  return name
}

/** アクセサリ配列から pencil テキストを復元 */
export function getPencilTextFromAccessories(accessories: IPadAccessory[]): string | null {
  const pencils = accessories
    .filter((a) => a.type === 'pencil')
    .sort((a, b) => a.display_order - b.display_order)
  if (pencils.length === 0) return null
  return pencils.map((p) => getPencilShortLabel(p.name)).join('/')
}

/** アクセサリ配列から keyboard テキストを復元 */
export function getKeyboardTextFromAccessories(accessories: IPadAccessory[]): string | null {
  const keyboards = accessories
    .filter((a) => a.type === 'keyboard')
    .sort((a, b) => a.display_order - b.display_order)
  if (keyboards.length === 0) return null
  return keyboards.map((k) => k.name).join(' / ')
}

/** アクセサリ配列に特定の Pencil タイプが含まれるか判定 */
export function hasAccessoryPencilType(
  accessories: IPadAccessory[],
  type: 'gen1' | 'gen2' | 'usbc' | 'pro',
): boolean {
  return accessories.some((a) => {
    if (a.type !== 'pencil') return false
    const name = a.name.toLowerCase()
    switch (type) {
      case 'gen1': return name.includes('第1世代')
      case 'gen2': return name.includes('第2世代')
      case 'usbc': return name.includes('usb-c')
      case 'pro': return name.includes('pro')
      default: return false
    }
  })
}

/** アクセサリ配列から Pencil の評価マークを算出 */
export function getPencilMarkFromAccessories(accessories: IPadAccessory[]): '◎' | '◯' | '△' | '×' {
  const pencils = accessories.filter((a) => a.type === 'pencil')
  if (pencils.length === 0) return '×'
  if (hasAccessoryPencilType(accessories, 'pro') || hasAccessoryPencilType(accessories, 'gen2')) return '◎'
  if (hasAccessoryPencilType(accessories, 'usbc')) return '◯'
  if (hasAccessoryPencilType(accessories, 'gen1')) return '△'
  return '◯'
}

/** 全対応関係から特定 iPad のアクセサリを取得するルックアップを構築 */
export function buildAccessoryLookup(
  allAccessories: IPadAccessory[],
  allCompatibility: IPadAccessoryCompatibility[],
): Map<number, IPadAccessory[]> {
  const accessoryMap = new Map(allAccessories.map((a) => [a.id, a]))
  const lookup = new Map<number, IPadAccessory[]>()

  for (const c of allCompatibility) {
    const accessory = accessoryMap.get(c.accessory_id)
    if (!accessory) continue
    const list = lookup.get(c.ipad_model_id) || []
    list.push(accessory)
    lookup.set(c.ipad_model_id, list)
  }

  // display_order でソート
  for (const [key, list] of lookup) {
    lookup.set(key, list.sort((a, b) => a.display_order - b.display_order))
  }

  return lookup
}

// --- サポート期間一覧データ生成 ---

import type { LifespanEntryWithModels } from '@/app/components/support/LifespanTable'

/** モデル名からプロダクトライン（iPad Pro / iPad Air / iPad mini / iPad）を抽出 */
function getProductLine(modelName: string): string {
  if (modelName.startsWith('iPad Pro')) return 'iPad Pro'
  if (modelName.startsWith('iPad Air')) return 'iPad Air'
  if (modelName.startsWith('iPad mini')) return 'iPad mini'
  return 'iPad'
}

const LINE_ORDER = ['iPad Pro', 'iPad Air', 'iPad', 'iPad mini']

/**
 * DBモデル配列からサポート期間一覧テーブル用データを生成
 * グルーピング: プロダクトライン + リリース年
 */
export function buildIPadLifespanData(models: IPadModel[]): LifespanEntryWithModels[] {
  const groups = new Map<string, { line: string; year: number; month: number; models: IPadModel[] }>()

  for (const m of models) {
    if (!m.date) continue
    const line = getProductLine(m.model)
    const year = getReleaseYear(m.date)
    const month = getReleaseMonth(m.date)
    if (year === 0) continue

    const key = `${line}_${year}`
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
    const osEnded = group.models.every(m => m.last_ipados != null)

    entries.push({
      series: `${group.line} ${group.year}モデル`,
      releaseDate: `${group.year}年${group.month}月発売`,
      models: group.models.map(m => ({
        label: m.model,
        href: `/ipad/${m.slug}`,
      })),
      osEnd: `${osEndYear}年${group.month}月`,
      repairEnd: `${repairEndYear}年${group.month}月`,
      osEnded,
    })
  }

  // プロダクトライン順 → リリース年降順
  entries.sort((a, b) => {
    const lineA = LINE_ORDER.indexOf(a.series.replace(/ \d{4}モデル$/, ''))
    const lineB = LINE_ORDER.indexOf(b.series.replace(/ \d{4}モデル$/, ''))
    if (lineA !== lineB) return lineA - lineB
    // 年降順: series から年を抽出
    const yearA = parseInt(a.series.match(/(\d{4})モデル/)?.[1] || '0', 10)
    const yearB = parseInt(b.series.match(/(\d{4})モデル/)?.[1] || '0', 10)
    return yearB - yearA
  })

  return entries
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
 * Apple Pencil互換性判定
 */
function getPencilMark(pencil: string | null | undefined): '◎' | '◯' | '△' | '×' {
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

  // 年間コスト（サポート切れは算出しない）
  // 実勢相場（中央値）で計算する。最安値は1点だけの特価であることが多く、
  // その価格を前提にした年単価は読者が実際に払う金額より安く見えてしまう。
  // 分布の記録がないログ（2026-07-30以前）では従来どおり最安値にフォールバック
  const marketStats = calculatePriceStats([
    latestPrice?.iosys_prices,
    latestPrice?.geo_prices,
    latestPrice?.janpara_prices,
  ])
  const costBasis = marketStats?.median ?? priceMin
  const annualCost = costBasis && costBasis > 0 && !model.last_ipados
    ? Math.round(costBasis / remainingYears)
    : null

  // --- 判定ステータス ---
  // ゾーン定義: お得ゾーン=残り3〜4年, 割高=残り>4年, 非推奨=残り<3年
  // ValueZoneChart と整合させた閾値
  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (model.last_ipados) {
    verdictMain = '見送り推奨'
    statusLabel = 'サポート切れ'
    rank = 'wait'
  } else if (monthsPassed < 12) {
    verdictMain = '最高性能を狙うなら今'
    statusLabel = '現役バリバリ'
    rank = 'best'
  } else if (remainingYears >= 3 && multiScore >= 4000) {
    // 性能・寿命だけで「買い時」と断定しない。実勢相場が新品の最新機を
    // 上回る時期の機種まで買い時になってしまうため、価格もゲートにする
    if (costBasis != null && costBasis >= LATEST_IPAD_PRICE) {
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

  // --- 適合度（iPad版：カメラ→ペン入力） ---
  const yearsPassed = Math.floor(monthsPassed / 12)
  const gameOk: '◎' | '◯' | '△' = multiScore >= 6000 ? '◎' : multiScore >= 4000 ? '◯' : '△'
  const dailyOk: '◎' | '◯' | '△' = multiScore >= 3000 ? '◎' : '◯'
  const longUse: '◎' | '◯' | '△' = remainingYears >= 4 ? '◎' : remainingYears >= 2 ? '◯' : '△'
  // 在庫は発売年からの推測ではなく、その日に実際に確認できた件数で判定する。
  // 件数の記録がない過去データでは従来どおり経過年数にフォールバックする
  const stockCount = [latestPrice?.iosys_count, latestPrice?.geo_count, latestPrice?.janpara_count]
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

  if (annualCost != null) {
    // 何をどう割った数字なのかを明示する。根拠の見えない「年単価」は説得力を持たない
    const basisText = marketStats
      ? `実勢相場（中央値 ${formatPrice(marketStats.median)}）で購入した場合、1年あたりのコストは約${formatPrice(annualCost)}です。`
      : `1年あたりのコストは約${formatPrice(annualCost)}です。`
    const latestAnnualText = `最新機を新品で買い5年使う場合の年単価（約${formatPrice(Math.round(LATEST_ANNUAL / 100) * 100)}）`
    if (annualCost > LATEST_ANNUAL && costBasis != null && costBasis >= LATEST_IPAD_PRICE) {
      descriptions.push(
        `${basisText}実勢相場が${LATEST_IPAD_NAME}の新品価格（${formatPrice(LATEST_IPAD_PRICE)}）を上回っており、価格面のメリットはありません。この機種のサイズや機能に明確なこだわりがなければ、新品の最新機も含めて検討するのが合理的です。`
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
        `${basisText}${latestAnnualText}を下回り、出費を抑えつつ賢くiPadを所有できる好条件です。`
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
  const osLife = calculateOSLifespan(model.date, model.last_ipados)

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
