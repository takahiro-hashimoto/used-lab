import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import HeroMeta from '@/app/components/HeroMeta'
import { getTodayDate } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import { searchRenewedGroups } from '@/lib/amazon'
import { renewedSubType, cleanRenewedTitle, RENEWED_CATEGORY_LINKS } from '@/lib/renewed-filters'
import AmazonRenewedFaq from './AmazonRenewedFaq'
import AmazonRenewedGuide from './AmazonRenewedGuide'
import RenewedCategoryGrid from './RenewedCategoryGrid'

// 1日1回だけ再生成（API取得）。価格を24時間超は保持しないToSに合わせ23時間に設定。
export const revalidate = 82800

const PAGE_TITLE = '【毎日更新】Amazon整備済み品のiPhone、iPad、Mac、Apple Watchまとめ'
const PAGE_DESCRIPTION =
  '現在のAmazon整備済み品（Renewed）のApple製品を、iPhone・iPad・Mac・Apple Watch・AirPods別に毎日自動更新。メリット・デメリットやApple公式整備済製品との違いも解説しています。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/amazon-renewed/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/amazon-renewed/',
    images: [getHeroImage('/amazon-renewed/')],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/amazon-renewed/')],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
    { '@type': 'ListItem', position: 2, name: 'Amazon整備済み品まとめ' },
  ],
}

export default async function AmazonRenewedPage() {
  const { dateStr, dateDisplay } = getTodayDate()
  const groups = await searchRenewedGroups()

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="hero-wrapper">
        <Breadcrumb items={[{ label: 'Amazon整備済み品まとめ' }]} />
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title">{PAGE_TITLE}</h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/amazon-renewed/')}
                  alt="Amazon整備済み品まとめのイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </figure>
            </div>
          </div>
        </header>
      </div>

        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>Amazon整備済み品として出品のApple製品を自動集計し、1日に一回に最新の在庫・価格へ更新しています。</p>
              <p>気になっている商品が整備済み品として出品されてないかチェックするのにご活用ください！</p>
            </div>
          </div>
        </section>
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
              <p className="toc-title">
                <i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次
              </p>
              <ol className="l-grid l-grid--3col u-list-reset">
                {groups.map((g) => (
                  <li key={g.key}>
                    <a href={`#${g.key}`} className="toc-item">
                      {g.label} <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#merit" className="toc-item">
                    Amazon整備済み品とは <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#diff" className="toc-item">
                    Apple整備済み品との違い <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#cons" className="toc-item">
                    購入前の注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#check" className="toc-item">
                    失敗しない選び方 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </nav>

        <div className="l-sections">
        {groups.length === 0 ? (
          <section className="l-section">
            <div className="l-container">
              <p className="m-section-desc">
                整備済み品を読み込めませんでした。少し時間をおいて再度ご確認ください。
              </p>
            </div>
          </section>
        ) : (
          groups.map((g) => (
            <section key={g.key} id={g.key} className="l-section">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg">
                  Amazon整備済み品の{g.label}
                </h2>
                <p className="m-section-desc">
                  現在Amazonで購入できる整備済みの{g.label}を{g.items.length}件紹介。
                  {RENEWED_CATEGORY_LINKS[g.key] && (
                    <>
                      <br />
                      お買い得な機種が知りたい方は「
                      <Link href={RENEWED_CATEGORY_LINKS[g.key].href}>
                        {RENEWED_CATEGORY_LINKS[g.key].label}
                      </Link>」
                      もご覧ください。
                    </>
                  )}
                </p>
                <RenewedCategoryGrid
                  categoryKey={g.key}
                  items={g.items.map((it) => ({
                    asin: it.asin,
                    title: cleanRenewedTitle(it.title),
                    url: it.url,
                    imageUrl: it.imageUrl,
                    priceDisplay: it.priceDisplay,
                    subType: renewedSubType(it.title, g.key),
                  }))}
                />
              </div>
            </section>
          ))
        )}

        <AmazonRenewedGuide />
        <AmazonRenewedFaq />

      </div>
    </main>
  )
}
