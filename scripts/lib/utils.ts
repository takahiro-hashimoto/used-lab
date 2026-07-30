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
// ============================================================
// 相場算出から除外する商品の判定
//
// 従来はカテゴリごとに除外語がバラバラだった（iPhone/iPad/Watch は「未使用」のみ、
// MacBook は「未使用|新品|未開封」）ため、同じ条件の商品がカテゴリによって
// 含まれたり除かれたりしていた。ここに一元化して全カテゴリで揃える。
//
// 特に「バッテリー80%未満」は実データで最安値の商品名に多数出現しており
// （2026-07時点でiPhone/Pixel/Galaxy/iPad合計77件）、これが相場の下限として
// 表示されると「その価格で普通の中古が買える」という誤認を生むため除外する。
// ============================================================
const EXCLUDED_CONDITION_WORDS = [
  // 新品系: 中古相場に混ぜない
  '未使用',
  '新品',
  '未開封',
  // バッテリー劣化: 同一機種でも相場から大きく外れるため除外
  'バッテリー80%未満',
  'バッテリー劣化',
  // 難あり系: 通常の中古とは別物
  '難あり',
  '訳あり',
  'ジャンク',
  '部品取り',
  '画面割れ',
  'ガラス割れ',
  '液晶不良',
]

/**
 * 商品名から「中古相場の算出対象外」を判定する。
 * 空白と全角％を正規化してから部分一致で判定する。
 */
export function isExcludedCondition(itemName: string): boolean {
  const normalized = itemName.replace(/[\s　]/g, '').replace(/％/g, '%')
  return EXCLUDED_CONDITION_WORDS.some((w) => normalized.includes(w))
}

export interface PriceResult {
  min: number | string
  max: number | string
  minItemName: string
  maxItemName: string
  /** 相場算出に使用した該当商品数（流通量の目安。DBの *_count に保存する） */
  count: number
}

export const EMPTY_RESULT: PriceResult = {
  min: '-',
  max: '-',
  minItemName: '-',
  maxItemName: '-',
  count: 0,
}
