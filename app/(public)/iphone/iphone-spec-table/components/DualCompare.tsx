'use client'

import { getBoolDisplay, TextCell } from '@/app/components/spec-table-utils'
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
  color: string | null
  size: string | null
  port: string | null
  battery: string | null
  video: string | null
  streaming: string | null
  audio: string | null
  display: string | null
  resolution: string | null
  sim: string | null
  certification: string | null
  front_camera: string | null
  image_sensor: string | null
  in_camera: string | null
  photography_style: boolean
  night_mode: boolean
  portrait_mode: boolean
  action_mode: boolean
  cinematic_mode: boolean
  macro_mode: boolean
  apple_proraw: boolean
  apple_prores: boolean
  lidar: boolean
  magsafe: boolean
  dynamic_island: boolean
  apple_intelligence: boolean
  promotion: boolean
  accident_detection: boolean
  action_button: boolean
  camera_control: boolean
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
}

function getBatteryLife(m: SpecModel): string {
  const parts: string[] = []
  if (m.video) parts.push(`ビデオ再生：${m.video}`)
  if (m.streaming) parts.push(`ストリーミング：${m.streaming}`)
  if (m.audio) parts.push(`音楽再生：${m.audio}`)
  return parts.length > 0 ? parts.join('\n') : '-'
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
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
        { label: 'CPU', ...text((m) => m.cpu) },
        { label: 'RAM', ...text((m) => m.ram) },
        { label: 'カラー', get: (m: SpecModel) => {
          const val = m.color?.replace(/ \/ /g, '\n')
          if (!val) return '-'
          return <TextCell value={val} />
        }},
        { label: 'ストレージ容量', get: (m: SpecModel) => {
          const val = m.strage?.replace(/ \/ /g, '\n')
          if (!val) return '-'
          return <TextCell value={val} />
        }},
        { label: 'バッテリー容量', ...text((m) => m.battery) },
        { label: 'バッテリー持ち', get: (m: SpecModel) => m.video || '-' },
        { label: '充電端子', ...text((m) => m.port) },
        { label: 'Apple Intelligence', ...bool((m) => m.apple_intelligence) },
        { label: 'MagSafe充電', ...bool((m) => m.magsafe) },
        { label: 'アクションボタン', ...bool((m) => m.action_button) },
        { label: 'カメラコントロール', ...bool((m) => m.camera_control) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: '画面サイズ', ...text((m) => m.display) },
        { label: '画像解像度', ...text((m) => m.resolution) },
        { label: 'ProMotion', ...bool((m) => m.promotion) },
        { label: 'Dynamic Island', ...bool((m) => m.dynamic_island) },
      ],
    },
    {
      title: 'カメラ',
      rows: [
        { label: 'フロントカメラ', ...text((m) => m.front_camera) },
        { label: 'インカメラ', ...text((m) => m.in_camera) },
        { label: 'センサーサイズ', ...text((m) => m.image_sensor) },
        { label: 'フォトグラフスタイル', ...bool((m) => m.photography_style) },
        { label: 'ナイトモード', ...bool((m) => m.night_mode) },
        { label: 'ポートレートモード', ...bool((m) => m.portrait_mode) },
        { label: 'アクションモード', ...bool((m) => m.action_mode) },
        { label: 'シネマティックモード', ...bool((m) => m.cinematic_mode) },
        { label: 'マクロ撮影', ...bool((m) => m.macro_mode) },
        { label: 'LiDARスキャナー', ...bool((m) => m.lidar) },
        { label: 'Apple ProRAW', ...bool((m) => m.apple_proraw) },
        { label: 'Apple ProRes', ...bool((m) => m.apple_prores) },
      ],
    },
    {
      title: 'その他',
      rows: [
        { label: '発売日', get: (m: SpecModel) => formatReleaseDate(m.date) },
        { label: '認証機能', ...text((m) => m.certification) },
        { label: 'SIM', ...text((m) => m.sim) },
        { label: '事故衝突検知', ...bool((m) => m.accident_detection) },
      ],
    },
  ]
}

export default function DualCompare({ models, shopLinks }: Props) {
  return (
    <DualCompareBase
      models={models}
      shopLinks={shopLinks}
      productName="iPhone"
      imagePath="iphone"
      detailPath="iphone"
      categories={buildCategories()}
      defaultIndexA={4}
      defaultIndexB={5}
      getOptionLabel={(m) => m.model}
    />
  )
}
