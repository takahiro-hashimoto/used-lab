import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import AirPodsRelatedLinks from '@/app/components/airpods/AirPodsRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import FaqSection from '@/app/components/support/FaqSection'
import FindMethodSection from './components/FindMethodSection'
import PurchaseMethodSection from './components/PurchaseMethodSection'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = false

const PAGE_TITLE = 'AirPodsのケースやイヤホン片方を無くした時の探し方、代替品の購入先まとめ'
const PAGE_DESCRIPTION =
  'AirPodsのケースやイヤホン片方を紛失した際の探し方を「探す」アプリ・iCloudの手順で解説。見つからない場合の代替品の購入先（Appleストア・メルカリ・eイヤホン）も比較して紹介します。'
const PAGE_URL = 'https://used-lab.jp/airpods/airpods-find/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/airpods/airpods-find/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/airpods/airpods-find/',
    images: [{ url: getHeroImage('/airpods/airpods-find/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/airpods/airpods-find/')],
  },
}

const FAQ_ITEMS = [
  {
    question: '「探す」アプリでAirPodsの現在地はわかるの？',
    answer:
      '「探す」アプリに表示されるのは、最後にBluetooth接続が切れた地点です。\n完全なリアルタイム位置ではありませんが、紛失場所の目安としては有効です。',
  },
  {
    question: '紛失モードを使うとどうなる？',
    answer:
      '紛失モードを有効にすると、ほかのiPhoneユーザーがAirPodsの近くを通った際に位置情報を自動で取得し通知が届きます。\nまた、拾った人のiPhoneに連絡先やメッセージを表示することも可能です。',
  },
  {
    question: 'AirPodsを片方だけ失くした場合の費用は？',
    answer:
      'Apple公式サイトで購入すると、片耳分の交換費用は約10,800円〜14,400円です（モデルにより異なります）。',
  },
  {
    question: 'ケース本体だけ失くした場合の費用は？',
    answer:
      '純正の充電ケースを買い直す場合、Appleでの価格は9,000円〜15,800円程度です（モデルにより異なります）。',
  },
  {
    question: '片方だけ中古AirPodsを購入しても使える？',
    answer:
      'はい、使用可能です。一度AirPodsのペアリング情報を削除し、両方のAirPodsを同時にケースに入れてペアリングし直すことで問題なく使えるようになります。',
  },
  {
    question: '紛失時にやってはいけないことは？',
    answer:
      '他人のAirPodsと混同して使おうとしたり、SNSでシリアル番号を公開するのはNGです。\nトラブルや不正利用につながる可能性があるため、正規ルートでの対応をおすすめします。',
  },
]

export default function AirpodsFindPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/airpods/airpods-find/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古AirPods完全購入ガイド', item: 'https://used-lab.jp/airpods' },
      { '@type': 'ListItem', position: 3, name: 'AirPodsの紛失対処法' },
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


        <Breadcrumb
          items={[
            { label: '中古AirPods完全購入ガイド', href: '/airpods' },
            { label: 'AirPodsの紛失対処法' },
          ]}
        />

          <header className="hero">
            <div className="hero-bg" aria-hidden="true">
              <div className="hero-shape hero-shape-1"></div>
              <div className="hero-shape hero-shape-2"></div>
            </div>
            <div className="hero-inner l-container">
              <div className="hero-content">
                <h1 className="hero-title" itemProp="headline">
                  AirPodsのケースやイヤホン片方を無くした時の探し方、代替品の購入先まとめ
                </h1>
                <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp showAuthor />
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image
                    src={getHeroImage('/airpods/airpods-find/')}
                    alt="AirPodsの紛失対処法"
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
              <p>外出時のお供として多くの方が利用しているAppleのAirPods。コンパクトな完全ワイヤレスイヤホンのため、<strong>ケース本体やイヤホン片方を紛失してしまった</strong>という声は多く見かけます。</p>
              <p>
                本記事では<strong>AirPodsのケースやイヤホン片方を無くした時の探し方</strong>や、見つからなかった場合の<strong>代替品の購入先</strong>を解説していきます。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古AirPodsの選び方全般は「<a href="/airpods">中古AirPods完全購入ガイド</a>」をご覧ください。
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
                <a href="#find-method" className="toc-item">
                  紛失時の探し方 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#purchase-method" className="toc-item">
                  代替品の購入方法 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#summary" className="toc-item">
                  まとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          </div>
        </nav>
        {/* 記事本文 */}
        <div className="l-sections" id="content" itemProp="articleBody">

          {/* h2: 紛失時の探し方 */}
          <section className="l-section" id="find-method" aria-labelledby="heading-find-method">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-find-method">
                AirPodsのケースやイヤホン片方を無くした時の探し方
              </h2>
              <p className="m-section-desc">
                Appleの「探す」アプリで、ケースやイヤホンを効率よく探すことができます。
              </p>
              <FindMethodSection />
            </div>
          </section>

          {/* h2: 代替品の購入方法 */}
          <section className="l-section" id="purchase-method" aria-labelledby="heading-purchase-method">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-purchase-method">
                AirPodsのケースのみ・イヤホン片方を購入する方法
              </h2>
              <p className="m-section-desc">
                探しても見つからなかった場合の代替品の購入先を3つ紹介します。eイヤホンでの購入が最もおすすめです。
              </p>
              <PurchaseMethodSection />
            </div>
          </section>

          {/* h2: まとめ */}
          <section className="l-section" id="summary" aria-labelledby="heading-summary">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
                AirPodsのケースやイヤホン片方を無くした時の対処法 まとめ
              </h2>
              <p className="m-section-desc">
                AirPodsのケースやイヤホン片方を無くした時の探し方や代替品の購入先をまとめました。
              </p>
              <div className="m-card m-card--shadow m-card--padded" style={{ maxWidth: 720, margin: 'var(--space-xl) auto 0' }}>
                <h3 className="summary-card__title">AirPods紛失時の3つのポイント</h3>
                <ol className="summary-card__list">
                  <li><strong>まずは「探す」アプリで捜索</strong>：充電が切れる前に位置情報の当たりをつけたり、紛失モードに切り替えることが大事です。</li>
                  <li><strong>すぐに行動を開始する</strong>：手元にAirPodsがないことに気がついたら、今回紹介した内容を実践してすぐに捜索を開始しましょう。</li>
                  <li><strong>見つからない場合は代替品を購入</strong>：Appleで欠けたパーツを取り寄せたり、eイヤホンなどで中古品を購入することで再びAirPodsを使用できます。</li>
                </ol>
              </div>
            </div>
          </section>

          {/* h2: よくある質問 */}
          <FaqSection
            title="AirPodsの紛失に関するよくある質問"
            description="AirPodsを紛失した際によくある疑問をまとめました。"
            items={FAQ_ITEMS}
          />

          <AirPodsRelatedLinks excludeHref="/airpods/airpods-find/" />
        <div className="l-section l-section--sm">
          <div className="l-container">
            <AuthorByline />
          </div>
        </div>

                  <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
