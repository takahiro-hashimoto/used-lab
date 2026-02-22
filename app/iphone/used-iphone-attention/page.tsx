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

const PAGE_TITLE = '中古iPhoneはやめた方がいい？購入前に確認すべき注意点まとめ【2026年版】'
const PAGE_DESCRIPTION =
  '中古iPhoneはやめた方がいい？バッテリー劣化・赤ロム・アクティベーションロックなど、購入前に確認すべき注意点を徹底解説。失敗しない中古iPhone選びのポイントを2026年最新情報でまとめました。'
const PAGE_URL = 'https://used-lab.com/iphone/used-iphone-attention/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/iphone/used-iphone-attention/',
    images: [{ url: '/images/iphone/iphone16pro.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/iphone/iphone16pro.jpg'],
  },
}

export default function UsedIphoneAttentionPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全ガイド', item: 'https://used-lab.com/iphone' },
      { '@type': 'ListItem', position: 3, name: '中古iPhoneの注意点' },
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
        name: 'フリマで中古iPhoneを買っても大丈夫？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリでは赤ロム、バッテリー劣化、アクティベーションロック未解除などのトラブルが起きやすく、保証もありません。初めて中古iPhoneを買う方は、赤ロム保証・初期不良保証のある中古スマホ専門店を選びましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'ネットワーク制限△は本当に使えなくなる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '「△」は現時点では使えますが、将来「×」になるリスクがあります。前の所有者が分割払いを滞納したり、端末が盗難届けの対象になった場合に通信できなくなります。初心者は「◯」判定の端末を選ぶことをおすすめします。',
        },
      },
      {
        '@type': 'Question',
        name: 'バッテリー80%でも問題ない？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '80%は「ギリギリ実用レベル」です。軽い使い方なら1日持ちますが、動画視聴やゲームが多いと夕方には充電が必要になることも。85%以上あると安心です。80%未満の端末は「本体価格＋バッテリー交換費用（Apple公式で11,200円〜）」で総額を計算し、他の端末と比較しましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'アクティベーションロックがかかっていたらどうする？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '自分では解除できません。前の所有者のApple IDとパスワードが必要です。購入後に発覚した場合は、すぐにショップへ連絡して返品・交換を依頼してください。フリマで購入した場合は出品者に解除を依頼する必要がありますが、連絡が取れなくなるケースも多いため、保証のある中古ショップでの購入をおすすめします。',
        },
      },
      {
        '@type': 'Question',
        name: '中古iPhoneでもApple Care+に入れる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '入れません。Apple Care+は「新品購入から30日以内」が加入条件のため、中古端末は対象外です。代わりに、中古端末でも加入できる「モバイル保険」などのサービスを検討しましょう。月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。',
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
            { label: '中古iPhone完全ガイド', href: '/iphone' },
            { label: '中古iPhoneの注意点' },
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
                中古iPhoneはやめた方がいい？<br className="sp-only" />購入前に確認すべき注意点まとめ
              </h1>
              <p className="hero-description" itemProp="description">
                バッテリー劣化・赤ロム・アクティベーションロックなど、失敗しないためのチェックポイントを徹底解説【2026年版】
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
                  src="/images/iphone/iphone16pro.jpg"
                  alt="中古iPhone購入時の注意点イメージ"
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
              <p>「安かったから買った中古iPhoneが、1ヶ月後に突然通信できなくなった」</p>
              <p>
                これは実際によくある失敗パターンです。中古iPhoneは「<strong>状態の個体差</strong>」が最大のリスク。知らずに買うと、あとから回避できない問題が起きることがあります。
              </p>
              <p>
                そこで本記事では「<strong>買ってはいけない端末</strong>」を見抜くポイントをわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古iPhoneの全体像を把握したい方は「<a href="/iphone">中古iPhone完全購入ガイド</a>」をご覧ください。
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
                  購入後のチェック <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
          <PostCheckSection heading="購入後すぐやるべきチェック" productName="iPhone" checkItems={postCheckItems} />
          <FailureSection productName="iPhone" guidePath="/iphone" failurePatterns={failurePatterns} />
          <InsuranceSection {...insuranceData} />
          <FaqSection productName="iPhone" faqItems={faqItems} />
        </div>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
