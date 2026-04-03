'use client'

import { useEffect } from 'react'
import { useStickyCtaContext } from './StickyCtaContext'

export default function StickyCtaOverride({ href }: { href: string }) {
  const { setOverrideUrl } = useStickyCtaContext()
  useEffect(() => {
    setOverrideUrl(href)
    return () => setOverrideUrl(null)
  }, [href, setOverrideUrl])
  return null
}
