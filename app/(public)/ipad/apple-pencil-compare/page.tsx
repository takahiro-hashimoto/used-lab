import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllIPadModels, getAllProductShopLinksByType, getAllIPadAccessories, getAllIPadAccessoryCompatibility } from '@/lib/queries'
import { buildAccessoryLookup, getPencilTextFromAccessories } from '@/lib/utils/ipad-helpers'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import PencilCompatTable from './components/PencilCompatTable'
import PencilSpecTable from './components/PencilSpecTable'
import PencilDetailSection from './components/PencilDetailSection'
import PencilGuideSection from './components/PencilGuideSection'
import FaqSection from '@/app/components/support/FaqSection'

const PAGE_TITLE = 'Apple Pencilの違いを比較！あなたにぴったりのアップルペンシルがわかる'
const PAGE_DESCRIPTION =
  'Apple Pencil Pro・第2世代・第1世代・USB-Cの違いを徹底比較。機能・対応iPad・価格の違いを一覧表で解説し、あなたの用途に合ったApple Pencilの選び方をわかりやすく紹介します。'
const PAGE_URL = 'https://used-lab.com/ipad/apple-pencil-compare/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/ipad/apple-pencil-compare/',
    images: [{ url: '/images/ipad/ipad-pro-13-2.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/ipad/ipad-pro-13-2.jpg'],
  },
}

export default async function ApplePencilComparePage() {
  const [allModels, allShopLinks, allAccessories, allCompatibility] = await Promise.all([
    getAllIPadModels(),
    getAllProductShopLinksByType('ipad'),
    getAllIPadAccessories(),
    getAllIPadAccessoryCompatibility(),
  ])
  const accessoryLookup = buildAccessoryLookup(allAccessories, allCompatibility)

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  const serializedModels = allModels.map((m) => ({
    id: m.id,
    model: m.model,
    slug: m.slug,
    image: m.image,
    date: m.date,
    size: m.size,
    cpu: m.cpu,
    pencil: getPencilTextFromAccessories(accessoryLookup.get(m.id) || []),
  }))

  const serializedLinks = allShopLinks.map((l) => ({
    product_type: l.product_type,
    product_id: l.product_id,
    shop_id: l.shop_id,
    url: l.url,
  }))

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: 'Apple Pencilの違いを比較' },
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
            { label: '中古iPad完全ガイド', href: '/ipad' },
            { label: 'Apple Pencilの違いを比較' },
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
                Apple Pencilの違いを比較！<br className="sp-only" />あなたにぴったりの<br className="sp-only" />アップルペンシルがわかる
              </h1>
              <p className="hero-description" itemProp="description">
                Pro・第2世代・USB-C・第1世代の機能差・対応iPad・価格を一覧比較して、あなたに最適な1本を見つけよう
              </p>
              <div className="hero-actions">
                <a href="#compare-table" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-table" aria-hidden="true"></i>
                  <span>比較表を見る</span>
                </a>
                <a href="#content" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-pen-nib" aria-hidden="true"></i>
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
                  src="/images/ipad/ipad-pro-13-2.jpg"
                  alt="Apple Pencilの比較イメージ"
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
              <p>iPadの強力な武器といえば、紙に近い書き心地で文字やイラストが書けるApple Pencilの存在。4つのApple Pencilが販売されており、それぞれできることに差があります。</p>
              <p>そこで本記事では4つのApple Pencilの違いや各Apple Pencilの対応機種などの情報をまとめました。Apple Pencilの違いにお悩みの方はぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<a href="/ipad">中古iPad購入ガイド</a>」をご覧ください。
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
                <a href="#compare-table" className="toc-item">
                  対応機種一覧表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pencil-spec" className="toc-item">
                  スペック比較表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pencil-detail" className="toc-item">
                  違い・機能解説 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#pencil-guide" className="toc-item">
                  選び方ガイド <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
          <PencilCompatTable models={serializedModels} shopLinks={serializedLinks} />
          <PencilSpecTable />
          <PencilDetailSection />
          <PencilGuideSection />

          {/* 目的別に人気の中古iPad */}
          <section className="l-section l-section--bg-subtle" id="popular" aria-labelledby="heading-popular">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">目的別に人気の中古iPad</h2>
              <p className="m-section-desc">目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。</p>
              <div className="m-card m-card--shadow popular-card">
                <figure className="popular-card-figure">
                  <Image
                    alt="中古iPadおすすめ5選のイメージ画像"
                    loading="lazy"
                    width={400}
                    height={500}
                    className="popular-card-img"
                    src="/images/content/ipad-setting.webp"
                  />
                </figure>
                <div className="popular-card-body">
                  <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                  <p className="popular-card-title">中古iPadおすすめ5選</p>
                  <p className="popular-card-desc">動画視聴やイラスト制作を重視する人向け、大画面で作業したい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。</p>
                  <div>
                    <a className="m-btn m-btn--primary" href="/ipad/recommend">
                      おすすめ5機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FaqSection
            title="Apple Pencilに関するよくある質問"
            description="Apple Pencilの違いについてよくある疑問をまとめました。"
            items={[
              {
                question: 'Apple Pencil ProとApple Pencil 第2世代の違いは何？',
                answer: 'Apple Pencil Proには下記の機能が搭載されていますが、Apple Pencil 第2世代には非搭載です。スクイーズ（ペンを握り込む動作でツールパレットを呼び出す機能）、バレルロール（ペンを回転させてブラシの向きを制御する機能）、触覚フィードバック（操作時に軽い振動で反応を返す機能）、「探す」機能（Apple Pencilの場所を追跡できる機能）。',
              },
              {
                question: 'Apple Pencil 第2世代とApple Pencil（USB-C）の違いは何？',
                answer: 'Apple Pencil 第2世代は以下の機能が搭載されていますが、Apple Pencil（USB-C）には非搭載です。筆圧感知（軽いタッチから強いタッチまで、筆圧を正確に検知する機能）、ダブルタップ（ペンや消しゴムなどのツールをすばやく切り替える機能）、ワイヤレス充電・ペアリング（iPadの側面にマグネットで吸着させるだけで充電とペアリングを行う機能）。',
              },
              {
                question: 'Apple Pencil 第2世代とApple Pencil 第1世代の違いは何？',
                answer: 'Apple Pencil 第2世代は以下の機能が搭載されていますが、Apple Pencil（第1世代）には非搭載です。ワイヤレス充電・ペアリング（iPadの側面にマグネットで吸着させるだけで、充電とペアリングを自動で行う機能）、ダブルタップ（ペンの側面を指でトントンと叩くだけで、ペンと消しゴムなどのツールをすばやく切り替える機能）、マグネットによる吸着保管（iPadの側面に磁力で固定して持ち運べる機能）。',
              },
              {
                question: 'Apple Pencilのペン先（チップ）は交換できる？',
                answer: 'はい、すべてのApple Pencilのペン先は交換可能です。Apple純正の替え芯のほか、サードパーティ製のペン先も販売されています。ペン先は使い続けると摩耗するため、書き心地が変わってきたら交換をおすすめします。',
              },
            ]}
          />

        </div>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
