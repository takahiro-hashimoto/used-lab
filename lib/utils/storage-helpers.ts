// ============================================================
// StorageTable 共通ユーティリティ
// ============================================================

/** ストレージ表記を配列にパース（例: "128GB / 256GB" → ["128GB", "256GB"]） */
export function parseStorageParts(strage: string | null): string[] {
  if (!strage) return []
  return strage.split(/\s*[\/,~]\s*/).map((s) => s.trim()).filter(Boolean)
}

/** ストレージ表記から最大容量をGB単位で返す */
export function parseMaxStorageGb(strage: string | null): number {
  const parts = parseStorageParts(strage)
  let maxGb = 0
  for (const part of parts) {
    const tbMatch = part.match(/([\d.]+)\s*TB/i)
    if (tbMatch) {
      maxGb = Math.max(maxGb, parseFloat(tbMatch[1]) * 1024)
      continue
    }
    const gbMatch = part.match(/([\d.]+)\s*GB/i)
    if (gbMatch) {
      maxGb = Math.max(maxGb, parseFloat(gbMatch[1]))
    }
  }
  return maxGb
}

/**
 * "128GB / 1TB" のような範囲表記を中間ステップも含めて展開
 * @param strage - ストレージ表記文字列
 * @param allSteps - デバイス固有の容量ステップ配列（GB単位）
 *   iPhone: [32, 64, 128, 256, 512, 1024, 2048]
 *   iPad:   [16, 32, 64, 128, 256, 512, 1024, 2048]
 *   MacBook: [128, 256, 512, 1024, 2048, 4096, 8192]
 */
export function expandStorageRange(strage: string | null, allSteps: number[]): string[] {
  if (!strage) return []
  const parts = parseStorageParts(strage)
  if (parts.length !== 2) return parts

  const parseGb = (s: string): number => {
    const tb = s.match(/([\d.]+)\s*TB/i)
    if (tb) return parseFloat(tb[1]) * 1024
    const gb = s.match(/([\d.]+)\s*GB/i)
    if (gb) return parseFloat(gb[1])
    return 0
  }

  const minGb = parseGb(parts[0])
  const maxGb = parseGb(parts[1])
  if (minGb === 0 || maxGb === 0) return parts

  const expanded = allSteps.filter((gb) => gb >= minGb && gb <= maxGb)

  return expanded.map((gb) => gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`)
}

/** 価格をフォーマット（例: 78520 → "¥78,520"） */
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString()}`
}
