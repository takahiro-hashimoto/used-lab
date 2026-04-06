import type { Metadata } from 'next'
import Image from 'next/image'
import {
  getAllMacBookModels,
  getAllMacBookModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getLatestMacBookPriceLog,
} from '@/lib/queries'
import type { MacBookModel, MacBookPriceLog } from '@/lib/types'
import { buildFallbackShops, buildBreadcrumbJsonLd, buildArticleJsonLd, buildFaqJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import {
  RECOMMEND_DATE_LABEL,
  RECOMMEND_YEAR,
  RECOMMEND_SLUGS,
  RECOMMEND_COUNT,
  RECOMMEND_COUNT_LABEL,
  RECOMMEND_META,
  SHOP_SECTION_IDS,
  FAQ_JSONLD_ITEMS,
} from '@/lib/data/macbook-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import ConclusionSection from '@/app/components/ConclusionSection'
import CriteriaSection from '@/app/components/CriteriaSection'
import RecommendDetailSection from './components/RecommendDetailSection'
import CompareTableSection from './components/CompareTableSection'
import ChecklistSection from '@/app/components/ChecklistSection'
import ShopSection from '@/app/components/ShopSection'
import MacBookFaqSection from './components/MacBookFaqSection'
import MacBookRelatedLinks from '@/app/components/macbook/MacBookRelatedLinks'
import dynamic from 'next/dynamic'

const ValueZoneChart = dynamic(() => import('@/app/components/ValueZoneChart'), {
  loading: () => <div style={{ height: '300px' }} />,
})
import AuthorByline from '@/app/components/AuthorByline'
import { getHeroImage } from '@/lib/data/hero-images'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 3600

const PAGE_TITLE = `中古MacBookおすすめ${RECOMMEND_COUNT}機種を解説。狙い目の型落ちモデルはどれ？【${RECOMMEND_DATE_LABEL}版】`
const PAGE_DESCRIPTION =
  `${RECOMMEND_DATE_LABEL}現在、中古MacBookのおすすめ${RECOMMEND_COUNT}機種を目的別に解説。macOSサポート期間・性能・価格のバランスが良いモデルだけを厳選しました。`
const PAGE_URL = 'https://used-lab.jp/macbook/recommend/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/recommend/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/recommend/',
    images: [{ url: getHeroImage('/macbook/recommend/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/macbook/recommend/')],
  },
}

export default async function MacBookRecommendPage() {
  const [allModels, allModelsIncludingEnded, shops, allShopLinks] = await Promise.all([
    getAllMacBookModels(),
    getAllMacBookModelsIncludingEnded(),
    getShops(),
    getAllProductShopLinksByType('macbook'),
  ])

  // おすすめモデルを抽出
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is MacBookModel => m != null)

  // 各モデルの最新価格を並列取得
  const latestPrices = await Promise.all(
    recommendModels.map((m) => getLatestMacBookPriceLog(m.id))
  )

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/recommend/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
    { name: '中古MacBook完全購入ガイド', item: 'https://used-lab.jp/macbook' },
    { name: `中古MacBookおすすめ${RECOMMEND_COUNT}選` },
  ])
  const articleJsonLd = buildArticleJsonLd({ headline: PAGE_TITLE, description: PAGE_DESCRIPTION, dateStr, url: PAGE_URL })
  const faqJsonLd = buildFaqJsonLd(FAQ_JSONLD_ITEMS)

  // ConclusionSection用データ（最安価格を動的に付与）
  const conclusionItems = recommendModels.map((model, i) => {
    const price = latestPrices[i]
    const minPrice = price?.min1_price
    const storageLabel = model.strage?.match(/(\d+(?:GB|TB))/)?.[1] || ''
    return {
      id: model.id,
      slug: model.slug,
      displayName: model.shortname || model.model,
      image: model.image,
      date: model.date,
      desc: RECOMMEND_META[model.slug]?.desc || '',
      priceLabel: minPrice ? `¥${minPrice.toLocaleString()}〜` : undefined,
      storageLabel: storageLabel || undefined,
    }
  })

  const fallbackShops = buildFallbackShops(shops, SHOP_SECTION_IDS, 'macbook_url')

  // RecommendDetailSection用データ
  const detailItems = recommendModels.map((model, i) => {
    const meta = RECOMMEND_META[model.slug]
    const modelShopLinks = allShopLinks.filter((l) => l.product_id === model.id)
    return {
      model,
      latestPrice: latestPrices[i],
      shopLinks: modelShopLinks,
      fallbackShops,
      label: meta?.label || '',
      subtitle: meta?.subtitle || '',
      description: meta?.description || [],
      good: meta?.good || [],
      bad: meta?.bad || [],
    }
  })

  // CompareTableSection用データ
  const compareItems = recommendModels.map((model, i) => {
    const meta = RECOMMEND_META[model.slug]
    const modelShopLinks = allShopLinks.filter((l) => l.product_id === model.id)
    return {
      model,
      latestPrice: latestPrices[i],
      shopLinks: modelShopLinks,
      chipLabel: meta?.chipLabel || '-',
      batteryLabel: meta?.batteryLabel || '-',
      targetUser: meta?.targetUser || '-',
    }
  })

  // ShopSection用データ（shopsテーブルのmacbook_urlから取得）
  const shopItems = SHOP_SECTION_IDS
    .map((shopId) => {
      const shop = shops.find((s) => s.id === shopId)
      if (!shop || !shop.macbook_url) return null
      return { shop, url: shop.macbook_url }
    })
    .filter((item): item is { shop: (typeof shops)[number]; url: string } => item != null)

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
            { label: '中古MacBook完全購入ガイド', href: '/macbook' },
            { label: `中古MacBookおすすめ${RECOMMEND_COUNT}選` },
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
                {PAGE_TITLE}
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/macbook/recommend/')}
                  alt={`中古MacBookおすすめ${RECOMMEND_COUNT}選のイメージ`}
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
              <p>「中古MacBookって、結局どれを選べばいいの？」</p>
              <p>
                {RECOMMEND_DATE_LABEL}現在、Appleシリコン搭載モデルの選択肢は豊富ですが、macOSサポート期間・性能・価格のバランスを
                考えると、おすすめできる機種は意外と限られています。
              </p>
              <p>
                この記事では、今買っても後悔しない中古MacBook {RECOMMEND_COUNT}機種を厳選し、それぞれの特徴と向いている人を
                詳しく解説します。
              </p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> もっと全体像から知りたい方は「<a href="/macbook/">中古MacBook購入ガイド</a>」をご覧ください。</p>
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
                  <a href="#conclusion" className="toc-item">
                    結論：選ぶべき{RECOMMEND_COUNT_LABEL} <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#criteria" className="toc-item">
                    選んだ判断基準 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#value-zone" className="toc-item">
                    お得ゾーンとは？ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#detail" className="toc-item">
                    おすすめ{RECOMMEND_COUNT_LABEL}の詳細 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#compare" className="toc-item">
                    スペック比較表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="toc-item">
                    購入前の最終チェック <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#shops" className="toc-item">
                    おすすめショップ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#related" className="toc-item">
                    関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </li>
              </ol>
            </div>
            <AuthorByline />
          </div>
        </nav>

        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">
          <ConclusionSection
            items={conclusionItems}
            heading={<>【結論】{RECOMMEND_YEAR}年現在のおすすめ中古MacBook{RECOMMEND_COUNT}機種</>}
            descriptions={[
              <>迷っているなら、まずはこの{RECOMMEND_COUNT}機種から選べば大きな失敗はありません。</>,
              <>{RECOMMEND_YEAR}年時点で「macOSサポートが十分に残っている」「中古価格と性能のバランスが良い」モデルだけに絞っています。</>,
            ]}
            gridCols="4col"
            imagePath="macbook"
            placeholderText="MacBook"
          />
          <CriteriaSection
            recommendCount={RECOMMEND_COUNT}
            recommendCountLabel={RECOMMEND_COUNT_LABEL}
            descriptions={[
              '中古MacBookを選ぶなら、「長く使えるか」「快適に動くか」「価格に見合っているか」の3つが重要。',
              <>この基準を満たし、用途別に最適なモデルを{RECOMMEND_COUNT}つに絞り込みました。</>,
            ]}
            cards={[
              {
                iconClass: 'fa-solid fa-shield-halved',
                iconColor: 'blue',
                title: 'macOSサポートが十分に残っている',
                desc: <>サポートが切れるとセキュリティリスクが高まり、アプリも使えなくなります。<strong>2029年以降までサポートされる機種</strong>だけを選んでいます。</>,
              },
              {
                iconClass: 'fa-solid fa-bolt',
                iconColor: 'green',
                title: '日常利用でストレスを感じにくい性能',
                desc: 'Web閲覧・オフィス作業・動画視聴で「遅い」「カクつく」と感じにくい性能を基準にしています。M2チップ以上のAppleシリコン搭載モデルに絞って選定しています。',
              },
              {
                iconClass: 'fa-solid fa-coins',
                iconColor: 'red',
                title: '中古価格と性能のバランスが良い',
                desc: '「残りのサポート期間」と「実際の中古相場」から、1年あたりのコストを計算しています。年単価が最も安くなる機種を優先的に選んでいます。',
              },
            ]}
          />
          <ValueZoneChart
            productName="MacBook"
            osName="macOS"
            supportYears={7}
            sweetMin={3}
            sweetMax={5}
            series={[
              { label: 'MBA 13 {year}（{chip}）', representativeSlug: 'mba-13-2020' },
              { label: 'MBP 14 / 16 {year}（{chip}）', representativeSlug: 'mbp-14-2021' },
              { label: 'MBP 13 {year}（{chip}）', representativeSlug: 'mbp-13-2022' },
              { label: 'MBA 13 {year}（{chip}）', representativeSlug: 'mba-13-2022' },
              { label: 'MBA 15 {year}（{chip}）', representativeSlug: 'mba-15-2023' },
              { label: 'MBP 14 / 16 {year}（{chip}）', representativeSlug: 'mbp-14-2023' },
              { label: 'MBP 14 / 16 {year}（{chip}）', representativeSlug: 'mbp-14-2023-nov' },
              { label: 'MBA 13 / 15 {year}（{chip}）', representativeSlug: 'mba-13-2024' },
              { label: 'MBP 14 / 16 {year}（{chip}）', representativeSlug: 'mbp-14-2024-nov' },
              { label: 'MBA 13 / 15 {year}（{chip}）', representativeSlug: 'mba-13-2025' },
            ]}
            allModels={allModelsIncludingEnded}
          />
          <RecommendDetailSection items={detailItems} />
          <CompareTableSection items={compareItems} />
          <ChecklistSection
            productName="MacBook"
           
            items={[
              {
                iconClass: 'fa-solid fa-battery-three-quarters',
                title: 'バッテリーの充放電回数を確認',
                desc: 'MacBookのバッテリーは約1,000回の充放電サイクルが目安です。充放電回数が多いほどバッテリーの劣化が進んでおり、駆動時間が短くなります。購入前に「システム情報」から確認できるか、ショップに問い合わせましょう。',
              },
              {
                iconClass: 'fa-solid fa-hard-drive',
                title: 'ストレージ容量を確認する',
                desc: 'MacBookはストレージの後から増設ができません。Web閲覧・事務作業メインなら256GBでも十分ですが、写真や動画編集をする場合は512GB以上を選びましょう。容量不足はクラウドや外付けSSDで補う手もあります。',
              },
              {
                iconClass: 'fa-solid fa-shield-halved',
                title: 'ショップ保証の有無を確認',
                desc: <>初期不良やバッテリー異常に対応する<strong>保証期間</strong>をチェック。イオシスなら3ヶ月保証、じゃんぱらなら1ヶ月保証など、ショップによって異なります。保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</>,
              },
              {
                iconClass: 'fa-solid fa-laptop',
                title: 'macOSサポート期間を確認する',
                desc: <>発売から約7年でサポート終了するのが過去の傾向です。サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎる機種</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</>,
              },
            ]}
            memoLinks={[
              { href: '/macbook/used-macbook-attention/', label: '中古MacBook購入時の注意点まとめ' },
              { href: '/macbook/used-macbook-support/', label: 'macOSのサポート期間一覧' },
            ]}
          />
          <ShopSection
            items={shopItems}
            productName="MacBook"
           
            description="信頼性の高い中古ショップを厳選し、保証期間や配送料の有無などをまとめました。"
            specRows={[
              { label: '価格', field: 'price' },
              { label: '保証期間', field: 'support' },
              { label: '赤ロム保証', field: 'block' },
              { label: 'バッテリー保証', field: 'battery' },
              { label: '実物写真', field: 'photo' },
              { label: '配送料', field: 'postage' },
            ]}
          />
          <MacBookFaqSection />
        <MacBookRelatedLinks heading="MacBook選びをもっと深掘りする" description="購入先の比較や相場チェックなど、MacBook選びに役立つ記事をまとめました。" excludeHref="/macbook/recommend/" />
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
