import type { ProductShopLink } from '@/lib/types'
import { SHOP_KEY_TO_ID } from '@/lib/types'

// ============================================================
// 共通型定義
// ============================================================

/** ベンチマークスコアを持つモデルの最小インターフェース */
export type BenchScoreModel = {
  id: number
  score_single: number
  score_multi: number
  score_metal: number
  cpu?: string | null
  minPrice?: number | null
  antutu_cpu?: number | null
  antutu_gpu?: number | null
  antutu_mem?: number | null
  antutu_ux?: number | null
}

/** 用途別おすすめの定義 */
export type UseCaseItem = {
  icon: string
  title: string
  description: string
  singleMin: number
  multiMin: number
  metalMin: number | null
}

/** チップ世代グループ */
export type ChipGroup = {
  chip: string
  order: number
  models: BenchScoreModel[]
  avgSingle: number
  avgMulti: number
  avgMetal: number
}

// ============================================================
// BenchmarkRanking 系ユーティリティ
// ============================================================

/** Geekbench 3指標の合計スコア */
export function getTotal(m: BenchScoreModel): number {
  return m.score_single + m.score_multi + m.score_metal
}

/** AnTuTu 4指標の合計スコア */
export function getAntutuTotal(m: BenchScoreModel): number {
  return (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0)
}

/** コスパ = 総合スコア ÷ 中古最安価格 × 1000 */
export function getCospa(m: BenchScoreModel): number {
  if (!m.minPrice || m.minPrice === 0) return 0
  return getTotal(m) / m.minPrice * 1000
}

/** イオシスのショップリンクURLを取得 */
export function getIosysUrl(shopLinks: ProductShopLink[], productId: number): string | null {
  const link = shopLinks.find((l) => l.product_id === productId && l.shop_id === SHOP_KEY_TO_ID.iosys)
  return link?.url || null
}

// ============================================================
// UseCaseGuide 系ユーティリティ
// ============================================================

/** 推奨スコアを満たすモデルの中から最もコスパの良いモデルを返す */
export function findBestMatch<T extends BenchScoreModel>(models: T[], useCase: UseCaseItem): T | null {
  const candidates = models.filter((m) => {
    if (m.score_single < useCase.singleMin) return false
    if (m.score_multi < useCase.multiMin) return false
    if (useCase.metalMin && m.score_metal < useCase.metalMin) return false
    return true
  })

  if (candidates.length === 0) return null

  const withPrice = candidates.filter((m) => m.minPrice != null)
  if (withPrice.length > 0) {
    return withPrice.sort((a, b) => (a.minPrice || Infinity) - (b.minPrice || Infinity))[0]
  }
  return candidates.sort((a, b) =>
    (a.score_single + a.score_multi + a.score_metal) - (b.score_single + b.score_multi + b.score_metal)
  )[0]
}

// ============================================================
// ChipGenerationCompare 系ユーティリティ
// ============================================================

/** チップ名の世代ソート用オーダー値 */
export function getChipOrder(chip: string): number {
  if (chip.startsWith('M')) return 100 + parseInt(chip.replace('M', ''), 10)
  const num = parseInt(chip.replace('A', '').replace('Z', ''), 10)
  return isNaN(num) ? 0 : num
}

/** モデル配列をチップ世代ごとにグループ化して平均スコアを算出 */
export function groupByGeneration<T extends BenchScoreModel & { cpu?: string | null }>(
  models: T[],
  getChipGeneration: (cpu: string | null) => string | null,
): ChipGroup[] {
  const map = new Map<string, T[]>()

  for (const m of models) {
    const gen = getChipGeneration(m.cpu ?? null)
    if (!gen) continue
    const arr = map.get(gen) || []
    arr.push(m)
    map.set(gen, arr)
  }

  return Array.from(map.entries())
    .map(([chip, models]) => {
      const avgSingle = Math.round(models.reduce((s, m) => s + m.score_single, 0) / models.length)
      const avgMulti = Math.round(models.reduce((s, m) => s + m.score_multi, 0) / models.length)
      const avgMetal = Math.round(models.reduce((s, m) => s + m.score_metal, 0) / models.length)
      return { chip, order: getChipOrder(chip), models, avgSingle, avgMulti, avgMetal }
    })
    .sort((a, b) => a.order - b.order)
}

/** 前世代比の改善率を計算 */
export function calcImprovement(current: number, previous: number): string {
  if (previous === 0) return '-'
  const pct = Math.round(((current - previous) / previous) * 100)
  return pct > 0 ? `+${pct}%` : `${pct}%`
}
