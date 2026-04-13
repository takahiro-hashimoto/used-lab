import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./critical.css";
import { CSS_NON_CRITICAL, CSS_FONTAWESOME } from "@/lib/asset-hashes";

const GTM_ID = 'GTM-5RVN7KJZ';
const IS_PROD = process.env.NEXT_PUBLIC_ENV === 'production';

const BASE_URL = 'https://used-lab.jp'

const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    { '@type': 'SiteNavigationElement', position: 1, name: '中古iPhone', url: `${BASE_URL}/iphone/` },
    { '@type': 'SiteNavigationElement', position: 2, name: '中古iPad', url: `${BASE_URL}/ipad/` },
    { '@type': 'SiteNavigationElement', position: 3, name: '中古Apple Watch', url: `${BASE_URL}/watch/` },
    { '@type': 'SiteNavigationElement', position: 4, name: '中古MacBook', url: `${BASE_URL}/macbook/` },
    { '@type': 'SiteNavigationElement', position: 5, name: '中古AirPods', url: `${BASE_URL}/airpods/` },
    { '@type': 'SiteNavigationElement', position: 6, name: 'お問い合わせ', url: `${BASE_URL}/contact/` },
    { '@type': 'SiteNavigationElement', position: 7, name: '運営者情報', url: `${BASE_URL}/profile/` },
  ],
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0071e3',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://used-lab.jp'),
  title: {
    default: 'ユーズドラボ | 中古Apple製品の価格比較・スペック情報',
    template: '%s | ユーズドラボ',
  },
  description: '中古iPhone・iPad・Apple Watch・MacBook・AirPodsの価格比較、スペック情報、おすすめショップを紹介',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ユーズドラボ',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? ''
  return (
    <html lang="ja" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }} />
        <link rel="preload" href={CSS_NON_CRITICAL} as="style" />
        <link rel="preload" href={CSS_FONTAWESOME} as="style" />
        <Script id="css-loader" nonce={nonce} strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `['${CSS_NON_CRITICAL}','${CSS_FONTAWESOME}'].forEach(function(h){var l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.appendChild(l)});`,
        }} />
        {IS_PROD && <link rel="dns-prefetch" href="https://www.googletagmanager.com" />}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {IS_PROD && (
          <Script id="gtm-init" nonce={nonce} strategy="lazyOnload" dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }} />
        )}
      </head>
      <body>
        {IS_PROD && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
