import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPhoneModels, getAllProductShopLinksByType } from '@/lib/queries'
import type { IPhonePriceLog } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import FilterSearchApp from './components/FilterSearchApp'
import ShareBox from '@/app/components/ShareBox'

export const metadata: Metadata = {
  title: 'iPhone機種診断シミュレーター｜自分に合うおすすめ中古スマホがすぐわかる【2026年版】 | ユーズドラボ',
  description:
    '3つのステップで自分にぴったりの中古iPhoneが見つかる診断シミュレーター。用途・予算・こだわり条件を選ぶだけで最適な機種を提案します。',
  openGraph: {
    title: 'iPhone機種診断シミュレーター｜自分に合うおすすめ中古スマホがすぐわかる【2026年版】 | ユーズドラボ',
    description: '3つのステップで自分にぴったりの中古iPhoneが見つかる診断シミュレーター。',
    url: '/iphone/filter-search/',
    images: [{ url: '/images/iphone/iphone16pro.jpg', width: 360, height: 360, alt: 'iPhone機種診断シミュレーター' }],
  },
  twitter: {
    title: 'iPhone機種診断シミュレーター｜自分に合うおすすめ中古スマホがすぐわかる【2026年版】 | ユーズドラボ',
    description: '3つのステップで自分にぴったりの中古iPhoneが見つかる診断シミュレーター。',
    images: ['/images/iphone/iphone16pro.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: 'この診断は無料で利用できますか？',
    answer: 'はい、完全無料でご利用いただけます。会員登録なども一切不要です。',
  },
  {
    question: '診断結果に表示される価格は正確ですか？',
    answer: '価格は主要な中古ショップの参考価格です。実際の価格は在庫状況や端末の状態により変動しますので、必ずショップサイトで最新価格をご確認ください。各モデルの価格推移は「<a href="/iphone/price-info/">歴代iPhoneの中古相場と価格推移</a>」で確認できます。',
  },
  {
    question: '診断で提案された機種以外も検討すべきですか？',
    answer: '診断結果はあくまで目安です。条件を変更して再診断したり、「<a href="/iphone/recommend/">おすすめ5選</a>」ページも合わせて参考にすることで、より納得のいく選択ができます。',
  },
  {
    question: '中古iPhoneを購入する際に注意すべき点は？',
    answer: 'バッテリーの最大容量、SIMロックの有無、ネットワーク利用制限（赤ロム）の確認が重要です。詳しくは「<a href="/iphone/used-iphone-attention/">中古iPhone購入の注意点</a>」ページをご覧ください。',
  },
]

export default async function IPhoneFilterSearchPage() {
  const [allModels, shopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllProductShopLinksByType('iphone'),
  ])

  // 各モデルの最新価格を取得
  const { data: allPriceLogs } = await supabase
    .from('iphone_price_logs')
    .select('*')
    .order('logged_at', { ascending: false })

  const latestPriceMap = new Map<number, IPhonePriceLog>()
  if (allPriceLogs) {
    for (const log of allPriceLogs as IPhonePriceLog[]) {
      if (!latestPriceMap.has(log.model_id)) {
        latestPriceMap.set(log.model_id, log)
      }
    }
  }

  // クライアントコンポーネントに渡すデータを準備
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
      size: m.size,
      port: m.port,
      image_sensor: m.image_sensor,
      front_camera: m.front_camera,
      battery: m.battery,
      point: m.point,
      last_ios: m.last_ios,
      iosysMin: price?.iosys_min ?? null,
      geoMin: price?.geo_min ?? null,
      janparaMin: price?.janpara_min ?? null,
      // Boolean features
      apple_intelligence: m.apple_intelligence,
      dynamic_island: m.dynamic_island,
      promotion: m.promotion,
      action_button: m.action_button,
      camera_control: m.camera_control,
      magsafe: m.magsafe,
      lidar: m.lidar,
      night_mode: m.night_mode,
      portrait_mode: m.portrait_mode,
      cinematic_mode: m.cinematic_mode,
      action_mode: m.action_mode,
      macro_mode: m.macro_mode,
      apple_proraw: m.apple_proraw,
      apple_prores: m.apple_prores,
      photography_style: m.photography_style,
      centerframe: m.centerframe,
      accident_detection: m.accident_detection,
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
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全ガイド', item: 'https://used-lab.com/iphone' },
      { '@type': 'ListItem', position: 3, name: 'iPhone機種診断シミュレーター' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iPhone機種診断シミュレーター',
    description: '3つのステップで自分にぴったりの中古iPhoneが見つかる診断シミュレーター。',
    url: 'https://used-lab.com/iphone/filter-search/',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* パンくず */}
        <nav className="breadcrumb" aria-label="パンくずリスト">
          <div className="l-container">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link href="/">
                  <i className="fa-solid fa-house" aria-hidden="true"></i>{' '}
                  <span>中古Apple製品を安く買う</span>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/iphone">中古iPhone完全ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">iPhone機種診断</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title">
                iPhone機種診断シミュレーター｜自分に合うおすすめ中古スマホがすぐわかる
              </h1>
              <div className="hero-actions">
                <a href="#ifd-step1" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-stethoscope" aria-hidden="true"></i>
                  <span>診断をはじめる</span>
                </a>
                <a href="#ifd-results" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-list" aria-hidden="true"></i>
                  <span>結果一覧を見る</span>
                </a>
              </div>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={new Date().toISOString().split('T')[0]}>
                    {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time> | 当記事のリンクには広告が含まれています
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/iphone/iphone16pro.jpg"
                  alt="iPhone機種診断シミュレーターのイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                  priority
                />
              </figure>
            </div>
          </div>
        </header>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>「どのiPhoneを買えばいいかわからない…」そんな悩みを解決する<strong>iPhone機種診断ツール</strong>です。</p>
              <p>最新のiPhoneから型落ちの人気モデルまで、あなたの使用目的・予算・こだわり条件に合わせて最適な中古iPhoneを無料で診断。<strong>30機種のデータベース</strong>から、あなたにぴったりの1台を見つけましょう。</p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link href="/airpods/">中古AirPods購入完全ガイド</Link>」も参考にしてみてください！</p>
            </div>
          </div>
        </section>

        {/* イントロカード */}
        <section className="l-section l-section--no-pt" aria-label="診断の特徴">
          <div className="l-container">
            <div className="l-grid l-grid--3col">
              <div className="m-card m-card--shadow m-card--padded ifd-intro-card">
                <div className="ifd-intro-card__icon">
                  <i className="fa-solid fa-bullseye" aria-hidden="true"></i>
                </div>
                <p className="ifd-intro-card__title">用途で絞り込み</p>
                <p className="ifd-intro-card__text">SNS・動画視聴・ゲームなど、あなたの使い方に合った機種を提案します。</p>
              </div>
              <div className="m-card m-card--shadow m-card--padded ifd-intro-card">
                <div className="ifd-intro-card__icon">
                  <i className="fa-solid fa-wallet" aria-hidden="true"></i>
                </div>
                <p className="ifd-intro-card__title">予算で絞り込み</p>
                <p className="ifd-intro-card__text">ご希望の予算帯に収まる機種だけを表示。無理のない選択ができます。</p>
              </div>
              <div className="m-card m-card--shadow m-card--padded ifd-intro-card">
                <div className="ifd-intro-card__icon">
                  <i className="fa-solid fa-sliders" aria-hidden="true"></i>
                </div>
                <p className="ifd-intro-card__title">こだわり条件</p>
                <p className="ifd-intro-card__text">画面サイズやカメラ性能など、細かい条件でさらに絞り込めます。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 診断フィルター + 結果 */}
        <FilterSearchApp models={modelsData} shopLinks={shopLinksData} />

        {/* 診断ロジック説明 */}
        <section className="l-section l-section--bg-subtle" aria-labelledby="heading-logic">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-logic">
              診断ロジックについて
            </h2>
            <p className="m-section-desc">当診断シミュレーターの価格データと診断アルゴリズムについて解説します。</p>
            <div className="m-card m-card--shadow m-card--padded">
              <p>本診断では、各iPhoneモデルの<strong>スペック情報（CPU、カメラ構成、ディスプレイサイズ、対応機能など）</strong>と<strong>中古市場での実売価格</strong>をもとに、あなたの回答に最も合致する機種を絞り込みます。</p>
              <p style={{ marginTop: '12px' }}>用途ごとに重要なスペック項目は異なります。例えば「カメラ重視」なら望遠レンズ・マクロ撮影・ProRAW対応などを優先し、「ゲーム用途」ならCPU性能やProMotionディスプレイを重視した絞り込みを行います。</p>
              <p style={{ marginTop: '12px' }}>予算フィルターでは主要中古ショップ（イオシス・ゲオ・じゃんぱら）の最安値データを参照しています。価格は日々変動するため、あくまで目安としてご活用ください。</p>
            </div>
          </div>
        </section>

        {/* 目的別に人気の中古iPhone */}
        <section className="l-section" id="popular" aria-labelledby="heading-popular">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
              目的別に人気の中古iPhone
            </h2>
            <p className="m-section-desc">
              目的別におすすめの機種を厳選。診断で迷った方はぜひご覧ください。
            </p>
            <div className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <Image
                  src="/images/content/iphone-setting.webp"
                  alt="中古iPhoneおすすめ5選のイメージ画像"
                  className="popular-card-img"
                  width={400}
                  height={500}
                  loading="lazy"
                />
              </figure>
              <div className="popular-card-body">
                <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                <p className="popular-card-title">中古iPhoneおすすめ5選</p>
                <p className="popular-card-desc">
                  カメラ性能を重視する人向け、大画面で動画やSNSを楽しみたい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。
                </p>
                <div>
                  <Link href="/iphone/recommend" className="m-btn m-btn--primary">
                    おすすめ5機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
              iPhone機種診断に関するよくある質問
            </h2>
            <p className="m-section-desc">診断に関してよくある質問をまとめました。</p>

            <div className="faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="m-card m-card--shadow faq-item">
                  <h3 className="faq-question">{item.question}</h3>
                  <div className="faq-answer">
                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ShareBox url="https://used-lab.com/iphone/filter-search/" text="iPhone機種診断シミュレーター｜自分に合うおすすめ中古スマホがすぐわかる【2026年版】" />

      </article>
    </main>
  )
}
