'use client'
import { useEffect } from 'react'

export default function AsyncStylesheets({ hrefs }: { hrefs: string[] }) {
  useEffect(() => {
    hrefs.forEach((href) => {
      if (!document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
        const l = document.createElement('link')
        l.rel = 'stylesheet'
        l.href = href
        document.head.appendChild(l)
      }
    })
  }, [hrefs])
  return null
}
