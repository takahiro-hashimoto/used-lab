'use client'

import { useEffect } from 'react'

/**
 * ページ内アンカーリンク（href="#..."）のクリック時のみスムーズスクロールを適用。
 * html { scroll-behavior: smooth } を使わないことで、
 * Next.js のページ遷移時に発生する意図しないスクロールアニメーションを防ぐ。
 */
export default function SmoothScroll() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return

      const id = anchor.getAttribute('href')
      if (!id || id === '#') return

      const target = document.querySelector(id)
      if (!target) return

      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })

      // URL のハッシュを更新（履歴に残す）
      history.pushState(null, '', id)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
