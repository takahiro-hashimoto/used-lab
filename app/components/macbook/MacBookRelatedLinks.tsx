import RelatedLinks from '@/app/components/RelatedLinks'
import { MACBOOK_LINKS } from '@/lib/data/related-links'

type Props = {
  heading?: string
  description?: string
  excludeHref?: string | string[]
}

export default function MacBookRelatedLinks({
  heading = 'MacBook選びのヒントになる関連記事',
  description = 'スペック以外の観点からもMacBook選びをサポートする記事をまとめました。',
  excludeHref,
}: Props) {
  const sourcePath = Array.isArray(excludeHref) ? excludeHref[0] : (excludeHref ?? '/macbook/')
  return (
    <RelatedLinks
      links={MACBOOK_LINKS}
      heading={heading}
      description={description}
      excludeHref={excludeHref}
      sourcePath={sourcePath}
    />
  )
}
