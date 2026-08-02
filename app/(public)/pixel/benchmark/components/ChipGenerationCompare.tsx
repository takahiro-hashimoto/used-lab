import { BenchBar } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { PixelBenchModel } from './BenchmarkRanking'
import { calcImprovement } from '@/lib/utils/benchmark-helpers'

/** Tensor 世代ごとの代表的な特徴 */
const GEN_FEATURES: Record<string, { label: string; feature: string }> = {
  G1: { label: 'Google Tensor（初代）', feature: 'Pixel 6シリーズに初搭載されたGoogle独自SoC。AI・機械学習処理に特化し、消しゴムマジックやリアルタイム翻訳を実現した第1世代。' },
  G2: { label: 'Google Tensor G2', feature: 'Pixel 7世代。電力効率と発熱を改善し、写真のボケ補正やダイレクト書き起こしなどAI機能をさらに強化。' },
  G3: { label: 'Google Tensor G3', feature: 'Pixel 8世代。7年間のOS・セキュリティ更新に対応し、ベストテイクや音声消しゴムマジックなど生成AI機能が大幅に進化。' },
  G4: { label: 'Google Tensor G4', feature: 'Pixel 9世代。Gemini（オンデバイスAI）世代のSoC。応答性と省電力を両立し、AIアシスタント体験を一段と高めた世代。' },
  G5: { label: 'Google Tensor G5', feature: 'Pixel 10世代。設計を刷新したGoogle独自SoCで、CPU・GPUともに前世代から性能を伸ばし、オンデバイスAIの処理をさらに高速化した現行世代。' },
}

type GenGroup = {
  gen: string
  models: PixelBenchModel[]
  avgSingle: number
  avgMulti: number
  avgAntutu: number
}

function groupByTensorGen(models: PixelBenchModel[]): GenGroup[] {
  const map = new Map<string, PixelBenchModel[]>()
  for (const m of models) {
    const gen = m.tensor_gen
    if (!gen) continue
    const arr = map.get(gen) || []
    arr.push(m)
    map.set(gen, arr)
  }

  return Array.from(map.entries()).map(([gen, ms]) => {
    const avgSingle = Math.round(ms.reduce((s, m) => s + m.score_single, 0) / ms.length)
    const avgMulti = Math.round(ms.reduce((s, m) => s + m.score_multi, 0) / ms.length)
    const antutuModels = ms.filter((m) => m.antutu_total != null)
    const avgAntutu = antutuModels.length > 0
      ? Math.round(antutuModels.reduce((s, m) => s + (m.antutu_total as number), 0) / antutuModels.length)
      : 0
    return { gen, models: ms, avgSingle, avgMulti, avgAntutu }
  })
}

function genOrder(gen: string): number {
  const num = parseInt(gen.replace(/\D/g, ''), 10)
  return isNaN(num) ? 0 : num
}

export default function ChipGenerationCompare({ models }: { models: PixelBenchModel[] }) {
  const generations = groupByTensorGen(models)
  if (generations.length < 2) return null

  const sorted = [...generations].sort((a, b) => genOrder(a.gen) - genOrder(b.gen))

  const generationsWithImprovement = sorted.map((gen, i) => ({
    ...gen,
    improvement: i > 0 ? calcImprovement(gen.avgSingle, sorted[i - 1].avgSingle) : null,
  }))

  const maxSingle = Math.max(...generationsWithImprovement.map((g) => g.avgSingle))
  const maxMulti = Math.max(...generationsWithImprovement.map((g) => g.avgMulti))
  const maxAntutu = Math.max(...generationsWithImprovement.map((g) => g.avgAntutu))

  return (
    <section className="l-section" id="chip-compare" aria-labelledby="heading-chip-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-chip-compare">
          Google Tensor 世代別の性能比較
        </h2>
        <p className="m-section-desc">
          各Tensor世代（G1〜G4）の平均ベンチマークスコアを比較。世代が上がるごとにどのくらい性能が向上しているかが一目でわかります。
        </p>

        <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table bench-table chip-gen-table">
              <caption className="visually-hidden">Google Tensor 世代別 平均ベンチマークスコア比較</caption>
              <thead>
                <tr>
                  <th scope="col">Tensor</th>
                  <th scope="col">シングル（平均）</th>
                  <th scope="col">マルチ（平均）</th>
                  <th scope="col">AnTuTu（平均）</th>
                  <th scope="col">前世代比</th>
                </tr>
              </thead>
              <tbody>
                {generationsWithImprovement.map((gen) => (
                  <tr key={gen.gen}>
                    <th scope="row" className="bench-table__sticky chip-gen-table__chip">
                      <span className="chip-gen-badge">Tensor {gen.gen}</span>
                    </th>
                    <td><BenchBar value={gen.avgSingle} maxValue={maxSingle} color="#e74c6f" /></td>
                    <td><BenchBar value={gen.avgMulti} maxValue={maxMulti} color="#f0a030" /></td>
                    <td>
                      {gen.avgAntutu > 0
                        ? <BenchBar value={gen.avgAntutu} maxValue={maxAntutu} color="var(--color-primary, #2589d0)" />
                        : <span className="u-text-muted">-</span>}
                    </td>
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
        <p className="m-table-note">※ 前世代比はシングルコアスコアの平均値で算出。同一世代内のPro/無印/aシリーズを含む平均値です。</p>

        {/* 各世代の特徴 */}
        <div className="l-grid l-grid--3col l-grid--gap-lg u-mt-2xl">
          {generationsWithImprovement.map((gen) => {
            const info = GEN_FEATURES[gen.gen]
            if (!info) return null
            return (
              <div key={gen.gen} className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-microchip" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                  {info.label}
                </h3>
                <p className="post-check-item__desc">{info.feature}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
