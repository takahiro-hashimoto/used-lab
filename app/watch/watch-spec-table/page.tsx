import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllWatchModels, getAllProductShopLinksByType } from '@/lib/queries'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'

const GLOSSARY_ITEMS = [
  { title: 'サイズ', desc: '各モデルごとに若干サイズが異なるほか、シリーズ7以降のモデルはベゼルがかなり薄くなっている。' },
  { title: '常時点灯ディスプレイ', desc: '腕をあげなくても画面の確認ができるようになったり、より時計らしい振る舞いができてファッション性が高くなる。' },
  { title: '急速充電', desc: '短時間の充電で1日中使用できる便利な機能。モデルごとに詳細スペックは異なるがシリーズ10では高速充電に約30分で最大80%のバッテリー充電が可能。' },
  { title: '血中酸素濃度', desc: '専用センサーとアプリで血液中の酸素レベルを測定。健康状態の変化や呼吸機能の指標として活用可能。' },
  { title: '心電図', desc: 'Digital Crownに指を当てて心電図を記録。心房細動などの不整脈を検出し、早期の健康チェックに役立つ。' },
  { title: '衝突検出機能', desc: '自動車事故のような強い衝撃を検知すると、緊急通報サービスに自動で連絡し、現在地も共有してくれる安全機能。' },
  { title: '転倒検出', desc: 'ユーザーが激しく転倒したことを検知すると、アラートを表示して動きがない場合には緊急通報を自動で実行。特に高齢者の安全を守る機能として注目されている。' },
  { title: '皮膚温測定機能', desc: '皮膚の温度を定期的に測定し、月経周期の予測や体調の変化を可視化して、より深い健康管理をサポート。' },
  { title: 'ダブルタップ', desc: '片手がふさがっているときでも、指先で2回タップするだけで着信応答や通知の確認などの操作が可能になるジェスチャー機能。' },
  { title: '日本語入力', desc: '音声入力・手書き入力・フリック入力を使って、Apple Watch上でスムーズに日本語メッセージを作成できる。' },
  { title: '睡眠時無呼吸の通知', desc: '睡眠中の呼吸の乱れを検知し、無呼吸の可能性がある場合にユーザーへ通知。睡眠の質や健康のチェックに活用。' },
  { title: '耐水性能', desc: 'Apple Watchは最大50メートルの耐水性能を備えており、日常の手洗いや雨、さらには水泳などの軽い水中アクティビティにも対応可能。' },
  { title: '高度計', desc: 'リアルタイムでの高度変化を記録できる高度計を内蔵しており、登山やハイキングなどのアクティビティで活用されている。' },
]
import ShareBox from '@/app/components/ShareBox'

export const metadata: Metadata = {
  title: '歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる | ユーズドラボ',
  description:
    '歴代Apple Watchのスペック比較表一覧です。Series・SE・Ultraの性能差や機能の違いを一目で確認できます。',
  openGraph: {
    title: '歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる | ユーズドラボ',
    description: '歴代Apple Watchのスペック比較表一覧です。Series・SE・Ultraの性能差や機能の違いを一目で確認できます。',
    url: '/watch/watch-spec-table/',
    images: [{ url: '/images/watch/watch-11.jpg', width: 360, height: 360, alt: '歴代Apple Watchスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる | ユーズドラボ',
    description: '歴代Apple Watchのスペック比較表一覧です。Series・SE・Ultraの性能差や機能の違いを一目で確認できます。',
    images: ['/images/watch/watch-11.jpg'],
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
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全ガイド', item: 'https://used-lab.com/watch' },
      { '@type': 'ListItem', position: 3, name: '歴代Apple Watchスペック比較表' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '【2025年】歴代Apple Watchのスペック＆性能比較表',
    description: '歴代Apple Watchのスペック比較表一覧。Series・SE・Ultraの性能差を一目で確認できます。',
    datePublished: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://used-lab.com/watch/watch-spec-table/' },
  }

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
  }))

  const serializedLinks = allShopLinks.map((l) => ({
    product_type: l.product_type,
    product_id: l.product_id,
    shop_id: l.shop_id,
    url: l.url,
  }))

  return (
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
                <Link href="/watch">中古Apple Watch完全ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">歴代Apple Watchスペック比較表</li>
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
                歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる
              </h1>
              <div className="hero-actions">
                <a href="#spec-table" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-table-list" aria-hidden="true"></i>
                  <span>スペック表を見る</span>
                </a>
                <a href="#compare" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-chart-bar" aria-hidden="true"></i>
                  <span>2機種を比較する</span>
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
                  src="/images/watch/watch-11.jpg"
                  alt="歴代Apple Watchスペック比較表のイメージ"
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
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
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
        </nav>

        {/* セクション */}
        <SpecTable models={serializedModels} shopLinks={serializedLinks} />
        <DualCompare models={serializedModels} shopLinks={serializedLinks} />
        <EvolutionTimeline />
        <GlossarySection productName="Apple Watch" items={GLOSSARY_ITEMS} />
        <ShareBox url="https://used-lab.com/watch/watch-spec-table/" text="歴代Apple Watchスペック比較表！各世代の性能の違いがすぐわかる" />
      </article>
    </main>
  )
}
