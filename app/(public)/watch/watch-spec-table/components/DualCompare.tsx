'use client'

import { getBoolDisplay, formatDate } from '@/app/components/spec-table-utils'
import DualCompareBase from '@/app/components/DualCompare'
import type { CompareCategory } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type SpecModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  cpu: string | null
  size: string | null
  strage: string | null
  material: string | null
  battery: string | null
  water_resistance: string | null
  always_on_display: boolean
  fast_charge: boolean
  blood_oxygen: boolean
  cardiogram: boolean
  accident_detection: boolean
  fall_detection: boolean
  skin_temperature: boolean
  japanese_input: boolean
  double_tap: boolean
  sleep_tracking: boolean
  altimeter: boolean
  blood_pressure: boolean
  sleep_score: boolean
  max_brightness: string | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
}

function buildCategories(): CompareCategory<SpecModel>[] {
  const text = (getter: (m: SpecModel) => string | null) => ({
    get: (m: SpecModel) => getter(m) || '-',
  })
  const bool = (getter: (m: SpecModel) => boolean) => ({
    get: (m: SpecModel) => getBoolDisplay(getter(m)),
  })

  return [
    {
      title: '基本仕様',
      rows: [
        { label: 'サイズ', ...text((m) => m.size) },
        { label: '発売日', get: (m: SpecModel) => formatDate(m.date) },
        { label: 'CPU', ...text((m) => m.cpu) },
        { label: '素材', ...text((m) => m.material) },
        { label: '容量', ...text((m) => m.strage) },
        { label: '輝度', ...text((m) => m.max_brightness) },
        { label: '耐水性能', ...text((m) => m.water_resistance) },
        { label: 'バッテリー', ...text((m) => m.battery) },
      ],
    },
    {
      title: '搭載機能',
      rows: [
        { label: '常時点灯ディスプレイ', ...bool((m) => m.always_on_display) },
        { label: '急速充電', ...bool((m) => m.fast_charge) },
        { label: '血中酸素濃度', ...bool((m) => m.blood_oxygen) },
        { label: '心電図', ...bool((m) => m.cardiogram) },
        { label: '血圧', ...bool((m) => m.blood_pressure) },
        { label: '事故検出機能', ...bool((m) => m.accident_detection) },
        { label: '転倒検出機能', ...bool((m) => m.fall_detection) },
        { label: '皮膚温測定機能', ...bool((m) => m.skin_temperature) },
        { label: 'ダブルタップ', ...bool((m) => m.double_tap) },
        { label: '日本語入力', ...bool((m) => m.japanese_input) },
        { label: '睡眠トラッキング', ...bool((m) => m.sleep_tracking) },
        { label: '睡眠スコア', ...bool((m) => m.sleep_score) },
        { label: '高度計', ...bool((m) => m.altimeter) },
      ],
    },
  ]
}

export default function DualCompare({ models, shopLinks }: Props) {
  return (
    <DualCompareBase
      models={models}
      shopLinks={shopLinks}
      productName="Apple Watch"
      imagePath="watch"
      detailPath="watch"
      categories={buildCategories()}
      defaultIndexA={8}
      defaultIndexB={9}
      getOptionLabel={(m) => `${m.model}（${m.cpu}）`}
    />
  )
}
