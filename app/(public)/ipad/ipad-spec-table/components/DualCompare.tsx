'use client'

import { getBoolDisplay, TextCell, formatDate } from '@/app/components/spec-table-utils'
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
  ram: string | null
  weight: string | null
  strage: string | null
  size: string | null
  port: string | null
  battery: string | null
  display: string | null
  display_type: string | null
  resolution: string | null
  sim: string | null
  certification: string | null
  front_camera: string | null
  in_camera: string | null
  apple_intelligence: boolean
  promotion: boolean
  center_frame: boolean
  lidar: boolean
  pencil: string | null
  keyboard: string | null
  speaker: string | null
  color: string | null
  score_single: number | null
  score_multi: number | null
  score_metal: number | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
}

function formatScore(val: number | null): string {
  if (val == null) return '-'
  return val.toLocaleString()
}

function buildCategories(): CompareCategory<SpecModel>[] {
  const text = (getter: (m: SpecModel) => string | null) => ({
    get: (m: SpecModel) => {
      const val = getter(m)
      if (!val) return '-'
      return <TextCell value={val} />
    },
  })
  const bool = (getter: (m: SpecModel) => boolean) => ({
    get: (m: SpecModel) => getBoolDisplay(getter(m)),
  })
  const score = (getter: (m: SpecModel) => number | null) => ({
    get: (m: SpecModel) => formatScore(getter(m)),
  })

  return [
    {
      title: 'サイズ・重量',
      rows: [
        { label: 'サイズ', ...text((m) => m.size) },
        { label: '重量', ...text((m) => m.weight) },
      ],
    },
    {
      title: 'ボディ',
      rows: [
        { label: 'カラー', ...text((m) => m.color) },
        { label: 'ストレージ', ...text((m) => m.strage) },
        { label: 'バッテリー容量', ...text((m) => m.battery) },
        { label: '充電端子', ...text((m) => m.port) },
        { label: 'スピーカー', ...text((m) => m.speaker) },
      ],
    },
    {
      title: 'CPU・ベンチマークスコア',
      rows: [
        { label: 'CPU', ...text((m) => m.cpu) },
        { label: 'GeekBench シングル', ...score((m) => m.score_single) },
        { label: 'GeekBench マルチ', ...score((m) => m.score_multi) },
        { label: 'GeekBench Metal', ...score((m) => m.score_metal) },
        { label: 'メモリ', ...text((m) => m.ram) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: '画面サイズ', ...text((m) => m.display) },
        { label: '画像解像度', ...text((m) => m.resolution) },
        { label: 'ProMotion', ...bool((m) => m.promotion) },
      ],
    },
    {
      title: 'カメラ',
      rows: [
        { label: 'フロントカメラ', ...text((m) => m.front_camera) },
        { label: 'インカメラ', ...text((m) => m.in_camera) },
        { label: 'センターフレーム', ...bool((m) => m.center_frame) },
        { label: 'LiDARスキャナー', ...bool((m) => m.lidar) },
      ],
    },
    {
      title: 'その他',
      rows: [
        { label: '発売日', get: (m: SpecModel) => formatDate(m.date) },
        { label: '認証機能', ...text((m) => m.certification) },
        { label: 'Apple Intelligence', ...bool((m) => m.apple_intelligence) },
        { label: 'SIM', ...text((m) => m.sim) },
        { label: 'Apple Pencil', ...text((m) => m.pencil) },
        { label: '外付けキーボード', ...text((m) => m.keyboard) },
      ],
    },
  ]
}

export default function DualCompare({ models, shopLinks }: Props) {
  return (
    <DualCompareBase
      models={models}
      shopLinks={shopLinks}
      productName="iPad"
      imagePath="ipad"
      detailPath="ipad"
      categories={buildCategories()}
      defaultIndexA={4}
      defaultIndexB={5}
      getOptionLabel={(m) => `${m.model}（${m.cpu}）`}
    />
  )
}
