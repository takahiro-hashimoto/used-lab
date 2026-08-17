import { Fragment } from 'react'
import type { MacModel, MacDeviceType } from '@/lib/types'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import { getReleaseYear } from '@/lib/utils/shared-helpers'

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
function dbToDeviceRows(models: MacModel[]): DeviceRow[] {
  return models.map((m) => ({
    name: m.shortname || m.model,
    releaseYear: getReleaseYear(m.date),
    lastVersionIndex: m.last_macos ? getVersionIndex(m.last_macos) : null,
  }))
}

/* ------------------------------------------------------------------
   旧機種定数 → DeviceRow に変換
   ------------------------------------------------------------------ */
/* ------------------------------------------------------------------
   DB機種をカテゴリーで分類
   ------------------------------------------------------------------ */
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
      <StickyTableWrapper floatingHeader>
      <div className="ios-matrix-scroll m-scroll-x m-scroll-x--styled m-table-scroll">
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
                      <th className="u-shrink">
                        {device.name}
                      </th>
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
      </StickyTableWrapper>
    </>
  )
}

/* ------------------------------------------------------------------
   凡例サブコンポーネント
   ------------------------------------------------------------------ */
function Legend() {
  return (
    <div className="m-legend u-mb-md">
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
  models: MacModel[]
}

/** 表の並び。Apple Silicon 世代のみを扱う */
const GROUP_DEFS: { type: MacDeviceType; heading: string }[] = [
  { type: 'imac', heading: 'iMac' },
  { type: 'mac-mini', heading: 'Mac mini' },
  { type: 'mac-studio', heading: 'Mac Studio' },
]

export default function MacOsSupportMatrix({ models }: Props) {
  // Intel世代のデスクトップMacは当サイトの対象外のため、
  // MacBook版にあったレガシー行（legacy-macbooks）は使わない。
  // 脚注もレガシー由来だったので空になる
  const footnotes: { label: string; text: string }[] = []

  const groups = GROUP_DEFS
    .map(({ type, heading }) => ({
      heading,
      rows: dbToDeviceRows(models.filter((m) => m.device_type === type)),
    }))
    .filter((g) => g.rows.length > 0)

  return (
    <section className="l-section" id="support-table" aria-labelledby="heading-support-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-support-table">
          macOS別サポート機種一覧表
        </h2>
        <p className="m-section-desc">iMac・Mac mini・Mac Studioの機種ごとに、どのmacOSバージョンに対応しているかを一覧でまとめました。</p>
        <p className="m-section-desc">お使いの機種がサポート対象になっているか判断するのにご活用ください。</p>

        <p className="m-section-heading m-section-heading--sm">iMac・Mac mini macOS対応状況一覧</p>

        <MatrixTable
          caption="iMac・Mac mini macOS対応状況一覧表"
          groups={groups}
          footnotes={footnotes}
        />
        <Legend />

        <p className="m-footnote">
          ※ 各macOSサポート状況は<a href="https://support.apple.com/ja-jp/122867" target="_blank" rel="noopener noreferrer">Apple公式サイト</a>から引用しています。
          {footnotes.map((fn, i) => (
            <Fragment key={fn.label}>
              <br />
              ※{i + 1} {fn.text}
            </Fragment>
          ))}
        </p>

        {/* 埋め込みボタンは置かない。iMac・Mac mini には /embed/mac/support/ が
            存在しないため（MacBook のファイルをコピーしたまま src が
            /embed/macbook/support/ を指しており、コピーした人のサイトに
            別カテゴリの表が埋まる状態だった）。embed ページを作る場合はここに戻す */}
      </div>
    </section>
  )
}
