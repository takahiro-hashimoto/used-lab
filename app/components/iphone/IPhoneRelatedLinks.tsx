import RelatedLinks from '@/app/components/RelatedLinks'
import { IPHONE_LINKS } from '@/lib/data/related-links'
import type { RelatedLinkMeta } from '@/lib/data/related-links'

type Props = {
  heading?: string
  description?: string
  excludeHref?: string | string[]
  compareLinks?: RelatedLinkMeta[]
}

export default function IPhoneRelatedLinks({
  heading = 'iPhone選びのヒントになる関連記事',
  description = 'スペック以外の観点からもiPhone選びをサポートする記事をまとめました。',
  excludeHref,
  compareLinks,
}: Props) {
  const sourcePath = Array.isArray(excludeHref) ? excludeHref[0] : (excludeHref ?? '/iphone/')
  return (
    <RelatedLinks
      links={IPHONE_LINKS}
      heading={heading}
      description={description}
      excludeHref={excludeHref}
      sourcePath={sourcePath}
      compareLinks={compareLinks}
    />
  )
}
