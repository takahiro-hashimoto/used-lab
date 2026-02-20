/**
 * DB未登録のサポート切れ旧機種データ
 * IosSupportMatrix で使用する
 */

export type LegacyIPhone = {
  name: string
  releaseYear: number
  lastIos: string // サポート終了時の最終iOSバージョン（例: "iOS 15"）
}

export const LEGACY_IPHONES: LegacyIPhone[] = [
  { name: 'iPhone 6s',          releaseYear: 2015, lastIos: 'iOS 15' },
  { name: 'iPhone SE（第1世代）', releaseYear: 2016, lastIos: 'iOS 15' },
  { name: 'iPhone 7',           releaseYear: 2016, lastIos: 'iOS 15' },
  { name: 'iPhone 8',           releaseYear: 2017, lastIos: 'iOS 16' },
  { name: 'iPhone X',           releaseYear: 2017, lastIos: 'iOS 16' },
  { name: 'iPhone XS / XR',     releaseYear: 2018, lastIos: 'iOS 17' },
]
