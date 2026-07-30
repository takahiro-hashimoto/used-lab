// ============================================
// 価格分布の統計
// ============================================
// price_logs の *_prices（取得した全商品の価格・昇順）から、
// min/max だけでは出せない指標を算出する。
//
// *_prices は 2026-07-31 以降のログにしか入っていない（過去分はNULL）。
// 参照側は必ず null を許容し、無いときは該当の表示を出さないこと。

/** 中央値。偶数個なら中央2つの平均 */
function medianOf(sorted: number[]): number {
  const n = sorted.length
  const mid = n >> 1
  return n % 2 === 1 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2)
}

/**
 * 分位点（0〜1）。線形補間ではなく最近傍を採る。
 * 価格は離散値であり、実在しない価格を提示しないため。
 */
function quantileOf(sorted: number[], q: number): number {
  if (sorted.length === 1) return sorted[0]
  const idx = Math.round(q * (sorted.length - 1))
  return sorted[idx]
}

export type PriceStats = {
  /** 対象件数 */
  count: number
  min: number
  max: number
  median: number
  /** 第1四分位（安いほうから25%） */
  q1: number
  /** 第3四分位 */
  q3: number
  /**
   * 外れ値を除いた現実的な最安値（下位10%点）。
   * 1件だけ極端に安い個体があっても相場の下限として提示しない。
   */
  realisticMin: number
  /** 最も商品が集中している価格帯と、その件数 */
  densestBand: { from: number; to: number; count: number } | null
}

/** 価格帯の刻み幅。相場の規模に応じて丸めの粒度を変える */
function bandWidthFor(median: number): number {
  if (median < 20_000) return 1_000
  if (median < 50_000) return 2_000
  if (median < 100_000) return 5_000
  return 10_000
}

/**
 * 複数ショップの価格配列をまとめて統計を出す。
 *
 * @param priceArrays ショップごとの価格配列（null / undefined は「記録なし」として無視）
 * @param minSamples  これ未満なら統計を出さない。少数サンプルの中央値は相場として信頼できない
 */
export function calculatePriceStats(
  priceArrays: (number[] | null | undefined)[],
  minSamples = 5
): PriceStats | null {
  const all: number[] = []
  for (const arr of priceArrays) {
    if (!arr) continue
    for (const p of arr) {
      // 0円・負値は異常データ。混ざると中央値も分位点も壊れる
      if (typeof p === 'number' && p > 0) all.push(p)
    }
  }
  if (all.length < minSamples) return null

  const sorted = all.sort((a, b) => a - b)
  const median = medianOf(sorted)

  return {
    count: sorted.length,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median,
    q1: quantileOf(sorted, 0.25),
    q3: quantileOf(sorted, 0.75),
    realisticMin: quantileOf(sorted, 0.1),
    densestBand: findDensestBand(sorted, bandWidthFor(median)),
  }
}

/**
 * 最も商品が集中している価格帯を求める。
 * 「¥45,000〜47,000に27件」のように、選択肢の多い価格帯を提示するために使う。
 */
function findDensestBand(
  sorted: number[],
  width: number
): { from: number; to: number; count: number } | null {
  if (sorted.length === 0) return null

  const bands = new Map<number, number>()
  for (const p of sorted) {
    const key = Math.floor(p / width) * width
    bands.set(key, (bands.get(key) ?? 0) + 1)
  }

  let bestFrom = 0
  let bestCount = -1
  for (const [from, count] of bands) {
    // 同数なら安いほうの価格帯を採る（買い手にとって有用なため）
    if (count > bestCount || (count === bestCount && from < bestFrom)) {
      bestCount = count
      bestFrom = from
    }
  }
  // 1つの価格帯に偏りがない（全て1件ずつ等）場合は提示しない
  if (bestCount < 2) return null
  return { from: bestFrom, to: bestFrom + width, count: bestCount }
}
