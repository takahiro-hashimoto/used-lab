import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./critical.css";
import { CSS_NON_CRITICAL, CSS_FONTAWESOME } from "@/lib/asset-hashes";
import NavigationProgressBar from "@/app/components/NavigationProgressBar";
import AsyncStylesheets from "@/app/components/AsyncStylesheets";

const GTM_ID = 'GTM-5RVN7KJZ';
const IS_PROD = process.env.NEXT_PUBLIC_ENV === 'production';

const BASE_URL = 'https://used-lab.jp'

const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: ['中古iPhone', '中古iPad', '中古Apple Watch', '中古MacBook', '中古AirPods', 'お問い合わせ', '運営者情報'],
  url: [
    `${BASE_URL}/iphone/`,
    `${BASE_URL}/ipad/`,
    `${BASE_URL}/watch/`,
    `${BASE_URL}/macbook/`,
    `${BASE_URL}/airpods/`,
    `${BASE_URL}/contact/`,
    `${BASE_URL}/profile/`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }} />
        {/* preload: start downloading non-blocking CSS immediately */}
        <link rel="preload" href={CSS_NON_CRITICAL} as="style" />
        <link rel="preload" href={CSS_FONTAWESOME} as="style" />
        {IS_PROD && <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {IS_PROD && (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}</Script>
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
        <AsyncStylesheets hrefs={[CSS_NON_CRITICAL, CSS_FONTAWESOME]} />
        <NavigationProgressBar />
        {children}
      </body>
    </html>
  );
}
