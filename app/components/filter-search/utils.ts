/**
 * フィルター診断コンポーネント共通ユーティリティ
 * iPhone / iPad / Apple Watch の各フィルター診断ページで共有
 */

/** 価格をカンマ区切りでフォーマット（¥プレフィックスなし） */
export function formatPrice(price: number): string {
  return price.toLocaleString('ja-JP')
}

/** 3店舗（イオシス・ゲオ・じゃんぱら）の最安値平均を算出 */
/**
 * 診断結果カードの価格と、予算フィルタの判定に使う相場。
 *
 * かつては「3ショップの最安値の平均」だったが、これはサイトのどこにも
 * 存在しない独自基準で、詳細ページ（中央値）と最大1万円以上ずれていた。
 * 「〜3万円」で絞ったのに詳細ページでは3万円超、という事故が起きるため、
 * サーバー側で算出した実勢相場（中央値）を優先する。
 * marketPrice は価格配列の記録がある日だけ入る（2026-07-30 以降）。
 */
export function getAvgPrice(m: {
  marketPrice?: number | null
  iosysMin: number | null
  geoMin: number | null
  janparaMin: number | null
}): number | null {
  if (m.marketPrice != null && m.marketPrice > 0) return m.marketPrice

  const prices = [m.iosysMin, m.geoMin, m.janparaMin].filter(
    (p): p is number => p != null && p > 0,
  )
  if (prices.length === 0) return null
  return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
}

/** ISO日付文字列を「YYYY年M月」にフォーマット */
export function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const d = new Date(date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
}

/** 発売日が3年以内かどうかを判定 */
export function isWithin3Years(dateStr: string | null): boolean {
  if (!dateStr) return false
  const releaseDate = new Date(dateStr)
  const threeYearsAgo = new Date()
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3)
  return releaseDate >= threeYearsAgo
}
