import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";
import AffiliateClickTracker from "@/app/components/AffiliateClickTracker";
import StickyCta from "@/app/components/StickyCta";
import { StickyCtaProvider } from "@/app/components/StickyCtaContext";
import { getShops } from "@/lib/queries";

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ユーズドラボ',
  url: 'https://used-lab.jp',
  logo: 'https://used-lab.jp/images/logo.png',
  description: '中古Apple製品の価格比較・スペック情報サイト',
  founder: {
    '@type': 'Person',
    name: 'タカヒロ',
  },
  foundingDate: '2024-08',
  sameAs: [
    'https://twitter.com/takahiro_mono',
    'https://www.instagram.com/takahiro_mono',
    'https://www.youtube.com/@takahiro_mono',
    'https://note.com/takahiro_mono',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://used-lab.jp/contact/',
  },
}

const searchActionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ユーズドラボ',
  url: 'https://used-lab.jp',
}

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shops = await getShops()
  const iosys = shops.find((s) => s.id === 1)
  const categoryUrls: Record<string, string> = {}
  if (iosys?.url) categoryUrls.iphone = iosys.url
  if (iosys?.ipad_url) categoryUrls.ipad = iosys.ipad_url
  if (iosys?.watch_url) categoryUrls.watch = iosys.watch_url
  if (iosys?.macbook_url) categoryUrls.macbook = iosys.macbook_url
  if (iosys?.airpods_url) categoryUrls.airpods = iosys.airpods_url

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchActionJsonLd) }}
      />
      <SmoothScroll />
      <AffiliateClickTracker />
      <StickyCtaProvider categoryUrls={categoryUrls}>
        <Header />
        {children}
        <Footer />
        <StickyCta />
      </StickyCtaProvider>
    </>
  );
}
