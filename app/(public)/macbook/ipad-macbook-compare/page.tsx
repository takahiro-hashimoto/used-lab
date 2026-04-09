import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import MacBookArticleFooter from '@/app/components/macbook/MacBookArticleFooter'
import FaqSection from './components/FaqSection'
import ComparisonBasics from './components/ComparisonBasics'
import MacbookStrengths from './components/MacbookStrengths'
import IpadStrengths from './components/IpadStrengths'
import NoDifference from './components/NoDifference'
import RecommendSection from './components/RecommendSection'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

const PAGE_TITLE = 'MacBookとiPadどっちを買うのがおすすめ？両者の違いと使い勝手を比較'
const PAGE_DESCRIPTION =
  'MacBookとiPadはどっちを買うべき？作業効率・携帯性・価格・用途別に両者の違いをわかりやすく比較。あなたの使い方にぴったりな1台が見つかるガイドです。'
const PAGE_URL = 'https://used-lab.jp/macbook/ipad-macbook-compare/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/ipad-macbook-compare/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/ipad-macbook-compare/',
    images: [{ url: getHeroImage('/macbook/ipad-macbook-compare/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/macbook/ipad-macbook-compare/')],
  },
}

export default function IpadMacbookComparePage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/ipad-macbook-compare/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.jp/macbook' },
      { '@type': 'ListItem', position: 3, name: 'MacBookとiPadの違い' },
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
            { label: '中古MacBook完全購入ガイド', href: '/macbook' },
            { label: 'MacBookとiPadの違い' },
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
                MacBookとiPadどっちを買うのがおすすめ？両者の違いと使い勝手を比較
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/macbook/ipad-macbook-compare/')}
                  alt="MacBookとiPadの比較イメージ"
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
              <p>「MacBookとiPad、どっちを買えばいいの？」</p>
              <p>
                Apple製品の購入で、多くの方が迷うポイントです。<strong>MacBookはノートパソコンとして高い作業効率を誇り、iPadはタブレットならではの携帯性と直感的な操作</strong>が魅力です。
              </p>
              <p>
                そこで本記事では<strong>まず結論（おすすめな人）をお伝え</strong>したうえで、MacBookとiPadの違いを多角的に比較しながらやさしく解説します。ぜひ最後までお付き合いください。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古PCやタブレットの購入を検討中の方は「<a href="/macbook">中古MacBook完全購入ガイド</a>」や「<a href="/ipad">中古iPad完全購入ガイド</a>」もあわせてご覧ください。
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
                <a href="#recommend" className="toc-item">
                  結論：おすすめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#comparison" className="toc-item">
                  基本的な違い <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#macbook-strengths" className="toc-item">
                  MacBookが得意 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#ipad-strengths" className="toc-item">
                  iPadが得意 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#no-difference" className="toc-item">
                  差がない作業 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#summary" className="toc-item">
                  まとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#related" className="toc-item">
                  関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          <AuthorByline />
          </div>
        </nav>

        {/* 記事本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">
          {/* h2: 結論：MacとiPadそれぞれどんな方におすすめ？ */}
          <section className="l-section" id="recommend" aria-labelledby="heading-recommend">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
                結論：MacとiPadそれぞれどんな方におすすめ？
              </h2>
              <p className="m-section-desc">
                MacBookとiPadはそれぞれ得意な分野が異なるため、自分の利用目的に合わせて選ぶことが大切。
              </p>
              <p className="m-section-desc">以下を参考に、あなたに合ったデバイスを確認しましょう。</p>
              <RecommendSection />
            </div>
          </section>

          {/* h2: MacBookとiPadの基本的な違い */}
          <section className="l-section" id="comparison" aria-labelledby="heading-comparison">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-comparison">
                MacBookとiPadの基本的な違い
              </h2>
              <p className="m-section-desc">
                MacBookはmacOS、iPadはiPadOSとそれぞれ異なるOSを搭載しています。
              </p>
              <p className="m-section-desc">
                ファイル管理・マルチタスク・操作方法など、日常的な使い勝手にさまざまな違いが出てきます。
              </p>
              <ComparisonBasics />
            </div>
          </section>

          {/* h2: MacBookが得意な作業 */}
          <section className="l-section" id="macbook-strengths" aria-labelledby="heading-macbook-strengths">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-macbook-strengths">
                MacBookが得意な作業
              </h2>
              <p className="m-section-desc">
                MacBookの得意な作業を大きく4つに分けて解説します。いずれもiPadでは代替しにくい分野です。
              </p>
              <MacbookStrengths />
            </div>
          </section>

          {/* h2: iPadが得意な作業 */}
          <section className="l-section" id="ipad-strengths" aria-labelledby="heading-ipad-strengths">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-ipad-strengths">
                iPadが得意な作業
              </h2>
              <p className="m-section-desc">
                Apple PencilやタッチUI を活かせる作業では、iPadがMacBookよりも快適です。
              </p>
              <IpadStrengths />
            </div>
          </section>

          {/* h2: MacBook・iPadで差があまりない作業 */}
          <section className="l-section" id="no-difference" aria-labelledby="heading-no-difference">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-no-difference">
                MacBook・iPadで差があまりない作業
              </h2>
              <p className="m-section-desc">
                MacBookとiPad、両デバイスであまり差がない作業を3つご紹介します。
              </p>
              <NoDifference />
            </div>
          </section>

          {/* h2: まとめ */}
          <section className="l-section" id="summary" aria-labelledby="heading-summary">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
                まとめ：MacBookとiPadは用途で選ぼう
              </h2>
              <p className="m-section-desc">
                最後に、MacBookとiPadどちらを選ぶべきかの判断基準を改めて整理します。
              </p>

              <div className="l-grid l-grid--2col l-grid--gap-lg u-mt-2xl">
                {/* iPadカード */}
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="popular-card-title">
                    <i className="fa-solid fa-tablet-screen-button" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                    Apple Pencilに惹かれたら → iPad
                  </h3>
                  <ul className="info-card__list">
                    <li>Apple Pencilが使えるのがiPad最大の武器</li>
                    <li>ノート・イラスト・写真編集との相性が抜群</li>
                    <li>タッチ操作で直感的に扱える</li>
                    <li>携帯性が高く場所を選ばない</li>
                  </ul>
                </div>

                {/* MacBookカード */}
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="popular-card-title">
                    <i className="fa-solid fa-laptop" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                    それ以外なら → MacBook
                  </h3>
                  <ul className="info-card__list">
                    <li>Apple Pencilに惹かれないならMacBookのほうが後悔が少ない</li>
                    <li>同等スペックをiPadで揃えると価格がMacBookより高い</li>
                    <li>iPad版アプリは機能制限されていることが多い</li>
                    <li>ファイル管理・マルチタスクも圧倒的に快適</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>
        <FaqSection />
        <MacBookArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/macbook/ipad-macbook-compare/", "/macbook/recommend/"]}>
          <div className="m-callout m-callout--muted u-mt-2xl">
            <span className="m-callout__label">関連</span>
            <p className="m-callout__text">
              <a href="https://japan-design.jp/" target="_blank" rel="noreferrer noopener">日本デザイン｜WEBデザインの知りたい！知りたかった！が見つかる情報サイト</a>
            </p>
          </div>
        </MacBookArticleFooter>
        </div>
      </article>
    </main>
  )
}
