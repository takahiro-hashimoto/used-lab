'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// カラーパレット準拠
const COLOR_PRIMARY = '#2589d0'       // --color-primary
const COLOR_RED = '#e74c3c'           // --color-red
const COLOR_TEXT_PRIMARY = '#333333'  // --color-text-primary
const COLOR_TEXT_MUTED = '#999999'    // --color-text-muted

type Props = {
  labels: string[]
  avgMin: (number | null)[]
  avgMax: (number | null)[]
  modelName: string
}

/** YYYY-MM-DD → M/D */
function toShortDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function PriceChart({ labels, avgMin, avgMax }: Props) {
  const displayLabels = labels.map(toShortDate)

  const data = {
    labels: displayLabels,
    datasets: [
      {
        label: '最安値（3社平均）',
        data: avgMin,
        borderColor: COLOR_PRIMARY,
        backgroundColor: 'rgba(37, 137, 208, 0.08)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: COLOR_PRIMARY,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        tension: 0.3,
        fill: true,
      },
      {
        label: '最高値（3社平均）',
        data: avgMax,
        borderColor: COLOR_RED,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: COLOR_RED,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          font: { family: '"Noto Sans JP", sans-serif', size: 13 },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: COLOR_TEXT_PRIMARY,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(51, 51, 51, 0.95)',
        titleFont: { family: '"Noto Sans JP", sans-serif', size: 13, weight: 'bold' as const },
        bodyFont: { family: '"Noto Sans JP", sans-serif', size: 13 },
        padding: 14,
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        callbacks: {
          title: function (items: { label: string }[]) {
            return items[0]?.label + ' の相場'
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            const value = context.parsed?.y
            const label = context.dataset?.label || ''
            if (value == null || isNaN(value)) return undefined
            return ` ${label}: ¥${value.toLocaleString()}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: { family: '"Noto Sans JP", sans-serif', size: 11 },
          color: COLOR_TEXT_MUTED,
          maxTicksLimit: 8,
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: false,
        border: { display: false },
        ticks: {
          callback: function (value: string | number) {
            const num = Number(value)
            if (num >= 10000) {
              return `¥${(num / 10000).toFixed(1)}万`
            }
            return `¥${num.toLocaleString()}`
          },
          font: { family: '"Noto Sans JP", sans-serif', size: 11 },
          color: COLOR_TEXT_MUTED,
          padding: 8,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  }

  return (
    <div style={{ position: 'relative', height: '320px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  )
}
