import type { Metadata } from 'next'
import ChartEmbedClient from '../../ChartEmbedClient'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function MacBookChartEmbedPage() {
  return <ChartEmbedClient category="macbook" />
}
