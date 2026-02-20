import type { WatchModel } from '@/lib/types'
import { getReleaseYear } from '@/lib/utils/shared-helpers'
import { LEGACY_WATCHES, type LegacyWatch } from '@/lib/data/legacy-watches'

/* ------------------------------------------------------------------
   watchOSバージョン定義（列ヘッダー）
   新しいwatchOSが出たら1行追加するだけでOK
   ※ 2025年にAppleがバージョン番号を年ベースに統一し、watchOS 12〜25は欠番
   ------------------------------------------------------------------ */
type WatchOsVersion = {
  year: number
  label: string
  version: string
  versionNum: number
}

const WATCHOS_VERSIONS: WatchOsVersion[] = [
  { year: 2019, label: '2019年', version: 'watchOS 6',  versionNum: 6 },
  { year: 2020, label: '2020年', version: 'watchOS 7',  versionNum: 7 },
  { year: 2021, label: '2021年', version: 'watchOS 8',  versionNum: 8 },
  { year: 2022, label: '2022年', version: 'watchOS 9',  versionNum: 9 },
  { year: 2023, label: '2023年', version: 'watchOS 10', versionNum: 10 },
  { year: 2024, label: '2024年', version: 'watchOS 11', versionNum: 11 },
  { year: 2025, label: '2025年', version: 'watchOS 26', versionNum: 26 },
]

/* ------------------------------------------------------------------
   watchOSバージョン文字列 → 数値パーサー
   "watchOS 11" → 11, "watchOS 26" → 26
   ------------------------------------------------------------------ */
function parseVersionNum(str: string): number {
  const match = str.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

/* ------------------------------------------------------------------
   統一されたデバイス行データ
   ------------------------------------------------------------------ */
type DeviceRow = {
  name: string
  releaseYear: number
  lastVersionNum: number | null // null = まだサポート中
}

/* ------------------------------------------------------------------
   判定ロジック
   watchOS 11 → 26 のギャップを考慮:
   lastVersionNum が 11以下で、osのversionNumが26の場合は ended
   ------------------------------------------------------------------ */
type CellStatus = 'supported' | 'ended' | 'unreleased'

function getCellStatus(device: DeviceRow, os: WatchOsVersion): CellStatus {
  if (os.year < device.releaseYear) return 'unreleased'
  if (device.lastVersionNum === null) return 'supported'
  // バージョン番号の直接比較で判定
  // lastVersionNum=11 の場合、versionNum=26 は ended になる
  return os.versionNum <= device.lastVersionNum ? 'supported' : 'ended'
}

/* ------------------------------------------------------------------
   DB機種 → DeviceRow に変換（個別表示）
   ------------------------------------------------------------------ */
function dbToDeviceRows(models: WatchModel[]): DeviceRow[] {
  return models.map((m) => ({
    name: m.model,
    releaseYear: getReleaseYear(m.date),
    lastVersionNum: m.last_watchos ? parseVersionNum(m.last_watchos) : null,
  }))
}

/* ------------------------------------------------------------------
   旧機種定数 → DeviceRow に変換
   ------------------------------------------------------------------ */
function legacyToDeviceRows(legacyList: LegacyWatch[]): DeviceRow[] {
  return legacyList.map((l) => ({
    name: l.name,
    releaseYear: l.releaseYear,
    lastVersionNum: parseVersionNum(l.lastWatchOs),
  }))
}

/* ------------------------------------------------------------------
   セルスタイルマップ
   ------------------------------------------------------------------ */
const CELL_MAP = {
  supported:  { className: 'cell-supported',  label: '○' },
  ended:      { className: 'cell-ended',      label: '×' },
  unreleased: { className: 'cell-unreleased', label: '–' },
} as const

/* ------------------------------------------------------------------
   コンポーネント
   ------------------------------------------------------------------ */
type Props = {
  models: WatchModel[]
}

export default function WatchOsSupportMatrix({ models }: Props) {
  const legacyRows = legacyToDeviceRows(LEGACY_WATCHES)
  const dbRows = dbToDeviceRows(models)
  const allDevices = [...legacyRows, ...dbRows]

  return (
    <section className="l-section" id="support-table" aria-labelledby="heading-support-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-support-table">
          watchOS別サポート機種一覧表
        </h2>
        <p className="m-section-desc">
          Apple Watch機種ごとに、どのwatchOSバージョンに対応しているかを一覧でまとめました。
          <br />
          お使いの機種がいつまでサポートされるかの目安としてご活用ください。
        </p>

        <p className="m-section-heading m-section-heading--sm">Apple Watch watchOS対応状況一覧</p>

        <div className="ios-matrix-scroll">
          <table className="ios-matrix">
            <caption className="visually-hidden">Apple Watch機種別 watchOS対応状況一覧表</caption>
            <thead>
              <tr>
                <th>機種</th>
                {WATCHOS_VERSIONS.map((v) => (
                  <th key={v.version}>
                    {v.label}
                    <small>{v.version}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allDevices.map((device) => (
                <tr key={device.name}>
                  <th>{device.name}</th>
                  {WATCHOS_VERSIONS.map((os) => {
                    const status = getCellStatus(device, os)
                    const cell = CELL_MAP[status]
                    return (
                      <td key={os.version} className={cell.className}>
                        {cell.label}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="m-legend">
          <div className="m-legend__item">
            <span className="m-legend__color cell-supported">○</span>
            <span>対応</span>
          </div>
          <div className="m-legend__item">
            <span className="m-legend__color cell-ended">×</span>
            <span>サポート終了</span>
          </div>
          <div className="m-legend__item">
            <span className="m-legend__color cell-unreleased">–</span>
            <span>未発売</span>
          </div>
        </div>

        <p className="m-footnote">
          ※ 各watchOSサポート状況は<a href="https://support.apple.com/ja-jp/guide/watch/apd2054d0d5b/11.0/watchos/11.0" target="_blank" rel="noopener noreferrer">Apple公式サイト</a>から引用しています。
          <br />
          ※ 2025年よりAppleはバージョン番号を年ベースに統一したため、watchOS 11の次はwatchOS 26となっています。
        </p>
      </div>
    </section>
  )
}
