import { type ReactNode } from 'react'
import RelatedLinks from '@/app/components/RelatedLinks'
import CrossCategoryLinks from '@/app/components/CrossCategoryLinks'
import { PIXEL_LINKS } from '@/lib/data/related-links'
import type { RelatedLinkMeta } from '@/lib/data/related-links'

type Props = {
  heading?: string
  description?: string
  excludeHref?: string | string[]
  compareLinks?: RelatedLinkMeta[]
  children?: ReactNode
}

export default function PixelRelatedLinks({
  heading = 'Pixel選びのヒントになる関連記事',
  description = 'スペック以外の観点からもPixel選びをサポートする記事をまとめました。',
  excludeHref,
  compareLinks,
  children,
}: Props) {
  return (
    <RelatedLinks
      links={PIXEL_LINKS}
      heading={heading}
      description={description}
      excludeHref={excludeHref}
      compareLinks={compareLinks}
    >
      <CrossCategoryLinks currentCategory="/pixel/" />
      {children}
    </RelatedLinks>
  )
}
