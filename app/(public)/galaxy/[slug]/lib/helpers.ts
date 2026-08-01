import type { GalaxyModel, GalaxyPriceLog } from '@/lib/types'
import {
  getReleaseYear,
  getReleaseMonth,
  formatReleaseDate,
  formatPrice,
  calculatePriceRange as calculatePriceRangeGeneric,
} from '@/lib/utils/shared-helpers'

/**
 * Galaxy 個別ページ用のローカルヘルパー群。
 * iPhone版（lib/utils/iphone-helpers.ts）を Android/Samsung 向けに再設計したもの。
 * 共有ヘルパー（shared-helpers）は変更せず、Galaxy 固有ロジックのみここに閉じ込める。
 */

// ------------------------------------------------------------------
// タイトル
// ------------------------------------------------------------------

/**
 * model.model は "Samsung Galaxy S24 Ultra" のようにブランド名込みで入っている。
 * タイトル書式は iPhone（buildIPhonePageTitle）と統一する。
 * 先頭の "Samsung" は外す: SERPの表示可能文字数（日本語30〜35字）に収めるためと、
 * 検索需要が「Galaxy S25 中古」に偏っているため。DBの model 値自体は変更しない。
 */
export function buildGalaxyPageTitle(model: { model: string }): string {
  const name = model.model.replace(/^Samsung\s+/i, '')
  return `中古${name}はいつまで使える？相場・製品寿命・スペックを解説`
}

// ------------------------------------------------------------------
// 価格レンジ（3ショップ最安値）
// ------------------------------------------------------------------

export function calculateGalaxyPriceRange(log: GalaxyPriceLog | null): {
  minPrice: number | null
  maxPrice: number | null
  /** 相場の中心（中央値）。「相場は〜」と書く箇所で使う */
  medianPrice: number | null
  /** 現実的な最安値（下位10%点）。「〜から手に入る」と書く箇所で使う */
  realisticMinPrice: number | null
} {
  if (!log) return { minPrice: null, maxPrice: null, medianPrice: null, realisticMinPrice: null }
  const { minPrice, maxPrice, medianPrice, realisticMinPrice } = calculatePriceRangeGeneric([
    { name: 'イオシス', min: log.iosys_min, max: log.iosys_max },
    { name: 'ゲオ', min: log.geo_min, max: log.geo_max },
    { name: 'じゃんぱら', min: log.janpara_min, max: log.janpara_max },
  ], [log.iosys_prices, log.geo_prices, log.janpara_prices])
  return { minPrice, maxPrice, medianPrice, realisticMinPrice }
}

// ------------------------------------------------------------------
// サポート（Android/セキュリティ更新）寿命
// ------------------------------------------------------------------

/** サポート終了済みか（現役判定は last_android === null） */
export function isSupportEnded(model: GalaxyModel): boolean {
  return model.last_android !== null
}

/** "2032-01" → { year, month } */
function parseSupportUntil(str: string | null): { year: number; month: number } | null {
  if (!str) return null
  const m = str.match(/^(\d{4})-(\d{1,2})/)
  if (!m) return null
  return { year: parseInt(m[1], 10), month: parseInt(m[2], 10) }
}

/** "2032-01" → "2032年1月" */
export function formatSupportUntil(str: string | null): string {
  const p = parseSupportUntil(str)
  if (!p) return '-'
  return `${p.year}年${p.month}月`
}

/**
 * サポート残存年数を算出。
 * 1) last_android があれば終了済み → 0
 * 2) support_until があればそこまでの残り年数
 * 3) どちらも無ければ 発売年 + update_years から推定
 */
export function calculateGalaxySupport(model: GalaxyModel): {
  ended: boolean
  supportUntil: string | null
  remainingYears: number
  updateYears: number | null
} {
  const ended = isSupportEnded(model)
  if (ended) {
    return { ended: true, supportUntil: model.support_until, remainingYears: 0, updateYears: model.update_years }
  }

  const now = new Date()
  const p = parseSupportUntil(model.support_until)
  if (p) {
    const diffMonths = (p.year - now.getFullYear()) * 12 + (p.month - 1 - now.getMonth())
    const remainingYears = Math.max(0, Math.round((diffMonths / 12) * 10) / 10)
    return { ended: false, supportUntil: model.support_until, remainingYears, updateYears: model.update_years }
  }

  // フォールバック：発売年 + update_years
  const releaseYear = getReleaseYear(model.date)
  if (releaseYear > 0 && model.update_years) {
    const remainingYears = Math.max(0, releaseYear + model.update_years - now.getFullYear())
    return { ended: false, supportUntil: null, remainingYears, updateYears: model.update_years }
  }

  return { ended: false, supportUntil: null, remainingYears: 0, updateYears: model.update_years }
}

/** update_years から更新保証ポリシーの表示文言を生成 */
export function supportPolicyLabel(updateYears: number | null): { main: string; sub: string } {
  if (updateYears === 7) return { main: '7年', sub: 'OS・セキュリティ更新' }
  if (updateYears === 5) return { main: '5年（OS更新は4回）', sub: 'セキュリティ更新' }
  if (updateYears) return { main: `${updateYears}年`, sub: 'OS更新は数回' }
  return { main: '-', sub: '' }
}

// ------------------------------------------------------------------
// 進化ポイント（advance は全 NULL 想定・ガード必須）
// ------------------------------------------------------------------

export function getGalaxyAdvanceFeaturesList(model: GalaxyModel): string[] {
  if (!model.advance) return []
  const features: string[] = []
  if (model.advance.all_models?.features) features.push(...model.advance.all_models.features)
  return [...new Set(features)]
}

// ------------------------------------------------------------------
// 購入判定
// ------------------------------------------------------------------

export type VerdictRank = 'best' | 'good' | 'wait'

export interface SuitabilityItem {
  label: string
  mark: '◎' | '◯' | '△'
  icon: string
}

export interface GalaxyVerdictResult {
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

/**
 * 購入判定を一括算出（iPhone版 getVerdict の Galaxy 適応）。
 * OS寿命は support_until / update_years / last_android から算出し、
 * 性能比は allModels 内の最大 score_multi を「最新フラッグシップ基準」として動的に算出する。
 */
export function getGalaxyVerdict(
  model: GalaxyModel,
  latestPrice: GalaxyPriceLog | null,
  allModels: GalaxyModel[],
): GalaxyVerdictResult {
  const multiScore = model.score_multi || 0
  const antutuTotal = model.antutu_total || 0
  const { minPrice: priceMin } = calculateGalaxyPriceRange(latestPrice)

  // 発売からの経過月数
  const releaseYear = getReleaseYear(model.date)
  const now = new Date()
  const monthsPassed = releaseYear > 0
    ? (now.getFullYear() - releaseYear) * 12 + now.getMonth() - (getReleaseMonth(model.date) - 1)
    : 0

  const support = calculateGalaxySupport(model)
  const remainingYears = support.remainingYears
  const remainingYearsFormatted = Math.round(remainingYears * 10) / 10

  // 性能比：allModels 内の最高マルチスコアを基準（最新フラッグシップ相当）
  const maxMulti = Math.max(...allModels.map((m) => m.score_multi || 0), 0)
  const referenceModel = allModels.find((m) => (m.score_multi || 0) === maxMulti && maxMulti > 0)
  const referenceName = referenceModel?.model || '最新フラッグシップ'
  const performanceRatio = maxMulti > 0 ? Math.round((multiScore / maxMulti) * 100) : 0

  // 年間コスト（サポート切れ・残0では算出しない）
  const annualCost = priceMin && priceMin > 0 && !support.ended && remainingYears > 0
    ? Math.round(priceMin / remainingYears)
    : null

  // --- 判定ステータス ---
  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (support.ended) {
    verdictMain = '見送り推奨'
    statusLabel = 'サポート終了'
    rank = 'wait'
  } else if (monthsPassed < 12) {
    verdictMain = '最高性能を狙うなら今'
    statusLabel = '現役バリバリ'
    rank = 'best'
  } else if (remainingYears >= 3 && multiScore >= 3500) {
    verdictMain = '今が買い時！'
    statusLabel = 'コスパ黄金期'
    rank = 'best'
  } else if (remainingYears >= 3) {
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
  const gameOk: '◎' | '◯' | '△' = antutuTotal >= 1800000 ? '◎' : antutuTotal >= 900000 ? '◯' : '△'
  const dailyOk: '◎' | '◯' | '△' = multiScore >= 3000 ? '◎' : '◯'
  const longUse: '◎' | '◯' | '△' = remainingYears >= 4 ? '◎' : remainingYears >= 2 ? '◯' : '△'
  const stockOk: '◎' | '◯' | '△' = yearsPassed >= 1 && yearsPassed <= 4 ? '◎' : '◯'
  const priceOk: '◎' | '◯' | '△' = annualCost != null
    ? (annualCost < 20000 ? '◎' : annualCost <= 32000 ? '◯' : '△')
    : '◯'
  const cameraOk: '◎' | '◯' | '△' = model.tele_camera
    ? (yearsPassed <= 2 ? '◎' : '◯')
    : (model.night_mode ? '◯' : '△')

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

  const perfBase = `本機の処理性能（Geekbench 6 マルチコア）は、${referenceName}の約${performanceRatio}%に相当します。`
  if (multiScore >= 5000) {
    descriptions.push(`${perfBase}SNSや動画視聴はもちろん、高負荷なゲームでも余裕を感じられるSnapdragon級のパワーを維持しています。`)
  } else {
    descriptions.push(`${perfBase}数値だけ見ると控えめですが、SNSやWeb閲覧などの日常利用で不満を感じることはまずない実力です。`)
  }

  if (support.ended) {
    descriptions.push(
      `本機はAndroid（One UI）・セキュリティ更新のサポートが終了しています。最新の脆弱性対応やGalaxy AIの新機能が受け取れないため、長期利用よりは短期の割り切った運用がおすすめです。`
    )
  } else if (support.supportUntil) {
    const policy = supportPolicyLabel(support.updateYears)
    descriptions.push(
      `Galaxyは${policy.main}のOS・セキュリティ更新が保証されており、本機は${formatSupportUntil(support.supportUntil)}頃までサポートが続く見込みです。残り寿命は約${remainingYearsFormatted}年と推定されます。`
    )
  } else {
    descriptions.push(
      `本機のOS・セキュリティ更新は残り約${remainingYearsFormatted}年と推定されます。Galaxyは世代によって更新保証年数が異なるため、購入前にサポート期間を確認しておくと安心です。`
    )
  }

  if (priceMin != null && priceMin > 0 && annualCost != null) {
    if (annualCost > 32000) {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}です。割高感があるため、長く使うよりは「繋ぎの1台」としての検討をおすすめします。`
      )
    } else {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}。新品ハイエンドより大幅に出費を抑えつつ、賢くGalaxyを所有できる好条件です。`
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

// ------------------------------------------------------------------
// FAQ（JSON-LD 用プレーンテキスト）
// ------------------------------------------------------------------

export function generateGalaxyFaqsForJsonLd(
  model: GalaxyModel,
  latestPrice: GalaxyPriceLog | null,
  allModels: GalaxyModel[],
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  const v = getGalaxyVerdict(model, latestPrice, allModels)
  const support = calculateGalaxySupport(model)

  faqs.push({
    question: `中古${model.model}は今から購入するのはあり？`,
    answer: `${v.verdictMain}（${v.statusLabel}）。${v.descriptions.join(' ')}`,
  })

  faqs.push({
    question: `中古${model.model}はどこで買える？`,
    answer: `中古${model.model}は、中古スマホ専門店（イオシス・じゃんぱら等）、総合リユース店（ゲオ・ブックオフ等）、フリマアプリ（メルカリ・ラクマ等）、大手キャリアの認定中古品で購入できます。保証や赤ロム対策が充実している専門店の利用がおすすめです。`,
  })

  faqs.push({
    question: `中古${model.model}購入におすすめのサイトはどこ？`,
    answer: `最もおすすめなのはイオシスです。中古スマホの価格が安く、保証と赤ロム保証が付いており在庫数も豊富です。価格の安さと品質を重視する方に最適です。`,
  })

  const releaseDate = formatReleaseDate(model.date)
  faqs.push({
    question: `${model.model}の発売日はいつ？`,
    answer: releaseDate
      ? `${model.model}の発売日は${releaseDate}です。`
      : `${model.model}の発売日は公開されていません。`,
  })

  faqs.push({
    question: `${model.model}のAndroid・セキュリティ更新はいつまで？あと何年使える？`,
    answer: support.ended
      ? `${model.model}のAndroid・セキュリティ更新のサポートは終了している可能性があります。セキュリティの観点からは新しいモデルへの買い替えをおすすめします。`
      : support.supportUntil
        ? `${model.model}のOS・セキュリティ更新は${formatSupportUntil(support.supportUntil)}頃までサポートされる見込みです。残り約${v.remainingYears}年使用可能と推定されます。GalaxyはS24世代以降、最大7年のOS・セキュリティ更新が保証されています。`
        : `${model.model}のOS・セキュリティ更新は残り約${v.remainingYears}年と推定されます。`,
  })

  const advanceFeatures = getGalaxyAdvanceFeaturesList(model)
  if (advanceFeatures.length > 0) {
    faqs.push({
      question: `${model.model}は前モデルからどんな点が進化していますか？`,
      answer: `${model.model}の主な進化ポイントは以下の通りです。${advanceFeatures.join('、')}。`,
    })
  }

  return faqs
}
