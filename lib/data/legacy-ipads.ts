/**
 * DB未登録のサポート切れ旧機種データ（iPad）
 * iPadOsSupportMatrix で使用する
 *
 * category:
 *   "ipad"     → iPad / iPad mini テーブルに表示
 *   "pro-air"  → iPad Pro / iPad Air テーブルに表示
 */

export type LegacyIPad = {
  name: string
  releaseYear: number
  lastIpadOs: string // サポート終了時の最終iPadOSバージョン（例: "iPadOS 15"）
  category: 'ipad' | 'pro-air'
}

/* ── iPad（無印）── */
export const LEGACY_IPADS_NORMAL: LegacyIPad[] = [
  { name: 'iPad（第5世代）',           releaseYear: 2017, lastIpadOs: 'iPadOS 16', category: 'ipad' },
  { name: 'iPad（第6世代）',           releaseYear: 2018, lastIpadOs: 'iPadOS 16', category: 'ipad' },
  { name: 'iPad（第7世代）',           releaseYear: 2019, lastIpadOs: 'iPadOS 17', category: 'ipad' },
  { name: 'iPad（第8世代）',           releaseYear: 2020, lastIpadOs: 'iPadOS 17', category: 'ipad' },
]

/* ── iPad mini ── */
export const LEGACY_IPADS_MINI: LegacyIPad[] = [
  { name: 'iPad mini 4',             releaseYear: 2015, lastIpadOs: 'iPadOS 15', category: 'ipad' },
]

/* ── iPad Pro ── */
export const LEGACY_IPADS_PRO: LegacyIPad[] = [
  { name: '12.9インチiPad Pro（第1世代）', releaseYear: 2015, lastIpadOs: 'iPadOS 15', category: 'pro-air' },
  { name: '9.7インチiPad Pro',            releaseYear: 2016, lastIpadOs: 'iPadOS 16', category: 'pro-air' },
  { name: '12.9インチiPad Pro（第2世代）', releaseYear: 2017, lastIpadOs: 'iPadOS 16', category: 'pro-air' },
  { name: '10.5インチiPad Pro',           releaseYear: 2017, lastIpadOs: 'iPadOS 16', category: 'pro-air' },
  { name: '11インチiPad Pro（第1世代）',   releaseYear: 2018, lastIpadOs: 'iPadOS 18', category: 'pro-air' },
  { name: '12.9インチiPad Pro（第3世代）', releaseYear: 2018, lastIpadOs: 'iPadOS 18', category: 'pro-air' },
]

/* ── iPad Air ── */
export const LEGACY_IPADS_AIR: LegacyIPad[] = [
  { name: 'iPad Air 2',              releaseYear: 2014, lastIpadOs: 'iPadOS 15', category: 'pro-air' },
]

/* すべてのレガシーデータ（後方互換） */
export const LEGACY_IPADS: LegacyIPad[] = [
  ...LEGACY_IPADS_NORMAL,
  ...LEGACY_IPADS_MINI,
  ...LEGACY_IPADS_PRO,
  ...LEGACY_IPADS_AIR,
]
