import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import EntertainmentSection from './components/EntertainmentSection'
import LifestyleSection from './components/LifestyleSection'
import WorkStudySection from './components/WorkStudySection'
import CreativeSection from './components/CreativeSection'
import FaqSection from './components/FaqSection'

const PAGE_TITLE = 'iPadがあればできること・便利な使い道 22選【生活が変わる】'
const PAGE_DESCRIPTION =
  'iPadの便利な使い道を22個厳選して紹介。動画視聴・ノート・イラスト・読書・仕事効率化など、iPadがあれば生活が変わる活用法を初心者にもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.com/ipad/howto-use-ipad/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/ipad/howto-use-ipad/',
    images: [{ url: '/images/ipad/ipad-air-6.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/ipad/ipad-air-6.jpg'],
  },
}

export default function HowtoUseIpadPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPadの便利な使い道 22選' },
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'iPadはノートPC代わりになりますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'iPadとノートPCに使用されてるOSは別物で、使用できるアプリの数や幅に違いがあるため完全に代用することは難しいです。',
        },
      },
      {
        '@type': 'Question',
        name: 'Wi-Fiモデルとセルラーモデルの違いはなんですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'セルラーモデルの場合、SIMカードを挿すことでどこでもネット接続が行えますが、Wi-FiモデルはWi-Fi環境がある場所でしかネット接続ができません。',
        },
      },
      {
        '@type': 'Question',
        name: 'iPadはどんな風に選ぶと失敗がないですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '動画や電子書籍の視聴などインプット作業が多めならiPad（無印）やiPad mini、ノートの記入や写真編集のようにアウトプット作業が多めならiPad ProやiPad Airがおすすめです。',
        },
      },
      {
        '@type': 'Question',
        name: 'iPadの各シリーズにはどんな違いがありますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'iPadの違いに関しては歴代iPadのスペック比較で詳しく解説しています。',
        },
      },
    ],
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

        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPad完全ガイド', href: '/ipad' },
            { label: 'iPadの便利な使い道 22選' },
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
                iPadがあればできること<br className="sp-only" />便利な使い道 22選<br className="sp-only" />【生活が変わる】
              </h1>
              <p className="hero-description" itemProp="description">
                動画・ノート・イラスト・読書・仕事効率化など、iPadで生活が変わる活用法を厳選紹介
              </p>
              <div className="hero-actions">
                <a href="#content" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
                  <span>使い道を見る</span>
                </a>
                <a href="#matome" className="m-btn m-btn--hero-outline">
                  <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
                  <span>まとめを確認</span>
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
                  src="/images/ipad/ipad-air-6.jpg"
                  alt="iPadの便利な使い道イメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                  priority
                />
              </figure>
            </div>
          </div>
        </header>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>
                「iPadって結局何に使うの？」「買っても使わなくなりそう…」そんな疑問を持っている方は多いのではないでしょうか。
              </p>
              <p>
                実はiPadは使い方次第で<strong>日常生活から仕事・勉強・趣味まで幅広く活躍</strong>してくれる万能デバイス。本記事ではiPadの便利な使い道を22個厳選してご紹介します。
              </p>
              <p>
                きっと「こんな使い方もあったのか！」と新しい発見があるはずです。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                iPadの選び方から知りたい方は「<a href="/ipad">中古iPad購入ガイド</a>」をご覧ください。
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
                <a href="#entertainment" className="toc-item">
                  エンタメ編 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#lifestyle" className="toc-item">
                  暮らし編 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#work" className="toc-item">
                  仕事・勉強編 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#creative" className="toc-item">
                  クリエイティブ編 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問（FAQ） <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* 本文 */}
        <div id="content" itemProp="articleBody">

          {/* セクション: エンタメ編 */}
          <EntertainmentSection />

          {/* セクション: 暮らし編 */}
          <LifestyleSection />

          {/* セクション: 仕事・勉強編 */}
          <WorkStudySection />

          {/* セクション: クリエイティブ編 */}
          <CreativeSection />

          {/* セクション: よくある質問 */}
          <FaqSection />

        </div>

        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
