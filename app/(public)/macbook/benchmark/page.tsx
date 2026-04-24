import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import MacBookArticleFooter from '@/app/components/macbook/MacBookArticleFooter'
import { getAllMacBookModels, getAllMacBookPriceLogsByModelIds, getAllProductShopLinksByType } from '@/lib/queries'
import type { MacBookPriceLog } from '@/lib/types'
import BenchmarkRanking from './components/BenchmarkRanking'
import HeroMeta from '@/app/components/HeroMeta'
import ChipGenerationCompare from './components/ChipGenerationCompare'
import AirVsProSection from './components/AirVsProSection'
import UseCaseGuide from './components/UseCaseGuide'
import { buildArticleJsonLd, getGitDateForFile , get90DaysAgo } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'

const PAGE_TITLE = 'MacBookのベンチマークを比較！全モデルの性能がわかるスコアランキング【2026年版】'
const PAGE_DESCRIPTION =
  '歴代MacBookのGeekbench 6ベンチマークスコアをランキング形式で比較。M1〜M5チップのシングルコア・マルチコア・GPU性能差がひと目でわかる一覧表付き。用途別おすすめスコアの目安も解説。'
const PAGE_URL = 'https://used-lab.jp/macbook/benchmark/'

export const revalidate = 86400

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/benchmark/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/benchmark/',
    images: [{ url: getHeroImage('/macbook/benchmark/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/macbook/benchmark/')],
  },
}

const FAQ_ITEMS = [
  {
    question: 'Geekbench 6のスコアはどのくらい信頼できますか？',
    answer: 'Geekbench 6は業界標準のベンチマークツールの一つで、CPU・GPU性能を定量的に比較するのに役立ちます。\nただし実際の作業パフォーマンスはメモリ量、SSD速度、ソフトウェア最適化など複数の要素に左右されるため、スコアはあくまで参考指標として活用しましょう。',
  },
  {
    question: 'メモリ8GBと16GBでベンチマークスコアは変わりますか？',
    answer: 'Geekbenchのスコア自体はメモリ量でほとんど変わりません。\nただし実際の作業では、メモリが多いほど同時に処理できるタスク量が増えるため、マルチタスク時の体感速度には大きな差が出ます。ベンチマークだけでなくメモリ量も含めて判断することをおすすめします。',
  },
  {
    question: 'M1のMacBookは2026年でもまだ使えますか？',
    answer: 'M1チップは2026年現在でもWeb閲覧、Office作業、軽いプログラミングなど一般的な用途には十分な性能です。\nただし4K動画編集や大規模な開発環境ではM2以降との差が目立ちます。macOSのサポートも引き続き対象なので、用途が合えばコスパの良い選択肢です。',
  },
  {
    question: 'ProチップやMaxチップは一般ユーザーにも必要ですか？',
    answer: 'Pro/Maxチップは主に動画編集、3Dレンダリング、機械学習など高負荷な作業向けです。\nWeb閲覧、資料作成、プログラミングなど一般的な用途であれば、通常のM1〜M4チップで十分です。\nProチップ以上はマルチコア・GPU性能が大幅に向上する一方、価格も高くなるため、用途に見合った選択が重要です。',
  },
  {
    question: 'MacBook AirとProではどのくらいの性能差がありますか？',
    answer: '同じ世代のチップを搭載している場合、シングルコア性能はほぼ同等です。\nただしProはファンを搭載しているため、長時間の高負荷作業でもサーマルスロットリング（熱による性能低下）が起きにくく、マルチコア性能を持続的に発揮できます。\nまた、Proには上位チップ（Pro/Max）が選べるため、GPU性能に大きな差がつきます。',
  },
  {
    question: 'M1とM2の体感差はどのくらいありますか？',
    answer: 'シングルコアスコアで約10〜15%の差があります。\nWeb閲覧やOffice作業ではほぼ体感差はありませんが、アプリの起動速度や写真の書き出しなど短時間の処理で差が出ます。\nまた、M2はメディアエンジンが強化されているため、動画の書き出し速度には明確な差があります。予算重視ならM1、数年先まで見据えるならM2がおすすめです。',
  },
  {
    question: 'Geekbench 6とGeekbench 5のスコアは比較できますか？',
    answer: 'Geekbench 6と5ではテスト内容が大きく異なるため、スコアを直接比較することはできません。\nGeekbench 6はAI/ML処理やカメラ処理など現代的なワークロードを重視しており、全体的にスコアが低く出る傾向があります。\n中古MacBookを比較する際は、必ず同じバージョンのスコア同士で比較してください。本記事ではすべてGeekbench 6のスコアを使用しています。',
  },
  {
    question: '中古MacBookのベンチマークスコアは新品より低くなりますか？',
    answer: 'ベンチマークスコア自体は基本的に新品と中古で変わりません。Apple Siliconチップの性能は経年劣化しにくい設計です。\nただしバッテリーの劣化により電力供給が不安定な場合や、ストレージがほぼ満杯の場合は、間接的にパフォーマンスが低下する可能性があります。\n中古でも正常な状態であれば新品同等のスコアが出ます。',
  },
  {
    question: 'MacBookのベンチマークでAnTuTuスコアは使えますか？',
    answer: 'AnTuTuは主にiPhone・iPad・Android向けのベンチマークアプリで、macOS版は公式に提供されていません。\nMacBookの性能比較にはGeekbench 6やCinebench R23が一般的に使われます。本記事ではGeekbench 6を採用しています。\niPhoneやiPadとの性能比較がしたい場合は、Geekbenchであれば同一スケールで比較可能です。',
  },
  {
    question: 'ベンチマークスコアが低くても快適に使えますか？',
    answer: 'はい、用途次第です。Web閲覧やメール、Office作業であればM1チップ（シングルコア約2,350）でも十分快適です。\nベンチマークは最大処理能力を測るものなので、軽い作業が中心であればスコアが高い必要はありません。\n「自分の用途に必要な最低ラインを満たしているか」を基準に選ぶと、無駄なコストを抑えつつ快適に使えます。',
  },
]

export default async function BenchmarkPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/benchmark/page.tsx')

  const [allModels, shopLinks] = await Promise.all([
    getAllMacBookModels(),
    getAllProductShopLinksByType('macbook'),
  ])
  const priceLogsMap = await getAllMacBookPriceLogsByModelIds(allModels.map((m) => m.id), get90DaysAgo())

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
    const logs = priceLogsMap[m.id] || []
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
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.jp/macbook' },
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
              { label: '中古MacBook完全購入ガイド', href: '/macbook/' },
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
                <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image
                    src={getHeroImage('/macbook/benchmark/')}
                    alt="MacBookベンチマーク比較のイメージ"
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
              <p>「M1とM2でどのくらい性能が違う？」「AirとProの差は体感でわかるレベル？」</p>
              <p>
                中古MacBook選びで最も多い疑問のひとつです。本記事ではGeekbench 6のベンチマークスコアを使い、<strong>歴代MacBookの処理性能をランキング形式で比較</strong>します。
              </p>
              <p>
                さらに<strong>チップ世代ごとの性能進化</strong>や、<strong>用途別に必要なスコアの目安</strong>もまとめました。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link href="/macbook/">中古MacBook購入完全ガイド</Link>」も参考にしてみてください！
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
              <li><a href="#chip-compare" className="toc-item">チップ世代比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#air-vs-pro" className="toc-item">Air vs Pro比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#chip-variant" className="toc-item">標準/Pro/Max比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#usecase" className="toc-item">用途別おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
</div>
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

              <div className="m-callout m-callout--tip u-mt-2xl">
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

          {/* Air vs Pro 比較 */}
          <AirVsProSection models={benchModels} />

          {/* 用途別おすすめスコアの目安 */}
          <UseCaseGuide models={benchModels} shopLinks={shopLinks} />

          {/* よくある質問 */}
          <FaqSection
            title="MacBookのベンチマークに関するよくある質問"
            description="ベンチマークスコアに関して多く寄せられる質問をまとめました。"
            items={FAQ_ITEMS}
          />

        </div>
      </article>
    </main>
    <MacBookArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/macbook/benchmark/", "/macbook/recommend/"]} />
    </>
  )
}
