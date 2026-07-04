'use client'

import { useEffect, useState } from 'react'
import ChartEmbed from './ChartEmbed'
import type { ChartSeries } from '@/lib/chart-embed'

// 静的シェルから描画されるローダー。models/days は URL から読み、
// 系列データは CDN キャッシュ済みの Route Handler から取得する（ページ自体は Function を起動しない）。
export default function ChartEmbedClient({ category }: { category: string }) {
  const [state, setState] = useState<{ series: ChartSeries[]; days: number } | null>(null)

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    const models = (sp.get('models') ?? '').split(',').map((s) => s.trim()).filter(Boolean)
    const days = Math.min(Math.max(Number(sp.get('days')) || 30, 7), 90)

    const qs = new URLSearchParams({ category, models: models.join(',') })
    fetch(`/api/embed-chart?${qs}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json: { series: ChartSeries[] }) => setState({ series: json.series, days }))
      .catch(() => setState({ series: [], days }))
  }, [category])

  return (
    <ChartEmbed
      series={state?.series ?? []}
      days={state?.days ?? 30}
      category={category}
      loading={state === null}
    />
  )
}
