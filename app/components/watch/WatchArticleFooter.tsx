import { ReactNode } from 'react'
import WatchPopularSection from '@/app/components/support/popular/WatchPopularSection'
import WatchRelatedLinks from '@/app/components/watch/WatchRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import ContinuousAside from '@/app/components/ContinuousAside'
import AuthorByline from '@/app/components/AuthorByline'

type Props = {
  pageUrl: string
  pageTitle: string
  excludeHref: string | string[]
  /** WatchPopularSection を非表示にする（recommend等） */
  hidePopular?: boolean
  /** WatchRelatedLinks のカスタム見出し */
  relatedHeading?: string
  /** WatchRelatedLinks のカスタム説明文 */
  relatedDescription?: string
  /** WatchRelatedLinks の children（callout等ページ固有の補足） */
  children?: ReactNode
}

export default function WatchArticleFooter({
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
      {!hidePopular && <WatchPopularSection />}
      <WatchRelatedLinks
        excludeHref={excludeHref}
        {...(relatedHeading ? { heading: relatedHeading } : {})}
        {...(relatedDescription ? { description: relatedDescription } : {})}
      >
        {children}
      </WatchRelatedLinks>
      <div className="l-section l-section--sm">
        <div className="l-container">
          <AuthorByline />
        </div>
      </div>
      <ShareBox url={pageUrl} text={pageTitle} />
    </ContinuousAside>
  )
}
