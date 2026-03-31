import { BenchBar } from '@/app/components/spec-table-utils'
import type { BenchModel } from './BenchmarkRanking'
import { groupByGeneration, calcImprovement } from '@/lib/utils/benchmark-helpers'

/** iPadのcpuフィールドからチップ世代を抽出
 *  "A14 Bionic" → "A14", "M2" → "M2", "A12Z Bionic" → "A12Z"
 */
function getChipGeneration(cpu: string | null): string | null {
  if (!cpu) return null
  const mMatch = cpu.match(/^M(\d)/)
  if (mMatch) return `M${mMatch[1]}`
  const aMatch = cpu.match(/A(\d+Z?)/)
  if (aMatch) return `A${aMatch[1]}`
  return null
}

export default function ChipGenerationCompare({ models }: { models: BenchModel[] }) {
  const generations = groupByGeneration(models, getChipGeneration)
  if (generations.length < 2) return null

  const maxSingle = Math.max(...generations.map((g) => g.avgSingle))
  const maxMulti = Math.max(...generations.map((g) => g.avgMulti))
  const maxMetal = Math.max(...generations.map((g) => g.avgMetal))

  return (
    <section className="l-section" id="chip-compare" aria-labelledby="heading-chip-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-chip-compare">
          チップ世代別の性能比較
        </h2>
        <p className="m-section-desc">
          各チップ世代の平均ベンチマークスコアを比較。AチップからMチップへの大幅な性能向上が一目でわかります。
        </p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table chip-gen-table">
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
                {generations.map((gen, i) => {
                  const prev = i > 0 ? generations[i - 1] : null
                  return (
                    <tr key={gen.chip}>
                      <th scope="row" className="chip-gen-table__chip">
                        <span className="chip-gen-badge">{gen.chip}</span>
                      </th>
                      <td><BenchBar value={gen.avgSingle} maxValue={maxSingle} color="#e74c6f" /></td>
                      <td><BenchBar value={gen.avgMulti} maxValue={maxMulti} color="#f0a030" /></td>
                      <td><BenchBar value={gen.avgMetal} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                      <td className="u-text-center">
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
        <p className="m-table-note">※ 前世代比はシングルコアスコアの平均値で算出。同一チップを搭載する複数モデルの平均値です。</p>
      </div>
    </section>
  )
}
