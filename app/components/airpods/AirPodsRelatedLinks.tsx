import RelatedLinks from '@/app/components/RelatedLinks'
import CrossCategoryLinks from '@/app/components/CrossCategoryLinks'
import { AIRPODS_LINKS } from '@/lib/data/related-links'

type Props = {
  heading?: string
  description?: string
  excludeHref?: string | string[]
}

export default function AirPodsRelatedLinks({
  heading = 'AirPods選びのヒントになる関連記事',
  description = 'スペック以外の観点からもAirPods選びをサポートする記事をまとめました。',
  excludeHref,
}: Props) {
  const sourcePath = Array.isArray(excludeHref) ? excludeHref[0] : (excludeHref ?? '/airpods/')
  return (
    <RelatedLinks
      links={AIRPODS_LINKS}
      heading={heading}
      description={description}
      excludeHref={excludeHref}
      sourcePath={sourcePath}
    >
      <CrossCategoryLinks currentCategory="/airpods/" />
    </RelatedLinks>
  )
}
