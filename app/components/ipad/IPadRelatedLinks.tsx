import RelatedLinks from '@/app/components/RelatedLinks'
import { IPAD_LINKS } from '@/lib/data/related-links'

type Props = {
  heading?: string
  description?: string
  excludeHref?: string | string[]
}

export default function IPadRelatedLinks({
  heading = 'iPad選びのヒントになる関連記事',
  description = 'スペック以外の観点からもiPad選びをサポートする記事をまとめました。',
  excludeHref,
}: Props) {
  const sourcePath = Array.isArray(excludeHref) ? excludeHref[0] : (excludeHref ?? '/ipad/')
  return (
    <RelatedLinks
      links={IPAD_LINKS}
      heading={heading}
      description={description}
      excludeHref={excludeHref}
      sourcePath={sourcePath}
    />
  )
}
