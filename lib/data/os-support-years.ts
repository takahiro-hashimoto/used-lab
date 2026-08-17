// ============================================================
// カテゴリ別のOSサポート想定年数
//
// Apple は各機種のサポート終了時期を公表しないため、発売からの年数で
// 推定するしかない。その年数をここに集約する。
//
// ── なぜ集約するか ──
// 以前は同じ数字が3箇所に散らばっていて、実際にズレていた。
//   lib/utils/iphone-helpers.ts   7年   ← 機種ページ・サポートページ
//   filter-search の estimateSupportEnd 6年   ← 診断ページだけ1年短い
//   lib/data/filter-search-note.ts 7年   ← 診断ページの説明文（カードと矛盾）
// 結果、iPhone 17 が診断ページでは「2031年頃まで」、サポートページでは
// 「2032年9月頃まで」と表示されていた。Apple Watch は逆に診断ページだけ
// 7年で計算され、サイト全体の5年より2年長く出ていた（楽観側のズレ）。
//
// 数字を変えるときは必ずここだけを変えること。
//
// ── Galaxy / Pixel は対象外 ──
// Samsung と Google は機種ごとの提供年数を公表しており、DB の
// support_until に実値がある。推定しないので、この定数は使わない。
// ============================================================

export const OS_SUPPORT_YEARS = {
  /** iOS。Appleのこれまでの傾向から発売後およそ7年 */
  iphone: 7,
  /** iPadOS。iOSと同じ傾向 */
  ipad: 7,
  /** macOS */
  macbook: 7,
  /** watchOS。他製品より短く、およそ5年で更新対象から外れる */
  watch: 5,
  /**
   * AirPods はOSではなくファームウェア更新。
   * 「OSサポート」と表記しないこと（lib/utils/airpods-helpers.ts の
   * calculateFirmwareLifespan がこの年数を使っている）。
   */
  airpods: 7,
} as const

export type OsSupportCategory = keyof typeof OS_SUPPORT_YEARS

/**
 * 発売日からサポート終了の目安年を返す。推定なので「頃まで」を付ける。
 *
 * lastOs が入っている機種は最終対応OSが確定＝サポート終了済みなので、
 * 呼び出し側で先に判定すること。
 */
export function estimateSupportEndYear(
  date: string | null,
  category: OsSupportCategory,
): number | null {
  if (!date) return null
  const year = new Date(date).getFullYear()
  if (!year) return null
  return year + OS_SUPPORT_YEARS[category]
}
