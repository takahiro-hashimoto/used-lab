'use client'

import CompareSelectorBase from '@/app/components/CompareSelector'
import type { MacBookModel, ProductShopLink } from '@/lib/types'

type Props = {
  currentModel: MacBookModel
  allModels: MacBookModel[]
  initialCompareId: number
  iosysUrl?: string
  fallbackIosysUrl?: string
  shopLinks?: ProductShopLink[]
}

type CompareRow = {
  section: string
  label: string
  current: string
  compare: string
}

function getBoolValue(val: boolean): string {
  return val ? '◯' : '×'
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

function buildCompareRows(current: MacBookModel, compare: MacBookModel): CompareRow[] {
  return [
    // 基本仕様
    { section: '基本仕様', label: 'サイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: '基本仕様', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: '基本仕様', label: '重さ', current: current.weight || '-', compare: compare.weight || '-' },
    { section: '基本仕様', label: 'ストレージ', current: current.strage || '-', compare: compare.strage || '-' },
    { section: '基本仕様', label: 'カラー', current: (current.color || '-').replace(/\s*\/\s*/g, '<br />'), compare: (compare.color || '-').replace(/\s*\/\s*/g, '<br />') },
    // 処理性能
    { section: '処理性能', label: 'CPU', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: '処理性能', label: 'メモリ', current: current.ram || '-', compare: compare.ram || '-' },
    // ディスプレイ
    { section: 'ディスプレイ', label: 'ディスプレイ', current: current.display || '-', compare: compare.display || '-' },
    { section: 'ディスプレイ', label: '解像度', current: current.resolution || '-', compare: compare.resolution || '-' },
    { section: 'ディスプレイ', label: '輝度', current: current.luminance || '-', compare: compare.luminance || '-' },
    { section: 'ディスプレイ', label: 'ProMotion', current: getBoolValue(current.promotion), compare: getBoolValue(compare.promotion) },
    { section: 'ディスプレイ', label: '外部ディスプレイ', current: current.external_display || '-', compare: compare.external_display || '-' },
    // その他
    { section: 'その他', label: 'バッテリー', current: current.battery || '-', compare: compare.battery || '-' },
    { section: 'その他', label: 'カメラ', current: current.camera || '-', compare: compare.camera || '-' },
    { section: 'その他', label: 'センターフレーム', current: getBoolValue(current.center_frame), compare: getBoolValue(compare.center_frame) },
    { section: 'その他', label: 'インターフェイス', current: current.port || '-', compare: compare.port || '-' },
    { section: 'その他', label: 'SDカードスロット', current: getBoolValue(current.slot), compare: getBoolValue(compare.slot) },
    { section: 'その他', label: 'HDMIポート', current: getBoolValue(current.hdmi), compare: getBoolValue(compare.hdmi) },
    { section: 'その他', label: 'MagSafe', current: getBoolValue(current.magsafe), compare: getBoolValue(compare.magsafe) },
    { section: 'その他', label: 'スピーカー', current: current.speaker || '-', compare: compare.speaker || '-' },
    { section: 'その他', label: '冷却ファン', current: getBoolValue(current.fan), compare: getBoolValue(compare.fan) },
  ]
}

export default function CompareSelector({ currentModel, allModels, initialCompareId, iosysUrl, fallbackIosysUrl, shopLinks = [] }: Props) {
  return (
    <CompareSelectorBase
      currentModel={currentModel}
      allModels={allModels}
      initialCompareId={initialCompareId}
      shopLinks={shopLinks}
      iosysUrl={iosysUrl}
      fallbackIosysUrl={fallbackIosysUrl}
      imagePath="macbook"
      detailPath="macbook"
      imageWidth={160}
      imageHeight={100}
      getCurrentName={() => currentModel.shortname || currentModel.model}
      getCompareName={(m) => m.shortname || m.model}
      getOptionLabel={(m) => m.shortname || m.model}
      getCaption={(c, cmp) => `${c.model} と ${cmp.model} のスペック比較`}
      buildRows={(c, cmp) => buildCompareRows(c, cmp)}
    />
  )
}
