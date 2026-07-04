import type { Metadata } from 'next'
import ChartEmbedClient from '../../ChartEmbedClient'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function WatchChartEmbedPage() {
  return <ChartEmbedClient category="watch" />
}
