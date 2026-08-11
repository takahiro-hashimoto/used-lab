import { type ReactNode } from 'react'
import RelatedLinks from '@/app/components/RelatedLinks'
import CrossCategoryLinks from '@/app/components/CrossCategoryLinks'
import { GALAXY_LINKS } from '@/lib/data/related-links'
import type { RelatedLinkMeta } from '@/lib/data/related-links'

type Props = {
  heading?: string
  description?: string
  excludeHref?: string | string[]
  compareLinks?: RelatedLinkMeta[]
  children?: ReactNode
}

export default function GalaxyRelatedLinks({
  heading = 'Galaxy選びのヒントになる関連記事',
  description = 'スペック以外の観点からもGalaxy選びをサポートする記事をまとめました。',
  excludeHref,
  compareLinks,
  children,
}: Props) {
  return (
    <RelatedLinks
      links={GALAXY_LINKS}
      heading={heading}
      description={description}
      excludeHref={excludeHref}
      compareLinks={compareLinks}
    >
      <CrossCategoryLinks currentCategory="/galaxy/" />
      {children}
    </RelatedLinks>
  )
}
