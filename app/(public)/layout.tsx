import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ユーズドラボ',
  url: 'https://used-lab.com',
  logo: 'https://used-lab.com/images/logo.png',
  description: '中古Apple製品の価格比較・スペック情報サイト',
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
      <Header />
      {children}
      <Footer />
    </>
  );
}
