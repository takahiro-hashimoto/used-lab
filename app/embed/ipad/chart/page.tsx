import type { Metadata } from 'next'
import { buildChartSeries, SHOPS_DEFAULT } from '@/lib/chart-embed'
import { getAllIPadModelsIncludingEnded, getAllIPadPriceLogsByModelIds } from '@/lib/queries'
import ChartEmbed from '../../ChartEmbed'

export const revalidate = 3600
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function IPadChartEmbedPage({
  searchParams,
}: {
  searchParams: Promise<{ models?: string; days?: string }>
}) {
  const sp = await searchParams
  const slugs = (sp.models ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  const days = Math.min(Math.max(Number(sp.days) || 30, 7), 90)
  const series = await buildChartSeries(
    slugs,
    getAllIPadModelsIncludingEnded,
    getAllIPadPriceLogsByModelIds,
    SHOPS_DEFAULT,
  )
  return <ChartEmbed series={series} days={days} category="ipad" />
}
