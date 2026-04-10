import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'
import PreCheckSection from './components/PreCheckSection'
import RouteSection from './components/RouteSection'
import PostCheckSection from '@/app/components/attention/PostCheckSection'
import FailureSection from '@/app/components/attention/FailureSection'
import InsuranceSection from '@/app/components/attention/InsuranceSection'
import FaqSection from '@/app/components/attention/FaqSection'
import SummaryChecklist from '@/app/components/SummaryChecklist'
import { insuranceData, faqItems, postCheckItems, failurePatterns } from './components/data'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

const CURRENT_YEAR = new Date().getFullYear()
const PAGE_TITLE = `中古iPhoneはやめた方がいい？購入前に確認すべき注意点まとめ【${CURRENT_YEAR}年版】`
const PAGE_DESCRIPTION =
  `中古iPhoneはやめた方がいい？バッテリー劣化・赤ロム・アクティベーションロックなど、購入前に確認すべき注意点を徹底解説。失敗しない中古iPhone選びのポイントを${CURRENT_YEAR}年最新情報でまとめました。`
const PAGE_URL = 'https://used-lab.jp/iphone/used-iphone-attention/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/used-iphone-attention/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/used-iphone-attention/',
    images: [{ url: getHeroImage('/iphone/used-iphone-attention/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/iphone/used-iphone-attention/')],
  },
}

export default function UsedIphoneAttentionPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/used-iphone-attention/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.jp/iphone' },
      { '@type': 'ListItem', position: 3, name: '中古iPhoneの注意点' },
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
            { label: '中古iPhone完全購入ガイド', href: '/iphone' },
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
                中古iPhoneはやめた方がいい？購入前に確認すべき注意点まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/iphone/used-iphone-attention/')}
                  alt="中古iPhone購入時の注意点イメージ"
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
              <p>「安かったから買った中古iPhoneが、1ヶ月後に突然通信できなくなった」</p>
              <p>
                これは実際によくある失敗パターンです。中古iPhoneは「状態の個体差」が最大のリスク。知らずに買うと、あとから回避できない問題が起きることがあります。
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
          </div>
        </nav>

        {/* セクション */}
        <div className="l-sections" id="content" itemProp="articleBody">
          <PreCheckSection />
          <RouteSection />
          <PostCheckSection heading="購入後すぐやるべきチェック" productName="iPhone" checkItems={postCheckItems} />
          <FailureSection productName="iPhone" guidePath="/iphone" failurePatterns={failurePatterns} showMemo={false} />
          <InsuranceSection {...insuranceData} />

          {/* まとめ */}
          <section className="l-section" id="matome" aria-labelledby="heading-matome">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-matome">
                中古iPhoneを買う際の注意点 まとめ
              </h2>
              <p className="m-section-desc">
                中古iPhoneの注意点は多く見えますが、事前にチェックすべきポイントは4つだけです。この4点を確認しておけば、購入後の大きなトラブルはほぼ防げます。機種選びで迷っている方は、<Link href="/iphone/recommend/">おすすめiPhone5選</Link>もあわせてご覧ください。
              </p>

              <SummaryChecklist
                title="購入前に確認すべき4つのポイント"
                items={[
                  { label: 'ネットワーク制限', text: <>は必ずIMEIで事前に確認。「△」でも<a href="/iphone/network-limit/">赤ロム保証付きショップ</a>なら安心です。</> },
                  { label: 'バッテリー最大容量', text: 'が80%未満の端末は避けましょう。設定アプリから確認できます。' },
                  { label: 'iOSサポート', text: 'の残りが2年未満の端末は避けましょう。発売から約7年が目安です。' },
                  { label: 'SIMロック', text: 'が解除できない端末は避けましょう。設定アプリから確認できます。' },
                ]}
              />
            </div>
          </section>

          <FaqSection productName="iPhone" faqItems={faqItems} />
        </div>
      </article>
    </main>
    <IPhoneArticleFooter
            pageUrl={PAGE_URL}
            pageTitle={PAGE_TITLE}
            excludeHref={["/iphone/used-iphone-attention/", "/iphone/recommend/"]}
          />
    </>
  )
}
