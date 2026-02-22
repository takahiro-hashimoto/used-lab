'use client'

import type { ShopLink } from './types'

type Props = {
  iosysLink: ShopLink | undefined
  amazonLink: ShopLink | undefined
}

export default function ResultCardActions({ iosysLink, amazonLink }: Props) {
  return (
    <div className="ifd-result-card__actions">
      {iosysLink && (
        <a
          href={iosysLink.url}
          className="m-btn m-btn--primary m-btn--sm"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          イオシスで見る
        </a>
      )}
      {amazonLink && (
        <a
          href={amazonLink.url}
          className="m-btn m-btn--amazon m-btn--sm"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          Amazonで見る
        </a>
      )}
    </div>
  )
}
