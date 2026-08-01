import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllGalaxyModels, getAllProductShopLinksByType } from '@/lib/queries'
import BatteryTable from './components/BatteryTable'
import ChargingTable from './components/ChargingTable'
import GalaxyArticleFooter from '@/app/components/galaxy/GalaxyArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

export const metadata: Metadata = {
  title: '歴代Galaxyのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
  description:
    '歴代Samsung Galaxyのバッテリー容量（mAh）をランキング形式で比較。フラッグシップのSシリーズ、ミドルのAシリーズ、折りたたみのZシリーズまで、大容量バッテリー搭載モデルがひと目でわかります。中古Galaxyを選ぶ際の参考にどうぞ。',
  alternates: { canonical: '/galaxy/battery-compare/' },
  openGraph: {
    title: '歴代Galaxyのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代Samsung Galaxyのバッテリー容量を比較しランキング形式で紹介。バッテリー容量の大きいGalaxyがひと目でわかります。',
    url: '/galaxy/battery-compare/',
    images: [{ url: getHeroImage('/galaxy/battery-compare/'), width: 1200, height: 630, alt: '歴代Samsung Galaxyバッテリー容量比較のイメージ' }],
  },
  twitter: {
    title: '歴代Galaxyのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代Samsung Galaxyのバッテリー容量を比較しランキング形式で紹介。',
    images: [getHeroImage('/galaxy/battery-compare/')],
  },
}

const FAQ_ITEMS = [
  {
    question: 'Samsung Galaxyでバッテリー持ちが良い機種はどれですか？',
    answer: '一般的に本体サイズの大きい「Ultra」やフラッグシップのSシリーズ上位モデルは、バッテリー容量が5000mAh前後と多く、電池持ちに優れています。\nミドルレンジのAシリーズも省電力なチップとの組み合わせで、大容量バッテリーを積んだモデルは日常使いで長時間駆動が可能です。一方、折りたたみのZ Flipはコンパクトさを優先しているぶん容量が控えめな傾向があります。',
  },
  {
    question: 'Galaxyのバッテリー容量（mAh）はどこを見れば分かりますか？',
    answer: 'バッテリー容量は各モデルの公称スペックで公表されており、本記事の一覧表でも歴代モデルの容量（mAh）を比較できます。\n実際の電池持ちは容量だけでなく、Snapdragon（一部Exynos／Dimensity）といったチップの省電力性能や、ディスプレイのリフレッシュレート（120HzのLTPO対応など）、使い方によっても変わります。数値はあくまで目安として捉えてください。',
  },
  {
    question: '折りたたみのGalaxy（Z Fold／Z Flip）のバッテリーは普通のスマホと違いますか？',
    answer: 'Z Fold／Z Flipは本体が2つに折れる構造のため、バッテリーもヒンジを挟んで左右（上下）2セルに分割して搭載されているのが特徴です。公称容量は分割された合計値で表記されます。\n折りたたみ機は大画面や薄型化を優先する設計上、同世代のバー型フラッグシップよりも容量が控えめになる傾向があります。中古で選ぶ際は容量に加えて、ヒンジの状態や画面の折り目もあわせて確認しておくと安心です。',
  },
  {
    question: 'Galaxyのバッテリーが劣化するとどんな症状が出ますか？',
    answer: '急に電源が落ちる、充電してもすぐに減る、本体が発熱しやすくなる、動作が遅くなるといった症状が見られることがあります。Galaxyに使われているリチウムイオン電池は、充電サイクルの増加とともに最大容量が徐々に低下していきます。',
  },
  {
    question: 'Galaxyのバッテリー寿命は何年くらいですか？',
    answer: '使用環境にもよりますが、通常は約2〜3年で劣化が進みます。リチウムイオン電池はフル充電回数（充電サイクル）が増えると性能が低下する傾向にあり、Galaxyでは設定画面からバッテリーの状態を確認できます。',
  },
  {
    question: 'Galaxyのバッテリーを長持ちさせるコツはありますか？',
    answer: '高温環境を避ける、充電しながらの高負荷な操作を控える、「バッテリー保護（上限を85%などに制限する充電）」をオンにする、画面の明るさやリフレッシュレートを抑える、といった工夫でバッテリーの劣化を遅らせることができます。\n長期間使わない場合は満充電・完全放電のまま放置しないことも大切です。',
  },
]

export default async function GalaxyBatteryComparePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllGalaxyModels(),
    getAllProductShopLinksByType('galaxy'),
  ])

  const batteryModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    battery: m.battery,
    series: m.series,
    iosysUrl: allShopLinks.find((l) => l.product_id === m.id && l.shop_id === 1)?.url || null,
  }))

  const chargingModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    battery: m.battery,
    series: m.series,
    wired_charging: m.wired_charging,
    wireless_charging: m.wireless_charging,
    reverse_charging: m.reverse_charging,
    port: m.port,
    iosysUrl: allShopLinks.find((l) => l.product_id === m.id && l.shop_id === 1)?.url || null,
  }))

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Samsung Galaxyおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/galaxy/' },
      { '@type': 'ListItem', position: 3, name: '歴代Samsung Galaxyバッテリー容量比較' },
    ],
  }

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/galaxy/battery-compare/page.tsx')

  const articleJsonLd = buildArticleJsonLd({
    headline: '歴代Galaxyのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代Samsung Galaxyのバッテリー容量を比較しランキング形式で紹介。バッテリー容量の大きいGalaxyがひと目でわかります。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/galaxy/battery-compare/',
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
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古Samsung Galaxyおすすめ機種・選び方まとめ', href: '/galaxy/' },
            { label: '歴代Samsung Galaxyバッテリー容量比較' },
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
                歴代Galaxyのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/galaxy/battery-compare/')}
                  alt="歴代Samsung Galaxyバッテリー容量比較のイメージ"
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
              <p>Samsung Galaxyを選ぶうえで「バッテリー持ち」は重要な比較ポイント。動画視聴やゲーム、SNS、ナビアプリなど長時間使うシーンではバッテリー性能の差が快適さに直結します。</p>
              <p>本記事では、<strong>歴代Samsung Galaxyのバッテリー容量（mAh）を一覧表でランキング比較</strong>。フラッグシップのSシリーズ、ミドルレンジのAシリーズ、折りたたみのZシリーズまで、大容量バッテリーを搭載したモデルや長く使える機種を知りたい方はぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link prefetch={false} href="/galaxy/">中古Samsung Galaxyおすすめ機種・選び方まとめ</Link>」も参考にしてみてください！
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
                    バッテリー容量 ランキング{' '}
                    <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#charging" className="toc-item">
                    充電方法一覧{' '}
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
          </div>
        </nav>
        <div className="l-sections">
          {/* バッテリー容量 ランキング */}
          <BatteryTable models={batteryModels} />

          {/* 充電方法一覧 */}
          <ChargingTable models={chargingModels} />

          {/* バッテリー劣化具合の確認方法 */}
          <section className="l-section" id="battery-health" aria-labelledby="heading-battery-health">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-battery-health">
                Samsung Galaxyのバッテリー劣化具合を確認する方法
              </h2>
              <p className="m-section-desc">
                中古Samsung Galaxyを購入する際はバッテリーの劣化状態を必ず確認しましょう。
              </p>

              <div className="m-card m-card--shadow m-card--padded media-card--aside-footer">
                <div className="media-card__img-wrap">
                  <Image
                    src="/images/galaxy-article/samsung-galaxy-7.jpg"
                    alt="スマートフォンのバッテリーの状態確認画面のイメージ"
                    className="media-card__img"
                    width={800}
                    height={450}
                    loading="lazy"
                  />
                </div>
                <div className="media-card__body">
                  <h3 className="media-card__title">バッテリーの状態と使用状況をチェック</h3>
                  <div className="media-card__desc m-rich-text">
                    <p>Samsung Galaxyのバッテリーにはリチウムイオン電池が使用されています。このバッテリーは充電を繰り返すうちに劣化し、<strong>充電できる最大容量が減っていく</strong>性質があります。</p>
                    <p>Galaxyでは「デバイスケア」からバッテリーの状態（良好かどうか）や使用状況を確認できます。診断アプリ「Samsung Members」を使えばバッテリーの状態をより詳しくチェックでき、中古で購入する際はこうした数値を確認しておくと安心です。</p>
                    <p>ちなみに筆者の過去の経験からすると<strong>毎日スマートフォンを充電すると2〜3年でバッテリーの持ちが体感で悪くなる</strong>傾向がありました。折りたたみ機は左右2セルのどちらかが先にへたることもあるため、より慎重に状態を確認しましょう。</p>
                  </div>
                </div>
                <div className="media-card__footer">
                  <h3 className="caution-how-to__heading">バッテリーの状態の確認方法</h3>
                  <ol className="caution-steps u-mb-lg">
                    <li className="caution-steps__item">
                    <span className="caution-steps__num">1</span>
                    <span>設定アプリを開く</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">2</span>
                    <span>「バッテリーとデバイスケア」をタップ</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">3</span>
                    <span>「バッテリー」＞「バッテリー使用量」や「診断（Samsung Members）」からバッテリーの状態を確認</span>
                  </li>
                </ol>
                <div className="m-callout m-callout--subtle caution-links-box">
                  <ul className="caution-links-box__list">
                    <li>
                      <Link prefetch={false} href="/galaxy/used-galaxy-support/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Samsung Galaxyはいつまで使える？機種別のサポート期間目安まとめ。買い替えるべきタイミングも解説。</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <FaqSection
          title="Samsung Galaxyのバッテリーに関するよくある質問"
          description="バッテリーに関して多く寄せられる質問をまとめました。"
          items={FAQ_ITEMS}
        />

</div>
      </article>
    </main>
    <GalaxyArticleFooter
          pageUrl="https://used-lab.jp/galaxy/battery-compare/"
          pageTitle="歴代Galaxyのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？"
          excludeHref={["/galaxy/battery-compare/"]}
        />
    </>
  )
}
