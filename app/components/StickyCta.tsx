'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useStickyCtaContext } from './StickyCtaContext'

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

const CONTAINER_STYLE: React.CSSProperties = {
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
  willChange: 'transform',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
}

export default function StickyCta() {
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { categoryUrls, defaultUrl, overrideUrl, overrideLabel, config } = useStickyCtaContext()

  const category = getCategoryFromPath(pathname)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // 特殊バナーの期間判定はクライアント側で行う。
  // ページは revalidate: false で無期限キャッシュされるため、サーバ算出の
  // specialActive は生成時点のスナップショットでしかない（初期値にのみ使用）。
  // 開始前→開始時刻に自動表示、終了時刻に通常バナーへ自動復帰する。
  const [specialNow, setSpecialNow] = useState(config.specialActive)
  useEffect(() => {
    if (config.mode !== 'special') return
    const startMs = config.specialStartAt ? new Date(config.specialStartAt).getTime() : null
    const endMs = config.specialEndAt ? new Date(config.specialEndAt).getTime() : null
    let timer: ReturnType<typeof setTimeout> | undefined
    const evaluate = () => {
      const now = Date.now()
      setSpecialNow((!startMs || now >= startMs) && (!endMs || now <= endMs))
      // 次の境界（未来の開始 or 終了時刻）で再評価（開始→終了と連鎖する）
      const next = [startMs, endMs]
        .filter((t): t is number => t !== null && t > now)
        .sort((a, b) => a - b)[0]
      if (next !== undefined) {
        timer = setTimeout(evaluate, Math.min(next - now, 2_147_483_647))
      }
    }
    evaluate()
    return () => clearTimeout(timer)
  }, [config.mode, config.specialStartAt, config.specialEndAt])

  // filter-search では常に非表示
  if (pathname.includes('/filter-search')) return null

  const transform = visible ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)'
  const transition = 'transform 0.3s ease, opacity 0.3s ease'

  const showSpecial = config.mode === 'special' && specialNow

  // 特殊バナーのURLがAmazon（amzn.to / amazon.co.jp 等）の場合は一時的に非表示にする
  // （Amazonアソシエイト対応）。復活時はこの isAmazonSpecialUrl 判定を削除。
  const isAmazonSpecialUrl = /amzn\.to|amzn\.asia|amazon\.[a-z.]+/i.test(config.specialUrl || '')

  // ============================================================
  // 特殊追従ボタン（Amazonセール等）— PC・スマホ両方・期間内のみ表示
  // ============================================================
  if (showSpecial && config.specialUrl && config.specialUrl !== '#' && !isAmazonSpecialUrl) {
    return (
      <div
        role="complementary"
        aria-label="キャンペーン"
        style={{
          ...CONTAINER_STYLE,
          transform,
          opacity: visible ? 1 : 0,
          transition,
        }}
      >
        <a
          href={config.specialUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.02rem',
            width: '100%',
            maxWidth: '520px',
            margin: '0 auto',
            padding: '0.6rem 1rem',
            background: 'linear-gradient(135deg, #ff9900 0%, #ff7a00 100%)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            boxShadow: '0 2px 10px rgba(255,122,0,0.35)',
          }}
        >
          {config.specialHeadline && (
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.01em' }}>
              ＼ {config.specialHeadline} ／
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.2 }}>
            <i className="fa-solid fa-tags" aria-hidden="true"></i>
            {config.specialLabel || 'セール会場を見る'}
          </span>
        </a>
      </div>
    )
  }

  // ============================================================
  // 通常追従ボタン（イオシスCTA）— スマホのみ・カテゴリページのみ
  // ============================================================
  if (!isMobile || !category) return null

  const href = overrideUrl || (category && categoryUrls[category]) || defaultUrl
  const label = overrideLabel
    || (overrideUrl ? 'イオシスで最安値の価格を見る' : null)
    || (category && CATEGORY_LABELS[category])
    || 'イオシスで中古Apple製品を探す'

  return (
    <div
      role="complementary"
      aria-label="購入リンク"
      style={{
        ...CONTAINER_STYLE,
        transform,
        opacity: visible ? 1 : 0,
        transition,
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="m-btn m-btn--primary m-btn--block"
        style={{ width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
      >
        <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
        {label}
      </a>
    </div>
  )
}
