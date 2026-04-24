'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function ContinuousAside({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const aside = ref.current
    if (!aside) return
    const sections = document.querySelector('main .l-sections')
    if (!sections) return
    if (sections.children.length % 2 === 1) {
      aside.classList.add('l-sections--flip')
    }
  }, [])

  return (
    <aside ref={ref} className="l-sections deferred-render deferred-render--article-footer">
      {children}
    </aside>
  )
}
