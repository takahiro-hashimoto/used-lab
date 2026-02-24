import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPadModels, getAllProductShopLinksByType, getAllIPadAccessories, getAllIPadAccessoryCompatibility } from '@/lib/queries'
import { buildAccessoryLookup, getPencilTextFromAccessories, getKeyboardTextFromAccessories } from '@/lib/utils/ipad-helpers'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'

const GLOSSARY_ITEMS = [
  { title: 'CPU', desc: 'iPadの処理性能を決める中核チップ。AシリーズやMシリーズが搭載され、Mシリーズはパソコン並の高性能を誇る。' },
  { title: 'メモリ', desc: 'アプリの同時使用や動作の快適さに影響する記憶領域。容量が多いほど、重たい作業もスムーズにこなせる。Proモデルはストレージ容量ごとにメモリが異なる。' },
  { title: 'Apple Intelligence', desc: 'iPad上で動作するApple独自のAI機能。要約、画像生成、文書の書き直し、優先通知の抽出などに対応。オンデバイス処理によりプライバシーにも配慮。' },
  { title: 'ProMotion', desc: '最大120Hzのリフレッシュレートに対応する表示技術。スクロールやアニメーションが滑らかに表示され、Apple Pencil使用時の描画遅延も大幅に軽減。' },
  { title: 'センターフレーム', desc: '超広角カメラと機械学習を使い、FaceTimeやビデオ会議中に被写体を自動で追尾。動いても常に中央に映るよう画角を調整。' },
  { title: 'LiDAR機能', desc: 'レーザー光で周囲の距離を高精度に測定するセンサー。AR体験の精度向上や暗所でのピント合わせの高速化に貢献。' },
  { title: 'Retina Display', desc: 'ピクセル密度が高く、肉眼では個々のピクセルが判別できない高精細ディスプレイ。文字や画像がシャープに表示され、目に優しい。' },
  { title: 'Liquid Retina Display', desc: 'Retina Displayの進化版。滑らかな表示と広色域対応を実現し、ベゼルの細いデザインに最適化。True Toneや広視野角も特長。' },
  { title: 'Ultra Retina XDR Display', desc: '有機ELを採用した最新世代の高性能ディスプレイ。高輝度・高コントラスト・広色域に対応し、HDR映像やプロ向け制作にも対応。' },
  { title: 'Apple Pencil', desc: 'iPad専用のスタイラスペン。手書きメモやイラスト制作、PDFへの注釈などに活用。第1〜第3世代があり、対応機種や充電方式が異なる。' },
  { title: '外付けキーボード', desc: 'iPad専用のMagic KeyboardやSmart Keyboardなどが対応。タイピング作業や資料作成が快適になり、ラップトップのように使える。iPad miniシリーズ対応の外付けキーボードはない。' },
]
import ShareBox from '@/app/components/ShareBox'

export const metadata: Metadata = {
  title: '歴代iPadスペック比較表！各世代の性能の違いがすぐわかる | ユーズドラボ',
  description:
    '歴代iPadのスペック比較表一覧です。iPad Pro・Air・mini・無印の性能差や機能の違いを一目で確認できます。',
  openGraph: {
    title: '歴代iPadスペック比較表！各世代の性能の違いがすぐわかる | ユーズドラボ',
    description: '歴代iPadのスペック比較表一覧です。iPad Pro・Air・mini・無印の性能差や機能の違いを一目で確認できます。',
    url: '/ipad/ipad-spec-table/',
    images: [{ url: '/images/ipad/ipad-pro-13-2.jpg', width: 360, height: 360, alt: '歴代iPadスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代iPadスペック比較表！各世代の性能の違いがすぐわかる | ユーズドラボ',
    description: '歴代iPadのスペック比較表一覧です。iPad Pro・Air・mini・無印の性能差や機能の違いを一目で確認できます。',
    images: ['/images/ipad/ipad-pro-13-2.jpg'],
  },
}

export default async function IPadSpecTablePage() {
  const [allModels, allShopLinks, allAccessories, allCompatibility] = await Promise.all([
    getAllIPadModels(),
    getAllProductShopLinksByType('ipad'),
    getAllIPadAccessories(),
    getAllIPadAccessoryCompatibility(),
  ])
  const accessoryLookup = buildAccessoryLookup(allAccessories, allCompatibility)

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: '歴代iPadスペック比較表' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '【2025年】歴代iPadのスペック＆性能比較表',
    description: '歴代iPadのスペック比較表一覧。iPad Pro・Air・mini・無印の性能差を一目で確認できます。',
    datePublished: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://used-lab.com/ipad/ipad-spec-table/' },
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
    display_type: m.display_type,
    resolution: m.resolution,
    sim: m.sim,
    certification: m.certification,
    front_camera: m.front_camera,
    in_camera: m.in_camera,
    apple_intelligence: m.apple_intelligence,
    promotion: m.promotion,
    center_frame: m.center_frame,
    lidar: m.lidar,
    pencil: getPencilTextFromAccessories(accessoryLookup.get(m.id) || []),
    keyboard: getKeyboardTextFromAccessories(accessoryLookup.get(m.id) || []),
    speaker: m.speaker,
    color: m.color,
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
                <Link href="/ipad">中古iPad完全ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">歴代iPadスペック比較表</li>
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
                歴代iPadスペック比較表！各世代の性能の違いがすぐわかる
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
                  src="/images/ipad/ipad-pro-13-2.jpg"
                  alt="歴代iPadスペック比較表のイメージ"
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
              <p>iPadはPro・Air・mini・無印と多くのラインナップがあり、世代ごとにスペックが異なります。こんな悩みをお持ちの方も多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>自分の用途にはどのiPadが合うのかわからない…</li>
                <li>型落ちiPadでも十分なスペックなのか知りたい!</li>
              </ul>
              <p>本記事では<strong>歴代iPadの主要スペックを一覧表で比較</strong>し、進化ポイントをわかりやすくまとめました。iPadを購入する際の参考にしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link href="/ipad">中古iPad購入ガイド</Link>」をご覧ください。
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
                  歴代iPadのスペック比較表一覧{' '}
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
                  歴代iPadの主な進化点{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#glossary" className="toc-item">
                  iPad各機能の用語解説{' '}
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
        <GlossarySection productName="iPad" items={GLOSSARY_ITEMS} />
        <ShareBox url="https://used-lab.com/ipad/ipad-spec-table/" text="歴代iPadスペック比較表！各世代の性能の違いがすぐわかる" />
      </article>
    </main>
  )
}
