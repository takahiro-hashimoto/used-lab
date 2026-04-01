import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import MeritSection from './components/MeritSection'
import CautionSection from './components/CautionSection'
import PrepareSection from './components/PrepareSection'
import NaviAppSection from './components/NaviAppSection'
import RunningCostSection from './components/RunningCostSection'
import FaqSection from '@/app/components/support/FaqSection'
import IPadRelatedLinks from '@/app/components/ipad/IPadRelatedLinks'
import PopularSection from '@/app/components/support/PopularSection'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'

const PAGE_TITLE = 'iPadをカーナビ化するメリットが凄い！地図が古くなる問題をすっきり解消'
const PAGE_DESCRIPTION =
  'iPadをカーナビ代わりに使うメリット5つと注意点2つを実体験をもとに解説。常に最新の地図・渋滞情報・大画面・直感操作など、車載カーナビにはない利点をわかりやすく紹介します。'
const PAGE_URL = 'https://used-lab.com/ipad/car-navigation-system/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/car-navigation-system/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/car-navigation-system/',
    images: [{ url: '/images/content/photo/ipad-car-navi-02.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/photo/ipad-car-navi-02.jpg'],
  },
}

export default function CarNavigationSystemPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/car-navigation-system/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPadのカーナビ化' },
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
            { label: '中古iPad完全購入ガイド', href: '/ipad' },
            { label: 'iPadのカーナビ化' },
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
                iPadをカーナビ化するメリットが凄い！地図が古くなる問題をすっきり解消
              </h1>
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
                  src="/images/content/thumbnail/ipad-image-10.jpg"
                  alt="iPadをカーナビ化した様子"
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
              <p>「カーナビの地図が古くなって、旅行先で困った経験はありませんか？」</p>
              <p>
                マップの更新にはディーラーに頼むと2〜3万円の費用がかかることも。そこでおすすめなのが<strong>iPad miniをカーナビ代わりに使う方法</strong>です。
              </p>
              <p>
                本記事では<strong>まず結論（メリット・注意点の概要）をお伝え</strong>したうえで、iPadカーナビ化の具体的なメリット5つと注意点2つを実体験をもとに詳しく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古iPadの選び方全般は「<a href="/ipad">中古iPad完全購入ガイド</a>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li>
                <a href="#conclusion" className="toc-item">
                  結論：メリット・注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#merit" className="toc-item">
                  メリット5つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#caution" className="toc-item">
                  注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#navi-app" className="toc-item">
                  カーナビアプリ比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#prepare" className="toc-item">
                  必要なもの <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#running-cost" className="toc-item">
                  通信費・ランニングコスト <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          <AuthorByline />
          </div>
        </nav>

        {/* 記事本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">
          {/* h2: 結論 */}
          <section className="l-section" id="conclusion" aria-labelledby="heading-conclusion">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-conclusion">
                結論：iPadカーナビ化はメリットが大きい
              </h2>
              <p className="m-section-desc">
                iPadをカーナビ化して感じたメリットと注意点の概要です。
              </p>

              <div className="merit-demerit" style={{ marginTop: 'var(--space-2xl)' }}>
                <div className="merit-box">
                  <p className="merit-box__title">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    メリット5つ
                  </p>
                  <ul>
                    <li>マップの更新が不要（常に最新の地図）</li>
                    <li>渋滞情報の精度が高い</li>
                    <li>画面が大きくてみやすい</li>
                    <li>キーボード・音声で直感的に操作</li>
                    <li>音楽や動画の再生もしやすい</li>
                  </ul>
                </div>

                <div className="demerit-box">
                  <p className="demerit-box__title">
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i>
                    注意点2つ
                  </p>
                  <ul>
                    <li>セルラーモデル（GPS搭載）が必須</li>
                    <li>車に合う車載ホルダーを探す必要がある</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

{/* h2: メリット5つ */}
          <section className="l-section" id="merit" aria-labelledby="heading-merit">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-merit">
                iPadをカーナビ化して感じたメリット5つ
              </h2>
              <p className="m-section-desc">
                実際にiPad miniをカーナビ化して感じたメリットを5つ紹介します。
              </p>
              <MeritSection />
            </div>
          </section>

          {/* h2: 注意点 */}
          <section className="l-section" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">
                iPadをカーナビにする際の注意点
              </h2>
              <p className="m-section-desc">
                iPadカーナビ化で押さえておくべき注意点を2つ解説します。
              </p>
              <CautionSection />
            </div>
          </section>

          <NaviAppSection />
          <PrepareSection />
          <RunningCostSection />

          <FaqSection
            title="iPadカーナビ化に関するよくある質問"
            description="iPadをカーナビとして使う際によく寄せられる疑問にお答えします。"
            items={[
              {
                question: 'iPadのCarPlay対応は？CarPlayとの違いは何？',
                answer: 'iPadはCarPlayに対応していません。CarPlayはiPhoneを車載ディスプレイに接続して使う機能で、iPadは対象外です。ただしiPadはそれ自体が大画面ディスプレイなので、Googleマップなどのカーナビアプリを直接起動すれば、CarPlayと同等以上の使い勝手が得られます。',
              },
              {
                question: 'iPadカーナビ化にはWi-Fiモデルでも使える？',
                answer: 'Wi-FiモデルのiPadにはGPS機能が搭載されていないため、カーナビとしての利用には向きません。正確な位置情報をリアルタイムで取得するには、GPS搭載のセルラーモデルが必要です。',
              },
              {
                question: 'カーナビアプリの通信量はどれくらい？',
                answer: 'Googleマップなどのカーナビアプリは1時間あたり約5〜10MB程度の通信量です。月30時間使用しても300MB以下なので、格安SIMの最小プランでも十分まかなえます。Googleマップならオフライン地図をダウンロードしておけば、通信量をさらに節約できます。',
              },
              {
                question: 'iPadカーナビ化のおすすめサイズは？',
                answer: '車内での取り回しを考えると、iPad mini（8.3インチ）が最もおすすめです。ダッシュボードに設置しても視界を遮りにくく、一般的な車載カーナビよりも大きい画面で快適に使えます。',
              },
              {
                question: '夏場の車内でiPadは大丈夫？',
                answer: '直射日光が当たる環境ではiPadが高温になり「高温注意」の警告が表示されることがあります。サンシェードの使用や、エアコンの風が当たる位置に設置するなどの対策が有効です。駐車時は車内に放置せず持ち出すようにしましょう。',
              },
            ]}
          />

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
        />
        <IPadRelatedLinks excludeHref={["/ipad/car-navigation-system/", "/ipad/recommend/"]} />
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
