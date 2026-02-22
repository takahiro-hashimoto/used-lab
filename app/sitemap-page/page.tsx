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
import { GUIDE_DATE_LABEL as IPHONE_GUIDE_DATE } from '@/lib/data/iphone-guide'
import { GUIDE_DATE_LABEL as IPAD_GUIDE_DATE } from '@/lib/data/ipad-guide'
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

type Category = {
  id: string
  label: string
  icon: string
  basePath: string
  staticPages: { href: string; label: string }[]
}

export default async function SitemapPage() {
  const [iPhoneModels, iPadModels, watchModels, macBookModels, airPodsModels] = await Promise.all([
    getAllIPhoneModels(),
    getAllIPadModels(),
    getAllWatchModels(),
    getAllMacBookModels(),
    getAllAirPodsModels(),
  ])

  const categories: Category[] = [
    {
      id: 'iphone',
      label: 'iPhone',
      icon: 'fa-mobile-screen',
      basePath: '/iphone',
      staticPages: [
        { href: '/iphone/', label: `中古iPhone完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${IPHONE_GUIDE_DATE}版】` },
        { href: '/iphone/recommend/', label: `中古iPhoneおすすめ機種${IPHONE_REC_COUNT}選｜目的別に狙い目モデルを解説【${IPHONE_REC_DATE}版】` },
        { href: '/iphone/used-iphone-attention/', label: '中古iPhoneはやめた方がいい？購入前に確認すべき注意点まとめ【2026年版】' },
        { href: '/iphone/used-iphone-support/', label: 'iPhoneはいつまで使える？機種別のサポート期間目安まとめ' },
        { href: '/iphone/iphone-shop/', label: `中古iPhoneを買うならどこ？ECサイト・ショップのおすすめを紹介【${IPHONE_SHOP_DATE}】` },
        { href: '/iphone/iphone-spec-table/', label: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる' },
        { href: '/iphone/price-info/', label: `iPhoneの中古相場一覧 | 歴代${iPhoneModels.length}機種の価格推移を独自集計【${IPHONE_PRICE_MONTH}】` },
        { href: '/iphone/filter-search/', label: 'iPhone機種診断シミュレーター｜自分に合うおすすめ中古スマホがすぐわかる【2026年版】' },
        { href: '/iphone/battery-compare/', label: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？' },
        { href: '/iphone/iphone-camera/', label: 'iPhoneのカメラ性能の違いは何？歴代モデルの機能を比較' },
      ],
    },
    {
      id: 'ipad',
      label: 'iPad',
      icon: 'fa-tablet-screen-button',
      basePath: '/ipad',
      staticPages: [
        { href: '/ipad/', label: `中古iPad完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${IPAD_GUIDE_DATE}版】` },
        { href: '/ipad/recommend/', label: `中古iPadのおすすめ${IPAD_REC_COUNT}機種を解説。狙い目の型落ちモデルどれ？【${IPAD_REC_DATE}版】` },
        { href: '/ipad/used-ipad-attention/', label: '中古iPadはやめた方がいい？購入前に確認すべき注意点まとめ' },
        { href: '/ipad/used-ipad-support/', label: 'iPadはいつまで使える？機種別のサポート期間目安まとめ' },
        { href: '/ipad/ipad-shop/', label: `中古iPadはどこで買う？ECサイト・ショップのおすすめを紹介【${IPAD_SHOP_DATE}】` },
        { href: '/ipad/ipad-spec-table/', label: '歴代iPadスペック比較表！各世代の性能の違いがすぐわかる' },
        { href: '/ipad/ipad-price-info/', label: `iPadの中古相場一覧 | 歴代${iPadModels.length}機種の価格推移を独自集計【${IPAD_PRICE_MONTH}】` },
        { href: '/ipad/ipad-filter-search/', label: 'iPad機種診断シミュレーター｜自分に合うおすすめ中古iPadがすぐわかる【2026年版】' },
        { href: '/ipad/apple-pencil-compare/', label: 'Apple Pencilの違いを比較！あなたにぴったりのアップルペンシルがわかる' },
        { href: '/ipad/wifi-cellular/', label: 'iPadはWi-Fiモデルとセルラーモデルどっちがおすすめ？両者の違い4つを比較' },
      ],
    },
    {
      id: 'macbook',
      label: 'MacBook',
      icon: 'fa-laptop',
      basePath: '/macbook',
      staticPages: [
        { href: '/macbook/recommend/', label: `中古MacBookおすすめ${MACBOOK_REC_COUNT}機種を解説。狙い目の型落ちモデルはどれ？【${MACBOOK_REC_DATE}版】` },
        { href: '/macbook/used-macbook-attention/', label: '中古MacBookはやめた方がいい？購入前に確認すべき注意点まとめ' },
        { href: '/macbook/used-macbook-support/', label: 'MacBookはいつまで使える？各機種ごとの寿命や買い替えのタイミングを解説' },
        { href: '/macbook/macbook-shop/', label: `中古MacBookはどこで買う？ECサイト・ショップのおすすめを紹介【${MACBOOK_SHOP_DATE}】` },
        { href: '/macbook/macbook-spec-table/', label: '歴代MacBookスペック比較表！Air・Proの性能差や違いがすぐわかる' },
      ],
    },
    {
      id: 'watch',
      label: 'Apple Watch',
      icon: 'fa-clock',
      basePath: '/watch',
      staticPages: [
        { href: '/watch/recommend/', label: `中古Apple Watchのおすすめ${WATCH_REC_COUNT}機種を解説。狙い目の型落ちモデルはどれ？【${WATCH_REC_DATE}版】` },
        { href: '/watch/used-watch-attention/', label: '中古Apple Watchはやめた方がいい？購入前に確認すべき注意点まとめ' },
        { href: '/watch/used-watch-support/', label: 'Apple Watchはいつまで使える？機種別のサポート期間目安まとめ' },
        { href: '/watch/watch-shop/', label: `中古Apple Watchはどこで買う？ECサイト・ショップのおすすめを紹介【${WATCH_SHOP_DATE}】` },
        { href: '/watch/watch-spec-table/', label: '歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる' },
        { href: '/watch/watch-price-info/', label: `Apple Watchの中古相場一覧 | 歴代${watchModels.length}機種の価格推移を独自集計【${WATCH_PRICE_MONTH}】` },
        { href: '/watch/watch-filter-search/', label: 'Apple Watch機種診断シミュレーター｜自分に合うおすすめ中古アップルウォッチがすぐわかる【2026年版】' },
      ],
    },
    {
      id: 'airpods',
      label: 'AirPods',
      icon: 'fa-headphones',
      basePath: '/airpods',
      staticPages: [
        { href: '/airpods/recommend/', label: `中古AirPodsおすすめ${AIRPODS_REC_COUNT}機種を解説。狙い目の型落ちモデルはどれ？【${AIRPODS_REC_DATE}版】` },
        { href: '/airpods/price/', label: `AirPodsの中古相場一覧 | 歴代${airPodsModels.length}機種の価格推移を独自集計【${AIRPODS_PRICE_MONTH}】` },
      ],
    },
  ]

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
              ユーズドラボの全ページ一覧です
            </p>
          </div>
        </div>
      </header>

      <nav className="l-section l-section--sm" aria-label="カテゴリ選択">
        <div className="l-container">
          <div className="l-grid l-grid--5col sitemap-jump-nav">
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="sitemap-jump-item">
                <i className={`fa-solid ${cat.icon}`} aria-hidden="true"></i>
                <span>{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

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
