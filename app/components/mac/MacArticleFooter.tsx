import { ReactNode } from 'react'
import RelatedLinks from '@/app/components/RelatedLinks'
import CrossCategoryLinks from '@/app/components/CrossCategoryLinks'
import ShareBox from '@/app/components/ShareBox'
import ContinuousAside from '@/app/components/ContinuousAside'
import AuthorByline from '@/app/components/AuthorByline'
import { MAC_LINKS } from '@/lib/data/related-links'

// MacBookArticleFooter のデスクトップMac版。
// 人気記事セクション（MacBookPopularSection 相当）はまだ記事数が足りないので置いていない。

type Props = {
  pageUrl: string
  pageTitle: string
  excludeHref: string | string[]
  relatedHeading?: string
  relatedDescription?: string
  children?: ReactNode
}

export default function MacArticleFooter({
  pageUrl,
  pageTitle,
  excludeHref,
  relatedHeading = 'iMac・Mac mini選びのヒントになる関連記事',
  relatedDescription = 'スペック以外の観点からもMac選びをサポートする記事をまとめました。',
  children,
}: Props) {
  return (
    <ContinuousAside>
      <RelatedLinks
        links={MAC_LINKS}
        heading={relatedHeading}
        description={relatedDescription}
        excludeHref={excludeHref}
      >
        <CrossCategoryLinks currentCategory="/mac/" />
        {children}
      </RelatedLinks>
      <div className="l-section l-section--sm">
        <div className="l-container">
          <AuthorByline />
        </div>
      </div>
      <ShareBox url={pageUrl} text={pageTitle} />
    </ContinuousAside>
  )
}
