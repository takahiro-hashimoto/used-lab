import type { Metadata } from 'next'

const _now = new Date()
export const PRICE_INFO_UPDATE_MONTH = `${_now.getFullYear()}年${_now.getMonth() + 1}月`

export function buildPriceInfoTitle(categoryLabel: string, modelCount: number, updateMonth: string): string {
  return `${categoryLabel}の中古相場一覧 | 歴代${modelCount}機種の価格推移を独自集計【${updateMonth}】`
}

export function buildPriceInfoMetadata({
  title,
  description,
  canonicalPath,
  heroImageUrl,
}: {
  title: string
  description: string
  canonicalPath: string
  heroImageUrl: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      images: [{ url: heroImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [heroImageUrl],
    },
  }
}
