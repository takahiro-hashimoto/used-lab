import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPhoneModelsIncludingEnded, getAllProductShopLinksByType, getLatestIPhonePriceLogsWithPricesForModels } from '@/lib/queries'
import { calcAvgFromShops } from '@/lib/utils/price-info-helpers'
import Breadcrumb from '@/app/components/Breadcrumb'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'
import HeroMeta from '@/app/components/HeroMeta'
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'

const GLOSSARY_ITEMS = [
  { title: 'CPU', icon: 'fa-solid fa-microchip', desc: 'iPhoneの頭脳にあたるチップで、全体的な処理速度や電力効率に大きく影響。A16やA17 Proなどの世代ごとに性能が進化。' },
  { title: 'RAM', icon: 'fa-solid fa-memory', desc: 'アプリの同時使用やゲーム、動画編集などの処理性能に関わるメモリ容量。数値が大きいほど動作がスムーズ。' },
  { title: 'バッテリー容量', icon: 'fa-solid fa-battery-full', desc: 'mAh（ミリアンペアアワー）で表される電池の容量。容量が大きいほど長時間の使用が可能だが、省電力設計とのバランスも重要。' },
  { title: 'USB-C対応', icon: 'fa-solid fa-plug', desc: 'iPhone 15以降で採用。MacやiPadとケーブル共有ができ、外部ストレージやディスプレイとの接続、他デバイスへの給電も可能。' },
  { title: 'MagSafe対応', icon: 'fa-solid fa-magnet', desc: '背面の磁力でアクセサリを固定。ワイヤレス充電やカードケースの装着が簡単でズレにくい。' },
  { title: 'Dynamic Island対応', icon: 'fa-solid fa-circle-notch', desc: '画面上部に通話や音楽再生、タイマーなどを表示。アプリを切り替えず操作や確認が可能。' },
  { title: '衝突事故検出', icon: 'fa-solid fa-car-burst', desc: '車の衝突など大きな衝撃を検知し、反応がない場合は自動で緊急通報。' },
  { title: 'ProMotion', icon: 'fa-solid fa-gauge-high', desc: '最大120Hzの高リフレッシュレートに対応。スクロールや操作が滑らかになるのが特徴。' },
  { title: 'Apple Intelligence', icon: 'fa-solid fa-wand-magic-sparkles', desc: '要約、画像生成、自然言語操作などを実現するAI機能。デバイス上で処理し、プライバシーにも配慮。' },
  { title: 'アクションボタン', icon: 'fa-solid fa-sliders', desc: '本体側面の物理ボタンに好みの機能を割り当て可能。カメラ起動やショートカット実行に対応。' },
  { title: 'カメラコントロール', icon: 'fa-solid fa-camera', desc: 'ボタン操作で即カメラを起動し、シャッター操作が可能。素早く撮影できる。' },
  { title: 'アクションモード', icon: 'fa-solid fa-person-running', desc: '動きの多いシーンでも手ブレを抑え、滑らかな映像を記録。アウトドア撮影に最適。' },
  { title: 'シネマティックモード', icon: 'fa-solid fa-film', desc: '背景をぼかし被写体にフォーカス。映画のような映像が撮影可能。フォーカスの変更も後から対応。' },
  { title: 'マクロモード', icon: 'fa-solid fa-magnifying-glass', desc: '被写体に数センチまで近づいて撮影。小さな物の質感やディテールを高精細に記録。' },
  { title: 'ポートレートモード', icon: 'fa-solid fa-user', desc: '背景をぼかし、人物を強調した写真を撮影。ライティング効果などの演出も可能。' },
  { title: 'ナイトモード', icon: 'fa-solid fa-moon', desc: '暗所でも明るく鮮明な写真を自動調整で撮影。長時間露光と手ブレ補正に対応。' },
  { title: 'LiDARスキャナ', icon: 'fa-solid fa-cube', desc: 'レーザーで距離を測定し、空間の3Dマッピングを実現。AR体験や暗所でのピント合わせにも有効。' },
  { title: 'Apple ProRAW', icon: 'fa-solid fa-image', desc: '多くの情報を保持したRAW形式で撮影可能。高精度な編集に対応し、プロ仕様の仕上がりに。' },
  { title: 'Apple ProRes', icon: 'fa-solid fa-video', desc: '高画質な映像を記録できるフォーマット。豊かな階調と高い編集耐性が特徴。' },
]
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

export const metadata: Metadata = {
  title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる',
  description:
    '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。iPhoneの機能がどのようにアップデートされてきたのか確認するのにご活用ください。',
  alternates: { canonical: '/iphone/iphone-spec-table/' },
  openGraph: {
    title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。iPhoneの機能がどのようにアップデートされてきたのか確認するのにご活用ください。',
    url: '/iphone/iphone-spec-table/',
    images: [{ url: getHeroImage('/iphone/iphone-spec-table/'), width: 1200, height: 630, alt: '歴代iPhoneスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧です。',
    images: [getHeroImage('/iphone/iphone-spec-table/')],
  },
}

export default async function IPhoneSpecTablePage() {
  const allModels = await getAllIPhoneModelsIncludingEnded()
  const PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
  const [allShopLinks, latestPriceLogs] = await Promise.all([
    getAllProductShopLinksByType('iphone'),
    getLatestIPhonePriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS),
  ])

  const avgPrices: Record<number, number | null> = {}

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
    avgPrices[model.id] = calcAvgFromShops(mins, maxs, '')?.avg ?? null
  }


  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhoneおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/iphone' },
      { '@type': 'ListItem', position: 3, name: '歴代iPhoneスペック比較表' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/iphone-spec-table/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '【2025年】歴代iPhoneのスペック＆性能比較表',
    description: '2019年以降に発売された歴代iPhoneのスペック比較表一覧。機能のアップデート履歴を一目で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/iphone/iphone-spec-table/',
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
            { label: '中古iPhoneおすすめ機種・選び方まとめ', href: '/iphone/' },
            { label: '歴代iPhoneスペック比較表' },
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
                歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/iphone/iphone-spec-table/')}
                  alt="歴代iPhoneスペック比較表のイメージ"
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
              <p>毎年新モデルが登場するiPhoneシリーズ。機種変更を検討中の方にはこんな悩みも多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>最新機種はオーバースペックな気がする…</li>
                <li>自分の用途に合った型落ちiPhoneを探したい!</li>
              </ul>
              <p>本記事では<strong>歴代iPhoneの主要スペックを一覧表で比較</strong>し、進化ポイントをわかりやすくまとめました。新たなiPhoneを購入する際の参考にしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link href="/iphone/">中古iPhoneおすすめ機種・選び方まとめ</Link>」をご覧ください。
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
                  歴代iPhoneの進化点{' '}
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
        <SpecTable models={allModels} shopLinks={allShopLinks} prices={avgPrices} />
        <DualCompare models={allModels} shopLinks={allShopLinks} />
        <BenchmarkSection models={allModels} avgPrices={avgPrices} shopLinks={allShopLinks} />
        <EvolutionTimeline
          models={allModels}
          avgPrices={avgPrices}
          iosysUrlMap={Object.fromEntries(allShopLinks.filter((l) => l.shop_id === 1).map((l) => [l.product_id, l.url]))}
        />
        <GlossarySection productName="iPhone" items={GLOSSARY_ITEMS} />

        </div>
      </article>
    </main>
    <IPhoneArticleFooter
          pageUrl="https://used-lab.jp/iphone/iphone-spec-table/"
          pageTitle="歴代iPhoneスペック比較表！気になる機種の性能差や違いがわかる"
          excludeHref={["/iphone/iphone-spec-table/", "/iphone/recommend/"]}
        >
          <div className="m-callout m-callout--muted u-mt-2xl">
            <span className="m-callout__label">関連</span>
            <p className="m-callout__text">
              <a href="https://prodig.co.jp/blogs/column/iphone-history-model-selection" target="_blank" rel="noreferrer noopener">歴代iPhoneの歴史と進化｜モデル選びのポイントも解説</a>
            </p>
          </div>
        </IPhoneArticleFooter>
    </>
  )
}
