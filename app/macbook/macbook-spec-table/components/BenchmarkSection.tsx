import { BenchBar } from '@/app/components/spec-table-utils'

type SpecModel = {
  id: number
  model: string
  shortname: string | null
  score_single: number | null
  score_multi: number | null
  score_metal: number | null
}

type Props = {
  models: SpecModel[]
}

function getModelCategory(model: string): 'air' | 'pro' {
  return model.toLowerCase().includes('pro') ? 'pro' : 'air'
}

function BenchTable({ models, caption, maxSingle, maxMulti, maxMetal }: {
  models: SpecModel[]
  caption: string
  maxSingle: number
  maxMulti: number
  maxMetal: number
}) {
  return (
    <div className="m-card m-card--shadow m-table-card">
      <table className="m-table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">モデル</th>
            <th scope="col">シングルコア</th>
            <th scope="col">マルチコア</th>
            <th scope="col">Metal</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m.id}>
              <td style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{m.shortname || m.model}</td>
              <td><BenchBar value={m.score_single!} maxValue={maxSingle} color="#e74c6f" /></td>
              <td><BenchBar value={m.score_multi!} maxValue={maxMulti} color="#f0a030" /></td>
              <td><BenchBar value={m.score_metal!} maxValue={maxMetal} color="var(--color-primary, #2589d0)" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function BenchmarkSection({ models }: Props) {
  const geekbenchModels = models
    .filter((m) => m.score_single != null && m.score_multi != null && m.score_metal != null)
    .sort((a, b) => (b.score_single || 0) - (a.score_single || 0))

  const maxSingle = Math.max(...geekbenchModels.map((m) => m.score_single || 0))
  const maxMulti = Math.max(...geekbenchModels.map((m) => m.score_multi || 0))
  const maxMetal = Math.max(...geekbenchModels.map((m) => m.score_metal || 0))

  const proModels = geekbenchModels.filter((m) => getModelCategory(m.model) === 'pro')
  const airModels = geekbenchModels.filter((m) => getModelCategory(m.model) === 'air')

  if (geekbenchModels.length === 0) return null

  return (
    <section className="l-section l-section--bg-subtle" id="benchmark" aria-labelledby="heading-benchmark">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-benchmark">
          歴代MacBookのチップ性能・処理速度を比較（ベンチマークスコア）
        </h2>
        <p className="m-section-desc">
          歴代MacBookのチップ性能の違いを可視化するためにGeekbenchのベンチマークスコアを用意しました。
        </p>
        <p className="m-section-desc">
          MacBookを買い替えたらどれくらい処理速度が上がるのか確認するのにご活用ください。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg" style={{ marginBottom: 'var(--space-xl, 24px)' }}>
          <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
            <p className="glossary-item-title">シングルスコア</p>
            <p className="glossary-item-desc">1つのCPUコアの処理性能を示す指標でアプリの起動やWeb閲覧など日常的な操作に影響する</p>
          </div>
          <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
            <p className="glossary-item-title">マルチスコア</p>
            <p className="glossary-item-desc">複数のCPUコアを同時に使ったときの処理能力で動画編集やコード実行などの重たい作業に効果を発揮する</p>
          </div>
          <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg, 20px)' }}>
            <p className="glossary-item-title">メタルスコア</p>
            <p className="glossary-item-desc">GPUのグラフィック性能を示す指標で、3Dレンダリングや映像編集、ゲームの描画処理に関わる</p>
          </div>
        </div>

        {proModels.length > 0 && (
          <>
            <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left' }}>
              MacBook Pro
            </h3>
            <BenchTable
              models={proModels}
              caption="MacBook Pro Geekbench 6 ベンチマークスコア比較"
              maxSingle={maxSingle}
              maxMulti={maxMulti}
              maxMetal={maxMetal}
            />
          </>
        )}

        {airModels.length > 0 && (
          <div style={{ marginTop: 'var(--space-2xl, 32px)' }}>
            <h3 className="m-section-heading m-section-heading--md" style={{ textAlign: 'left' }}>
              MacBook Air
            </h3>
            <BenchTable
              models={airModels}
              caption="MacBook Air Geekbench 6 ベンチマークスコア比較"
              maxSingle={maxSingle}
              maxMulti={maxMulti}
              maxMetal={maxMetal}
            />
          </div>
        )}
      </div>
    </section>
  )
}
