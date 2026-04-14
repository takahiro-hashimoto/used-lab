import type { Metadata } from 'next'
import { getCompareConfig } from '../_compare/config'
import ComparePageTemplate from '../_compare/ComparePageTemplate'

export const revalidate = false

const SLUG = 'iphone15-16-compare'

const config = getCompareConfig(SLUG)!

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `/iphone/${SLUG}/` },
  openGraph: {
    title: config.title,
    description: config.description,
    url: `/iphone/${SLUG}/`,
    images: [{ url: '/images/content/thumbnail/iphone-compare.jpg', width: 1200, height: 630, alt: config.title }],
  },
  twitter: {
    title: config.title,
    description: config.description,
    images: ['/images/content/thumbnail/iphone-compare.jpg'],
  },
}

export default function Page() {
  return <ComparePageTemplate config={config} />
}
