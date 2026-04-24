import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import AirPodsRelatedLinks from '@/app/components/airpods/AirPodsRelatedLinks'
import ShareBox from '@/app/components/ShareBox'
import AttentionSection from './components/AttentionSection'
import ShopSection from './components/ShopSection'
import InsuranceSection from '@/app/components/attention/InsuranceSection'
import FaqSection from '@/app/components/attention/FaqSection'
import SummaryChecklist from '@/app/components/SummaryChecklist'
import { insuranceData, faqItems } from './components/data'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = false

const PAGE_TITLE = '中古AirPodsはやめた方がいい？注意点とリスクを8つ解説'
const PAGE_DESCRIPTION =
  '中古AirPodsはやめた方がいい？コピー品・並行輸入品・バッテリー劣化・衛生面・充電端子の違いなど、購入前に確認すべき注意点を8つ解説。失敗しない中古AirPods選びのポイントとおすすめの購入先をまとめました。'
const PAGE_URL = 'https://used-lab.jp/airpods/used-airpods-attention/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/airpods/used-airpods-attention/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/airpods/used-airpods-attention/',
    images: [{ url: getHeroImage('/airpods/used-airpods-attention/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/airpods/used-airpods-attention/')],
  },
}

export default function UsedAirpodsAttentionPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/airpods/used-airpods-attention/page.tsx')

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古AirPods完全購入ガイド', item: 'https://used-lab.jp/airpods' },
      { '@type': 'ListItem', position: 3, name: '中古AirPodsの注意点' },
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
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof item.answer === 'string' ? item.answer : item.question,
      },
    })),
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
            { label: '中古AirPods完全購入ガイド', href: '/airpods/' },
            { label: '中古AirPodsの注意点' },
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
                  中古AirPodsはやめた方がいい？注意点とリスクを8つ解説
                </h1>
                <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp showAuthor />
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image
                    src={getHeroImage('/airpods/used-airpods-attention/')}
                    alt="中古AirPods購入時の注意点イメージ"
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
              <p className="u-mb-md">iPhoneとの連携や音質の高さが魅力のApple AirPodsシリーズ。購入を検討している方の中には下記のようなことを考えている方もいると思います。</p>
              <ul className="m-check-list u-mb-md">
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> 少しでもお手頃に買いたいから中古AirPodsを購入してみようかな？</li>
                <li><i className="fa-solid fa-check" aria-hidden="true"></i> 中古のAirPodsって買っても後悔しない？</li>
              </ul>
              <p>
                結論からいうと、中古AirPodsの購入はコスパの良い選択肢です。ただ、<strong>8つの点に注意しないと買ったことを後悔する可能性</strong>があります。
              </p>
              <p>
                そこで本記事では中古AirPodsを買う前に知りたい注意点を丁寧に解説するのでぜひチェックしてみてください。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古AirPodsの全体像を把握したい方は「<Link href="/airpods/">中古AirPods完全購入ガイド</Link>」をご覧ください。
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
                <a href="#attention" className="toc-item">
                  注意点8つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#shops" className="toc-item">
                  おすすめECサイト <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
              <li>
                <a href="#matome" className="toc-item">
                  まとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#related" className="toc-item">
                  関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
</div>
          </div>
        </nav>
        {/* セクション */}
        <div className="l-sections" id="content" itemProp="articleBody">
          <AttentionSection />
          <ShopSection />
          <InsuranceSection {...insuranceData} />

          {/* まとめ */}
          <section className="l-section" id="matome" aria-labelledby="heading-matome">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-matome">
                中古AirPodsを買う際の注意点 まとめ
              </h2>
              <p className="m-section-desc">
                中古のAirPodsを買うメリットを解説した上で注意すべき点を8つ紹介しました。
              </p>
              <p className="m-section-desc">
                紹介した内容を押さえた上で端末を選べばきっとあなたにピッタリのAirPodsを買うことが可能です。
              </p>

              <SummaryChecklist
                title="購入前に確認すべき8つのポイント"
                items={[
                  { label: 'コピー品', text: 'に注意。シリアル番号をApple公式サイトで確認しましょう。' },
                  { label: '並行輸入品', text: 'は技適マークがなく法令違反になるため避けましょう。' },
                  { label: 'バッテリー劣化', text: 'に注意。購入時期・使用頻度を確認し、ランクの高い商品を選びましょう。' },
                  { label: '衛生面', text: 'が気になる場合はイヤーチップを新品に交換し、本体を清掃しましょう。' },
                  { label: 'アクティベーションロック', text: 'が解除されているか必ず確認しましょう。' },
                  { label: '保険', text: 'はApple Care+に入れないため、モバイル保険などを検討しましょう。' },
                  { label: '充電端子', text: 'はLightningとUSB-Cが混在。今後を考えるとUSB-Cモデルがおすすめです。' },
                  { label: '保証期間', text: 'が長いECサイトを選ぶことで安心して購入できます。' },
                ]}
              />

            </div>
          </section>

          <FaqSection productName="AirPods" faqItems={faqItems} />
          <AirPodsRelatedLinks excludeHref={['/airpods/used-airpods-attention/']} />
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
