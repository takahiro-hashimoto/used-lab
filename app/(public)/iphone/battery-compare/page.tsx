import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPhoneModels, getAllProductShopLinksByType } from '@/lib/queries'
import BatteryTable from './components/BatteryTable'
import ChargingTable from './components/ChargingTable'
import ShareBox from '@/app/components/ShareBox'
import IPhoneRelatedLinks from '@/app/components/iphone/IPhoneRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import IPhonePopularSection from '@/app/components/support/popular/IPhonePopularSection'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
  description:
    '歴代iPhoneのバッテリー容量を比較しランキング形式で紹介。電池持ちのいいiPhoneがひと目でわかります。中古iPhoneを選ぶ際の参考にどうぞ。',
  alternates: { canonical: '/iphone/battery-compare/' },
  openGraph: {
    title: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代iPhoneのバッテリー容量を比較しランキング形式で紹介。電池持ちのいいiPhoneがひと目でわかります。',
    url: '/iphone/battery-compare/',
    images: [{ url: getHeroImage('/iphone/battery-compare/'), width: 1200, height: 630, alt: '歴代iPhoneバッテリー容量比較のイメージ' }],
  },
  twitter: {
    title: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代iPhoneのバッテリー容量を比較しランキング形式で紹介。',
    images: [getHeroImage('/iphone/battery-compare/')],
  },
}

const FAQ_ITEMS = [
  {
    question: 'iPhoneのバッテリー持ちが良い機種はどれですか？',
    answer: '一般的に「Pro Max」シリーズや「Plus」モデルは本体サイズが大きく、バッテリー容量も多いため電池持ちが優れています。特にiPhone 15 Pro Maxや14 Plusは省電力チップとの相乗効果で長時間駆動が可能です。',
  },
  {
    question: 'ストリーミング再生とビデオ再生のバッテリー持ちが違う理由は？',
    answer: 'ストリーミングでは動画をネット経由で受信するため、Wi-Fiやモバイル通信を使ったデータのやり取りが常に発生します。さらに、そのときの通信状況に応じて画質を自動調整したり、アプリがバックグラウンドで動作することもあり、結果としてバッテリーを多く消費します。\n一方で、あらかじめ端末に保存されたビデオを再生する場合は、通信を使わず画面表示と処理に専念できるため、電池の持ちが良くなります。',
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
  const [allModels, allShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllProductShopLinksByType('iphone'),
  ])

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
    iosysUrl: allShopLinks.find((l) => l.product_id === m.id && l.shop_id === 1)?.url || null,
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
    iosysUrl: allShopLinks.find((l) => l.product_id === m.id && l.shop_id === 1)?.url || null,
  }))

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.jp/iphone' },
      { '@type': 'ListItem', position: 3, name: '歴代iPhoneバッテリー容量比較' },
    ],
  }

const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/battery-compare/page.tsx')

      const articleJsonLd = buildArticleJsonLd({
    headline: '歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代iPhoneのバッテリー容量を比較しランキング形式で紹介。電池持ちのいいiPhoneがひと目でわかります。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/iphone/battery-compare/',
  })

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
        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPhone完全購入ガイド', href: '/iphone' },
            { label: '歴代iPhoneバッテリー容量比較' },
          ]}
        />

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
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/iphone/battery-compare/')}
                  alt="歴代iPhoneバッテリー容量比較のイメージ"
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
            <div className="toc-wrapper">
              <p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
              <ol className="l-grid l-grid--2col u-list-reset">
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
            <AuthorByline />
          </div>
        </nav>
        <div className="l-sections">
          {/* バッテリー容量 一覧表 */}
          <BatteryTable models={batteryModels} />

          {/* コネクタ・充電方法一覧 */}
          <ChargingTable models={chargingModels} />

          {/* バッテリー劣化具合の確認方法 */}
          <section className="l-section" id="battery-health" aria-labelledby="heading-battery-health">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-battery-health">
                iPhoneのバッテリー劣化具合を確認する方法
              </h2>
              <p className="m-section-desc">
                中古iPhoneを購入する際はバッテリーの劣化状態を必ず確認しましょう。
              </p>

              <div className="m-card m-card--shadow m-card--padded media-card--aside-footer">
                <div className="media-card__img-wrap">
                  <Image
                    src="/images/content/thumbnail/iphone-battery-limit.jpg"
                    alt="iPhoneのバッテリーの状態確認画面"
                    className="media-card__img"
                    width={800}
                    height={450}
                    loading="lazy"
                  />
                </div>
                <div className="media-card__body">
                  <h3 className="media-card__title">バッテリー最大容量が80%を下回ったら要注意</h3>
                  <div className="media-card__desc m-rich-text">
                    <p>iPhoneのバッテリーにはリチウムイオン電池が使用されています。このバッテリーは充電を繰り返すうちに劣化し、<strong>充電できる最大容量が減っていく</strong>性質があります。</p>
                    <p>iPhoneの「バッテリー最大容量」が80%を下回っていると体感できるレベルでバッテリーの減りが早く感じます。</p>
                    <p>ちなみに筆者の過去の経験からすると<strong>毎日iPhoneを充電すると2~3年でバッテリー最大容量80%を下回る</strong>傾向がありました。</p>
                  </div>
                </div>
                <div className="media-card__footer">
                  <h3 className="caution-how-to__heading">バッテリー最大容量の確認方法</h3>
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
                <div className="m-callout m-callout--subtle caution-links-box">
                  <ul className="caution-links-box__list">
                    <li>
                      <Link href="/iphone/used-iphone-support/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> iPhoneはいつまで使える？機種別のサポート期間目安まとめ。買い替えるべき4つのタイミングも解説。</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <FaqSection
          title="iPhoneのバッテリーに関するよくある質問"
          description="バッテリーに関して多く寄せられる質問をまとめました。"
          items={FAQ_ITEMS}
        />

        <IPhonePopularSection />

        <IPhoneRelatedLinks excludeHref={["/iphone/battery-compare/", "/iphone/recommend/"]} />
        <ShareBox url="https://used-lab.jp/iphone/battery-compare/" text="歴代iPhoneのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？" />
        </div>
      </article>
    </main>
  )
}
