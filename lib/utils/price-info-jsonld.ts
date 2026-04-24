/**
 * price-info ページの JSON-LD スキーマ構成:
 *   BreadcrumbList  - パンくずナビ (全カテゴリ共通)
 *   WebApplication  - 価格比較ダッシュボード本体。dateModified は価格ログ由来の日付を使う
 *   FAQPage         - よくある質問 (カテゴリ固有の質問をページ側から渡す)
 *
 * Article スキーマは <article itemScope> のマイクロデータとして付与済み (page.tsx 側)。
 * 構造化データを修正する際は 3 種類すべてを確認すること。
 */

const AUTHOR = {
  '@type': 'Person',
  name: 'タカヒロ',
  url: 'https://used-lab.jp/profile/',
  sameAs: [
    'https://twitter.com/takahiro_mono',
    'https://www.instagram.com/takahiro_mono',
    'https://www.youtube.com/@takahiro_mono',
    'https://digital-style.jp/',
    'https://nightscape.tokyo/',
  ],
}

export function buildBreadcrumbJsonLd(
  parentName: string,
  parentItem: string,
  pageName: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: parentName, item: parentItem },
      { '@type': 'ListItem', position: 3, name: pageName },
    ],
  }
}

export function buildWebApplicationJsonLd(params: {
  name: string
  description: string
  url: string
  modelCount: number
  lowestPrice: number
  highestPrice: number
  dateModified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'JPY',
      lowPrice: params.lowestPrice,
      highPrice: params.highestPrice,
      offerCount: params.modelCount,
    },
    author: AUTHOR,
    dateModified: params.dateModified,
  }
}

export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
