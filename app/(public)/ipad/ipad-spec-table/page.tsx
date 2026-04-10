import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import { getAllIPadModels, getAllProductShopLinksByType, getAllIPadAccessories, getAllIPadAccessoryCompatibility } from '@/lib/queries'
import { buildAccessoryLookup, getPencilTextFromAccessories, getKeyboardTextFromAccessories } from '@/lib/utils/ipad-helpers'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'
import IPadArticleFooter from '@/app/components/ipad/IPadArticleFooter'

const GLOSSARY_ITEMS = [
  { title: 'CPU', icon: 'fa-solid fa-microchip', desc: 'iPadの処理性能を決める中核チップ。AシリーズやMシリーズが搭載され、Mシリーズはパソコン並の高性能を誇る。' },
  { title: 'メモリ', icon: 'fa-solid fa-memory', desc: 'アプリの同時使用や動作の快適さに影響する記憶領域。容量が多いほど、重たい作業もスムーズにこなせる。Proモデルはストレージ容量ごとにメモリが異なる。' },
  { title: 'Apple Intelligence', icon: 'fa-solid fa-wand-magic-sparkles', desc: 'iPad上で動作するApple独自のAI機能。要約、画像生成、文書の書き直し、優先通知の抽出などに対応。オンデバイス処理によりプライバシーにも配慮。' },
  { title: 'ProMotion', icon: 'fa-solid fa-gauge-high', desc: '最大120Hzのリフレッシュレートに対応する表示技術。スクロールやアニメーションが滑らかに表示され、Apple Pencil使用時の描画遅延も大幅に軽減。' },
  { title: 'センターフレーム', icon: 'fa-solid fa-camera', desc: '超広角カメラと機械学習を使い、FaceTimeやビデオ会議中に被写体を自動で追尾。動いても常に中央に映るよう画角を調整。' },
  { title: 'LiDAR機能', icon: 'fa-solid fa-cube', desc: 'レーザー光で周囲の距離を高精度に測定するセンサー。AR体験の精度向上や暗所でのピント合わせの高速化に貢献。' },
  { title: 'Retina Display', icon: 'fa-solid fa-display', desc: 'ピクセル密度が高く、肉眼では個々のピクセルが判別できない高精細ディスプレイ。文字や画像がシャープに表示され、目に優しい。' },
  { title: 'Liquid Retina Display', icon: 'fa-solid fa-droplet', desc: 'Retina Displayの進化版。滑らかな表示と広色域対応を実現し、ベゼルの細いデザインに最適化。True Toneや広視野角も特長。' },
  { title: 'Ultra Retina XDR Display', icon: 'fa-solid fa-star', desc: '有機ELを採用した最新世代の高性能ディスプレイ。高輝度・高コントラスト・広色域に対応し、HDR映像やプロ向け制作にも対応。' },
  { title: 'Apple Pencil', icon: 'fa-solid fa-pen-nib', desc: <>iPad専用のスタイラスペン。手書きメモやイラスト制作、PDFへの注釈などに活用。第1〜第3世代があり、対応機種や充電方式が異なる。詳しくは「<Link href="/ipad/apple-pencil-compare/">Apple Pencilの違いを比較</Link>」を参照。</> },
  { title: '外付けキーボード', icon: 'fa-solid fa-keyboard', desc: <>iPad専用のMagic KeyboardやSmart Keyboardなどが対応。タイピング作業や資料作成が快適になり、ラップトップのように使える。詳しくは「<Link href="/ipad/accessories-summary/#kb-16">iPadのMagic Keyboard 型番一覧</Link>」を参照。</> },
]
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '歴代iPadスペック比較表！各世代の性能の違いがすぐわかる',
  description:
    '歴代iPadのスペック比較表一覧です。iPad Pro・Air・mini・無印の性能差や機能の違いを一目で確認できます。',
  alternates: { canonical: '/ipad/ipad-spec-table/' },
  openGraph: {
    title: '歴代iPadスペック比較表！各世代の性能の違いがすぐわかる',
    description: '歴代iPadのスペック比較表一覧です。iPad Pro・Air・mini・無印の性能差や機能の違いを一目で確認できます。',
    url: '/ipad/ipad-spec-table/',
    images: [{ url: getHeroImage('/ipad/ipad-spec-table/'), width: 1200, height: 630, alt: '歴代iPadスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代iPadスペック比較表！各世代の性能の違いがすぐわかる',
    description: '歴代iPadのスペック比較表一覧です。iPad Pro・Air・mini・無印の性能差や機能の違いを一目で確認できます。',
    images: [getHeroImage('/ipad/ipad-spec-table/')],
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

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/ipad-spec-table/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.jp/ipad' },
      { '@type': 'ListItem', position: 3, name: '歴代iPadスペック比較表' },
    ],
  }

    const articleJsonLd = buildArticleJsonLd({
    headline: '【2025年】歴代iPadのスペック＆性能比較表',
    description: '歴代iPadのスペック比較表一覧。iPad Pro・Air・mini・無印の性能差を一目で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/ipad/ipad-spec-table/',
  })

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
            { label: '中古iPad完全購入ガイド', href: '/ipad' },
            { label: '歴代iPadスペック比較表' },
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
                歴代iPadスペック比較表！各世代の性能の違いがすぐわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/ipad/ipad-spec-table/')}
                  alt="歴代iPadスペック比較表のイメージ"
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
              <p>iPadはPro・Air・mini・無印と多くのラインナップがあり、世代ごとにスペックが異なります。購入を検討中の方の中にはこんな悩みをお持ちの方も多いのではないでしょうか。</p>
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
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li>
                <a href="#spec-table" className="toc-item">
                  スペック比較表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#compare" className="toc-item">
                  2機種を比較{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#benchmark" className="toc-item">
                  ベンチマーク{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#evolution" className="toc-item">
                  進化の歴史{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#glossary" className="toc-item">
                  用語解説{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#related" className="toc-item">
                  関連記事{' '}
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
        <BenchmarkSection models={serializedModels} />
        <EvolutionTimeline models={serializedModels} />
        <GlossarySection productName="iPad" items={GLOSSARY_ITEMS} />



        </div>
      </article>
    </main>
    <IPadArticleFooter pageUrl="https://used-lab.jp/ipad/ipad-spec-table/" pageTitle="歴代iPadスペック比較表！各世代の性能の違いがすぐわかる" excludeHref={["/ipad/ipad-spec-table/", "/ipad/recommend/"]} />
    </>
  )
}
