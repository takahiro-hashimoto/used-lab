import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { forSpecTable } from '@/lib/data/shop-ids'
import { getAllPixelModelsIncludingEnded, getAllProductShopLinksByType, getLatestPixelPriceLogsWithPricesForModels } from '@/lib/queries'
import { calcAvgFromShops } from '@/lib/utils/price-info-helpers'
import Breadcrumb from '@/app/components/Breadcrumb'
import SpecTable from './components/SpecTable'
import DualCompare from './components/DualCompare'
import BenchmarkSection from './components/BenchmarkSection'
import EvolutionTimeline from './components/EvolutionTimeline'
import GlossarySection from '@/app/components/GlossarySection'
import HeroMeta from '@/app/components/HeroMeta'
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'

const GLOSSARY_ITEMS = [
  { title: 'Google Tensor', icon: 'fa-solid fa-microchip', desc: 'Google独自開発のSoC（チップ）。AI・機械学習の処理に特化しており、消しゴムマジックや音声認識などPixelのAI機能を支える。世代はG1〜G4と進化。' },
  { title: 'RAM', icon: 'fa-solid fa-memory', desc: 'アプリの同時使用やゲーム、動画編集などの処理性能に関わるメモリ容量。数値が大きいほど動作がスムーズ。' },
  { title: 'バッテリー容量', icon: 'fa-solid fa-battery-full', desc: 'mAh（ミリアンペアアワー）で表される電池の容量。容量が大きいほど長時間の使用が可能だが、省電力設計とのバランスも重要。' },
  { title: 'USB-C / 充電', icon: 'fa-solid fa-plug', desc: 'Pixelは全モデルUSB-Cを採用。有線急速充電に加え、Qi対応のワイヤレス充電やバッテリーシェアに対応する機種もある。' },
  { title: 'LTPO 120Hz', icon: 'fa-solid fa-gauge-high', desc: '最大120Hzの高リフレッシュレートに対応。LTPOはリフレッシュレートを可変制御して省電力化する技術で、Proモデルに搭載。' },
  { title: '消しゴムマジック', icon: 'fa-solid fa-eraser', desc: '写真に写り込んだ通行人や不要な被写体をタップ操作で自然に消せるPixelのAI編集機能。' },
  { title: 'ベストテイク', icon: 'fa-solid fa-users', desc: '連続撮影した複数枚から全員のベストな表情を選んで1枚に合成できるAI機能。集合写真で目つぶりを回避できる。' },
  { title: '編集マジック (Magic Editor)', icon: 'fa-solid fa-wand-magic-sparkles', desc: '被写体の移動・拡大や空の色変更など、生成AIで写真を大胆に編集できる機能。' },
  { title: '夜景モード (Night Sight)', icon: 'fa-solid fa-moon', desc: '暗所でも明るく鮮明な写真を撮影。長時間露光と手ブレ補正、AI処理で夜空や星空もきれいに残せる。' },
  { title: 'リアルトーン', icon: 'fa-solid fa-image', desc: '多様な肌の色を自然で正確に再現するPixelの画像処理技術。人物写真の色味をより忠実に描写する。' },
  { title: '温度センサー', icon: 'fa-solid fa-temperature-half', desc: '背面のセンサーで物体の表面温度を計測できる機能。Pixel 8 Pro以降の一部モデルに搭載。' },
  { title: '動画ブースト (Video Boost)', icon: 'fa-solid fa-video', desc: 'クラウド上でAI処理を行い、動画の色・明るさ・手ブレを最適化する機能。Proモデルで利用可能。' },
  { title: 'バッテリーシェア', icon: 'fa-solid fa-battery-half', desc: '本体背面にQi対応機器を重ねて充電できるリバースワイヤレス充電。イヤホンなどへの給電に便利。' },
  { title: 'おサイフケータイ (FeliCa)', icon: 'fa-solid fa-wallet', desc: '日本仕様のPixelが対応する非接触ICサービス。SuicaやiDなどのタッチ決済・交通系ICが利用できる。' },
  { title: '指紋認証', icon: 'fa-solid fa-fingerprint', desc: '画面内指紋センサーでロック解除。Pixel 6〜8は光学式、Pixel 9シリーズ以降は超音波式で精度・速度が向上。' },
  { title: '防水防塵 (IP68)', icon: 'fa-solid fa-droplet', desc: '粉塵の侵入を完全に防ぎ、一定条件下での水没にも耐える等級。日常の水濡れや雨天でも安心して使える。' },
  { title: 'Titan M2', icon: 'fa-solid fa-shield-halved', desc: 'Google独自のセキュリティチップ。パスワードや暗号鍵などの重要情報をハードウェアレベルで保護する。' },
]
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

export const metadata: Metadata = {
  title: '歴代Google Pixelスペック比較表！気になる機種の性能差や違いがわかる',
  description:
    '歴代Google Pixelのスペック比較表一覧です。Tensorチップの性能やカメラ・AI機能がどのようにアップデートされてきたのか確認するのにご活用ください。',
  alternates: { canonical: '/pixel/pixel-spec-table/' },
  openGraph: {
    title: '歴代Google Pixelスペック比較表！気になる機種の性能差や違いがわかる',
    description: '歴代Google Pixelのスペック比較表一覧です。Tensorチップの性能やカメラ・AI機能がどのようにアップデートされてきたのか確認するのにご活用ください。',
    url: '/pixel/pixel-spec-table/',
    images: [{ url: getHeroImage('/pixel/pixel-spec-table/'), width: 1200, height: 630, alt: '歴代Google Pixelスペック比較表のイメージ' }],
  },
  twitter: {
    title: '歴代Google Pixelスペック比較表！気になる機種の性能差や違いがわかる',
    description: '歴代Google Pixelのスペック比較表一覧です。',
    images: [getHeroImage('/pixel/pixel-spec-table/')],
  },
}

export default async function PixelSpecTablePage() {
  const allModels = await getAllPixelModelsIncludingEnded()
  const PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
  const [rawShopLinks, latestPriceLogs] = await Promise.all([
    getAllProductShopLinksByType('pixel'),
    getLatestPixelPriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS),
  ])

  // クライアントへ渡す前にショップを絞る（理由は forSpecTable の定義を参照）
  const allShopLinks = forSpecTable(rawShopLinks)

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
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/pixel/' },
      { '@type': 'ListItem', position: 3, name: '歴代Google Pixelスペック比較表' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/pixel-spec-table/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '【2025年】歴代Google Pixelのスペック＆性能比較表',
    description: '歴代Google Pixelのスペック比較表一覧。TensorチップやAI機能のアップデート履歴を一目で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/pixel/pixel-spec-table/',
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
            { label: '中古Google Pixelおすすめ機種・選び方まとめ', href: '/pixel/' },
            { label: '歴代Google Pixelスペック比較表' },
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
                歴代Google Pixelスペック比較表！気になる機種の性能差や違いがわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/pixel/pixel-spec-table/')}
                  alt="歴代Google Pixelスペック比較表のイメージ"
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
              <p>毎年新モデルが登場するGoogle Pixelシリーズ。機種変更を検討中の方にはこんな悩みも多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>最新機種はオーバースペックな気がする…</li>
                <li>自分の用途に合った型落ちPixelを探したい!</li>
              </ul>
              <p>本記事では<strong>歴代Google Pixelの主要スペックを一覧表で比較</strong>し、進化ポイントをわかりやすくまとめました。新たなPixelを購入する際の参考にしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link prefetch={false} href="/pixel/">中古Google Pixelおすすめ機種・選び方まとめ</Link>」をご覧ください。
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
                  Tensor性能・処理速度{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#evolution" className="toc-item">
                  歴代Pixelの進化点{' '}
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
        <GlossarySection productName="Google Pixel" items={GLOSSARY_ITEMS} />

        </div>
      </article>
    </main>
    <PixelArticleFooter
          pageUrl="https://used-lab.jp/pixel/pixel-spec-table/"
          pageTitle="歴代Google Pixelスペック比較表！気になる機種の性能差や違いがわかる"
          excludeHref={["/pixel/pixel-spec-table/"]}
        />
    </>
  )
}
