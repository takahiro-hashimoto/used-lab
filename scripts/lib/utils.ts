// ============================================
// 共通ユーティリティ
// ============================================

/** レートリミット対策の sleep */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 容量抽出（iPhone / iPad 共通）: "64GB / 256GB" → "64GB" */
export function extractMinCapacity(storageRange: string | null): string | null {
  if (!storageRange) return null
  const str = String(storageRange)
  const match = str.match(/(\d+)(GB|TB)/i)
  return match ? `${match[1]}${match[2].toUpperCase()}` : null
}

/** サイズ抽出（Watch共通）: "40mm / 44mm" → "40mm" */
export function extractMinSize(sizeRange: string | null): string | null {
  if (!sizeRange) return null
  const str = String(sizeRange)
  const matches = str.match(/(\d+)mm/gi)
  if (!matches || matches.length === 0) return null
  const sizes = matches.map((m) => parseInt(m))
  const minSize = Math.min(...sizes)
  return `${minSize}mm`
}

/** 価格取得結果 */
export interface PriceResult {
  min: number | string
  max: number | string
  minItemName: string
  maxItemName: string
}

export const EMPTY_RESULT: PriceResult = {
  min: '-',
  max: '-',
  minItemName: '-',
  maxItemName: '-',
}
