import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import BuyMethodsSection from './components/BuyMethodsSection'
import ConclusionSection from './components/ConclusionSection'
import MacBookArticleFooter from '@/app/components/macbook/MacBookArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = false

const PAGE_TITLE = 'MacBookを安く買うには？おすすめの購入先7つを比較'
const PAGE_DESCRIPTION =
  'MacBookを安く買う方法を徹底解説。Apple認定整備済製品・中古ショップ・ECモール・家電量販店など7つの購入先を価格・保証・ポイント還元で比較し、最安で手に入れるコツを紹介します。'
const PAGE_URL = 'https://used-lab.jp/macbook/macbook-buy/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/macbook-buy/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/macbook-buy/',
    images: [{ url: getHeroImage('/macbook/macbook-buy/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/macbook/macbook-buy/')],
  },
}

export default function MacBookBuyPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/macbook-buy/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.jp/macbook/' },
      { '@type': 'ListItem', position: 3, name: 'MacBookを安く買うには？' },
    ],
  }

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
            { label: '中古MacBook完全購入ガイド', href: '/macbook' },
            { label: 'MacBookを安く買うには？' },
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
                MacBookを安く買うには？おすすめの購入先7つを比較
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/macbook/macbook-buy/')}
                  alt="MacBookを安く買う方法のイメージ"
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
                本体もOSもAppleが一貫して設計しているため、使い勝手がとても優れているのが魅力のMacシリーズ。
                かつてネットではApple公式サイトでしか購入できませんでしたが、最近はAmazonや楽天、大手家電量販店まで様々な場所で入手可能になってきています。
              </p>
              <p>豊富な選択肢があると、こんなことを思う方も多いのではないでしょうか？</p>
              <ul className="lead-box__list">
                <li>一番安くMacBook（Pro・Air）を購入できるのはどこだろう？</li>
                <li>それぞれの購入方法にどんなメリット・デメリットがあるんだろう？</li>
              </ul>
              <p>
                そこで本記事では、<strong>MacBookの主な購入ルート7つを比較</strong>し、それぞれのメリット・デメリットやお得度をわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古MacBookの選び方から知りたい方は「<a href="/macbook/">中古MacBook購入ガイド</a>」をご覧ください。
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
                <li>
                  <a href="#related" className="toc-item">
                    関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </nav>

        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">
        {/* 結論（比較表） */}
        <ConclusionSection />

          <BuyMethodsSection />

        </div>
      </article>
    </main>
    <MacBookArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/macbook/macbook-buy/", "/macbook/recommend/"]} />
    </>
  )
}
