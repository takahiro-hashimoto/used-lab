/**
 * モデル個別ページ用 関連記事セクション
 * 共通の IPhoneRelatedLinks を利用
 */

import IPhoneRelatedLinks from '@/app/components/iphone/IPhoneRelatedLinks'
import type { IPhoneModel } from '@/lib/types'

type Props = {
  model: IPhoneModel
}

export default function RelatedArticles({ model }: Props) {
  return (
    <IPhoneRelatedLinks
      heading="iPhone選びのヒントになる記事"
      description="iPhone選びをサポートする記事をまとめました。"
    />
  )
}
