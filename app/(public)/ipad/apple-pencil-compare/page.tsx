import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIPadModels, getAllProductShopLinksByType, getAllIPadAccessories, getAllIPadAccessoryCompatibility } from '@/lib/queries'
import { buildAccessoryLookup, getPencilTextFromAccessories } from '@/lib/utils/ipad-helpers'
import Breadcrumb from '@/app/components/Breadcrumb'
import PencilCompatTable from './components/PencilCompatTable'
import PencilSpecTable from './components/PencilSpecTable'
import PencilDetailSection from './components/PencilDetailSection'
import PencilGuideSection from './components/PencilGuideSection'
import FaqSection from '@/app/components/support/FaqSection'
import IPadArticleFooter from '@/app/components/ipad/IPadArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 86400

const PAGE_TITLE = 'Apple Pencilの違いを比較！あなたにぴったりのアップルペンシルがわかる'
const PAGE_DESCRIPTION =
  'Apple Pencil Pro・第2世代・第1世代・USB-Cの違いを徹底比較。機能・対応iPad・価格の違いを一覧表で解説し、あなたの用途に合ったApple Pencilの選び方をわかりやすく紹介します。'
const PAGE_URL = 'https://used-lab.jp/ipad/apple-pencil-compare/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/apple-pencil-compare/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/apple-pencil-compare/',
    images: [{ url: getHeroImage('/ipad/apple-pencil-compare/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/ipad/apple-pencil-compare/')],
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

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/apple-pencil-compare/page.tsx')

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
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.jp/ipad' },
      { '@type': 'ListItem', position: 3, name: 'Apple Pencilの違いを比較' },
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
            { label: '中古iPad完全購入ガイド', href: '/ipad/' },
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
                Apple Pencilの違いを比較！あなたにぴったりのアップルペンシルがわかる
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/ipad/apple-pencil-compare/')}
                  alt="Apple Pencilの比較イメージ"
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
              <p>iPadの強力な武器といえば、紙に近い書き心地で文字やイラストが書けるApple Pencilの存在。4つのApple Pencilが販売されており、それぞれできることに差があります。</p>
              <p>そこで本記事では4つのApple Pencilの違いや各Apple Pencilの対応機種などの情報をまとめました。Apple Pencilの違いにお悩みの方はぜひチェックしてみてください！</p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<Link href="/ipad/">中古iPad購入ガイド</Link>」をご覧ください。
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
          <PencilCompatTable models={serializedModels} shopLinks={serializedLinks} />
          <PencilSpecTable />
          <PencilDetailSection />
          <PencilGuideSection />

          <FaqSection
            title="Apple Pencilに関するよくある質問"
            description="Apple Pencilの違いについてよくある疑問をまとめました。"
            items={[
              {
                question: 'Apple Pencil ProとApple Pencil 第2世代の違いは何？',
                answer: 'Apple Pencil Proには下記の機能が搭載されていますが、Apple Pencil 第2世代には非搭載です。\nスクイーズ（ペンを握り込む動作でツールパレットを呼び出す機能）、バレルロール（ペンを回転させてブラシの向きを制御する機能）、触覚フィードバック（操作時に軽い振動で反応を返す機能）、「探す」機能（Apple Pencilの場所を追跡できる機能）。',
              },
              {
                question: 'Apple Pencil 第2世代とApple Pencil（USB-C）の違いは何？',
                answer: 'Apple Pencil 第2世代は以下の機能が搭載されていますが、Apple Pencil（USB-C）には非搭載です。\n筆圧感知（軽いタッチから強いタッチまで、筆圧を正確に検知する機能）、ダブルタップ（ペンや消しゴムなどのツールをすばやく切り替える機能）、ワイヤレス充電・ペアリング（iPadの側面にマグネットで吸着させるだけで充電とペアリングを行う機能）。',
              },
              {
                question: 'Apple Pencil 第2世代とApple Pencil 第1世代の違いは何？',
                answer: 'Apple Pencil 第2世代は以下の機能が搭載されていますが、Apple Pencil（第1世代）には非搭載です。\nワイヤレス充電・ペアリング（iPadの側面にマグネットで吸着させるだけで、充電とペアリングを自動で行う機能）、ダブルタップ（ペンの側面を指でトントンと叩くだけで、ペンと消しゴムなどのツールをすばやく切り替える機能）、マグネットによる吸着保管（iPadの側面に磁力で固定して持ち運べる機能）。',
              },
              {
                question: 'Apple Pencilのペン先（チップ）は交換できる？寿命の目安は？',
                answer: 'はい、すべてのApple Pencilのペン先は交換可能です。Apple純正の替え芯（4個入り・約3,000円前後）のほか、サードパーティ製のペン先も販売されています。\nペン先の寿命は使用頻度によりますが、毎日使う方で半年〜1年、たまに使う方で1〜2年が交換の目安です。\nペン先が摩耗すると書き心地が悪くなるだけでなく、iPadの画面を傷つけるリスクもあるため、先端がすり減ってきたら早めの交換をおすすめします。',
              },
              {
                question: 'Apple Pencilのバッテリー寿命はどのくらい？',
                answer: 'Apple Pencilのバッテリー寿命は一般的に3〜5年程度です。1回の充電で約12時間使用でき、15秒の急速充電で約30分間使えます。\nただし、バッテリー残量0%のまま長期間放置すると「過放電」により充電できなくなることがあるため、定期的に充電することが重要です。\nApple Pencilはバッテリー交換ができない構造のため、バッテリーの寿命＝製品の寿命となる点に注意してください。',
              },
              {
                question: '中古のApple Pencilを買う際の注意点は？',
                answer: '中古Apple Pencilを購入する際は、まずバッテリーの状態を確認することが最も重要です。過放電で充電不能になっている個体もあるため、「動作確認済み」と明記された商品を選びましょう。\nまた、ペン先の摩耗具合、筆圧感知や傾き検知が正常に動作するか、ペアリングが問題なくできるかも確認ポイントです。フリマアプリより、保証付きの中古専門店での購入が安心です。',
              },
              {
                question: 'Apple Pencilの代わりになるサードパーティ製スタイラスペンはある？',
                answer: 'はい、iPad対応のサードパーティ製スタイラスペンは多数販売されており、傾き検知やパームリジェクション（手を画面に置いても誤反応しない機能）に対応した製品もあります。ただし、筆圧感知はApple Pencil独自の技術のため、互換ペンでは非対応です。\nイラスト制作など筆圧を活かした作業にはApple Pencilが必須ですが、メモ書きやPDF注釈が中心であれば互換ペンでも十分実用的です。',
              },
              {
                question: 'Apple Pencilの書き心地や遅延（レイテンシー）に違いはある？',
                answer: 'Apple Pencil Proと第2世代はどちらも非常に低遅延で、紙に書いているような自然な書き心地です。Apple Pencil（USB-C）は筆圧感知非対応のため、筆圧による線の太さ変化が出ない点で書き心地に差があります。\n第1世代も筆圧・傾き検知に対応していますが、Lightningコネクタでの充電が必要で取り回しに差があります。ProMotion対応iPad（120Hz）と組み合わせると、さらに滑らかな描画体験が得られます。',
              },
              {
                question: 'Apple Pencilの価格はいくら？モデル別の定価を知りたい',
                answer: 'Apple Pencilの定価はモデルにより異なります。Apple Pencil Pro：21,800円（税込）、Apple Pencil 第2世代：21,800円（税込）、Apple Pencil（USB-C）：13,800円（税込）、Apple Pencil 第1世代：16,800円（税込）です。\nUSB-Cモデルが最も安く、筆圧感知が不要な方にとってはコストパフォーマンスに優れた選択肢です。中古市場ではさらにお得に購入できる場合があります。',
              },
              {
                question: 'iPadにはApple Pencil以外にどんなアクセサリがある？',
                answer: 'Apple PencilのほかにiPadの活用の幅を広げるアクセサリとして、Magic KeyboardやSmart Keyboard Folioなどの純正キーボードがあります。\nキーボードを使えばiPadをノートパソコンのように活用でき、文字入力や資料作成が格段に快適になります。各iPadに対応するキーボードの型番や互換性は「歴代iPadのMagic Keyboard 型番一覧（https://used-lab.jp/ipad/accessories-summary/）」で確認できます。',
              },
            ]}
          />



        </div>
      </article>
    </main>
    <IPadArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref={["/ipad/apple-pencil-compare/", "/ipad/recommend/"]} />
    </>
  )
}
