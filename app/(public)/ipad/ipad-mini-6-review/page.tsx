import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import MeritSection from './components/MeritSection'
import DemeritSection from './components/DemeritSection'
import IPadArticleFooter from '@/app/components/ipad/IPadArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'
import { getIPadModelBySlug, getAllProductShopLinksByType } from '@/lib/queries'

export const revalidate = false

const PAGE_TITLE = 'iPad mini 第6世代 長期使用レビュー！3年間使用してきて分かったメリット・デメリットまとめ'
const PAGE_DESCRIPTION =
  'iPad mini（第6世代）を約3年間使い続けて分かったリアルなメリット・デメリットを解説。8.3インチディスプレイ、USB-C、Apple Pencil 2対応など進化点と、バッテリーやストレージの弱点を正直にレビューします。'
const PAGE_URL = 'https://used-lab.jp/ipad/ipad-mini-6-review/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/ipad-mini-6-review/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/ipad-mini-6-review/',
    images: [{ url: getHeroImage('/ipad/ipad-mini-6-review/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/ipad/ipad-mini-6-review/')],
  },
}

export default async function IpadMini6ReviewPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/ipad-mini-6-review/page.tsx')

  // イオシスリンク取得
  const [model, shopLinks] = await Promise.all([
    getIPadModelBySlug('mini-6'),
    getAllProductShopLinksByType('ipad'),
  ])
  const iosysLink = model ? shopLinks.find((l) => l.product_id === model.id && l.shop_id === 1) : null

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.jp/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPad mini 6 長期レビュー' },
    ],
  }

  // JSON-LD: Article
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
            { label: '中古iPad完全購入ガイド', href: '/ipad' },
            { label: 'iPad mini 6 長期レビュー' },
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
              <h1 className="hero-title" itemProp="headline">
                iPad mini 第6世代 長期使用レビュー！3年間使用してきて分かったメリット・デメリットまとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/ipad/ipad-mini-6-review/')}
                  alt="iPad mini 第6世代の長期使用レビュー"
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
              <p>
                2021年9月の発売以来、コンパクトタブレットとして確固たる地位を築いてきたiPad mini（第6世代）。ホームボタンを廃止したフルスクリーン設計への刷新は大きな話題を呼びましたが、真の評価は「長期間の日常使い」を経てこそ定まるものです。
              </p>
              <p>
                筆者は本機を約3年間にわたり、ほぼ毎日活用してきました。そこで本記事ではiPad mini 第5世代からの進化点をおさらいしつつ、<strong>3年間の継続使用で判明したリアルなメリット・デメリット</strong>を整理して解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                iPadの選び方から知りたい方は「<Link href="/ipad/">中古iPad購入ガイド</Link>」をご覧ください。
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
                <a href="#evolution" className="toc-item">
                  進化ポイント <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#merit" className="toc-item">
                  メリット6つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#demerit" className="toc-item">
                  デメリット4つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#conclusion" className="toc-item">
                  結論 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          </div>
        </nav>

        {/* 記事本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">

          {/* h2: 進化ポイント */}
          <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
                iPad mini 5 → 6 の進化ポイント
              </h2>
              <p className="m-section-desc">
                iPad mini 第5世代から第6世代で何が変わったのかをおさらいします。
              </p>
              <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                <div className="media-card__img-wrap">
                  <img
                    src="/images/content/photo/review/ipad-mini-6-00.webp"
                    alt="iPad mini 5とiPad mini 6の比較"
                    className="media-card__img"
                    width={240}
                    height={160}
                    loading="lazy"
                  />
                </div>
                <div className="media-card__body">
                  <p className="media-card__desc">
                    まずは<Link href="/ipad/mini-5/" style={{ color: 'var(--color-primary)' }}>iPad mini 5</Link>から<Link href="/ipad/mini-6/" style={{ color: 'var(--color-primary)' }}>iPad mini 6</Link>が進化した点をざっと振り返ります。前機種から2年半ぶりのアップデートということでかなり盛りだくさんの内容となっています。
                  </p>
                  <div className="m-card info-card u-mt-sm">
                    <p className="info-card__heading">
                      <i className="fa-solid fa-chevron-circle-right" aria-hidden="true"></i>
                      主な進化ポイント
                    </p>
                    <ul className="info-card__list">
                      <li>フルディスプレイデザイン＆8.3インチに大型化</li>
                      <li>A15 Bionicで大幅な性能向上</li>
                      <li>12MPカメラ搭載＆Center Stage対応</li>
                      <li>USB-Cポート採用＆5G通信に対応</li>
                      <li>第2世代Apple Pencilに対応</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* h2: メリット6つ */}
          <section className="l-section" id="merit" aria-labelledby="heading-merit">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-merit">
                iPad mini 第6世代のメリット6つ
              </h2>
              <p className="m-section-desc">
                ここからはiPad mini 6を使用してみて感じた良い点を6つに分けて紹介していきます。
              </p>
              <MeritSection />
            </div>
          </section>

          {/* h2: デメリット4つ */}
          <section className="l-section" id="demerit" aria-labelledby="heading-demerit">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-demerit">
                iPad mini 第6世代のデメリット4つ
              </h2>
              <p className="m-section-desc">
                次にiPad mini 6を3年間使用してみて感じたデメリットを4点紹介していきます。
              </p>
              <DemeritSection />
            </div>
          </section>

          {/* h2: 結論 */}
          <section className="l-section" id="conclusion" aria-labelledby="heading-conclusion">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-conclusion">
                結論：コンテンツ消費と「身軽さ」を両立したいなら、今もベストバイ
              </h2>
              <p className="m-section-desc">
                iPad mini 第6世代を3年間使用してきて感じたメリット・デメリットをまとめてきました。改めて整理すると下記の通り。
              </p>

              <div className="merit-demerit u-mt-2xl">
                <div className="merit-box">
                  <p className="merit-box__title">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    iPad mini 6のメリット
                  </p>
                  <ul>
                    <li>コンパクトだけど見やすいディスプレイ</li>
                    <li>カーナビ化するのにも絶妙なサイズ感</li>
                    <li>Apple Pencil 2対応なのが嬉しい</li>
                    <li>USB-Cポート搭載で充電のしやすさがアップ</li>
                    <li>MagSafe対応アクセサリーも使える</li>
                    <li>日常のブラウジングやSNSはサクサク</li>
                  </ul>
                </div>

                <div className="demerit-box">
                  <p className="demerit-box__title">
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i>
                    iPad mini 6のデメリット
                  </p>
                  <ul>
                    <li>バッテリー持ちはイマイチ</li>
                    <li>モデリングソフトや動画編集はかなり辛い…。</li>
                    <li>64GBの最小スペックはアウトプット作業には不向き</li>
                    <li>ゼリースクロール現象に注意</li>
                  </ul>
                </div>
              </div>

              <div className="lead-box u-mt-2xl">
                <p>
                  いくつかデメリットも挙げましたが、それらは「メイン機として使おうとした場合」の話。<strong>「インプット専用のサブ機」や「車載ナビ」</strong>として割り切れば、これほど完成度の高いデバイスは他にありません。
                </p>
                <p>
                  中古市場での価格もかなり手頃になっていますし、iPadOSのサポート期間にもまだ余裕があります。
                </p>
                <p>
                  <span className="marker-yellow">どこにでも持ち運べる、高性能なミニタブレットが欲しい</span>という方は「<Link href="/ipad/ipad-spec-table/">iPad スペック比較表</Link>」や「<Link href="/ipad/ipad-price-info/">iPad 中古価格の相場</Link>」なども参考にしながら購入を検討してみてください！
                </p>
                {iosysLink?.url && (
                  <p className="lead-link">
                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                    <a href={iosysLink.url} target="_blank" rel="noopener noreferrer nofollow">イオシスで中古iPad mini 6を見る →</a>
                  </p>
                )}
              </div>
            </div>
          </section>



        </div>
      </article>
    </main>
    <IPadArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/ipad/ipad-mini-6-review/", "/ipad/recommend/"]} />
    </>
  )
}
