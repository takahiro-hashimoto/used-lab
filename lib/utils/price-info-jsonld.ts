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

const ORG = { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.jp/' }

/**
 * Dataset スキーマ。中古相場の独自集計データを「定期更新のオープンデータセット」として記述。
 * Google Dataset Search / リッチリザルト適格化を狙う。
 */
export function buildDatasetJsonLd(params: {
  productLabel: string // 例: 中古iPhone
  url: string
  modelCount: number
  lowestPrice: number
  highestPrice: number
  dateModified: string
}) {
  const { productLabel, modelCount } = params
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${productLabel}の価格相場データセット`,
    description: `${productLabel}${modelCount}機種の中古相場（最安値・最高値・平均中間値）を、主要中古ECサイトから毎日集計したオープンな価格データセットです。価格推移グラフ・最安値ランキングとして公開しています。`,
    url: params.url,
    keywords: [productLabel, '中古相場', '価格推移', '中古価格', 'Apple', '相場一覧'],
    isAccessibleForFree: true,
    creator: ORG,
    publisher: ORG,
    dateModified: params.dateModified,
    measurementTechnique:
      '主要中古ECサイトの最安値・最高値を毎日自動取得し、平均中間値を100円単位で算出',
    variableMeasured: {
      '@type': 'PropertyValue',
      name: '中古価格（税込・平均中間値）',
      unitText: 'JPY',
      minValue: params.lowestPrice,
      maxValue: params.highestPrice,
    },
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
