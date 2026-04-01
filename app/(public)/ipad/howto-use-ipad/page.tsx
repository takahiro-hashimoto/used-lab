import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import EntertainmentSection from './components/EntertainmentSection'
import LifestyleSection from './components/LifestyleSection'
import WorkStudySection from './components/WorkStudySection'
import CreativeSection from './components/CreativeSection'
import FaqSection from './components/FaqSection'
import IPadRelatedLinks from '@/app/components/ipad/IPadRelatedLinks'
import PopularSection from '@/app/components/support/PopularSection'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'

const PAGE_TITLE = 'iPadがあればできること・便利な使い道 22選【生活が変わる】'
const PAGE_DESCRIPTION =
  'iPadの便利な使い道を22個厳選して紹介。動画視聴・ノート・イラスト・読書・仕事効率化など、iPadがあれば生活が変わる活用法を初心者にもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.com/ipad/howto-use-ipad/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/howto-use-ipad/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/howto-use-ipad/',
    images: [{ url: '/images/content/thumbnail/ipad-lightroom.jpg', width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/thumbnail/ipad-lightroom.jpg'],
  },
}

export default function HowtoUseIpadPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/howto-use-ipad/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPadの便利な使い道 22選' },
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
      {
        '@type': 'Question',
        name: 'iPadのストレージ容量はどれくらい必要ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '動画視聴や電子書籍がメインなら64GB〜128GBで十分です。写真・動画編集やイラスト制作など大容量データを扱う場合は256GB以上がおすすめ。USB-C対応モデルなら外部ストレージも活用できるため、本体容量を抑えるという選択肢もあります。',
        },
      },
      {
        '@type': 'Question',
        name: 'Apple PencilはどのiPadに対応していますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Apple Pencilは世代やモデルによって対応するiPadが異なります。最新のApple Pencil ProはM4 iPad ProやM2以降のiPad Airに対応。第1世代・第2世代・USB-Cモデルもそれぞれ対応機種が違うため、購入前に必ず確認しましょう。',
        },
      },
      {
        '@type': 'Question',
        name: '中古や整備済製品のiPadでも快適に使えますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、iPadOSのサポート対象モデルであれば中古でも快適に使えます。特にM1チップ以降を搭載したモデルは処理性能に余裕があり、ステージマネージャーやApple Intelligenceなどの最新機能にも対応しています。',
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

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPad完全購入ガイド', href: '/ipad' },
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
                iPadがあればできること 便利な使い道 22選【生活が変わる】
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/content/thumbnail/ipad-lightroom.jpg"
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
        </div>

        {/* リード文 */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>
                「iPadって結局何に使うの？」「買っても使わなくなりそう…」そんな疑問を持っている方は多いのではないでしょうか。
              </p>
              <p>
                実はiPadは使い方次第で<strong>日常生活から仕事・勉強・趣味まで幅広く活躍</strong>してくれる万能デバイス。iPadOSのマルチタスク機能やApple Pencilとの連携により、スマホでは難しかった作業も快適にこなせます。本記事ではiPadの便利な使い道を22個厳選してご紹介します。
              </p>
              <p>
                きっと「こんな使い方もあったのか！」と、iPadを使いこなすための新しい発見があるはずです。
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
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
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
          <AuthorByline />
          </div>
        </nav>

        {/* 本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">

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

          {/* 目的別に人気の中古iPad */}
          <PopularSection
            sectionTitle="目的別に人気の中古iPad"
            sectionDescription="目的別におすすめの機種を厳選。診断で迷った方はぜひご覧ください。"
            imageSrc="/images/content/thumbnail/ipad-image-03.jpg"
            imageAlt="中古iPadおすすめ5選のイメージ画像"
            subtitle="目的別におすすめ機種を厳選！"
            cardTitle="中古iPadおすすめ5選"
            cardDescription="イラスト制作に最適なモデル、動画視聴に大画面モデルなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
            buttonText="おすすめ5機種を見る"
            buttonHref="/ipad/recommend/"
            secondaryButtonText="イオシスで中古iPadを探す"
            secondaryButtonHref="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Ftablet%2Fios%2Fipad"
          />

        <IPadRelatedLinks excludeHref={["/ipad/howto-use-ipad/", "/ipad/recommend/"]} />
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
