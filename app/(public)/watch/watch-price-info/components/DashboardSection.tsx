'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { ModelData } from '../page'

type Props = {
  modelsData: ModelData[]
  initialSelected: number[]
  seriesGroups: Record<string, number[]>
}

const MAX_SELECT = 4

function getModelSeries(name: string): string {
  if (name.includes('Ultra')) return 'Ultra'
  if (name.includes('SE')) return 'SE'
  return 'Series'
}

export default function DashboardSection({ modelsData, initialSelected, seriesGroups }: Props) {
  const [selectedModels, setSelectedModels] = useState<number[]>(initialSelected)
  const [timeRange, setTimeRange] = useState(30)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<unknown>(null)

  const toggleModel = (id: number) => {
    setSelectedModels((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_SELECT) return prev
      return [...prev, id]
    })
  }

  const updateChart = useCallback(() => {
    if (!chartRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ChartJS = (window as unknown as Record<string, any>).Chart as typeof import('chart.js').Chart | undefined
    if (!ChartJS) return

    if (chartInstanceRef.current) {
      (chartInstanceRef.current as { destroy: () => void }).destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    if (selectedModels.length === 0) return

    const datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      borderWidth: number
      tension: number
      pointRadius: number
      pointHoverRadius: number
    }[] = []
    let labels: string[] = []

    for (const id of selectedModels) {
      const m = modelsData.find((x) => x.id === id)
      if (!m || m.prices.length === 0) continue

      // 末尾からtimeRange件を取得（データが少ない場合は全件）
      const filtered = m.prices.slice(-timeRange)

      if (labels.length === 0 && filtered.length > 0) {
        labels = filtered.map((p) => {
          const d = new Date(p.date)
          return `${d.getMonth() + 1}/${d.getDate()}`
        })
      }

      const dataPoints = filtered.map((p) => p.avg)
      datasets.push({
        label: m.name,
        data: dataPoints,
        borderColor: m.color,
        backgroundColor: m.color + '20',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: dataPoints.length <= 3 ? 4 : 0,
        pointHoverRadius: 5,
      })
    }

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: (c: any) =>
                `${c.dataset.label}: ¥${c.parsed.y?.toLocaleString() ?? '-'}`,
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { maxTicksLimit: 8, color: '#64748b', font: { size: 10 } } },
          y: {
            grid: { color: '#e2e8f0' },
            ticks: {
              callback: (v: string | number) => '¥' + (Number(v) / 1000) + 'k',
              color: '#64748b',
              font: { size: 10 },
            },
          },
        },
      },
    })
  }, [selectedModels, timeRange, modelsData])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'
    script.onload = () => updateChart()
    document.head.appendChild(script)
    return () => {
      if (chartInstanceRef.current) {
        (chartInstanceRef.current as { destroy: () => void }).destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateChart()
  }, [updateChart])

  const selectedModelData = selectedModels
    .map((id) => modelsData.find((m) => m.id === id))
    .filter((m): m is ModelData => m != null)

  return (
    <section className="l-section l-section--bg-subtle" id="pd-dashboard" aria-labelledby="pd-dashboard-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-dashboard-title">
          Apple Watchの中古相場と価格推移グラフ
        </h2>
        <p className="m-section-desc">
          気になるモデルを選択して、価格推移を比較できます。
        </p>

        {/* モデル選択チップ */}
        <div className="pd-selector">
          <p className="pd-selector__title">比較モデルを選択（最大4機種）</p>
          <div className="pd-selector__grid">
            {modelsData.map((m) => (
              <button
                key={m.id}
                className={`pd-chip${selectedModels.includes(m.id) ? ' is-selected' : ''}`}
                data-series={getModelSeries(m.name)}
                onClick={() => toggleModel(m.id)}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* グラフエリア */}
        <div className="pd-chart-area">
          <div className="pd-chart-area__header">
            <p className="pd-chart-area__label">価格推移</p>
            <select
              className="pd-chart-area__select"
              value={timeRange}
              onChange={(e) => setTimeRange(parseInt(e.target.value, 10))}
              aria-label="表示期間"
            >
              <option value={7}>7日間</option>
              <option value={14}>14日間</option>
              <option value={30}>30日間</option>
              <option value={60}>60日間</option>
              <option value={90}>90日間</option>
            </select>
          </div>

          <div className="pd-chart-area__body">
            <div className="pd-chart__canvas-wrap">
              <canvas ref={chartRef} aria-label="価格推移グラフ" role="img"></canvas>
            </div>
            {selectedModels.length === 0 && (
              <p className="pd-chart__empty">モデルを選択してください</p>
            )}
            <div className="pd-chart__legend">
              {selectedModelData.map((m) => (
                <a
                  key={m.id}
                  href={m.iosysUrl || `/watch/${m.slug}/`}
                  target={m.iosysUrl ? '_blank' : undefined}
                  rel={m.iosysUrl ? 'noopener noreferrer nofollow' : undefined}
                  className="pd-legend-item"
                >
                  <span className="pd-legend-item__color" style={{ background: m.color }}></span>
                  {m.name}
                  <svg className="pd-legend-item__icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 算出方法の補足 */}
        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
          <span className="m-callout__label">価格算出方法について</span>
          <p className="m-callout__text">
            当サイトの中古相場は、イオシス・ゲオ・じゃんぱらの3店舗から毎日自動取得した最安値・最高値の平均中間値を算出しています。対象は各機種の最小容量モデルで、100円単位に丸めて表示しています。
          </p>
        </div>
      </div>
    </section>
  )
}
