import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import ShareBox from '@/app/components/ShareBox'
import HeroMeta from '@/app/components/HeroMeta'
import { getAllIPadModels, getAllIPadPriceLogsByModelIds, getAllProductShopLinksByType } from '@/lib/queries'
import type { IPadPriceLog, ProductShopLink } from '@/lib/types'
import BenchmarkRanking from './components/BenchmarkRanking'
import ChipGenerationCompare from './components/ChipGenerationCompare'
import UseCaseGuide from './components/UseCaseGuide'
import IPadRelatedLinks from '@/app/components/ipad/IPadRelatedLinks'
import PopularSection from '@/app/components/support/PopularSection'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'

const PAGE_TITLE = 'iPadのベンチマークを比較！全モデルの性能がわかるスコアランキング【2026年版】'
const PAGE_DESCRIPTION =
  '歴代iPadのGeekbench 6・AnTuTuベンチマークスコアをランキング形式で比較。AチップからMチップまで、シングルコア・マルチコア・GPU性能の差がひと目でわかる一覧表付き。用途別おすすめスコアの目安も解説。'
const PAGE_URL = 'https://used-lab.com/ipad/benchmark/'

export const revalidate = 86400

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/benchmark/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/benchmark/',
    images: [{ url: '/images/content/thumbnail/ipad-image-12.jpg', width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/thumbnail/ipad-image-12.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: 'iPadのベンチマークスコアはiPhoneと比較できますか？',
    answer: '同じチップ（例: A15 Bionic）を搭載していれば基本的に同等のスコアになります。\nただしiPad ProはMチップ搭載モデルがあり、これらはiPhoneを大幅に上回る性能です。M1以降のiPad Proは、MacBook Airと同等クラスのCPU・GPU性能を持ちます。',
  },
  {
    question: 'iPadでイラストや動画編集をするにはどのくらいのスコアが必要？',
    answer: 'Procreateでのイラスト制作ならA14 Bionic以降で快適です。\nLumaFusionやiMovieでの4K動画編集にはM1チップ以降のiPad ProまたはiPad Airをおすすめします。レイヤー数が多いイラストや長尺動画の編集ではM2以降がより安心です。',
  },
  {
    question: 'iPad miniはベンチマーク的にどのくらいの性能ですか？',
    answer: 'iPad mini（第6世代）はA15 Bionic搭載でiPhone 13 Proと同等の性能です。\niPad mini（A17 Pro）はA17 Pro搭載でiPhone 15 Proクラスの性能を持ち、コンパクトながら高い処理能力を備えています。',
  },
  {
    question: 'MチップのiPadとAチップのiPadではどのくらいの差がありますか？',
    answer: 'M1チップはA15 Bionicと比較してシングルコアで約40%、マルチコアで約2倍、GPU（Metal）で約3〜4倍の差があります。\n特にGPU性能の差が大きく、動画編集や3D処理で顕著な違いが出ます。',
  },
  {
    question: 'ゲームを快適に遊ぶにはどのiPadがおすすめ？',
    answer: '原神などの高負荷ゲームを快適に遊ぶなら、A15 Bionic以降のiPad（iPad mini 第6世代、iPad Air M1など）が目安です。\n大画面でゲームを楽しみたい場合は11インチ以上のiPad Air M1/M2がコスパ良くおすすめです。',
  },
]

export default async function BenchmarkPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/benchmark/page.tsx')

  const [allModels, shopLinks] = await Promise.all([
    getAllIPadModels(),
    getAllProductShopLinksByType('ipad'),
  ])
  const priceLogsMap = await getAllIPadPriceLogsByModelIds(allModels.map((m) => m.id))

  const benchModels = allModels
    .filter((m) => m.score_single != null && m.score_multi != null && m.score_metal != null)
    .map((m) => {
      const logs = priceLogsMap.get(m.id) || []
      let latestLog: IPadPriceLog | null = null
      for (const log of logs) {
        if (!latestLog || log.logged_at > latestLog.logged_at) latestLog = log
      }
      const minPrice = (() => {
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
        score_single: m.score_single!,
        score_multi: m.score_multi!,
        score_metal: m.score_metal!,
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
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.com/ipad' },
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
    <main>
      <article itemScope itemType="https://schema.org/Article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        <div className="hero-wrapper">
          <Breadcrumb
            items={[
              { label: '中古iPad完全購入ガイド', href: '/ipad' },
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
                  iPadのベンチマークを比較！全モデルの性能がわかるスコアランキング
                </h1>
                <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image src="/images/content/thumbnail/ipad-image-12.jpg" alt="iPadベンチマーク比較のイメージ" className="hero-media__img" width={360} height={360} priority />
                </figure>
              </div>
            </div>
          </header>
        </div>

        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>「iPad AirとProの性能差はどのくらい？」「無印iPadでもゲームは快適？」</p>
              <p>
                中古iPad選びで気になる処理性能。本記事ではGeekbench 6とAnTuTuの2つのベンチマークスコアを使い、<strong>歴代iPadの処理性能をランキング形式で比較</strong>します。
              </p>
              <p>
                さらに<strong>チップ世代ごとの性能進化</strong>や、<strong>用途別に必要なスコアの目安</strong>もまとめました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link href="/ipad">中古iPad購入完全ガイド</Link>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li><a href="#score-guide" className="toc-item">スコアの読み方 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#ranking" className="toc-item">総合ランキング <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#chip-compare" className="toc-item">チップ世代比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#usecase" className="toc-item">用途別おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
</div>
          <AuthorByline />
          </div>
        </nav>

        <div className="l-sections">
          <section className="l-section" id="score-guide" aria-labelledby="heading-score-guide">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-score-guide">ベンチマークスコアの読み方</h2>
              <p className="m-section-desc">Geekbench 6は3つの指標でiPadの性能を数値化します。スコアが高いほど処理が速いことを意味します。</p>

              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-microchip" aria-hidden="true" style={{ color: '#e74c6f' }}></i>
                    シングルコア
                  </h3>
                  <p className="post-check-item__desc">CPU1コアの処理速度。アプリの起動、Web閲覧、手書きノートの反応速度など日常操作の快適さに直結します。</p>
                </div>
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-grip" aria-hidden="true" style={{ color: '#f0a030' }}></i>
                    マルチコア
                  </h3>
                  <p className="post-check-item__desc">全CPUコアを同時に使った処理能力。写真処理、動画書き出し、Split Viewでの複数アプリ同時使用に影響します。</p>
                </div>
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-bolt" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                    Metal（GPU）
                  </h3>
                  <p className="post-check-item__desc">GPUのグラフィック処理性能。3Dゲーム、Procreateでの大量レイヤー処理、動画編集に関わります。</p>
                </div>
              </div>

              <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  <strong>iPadはMチップ搭載モデルで性能が大きく変わります。</strong>iPad Pro（M1以降）はMacBook Air並みの処理能力を持ち、Aチップ搭載のiPad Air/mini/無印とは別次元のパフォーマンスです。
                  本記事のスコアは<a href="https://browser.geekbench.com/ios_devices/ipad" target="_blank" rel="noopener noreferrer">Geekbench Browser（iPad）<i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style={{ fontSize: '0.75em', marginLeft: '3px' }}></i></a>を参照しています。
                </p>
              </div>
            </div>
          </section>

          <BenchmarkRanking models={benchModels} shopLinks={shopLinks} />
          <ChipGenerationCompare models={benchModels} />
          <UseCaseGuide models={benchModels} shopLinks={shopLinks} />

          <FaqSection
            title="iPadのベンチマークに関するよくある質問"
            description="ベンチマークスコアに関して多く寄せられる質問をまとめました。"
            items={FAQ_ITEMS}
          />

          <PopularSection
            sectionTitle="目的別に人気の中古iPad"
            sectionDescription="目的別におすすめの機種を厳選。診断で迷った方はぜひご覧ください。"
            imageSrc="/images/content/thumbnail/ipad-image-03.jpg"
            imageAlt="中古iPadおすすめ5選のイメージ画像"
            subtitle="目的別におすすめ機種を厳選！"
            cardTitle="中古iPadおすすめ5選"
            cardDescription="イラスト制作に最適なモデル、動画視聴に大画面モデルなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
            buttonText="おすすめ5機種を見る"
            buttonHref="/ipad/recommend/"
            secondaryButtonText="イオシスで中古iPadを探す"
            secondaryButtonHref="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Ftablet%2Fios%2Fipad"
          />

          <IPadRelatedLinks excludeHref={["/ipad/benchmark/", "/ipad/recommend/"]} />

          <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
