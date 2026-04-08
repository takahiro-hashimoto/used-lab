/**
 * 2機種のベンチマーク比較セクション
 * m-table bench-table + bench-bar を使ったバーグラフ表示
 */

import type { IPhoneModel } from '@/lib/types'

type Props = {
  id: string
  title: string
  desc?: string
  modelL: IPhoneModel
  modelR: IPhoneModel
  nameL: string
  nameR: string
}

type BenchItem = {
  label: string
  icon: string
  color: string
  valueL: number
  valueR: number
  desc: string
}

export default function CompareBenchmark({ id, title, desc, modelL, modelR, nameL, nameR }: Props) {
  const items: BenchItem[] = [
    {
      label: 'シングルコア',
      icon: 'fa-microchip',
      color: '#e74c6f',
      valueL: modelL.score_single || 0,
      valueR: modelR.score_single || 0,
      desc: 'アプリ起動や日常操作の速さ',
    },
    {
      label: 'マルチコア',
      icon: 'fa-layer-group',
      color: '#f0a030',
      valueL: modelL.score_multi || 0,
      valueR: modelR.score_multi || 0,
      desc: '動画書き出しや複数アプリの同時処理',
    },
    {
      label: 'グラフィック (Metal)',
      icon: 'fa-gamepad',
      color: 'var(--color-primary)',
      valueL: modelL.score_metal || 0,
      valueR: modelR.score_metal || 0,
      desc: '3Dゲームや動画編集のGPU性能',
    },
  ]

  const allValues = items.flatMap((i) => [i.valueL, i.valueR])
  const hasAny = allValues.some((v) => v > 0)
  if (!hasAny) return null

  const chipL = (modelL as unknown as Record<string, unknown>).cpu as string || '-'
  const chipR = (modelR as unknown as Record<string, unknown>).cpu as string || '-'

  return (
    <section className="l-section" id={id} aria-labelledby={`heading-${id}`}>
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id={`heading-${id}`}>
          {title}
        </h2>
        {desc && <p className="m-section-desc">{desc}</p>}

        {/* チップ名サマリー */}
        <dl className="u-mb-2xl" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-lg)' }}>
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">{nameL}</dt>
            <dd className="m-stat-card__value" style={{ fontSize: 'var(--font-size-lg)' }}>{chipL}</dd>
          </div>
          <div className="m-card m-stat-card">
            <dt className="m-stat-card__label">{nameR}</dt>
            <dd className="m-stat-card__value" style={{ fontSize: 'var(--font-size-lg)' }}>{chipR}</dd>
          </div>
        </dl>

        {/* ベンチマーク比較テーブル */}
        <div className="m-card m-card--shadow m-table-card">
            <table className="m-table bench-table" style={{ minWidth: 0 }}>
              <caption className="visually-hidden">
                {nameL}と{nameR}のGeekbench 6スコア比較
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="bench-table__sticky">項目</th>
                  <th scope="col">説明</th>
                  <th scope="col" style={{ width: '160px', minWidth: '160px' }}>{nameL}</th>
                  <th scope="col" style={{ width: '160px', minWidth: '160px' }}>{nameR}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const max = Math.max(item.valueL, item.valueR, 1)
                  const pctL = Math.round((item.valueL / max) * 100)
                  const pctR = Math.round((item.valueR / max) * 100)
                  const winL = item.valueL > item.valueR
                  const winR = item.valueR > item.valueL

                  return (
                    <tr key={item.label}>
                      <th scope="row" className="bench-table__sticky">
                        {item.label}
                      </th>
                      <td style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                        {item.desc}
                      </td>
                      <td className={winL ? 'compare-cell--win' : undefined}>
                        <span
                          className="bench-bar"
                          style={{
                            '--bar-pct': `${pctL}%`,
                            '--bar-color': item.color,
                          } as React.CSSProperties}
                        >
                          {item.valueL > 0 ? item.valueL.toLocaleString() : '-'}
                        </span>
                      </td>
                      <td className={winR ? 'compare-cell--win' : undefined}>
                        <span
                          className="bench-bar"
                          style={{
                            '--bar-pct': `${pctR}%`,
                            '--bar-color': item.color,
                          } as React.CSSProperties}
                        >
                          {item.valueR > 0 ? item.valueR.toLocaleString() : '-'}
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
