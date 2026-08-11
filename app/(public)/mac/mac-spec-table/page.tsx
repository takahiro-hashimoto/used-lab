import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import {
  getAllMacModelsIncludingEnded,
  getAllProductShopLinksByType,
  getLatestMacPriceLogsWithPricesForModels,
} from '@/lib/queries'
import { calcAvgFromShops } from '@/lib/utils/price-info-helpers'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'
import MacArticleFooter from '@/app/components/mac/MacArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = false

const PAGE_TITLE = '歴代iMac・Mac miniスペック比較表！Mac Studioを含む全機種の違いがすぐわかる'
const PAGE_DESCRIPTION =
  '歴代のiMac・Mac mini・Mac Studioのスペック比較表一覧です。チップ性能やディスプレイの有無、ポート構成の違いを一目で確認できます。'
const PAGE_URL = 'https://used-lab.jp/mac/mac-spec-table/'

// デスクトップ特有のつまずきポイントに絞る。
// ノート版にあった ProMotion / MagSafe / 冷却ファンは対象外
const GLOSSARY_ITEMS = [
  { title: 'CPU', icon: 'fa-solid fa-microchip', desc: 'パソコンの頭脳。操作やアプリの動きをコントロール。シェフのように全体を指示する存在。' },
  { title: 'GPU', icon: 'fa-solid fa-palette', desc: '映像やグラフィックを描くパーツ。コア数が多いほど動画書き出しや3Dが速くなる。Mac Studioの価格差はここが主因。' },
  { title: 'メモリ', icon: 'fa-solid fa-memory', desc: '作業スペースの広さに例えられる。多いほどアプリを同時に快適に使える。Macは後から増設できないので購入時に決める必要がある。' },
  { title: 'ユニファイドメモリ', icon: 'fa-solid fa-layer-group', desc: 'CPUとGPUが同じメモリを共有する仕組み。データの受け渡しが速く、同じ容量でも効率がいい。' },
  { title: 'Proチップ / Maxチップ / Ultraチップ', icon: 'fa-solid fa-gauge-high', desc: '同じ世代でも上位になるほどCPU・GPUのコア数とメモリ帯域が増える。Ultraは2つのチップを繋いだ最上位。' },
  { title: '内蔵ディスプレイ', icon: 'fa-solid fa-display', desc: 'iMacは画面一体型なので単体で使える。Mac mini・Mac Studioは別途モニターが必要で、その分の予算も見ておく必要がある。' },
  { title: '4.5K Retinaディスプレイ', icon: 'fa-solid fa-tv', desc: 'iMac 24インチの内蔵画面。ドットが見えないほど精細で、文字や写真がくっきり表示される。' },
  { title: 'Thunderbolt', icon: 'fa-solid fa-bolt', desc: '高速通信や映像出力ができるUSB-C端子。世代が上がるほど転送速度が上がる（4は最大40Gb/s、5は最大120Gb/s）。' },
  { title: '外部ディスプレイ接続台数', icon: 'fa-solid fa-desktop', desc: '同時に接続できる外部モニターの台数。無印チップは2〜3台、Pro/Max/Ultraでは5〜8台に対応。デュアルモニター以上を組むなら必ず確認。' },
  { title: 'Ethernetポート', icon: 'fa-solid fa-network-wired', desc: '有線LANの差込口。Wi-Fiより安定するので据え置きでは有利。10Gb Ethernetは購入時のオプション。' },
  { title: 'SDXCカードスロット', icon: 'fa-solid fa-sd-card', desc: 'SDカードを直接挿せる差込口。Mac Studioは前面に搭載しており、カメラのデータを取り込む用途で便利。' },
  { title: '同梱物', icon: 'fa-solid fa-keyboard', desc: 'iMacはMagic KeyboardとMagic Mouseが付属する。Mac mini・Mac Studioは別途購入が必要なので、実質の総額に差が出る。' },
  { title: 'Apple Intelligence', icon: 'fa-solid fa-wand-magic-sparkles', desc: 'Appleの生成AI機能。Apple Silicon搭載のMacであれば対応している。' },
]

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/mac/mac-spec-table/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/mac/mac-spec-table/',
    images: [{ url: getHeroImage('/mac/mac-spec-table/'), width: 1200, height: 630, alt: '歴代iMac・Mac miniスペック比較表のイメージ' }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/mac/mac-spec-table/')],
  },
}

export default async function MacSpecTablePage() {
  const PRICE_COLS = ['min1_price','max1_price','min2_price','max2_price','min3_price','max3_price','min4_price','max4_price','min5_price','max5_price']
  const [allModels, allShopLinks] = await Promise.all([
    getAllMacModelsIncludingEnded(),
    getAllProductShopLinksByType('mac'),
  ])

  const latestPriceLogs = await getLatestMacPriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS)
  const avgPrices: Record<number, number | null> = {}
  // 相場は日々変わる。スペック（不変）と同じ表に並べる以上、いつ時点かを明示する
  let priceDate: string | null = null
  for (const model of allModels) {
    const log = latestPriceLogs[model.id]
    if (!log) { avgPrices[model.id] = null; continue }
    const rec = log as unknown as Record<string, number | null>
    const mins: number[] = [], maxs: number[] = []
    for (let i = 1; i <= 5; i++) {
      const mn = rec[`min${i}_price`]; if (typeof mn === 'number' && mn > 0) mins.push(mn)
      const mx = rec[`max${i}_price`]; if (typeof mx === 'number' && mx > 0) maxs.push(mx)
    }
    // 詳細ページ・相場一覧と同じ中央値ベースにする（同じ機種で違う相場を出さない）
    const rec2 = log as unknown as Record<string, number[] | null>
    avgPrices[model.id] = calcAvgFromShops(mins, maxs, '', [rec2['matched_prices']])?.avg ?? null
    const loggedAt = (log as unknown as { logged_at?: string }).logged_at
    if (loggedAt && (!priceDate || loggedAt > priceDate)) priceDate = loggedAt.substring(0, 10)
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iMac・Mac miniおすすめ機種', item: 'https://used-lab.jp/mac/' },
      { '@type': 'ListItem', position: 3, name: '歴代iMac・Mac miniスペック比較表' },
    ],
  }

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/mac/mac-spec-table/page.tsx')

  const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  // 機種画像は public/images/mac/ に配置中。実ファイルが無いまま渡すと
  // next/image が画像を 500 にするため、無いものは null にしてプレースホルダーへ倒す
  // （画像を置けばコードを触らずに切り替わる）
  const hasImage = (image: string | null) =>
    !!image && existsSync(join(process.cwd(), 'public', 'images', 'mac', image))

  const serializedModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    shortname: m.shortname,
    slug: m.slug,
    image: hasImage(m.image) ? m.image : null,
    date: m.date,
    device_type: m.device_type,
    last_macos: m.last_macos,
    cpu: m.cpu,
    gpu: m.gpu,
    ram: m.ram,
    strage: m.strage,
    size: m.size,
    display_builtin: m.display_builtin,
    display: m.display,
    resolution: m.resolution,
    luminance: m.luminance,
    thunderbolt: m.thunderbolt,
    thunderbolt_gen: m.thunderbolt_gen,
    usb_c: m.usb_c,
    usb_a: m.usb_a,
    headphone: m.headphone,
    hdmi: m.hdmi,
    slot: m.slot,
    ethernet: m.ethernet,
    external_display: m.external_display,
    camera: m.camera,
    speaker: m.speaker,
    included_accessories: m.included_accessories,
    apple_intelligence: m.apple_intelligence,
    color: m.color,
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
        <Breadcrumb
          items={[
            { label: '中古iMac・Mac miniおすすめ機種', href: '/mac/' },
            { label: '歴代iMac・Mac miniスペック比較表' },
          ]}
        />

        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title">
                歴代iMac・Mac miniスペック比較表！Mac Studioを含む全機種の違いがすぐわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/mac/mac-spec-table/')}
                  alt="歴代iMac・Mac miniスペック比較表のイメージ"
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
              <p>デスクトップのMacはiMac・Mac mini・Mac Studioの3種類があり、同じ「Mac」でも必要なものと総額がまるで違います。こんな悩みをお持ちの方も多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>iMacとMac miniのどちらが自分に合うのかわからない…</li>
                <li>型落ちのiMac・Mac miniでも十分なスペックなのか知りたい!</li>
              </ul>
              <p>本記事では<strong>歴代iMac・Mac miniの主要スペックを一覧表で比較</strong>し、違いをわかりやすくまとめました。</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                持ち運びも考えている方は「<Link prefetch={false} href="/macbook/">中古MacBookおすすめ機種・選び方まとめ</Link>」もあわせてご覧ください。
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
                  <a href="#benchmark" className="toc-item">
                    ベンチマーク{' '}
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
                  <a href="#evolution" className="toc-item">
                    世代ごとの進化点{' '}
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
          <SpecTable models={serializedModels} shopLinks={serializedLinks} prices={avgPrices} priceDate={priceDate} />
          <DualCompare models={serializedModels} shopLinks={serializedLinks} />
          <BenchmarkSection models={allModels} />
          <EvolutionTimeline models={allModels} />
          <GlossarySection productName="iMac・Mac mini" items={GLOSSARY_ITEMS} />
        </div>
      </article>
    </main>
    <MacArticleFooter
      pageUrl={PAGE_URL}
      pageTitle={PAGE_TITLE}
      excludeHref={["/mac/mac-spec-table/"]}
    />
    </>
  )
}
