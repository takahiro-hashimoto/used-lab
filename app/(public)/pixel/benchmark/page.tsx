import type { Metadata } from 'next'
import { priceStatsOf } from '@/lib/utils/price-stats'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import HeroMeta from '@/app/components/HeroMeta'
import { getAllPixelModels, getAllPixelPriceLogsByModelIds, getAllProductShopLinksByType } from '@/lib/queries'
import type { PixelPriceLog } from '@/lib/types'
import BenchmarkRanking from './components/BenchmarkRanking'
import ChipGenerationCompare from './components/ChipGenerationCompare'
import UseCaseGuide from './components/UseCaseGuide'
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'
import { buildArticleJsonLd, getGitDateForFile , get90DaysAgo } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'

const PAGE_TITLE = 'Google Pixelベンチマーク比較ランキング！全モデルの性能がわかるスコア一覧【2026年版】'
const PAGE_DESCRIPTION =
  '歴代Google PixelのGeekbench 6・AnTuTu v11ベンチマークスコアをランキング形式で比較。Google Tensor G1〜G4の性能差がひと目でわかる一覧表付き。用途別おすすめスコアの目安も解説。'
const PAGE_URL = 'https://used-lab.jp/pixel/benchmark/'

export const revalidate = false

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/pixel/benchmark/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/pixel/benchmark/',
    images: [{ url: getHeroImage('/pixel/benchmark/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/pixel/benchmark/')],
  },
}

const FAQ_ITEMS = [
  {
    question: 'Geekbench 6のスコアはどのくらい信頼できますか？',
    answer: 'Geekbench 6は業界標準のベンチマークツールの一つで、CPU・GPU性能を定量的に比較するのに役立ちます。\nただし実際の使用感はメモリ量、Androidの最適化、バッテリー状態など複数の要素に左右されるため、スコアはあくまで参考指標として活用しましょう。',
  },
  {
    question: 'AnTuTuスコアとGeekbenchスコアの違いは？',
    answer: 'Geekbenchは主にCPUとGPUの「処理能力」を測定します。\n一方AnTuTu v11はCPU・GPU・メモリ・UX（操作性）の4項目を総合的に評価するため、実際の使用感に近い指標と言えます。両方を参考にすることで、より正確な性能比較ができます。',
  },
  {
    question: 'Google TensorはSnapdragonに比べてスコアが低いのはなぜ？',
    answer: 'Google Tensorは純粋な処理速度よりも、AI・機械学習処理を重視して設計された独自SoCです。\nそのためGeekbenchやAnTuTuの数値だけを見るとSnapdragon搭載機に見劣りすることがありますが、消しゴムマジックやベストテイク、音声認識といったオンデバイスAI機能では強みを発揮します。日常使いでは十分快適です。',
  },
  {
    question: 'ゲームを快適に遊ぶにはどのくらいのスコアが必要ですか？',
    answer: '原神やFPS系の高負荷ゲームを楽しむなら、AnTuTu v11総合スコア100万点以上を目安にしてください。\nGoogle Tensor G3（Pixel 8世代）以降であれば多くのゲームを快適にプレイできます。発熱が気になる場合は画質設定を調整するとより安定します。',
  },
]

export default async function BenchmarkPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/benchmark/page.tsx')

  const [allModels, shopLinks] = await Promise.all([
    getAllPixelModels(),
    getAllProductShopLinksByType('pixel'),
  ])
  const priceLogsMap = await getAllPixelPriceLogsByModelIds(allModels.map((m) => m.id), get90DaysAgo())

  // ベンチマークデータがあるモデルのみ抽出
  const benchModels = allModels
    .filter((m) => m.score_single != null && m.score_multi != null)
    .map((m) => {
      const logs = priceLogsMap[m.id] || []
      let latestLog: PixelPriceLog | null = null
      for (const log of logs) {
        if (!latestLog || log.logged_at > latestLog.logged_at) latestLog = log
      }
      // 実勢相場（中央値）。コスパ計算の分母にもなるので、
      // 1点限りの特価が基準になると「コスパ最強」が実態とずれる
      const minPrice = (() => {
        const median = priceStatsOf(latestLog)?.median
        if (median != null) return median
        const prices: number[] = []
        if (latestLog?.iosys_min && latestLog.iosys_min > 0) prices.push(latestLog.iosys_min)
        if (latestLog?.geo_min && latestLog.geo_min > 0) prices.push(latestLog.geo_min)
        if (latestLog?.janpara_min && latestLog.janpara_min > 0) prices.push(latestLog.janpara_min)
        return prices.length > 0 ? Math.min(...prices) : null
      })()
      const storageLabel = latestLog?.storage || m.strage?.match(/(\d+(?:GB|TB))/)?.[1] || null

      return {
        id: m.id,
        model: m.model,
        slug: m.slug,
        image: m.image,
        date: m.date,
        cpu: m.cpu,
        ram: m.ram,
        tensor_gen: m.tensor_gen,
        score_single: m.score_single!,
        score_multi: m.score_multi!,
        antutu_total: m.antutu_total,
        antutu_cpu: m.antutu_cpu,
        antutu_gpu: m.antutu_gpu,
        antutu_mem: m.antutu_mem,
        antutu_ux: m.antutu_ux,
        minPrice,
        storageLabel,
      }
    })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/pixel/' },
      { '@type': 'ListItem', position: 3, name: 'ベンチマーク比較' },
    ],
  }

    const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  return (
    <>
    <main>
      <article itemScope itemType="https://schema.org/Article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="hero-wrapper">
          <Breadcrumb
            items={[
              { label: '中古Google Pixelおすすめ機種・選び方まとめ', href: '/pixel/' },
              { label: 'ベンチマーク比較' },
            ]}
          />

          <header className="hero">
            <div className="hero-bg" aria-hidden="true">
              <div className="hero-shape hero-shape-1"></div>
              <div className="hero-shape hero-shape-2"></div>
            </div>
            <div className="hero-inner l-container">
              <div className="hero-content">
                <h1 className="hero-title" itemProp="headline">
                  Google Pixelのベンチマークを比較！全モデルの性能がわかるスコアランキング
                </h1>
                <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image
                    src={getHeroImage('/pixel/benchmark/')}
                    alt="Google Pixelベンチマーク比較のイメージ"
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
              <p>「Tensor G2とG3でどのくらい性能が違う？」「ゲームを快適に遊べるのはどのモデルから？」</p>
              <p>
                中古Google Pixel選びで気になる処理性能。本記事ではGeekbench 6とAnTuTu v11の2つのベンチマークスコアを使い、<strong>歴代Pixelの処理性能をランキング形式で比較</strong>します。
              </p>
              <p>
                さらに<strong>Google Tensor世代ごとの性能進化</strong>や、<strong>用途別に必要なスコアの目安</strong>もまとめました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link prefetch={false} href="/pixel/">中古Google Pixelおすすめ機種・選び方まとめ</Link>」も参考にしてみてください！
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
              <li><a href="#score-guide" className="toc-item">スコアの読み方 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#ranking" className="toc-item">総合ランキング <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#chip-compare" className="toc-item">Tensor世代比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#usecase" className="toc-item">用途別おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#related" className="toc-item">関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>            </ol>
</div>
          </div>
        </nav>

        <div className="l-sections">
          {/* ベンチマークスコアの読み方 */}
          <section className="l-section" id="score-guide" aria-labelledby="heading-score-guide">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-score-guide">ベンチマークスコアの読み方</h2>
              <p className="m-section-desc">Geekbench 6とAnTuTu v11の指標でGoogle Pixelの性能を数値化します。スコアが高いほど処理が速いことを意味します。</p>

              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-microchip" aria-hidden="true" style={{ color: '#e74c6f' }}></i>
                    シングルコア
                  </h3>
                  <p className="post-check-item__desc">CPU1コアの処理速度。アプリの起動、Web閲覧、SNSの操作など日常操作の快適さに直結します。</p>
                </div>

                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-grip" aria-hidden="true" style={{ color: '#f0a030' }}></i>
                    マルチコア
                  </h3>
                  <p className="post-check-item__desc">全CPUコアを同時に使った処理能力。写真処理、動画書き出し、複数アプリの同時使用に影響します。</p>
                </div>

                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-gauge-high" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                    AnTuTu（総合）
                  </h3>
                  <p className="post-check-item__desc">CPU・GPU・メモリ・UXを合算した総合スコア。ゲームや動画などGPU負荷の高い処理を含めた総合力の目安になります。</p>
                </div>
              </div>

              <div className="m-callout m-callout--tip u-mt-2xl">
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  <strong>日常使いで最も重要なのはシングルコアスコアです。</strong>ほとんどのアプリはシングルスレッドで動作するため、シングルコアが高いモデルほどアプリの起動や画面遷移が軽快になります。ゲームを重視する方はAnTuTuの総合スコアも要チェックです。
                </p>
                <p className="m-callout__text">
                  本記事のスコアは<a href="https://browser.geekbench.com/android-benchmarks" target="_blank" rel="noopener noreferrer">Geekbench Browser（Android）<i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style={{ fontSize: '0.75em', marginLeft: '3px' }}></i></a>およびAnTuTu v11を参照しています。
                </p>
              </div>
            </div>
          </section>

          {/* 総合ベンチマークランキング */}
          <BenchmarkRanking models={benchModels} shopLinks={shopLinks} />

          {/* Tensor世代別の性能比較 */}
          <ChipGenerationCompare models={benchModels} />

          {/* 用途別おすすめスコアの目安 */}
          <UseCaseGuide models={benchModels} shopLinks={shopLinks} />

          {/* よくある質問 */}
          <FaqSection
            title="Google Pixelのベンチマークに関するよくある質問"
            description="ベンチマークスコアに関して多く寄せられる質問をまとめました。"
            items={FAQ_ITEMS}
          />


        </div>
      </article>
    </main>
    <PixelArticleFooter
            pageUrl={PAGE_URL}
            pageTitle={PAGE_TITLE}
            excludeHref={["/pixel/benchmark/"]}
          />
    </>
  )
}
