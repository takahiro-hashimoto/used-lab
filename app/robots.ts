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
        disallow: ['/admin/', '/api/', '/styleguide/', '/_next/'],
      },
      ...BLOCKED_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: 'https://used-lab.jp/sitemap.xml',
  }
}
