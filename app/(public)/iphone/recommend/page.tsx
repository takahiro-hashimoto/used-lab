import type { Metadata } from 'next'
import Image from 'next/image'
import {
  getAllIPhoneModels,
  getAllIPhoneModelsIncludingEnded,
  getShops,
  getAllProductShopLinksByType,
  getLatestPriceLog,
} from '@/lib/queries'
import type { IPhoneModel } from '@/lib/types'
import { buildFallbackShops, buildBreadcrumbJsonLd, buildArticleJsonLd, buildFaqJsonLd, formatPrice, getGitDateForFile } from '@/lib/utils/shared-helpers'
import { calculatePriceRange } from '@/lib/utils/iphone-helpers'
import {
  RECOMMEND_DATE_LABEL,
  RECOMMEND_YEAR,
  RECOMMEND_SLUGS,
  RECOMMEND_COUNT,
  RECOMMEND_COUNT_LABEL,
  RECOMMEND_META,
  SHOP_SECTION_IDS,
  FAQ_JSONLD_ITEMS,
} from '@/lib/data/iphone-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import ConclusionSection from '@/app/components/ConclusionSection'
import CriteriaSection from '@/app/components/CriteriaSection'
import RecommendDetailSection from './components/RecommendDetailSection'
import CompareTableSection from './components/CompareTableSection'
import ChecklistSection from '@/app/components/ChecklistSection'
import ShopSection from '@/app/components/ShopSection'
import IPhoneFaqSection from './components/IPhoneFaqSection'
import ValueZoneChartWrapper from './components/ValueZoneChartWrapper'
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'
import AuthorByline from '@/app/components/AuthorByline'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 3600

const PAGE_TITLE = `中古iPhoneおすすめ機種${RECOMMEND_COUNT}選｜目的別に狙い目モデルを解説【${RECOMMEND_DATE_LABEL}版】`
const PAGE_DESCRIPTION =
  `${RECOMMEND_DATE_LABEL}現在、中古iPhoneのおすすめ機種${RECOMMEND_COUNT}選を目的別に解説。iOSサポート期間・性能・価格のバランスが良いモデルだけを厳選しました。`
const PAGE_URL = 'https://used-lab.jp/iphone/recommend/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/recommend/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/recommend/',
    images: [{ url: getHeroImage('/iphone/recommend/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/iphone/recommend/')],
  },
}

export default async function IPhoneTopPage() {
  const [allModels, allModelsIncludingEnded, shops, allShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getAllIPhoneModelsIncludingEnded(),
    getShops(),
    getAllProductShopLinksByType('iphone'),
  ])

  // おすすめモデルを抽出
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is IPhoneModel => m != null)

  // 各モデルの最新価格を並列取得
  const latestPrices = await Promise.all(
    recommendModels.map((m) => getLatestPriceLog(m.id))
  )


  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/recommend/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
    { name: '中古iPhone完全購入ガイド', item: 'https://used-lab.jp/iphone' },
    { name: `中古iPhoneおすすめ${RECOMMEND_COUNT}選` },
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

  const fallbackShops = buildFallbackShops(shops, SHOP_SECTION_IDS, 'url')

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
      cameraLabel: meta?.cameraLabel || '-',
      batteryLabel: meta?.batteryLabel || '-',
      targetUser: meta?.targetUser || '-',
    }
  })

  // ShopSection用データ（shopsテーブルのurlから取得）
  const shopItems = SHOP_SECTION_IDS
    .map((shopId) => {
      const shop = shops.find((s) => s.id === shopId)
      if (!shop || !shop.url) return null
      return { shop, url: shop.url }
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
            { label: '中古iPhone完全購入ガイド', href: '/iphone' },
            { label: `中古iPhoneおすすめ${RECOMMEND_COUNT}選` },
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
                  src={getHeroImage('/iphone/recommend/')}
                  alt={`中古iPhoneおすすめ${RECOMMEND_COUNT}選のイメージ`}
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
              <p>「中古iPhoneって、結局どれを選べばいいの？」</p>
              <p>型落ちiPhoneの選択肢は豊富ですが、iOSサポート期間・性能・価格のバランスを考えると、おすすめできる機種は意外と限られています。</p>
              <p>
                そこでこの記事では、{RECOMMEND_DATE_LABEL}のおすすめ中古iPhone {RECOMMEND_COUNT}機種を厳選。
                それぞれの特徴と向いている人を詳しく解説します。Apple認定整備済製品との違いも紹介しているので、初めて中古iPhoneを買う方にもおすすめの内容です。
              </p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<a href="/iphone/">中古iPhone購入完全ガイド</a>」も参考にしてみてください！</p>
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
            heading={<>【結論】{RECOMMEND_YEAR}年現在のおすすめ中古iPhone{RECOMMEND_COUNT}機種</>}
            descriptions={[
              <>迷っているなら、まずはこの{RECOMMEND_COUNT}機種から選べば大きな失敗はありません。</>,
              <>{RECOMMEND_YEAR}年時点で「iOSサポートが十分に残っている」「中古価格と性能のバランスが良い」モデルだけに絞っています。</>,
            ]}
            gridCols="5col"
            imagePath="iphone"
            placeholderText="iPhone"
          />
          <CriteriaSection
            recommendCount={RECOMMEND_COUNT}
            recommendCountLabel={RECOMMEND_COUNT_LABEL}
            descriptions={[
              '中古iPhoneを選ぶなら、「長く使えるか」「快適に動くか」「価格に見合っているか」の3つが重要。',
              <>この基準を満たし、用途別に最適なモデルを{RECOMMEND_COUNT}つに絞り込みました。</>,
            ]}
            cards={[
              {
                iconClass: 'fa-solid fa-shield-halved',
                iconColor: 'blue',
                title: 'iOSサポートが十分に残っている',
                desc: <>サポートが切れるとセキュリティリスクが高まり、アプリも使えなくなります。<strong>2030年以降までサポートされる機種</strong>だけを選んでいます。</>,
              },
              {
                iconClass: 'fa-solid fa-bolt',
                iconColor: 'green',
                title: '日常利用でストレスを感じにくい性能',
                desc: '普段使い（SNS・Web・動画）で「遅い」「カクつく」と感じにくい性能を基準にしています。体感差が出にくい世代以降のモデルに絞って選定しています。',
              },
              {
                iconClass: 'fa-solid fa-coins',
                iconColor: 'red',
                title: '中古価格と性能のバランスが良い',
                desc: '「残りのサポート期間」と「実際の中古相場」から、1年あたりのコストを計算しています。年単価が最も安くなる機種を優先的に選んでいます。',
              },
            ]}
          />
          <ValueZoneChartWrapper
            productName="iPhone"
            osName="iOS"
            supportYears={7}
            sweetMin={3}
            sweetMax={4}
            series={[
              { label: 'iPhone 11 シリーズ', representativeSlug: '11normal' },
              { label: 'iPhone SE 第2世代', representativeSlug: 'se2' },
              { label: 'iPhone 12 シリーズ', representativeSlug: '12normal' },
              { label: 'iPhone 13 シリーズ', representativeSlug: '13mini' },
              { label: 'iPhone SE 第3世代', representativeSlug: 'se3' },
              { label: 'iPhone 14 シリーズ', representativeSlug: '14pro' },
              { label: 'iPhone 15 シリーズ', representativeSlug: '15normal' },
              { label: 'iPhone 16 シリーズ', representativeSlug: '16normal' },
              { label: 'iPhone 16e', representativeSlug: '16e' },
            ]}
            allModels={allModelsIncludingEnded}
          />
          <RecommendDetailSection items={detailItems} />
          <CompareTableSection items={compareItems} />
          <ChecklistSection
            productName="iPhone"
           
            items={[
              {
                iconClass: 'fa-solid fa-battery-three-quarters',
                title: 'バッテリー最大容量は80%以上が必須',
                desc: <><p>中古iPhoneではバッテリーの劣化具合が使い心地に直結します。</p><p>最大容量80%未満の場合、価格が安くても購入後に交換が必要になるケースが多く、割高になることも。</p></>,
              },
              {
                iconClass: 'fa-solid fa-signal',
                title: 'ネットワーク利用制限は「○」を選ぶ',
                desc: <><p>「○」判定は分割払い完済済みの証。「△」は前の持ち主が分割払い中で、将来的に赤ロム（通信不可）になるリスクがあります。</p><p>なお、<strong>SIMフリー版（Apple Store購入品）</strong>は元々判定対象外なので安心です。</p></>,
              },
              {
                iconClass: 'fa-solid fa-shield-halved',
                title: 'ショップ保証の有無を確認',
                desc: <><p>初期不良や赤ロム化に対応する<strong>保証期間</strong>をチェック。イオシスなら3~6ヶ月、にこスマなら1年保証など、ショップによって異なります。</p><p>保証がないフリマアプリでの購入はリスクが高いため、初心者にはおすすめしません。</p></>,
              },
              {
                iconClass: 'fa-solid fa-mobile-screen',
                title: 'iOSサポート期間を確認する',
                desc: <><p>発売から約7年でサポート終了するのが過去の傾向です。サポートが切れるとセキュリティリスクが高まるため、<strong>発売が古すぎる機種</strong>は避けましょう。</p><p>各モデルの詳しいサポート期限は下記の記事で確認できます。</p></>,
              },
            ]}
            memoLinks={[
              { href: '/iphone/used-iphone-attention/', label: '中古iPhone購入時の注意点まとめ' },
              { href: '/iphone/used-iphone-support/', label: 'iOSのサポート期間一覧' },
            ]}
          />
          <ShopSection
            items={shopItems}
            productName="iPhone"
           
            description="信頼性の高い中古ショップを厳選し、保証期間や赤ロム保証の有無などをまとめました。"
            specRows={[
              { label: '価格', field: 'price' },
              { label: '保証期間', field: 'support' },
              { label: '赤ロム保証', field: 'block' },
              { label: 'バッテリー保証', field: 'battery' },
              { label: '実物写真', field: 'photo' },
              { label: '配送料', field: 'postage' },
            ]}
            shopDetailLink={{ href: '/iphone/iphone-shop/', label: '中古iPhoneのおすすめショップ比較' }}
          />
          <IPhoneFaqSection />
          <IPhoneArticleFooter pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} excludeHref="/iphone/recommend/" hidePopular relatedHeading="iPhone選びをもっと深掘りする" relatedDescription="購入先の比較や相場チェックなど、iPhone選びに役立つ記事をまとめました。" />
        </div>
      </article>
    </main>
  )
}
