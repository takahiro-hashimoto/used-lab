import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import AirPodsRelatedLinks from '@/app/components/airpods/AirPodsRelatedLinks'
import BuyMethodsSection from './components/BuyMethodsSection'
import ConclusionSection from './components/ConclusionSection'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

const PAGE_TITLE = 'AirPods安く買うには？主要な購入先8つを比較'
const PAGE_DESCRIPTION =
  'AirPodsを安く買う方法を徹底解説。Apple公式・Amazon・楽天・ヤフーショッピング・家電量販店・コストコ・中古ショップなど8つの購入先を比較し、最安で手に入れるコツを紹介します。'
const PAGE_URL = 'https://used-lab.jp/airpods/airpods-buy/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/airpods/airpods-buy/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/airpods/airpods-buy/',
    images: [{ url: getHeroImage('/airpods/airpods-buy/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/airpods/airpods-buy/')],
  },
}

export default function AirPodsBuyPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/airpods/airpods-buy/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古AirPods完全購入ガイド', item: 'https://used-lab.jp/airpods/' },
      { '@type': 'ListItem', position: 3, name: 'AirPodsを安く買う方法8選' },
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
            { label: '中古AirPods完全購入ガイド', href: '/airpods/' },
            { label: 'AirPodsを安く買う方法8選' },
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
               AirPods安く買うには？主要な購入先8つを比較
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/airpods/airpods-buy/')}
                  alt="AirPodsを安く買う方法のイメージ"
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
                AirPodsはiPhoneとの相性が良く人気ですが、定価は決して安くありません。「どこで買えばいちばんお得か？」を本記事では8つの購入先を比較して解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古AirPodsの選び方から知りたい方は「<Link href="/airpods/">中古AirPods購入ガイド</Link>」をご覧ください。
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
                  <a href="#costco" className="toc-item">
                    コストコ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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

        {/* 結論（比較表） */}
        <ConclusionSection />

        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">
          <BuyMethodsSection />
        </div>
      </article>
    </main>
    <div className="l-section l-container deferred-render deferred-render--article-footer" id="related">
      <AirPodsRelatedLinks excludeHref={["/airpods/airpods-buy/"]} />
    </div>
    </>
  )
}
