import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import MacArticleFooter from '@/app/components/mac/MacArticleFooter'
import HeroMeta from '@/app/components/HeroMeta'
import GuideModelLinks from '@/app/components/GuideModelLinks'
import {
  getAllMacModels,
  getAllProductShopLinksByType,
  getShops,
  getLatestMacPriceLogWithPrices,
} from '@/lib/queries'
import type { MacModel } from '@/lib/types'
import { buildArticleJsonLd, buildRecommendItemListJsonLd, getGitDateForFile, buildFallbackShops } from '@/lib/utils/shared-helpers'
import { getHeroImage } from '@/lib/data/hero-images'
import { RECOMMEND_SLUGS, RECOMMEND_META, FAQ_ITEMS, SHOP_SECTION_IDS, GUIDE_DATE_LABEL } from '@/lib/data/mac-recommend'
import RecommendDetailSection from './recommend/components/RecommendDetailSection'
import CompareTableSection from './recommend/components/CompareTableSection'

export const revalidate = false

const PAGE_TITLE = '中古iMac・Mac miniおすすめ機種｜失敗しない選び方ガイド'
const PAGE_DESCRIPTION =
  '中古のiMac・Mac miniを用途別に比較。ディスプレイが要るかどうか、メモリは何GB必要かなど、中古で選ぶときの判断材料をまとめました。最新の中古相場も掲載しています。'
const PAGE_URL = 'https://used-lab.jp/mac/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/mac/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/mac/',
    images: [{ url: getHeroImage('/mac/'), width: 1200, height: 630, alt: '中古iMac・Mac miniおすすめ機種のイメージ' }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/mac/')],
  },
}

export default async function MacGuidePage() {
  const [allModels, allShopLinks, shops] = await Promise.all([
    getAllMacModels(),
    getAllProductShopLinksByType('mac'),
    getShops(),
  ])

  // 機種画像は public/images/mac/ に配置中。実ファイルが無いまま image を渡すと
  // next/image が 500 を出すため、存在しないものは null にしてプレースホルダーへ倒す
  // （画像を置けばコードを触らずに切り替わる）
  const withExistingImage = (m: MacModel): MacModel =>
    m.image && !existsSync(join(process.cwd(), 'public', 'images', 'mac', m.image))
      ? { ...m, image: null }
      : m

  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is MacModel => m != null)
    .map(withExistingImage)

  const recommendPrices = await Promise.all(
    recommendModels.map((m) => getLatestMacPriceLogWithPrices(m.id)),
  )
  // mac_url 未設定のショップは macbook_url にフォールバックする
  const fallbackShops = buildFallbackShops(shops, SHOP_SECTION_IDS, 'mac_url')

  // 並び順は RECOMMEND_SLUGS のとおり（前半2機種がiMac、後半2機種がMac mini）
  const detailItems = recommendModels.map((model, i) => {
    const meta = RECOMMEND_META[model.slug]
    return {
      model,
      latestPrice: recommendPrices[i],
      updatedDateStr: recommendPrices[i]?.logged_at?.substring(0, 10) ?? '',
      shopLinks: allShopLinks.filter((l) => l.product_id === model.id),
      fallbackShops,
      subtitle: meta?.subtitle || '',
      description: meta?.description || [],
      good: meta?.good || [],
      bad: meta?.bad || [],
    }
  })

  const compareItems = recommendModels.map((model, i) => {
    const meta = RECOMMEND_META[model.slug]
    return {
      model,
      latestPrice: recommendPrices[i],
      chipLabel: meta?.chipLabel || '-',
      displayLabel: meta?.displayLabel || '-',
      memoryLabel: meta?.memoryLabel || '-',
      targetUser: meta?.targetUser || '-',
    }
  })

  // 個別機種リンク。DBの mac_models から組み立てるので、機種を足せば自動で増える
  const toMeta = (date: string | null) => {
    if (!date) return ''
    const [y, m] = date.split('/')
    return m ? `${y}年${Number(m)}月発売` : `${y}年発売`
  }
  const modelLinkCategories = (
    [
      ['iMac', 'imac'],
      ['Mac mini', 'mac-mini'],
      ['Mac Studio', 'mac-studio'],
    ] as const
  ).map(([label, type]) => ({
    label,
    items: allModels
      .filter((m) => m.device_type === type)
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
      .map((m) => ({ slug: m.slug, name: m.shortname || m.model, meta: toMeta(m.date) })),
  })).filter((c) => c.items.length > 0)

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/mac/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iMac・Mac miniおすすめ機種' },
    ],
  }

  const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    dateModified: dateStr,
    url: PAGE_URL,
  })

  // 価格は Product/Offer では出さない（販売者ではないため）
  const recommendListJsonLd = buildRecommendItemListJsonLd({
    name: '中古iMac・Mac miniおすすめ機種',
    items: recommendModels.map((m) => ({ name: m.model, url: `https://used-lab.jp/mac/${m.slug}/` })),
  })

  // FAQ の JSON-LD は FaqSection が自前で出すので、ここでは組み立てない
  // （両方出すと1ページに FAQPage が2つ載る）

  return (
    <>
    <main>
      <article itemScope itemType="https://schema.org/Article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recommendListJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        <div className="hero-wrapper">
        <Breadcrumb items={[{ label: '中古iMac・Mac miniおすすめ機種' }]} />

        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title" itemProp="headline">
                中古iMac・Mac miniおすすめ機種｜失敗しない選び方ガイド
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp showAuthor />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/mac/')}
                  alt="中古iMac・Mac miniおすすめ機種のイメージ"
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
              <p>Apple製品の値上がりや円安の影響で、新品のiMacやMac miniは以前より手が出しづらくなってきましたよね…。</p>
              <p>そこで賢い選択肢になるのが<strong>「中古のiMac・Mac mini」</strong>です。</p>
              <p>AppleのMシリーズチップが登場して以降、Macの性能は飛躍的に向上しました。そのため少し前の型落ちモデルでも、書類作成や動画視聴はもちろん、写真編集や動画の書き出しまで快適にこなせて、価格もぐっとお手頃。</p>
              <p>さらに、据え置きで使うデスクトップは<strong>バッテリーの劣化がありません</strong>。中古で最大の不安要素がそもそも存在しないのも大きな利点です。</p>
              <p>本記事では{GUIDE_DATE_LABEL}時点でのおすすめ機種をご紹介します。</p>
              <p>記事後半には、安く出回っているIntel搭載iMacを買っていいのかの判断材料や、中古で失敗しないためのチェックポイントも用意しているので、ぜひチェックしてみてください！</p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
              <p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
              <ol className="l-grid l-grid--3col u-list-reset">
                <li><a href="#compare" className="toc-item">スペック比較表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                <li><a href="#detail" className="toc-item">おすすめ4機種の詳細 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                <li><a href="#intel" className="toc-item">Intel iMacは買っていいか <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                <li><a href="#attention" className="toc-item">中古で選ぶ注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                <li><a href="#models" className="toc-item">個別機種リンク <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
                <li><a href="#related" className="toc-item">関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              </ol>
            </div>
          </div>
        </nav>

        <div className="l-sections">

        {/* おすすめ機種。iMac 2機種 → Mac mini 2機種の順で1つのセクションにまとめる */}
        <CompareTableSection
          items={compareItems}
          descriptions={[
            <>おすすめする4機種の主要スペックを一覧にしました。前半2機種がiMac、後半2機種がMac miniです。</>,
            <>モニターを持っていないならiMac、持っているならMac miniが基本の選び方になります。</>,
          ]}
        />
        <RecommendDetailSection
          sectionId="detail"
          heading="中古iMac・Mac miniおすすめ4機種の詳細解説"
          lead="前半2機種がiMac、後半2機種がMac miniです。それぞれ現行世代と、価格が下がった1つ前の世代を並べています。"
          items={detailItems}
          showPriceNote
        />

        {/* Intel iMac の注意喚起。中古の安いiMacの多くがこれに当たるが、
            DBはApple Silicon機のみなので個別記事へは送らず、ここで完結させる */}
        <section className="l-section" id="intel" aria-labelledby="heading-intel">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-intel">
              数万円で売られているIntel iMacは買っていいのか
            </h2>
            <p className="m-section-desc">
              中古のiMacを探すと、ここまで紹介したApple Silicon機よりずっと安い個体が大量に出てきます。その多くがIntel搭載の21.5インチ／27インチ（2017〜2020年）です。
            </p>
            <div className="l-grid l-grid--3col u-list-reset">
              <div className="m-card m-card--shadow m-card--padded post-check-item">
                <h3 className="post-check-item__heading"><i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i> 新しいmacOSはもう来ない</h3>
                <p className="post-check-item__desc">
                  <strong>macOS Tahoe 26がIntel搭載Macに対応する最後のmacOS</strong>です。macOS 27以降はApple Silicon専用になります。
                  これから中古で買っても、新しいmacOSが1つも来ないまま使い切ることになります。
                </p>
              </div>
              <div className="m-card m-card--shadow m-card--padded post-check-item">
                <h3 className="post-check-item__heading"><i className="fa-solid fa-calendar-xmark" aria-hidden="true"></i> Tahoeに上がれるのは2020年モデルだけ</h3>
                <p className="post-check-item__desc">
                  iMacのうちTahoeに対応するのは27インチの2020年モデルのみです。2019年以前のモデルはそれより前のバージョンで止まっています。
                  セキュリティアップデートもTahoeのリリースからおよそ3年で終わる見込みです。
                </p>
              </div>
              <div className="m-card m-card--shadow m-card--padded post-check-item">
                <h3 className="post-check-item__heading"><i className="fa-solid fa-circle-check" aria-hidden="true"></i> 割り切れるなら選択肢になる</h3>
                <p className="post-check-item__desc">
                  ブラウザと書類作成だけを1〜2年、という使い方なら価格差の魅力は本物です。
                  ただ、Apple Silicon搭載のiMacは2021年モデルでもまだ数年の余裕があります。
                  <strong>長く使うつもりなら、多少高くてもM1以降を選んでください</strong>。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="l-section" id="attention" aria-labelledby="heading-attention">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-attention">
              中古のiMac・Mac miniで失敗しないための3点
            </h2>
            <div className="l-grid l-grid--3col u-list-reset">
              <div className="m-card m-card--shadow m-card--padded post-check-item">
                    <h3 className="post-check-item__heading"><i className="fa-solid fa-memory" aria-hidden="true"></i> メモリは増設できない</h3>
                  <p className="post-check-item__desc">
                    Macのメモリはチップに統合されていて、購入後に増やせません。
                    Mac miniもiMacも2023年モデルまでは8GBが標準で、中古に出回っている個体の多くが8GBです。
                    長く使うなら、世代を1つ上げるより<strong>16GB以上の個体を選ぶほう</strong>が快適です。
                  </p>
                </div>
              <div className="m-card m-card--shadow m-card--padded post-check-item">
                    <h3 className="post-check-item__heading"><i className="fa-solid fa-hard-drive" aria-hidden="true"></i> ストレージも同じ</h3>
                  <p className="post-check-item__desc">
                    SSDも交換できません。256GBの個体は、写真や動画を扱うとすぐに足りなくなります。
                    外付けSSDで補う前提なら256GBでも運用できますが、常時接続するケーブルが増える点は考慮してください。
                  </p>
                </div>
              <div className="m-card m-card--shadow m-card--padded post-check-item">
                    <h3 className="post-check-item__heading"><i className="fa-solid fa-plug" aria-hidden="true"></i> 付属品の有無を確認</h3>
                  <p className="post-check-item__desc">
                    iMacはMagic KeyboardとMagic Mouseが同梱される製品ですが、
                    中古では欠品していることがあります。別途買うと出費が増えるので、
                    商品説明で付属品を必ず確認してください。
                  </p>
                </div>
            </div>
          </div>
        </section>

        {/* 個別機種リンク */}
        <section className="l-section" id="models" aria-labelledby="heading-models">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-models">
              歴代iMac・Mac mini・Mac Studio 個別記事リンク集
            </h2>
            <p className="m-section-desc">
              各モデルの詳細スペック、中古相場、購入時の注意点を個別にまとめています。
            </p>
            <GuideModelLinks basePath="/mac" categories={modelLinkCategories} />
          </div>
        </section>

        <FaqSection
          title="中古iMac・Mac miniのよくある質問"
          description="中古でiMac・Mac miniを検討している方から多い質問をまとめました。"
          items={FAQ_ITEMS}
        />

        </div>
      </article>
    </main>
    <MacArticleFooter
      pageUrl={PAGE_URL}
      pageTitle={PAGE_TITLE}
      excludeHref={["/mac/"]}
    />
    </>
  )
}
