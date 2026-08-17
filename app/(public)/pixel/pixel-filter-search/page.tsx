import Link from 'next/link'
import { filterSearchNoteParagraphs } from '@/lib/data/filter-search-note'
import { priceStatsOf } from '@/lib/utils/price-stats'
import type { Metadata } from 'next'
import Image from 'next/image'
import { forIosysOnly } from '@/lib/data/shop-ids'
import { getAllPixelModels, getAllProductShopLinksByType, getLatestPixelPriceLogsWithPricesForModels } from '@/lib/queries'
import IconCard from '@/app/components/IconCard'
import PixelFilterSearchApp from './components/PixelFilterSearchApp'
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'
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
const PAGE_TITLE = `Pixel機種診断シミュレーター｜自分に合うおすすめ中古Pixelがすぐわかる【${CURRENT_YEAR}年版】`
const PAGE_DESC =
  '用途・予算・こだわり条件を選ぶだけで、自分に合う中古Google Pixelがわかる診断シミュレーター。Pro・無印・aシリーズから、望遠カメラやベストテイクなどの条件でも絞り込めます。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: '/pixel/pixel-filter-search/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: '/pixel/pixel-filter-search/',
    images: [{ url: getHeroImage('/pixel/pixel-filter-search/'), width: 1200, height: 630, alt: 'Pixel機種診断シミュレーター' }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [getHeroImage('/pixel/pixel-filter-search/')],
  },
}

const FAQ_ITEMS = [
  {
    question: 'この診断は無料で利用できますか？',
    answer: 'はい、完全無料でご利用いただけます。会員登録なども一切不要です。',
  },
  {
    question: '診断結果に表示される価格は正確ですか？',
    answer: '価格は主要な中古ショップの参考価格です。実際の価格は在庫状況や端末の状態により変動しますので、必ずショップサイトで最新価格をご確認ください。各モデルの価格推移は「<a href="/pixel/price-info/">中古Google Pixelの相場・価格推移一覧</a>」で確認できます。',
  },
  {
    question: 'OSサポート期限はどうやって判定していますか？',
    answer: 'Googleが機種ごとに公表しているOSアップデート提供年数にもとづく実値です。発売日からの推定ではありません。Pixel 8以降は7年、Pixel 7シリーズ以前は5年と公表されています。',
  },
  {
    question: 'aシリーズと無印・Proは何が違いますか？',
    answer: 'aシリーズは価格を抑えた廉価モデルで、望遠カメラを持たず、画面のリフレッシュレートも低めの世代があります。ただしPixel 8a以降はOSアップデート7年の対象で、写真のAI編集機能も無印と同じものが使えます。この診断では「ライン」で絞り込めます。',
  },
]

export default async function PixelFilterSearchPage() {
  const [allModels, shopLinks] = await Promise.all([
    getAllPixelModels(),
    getAllProductShopLinksByType('pixel').then(forIosysOnly), // イオシスの導線しか使わない
  ])

  const allModelIds = allModels.map((m) => m.id)
  const PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
  const latestPriceByModel = await getLatestPixelPriceLogsWithPricesForModels(allModelIds, PRICE_COLS)
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
      tensor_gen: m.tensor_gen,
      display: m.display,
      weight: m.weight,
      ram: m.ram,
      refresh_rate: m.refresh_rate,
      water_resistance: m.water_resistance,
      // Google公表の実値。iPhone版のような発売日からの推定はしない
      support_until: m.support_until,
      update_years: m.update_years,
      // 予算フィルタと表示に使う実勢相場（中央値）。価格配列は数百件になるので
      // クライアントには送らず、ここで1つの数値に畳んでから渡す
      marketPrice: priceStatsOf(price)?.median ?? null,
      iosysMin: price?.iosys_min ?? null,
      geoMin: price?.geo_min ?? null,
      janparaMin: price?.janpara_min ?? null,
      // tele_camera は望遠カメラの仕様文字列（例「望遠 10MP」）。
      // 絞り込みで見るのは有無だけなので、ここで boolean に畳んで渡す
      tele_camera: m.tele_camera != null,
      best_take: m.best_take,
      magic_editor: m.magic_editor,
      video_boost: m.video_boost,
      temp_sensor: m.temp_sensor,
      face_unlock: m.face_unlock,
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
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方ガイド', item: 'https://used-lab.jp/pixel/' },
      { '@type': 'ListItem', position: 3, name: 'Pixel機種診断シミュレーター' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Pixel機種診断シミュレーター',
    description: '用途・予算・こだわり条件から自分に合う中古Google Pixelが見つかる診断シミュレーター。',
    url: 'https://used-lab.jp/pixel/pixel-filter-search/',
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

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/pixel-filter-search/page.tsx')

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
                { label: '中古Google Pixelおすすめ機種・選び方ガイド', href: '/pixel/' },
                { label: 'Pixel機種診断' },
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
                    Pixel機種診断シミュレーター｜自分に合うおすすめ中古Pixelがすぐわかる
                  </h1>
                  <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
                </div>
                <div className="hero-visual">
                  <figure className="hero-media">
                    <Image
                      src={getHeroImage('/pixel/pixel-filter-search/')}
                      alt="Pixel機種診断シミュレーターのイメージ"
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
                <p>「どのPixelを買えばいいかわからない…」そんな悩みを解決する<strong>Pixel機種診断ツール</strong>です。</p>
                <p>PixelはPro・無印・aシリーズで価格も装備も分かれ、さらに世代によってOSアップデートの提供年数が違います。用途・予算・こだわり条件から、<strong>{modelsData.length}機種のデータベース</strong>を絞り込めます。</p>
                <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link prefetch={false} href="/pixel/">中古Google Pixelおすすめ機種・選び方ガイド</Link>」も参考にしてみてください！</p>
              </div>
            </div>
          </section>

          {/* イントロカード */}
          <section className="l-section l-section--no-pt" aria-label="診断の特徴">
            <div className="l-container">
              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <IconCard icon="fa-solid fa-bullseye" title="用途で絞り込み" as="p">
                  <p>カメラ・ゲーム・写真のAI編集など、使い方に合った機種がわかる。</p>
                </IconCard>
                <IconCard icon="fa-solid fa-wallet" title="予算で絞り込み" as="p">
                  <p>希望の予算帯に収まる機種だけを表示。無理のない選択が可能。</p>
                </IconCard>
                <IconCard icon="fa-solid fa-shield-halved" title="サポート期限で選ぶ" as="p">
                  <p>Google公表のOSアップデート期限を機種ごとに表示。長く使える1台を選べます。</p>
                </IconCard>
              </div>
            </div>
          </section>

          <div className="l-sections">
            {/* 診断フィルター + 結果 */}
            <PixelFilterSearchApp models={modelsData} shopLinks={shopLinksData} />
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
                  {filterSearchNoteParagraphs('pixel').map((text, i) => (
                    <p key={i} style={{ marginTop: i === 0 ? undefined : '12px' }}>
                      {text.startsWith('※') ? <small>{text}</small> : text}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* よくある質問 */}
            <FaqSection
              title="Pixel機種診断に関するよくある質問"
              description="診断に関してよくある質問をまとめました。"
              items={FAQ_ITEMS}
            />
          </div>
        </article>
      </main>
      <PixelArticleFooter
        pageUrl="https://used-lab.jp/pixel/pixel-filter-search/"
        pageTitle={PAGE_TITLE}
        excludeHref={['/pixel/pixel-filter-search/']}
      />
    </>
  )
}
