import { calculatePriceStats } from './price-stats'

// ============================================================
// 本文に相場を差し込むためのヘルパー
//
// 「M1 Airは6万円台から」のような固定文は、書いた時点の最安値で止まったまま
// 実勢価格から離れていく。記事側で数値を持たず、その日の相場から文章を組み立てる。
// ============================================================

/** 価格ログ1行。*_prices（取得した全商品の価格配列）を含む */
export type PriceRowLike = Record<string, unknown> | null | undefined

/**
 * 指定カラムの価格配列から実勢相場（中央値）を出す。
 * サンプルが足りず統計を出せない場合は null（呼び出し側で文ごと出し分ける）。
 */
export function medianOf(row: PriceRowLike, columns: string[]): number | null {
  if (!row) return null
  const arrays = columns.map((c) => {
    const v = row[c]
    return Array.isArray(v) ? (v as number[]) : null
  })
  return calculatePriceStats(arrays)?.median ?? null
}

/** 62,491 → "6万円台" / 155,980 → "15万円台" / 8,980 → "1万円未満" */
export function priceBand(yen: number | null): string | null {
  if (yen == null || yen <= 0) return null
  const man = Math.floor(yen / 10000)
  return man < 1 ? '1万円未満' : `${man}万円台`
}

/** モデル一覧から名前で1件引く（表記ゆれに備えて部分一致・最初の1件） */
export function findModelId<T extends { id: number; model?: string | null; name?: string | null }>(
  models: T[],
  keyword: string
): number | null {
  const hit = models.find((m) => (m.model ?? m.name ?? '').includes(keyword))
  return hit?.id ?? null
}
