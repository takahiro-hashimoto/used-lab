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

export const revalidate = false

const PAGE_TITLE = 'iPad Pro 11インチ M4モデルを買って感じたメリット・デメリットまとめ'
const PAGE_DESCRIPTION =
  'iPad Pro 11インチ（M4）を実際に購入し使い込んで感じたメリット5つとデメリット3つを正直にレビュー。3Dモデリングやクリエイティブ作業での実力、LiDARセンサーの使い勝手、導入コストまで詳しく解説します。'
const PAGE_URL = 'https://used-lab.jp/ipad/review-ipad-pro-11-m4/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/review-ipad-pro-11-m4/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/review-ipad-pro-11-m4/',
    images: [{ url: getHeroImage('/ipad/review-ipad-pro-11-m4/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/ipad/review-ipad-pro-11-m4/')],
  },
}

export default function ReviewIpadPro11M4Page() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/review-ipad-pro-11-m4/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.jp/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPad Pro 11インチ M4 レビュー' },
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
            { label: 'iPad Pro 11インチ M4 レビュー' },
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
                iPad Pro 11インチ M4モデルを買って感じたメリット・デメリットまとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/ipad/review-ipad-pro-11-m4/')}
                  alt="iPad Pro 11インチ M4モデルのレビュー"
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
                最近、クリエイティブ作業のメイン機として<strong>iPad Pro 11インチ（M4モデル）</strong>を導入しました。主な用途は、CADアプリを使った3Dモデリングです。
              </p>
              <p>
                これまで「最高の相棒」としてiPad mini（第6世代）を愛用してきましたが、本格的なモデリングをこなすには、どうしても8.3インチという画面サイズに限界を感じる場面が増えてきたんですよね……。
              </p>
              <p>
                導入して1ヶ月ほど使い込んでみた結論は、「もっと早く買えばよかった」と思えるほどの満足感。モデリングの制作環境を劇的にアップデートしてくれましたし、ちょっとした作業ならMacBookを開かなくても完結できるようになったのが大きな収穫でした。
              </p>
              <p>
                そこで本記事では、iPad Pro 11インチ（M4）を実際に使って感じた<strong>メリット・デメリットを正直にレビュー</strong>していきます。
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
                  メリット5つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#demerit" className="toc-item">
                  デメリット3つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
                iPad Pro 11インチ 第4世代 → 第5世代（M4）の進化ポイント
              </h2>
              <p className="m-section-desc">
                iPad Pro 11インチ第4世代から第5世代（M4）で何が変わったのかをおさらいします。
              </p>
              <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                <div className="media-card__img-wrap">
                  <img
                    src="/images/content/photo/review/ipad-11-pro-m4-0.webp"
                    alt="iPad Pro 11インチ M4モデル"
                    className="media-card__img"
                    width={240}
                    height={160}
                    loading="lazy"
                  />
                </div>
                <div className="media-card__body">
                  <p className="media-card__desc">
                    まずは<Link href="/ipad/pro11-4/" style={{ color: 'var(--color-primary)' }}>iPad Pro 11インチ第4世代</Link>から<Link href="/ipad/pro11-5/" style={{ color: 'var(--color-primary)' }}>iPad Pro 11インチ第5世代</Link>が進化した点をざっと振り返ります。
                  </p>
                  <p className="media-card__desc u-mt-sm">
                    前機種から1年半の期間をあけてのアップデートですが、変更点はかなり盛りだくさんです。
                  </p>
                  <div className="m-card info-card u-mt-md">
                    <p className="info-card__heading">
                      <i className="fa-solid fa-chevron-circle-right" aria-hidden="true"></i>
                      主な進化ポイント
                    </p>
                    <ul className="info-card__list">
                      <li>M4チップ搭載でCPU最大50%、GPU最大4倍高速化</li>
                      <li>新しいUltra Retina XDRディスプレイを搭載</li>
                      <li>史上最薄の5.3mmボディを採用し、軽量化（約446g）を実現</li>
                      <li>Apple Pencil Proに対応</li>
                      <li>新Magic Keyboardに対応</li>
                      <li>TrueDepthカメラが長辺側に移動し、横向きでのビデオ通話が快適に</li>
                      <li>背面カメラに適応型True Toneフラッシュを追加</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* h2: メリット5つ */}
          <section className="l-section" id="merit" aria-labelledby="heading-merit">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-merit">
                iPad Pro 11インチ 第5世代（M4）のメリット5つ
              </h2>
              <p className="m-section-desc">
                ここからはiPad Pro 11インチ M4を使用してみて感じた良い点を5つに分けて紹介していきます。
              </p>
              <MeritSection />
            </div>
          </section>

          {/* h2: デメリット3つ */}
          <section className="l-section" id="demerit" aria-labelledby="heading-demerit">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-demerit">
                iPad Pro 11インチ 第5世代（M4）の惜しい点3つ
              </h2>
              <p className="m-section-desc">
                ここからはiPad Pro 11インチ M4の惜しい点を3つに分けて紹介していきます。
              </p>
              <DemeritSection />
            </div>
          </section>

          {/* h2: 結論 */}
          <section className="l-section" id="conclusion" aria-labelledby="heading-conclusion">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-conclusion">
                まとめ：iPad Pro 11インチ 第5世代（M4）は買いか？
              </h2>
              <p className="m-section-desc">
                iPad Pro 11インチ（M4）を購入して感じたメリット・デメリットをまとめてきました。改めてまとめると下記の通り。
              </p>

              <div className="merit-demerit u-mt-2xl">
                <div className="merit-box">
                  <p className="merit-box__title">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    メリット
                  </p>
                  <ul>
                    <li>M4チップによる圧倒的な処理能力</li>
                    <li>11インチの機動力と視認性の両立</li>
                    <li>驚異的な薄さで長時間の作業も快適</li>
                    <li>LiDARセンサー搭載でモデリングが捗る</li>
                    <li>Pencil Proによる直感的なツール操作</li>
                  </ul>
                </div>

                <div className="demerit-box">
                  <p className="demerit-box__title">
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i>
                    デメリット
                  </p>
                  <ul>
                    <li>本体・周辺機器を含めた導入コストが高い</li>
                    <li>Apple Pencil Proの買い替えが必須（約2万円）</li>
                    <li>一般的な用途では性能が余り気味</li>
                  </ul>
                </div>
              </div>

              <div className="lead-box u-mt-2xl">
                <p>
                  全体としては、非常に満足度の高い買い替えとなりました。特に3DモデリングやCADなど、iPadを「クリエイティブな仕事道具」として使いたい方にとって、<strong>11インチのサイズ感とM4のパワー、LiDARの組み合わせ</strong>は最強の構成です。
                </p>
                <p>
                  ただし、検討中の方へのアドバイスとしては、<strong>「ペンを含めた導入コスト」</strong>を冷静に計算することをおすすめします。
                </p>
                <p>
                  本体代だけでなく周辺機器まで含めて納得できるのであれば、2026年現在において、これ以上ない最高の体験を約束してくれるデバイスであることは間違いありません。
                </p>
                <p className="lead-link">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                  <a href="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Ftablet%2Fios%2Fipad%2Fipad_pro_11%25E3%2582%25A4%25E3%2583%25B3%25E3%2583%2581_%25E7%25AC%25AC5%25E4%25B8%2596%25E4%25BB%25A3" target="_blank" rel="noopener noreferrer nofollow">イオシスで中古iPad Pro 11インチ（M4）を見る →</a>
                </p>
              </div>
            </div>
          </section>



        </div>
      </article>
    </main>
    <IPadArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/ipad/review-ipad-pro-11-m4/", "/ipad/recommend/"]} />
    </>
  )
}
