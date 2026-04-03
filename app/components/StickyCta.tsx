'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useStickyCtaContext } from './StickyCtaContext'

const DEFAULT_URL =
  'https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2F'

const CATEGORY_LABELS: Record<string, string> = {
  iphone: 'イオシスで中古iPhoneを探す',
  ipad: 'イオシスで中古iPadを探す',
  watch: 'イオシスで中古Apple Watchを探す',
  macbook: 'イオシスで中古MacBookを探す',
  airpods: 'イオシスで中古AirPodsを探す',
}

function getCategoryFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/(iphone|ipad|watch|macbook|airpods)/)
  return match ? match[1] : null
}

export default function StickyCta() {
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { categoryUrls, overrideUrl } = useStickyCtaContext()

  const category = getCategoryFromPath(pathname)
  const href = overrideUrl || (category && categoryUrls[category]) || DEFAULT_URL
  const label = overrideUrl
    ? 'イオシスで最安値の価格を見る'
    : (category && CATEGORY_LABELS[category]) || 'イオシスで中古Apple製品を探す'

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handleChange)

    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      mq.removeEventListener('change', handleChange)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!isMobile) return null

  return (
    <div
      role="complementary"
      aria-label="購入リンク"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        padding: '0.5rem 1rem',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--color-border-light)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '0.75rem',
          background: 'var(--color-primary)',
          color: '#fff',
          fontSize: '0.875rem',
          fontWeight: 700,
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
        {label}
      </a>
    </div>
  )
}
