import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import MeritSection from './components/MeritSection'
import DemeritSection from './components/DemeritSection'
import SettingSection from './components/SettingSection'
import TipsSection from './components/TipsSection'
import SpecTableSection from './components/SpecTableSection'
import AlwaysLitFaqSection, { FAQ_ITEMS } from './components/AlwaysLitFaqSection'
import PopularSection from '@/app/components/support/PopularSection'
import WatchRelatedLinks from '@/app/components/watch/WatchRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'

const PAGE_TITLE = 'Apple Watchの常時点灯はいらない？使ってみてわかったメリット・デメリットまとめ'
const PAGE_DESCRIPTION =
  'Apple Watchの常時点灯（常時表示ディスプレイ）は本当に必要？実際に使ってわかったメリット・デメリットを徹底解説。バッテリーへの影響やオフにする設定方法、常時点灯なしモデルとの違いまで2026年最新情報でまとめました。'
const PAGE_URL = 'https://used-lab.com/watch/apple-watch-always-lit/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/watch/apple-watch-always-lit/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/watch/apple-watch-always-lit/',
    images: [{ url: '/images/watch/watch-always-lit.jpg', width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/watch/watch-always-lit.jpg'],
  },
}

export default function AppleWatchAlwaysLitPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/apple-watch-always-lit/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全購入ガイド', item: 'https://used-lab.com/watch' },
      { '@type': 'ListItem', position: 3, name: 'Apple Watchの常時点灯はいらない？' },
    ],
  }

  // JSON-LD: Article
    const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  // JSON-LD: FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古Apple Watch完全購入ガイド', href: '/watch' },
            { label: 'Apple Watchの常時点灯はいらない？' },
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
                Apple Watchの常時点灯はいらない？使ってみてわかったメリット・デメリットまとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/content/thumbnail/watch-image-03.jpg"
                  alt="Apple Watchの常時点灯ディスプレイのイメージ"
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
              <p>
                中古Apple Watchを選ぶときに多くの人が迷うポイントのひとつが、「<strong>常時点灯ディスプレイは必要か？</strong>」という点です。
              </p>
              <p>
                搭載の有無によって価格に差が出るだけでなく、実際の使い勝手にも大きく影響します。
              </p>
              <p>
                そこで今回は、Apple Watchを5年以上使ってきた経験をもとに、<strong>常時点灯のメリットとデメリット</strong>をわかりやすくまとめました。
              </p>
              <p>
                どちらのモデルを選ぶべきか判断する手助けになるはずなので、ぜひ参考にしてみてください。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古Apple Watchの選び方全般は「<a href="/watch">中古Apple Watch完全購入ガイド</a>」をご覧ください。
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
                <a href="#merit" className="toc-item">
                  常時点灯のメリット <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#demerit" className="toc-item">
                  常時点灯のデメリット <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#setting" className="toc-item">
                  常時点灯オフの設定方法 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#tips" className="toc-item">
                  常時点灯に近づける裏ワザ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#spec-table" className="toc-item">
                  搭載モデル一覧 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          <AuthorByline />
          </div>
        </nav>

        {/* 本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">
          <MeritSection />
          <DemeritSection />
          <SettingSection />
          <TipsSection />
          <SpecTableSection />
          <AlwaysLitFaqSection />
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
        <WatchRelatedLinks excludeHref={["/watch/apple-watch-always-lit/", "/watch/recommend/"]} />
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
