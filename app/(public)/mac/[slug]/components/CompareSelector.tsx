'use client'

import CompareSelectorBase from '@/app/components/CompareSelector'
import type { MacModel, ProductShopLink } from '@/lib/types'
import { formatReleaseDate } from '@/lib/utils/shared-helpers'
import { splitSpecParen } from '@/app/components/spec-table-utils'

type Props = {
  currentModel: MacModel
  allModels: MacModel[]
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

/** 「2基（M2 Proは4基）」→ 主値を1行目、カッコ書きを小さく2行目に落とす。
 *  CompareSelectorBase は文字列を受け取る作りなので、JSX の PortCell ではなく
 *  分割ロジック（splitSpecParen）だけを共有している */
function splitParen(v: string): string {
  const { main, sub } = splitSpecParen(v)
  return sub ? `${main}<br /><small>${sub}</small>` : v
}

/** ポート項目。空欄は未入力ではなく非搭載なので ✕ */
function portValue(v: string | null): string {
  return v ? splitParen(v) : '×'
}

/** 非搭載という概念がない項目（規格名・Ethernet・外部ディスプレイ） */
function detailValue(v: string | null): string {
  return v ? splitParen(v) : '-'
}

function buildCompareRows(current: MacModel, compare: MacModel): CompareRow[] {
  // 両方とも '-' の行は落とす。
  // iMac 以外はディスプレイ・カメラ・解像度が全部 NULL なので、
  // Mac mini 同士の比較だと「- | -」の行だけが数行並んでしまう。
  // iMac を相手に選んだときは値が入るので、その場合は自動的に出る。
  return buildAllRows(current, compare).filter((r) => !(r.current === '-' && r.compare === '-'))
}

function buildAllRows(current: MacModel, compare: MacModel): CompareRow[] {
  return [
    // 基本仕様
    { section: '基本仕様', label: 'サイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: '基本仕様', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: '基本仕様', label: '同梱物', current: current.included_accessories || '-', compare: compare.included_accessories || '-' },
    { section: '基本仕様', label: 'ストレージ', current: current.strage || '-', compare: compare.strage || '-' },
    { section: '基本仕様', label: 'カラー', current: (current.color || '-').replace(/\s*\/\s*/g, '<br />'), compare: (compare.color || '-').replace(/\s*\/\s*/g, '<br />') },
    // 処理性能
    { section: '処理性能', label: 'CPU', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: '処理性能', label: 'GPUコア', current: current.gpu || '-', compare: compare.gpu || '-' },
    { section: '処理性能', label: 'メモリ', current: current.ram || '-', compare: compare.ram || '-' },
    // ディスプレイ
    { section: 'ディスプレイ', label: 'ディスプレイ', current: current.display || '-', compare: compare.display || '-' },
    { section: 'ディスプレイ', label: '解像度', current: current.resolution || '-', compare: compare.resolution || '-' },
    { section: 'ディスプレイ', label: '輝度', current: current.luminance || '-', compare: compare.luminance || '-' },
    { section: 'ディスプレイ', label: '内蔵ディスプレイ', current: getBoolValue(current.display_builtin), compare: getBoolValue(compare.display_builtin) },
    { section: 'ディスプレイ', label: '外部ディスプレイ', current: detailValue(current.external_display), compare: detailValue(compare.external_display) },
    // その他
    { section: 'その他', label: 'カメラ', current: current.camera || '-', compare: compare.camera || '-' },
    // ポートは全文を1行に入れず、種類ごとに「何基あるか」だけを並べる
    { section: 'その他', label: 'Thunderbolt', current: portValue(current.thunderbolt), compare: portValue(compare.thunderbolt) },
    { section: 'その他', label: 'Thunderboltの規格', current: detailValue(current.thunderbolt_gen), compare: detailValue(compare.thunderbolt_gen) },
    { section: 'その他', label: 'USB-C', current: portValue(current.usb_c), compare: portValue(compare.usb_c) },
    { section: 'その他', label: 'USB-A', current: portValue(current.usb_a), compare: portValue(compare.usb_a) },
    { section: 'その他', label: 'SDカードスロット', current: getBoolValue(current.slot), compare: getBoolValue(compare.slot) },
    { section: 'その他', label: 'HDMIポート', current: getBoolValue(current.hdmi), compare: getBoolValue(compare.hdmi) },
    { section: 'その他', label: 'ヘッドフォンジャック', current: getBoolValue(current.headphone), compare: getBoolValue(compare.headphone) },
    { section: 'その他', label: 'Ethernet', current: detailValue(current.ethernet), compare: detailValue(compare.ethernet) },
    { section: 'その他', label: 'スピーカー', current: current.speaker || '-', compare: compare.speaker || '-' },
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
      imagePath="mac"
      detailPath="mac"
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
