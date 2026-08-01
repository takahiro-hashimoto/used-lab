'use client'

import CompareSelectorBase from '@/app/components/CompareSelector'
import type { GalaxyModel, ProductShopLink } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/shared-helpers'

type Props = {
  currentModel: GalaxyModel
  allModels: GalaxyModel[]
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

function boolValue(v: boolean): string {
  return v ? '◯' : '×'
}

function textValue(v: string | null): string {
  if (v == null || v === '') return '-'
  return String(v).replace(/<br\s*\/?>/g, '\n')
}

function buildCompareRows(current: GalaxyModel, compare: GalaxyModel): CompareRow[] {
  return [
    // シリーズ・型番
    { section: 'シリーズ・型番', label: 'シリーズ', current: textValue(current.series), compare: textValue(compare.series) },
    { section: 'シリーズ・型番', label: '日本版型番', current: textValue(current.model_number), compare: textValue(compare.model_number) },
    // サイズ・重量
    { section: 'サイズ・重量', label: 'サイズ', current: textValue(current.size), compare: textValue(compare.size) },
    { section: 'サイズ・重量', label: '重量', current: textValue(current.weight), compare: textValue(compare.weight) },
    // ボディ
    { section: 'ボディ', label: 'SoC（チップ）', current: textValue(current.cpu), compare: textValue(compare.cpu) },
    { section: 'ボディ', label: 'RAM', current: textValue(current.ram), compare: textValue(compare.ram) },
    { section: 'ボディ', label: 'カラー', current: textValue(current.color?.replace(/ \/ /g, '\n') ?? null), compare: textValue(compare.color?.replace(/ \/ /g, '\n') ?? null) },
    { section: 'ボディ', label: 'ストレージ容量', current: textValue(current.strage?.replace(/ \/ /g, '\n') ?? null), compare: textValue(compare.strage?.replace(/ \/ /g, '\n') ?? null) },
    { section: 'ボディ', label: 'microSD', current: boolValue(current.microsd), compare: boolValue(compare.microsd) },
    { section: 'ボディ', label: 'バッテリー容量', current: textValue(current.battery), compare: textValue(compare.battery) },
    { section: 'ボディ', label: '有線充電', current: textValue(current.wired_charging), compare: textValue(compare.wired_charging) },
    { section: 'ボディ', label: 'ワイヤレス充電', current: textValue(current.wireless_charging), compare: textValue(compare.wireless_charging) },
    { section: 'ボディ', label: 'Wireless PowerShare', current: boolValue(current.reverse_charging), compare: boolValue(compare.reverse_charging) },
    { section: 'ボディ', label: '充電端子', current: textValue(current.port), compare: textValue(compare.port) },
    { section: 'ボディ', label: '防水防塵', current: textValue(current.water_resistance), compare: textValue(compare.water_resistance) },
    { section: 'ボディ', label: 'おサイフケータイ', current: boolValue(current.felica), compare: boolValue(compare.felica) },
    // ディスプレイ
    { section: 'ディスプレイ', label: '画面サイズ', current: textValue(current.display), compare: textValue(compare.display) },
    { section: 'ディスプレイ', label: '画像解像度', current: textValue(current.resolution), compare: textValue(compare.resolution) },
    { section: 'ディスプレイ', label: 'リフレッシュレート', current: textValue(current.refresh_rate), compare: textValue(compare.refresh_rate) },
    { section: 'ディスプレイ', label: 'カバー画面', current: textValue(current.cover_display), compare: textValue(compare.cover_display) },
    // カメラ
    { section: 'カメラ', label: 'メインカメラ', current: textValue(current.main_camera), compare: textValue(compare.main_camera) },
    { section: 'カメラ', label: '超広角カメラ', current: textValue(current.ultrawide_camera), compare: textValue(compare.ultrawide_camera) },
    { section: 'カメラ', label: '望遠カメラ', current: textValue(current.tele_camera), compare: textValue(compare.tele_camera) },
    { section: 'カメラ', label: '光学ズーム', current: textValue(current.optical_zoom), compare: textValue(compare.optical_zoom) },
    { section: 'カメラ', label: 'フロントカメラ', current: textValue(current.front_camera), compare: textValue(compare.front_camera) },
    { section: 'カメラ', label: 'ナイトモード', current: boolValue(current.night_mode), compare: boolValue(compare.night_mode) },
    // Galaxy 機能
    { section: 'Galaxy機能', label: 'Galaxy AI', current: boolValue(current.galaxy_ai), compare: boolValue(compare.galaxy_ai) },
    { section: 'Galaxy機能', label: 'かこって検索', current: boolValue(current.circle_to_search), compare: boolValue(compare.circle_to_search) },
    { section: 'Galaxy機能', label: 'オブジェクト消去', current: boolValue(current.object_eraser), compare: boolValue(compare.object_eraser) },
    { section: 'Galaxy機能', label: 'S Pen対応', current: boolValue(current.s_pen), compare: boolValue(compare.s_pen) },
    { section: 'Galaxy機能', label: 'Samsung DeX', current: boolValue(current.dex), compare: boolValue(compare.dex) },
    // その他
    { section: 'その他', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: 'その他', label: 'SIM', current: textValue(current.sim), compare: textValue(compare.sim) },
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
      imagePath="galaxy"
      detailPath="galaxy"
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
