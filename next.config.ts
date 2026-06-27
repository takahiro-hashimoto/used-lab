import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.jsdelivr.net https://www.clarity.ms",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://*.supabase.co https://placehold.co https://*.rakuten.co.jp https://*.a8.net https://firebasestorage.googleapis.com",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms",
  "frame-src https://www.youtube.com https://docs.google.com",
].join('; ')

// CSP は middleware.ts で nonce 付きで設定するためここでは除外
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: CSP },
]

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['chart.js', 'react-chartjs-2'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'used-lab.jp',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/iphone/16e-se/',
        destination: '/iphone/16e/',
        permanent: true,
      },
      {
        source: '/watch/se3-2/',
        destination: '/watch/se3/',
        permanent: true,
      },
      {
        source: '/watch/se2-2/',
        destination: '/watch/se2/',
        permanent: true,
      },
      {
        source: '/airpods/price/',
        destination: '/airpods/price-info/',
        permanent: true,
      },
      {
        source: '/airpods/airpods-select/',
        destination: '/airpods/',
        permanent: true,
      },
      {
        source: '/%E3%83%88%E3%83%83%E3%83%97-2/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/page/:num/',
        destination: '/',
        permanent: true,
      },
      // /used-iphone/:slug/ → /iphone/:slug/ (WordPress移行時に外れたリダイレクトの復元)
      {
        source: '/used-iphone/:slug/',
        destination: '/iphone/:slug/',
        permanent: true,
      },
      // /apple-watch/:slug/ → /watch/:slug/ (WordPress移行時に外れたリダイレクトの復元)
      { source: '/apple-watch/series11/', destination: '/watch/series11/', permanent: true },
      { source: '/apple-watch/series10/', destination: '/watch/series10/', permanent: true },
      { source: '/apple-watch/series9/',  destination: '/watch/series9/',  permanent: true },
      { source: '/apple-watch/series8/',  destination: '/watch/series8/',  permanent: true },
      { source: '/apple-watch/series7/',  destination: '/watch/series7/',  permanent: true },
      { source: '/apple-watch/series6/',  destination: '/watch/series6/',  permanent: true },
      { source: '/apple-watch/series5/',  destination: '/watch/series5/',  permanent: true },
      { source: '/apple-watch/series4/',  destination: '/watch/series4/',  permanent: true },
      { source: '/apple-watch/ultra3/',   destination: '/watch/ultra3/',   permanent: true },
      { source: '/apple-watch/ultra2/',   destination: '/watch/ultra2/',   permanent: true },
      { source: '/apple-watch/ultra/',    destination: '/watch/ultra/',    permanent: true },
      { source: '/apple-watch/se3/',      destination: '/watch/se3/',      permanent: true },
      { source: '/apple-watch/se2/',      destination: '/watch/se2/',      permanent: true },
      { source: '/apple-watch/se/',       destination: '/watch/se/',       permanent: true },
      {
        source: '/iphone/recommend/',
        destination: '/iphone/',
        permanent: true,
      },
      {
        source: '/ipad/recommend/',
        destination: '/ipad/',
        permanent: true,
      },
      {
        source: '/watch/recommend/',
        destination: '/watch/',
        permanent: true,
      },
      {
        source: '/macbook/recommend/',
        destination: '/macbook/',
        permanent: true,
      },
      {
        source: '/airpods/recommend/',
        destination: '/airpods/',
        permanent: true,
      },
      // 2機種比較ページ（PV僅少のため非公開）→ スペック比較表トップへ集約
      { source: '/iphone/iphone13-13pro-compare/',   destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone13-14-compare/',      destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone13pro-14pro-compare/', destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone14-14pro-compare/',   destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone14-15-compare/',      destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone14pro-15pro-compare/', destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone15-15pro-compare/',   destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone15-16-compare/',      destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone15pro-16pro-compare/', destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone16-16pro-compare/',   destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone16e-se3-compare/',    destination: '/iphone/iphone-spec-table/', permanent: true },
      { source: '/iphone/iphone16plus-air-compare/', destination: '/iphone/iphone-spec-table/', permanent: true },
      {
        source: '/iphone/ipad-mini-6-review/',
        destination: '/ipad/ipad-mini-6-review/',
        permanent: true,
      },

      // ② 誤カテゴリURL（MacBook記事がipad配下）
      { source: '/ipad/mba-13-2020/', destination: '/macbook/mba-13-2020/', permanent: true },
      { source: '/ipad/mba-13-2022/', destination: '/macbook/mba-13-2022/', permanent: true },
      { source: '/ipad/mba-13-2024/', destination: '/macbook/mba-13-2024/', permanent: true },
      { source: '/ipad/mba-13-2025/', destination: '/macbook/mba-13-2025/', permanent: true },
      { source: '/ipad/mba-15-2023/', destination: '/macbook/mba-15-2023/', permanent: true },
      { source: '/ipad/mbp-13-2020/', destination: '/macbook/mbp-13-2020/', permanent: true },
      { source: '/ipad/mbp-14-2021/', destination: '/macbook/mbp-14-2021/', permanent: true },
      { source: '/ipad/mbp-14-2023/', destination: '/macbook/mbp-14-2023/', permanent: true },
      { source: '/ipad/mbp-16-2021/', destination: '/macbook/mbp-16-2021/', permanent: true },
      { source: '/ipad/mbp-16-2023/', destination: '/macbook/mbp-16-2023/', permanent: true },
      // 誤カテゴリURL（iPhone記事がipad配下）
      { source: '/ipad/17promax/', destination: '/iphone/17promax/', permanent: true },
      { source: '/ipad/13pro/',    destination: '/iphone/13pro/',    permanent: true },
      { source: '/ipad/15normal/', destination: '/iphone/15normal/', permanent: true },
      { source: '/ipad/16normal/', destination: '/iphone/16normal/', permanent: true },
      // 誤カテゴリURL（Watch記事がipad配下）
      { source: '/ipad/ultra2/',  destination: '/watch/ultra2/',  permanent: true },
      { source: '/ipad/series7/', destination: '/watch/series7/', permanent: true },

      // ③ 旧 /iphone/shop/:slug・/ipad/shop/:slug URL構造
      { source: '/iphone/shop/:slug/', destination: '/iphone/:slug/', permanent: true },
      { source: '/ipad/shop/:slug/',   destination: '/ipad/:slug/',   permanent: true },

      // ④ その他の旧URL
      { source: '/airpods/:slug/feed/', destination: '/airpods/:slug/', permanent: true },
      { source: '/ipad/:slug/feed/',    destination: '/ipad/:slug/',    permanent: true },
      { source: '/iphone/:slug/feed/',  destination: '/iphone/:slug/',  permanent: true },
      { source: '/macbook/:slug/feed/', destination: '/macbook/:slug/', permanent: true },
      { source: '/watch/:slug/feed/',   destination: '/watch/:slug/',   permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
        ],
      },
      {
        source: '/css/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
};

export default withBundleAnalyzer(nextConfig);
