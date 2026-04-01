import type { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import BuyMethodsSection from './components/BuyMethodsSection'
import ConclusionSection from './components/ConclusionSection'
import PopularSection from '@/app/components/support/PopularSection'
import WatchRelatedLinks from '@/app/components/watch/WatchRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'

const PAGE_TITLE = 'Apple Watchを安く買うには？おすすめの購入先7つを比較'
const PAGE_DESCRIPTION =
  'Apple Watchを安く買う方法を徹底解説。Apple認定整備済製品・中古ショップ・ECモール・家電量販店など7つの購入先を価格・保証・ポイント還元で比較し、最安で手に入れるコツを紹介します。'
const PAGE_URL = 'https://used-lab.com/watch/apple-watch-buy/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/watch/apple-watch-buy/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/watch/apple-watch-buy/',
    images: [{ url: '/images/watch/apple-watch.jpg', width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/watch/apple-watch.jpg'],
  },
}

export default function AppleWatchBuyPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/apple-watch-buy/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全購入ガイド', item: 'https://used-lab.com/watch/' },
      { '@type': 'ListItem', position: 3, name: 'Apple Watchを安く買うには？' },
    ],
  }

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
            { label: '中古Apple Watch完全購入ガイド', href: '/watch' },
            { label: 'Apple Watchを安く買うには？' },
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
                Apple Watchを安く買うには？おすすめの購入先7つを比較
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <img
                  src="/images/content/thumbnail/cheap-buy.jpg"
                  alt="Apple Watchを安く買う方法のイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
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
                健康管理やApple製品との連携で人気のApple Watch。
                以前はApple公式サイトのみの販売でしたが、今ではAmazonや楽天、家電量販店など入手先が多様化しています。
              </p>
              <p>豊富な選択肢があると、こんなことを思う方も多いのではないでしょうか？</p>
              <ul className="lead-box__list">
                <li>一番お得にApple Watchを購入できるのはどこだろう？</li>
                <li>それぞれの購入方法にどんなメリット・デメリットがあるんだろう？</li>
              </ul>
              <p>
                そこで本記事では、<strong>Apple Watchの主な購入ルート7つを比較</strong>し、それぞれのメリット・デメリットやお得度をわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古Apple Watchの選び方から知りたい方は「<a href="/watch/">中古Apple Watch購入ガイド</a>」をご覧ください。
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
                <a href="#gift-rebates" className="toc-item">
                  ギフトカード×リーベイツ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#amazon" className="toc-item">
                  Amazonで買う <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#rakuten" className="toc-item">
                  楽天市場で買う <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#yahoo" className="toc-item">
                  ヤフーショッピング <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#electronics" className="toc-item">
                  家電量販店EC <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#used" className="toc-item">
                  中古ショップ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#apple-store" className="toc-item">
                  Appleストア <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          <AuthorByline />
          </div>
        </nav>

        {/* 結論（比較表） */}
        <ConclusionSection />

        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">
          <BuyMethodsSection />
        <PopularSection
          sectionTitle="目的別に人気の中古Apple Watch"
          sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
          imageSrc="/images/content/thumbnail/watch-image-08.jpg"
          imageAlt="中古Apple Watchおすすめ3選のイメージ画像"
          subtitle="目的別におすすめ機種を厳選！"
          cardTitle="中古Apple Watchおすすめ3選"
          cardDescription="健康管理を重視する人向け、コスパ重視の人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
          buttonText="おすすめ3機種を見る"
          buttonHref="/watch/recommend/"
          secondaryButtonText="イオシスで中古Apple Watchを探す"
          secondaryButtonHref="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fwearable%2Fapple%3Fnot%3Dpencil"
        />

        <WatchRelatedLinks excludeHref={["/watch/apple-watch-buy/", "/watch/recommend/"]}>
          <div className="m-callout m-callout--muted" style={{ marginTop: 'var(--space-xl)' }}>
            <span className="m-callout__label">関連</span>
            <p className="m-callout__text">
              <a href="https://selectra.jp/%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0/%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80%E3%83%BC/%E3%82%A2%E3%83%9E%E3%82%BE%E3%83%B3%E3%83%97%E3%83%A9%E3%82%A4%E3%83%A0/sale" target="_blank" rel="noreferrer noopener">Amazonセール最新情報｜セールはいつ？プライムデーなど年間スケジュールをチェック</a>
            </p>
          </div>
        </WatchRelatedLinks>
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
