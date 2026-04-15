'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
type NavItem = {
  href: string
  label: string
  children?: { href: string; label: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/iphone/', label: '中古iPhone',
    children: [
      { href: '/iphone/', label: '中古iPhoneの選び方ガイド' },
      { href: '/iphone/recommend/', label: '中古iPhoneおすすめ機種' },
      { href: '/iphone/filter-search/', label: 'iPhone機種診断ツール' },
      { href: '/iphone/price-info/', label: '中古iPhoneの相場価格' },
      { href: '/iphone/iphone-spec-table/', label: 'iPhoneスペック比較表' },
      { href: '/iphone/used-iphone-support/', label: 'iPhoneのサポート期間・寿命' },
      { href: '/iphone/iphone-shop/', label: '中古iPhoneの購入先比較' },
      { href: '/iphone/iphone-camera/', label: 'iPhoneカメラ性能比較' },
      { href: '/iphone/battery-compare/', label: 'iPhoneバッテリー容量比較' },
      { href: '/iphone/benchmark/', label: 'iPhoneベンチマーク比較' },
    ],
  },
  {
    href: '/ipad/', label: '中古iPad',
    children: [
      { href: '/ipad/', label: '中古iPadの選び方ガイド' },
      { href: '/ipad/recommend/', label: '中古iPadおすすめ機種' },
      { href: '/ipad/ipad-filter-search/', label: 'iPad機種診断ツール' },
      { href: '/ipad/ipad-price-info/', label: '中古iPadの相場価格' },
      { href: '/ipad/apple-pencil-compare/', label: 'Apple Pencil互換性比較' },
      { href: '/ipad/wifi-cellular/', label: 'Wi-Fiとセルラーの違い' },
      { href: '/ipad/ipad-spec-table/', label: 'iPadスペック比較表' },
      { href: '/ipad/used-ipad-support/', label: 'iPadのサポート期間・寿命' },
      { href: '/ipad/ipad-shop/', label: '中古iPadの購入先比較' },
      { href: '/ipad/benchmark/', label: 'iPadベンチマーク比較' },
    ],
  },
  {
    href: '/watch/', label: '中古Apple Watch',
    children: [
      { href: '/watch/', label: '中古Apple Watch選び方ガイド' },
      { href: '/watch/recommend/', label: '中古Apple Watchおすすめ機種' },
      { href: '/watch/watch-filter-search/', label: 'Apple Watch機種診断ツール' },
      { href: '/watch/watch-price-info/', label: '中古Apple Watchの相場価格' },
      { href: '/watch/gps-cellular-compare/', label: 'GPSとセルラーの違い' },
      { href: '/watch/watch-spec-table/', label: 'Apple Watchスペック比較表' },
      { href: '/watch/used-watch-support/', label: 'Apple Watchのサポート期間' },
      { href: '/watch/watch-shop/', label: '中古Apple Watchの購入先比較' },
    ],
  },
  {
    href: '/macbook/', label: '中古MacBook',
    children: [
      { href: '/macbook/', label: '中古MacBookの選び方ガイド' },
      { href: '/macbook/recommend/', label: '中古MacBookおすすめ機種' },
      { href: '/macbook/price-info/', label: '中古MacBookの相場価格' },
      { href: '/macbook/air-pro-compare/', label: 'MacBook Air vs Pro比較' },
      { href: '/macbook/macbook-spec-table/', label: 'MacBookスペック比較表' },
      { href: '/macbook/benchmark/', label: 'MacBookベンチマーク比較' },
      { href: '/macbook/used-macbook-support/', label: 'MacBookのサポート期間' },
      { href: '/macbook/macbook-shop/', label: '中古MacBookの購入先比較' },
    ],
  },
  {
    href: '/airpods/', label: '中古AirPods',
    children: [
      { href: '/airpods/', label: '中古AirPodsの選び方ガイド' },
      { href: '/airpods/recommend/', label: '中古AirPodsおすすめ機種' },
      { href: '/airpods/price-info/', label: '中古AirPodsの相場価格' },
      { href: '/airpods/used-airpods-attention/', label: '中古AirPodsの注意点' },
    ],
  },
  { href: '/contact/', label: 'お問い合わせ' },
  { href: '/profile/', label: '運営者情報' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [menuTop, setMenuTop] = useState<number>(56)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => { setIsMounted(true) }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setMenuTop(entries[0].borderBoxSize[0].blockSize)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Link href="/" className="m-logo">
          <Image
            src="/images/content/photo/logo-used-lab.webp"
            alt="ユーズドラボ"
            width={180}
            height={30}
            priority
            sizes="(max-width: 768px) 100vw, 360px"
          />
        </Link>

        <nav className="global-nav" id="globalNav" aria-label="メインナビゲーション">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.href}
                className={`nav-item${item.children ? ' nav-item--has-dropdown' : ''}${openDropdown === item.href ? ' nav-item--open' : ''}`}
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href={item.href}>{item.label}</Link>
                {item.children && (
                  <div className="nav-dropdown">
                    <ul className="nav-dropdown__list">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="nav-dropdown__link"
                            onClick={() => setOpenDropdown(null)}
                          >{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            <Link href="/admin/" className="header-admin-link" title="管理画面">
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

      {/* SPメニュー（portalでbody直下に描画） */}
      {isMounted && createPortal(
        <>
          <div
            className={`mobile-menu-backdrop${isMenuOpen ? ' is-open' : ''}`}
            onClick={() => setIsMenuOpen(false)}
            style={{ top: menuTop }}
          />
          <nav
            className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`}
            id="mobileMenu"
            aria-label="モバイルナビゲーション"
            style={{ top: menuTop }}
          >
            <ul className="mobile-nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className={item.children ? 'mobile-nav-accordion' : ''}>
                  {item.children ? (
                    <>
                      <button
                        className={`mobile-nav-accordion__trigger${openAccordion === item.href ? ' is-open' : ''}`}
                        onClick={() => setOpenAccordion(openAccordion === item.href ? null : item.href)}
                        aria-expanded={openAccordion === item.href}
                      >
                        {item.label}
                        <i className="fa-solid fa-chevron-down mobile-nav-accordion__icon" aria-hidden="true"></i>
                      </button>
                      <ul className={`mobile-nav-accordion__panel${openAccordion === item.href ? ' is-open' : ''}`}>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} onClick={() => setIsMenuOpen(false)}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mobile-menu__about">
              <p className="mobile-menu__about-heading">運営者情報</p>
              <div className="mobile-menu__about-body">
                <div className="mobile-menu__about-avatar">
                  <Image
                    src="/images/content/thumbnail/my-icon.webp"
                    alt="タカヒロ"
                    width={80}
                    height={80}
                    className="about-profile-img"
                  />
                  <p className="mobile-menu__about-name">タカヒロ</p>
                </div>
                <p className="mobile-menu__about-desc">都内のIT企業でWebディレクターとして働く傍ら、メディア運営を行っています。中古Apple製品選びに役立つ情報を発信しています。</p>
                <Link href="/profile/" className="mobile-menu__about-link" onClick={() => setIsMenuOpen(false)}>
                  運営者情報を見る <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </Link>
                <div className="mobile-menu__about-icons">
                  <a href="https://twitter.com/takahiro_mono" target="_blank" rel="noopener noreferrer" aria-label="Twitter" title="Twitter">
                    <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
                  </a>
                  <a href="https://www.instagram.com/takahiro_mono" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                    <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a href="https://www.youtube.com/@takahiro_mono" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
                    <i className="fa-brands fa-youtube" aria-hidden="true"></i>
                  </a>
                  <a href="https://note.com/takahiro_mono" target="_blank" rel="noopener noreferrer" aria-label="note" title="note">
                    <i className="fa-solid fa-pen-nib" aria-hidden="true"></i>
                  </a>
                  <a href="/contact/" target="_blank" rel="noopener noreferrer" aria-label="お問い合わせ" title="お問い合わせ">
                    <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </>,
        document.body
      )}
    </header>
  )
}
