import type { MetadataRoute } from 'next'

// SEOツール系・スクレイパー系ボット。クロールが多く Edge Requests 課金の原因になる
// ため全面拒否する。Bytespider は robots.txt を無視するため Vercel Firewall 側でも
// Deny ルールを設定すること（Deny されたリクエストは課金対象外）。
const BLOCKED_BOTS = [
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'DataForSeoBot',
  'serpstatbot',
  'PetalBot',
  'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ はブロックしない: 画像(/_next/image/)とCSS(/_next/static/)の取得を
        // 妨げるとレンダリング評価と画像検索に不利。JS/CSSは X-Robots-Tag: noindex
        // （next.config.ts の /_next/static/）で別途インデックスを防いでいる。
        disallow: ['/admin/', '/api/', '/styleguide/'],
      },
      ...BLOCKED_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: 'https://used-lab.jp/sitemap.xml',
  }
}
