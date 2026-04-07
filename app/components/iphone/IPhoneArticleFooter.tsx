import { ReactNode } from 'react'
import IPhonePopularSection from '@/app/components/support/popular/IPhonePopularSection'
import IPhoneRelatedLinks from '@/app/components/iphone/IPhoneRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
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
    <>
      {!hidePopular && <IPhonePopularSection />}
      <IPhoneRelatedLinks
        excludeHref={excludeHref}
        {...(relatedHeading ? { heading: relatedHeading } : {})}
        {...(relatedDescription ? { description: relatedDescription } : {})}
        {...(compareLinks ? { compareLinks } : {})}
      >
        {children}
      </IPhoneRelatedLinks>
      <ShareBox url={pageUrl} text={pageTitle} />
    </>
  )
}
