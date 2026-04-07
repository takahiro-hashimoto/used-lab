import { ReactNode } from 'react'
import IPadPopularSection from '@/app/components/support/popular/IPadPopularSection'
import IPadRelatedLinks from '@/app/components/ipad/IPadRelatedLinks'
import ShareBox from '@/app/components/ShareBox'

type Props = {
  pageUrl: string
  pageTitle: string
  excludeHref: string | string[]
  hidePopular?: boolean
  relatedHeading?: string
  relatedDescription?: string
  children?: ReactNode
}

export default function IPadArticleFooter({
  pageUrl,
  pageTitle,
  excludeHref,
  hidePopular,
  relatedHeading,
  relatedDescription,
  children,
}: Props) {
  return (
    <>
      {!hidePopular && <IPadPopularSection />}
      <IPadRelatedLinks
        excludeHref={excludeHref}
        {...(relatedHeading ? { heading: relatedHeading } : {})}
        {...(relatedDescription ? { description: relatedDescription } : {})}
      >
        {children}
      </IPadRelatedLinks>
      <ShareBox url={pageUrl} text={pageTitle} />
    </>
  )
}
