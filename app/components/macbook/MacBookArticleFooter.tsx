import { ReactNode } from 'react'
import MacBookPopularSection from '@/app/components/support/popular/MacBookPopularSection'
import MacBookRelatedLinks from '@/app/components/macbook/MacBookRelatedLinks'
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
    <>
      {!hidePopular && <MacBookPopularSection />}
      <MacBookRelatedLinks
        excludeHref={excludeHref}
        {...(relatedHeading ? { heading: relatedHeading } : {})}
        {...(relatedDescription ? { description: relatedDescription } : {})}
      >
        {children}
      </MacBookRelatedLinks>
      <ShareBox url={pageUrl} text={pageTitle} />
    </>
  )
}
