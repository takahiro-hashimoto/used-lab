import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0071e3',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://used-lab.com'),
  title: {
    default: 'ユーズドラボ | 中古Apple製品の価格比較・スペック情報',
    template: '%s',
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
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
            }} />
          </>
        )}
      </head>
      <body>
        {children}
        <Script
          id="fontawesome-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
              link.crossOrigin = 'anonymous';
              document.head.appendChild(link);
            `,
          }}
        />
      </body>
    </html>
  );
}
