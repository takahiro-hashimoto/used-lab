import type { IPhoneModel } from '@/lib/types'
import { getReleaseYear } from '@/lib/utils/shared-helpers'
import { LEGACY_IPHONES, type LegacyIPhone } from '@/lib/data/legacy-iphones'

/* ------------------------------------------------------------------
   iOSバージョン定義（列ヘッダー）
   新しいiOSが出たら1行追加するだけでOK
   ------------------------------------------------------------------ */
type IosVersion = {
  year: number
  label: string       // "2024年"
  version: string     // "iOS 18"
  versionNum: number  // 18
}

const IOS_VERSIONS: IosVersion[] = [
  { year: 2015, label: '2015年', version: 'iOS 9',  versionNum: 9 },
  { year: 2016, label: '2016年', version: 'iOS 10', versionNum: 10 },
  { year: 2017, label: '2017年', version: 'iOS 11', versionNum: 11 },
  { year: 2018, label: '2018年', version: 'iOS 12', versionNum: 12 },
  { year: 2019, label: '2019年', version: 'iOS 13', versionNum: 13 },
  { year: 2020, label: '2020年', version: 'iOS 14', versionNum: 14 },
  { year: 2021, label: '2021年', version: 'iOS 15', versionNum: 15 },
  { year: 2022, label: '2022年', version: 'iOS 16', versionNum: 16 },
  { year: 2023, label: '2023年', version: 'iOS 17', versionNum: 17 },
  { year: 2024, label: '2024年', version: 'iOS 18', versionNum: 18 },
  { year: 2025, label: '2025年', version: 'iOS 19', versionNum: 19 },
]

/* ------------------------------------------------------------------
   iOSバージョン文字列 → 数値パーサー
   "iOS 17" → 17
   ------------------------------------------------------------------ */
function parseIosVersionNum(iosStr: string): number {
  const match = iosStr.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

/* ------------------------------------------------------------------
   シリーズ名抽出ヘルパー
   DB実データ例:
     "iPhone11 Pro Max" → "iPhone 11 シリーズ"
     "iPhone SE 第2世代" → "iPhone SE 第2世代"
     "iPhone16e"         → "iPhone 16e"
     "iPhone Air"        → "iPhone Air"
   ------------------------------------------------------------------ */
function getSeriesName(model: string): string {
  // SE系は世代を含めてそのまま返す
  if (model.includes('SE')) return model

  // Air モデル
  if (model.includes('Air')) return 'iPhone Air'

  // "e" 付きモデル (iPhone16e) — 表示用にスペースを入れる
  const eMatch = model.match(/^iPhone\s*(\d+e)$/i)
  if (eMatch) return `iPhone ${eMatch[1]}`

  // 通常モデル: "iPhone XX シリーズ" としてグルーピング
  // DB上は "iPhone11", "iPhone12 mini" 等（数字の前にスペースがない場合もある）
  const match = model.match(/^iPhone\s*(\d+)/)
  if (match) return `iPhone ${match[1]} シリーズ`

  return model
}

/* ------------------------------------------------------------------
   統一されたデバイス行データ
   ------------------------------------------------------------------ */
type DeviceRow = {
  name: string
  releaseYear: number
  lastIosNum: number | null  // null = まだサポート中
}

/* ------------------------------------------------------------------
   判定ロジック: デバイス × iOSバージョン → セルステータス
   ------------------------------------------------------------------ */
type CellStatus = 'supported' | 'ended' | 'unreleased'

function getCellStatus(device: DeviceRow, ios: IosVersion): CellStatus {
  // 端末リリース年よりもiOSリリース年が前 → 未発売
  if (ios.year < device.releaseYear) return 'unreleased'

  // lastIosNum が null → サポート中（全バージョン対応）
  if (device.lastIosNum === null) return 'supported'

  // lastIosNum が設定済み → そのバージョンまで対応、以降は終了
  return ios.versionNum <= device.lastIosNum ? 'supported' : 'ended'
}

/* ------------------------------------------------------------------
   DB機種をシリーズ単位にグルーピング
   ------------------------------------------------------------------ */
function groupModelsBySeries(models: IPhoneModel[]): DeviceRow[] {
  const seriesMap = new Map<string, { releaseYear: number; lastIosNum: number | null }>()

  for (const m of models) {
    const series = getSeriesName(m.model)
    if (!seriesMap.has(series)) {
      seriesMap.set(series, {
        releaseYear: getReleaseYear(m.date),
        lastIosNum: m.last_ios ? parseIosVersionNum(m.last_ios) : null,
      })
    }
  }

  return Array.from(seriesMap.entries()).map(([name, data]) => ({
    name,
    releaseYear: data.releaseYear,
    lastIosNum: data.lastIosNum,
  }))
}

/* ------------------------------------------------------------------
   旧機種定数 → DeviceRow に変換
   ------------------------------------------------------------------ */
function legacyToDeviceRows(legacyList: LegacyIPhone[]): DeviceRow[] {
  return legacyList.map((l) => ({
    name: l.name,
    releaseYear: l.releaseYear,
    lastIosNum: parseIosVersionNum(l.lastIos),
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
  models: IPhoneModel[]
}

export default function IosSupportMatrix({ models }: Props) {
  // 旧機種（定数） + DB機種 を結合
  const legacyRows = legacyToDeviceRows(LEGACY_IPHONES)
  const dbRows = groupModelsBySeries(models)
  const allDevices = [...legacyRows, ...dbRows]

  return (
    <section className="l-section" id="support-table" aria-labelledby="heading-support-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-support-table">
          iOS別サポート機種一覧表
        </h2>
        <p className="m-section-desc">
          iPhone機種ごとに、どのiOSバージョンに対応しているかを一覧でまとめました。
          <br />
          お使いの機種がいつまでサポートされるかの目安としてご活用ください。
        </p>

        <p className="m-section-heading m-section-heading--sm">iPhone機種別 iOS対応状況一覧</p>

        <div className="ios-matrix-scroll m-scroll-x m-scroll-x--styled">
          <table className="ios-matrix">
            <caption className="visually-hidden">iPhone機種別 iOS対応状況一覧表</caption>
            <thead>
              <tr>
                <th>機種</th>
                {IOS_VERSIONS.map((v) => (
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
                  <th>
                    {device.name}
                    <small>{device.releaseYear}年発売</small>
                  </th>
                  {IOS_VERSIONS.map((ios) => {
                    const status = getCellStatus(device, ios)
                    const cell = CELL_MAP[status]
                    return (
                      <td key={ios.version} className={cell.className}>
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
          ※ 各iOSサポート状況は<a href="https://support.apple.com/ja-jp/guide/iphone/iphe3fa5df43/ios" target="_blank" rel="noopener noreferrer">Apple公式サイト</a>から引用しています。
          <br />
          ※ 各モデルのPro / Plus / Max等のバリエーションも同じiOS対応状況となります。
        </p>
      </div>
    </section>
  )
}
