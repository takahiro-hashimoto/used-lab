import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import BasicSection from './components/BasicSection'
import HealthSection from './components/HealthSection'
import PaymentSection from './components/PaymentSection'
import AppleEcoSection from './components/AppleEcoSection'

const PAGE_TITLE = 'アップルウォッチのできること25選！便利な機能や使い方がわかる【初心者向け】'
const PAGE_DESCRIPTION =
  'Apple Watchの便利な機能・使い方を25個厳選して紹介。基本機能・健康管理・決済・Apple製品連携など、Apple Watchがあれば生活が変わる活用法を初心者にもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.com/watch/how-to-use-apple-watch/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/watch/how-to-use-apple-watch/',
    images: [{ url: '/images/watch/watch-9.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/watch/watch-9.jpg'],
  },
}

export default function HowToUseAppleWatchPage() {
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
      { '@type': 'ListItem', position: 3, name: 'Apple Watchのできること25選' },
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
            { label: '中古Apple Watch完全ガイド', href: '/watch' },
            { label: 'Apple Watchのできること25選' },
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
                アップルウォッチの<br className="sp-only" />できること25選！<br className="sp-only" />【初心者向け】
              </h1>
              <p className="hero-description" itemProp="description">
                基本機能・健康管理・決済・Apple製品連携など、Apple Watchで生活が変わる活用法を厳選紹介
              </p>
              <div className="hero-actions">
                <a href="#content" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
                  <span>できることを見る</span>
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
                  src="/images/watch/watch-9.jpg"
                  alt="Apple Watchのできることイメージ"
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
                Apple製品との連携、健康管理など様々な用途で活躍するApple Watch。
              </p>
              <p>
                他のスマートウォッチに比べてもできることが豊富なのが魅力ですが、<strong>多機能であるが故にできることがイマイチわからない…</strong>と感じている方も多くいるのではないでしょうか。
              </p>
              <p>
                そこで本記事では、<strong>Apple Watchがあればできることを厳選して25個紹介</strong>していきます。Apple Watchをこれから購入したいと思っている方、買ったけどイマイチ使い方がわからないという方の参考になれば幸いです！
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                Apple Watchの選び方から知りたい方は「<a href="/watch">中古Apple Watch購入ガイド</a>」をご覧ください。
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
                <a href="#basic" className="toc-item">
                  基本機能編 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#health" className="toc-item">
                  健康管理・ヘルスケア編 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#payment" className="toc-item">
                  決済編 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#apple-eco" className="toc-item">
                  Apple製品連携編 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* 本文 */}
        <div id="content" itemProp="articleBody">

          {/* セクション: 基本機能編 */}
          <BasicSection />

          {/* セクション: 健康管理・ヘルスケア編 */}
          <HealthSection />

          {/* セクション: 決済編 */}
          <PaymentSection />

          {/* セクション: Apple製品連携編 */}
          <AppleEcoSection />

        </div>

        {/* まとめ */}
        <section className="l-section l-section--bg-subtle" id="matome" aria-labelledby="heading-matome">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-matome">
              Apple Watchがあればできること25選 まとめ
            </h2>
            <div className="lead-box">
              <p>
                Apple Watchを身につけていることで実現できる25個の機能を厳選してご紹介してきました。
              </p>
              <p>
                Apple Watchがあれば、日々の健康管理の意識が格段に高まりますし、iPhoneを取り出さなくても様々なアクションが手元で完結できるようになります。
              </p>
              <p>
                さらに、豊富な文字盤やベルトを気分やTPOに合わせて選べるため、ファッションアイテムとしても楽しめる点も大きな魅力です。
              </p>
              <p>
                今回ご紹介した機能の中で、もし10個以上「これは便利そうだ」「使ってみたい」と感じた魅力的な部分があれば、きっとApple Watchを導入してご満足いただけると確信しています。
              </p>
              <p>
                ぜひ、Apple Watchをあなたの生活に取り入れるかどうかの最適な判断材料としてご活用ください。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                Apple Watchの選び方・おすすめモデルは「<a href="/watch">中古Apple Watch完全ガイド</a>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
