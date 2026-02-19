import type { IPadModel } from '@/lib/types'

type Props = {
  model: IPadModel
  allModels: IPadModel[]
}

export default function BenchmarkGeekbench({ model, allModels }: Props) {
  if (!model.score_single && !model.score_multi && !model.score_metal) return null

  const maxSingle = Math.max(...allModels.map((m) => m.score_single || 0))
  const maxMulti = Math.max(...allModels.map((m) => m.score_multi || 0))
  const maxMetal = Math.max(...allModels.map((m) => m.score_metal || 0))

  const sorted = [...allModels]
    .filter((m) => m.score_single || m.score_multi || m.score_metal)
    .sort((a, b) => {
      const totalA = (a.score_single || 0) + (a.score_multi || 0) + (a.score_metal || 0)
      const totalB = (b.score_single || 0) + (b.score_multi || 0) + (b.score_metal || 0)
      return totalB - totalA
    })

  const pct = (val: number, max: number) => max > 0 ? Math.round((val / max) * 100) : 0

  return (
    <section className="l-section l-section--bg-subtle" id="geekbench" aria-labelledby="heading-geekbench">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-geekbench">
          {model.model}のGeekbenchスコア
        </h2>
        <p className="m-section-desc">Geekbench 6を参考にベンチマークスコアをご紹介</p>

        {/* スコアサマリー */}
        <dl className="l-grid l-grid--3col l-grid--gap-lg l-grid--mb-2xl">
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">
              <i className="fa-solid fa-microchip" aria-hidden="true"></i> シングルコア
            </dt>
            <dd className="m-stat-card__value">{model.score_single?.toLocaleString() || '-'}</dd>
            <dd className="m-stat-card__note">日常操作の快適さ</dd>
          </div>
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">
              <i className="fa-solid fa-grip" aria-hidden="true"></i> マルチコア
            </dt>
            <dd className="m-stat-card__value">{model.score_multi?.toLocaleString() || '-'}</dd>
            <dd className="m-stat-card__note">重い処理の快適さ</dd>
          </div>
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">
              <i className="fa-solid fa-bolt" aria-hidden="true"></i> Metal
            </dt>
            <dd className="m-stat-card__value">{model.score_metal?.toLocaleString() || '-'}</dd>
            <dd className="m-stat-card__note">グラフィック性能</dd>
          </div>
        </dl>

        {/* ベンチマーク比較テーブル */}
        <div className="m-card m-card--shadow m-table-card">
          <table className="m-table">
            <caption className="visually-hidden">iPadモデル別 Geekbench 6 ベンチマークスコア比較</caption>
            <thead>
              <tr>
                <th scope="col">モデル</th>
                <th scope="col">シングルコア</th>
                <th scope="col">マルチコア</th>
                <th scope="col">Metal</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m) => {
                const isCurrent = m.id === model.id
                return (
                  <tr key={m.id} className={isCurrent ? 'm-table-highlight' : undefined}>
                    <td>
                      {isCurrent && (
                        <span className="m-badge m-badge--primary m-table-this-badge">この機種</span>
                      )}
                      {' '}{m.model}
                    </td>
                    <td>
                      <span
                        className="bench-bar"
                        style={{
                          '--bar-pct': `${pct(m.score_single || 0, maxSingle)}%`,
                          '--bar-color': '#e74c6f',
                        } as React.CSSProperties}
                      >
                        {m.score_single?.toLocaleString() || '-'}
                      </span>
                    </td>
                    <td>
                      <span
                        className="bench-bar"
                        style={{
                          '--bar-pct': `${pct(m.score_multi || 0, maxMulti)}%`,
                          '--bar-color': '#f0a030',
                        } as React.CSSProperties}
                      >
                        {m.score_multi?.toLocaleString() || '-'}
                      </span>
                    </td>
                    <td>
                      <span
                        className="bench-bar"
                        style={{
                          '--bar-pct': `${pct(m.score_metal || 0, maxMetal)}%`,
                          '--bar-color': 'var(--color-primary)',
                        } as React.CSSProperties}
                      >
                        {m.score_metal?.toLocaleString() || '-'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
