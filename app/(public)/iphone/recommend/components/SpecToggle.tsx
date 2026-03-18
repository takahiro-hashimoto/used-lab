'use client'

import { useState } from 'react'

type Props = {
  children: React.ReactNode
}

export default function SpecToggle({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="recommend-card__full-specs">
      <button
        type="button"
        className="recommend-card__specs-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        {isOpen ? 'スペック表を閉じる' : 'スペック表を全部見る'}
        {' '}
        <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} aria-hidden="true"></i>
      </button>
      {isOpen && (
        <div className="recommend-card__specs-content">
          {children}
        </div>
      )}
    </div>
  )
}
