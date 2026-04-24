'use client'

import CompareSelectorBase from '@/app/components/CompareSelector'
import type { AirPodsModel, ProductShopLink } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/shared-helpers'

type Props = {
  currentModel: AirPodsModel
  allModels: AirPodsModel[]
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

function buildCompareRows(current: AirPodsModel, compare: AirPodsModel): CompareRow[] {
  return [
    // 基本仕様
    { section: '基本仕様', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: '基本仕様', label: 'チップ', current: current.chip || '-', compare: compare.chip || '-' },
    { section: '基本仕様', label: '装着方式', current: current.fit || '-', compare: compare.fit || '-' },
    { section: '基本仕様', label: '操作方法', current: current.control || '-', compare: compare.control || '-' },
    // バッテリー・充電
    { section: 'バッテリー・充電', label: 'バッテリー（本体）', current: current.battery_earphone || '-', compare: compare.battery_earphone || '-' },
    { section: 'バッテリー・充電', label: 'バッテリー（ケース込）', current: current.battery_case || '-', compare: compare.battery_case || '-' },
    { section: 'バッテリー・充電', label: '充電端子', current: current.port || '-', compare: compare.port || '-' },
    { section: 'バッテリー・充電', label: 'MagSafe', current: getBoolValue(current.magsafe), compare: getBoolValue(compare.magsafe) },
    { section: 'バッテリー・充電', label: 'Qi充電', current: getBoolValue(current.qi_charge), compare: getBoolValue(compare.qi_charge) },
    // オーディオ機能
    { section: 'オーディオ機能', label: 'ノイズキャンセリング', current: getBoolValue(current.anc), compare: getBoolValue(compare.anc) },
    { section: 'オーディオ機能', label: '空間オーディオ', current: getBoolValue(current.spatial_audio), compare: getBoolValue(compare.spatial_audio) },
    { section: 'オーディオ機能', label: 'アダプティブオーディオ', current: getBoolValue(current.adaptive_audio), compare: getBoolValue(compare.adaptive_audio) },
    // その他
    { section: 'その他', label: '防水性能', current: current.waterproof || '×', compare: compare.waterproof || '×' },
  ]
}

function getDisplayName(model: AirPodsModel): string {
  return model.model ? `${model.name}（${model.model}）` : model.name
}

function getShortName(model: AirPodsModel): string {
  return model.name
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
      imagePath="airpods"
      detailPath="airpods"
      imageWidth={160}
      imageHeight={100}
      getCurrentName={() => getShortName(currentModel)}
      getCompareName={(m) => getShortName(m)}
      getOptionLabel={(m) => getShortName(m)}
      getCaption={(c, cmp) => `${getDisplayName(c)} と ${getDisplayName(cmp)} のスペック比較`}
      buildRows={(c, cmp) => buildCompareRows(c, cmp)}
    />
  )
}
