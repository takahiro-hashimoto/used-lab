'use client'
import { useEffect } from 'react'

export default function AsyncCssLoader({ hrefs }: { hrefs: string[] }) {
  useEffect(() => {
    hrefs.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}
