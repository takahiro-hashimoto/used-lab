import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getAllIPhoneModels,
  getAllIPadModels,
  getAllWatchModels,
  getAllMacBookModels,
  getAllAirPodsModels,
} from '@/lib/queries'
import Breadcrumb from '@/app/components/Breadcrumb'
import { resolveCategories, type LabelParams } from '@/lib/routes'
import { GUIDE_DATE_LABEL as IPHONE_GUIDE_DATE } from '@/lib/data/iphone-guide'
import { GUIDE_DATE_LABEL as IPAD_GUIDE_DATE } from '@/lib/data/ipad-guide'
import { GUIDE_DATE_LABEL as MACBOOK_GUIDE_DATE } from '@/lib/data/macbook-guide'
import { GUIDE_DATE_LABEL as WATCH_GUIDE_DATE } from '@/lib/data/watch-guide'
import { MVNO_PAGE_DATE_LABEL } from '@/lib/data/iphone-mvno'
import { RECOMMEND_DATE_LABEL as IPHONE_REC_DATE, RECOMMEND_COUNT as IPHONE_REC_COUNT } from '@/lib/data/iphone-recommend'
import { RECOMMEND_DATE_LABEL as IPAD_REC_DATE, RECOMMEND_COUNT as IPAD_REC_COUNT } from '@/lib/data/ipad-recommend'
import { RECOMMEND_DATE_LABEL as MACBOOK_REC_DATE, RECOMMEND_COUNT as MACBOOK_REC_COUNT } from '@/lib/data/macbook-recommend'
import { RECOMMEND_DATE_LABEL as WATCH_REC_DATE, RECOMMEND_COUNT as WATCH_REC_COUNT } from '@/lib/data/watch-recommend'
import { RECOMMEND_DATE_LABEL as AIRPODS_REC_DATE, RECOMMEND_COUNT as AIRPODS_REC_COUNT } from '@/lib/data/airpods-recommend'
import { PRICE_INFO_UPDATE_MONTH as IPHONE_PRICE_MONTH } from '@/lib/data/iphone-price-info'
import { PRICE_INFO_UPDATE_MONTH as IPAD_PRICE_MONTH } from '@/lib/data/ipad-price-info'
import { PRICE_INFO_UPDATE_MONTH as WATCH_PRICE_MONTH } from '@/lib/data/watch-price-info'
import { PRICE_INFO_UPDATE_MONTH as AIRPODS_PRICE_MONTH } from '@/lib/data/airpods-price-info'
import { SHOP_PAGE_DATE_LABEL as IPHONE_SHOP_DATE } from '@/lib/data/iphone-shop'
import { SHOP_PAGE_DATE_LABEL as IPAD_SHOP_DATE } from '@/lib/data/ipad-shop'
import { SHOP_PAGE_DATE_LABEL as MACBOOK_SHOP_DATE } from '@/lib/data/macbook-shop'
import { SHOP_PAGE_DATE_LABEL as WATCH_SHOP_DATE } from '@/lib/data/watch-shop'

const PAGE_TITLE = 'サイトマップ'
const PAGE_DESCRIPTION = 'ユーズドラボの全ページ一覧。中古iPhone・iPad・MacBook・Apple Watch・AirPodsの製品別ページをまとめて確認できます。'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/sitemap-page/',
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
  },
}

export default async function SitemapPage() {
  const [iPhoneModels, iPadModels, watchModels, macBookModels, airPodsModels] = await Promise.all([
    getAllIPhoneModels(),
    getAllIPadModels(),
    getAllWatchModels(),
    getAllMacBookModels(),
    getAllAirPodsModels(),
  ])

  // ラベルパラメータを組み立てて、一元管理ルートからカテゴリを取得
  const labelParams: LabelParams = {
    iphoneGuideDate: IPHONE_GUIDE_DATE,
    ipadGuideDate: IPAD_GUIDE_DATE,
    macbookGuideDate: MACBOOK_GUIDE_DATE,
    watchGuideDate: WATCH_GUIDE_DATE,
    mvnoDate: MVNO_PAGE_DATE_LABEL,
    iphoneRecDate: IPHONE_REC_DATE,
    iphoneRecCount: IPHONE_REC_COUNT,
    ipadRecDate: IPAD_REC_DATE,
    ipadRecCount: IPAD_REC_COUNT,
    macbookRecDate: MACBOOK_REC_DATE,
    macbookRecCount: MACBOOK_REC_COUNT,
    watchRecDate: WATCH_REC_DATE,
    watchRecCount: WATCH_REC_COUNT,
    airpodsRecDate: AIRPODS_REC_DATE,
    airpodsRecCount: AIRPODS_REC_COUNT,
    iphonePriceMonth: IPHONE_PRICE_MONTH,
    ipadPriceMonth: IPAD_PRICE_MONTH,
    watchPriceMonth: WATCH_PRICE_MONTH,
    airpodsPriceMonth: AIRPODS_PRICE_MONTH,
    iphoneShopDate: IPHONE_SHOP_DATE,
    ipadShopDate: IPAD_SHOP_DATE,
    macbookShopDate: MACBOOK_SHOP_DATE,
    watchShopDate: WATCH_SHOP_DATE,
    iphoneModelCount: iPhoneModels.length,
    ipadModelCount: iPadModels.length,
    watchModelCount: watchModels.length,
    airpodsModelCount: airPodsModels.length,
  }

  const categories = resolveCategories(labelParams)

  const modelsByCategory: Record<string, { slug: string; name: string }[]> = {
    iphone: iPhoneModels.map((m) => ({ slug: m.slug, name: m.model })),
    ipad: iPadModels.map((m) => ({ slug: m.slug, name: m.model })),
    macbook: macBookModels.map((m) => ({ slug: m.slug, name: m.model })),
    watch: watchModels.map((m) => ({ slug: m.slug, name: m.model })),
    airpods: airPodsModels.map((m) => ({ slug: m.slug, name: m.name })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: 'サイトマップ' },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="hero-wrapper">
      <Breadcrumb items={[{ label: 'サイトマップ' }]} />

      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">サイトマップ</h1>
            <p className="hero-description">
              ユーズドラボで公開している記事ページ一覧をご紹介
            </p>
          </div>
        </div>
      </header>
      </div>

      {categories.map((cat, index) => {
        const models = modelsByCategory[cat.id] || []
        const bgClass = index % 2 === 1 ? ' l-section--bg-subtle' : ''

        return (
          <section key={cat.id} id={cat.id} className={`l-section${bgClass}`}>
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg">
                <i className={`fa-solid ${cat.icon}`} aria-hidden="true"></i>{' '}
                {cat.label}
              </h2>
              <p className="m-section-desc">{cat.desc}</p>

              <h3 className="m-sub-heading m-sub-heading--no-mt">ガイド・比較ページ</h3>
              <ul className="sitemap-link-list">
                {cat.staticPages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href}>{page.label}</Link>
                  </li>
                ))}
              </ul>

              {models.length > 0 && (
                <>
                  <h3 className="m-sub-heading">モデル別ページ</h3>
                  <ul className="l-grid l-grid--3col sitemap-model-grid">
                    {models.map((model) => (
                      <li key={model.slug}>
                        <Link href={`${cat.basePath}/${model.slug}/`} className="sitemap-model-link">
                          {model.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        )
      })}
    </main>
  )
}
