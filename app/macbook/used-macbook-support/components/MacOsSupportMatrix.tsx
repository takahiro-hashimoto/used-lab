import { Fragment } from 'react'
import type { MacBookModel } from '@/lib/types'
import { getReleaseYear } from '@/lib/utils/shared-helpers'
import {
  LEGACY_MACBOOK_PRO,
  LEGACY_MACBOOK_AIR,
  type LegacyMacBook,
} from '@/lib/data/legacy-macbooks'

/* ------------------------------------------------------------------
   macOSバージョン定義（列ヘッダー）
   新しいmacOSが出たら1行追加するだけでOK
   ------------------------------------------------------------------ */
type MacOsVersion = {
  year: number
  label: string
  version: string
  index: number // 比較用の連番
}

const MACOS_VERSIONS: MacOsVersion[] = [
  { year: 2020, label: '2020年', version: 'Big Sur',   index: 0 },
  { year: 2021, label: '2021年', version: 'Monterey',  index: 1 },
  { year: 2022, label: '2022年', version: 'Ventura',   index: 2 },
  { year: 2023, label: '2023年', version: 'Sonoma',    index: 3 },
  { year: 2024, label: '2024年', version: 'Sequoia',   index: 4 },
  { year: 2025, label: '2025年', version: 'Tahoe',     index: 5 },
]

/* macOSバージョン名 → index */
const VERSION_INDEX_MAP: Record<string, number> = {}
for (const v of MACOS_VERSIONS) {
  VERSION_INDEX_MAP[v.version] = v.index
}

function getVersionIndex(name: string): number {
  return VERSION_INDEX_MAP[name] ?? -1
}

/* ------------------------------------------------------------------
   統一されたデバイス行データ
   ------------------------------------------------------------------ */
type DeviceRow = {
  name: string
  releaseYear: number
  lastVersionIndex: number | null // null = まだサポート中
  partialVersionIndex?: number    // △表示用
  partialNote?: string
}

/* ------------------------------------------------------------------
   判定ロジック
   ------------------------------------------------------------------ */
type CellStatus = 'supported' | 'ended' | 'unreleased' | 'partial'

function getCellStatus(device: DeviceRow, os: MacOsVersion): CellStatus {
  if (os.year < device.releaseYear) return 'unreleased'
  if (device.lastVersionIndex === null) return 'supported'

  if (os.index <= device.lastVersionIndex) return 'supported'

  // △ 判定: partialVersionIndex と一致する場合
  if (device.partialVersionIndex !== undefined && os.index === device.partialVersionIndex) {
    return 'partial'
  }

  return 'ended'
}

/* ------------------------------------------------------------------
   DB機種 → DeviceRow に変換
   DB名をそのまま表示名に使用
   ------------------------------------------------------------------ */
function dbToDeviceRows(models: MacBookModel[]): DeviceRow[] {
  return models.map((m) => ({
    name: m.shortname || m.model,
    releaseYear: getReleaseYear(m.date),
    lastVersionIndex: m.last_macos ? getVersionIndex(m.last_macos) : null,
  }))
}

/* ------------------------------------------------------------------
   旧機種定数 → DeviceRow に変換
   ------------------------------------------------------------------ */
function legacyToDeviceRows(legacyList: LegacyMacBook[]): DeviceRow[] {
  return legacyList.map((l) => ({
    name: l.name,
    releaseYear: l.releaseYear,
    lastVersionIndex: getVersionIndex(l.lastMacOs),
    partialVersionIndex: l.partialMacOs ? getVersionIndex(l.partialMacOs) : undefined,
    partialNote: l.partialNote,
  }))
}

/* ------------------------------------------------------------------
   DB機種をカテゴリーで分類
   ------------------------------------------------------------------ */
function categorizeDBModel(model: string): 'pro' | 'air' {
  if (model.includes('Air') || model.includes('MBA')) return 'air'
  return 'pro'
}

/* ------------------------------------------------------------------
   セルスタイルマップ
   ------------------------------------------------------------------ */
const CELL_MAP = {
  supported:  { className: 'cell-supported',  label: '○' },
  ended:      { className: 'cell-ended',      label: '×' },
  unreleased: { className: 'cell-unreleased', label: '–' },
  partial:    { className: 'cell-partial',     label: '△' },
} as const

/* ------------------------------------------------------------------
   テーブル描画サブコンポーネント
   ------------------------------------------------------------------ */
function MatrixTable({
  caption,
  groups,
  footnotes,
}: {
  caption: string
  groups: { heading: string; rows: DeviceRow[] }[]
  footnotes?: { label: string; text: string }[]
}) {
  return (
    <>
      <div className="ios-matrix-scroll">
        <table className="ios-matrix">
          <caption className="visually-hidden">{caption}</caption>
          <thead>
            <tr>
              <th>機種</th>
              {MACOS_VERSIONS.map((v) => (
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
                  <th colSpan={MACOS_VERSIONS.length + 1} className="ios-matrix__group-heading">
                    {group.heading}
                  </th>
                </tr>
                {group.rows.map((device) => {
                  // この行に△があるか確認してフットノート番号を割り当て
                  const partialNoteIndex = footnotes?.findIndex((f) => f.text === device.partialNote)
                  return (
                    <tr key={device.name}>
                      <th>{device.name}</th>
                      {MACOS_VERSIONS.map((os) => {
                        const status = getCellStatus(device, os)
                        const cell = CELL_MAP[status]
                        return (
                          <td key={os.version} className={cell.className}>
                            {cell.label}
                            {status === 'partial' && partialNoteIndex !== undefined && partialNoteIndex >= 0 && (
                              <small>※{partialNoteIndex + 1}</small>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
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
        <span className="m-legend__color cell-partial">△</span>
        <span>一部モデルのみ対応</span>
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
  )
}

/* ------------------------------------------------------------------
   メインコンポーネント
   ------------------------------------------------------------------ */
type Props = {
  models: MacBookModel[]
}

export default function MacOsSupportMatrix({ models }: Props) {
  // DB機種をカテゴリー別に分類
  const dbPro: MacBookModel[] = []
  const dbAir: MacBookModel[] = []

  for (const m of models) {
    if (categorizeDBModel(m.model)) {
      if (categorizeDBModel(m.model) === 'air') dbAir.push(m)
      else dbPro.push(m)
    }
  }

  // レガシー行を生成
  const legacyProRows = legacyToDeviceRows(LEGACY_MACBOOK_PRO)
  const legacyAirRows = legacyToDeviceRows(LEGACY_MACBOOK_AIR)

  // △フットノートを収集
  const allLegacy = [...LEGACY_MACBOOK_PRO, ...LEGACY_MACBOOK_AIR]
  const footnoteTexts = new Set<string>()
  for (const l of allLegacy) {
    if (l.partialNote) footnoteTexts.add(l.partialNote)
  }
  const footnotes = Array.from(footnoteTexts).map((text, i) => ({
    label: `※${i + 1}`,
    text,
  }))

  const groups = [
    {
      heading: 'MacBook Pro',
      rows: [...legacyProRows, ...dbToDeviceRows(dbPro)],
    },
    {
      heading: 'MacBook Air',
      rows: [...legacyAirRows, ...dbToDeviceRows(dbAir)],
    },
  ]

  return (
    <section className="l-section" id="support-table" aria-labelledby="heading-support-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-support-table">
          macOS別サポート機種一覧表
        </h2>
        <p className="m-section-desc">
          MacBook機種ごとに、どのmacOSバージョンに対応しているかを一覧でまとめました。
          <br />
          お使いの機種がいつまでサポートされるかの目安としてご活用ください。
        </p>

        <p className="m-section-heading m-section-heading--sm">MacBook Pro / Air macOS対応状況一覧</p>

        <MatrixTable
          caption="MacBook Pro / Air macOS対応状況一覧表"
          groups={groups}
          footnotes={footnotes}
        />
        <Legend />

        <p className="m-footnote">
          ※ 各macOSサポート状況は<a href="https://support.apple.com/ja-jp/102861" target="_blank" rel="noopener noreferrer">Apple公式サイト</a>から引用しています。
          {footnotes.map((fn, i) => (
            <Fragment key={fn.label}>
              <br />
              ※{i + 1} {fn.text}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
