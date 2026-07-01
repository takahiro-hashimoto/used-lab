import { BenchBar } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { BenchModel } from './BenchmarkRanking'
import { groupByGeneration, calcImprovement } from '@/lib/utils/benchmark-helpers'

function getChipGeneration(cpu: string | null): string | null {
  if (!cpu) return null
  const mMatch = cpu.match(/^M(\d)/)
  if (mMatch) return `M${mMatch[1]}`
  const aMatch = cpu.match(/A(\d+Z?)/)
  if (aMatch) return `A${aMatch[1]}`
  return null
}

function chipOrder(chip: string): number {
  const m = chip.match(/([AM])(\d+)(Z?)/)
  if (!m) return 0
  const base = m[1] === 'M' ? 1000 : 0
  return base + parseInt(m[2], 10) * 10 + (m[3] === 'Z' ? 1 : 0)
}

export default function ChipGenerationCompare({ models }: { models: BenchModel[] }) {
  const generations = groupByGeneration(models, getChipGeneration)
  if (generations.length < 2) return null

  const sorted = [...generations].sort((a, b) => chipOrder(a.chip) - chipOrder(b.chip))

  const generationsWithImprovement = sorted.map((gen, i) => ({
    ...gen,
    improvement: i > 0 ? calcImprovement(gen.avgSingle, sorted[i - 1].avgSingle) : null,
  }))

  const maxSingle = Math.max(...generationsWithImprovement.map((g) => g.avgSingle))
  const maxMulti = Math.max(...generationsWithImprovement.map((g) => g.avgMulti))
  const maxMetal = Math.max(...generationsWithImprovement.map((g) => g.avgMetal))

  return (
    <section className="l-section" id="chip-compare" aria-labelledby="heading-chip-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-chip-compare">
          チップ世代別の性能比較
        </h2>
        <p className="m-section-desc">
          各チップ世代の平均ベンチマークスコアを比較。AチップからMチップへの大幅な性能向上が一目でわかります。
        </p>

        <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table bench-table chip-gen-table">
              <caption className="visually-hidden">iPad チップ世代別 平均ベンチマークスコア比較</caption>
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
                {generationsWithImprovement.map((gen) => (
                  <tr key={gen.chip}>
                    <th scope="row" className="bench-table__sticky chip-gen-table__chip">
                      <span className="chip-gen-badge">{gen.chip}</span>
                    </th>
                    <td><BenchBar value={gen.avgSingle} maxValue={maxSingle} color="#e74c6f" /></td>
                    <td><BenchBar value={gen.avgMulti} maxValue={maxMulti} color="#f0a030" /></td>
                    <td><BenchBar value={gen.avgMetal} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                    <td className="u-text-center">
                      {gen.improvement ? (
                        <span className="chip-gen-improvement">
                          <span className="chip-gen-improvement__badge chip-gen-improvement__badge--up">
                            {gen.improvement}
                          </span>
                        </span>
                      ) : (
                        <span className="chip-gen-improvement__base">基準</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StickyTableWrapper>
        <p className="m-table-note">※ 前世代比はシングルコアスコアの平均値で算出。同一チップを搭載する複数モデルの平均値です。</p>
      </div>
    </section>
  )
}
