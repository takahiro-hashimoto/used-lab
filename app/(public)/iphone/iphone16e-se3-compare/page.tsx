import type { Metadata } from 'next'
import { getCompareConfig } from '../_compare/config'
import ComparePageTemplate from '../_compare/ComparePageTemplate'

const SLUG = 'iphone16e-se3-compare'

const config = getCompareConfig(SLUG)!

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  openGraph: {
    title: config.title,
    description: config.description,
    url: `/iphone/${SLUG}/`,
  },
}

export default function Page() {
  return <ComparePageTemplate config={config} />
}
