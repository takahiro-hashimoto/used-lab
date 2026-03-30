'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export type ChartModelData = {
  name: string
  color: string
  slug: string
  prices: { date: string; min: number; max: number; avg: number }[]
  currentPrice: number
}

type Props = {
  models: ChartModelData[]
}

export default function ComparePriceChartClient({ models }: Props) {
  const [timeRange, setTimeRange] = useState(30)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<unknown>(null)

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

    for (const m of models) {
      if (m.prices.length === 0) continue
      const filtered = m.prices.slice(-timeRange)

      if (labels.length === 0 && filtered.length > 0) {
        labels = filtered.map((p) => {
          const d = new Date(p.date)
          return `${d.getMonth() + 1}/${d.getDate()}`
        })
      }

      datasets.push({
        label: m.name,
        data: filtered.map((p) => p.avg),
        borderColor: m.color,
        backgroundColor: m.color + '20',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            itemSort: (a: any, b: any) => (b.parsed?.y ?? 0) - (a.parsed?.y ?? 0),
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
  }, [timeRange, models])

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

  return (
    <>
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
          <div className="pd-chart__legend">
            {models.map((m) => (
              <a
                key={m.name}
                href={`/iphone/${m.slug}/`}
                className="pd-legend-item"
              >
                <span className="pd-legend-item__color" style={{ background: m.color }}></span>
                {m.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
