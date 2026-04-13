'use client'

import { useEffect } from 'react'
import { useStickyCtaContext } from '@/app/components/StickyCtaContext'

export default function StickyCtaOverride() {
  const { setOverrideUrl, setOverrideLabel } = useStickyCtaContext()

  useEffect(() => {
    setOverrideUrl('https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMVW2+45VK+5YRHE')
    setOverrideLabel('モバイル保険の公式サイトを見る')
    return () => {
      setOverrideUrl(null)
      setOverrideLabel(null)
    }
  }, [setOverrideUrl, setOverrideLabel])

  return null
}
