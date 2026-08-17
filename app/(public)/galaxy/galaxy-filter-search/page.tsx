import Link from 'next/link'
import { filterSearchNoteParagraphs } from '@/lib/data/filter-search-note'
import { priceStatsOf } from '@/lib/utils/price-stats'
import type { Metadata } from 'next'
import Image from 'next/image'
import { forIosysOnly } from '@/lib/data/shop-ids'
import { getAllGalaxyModels, getAllProductShopLinksByType, getLatestGalaxyPriceLogsWithPricesForModels } from '@/lib/queries'
import IconCard from '@/app/components/IconCard'
import GalaxyFilterSearchApp from './components/GalaxyFilterSearchApp'
import GalaxyArticleFooter from '@/app/components/galaxy/GalaxyArticleFooter'
import { getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

const CURRENT_YEAR = new Date().getFullYear()

/**
 * metadata（title / og / twitter）と SNS シェア文言で共有する。
 *
 * 同じ文字列を複数箇所に直書きすると、片方だけ改稿されて取り残される
 * （iPhone / iPad / Watch で実際に起きた）。必ずここだけを変えること。
 */
const PAGE_TITLE = `Galaxy機種診断シミュレーター｜自分に合うおすすめ中古Galaxyがすぐわかる【${CURRENT_YEAR}年版】`
const PAGE_DESC =
  '用途・予算・こだわり条件を選ぶだけで、自分に合う中古Galaxyがわかる診断シミュレーター。S・A・Z折りたたみの各シリーズから、S Pen・DeX・microSDなどGalaxy固有の条件でも絞り込めます。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: '/galaxy/galaxy-filter-search/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: '/galaxy/galaxy-filter-search/',
    images: [{ url: getHeroImage('/galaxy/galaxy-filter-search/'), width: 1200, height: 630, alt: 'Galaxy機種診断シミュレーター' }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [getHeroImage('/galaxy/galaxy-filter-search/')],
  },
}

const FAQ_ITEMS = [
  {
    question: 'この診断は無料で利用できますか？',
    answer: 'はい、完全無料でご利用いただけます。会員登録なども一切不要です。',
  },
  {
    question: '診断結果に表示される価格は正確ですか？',
    answer: '価格は主要な中古ショップの参考価格です。実際の価格は在庫状況や端末の状態により変動しますので、必ずショップサイトで最新価格をご確認ください。各モデルの価格推移は「<a href="/galaxy/price-info/">中古Samsung Galaxyの相場・価格推移一覧</a>」で確認できます。',
  },
  {
    question: 'OSサポート期限はどうやって判定していますか？',
    answer: 'Samsungが機種ごとに公表しているOSアップデート提供年数にもとづく実値です。発売日からの推定ではありません。Galaxy S24以降とZ Fold6以降は7年、それ以前の多くは5年、Galaxy A23 5Gは4年と公表されています。',
  },
  {
    question: 'キャリア版とSIMフリー版で違いはありますか？',
    answer: 'キャリア版はSIMロックやプリインストールアプリの有無が異なる場合があります。中古で購入する際は、ネットワーク利用制限（赤ロム）の状態と合わせて確認してください。詳しくは「<a href="/galaxy/used-galaxy-attention/">中古Galaxy購入の注意点</a>」ページをご覧ください。',
  },
]

export default async function GalaxyFilterSearchPage() {
  const [allModels, shopLinks] = await Promise.all([
    getAllGalaxyModels(),
    getAllProductShopLinksByType('galaxy').then(forIosysOnly), // イオシスの導線しか使わない
  ])

  const allModelIds = allModels.map((m) => m.id)
  const PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
  const latestPriceByModel = await getLatestGalaxyPriceLogsWithPricesForModels(allModelIds, PRICE_COLS)
  const latestPriceMap = new Map(Object.entries(latestPriceByModel).map(([k, v]) => [Number(k), v]))

  // クライアントコンポーネントに渡すデータを準備。
  // 絞り込みにも表示にも使わない列は渡さない（RSCペイロードに載るため）
  const modelsData = allModels.map((m) => {
    const price = latestPriceMap.get(m.id)

    return {
      id: m.id,
      model: m.model,
      slug: m.slug,
      image: m.image,
      date: m.date,
      cpu: m.cpu,
      display: m.display,
      weight: m.weight,
      ram: m.ram,
      series: m.series,
      refresh_rate: m.refresh_rate,
      water_resistance: m.water_resistance,
      // Samsung公表の実値。iPhone版のような発売日からの推定はしない
      support_until: m.support_until,
      // 予算フィルタと表示に使う実勢相場（中央値）。価格配列は数百件になるので
      // クライアントには送らず、ここで1つの数値に畳んでから渡す
      marketPrice: priceStatsOf(price)?.median ?? null,
      iosysMin: price?.iosys_min ?? null,
      geoMin: price?.geo_min ?? null,
      janparaMin: price?.janpara_min ?? null,
      galaxy_ai: m.galaxy_ai,
      s_pen: m.s_pen,
      dex: m.dex,
      microsd: m.microsd,
      felica: m.felica,
      // tele_camera は望遠カメラの仕様文字列（例「望遠 10MP」）。
      // 絞り込みで見るのは有無だけなので、ここで boolean に畳んで渡す
      tele_camera: m.tele_camera != null,
      reverse_charging: m.reverse_charging,
    }
  })

  const shopLinksData = shopLinks.map((l) => ({
    product_id: l.product_id,
    shop_id: l.shop_id,
    url: l.url,
  }))

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Samsung Galaxyおすすめ機種・選び方ガイド', item: 'https://used-lab.jp/galaxy/' },
      { '@type': 'ListItem', position: 3, name: 'Galaxy機種診断シミュレーター' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Galaxy機種診断シミュレーター',
    description: '用途・予算・こだわり条件から自分に合う中古Galaxyが見つかる診断シミュレーター。',
    url: 'https://used-lab.jp/galaxy/galaxy-filter-search/',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
    author: {
      '@type': 'Person',
      name: 'タカヒロ',
      url: 'https://used-lab.jp/profile/',
      sameAs: [
        'https://twitter.com/takahiro_mono',
        'https://www.instagram.com/takahiro_mono',
        'https://www.youtube.com/@takahiro_mono',
        'https://digital-style.jp/',
        'https://nightscape.tokyo/',
      ],
    },
  }

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/galaxy/galaxy-filter-search/page.tsx')

  return (
    <>
      <main>
        <article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          />
          <div className="hero-wrapper">
            {/* パンくず */}
            <Breadcrumb
              items={[
                { label: '中古Samsung Galaxyおすすめ機種・選び方ガイド', href: '/galaxy/' },
                { label: 'Galaxy機種診断' },
              ]}
            />

            {/* Hero */}
            <header className="hero">
              <div className="hero-bg" aria-hidden="true">
                <div className="hero-shape hero-shape-1"></div>
                <div className="hero-shape hero-shape-2"></div>
              </div>
              <div className="hero-inner l-container">
                <div className="hero-content">
                  <h1 className="hero-title">
                    Galaxy機種診断シミュレーター｜自分に合うおすすめ中古Galaxyがすぐわかる
                  </h1>
                  <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
                </div>
                <div className="hero-visual">
                  <figure className="hero-media">
                    <Image
                      src={getHeroImage('/galaxy/galaxy-filter-search/')}
                      alt="Galaxy機種診断シミュレーターのイメージ"
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

          {/* リード文 */}
          <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
            <div className="l-container">
              <div className="lead-box">
                <p>「どのGalaxyを買えばいいかわからない…」そんな悩みを解決する<strong>Galaxy機種診断ツール</strong>です。</p>
                <p>GalaxyはS・A・Z折りたたみでキャラクターがはっきり分かれ、同じ年の機種でも選ぶ理由がまったく違います。用途・予算・こだわり条件から、<strong>{modelsData.length}機種のデータベース</strong>を絞り込めます。</p>
                <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link prefetch={false} href="/galaxy/">中古Samsung Galaxyおすすめ機種・選び方ガイド</Link>」も参考にしてみてください！</p>
              </div>
            </div>
          </section>

          {/* イントロカード */}
          <section className="l-section l-section--no-pt" aria-label="診断の特徴">
            <div className="l-container">
              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <IconCard icon="fa-solid fa-bullseye" title="用途で絞り込み" as="p">
                  <p>ゲーム・カメラ・手書きメモなど、使い方に合ったシリーズがわかる。</p>
                </IconCard>
                <IconCard icon="fa-solid fa-wallet" title="予算で絞り込み" as="p">
                  <p>希望の予算帯に収まる機種だけを表示。無理のない選択が可能。</p>
                </IconCard>
                <IconCard icon="fa-solid fa-sliders" title="Galaxy固有の条件" as="p">
                  <p>S Pen・DeX・microSDなど、Galaxyならではの条件で絞り込めます。</p>
                </IconCard>
              </div>
            </div>
          </section>

          <div className="l-sections">
            {/* 診断フィルター + 結果 */}
            <GalaxyFilterSearchApp models={modelsData} shopLinks={shopLinksData} />
          </div>

          <div className="l-sections">
            {/* 診断ロジック説明 */}
            <section className="l-section" aria-labelledby="heading-logic">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-logic">
                  診断ロジックについて
                </h2>
                <p className="m-section-desc">当診断シミュレーターの価格データと診断アルゴリズムについて解説します。</p>
                <div className="m-card m-card--shadow m-card--padded">
                  {/* 文面は lib/data/filter-search-note.ts に集約。
                      価格の基準を変えたときに各ページの書き換え漏れが出ないようにする */}
                  {filterSearchNoteParagraphs('galaxy').map((text, i) => (
                    <p key={i} style={{ marginTop: i === 0 ? undefined : '12px' }}>
                      {text.startsWith('※') ? <small>{text}</small> : text}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* よくある質問 */}
            <FaqSection
              title="Galaxy機種診断に関するよくある質問"
              description="診断に関してよくある質問をまとめました。"
              items={FAQ_ITEMS}
            />
          </div>
        </article>
      </main>
      <GalaxyArticleFooter
        pageUrl="https://used-lab.jp/galaxy/galaxy-filter-search/"
        pageTitle={PAGE_TITLE}
        excludeHref={['/galaxy/galaxy-filter-search/']}
      />
    </>
  )
}
