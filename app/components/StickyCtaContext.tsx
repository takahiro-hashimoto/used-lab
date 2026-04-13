'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface StickyCtaContextType {
  categoryUrls: Record<string, string>
  defaultUrl: string
  overrideUrl: string | null
  overrideLabel: string | null
  setOverrideUrl: (url: string | null) => void
  setOverrideLabel: (label: string | null) => void
}

const StickyCtaContext = createContext<StickyCtaContextType>({
  categoryUrls: {},
  defaultUrl: '#',
  overrideUrl: null,
  overrideLabel: null,
  setOverrideUrl: () => {},
  setOverrideLabel: () => {},
})

export function StickyCtaProvider({
  categoryUrls,
  defaultUrl,
  children,
}: {
  categoryUrls: Record<string, string>
  defaultUrl: string
  children: ReactNode
}) {
  const [overrideUrl, setOverrideUrl] = useState<string | null>(null)
  const [overrideLabel, setOverrideLabel] = useState<string | null>(null)
  return (
    <StickyCtaContext.Provider value={{ categoryUrls, defaultUrl, overrideUrl, overrideLabel, setOverrideUrl, setOverrideLabel }}>
      {children}
    </StickyCtaContext.Provider>
  )
}

export function useStickyCtaContext() {
  return useContext(StickyCtaContext)
}
