import type { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb'

const PAGE_TITLE = 'お問い合わせ'
const PAGE_DESCRIPTION = 'ユーズドラボへのお問い合わせはこちらのフォームからお送りください。'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/contact/',
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
  },
}

export default function ContactPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: 'お問い合わせ' },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="hero-wrapper">
      <Breadcrumb items={[{ label: 'お問い合わせ' }]} />

      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">お問い合わせ</h1>
            <p className="hero-description">
              お仕事のご依頼等、ご意見はこちらのフォームからお送りください。
            </p>
          </div>
        </div>
      </header>
      </div>

      <section className="l-section">
        <div className="l-container">
          <div className="contact-form-wrapper">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdy16Wq3RKy8ygOSGS0h1lYT05CqrH_Z--5beOJfLON7McoKQ/viewform?embedded=true"
              width="100%"
              height="1000"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="お問い合わせフォーム"
              loading="lazy"
            >
              読み込んでいます…
            </iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
