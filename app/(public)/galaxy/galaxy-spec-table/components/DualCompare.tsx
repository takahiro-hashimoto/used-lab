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
  series: string | null
  cpu: string | null
  model_number: string | null
  ram: string | null
  weight: string | null
  strage: string | null
  color: string | null
  size: string | null
  port: string | null
  battery: string | null
  wired_charging: string | null
  wireless_charging: string | null
  reverse_charging: boolean
  display: string | null
  resolution: string | null
  refresh_rate: string | null
  cover_display: string | null
  water_resistance: string | null
  felica: boolean
  microsd: boolean
  sim: string | null
  main_camera: string | null
  ultrawide_camera: string | null
  tele_camera: string | null
  optical_zoom: string | null
  front_camera: string | null
  galaxy_ai: boolean
  circle_to_search: boolean
  object_eraser: boolean
  s_pen: boolean
  dex: boolean
  support_until: string | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

function formatSupportUntil(s: string | null): string {
  if (!s) return '-'
  const [y, m] = s.split('-')
  return m ? `${y}年${parseInt(m, 10)}月まで` : `${y}年まで`
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
        { label: 'チップ', ...text((m) => m.cpu) },
        { label: 'シリーズ', ...text((m) => m.series) },
        { label: '型番', ...text((m) => m.model_number) },
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
        { label: 'microSD', ...bool((m) => m.microsd) },
        { label: 'バッテリー容量', ...text((m) => m.battery) },
        { label: '有線充電', ...text((m) => m.wired_charging) },
        { label: 'ワイヤレス充電', ...text((m) => m.wireless_charging) },
        { label: 'Wireless PowerShare', ...bool((m) => m.reverse_charging) },
        { label: 'おサイフケータイ', ...bool((m) => m.felica) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: '画面サイズ', ...text((m) => m.display) },
        { label: 'カバー画面', ...text((m) => m.cover_display) },
        { label: '画像解像度', ...text((m) => m.resolution) },
        { label: 'リフレッシュレート', ...text((m) => m.refresh_rate) },
        { label: '防水防塵', ...text((m) => m.water_resistance) },
      ],
    },
    {
      title: 'カメラ',
      rows: [
        { label: 'メインカメラ', ...text((m) => m.main_camera) },
        { label: '超広角カメラ', ...text((m) => m.ultrawide_camera) },
        { label: '望遠カメラ', ...text((m) => m.tele_camera) },
        { label: '光学ズーム', ...text((m) => m.optical_zoom) },
        { label: 'フロントカメラ', ...text((m) => m.front_camera) },
        { label: 'Galaxy AI', ...bool((m) => m.galaxy_ai) },
        { label: 'かこって検索', ...bool((m) => m.circle_to_search) },
        { label: 'オブジェクト消去', ...bool((m) => m.object_eraser) },
      ],
    },
    {
      title: 'その他',
      rows: [
        { label: '発売日', get: (m: SpecModel) => formatReleaseDate(m.date) },
        { label: 'コネクター', ...text((m) => m.port) },
        { label: 'SIM', ...text((m) => m.sim) },
        { label: 'S Pen対応', ...bool((m) => m.s_pen) },
        { label: 'Samsung DeX', ...bool((m) => m.dex) },
        { label: 'サポート終了予定', get: (m: SpecModel) => formatSupportUntil(m.support_until) },
      ],
    },
  ]
}

export default function DualCompare({ models, shopLinks }: Props) {
  return (
    <DualCompareBase
      models={models}
      shopLinks={shopLinks}
      productName="Galaxy"
      imagePath="galaxy"
      detailPath="galaxy"
      categories={buildCategories()}
      defaultIndexA={4}
      defaultIndexB={5}
      getOptionLabel={(m) => m.model}
    />
  )
}
