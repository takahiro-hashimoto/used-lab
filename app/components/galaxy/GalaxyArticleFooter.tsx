import { ReactNode } from 'react'
import GalaxyPopularSection from '@/app/components/support/popular/GalaxyPopularSection'
import GalaxyRelatedLinks from '@/app/components/galaxy/GalaxyRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import ContinuousAside from '@/app/components/ContinuousAside'
import AuthorByline from '@/app/components/AuthorByline'
import type { RelatedLinkMeta } from '@/lib/data/related-links'

type Props = {
  pageUrl: string
  pageTitle: string
  excludeHref: string | string[]
  hidePopular?: boolean
  relatedHeading?: string
  relatedDescription?: string
  compareLinks?: RelatedLinkMeta[]
  children?: ReactNode
}

export default function GalaxyArticleFooter({
  pageUrl,
  pageTitle,
  excludeHref,
  hidePopular,
  relatedHeading,
  relatedDescription,
  compareLinks,
  children,
}: Props) {
  return (
    <ContinuousAside>
      {!hidePopular && <GalaxyPopularSection />}
      <GalaxyRelatedLinks
        excludeHref={excludeHref}
        {...(relatedHeading ? { heading: relatedHeading } : {})}
        {...(relatedDescription ? { description: relatedDescription } : {})}
        {...(compareLinks ? { compareLinks } : {})}
      >
        {children}
      </GalaxyRelatedLinks>
      <div className="l-section l-section--sm">
        <div className="l-container">
          <AuthorByline />
        </div>
      </div>
      <ShareBox url={pageUrl} text={pageTitle} />
    </ContinuousAside>
  )
}
