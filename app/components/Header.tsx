'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="m-logo">
          <Image
            src="/images/content/logo-used-lab.webp"
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
            className={`menu-toggle${isMenuOpen ? ' is-active' : ''}`}
            onClick={toggleMenu}
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

      <nav
        className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`}
        id="mobileMenu"
        aria-label="モバイルナビゲーション"
        hidden={!isMenuOpen}
      >
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
