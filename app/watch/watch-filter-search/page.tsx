import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllWatchModels, getAllProductShopLinksByType } from '@/lib/queries'
import type { WatchPriceLog } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import WatchFilterSearchApp from './components/WatchFilterSearchApp'
import ShareBox from '@/app/components/ShareBox'

export const metadata: Metadata = {
  title: 'Apple Watch機種診断シミュレーター｜自分に合うおすすめ中古アップルウォッチがすぐわかる【2026年版】 | ユーズドラボ',
  description:
    '目的・予算・こだわり条件から、あなたに最適な中古Apple Watchを無料で診断。Apple Watch SE〜Ultra 3まで全機種のデータベースから最適な1台を提案します。',
  openGraph: {
    title: 'Apple Watch機種診断シミュレーター｜自分に合うおすすめ中古アップルウォッチがすぐわかる【2026年版】 | ユーズドラボ',
    description: '目的・予算・こだわり条件から、あなたに最適な中古Apple Watchを無料で診断。',
    url: '/watch/watch-filter-search/',
    images: [{ url: '/images/watch/watch-ultra2.jpg', width: 360, height: 360, alt: 'Apple Watch機種診断シミュレーター' }],
  },
  twitter: {
    title: 'Apple Watch機種診断シミュレーター｜自分に合うおすすめ中古アップルウォッチがすぐわかる【2026年版】 | ユーズドラボ',
    description: '目的・予算・こだわり条件から、あなたに最適な中古Apple Watchを無料で診断。',
    images: ['/images/watch/watch-ultra2.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: '中古Apple Watchはいつまで現役で使えますか？',
    answer: 'AppleのwatchOSサポートは、発売から約6〜7年が目安です。最新OSが使える期間だけでなく、アプリの動作推奨環境も考慮して選ぶのがポイントです。機種ごとの具体的なサポート終了予測は「<a href="/watch/used-watch-support/">Apple Watchはいつまで使える？機種別のサポート期間目安</a>」で詳しく解説しています。',
  },
  {
    question: '中古だとバッテリーの持ちが心配です。',
    answer: '中古Apple Watchの場合、バッテリー最大容量が80%以上の個体を選ぶのが一般的です。機種自体のバッテリー性能（チップの省電力性）によっても持ちは大きく変わります。Apple Watchは設定画面からバッテリー状態を確認できるので、購入前にバッテリー残量を確認することをおすすめします。',
  },
  {
    question: 'GPSモデルとCellularモデルの違いは？',
    answer: 'GPSモデルはiPhoneとの接続が必要ですが、CellularモデルはApple Watch単体で通話やデータ通信が可能です。ランニング中にiPhoneを持ち歩かない方や、緊急時の連絡手段として使いたい方はCellularモデルがおすすめですが、月額料金が発生する点に注意が必要です。',
  },
  {
    question: 'Apple Watch SEとSeriesの違いは何ですか？',
    answer: 'SEは常時表示ディスプレイ、血中酸素濃度測定、心電図機能が省略された廉価モデルです。基本的な健康管理やApple Pay、通知機能は同等です。高度なヘルスケア機能が不要な方や、初めてのApple Watchとして試したい方にはSEがコスパ良くおすすめです。各モデルのスペックは「<a href="/watch/watch-spec-table/">歴代Apple Watchのスペック比較表</a>」で比較できます。',
  },
  {
    question: '中古Apple Watchを買う際の注意点は？',
    answer: 'アクティベーションロックの有無、バッテリーの最大容量、ケースの傷やボタンの動作確認が重要です。詳しくは「<a href="/watch/used-watch-attention/">中古Apple Watchの注意点</a>」ページをご覧ください。購入先は「<a href="/watch/watch-shop/">中古Apple Watchどこで買う？</a>」で各ショップを比較しています。',
  },
]

export default async function WatchFilterSearchPage() {
  const [allModels, shopLinks] = await Promise.all([
    getAllWatchModels(),
    getAllProductShopLinksByType('watch'),
  ])

  // 各モデルの最新価格を取得
  const { data: allPriceLogs } = await supabase
    .from('watch_price_logs')
    .select('*')
    .order('logged_at', { ascending: false })

  const latestPriceMap = new Map<number, WatchPriceLog>()
  if (allPriceLogs) {
    for (const log of allPriceLogs as WatchPriceLog[]) {
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
      size: m.size,
      point: m.point,
      last_watchos: m.last_watchos,
      iosysMin: price?.iosys_min ?? null,
      geoMin: price?.geo_min ?? null,
      janparaMin: price?.janpara_min ?? null,
      // Boolean features
      always_on_display: m.always_on_display,
      fast_charge: m.fast_charge,
      blood_oxygen: m.blood_oxygen,
      cardiogram: m.cardiogram,
      accident_detection: m.accident_detection,
      fall_detection: m.fall_detection,
      skin_temperature: m.skin_temperature,
      japanese_input: m.japanese_input,
      double_tap: m.double_tap,
      sleep_tracking: m.sleep_tracking,
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
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch購入完全ガイド', item: 'https://used-lab.com/watch' },
      { '@type': 'ListItem', position: 3, name: 'Apple Watch機種診断シミュレーター' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Apple Watch機種診断シミュレーター',
    description: `目的・予算・こだわり条件から、あなたに最適な中古Apple Watchを無料で診断。全${totalModels}機種のデータベースから最適な1台を提案します。`,
    url: 'https://used-lab.com/watch/watch-filter-search/',
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
                <Link href="/watch">中古Apple Watch購入完全ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">Apple Watch機種診断</li>
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
                Apple Watch機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる
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
                  src="/images/watch/watch-ultra2.jpg"
                  alt="Apple Watch機種診断シミュレーターのイメージ"
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
              <p>「どのApple Watchを買えばいいかわからない...」そんな悩みを解決する<strong>Apple Watch機種診断ツール</strong>です。</p>
              <p>最新のSeries 11やUltra 3から型落ちの人気モデルまで、あなたの使用目的・予算・こだわり条件に合わせて最適な<Link href="/watch">中古Apple Watch</Link>を無料で診断。<strong>{totalModels}機種のデータベース</strong>から、あなたにぴったりの1台を見つけましょう。</p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link href="/watch/">中古Apple Watch完全購入ガイド</Link>」も参考にしてみてください！</p>
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
                <p className="ifd-intro-card__text">質問に答えるだけで、あなたに最適なApple Watchを自動でシミュレーション。難しい知識は不要です。</p>
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
                <p className="ifd-intro-card__text">Apple Watch SE〜Ultra 3まで、現在中古市場で流通する全モデルを比較・診断できます。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 診断フィルター + 結果 */}
        <WatchFilterSearchApp models={modelsData} shopLinks={shopLinksData} />

        {/* 診断ロジック説明 */}
        <section className="l-section l-section--bg-subtle" aria-labelledby="heading-logic">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-logic">
              Apple Watch機種診断の算出ロジックと中古価格データについて
            </h2>
            <p className="m-section-desc">当診断シミュレーターの価格データと診断アルゴリズムについて解説します。</p>
            <div className="m-card m-card--shadow m-card--padded">
              <p>当Apple Watch診断シミュレーターで表示される中古価格は、<strong>「イオシス」「ゲオ」「じゃんぱら」</strong>の大手3社からリアルタイムの在庫データを取得し、毎日更新しています。（価格推移は<Link href="/watch/watch-price-info/">歴代Apple Watchの中古相場と価格推移</Link>で紹介）</p>
              <p style={{ marginTop: '12px' }}>目的別の推奨スペック、予算条件、こだわり機能をAND条件で組み合わせて最適な機種を抽出。watchOSサポート目安はAppleの傾向（発売から約7年間サポート）に基づき算出しています。</p>
              <p style={{ marginTop: '12px' }}><small>※実際の中古Apple Watch価格はケースサイズ・素材・状態、各店舗の在庫状況により変動します。最新価格は各販売店サイトでご確認ください。</small></p>
            </div>
          </div>
        </section>

        {/* 目的別に人気の中古Apple Watch */}
        <section className="l-section" id="popular" aria-labelledby="heading-popular">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
              目的別に人気の中古Apple Watch
            </h2>
            <p className="m-section-desc">
              目的別におすすめの機種を厳選。診断で迷った方はぜひご覧ください。
            </p>
            <div className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <Image
                  src="/images/watch/watch-ultra2.jpg"
                  alt="中古Apple Watchおすすめ5選のイメージ画像"
                  className="popular-card-img"
                  width={400}
                  height={500}
                  loading="lazy"
                />
              </figure>
              <div className="popular-card-body">
                <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                <p className="popular-card-title">中古Apple Watchおすすめ5選</p>
                <p className="popular-card-desc">
                  健康管理やフィットネスに最適なモデル、コスパ重視のSEモデルなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。
                </p>
                <div>
                  <Link href="/watch/recommend" className="m-btn m-btn--primary">
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
              Apple Watch機種診断に関するよくある質問
            </h2>
            <p className="m-section-desc">中古Apple Watch購入に関するよくある疑問にお答えします。</p>

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

        <ShareBox url="https://used-lab.com/watch/watch-filter-search/" text="Apple Watch機種診断シミュレーター｜自分に合うおすすめ中古アップルウォッチがすぐわかる【2026年版】" />

      </article>
    </main>
  )
}
