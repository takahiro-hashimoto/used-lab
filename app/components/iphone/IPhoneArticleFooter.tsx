import { ReactNode } from 'react'
import IPhonePopularSection from '@/app/components/support/popular/IPhonePopularSection'
import IPhoneRelatedLinks from '@/app/components/iphone/IPhoneRelatedLinks'
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

export default function IPhoneArticleFooter({
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
      {!hidePopular && <IPhonePopularSection />}
      <IPhoneRelatedLinks
        excludeHref={excludeHref}
        {...(relatedHeading ? { heading: relatedHeading } : {})}
        {...(relatedDescription ? { description: relatedDescription } : {})}
        {...(compareLinks ? { compareLinks } : {})}
      >
        {children}
      </IPhoneRelatedLinks>
      <div className="l-section l-section--sm">
        <div className="l-container">
          <AuthorByline />
        </div>
      </div>
      <ShareBox url={pageUrl} text={pageTitle} />
    </ContinuousAside>
  )
}
