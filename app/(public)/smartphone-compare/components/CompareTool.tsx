'use client'

import { getBoolDisplay, TextCell } from '@/app/components/spec-table-utils'
import DualCompareBase from '@/app/components/DualCompare'
import type { CompareCategory } from '@/app/components/spec-table-utils'
import type { CrossCompareModel } from '../compare-lib'

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

/** iPhone・Pixel・Galaxy 横断の共通スペックグループ（ブランド固有機能行は含めない） */
function buildCategories(): CompareCategory<CrossCompareModel>[] {
  const text = (getter: (m: CrossCompareModel) => string | null) => ({
    get: (m: CrossCompareModel) => {
      const val = getter(m)
      if (!val) return '-'
      return <TextCell value={val} />
    },
  })
  const bool = (getter: (m: CrossCompareModel) => boolean) => ({
    get: (m: CrossCompareModel) => getBoolDisplay(getter(m)),
  })

  return [
    {
      title: '価格・パフォーマンス',
      rows: [
        { label: '中古相場', get: (m: CrossCompareModel) => (m.price != null ? <TextCell value={`¥${m.price.toLocaleString()}〜`} /> : '-') },
        { label: 'AnTuTu 総合', get: (m: CrossCompareModel) => (m.antutuTotal != null ? m.antutuTotal.toLocaleString() : '-') },
        { label: 'Geekbench シングル', get: (m: CrossCompareModel) => (m.scoreSingle != null ? m.scoreSingle.toLocaleString() : '-') },
        { label: 'Geekbench マルチ', get: (m: CrossCompareModel) => (m.scoreMulti != null ? m.scoreMulti.toLocaleString() : '-') },
      ],
    },
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
        { label: 'RAM', ...text((m) => m.ram) },
        { label: 'ストレージ容量', get: (m: CrossCompareModel) => {
          const val = m.strage?.replace(/ \/ /g, '\n')
          if (!val) return '-'
          return <TextCell value={val} />
        }},
        { label: 'バッテリー容量', ...text((m) => m.battery) },
        { label: 'バッテリー持ち', ...text((m) => m.battery_life) },
        { label: '有線充電', ...text((m) => m.wired_charging) },
        { label: 'ワイヤレス充電', ...text((m) => m.wireless_charging) },
        { label: 'バッテリーシェア', ...bool((m) => m.reverse_charging) },
        { label: 'おサイフケータイ', ...bool((m) => m.felica) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: '画面サイズ', ...text((m) => m.display) },
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
      ],
    },
    {
      title: 'その他',
      rows: [
        { label: '発売日', get: (m: CrossCompareModel) => formatReleaseDate(m.date) },
        { label: 'コネクター', ...text((m) => m.port) },
        { label: 'SIM', ...text((m) => m.sim) },
        { label: 'サポート終了予定', get: (m: CrossCompareModel) => formatSupportUntil(m.support_until) },
      ],
    },
  ]
}

export default function CompareTool({ models }: { models: CrossCompareModel[] }) {
  // iPhone 系 × Galaxy 系がクロスで出る初期値を選ぶ（id オフセットで判定）
  const iphoneIdx = models.findIndex((m) => m.id < 100_000)
  const galaxyIdx = models.findIndex((m) => m.id >= 200_000)
  const defaultIndexA = iphoneIdx >= 0 ? iphoneIdx : 0
  const defaultIndexB =
    galaxyIdx >= 0 && galaxyIdx !== defaultIndexA
      ? galaxyIdx
      : (models.length > 1 ? (defaultIndexA === 0 ? 1 : 0) : 0)

  return (
    <DualCompareBase
      models={models}
      shopLinks={[]}
      productName="スマホ"
      imagePath=""
      detailPath=""
      categories={buildCategories()}
      defaultIndexA={defaultIndexA}
      defaultIndexB={defaultIndexB}
      getOptionLabel={(m) => m.model}
    />
  )
}
