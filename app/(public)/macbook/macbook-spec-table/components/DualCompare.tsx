'use client'

import { getBoolDisplay, formatDate } from '@/app/components/spec-table-utils'
import DualCompareBase from '@/app/components/DualCompare'
import type { CompareCategory } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type SpecModel = {
  id: number
  model: string
  shortname: string | null
  slug: string
  image: string | null
  date: string | null
  cpu: string | null
  ram: string | null
  strage: string | null
  size: string | null
  weight: string | null
  display: string | null
  resolution: string | null
  luminance: string | null
  port: string | null
  hdmi: boolean
  slot: boolean
  magsafe: boolean
  camera: string | null
  speaker: string | null
  promotion: boolean
  fan: boolean
  center_frame: boolean
  apple_intelligence: boolean
  external_display: string | null
  battery: string | null
  color: string | null
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
        { label: '重量', ...text((m) => m.weight) },
        { label: 'ストレージ', ...text((m) => m.strage) },
        { label: 'カラー', get: (m: SpecModel) => {
          if (!m.color) return '-'
          const parts = m.color.split(/\s*\/\s*/)
          if (parts.length <= 1) return m.color
          return <>{parts.map((p, i) => <span key={i}>{i > 0 && <br />}{p}</span>)}</>
        }},
      ],
    },
    {
      title: '処理性能',
      rows: [
        { label: 'チップ', ...text((m) => m.cpu) },
        { label: 'メモリ', ...text((m) => m.ram) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: 'ディスプレイ', ...text((m) => m.display) },
        { label: '解像度', ...text((m) => m.resolution) },
        { label: '輝度', ...text((m) => m.luminance) },
        { label: 'ProMotion', ...bool((m) => m.promotion) },
        { label: '外部ディスプレイ', ...text((m) => m.external_display) },
      ],
    },
    {
      title: 'その他',
      rows: [
        { label: 'バッテリー', ...text((m) => m.battery) },
        { label: 'カメラ', ...text((m) => m.camera) },
        { label: 'センターフレーム', ...bool((m) => m.center_frame) },
        { label: 'インターフェース', ...text((m) => m.port) },
        { label: 'SDカードスロット', ...bool((m) => m.slot) },
        { label: 'HDMI', ...bool((m) => m.hdmi) },
        { label: 'MagSafe', ...bool((m) => m.magsafe) },
        { label: 'スピーカー', ...text((m) => m.speaker) },
        { label: '冷却ファン', ...bool((m) => m.fan) },
        { label: 'Apple Intelligence', ...bool((m) => m.apple_intelligence) },
      ],
    },
  ]
}

export default function DualCompare({ models, shopLinks }: Props) {
  return (
    <DualCompareBase
      models={models}
      shopLinks={shopLinks}
      productName="MacBook"
      imagePath="macbook"
      detailPath="macbook"
      categories={buildCategories()}
      defaultIndexA={5}
      defaultIndexB={6}
      getOptionLabel={(m) => m.shortname || m.model}
    />
  )
}
