'use client'

import { useEffect, useState } from 'react'
import ChartEmbed from './ChartEmbed'
import type { ChartSeries } from '@/lib/chart-embed'

// 静的シェルから描画されるローダー。models/days は URL から読み、
// 系列データは CDN キャッシュ済みの Route Handler から取得する（ページ自体は Function を起動しない）。
export default function ChartEmbedClient({ category }: { category: string }) {
  const [series, setSeries] = useState<ChartSeries[] | null>(null)
  const [days, setDays] = useState(30)

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    const models = (sp.get('models') ?? '').split(',').map((s) => s.trim()).filter(Boolean)
    setDays(Math.min(Math.max(Number(sp.get('days')) || 30, 7), 90))

    const qs = new URLSearchParams({ category, models: models.join(',') })
    fetch(`/api/embed-chart?${qs}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json: { series: ChartSeries[] }) => setSeries(json.series))
      .catch(() => setSeries([]))
  }, [category])

  return (
    <ChartEmbed
      series={series ?? []}
      days={days}
      category={category}
      loading={series === null}
    />
  )
}
