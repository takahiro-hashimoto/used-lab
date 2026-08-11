'use client'

// MacBook版（macbook-spec-table/components/DualCompare.tsx）のデスクトップ版。
// ノート固有の行（重量・バッテリー・MagSafe・ProMotion・冷却ファン・センターフレーム）を落とし、
// デスクトップの判断材料（内蔵ディスプレイ・同梱物・GPUコア・Ethernet）に差し替えている。
//
// ポートは全文を1行に入れず、種類ごとに「何基あるか」だけを並べる。
// 構成違いの補足（「M2 Proは4基」等）は PortCell がカッコ部分を改行して小さく出す。

import { getBoolDisplay, formatDate, PortSpec, DetailSpec } from '@/app/components/spec-table-utils'
import DualCompareBase from '@/app/components/DualCompare'
import type { CompareCategory } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type SpecModel = {
  id: number
  model: string
  shortname: string | null
  slug: string
  image: string | null
  imageSrc?: string | null
  date: string | null
  cpu: string | null
  gpu: string | null
  ram: string | null
  strage: string | null
  size: string | null
  display_builtin: boolean
  display: string | null
  resolution: string | null
  luminance: string | null
  thunderbolt: string | null
  thunderbolt_gen: string | null
  usb_c: string | null
  usb_a: string | null
  headphone: boolean
  hdmi: boolean
  slot: boolean
  ethernet: string | null
  external_display: string | null
  camera: string | null
  speaker: string | null
  included_accessories: string | null
  apple_intelligence: boolean
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
  const port = (getter: (m: SpecModel) => string | null) => ({
    get: (m: SpecModel) => <PortSpec value={getter(m)} />,
  })
  const detail = (getter: (m: SpecModel) => string | null) => ({
    get: (m: SpecModel) => <DetailSpec value={getter(m)} />,
  })

  return [
    {
      title: '基本仕様',
      rows: [
        { label: 'サイズ', ...text((m) => m.size) },
        { label: '発売日', get: (m: SpecModel) => formatDate(m.date) },
        { label: '同梱物', ...text((m) => m.included_accessories) },
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
        { label: 'GPUコア', ...text((m) => m.gpu) },
        { label: 'メモリ', ...text((m) => m.ram) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: '内蔵ディスプレイ', ...bool((m) => m.display_builtin) },
        { label: 'ディスプレイ', hideIfAllEmpty: true, ...text((m) => m.display) },
        { label: '解像度', hideIfAllEmpty: true, ...text((m) => m.resolution) },
        { label: '輝度', hideIfAllEmpty: true, ...text((m) => m.luminance) },
        { label: '外部ディスプレイ', ...detail((m) => m.external_display) },
      ],
    },
    {
      title: 'ポート',
      rows: [
        { label: 'Thunderbolt', ...port((m) => m.thunderbolt) },
        { label: 'Thunderboltの規格', ...detail((m) => m.thunderbolt_gen) },
        { label: 'USB-C', ...port((m) => m.usb_c) },
        { label: 'USB-A', ...port((m) => m.usb_a) },
        { label: 'HDMI', ...bool((m) => m.hdmi) },
        { label: 'SDカードスロット', ...bool((m) => m.slot) },
        { label: 'ヘッドフォンジャック', ...bool((m) => m.headphone) },
        { label: 'Ethernet', ...detail((m) => m.ethernet) },
      ],
    },
    {
      title: 'その他',
      rows: [
        { label: 'カメラ', hideIfAllEmpty: true, ...text((m) => m.camera) },
        { label: 'スピーカー', ...text((m) => m.speaker) },
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
      productName="iMac・Mac mini"
      imagePath="mac"
      detailPath="mac"
      categories={buildCategories()}
      // 初期表示は Mac mini 2023 × Mac mini 2024。
      // 8GB→16GB・USB-A廃止・前面ポート追加と、中古選びで効く差が一度に出る組み合わせ
      defaultIndexA={4}
      defaultIndexB={5}
      getOptionLabel={(m) => m.shortname || m.model}
    />
  )
}
