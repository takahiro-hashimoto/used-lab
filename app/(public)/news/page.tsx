import type { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb'
import HeroMeta from '@/app/components/HeroMeta'
import { getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getPublishedNews } from '@/app/admin/actions'
import { sanitizeHtml } from '@/lib/sanitize'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 3600

const PAGE_TITLE = '新着情報'
const PAGE_DESCRIPTION = 'ユーズドラボの新着情報・お知らせの一覧です。サイトの更新情報やご案内をまとめています。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/news/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/news/',
    images: [{ url: getHeroImage('/news/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/news/')],
  },
}

export default async function NewsPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/news/page.tsx')
  const newsItems = await getPublishedNews()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '新着情報' },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="hero-wrapper">
        <Breadcrumb items={[{ label: '新着情報' }]} />

        <header className="hero hero--simple">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title">新着情報</h1>
              <p className="hero-description">サイトの更新情報やご案内をまとめています。</p>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} hideAdNotice />
            </div>
          </div>
        </header>
      </div>

      <div className="l-sections">
        <section className="l-section">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg">
              <i className="fa-solid fa-newspaper" aria-hidden="true"></i>{' '}
              お知らせ一覧
            </h2>

            <div className="m-card m-card--shadow m-card--padded">
              {newsItems.length > 0 ? (
                <dl className="news-list">
                  {newsItems.map((item) => (
                    <div key={item.id} className="news-list__item">
                      <dt className="news-list__date">
                        <time dateTime={item.date}>{item.date.replace(/-/g, '.')}</time>
                      </dt>
                      <dd
                        className="news-list__content"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }}
                      />
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="news-list__empty">新着情報はありません</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
