'use client'

type Props = {
  count: number
}

export default function StickyBar({ count }: Props) {
  return (
    <div className="ifd-sticky-bar" aria-live="polite">
      <div className="l-container">
        <div className="ifd-sticky-bar__inner">
          <span className="ifd-sticky-bar__count">
            <i className="fa-solid fa-check-circle" aria-hidden="true"></i>
            <strong>{count}</strong>件ヒット
          </span>
          <a href="#ifd-results" className="m-btn m-btn--primary m-btn--sm">
            結果を見る <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
