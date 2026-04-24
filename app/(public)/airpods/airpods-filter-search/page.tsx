import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllAirPodsModels, getAllProductShopLinksByType, getLatestAirPodsPriceLogsForModels } from '@/lib/queries'
import IconCard from '@/app/components/IconCard'
import AirPodsFilterSearchApp from './components/FilterSearchApp'
import AirPodsRelatedLinks from '@/app/components/airpods/AirPodsRelatedLinks'
import { getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 86400

const CURRENT_YEAR = new Date().getFullYear()

export const metadata: Metadata = {
  title: `AirPods機種診断シミュレーター｜自分に合うおすすめイヤホンがすぐわかる【${CURRENT_YEAR}年版】`,
  description:
    '3つのステップで自分にぴったりの中古AirPodsが見つかる診断シミュレーター。用途・予算・こだわり条件を選ぶだけで最適なモデルを提案します。',
  alternates: { canonical: '/airpods/airpods-filter-search/' },
  openGraph: {
    title: `AirPods機種診断シミュレーター｜自分に合うおすすめイヤホンがすぐわかる【${CURRENT_YEAR}年版】`,
    description: '3つのステップで自分にぴったりの中古AirPodsが見つかる診断シミュレーター。',
    url: '/airpods/airpods-filter-search/',
    images: [{ url: getHeroImage('/airpods/airpods-filter-search/'), width: 1200, height: 630, alt: 'AirPods機種診断シミュレーター' }],
  },
  twitter: {
    title: `AirPods機種診断シミュレーター｜自分に合うおすすめイヤホンがすぐわかる【${CURRENT_YEAR}年版】`,
    description: '3つのステップで自分にぴったりの中古AirPodsが見つかる診断シミュレーター。',
    images: [getHeroImage('/airpods/airpods-filter-search/')],
  },
}

const FAQ_ITEMS = [
  {
    question: 'この診断は無料で利用できますか？',
    answer: 'はい、完全無料でご利用いただけます。会員登録なども一切不要です。',
  },
  {
    question: '診断結果に表示される価格は正確ですか？',
    answer: '価格は主要な中古ショップの参考価格です。実際の価格は在庫状況や端末の状態により変動しますので、必ずショップサイトで最新価格をご確認ください。各モデルの価格推移は「<a href="/airpods/price-info/">中古AirPodsの相場と価格推移</a>」で確認できます。',
  },
  {
    question: '診断で提案されたモデル以外も検討すべきですか？',
    answer: '診断結果はあくまで目安です。条件を変更して再診断したり、「<a href="/airpods/recommend/">おすすめAirPods</a>」ページも合わせて参考にすることで、より納得のいく選択ができます。',
  },
  {
    question: '中古AirPodsを購入する際に注意すべき点は？',
    answer: 'バッテリーの劣化具合、イヤーチップの状態、ケースの充電性能の確認が重要です。中古AirPodsはバッテリー交換ができないため、なるべく新しいモデルを選ぶのがおすすめです。',
  },
]

export default async function AirPodsFilterSearchPage() {
  const [allModels, shopLinks] = await Promise.all([
    getAllAirPodsModels(),
    getAllProductShopLinksByType('airpods'),
  ])

  const allModelIds = allModels.map((m) => m.id)
  const latestPriceByModel = await getLatestAirPodsPriceLogsForModels(allModelIds)
  const latestPriceMap = new Map(Object.entries(latestPriceByModel).map(([k, v]) => [Number(k), v]))

  // クライアントコンポーネントに渡すデータを準備
  const modelsData = allModels.map((m) => {
    const price = latestPriceMap.get(m.id)

    return {
      id: m.id,
      name: m.name,
      slug: m.slug,
      image: m.image,
      date: m.date,
      type: m.type,
      chip: m.chip,
      battery_earphone: m.battery_earphone,
      battery_case: m.battery_case,
      port: m.port,
      fit: m.fit,
      control: m.control,
      point: m.point,
      // Boolean features
      spatial_audio: m.spatial_audio,
      magsafe: m.magsafe,
      qi_charge: m.qi_charge,
      waterproof: m.waterproof,
      anc: m.anc,
      adaptive_audio: m.adaptive_audio,
      // Price data (AirPods uses iosys, janpara, eearphone)
      iosysMin: price?.iosys_min ?? null,
      janparaMin: price?.janpara_min ?? null,
      eearphoneMin: price?.eearphone_min ?? null,
    }
  })

  const shopLinksData = shopLinks.map((l) => ({
    product_id: l.product_id,
    shop_id: l.shop_id,
    url: l.url,
  }))

  const totalModels = modelsData.length

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古AirPods購入完全ガイド', item: 'https://used-lab.jp/airpods' },
      { '@type': 'ListItem', position: 3, name: 'AirPods機種診断シミュレーター' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AirPods機種診断シミュレーター',
    description: `3つのステップで自分にぴったりの中古AirPodsが見つかる診断シミュレーター。全${totalModels}モデルのデータベースから最適な1台を提案します。`,
    url: 'https://used-lab.jp/airpods/airpods-filter-search/',
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

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/airpods/airpods-filter-search/page.tsx')

  return (
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
            { label: '中古AirPods購入完全ガイド', href: '/airpods/' },
            { label: 'AirPods機種診断' },
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
                AirPods機種診断シミュレーター｜自分に合うおすすめイヤホンがすぐわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/airpods/airpods-filter-search/')}
                  alt="AirPods機種診断シミュレーターのイメージ"
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
              <p>「どのAirPodsを買えばいいかわからない...」そんな悩みを解決する<strong>AirPods機種診断ツール</strong>です。</p>
              <p>最新のAirPods 4やAirPods Pro 2から型落ちの人気モデルまで、あなたの使用目的・予算・こだわり条件に合わせて最適な<Link href="/airpods/">中古AirPods</Link>を無料で診断。<strong>{totalModels}モデルのデータベース</strong>から、あなたにぴったりの1台を見つけましょう。</p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link href="/airpods/">中古AirPods購入完全ガイド</Link>」も参考にしてみてください！</p>
            </div>
          </div>
        </section>

        {/* イントロカード */}
        <section className="l-section l-section--no-pt" aria-label="診断の特徴">
          <div className="l-container">
            <div className="l-grid l-grid--3col l-grid--gap-lg">
              <IconCard icon="fa-solid fa-headphones" title="用途で絞り込み" as="p">
                <p>音楽鑑賞・通話・運動など、あなたの使い方に合ったモデルがわかる。</p>
              </IconCard>
              <IconCard icon="fa-solid fa-wallet" title="予算で絞り込み" as="p">
                <p>希望の予算帯に収まるモデルだけを表示。無理のない選択が可能。</p>
              </IconCard>
              <IconCard icon="fa-solid fa-sliders" title="こだわり条件" as="p">
                <p>ノイズキャンセリングや防水性能など、細かい条件でさらに絞り込めます。</p>
              </IconCard>
            </div>
          </div>
        </section>
        <div className="l-sections">
        {/* 診断フィルター + 結果 */}
        <AirPodsFilterSearchApp models={modelsData} shopLinks={shopLinksData} />
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
              <p>本診断では、各AirPodsモデルの<strong>スペック情報（チップ、装着タイプ、ノイズキャンセリング、防水性能など）</strong>と<strong>中古市場での実売価格</strong>をもとに、あなたの回答に最も合致するモデルを絞り込みます。</p>
              <p style={{ marginTop: '12px' }}>用途ごとに重要なスペック項目は異なります。例えば「音楽鑑賞重視」ならノイズキャンセリングや空間オーディオ対応を優先し、「運動用」なら防水性能やフィット感を重視した絞り込みを行います。</p>
              <p style={{ marginTop: '12px' }}>予算フィルターでは主要中古ショップ（イオシス・じゃんぱら・eイヤホン）の最安値データを参照しています。価格は日々変動するため、あくまで目安としてご活用ください。（価格推移は<Link href="/airpods/price-info/">中古AirPodsの相場と価格推移</Link>で紹介）</p>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <FaqSection
          title="AirPods機種診断に関するよくある質問"
          description="診断に関してよくある質問をまとめました。"
          items={FAQ_ITEMS}
          className="deferred-render"
        />

        <div className="deferred-render deferred-render--article-footer">
          <AirPodsRelatedLinks excludeHref={["/airpods/airpods-filter-search/", "/airpods/recommend/"]} />
        </div>
        </div>
      </article>
    </main>
  )
}
