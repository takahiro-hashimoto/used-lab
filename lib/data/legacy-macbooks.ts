/**
 * DB未登録のサポート切れ旧機種データ（MacBook）
 * MacOsSupportMatrix で使用する
 *
 * category:
 *   "pro"  → MacBook Pro テーブルに表示
 *   "air"  → MacBook Air テーブルに表示
 *
 * partialMacos:
 *   一部モデルのみ対応のmacOSバージョン名（△表示用）
 *   例: MBP 2019 の16インチのみ Tahoe 対応 → partialMacos: 'Tahoe'
 */

export type LegacyMacBook = {
  name: string
  releaseYear: number
  lastMacOs: string       // 完全対応の最終macOSバージョン名（例: "Sequoia"）
  category: 'pro' | 'air'
  partialMacOs?: string   // 一部モデルのみ対応する次のバージョン名（△表示用）
  partialNote?: string    // △の補足テキスト
}

/* ── MacBook Pro（レガシー）── */
export const LEGACY_MACBOOK_PRO: LegacyMacBook[] = [
  { name: 'MBP (Retina, 13/15-inch, 2015)',   releaseYear: 2015, lastMacOs: 'Monterey',  category: 'pro' },
  { name: 'MBP (13/15-inch, 2016)',            releaseYear: 2016, lastMacOs: 'Monterey',  category: 'pro' },
  { name: 'MBP (13/15-inch, 2017)',            releaseYear: 2017, lastMacOs: 'Ventura',   category: 'pro' },
  { name: 'MBP (13/15-inch, 2018)',            releaseYear: 2018, lastMacOs: 'Sequoia',   category: 'pro' },
  {
    name: 'MBP (13/15/16-inch, 2019)',
    releaseYear: 2019,
    lastMacOs: 'Sequoia',
    category: 'pro',
    partialMacOs: 'Tahoe',
    partialNote: '16インチモデルのみ対応（13/15インチモデルは×）',
  },
  {
    name: 'MBP (13-inch, 2020 Intel)',
    releaseYear: 2020,
    lastMacOs: 'Sequoia',
    category: 'pro',
    partialMacOs: 'Tahoe',
    partialNote: '4ポートモデルのみ対応（2ポートモデルは×）',
  },
]

/* ── MacBook Air（レガシー）── */
export const LEGACY_MACBOOK_AIR: LegacyMacBook[] = [
  { name: 'MBA (11/13-inch, 2015)',              releaseYear: 2015, lastMacOs: 'Monterey',  category: 'air' },
  { name: 'MBA (13-inch, 2017)',                  releaseYear: 2017, lastMacOs: 'Monterey',  category: 'air' },
  { name: 'MBA (Retina, 13-inch, 2018-2019)',     releaseYear: 2018, lastMacOs: 'Sonoma',    category: 'air' },
  { name: 'MBA (Retina, 13-inch, 2020 Intel)',    releaseYear: 2020, lastMacOs: 'Sequoia',   category: 'air' },
]

/* すべてのレガシーデータ */
export const LEGACY_MACBOOKS: LegacyMacBook[] = [
  ...LEGACY_MACBOOK_PRO,
  ...LEGACY_MACBOOK_AIR,
]
