import type { ProductShopLink } from '@/lib/types'

/* -------------------------------------------------- */
/*  日付ヘルパー                                       */
/* -------------------------------------------------- */

export function parseDate(date: string | null): Date {
  if (!date) return new Date(0)
  const parts = date.split('/')
  return new Date(parseInt(parts[0]), parseInt(parts[1] || '1') - 1, parseInt(parts[2] || '1'))
}

export function formatDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

/* -------------------------------------------------- */
/*  セル表示コンポーネント                              */
/* -------------------------------------------------- */

import RatingMark from '@/app/components/RatingMark'

export function BoolCell({ value }: { value: boolean }) {
  return value ? <RatingMark mark="◯" size="sm" /> : <RatingMark mark="×" size="sm" />
}

export function getBoolDisplay(val: boolean): React.ReactNode {
  return val ? <RatingMark mark="◯" size="sm" /> : <RatingMark mark="×" size="sm" />
}

export function TextCell({ value }: { value: string }) {
  const normalized = value.replace(/<br\s*\/?>/g, '\n')
  if (normalized.includes('\n')) {
    return <>{normalized.split('\n').map((line, i) => (
      <span key={i}>{i > 0 && <br />}{line}</span>
    ))}</>
  }
  return <>{normalized}</>
}

/* -------------------------------------------------- */
/*  ポート表示（カッコ部分を改行＋小さく表示）           */
/*  "USB-C（Thunderbolt対応）" →  USB-C  \n  (小さく)   */
/* -------------------------------------------------- */

/**
 * 「2基（M2 Proは4基）」を主値とカッコ書きに割る。
 * カッコが無ければ sub は null。
 *
 * PortCell（JSX）と、HTML文字列を組み立てる側（CompareSelector など）の
 * 両方から使うため、分割ロジックだけを切り出している。
 */
export function splitSpecParen(value: string): { main: string; sub: string | null } {
  const match = value.match(/^(.+?)\s*([（(].+[）)])$/)
  return match ? { main: match[1], sub: match[2] } : { main: value, sub: null }
}

export function PortCell({ value }: { value: string }) {
  const { main, sub } = splitSpecParen(value)
  if (!sub) return <TextCell value={value} />
  return (
    <>
      {main}
      <br />
      <small className="spec-compare-table__sub">{sub}</small>
    </>
  )
}

/**
 * ポート・端子系のセル。空欄は「データ未入力」ではなく「非搭載」を意味するので ✕ を出す。
 * （USB-A が無いこと自体が比較したい情報のため）
 */
export function PortSpec({ value }: { value: string | null }) {
  return value ? <PortCell value={value} /> : <BoolCell value={false} />
}

/**
 * 非搭載という概念がない項目（規格名・Ethernet・外部ディスプレイなど）のセル。
 * 空欄は単なる未設定なので '-' を出す。
 */
export function DetailSpec({ value }: { value: string | null }) {
  return value ? <PortCell value={value} /> : <>-</>
}

/* -------------------------------------------------- */
/*  ストレージ範囲フォーマット                          */
/*  "128GB / 256GB / 512GB / 1TB" → "128GB ~ 1TB"     */
/* -------------------------------------------------- */

export function formatStorageRange(strage: string | null): string {
  if (!strage) return '-'
  const parts = strage.split(/\s*[\/,]\s*/).map((s) => s.trim()).filter(Boolean)
  if (parts.length <= 1) return strage
  const first = parts[0]
  const last = parts[parts.length - 1]
  const unitRe = /(GB|TB)$/i
  const firstUnit = first.match(unitRe)?.[1]
  const lastUnit = last.match(unitRe)?.[1]
  // 前後の単位が同じなら先頭の単位を省略（例: 64GB ~ 256GB → 64~ 256GB）
  if (firstUnit && lastUnit && firstUnit.toLowerCase() === lastUnit.toLowerCase()) {
    return `${first.replace(unitRe, '')}~ ${last}`
  }
  return `${first} ~ ${last}`
}

/* -------------------------------------------------- */
/*  ベンチマーク バー                                   */
/* -------------------------------------------------- */

export function BenchBar({ value, maxValue, color }: { value: number; maxValue: number; color: string }) {
  const pct = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0
  return (
    <span
      className="bench-bar"
      style={{
        '--bar-pct': `${pct}%`,
        '--bar-color': color,
      } as React.CSSProperties}
    >
      {value.toLocaleString()}
    </span>
  )
}

/* -------------------------------------------------- */
/*  ショップリンク ヘルパー                             */
/* -------------------------------------------------- */

export function getShopLink(shopLinks: ProductShopLink[], productId: number, shopId: number) {
  return shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)
}

/* -------------------------------------------------- */
/*  DualCompare 用の型                                 */
/* -------------------------------------------------- */

export type CompareCategory<T = unknown> = {
  title: string
  rows: {
    label: string
    get: (m: T) => React.ReactNode
    /**
     * 選択中の2機種がどちらも '-' のとき、この行を隠す。
     * 例: Mac mini 同士を比べるとディスプレイ・解像度・輝度・カメラが全部 NULL で、
     * 「- | -」の行だけが数行並んでしまう。iMac を選べば値が入るのでその時は出る。
     */
    hideIfAllEmpty?: boolean
  }[]
}
