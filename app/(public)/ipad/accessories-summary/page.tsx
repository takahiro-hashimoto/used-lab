import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllIPadModels, getAllIPadAccessories, getAllIPadAccessoryCompatibility } from '@/lib/queries'
import { buildAccessoryLookup } from '@/lib/utils/ipad-helpers'
import Breadcrumb from '@/app/components/Breadcrumb'
import KeyboardCompatTable from './components/KeyboardCompatTable'
import KeyboardListSection from './components/KeyboardListSection'
import KeyboardCompareSection from './components/KeyboardCompareSection'
import FaqSection from '@/app/components/support/FaqSection'
import IPadArticleFooter from '@/app/components/ipad/IPadArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 86400

const PAGE_TITLE = 'iPadのキーボードどれが使える？Magic Keyboard全型番と対応モデル一覧'
const PAGE_DESCRIPTION =
  '歴代iPadに対応するMagic Keyboard（マジックキーボード）・Smart Keyboardの型番と対応機種を一覧表で紹介。純正キーボードの互換性やSmart Connector対応モデルが一目でわかります。'
const PAGE_URL = 'https://used-lab.jp/ipad/accessories-summary/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/accessories-summary/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/accessories-summary/',
    images: [{ url: getHeroImage('/ipad/accessories-summary/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/ipad/accessories-summary/')],
  },
}

export default async function AccessoriesSummaryPage() {
  const [allModels, allAccessories, allCompatibility] = await Promise.all([
    getAllIPadModels(),
    getAllIPadAccessories(),
    getAllIPadAccessoryCompatibility(),
  ])
  const accessoryLookup = buildAccessoryLookup(allAccessories, allCompatibility)

  // キーボードアクセサリのみ抽出
  const keyboardAccessories = allAccessories
    .filter((a) => a.type === 'keyboard')
    .sort((a, b) => a.display_order - b.display_order)

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/accessories-summary/page.tsx')

  // シリアライズ: 各モデルに対応キーボード情報を付与
  const serializedKeyboards = keyboardAccessories.map((kb) => ({
    id: kb.id,
    name: kb.name,
    image: kb.image,
    model_number: kb.model_number,
    release_date: kb.release_date,
    iosys_url: kb.iosys_url,
    amazon_url: kb.amazon_url,
  }))

  const serializedModels = allModels.map((m) => {
    const accessories = accessoryLookup.get(m.id) || []
    const keyboards = accessories
      .filter((a) => a.type === 'keyboard')
      .map((kb) => ({
        id: kb.id,
        name: kb.name,
        image: kb.image,
        model_number: kb.model_number,
        release_date: kb.release_date,
        iosys_url: kb.iosys_url,
        amazon_url: kb.amazon_url,
        mercari_url: kb.mercari_url,
      }))

    return {
      id: m.id,
      model: m.model,
      slug: m.slug,
      image: m.image,
      date: m.date,
      size: m.size,
      cpu: m.cpu,
      keyboards,
    }
  })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.jp/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPadのキーボードどれが使える？Magic Keyboard全型番と対応モデル一覧' },
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

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPad完全購入ガイド', href: '/ipad' },
            { label: 'iPadのキーボードどれが使える？Magic Keyboard全型番と対応モデル一覧' },
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
                iPadのキーボードどれが使える？Magic Keyboard全型番と対応モデル一覧
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/ipad/accessories-summary/')}
                  alt="iPadとMagic Keyboardのイメージ"
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
              <p>iPadの純正キーボード（マジックキーボード・スマートキーボード）は種類が多く、モデルやサイズによって互換性が異なるため「このiPadに使えるキーボードはどれ？」と迷いがちです。</p>
              <p>本記事では、Apple純正のiPad用キーボードごとに対応機種と型番（JIS配列）を一覧でまとめました。中古での購入先リンクも掲載しているので、キーボード選びにぜひ活用してください。</p>
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
            <div className="toc-wrapper">
<p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li>
                <a href="#keyboard-compare" className="toc-item">
                  2大 純正キーボード比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#compare-table" className="toc-item">
                  iPad別 マジックキーボード対応表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#keyboard-list" className="toc-item">
                  キーボード別 対応iPadまとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
          <KeyboardCompareSection />
          <KeyboardCompatTable models={serializedModels} keyboardAccessories={serializedKeyboards} />
          <KeyboardListSection models={serializedModels} keyboardAccessories={serializedKeyboards} />

          <FaqSection
            title="iPadのキーボードに関するよくある質問"
            description="iPadのMagic Keyboard・Smart Keyboardについてよくある疑問をまとめました。"
            items={[
              {
                question: 'Magic Keyboard（マジックキーボード）とは？どんな機能がある？',
                answer: 'Magic KeyboardはApple純正のiPad用キーボードで、トラックパッドを搭載しているのが最大の特徴です。Smart Connector経由でiPadと接続するため、Bluetoothのペアリングや充電は不要。\nフローティングカンチレバーデザインにより、画面の角度を自由に調整できます。iPad Air・iPad Proシリーズに対応しています。',
              },
              {
                question: 'Magic Keyboard FolioとMagic Keyboardの違いは何？',
                answer: 'Magic Keyboard Folioは無印iPad（第10世代・第11世代）専用のキーボードで、キーボード部分とスタンド部分が分離するデザインです。\nMagic KeyboardはiPad Air・iPad Pro向けで、フローティングカンチレバーデザインを採用しています。対応モデルが異なるため、お持ちのiPadに合わせて選びましょう。',
              },
              {
                question: 'iPadのキーボードのサイズ（11インチ・13インチ）は互換性がある？',
                answer: 'iPadのキーボードはサイズごとに専用設計されているため、11インチ用と13インチ用に互換性はありません。購入時は必ず型番を確認し、お持ちのiPadのサイズに合ったキーボードを選んでください。',
              },
              {
                question: 'iPad miniに対応するApple純正キーボードはある？',
                answer: 'iPad miniにはApple純正のキーボードアクセサリは用意されていません。iPad miniでキーボードを使いたい場合は、Bluetooth接続のサードパーティ製キーボードを利用する方法があります。',
              },
              {
                question: '中古のMagic Keyboardを購入する際の注意点は？',
                answer: '中古のMagic Keyboard（マジックキーボード）を購入する際は、型番を確認して自分のiPadに対応しているかを必ずチェックしましょう。JIS配列かUS配列かも要確認です。\nまた、キーの反応やトラックパッドの動作、充電端子の状態、本体の折り曲げ部分のヘタリなども確認ポイントです。信頼できる中古ショップでの購入をおすすめします。',
              },
              {
                question: 'iPadにはキーボード以外にどんなアクセサリがある？',
                answer: 'キーボードのほかに、Apple Pencilも代表的なiPadアクセサリです。Apple Pencilは手書きメモ、イラスト制作、PDFへの注釈など幅広い用途に活用できます。\n現在4つのモデルが販売されており、対応iPadや機能（筆圧感知・傾き検知など）がそれぞれ異なります。各モデルの違いや選び方は「Apple Pencilの違いを比較（https://used-lab.jp/ipad/apple-pencil-compare/）」で詳しく解説しています。',
              },
            ]}
          />



        </div>
      </article>
    </main>
    <IPadArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/ipad/accessories-summary/", "/ipad/recommend/"]} />
    </>
  )
}
