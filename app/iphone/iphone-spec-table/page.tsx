import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPhoneModels, getAllProductShopLinksByType } from '@/lib/queries'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from './components/GlossarySection'
import ShareBox from '@/app/components/ShareBox'

export const metadata: Metadata = {
  title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる | ユーズドラボ',
  description:
    '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。iPhoneの機能がどのようにアップデートされてきたのか確認するのにご活用ください。',
  openGraph: {
    title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる | ユーズドラボ',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。iPhoneの機能がどのようにアップデートされてきたのか確認するのにご活用ください。',
    url: '/iphone/iphone-spec-table/',
    images: [{ url: '/images/iphone/iphone16pro.jpg', width: 360, height: 360, alt: '歴代iPhoneスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる | ユーズドラボ',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。',
    images: ['/images/iphone/iphone16pro.jpg'],
  },
}

export default async function IPhoneSpecTablePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllProductShopLinksByType('iphone'),
  ])

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全ガイド', item: 'https://used-lab.com/iphone' },
      { '@type': 'ListItem', position: 3, name: '歴代iPhoneスペック比較表' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '【2025年】歴代iPhoneのスペック＆性能比較表',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧。機能のアップデート履歴を一目で確認できます。',
    datePublished: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://used-lab.com/iphone/iphone-spec-table/' },
  }

  // シリアライズ可能な形に変換
  const serializedModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    cpu: m.cpu,
    ram: m.ram,
    weight: m.weight,
    strage: m.strage,
    size: m.size,
    port: m.port,
    battery: m.battery,
    display: m.display,
    resolution: m.resolution,
    sim: m.sim,
    certification: m.certification,
    image_sensor: m.image_sensor,
    apple_intelligence: m.apple_intelligence,
    magsafe: m.magsafe,
    dynamic_island: m.dynamic_island,
    promotion: m.promotion,
    accident_detection: m.accident_detection,
    action_button: m.action_button,
    camera_control: m.camera_control,
    lidar: m.lidar,
    night_mode: m.night_mode,
    portrait_mode: m.portrait_mode,
    cinematic_mode: m.cinematic_mode,
    action_mode: m.action_mode,
    macro_mode: m.macro_mode,
    apple_proraw: m.apple_proraw,
    apple_prores: m.apple_prores,
    score_single: m.score_single,
    score_multi: m.score_multi,
    score_metal: m.score_metal,
    antutu_cpu: m.antutu_cpu,
    antutu_gpu: m.antutu_gpu,
    antutu_mem: m.antutu_mem,
    antutu_ux: m.antutu_ux,
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
                <Link href="/iphone">中古iPhone完全ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">歴代iPhoneスペック比較表</li>
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
                歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる
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
                  src="/images/iphone/iphone16pro.jpg"
                  alt="歴代iPhoneスペック比較表のイメージ"
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
              <p>2019年以降に発売された<strong>歴代iPhoneのスペック比較表一覧</strong>です。</p>
              <p>iPhoneの機能がどのようにアップデートされてきたのか確認するのにご活用ください。</p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--sm l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="l-grid l-grid--3col l-grid--gap-lg">
              <a href="#spec-table" className="toc-item">
                <span>歴代iPhoneのスペック比較表一覧</span>{' '}
                <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </a>
              <a href="#compare" className="toc-item">
                <span>気になる2機種スペックを比較</span>{' '}
                <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </a>
              <a href="#benchmark" className="toc-item">
                <span>チップ性能・処理速度を比較</span>{' '}
                <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </a>
              <a href="#evolution" className="toc-item">
                <span>歴代iPhoneの主な進化点</span>{' '}
                <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </a>
              <a href="#glossary" className="toc-item">
                <span>iPhone各機能の用語解説</span>{' '}
                <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </nav>

        {/* セクション */}
        <SpecTable models={serializedModels} shopLinks={serializedLinks} />
        <DualCompare models={serializedModels} shopLinks={serializedLinks} />
        <BenchmarkSection models={serializedModels} />
        <EvolutionTimeline />
        <GlossarySection />
        <ShareBox url="https://used-lab.com/iphone/iphone-spec-table/" text="歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる" />
      </article>
    </main>
  )
}
