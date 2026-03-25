import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getHeroImage } from '@/lib/data/hero-images'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import { getAllIPhoneModels, getAllIPhonePriceLogsByModelIds, getAllProductShopLinksByType } from '@/lib/queries'
import type { IPhonePriceLog, ProductShopLink } from '@/lib/types'
import BenchmarkRanking from './components/BenchmarkRanking'
import ChipGenerationCompare from './components/ChipGenerationCompare'
import UseCaseGuide from './components/UseCaseGuide'

const PAGE_TITLE = '歴代iPhoneのベンチマーク比較ランキング｜Geekbench 6 & AnTuTuスコアで性能が一目でわかる'
const PAGE_DESCRIPTION =
  '歴代iPhoneのGeekbench 6・AnTuTuベンチマークスコアをランキング形式で比較。シングルコア・マルチコア・GPU性能の3指標で性能差がひと目でわかります。チップ世代別の進化や用途別おすすめスコアの目安も解説。'
const PAGE_URL = 'https://used-lab.com/iphone/benchmark/'

export const revalidate = 86400

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/benchmark/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/benchmark/',
    images: [{ url: '/images/content/thumbnail/iphone-setting.webp', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/thumbnail/iphone-setting.webp'],
  },
}

const FAQ_ITEMS = [
  {
    question: 'Geekbench 6のスコアはどのくらい信頼できますか？',
    answer: 'Geekbench 6は業界標準のベンチマークツールの一つで、CPU・GPU性能を定量的に比較するのに役立ちます。ただし実際の使用感はメモリ量、ソフトウェア最適化、バッテリー状態など複数の要素に左右されるため、スコアはあくまで参考指標として活用しましょう。',
  },
  {
    question: 'AnTuTuスコアとGeekbenchスコアの違いは？',
    answer: 'Geekbenchは主にCPUとGPUの「処理能力」を測定します。一方AnTuTuはCPU・GPU・メモリ・UX（操作性）の4項目を総合的に評価するため、実際の使用感に近い指標と言えます。両方を参考にすることで、より正確な性能比較ができます。',
  },
  {
    question: 'A15チップのiPhoneは2026年でもまだ使えますか？',
    answer: 'A15チップ（iPhone 13シリーズ等）は2026年現在でもWeb閲覧、SNS、動画視聴など日常的な用途には十分な性能です。ただし最新の3Dゲームや高負荷なアプリでは、A16以降との差が体感できるケースがあります。iOSのサポートも引き続き対象なので、用途が合えばコスパの良い選択肢です。',
  },
  {
    question: 'Pro版とノーマル版のチップでどのくらいの差がありますか？',
    answer: 'iPhone 15以降ではProモデルに1世代上のチップ（15 Proには A17 Pro、16 ProにはA18 Pro）が搭載されます。シングルコアでは約10〜15%、GPUでは20〜30%の差があり、特にゲームやカメラ処理で体感差が出ます。日常使いではノーマル版でも十分快適です。',
  },
  {
    question: 'ゲームを快適に遊ぶにはどのくらいのスコアが必要ですか？',
    answer: '原神やFPS系の高負荷ゲームを高画質で楽しむなら、Geekbench Metal（GPU）スコア8,000以上、AnTuTu GPUスコア300,000以上を目安にしてください。A15 Bionic以降のチップであれば多くのゲームを快適にプレイできます。',
  },
]

export default async function BenchmarkPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  const [allModels, shopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllProductShopLinksByType('iphone'),
  ])
  const priceLogsMap = await getAllIPhonePriceLogsByModelIds(allModels.map((m) => m.id))

  // ベンチマークデータがあるモデルのみ抽出
  const benchModels = allModels
    .filter((m) => m.score_single != null && m.score_multi != null && m.score_metal != null)
    .map((m) => {
      const logs = priceLogsMap.get(m.id) || []
      let latestLog: IPhonePriceLog | null = null
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
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.com/iphone' },
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
              { label: '中古iPhone完全購入ガイド', href: '/iphone' },
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
                  歴代iPhoneの<br className="sp-only" />ベンチマーク比較ランキング
                </h1>
                <div className="hero-actions">
                  <a href="#ranking" className="m-btn m-btn--hero-primary">
                    <i className="fa-solid fa-ranking-star" aria-hidden="true"></i>
                    <span>ランキングを見る</span>
                  </a>
                  <a href="#chip-compare" className="m-btn m-btn--hero-outline">
                    <i className="fa-solid fa-microchip" aria-hidden="true"></i>
                    <span>チップ世代比較</span>
                  </a>
                </div>
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
                    src="/images/content/thumbnail/iphone-setting.webp"
                    alt="iPhoneベンチマーク比較のイメージ"
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
              <p>「A15とA16でどのくらい性能が違う？」「ゲームを快適に遊べるのはどのモデルから？」</p>
              <p>
                中古iPhone選びで気になる処理性能。本記事ではGeekbench 6とAnTuTuの2つのベンチマークスコアを使い、<strong>歴代iPhoneの処理性能をランキング形式で比較</strong>します。
              </p>
              <p>
                さらに<strong>チップ世代ごとの性能進化</strong>や、<strong>用途別に必要なスコアの目安</strong>もまとめました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                全スペックを横断比較したい方は「<Link href="/iphone/iphone-spec-table/">iPhoneスペック比較表</Link>」もご覧ください
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li><a href="#score-guide" className="toc-item">スコアの読み方 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#ranking" className="toc-item">総合ランキング <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#chip-compare" className="toc-item">チップ世代比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
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
              <p className="m-section-desc">Geekbench 6は3つの指標でiPhoneの性能を数値化します。スコアが高いほど処理が速いことを意味します。</p>

              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="storage-point-heading">
                    <i className="fa-solid fa-microchip" aria-hidden="true" style={{ color: '#e74c6f' }}></i>
                    シングルコア
                  </h3>
                  <p className="storage-point-desc">CPU1コアの処理速度。アプリの起動、Web閲覧、SNSの操作など日常操作の快適さに直結します。</p>
                </div>

                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="storage-point-heading">
                    <i className="fa-solid fa-grip" aria-hidden="true" style={{ color: '#f0a030' }}></i>
                    マルチコア
                  </h3>
                  <p className="storage-point-desc">全CPUコアを同時に使った処理能力。写真処理、動画書き出し、複数アプリの同時使用に影響します。</p>
                </div>

                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="storage-point-heading">
                    <i className="fa-solid fa-bolt" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                    Metal（GPU）
                  </h3>
                  <p className="storage-point-desc">GPUのグラフィック処理性能。3Dゲーム、カメラエフェクト、AR体験の快適さに関わります。</p>
                </div>
              </div>

              <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  <strong>日常使いで最も重要なのはシングルコアスコアです。</strong>ほとんどのアプリはシングルスレッドで動作するため、シングルコアが高いモデルほどアプリの起動や画面遷移が軽快になります。ゲームを重視する方はMetal（GPU）スコアも要チェックです。
                  本記事のスコアは<a href="https://browser.geekbench.com/ios_devices/iphone" target="_blank" rel="noopener noreferrer">Geekbench Browser（iPhone）<i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style={{ fontSize: '0.75em', marginLeft: '3px' }}></i></a>を参照しています。
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

          {/* 関連記事 */}
          <section className="l-section" id="related" aria-labelledby="heading-related">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-related">iPhone選びのヒントになる関連記事</h2>
              <p className="m-section-desc">ベンチマーク以外の観点からもiPhone選びをサポートする記事をまとめました。</p>
              <div className="l-grid l-grid--2col l-grid--gap-lg">
                <Link href="/iphone/iphone-spec-table/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/iphone/iphone-spec-table/')} alt="iPhoneスペック比較表" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <h3 className="related-link-card__title">iPhoneスペック比較表</h3>
                    <p className="related-link-card__desc">歴代iPhoneの全スペックを一覧で比較</p>
                  </div>
                </Link>
                <Link href="/iphone/battery-compare/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/iphone/battery-compare/')} alt="バッテリー容量比較" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <h3 className="related-link-card__title">バッテリー容量比較ランキング</h3>
                    <p className="related-link-card__desc">電池持ちのいいiPhoneがひと目でわかる</p>
                  </div>
                </Link>
                <Link href="/iphone/recommend/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/iphone/recommend/')} alt="おすすめ中古iPhone" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <h3 className="related-link-card__title">おすすめ中古iPhone</h3>
                    <p className="related-link-card__desc">目的別におすすめの中古iPhoneを厳選して紹介</p>
                  </div>
                </Link>
                <Link href="/iphone/storage-guide/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/iphone/storage-guide/')} alt="ストレージ容量ガイド" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <h3 className="related-link-card__title">ストレージ容量ガイド</h3>
                    <p className="related-link-card__desc">用途別のおすすめ容量と中古価格を比較</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* よくある質問 */}
          <section className="l-section" id="faq" aria-labelledby="heading-faq">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">iPhoneのベンチマークに関するよくある質問</h2>
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

          <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
