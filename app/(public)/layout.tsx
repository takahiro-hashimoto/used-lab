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
  logo: {
    '@type': 'ImageObject',
    url: 'https://used-lab.jp/images/logo.png',
  },
  image: 'https://used-lab.jp/images/logo.png',
  description: '中古Apple製品の価格比較・スペック情報サイト。iPhone・iPad・MacBook・Apple Watch・AirPodsの中古相場、スペック比較、おすすめ機種を毎日更新。',
  founder: {
    '@type': 'Person',
    name: 'タカヒロ',
    url: 'https://used-lab.jp/profile/',
    image: 'https://used-lab.jp/images/content/thumbnail/my-icon.webp',
    jobTitle: 'Webディレクター / ガジェットブロガー',
    description: '2015年からガジェットブログ「デジスタ」を運営。300以上の製品レビュー実績を持ち、GoodsPress・ITmedia・ライフハッカー等で連載・監修を担当。',
    sameAs: [
      'https://twitter.com/takahiro_mono',
      'https://www.instagram.com/takahiro_mono',
      'https://www.youtube.com/@takahiro_mono',
      'https://digital-style.jp/',
      'https://nightscape.tokyo/',
    ],
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
