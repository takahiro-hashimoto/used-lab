import { BenchBar } from '@/app/components/spec-table-utils'
import type { BenchModel } from './BenchmarkRanking'

type ChipGroup = {
  chip: string
  order: number
  models: BenchModel[]
  avgSingle: number
  avgMulti: number
  avgMetal: number
}

/** cpuフィールドからチップ世代を抽出 (M1, M2, M3, M4) */
function getChipGeneration(cpu: string | null): string | null {
  if (!cpu) return null
  // "Apple M3 Pro" → "M3", "Apple M1" → "M1" etc.
  const match = cpu.match(/M(\d)/)
  return match ? `M${match[1]}` : null
}

/** チップ世代→ソート順 */
function getChipOrder(chip: string): number {
  const num = parseInt(chip.replace('M', ''), 10)
  return isNaN(num) ? 0 : num
}

/** cpuフィールドからサブタイプ一覧を抽出 (標準, Pro, Max)
 *  "M2 Pro / M2 Max" → ['Pro', 'Max']
 *  "M4 / M4 Pro / M4 Max" → ['標準', 'Pro', 'Max']
 *  "M3" → ['標準']
 */
function getChipSubtypes(cpu: string | null): string[] {
  if (!cpu) return ['標準']
  const parts = cpu.split('/').map((s) => s.trim())
  const subtypes: string[] = []
  for (const part of parts) {
    if (part.includes('Max')) {
      if (!subtypes.includes('Max')) subtypes.push('Max')
    } else if (part.includes('Pro')) {
      if (!subtypes.includes('Pro')) subtypes.push('Pro')
    } else {
      if (!subtypes.includes('標準')) subtypes.push('標準')
    }
  }
  return subtypes.length > 0 ? subtypes : ['標準']
}

function groupByGeneration(models: BenchModel[]): ChipGroup[] {
  const map = new Map<string, BenchModel[]>()

  for (const m of models) {
    const gen = getChipGeneration(m.cpu)
    if (!gen) continue
    const arr = map.get(gen) || []
    arr.push(m)
    map.set(gen, arr)
  }

  return Array.from(map.entries())
    .map(([chip, models]) => {
      const avgSingle = Math.round(models.reduce((s, m) => s + m.score_single, 0) / models.length)
      const avgMulti = Math.round(models.reduce((s, m) => s + m.score_multi, 0) / models.length)
      const avgMetal = Math.round(models.reduce((s, m) => s + m.score_metal, 0) / models.length)
      return { chip, order: getChipOrder(chip), models, avgSingle, avgMulti, avgMetal }
    })
    .sort((a, b) => a.order - b.order)
}

function calcImprovement(current: number, previous: number): string {
  if (previous === 0) return '-'
  const pct = Math.round(((current - previous) / previous) * 100)
  return pct > 0 ? `+${pct}%` : `${pct}%`
}

export default function ChipGenerationCompare({ models }: { models: BenchModel[] }) {
  const generations = groupByGeneration(models)
  if (generations.length < 2) return null

  const maxSingle = Math.max(...generations.map((g) => g.avgSingle))
  const maxMulti = Math.max(...generations.map((g) => g.avgMulti))
  const maxMetal = Math.max(...generations.map((g) => g.avgMetal))

  // サブタイプ別の集計も用意
  type SubGroup = { subtype: string; chip: string; avgSingle: number; avgMulti: number; avgMetal: number }
  const subtypeGroups: SubGroup[] = []
  for (const gen of generations) {
    const subtypeMap = new Map<string, BenchModel[]>()
    for (const m of gen.models) {
      const subs = getChipSubtypes(m.cpu)
      for (const sub of subs) {
        const arr = subtypeMap.get(sub) || []
        arr.push(m)
        subtypeMap.set(sub, arr)
      }
    }
    for (const [subtype, ms] of subtypeMap.entries()) {
      subtypeGroups.push({
        subtype,
        chip: gen.chip,
        avgSingle: Math.round(ms.reduce((s, m) => s + m.score_single, 0) / ms.length),
        avgMulti: Math.round(ms.reduce((s, m) => s + m.score_multi, 0) / ms.length),
        avgMetal: Math.round(ms.reduce((s, m) => s + m.score_metal, 0) / ms.length),
      })
    }
  }

  return (
    <>
    <section className="l-section" id="chip-compare" aria-labelledby="heading-chip-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-chip-compare">
          チップ世代別の性能比較（M1 → M2 → M3 → M4）
        </h2>
        <p className="m-section-desc">
          各チップ世代の平均ベンチマークスコアを比較。世代が上がるごとにどのくらい性能が向上しているかが一目でわかります。
        </p>

        {/* 世代別平均スコア比較テーブル */}
        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table chip-gen-table">
              <caption className="visually-hidden">Apple Silicon チップ世代別 平均ベンチマークスコア比較</caption>
              <thead>
                <tr>
                  <th scope="col">チップ</th>
                  <th scope="col">シングル（平均）</th>
                  <th scope="col">マルチ（平均）</th>
                  <th scope="col">Metal（平均）</th>
                  <th scope="col">前世代比</th>
                </tr>
              </thead>
              <tbody>
                {generations.map((gen, i) => {
                  const prev = i > 0 ? generations[i - 1] : null
                  const singlePct = (gen.avgSingle / maxSingle) * 100
                  const multiPct = (gen.avgMulti / maxMulti) * 100
                  const metalPct = (gen.avgMetal / maxMetal) * 100

                  return (
                    <tr key={gen.chip}>
                      <th scope="row" className="chip-gen-table__chip">
                        <span className="chip-gen-badge">{gen.chip}</span>
                      </th>
                      <td><BenchBar value={gen.avgSingle} maxValue={maxSingle} color="#e74c6f" /></td>
                      <td><BenchBar value={gen.avgMulti} maxValue={maxMulti} color="#f0a030" /></td>
                      <td><BenchBar value={gen.avgMetal} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                      <td className="chip-gen-table__improvement">
                        {prev ? (
                          <span className="chip-gen-improvement">
                            <span className="chip-gen-improvement__badge chip-gen-improvement__badge--up">
                              {calcImprovement(gen.avgSingle, prev.avgSingle)}
                            </span>
                          </span>
                        ) : (
                          <span className="chip-gen-improvement__base">基準</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="m-table-note">※ 前世代比はシングルコアスコアの平均値で算出。同一世代内の標準/Pro/Maxチップを含む平均値です。</p>
      </div>
    </section>

    <section className="l-section" id="chip-variant" aria-labelledby="heading-chip-variant">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-chip-variant">
          チップバリエーション別の比較（標準 / Pro / Max）
        </h2>
        <p className="m-section-desc">
          同じ世代でも標準・Pro・Maxでは性能が大きく異なります。特にマルチコアとMetal（GPU）で差が顕著です。
        </p>

        {(() => {
          const subMaxSingle = Math.max(...subtypeGroups.map((sg) => sg.avgSingle))
          const subMaxMulti = Math.max(...subtypeGroups.map((sg) => sg.avgMulti))
          const subMaxMetal = Math.max(...subtypeGroups.map((sg) => sg.avgMetal))
          const sorted = [...subtypeGroups].sort((a, b) => {
            const genDiff = getChipOrder(a.chip) - getChipOrder(b.chip)
            if (genDiff !== 0) return genDiff
            const subOrder = { '標準': 0, 'Pro': 1, 'Max': 2 } as Record<string, number>
            return (subOrder[a.subtype] ?? 0) - (subOrder[b.subtype] ?? 0)
          })
          return (
            <div className="m-card m-card--shadow m-table-card">
              <div className="m-table-scroll">
                <table className="m-table chip-sub-table">
                  <caption className="visually-hidden">チップバリエーション別ベンチマークスコア比較</caption>
                  <thead>
                    <tr>
                      <th scope="col">チップ</th>
                      <th scope="col">シングル</th>
                      <th scope="col">マルチ</th>
                      <th scope="col">Metal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((sg) => (
                      <tr key={`${sg.chip}-${sg.subtype}`}>
                        <th scope="row" className="chip-gen-table__chip">
                          <span className="chip-gen-badge">{sg.chip}{sg.subtype !== '標準' ? ` ${sg.subtype}` : ''}</span>
                        </th>
                        <td><BenchBar value={sg.avgSingle} maxValue={subMaxSingle} color="#e74c6f" /></td>
                        <td><BenchBar value={sg.avgMulti} maxValue={subMaxMulti} color="#f0a030" /></td>
                        <td><BenchBar value={sg.avgMetal} maxValue={subMaxMetal} color="var(--color-primary, #2589d0)" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })()}
      </div>
    </section>
    </>
  )
}
