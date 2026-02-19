import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllMacBookModels, getAllProductShopLinksByType } from '@/lib/queries'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'

const GLOSSARY_ITEMS = [
  { title: 'CPU', desc: 'パソコンの頭脳。操作やアプリの動きをコントロール。シェフのように全体を指示する存在。' },
  { title: 'GPU', desc: '映像やグラフィックを描くパーツ。動画やゲームの表示が滑らかになる。盛り付け担当のアシスタント的存在。' },
  { title: 'メモリ', desc: '作業スペースの広さに例えられる。多いほどアプリを同時に快適に使える。' },
  { title: 'ProMotion', desc: '最大120Hzでスクロールがなめらかに。動画やアニメーションもスムーズ。' },
  { title: 'センターフレーム', desc: '通話中に顔を自動で中心にキープ。動いてもフレーム内に収まる。' },
  { title: '輝度', desc: '画面の明るさ。数値が高いほど屋外でも見やすくなる。' },
  { title: 'Retina Display', desc: 'ドットが見えないほど精細な画面。文字や写真がくっきり美しい。' },
  { title: 'Liquid Retina Display', desc: '広色域・高コントラスト対応の高画質液晶。滑らかな表示が特長。' },
  { title: 'Liquid Retina XDR Display', desc: '高輝度・HDR対応の最上位ディスプレイ。映像編集などにも最適。' },
  { title: 'Touch ID', desc: '指紋認証でロック解除やApple Payが使える。ボタンに触れるだけでOK。' },
  { title: 'Thunderbolt', desc: '高速通信や映像出力ができるUSB-C端子。1本で充電やデータ転送も可能。' },
  { title: '冷却ファン', desc: 'パソコンの熱を外に逃がす装置。高負荷時でも性能を維持しやすく、静音性も進化している。Proモデルに搭載されている。' },
  { title: 'MagSafe', desc: '磁石でカチッと接続できる充電端子。ケーブルに足を引っかけても本体が落ちにくい。' },
]
import ShareBox from '@/app/components/ShareBox'

export const metadata: Metadata = {
  title: '歴代MacBookスペック比較表！Air・Proの性能差や違いがすぐわかる | ユーズドラボ',
  description:
    '歴代MacBook Air・Proのスペック比較表一覧です。チップ性能やディスプレイ、ポート構成の違いを一目で確認できます。',
  openGraph: {
    title: '歴代MacBookスペック比較表！Air・Proの性能差や違いがすぐわかる | ユーズドラボ',
    description: '歴代MacBook Air・Proのスペック比較表一覧です。チップ性能やディスプレイ、ポート構成の違いを一目で確認できます。',
    url: '/macbook/macbook-spec-table/',
    images: [{ url: '/images/macbook/mba-13-2025.jpg', width: 360, height: 360, alt: '歴代MacBookスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代MacBookスペック比較表！Air・Proの性能差や違いがすぐわかる | ユーズドラボ',
    description: '歴代MacBook Air・Proのスペック比較表一覧です。チップ性能やディスプレイ、ポート構成の違いを一目で確認できます。',
    images: ['/images/macbook/mba-13-2025.jpg'],
  },
}

export default async function MacBookSpecTablePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllMacBookModels(),
    getAllProductShopLinksByType('macbook'),
  ])

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全ガイド', item: 'https://used-lab.com/macbook' },
      { '@type': 'ListItem', position: 3, name: '歴代MacBookスペック比較表' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '【2025年】歴代MacBookのスペック＆性能比較表',
    description: '歴代MacBook Air・Proのスペック比較表一覧。チップ性能やディスプレイの違いを一目で確認できます。',
    datePublished: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://used-lab.com/macbook/macbook-spec-table/' },
  }

  const serializedModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    shortname: m.shortname,
    slug: m.slug,
    image: m.image,
    date: m.date,
    cpu: m.cpu,
    ram: m.ram,
    strage: m.strage,
    size: m.size,
    weight: m.weight,
    display: m.display,
    resolution: m.resolution,
    luminance: m.luminance,
    port: m.port,
    hdmi: m.hdmi,
    slot: m.slot,
    magsafe: m.magsafe,
    camera: m.camera,
    speaker: m.speaker,
    promotion: m.promotion,
    fan: m.fan,
    center_frame: m.center_frame,
    apple_intelligence: m.apple_intelligence,
    battery: m.battery,
    color: m.color,
    score_single: m.score_single,
    score_multi: m.score_multi,
    score_metal: m.score_metal,
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
                <Link href="/macbook">中古MacBook完全ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">歴代MacBookスペック比較表</li>
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
                歴代MacBookスペック比較表！Air・Proの性能差や違いがすぐわかる
              </h1>
              <div className="hero-actions">
                <a href="#spec-table" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-table-list" aria-hidden="true"></i>
                  <span>スペック表を見る</span>
                </a>
                <a href="#benchmark" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-chart-bar" aria-hidden="true"></i>
                  <span>ベンチマークを見る</span>
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
                  src="/images/macbook/mba-13-2025.jpg"
                  alt="歴代MacBookスペック比較表のイメージ"
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
              <p>MacBookはAir・Proの2ラインナップがあり、世代ごとにチップ性能やディスプレイが進化しています。こんな悩みをお持ちの方も多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>AirとProのどちらが自分の用途に合うのかわからない…</li>
                <li>型落ちMacBookでも十分なスペックなのか知りたい!</li>
              </ul>
              <p>本記事では<strong>歴代MacBookの主要スペックを一覧表で比較</strong>し、進化ポイントをわかりやすくまとめました。MacBookを購入する際の参考にしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link href="/macbook">中古MacBook購入ガイド</Link>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--md">タップできる目次</h2>
            <ol className="l-grid l-grid--3col toc-list">
              <li>
                <a href="#spec-table" className="toc-item">
                  歴代MacBookスペック比較表{' '}
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
                <a href="#benchmark" className="toc-item">
                  チップ性能・処理速度を比較{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#evolution" className="toc-item">
                  歴代MacBookの主な進化点{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#glossary" className="toc-item">
                  MacBook各機能の用語解説{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* セクション */}
        <SpecTable models={serializedModels} shopLinks={serializedLinks} />
        <DualCompare models={serializedModels} shopLinks={serializedLinks} />
        <BenchmarkSection models={serializedModels} />
        <EvolutionTimeline />
        <GlossarySection productName="MacBook" items={GLOSSARY_ITEMS} />
        <ShareBox url="https://used-lab.com/macbook/macbook-spec-table/" text="歴代MacBookスペック比較表！Air・Proの性能差や違いがすぐわかる" />
      </article>
    </main>
  )
}
