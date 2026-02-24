'use client'

import type { PurposeOption } from './types'

type Props<K extends string> = {
  options: PurposeOption<K>[]
  selected: Set<K>
  onToggle: (key: K) => void
}

export default function PurposeGrid<K extends string>({
  options,
  selected,
  onToggle,
}: Props<K>) {
  return (
    <div className="ifd-purpose-grid">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          className={`ifd-purpose-card m-selectable-card${selected.has(opt.key) ? ' is-active' : ''}`}
          onClick={() => onToggle(opt.key)}
          aria-pressed={selected.has(opt.key)}
        >
          <div className="ifd-purpose-card__icon m-icon-box m-icon-box--44">
            <i className={`fa-solid ${opt.icon}`} aria-hidden="true"></i>
          </div>
          <div className="ifd-purpose-card__body">
            <span className="ifd-purpose-card__label">{opt.label}</span>
            <span className="ifd-purpose-card__desc">{opt.desc}</span>
          </div>
          <div className="ifd-purpose-card__check" aria-hidden="true">
            <i className={`fa-solid ${selected.has(opt.key) ? 'fa-circle-check' : 'fa-circle'}`}></i>
          </div>
        </button>
      ))}
    </div>
  )
}
