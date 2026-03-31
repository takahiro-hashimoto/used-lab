'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSearch() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = (inputRef.current?.value ?? '').trim()
    if (!q) return
    router.push(`/search/?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="hero-search">
      <i className="fa-solid fa-magnifying-glass hero-search__icon" aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        className="hero-search__input"
        placeholder="キーワードで記事を検索..."
      />
      <button type="submit" className="hero-search__btn">検索</button>
    </form>
  )
}
