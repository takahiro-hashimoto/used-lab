'use client'

type Props = {
  count: number
  activeFilterCount: number
  onReset: () => void
}

export default function ResultsHeader({ count, activeFilterCount, onReset }: Props) {
  return (
    <div className="ifd-results-header">
      <h2 className="m-section-heading m-section-heading--lg" id="heading-results">
        診断結果
      </h2>
      <div className="ifd-results-meta">
        <span className="ifd-results-count">
          <strong>{count}</strong>件の機種が見つかりました
        </span>
        {activeFilterCount > 0 && (
          <button type="button" className="ifd-reset-btn" onClick={onReset}>
            <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> 条件をリセット
          </button>
        )}
      </div>
    </div>
  )
}
