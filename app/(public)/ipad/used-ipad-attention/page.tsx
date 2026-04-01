import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import PreCheckSection from './components/PreCheckSection'
import RouteSection from './components/RouteSection'
import PostCheckSection from '@/app/components/attention/PostCheckSection'
import FailureSection from '@/app/components/attention/FailureSection'
import InsuranceSection from '@/app/components/attention/InsuranceSection'
import FaqSection from '@/app/components/attention/FaqSection'
import PopularSection from '@/app/components/support/PopularSection'
import { insuranceData, faqItems, postCheckItems, failurePatterns } from './components/data'
import IPadRelatedLinks from '@/app/components/ipad/IPadRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'

const PAGE_TITLE = '中古iPadはやめた方がいい？購入前に確認すべき注意点まとめ'
const PAGE_DESCRIPTION =
  '中古iPadはやめた方がいい？バッテリー劣化・iPadOSサポート切れ・アクセサリ非対応など、購入前に確認すべき注意点を徹底解説。失敗しない中古iPad選びのポイントを2026年最新情報でまとめました。'
const PAGE_URL = 'https://used-lab.com/ipad/used-ipad-attention/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/used-ipad-attention/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/used-ipad-attention/',
    images: [{ url: '/images/ipad/ipad-pro-13-2.jpg', width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/ipad/ipad-pro-13-2.jpg'],
  },
}

export default function UsedIpadAttentionPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/used-ipad-attention/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: '中古iPadの注意点' },
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
        name: 'フリマで中古iPadを買っても大丈夫？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリではバッテリー劣化の詐称、アクティベーションロック未解除、付属品の欠品などのトラブルが起きやすく、保証もありません。初めて中古iPadを買う方は、初期不良保証のある中古専門店を選びましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'Wi-Fiモデルとセルラーモデルどちらがいい？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '自宅やオフィスなどWi-Fi環境がある場所での使用がメインならWi-Fiモデルで十分です。外出先でも単体で通信したい場合はセルラーモデルを選びましょう。ただし、セルラーモデルはSIMカードの契約が別途必要で、中古の場合はSIMロックの有無やネットワーク利用制限の確認も必要になります。',
        },
      },
      {
        '@type': 'Question',
        name: '中古iPadでもApple Care+に入れる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '入れません。Apple Care+は「新品購入から30日以内」が加入条件のため、中古端末は対象外です。代わりに、中古端末でも加入できる「モバイル保険」などのサービスを検討しましょう。月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。',
        },
      },
      {
        '@type': 'Question',
        name: '中古iPadの「赤ロム」って何？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '「赤ロム」とは、ネットワーク利用制限がかかり通信ができなくなった端末のことです。セルラーモデルのiPadで、前の所有者が分割払いを滞納した場合などに発生します。赤ロムになるとSIMカードを挿しても通信できません。中古ショップではネットワーク利用制限の判定（◯/△/×）を確認でき、赤ロム保証を設けている店舗もあります。',
        },
      },
      {
        '@type': 'Question',
        name: 'iPadOSのサポートが切れるとどうなる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'iPadOSのサポートが終了すると、新しいiPadOSへのアップデートができなくなります。これにより、最新のセキュリティパッチが適用されず脆弱性が放置される可能性があります。また、アプリ側が最新OSを必須条件にすると対応アプリが徐々に減っていきます。中古iPadを選ぶ際はサポート残り期間を重視しましょう。',
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
            { label: '中古iPadの注意点' },
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
                中古iPadはやめた方がいい？購入前に確認すべき注意点まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/content/thumbnail/check-list.jpg"
                  alt="中古iPad購入時の注意点イメージ"
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
              <p>「安さに釣られて買った中古iPad、半年後にiPadOSのサポートが切れた」</p>
              <p>
                これは実際によくある失敗パターンです。中古iPadはiPhoneと違い、<strong>サポート期間が短い傾向にあり、モデルごとのアクセサリ互換性・ストレージ選び</strong>など、購入後に変更できない要素も多くあります。
              </p>
              <p>
                そこで本記事では「<strong>買ってはいけないiPad</strong>」を見抜くポイントをわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古iPadの全体像を把握したい方は「<a href="/ipad">中古iPad完全購入ガイド</a>」をご覧ください。
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
                <a href="#pre-check" className="toc-item">
                  購入前の必須確認 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#route" className="toc-item">
                  購入ルート別の注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#post-check" className="toc-item">
                  購入後すぐやるべきチェック <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#failure" className="toc-item">
                  よくある失敗パターン <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#insurance" className="toc-item">
                  中古でも入れる保険 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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

        {/* セクション */}
        <div className="l-sections" id="content" itemProp="articleBody">
          <PreCheckSection />
          <RouteSection />
          <PostCheckSection heading="中古iPadの購入後すぐやるべき確認項目" productName="iPad" checkItems={postCheckItems} />
          <FailureSection productName="iPad" guidePath="/ipad" failurePatterns={failurePatterns} showMemo={false} />
          <InsuranceSection {...insuranceData} />
          <FaqSection productName="iPad" faqItems={faqItems} />
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
        <IPadRelatedLinks excludeHref={["/ipad/used-ipad-attention/", "/ipad/recommend/"]} />
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
