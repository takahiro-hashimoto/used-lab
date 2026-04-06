import { BenchBar } from '@/app/components/spec-table-utils'
import type { BenchModel } from './BenchmarkRanking'

/** cpuからチップ世代を抽出 */
function getChipGen(cpu: string | null): string | null {
  if (!cpu) return null
  const m = cpu.match(/M(\d)/)
  return m ? `M${m[1]}` : null
}

/** Air/Pro判定 */
function isAir(model: string): boolean {
  return model.toLowerCase().includes('air')
}

type GenPair = {
  gen: string
  air: { single: number; multi: number; metal: number }
  pro: { single: number; multi: number; metal: number }
}

function buildGenPairs(models: BenchModel[]): GenPair[] {
  const genMap = new Map<string, { air: BenchModel[]; pro: BenchModel[] }>()

  for (const m of models) {
    const gen = getChipGen(m.cpu)
    if (!gen) continue
    // 標準チップのみ比較（Pro/Maxチップは除外）
    if (m.cpu && (m.cpu.includes('Pro') || m.cpu.includes('Max'))) continue

    const entry = genMap.get(gen) || { air: [], pro: [] }
    if (isAir(m.model)) {
      entry.air.push(m)
    } else {
      entry.pro.push(m)
    }
    genMap.set(gen, entry)
  }

  const avg = (arr: BenchModel[], key: 'score_single' | 'score_multi' | 'score_metal') =>
    arr.length > 0 ? Math.round(arr.reduce((s, m) => s + m[key], 0) / arr.length) : 0

  return Array.from(genMap.entries())
    .filter(([, v]) => v.air.length > 0 && v.pro.length > 0)
    .sort(([a], [b]) => parseInt(a.replace('M', '')) - parseInt(b.replace('M', '')))
    .map(([gen, v]) => ({
      gen,
      air: { single: avg(v.air, 'score_single'), multi: avg(v.air, 'score_multi'), metal: avg(v.air, 'score_metal') },
      pro: { single: avg(v.pro, 'score_single'), multi: avg(v.pro, 'score_multi'), metal: avg(v.pro, 'score_metal') },
    }))
}

export default function AirVsProSection({ models }: { models: BenchModel[] }) {
  const pairs = buildGenPairs(models)
  if (pairs.length === 0) return null

  const maxSingle = Math.max(...pairs.flatMap((p) => [p.air.single, p.pro.single]))
  const maxMulti = Math.max(...pairs.flatMap((p) => [p.air.multi, p.pro.multi]))
  const maxMetal = Math.max(...pairs.flatMap((p) => [p.air.metal, p.pro.metal]))

  return (
    <section className="l-section" id="air-vs-pro" aria-labelledby="heading-air-vs-pro">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-air-vs-pro">
          MacBook Air vs Pro ベンチマーク比較
        </h2>
        <p className="m-section-desc">
          同じ世代の標準チップを搭載したMacBook AirとProのベンチマークスコアを比較します。ファン搭載の有無が持続性能にどう影響するかがわかります。
        </p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table chip-gen-table">
              <caption className="visually-hidden">MacBook Air vs Pro 同一チップ世代のベンチマーク比較</caption>
              <thead>
                <tr>
                  <th scope="col">世代</th>
                  <th scope="col">モデル</th>
                  <th scope="col">シングル</th>
                  <th scope="col">マルチ</th>
                  <th scope="col">Metal</th>
                </tr>
              </thead>
              <tbody>
                {pairs.flatMap((p) => [
                  <tr key={`${p.gen}-air`}>
                    <th scope="row" rowSpan={2} className="chip-gen-table__chip">
                      <span className="chip-gen-badge">{p.gen}</span>
                    </th>
                    <td><span className="chip-gen-badge chip-gen-badge--air">Air</span></td>
                    <td><BenchBar value={p.air.single} maxValue={maxSingle} color="#e74c6f" /></td>
                    <td><BenchBar value={p.air.multi} maxValue={maxMulti} color="#f0a030" /></td>
                    <td><BenchBar value={p.air.metal} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                  </tr>,
                  <tr key={`${p.gen}-pro`}>
                    <td><span className="chip-gen-badge chip-gen-badge--pro">Pro</span></td>
                    <td><BenchBar value={p.pro.single} maxValue={maxSingle} color="#e74c6f" /></td>
                    <td><BenchBar value={p.pro.multi} maxValue={maxMulti} color="#f0a030" /></td>
                    <td><BenchBar value={p.pro.metal} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
                  </tr>,
                ])}
              </tbody>
            </table>
          </div>
        </div>

        <div className="l-grid l-grid--2col l-grid--gap-lg u-mt-2xl">
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-wind" aria-hidden="true" style={{ color: '#2589d0' }}></i>
              MacBook Airの特徴
            </h3>
            <ul className="m-list">
              <li>ファンレス設計で完全無音</li>
              <li>軽量・薄型で持ち運びに最適</li>
              <li>短時間の作業ならProと同等の性能</li>
              <li>長時間の高負荷作業ではサーマルスロットリングが発生しやすい</li>
              <li>価格が手頃でコスパに優れる</li>
            </ul>
          </div>
          <div className="m-card m-card--shadow m-card--padded">
            <h3 className="post-check-item__heading">
              <i className="fa-solid fa-fan" aria-hidden="true" style={{ color: '#e74c6f' }}></i>
              MacBook Proの特徴
            </h3>
            <ul className="m-list">
              <li>アクティブ冷却ファン搭載</li>
              <li>長時間の高負荷でも安定した性能を維持</li>
              <li>Pro/Maxチップへのアップグレードが可能</li>
              <li>ディスプレイの輝度・スピーカー品質が上位</li>
              <li>動画編集や開発など持続的な負荷がかかる用途に最適</li>
            </ul>
          </div>
        </div>

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            <strong>シングルコアスコアはAirとProでほぼ同等です。</strong>差が出るのは主にマルチコア性能で、ファン搭載のProは長時間の書き出し処理やコンパイルでサーマルスロットリング（熱による性能低下）を起こしにくく、安定してフルパワーを発揮できます。Web閲覧やOffice作業など軽い用途ならAirで十分、動画編集やDocker常時起動などの用途ならProがおすすめです。
          </p>
        </div>
      </div>
    </section>
  )
}
