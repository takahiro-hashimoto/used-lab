import type { IPhoneModel } from '@/lib/types'

type Props = {
  model: IPhoneModel
  allModels: IPhoneModel[]
}

function getAntutuTotal(m: IPhoneModel): number {
  return (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0)
}

export default function BenchmarkAntutu({ model, allModels }: Props) {
  const total = getAntutuTotal(model)
  if (total === 0) return null

  const maxTotal = Math.max(...allModels.map(getAntutuTotal))
  const maxCpu = Math.max(...allModels.map((m) => m.antutu_cpu || 0))
  const maxGpu = Math.max(...allModels.map((m) => m.antutu_gpu || 0))
  const maxMem = Math.max(...allModels.map((m) => m.antutu_mem || 0))
  const maxUx = Math.max(...allModels.map((m) => m.antutu_ux || 0))

  const sorted = [...allModels]
    .filter((m) => getAntutuTotal(m) > 0)
    .sort((a, b) => getAntutuTotal(b) - getAntutuTotal(a))

  const pct = (val: number, max: number) => max > 0 ? Math.round((val / max) * 100) : 0

  return (
    <section className="l-section" id="antutu" aria-labelledby="heading-antutu">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-antutu">
          {model.model}のAntutuスコア
        </h2>
        <p className="m-section-desc">Antutu Benchmark v10を参考にベンチマークスコアをご紹介</p>

        {/* スコアサマリー */}
        <dl className="l-grid l-grid--5col l-grid--gap-lg l-grid--mb-2xl">
          <div className="m-card m-stat-card m-stat-card--highlight">
            <dt className="m-stat-card__label">
              <i className="fa-solid fa-calculator" aria-hidden="true"></i> 合計
            </dt>
            <dd className="m-stat-card__value">{total.toLocaleString()}</dd>
            <dd className="m-stat-card__note">総合スコア</dd>
          </div>
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">
              <i className="fa-solid fa-microchip" aria-hidden="true"></i> CPU
            </dt>
            <dd className="m-stat-card__value">{model.antutu_cpu?.toLocaleString() || '-'}</dd>
            <dd className="m-stat-card__note">処理性能</dd>
          </div>
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">
              <i className="fa-solid fa-display" aria-hidden="true"></i> GPU
            </dt>
            <dd className="m-stat-card__value">{model.antutu_gpu?.toLocaleString() || '-'}</dd>
            <dd className="m-stat-card__note">グラフィック性能</dd>
          </div>
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">
              <i className="fa-solid fa-memory" aria-hidden="true"></i> MEM
            </dt>
            <dd className="m-stat-card__value">{model.antutu_mem?.toLocaleString() || '-'}</dd>
            <dd className="m-stat-card__note">メモリ性能</dd>
          </div>
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">
              <i className="fa-solid fa-hand-pointer" aria-hidden="true"></i> UX
            </dt>
            <dd className="m-stat-card__value">{model.antutu_ux?.toLocaleString() || '-'}</dd>
            <dd className="m-stat-card__note">操作体験</dd>
          </div>
        </dl>

        {/* ベンチマーク比較テーブル */}
        <div className="m-card m-card--shadow m-table-card">
          <table className="m-table">
            <caption className="visually-hidden">iPhoneモデル別 Antutu Benchmark v10 スコア比較</caption>
            <thead>
              <tr>
                <th scope="col">モデル</th>
                <th scope="col">合計</th>
                <th scope="col">CPU</th>
                <th scope="col">GPU</th>
                <th scope="col">MEM</th>
                <th scope="col">UX</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m) => {
                const mTotal = getAntutuTotal(m)
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
                          '--bar-pct': `${pct(mTotal, maxTotal)}%`,
                          '--bar-color': 'var(--color-primary)',
                        } as React.CSSProperties}
                      >
                        {mTotal.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <span
                        className="bench-bar"
                        style={{
                          '--bar-pct': `${pct(m.antutu_cpu || 0, maxCpu)}%`,
                          '--bar-color': '#e74c6f',
                        } as React.CSSProperties}
                      >
                        {m.antutu_cpu?.toLocaleString() || '-'}
                      </span>
                    </td>
                    <td>
                      <span
                        className="bench-bar"
                        style={{
                          '--bar-pct': `${pct(m.antutu_gpu || 0, maxGpu)}%`,
                          '--bar-color': '#34a853',
                        } as React.CSSProperties}
                      >
                        {m.antutu_gpu?.toLocaleString() || '-'}
                      </span>
                    </td>
                    <td>
                      <span
                        className="bench-bar"
                        style={{
                          '--bar-pct': `${pct(m.antutu_mem || 0, maxMem)}%`,
                          '--bar-color': '#34a853',
                        } as React.CSSProperties}
                      >
                        {m.antutu_mem?.toLocaleString() || '-'}
                      </span>
                    </td>
                    <td>
                      <span
                        className="bench-bar"
                        style={{
                          '--bar-pct': `${pct(m.antutu_ux || 0, maxUx)}%`,
                          '--bar-color': '#fbbc04',
                        } as React.CSSProperties}
                      >
                        {m.antutu_ux?.toLocaleString() || '-'}
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
