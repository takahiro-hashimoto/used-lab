/**
 * モデル個別ページ用 関連記事セクション
 * 共通の GalaxyRelatedLinks を利用
 */

import GalaxyRelatedLinks from '@/app/components/galaxy/GalaxyRelatedLinks'
import type { GalaxyModel } from '@/lib/types'

type Props = {
  model: GalaxyModel
}

export default function RelatedArticles({ model }: Props) {
  return (
    <GalaxyRelatedLinks
      heading="Galaxy選びのヒントになる記事"
      description="Galaxy選びをサポートする記事をまとめました。"
      excludeHref={`/galaxy/${model.slug}/`}
    />
  )
}
