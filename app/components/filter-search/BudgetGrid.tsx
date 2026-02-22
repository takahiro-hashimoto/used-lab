'use client'

import type { BudgetOption } from './types'

type Props<K extends string> = {
  options: BudgetOption<K>[]
  selected: K
  onSelect: (key: K) => void
}

export default function BudgetGrid<K extends string>({
  options,
  selected,
  onSelect,
}: Props<K>) {
  return (
    <div className="ifd-budget-grid">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          className={`ifd-budget-card${selected === opt.key ? ' is-active' : ''}`}
          onClick={() => onSelect(opt.key)}
          aria-pressed={selected === opt.key}
        >
          <span className="ifd-budget-card__label">{opt.label}</span>
          <span className="ifd-budget-card__desc">{opt.desc}</span>
        </button>
      ))}
    </div>
  )
}
