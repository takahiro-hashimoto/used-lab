import type { Metadata } from 'next'
import ChartEmbedClient from '../../ChartEmbedClient'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function IPadChartEmbedPage() {
  return <ChartEmbedClient category="ipad" />
}
