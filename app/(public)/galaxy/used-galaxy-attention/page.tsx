import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import GalaxyArticleFooter from '@/app/components/galaxy/GalaxyArticleFooter'
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

const PAGE_TITLE = '中古Samsung Galaxyはやめた方がいい？購入前に確認すべき注意点まとめ'
const PAGE_DESCRIPTION =
  '中古Samsung Galaxyはやめた方がいい？バッテリー劣化・赤ロム・端末保護機能（Reactivation Lock/FRP）・Androidアップデート期間など、購入前に確認すべき注意点を徹底解説。折りたたみ（Z）特有のチェックも含め、失敗しない中古Galaxy選びのポイントをまとめました。'
const PAGE_URL = 'https://used-lab.jp/galaxy/used-galaxy-attention/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/galaxy/used-galaxy-attention/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/galaxy/used-galaxy-attention/',
    images: [{ url: getHeroImage('/galaxy/used-galaxy-attention/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/galaxy/used-galaxy-attention/')],
  },
}

export default function UsedGalaxyAttentionPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/galaxy/used-galaxy-attention/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Samsung Galaxyおすすめ機種・選び方まとめ', item: 'https://used-lab.jp/galaxy/' },
      { '@type': 'ListItem', position: 3, name: '中古Samsung Galaxy購入前の注意点' },
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
        name: 'フリマで中古Galaxyを買っても大丈夫？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'リスクを理解できる上級者なら問題ありませんが、初心者にはおすすめしません。フリマアプリでは赤ロム、バッテリー劣化、Reactivation Lock（端末保護機能）未解除などのトラブルが起きやすく、保証もありません。\n初めて中古Galaxyを買う方は、赤ロム保証・初期不良保証のある中古スマホ専門店を選びましょう。',
        },
      },
      {
        '@type': 'Question',
        name: 'ネットワーク制限△は本当に使えなくなる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '「△」は現時点では使えますが、将来「×」になるリスクがあります。前の所有者が分割払いを滞納したり、端末が盗難届けの対象になった場合に通信できなくなります。赤ロム永久保証付きの中古ショップで購入すれば、万が一×になっても交換・返金してもらえるためリスクはほぼありません。',
        },
      },
      {
        '@type': 'Question',
        name: 'Galaxyのバッテリー状態はどう確認する？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GalaxyはiPhoneのような「最大容量◯%」表示がありません。Samsung Membersアプリの「診断」→「バッテリー状態」で「良好／交換が必要」といった判定を確認できます。\n中古で状態が不明な場合は、バッテリー状態を検品・表記しているショップを選ぶと安心です。劣化が進んだ個体は交換費用（Samsung公式で8,800円前後〜）がかかり割高になることがあります。',
        },
      },
      {
        '@type': 'Question',
        name: '端末保護機能（Reactivation Lock / FRP）がかかっていたらどうする？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '自分では解除できません。前の所有者のSamsungアカウントやGoogleアカウントとパスワードが必要です。初期化しても初回設定時に元の所有者のアカウント入力を求められ、先へ進めなくなります。購入後に発覚した場合は、すぐにショップへ連絡して返品・交換を依頼してください。',
        },
      },
      {
        '@type': 'Question',
        name: '中古Galaxyでも入れる保険はある？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'あります。GalaxyはApple Care+のようなメーカー保証を中古で引き継げませんが、端末を問わず中古端末でも加入できる「モバイル保険」などのサービスを検討しましょう。\n月額700円で最大3台まで補償でき、年間10万円まで修理費用をカバーできます。折りたたみモデルのように修理費が高額になりやすい端末ほど加入メリットが大きくなります。',
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
            { label: '中古Samsung Galaxyおすすめ機種・選び方まとめ', href: '/galaxy/' },
            { label: '中古Samsung Galaxy購入前の注意点' },
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
                中古Samsung Galaxyはやめた方がいい？購入前に確認すべき注意点まとめ
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/galaxy/used-galaxy-attention/')}
                  alt="中古Samsung Galaxy購入時の注意点イメージ"
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
              <p>「安かったから買った中古Galaxyが、1ヶ月後に突然通信できなくなった」</p>
              <p>
                これは実際によくある失敗パターンです。中古Galaxyは「状態の個体差」が最大のリスク。知らずに買うと、あとから回避できない問題が起きることがあります。
              </p>
              <p>
                そこで本記事では「<strong>買ってはいけない端末</strong>」を見抜くポイントを、Android・Galaxyならではの視点でわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古Galaxyの全体像を把握したい方は「<Link prefetch={false} href="/galaxy/">中古Samsung Galaxyおすすめ機種・選び方まとめ</Link>」をご覧ください。
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
          <PostCheckSection heading="購入後すぐやるべきチェック" productName="Samsung Galaxy" checkItems={postCheckItems} />
          <FailureSection productName="Samsung Galaxy" guidePath="/galaxy" failurePatterns={failurePatterns} showMemo={false} />
          <InsuranceSection {...insuranceData} />

          {/* まとめ */}
          <section className="l-section" id="matome" aria-labelledby="heading-matome">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-matome">
                中古Samsung Galaxyを買う際の注意点 まとめ
              </h2>
              <p className="m-section-desc">
                中古Galaxyの注意点は多く見えますが、事前にチェックすべきポイントを押さえれば、購入後の大きなトラブルはほぼ防げます。機種選びで迷っている方は、<Link prefetch={false} href="/galaxy/">おすすめ中古Galaxy5選</Link>もあわせてご覧ください。
              </p>

              <SummaryChecklist
                title="購入前に確認すべきポイント"
                items={[
                  { label: 'ネットワーク制限', text: <>は必ずIMEIで事前に確認。「△」でも<Link prefetch={false} href="/galaxy/galaxy-shop/">赤ロム保証付きショップ</Link>なら安心です。</> },
                  { label: 'バッテリー状態', text: 'が「交換が必要」の端末は避けましょう。Samsung Membersアプリの診断で確認できます。' },
                  { label: 'Androidアップデート', text: 'の残りが短い端末は避けましょう。S24以降・Flip6/Fold6は最大7年が目安です。' },
                  { label: 'SIMロック / 端末保護機能', text: 'が解除・初期化されているか確認しましょう。折りたたみはヒンジ・折り目・保護フィルムも要チェックです。' },
                ]}
              />
            </div>
          </section>

          <FaqSection productName="Samsung Galaxy" faqItems={faqItems} />
        </div>
      </article>
    </main>
    <GalaxyArticleFooter
            pageUrl={PAGE_URL}
            pageTitle={PAGE_TITLE}
            excludeHref={["/galaxy/used-galaxy-attention/"]}
          />
    </>
  )
}
