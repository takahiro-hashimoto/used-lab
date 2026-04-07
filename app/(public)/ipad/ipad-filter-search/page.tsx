import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import { getAllIPadModels, getAllProductShopLinksByType, getAllIPadAccessories, getAllIPadAccessoryCompatibility } from '@/lib/queries'
import { buildAccessoryLookup, getPencilTextFromAccessories, getKeyboardTextFromAccessories } from '@/lib/utils/ipad-helpers'
import IconCard from '@/app/components/IconCard'
import type { IPadPriceLog } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import IPadFilterSearchApp from './components/IPadFilterSearchApp'
import ShareBox from '@/app/components/ShareBox'
import IPadRelatedLinks from '@/app/components/ipad/IPadRelatedLinks'
import IPadPopularSection from '@/app/components/support/popular/IPadPopularSection'
import { getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'iPad機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる【2026年版】',
  description:
    '目的・予算・こだわり条件から、あなたに最適な中古iPadを無料で診断。iPad mini〜iPad Pro 13インチまで全機種のデータベースから最適な1台を提案します。',
  alternates: { canonical: '/ipad/ipad-filter-search/' },
  openGraph: {
    title: 'iPad機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる【2026年版】',
    description: '目的・予算・こだわり条件から、あなたに最適な中古iPadを無料で診断。',
    url: '/ipad/ipad-filter-search/',
    images: [{ url: getHeroImage('/ipad/ipad-filter-search/'), width: 1200, height: 630, alt: 'iPad機種診断シミュレーター' }],
  },
  twitter: {
    title: 'iPad機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる【2026年版】',
    description: '目的・予算・こだわり条件から、あなたに最適な中古iPadを無料で診断。',
    images: [getHeroImage('/ipad/ipad-filter-search/')],
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
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad購入完全ガイド', item: 'https://used-lab.jp/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPad機種診断シミュレーター' },
    ],
  }

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iPad機種診断シミュレーター',
    description: `目的・予算・こだわり条件から、あなたに最適な中古iPadを無料で診断。全${totalModels}機種のデータベースから最適な1台を提案します。`,
    url: 'https://used-lab.jp/ipad/ipad-filter-search/',
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

    const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/ipad-filter-search/page.tsx')

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
            { label: '中古iPad購入完全ガイド', href: '/ipad' },
            { label: 'iPad機種診断' },
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
                iPad機種診断シミュレーター｜選び方がわからなくてもどれを買うべきかわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/ipad/ipad-filter-search/')}
                  alt="iPad機種診断シミュレーターのイメージ"
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
              <p>「どのiPadを買えばいいかわからない…」そんな悩みを解決する<strong>iPad機種診断ツール</strong>です。</p>
              <p>最新のiPad Pro M4からコスパ抜群の型落ちモデルまで、あなたの使用目的・予算・こだわり条件に合わせて最適な<Link href="/ipad">中古iPad</Link>を無料で診断。<strong>{totalModels}機種のデータベース</strong>から、あなたにぴったりの1台を見つけましょう。</p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link href="/ipad/">中古iPad購入完全ガイド</Link>」も参考にしてみてください！</p>
            </div>
          </div>
        </section>

        {/* イントロカード */}
        <section className="l-section l-section--no-pt" aria-label="診断の特徴">
          <div className="l-container">
            <div className="l-grid l-grid--3col l-grid--gap-lg">
              <IconCard icon="fa-solid fa-bolt" title="かんたん30秒診断" as="p">
                <p>質問に答えるだけで、あなたに最適なiPadを自動でシミュレーション。難しい知識は不要です。</p>
              </IconCard>
              <IconCard icon="fa-solid fa-yen-sign" title="リアルタイム価格表示" as="p">
                <p>イオシス・ゲオ・じゃんぱらの中古価格を毎日更新。最安値がすぐにわかります。</p>
              </IconCard>
              <IconCard icon="fa-solid fa-check-double" title={`全${totalModels}機種を網羅`} as="p">
                <p>iPad mini〜iPad Pro 13インチまで、現在中古市場で流通する全モデルを比較・診断できます。</p>
              </IconCard>
            </div>
          </div>
        </section>
        <div className="l-sections">
        {/* 診断フィルター + 結果 */}
        <IPadFilterSearchApp models={modelsData} shopLinks={shopLinksData} />
        </div>

        <div className="l-sections">
        {/* 診断ロジック説明 */}
        <section className="l-section" aria-labelledby="heading-logic">
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

        {/* よくある質問 */}
        <FaqSection
          title="iPad機種診断に関するよくある質問"
          description="診断に関してよくある質問をまとめました。"
          items={FAQ_ITEMS}
        />
        <IPadPopularSection />
        <IPadRelatedLinks excludeHref={["/ipad/ipad-filter-search/", "/ipad/recommend/"]} />
        <ShareBox url="https://used-lab.jp/ipad/ipad-filter-search/" text="iPad機種診断シミュレーター｜自分に合うおすすめ中古iPadがすぐわかる【2026年版】" />
        </div>
      </article>
    </main>
  )
}
