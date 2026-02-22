import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPhoneModels } from '@/lib/queries'
import BatteryTable from './components/BatteryTable'
import ChargingTable from './components/ChargingTable'
import ShareBox from '@/app/components/ShareBox'

export const metadata: Metadata = {
  title: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？ | ユーズドラボ',
  description:
    '歴代iPhoneのバッテリー容量を比較しランキング形式で紹介。電池持ちのいいiPhoneがひと目でわかります。中古iPhoneを選ぶ際の参考にどうぞ。',
  openGraph: {
    title: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？ | ユーズドラボ',
    description: '歴代iPhoneのバッテリー容量を比較しランキング形式で紹介。電池持ちのいいiPhoneがひと目でわかります。',
    url: '/iphone/battery-compare/',
    images: [{ url: '/images/iphone/iphone16pro.jpg', width: 360, height: 360, alt: '歴代iPhoneバッテリー容量比較のイメージ' }],
  },
  twitter: {
    title: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？ | ユーズドラボ',
    description: '歴代iPhoneのバッテリー容量を比較しランキング形式で紹介。',
    images: ['/images/iphone/iphone16pro.jpg'],
  },
}

const FAQ_ITEMS = [
  {
    question: 'iPhoneのバッテリー持ちが良い機種はどれですか？',
    answer: '一般的に「Pro Max」シリーズや「Plus」モデルは本体サイズが大きく、バッテリー容量も多いため電池持ちが優れています。特にiPhone 15 Pro Maxや14 Plusは省電力チップとの相乗効果で長時間駆動が可能です。',
  },
  {
    question: 'ストリーミング再生とビデオ再生のバッテリー持ちが違う理由は？',
    answer: 'ストリーミングでは動画をネット経由で受信するため、Wi-Fiやモバイル通信を使ったデータのやり取りが常に発生します。さらに、そのときの通信状況に応じて画質を自動調整したり、アプリがバックグラウンドで動作することもあり、結果としてバッテリーを多く消費します。一方で、あらかじめ端末に保存されたビデオを再生する場合は、通信を使わず画面表示と処理に専念できるため、電池の持ちが良くなります。',
  },
  {
    question: 'iPhoneのバッテリーが劣化するとどんな症状が出ますか？',
    answer: '急に電源が落ちる、充電してもすぐに減る、動作が遅くなるといった症状が見られることがあります。バッテリー最大容量が80%を下回ると交換の目安とされています。',
  },
  {
    question: 'iPhoneのバッテリー寿命は何年くらいですか？',
    answer: '使用環境にもよりますが、通常は約2〜3年で劣化が進みます。フル充電回数が約500回を超えるとバッテリー性能が低下する傾向にあります。',
  },
  {
    question: 'iPhoneのバッテリーを長持ちさせるコツはありますか？',
    answer: '高温環境を避ける、充電しながらの操作を控える、「最適化されたバッテリー充電」設定をオンにする、画面の明るさを抑えるといった工夫でバッテリーの劣化を遅らせることができます。',
  },
]

export default async function IPhoneBatteryComparePage() {
  const allModels = await getAllIPhoneModels()

  const batteryModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    battery: m.battery,
    video: m.video,
    streaming: m.streaming,
    audio: m.audio,
  }))

  const chargingModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    battery: m.battery,
    port: m.port,
    magsafe: m.magsafe,
  }))

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全ガイド', item: 'https://used-lab.com/iphone' },
      { '@type': 'ListItem', position: 3, name: '歴代iPhoneバッテリー容量比較' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代iPhoneのバッテリー容量を比較しランキング形式で紹介。電池持ちのいいiPhoneがひと目でわかります。',
    datePublished: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://used-lab.com/iphone/battery-compare/' },
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
                <Link href="/iphone">中古iPhone完全ガイド</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">歴代iPhoneバッテリー容量比較</li>
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
                歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？
              </h1>
              <div className="hero-actions">
                <a href="#battery-ranking" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-ranking-star" aria-hidden="true"></i>
                  <span>ランキングを見る</span>
                </a>
                <a href="#battery-chart" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-chart-column" aria-hidden="true"></i>
                  <span>比較チャートを見る</span>
                </a>
              </div>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={new Date().toISOString().split('T')[0]}>
                    {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time> | 当記事のリンクには広告が含まれています
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/iphone/iphone16pro.jpg"
                  alt="歴代iPhoneバッテリー容量比較のイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                  priority
                />
              </figure>
            </div>
          </div>
        </header>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>iPhoneを選ぶうえで「バッテリー持ち」は重要な比較ポイント。動画視聴やゲーム、SNS、ナビアプリなど長時間使うシーンではバッテリー性能の差が快適さに直結します。</p>
              <p>本記事では、<strong>歴代iPhoneのバッテリー容量・連続使用時間（ビデオ再生／オーディオ再生／ストリーミング再生）の目安を一覧表で紹介</strong>。大容量バッテリー搭載モデルや省電力設計の機種を知りたい方はぜひチェックしてみてください！</p>
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
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--2col toc-list">
              <li>
                <a href="#battery-ranking" className="toc-item">
                  バッテリー容量 一覧表{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#charging" className="toc-item">
                  コネクタ・充電方法一覧{' '}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#battery-health" className="toc-item">
                  バッテリー劣化具合の確認方法{' '}
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
          </div>
        </nav>

        {/* バッテリー容量 一覧表 */}
        <BatteryTable models={batteryModels} />

        {/* コネクタ・充電方法一覧 */}
        <ChargingTable models={chargingModels} />

        {/* バッテリー劣化具合の確認方法 */}
        <section className="l-section l-section--bg-subtle" id="battery-health" aria-labelledby="heading-battery-health">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-battery-health">
              iPhoneのバッテリー劣化具合を確認する方法
            </h2>
            <p className="m-section-desc">
              中古iPhoneを購入する際はバッテリーの劣化状態を必ず確認しましょう。
            </p>

            <div className="m-card m-card--shadow m-card--padded caution-check-card">
              <div className="caution-check-card__body">
                <div className="caution-check-card__visual">
                  <figure className="caution-check-card__image">
                    <Image
                      src="/images/content/iphone-battery-limit.webp"
                      alt="iPhoneのバッテリーの状態確認画面"
                      width={260}
                      height={260}
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="caution-check-card__text">
                  <p>iPhoneのバッテリーにはリチウムイオン電池が使用されています。</p>
                  <p>このバッテリーは充電を繰り返すうちに劣化し、<strong>充電できる最大容量が減っていく</strong>性質があります。</p>
                  <p>iPhoneの「バッテリー最大容量」が80%を下回っていると体感できるレベルでバッテリーの減りが早く感じます。</p>
                  <p>ちなみに筆者の過去の経験からすると<strong>毎日iPhoneを充電すると2~3年でバッテリー最大容量80%を下回る</strong>傾向がありました。</p>
                </div>
              </div>

              <div className="caution-how-to">
                <h4 className="caution-how-to__heading">
                  <i className="fa-regular fa-lightbulb" aria-hidden="true"></i> バッテリー最大容量の確認方法
                </h4>
                <ol className="caution-steps">
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">1</span>
                    <span>設定アプリを開く</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">2</span>
                    <span>「バッテリー」をタップ</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">3</span>
                    <span>「バッテリーの状態」をタップ</span>
                  </li>
                </ol>
              </div>

              <div className="m-callout m-callout--subtle caution-links-box">
                <ul className="caution-links-box__list">
                  <li>
                    <Link href="/iphone/used-iphone-support/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> iPhoneはいつまで使える？機種別のサポート期間目安まとめ。買い替えるべき4つのタイミングも解説。</Link>
                  </li>
                </ul>
              </div>
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
              目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。
            </p>
            <div className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <Image
                  src="/images/content/iphone-setting.webp"
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

        {/* よくある質問 */}
        <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
              iPhoneのバッテリーに関するよくある質問
            </h2>
            <p className="m-section-desc">バッテリーに関して多く寄せられる質問をまとめました。</p>

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

        <ShareBox url="https://used-lab.com/iphone/battery-compare/" text="歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？" />

      </article>
    </main>
  )
}
