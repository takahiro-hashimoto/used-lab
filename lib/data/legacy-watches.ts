/**
 * DB未登録のサポート切れ旧機種データ（Apple Watch）
 * WatchOsSupportMatrix で使用する
 */

export type LegacyWatch = {
  name: string
  releaseYear: number
  lastWatchOs: string // サポート終了時の最終watchOSバージョン（例: "watchOS 6"）
}

export const LEGACY_WATCHES: LegacyWatch[] = [
  { name: 'Apple Watch Series 1', releaseYear: 2016, lastWatchOs: 'watchOS 6' },
  { name: 'Apple Watch Series 2', releaseYear: 2016, lastWatchOs: 'watchOS 6' },
  { name: 'Apple Watch Series 3', releaseYear: 2017, lastWatchOs: 'watchOS 8' },
]
