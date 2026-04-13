import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAllAirPodsModels,
  getLatestAirPodsPriceLog,
  getAllProductShopLinksByType,
  getShops,
} from '@/lib/queries'
import type { AirPodsModel, AirPodsPriceLog } from '@/lib/types'
import { formatPrice, buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import {
  GUIDE_DATE_LABEL,
  GUIDE_PRICE_SLUGS,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
  GUIDE_MODEL_LINKS,
} from '@/lib/data/airpods-guide'
import { buildVendorCardsFromShops } from '@/lib/data/guide-shared'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
  RECOMMEND_COUNT_LABEL,
} from '@/lib/data/airpods-recommend'
import ProductCard from '@/app/components/ProductCard'
import PopularSection from '@/app/components/support/PopularSection'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import ShareBox from '@/app/components/ShareBox'
import VendorCardGrid from '@/app/components/VendorCardGrid'
import GuideModelLinks from '@/app/components/GuideModelLinks'
import { getHeroImage } from '@/lib/data/hero-images'
import AuthorByline from '@/app/components/AuthorByline'
import ContinuousAside from '@/app/components/ContinuousAside'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 3600

const PAGE_TITLE = `中古AirPods完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${GUIDE_DATE_LABEL}版】`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古AirPodsの完全購入ガイド。選び方のポイント、モデル別の相場、おすすめ機種をまとめて解説。失敗しない中古AirPods選びをサポートします。`
const PAGE_URL = 'https://used-lab.jp/airpods/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/airpods/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/airpods/',
    images: [{ url: getHeroImage('/airpods/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/airpods/')],
  },
}

/** AirPodsPriceLog用の最安値取得（eearphone_min を使用） */
function getAirPodsMinPrice(price: AirPodsPriceLog | null): string {
  if (!price) return '-'
  const mins = [price.iosys_min, price.janpara_min, price.eearphone_min].filter(
    (v): v is number => v != null && v > 0
  )
  if (mins.length === 0) return '-'
  return formatPrice(Math.min(...mins))
}

export default async function AirPodsGuidePage() {
  const [allModels, allShopLinks, shops] = await Promise.all([
    getAllAirPodsModels(),
    getAllProductShopLinksByType('airpods'),
    getShops(),
  ])

  const vendorCards = buildVendorCardsFromShops(shops, 'airpods_url', '中古AirPodsを探す', {
    exclude: ['rakuma'],
    priorityOrder: ['iosys', 'eearphone'],
  }).map((card) => ({ ...card, specs: card.specs.filter((s) => s.label !== 'バッテリー保証') }))

  // 相場セクション用: 指定slugのモデル + 最新価格を並列取得
  const priceModels = GUIDE_PRICE_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is AirPodsModel => m != null)

  const latestPrices = await Promise.all(
    priceModels.map((m) => getLatestAirPodsPriceLog(m.id))
  )

  // おすすめ機種セクション用
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is AirPodsModel => m != null)

  const recommendPrices = await Promise.all(
    recommendModels.map((m) => getLatestAirPodsPriceLog(m.id))
  )

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/airpods/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古AirPods完全ガイド' },
    ],
  }

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
            { label: '中古AirPods完全購入ガイド' },
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
                中古AirPods完全購入ガイド
                選び方・相場・おすすめモデルまとめ【{GUIDE_DATE_LABEL}版】
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp showAuthor />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/airpods/')}
                  alt="中古AirPods購入ガイドのイメージ"
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
              <p>「AirPodsは種類が多くてどれを選べばいいかわからない...」そんな悩みはありませんか？</p>
              <p>
                本ページではあなたが納得して中古AirPodsを選べるよう、<strong>{GUIDE_DATE_LABEL}の最新相場や後悔しないための判断基準</strong>を解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                結論から知りたい方は「<Link href="/airpods/recommend/">【{GUIDE_DATE_LABEL}版】おすすめの中古AirPodsを{RECOMMEND_COUNT_LABEL}厳選</Link>」をご覧ください。
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
              <li><a href="#filter-tool" className="toc-item">機種診断 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#market-price" className="toc-item">最新相場 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#caution" className="toc-item">注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#recommended" className="toc-item">目的別 おすすめ機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#where-to-buy" className="toc-item">購入先比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
</div>
          </div>
        </nav>
        <div className="l-sections">

          {/* ========== 絞り込みツール ========== */}
          <PopularSection
            sectionTitle="条件に合うAirPodsを絞り込む"
            sectionDescription="用途・予算・こだわり条件など、ご自身の条件を選ぶことで候補を絞り込めます。"
            imageSrc="/images/content/thumbnail/simulator.jpg"
            imageAlt="AirPods機種絞り込みツール"
            subtitle="条件にチェックを打つだけ！"
            cardTitle="AirPods機種絞り込みツール"
            cardDescription="ノイキャン重視、運動用、通話メインなどの希望や予算金額などにチェックを打つだけであなたにぴったり合うAirPodsをシミュレーションすることができます。"
            buttonText="機種診断スタート"
            buttonHref="/airpods/airpods-filter-search/"
            sectionId="filter-tool"
            headingId="filter-tool"
          />

          {/* ========== 中古AirPodsの最新相場 ========== */}
          <section className="l-section" id="market-price" aria-labelledby="heading-market-price">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-market-price">中古AirPodsの最新相場【毎日更新】</h2>
              <p className="m-section-desc">イオシス・じゃんぱら・eイヤホンの価格を毎日自動で更新。</p>
              <p className="m-section-desc">ファームウェアサポート期間・中古流通量・価格のバランスを基準に、「今買われやすい中古AirPods」を抽出しています。</p>

              <div className="u-list-reset l-grid l-grid--2col l-grid--gap-lg l-grid--mb-2xl">
                {priceModels.map((model, i) => (
                  <ProductCard
                    key={model.id}
                    variant="compact"
                    modelId={model.id}
                    modelName={model.name}
                    imageUrl={model.image ? `/images/airpods/${model.image}` : null}
                    imageFallbackText="AirPods"
                    metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.chip || ''}`}
                    priceLabel="中古相場"
                    priceValue={getAirPodsMinPrice(latestPrices[i])}
                    shopUrl={allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)?.url}
                  />
                ))}
              </div>

              <p className="guide-section-note">各モデルの詳細な価格推移グラフ・相場データをご覧いただけます</p>
              <div className="guide-section-cta">
                <Link href="/airpods/price-info/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古AirPodsの相場・価格推移グラフ</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 中古AirPodsを選ぶ際の確認ポイント ========== */}
          <section className="l-section" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古AirPodsを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古AirPodsを購入する際に確認しておきたい5つのポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古イヤホンを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box m-card m-card--shadow u-mb-2xl">
                <dl className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ファームウェアサポート期間</dt>
                    <dd className="glossary-item-desc">
                      AirPodsのファームウェアサポートは発売から約7年。古すぎるモデルはサポート終了が近いため、新機能が使えなくなるリスクがあります。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">バッテリーの劣化具合</dt>
                    <dd className="glossary-item-desc">
                      AirPodsはバッテリー交換が難しいため、劣化具合は特に重要です。使用時間が極端に短くないか、購入前にショップへ確認しましょう。ケースのバッテリーも劣化する点に注意。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">充電端子の確認（Lightning / USB-C）</dt>
                    <dd className="glossary-item-desc">
                      AirPodsには充電端子がLightningのモデルとUSB-Cのモデルがあります。お手持ちのiPhoneやMacBookとケーブルを統一したい場合はUSB-Cモデルを選びましょう。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ショップの動作保証</dt>
                    <dd className="glossary-item-desc">
                      中古品はメーカー保証が切れていることが多いため、販売店独自の保証内容が安心材料になります。イオシスなら3ヶ月保証が付いています。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">外装・イヤーチップの状態</dt>
                    <dd className="glossary-item-desc">
                      傷や汚れの程度は価格に影響します。カナル型の場合はイヤーチップの劣化もチェック。交換用チップは別途購入可能です。
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* ========== 目的別・おすすめ機種 ========== */}
          <section className="l-section" id="recommended" aria-labelledby="heading-recommended">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommended">目的別・おすすめ機種</h2>
              <p className="m-section-desc">{GUIDE_DATE_LABEL}現在、中古市場で選択肢として検討されることが多い機種を、目的別に整理しました。</p>
              <p className="m-section-desc">それぞれの「特徴」と「選ばれる理由の傾向」をまとめています。</p>

              <div className="guide-recommend-list">
                {recommendModels.map((model, i) => {
                  const meta = RECOMMEND_META[model.slug]
                  return (
                    <ProductCard
                      key={model.id}
                      variant="detail"
                      modelId={model.id}
                      modelName={model.name}
                      imageUrl={model.image ? `/images/airpods/${model.image}` : null}
                      imageFallbackText="AirPods"
                      metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.chip || ''}`}
                      tagLabel={meta?.label || ''}
                      specs={[
                        model.date ? `${model.date.split('/')[0]}年発売` : '',
                        model.chip || '',
                        model.fit || '',
                      ]}
                      description={meta?.desc || ''}
                      priceLabel="中古相場"
                      priceValue={getAirPodsMinPrice(recommendPrices[i])}
                      shopUrl={allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)?.url}
                      fallbackHref={`/airpods/${model.slug}/`}
                    />
                  )
                })}
              </div>

              <p className="guide-section-note">{GUIDE_DATE_LABEL}現在おすすめの中古AirPodsはこちらの記事でじっくり解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/airpods/recommend/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古AirPodsのおすすめ機種</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古AirPodsはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古AirPods販売店の比較情報。保証内容、価格、在庫の豊富さなど、</p>
              <p className="m-section-desc">各ショップの特徴を一覧表で整理しました。</p>

              <VendorCardGrid cards={vendorCards} />
            </div>
          </section>

          {/* ========== 関連記事・モデル一覧 ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古AirPodsの関連記事</h2>
              <p className="m-section-desc">価格推移やおすすめモデルなど、中古AirPods選びに役立つ記事をまとめました。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg l-grid--mb-2xl">
                {GUIDE_SPEC_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="m-card m-card--shadow related-link-card m-card--hoverable">
                    <Image src={getHeroImage(link.href)} alt={link.title} className="related-link-card__img" width={400} height={300} loading="lazy" />
                    <div className="related-link-card__body">
                      <p className="related-link-card__title">{link.title}</p>
                      <p className="related-link-card__desc">{link.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 歴代AirPods 個別記事リンク集 */}
              <GuideModelLinks
                basePath="/airpods"
                heading="歴代AirPods 個別記事リンク集"
                description="各モデルの詳細スペック、中古相場を個別にまとめています。"
                categories={[
                  { label: 'Proモデル', items: GUIDE_MODEL_LINKS.pro },
                  { label: 'スタンダードモデル', items: GUIDE_MODEL_LINKS.standard },
                  { label: 'AirPods Max', items: GUIDE_MODEL_LINKS.max },
                ]}
              />
            </div>
          </section>

          {/* ========== よくある質問 ========== */}
          <FaqSection
            title="中古AirPodsに関するよくある質問"
            description="中古AirPodsの購入を検討している方からよく寄せられる質問をまとめました。"
            items={GUIDE_FAQ_ITEMS}
          />

        </div>
      </article>
    </main>
    <ContinuousAside>
      <div className="l-section l-section--sm">
        <div className="l-container">
          <AuthorByline />
        </div>
      </div>
      <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
    </ContinuousAside>
    </>
  )
}
