import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getHeroImage } from '@/lib/data/hero-images'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import { getAllIPadModels, getAllIPadPriceLogsByModelIds, getAllProductShopLinksByType } from '@/lib/queries'
import type { IPadPriceLog, ProductShopLink } from '@/lib/types'
import BenchmarkRanking from './components/BenchmarkRanking'
import ChipGenerationCompare from './components/ChipGenerationCompare'
import UseCaseGuide from './components/UseCaseGuide'

const PAGE_TITLE = '歴代iPadのベンチマーク比較ランキング｜Geekbench 6 & AnTuTuスコアで性能が一目でわかる'
const PAGE_DESCRIPTION =
  '歴代iPadのGeekbench 6・AnTuTuベンチマークスコアをランキング形式で比較。シングルコア・マルチコア・GPU性能の3指標で性能差がひと目でわかります。チップ世代別の進化や用途別おすすめスコアの目安も解説。'
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
    images: [{ url: '/images/content/thumbnail/ipad-image-12.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
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
    answer: '同じチップ（例: A15 Bionic）を搭載していれば基本的に同等のスコアになります。ただしiPad ProはMチップ搭載モデルがあり、これらはiPhoneを大幅に上回る性能です。M1以降のiPad Proは、MacBook Airと同等クラスのCPU・GPU性能を持ちます。',
  },
  {
    question: 'iPadでイラストや動画編集をするにはどのくらいのスコアが必要？',
    answer: 'Procreateでのイラスト制作ならA14 Bionic以降で快適です。LumaFusionやiMovieでの4K動画編集にはM1チップ以降のiPad ProまたはiPad Airをおすすめします。レイヤー数が多いイラストや長尺動画の編集ではM2以降がより安心です。',
  },
  {
    question: 'iPad miniはベンチマーク的にどのくらいの性能ですか？',
    answer: 'iPad mini（第6世代）はA15 Bionic搭載でiPhone 13 Proと同等の性能です。iPad mini（A17 Pro）はA17 Pro搭載でiPhone 15 Proクラスの性能を持ち、コンパクトながら高い処理能力を備えています。',
  },
  {
    question: 'MチップのiPadとAチップのiPadではどのくらいの差がありますか？',
    answer: 'M1チップはA15 Bionicと比較してシングルコアで約40%、マルチコアで約2倍、GPU（Metal）で約3〜4倍の差があります。特にGPU性能の差が大きく、動画編集や3D処理で顕著な違いが出ます。',
  },
  {
    question: 'ゲームを快適に遊ぶにはどのiPadがおすすめ？',
    answer: '原神などの高負荷ゲームを快適に遊ぶなら、A15 Bionic以降のiPad（iPad mini 第6世代、iPad Air M1など）が目安です。大画面でゲームを楽しみたい場合は11インチ以上のiPad Air M1/M2がコスパ良くおすすめです。',
  },
]

export default async function BenchmarkPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

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
                  歴代iPadの<br className="sp-only" />ベンチマーク比較ランキング
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
          <section className="l-section" id="score-guide" aria-labelledby="heading-score-guide">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-score-guide">ベンチマークスコアの読み方</h2>
              <p className="m-section-desc">Geekbench 6は3つの指標でiPadの性能を数値化します。スコアが高いほど処理が速いことを意味します。</p>

              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="storage-point-heading">
                    <i className="fa-solid fa-microchip" aria-hidden="true" style={{ color: '#e74c6f' }}></i>
                    シングルコア
                  </h3>
                  <p className="storage-point-desc">CPU1コアの処理速度。アプリの起動、Web閲覧、手書きノートの反応速度など日常操作の快適さに直結します。</p>
                </div>
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="storage-point-heading">
                    <i className="fa-solid fa-grip" aria-hidden="true" style={{ color: '#f0a030' }}></i>
                    マルチコア
                  </h3>
                  <p className="storage-point-desc">全CPUコアを同時に使った処理能力。写真処理、動画書き出し、Split Viewでの複数アプリ同時使用に影響します。</p>
                </div>
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="storage-point-heading">
                    <i className="fa-solid fa-bolt" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                    Metal（GPU）
                  </h3>
                  <p className="storage-point-desc">GPUのグラフィック処理性能。3Dゲーム、Procreateでの大量レイヤー処理、動画編集に関わります。</p>
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

          <section className="l-section" id="related" aria-labelledby="heading-related">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-related">iPad選びのヒントになる関連記事</h2>
              <p className="m-section-desc">ベンチマーク以外の観点からもiPad選びをサポートする記事をまとめました。</p>
              <div className="l-grid l-grid--2col l-grid--gap-lg">
                <Link href="/ipad/ipad-spec-table/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/ipad/ipad-spec-table/')} alt="iPadスペック比較表" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <h3 className="related-link-card__title">iPadスペック比較表</h3>
                    <p className="related-link-card__desc">歴代iPadの全スペックを一覧で比較</p>
                  </div>
                </Link>
                <Link href="/ipad/recommend/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/ipad/recommend/')} alt="おすすめ中古iPad" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <h3 className="related-link-card__title">おすすめ中古iPad</h3>
                    <p className="related-link-card__desc">目的別におすすめの中古iPadを厳選して紹介</p>
                  </div>
                </Link>
                <Link href="/ipad/apple-pencil-compare/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/ipad/apple-pencil-compare/')} alt="Apple Pencil比較" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <h3 className="related-link-card__title">Apple Pencil互換性比較</h3>
                    <p className="related-link-card__desc">どのiPadにどのPencilが対応するか一覧で確認</p>
                  </div>
                </Link>
                <Link href="/ipad/storage-guide/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/ipad/storage-guide/')} alt="ストレージ容量ガイド" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <h3 className="related-link-card__title">ストレージ容量ガイド</h3>
                    <p className="related-link-card__desc">用途別のおすすめ容量と中古価格を比較</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          <section className="l-section" id="faq" aria-labelledby="heading-faq">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">iPadのベンチマークに関するよくある質問</h2>
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
