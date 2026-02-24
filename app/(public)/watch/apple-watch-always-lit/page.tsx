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

const PAGE_TITLE = 'Apple Watchの常時点灯はいらない？使ってみてわかったメリット・デメリットまとめ'
const PAGE_DESCRIPTION =
  'Apple Watchの常時点灯（常時表示ディスプレイ）は本当に必要？実際に使ってわかったメリット・デメリットを徹底解説。バッテリーへの影響やオフにする設定方法、常時点灯なしモデルとの違いまで2026年最新情報でまとめました。'
const PAGE_URL = 'https://used-lab.com/watch/apple-watch-always-lit/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/watch/apple-watch-always-lit/',
    images: [{ url: '/images/watch/watch-always-lit.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/watch/watch-always-lit.jpg'],
  },
}

export default function AppleWatchAlwaysLitPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全ガイド', item: 'https://used-lab.com/watch' },
      { '@type': 'ListItem', position: 3, name: 'Apple Watchの常時点灯はいらない？' },
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
            { label: '中古Apple Watch完全ガイド', href: '/watch' },
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
                Apple Watchの常時点灯はいらない？<br className="sp-only" />使ってみてわかったメリット・デメリットまとめ
              </h1>
              <p className="hero-description" itemProp="description">
                常時表示ディスプレイのメリット・デメリットからバッテリーへの影響、オフにする方法まで徹底解説
              </p>
              <div className="hero-actions">
                <a href="#merit-demerit" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
                  <span>メリデメを見る</span>
                </a>
                <a href="#content" className="m-btn m-btn--hero-outline">
                  <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
                  <span>詳細を確認</span>
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
                  src="/images/watch/apple-watch-image.jpg"
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
                Apple Watchを選ぶときに多くの人が迷うポイントのひとつが、「<strong>常時点灯ディスプレイは必要か？</strong>」という点です。
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
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
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
        </nav>

        {/* 本文 */}
        <div id="content" itemProp="articleBody">
          <MeritSection />
          <DemeritSection />
          <SettingSection />
          <TipsSection />
          <SpecTableSection />
          <AlwaysLitFaqSection />
        </div>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
