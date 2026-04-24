import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import WatchArticleFooter from '@/app/components/watch/WatchArticleFooter'
import PreCheckSection from './components/PreCheckSection'
import RouteSection from './components/RouteSection'
import PostCheckSection from '@/app/components/attention/PostCheckSection'
import FailureSection from '@/app/components/attention/FailureSection'
import InsuranceSection from '@/app/components/attention/InsuranceSection'
import FaqSection from '@/app/components/attention/FaqSection'
import { insuranceData, faqItems, postCheckItems, failurePatterns } from './components/data'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

const PAGE_TITLE = '中古Apple Watchはやめた方がいい？購入前に確認すべき注意点まとめ'
const PAGE_DESCRIPTION =
  '中古Apple Watchはやめた方がいい？watchOSサポート切れ・バッテリー劣化・ペアリング解除漏れなど、購入前に確認すべき注意点を徹底解説。失敗しない中古Apple Watch選びのポイントを2026年最新情報でまとめました。'
const PAGE_URL = 'https://used-lab.jp/watch/used-watch-attention/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/watch/used-watch-attention/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/watch/used-watch-attention/',
    images: [{ url: getHeroImage('/watch/used-watch-attention/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/watch/used-watch-attention/')],
  },
}

export default function UsedWatchAttentionPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/watch/used-watch-attention/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全購入ガイド', item: 'https://used-lab.jp/watch' },
      { '@type': 'ListItem', position: 3, name: '中古Apple Watchの注意点' },
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
        name: 'フリマで中古Apple Watchを買っても大丈夫？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリではアクティベーションロック未解除、バッテリー劣化の詐称、ケースの傷の見落としなどのトラブルが起きやすく、保証もありません。初めて中古Apple Watchを買う方は、初期不良保証のある中古専門店を選びましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'GPSモデルとセルラーモデルどちらがいい？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'iPhoneを常に持ち歩くならGPSモデルで十分です。iPhoneなしで通話やメッセージを使いたい場合はセルラーモデルを選びましょう。ただし、セルラーモデルはキャリアのウォッチナンバー契約（月額385円〜）が別途必要です。中古の場合はセルラー機能が正常に動作するか確認も必要になります。',
        },
      },
      {
        '@type': 'Question',
        name: '中古Apple WatchでもApple Care+に入れる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '入れません。Apple Care+は「新品購入から30日以内」が加入条件のため、中古端末は対象外です。代わりに、中古端末でも加入できる「モバイル保険」などのサービスを検討しましょう。月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。',
        },
      },
      {
        '@type': 'Question',
        name: 'watchOSのサポートが切れるとどうなる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'watchOSのサポートが終了すると、新しいwatchOSへのアップデートができなくなります。これにより、最新のセキュリティパッチが適用されず脆弱性が放置される可能性があります。また、アプリ側が最新OSを必須条件にすると対応アプリが徐々に減っていきます。Apple Watchはサポート期間が約5年と短いため、中古を選ぶ際はサポート残り期間を重視しましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'Apple Watchのサイズが違ってもバンドは使いまわせる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '同じ系統のサイズであれば使いまわせます。38mm/40mm/41mm系と42mm/44mm/45mm/46mm系でそれぞれ互換性があり、世代をまたいでバンドを共有できます。ただし、Apple Watch Series 10以降は新しいバンド幅が導入されており旧バンドとの互換性に制限がある場合があります。また、Ultraシリーズは49mmの専用バンドが必要です。',
        },
      },
    ],
  }

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古Apple Watch完全購入ガイド', href: '/watch/' },
            { label: '中古Apple Watchの注意点' },
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
                中古Apple Watchはやめた方がいい？購入前に確認すべき注意点まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/watch/used-watch-attention/')}
                  alt="中古Apple Watch購入時の注意点イメージ"
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
              <p>「安く買った中古Apple Watch、半年後にwatchOSのサポートが切れてアプリが使えなくなった」</p>
              <p>
                これは実際によくある失敗パターンです。Apple WatchはiPhoneやiPadと比べて<strong>サポート期間が約5年と短く、バッテリー容量も小さいため劣化の影響を受けやすい</strong>デバイスです。
              </p>
              <p>
                そこで本記事では「<strong>買ってはいけないApple Watch</strong>」を見抜くポイントをわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古Apple Watchの全体像を把握したい方は「<Link href="/watch/">中古Apple Watch完全購入ガイド</Link>」をご覧ください。
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
          </div>
        </nav>

        {/* セクション */}
        <div className="l-sections" id="content" itemProp="articleBody">
          <PreCheckSection />
          <RouteSection />
          <PostCheckSection heading="中古Apple Watchの購入後すぐやるべきチェック" productName="Apple Watch" checkItems={postCheckItems} />
          <FailureSection productName="Apple Watch" guidePath="/watch" failurePatterns={failurePatterns} showMemo={false} />
          <InsuranceSection {...insuranceData} />
          <FaqSection productName="Apple Watch" faqItems={faqItems} />
        </div>
      </article>
    </main>
    <WatchArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/watch/used-watch-attention/"]} />
    </>
  )
}
