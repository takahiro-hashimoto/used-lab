import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import PixelArticleFooter from '@/app/components/pixel/PixelArticleFooter'
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

export const revalidate = false

const PAGE_TITLE = '中古Google Pixelはやめた方がいい？購入前に確認すべき注意点まとめ'
const PAGE_DESCRIPTION =
  '中古Google Pixelはやめた方がいい？バッテリー劣化・赤ロム・Googleアカウント（端末保護機能）・Androidアップデート期間など、購入前に確認すべき注意点を徹底解説。失敗しない中古Pixel選びのポイントをまとめました。'
const PAGE_URL = 'https://used-lab.jp/pixel/used-pixel-attention/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/pixel/used-pixel-attention/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/pixel/used-pixel-attention/',
    images: [{ url: getHeroImage('/pixel/used-pixel-attention/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/pixel/used-pixel-attention/')],
  },
}

export default function UsedPixelAttentionPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/used-pixel-attention/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/pixel/' },
      { '@type': 'ListItem', position: 3, name: '中古Google Pixel購入前の注意点' },
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
        name: 'フリマで中古Google Pixelを買っても大丈夫？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリでは赤ロム、バッテリー劣化、Googleアカウント・端末保護機能（FRP）の未解除などのトラブルが起きやすく、保証もありません。\n初めて中古Pixelを買う方は、赤ロム保証・初期不良保証のある中古スマホ専門店を選びましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'ネットワーク制限△は本当に使えなくなる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '「△」は現時点では使えますが、将来「×」になるリスクがあります。前の所有者が分割払いを滞納したり、端末が盗難届けの対象になった場合に通信できなくなります。\nキャリア版のPixelを中古で買う場合は特に注意し、赤ロム永久保証付きのショップを選ぶと安心です。Google Store版（SIMフリー）は対象外です。',
        },
      },
      {
        '@type': 'Question',
        name: 'バッテリーが劣化していないか心配。どこを見ればいい？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PixelはiPhoneのように最大容量（％）を明確に表示しませんが、Android 14以降の設定から充電サイクル数・製造日を確認できます。\nサイクル数が多い個体ほど劣化が進んでいます。劣化していると「本体価格＋バッテリー交換費用（Google正規修理で13,000円前後〜）」で総額を計算し、他の端末と比較しましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'Googleアカウントのロック（端末保護機能）がかかっていたらどうする？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '自分では解除できません。前の所有者のGoogleアカウントとパスワードが必要です。初期化しても端末保護機能（FRP）が働き、先に進めなくなります。購入後に発覚した場合は、すぐにショップへ連絡して返品・交換を依頼してください。\nフリマで購入した場合は出品者に初期化を依頼する必要がありますが、連絡が取れなくなるケースも多いため、保証のある中古ショップでの購入をおすすめします。',
        },
      },
      {
        '@type': 'Question',
        name: '中古Google PixelでもGoogleの補償サービスに入れる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '入れません。Googleの延長保証（Preferred Care）は新品購入時が加入条件のため、中古端末は対象外です。代わりに、中古端末でも加入できる「モバイル保険」などのサービスを検討しましょう。月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。',
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
            { label: '中古Google Pixelおすすめ機種・選び方まとめ', href: '/pixel/' },
            { label: '中古Google Pixel購入前の注意点' },
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
                中古Google Pixelはやめた方がいい？購入前に確認すべき注意点まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/pixel/used-pixel-attention/')}
                  alt="中古Google Pixel購入時の注意点イメージ"
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
              <p>「安かったから買った中古Pixelが、1ヶ月後に突然通信できなくなった」</p>
              <p>
                これは実際によくある失敗パターンです。中古Pixelは「状態の個体差」が最大のリスク。知らずに買うと、あとから回避できない問題が起きることがあります。
              </p>
              <p>
                そこで本記事では「<strong>買ってはいけない端末</strong>」を見抜くポイントをわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古Pixelの全体像を把握したい方は「<Link prefetch={false} href="/pixel/">中古Google Pixelおすすめ機種・選び方まとめ</Link>」をご覧ください。
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
          <PostCheckSection heading="購入後すぐやるべきチェック" productName="Pixel" checkItems={postCheckItems} />
          <FailureSection productName="Pixel" guidePath="/pixel" failurePatterns={failurePatterns} showMemo={false} />
          <InsuranceSection {...insuranceData} />

          {/* まとめ */}
          <section className="l-section" id="matome" aria-labelledby="heading-matome">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-matome">
                中古Google Pixelを買う際の注意点 まとめ
              </h2>
              <p className="m-section-desc">
                中古Pixelの注意点は多く見えますが、事前にチェックすべきポイントは4つだけです。この4点を確認しておけば、購入後の大きなトラブルはほぼ防げます。機種選びで迷っている方は、<Link prefetch={false} href="/pixel/">おすすめ中古Pixel5選</Link>もあわせてご覧ください。
              </p>

              <SummaryChecklist
                title="購入前に確認すべき4つのポイント"
                items={[
                  { label: 'ネットワーク制限', text: <>はキャリア版のみIMEIで事前に確認。「△」でも<Link prefetch={false} href="/pixel/pixel-shop/">赤ロム保証付きショップ</Link>なら安心です。</> },
                  { label: 'バッテリーの状態', text: 'は充電サイクル数・製造日で判断。劣化が進んだ個体は避けましょう。' },
                  { label: 'Androidアップデート', text: 'の残りが2年未満の端末は避けましょう。Pixel 8以降は発売から7年が目安です。' },
                  { label: 'SIMロック・技適', text: 'はSIMフリー・国内正規版（技適あり）かを確認しましょう。' },
                ]}
              />
            </div>
          </section>

          <FaqSection productName="Pixel" faqItems={faqItems} />
        </div>
      </article>
    </main>
    <PixelArticleFooter
            pageUrl={PAGE_URL}
            pageTitle={PAGE_TITLE}
            excludeHref={["/pixel/used-pixel-attention/"]}
          />
    </>
  )
}
