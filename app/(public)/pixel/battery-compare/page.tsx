import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPixelModels, getAllProductShopLinksByType } from '@/lib/queries'
import BatteryTable from './components/BatteryTable'
import ChargingTable from './components/ChargingTable'
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

export const metadata: Metadata = {
  title: 'Google Pixelバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
  description:
    '歴代Google Pixelのバッテリー容量（mAh）と公称電池持ちを比較しランキング形式で紹介。電池持ちのいいPixelがひと目でわかります。中古Pixelを選ぶ際の参考にどうぞ。',
  alternates: { canonical: '/pixel/battery-compare/' },
  openGraph: {
    title: 'Google Pixelバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代Google Pixelのバッテリー容量を比較しランキング形式で紹介。電池持ちのいいPixelがひと目でわかります。',
    url: '/pixel/battery-compare/',
    images: [{ url: getHeroImage('/pixel/battery-compare/'), width: 1200, height: 630, alt: '歴代Google Pixelバッテリー容量比較のイメージ' }],
  },
  twitter: {
    title: 'Google Pixelバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代Google Pixelのバッテリー容量を比較しランキング形式で紹介。',
    images: [getHeroImage('/pixel/battery-compare/')],
  },
}

const FAQ_ITEMS = [
  {
    question: 'Google Pixelでバッテリー持ちが良い機種はどれですか？',
    answer: '一般的に「Pro XL」「Pro」シリーズは本体サイズが大きく、バッテリー容量も多いため電池持ちに優れています。\n特にPixel 10 Pro XLは5200mAhの大容量バッテリーを搭載し、Google Tensorの省電力制御との相乗効果で長時間駆動が可能です。コンパクトなaシリーズもチューニングが良く、日常使いなら十分な電池持ちを確保しています。',
  },
  {
    question: 'Google公称の「通常使用」と「最大（省電力時）」の電池持ちは何が違うのですか？',
    answer: 'Googleはメーカーとして媒体別（ビデオ／音声など）の再生時間を細かく公表しておらず、代わりに「通常使用（24時間以上）」と「スーパーバッテリーセーバー使用時の最大時間（最大72時間など）」という2つの目安を示しています。\n通常使用は画面表示・通信・アプリ動作を含む一般的な使い方を想定した数値です。一方の最大時間はスーパーバッテリーセーバーをオンにして一部機能を制限した状態での目安のため、実際の使い方によって電池持ちは変わります。',
  },
  {
    question: 'Google Pixelのバッテリーが劣化するとどんな症状が出ますか？',
    answer: '急に電源が落ちる、充電してもすぐに減る、本体が発熱しやすくなる、動作が遅くなるといった症状が見られることがあります。Pixelは充電サイクルの増加とともにバッテリーの最大容量が徐々に低下していきます。',
  },
  {
    question: 'Google Pixelのバッテリー寿命は何年くらいですか？',
    answer: '使用環境にもよりますが、通常は約2〜3年で劣化が進みます。リチウムイオン電池はフル充電回数（充電サイクル）が増えると性能が低下する傾向にあり、Pixelでは目安として充電サイクル数を確認できます。',
  },
  {
    question: 'Google Pixelのバッテリーを長持ちさせるコツはありますか？',
    answer: '高温環境を避ける、充電しながらの高負荷な操作を控える、「バッテリーの最適化された充電（アダプティブ充電）」をオンにする、画面の明るさを抑える、といった工夫でバッテリーの劣化を遅らせることができます。長期間使わない場合は満充電・完全放電のまま放置しないことも大切です。',
  },
]

export default async function PixelBatteryComparePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllPixelModels(),
    getAllProductShopLinksByType('pixel'),
  ])

  const batteryModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    battery: m.battery,
    battery_life: m.battery_life,
    battery_life_saver: m.battery_life_saver,
    iosysUrl: allShopLinks.find((l) => l.product_id === m.id && l.shop_id === 1)?.url || null,
  }))

  const chargingModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    battery: m.battery,
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
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/pixel/' },
      { '@type': 'ListItem', position: 3, name: '歴代Google Pixelバッテリー容量比較' },
    ],
  }

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/battery-compare/page.tsx')

  const articleJsonLd = buildArticleJsonLd({
    headline: 'Google Pixelバッテリー容量比較ランキング！電池持ちがいい機種はどれ？',
    description: '歴代Google Pixelのバッテリー容量を比較しランキング形式で紹介。電池持ちのいいPixelがひと目でわかります。',
    dateStr: dateStr,
    url: 'https://used-lab.jp/pixel/battery-compare/',
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
            { label: '中古Google Pixelおすすめ機種・選び方まとめ', href: '/pixel/' },
            { label: '歴代Google Pixelバッテリー容量比較' },
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
                Google Pixelのバッテリー容量比較ランキング！電池持ちがいい機種はどれ？
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/pixel/battery-compare/')}
                  alt="歴代Google Pixelバッテリー容量比較のイメージ"
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
              <p>Google Pixelを選ぶうえで「バッテリー持ち」は重要な比較ポイント。動画視聴やゲーム、SNS、ナビアプリなど長時間使うシーンではバッテリー性能の差が快適さに直結します。</p>
              <p>本記事では、<strong>歴代Google Pixelのバッテリー容量（mAh）とGoogle公称の電池持ち（通常使用／省電力時の最大時間）の目安を一覧表で紹介</strong>。大容量バッテリー搭載モデルや、Google Tensorの省電力設計で長く使える機種を知りたい方はぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                情報を網羅的に得たい方は「<Link prefetch={false} href="/pixel/">中古Google Pixelおすすめ機種・選び方まとめ</Link>」も参考にしてみてください！
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
                Google Pixelのバッテリー劣化具合を確認する方法
              </h2>
              <p className="m-section-desc">
                中古Google Pixelを購入する際はバッテリーの劣化状態を必ず確認しましょう。
              </p>

              <div className="m-card m-card--shadow m-card--padded media-card--aside-footer">
                <div className="media-card__img-wrap">
                  <Image
                    src="/images/pixel-article/google-pixel0.jpg"
                    alt="スマートフォンのバッテリーの状態確認画面のイメージ"
                    className="media-card__img"
                    width={800}
                    height={450}
                    loading="lazy"
                  />
                </div>
                <div className="media-card__body">
                  <h3 className="media-card__title">充電サイクル数とバッテリーの状態をチェック</h3>
                  <div className="media-card__desc m-rich-text">
                    <p>Google Pixelのバッテリーにはリチウムイオン電池が使用されています。このバッテリーは充電を繰り返すうちに劣化し、<strong>充電できる最大容量が減っていく</strong>性質があります。</p>
                    <p>Pixelでは設定画面から<strong>充電サイクル数や製造からの経過</strong>を確認でき、サイクル数が多いほどバッテリーが消耗している目安になります。中古で購入する際はこの数値をチェックしておくと安心です。</p>
                    <p>ちなみに筆者の過去の経験からすると<strong>毎日スマートフォンを充電すると2〜3年でバッテリーの持ちが体感で悪くなる</strong>傾向がありました。</p>
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
                    <span>「バッテリー」をタップ</span>
                  </li>
                  <li className="caution-steps__item">
                    <span className="caution-steps__num">3</span>
                    <span>「バッテリー情報（バッテリーの状態）」をタップし、充電サイクル数などを確認</span>
                  </li>
                </ol>
                <div className="m-callout m-callout--subtle caution-links-box">
                  <ul className="caution-links-box__list">
                    <li>
                      <Link prefetch={false} href="/pixel/used-pixel-support/"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Google Pixelはいつまで使える？機種別のサポート期間目安まとめ。買い替えるべきタイミングも解説。</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <FaqSection
          title="Google Pixelのバッテリーに関するよくある質問"
          description="バッテリーに関して多く寄せられる質問をまとめました。"
          items={FAQ_ITEMS}
        />

</div>
      </article>
    </main>
    <PixelArticleFooter
          pageUrl="https://used-lab.jp/pixel/battery-compare/"
          pageTitle="Google Pixelバッテリー容量比較ランキング！電池持ちがいい機種はどれ？"
          excludeHref={["/pixel/battery-compare/"]}
        />
    </>
  )
}
