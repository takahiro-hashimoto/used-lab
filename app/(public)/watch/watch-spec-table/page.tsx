import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllWatchModels, getAllProductShopLinksByType } from '@/lib/queries'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'

const GLOSSARY_ITEMS = [
  { title: 'サイズ', icon: 'fa-solid fa-ruler', desc: '各モデルごとに若干サイズが異なるほか、シリーズ7以降のモデルはベゼルがかなり薄くなっている。' },
  { title: '常時点灯ディスプレイ', icon: 'fa-solid fa-sun', desc: '腕をあげなくても画面の確認ができるようになったり、より時計らしい振る舞いができてファッション性が高くなる。' },
  { title: '急速充電', icon: 'fa-solid fa-bolt', desc: '短時間の充電で1日中使用できる便利な機能。モデルごとに詳細スペックは異なるがシリーズ10では高速充電に約30分で最大80%のバッテリー充電が可能。' },
  { title: '血中酸素濃度', icon: 'fa-solid fa-droplet', desc: '専用センサーとアプリで血液中の酸素レベルを測定。健康状態の変化や呼吸機能の指標として活用可能。' },
  { title: '心電図', icon: 'fa-solid fa-heart-pulse', desc: 'Digital Crownに指を当てて心電図を記録。心房細動などの不整脈を検出し、早期の健康チェックに役立つ。' },
  { title: '衝突検出機能', icon: 'fa-solid fa-car-burst', desc: '自動車事故のような強い衝撃を検知すると、緊急通報サービスに自動で連絡し、現在地も共有してくれる安全機能。' },
  { title: '転倒検出', icon: 'fa-solid fa-person-falling', desc: 'ユーザーが激しく転倒したことを検知すると、アラートを表示して動きがない場合には緊急通報を自動で実行。特に高齢者の安全を守る機能として注目されている。' },
  { title: '皮膚温測定機能', icon: 'fa-solid fa-temperature-half', desc: '皮膚の温度を定期的に測定し、月経周期の予測や体調の変化を可視化して、より深い健康管理をサポート。' },
  { title: 'ダブルタップ', icon: 'fa-solid fa-hand-pointer', desc: '片手がふさがっているときでも、指先で2回タップするだけで着信応答や通知の確認などの操作が可能になるジェスチャー機能。' },
  { title: '日本語入力', icon: 'fa-solid fa-keyboard', desc: '音声入力・手書き入力・フリック入力を使って、Apple Watch上でスムーズに日本語メッセージを作成できる。' },
  { title: '睡眠時無呼吸の通知', icon: 'fa-solid fa-bed', desc: '睡眠中の呼吸の乱れを検知し、無呼吸の可能性がある場合にユーザーへ通知。睡眠の質や健康のチェックに活用。' },
  { title: '耐水性能', icon: 'fa-solid fa-water', desc: 'Apple Watchは最大50メートルの耐水性能を備えており、日常の手洗いや雨、さらには水泳などの軽い水中アクティビティにも対応可能。' },
  { title: '高度計', icon: 'fa-solid fa-mountain', desc: 'リアルタイムでの高度変化を記録できる高度計を内蔵しており、登山やハイキングなどのアクティビティで活用されている。' },
]
import Breadcrumb from '@/app/components/Breadcrumb'
import WatchArticleFooter from '@/app/components/watch/WatchArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる',
  description:
    '歴代Apple Watchのスペック比較表一覧です。Series・SE・Ultraの性能差や機能の違いを一目で確認できます。',
  alternates: { canonical: '/watch/watch-spec-table/' },
  openGraph: {
    title: '歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる',
    description: '歴代Apple Watchのスペック比較表一覧です。Series・SE・Ultraの性能差や機能の違いを一目で確認できます。',
    url: '/watch/watch-spec-table/',
    images: [{ url: getHeroImage('/watch/watch-spec-table/'), width: 1200, height: 630, alt: '歴代Apple Watchスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる',
    description: '歴代Apple Watchのスペック比較表一覧です。Series・SE・Ultraの性能差や機能の違いを一目で確認できます。',
    images: [getHeroImage('/watch/watch-spec-table/')],
  },
}

export default async function WatchSpecTablePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllWatchModels(),
    getAllProductShopLinksByType('watch'),
  ])

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全購入ガイド', item: 'https://used-lab.jp/watch' },
      { '@type': 'ListItem', position: 3, name: '歴代Apple Watchスペック比較表' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/watch-spec-table/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '【2025年】歴代Apple Watchのスペック＆性能比較表',
    description: '歴代Apple Watchのスペック比較表一覧。Series・SE・Ultraの性能差を一目で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/watch/watch-spec-table/',
  })

  // シリアライズ可能な形に変換
  const serializedModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    cpu: m.cpu,
    size: m.size,
    strage: m.strage,
    material: m.material,
    battery: m.battery,
    water_resistance: m.water_resistance,
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
    altimeter: m.altimeter,
    blood_pressure: m.blood_pressure,
    sleep_score: m.sleep_score,
    max_brightness: m.max_brightness,
    advance: m.advance,
  }))

  const serializedLinks = allShopLinks.map((l) => ({
    product_type: l.product_type,
    product_id: l.product_id,
    shop_id: l.shop_id,
    url: l.url,
  }))


  return (
    <>
    <main>
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古Apple Watch完全購入ガイド', href: '/watch' },
            { label: '歴代Apple Watchスペック比較表' },
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
                歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/watch/watch-spec-table/')}
                  alt="歴代Apple Watchスペック比較表のイメージ"
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
              <p>Apple WatchはSeries・SE・Ultraと多くのラインナップがあり、世代ごとにスペックが異なります。こんな悩みをお持ちの方も多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>自分の用途にはどのApple Watchが合うのかわからない…</li>
                <li>型落ちApple Watchでも十分なスペックなのか知りたい!</li>
              </ul>
              <p>本記事では<strong>歴代Apple Watchの主要スペックを一覧表で比較</strong>し、進化ポイントをわかりやすくまとめました。Apple Watchを購入する際の参考にしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link href="/watch">中古Apple Watch購入ガイド</Link>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li>
                <a href="#spec-table" className="toc-item">
                  歴代Apple Watchスペック比較表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#compare" className="toc-item">
                  気になる2機種スペックを比較{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#evolution" className="toc-item">
                  歴代Apple Watchの主な進化点{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#glossary" className="toc-item">
                  Apple Watch各機能の用語解説{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          </div>
        </nav>
        <div className="l-sections">
        {/* セクション */}
        <SpecTable models={serializedModels} shopLinks={serializedLinks} />
        <DualCompare models={serializedModels} shopLinks={serializedLinks} />
        <EvolutionTimeline models={serializedModels} />
        <GlossarySection productName="Apple Watch" items={GLOSSARY_ITEMS} />
        </div>
      </article>
    </main>
    <WatchArticleFooter pageUrl="https://used-lab.jp/watch/watch-spec-table/" pageTitle="歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる" excludeHref={["/watch/watch-spec-table/", "/watch/recommend/"]} />
    </>
  )
}
