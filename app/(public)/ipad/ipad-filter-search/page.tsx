import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPadModels, getAllProductShopLinksByType, getAllIPadAccessories, getAllIPadAccessoryCompatibility } from '@/lib/queries'
import { buildAccessoryLookup, getPencilTextFromAccessories, getKeyboardTextFromAccessories } from '@/lib/utils/ipad-helpers'
import type { IPadPriceLog } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import IPadFilterSearchApp from './components/IPadFilterSearchApp'
import ShareBox from '@/app/components/ShareBox'

export const metadata: Metadata = {
  title: 'iPad機種診断シミュレーター｜自分に合うおすすめ中古iPadがすぐわかる【2026年版】 | ユーズドラボ',
  description:
    '目的・予算・こだわり条件から、あなたに最適な中古iPadを無料で診断。iPad mini〜iPad Pro 13インチまで全機種のデータベースから最適な1台を提案します。',
  openGraph: {
    title: 'iPad機種診断シミュレーター｜自分に合うおすすめ中古iPadがすぐわかる【2026年版】 | ユーズドラボ',
    description: '目的・予算・こだわり条件から、あなたに最適な中古iPadを無料で診断。',
    url: '/ipad/ipad-filter-search/',
    images: [{ url: '/images/ipad/ipad-all.jpg', width: 360, height: 360, alt: 'iPad機種診断シミュレーター' }],
  },
  twitter: {
    title: 'iPad機種診断シミュレーター｜自分に合うおすすめ中古iPadがすぐわかる【2026年版】 | ユーズドラボ',
    description: '目的・予算・こだわり条件から、あなたに最適な中古iPadを無料で診断。',
    images: ['/images/ipad/ipad-all.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: '中古iPadの相場はいくらですか？',
    answer: '中古iPadの価格帯はモデルにより幅広く、iPad第9世代が3万円台〜、最新のiPad Pro M4は12万円以上が相場です。詳しくは「<a href="/ipad/ipad-price-info/">歴代iPadの中古相場と価格推移</a>」ページをご覧ください。',
  },
  {
    question: '中古iPadはいつまで最新OSで使えますか？',
    answer: 'Appleの傾向として、発売から約7〜8年前後が最新iPadOSのサポート目安です。各モデルの具体的なサポート期間は「<a href="/ipad/used-ipad-support/">iPadはいつまで使える？</a>」の記事で詳しく紹介しています。',
  },
  {
    question: '中古iPadはどこで買うのがおすすめですか？',
    answer: '保証が充実しているイオシス、全国に店舗があるゲオ、検品が厳しいじゃんぱらなどの専門店が安心です。各ショップの比較は「<a href="/ipad/ipad-shop/">中古iPadどこで買う？</a>」に詳しくまとめています。',
  },
  {
    question: '中古iPadを買う際の注意点はありますか？',
    answer: 'バッテリーの最大容量、アクティベーションロックの有無、ネットワーク利用制限の確認が重要です。詳しくは「<a href="/ipad/used-ipad-attention/">中古iPadの注意点</a>」ページをご覧ください。',
  },
  {
    question: '自分に最適なスペックのiPadを詳しく知りたい',
    answer: '本ツールで候補を絞り込んだ後、「<a href="/ipad/ipad-spec-table/">歴代iPadのスペック比較表</a>」を使えば、各モデルのチップ性能やディスプレイ解像度などの違いが一目でわかります。',
  },
]

export default async function IPadFilterSearchPage() {
  const [allModels, shopLinks, allAccessories, allCompatibility] = await Promise.all([
    getAllIPadModels(),
    getAllProductShopLinksByType('ipad'),
    getAllIPadAccessories(),
    getAllIPadAccessoryCompatibility(),
  ])
  const accessoryLookup = buildAccessoryLookup(allAccessories, allCompatibility)

  // 各モデルの最新価格を取得
  const { data: allPriceLogs } = await supabase
    .from('ipad_price_logs')
    .select('*')
    .order('logged_at', { ascending: false })

  const latestPriceMap = new Map<number, IPadPriceLog>()
  if (allPriceLogs) {
    for (const log of allPriceLogs as IPadPriceLog[]) {
      if (!latestPriceMap.has(log.model_id)) {
        latestPriceMap.set(log.model_id, log)
      }
    }
  }

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
      port: m.port,
      front_camera: m.front_camera,
      certification: m.certification,
      speaker: m.speaker,
      pencil: getPencilTextFromAccessories(accessoryLookup.get(m.id) || []),
      keyboard: getKeyboardTextFromAccessories(accessoryLookup.get(m.id) || []),
      last_ipados: m.last_ipados,
      iosysMin: price?.iosys_min ?? null,
      geoMin: price?.geo_min ?? null,
      janparaMin: price?.janpara_min ?? null,
      // Boolean features
      apple_intelligence: m.apple_intelligence,
      promotion: m.promotion,
      center_frame: m.center_frame,
      lidar: m.lidar,
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
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad購入完全ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPad機種診断シミュレーター' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iPad機種診断シミュレーター',
    description: `目的・予算・こだわり条件から、あなたに最適な中古iPadを無料で診断。全${totalModels}機種のデータベースから最適な1台を提案します。`,
    url: 'https://used-lab.com/ipad/ipad-filter-search/',
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

        <div className="hero-wrapper">
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
                <Link href="/ipad">中古iPad購入完全ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">iPad機種診断</li>
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
                iPad機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる
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
                  src="/images/ipad/ipad-all.jpg"
                  alt="iPad機種診断シミュレーターのイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                  priority
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
              <p>「どのiPadを買えばいいかわからない…」そんな悩みを解決する<strong>iPad機種診断ツール</strong>です。</p>
              <p>最新のiPad Pro M4からコスパ抜群の型落ちモデルまで、あなたの使用目的・予算・こだわり条件に合わせて最適な<Link href="/ipad">中古iPad</Link>を無料で診断。<strong>{totalModels}機種のデータベース</strong>から、あなたにぴったりの1台を見つけましょう。</p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link href="/ipad/">中古iPad購入完全ガイド</Link>」も参考にしてみてください！</p>
            </div>
          </div>
        </section>

        {/* イントロカード */}
        <section className="l-section l-section--no-pt" aria-label="診断の特徴">
          <div className="l-container">
            <div className="l-grid l-grid--3col">
              <div className="m-card m-card--shadow m-card--padded ifd-intro-card">
                <div className="ifd-intro-card__icon">
                  <i className="fa-solid fa-bolt" aria-hidden="true"></i>
                </div>
                <p className="ifd-intro-card__title">かんたん30秒診断</p>
                <p className="ifd-intro-card__text">質問に答えるだけで、あなたに最適なiPadを自動でシミュレーション。難しい知識は不要です。</p>
              </div>
              <div className="m-card m-card--shadow m-card--padded ifd-intro-card">
                <div className="ifd-intro-card__icon">
                  <i className="fa-solid fa-yen-sign" aria-hidden="true"></i>
                </div>
                <p className="ifd-intro-card__title">リアルタイム価格表示</p>
                <p className="ifd-intro-card__text">イオシス・ゲオ・じゃんぱらの中古価格を毎日更新。最安値がすぐにわかります。</p>
              </div>
              <div className="m-card m-card--shadow m-card--padded ifd-intro-card">
                <div className="ifd-intro-card__icon">
                  <i className="fa-solid fa-check-double" aria-hidden="true"></i>
                </div>
                <p className="ifd-intro-card__title">全{totalModels}機種を網羅</p>
                <p className="ifd-intro-card__text">iPad mini〜iPad Pro 13インチまで、現在中古市場で流通する全モデルを比較・診断できます。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 診断フィルター + 結果 */}
        <IPadFilterSearchApp models={modelsData} shopLinks={shopLinksData} />

        {/* 診断ロジック説明 */}
        <section className="l-section l-section--bg-subtle" aria-labelledby="heading-logic">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-logic">
              iPad機種診断の算出ロジックと中古価格データについて
            </h2>
            <p className="m-section-desc">当診断シミュレーターの価格データと診断アルゴリズムについて解説します。</p>
            <div className="m-card m-card--shadow m-card--padded">
              <p>当iPad診断シミュレーターで表示される中古価格は、<strong>「イオシス」「ゲオ」「じゃんぱら」</strong>の大手3社からリアルタイムの在庫データを取得し、毎日更新しています。</p>
              <p style={{ marginTop: '12px' }}>目的別の推奨スペック、予算条件、こだわり機能をAND条件で組み合わせて最適な機種を抽出。iPadOSサポート目安はAppleの傾向（発売から約7年間サポート）に基づき算出しています。</p>
              <p style={{ marginTop: '12px' }}><small>※実際の中古iPad価格は容量（GB）や状態、Wi-Fi/セルラーモデルの違い、各店舗の在庫状況により変動します。最新価格は各販売店サイトでご確認ください。</small></p>
            </div>
          </div>
        </section>

        {/* 目的別に人気の中古iPad */}
        <section className="l-section" id="popular" aria-labelledby="heading-popular">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
              目的別に人気の中古iPad
            </h2>
            <p className="m-section-desc">
              目的別におすすめの機種を厳選。診断で迷った方はぜひご覧ください。
            </p>
            <div className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <Image
                  src="/images/content/ipad-setting.webp"
                  alt="中古iPadおすすめ5選のイメージ画像"
                  className="popular-card-img"
                  width={400}
                  height={500}
                  loading="lazy"
                />
              </figure>
              <div className="popular-card-body">
                <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                <p className="popular-card-title">中古iPadおすすめ5選</p>
                <p className="popular-card-desc">
                  イラスト制作に最適なモデル、動画視聴に大画面モデルなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。
                </p>
                <div>
                  <Link href="/ipad/recommend" className="m-btn m-btn--primary">
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
              iPad機種診断に関するよくある質問
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

        <ShareBox url="https://used-lab.com/ipad/ipad-filter-search/" text="iPad機種診断シミュレーター｜自分に合うおすすめ中古iPadがすぐわかる【2026年版】" />

      </article>
    </main>
  )
}
