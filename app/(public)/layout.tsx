import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";
import AffiliateClickTracker from "@/app/components/AffiliateClickTracker";

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ユーズドラボ',
  url: 'https://used-lab.com',
  logo: 'https://used-lab.com/images/logo.png',
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
    url: 'https://used-lab.com/contact/',
  },
}

const searchActionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ユーズドラボ',
  url: 'https://used-lab.com',
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
