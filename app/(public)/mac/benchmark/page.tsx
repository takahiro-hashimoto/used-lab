import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import {
  getAllMacModels,
  getAllProductShopLinksByType,
  getLatestMacPriceLogsWithPricesForModels,
} from '@/lib/queries'
import { calcAvgFromShops } from '@/lib/utils/price-info-helpers'
import BenchmarkRanking, { type BenchModel } from './components/BenchmarkRanking'
import ChipGenerationCompare from './components/ChipGenerationCompare'
import FaqSection from '@/app/components/support/FaqSection'
import MacArticleFooter from '@/app/components/mac/MacArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = false

const PAGE_TITLE = '歴代iMac・Mac miniのベンチマーク比較｜Mac Studioを含む性能差がスコアでわかる'
const PAGE_DESCRIPTION =
  '歴代のiMac・Mac mini・Mac Studioのベンチマークスコアを比較。中古相場と合わせて、用途に対して性能が足りるかどうかを確認できます。'
const PAGE_URL = 'https://used-lab.jp/mac/benchmark/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/mac/benchmark/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/mac/benchmark/',
    images: [{ url: getHeroImage('/mac/benchmark/'), width: 1200, height: 630, alt: '歴代iMac・Mac miniのベンチマーク比較のイメージ' }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/mac/benchmark/')],
  },
}

/** 用途ごとに必要な構成の目安。スコアが未取得でも成立するようチップ構成ベースで書いている */
const USE_CASES = [
  {
    icon: 'fa-solid fa-globe',
    title: 'ブラウジング・文書作成・動画視聴',
    chip: '無印チップ（M1〜M4）で十分',
    body: 'この用途で体感速度を決めるのはチップ世代よりメモリ容量です。中古で選ぶなら、世代を上げるより16GBメモリの個体を狙うほうが快適になります。Mac mini なら手持ちのモニターを流用でき、いちばん安く組めます。',
  },
  {
    icon: 'fa-solid fa-image',
    title: '写真編集・軽い動画編集',
    chip: '無印チップ＋16GB以上',
    body: 'Lightroomでの現像やフルHDの動画編集であれば無印チップで足ります。iMacは4.5K Retinaが最初から付いてくるので、色を見る作業をするならディスプレイを別途買うより結果的に安く済むことがあります。',
  },
  {
    icon: 'fa-solid fa-film',
    title: '4K動画編集・書き出しが多い',
    chip: 'Proチップ以上',
    body: '書き出し時間に直結するのはマルチコアとメディアエンジンです。Mac mini のM2 Pro・M4 Pro構成が中古では狙い目で、Mac Studioまで出さなくても実用になります。',
  },
  {
    icon: 'fa-solid fa-cube',
    title: '3D・大規模な映像制作・機械学習',
    chip: 'Max / Ultraチップ',
    body: 'GPUコア数とメモリ帯域がそのまま処理時間の差になる領域です。ここはMac Studio一択で、メモリも64GB以上を見ておきたいところ。中古の流通量は少なめなので、条件に合う個体が出たときに動く必要があります。',
  },
]

/**
 * ベンチマークまわりのFAQ。
 * 数値は mac_models の score_single / score_multi 実値から引いている。
 */
const FAQ_ITEMS = [
  {
    question: 'Geekbench 6のスコアはどのくらい信頼できますか？',
    answer:
      'CPU・GPUの処理能力を機種横断で比べるには有効な指標です。ただし実際の快適さはメモリ容量やストレージの空き、アプリ側の最適化にも左右されます。\nとくにデスクトップMacはメモリを増設できないため、スコアが同じでも8GBと16GBでは体感がまったく違います。スコアは「チップの速さ」だけを表す数字として見てください。',
  },
  {
    question: 'iMacとMac miniで同じチップなら性能は同じですか？',
    answer:
      'ほぼ同じです。たとえばM4搭載のiMac 24インチとMac miniは、シングルコアで3,714と3,735、マルチコアで14,762と15,085と、誤差の範囲に収まっています。\n違いが出るのは選べるチップの上限です。Mac miniはM4 Proまで選べますが、iMacは無印M4のみ。重い処理をするならMac miniのPro構成が選択肢になります。',
  },
  {
    question: '無印チップとPro・Max・Ultraは何が違いますか？',
    answer:
      'CPUコア数とGPUコア数、メモリ帯域が違います。シングルコア（1つの処理の速さ）はどのグレードもほぼ同じで、差が出るのはマルチコアとGPUです。\nつまりブラウジングや文書作成の体感速度はほとんど変わりません。動画の書き出しや3Dレンダリングのように全コアを使い切る作業でだけ、上位グレードの価格差に見合う差が出ます。',
  },
  {
    question: '型落ちのM1でも今から買って大丈夫ですか？',
    answer:
      '用途次第です。M1搭載のMac mini（2020）はシングルコア2,404で、最新のM4搭載Mac mini（2024）の3,735と比べると約6割の水準です。\nそれでもブラウジング・文書作成・動画視聴では体感差はほとんどありません。中古価格は世代差で大きく下がるので、この用途ならM1世代は有力な選択肢です。一方、4K動画の編集や書き出しを日常的にするならM4以降を選んでください。',
  },
  {
    question: 'ノートのMacBookとデスクトップで同じチップなら性能は同じですか？',
    answer:
      'カタログスコア上はほぼ同じですが、負荷が続いたときの落ち方が違います。ノートは薄い筐体で発熱を逃がしきれず、長時間の書き出しでは性能が下がることがあります。\nデスクトップは冷却に余裕があるため、スコアどおりの性能を出し続けやすいのが利点です。同じチップでも「長時間まわす作業」ではデスクトップが有利になります。',
  },
]

export default async function MacBenchmarkPage() {
  const PRICE_COLS = ['min1_price','max1_price','min2_price','max2_price','min3_price','max3_price','min4_price','max4_price','min5_price','max5_price']
  const [allModels, allShopLinks] = await Promise.all([
    getAllMacModels(),
    getAllProductShopLinksByType('mac'),
  ])

  const latestPriceLogs = await getLatestMacPriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS)

  const benchModels: BenchModel[] = allModels.map((m) => {
    const log = latestPriceLogs[m.id]
    let minPrice: number | null = null
    if (log) {
      const rec = log as unknown as Record<string, number | null>
      const mins: number[] = [], maxs: number[] = []
      for (let i = 1; i <= 5; i++) {
        const mn = rec[`min${i}_price`]; if (typeof mn === 'number' && mn > 0) mins.push(mn)
        const mx = rec[`max${i}_price`]; if (typeof mx === 'number' && mx > 0) maxs.push(mx)
      }
      const rec2 = log as unknown as Record<string, number[] | null>
      minPrice = calcAvgFromShops(mins, maxs, '', [rec2['matched_prices']])?.avg ?? null
    }
    // score_* が NULL の機種は hasScore=false でランキング外に並べる。
    // Geekbench のスケール移行が決まるまで全機種がこちらに入る
    const hasScore = m.score_single != null && m.score_multi != null
    return {
      id: m.id,
      model: m.model,
      shortname: m.shortname,
      slug: m.slug,
      image: m.image ? `/images/mac/${m.image}` : null,
      date: m.date,
      device_type: m.device_type,
      cpu: m.cpu,
      gpu: m.gpu,
      score_single: m.score_single ?? 0,
      score_multi: m.score_multi ?? 0,
      score_metal: m.score_metal ?? 0,
      minPrice,
      chipVariant: null,
      hasScore,
    }
  })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iMac・Mac miniおすすめ機種', item: 'https://used-lab.jp/mac/' },
      { '@type': 'ListItem', position: 3, name: '歴代iMac・Mac miniのベンチマーク比較' },
    ],
  }

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/mac/benchmark/page.tsx')

  const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

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
            { label: '歴代iMac・Mac miniのベンチマーク比較' },
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
                歴代iMac・Mac miniのベンチマーク比較｜Mac Studioを含む性能差がスコアでわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/mac/benchmark/')}
                  alt="歴代iMac・Mac miniのベンチマーク比較のイメージ"
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
              <p>デスクトップのMacは同じ世代でも無印・Pro・Max・Ultraで性能が大きく変わり、価格も何倍も違います。こんな悩みをお持ちの方も多いのではないでしょうか。</p>
              <ul className="lead-box__list">
                <li>自分の用途にMac Studioまで必要なのかわからない…</li>
                <li>型落ちのMac miniでも性能が足りるのか知りたい!</li>
              </ul>
              <p>本記事では<strong>歴代iMac・Mac miniの性能を用途別の目安とあわせて整理</strong>しました。中古相場も併記しているので、必要な性能に対していくら払うのが妥当かが判断できます。</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                各機種の詳しいスペックは「<Link prefetch={false} href="/mac/mac-spec-table/">歴代iMac・Mac miniスペック比較表</Link>」をご覧ください。
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
                  <a href="#score-guide" className="toc-item">
                    スコアの読み方{' '}
                    <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#ranking" className="toc-item">
                    ベンチマークランキング{' '}
                    <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#chip-compare" className="toc-item">
                    Mシリーズ世代別の比較{' '}
                    <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#use-case" className="toc-item">
                    用途別の目安{' '}
                    <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#faq" className="toc-item">
                    よくある質問{' '}
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
          {/* スコアの読み方。iPhone版と同じ3指標だが、デスクトップ特有の
              「冷却に余裕があるのでスコアどおりの性能が続く」点を補足している */}
          <section className="l-section" id="score-guide" aria-labelledby="heading-score-guide">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-score-guide">
                ベンチマークスコアの読み方
              </h2>
              <p className="m-section-desc">
                Geekbench 6は3つの指標でMacの性能を数値化します。スコアが高いほど処理が速いことを意味します。
              </p>

              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-microchip" aria-hidden="true" style={{ color: '#e74c6f' }}></i> シングルコア
                  </h3>
                  <p className="post-check-item__desc">
                    CPU1コアの処理速度。アプリの起動、Webブラウジング、Excelの再計算など、日常操作の軽快さがここで決まります。
                  </p>
                </div>

                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-grip" aria-hidden="true" style={{ color: '#f0a030' }}></i> マルチコア
                  </h3>
                  <p className="post-check-item__desc">
                    全CPUコアを同時に使った処理能力。動画の書き出し、RAW現像の一括処理、コンパイルなど、待ち時間の長さに直結します。
                  </p>
                </div>

                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="post-check-item__heading">
                    <i className="fa-solid fa-bolt" aria-hidden="true" style={{ color: '#2563eb' }}></i> Metal（GPU）
                  </h3>
                  <p className="post-check-item__desc">
                    GPUのグラフィック処理性能。動画編集のプレビュー再生、3Dレンダリング、外部ディスプレイの複数枚出力に関わります。
                  </p>
                </div>
              </div>

              <div className="m-callout m-callout--tip u-mt-2xl">
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  <strong>日常使いで最も重要なのはシングルコアスコアです。</strong>
                  多くのアプリは1つのコアで動くため、この数値が高いほど操作が軽快になります。
                  マルチコアとMetalが効いてくるのは、動画の書き出しや3Dのように全コアを使い切る作業のときだけです。
                  なお<strong>デスクトップMacはノートより冷却に余裕がある</strong>ぶん、長時間の作業でも性能が落ちにくく、スコアどおりの速さを維持しやすいという違いがあります。
                </p>
              </div>
            </div>
          </section>

          <BenchmarkRanking models={benchModels} shopLinks={allShopLinks} />

          <ChipGenerationCompare models={benchModels} />

          <section className="l-section" id="use-case" aria-labelledby="heading-use-case">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-use-case">
                用途別に必要な性能の目安
              </h2>
              <p className="m-section-desc">
                スコアの数字だけでは判断しづらいので、用途ごとにどのチップを選べばよいかをまとめました。
              </p>
              <div className="l-grid l-grid--2col u-list-reset">
                {USE_CASES.map((c) => (
                  <div className="m-card m-card--shadow m-card--padded post-check-item" key={c.title}>
                            <h3 className="post-check-item__heading">
                        <i className={c.icon} aria-hidden="true"></i> {c.title}
                      </h3>
                      <p className="recommend-card__label">{c.chip}</p>
                      <p className="post-check-item__desc">{c.body}</p>
                    </div>
                ))}
              </div>
              <div className="m-callout m-callout--tip u-mt-2xl">
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  Macはあとからメモリもストレージも増設できません。中古で買うときは、チップ世代を1つ上げるより
                  <strong>メモリに余裕がある個体を選ぶほうが長く使えます</strong>。
                </p>
              </div>
            </div>
          </section>

          <FaqSection
            title="iMac・Mac miniのベンチマークに関するよくある質問"
            description="スコアの見方や世代差について多く寄せられる質問をまとめました。"
            items={FAQ_ITEMS}
          />
        </div>
      </article>
    </main>
    <MacArticleFooter
      pageUrl={PAGE_URL}
      pageTitle={PAGE_TITLE}
      excludeHref={["/mac/benchmark/"]}
    />
    </>
  )
}
