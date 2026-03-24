'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** ドメイン → ショップキー マッピング */
const DOMAIN_TO_SHOP: Record<string, string> = {
  'iosys.co.jp': 'iosys',
  'nicosuma.com': 'nicosma',
  'geo-online.co.jp': 'geo',
  'sofmap.com': 'recore',
  'janpara.co.jp': 'janpara',
  'amazon.co.jp': 'amazon',
  'amzn.to': 'amazon',
  'amzn.asia': 'amazon',
  'rakuten.co.jp': 'rakuten',
  'shopping.yahoo.co.jp': 'yahoo',
  'apple.com': 'apple',
  'mercari.com': 'mercari',
  'jp.mercari.com': 'mercari',
  'fril.jp': 'rakuma',
}

/** URL からショップキーを解決 */
function resolveShopKey(href: string): string | null {
  try {
    const url = new URL(href)

    // A8.net リダイレクト
    if (url.hostname === 'px.a8.net') {
      const redirect = url.searchParams.get('a8ejpredirect')
      if (redirect) return resolveShopKey(decodeURIComponent(redirect))
      return 'a8'
    }

    // Rakuten アフィリエイト
    if (url.hostname === 'hb.afl.rakuten.co.jp') return 'rakuten'

    // LinkSynergy (リコレ / ソフマップ)
    if (url.hostname === 'click.linksynergy.com') return 'recore'

    // 直接ドメインマッチング
    for (const [domain, key] of Object.entries(DOMAIN_TO_SHOP)) {
      if (url.hostname === domain || url.hostname.endsWith(`.${domain}`)) return key
    }

    return null
  } catch {
    return null
  }
}

/** pathname からページ名を生成 */
function getPageName(pathname: string): string {
  const segments = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  if (segments.length === 0) return 'top'
  if (segments.length === 1) return segments[0]
  // /ipad/pro11-6/ → ipad_pro11-6
  return segments.join('_')
}

/**
 * アフィリエイトリンクのクリックを GA4 に送信するグローバルハンドラー。
 * SmoothScroll.tsx と同じパターンで document レベルでリスンする。
 */
export default function AffiliateClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a')
      if (!anchor) return

      // アフィリエイトリンク判定: nofollow + target="_blank"
      const rel = anchor.getAttribute('rel') || ''
      const target = anchor.getAttribute('target')
      if (!rel.includes('nofollow') || target !== '_blank') return

      const href = anchor.href
      if (!href) return

      const shopKey = resolveShopKey(href)
      if (!shopKey) return

      const pageName = getPageName(window.location.pathname)
      const eventLabel = `${pageName}_${shopKey}`

      window.gtag?.('event', 'affiliate_click', {
        event_category: 'affiliate',
        event_label: eventLabel,
        page_name: pageName,
        shop_key: shopKey,
        link_url: href,
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
