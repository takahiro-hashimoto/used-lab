'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chart as ChartClass, CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip } from 'chart.js'
import type { ChartDataset, TooltipItem } from 'chart.js'
import type { ModelData } from '../page'

ChartClass.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip)

type Props = {
  modelsData: ModelData[]
  initialSelected: number[]
}

const MAX_SELECT = 4

function getModelSeries(name: string): string {
  if (name.includes('Pro')) return 'Pro'
  if (name.includes('Air')) return 'Air'
  return 'Other'
}

/** チップ表示用に短縮: "MacBook Air 13インチ（2022）" → "MBA 13（2022）" */
function shortenModelName(name: string): string {
  return name
    .replace('MacBook Air', 'MBA')
    .replace('MacBook Pro', 'MBP')
    .replace('インチ', '')
}

export default function DashboardSection({ modelsData, initialSelected }: Props) {
  const [selectedModels, setSelectedModels] = useState<number[]>(initialSelected)
  const [timeRange, setTimeRange] = useState(30)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<InstanceType<typeof ChartClass> | null>(null)

  const modelsMap = useMemo(() => new Map(modelsData.map((m) => [m.id, m])), [modelsData])

  const toggleModel = (id: number) => {
    setSelectedModels((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_SELECT) return prev
      return [...prev, id]
    })
  }

  const updateChart = useCallback(() => {
    if (!chartRef.current) return
    chartInstanceRef.current?.destroy()

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    if (selectedModels.length === 0) return

    const datasets: ChartDataset<'line', number[]>[] = []
    let labels: string[] = []

    for (const id of selectedModels) {
      const m = modelsMap.get(id)
      if (!m || m.prices.length === 0) continue

      const filtered = m.prices.slice(-timeRange)

      if (labels.length === 0 && filtered.length > 0) {
        labels = filtered.map((p) => {
          const [, mm, dd] = p.date.split('-')
          return `${Number(mm)}/${Number(dd)}`
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

    chartInstanceRef.current = new ChartClass(ctx, {
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
            itemSort: (a: TooltipItem<'line'>, b: TooltipItem<'line'>) => (b.parsed?.y ?? 0) - (a.parsed?.y ?? 0),
            callbacks: {
              label: (c: TooltipItem<'line'>) =>
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
  }, [selectedModels, timeRange, modelsMap])

  useEffect(() => {
    return () => { chartInstanceRef.current?.destroy() }
  }, [])

  useEffect(() => {
    updateChart()
  }, [updateChart])

  const selectedModelData = selectedModels
    .map((id) => modelsMap.get(id))
    .filter((m): m is ModelData => m != null)

  return (
    <section className="l-section" id="pd-dashboard" aria-labelledby="pd-dashboard-title">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="pd-dashboard-title">
          MacBookの中古相場と価格推移グラフ
        </h2>
        <p className="m-section-desc">
          気になるモデルを選択して、価格推移を比較できます。
        </p>

        {/* モデル選択チップ */}
        <div className="u-mb-xl">
          <p className="pd-selector__title">比較モデルを選択（最大4機種）</p>
          <div className="pd-selector__grid">
            {modelsData.map((m) => (
              <button
                key={m.id}
                className={`pd-chip${selectedModels.includes(m.id) ? ' is-selected' : ''}`}
                data-series={getModelSeries(m.name)}
                onClick={() => toggleModel(m.id)}
                aria-pressed={selectedModels.includes(m.id)}
              >
                {shortenModelName(m.name)}
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
                  href={m.shopUrl || `/macbook/${m.slug}/`}
                  target={m.shopUrl ? '_blank' : undefined}
                  rel={m.shopUrl ? 'noopener noreferrer nofollow' : undefined}
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
        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">価格算出方法について</span>
          <p className="m-callout__text">
            当サイトの中古相場は、楽天市場の中古ショップから毎日自動取得した最安値Top5・最高値Top5の平均中間値を算出しています。対象は各機種の最小構成モデル（例：MacBook Air M2なら8GB/256GB）で、100円単位に丸めて表示しています。
          </p>
        </div>
      </div>
    </section>
  )
}
