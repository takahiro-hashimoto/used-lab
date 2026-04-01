import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAllIPadModels,
  getAllIPadPriceLogsByModelIds,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { IPadPriceLog } from '@/lib/types'
import StorageTable, { type StorageModel } from './components/StorageTable'
import ShareBox from '@/app/components/ShareBox'
import IPadRelatedLinks from '@/app/components/ipad/IPadRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '中古iPadのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
  description:
    '中古iPadを買うとき何GBを選ぶべきか、用途別の目安を解説。歴代モデルの容量ラインナップ一覧もまとめています。',
  alternates: { canonical: '/ipad/storage-guide/' },
  openGraph: {
    title: '中古iPadのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古iPadのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    url: '/ipad/storage-guide/',
    images: [{ url: '/images/content/thumbnail/ipad-image-09.jpg', width: 360, height: 360, alt: '中古iPadストレージ容量ガイドのイメージ' }],
  },
  twitter: {
    title: '中古iPadのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古iPadのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    images: ['/images/content/thumbnail/ipad-image-09.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: '中古iPadのストレージ容量は後から増やせますか？',
    answer: 'iPadはSDカードに対応しておらず、ストレージの増設はできません。iCloud（月額130円〜）や外付けUSBストレージで対処できますが、アプリの容量は減らせないため、購入時に余裕のある容量を選ぶことが重要です。',
  },
  {
    question: '64GBと256GBで迷ったらどちらがいい？',
    answer: '2026年現在、iPadOSやアプリの大型化が進んでおり、メイン端末なら256GBがおすすめです。64GBでもWeb閲覧や動画視聴中心なら使えますが、アプリやファイルの管理に気を使う場面が増えます。中古価格差が1万円以内なら256GBを選んだほうが後悔しにくいです。',
  },
  {
    question: 'iPadで動画編集やイラスト制作をする場合、何GBがおすすめ？',
    answer: '動画編集には最低256GB、できれば512GB以上をおすすめします。4K動画素材は1分で約400MB、Procreateのイラスト1枚は数十〜数百MBになるため、クリエイティブ用途では容量に余裕を持つことが大切です。',
  },
  {
    question: 'iCloudを使えばストレージは少なくても大丈夫？',
    answer: 'iCloudの「iPadのストレージを最適化」機能で写真・動画をクラウドに逃がせます。ただしアプリ本体やゲームデータの容量は減らせないため、アプリを多く使う場合は端末のストレージも重要です。',
  },
  {
    question: 'iPadのストレージ容量が大きいほうが動作が速くなりますか？',
    answer: '容量の大きさは動作速度に直接影響しません。ただし、空き容量が極端に少ない状態だとiPadOSのキャッシュが作れずパフォーマンスが低下します。',
  },
  {
    question: '32GBのiPadは2026年でも使えますか？',
    answer: '実用は厳しいです。iPadOS自体で約10GB、標準アプリで数GB消費するため、実質20GB程度しか使えません。アプリ数本とWeb閲覧程度なら可能ですが、メイン端末としてはおすすめしません。',
  },
]

/** PriceLogから3店舗の平均最安値を算出 */
function calcAvgMinPrice(log: IPadPriceLog): number | null {
  const prices: number[] = []
  if (log.iosys_min && log.iosys_min > 0) prices.push(log.iosys_min)
  if (log.geo_min && log.geo_min > 0) prices.push(log.geo_min)
  if (log.janpara_min && log.janpara_min > 0) prices.push(log.janpara_min)
  if (prices.length === 0) return null
  return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length / 100) * 100
}

export default async function StorageGuidePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllIPadModels(),
    getAllProductShopLinksByType('ipad'),
  ])

  // StorageTable用データ: モデル情報 + PriceLogの最安価格を統合
  const priceLogsMap = await getAllIPadPriceLogsByModelIds(allModels.map((m) => m.id))

  const storageModels: StorageModel[] = allModels.map((m) => {
    const logs = priceLogsMap.get(m.id) || []

    let latestLog: IPadPriceLog | null = null
    for (const log of logs) {
      if (!latestLog || log.logged_at > latestLog.logged_at) {
        latestLog = log
      }
    }

    let storageLabel: string | null = null
    let avgMin: number | null = null

    if (latestLog?.storage) {
      avgMin = calcAvgMinPrice(latestLog)
      const num = parseInt(latestLog.storage, 10)
      storageLabel = isNaN(num) ? latestLog.storage : num >= 1000 ? `${num / 1000}TB` : `${num}GB`
    }

    const iosysLink = allShopLinks.find((l) => l.product_id === m.id && l.shop_id === 1)

    return {
      id: m.id,
      model: m.model,
      slug: m.slug,
      image: m.image,
      date: m.date,
      strage: m.strage,
      storageLabel,
      avgMin,
      iosysUrl: iosysLink?.url ?? null,
    }
  })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: 'ストレージ容量ガイド' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/storage-guide/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '中古iPadのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古iPadのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.com/ipad/storage-guide/',
  })

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
      <article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        <div className="hero-wrapper">
        <nav className="breadcrumb" aria-label="パンくずリスト">
          <div className="l-container">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link href="/">
                  <i className="fa-solid fa-house" aria-hidden="true"></i>{' '}
                  <span>中古Apple製品を安く買う</span>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/ipad">中古iPad完全購入ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">ストレージ容量ガイド</li>
            </ol>
          </div>
        </nav>

        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title">
                中古iPadのストレージ容量はどれがいい？用途別おすすめ容量まとめ
              </h1>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={dateStr}>
                    {dateDisplay}
                  </time> | 当記事のリンクには広告が含まれています
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/content/thumbnail/ipad-image-09.jpg"
                  alt="中古iPadストレージ容量ガイドのイメージ"
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
              <p>中古iPadを選ぶとき、容量（ストレージ）選びで迷う方は多いのではないでしょうか。iPadはSDカードで容量を増やせないため、購入時の選択がそのまま使い勝手に直結します。</p>
              <p>本記事では、<strong>用途別のおすすめ容量の目安と歴代iPadの容量ラインナップ</strong>をまとめました。「何GBにすればいいかわからない」という方はぜひ参考にしてみてください。</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link href="/ipad">中古iPad購入完全ガイド</Link>」も参考にしてみてください！
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li>
                <a href="#storage-points" className="toc-item">
                  容量選びのポイント{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#storage-quick" className="toc-item">
                  容量別おすすめ早見表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#storage-list" className="toc-item">
                  容量・価格一覧表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#storage-check" className="toc-item">
                  ストレージ確認方法{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
            <AuthorByline />
          </div>
        </nav>

        <div className="l-sections">
        {/* ストレージ容量を選ぶ時のポイント */}
        <section className="l-section" id="storage-points" aria-labelledby="heading-storage-points">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-points">
              ストレージ容量を選ぶ時のポイント
            </h2>
            <p className="m-section-desc">
              iPadのストレージ容量は、データの保存だけでなく端末の快適さ全体に影響します。購入前に知っておきたいポイントをまとめました。
            </p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-ban" aria-hidden="true" style={{ color: '#ef4444' }}></i>
                  後から容量を増やせない
                </h3>
                <p className="post-check-item__desc">
                  iPadはSDカードに非対応で、購入後にストレージを増設できません。USB-C外付けストレージは使えますが、アプリのインストール先にはできないため、購入時の容量選びが重要です。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-pen-fancy" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                  クリエイティブ用途は容量を消費しやすい
                </h3>
                <p className="post-check-item__desc">
                  Procreateのイラスト1枚で数十〜数百MB、4K動画素材は1分で約400MB消費します。iPadをイラスト制作や動画編集に使う場合、容量はiPhone以上に重要な選択ポイントです。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-gauge-high" aria-hidden="true" style={{ color: '#f59e0b' }}></i>
                  空き容量不足で動作が遅くなる
                </h3>
                <p className="post-check-item__desc">
                  iPadはストレージの空き容量が極端に少なくなると、キャッシュや一時ファイルが作れずアプリの動作が重くなります。快適に使うには常に10%以上の空きが必要です。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true" style={{ color: '#10b981' }}></i>
                  iPadOSアップデートにも空き容量が必要
                </h3>
                <p className="post-check-item__desc">
                  iPadOSのメジャーアップデートには数GBの空き容量が必要です。32GBモデルではアップデート時に容量不足になるケースも多く報告されています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 容量別おすすめ早見表 */}
        <section className="l-section" id="storage-quick" aria-labelledby="heading-storage-quick">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-quick">
              容量別おすすめ早見表
            </h2>
            <p className="m-section-desc">
              どの容量を選べばいいか迷ったら、まずはこちらの早見表で自分の使い方に合った容量を確認してみてください。
            </p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">32〜64GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--caution">注意が必要</span>
                </div>
                <p className="storage-quick-card__desc">Web閲覧・動画視聴中心のライトユーザー向け。アプリを多く入れると容量不足になりやすい。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約3,000枚 + アプリ10個程度</li>
                  <li>iPadOS+標準アプリで約15GB占有</li>
                  <li>32GBはアップデートで容量不足になりやすい</li>
                  <li>中古価格が最も安い</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">128GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--good">コスパ重視</span>
                </div>
                <p className="storage-quick-card__desc">予算を抑えたい方に最適。写真・SNS・Web閲覧がメインなら十分。軽い動画編集もこなせる。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約10,000枚 + アプリ30個程度</li>
                  <li>ノート・PDFの管理には十分</li>
                  <li>軽いイラスト制作もOK</li>
                  <li>中古価格が手頃でコスパ◎</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">256GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--recommend">おすすめ</span>
                </div>
                <p className="storage-quick-card__desc">2026年の標準的な容量。写真・動画・ゲーム・イラスト制作をバランスよく楽しめる。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約30,000枚 + アプリ50個以上</li>
                  <li>Procreateで数百枚のイラスト保存可</li>
                  <li>4K動画は約1.5時間撮影可能</li>
                  <li>3〜4年使っても余裕あり</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">512GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">ヘビーユーザー</span>
                </div>
                <p className="storage-quick-card__desc">動画編集やイラスト制作を本格的にする方向け。大量の素材を端末に保存できる。</p>
                <ul className="storage-quick-card__list">
                  <li>4K動画素材を大量に保存可能</li>
                  <li>大型ゲームも容量を気にせずインストール</li>
                  <li>LumaFusion等の動画編集も快適</li>
                  <li>中古価格はやや割高</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">1TB〜2TB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">プロ向け</span>
                </div>
                <p className="storage-quick-card__desc">ProRes動画や大量のRAWファイルを扱うプロ専用。iPad Proシリーズ限定の容量。</p>
                <ul className="storage-quick-card__list">
                  <li>ProRes動画を長時間保存可能</li>
                  <li>PCレスで大量素材を持ち歩ける</li>
                  <li>1TB以上はRAM 16GB搭載（M系チップ）</li>
                  <li>中古価格はかなり割高</li>
                </ul>
              </div>
            </div>

            <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
              <span className="m-callout__label">memo</span>
              <p className="m-callout__text">
                <strong>迷ったら256GBがおすすめ。</strong>iPadはiPhone以上にクリエイティブ用途で使われることが多く、容量不足になりやすい傾向があります。
                Web閲覧・動画視聴中心なら128GB、イラストや動画編集もするなら256GB以上を選びましょう。
              </p>
            </div>
          </div>
        </section>

        {/* 歴代iPad ストレージ容量一覧表 */}
        <StorageTable models={storageModels} />

        {/* ストレージ使用量の確認方法 */}
        <section className="l-section" id="storage-check" aria-labelledby="heading-storage-check">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-check">
              現在のストレージ使用量を確認する方法
            </h2>
            <p className="m-section-desc">
              今使っているiPadのストレージ使用量を確認すれば、次に買う端末の容量選びの参考になります。
            </p>

            <div className="m-card m-card--shadow m-card--padded media-card--aside-footer">
              <div className="media-card__img-wrap">
                <img
                  src="/images/content/thumbnail/ipad-storage.jpg"
                  alt="iPadのストレージ使用量確認画面"
                  className="media-card__img"
                  width={800}
                  height={450}
                  loading="lazy"
                />
              </div>
              <div className="media-card__body">
                <div className="media-card__desc">
                  <p>iPadの「設定」からストレージの使用状況を確認できます。</p>
                  <p>アプリごとの容量も表示されるため、<strong>何にどのくらい容量を使っているか</strong>を把握できます。</p>
                  <p>現在使っている容量を基準に、次のiPadの容量を選ぶのがもっとも確実な方法です。</p>
                </div>
              </div>
              <div className="media-card__footer">
                <h3 className="caution-how-to__heading">ストレージ使用量の確認方法</h3>
                <ol className="caution-steps">
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">1</span>
                    <span>設定アプリを開く</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">2</span>
                    <span>「一般」をタップ</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">3</span>
                    <span>「iPadストレージ」をタップ</span>
                  </li>
                </ol>
                <div className="m-callout m-callout--subtle caution-links-box">
                  <ul className="caution-links-box__list">
                    <li>
                      <Link href="/ipad/used-ipad-attention/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 中古iPadの注意点と選び方まとめ</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <section className="l-section" id="faq" aria-labelledby="heading-faq">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
              iPadのストレージ容量に関するよくある質問
            </h2>
            <p className="m-section-desc">ストレージ容量に関して多く寄せられる質問をまとめました。</p>

            <div className="faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="m-card m-card--shadow faq-item">
                  <h3 className="faq-question">{item.question}</h3>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 目的別に人気の中古iPad */}
        <section className="l-section" id="popular" aria-labelledby="heading-popular">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
              目的別に人気の中古iPad
            </h2>
            <p className="m-section-desc">
              目的別におすすめの機種を厳選。容量だけでなくスペック全体を見て選びたい方はぜひご覧ください。
            </p>
            <div className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <Image
                  src="/images/content/thumbnail/ipad-image-06.jpg"
                  alt="中古iPadおすすめのイメージ画像"
                  className="popular-card-img"
                  width={400}
                  height={500}
                  loading="lazy"
                />
              </figure>
              <div className="popular-card-body">
                <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                <p className="popular-card-title">中古iPadおすすめ機種</p>
                <p className="popular-card-desc">
                  イラスト制作向け、動画視聴向け、勉強・ノート用途向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。
                </p>
                <div>
                  <Link href="/ipad/recommend" className="m-btn m-btn--primary">
                    おすすめ機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IPadRelatedLinks excludeHref={["/ipad/storage-guide/", "/ipad/recommend/"]} />
        <ShareBox url="https://used-lab.com/ipad/storage-guide/" text="中古iPadのストレージ容量はどれがいい？用途別おすすめ容量まとめ" />
        </div>
      </article>
    </main>
  )
}
