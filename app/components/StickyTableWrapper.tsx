'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * テーブルをラップして、thead が sticky 状態になったら
 * .is-stuck クラスを付与し shadow を表示するコンポーネント
 */
export default function StickyTableWrapper({ children, className = '' }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    const wrapper = wrapperRef.current
    if (!sentinel || !wrapper) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        wrapper.classList.toggle('is-stuck', !entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={sentinelRef} style={{ height: 1, marginBottom: -1 }} />
      {children}
    </div>
  )
}
