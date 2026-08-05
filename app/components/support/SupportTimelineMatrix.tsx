import StickyTableWrapper from '@/app/components/StickyTableWrapper'

/**
 * サポート終了タイムライン（機種 × 年）。
 *
 * iPhone は iOS が全機種に同時配信されるため「機種 × iOSバージョン」の表が成立するが、
 * Android は機種ごとに出荷時バージョンもアップデート回数も違うため、同じ形にすると
 * DB に無い外部の事実（各機種の出荷時Androidと更新回数）を50機種ぶん抱え込むことになる。
 * それは更新されずに腐るので、軸を「年」に変えた。
 *
 * こうすると DB の support_until だけで表が完成する。
 *   - 外部の事実データを持たない（＝古くならない）
 *   - 管理画面で機種を追加すれば行が自動で増える
 *   - 読者が知りたい「あと何年使えるか」に直接答えられる
 *
 * OSメジャーの粒度（「Android 14まで」）は失うが、それは各ページの
 * SupportMatrix（機種別のサポート期限一覧）と本文で補っている。
 */

type SupportModel = {
  model: string
  /** 発売日 "YYYY/M/D" */
  date: string | null
  /** サポート期限 "YYYY-MM" */
  support_until: string | null
}

type TimelineRow = {
  name: string
  releaseYear: number
  endYear: number
  endMonth: number
}

type CellStatus = 'supported' | 'ended' | 'unreleased'

const CELL_MAP = {
  supported: { className: 'cell-supported', label: '○' },
  ended: { className: 'cell-ended', label: '×' },
  unreleased: { className: 'cell-unreleased', label: '–' },
} as const

/**
 * 同時発売の派生モデル（Pro / Ultra / XL / + など）は1行にまとめる。
 * サポート方針はシリーズ内で共通なので、行を分けても情報が増えず縦に長くなるだけ。
 */
function seriesNameOf(brand: 'pixel' | 'galaxy', model: string): string {
  const name = model.replace(/^(Google|Samsung)\s+/, '')
  if (brand === 'pixel') {
    const a = name.match(/^Pixel\s+(\d+a)$/)
    if (a) return `Pixel ${a[1]}`
    const fold = name.match(/^Pixel\s+(\d+).*Fold$/)
    if (fold) return `Pixel ${fold[1]} Fold`
    const num = name.match(/^Pixel\s+(\d+)/)
    return num ? `Pixel ${num[1]} シリーズ` : name
  }
  const s = name.match(/^Galaxy\s+(S\d+)/)
  if (s) return `Galaxy ${s[1]} シリーズ`
  const z = name.match(/^Galaxy\s+(Z (?:Flip|Fold)\d+(?:\s+Ultra)?)/)
  if (z) return `Galaxy ${z[1]}`
  return name
}

function toRow(brand: 'pixel' | 'galaxy', m: SupportModel): TimelineRow | null {
  if (!m.date || !m.support_until) return null
  const release = m.date.match(/^(\d{4})/)
  const end = m.support_until.match(/^(\d{4})-(\d{1,2})/)
  if (!release || !end) return null
  return {
    name: seriesNameOf(brand, m.model),
    releaseYear: Number(release[1]),
    endYear: Number(end[1]),
    endMonth: Number(end[2]),
  }
}

type Props = {
  brand: 'pixel' | 'galaxy'
  /** 見出し・本文で使うブランド表示名 */
  brandLabel: string
  models: SupportModel[]
}

export default function SupportTimelineMatrix({ brand, brandLabel, models }: Props) {
  // シリーズ単位にまとめる。同じシリーズなら期限が最も長いものを代表にする
  // （S24 と S24 Ultra のように、同時発売でも構成違いがある場合に短い方へ寄せない）
  const bySeries = new Map<string, TimelineRow>()
  for (const m of models) {
    const row = toRow(brand, m)
    if (!row) continue
    const current = bySeries.get(row.name)
    if (!current || row.endYear * 100 + row.endMonth > current.endYear * 100 + current.endMonth) {
      bySeries.set(row.name, row)
    }
  }

  const rows = [...bySeries.values()].sort(
    (a, b) => a.endYear - b.endYear || a.endMonth - b.endMonth || a.releaseYear - b.releaseYear,
  )
  if (rows.length === 0) return null

  // 列は「いちばん早く切れる機種の年」から「いちばん長く残る機種の年」まで
  const startYear = Math.min(...rows.map((r) => r.endYear))
  const endYear = Math.max(...rows.map((r) => r.endYear))
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

  const statusOf = (row: TimelineRow, year: number): CellStatus => {
    if (year < row.releaseYear) return 'unreleased'
    return year <= row.endYear ? 'supported' : 'ended'
  }

  return (
    <section className="l-section" id="support-timeline" aria-labelledby="heading-support-timeline">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-support-timeline">
          サポート終了タイムライン
        </h2>
        <p className="m-section-desc">
          {brandLabel}の機種が、どの年にサポート終了を迎えるかを図にしました。
          <br />
          世代ごとにどう切れていくかの全体像を、まずここでつかんでください。
        </p>

        <p className="m-section-heading m-section-heading--sm">
          {brandLabel}機種別 サポート終了時期一覧
        </p>

        <StickyTableWrapper floatingHeader>
          <div className="ios-matrix-scroll m-scroll-x m-scroll-x--styled m-table-scroll">
            <table className="ios-matrix">
              <caption className="visually-hidden">{brandLabel}機種別 サポート終了時期一覧表</caption>
              <thead>
                <tr>
                  <th>機種</th>
                  {years.map((y) => (
                    <th key={y}>{y}年</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <th className="u-shrink">{row.name}</th>
                    {years.map((y) => {
                      const cell = CELL_MAP[statusOf(row, y)]
                      return (
                        <td key={y} className={cell.className}>
                          {cell.label}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StickyTableWrapper>

        <div className="m-legend u-mb-md">
          <div className="m-legend__item">
            <span className="m-legend__color cell-supported">○</span>
            <span>サポート期間内</span>
          </div>
          <div className="m-legend__item">
            <span className="m-legend__color cell-ended">×</span>
            <span>サポート終了</span>
          </div>
        </div>

        <p className="m-footnote">
          ※ サポート期限は各機種の発売日と、メーカーが公表しているアップデート保証年数から算出しています。
          <br />
          ※ 期限年の途中まではサポートが続くため、その年は「○」で表示しています。終了月まで含めた詳細は下の「
          {brandLabel}機種別 Androidアップデート・サポート期間一覧表」をご確認ください。
          <br />※ 同時発売のPro / Ultra / XL等のバリエーションも同じサポート期間となります。
        </p>
      </div>
    </section>
  )
}
