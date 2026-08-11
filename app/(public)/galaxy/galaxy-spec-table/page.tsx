import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllGalaxyModelsIncludingEnded, getAllProductShopLinksByType, getLatestGalaxyPriceLogsWithPricesForModels } from '@/lib/queries'
import { calcAvgFromShops } from '@/lib/utils/price-info-helpers'
import Breadcrumb from '@/app/components/Breadcrumb'
import SeriesGuideSection from './components/SeriesGuideSection'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'
import HeroMeta from '@/app/components/HeroMeta'
import GalaxyArticleFooter from '@/app/components/galaxy/GalaxyArticleFooter'

const GLOSSARY_ITEMS = [
  { title: 'Snapdragon / Exynos', icon: 'fa-solid fa-microchip', desc: 'Galaxyに搭載されるSoC（チップ）。日本版のフラッグシップは主にSnapdragonを採用し、一部世代・地域でExynosやDimensityを採用する。世代が新しいほどAI処理や省電力性能が向上。' },
  { title: 'Galaxy AI', icon: 'fa-solid fa-wand-magic-sparkles', desc: 'S24世代以降で本格導入されたAI機能群の総称。リアルタイム翻訳・文章作成補助・写真編集などをオンデバイス／クラウドで実行できる。' },
  { title: 'かこって検索', icon: 'fa-solid fa-magnifying-glass', desc: '画面上の対象を指やSペンで囲むだけでその場で検索できるGoogleの機能。Galaxy AI対応機種で利用できる。' },
  { title: 'オブジェクト消去', icon: 'fa-solid fa-eraser', desc: '写真に写り込んだ不要な被写体をタップ操作でAIが自然に消去する編集機能。' },
  { title: 'S Pen', icon: 'fa-solid fa-pen', desc: 'Galaxy S UltraやZ Foldシリーズで使える純正スタイラス。手書きメモやイラスト、細かな操作に対応する。' },
  { title: 'Samsung DeX', icon: 'fa-solid fa-desktop', desc: '本体を外部ディスプレイやモニターに接続してPCライクなデスクトップ環境で使える機能。' },
  { title: 'Wireless PowerShare', icon: 'fa-solid fa-battery-half', desc: '本体背面にQi対応機器を重ねて充電できるリバースワイヤレス充電。イヤホンやスマートウォッチへの給電に便利。' },
  { title: 'LTPO 120Hz', icon: 'fa-solid fa-gauge-high', desc: '最大120Hzの高リフレッシュレートに対応。LTPOはリフレッシュレートを可変制御して省電力化する技術で、フラッグシップに搭載。' },
  { title: 'Dynamic AMOLED', icon: 'fa-solid fa-mobile-screen', desc: 'Samsung製の高品質有機ELディスプレイ。高輝度・高コントラストでHDR表示にも対応し、屋外でも視認性が高い。' },
  { title: 'おサイフケータイ (FeliCa)', icon: 'fa-solid fa-wallet', desc: '日本仕様のGalaxyが対応する非接触ICサービス。SuicaやiDなどのタッチ決済・交通系ICが利用できる。' },
  { title: '防水防塵 (IP68)', icon: 'fa-solid fa-droplet', desc: '粉塵の侵入を完全に防ぎ、一定条件下での水没にも耐える等級。折りたたみ機種はIPX8など防塵等級が異なる世代がある点に注意。' },
  { title: 'microSD', icon: 'fa-solid fa-sd-card', desc: 'microSDカードによるストレージ拡張。近年のフラッグシップは非対応だが、Aシリーズなど一部機種で対応する。' },
  { title: 'カバー画面', icon: 'fa-solid fa-clone', desc: '折りたたみ（Z Flip / Z Fold）の外側ディスプレイ。開かずに通知確認や操作ができる。世代ごとにサイズ・機能が進化している。' },
  { title: '指紋認証', icon: 'fa-solid fa-fingerprint', desc: '画面内指紋センサーでロック解除。フラッグシップは超音波式、ミドル機は光学式や側面電源ボタン一体型を採用する。' },
]
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

export const metadata: Metadata = {
  title: '歴代Galaxyスペック比較表！S・A・Z折りたたみの性能差や違いがわかる',
  description:
    '歴代Samsung Galaxyのスペック比較表一覧です。S・A・Z折りたたみシリーズのチップ性能やカメラ・Galaxy AIがどのようにアップデートされてきたのか確認するのにご活用ください。',
  alternates: { canonical: '/galaxy/galaxy-spec-table/' },
  openGraph: {
    title: '歴代Galaxyスペック比較表！S・A・Z折りたたみの性能差や違いがわかる',
    description: '歴代Samsung Galaxyのスペック比較表一覧です。S・A・Z折りたたみシリーズのチップ性能やカメラ・Galaxy AIがどのようにアップデートされてきたのか確認するのにご活用ください。',
    url: '/galaxy/galaxy-spec-table/',
    images: [{ url: getHeroImage('/galaxy/galaxy-spec-table/'), width: 1200, height: 630, alt: '歴代Samsung Galaxyスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代Galaxyスペック比較表！S・A・Z折りたたみの性能差や違いがわかる',
    description: '歴代Samsung Galaxyのスペック比較表一覧です。',
    images: [getHeroImage('/galaxy/galaxy-spec-table/')],
  },
}

export default async function GalaxySpecTablePage() {
  const allModels = await getAllGalaxyModelsIncludingEnded()
  const PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
  const [allShopLinks, latestPriceLogs] = await Promise.all([
    getAllProductShopLinksByType('galaxy'),
    getLatestGalaxyPriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS),
  ])

  const avgPrices: Record<number, number | null> = {}
  // 相場は日々変わる。スペック（不変）と同じ表に並べる以上、いつ時点かを明示する
  let priceDate: string | null = null

  for (const model of allModels) {
    const log = latestPriceLogs[model.id]
    if (!log) { avgPrices[model.id] = null; continue }
    const rec = log as unknown as Record<string, number | null>
    const mins: number[] = []
    const maxs: number[] = []
    for (const [minK, maxK] of [['iosys_min', 'iosys_max'], ['geo_min', 'geo_max'], ['janpara_min', 'janpara_max']]) {
      const mn = rec[minK]; if (typeof mn === 'number' && mn > 0) mins.push(mn)
      const mx = rec[maxK]; if (typeof mx === 'number' && mx > 0) maxs.push(mx)
    }
    // 詳細ページ・相場一覧と同じ中央値ベースにする（同じ機種で違う相場を出さない）
    const rec2 = log as unknown as Record<string, number[] | null>
    avgPrices[model.id] = calcAvgFromShops(mins, maxs, '', [rec2['iosys_prices'], rec2['geo_prices'], rec2['janpara_prices']])?.avg ?? null
    const loggedAt = (log as unknown as { logged_at?: string }).logged_at
    if (loggedAt && (!priceDate || loggedAt > priceDate)) priceDate = loggedAt.substring(0, 10)
  }


  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Samsung Galaxyおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/galaxy/' },
      { '@type': 'ListItem', position: 3, name: '歴代Samsung Galaxyスペック比較表' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/galaxy/galaxy-spec-table/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '【2025年】歴代Samsung Galaxyのスペック＆性能比較表',
    description: '歴代Samsung Galaxyのスペック比較表一覧。S・A・Z折りたたみシリーズのチップやGalaxy AIのアップデート履歴を一目で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/galaxy/galaxy-spec-table/',
  })



  return (
    <>
    <main>
      <article itemScope itemType="https://schema.org/Article">
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
            { label: '中古Samsung Galaxyおすすめ機種・選び方まとめ', href: '/galaxy/' },
            { label: '歴代Samsung Galaxyスペック比較表' },
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
              <h1 className="hero-title" itemProp="headline">
                歴代Galaxyスペック比較表！S・A・Z折りたたみの性能差や違いがわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/galaxy/galaxy-spec-table/')}
                  alt="歴代Samsung Galaxyスペック比較表のイメージ"
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
              <p>フラッグシップのSシリーズから手頃なAシリーズ、Z折りたたみまで幅広く揃うSamsung Galaxy。機種変更を検討中の方にはこんな悩みも多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>最新機種はオーバースペックな気がする…</li>
                <li>自分の用途に合った型落ちGalaxyを探したい!</li>
              </ul>
              <p>本記事では<strong>歴代Samsung Galaxyの主要スペックを一覧表で比較</strong>し、進化ポイントをわかりやすくまとめました。新たなGalaxyを購入する際の参考にしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link prefetch={false} href="/galaxy/">中古Samsung Galaxyおすすめ機種・選び方まとめ</Link>」をご覧ください。
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
                  2機種のスペック比較{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#benchmark" className="toc-item">
                  チップ性能・処理速度{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#evolution" className="toc-item">
                  歴代Galaxyの進化点{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#series-guide" className="toc-item">
                  シリーズの違い{' '}
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
        <div className="l-sections" itemProp="articleBody">
        {/* セクション */}
        <SpecTable models={allModels} shopLinks={allShopLinks} prices={avgPrices} priceDate={priceDate} />
        <DualCompare models={allModels} shopLinks={allShopLinks} />
        <BenchmarkSection models={allModels} avgPrices={avgPrices} shopLinks={allShopLinks} />
        <EvolutionTimeline
          models={allModels}
          avgPrices={avgPrices}
          iosysUrlMap={Object.fromEntries(allShopLinks.filter((l) => l.shop_id === 1).map((l) => [l.product_id, l.url]))}
        />
        <SeriesGuideSection models={allModels} prices={avgPrices} />
        <GlossarySection productName="Samsung Galaxy" items={GLOSSARY_ITEMS} />

        </div>
      </article>
    </main>
    <GalaxyArticleFooter
          pageUrl="https://used-lab.jp/galaxy/galaxy-spec-table/"
          pageTitle="歴代Galaxyスペック比較表！S・A・Z折りたたみの性能差や違いがわかる"
          excludeHref={["/galaxy/galaxy-spec-table/"]}
        />
    </>
  )
}
