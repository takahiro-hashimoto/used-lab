import React from 'react'

export function BoolValue({ value }: { value: boolean }) {
  return value
    ? <span className="m-rating__icon m-rating__icon--good" aria-label="あり">&#9675;</span>
    : <span className="m-spec-row__cross" aria-label="なし">&times;</span>
}

export type SpecItem = { label: string; value: React.ReactNode }

/** 文字列中の <br> を改行要素に変換 */
function renderValue(value: React.ReactNode): React.ReactNode {
  if (typeof value !== 'string') return value
  if (!value.includes('<br>') && !value.includes('<br/>') && !value.includes('<br />')) return value
  const parts = value.split(/<br\s*\/?>/i)
  return parts.map((part, i) => (
    <span key={i}>{i > 0 && <br />}{part}</span>
  ))
}

/** 2列ペアで行を生成。items の隣接2つを1行(4セル)にまとめる */
export function SpecRows({ items }: { items: SpecItem[] }) {
  const filtered = items.filter((item) => item.value !== null && item.value !== undefined)
  const rows: React.ReactNode[] = []
  for (let i = 0; i < filtered.length; i += 2) {
    const a = filtered[i]
    const b = filtered[i + 1]
    rows.push(
      <tr key={a.label}>
        <th>{a.label}</th>
        <td>{renderValue(a.value)}</td>
        {b ? <th>{b.label}</th> : <th></th>}
        {b ? <td>{renderValue(b.value)}</td> : <td></td>}
      </tr>
    )
  }
  return <>{rows}</>
}

export function SpecCategory({ title }: { title: string }) {
  return (
    <tr>
      <td colSpan={4} className="compare-category-cell">
        <div className="compare-category">
          <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {title}
        </div>
      </td>
    </tr>
  )
}
