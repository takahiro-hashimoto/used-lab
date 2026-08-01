import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'
import {
  getAllIPhoneModels,
  getAllPixelModels,
  getAllGalaxyModels,
  getLatestIPhonePriceLogsWithPricesForModels,
  getLatestPixelPriceLogsWithPricesForModels,
  getLatestGalaxyPriceLogsWithPricesForModels,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import { buildArticleJsonLd, buildBreadcrumbJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import type { ProductShopLink } from '@/lib/types'
import {
  normalizeIPhones,
  normalizePixels,
  normalizeGalaxies,
  type NormalizedPhone,
} from './lib'
import {
  toCrossFromIPhones,
  toCrossFromPixels,
  toCrossFromGalaxies,
  type CrossCompareModel,
} from './compare-lib'
import FaqSection from '@/app/components/support/FaqSection'
import PriceBucketSection from './components/PriceBucketSection'
import CrossSpecTable from './components/CrossSpecTable'
import CompareTool from './components/CompareTool'
import UseCaseGuide from './components/UseCaseGuide'
import ArticleFooter from './components/ArticleFooter'

// ISR: 時間ベースの自動再生成なし（価格更新は purgeTag で明示無効化）
export const revalidate = false

const PAGE_PATH = '/smartphone-compare/'
const PAGE_URL = 'https://used-lab.jp/smartphone-compare/'
const PAGE_TITLE = '中古スマホはiPhone・Pixel・Galaxyどれがいい？価格帯別におすすめを徹底比較'
const PAGE_DESCRIPTION =
  '中古スマホはiPhone・Pixel・Galaxyのどれがいい？毎日更新の中古相場データをもとに、3万円以下〜12万円以上の価格帯別におすすめ機種をランキング。同じ予算ならAndroidが1〜2世代上を狙える一方、iPhoneはリセールが強い——ベンチマーク・カメラ・電池・サポート期限・FeliCaまで比較して解説します。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    images: [{ url: getHeroImage(PAGE_PATH), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage(PAGE_PATH)],
  },
}

const FAQ_ITEMS = [
  {
    question: 'iPhoneとPixel、長く使えるのはどちらですか？',
    answer:
      'OSアップデートの保証年数だけで見ると、Pixel 8以降は「7年」とGoogleが明示しているため、中古で買っても残り年数を計算しやすいのが強みです。\niPhoneはAppleが年数を公表していませんが、実績として発売から6〜8年はiOSの更新が届いています。\nどちらも「発売年＋7年前後」が目安になるため、中古では発売年が新しいほうを選ぶのが確実です。各機種の残り期間は[Pixelのサポート期間](/pixel/used-pixel-support/)と[iPhoneのサポート期間](/iphone/used-iphone-support/)で確認できます。',
  },
  {
    question: 'Galaxyは初めてのAndroidでも使いやすいですか？',
    answer:
      'GalaxyのOne UIは項目名が日本語でわかりやすく、設定画面も整理されているため、初めてのAndroidでも扱いやすい部類です。\nおサイフケータイ（FeliCa）にも対応しているので、iPhoneからの乗り換えでもSuicaやiDをそのまま使えます。\nただし独自アプリが多くプリインストールされている点は好みが分かれます。素に近いAndroidが好みならPixelのほうが向いています。',
  },
  {
    question: '中古で買うなら結局どのブランドがお得ですか？',
    answer:
      '「同じ予算でより高い性能」を求めるならAndroid（Pixel・Galaxy）です。値下がりが速いぶん、同じ金額でiPhoneより1〜2ランク上の型が狙えます。\n逆に「数年後に売る・下取りに出す」前提ならiPhoneが有利です。値落ちが緩やかなため、購入価格から売却額を引いた実質負担が小さくなります。\n価格帯ごとの具体的なねらい目は、このページの[価格帯別ランキング](#by-price)で実際の中古相場から確認できます。',
  },
  {
    question: 'AndroidからiPhone（またはその逆）に移行できますか？',
    answer:
      'どちらの方向でも公式の移行ツールが用意されています。Android→iPhoneはAppleの「iOSに移行」アプリ、iPhone→AndroidはGoogleの「データ移行」機能で、連絡先・写真・カレンダー・SMSなどをまとめて移せます。\nただし購入済みの有料アプリはOSをまたいで引き継げず、買い直しになります。またLINEのトーク履歴はOSをまたぐと引き継げない範囲があるため、移行前にバックアップ方法を確認しておくと安心です。',
  },
  {
    question: '中古スマホの相場はどのくらいの頻度で変わりますか？',
    answer:
      '中古相場は在庫状況で日々動きます。とくに新型が発表された直後は旧モデルの値下がりが大きくなりやすく、数週間で1万円以上動くこともあります。\n本サイトでは主要3ショップの販売価格を毎日自動取得しているため、このページの価格や順位も相場に合わせて自動で入れ替わります。底値を狙いたい場合は[iPhone](/iphone/price-info/)・[Pixel](/pixel/price-info/)・[Galaxy](/galaxy/price-info/)の価格推移グラフもあわせてご覧ください。',
  },
]

export default async function SmartphoneComparePage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/smartphone-compare/page.tsx')

  const [iphoneModels, pixelModels, galaxyModels] = await Promise.all([
    getAllIPhoneModels(),
    getAllPixelModels(),
    getAllGalaxyModels(),
  ])

  const PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
  const [iphonePrices, pixelPrices, galaxyPrices] = await Promise.all([
    getLatestIPhonePriceLogsWithPricesForModels(iphoneModels.map((m) => m.id), PRICE_COLS),
    getLatestPixelPriceLogsWithPricesForModels(pixelModels.map((m) => m.id), PRICE_COLS),
    getLatestGalaxyPriceLogsWithPricesForModels(galaxyModels.map((m) => m.id), PRICE_COLS),
  ])

  const [iphoneLinks, pixelLinks, galaxyLinks] = await Promise.all([
    getAllProductShopLinksByType('iphone'),
    getAllProductShopLinksByType('pixel'),
    getAllProductShopLinksByType('galaxy'),
  ])
  // イオシス(shop_id=1)の機種別アフィリンクを product_id → url マップに
  const iosysMap = (links: ProductShopLink[]): Record<number, string> =>
    Object.fromEntries(links.filter((l) => l.shop_id === 1).map((l) => [l.product_id, l.url]))
  const iphoneIosys = iosysMap(iphoneLinks)
  const pixelIosys = iosysMap(pixelLinks)
  const galaxyIosys = iosysMap(galaxyLinks)

  const phones: NormalizedPhone[] = [
    ...normalizeIPhones(iphoneModels, iphonePrices, iphoneIosys),
    ...normalizePixels(pixelModels, pixelPrices, pixelIosys),
    ...normalizeGalaxies(galaxyModels, galaxyPrices, galaxyIosys),
  ]

  // 2機種スペック比較ツール用（価格の有無に関係なく全モデルを対象）
  const crossModels: CrossCompareModel[] = [
    ...toCrossFromIPhones(iphoneModels, iphoneIosys, iphonePrices),
    ...toCrossFromPixels(pixelModels, pixelIosys, pixelPrices),
    ...toCrossFromGalaxies(galaxyModels, galaxyIosys, galaxyPrices),
  ]

  const hasData = phones.length > 0

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
    { name: '中古スマホ横断比較（iPhone・Pixel・Galaxy）' },
  ])
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
            <Breadcrumb items={[{ label: '中古スマホ横断比較（iPhone・Pixel・Galaxy）' }]} />

            <header className="hero">
              <div className="hero-bg" aria-hidden="true">
                <div className="hero-shape hero-shape-1"></div>
                <div className="hero-shape hero-shape-2"></div>
              </div>
              <div className="hero-inner l-container">
                <div className="hero-content">
                  <h1 className="hero-title" itemProp="headline">
                    iPhone・Pixel・Galaxyはどれがいい？中古スマホを価格帯別に徹底比較
                  </h1>
                  <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
                </div>
                <div className="hero-visual">
                  <figure className="hero-media">
                    <Image
                      src={getHeroImage(PAGE_PATH)}
                      alt="iPhone・Pixel・Galaxyの中古比較イメージ"
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

          {/* リード文（核の気づき） */}
          <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
            <div className="l-container">
              <div className="lead-box">
                <p>同じ中古予算でも、選ぶブランドによって買える性能は大きく変わります。</p>
                <p>
                  Android（Pixel・Galaxy）なら、同じ価格でiPhoneより1〜2世代新しいモデルを選べることが少なくありません。一方、iPhoneは価格が下がりにくく、売却時の価値（リセール）が高いのが特徴です。
                </p>
                <p>
                  このページでは、iPhone・Pixel・Galaxyの中古相場データをもとに、価格帯ごとの狙い目やブランドごとの違い、用途別のおすすめモデルを比較します。
                </p>
                <p className="lead-link">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                  各ブランドの詳細は「
                  <Link prefetch={false} href="/iphone/">iPhone</Link>／
                  <Link prefetch={false} href="/pixel/">Pixel</Link>／
                  <Link prefetch={false} href="/galaxy/">Galaxy</Link>
                  」の選び方ガイドもどうぞ。
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
                  <li><a href="#by-price" className="toc-item">価格帯別ランキング <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                  <li><a href="#cross-spec" className="toc-item">横断スペック＆ベンチ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                  <li><a href="#by-use" className="toc-item">用途別おすすめスマホ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                  <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                </ol>
              </div>
            </div>
          </nav>

          <div className="l-sections" itemProp="articleBody">
            {hasData ? (
              <>
                <PriceBucketSection phones={phones} />
                <CrossSpecTable phones={phones} />
                <CompareTool models={crossModels} />
                <UseCaseGuide phones={phones} />
              </>
            ) : (
              <>
                <section className="l-section" aria-label="価格データ準備中">
                  <div className="l-container">
                    <div className="m-callout m-callout--muted">
                      <span className="m-callout__label"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> お知らせ</span>
                      <p className="m-callout__text">
                        現在、iPhone・Pixel・Galaxyの中古相場データを集計中です。価格帯別のねらい目・横断ベンチマーク・用途別おすすめは、データが揃い次第このページに掲載します。
                      </p>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* データの出典。相場は自前集計・ベンチは外部スコアと出所が異なるため、
                どの数字がどこから来ているかを分けて明示する。
                体裁は各カテゴリの price-info「算出方法」セクションに合わせている */}
            <section className="l-section l-section--sm" id="data-source" aria-labelledby="heading-data-source">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-data-source">
                  このページのデータについて
                </h2>
                <p className="m-section-desc">中古相場とベンチマークの出典・算出方法を紹介します。</p>
                <div className="l-grid l-grid--3col l-grid--gap-lg">
                  <div className="m-card m-card--shadow m-card--padded post-check-item">
                    <p className="post-check-item__heading">
                      <i className="fa-solid fa-database" aria-hidden="true"></i>1. データ収集
                    </p>
                    <div className="media-card__desc m-rich-text">
                      <p>楽天ウェブサービス（楽天市場商品検索API）を利用し、イオシス・ゲオ・じゃんぱら（いずれも楽天市場出店）の販売価格を毎日自動取得しています。</p>
                      <p>iPhone・Google Pixel・Samsung Galaxy いずれも同じ3ショップを対象とすることで、ブランドをまたいでも同じ基準で比較できるようにしています。</p>
                      <p className="pd-method-aside">※Amazonの価格は含まれておらず、Amazon商品の価格アラートも行っていません。</p>
                    </div>
                  </div>
                  <div className="m-card m-card--shadow m-card--padded post-check-item">
                    <p className="post-check-item__heading">
                      <i className="fa-solid fa-filter" aria-hidden="true"></i>2. 対象条件
                    </p>
                    <div className="media-card__desc m-rich-text">
                      <p>機種ごとの最小容量モデル（例：iPhone 15は128GB）を対象としています。</p>
                      <p>また、以下の商品は価格が大きく異なるため集計対象外です。</p>
                      <ul className="pd-method-exclude">
                        <li>新品・未使用品</li>
                        <li>バッテリー残量80％未満</li>
                        <li>画面割れ・ジャンクなど「難あり」商品</li>
                      </ul>
                      <p className="pd-method-aside">※在庫状況により、実際の購入価格と異なる場合があります。</p>
                    </div>
                  </div>
                  <div className="m-card m-card--shadow m-card--padded post-check-item">
                    <p className="post-check-item__heading">
                      <i className="fa-solid fa-gauge-high" aria-hidden="true"></i>3. ベンチマーク
                    </p>
                    <div className="media-card__desc m-rich-text">
                      <p>
                        Geekbench 6 と AnTuTu v11 のスコアを参照しています。Geekbench は
                        <a href="https://browser.geekbench.com/" target="_blank" rel="noopener noreferrer">
                          Geekbench Browser
                          <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style={{ fontSize: '0.75em', marginLeft: '3px' }}></i>
                        </a>
                        、AnTuTu は機種ごとの実測値を掲載しています。
                      </p>
                      <p>OSやチップ構成が異なる端末どうしの比較になるため、スコアはあくまで目安としてご覧ください。</p>
                      <p className="pd-method-aside">※本ページには広告（アフィリエイトリンク）を含みます。掲載機種の選定・順序は中古相場の実データにもとづいており、広告の有無では変えていません。</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FaqSection
              title="中古スマホのブランド選びに関するよくある質問"
              description="iPhone・Pixel・Galaxyのどれを選ぶか迷ったときに多い質問をまとめました。"
              items={FAQ_ITEMS}
            />
          </div>
        </article>
      </main>
      <ArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} />
    </>
  )
}
