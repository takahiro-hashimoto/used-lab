'use client'

import dynamic from 'next/dynamic'
import type { SeriesDefinition } from '@/app/components/ValueZoneChart'
import type { BaseProductModel } from '@/lib/types'

const ValueZoneChart = dynamic(() => import('@/app/components/ValueZoneChart'), {
  ssr: false,
  loading: () => <div style={{ height: '300px' }} />,
})

type Props = {
  productName: string
  osName: string
  supportYears: number
  sweetMin: number
  sweetMax: number
  series: SeriesDefinition[]
  allModels: BaseProductModel[]
}

export default function ValueZoneChartWrapper(props: Props) {
  return <ValueZoneChart {...props} />
}
