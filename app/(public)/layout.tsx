import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";
import AffiliateClickTracker from "@/app/components/AffiliateClickTracker";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, PUBLISHING_PRINCIPLES_URL, authorRef } from '@/lib/data/author'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  // @id を振ることで、記事の publisher からこの実体を参照できる（重複定義を防ぐ）
  '@id': ORGANIZATION_ID,
  name: 'ユーズドラボ',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo.svg`,
  },
  image: `${SITE_URL}/images/logo.svg`,
  description: '中古・型落ちデジタルデバイスの価格比較・スペック情報サイト。iPhone・iPad・MacBook・Apple Watch・AirPods・Google Pixel・Samsung Galaxy の中古相場、スペック比較、おすすめ機種を毎日更新。',
  // 経歴や sameAs は /profile/ の Person が持つ。ここでは参照だけ（lib/data/author.ts）
  founder: authorRef(),
  foundingDate: '2024-08',
  publishingPrinciples: PUBLISHING_PRINCIPLES_URL,
  sameAs: [
    'https://twitter.com/takahiro_mono',
    'https://www.instagram.com/takahiro_mono',
    'https://www.youtube.com/@takahiro_mono',
    'https://note.com/takahiro_mono',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${SITE_URL}/contact/`,
  },
}

const searchActionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'ユーズドラボ',
  url: SITE_URL,
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: 'ja',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <Header />
      {children}
      <Footer />
    </>
  );
}
