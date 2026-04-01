import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAllIPhoneModels,
  getAllIPhonePriceLogsByModelIds,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { IPhonePriceLog } from '@/lib/types'
import StorageTable, { type StorageModel } from './components/StorageTable'
import ShareBox from '@/app/components/ShareBox'
import IPhoneRelatedLinks from '@/app/components/iphone/IPhoneRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '中古iPhoneのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
  description:
    '中古iPhoneを買うとき何GBを選ぶべきか、用途別の目安を解説。歴代モデルの容量ラインナップ一覧もまとめています。',
  alternates: { canonical: '/iphone/storage-guide/' },
  openGraph: {
    title: '中古iPhoneのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古iPhoneのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    url: '/iphone/storage-guide/',
    images: [{ url: '/images/content/thumbnail/used-iphone-ios-support.jpg', width: 360, height: 360, alt: '中古iPhoneストレージ容量ガイドのイメージ' }],
  },
  twitter: {
    title: '中古iPhoneのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古iPhoneのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    images: ['/images/content/thumbnail/used-iphone-ios-support.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: '中古iPhoneのストレージ容量は後から増やせますか？',
    answer: 'iPhoneはSDカードに対応しておらず、ストレージの増設はできません。iCloud（月額130円〜）や外付けUSBメモリで対処できますが、アプリの容量は減らせないため、購入時に余裕のある容量を選ぶことが重要です。',
  },
  {
    question: '128GBと256GBで迷ったらどちらがいい？',
    answer: '2026年現在、写真や動画の高画質化・アプリの大型化が進んでおり、メイン端末なら256GBがおすすめです。128GBでも日常使いは可能ですが、2〜3年使うと容量が逼迫しやすくなります。中古価格の差が1万円以内であれば256GBを選んだほうが後悔しにくいです。',
  },
  {
    question: '64GBのiPhoneは2026年でも使えますか？',
    answer: '使えますが、余裕はありません。iOS自体で10GB以上、標準アプリで数GB消費するため、実質的に使える容量は40〜45GB程度です。写真やアプリを厳選して使う方、サブ機として使う方なら問題ありませんが、メイン端末としては128GB以上をおすすめします。',
  },
  {
    question: '写真や動画はどのくらいの容量を消費しますか？',
    answer: '写真1枚あたり約2〜5MB（Live Photoだと約5〜8MB）、1分間の動画撮影は1080pで約130MB、4Kで約400MBが目安です。1,000枚の写真で約5GB、30分の4K動画で約12GB消費する計算です。',
  },
  {
    question: 'iCloudを使えばストレージは少なくても大丈夫？',
    answer: 'iCloudの「iPhoneのストレージを最適化」機能を使えば写真・動画をクラウドに逃がせるため、容量の節約になります。ただしアプリの容量は減らせないため、ゲームやSNSアプリを多く使う場合は端末のストレージも重要です。',
  },
  {
    question: 'ストレージ容量が大きいほうが動作が速くなりますか？',
    answer: '容量の大きさは動作速度に直接影響しません。ただし、ストレージの空き容量が極端に少ない（残り数GB）状態だと、iOSのキャッシュや一時ファイルが作れずパフォーマンスが低下することがあります。',
  },
]

/** PriceLogから3店舗の平均最安値を算出 */
function calcAvgMinPrice(log: IPhonePriceLog): number | null {
  const prices: number[] = []
  if (log.iosys_min && log.iosys_min > 0) prices.push(log.iosys_min)
  if (log.geo_min && log.geo_min > 0) prices.push(log.geo_min)
  if (log.janpara_min && log.janpara_min > 0) prices.push(log.janpara_min)
  if (prices.length === 0) return null
  return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length / 100) * 100
}

export default async function StorageGuidePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllProductShopLinksByType('iphone'),
  ])

  // StorageTable用データ: モデル情報 + PriceLogの最安価格を統合
  const priceLogsMap = await getAllIPhonePriceLogsByModelIds(allModels.map((m) => m.id))

  const storageModels: StorageModel[] = allModels.map((m) => {
    const logs = priceLogsMap.get(m.id) || []

    // 最新のログを取得
    let latestLog: IPhonePriceLog | null = null
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
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.com/iphone' },
      { '@type': 'ListItem', position: 3, name: 'ストレージ容量ガイド' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/storage-guide/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '中古iPhoneのストレージ容量はどれがいい？用途別おすすめ容量まとめ',
    description: '中古iPhoneのストレージ容量の選び方を用途別に解説。歴代モデルの容量ラインナップも一覧で確認できます。',
    dateStr: dateStr,
    url: 'https://used-lab.com/iphone/storage-guide/',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="hero-wrapper">
        {/* パンくず */}
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
                <Link href="/iphone">中古iPhone完全購入ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">ストレージ容量ガイド</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title">
                中古iPhoneのストレージ容量はどれがいい？用途別おすすめ容量まとめ
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
                  src="/images/content/thumbnail/used-iphone-ios-support.jpg"
                  alt="中古iPhoneストレージ容量ガイドのイメージ"
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
              <p>中古iPhoneを選ぶとき、容量（ストレージ）選びで迷う方は多いのではないでしょうか。iPhoneはSDカードで容量を増やせないため、購入時の選択がそのまま使い勝手に直結します。</p>
              <p>本記事では、<strong>用途別のおすすめ容量の目安と歴代iPhoneの容量ラインナップ</strong>をまとめました。「何GBにすればいいかわからない」という方はぜひ参考にしてみてください。</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link href="/iphone">中古iPhone購入完全ガイド</Link>」も参考にしてみてください！
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
              iPhoneのストレージ容量は、データの保存だけでなく端末の快適さ全体に影響します。購入前に知っておきたいポイントをまとめました。
            </p>

            <div className="l-grid l-grid--2col l-grid--gap-lg">
              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-ban" aria-hidden="true" style={{ color: '#ef4444' }}></i>
                  後から容量を増やせない
                </h3>
                <p className="post-check-item__desc">
                  iPhoneはSDカードに非対応で、購入後にストレージを増設する手段がありません。購入時の容量がそのまま上限になるため、最初の選択が非常に重要です。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-mobile-screen" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                  インストールできるアプリ数に直結
                </h3>
                <p className="post-check-item__desc">
                  SNSアプリで約500MB、大型ゲームは1本で5〜10GB消費します。容量が少ないと入れられるアプリが限られ、使いたいアプリのために他を削除する必要が出てきます。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-gauge-high" aria-hidden="true" style={{ color: '#f59e0b' }}></i>
                  空き容量不足で動作が遅くなる
                </h3>
                <p className="post-check-item__desc">
                  iPhoneはストレージの空き容量が極端に少なくなると、キャッシュや一時ファイルが作れずゲームやアプリの動作が重くなります。快適に使うには常に10%以上の空きが必要です。
                </p>
              </div>

              <div className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true" style={{ color: '#10b981' }}></i>
                  iOSアップデートにも空き容量が必要
                </h3>
                <p className="post-check-item__desc">
                  iOSのメジャーアップデートには数GBの空き容量が必要です。容量が足りないとアップデートできず、セキュリティリスクにつながる可能性もあります。
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
                  <span className="storage-quick-card__capacity">64GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--caution">注意が必要</span>
                </div>
                <p className="storage-quick-card__desc">LINE・電話・Web閲覧がメインのサブ端末向け。メインで使うには厳しい容量です。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約3,000枚 + アプリ10個程度</li>
                  <li>4K動画は約10分で4GB消費</li>
                  <li>iOS+標準アプリで約15GB占有</li>
                  <li>中古価格が最も安い</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">128GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--good">コスパ重視</span>
                </div>
                <p className="storage-quick-card__desc">予算を抑えたい方に最適。写真・SNSがメインなら十分ですが、動画撮影が多いと不足気味。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約10,000枚 + アプリ30個程度</li>
                  <li>4K動画は約30分撮影可能</li>
                  <li>ゲーム2〜3本なら問題なし</li>
                  <li>中古価格が手頃でコスパ◎</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">256GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--recommend">おすすめ</span>
                </div>
                <p className="storage-quick-card__desc">2026年の標準的な容量。写真・動画・ゲームをバランスよく楽しめて、長期間でも容量不足になりにくい。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約30,000枚 + アプリ50個以上</li>
                  <li>4K動画は約1.5時間撮影可能</li>
                  <li>大型ゲームも複数インストールOK</li>
                  <li>3〜4年使っても余裕あり</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">512GB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">ヘビーユーザー</span>
                </div>
                <p className="storage-quick-card__desc">動画撮影や大型ゲームを存分に楽しみたい方向け。一般的な使い方では持て余す容量です。</p>
                <ul className="storage-quick-card__list">
                  <li>写真 約60,000枚以上</li>
                  <li>4K動画は約6時間撮影可能</li>
                  <li>大型ゲームを10本以上インストールOK</li>
                  <li>中古価格はやや割高</li>
                </ul>
              </div>

              <div className="m-card m-card--shadow m-card--padded storage-quick-card">
                <div className="storage-quick-card__header">
                  <span className="storage-quick-card__capacity">1TB〜2TB</span>
                  <span className="storage-quick-card__label storage-quick-card__label--pro">プロ向け</span>
                </div>
                <p className="storage-quick-card__desc">ProRes動画やApple ProRAWを大量に扱うプロ・クリエイター専用。Proシリーズ限定の容量です。</p>
                <ul className="storage-quick-card__list">
                  <li>ProRes 4K動画を長時間保存可能</li>
                  <li>Apple ProRAWも容量を気にせず撮影</li>
                  <li>PC不要で大量の素材を持ち歩ける</li>
                  <li>中古価格はかなり割高</li>
                </ul>
              </div>
            </div>

            <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
              <span className="m-callout__label">memo</span>
              <p className="m-callout__text">
                <strong>迷ったら256GBがおすすめ。</strong>写真・動画の高画質化やアプリの大型化が進み、128GBでは2〜3年で窮屈になるケースが増えています。
                予算重視なら128GB、余裕を持ちたいなら256GBを選びましょう。
                なお、iPhoneはシリーズを重ねるごとに最低容量が引き上げられており（iPhone 11は64GB〜、iPhone 15は128GB〜、iPhone 17は256GB〜）、Apple自体が大容量化を前提とした設計に移行しています。
              </p>
            </div>
          </div>
        </section>

        {/* 歴代iPhone ストレージ容量一覧表 */}
        <StorageTable models={storageModels} />


        {/* ストレージ使用量の確認方法 */}
        <section className="l-section" id="storage-check" aria-labelledby="heading-storage-check">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-check">
              現在のストレージ使用量を確認する方法
            </h2>
            <p className="m-section-desc">
              今使っているiPhoneのストレージ使用量を確認すれば、次に買う端末の容量選びの参考になります。
            </p>

            <div className="m-card m-card--shadow m-card--padded media-card--aside-footer">
              <div className="media-card__img-wrap">
                <img
                  src="/images/content/thumbnail/iphone-storage.jpg"
                  alt="iPhoneのストレージ使用量確認画面"
                  className="media-card__img"
                  width={800}
                  height={450}
                  loading="lazy"
                />
              </div>
              <div className="media-card__body">
                <div className="media-card__desc m-rich-text">
                  <p>iPhoneの「設定」アプリからストレージの使用状況を確認できます。アプリごとの容量内訳も表示されるため、<strong>何にどのくらい容量を使っているか</strong>を一目で把握可能です。</p>
                  <p>たとえば「写真だけで30GB使っている」「ゲームアプリが合計20GBを占めている」といった具体的な数値がわかるので、次のiPhoneに必要な容量の目安を判断しやすくなります。</p>
                  <p>現在の使用量に加えて、今後のアプリ追加や写真の増加も考慮し、少し余裕を持った容量を選ぶのがおすすめです。</p>
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
                    <span>「iPhoneストレージ」をタップ</span>
                  </li>
                </ol>
                <div className="m-callout m-callout--subtle caution-links-box">
                  <ul className="caution-links-box__list">
                    <li>
                      <Link href="/iphone/used-iphone-attention/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 中古iPhoneの注意点と選び方まとめ</Link>
                    </li>
                    <li>
                      <Link href="/iphone/battery-compare/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> 歴代iPhoneのバッテリー容量比較ランキング</Link>
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
              iPhoneのストレージ容量に関するよくある質問
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

        {/* 目的別に人気の中古iPhone */}
        <section className="l-section" id="popular" aria-labelledby="heading-popular">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
              目的別に人気の中古iPhone
            </h2>
            <p className="m-section-desc">
              目的別におすすめの機種を厳選。容量だけでなくスペック全体を見て選びたい方はぜひご覧ください。
            </p>
            <div className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <Image
                  src="/images/content/thumbnail/iphone-setting.webp"
                  alt="中古iPhoneおすすめ5選のイメージ画像"
                  className="popular-card-img"
                  width={400}
                  height={500}
                  loading="lazy"
                />
              </figure>
              <div className="popular-card-body">
                <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                <p className="popular-card-title">中古iPhoneおすすめ5選</p>
                <p className="popular-card-desc">
                  カメラ性能を重視する人向け、大画面で動画やSNSを楽しみたい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。
                </p>
                <div>
                  <Link href="/iphone/recommend" className="m-btn m-btn--primary">
                    おすすめ5機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IPhoneRelatedLinks excludeHref={["/iphone/storage-guide/", "/iphone/recommend/"]} />
        <ShareBox url="https://used-lab.com/iphone/storage-guide/" text="中古iPhoneのストレージ容量はどれがいい？用途別おすすめ容量まとめ" />
        </div>
      </article>
    </main>
  )
}
