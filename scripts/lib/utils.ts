// ============================================
// 共通ユーティリティ
// ============================================

/** JST (Asia/Tokyo) の今日の日付を "YYYY-MM-DD" 形式で返す */
export function getTodayJST(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
}

/** JST (Asia/Tokyo) の現在時刻を ISO 8601 風文字列で返す（タイムゾーンは+09:00） */
export function getNowISOJST(): string {
  const now = new Date()
  const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }))
  const y = jst.getFullYear()
  const m = String(jst.getMonth() + 1).padStart(2, '0')
  const d = String(jst.getDate()).padStart(2, '0')
  const h = String(jst.getHours()).padStart(2, '0')
  const mi = String(jst.getMinutes()).padStart(2, '0')
  const s = String(jst.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d}T${h}:${mi}:${s}+09:00`
}

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
