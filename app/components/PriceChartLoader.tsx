'use client'

import dynamic from 'next/dynamic'

const PriceChart = dynamic(() => import('@/app/components/PriceChart'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
      チャートを読み込み中…
    </div>
  ),
})

type Props = {
  labels: string[]
  avgMin: (number | null)[]
  avgMax: (number | null)[]
  modelName: string
}

export default function PriceChartLoader(props: Props) {
  return <PriceChart {...props} />
}
