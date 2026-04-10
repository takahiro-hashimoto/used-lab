import { ReactNode } from 'react'
import MacBookPopularSection from '@/app/components/support/popular/MacBookPopularSection'
import MacBookRelatedLinks from '@/app/components/macbook/MacBookRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import ContinuousAside from '@/app/components/ContinuousAside'
import AuthorByline from '@/app/components/AuthorByline'

type Props = {
  pageUrl: string
  pageTitle: string
  excludeHref: string | string[]
  hidePopular?: boolean
  relatedHeading?: string
  relatedDescription?: string
  children?: ReactNode
}

export default function MacBookArticleFooter({
  pageUrl,
  pageTitle,
  excludeHref,
  hidePopular,
  relatedHeading,
  relatedDescription,
  children,
}: Props) {
  return (
    <ContinuousAside>
      {!hidePopular && <MacBookPopularSection />}
      <MacBookRelatedLinks
        excludeHref={excludeHref}
        {...(relatedHeading ? { heading: relatedHeading } : {})}
        {...(relatedDescription ? { description: relatedDescription } : {})}
      >
        {children}
      </MacBookRelatedLinks>
      <div className="l-section l-section--sm">
        <div className="l-container">
          <AuthorByline />
        </div>
      </div>
      <ShareBox url={pageUrl} text={pageTitle} />
    </ContinuousAside>
  )
}
