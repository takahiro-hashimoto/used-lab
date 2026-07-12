'use client'

import type { ShopLink } from './types'

type Props = {
  modelName?: string
  iosysLink: ShopLink | undefined
}

export default function ResultCardActions({ modelName, iosysLink }: Props) {
  return (
    <div className="ifd-result-card__actions">
      {iosysLink && (
        <a
          href={iosysLink.url}
          className="m-btn m-btn--primary m-btn--sm"
          rel="nofollow noopener noreferrer"
          target="_blank"
          aria-label={modelName ? `${modelName}をイオシスで見る` : undefined}
        >
          イオシスで見る
        </a>
      )}
    </div>
  )
}
