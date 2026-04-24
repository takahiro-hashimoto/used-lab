import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllWatchModels, getAllProductShopLinksByType, getLatestWatchPriceLogsForModels } from '@/lib/queries'
import IconCard from '@/app/components/IconCard'
import WatchFilterSearchApp from './components/WatchFilterSearchApp'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import WatchArticleFooter from '@/app/components/watch/WatchArticleFooter'
import { getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 86400

const CURRENT_YEAR = new Date().getFullYear()

export const metadata: Metadata = {
  title: `Apple Watch機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる【${CURRENT_YEAR}年版】`,
  description:
    '目的・予算・こだわり条件から、あなたに最適な中古Apple Watchを無料で診断。Apple Watch SE〜Ultra 3まで全機種のデータベースから最適な1台を提案します。',
  alternates: { canonical: '/watch/watch-filter-search/' },
  openGraph: {
    title: `Apple Watch機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる【${CURRENT_YEAR}年版】`,
    description: '目的・予算・こだわり条件から、あなたに最適な中古Apple Watchを無料で診断。',
    url: '/watch/watch-filter-search/',
    images: [{ url: getHeroImage('/watch/watch-filter-search/'), width: 1200, height: 630, alt: 'Apple Watch機種診断シミュレーター' }],
  },
  twitter: {
    title: `Apple Watch機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる【${CURRENT_YEAR}年版】`,
    description: '目的・予算・こだわり条件から、あなたに最適な中古Apple Watchを無料で診断。',
    images: [getHeroImage('/watch/watch-filter-search/')],
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

  const allModelIds = allModels.map((m) => m.id)
  const latestPriceByModel = await getLatestWatchPriceLogsForModels(allModelIds)
  const latestPriceMap = new Map(Object.entries(latestPriceByModel).map(([k, v]) => [Number(k), v]))

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
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch購入完全ガイド', item: 'https://used-lab.jp/watch' },
      { '@type': 'ListItem', position: 3, name: 'Apple Watch機種診断シミュレーター' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Apple Watch機種診断シミュレーター',
    description: `目的・予算・こだわり条件から、あなたに最適な中古Apple Watchを無料で診断。全${totalModels}機種のデータベースから最適な1台を提案します。`,
    url: 'https://used-lab.jp/watch/watch-filter-search/',
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


    const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/watch-filter-search/page.tsx')

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
            { label: '中古Apple Watch購入完全ガイド', href: '/watch/' },
            { label: 'Apple Watch機種診断' },
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
                Apple Watch機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/watch/watch-filter-search/')}
                  alt="Apple Watch機種診断シミュレーターのイメージ"
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
              <p>「どのApple Watchを買えばいいかわからない...」そんな悩みを解決する<strong>Apple Watch機種診断ツール</strong>です。</p>
              <p>最新のSeries 11やUltra 3から型落ちの人気モデルまで、あなたの使用目的・予算・こだわり条件に合わせて最適な<Link href="/watch/">中古Apple Watch</Link>を無料で診断。<strong>{totalModels}機種のデータベース</strong>から、あなたにぴったりの1台を見つけましょう。</p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link href="/watch/">中古Apple Watch完全購入ガイド</Link>」も参考にしてみてください！</p>
            </div>
          </div>
        </section>

        {/* イントロカード */}
        <section className="l-section l-section--no-pt" aria-label="診断の特徴">
          <div className="l-container">
            <div className="l-grid l-grid--3col l-grid--gap-lg">
              <IconCard icon="fa-solid fa-bolt" title="かんたん30秒診断" as="p">
                <p>質問に答えるだけで、あなたに最適なApple Watchを自動でシミュレーション。難しい知識は不要です。</p>
              </IconCard>
              <IconCard icon="fa-solid fa-yen-sign" title="リアルタイム価格表示" as="p">
                <p>イオシス・ゲオ・じゃんぱらの中古価格を毎日更新。最安値がすぐにわかります。</p>
              </IconCard>
              <IconCard icon="fa-solid fa-check-double" title={`全${totalModels}機種を網羅`} as="p">
                <p>Apple Watch SE〜Ultra 3まで、現在中古市場で流通する全モデルを比較・診断できます。</p>
              </IconCard>
            </div>
          </div>
        </section>
        <div className="l-sections">
        {/* 診断フィルター + 結果 */}
        <WatchFilterSearchApp models={modelsData} shopLinks={shopLinksData} />
        </div>

        <div className="l-sections">
        {/* 診断ロジック説明 */}
        <section className="l-section" aria-labelledby="heading-logic">
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

        {/* よくある質問 */}
        <FaqSection
          title="Apple Watch機種診断に関するよくある質問"
          description="中古Apple Watch購入に関するよくある疑問にお答えします。"
          items={FAQ_ITEMS}
        />

        </div>
      </article>
    </main>
    <WatchArticleFooter pageUrl="https://used-lab.jp/watch/watch-filter-search/" pageTitle="Apple Watch機種診断シミュレーター｜自分に合うおすすめ中古アップルウォッチがすぐわかる【${CURRENT_YEAR}年版】" excludeHref={["/watch/watch-filter-search/"]} />
    </>
  )
}
