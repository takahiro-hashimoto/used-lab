import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import ComparisonBasics from './components/ComparisonBasics'
import MacbookStrengths from './components/MacbookStrengths'
import IpadStrengths from './components/IpadStrengths'
import NoDifference from './components/NoDifference'
import RecommendSection from './components/RecommendSection'

const PAGE_TITLE = 'MacBookとiPadどっちを買うのがおすすめ？両者の違いと使い勝手を比較'
const PAGE_DESCRIPTION =
  'MacBookとiPadはどっちを買うべき？作業効率・携帯性・価格・用途別に両者の違いをわかりやすく比較。あなたの使い方にぴったりな1台が見つかるガイドです。'
const PAGE_URL = 'https://used-lab.com/macbook/ipad-macbook-compare/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/macbook/ipad-macbook-compare/',
    images: [{ url: '/images/macbook/mba-13-2024.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/macbook/mba-13-2024.jpg'],
  },
}

export default function IpadMacbookComparePage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全ガイド', item: 'https://used-lab.com/macbook' },
      { '@type': 'ListItem', position: 3, name: 'MacBookとiPadの違い' },
    ],
  }

  // JSON-LD: Article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: dateStr,
    dateModified: dateStr,
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  }

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
            { label: '中古MacBook完全ガイド', href: '/macbook' },
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
                MacBookとiPadどっちを<br className="sp-only" />買うのがおすすめ？<br className="sp-only" />両者の違いと使い勝手を比較
              </h1>
              <p className="hero-description" itemProp="description">
                作業効率・携帯性・価格・用途別に、MacBookとiPadの違いを初心者にもわかりやすく徹底比較
              </p>
              <div className="hero-actions">
                <a href="#recommend" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-user-check" aria-hidden="true"></i>
                  <span>結論を見る</span>
                </a>
                <a href="#comparison" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
                  <span>比較表を見る</span>
                </a>
              </div>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={dateStr} itemProp="dateModified">{dateDisplay}</time> | 当記事のリンクには広告が含まれています
                </span>
                <meta itemProp="datePublished" content={dateStr} />
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/macbook/mba-13-2024.jpg"
                  alt="MacBookとiPadの比較イメージ"
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
              <p>「MacBookとiPad、どっちを買えばいいの？」</p>
              <p>
                Apple製品の購入で、多くの方が迷うポイントです。<strong>MacBookはノートパソコンとして高い作業効率を誇り、iPadはタブレットならではの携帯性と直感的な操作</strong>が魅力です。
              </p>
              <p>
                そこで本記事では<strong>まず結論（おすすめな人）をお伝え</strong>したうえで、MacBookとiPadの違いを多角的に比較しながらやさしく解説します。ぜひ最後までお付き合いください。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古MacBookの購入を検討中の方は「<a href="/macbook">中古MacBook完全購入ガイド</a>」もあわせてご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
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
            </ol>
          </div>
        </nav>

        {/* 記事本文 */}
        <div id="content" itemProp="articleBody">
          {/* h2: 結論：MacとiPadそれぞれどんな方におすすめ？ */}
          <section className="l-section l-section--bg-subtle" id="recommend" aria-labelledby="heading-recommend">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend">
                結論：MacとiPadそれぞれどんな方におすすめ？
              </h2>
              <p className="m-section-desc">
                まずは結論からお伝えします。MacBookとiPadはそれぞれ得意な分野が異なるため、自分の利用目的に合わせて選ぶことが大切です。以下を参考に、あなたに合ったデバイスを確認してみてください。
              </p>
              <RecommendSection />
              <p className="m-section-desc" style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
                ここからは上記の結論に至った理由を、両者の違いや得意な作業を比較しながら詳しく解説していきます。
              </p>
            </div>
          </section>

          {/* h2: MacBookとiPadの基本的な違い */}
          <section className="l-section" id="comparison" aria-labelledby="heading-comparison">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-comparison">
                MacBookとiPadの基本的な違い
              </h2>
              <p className="m-section-desc">
                MacBookはmacOS、iPadはiPadOSとそれぞれ異なるOSを搭載しています。OSが異なることでファイル管理・マルチタスク・操作方法など、日常的な使い勝手にさまざまな違いが出てきます。
              </p>
              <ComparisonBasics />
            </div>
          </section>

          {/* h2: MacBookが得意な作業 */}
          <section className="l-section l-section--bg-subtle" id="macbook-strengths" aria-labelledby="heading-macbook-strengths">
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
          <section className="l-section l-section--bg-subtle" id="no-difference" aria-labelledby="heading-no-difference">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-no-difference">
                MacBook・iPadで差があまりない作業
              </h2>
              <p className="m-section-desc">
                ここまでMacBookとiPadそれぞれの得意な作業を解説しましたが、両デバイスであまり差がない作業もあるので、以下で詳しく説明します。
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

              <div className="l-grid l-grid--2col l-grid--gap-lg" style={{ marginTop: 'var(--space-2xl)' }}>
                {/* iPadカード */}
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="popular-card-title">
                    <i className="fa-solid fa-tablet-screen-button" aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}></i>
                    Apple Pencilに惹かれたら → iPad
                  </h3>
                  <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
                    <li><strong>Apple Pencilが使える</strong>のがiPad最大の武器</li>
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
                  <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
                    <li>Apple Pencilに惹かれないなら<strong>MacBookのほうが後悔が少ない</strong></li>
                    <li>同等スペックをiPadで揃えると<strong>価格がMacBookより高くなる</strong></li>
                    <li>iPad版アプリは<strong>機能制限されている</strong>ことが多い</li>
                    <li>ファイル管理・マルチタスクも圧倒的に快適</li>
                  </ul>
                </div>
              </div>

              {/* 関連リンク */}
              <div className="l-grid l-grid--2col l-grid--gap-lg guide-spec-links" style={{ marginTop: 'var(--space-2xl)' }}>
                <a className="m-card m-card--shadow related-link-card m-card--hoverable" href="/macbook">
                  <span className="related-link-card__icon m-icon-box m-icon-box--sm">
                    <i className="fa-solid fa-laptop" aria-hidden="true"></i>
                  </span>
                  <h3 className="related-link-card__title">中古MacBook完全購入ガイド</h3>
                  <p className="related-link-card__desc">
                    MacBookの選び方・おすすめモデル・中古相場をわかりやすく解説。初めての方でも安心です。
                  </p>
                  <span className="related-link-card__arrow">
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
                <a className="m-card m-card--shadow related-link-card m-card--hoverable" href="/ipad">
                  <span className="related-link-card__icon m-icon-box m-icon-box--sm">
                    <i className="fa-solid fa-tablet-screen-button" aria-hidden="true"></i>
                  </span>
                  <h3 className="related-link-card__title">中古iPad完全購入ガイド</h3>
                  <p className="related-link-card__desc">
                    iPadの選び方・おすすめモデル・中古相場をわかりやすく解説。自分に合った1台が見つかります。
                  </p>
                  <span className="related-link-card__arrow">
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
