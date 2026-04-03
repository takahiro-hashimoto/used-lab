'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface StickyCtaContextType {
  categoryUrls: Record<string, string>
  overrideUrl: string | null
  setOverrideUrl: (url: string | null) => void
}

const StickyCtaContext = createContext<StickyCtaContextType>({
  categoryUrls: {},
  overrideUrl: null,
  setOverrideUrl: () => {},
})

export function StickyCtaProvider({
  categoryUrls,
  children,
}: {
  categoryUrls: Record<string, string>
  children: ReactNode
}) {
  const [overrideUrl, setOverrideUrl] = useState<string | null>(null)
  return (
    <StickyCtaContext.Provider value={{ categoryUrls, overrideUrl, setOverrideUrl }}>
      {children}
    </StickyCtaContext.Provider>
  )
}

export function useStickyCtaContext() {
  return useContext(StickyCtaContext)
}
