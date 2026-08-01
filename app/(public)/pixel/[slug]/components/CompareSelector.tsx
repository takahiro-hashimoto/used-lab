'use client'

import CompareSelectorBase from '@/app/components/CompareSelector'
import type { PixelModel, ProductShopLink } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/shared-helpers'

type Props = {
  currentModel: PixelModel
  allModels: PixelModel[]
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

function getFeatureValue(model: PixelModel, key: string): string {
  const val = model[key as keyof PixelModel]
  if (val === true) return '◯'
  if (val === false) return '×'
  if (val == null) return '-'
  return String(val).replace(/<br\s*\/?>/g, '\n')
}

function buildCompareRows(current: PixelModel, compare: PixelModel): CompareRow[] {
  return [
    // サイズ・重量
    { section: 'サイズ・重量', label: 'サイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: 'サイズ・重量', label: '重量', current: current.weight || '-', compare: compare.weight || '-' },
    // ボディ
    { section: 'ボディ', label: 'CPU（Tensor）', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: 'ボディ', label: 'Tensor世代', current: current.tensor_gen || '-', compare: compare.tensor_gen || '-' },
    { section: 'ボディ', label: 'RAM', current: current.ram || '-', compare: compare.ram || '-' },
    { section: 'ボディ', label: 'カラー', current: current.color?.replace(/ \/ /g, '\n') || '-', compare: compare.color?.replace(/ \/ /g, '\n') || '-' },
    { section: 'ボディ', label: 'ストレージ容量', current: current.strage?.replace(/ \/ /g, '\n') || '-', compare: compare.strage?.replace(/ \/ /g, '\n') || '-' },
    { section: 'ボディ', label: 'バッテリー容量', current: current.battery || '-', compare: compare.battery || '-' },
    { section: 'ボディ', label: '充電端子', current: current.port || '-', compare: compare.port || '-' },
    { section: 'ボディ', label: '防水防塵', current: current.water_resistance || '-', compare: compare.water_resistance || '-' },
    { section: 'ボディ', label: 'おサイフケータイ', current: getFeatureValue(current, 'felica'), compare: getFeatureValue(compare, 'felica') },
    { section: 'ボディ', label: '顔認証', current: getFeatureValue(current, 'face_unlock'), compare: getFeatureValue(compare, 'face_unlock') },
    { section: 'ボディ', label: '温度センサー', current: getFeatureValue(current, 'temp_sensor'), compare: getFeatureValue(compare, 'temp_sensor') },
    // ディスプレイ
    { section: 'ディスプレイ', label: '画面サイズ', current: current.display || '-', compare: compare.display || '-' },
    { section: 'ディスプレイ', label: '画像解像度', current: current.resolution || '-', compare: compare.resolution || '-' },
    { section: 'ディスプレイ', label: 'リフレッシュレート', current: current.refresh_rate || '-', compare: compare.refresh_rate || '-' },
    // カメラ
    { section: 'カメラ', label: 'メインカメラ', current: current.main_camera || '-', compare: compare.main_camera || '-' },
    { section: 'カメラ', label: '超広角カメラ', current: current.ultrawide_camera || '-', compare: compare.ultrawide_camera || '-' },
    { section: 'カメラ', label: '望遠カメラ', current: current.tele_camera || '-', compare: compare.tele_camera || '-' },
    { section: 'カメラ', label: 'フロントカメラ', current: current.front_camera || '-', compare: compare.front_camera || '-' },
    { section: 'カメラ', label: '光学ズーム', current: current.optical_zoom || '-', compare: compare.optical_zoom || '-' },
    { section: 'カメラ', label: '消しゴムマジック', current: getFeatureValue(current, 'magic_eraser'), compare: getFeatureValue(compare, 'magic_eraser') },
    { section: 'カメラ', label: 'ベストテイク', current: getFeatureValue(current, 'best_take'), compare: getFeatureValue(compare, 'best_take') },
    { section: 'カメラ', label: '編集マジック', current: getFeatureValue(current, 'magic_editor'), compare: getFeatureValue(compare, 'magic_editor') },
    { section: 'カメラ', label: '夜景モード', current: getFeatureValue(current, 'night_sight'), compare: getFeatureValue(compare, 'night_sight') },
    { section: 'カメラ', label: 'リアルトーン', current: getFeatureValue(current, 'real_tone'), compare: getFeatureValue(compare, 'real_tone') },
    { section: 'カメラ', label: '動画ブースト', current: getFeatureValue(current, 'video_boost'), compare: getFeatureValue(compare, 'video_boost') },
    // 充電
    { section: '充電', label: '有線充電', current: current.wired_charging || '-', compare: compare.wired_charging || '-' },
    { section: '充電', label: 'ワイヤレス充電', current: current.wireless_charging || '-', compare: compare.wireless_charging || '-' },
    { section: '充電', label: 'バッテリーシェア', current: getFeatureValue(current, 'reverse_charging'), compare: getFeatureValue(compare, 'reverse_charging') },
    // その他
    { section: 'その他', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: 'その他', label: 'SIM', current: current.sim || '-', compare: compare.sim || '-' },
    { section: 'その他', label: '更新保証', current: current.update_years != null ? `${current.update_years}年` : '-', compare: compare.update_years != null ? `${compare.update_years}年` : '-' },
  ]
}

export default function CompareSelector({ currentModel, allModels, initialCompareId, iosysUrl, fallbackIosysUrl, shopLinks = [] }: Props) {
  return (
    <CompareSelectorBase
      currentModel={currentModel}
      allModels={allModels}
      initialCompareId={initialCompareId}
      iosysUrl={iosysUrl}
      fallbackIosysUrl={fallbackIosysUrl}
      shopLinks={shopLinks}
      imagePath="pixel"
      detailPath="pixel"
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
