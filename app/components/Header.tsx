'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/iphone', label: '中古iPhone' },
  { href: '/ipad', label: '中古iPad' },
  { href: '/watch', label: '中古Apple Watch' },
  { href: '/macbook', label: '中古MacBook' },
  { href: '/airpods', label: '中古AirPods' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/about', label: '運営者情報' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const isLocked = isMenuOpen || isSearchOpen
    if (isLocked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isMenuOpen, isSearchOpen])

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [isSearchOpen])

  // Escキーでモーダルを閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) setIsSearchOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    setIsSearchOpen(false)
    setIsMenuOpen(false)
    setSearchQuery('')
    router.push(`/search/?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="m-logo">
          <Image
            src="/images/content/photo/logo-used-lab.webp"
            alt="ユーズドラボ"
            width={180}
            height={30}
            priority
          />
        </Link>

        <nav className="global-nav" id="globalNav" aria-label="メインナビゲーション">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="nav-item">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="header-search-link"
            onClick={() => setIsSearchOpen(true)}
            title="記事を検索"
            aria-label="記事を検索"
            type="button"
          >
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>
          {process.env.NODE_ENV === 'development' && (
            <Link href="/admin" className="header-admin-link" title="管理画面">
              <i className="fa-solid fa-gear" aria-hidden="true"></i>
            </Link>
          )}
          <button
            className={`menu-toggle${isMenuOpen ? ' is-active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
            aria-expanded={isMenuOpen}
            aria-controls="mobileMenu"
          >
            <span className="hamburger" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* PC検索モーダル（portalでbody直下に描画） */}
      {isSearchOpen && createPortal(
        <div className="search-modal" onClick={() => setIsSearchOpen(false)}>
          <div className="search-modal__inner" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="search-modal__form">
              <i className="fa-solid fa-magnifying-glass search-modal__icon" aria-hidden="true"></i>
              <input
                ref={searchInputRef}
                type="search"
                className="search-modal__input"
                placeholder="キーワードで記事を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" className="search-modal__close" onClick={() => setIsSearchOpen(false)} aria-label="閉じる">
                <span className="search-modal__esc">ESC</span>
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* SPメニュー */}
      <nav
        className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`}
        id="mobileMenu"
        aria-label="モバイルナビゲーション"
        hidden={!isMenuOpen}
      >
        <button
          className="mobile-menu__close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="メニューを閉じる"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>

        <ul className="mobile-nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
