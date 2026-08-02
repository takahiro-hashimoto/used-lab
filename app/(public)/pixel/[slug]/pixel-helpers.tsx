import type { ReactNode } from 'react'
import type { PixelModel, PixelPriceLog } from '@/lib/types'
import {
  getReleaseYear,
  getReleaseMonth,
  formatReleaseDate,
  formatPrice,
  calculatePriceRange as calculatePriceRangeGeneric,
} from '@/lib/utils/shared-helpers'
import { CURRENT_MODELS, annualCostOf } from '@/lib/data/current-models'

/**
 * Pixel 個別ページ専用ヘルパー。
 * iPhone の iphone-helpers.ts を Android/Pixel 向けに再設計したローカル実装。
 * 共有ヘルパー（shared-helpers）は変更せず、Pixel 固有の
 * サポート寿命（support_until / update_years / last_android）・
 * ベンチ（Geekbench6 / AnTuTu総合）・AI機能で判定する。
 */

// --- ページタイトル ---
/**
 * タイトル書式は iPhone（buildIPhonePageTitle）・Galaxy と統一する。
 * 先頭の "Google" は外す: SERPの表示可能文字数（日本語30〜35字）に収めるためと、
 * 検索需要が「Pixel 10 中古」に偏っているため。DBの model 値自体は変更しない。
 */
export function buildPixelPageTitle(model: { slug: string; model: string }): string {
  const name = model.model.replace(/^Google\s+/i, '')
  return `中古${name}はいつまで使える？相場・製品寿命・スペックを解説`
}

// --- 価格レンジ（イオシス・ゲオ・じゃんぱら） ---
export function calculatePixelPriceRange(log: PixelPriceLog | null): {
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

// --- サポート寿命 ---
function parseSupportUntil(str: string | null): { year: number; month: number } | null {
  if (!str) return null
  const m = str.match(/^(\d{4})-(\d{1,2})/)
  if (!m) return null
  return { year: parseInt(m[1], 10), month: parseInt(m[2], 10) }
}

/** "2030-10" → "2030年10月" */
export function formatSupportUntil(str: string | null): string {
  const parsed = parseSupportUntil(str)
  if (!parsed) return '-'
  return `${parsed.year}年${parsed.month}月`
}

/** update_years から保証内容ラベルを生成 */
export function updatePolicyLabel(years: number | null): { main: string; sub: string } {
  if (years === 7) return { main: '7年', sub: 'OS・セキュリティ更新' }
  if (years === 5) return { main: '5年', sub: 'OSメジャー更新は3年' }
  if (years != null) return { main: `${years}年`, sub: 'セキュリティ更新' }
  return { main: '-', sub: '' }
}

export interface PixelSupportInfo {
  releaseYear: number
  supportEnded: boolean
  supportUntilDisplay: string
  remainingYears: number
  policy: { main: string; sub: string }
}

export function calculatePixelSupport(model: PixelModel): PixelSupportInfo {
  const releaseYear = getReleaseYear(model.date)
  const supportEnded = model.last_android != null
  const policy = updatePolicyLabel(model.update_years)

  let remainingYears = 0
  if (!supportEnded) {
    const until = parseSupportUntil(model.support_until)
    if (until) {
      const untilDate = new Date(until.year, until.month - 1, 1)
      const diffMs = untilDate.getTime() - Date.now()
      remainingYears = diffMs > 0 ? Math.round((diffMs / (365.25 * 24 * 60 * 60 * 1000)) * 10) / 10 : 0
    } else if (releaseYear > 0 && model.update_years != null) {
      remainingYears = Math.max(0, releaseYear + model.update_years - new Date().getFullYear())
    }
  }

  return {
    releaseYear,
    supportEnded,
    supportUntilDisplay: formatSupportUntil(model.support_until),
    remainingYears,
    policy,
  }
}

// --- 進化ポイント（advance は全モデル NULL 想定。空なら空配列） ---
export function getPixelAdvanceFeaturesList(model: PixelModel): string[] {
  if (!model.advance) return []
  const features: string[] = []
  if (model.advance.all_models?.features) features.push(...model.advance.all_models.features)
  const isProModel = model.model.toLowerCase().includes('pro')
  if (isProModel) {
    if (model.advance.pro_only?.features) features.push(...model.advance.pro_only.features)
  } else {
    if (model.advance.standard_only?.features) features.push(...model.advance.standard_only.features)
  }
  return [...new Set(features)]
}

// --- 購入判定 ---
// 現行機種の定義は lib/data/current-models.ts に集約している。
// ここに機種名やスコアを直書きすると新機種発売時に直し漏れる（実際に Pixel 9 Pro のまま放置されていた）。
const LATEST_PIXEL = CURRENT_MODELS.pixel.basis
const LATEST_PIXEL_NAME = LATEST_PIXEL.name
const LATEST_PIXEL_SCORE = LATEST_PIXEL.score ?? 0
const LATEST_ANNUAL = annualCostOf(LATEST_PIXEL)

export type VerdictRank = 'best' | 'good' | 'wait'

export interface SuitabilityItem {
  label: string
  mark: '◎' | '◯' | '△'
  icon: string
}

export interface PixelVerdictResult {
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

export function getPixelVerdict(
  model: PixelModel,
  latestPrice: PixelPriceLog | null,
): PixelVerdictResult {
  const multiScore = model.score_multi || 0
  const priceMin = calculatePixelPriceRange(latestPrice).minPrice
  const support = calculatePixelSupport(model)

  const releaseYear = getReleaseYear(model.date)
  const now = new Date()
  const monthsPassed = releaseYear > 0
    ? (now.getFullYear() - releaseYear) * 12 + now.getMonth() - (getReleaseMonth(model.date) - 1)
    : 0
  const yearsPassed = Math.floor(monthsPassed / 12)

  const remainingYears = support.remainingYears
  const remainingYearsFormatted = Math.round(remainingYears * 10) / 10

  const performanceRatio = LATEST_PIXEL_SCORE > 0
    ? Math.round((multiScore / LATEST_PIXEL_SCORE) * 100)
    : 0

  // 年間コスト（サポート切れは算出しない）
  const annualCost = priceMin && priceMin > 0 && !support.supportEnded && remainingYears > 0
    ? Math.round(priceMin / remainingYears)
    : null

  let verdictMain: string
  let statusLabel: string
  let rank: VerdictRank

  if (support.supportEnded) {
    verdictMain = '見送り推奨'
    statusLabel = 'サポート終了'
    rank = 'wait'
  } else if (monthsPassed < 12) {
    verdictMain = '最新性能を狙うなら今'
    statusLabel = '現役フラッグシップ'
    rank = 'best'
  } else if (remainingYears >= 3 && multiScore >= 2500) {
    verdictMain = '今が買い時！'
    statusLabel = 'コスパ良好期'
    rank = 'best'
  } else if (remainingYears >= 3) {
    verdictMain = '悪くない選択'
    statusLabel = '実力派ミドル'
    rank = 'good'
  } else {
    verdictMain = '見送りも検討'
    statusLabel = 'サポート終盤'
    rank = 'wait'
  }

  const gameOk: '◎' | '◯' | '△' = multiScore >= 4000 ? '◎' : multiScore >= 2500 ? '◯' : '△'
  const dailyOk: '◎' | '◯' | '△' = multiScore >= 2500 ? '◎' : '◯'
  const longUse: '◎' | '◯' | '△' = remainingYears >= 4 ? '◎' : remainingYears >= 2 ? '◯' : '△'
  const stockOk: '◎' | '◯' | '△' = yearsPassed >= 1 && yearsPassed <= 4 ? '◎' : '◯'
  const priceOk: '◎' | '◯' | '△' = annualCost != null
    ? (annualCost < LATEST_ANNUAL * 0.8 ? '◎' : annualCost <= LATEST_ANNUAL ? '◯' : '△')
    : '◯'
  const cameraOk: '◎' | '◯' | '△' = model.tele_camera && model.best_take ? '◎'
    : model.night_sight ? '◯' : '△'

  const suitability: SuitabilityItem[] = [
    { label: 'ゲーム', mark: gameOk, icon: 'gamepad' },
    { label: '普段使い', mark: dailyOk, icon: 'smartphone' },
    { label: '長く使える', mark: longUse, icon: 'calendar' },
    { label: '在庫豊富', mark: stockOk, icon: 'box' },
    { label: '割安感', mark: priceOk, icon: 'yen' },
    { label: 'カメラ性能', mark: cameraOk, icon: 'camera' },
  ]

  const descriptions: string[] = []

  const perfBase = `本機の処理性能は、最新の${LATEST_PIXEL_NAME}の約${performanceRatio}%に相当します。`
  if (multiScore >= 3500) {
    descriptions.push(`${perfBase}SNSや動画視聴はもちろん、写真のAI編集や一般的なゲームも快適にこなせるパワーを備えています。`)
  } else {
    descriptions.push(`${perfBase}最新機との差はありますが、SNSやWeb閲覧、消しゴムマジックなどの日常利用で不満を感じることはまずない実力です。`)
  }

  const releaseDateFormatted = formatReleaseDate(model.date)
  if (support.supportEnded) {
    descriptions.push(
      `本機（${releaseDateFormatted}発売）はGoogleのアップデート保証期間が終了しています。セキュリティの観点からは、より新しいモデルへの買い替えをおすすめします。`
    )
  } else {
    descriptions.push(
      `Google Pixelは機種ごとにアップデート保証期間が定められています。本機は${support.policy.main}の更新保証（${support.supportUntilDisplay}頃まで）で、残りは約${remainingYearsFormatted}年です。`
    )
  }

  if (priceMin != null && priceMin > 0 && annualCost != null) {
    if (annualCost > LATEST_ANNUAL) {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}です。最新機の年単価（約${formatPrice(Math.round(LATEST_ANNUAL / 100) * 100)}）を上回るため、長く使うよりは「繋ぎの1台」としての検討をおすすめします。`
      )
    } else {
      descriptions.push(
        `1年あたりのコストは約${formatPrice(annualCost)}。最新機（年単価 約${formatPrice(LATEST_ANNUAL)}）より出費を抑えつつ、賢くPixelを所有できる好条件です。`
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

// --- FAQ（JSON-LD プレーンテキスト版） ---
export function generatePixelFaqsForJsonLd(
  model: PixelModel,
  latestPrice: PixelPriceLog | null,
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  const v = getPixelVerdict(model, latestPrice)
  const support = calculatePixelSupport(model)

  faqs.push({
    question: `中古${model.model}は今から購入するのはあり？`,
    answer: `${v.verdictMain}（${v.statusLabel}）。${v.descriptions.join(' ')}`,
  })

  faqs.push({
    question: `中古${model.model}はどこで買える？`,
    answer: `中古${model.model}は、中古スマホ専門店（イオシス・じゃんぱら等）、総合リユース店（ゲオ・ブックオフ等）、ECモール（楽天市場等）、フリマアプリ（メルカリ・ラクマ等）で購入できます。赤ロム保証や動作保証が充実している専門店の利用がおすすめです。`,
  })

  faqs.push({
    question: `中古${model.model}購入におすすめのサイトはどこ？`,
    answer: `最もおすすめなのはイオシスです。保証と赤ロム永久保証が付いており、在庫数も豊富です。価格の安さと商品の品質を重視する方に最適です。`,
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
    answer: support.supportEnded
      ? `${model.model}のGoogleによるアップデート保証は終了している可能性があります。セキュリティの観点からは新しいモデルへの買い替えをおすすめします。`
      : `${model.model}は${support.policy.main}の更新保証（${support.policy.sub}）が付いており、${support.supportUntilDisplay}頃までサポートされる見込みです。残り約${support.remainingYears}年使用可能と推定されます。`,
  })

  const advanceFeatures = getPixelAdvanceFeaturesList(model)
  faqs.push({
    question: `${model.model}は前モデルからどんな点が進化していますか？`,
    answer: advanceFeatures.length > 0
      ? `${model.model}の主な進化ポイントは以下の通りです。${advanceFeatures.join('、')}。`
      : `${model.model}のTensorチップ・カメラ・AI機能の詳細は、本ページのスペック比較セクションをご覧ください。`,
  })

  return faqs
}

// 表示用 FAQ（JSX）を構築
export function buildPixelDisplayFaqs(
  model: PixelModel,
  latestPrice: PixelPriceLog | null,
  iosysUrl: string | null,
): { question: string; answer: ReactNode }[] {
  const v = getPixelVerdict(model, latestPrice)
  const support = calculatePixelSupport(model)
  const releaseDate = formatReleaseDate(model.date)
  const advanceFeatures = getPixelAdvanceFeaturesList(model)

  return [
    {
      question: `中古${model.model}は今から購入するのあり？`,
      answer: (
        <>
          <p>結論から言うと、「{v.verdictMain}」と言えます。</p>
          {v.descriptions.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </>
      ),
    },
    {
      question: `中古${model.model}はどこで買える？`,
      answer: (
        <>
          <p>中古{model.model}の購入先としては下記が考えられます。おすすめは中古スマホ専門店での購入。購入から一定期間内にトラブルがあった際にショップ独自の保証を受けることができるからです。</p>
          <ul>
            <li>中古スマホ専門店</li>
            <li>大手キャリアの認定中古品</li>
            <li>ネットオークションやフリマアプリ</li>
          </ul>
        </>
      ),
    },
    {
      question: `中古${model.model}購入におすすめのサイトはどこ？`,
      answer: (
        <>
          <p>
            イオシスがおすすめです。中古スマホの価格が他のサイトに比べて安い場合が多く、お得にPixelを購入することができるからです。購入後の保証期間も長く、赤ロム永久保証があるのもおすすめのポイント。
          </p>
          {iosysUrl && (
            <p>
              <a href={iosysUrl} target="_blank" rel="noopener noreferrer nofollow">
                イオシスで中古{model.model}を見る →
              </a>
            </p>
          )}
        </>
      ),
    },
    {
      question: `${model.model}の発売日はいつ？`,
      answer: (
        <p>
          {releaseDate
            ? `${model.model}の発売日は${releaseDate}です。`
            : `${model.model}の発売日は公開されていません。`}
        </p>
      ),
    },
    {
      question: `${model.model}のAndroid・セキュリティ更新はいつまで？あと何年使える？`,
      answer: support.supportEnded ? (
        <p>
          {model.model}のGoogleによるアップデート保証は終了している可能性があります。
          セキュリティの観点からは新しいモデルへの買い替えをおすすめします。
        </p>
      ) : (
        <p>
          {model.model}は<strong>{support.policy.main}の更新保証</strong>（{support.policy.sub}）が付いており、
          <strong>{support.supportUntilDisplay}頃</strong>まで安全に使えることが予想されます。
        </p>
      ),
    },
    {
      question: `${model.model}は前モデルからどんな点が進化していますか？`,
      answer: advanceFeatures.length > 0 ? (
        <>
          <p>下記が主にアップデートされたポイントです。</p>
          <ul>
            {advanceFeatures.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          {model.model}のTensorチップ・カメラ・AI機能の違いは、本ページの「スペック比較」セクションで他モデルと見比べられます。
        </p>
      ),
    },
  ]
}
