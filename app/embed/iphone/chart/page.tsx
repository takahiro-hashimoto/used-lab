import type { Metadata } from 'next'
import ChartEmbedClient from '../../ChartEmbedClient'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function IPhoneChartEmbedPage() {
  return <ChartEmbedClient category="iphone" />
}
