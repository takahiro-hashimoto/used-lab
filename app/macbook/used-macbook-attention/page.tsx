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
import { insuranceData, faqItems, postCheckItems, failurePatterns } from './components/data'

const PAGE_TITLE = '中古MacBookはやめた方がいい？購入前に確認すべき注意点まとめ'
const PAGE_DESCRIPTION =
  '中古MacBookはやめた方がいい？macOSサポート切れ・バッテリー劣化・キーボード不具合・スペック不足など、購入前に確認すべき注意点を徹底解説。失敗しない中古MacBook選びのポイントを2026年最新情報でまとめました。'
const PAGE_URL = 'https://used-lab.com/macbook/used-macbook-attention/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/macbook/used-macbook-attention/',
    images: [{ url: '/images/macbook/mbp-14-2024-nov.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/macbook/mbp-14-2024-nov.jpg'],
  },
}

export default function UsedMacBookAttentionPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全ガイド', item: 'https://used-lab.com/macbook' },
      { '@type': 'ListItem', position: 3, name: '中古MacBookの注意点' },
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
        name: 'フリマで中古MacBookを買っても大丈夫？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリではバッテリー劣化の詐称、アクティベーションロック未解除、キーボード不具合の隠蔽などのトラブルが起きやすく、保証もありません。初めて中古MacBookを買う方は、初期不良保証のある中古専門店を選びましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'Intel MacとApple Silicon Mac、中古で買うならどっち？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2026年現在、中古で購入するならApple Silicon（M1以降）搭載モデルを強くおすすめします。Intel Macは macOSサポートが終了済みまたは間近のモデルが多く、性能面でもApple Siliconに大きく劣ります。Intel Macは価格が安いですが、サポート期間の短さを考えるとコスパは良くありません。',
        },
      },
      {
        '@type': 'Question',
        name: '中古MacBookでもApple Care+に入れる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '入れません。Apple Care+は「新品購入から30日以内」が加入条件のため、中古端末は対象外です。代わりに、中古端末でも加入できる「モバイル保険」などのサービスを検討しましょう。月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。',
        },
      },
      {
        '@type': 'Question',
        name: 'macOSのサポートが切れるとどうなる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'macOSのサポートが終了すると、新しいmacOSへのアップデートができなくなります。これにより最新のセキュリティパッチが適用されず脆弱性が放置される可能性があります。また、新しいmacOSを必要とするアプリ（Xcode、Final Cut Proの最新版など）が使えなくなります。MacBookのサポート期間は約7年が目安です。',
        },
      },
      {
        '@type': 'Question',
        name: '中古MacBookのバッテリーは交換できる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Apple公式で交換可能です。費用はMacBook Airで21,800円、MacBook Proで29,800円〜37,800円です。ただしバッテリー交換はユーザー自身で行えない構造のため、Apple StoreまたはApple正規サービスプロバイダに依頼する必要があります。交換費用を含めた総額で他の中古品や整備済製品と比較しましょう。',
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
            { label: '中古MacBook完全ガイド', href: '/macbook' },
            { label: '中古MacBookの注意点' },
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
                中古MacBookはやめた方がいい？<br className="sp-only" />購入前に確認すべき注意点まとめ
              </h1>
              <p className="hero-description" itemProp="description">
                macOSサポート切れ・バッテリー劣化・キーボード不具合など、失敗しないためのチェックポイントを徹底解説
              </p>
              <div className="hero-actions">
                <a href="#checklist" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-list-check" aria-hidden="true"></i>
                  <span>チェックリストを見る</span>
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
                  src="/images/macbook/mbp-14-2024-nov.jpg"
                  alt="中古MacBook購入時の注意点イメージ"
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
              <p>「安さに惹かれて買った中古MacBook、実はIntel Macでサポート切れ寸前だった」</p>
              <p>
                これは実際によくある失敗パターンです。MacBookは<strong>Apple Silicon（M1以降）とIntelで性能・サポート期間に大きな差</strong>があり、見た目だけでは判断できません。さらにバッテリー交換費用が高額なため、劣化品を安く買っても損をする可能性があります。
              </p>
              <p>
                そこで本記事では「<strong>買ってはいけないMacBook</strong>」を見抜くポイントをわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古MacBookの全体像を把握したい方は「<a href="/macbook">中古MacBook完全購入ガイド</a>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--md">タップできる目次</h2>
            <ol className="l-grid l-grid--3col toc-list">
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
        </nav>

        {/* セクション */}
        <div id="content" itemProp="articleBody">
          <PreCheckSection />
          <RouteSection />
          <PostCheckSection heading="中古MacBookの購入後すぐやるべきチェック" productName="MacBook" checkItems={postCheckItems} />
          <FailureSection productName="MacBook" guidePath="/macbook" failurePatterns={failurePatterns} />
          <InsuranceSection {...insuranceData} />
          <FaqSection productName="MacBook" faqItems={faqItems} />
        </div>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
