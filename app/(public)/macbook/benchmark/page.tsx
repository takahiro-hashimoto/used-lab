import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import PopularMacBook from '@/app/components/PopularMacBook'
import MacBookRelatedLinks from '@/app/components/macbook/MacBookRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import { getAllMacBookModels, getAllMacBookPriceLogsByModelIds, getAllProductShopLinksByType } from '@/lib/queries'
import type { MacBookPriceLog, ProductShopLink } from '@/lib/types'
import BenchmarkRanking from './components/BenchmarkRanking'
import ChipGenerationCompare from './components/ChipGenerationCompare'
import UseCaseGuide from './components/UseCaseGuide'

const PAGE_TITLE = 'MacBookのベンチマークを比較！全モデルの性能がわかるスコアランキング【2026年版】'
const PAGE_DESCRIPTION =
  '歴代MacBookのGeekbench 6ベンチマークスコアをランキング形式で比較。M1〜M5チップのシングルコア・マルチコア・GPU性能差がひと目でわかる一覧表付き。用途別おすすめスコアの目安も解説。'
const PAGE_URL = 'https://used-lab.com/macbook/benchmark/'

export const revalidate = 86400

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/benchmark/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/benchmark/',
    images: [{ url: '/images/content/thumbnail/macbook-image-05.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/thumbnail/macbook-image-05.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: 'Geekbench 6のスコアはどのくらい信頼できますか？',
    answer: 'Geekbench 6は業界標準のベンチマークツールの一つで、CPU・GPU性能を定量的に比較するのに役立ちます。ただし実際の作業パフォーマンスはメモリ量、SSD速度、ソフトウェア最適化など複数の要素に左右されるため、スコアはあくまで参考指標として活用しましょう。',
  },
  {
    question: 'メモリ8GBと16GBでベンチマークスコアは変わりますか？',
    answer: 'Geekbenchのスコア自体はメモリ量でほとんど変わりません。ただし実際の作業では、メモリが多いほど同時に処理できるタスク量が増えるため、マルチタスク時の体感速度には大きな差が出ます。ベンチマークだけでなくメモリ量も含めて判断することをおすすめします。',
  },
  {
    question: 'M1のMacBookは2026年でもまだ使えますか？',
    answer: 'M1チップは2026年現在でもWeb閲覧、Office作業、軽いプログラミングなど一般的な用途には十分な性能です。ただし4K動画編集や大規模な開発環境ではM2以降との差が目立ちます。macOSのサポートも引き続き対象なので、用途が合えばコスパの良い選択肢です。',
  },
  {
    question: 'ProチップやMaxチップは一般ユーザーにも必要ですか？',
    answer: 'Pro/Maxチップは主に動画編集、3Dレンダリング、機械学習など高負荷な作業向けです。Web閲覧、資料作成、プログラミングなど一般的な用途であれば、通常のM1〜M4チップで十分です。Proチップ以上はマルチコア・GPU性能が大幅に向上する一方、価格も高くなるため、用途に見合った選択が重要です。',
  },
  {
    question: 'MacBook AirとProではどのくらいの性能差がありますか？',
    answer: '同じ世代のチップを搭載している場合、シングルコア性能はほぼ同等です。ただしProはファンを搭載しているため、長時間の高負荷作業でもサーマルスロットリング（熱による性能低下）が起きにくく、マルチコア性能を持続的に発揮できます。また、Proには上位チップ（Pro/Max）が選べるため、GPU性能に大きな差がつきます。',
  },
]

export default async function BenchmarkPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  const [allModels, shopLinks] = await Promise.all([
    getAllMacBookModels(),
    getAllProductShopLinksByType('macbook'),
  ])
  const priceLogsMap = await getAllMacBookPriceLogsByModelIds(allModels.map((m) => m.id))

  // ベンチマークデータをチップバリアント別に展開
  // benchmarks (JSON) がある場合はチップごとに別エントリ化、なければ従来の score_* を使用
  type BenchModelEntry = {
    id: number; model: string; shortname: string | null; slug: string
    image: string | null; date: string | null; cpu: string | null; ram: string | null
    score_single: number; score_multi: number; score_metal: number
    minPrice: number | null; storageLabel: string | null; chipVariant: string | null
  }

  const benchModels: BenchModelEntry[] = []

  for (const m of allModels) {
    const logs = priceLogsMap.get(m.id) || []
    let latestLog: MacBookPriceLog | null = null
    for (const log of logs) {
      if (!latestLog || log.logged_at > latestLog.logged_at) latestLog = log
    }
    const minPrice = latestLog?.min1_price && latestLog.min1_price > 0 ? latestLog.min1_price : null
    const storageLabel = m.strage?.match(/(\d+(?:GB|TB))/)?.[1] || null

    if (m.benchmarks && Object.keys(m.benchmarks).length > 0) {
      // benchmarks JSON からチップごとに展開
      for (const [chip, scores] of Object.entries(m.benchmarks)) {
        benchModels.push({
          id: m.id,
          model: m.model,
          shortname: m.shortname ? `${m.shortname.replace(/\s*M\d.*$/, '')} ${chip}` : `${m.model.replace(/（.*）/, '')} ${chip}`,
          slug: m.slug,
          image: m.image,
          date: m.date,
          cpu: chip,
          ram: m.ram,
          score_single: scores.single,
          score_multi: scores.multi,
          score_metal: scores.metal,
          minPrice,
          storageLabel,
          chipVariant: chip,
        })
      }
    } else if (m.score_single != null && m.score_multi != null && m.score_metal != null) {
      // フォールバック: 従来の score_* フィールドを使用
      benchModels.push({
        id: m.id,
        model: m.model,
        shortname: m.shortname,
        slug: m.slug,
        image: m.image,
        date: m.date,
        cpu: m.cpu,
        ram: m.ram,
        score_single: m.score_single,
        score_multi: m.score_multi,
        score_metal: m.score_metal,
        minPrice,
        storageLabel,
        chipVariant: null,
      })
    }
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.com/macbook' },
      { '@type': 'ListItem', position: 3, name: 'ベンチマーク比較' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: '2026-03-24',
    dateModified: dateStr,
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <main>
      <article itemScope itemType="https://schema.org/Article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        <div className="hero-wrapper">
          <Breadcrumb
            items={[
              { label: '中古MacBook完全購入ガイド', href: '/macbook' },
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
                  MacBookのベンチマークを比較！全モデルの性能がわかるスコアランキング
                </h1>
                <div className="hero-meta">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  <span>
                    更新日: <time dateTime={dateStr} itemProp="dateModified">{dateDisplay}</time> | 当記事のリンクには広告が含まれています
                  </span>
                  <meta itemProp="datePublished" content="2026-03-24" />
                </div>
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image
                    src="/images/content/thumbnail/macbook-ipad.jpg"
                    alt="MacBookベンチマーク比較のイメージ"
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
              <p>「M1とM2でどのくらい性能が違う？」「AirとProの差は体感でわかるレベル？」</p>
              <p>
                中古MacBook選びで最も多い疑問のひとつです。本記事ではGeekbench 6のベンチマークスコアを使い、<strong>歴代MacBookの処理性能をランキング形式で比較</strong>します。
              </p>
              <p>
                さらに<strong>チップ世代ごとの性能進化</strong>や、<strong>用途別に必要なスコアの目安</strong>もまとめました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link href="/macbook">中古MacBook購入完全ガイド</Link>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li><a href="#score-guide" className="toc-item">スコアの読み方 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#ranking" className="toc-item">総合ランキング <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#chip-compare" className="toc-item">チップ世代比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#chip-variant" className="toc-item">標準/Pro/Max比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#usecase" className="toc-item">用途別おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
          </div>
        </nav>

        <div className="l-sections">
          {/* ベンチマークスコアの読み方 */}
          <section className="l-section" id="score-guide" aria-labelledby="heading-score-guide">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-score-guide">ベンチマークスコアの読み方</h2>
              <p className="m-section-desc">Geekbench 6は3つの指標でMacBookの性能を数値化します。スコアが高いほど処理が速いことを意味します。</p>

              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-microchip" aria-hidden="true" style={{ color: '#e74c6f' }}></i>
                    シングルコア
                  </h3>
                  <p className="post-check-item__desc">CPU1コアの処理速度。アプリの起動、Web閲覧、テキスト入力など日常操作の快適さに直結します。</p>
                </div>

                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-grip" aria-hidden="true" style={{ color: '#f0a030' }}></i>
                    マルチコア
                  </h3>
                  <p className="post-check-item__desc">全CPUコアを同時に使った処理能力。動画の書き出し、コードのコンパイル、複数アプリの同時使用に影響します。</p>
                </div>

                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-bolt" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                    Metal（GPU）
                  </h3>
                  <p className="post-check-item__desc">GPUのグラフィック処理性能。3Dレンダリング、映像エフェクト、機械学習の推論処理に関わります。</p>
                </div>
              </div>

              <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  <strong>日常使いで最も重要なのはシングルコアスコアです。</strong>ほとんどのアプリケーションはシングルスレッドで動作するため、シングルコアが高いモデルほど普段の操作が軽快になります。マルチコア・Metalは動画編集や3D処理など特定の作業で差が出ます。
                </p>
              </div>
            </div>
          </section>

          {/* 総合ベンチマークランキング */}
          <BenchmarkRanking models={benchModels} shopLinks={shopLinks} />

          {/* チップ世代別の性能比較 */}
          <ChipGenerationCompare models={benchModels} />

          {/* 用途別おすすめスコアの目安 */}
          <UseCaseGuide models={benchModels} shopLinks={shopLinks} />

          {/* よくある質問 */}
          <section className="l-section" id="faq" aria-labelledby="heading-faq">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">MacBookのベンチマークに関するよくある質問</h2>
              <p className="m-section-desc">ベンチマークスコアに関して多く寄せられる質問をまとめました。</p>
              <div className="faq-list">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="m-card m-card--shadow faq-item">
                    <h3 className="faq-question">{item.question}</h3>
                    <div className="faq-answer"><p>{item.answer}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <PopularMacBook />
          <MacBookRelatedLinks excludeHref={["/macbook/benchmark/", "/macbook/recommend/"]} />
          <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
