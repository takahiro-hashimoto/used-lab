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

export function BoolCell({ value }: { value: boolean }) {
  if (value) {
    return <span className="m-spec-row__circle" aria-label="あり">○</span>
  }
  return <span className="m-spec-row__cross" aria-label="なし">&times;</span>
}

export function getBoolDisplay(val: boolean): React.ReactNode {
  if (val) return <span className="m-spec-row__circle" aria-label="あり">○</span>
  return <span className="m-spec-row__cross" aria-label="なし">&times;</span>
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

export function PortCell({ value }: { value: string }) {
  const match = value.match(/^(.+?)\s*([（(].+[）)])$/)
  if (!match) return <TextCell value={value} />
  return (
    <>
      {match[1]}
      <br />
      <small className="spec-compare-table__sub">{match[2]}</small>
    </>
  )
}

/* -------------------------------------------------- */
/*  ストレージ範囲フォーマット                          */
/*  "128GB / 256GB / 512GB / 1TB" → "128GB ~ 1TB"     */
/* -------------------------------------------------- */

export function formatStorageRange(strage: string | null): string {
  if (!strage) return '-'
  const parts = strage.split(/\s*[\/,]\s*/).map((s) => s.trim()).filter(Boolean)
  if (parts.length <= 1) return strage
  return `${parts[0]} ~ ${parts[parts.length - 1]}`
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
  rows: { label: string; get: (m: T) => React.ReactNode }[]
}
