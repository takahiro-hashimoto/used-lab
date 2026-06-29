'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartClass,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
} from 'chart.js'
import type { ChartDataset, TooltipItem } from 'chart.js'
import { type ChartSeries, CHART_EMBED_CONFIG } from '@/lib/chart-embed'
import styles from './chart-embed.module.css'

ChartClass.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip)

const BRAND_URL = 'https://used-lab.jp'

export default function ChartEmbed({
  series,
  days,
  category,
}: {
  series: ChartSeries[]
  days: number
  category: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const instRef = useRef<InstanceType<typeof ChartClass> | null>(null)
  const [ready, setReady] = useState(false)
  const conf = CHART_EMBED_CONFIG[category] ?? { label: '中古Apple製品', priceInfoPath: '' }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || series.length === 0) { setTimeout(() => setReady(true), 0); return }
    instRef.current?.destroy()

    let labels: string[] = []
    const datasets: ChartDataset<'line', number[]>[] = []
    for (const s of series) {
      const filtered = s.prices.slice(-days)
      if (labels.length === 0 && filtered.length > 0) {
        labels = filtered.map((p) => {
          const [, mm, dd] = p.date.split('-')
          return `${Number(mm)}/${Number(dd)}`
        })
      }
      datasets.push({
        label: s.name,
        data: filtered.map((p) => p.avg),
        borderColor: s.color,
        backgroundColor: s.color + '20',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
      })
    }

    instRef.current = new ChartClass(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        animation: {
          onComplete: () => setReady(true),
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            padding: 10,
            cornerRadius: 6,
            itemSort: (a: TooltipItem<'line'>, b: TooltipItem<'line'>) =>
              (b.parsed?.y ?? 0) - (a.parsed?.y ?? 0),
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
              callback: (v: string | number) => '¥' + Number(v) / 1000 + 'k',
              color: '#64748b',
              font: { size: 10 },
            },
          },
        },
      },
    })
    return () => instRef.current?.destroy()
  }, [series, days])

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.head}>
          <span className={styles.title}>
            {conf.label} 価格推移（直近{days}日）
          </span>
        </div>
        {series.length === 0 ? (
          <p className={styles.empty}>表示できる価格データがありません。</p>
        ) : (
          <>
            <div className={styles.chartWrap}>
              {!ready && <div className={styles.skeleton} aria-hidden="true" />}
              <canvas
                ref={canvasRef}
                role="img"
                aria-label={`${conf.label}の価格推移グラフ`}
                style={{ opacity: ready ? 1 : 0 }}
              />
            </div>
            <div className={styles.legend}>
              {series.map((s) => (
                <span key={s.slug} className={styles.legendItem}>
                  <span className={styles.dot} style={{ background: s.color }} />
                  {s.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <a
        className={styles.brand}
        href={`${BRAND_URL}/${conf.priceInfoPath}/`}
        target="_blank"
        rel="noopener"
      >
        {conf.label}の相場・価格推移｜ユーズドラボ
      </a>
    </div>
  )
}
