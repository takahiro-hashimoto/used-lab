import { BenchBar } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { BenchModel } from './BenchmarkRanking'
import { groupByGeneration, calcImprovement } from '@/lib/utils/benchmark-helpers'

// iPhone版（iphone/benchmark/components/ChipGenerationCompare.tsx）のMac版。
// 抽出するのは A◯ ではなく M◯。
//
// デスクトップMacは1つの機種に複数グレードがぶら下がる（Mac mini 2023 なら
// M2 と M2 Pro）。DBのスコアは各機種1つなので、Mac Studio のように
// Max グレードが基準になっている行も混ざる。平均であることは注記で明示する。

/** 'M4 / M4 Pro' → 'M4'、'M4 Max / M3 Ultra' → 'M4' */
function getChipGeneration(cpu: string | null): string | null {
  if (!cpu) return null
  const match = cpu.match(/M(\d+)/)
  return match ? `M${match[1]}` : null
}

export default function ChipGenerationCompare({ models }: { models: BenchModel[] }) {
  // スコア未取得の機種を混ぜると平均が0側に引っ張られるので除外する
  const scored = models.filter((m) => m.hasScore !== false && m.score_single > 0)
  const generations = groupByGeneration(scored, getChipGeneration)
  if (generations.length < 2) return null

  const withImprovement = generations.map((gen, i) => ({
    ...gen,
    improvement: i > 0 ? calcImprovement(gen.avgSingle, generations[i - 1].avgSingle) : null,
  }))

  const maxSingle = Math.max(...withImprovement.map((g) => g.avgSingle))
  const maxMulti = Math.max(...withImprovement.map((g) => g.avgMulti))
  const maxMetal = Math.max(...withImprovement.map((g) => g.avgMetal))

  return (
    <section className="l-section" id="chip-compare" aria-labelledby="heading-chip-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-chip-compare">
          Mシリーズ世代別の性能比較
        </h2>
        <p className="m-section-desc">
          各チップ世代の平均ベンチマークスコアです。世代を1つ上げるとどのくらい速くなるのかが数字でわかります。
        </p>
        <p className="m-section-desc">
          中古では世代が1つ古いだけで価格が大きく下がるので、この差を許容できるかどうかが選ぶ基準になります。
        </p>

        <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table bench-table chip-gen-table">
              <caption className="visually-hidden">Mシリーズ世代別 平均ベンチマークスコア比較</caption>
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
                {withImprovement.map((gen) => (
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
        <p className="m-table-note">
          ※ 前世代比はシングルコアスコアの平均値で算出。各世代の平均には、同じ世代に属する iMac・Mac mini・Mac Studio が含まれます。
          Mac Studio は Max グレードが基準のため、マルチコアとMetalの平均を押し上げています。
        </p>
      </div>
    </section>
  )
}
