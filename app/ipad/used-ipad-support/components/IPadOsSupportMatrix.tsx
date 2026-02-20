import { Fragment } from 'react'
import type { IPadModel } from '@/lib/types'
import { getReleaseYear } from '@/lib/utils/shared-helpers'
import {
  LEGACY_IPADS_NORMAL,
  LEGACY_IPADS_MINI,
  LEGACY_IPADS_PRO,
  LEGACY_IPADS_AIR,
  type LegacyIPad,
} from '@/lib/data/legacy-ipads'

/* ------------------------------------------------------------------
   iPadOSバージョン定義（列ヘッダー）
   新しいiPadOSが出たら1行追加するだけでOK
   ------------------------------------------------------------------ */
type IPadOsVersion = {
  year: number
  label: string
  version: string
  versionNum: number
}

const IPADOS_VERSIONS: IPadOsVersion[] = [
  { year: 2019, label: '2019年', version: 'iPadOS 13', versionNum: 13 },
  { year: 2020, label: '2020年', version: 'iPadOS 14', versionNum: 14 },
  { year: 2021, label: '2021年', version: 'iPadOS 15', versionNum: 15 },
  { year: 2022, label: '2022年', version: 'iPadOS 16', versionNum: 16 },
  { year: 2023, label: '2023年', version: 'iPadOS 17', versionNum: 17 },
  { year: 2024, label: '2024年', version: 'iPadOS 18', versionNum: 18 },
  { year: 2025, label: '2025年', version: 'iPadOS 19', versionNum: 19 },
]

/* ------------------------------------------------------------------
   iPadOSバージョン文字列 → 数値パーサー
   "iPadOS 17" → 17
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
   ------------------------------------------------------------------ */
type CellStatus = 'supported' | 'ended' | 'unreleased'

function getCellStatus(device: DeviceRow, os: IPadOsVersion): CellStatus {
  if (os.year < device.releaseYear) return 'unreleased'
  if (device.lastVersionNum === null) return 'supported'
  return os.versionNum <= device.lastVersionNum ? 'supported' : 'ended'
}

/* ------------------------------------------------------------------
   旧機種定数 → DeviceRow に変換
   ------------------------------------------------------------------ */
function legacyToDeviceRows(legacyList: LegacyIPad[]): DeviceRow[] {
  return legacyList.map((l) => ({
    name: l.name,
    releaseYear: l.releaseYear,
    lastVersionNum: parseVersionNum(l.lastIpadOs),
  }))
}

/* ------------------------------------------------------------------
   DB機種 → DeviceRow に変換（個別表示・グルーピングなし）
   DB名をそのまま表示名として使用する
   ------------------------------------------------------------------ */
function dbToDeviceRows(models: IPadModel[]): DeviceRow[] {
  return models.map((m) => ({
    name: m.model,
    releaseYear: getReleaseYear(m.date),
    lastVersionNum: m.last_ipados ? parseVersionNum(m.last_ipados) : null,
  }))
}

/* ------------------------------------------------------------------
   DB機種をカテゴリーで分類するヘルパー
   - "iPad Pro ..." → pro
   - "iPad Air ..." → air
   - "iPad mini ..." → mini
   - "iPad ..." → normal
   ------------------------------------------------------------------ */
function categorizeDBModel(model: string): 'normal' | 'mini' | 'pro' | 'air' {
  if (model.startsWith('iPad Pro')) return 'pro'
  if (model.startsWith('iPad Air')) return 'air'
  if (model.startsWith('iPad mini')) return 'mini'
  return 'normal'
}

/* ------------------------------------------------------------------
   DB機種の表示名を整形
   Pro / Air はサイズ＋世代の参考サイト風フォーマットに変換
   例: "iPad Pro 11 第2世代" → "11インチiPad Pro（第2世代）"
       "iPad Pro 12.9 第4世代" → "12.9インチiPad Pro（第4世代）"
       "iPad Pro 13 第1世代"  → "13インチiPad Pro（第1世代）"
       "iPad Air 11 第6世代"  → "11インチiPad Air（第6世代）"
       "iPad Air 第4世代"     → "iPad Air（第4世代）"
       "iPad 第9世代"         → "iPad（第9世代）"
       "iPad mini 第5世代"    → "iPad mini（第5世代）"
   ------------------------------------------------------------------ */
function formatDisplayName(model: string): string {
  // iPad Pro with size: "iPad Pro 11 第2世代" or "iPad Pro 12.9 第4世代"
  const proMatch = model.match(/^iPad Pro\s+([\d.]+)\s+(第\d+世代)$/)
  if (proMatch) return `${proMatch[1]}インチiPad Pro（${proMatch[2]}）`

  // iPad Air with size: "iPad Air 11 第6世代"
  const airSizeMatch = model.match(/^iPad Air\s+(\d+)\s+(第\d+世代)$/)
  if (airSizeMatch) return `${airSizeMatch[1]}インチiPad Air（${airSizeMatch[2]}）`

  // iPad Air without size: "iPad Air 第4世代"
  const airMatch = model.match(/^iPad Air\s+(第\d+世代)$/)
  if (airMatch) return `iPad Air（${airMatch[1]}）`

  // iPad mini: "iPad mini 第5世代"
  const miniMatch = model.match(/^iPad mini\s+(第\d+世代)$/)
  if (miniMatch) return `iPad mini（${miniMatch[1]}）`

  // iPad normal: "iPad 第9世代"
  const normalMatch = model.match(/^iPad\s+(第\d+世代)$/)
  if (normalMatch) return `iPad（${normalMatch[1]}）`

  // iPad (A16) etc.
  return model
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
   テーブル描画サブコンポーネント
   ------------------------------------------------------------------ */
function MatrixTable({
  caption,
  groups,
}: {
  caption: string
  groups: { heading: string; rows: DeviceRow[] }[]
}) {
  return (
    <div className="ios-matrix-scroll">
      <table className="ios-matrix">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th>機種</th>
            {IPADOS_VERSIONS.map((v) => (
              <th key={v.version}>
                {v.label}
                <small>{v.version}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <Fragment key={group.heading}>
              <tr className="ios-matrix__group-row">
                <th colSpan={IPADOS_VERSIONS.length + 1} className="ios-matrix__group-heading">
                  {group.heading}
                </th>
              </tr>
              {group.rows.map((device) => (
                <tr key={device.name}>
                  <th>{device.name}</th>
                  {IPADOS_VERSIONS.map((os) => {
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
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------
   凡例サブコンポーネント
   ------------------------------------------------------------------ */
function Legend() {
  return (
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
        <span>未発売／該当なし</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   メインコンポーネント
   ------------------------------------------------------------------ */
type Props = {
  models: IPadModel[]
}

export default function IPadOsSupportMatrix({ models }: Props) {
  // DB機種をカテゴリー別に分類
  const dbNormal: IPadModel[] = []
  const dbMini: IPadModel[] = []
  const dbPro: IPadModel[] = []
  const dbAir: IPadModel[] = []

  for (const m of models) {
    switch (categorizeDBModel(m.model)) {
      case 'normal': dbNormal.push(m); break
      case 'mini':   dbMini.push(m);   break
      case 'pro':    dbPro.push(m);    break
      case 'air':    dbAir.push(m);    break
    }
  }

  // DB機種を DeviceRow に変換（個別表示、表示名を整形）
  const toFormattedRows = (list: IPadModel[]): DeviceRow[] =>
    list.map((m) => ({
      name: formatDisplayName(m.model),
      releaseYear: getReleaseYear(m.date),
      lastVersionNum: m.last_ipados ? parseVersionNum(m.last_ipados) : null,
    }))

  // ── テーブル1: iPad / iPad mini ──
  const table1Groups = [
    {
      heading: 'iPad（無印）',
      rows: [...legacyToDeviceRows(LEGACY_IPADS_NORMAL), ...toFormattedRows(dbNormal)],
    },
    {
      heading: 'iPad mini',
      rows: [...legacyToDeviceRows(LEGACY_IPADS_MINI), ...toFormattedRows(dbMini)],
    },
  ]

  // ── テーブル2: iPad Pro / iPad Air ──
  const table2Groups = [
    {
      heading: 'iPad Pro',
      rows: [...legacyToDeviceRows(LEGACY_IPADS_PRO), ...toFormattedRows(dbPro)],
    },
    {
      heading: 'iPad Air',
      rows: [...legacyToDeviceRows(LEGACY_IPADS_AIR), ...toFormattedRows(dbAir)],
    },
  ]

  return (
    <section className="l-section" id="support-table" aria-labelledby="heading-support-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-support-table">
          iPadOS別サポート機種一覧表
        </h2>
        <p className="m-section-desc">
          iPad機種ごとに、どのiPadOSバージョンに対応しているかを一覧でまとめました。
          <br />
          お使いの機種がいつまでサポートされるかの目安としてご活用ください。
        </p>

        {/* テーブル1: iPad / iPad mini */}
        <p className="m-section-heading m-section-heading--sm">iPad / mini iPadOS対応状況一覧</p>
        <MatrixTable
          caption="iPad / iPad mini iPadOS対応状況一覧表"
          groups={table1Groups}
        />
        <Legend />

        {/* テーブル2: iPad Pro / iPad Air */}
        <p className="m-section-heading m-section-heading--sm" style={{ marginTop: '3rem' }}>
          iPad Pro / iPad Air iPadOS対応状況一覧
        </p>
        <MatrixTable
          caption="iPad Pro / iPad Air iPadOS対応状況一覧表"
          groups={table2Groups}
        />
        <Legend />

        <p className="m-footnote">
          ※ 各iPadOSサポート状況は<a href="https://support.apple.com/ja-jp/guide/ipad/ipad213a25b2/ipados" target="_blank" rel="noopener noreferrer">Apple公式サイト</a>から引用しています。
          <br />
          ※ iPadOS 19は2025年秋リリース予定の情報にもとづく予想です。
        </p>
      </div>
    </section>
  )
}
