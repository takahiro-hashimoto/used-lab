'use client'

import CompareSelectorBase from '@/app/components/CompareSelector'
import type { IPadModel, ProductShopLink } from '@/lib/types'

type Props = {
  currentModel: IPadModel
  allModels: IPadModel[]
  initialCompareId: number
  iosysUrl?: string
  shopLinks?: ProductShopLink[]
}

type CompareRow = {
  section: string
  label: string
  current: string
  compare: string
}

function getFeatureValue(model: IPadModel, key: string): string {
  const val = model[key as keyof IPadModel]
  if (val === true || val === '◯') return '◯'
  if (val === false || val === '×') return '×'
  if (val == null) return '-'
  return String(val).replace(/<br\s*\/?>/g, '\n')
}

function getAntutuTotal(m: IPadModel): string {
  const t = (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0)
  return t > 0 ? t.toLocaleString() : '-'
}

function formatStorage(strage: string | null): string {
  if (!strage) return '-'
  const parts = strage.split(/\s*\/\s*/).map(s => s.trim()).filter(Boolean)
  if (parts.length <= 1) return strage
  return `${parts[0]} ~ ${parts[parts.length - 1]}`
}

function formatKeyboard(keyboard: string | null): string {
  if (!keyboard) return '-'
  return keyboard.replace(/\s*\/\s*/g, '\n')
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

function buildCompareRows(current: IPadModel, compare: IPadModel): CompareRow[] {
  return [
    // サイズ・重量
    { section: 'サイズ・重量', label: 'サイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: 'サイズ・重量', label: '重量', current: current.weight || '-', compare: compare.weight || '-' },
    // ボディ
    { section: 'ボディ', label: 'バッテリー容量', current: current.battery || '-', compare: compare.battery || '-' },
    { section: 'ボディ', label: 'ストレージ容量', current: formatStorage(current.strage), compare: formatStorage(compare.strage) },
    { section: 'ボディ', label: 'Apple Intelligence', current: getFeatureValue(current, 'apple_intelligence'), compare: getFeatureValue(compare, 'apple_intelligence') },
    { section: 'ボディ', label: 'CPU', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: 'ボディ', label: 'RAM', current: current.ram || '-', compare: compare.ram || '-' },
    // ディスプレイ
    { section: 'ディスプレイ', label: '画面サイズ', current: current.display || '-', compare: compare.display || '-' },
    { section: 'ディスプレイ', label: '画像解像度', current: current.resolution || '-', compare: compare.resolution || '-' },
    { section: 'ディスプレイ', label: 'ディスプレイ種類', current: current.display_type || '-', compare: compare.display_type || '-' },
    { section: 'ディスプレイ', label: 'ProMotion', current: getFeatureValue(current, 'promotion'), compare: getFeatureValue(compare, 'promotion') },
    // カメラ
    { section: 'カメラ', label: '外向きカメラ', current: current.front_camera || '-', compare: compare.front_camera || '-' },
    { section: 'カメラ', label: '内向きカメラ', current: current.in_camera || '-', compare: compare.in_camera || '-' },
    { section: 'カメラ', label: 'センターフレーム', current: getFeatureValue(current, 'center_frame'), compare: getFeatureValue(compare, 'center_frame') },
    { section: 'カメラ', label: 'LiDARスキャナー', current: getFeatureValue(current, 'lidar'), compare: getFeatureValue(compare, 'lidar') },
    // 入力・アクセサリ
    { section: '入力・アクセサリ', label: 'Apple Pencil', current: current.pencil || '-', compare: compare.pencil || '-' },
    { section: '入力・アクセサリ', label: 'キーボード', current: formatKeyboard(current.keyboard ?? null), compare: formatKeyboard(compare.keyboard ?? null) },
    { section: '入力・アクセサリ', label: 'スピーカー', current: current.speaker || '-', compare: compare.speaker || '-' },
    // その他
    { section: 'その他', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: 'その他', label: '充電端子', current: current.port || '-', compare: compare.port || '-' },
    { section: 'その他', label: '認証機能', current: current.certification || '-', compare: compare.certification || '-' },
    { section: 'その他', label: 'SIM', current: current.sim || '-', compare: compare.sim || '-' },
  ]
}

export default function CompareSelector({ currentModel, allModels, initialCompareId, iosysUrl, shopLinks = [] }: Props) {
  return (
    <CompareSelectorBase
      currentModel={currentModel}
      allModels={allModels}
      initialCompareId={initialCompareId}
      iosysUrl={iosysUrl}
      shopLinks={shopLinks}
      imagePath="ipad"
      detailPath="ipad"
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
