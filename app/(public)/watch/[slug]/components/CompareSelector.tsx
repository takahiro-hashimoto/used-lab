'use client'

import CompareSelectorBase from '@/app/components/CompareSelector'
import type { WatchModel, ProductShopLink } from '@/lib/types'

type Props = {
  currentModel: WatchModel
  allModels: WatchModel[]
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

function buildCompareRows(current: WatchModel, compare: WatchModel): CompareRow[] {
  return [
    // 基本仕様
    { section: '基本仕様', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: '基本仕様', label: 'ケースサイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: '基本仕様', label: 'チップセット', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: '基本仕様', label: 'ストレージ', current: current.strage || '-', compare: compare.strage || '-' },
    { section: '基本仕様', label: 'ケース素材', current: current.material || '-', compare: compare.material || '-' },
    { section: '基本仕様', label: 'ディスプレイ輝度', current: current.max_brightness || '-', compare: compare.max_brightness || '-' },
    { section: '基本仕様', label: '耐水性能', current: current.water_resistance || '-', compare: compare.water_resistance || '-' },
    { section: '基本仕様', label: 'バッテリー', current: current.battery || '-', compare: compare.battery || '-' },
    // ディスプレイ・操作
    { section: 'ディスプレイ・操作', label: '常時表示', current: getBoolValue(current.always_on_display), compare: getBoolValue(compare.always_on_display) },
    { section: 'ディスプレイ・操作', label: '急速充電', current: getBoolValue(current.fast_charge), compare: getBoolValue(compare.fast_charge) },
    { section: 'ディスプレイ・操作', label: 'ダブルタップ', current: getBoolValue(current.double_tap), compare: getBoolValue(compare.double_tap) },
    { section: 'ディスプレイ・操作', label: '日本語入力', current: getBoolValue(current.japanese_input), compare: getBoolValue(compare.japanese_input) },
    // 健康・安全機能
    { section: '健康・安全機能', label: '血中酸素濃度', current: getBoolValue(current.blood_oxygen), compare: getBoolValue(compare.blood_oxygen) },
    { section: '健康・安全機能', label: '心電図', current: getBoolValue(current.cardiogram), compare: getBoolValue(compare.cardiogram) },
    { section: '健康・安全機能', label: '衝突事故検出', current: getBoolValue(current.accident_detection), compare: getBoolValue(compare.accident_detection) },
    { section: '健康・安全機能', label: '転倒検出', current: getBoolValue(current.fall_detection), compare: getBoolValue(compare.fall_detection) },
    { section: '健康・安全機能', label: '皮膚温センサー', current: getBoolValue(current.skin_temperature), compare: getBoolValue(compare.skin_temperature) },
    { section: '健康・安全機能', label: '睡眠トラッキング', current: getBoolValue(current.sleep_tracking), compare: getBoolValue(compare.sleep_tracking) },
    { section: '健康・安全機能', label: '高度計', current: getBoolValue(current.altimeter), compare: getBoolValue(compare.altimeter) },
    { section: '健康・安全機能', label: '血圧', current: getBoolValue(current.blood_pressure), compare: getBoolValue(compare.blood_pressure) },
    { section: '健康・安全機能', label: '睡眠スコア', current: getBoolValue(current.sleep_score), compare: getBoolValue(compare.sleep_score) },
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
      imagePath="watch"
      detailPath="watch"
      imageWidth={120}
      imageHeight={120}
      getCurrentName={() => currentModel.model}
      getCompareName={(m) => m.model}
      getOptionLabel={(m) => m.model}
      getCaption={(c, cmp) => `${c.model} と ${cmp.model} のスペック比較`}
      buildRows={(c, cmp) => buildCompareRows(c, cmp)}
    />
  )
}
