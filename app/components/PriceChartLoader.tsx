'use client'

import dynamic from 'next/dynamic'

const PriceChart = dynamic(() => import('@/app/components/PriceChart'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', background: '#f9f9f9', borderRadius: 8 }}>
      <span>チャートを読み込み中…</span>
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
