/**
 * 全スペック比較テーブル（m-tableベース）
 * PC: 3カラムテーブル / SP: 項目名ヘッダー + 2カラム値
 */

import type { IPhoneModel } from '@/lib/types'
import type { SpecDefinition } from './spec-definitions'
import { compareSpec } from './helpers'
import s from './SpecTable.module.css'

type Props = {
  specs: SpecDefinition[]
  modelL: IPhoneModel
  modelR: IPhoneModel
  nameL: string
  nameR: string
}

/** 表示値をリッチに変換 */
function formatDisplay(display: string, key: string): React.ReactNode {
  if (key === 'color' && display.includes('/')) {
    return display.split('/').map((c, i) => (
      <span key={i} style={{ display: 'block' }}>{c.trim()}</span>
    ))
  }
  if (display.includes('<br')) {
    return display.split(/<br\s*\/?>/).map((part, i) => (
      <span key={i} style={{ display: 'block' }}>{part.trim()}</span>
    ))
  }
  if (display === '◎') return <span className="text-positive">◎</span>
  if (display === '✕') return <span className="text-negative">✕</span>
  return display
}

const winCellStyle: React.CSSProperties = {
  color: 'var(--color-primary)',
  fontWeight: 700,
}

export default function SpecTable({ specs, modelL, modelR, nameL, nameR }: Props) {
  const results = specs
    .map((spec) => ({ spec, result: compareSpec(spec, modelL, modelR) }))
    .filter((item): item is { spec: SpecDefinition; result: NonNullable<ReturnType<typeof compareSpec>> } => item.result != null)

  if (results.length === 0) return null

  return (
    <>
      {/* PC版: 通常テーブル */}
      <div className={`m-card m-card--shadow ${s.pc}`} style={{ padding: 0, overflow: 'visible' }}>
        <div className="m-table-scroll">
          <table className="m-table m-table--center">
            <thead>
              <tr>
                <th scope="col" style={{ position: 'static' }}>項目</th>
                <th scope="col" style={{ position: 'static' }}>{nameL}</th>
                <th scope="col" style={{ position: 'static' }}>{nameR}</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ spec, result }) => (
                <tr key={spec.key}>
                  <th scope="row">{spec.label}</th>
                  <td style={result.left.isWin ? winCellStyle : undefined}>
                    {formatDisplay(result.left.display, spec.key)}
                    {result.left.badge && <small>{result.left.badge}</small>}
                  </td>
                  <td style={result.right.isWin ? winCellStyle : undefined}>
                    {formatDisplay(result.right.display, spec.key)}
                    {result.right.badge && <small>{result.right.badge}</small>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SP版: カード風レイアウト */}
      <div className={`m-card m-card--shadow ${s.sp}`} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--color-bg-dark)', color: 'var(--color-text-inverse)', fontWeight: 700, fontSize: 'var(--font-size-sm)', borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0' }}>
          <div style={{ textAlign: 'center', padding: 'var(--space-xs) var(--space-md)' }}>{nameL}</div>
          <div style={{ textAlign: 'center', padding: 'var(--space-xs) var(--space-md)' }}>{nameR}</div>
        </div>
        {results.map(({ spec, result }) => (
          <div key={spec.key} className={s.spRow}>
            <div className={s.spLabel}>{spec.label}</div>
            <div className={s.spValues}>
              <div className={s.spCell} style={result.left.isWin ? winCellStyle : undefined}>
                {formatDisplay(result.left.display, spec.key)}
                {result.left.badge && <small>{result.left.badge}</small>}
              </div>
              <div className={s.spCell} style={result.right.isWin ? winCellStyle : undefined}>
                {formatDisplay(result.right.display, spec.key)}
                {result.right.badge && <small>{result.right.badge}</small>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
