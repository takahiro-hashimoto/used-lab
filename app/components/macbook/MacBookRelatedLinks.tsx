import { ReactNode } from 'react'
import RelatedLinks from '@/app/components/RelatedLinks'
import CrossCategoryLinks from '@/app/components/CrossCategoryLinks'
import { MACBOOK_LINKS } from '@/lib/data/related-links'

type Props = {
  heading?: string
  description?: string
  excludeHref?: string | string[]
  children?: ReactNode
}

export default function MacBookRelatedLinks({
  heading = 'MacBook選びのヒントになる関連記事',
  description = 'スペック以外の観点からもMacBook選びをサポートする記事をまとめました。',
  excludeHref,
  children,
}: Props) {
  return (
    <RelatedLinks
      links={MACBOOK_LINKS}
      heading={heading}
      description={description}
      excludeHref={excludeHref}
    >
      <CrossCategoryLinks currentCategory="/macbook/" />
      {children}
    </RelatedLinks>
  )
}
