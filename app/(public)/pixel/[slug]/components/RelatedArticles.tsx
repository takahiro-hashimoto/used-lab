/**
 * モデル個別ページ用 関連記事セクション
 * 共通の PixelRelatedLinks を利用
 */

import PixelRelatedLinks from '@/app/components/pixel/PixelRelatedLinks'
import type { PixelModel } from '@/lib/types'

type Props = {
  model: PixelModel
}

export default function RelatedArticles({ model }: Props) {
  return (
    <PixelRelatedLinks
      heading="Pixel選びのヒントになる記事"
      description="Pixel選びをサポートする記事をまとめました。"
      excludeHref={`/pixel/${model.slug}/`}
    />
  )
}
