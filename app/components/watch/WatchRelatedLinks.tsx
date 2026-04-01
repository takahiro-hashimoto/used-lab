import { ReactNode } from 'react'
import RelatedLinks from '@/app/components/RelatedLinks'
import { WATCH_LINKS } from '@/lib/data/related-links'

type Props = {
  heading?: string
  description?: string
  excludeHref?: string | string[]
  children?: ReactNode
}

export default function WatchRelatedLinks({
  heading = 'Apple Watch選びのヒントになる関連記事',
  description = 'スペック以外の観点からもApple Watch選びをサポートする記事をまとめました。',
  excludeHref,
  children,
}: Props) {
  const sourcePath = Array.isArray(excludeHref) ? excludeHref[0] : (excludeHref ?? '/watch/')
  return (
    <RelatedLinks
      links={WATCH_LINKS}
      heading={heading}
      description={description}
      excludeHref={excludeHref}
      sourcePath={sourcePath}
    >
      {children}
    </RelatedLinks>
  )
}
