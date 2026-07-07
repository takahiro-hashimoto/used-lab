'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { DEFAULT_STICKY_CTA_CONFIG, type StickyCtaConfig } from './sticky-cta-config'

const DEFAULT_CONFIG = DEFAULT_STICKY_CTA_CONFIG

interface StickyCtaContextType {
  categoryUrls: Record<string, string>
  defaultUrl: string
  overrideUrl: string | null
  overrideLabel: string | null
  config: StickyCtaConfig
  setOverrideUrl: (url: string | null) => void
  setOverrideLabel: (label: string | null) => void
}

const StickyCtaContext = createContext<StickyCtaContextType>({
  categoryUrls: {},
  defaultUrl: '#',
  overrideUrl: null,
  overrideLabel: null,
  config: DEFAULT_CONFIG,
  setOverrideUrl: () => {},
  setOverrideLabel: () => {},
})

export function StickyCtaProvider({
  categoryUrls,
  defaultUrl,
  config = DEFAULT_CONFIG,
  children,
}: {
  categoryUrls: Record<string, string>
  defaultUrl: string
  config?: StickyCtaConfig
  children: ReactNode
}) {
  const [overrideUrl, setOverrideUrl] = useState<string | null>(null)
  const [overrideLabel, setOverrideLabel] = useState<string | null>(null)
  return (
    <StickyCtaContext.Provider value={{ categoryUrls, defaultUrl, overrideUrl, overrideLabel, config, setOverrideUrl, setOverrideLabel }}>
      {children}
    </StickyCtaContext.Provider>
  )
}

export function useStickyCtaContext() {
  return useContext(StickyCtaContext)
}
