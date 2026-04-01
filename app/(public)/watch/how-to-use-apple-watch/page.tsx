import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import BasicSection from './components/BasicSection'
import HealthSection from './components/HealthSection'
import PaymentSection from './components/PaymentSection'
import AppleEcoSection from './components/AppleEcoSection'
import PopularSection from '@/app/components/support/PopularSection'
import WatchRelatedLinks from '@/app/components/watch/WatchRelatedLinks'
import FaqSection from '@/app/components/support/FaqSection'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'

const PAGE_TITLE = 'アップルウォッチのできること25選！便利な機能や使い方がわかる【初心者向け】'
const PAGE_DESCRIPTION =
  'Apple Watchの便利な機能・使い方を25個厳選して紹介。基本機能・健康管理・決済・Apple製品連携など、Apple Watchがあれば生活が変わる活用法を初心者にもわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.com/watch/how-to-use-apple-watch/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/watch/how-to-use-apple-watch/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/watch/how-to-use-apple-watch/',
    images: [{ url: '/images/watch/watch-9.jpg', width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/watch/watch-9.jpg'],
  },
}

export default function HowToUseAppleWatchPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/how-to-use-apple-watch/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全購入ガイド', item: 'https://used-lab.com/watch' },
      { '@type': 'ListItem', position: 3, name: 'Apple Watchのできること25選' },
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
            { label: '中古Apple Watch完全購入ガイド', href: '/watch' },
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
                アップルウォッチのできること25選！【初心者向け】
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src="/images/content/thumbnail/watch-image-11.jpg"
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
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
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

          {/* セクション: 基本機能編 */}
          <BasicSection />

          {/* セクション: 健康管理・ヘルスケア編 */}
          <HealthSection />

          {/* セクション: 決済編 */}
          <PaymentSection />

          {/* セクション: Apple製品連携編 */}
          <AppleEcoSection />

          <FaqSection
            title="Apple Watchに関するよくある質問"
            description="Apple Watchの購入や使い方でよく寄せられる疑問にお答えします。"
            items={[
              {
                question: 'Apple WatchはiPhoneがないと使えない？',
                answer: '初期設定にはiPhoneが必要ですが、セットアップ後はWi-Fi環境下であればiPhoneが手元になくても多くの機能を単体で利用できます。\nGPS + Cellularモデルならモバイル通信にも対応しており、電話やメッセージの送受信もApple Watch単体で可能です。',
              },
              {
                question: 'Apple Watchのバッテリーはどのくらい持つ？',
                answer: '通常使用で約18時間（Series 9以降は最大36時間の低電力モード対応）です。就寝前に充電すれば日中のバッテリー切れの心配はほぼありません。\n急速充電に対応したモデルなら約45分で80%まで充電できます。',
              },
              {
                question: 'Apple WatchはAndroidスマホでも使える？',
                answer: 'いいえ、Apple WatchはiPhoneとのペアリングが必須のため、Androidスマートフォンでは利用できません。Apple Watchを使うにはiPhone 8以降（iOS 17以降）が必要です。',
              },
              {
                question: 'Apple Watchのサイズはどう選べばいい？',
                answer: '手首の細い方は小さいケースサイズ（40〜42mm）、標準〜太めの方は大きいケースサイズ（44〜46mm）がおすすめです。\n画面が大きいほど文字が読みやすく操作もしやすいため、迷ったら大きい方を選ぶのが無難です。',
              },
              {
                question: 'Apple Watchは中古で買っても大丈夫？',
                answer: 'はい、中古でも十分活用できます。\nただし、アクティベーションロックが解除されていること、バッテリーの最大容量が80%以上あることを確認しましょう。詳しい選び方は中古Apple Watch購入ガイドをご覧ください。',
              },
              {
                question: 'GPSモデルとGPS + Cellularモデルの違いは？',
                answer: 'GPSモデルはiPhoneが近くにある状態で通信機能を利用します。GPS + CellularモデルはApple Watch単体でモバイル通信が可能で、ランニング中にiPhoneを持たずに音楽ストリーミングや電話ができます。\n詳しくは「GPSモデルとセルラーモデルの違い」をご覧ください。',
              },
            ]}
          />


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

        <WatchRelatedLinks excludeHref={["/watch/how-to-use-apple-watch/", "/watch/recommend/"]} />

        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
