import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAllIPadModels,
  getAllIPadModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getLatestIPadPriceLog,
  getAllIPadAccessories,
  getAllIPadAccessoryCompatibility,
} from '@/lib/queries'
import type { IPadModel, IPadPriceLog } from '@/lib/types'
import { buildFallbackShops, buildBreadcrumbJsonLd, buildArticleJsonLd, buildFaqJsonLd, formatPrice, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { buildAccessoryLookup, getPencilTextFromAccessories, getKeyboardTextFromAccessories, calculatePriceRange } from '@/lib/utils/ipad-helpers'
import {
  RECOMMEND_DATE_LABEL,
  RECOMMEND_YEAR,
  RECOMMEND_SLUGS,
  RECOMMEND_COUNT,
  RECOMMEND_COUNT_LABEL,
  RECOMMEND_META,
  SHOP_SECTION_IDS,
  FAQ_JSONLD_ITEMS,
} from '@/lib/data/ipad-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import ConclusionSection from '@/app/components/ConclusionSection'
import CriteriaSection from '@/app/components/CriteriaSection'
import RecommendDetailSection from './components/RecommendDetailSection'
import CompareTableSection from './components/CompareTableSection'
import ChecklistSection from '@/app/components/ChecklistSection'
import ShopSection from '@/app/components/ShopSection'
import IPadFaqSection from './components/IPadFaqSection'
import dynamic from 'next/dynamic'

const ValueZoneChart = dynamic(() => import('@/app/components/ValueZoneChart'), {
  loading: () => <div style={{ height: '300px' }} />,
})
import IPadArticleFooter from '@/app/components/ipad/IPadArticleFooter'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 3600

const PAGE_TITLE = `中古iPadのおすすめ${RECOMMEND_COUNT}機種を解説。狙い目の型落ちモデルどれ？【${RECOMMEND_DATE_LABEL}版】`
const PAGE_DESCRIPTION =
  `${RECOMMEND_DATE_LABEL}現在、中古iPadのおすすめ${RECOMMEND_COUNT}機種を目的別に解説。iPadOSサポート期間・性能・価格のバランスが良いモデルだけを厳選しました。`
const PAGE_URL = 'https://used-lab.jp/ipad/recommend/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/recommend/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/recommend/',
    images: [{ url: getHeroImage('/ipad/recommend/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/ipad/recommend/')],
  },
}

export default async function IPadRecommendPage() {
  const [allModels, allModelsIncludingEnded, shops, allShopLinks, allAccessories, allCompatibility] = await Promise.all([
    getAllIPadModels(),
    getAllIPadModelsIncludingEnded(),
    getShops(),
    getAllProductShopLinksByType('ipad'),
    getAllIPadAccessories(),
    getAllIPadAccessoryCompatibility(),
  ])
  const accessoryLookup = buildAccessoryLookup(allAccessories, allCompatibility)

  // おすすめモデルを抽出（pencil/keyboard をアクセサリテーブルから導出）
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is IPadModel => m != null)
    .map((m) => ({
      ...m,
      pencil: getPencilTextFromAccessories(accessoryLookup.get(m.id) || []),
      keyboard: getKeyboardTextFromAccessories(accessoryLookup.get(m.id) || []),
    }))

  // 各モデルの最新価格を並列取得
  const latestPrices = await Promise.all(
    recommendModels.map((m) => getLatestIPadPriceLog(m.id))
  )

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/recommend/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
    { name: '中古iPad完全購入ガイド', item: 'https://used-lab.jp/ipad' },
    { name: `中古iPadおすすめ${RECOMMEND_COUNT}選` },
  ])
  const articleJsonLd = buildArticleJsonLd({ headline: PAGE_TITLE, description: PAGE_DESCRIPTION, dateStr, url: PAGE_URL })
  const faqJsonLd = buildFaqJsonLd(FAQ_JSONLD_ITEMS)

  // ConclusionSection用データ（最安価格を動的に付与）
  const conclusionItems = recommendModels.map((model, i) => {
    const meta = RECOMMEND_META[model.slug]
    const { minPrice } = calculatePriceRange(latestPrices[i])
    const priceLabel = minPrice ? `${formatPrice(minPrice)}〜` : ''
    const desc = priceLabel ? `${priceLabel}。${meta?.desc || ''}` : (meta?.desc || '')
    return {
      id: model.id,
      slug: model.slug,
      displayName: model.model,
      image: model.image,
      date: model.date,
      desc,
    }
  })

  const fallbackShops = buildFallbackShops(shops, SHOP_SECTION_IDS, 'ipad_url')

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
      pencilLabel: meta?.pencilLabel || '-',
      displayLabel: meta?.displayLabel || '-',
      targetUser: meta?.targetUser || '-',
    }
  })

  // ShopSection用データ（shopsテーブルのipad_urlから取得）
  const shopItems = SHOP_SECTION_IDS
    .map((shopId) => {
      const shop = shops.find((s) => s.id === shopId)
      if (!shop || !shop.ipad_url) return null
      return { shop, url: shop.ipad_url }
    })
    .filter((item): item is { shop: (typeof shops)[number]; url: string } => item != null)

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
            { label: '中古iPad完全購入ガイド', href: '/ipad' },
            { label: `中古iPadおすすめ${RECOMMEND_COUNT}選` },
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
                  src={getHeroImage('/ipad/recommend/')}
                  alt={`中古iPadおすすめ${RECOMMEND_COUNT}選のイメージ`}
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
              <p>「中古iPadって、結局どれを選べばいいの？」</p>
              <p>
                {RECOMMEND_DATE_LABEL}現在、型落ちiPadの選択肢は豊富ですが、iPadOSサポート期間・性能・価格のバランスを
                考えると、おすすめできる機種は意外と限られています。
              </p>
              <p>
                この記事では、{(() => {
                  const prices = latestPrices.map(lp => calculatePriceRange(lp).minPrice).filter((p): p is number => p != null)
                  const min = Math.min(...prices)
                  const max = Math.max(...prices)
                  return `${Math.floor(min / 10000)}万円台〜${Math.floor(max / 10000)}万円台`
                })()}の予算別に今買っても後悔しない中古iPad {RECOMMEND_COUNT}機種を厳選。
                イラスト制作・動画視聴・勉強用など用途別に特徴と向いている人を詳しく解説します。Apple認定整備済製品との違いも紹介しています。
              </p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<Link href="/ipad/">中古iPad購入完全ガイド</Link>」も参考にしてみてください！</p>
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
          </div>
        </nav>

        {/* セクション */}
        <div className="l-sections" itemProp="articleBody">
          <ConclusionSection
            items={conclusionItems}
            heading={<>【結論】{RECOMMEND_YEAR}年現在のおすすめ中古iPad{RECOMMEND_COUNT}機種</>}
            descriptions={[
              <>迷っているなら、まずはこの{RECOMMEND_COUNT}機種から選べば大きな失敗はありません。</>,
              <>{RECOMMEND_YEAR}年時点で「iPadOSサポートが十分に残っている」「中古価格と性能のバランスが良い」モデルだけに絞っています。</>,
            ]}
            gridCols="5col"
            imagePath="ipad"
            placeholderText="iPad"
          />
          <CriteriaSection
            recommendCount={RECOMMEND_COUNT}
            recommendCountLabel={RECOMMEND_COUNT_LABEL}
            descriptions={[
              '中古iPadを選ぶなら、「長く使えるか」「快適に動くか」「価格に見合っているか」の3つが重要。',
              <>この基準を満たし、用途別に最適なモデルを{RECOMMEND_COUNT}つに絞り込みました。</>,
            ]}
            cards={[
              {
                iconClass: 'fa-solid fa-shield-halved',
                iconColor: 'blue',
                title: 'iPadOSサポートが十分に残っている',
                desc: <>サポートが切れるとセキュリティリスクが高まり、アプリも使えなくなります。<strong>2029年以降までサポートされる機種</strong>だけを選んでいます。</>,
              },
              {
                iconClass: 'fa-solid fa-bolt',
                iconColor: 'green',
                title: '用途に合った十分な性能',
                desc: '動画視聴やWeb閲覧ならA14 Bionic以上、イラスト制作や動画編集ならM1以上が目安。それぞれの用途で快適に使える性能を基準に選定しています。',
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
            productName="iPad"
            osName="iPadOS"
            supportYears={7}
            sweetMin={3}
            sweetMax={4}
            series={[
              { label: 'iPad 第7世代', representativeSlug: 'normal-7' },
              { label: 'iPad 第8世代', representativeSlug: 'normal-8' },
              { label: 'iPad mini 第5世代', representativeSlug: 'mini-5' },
              { label: 'iPad Air 第4世代', representativeSlug: 'air-4' },
              { label: 'iPad 第9世代', representativeSlug: 'normal-9' },
              { label: 'iPad mini 第6世代', representativeSlug: 'mini-6' },
              { label: 'iPad 第10世代', representativeSlug: 'normal-10' },
              { label: 'iPad Air 第5世代', representativeSlug: 'air-5' },
              { label: 'iPad Pro 11" 第3世代', representativeSlug: 'pro11-3' },
              { label: 'iPad Pro 12.9" 第5世代', representativeSlug: 'pro12-5' },
              { label: 'iPad Pro 11" 第4世代', representativeSlug: 'pro11-4' },
              { label: 'iPad Pro 12.9" 第6世代', representativeSlug: 'pro12-6' },
              { label: 'iPad Air 第6世代', representativeSlug: 'air-6-11' },
              { label: 'iPad mini 第7世代', representativeSlug: 'mini-7' },
              { label: 'iPad 第11世代', representativeSlug: 'normal-11' },
              { label: 'iPad Pro M4', representativeSlug: 'pro11-5' },
            ]}
            allModels={allModelsIncludingEnded}
          />
          <RecommendDetailSection items={detailItems} />
          <CompareTableSection items={compareItems} />
          <ChecklistSection
            productName="iPad"
           
            items={[
              {
                iconClass: 'fa-solid fa-battery-three-quarters',
                title: 'バッテリーの劣化具合を確認する',
                desc: <><p>中古iPadではバッテリーの劣化具合が使い心地に直結します。</p><p>最大容量80%未満の場合、価格が安くても購入後に交換が必要になるケースが多く、割高になることも。ショップの商品説明でバッテリー状態を確認しましょう。</p></>,
              },
              {
                iconClass: 'fa-solid fa-wifi',
                title: 'Wi-FiモデルかCellularモデルかを確認',
                desc: <><p>iPadにはWi-Fi専用モデルとCellular（SIM対応）モデルがあります。</p><p>自宅やオフィスでの利用がメインならWi-Fiモデルで十分ですが、外出先でも単体で通信したい場合は<strong>Cellularモデル</strong>を選びましょう。Cellularモデルの方が中古価格はやや高めです。</p></>,
              },
              {
                iconClass: 'fa-solid fa-shield-halved',
                title: 'ショップ保証の有無を確認',
                desc: <><p>初期不良に対応する<strong>保証期間</strong>をチェック。イオシスなら3〜6ヶ月保証など、ショップによって保証内容は異なります。</p><p>保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</p></>,
              },
              {
                iconClass: 'fa-solid fa-tablet-screen-button',
                title: 'iPadOSサポート期間を確認する',
                desc: <><p>発売から約7年でサポート終了するのが過去の傾向です。</p><p>サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎる機種</strong>は避けましょう。各モデルの詳しいサポート期限は下記の記事で確認できます。</p></>,
              },
            ]}
            memoLinks={[
              { href: '/ipad/used-ipad-attention/', label: '中古iPad購入時の注意点まとめ' },
              { href: '/ipad/used-ipad-support/', label: 'iPadOSのサポート期間一覧' },
            ]}
          />
          <ShopSection
            items={shopItems}
            productName="iPad"
           
            description="信頼性の高い中古ショップを厳選し、保証期間や赤ロム保証の有無などをまとめました。"
            specRows={[
              { label: '価格', field: 'price' },
              { label: '保証期間', field: 'support' },
              { label: '赤ロム保証', field: 'block' },
              { label: 'バッテリー保証', field: 'battery' },
              { label: '実物写真', field: 'photo' },
              { label: '配送料', field: 'postage' },
            ]}
            shopDetailLink={{ href: '/ipad/ipad-shop/', label: '中古iPadのおすすめショップ比較' }}
          />
          <IPadFaqSection />


        </div>
      </article>
    </main>
    <IPadArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref="/ipad/recommend/" hidePopular relatedHeading="iPad選びをもっと深掘りする" relatedDescription="購入先の比較や相場チェックなど、iPad選びに役立つ記事をまとめました。" />
    </>
  )
}
