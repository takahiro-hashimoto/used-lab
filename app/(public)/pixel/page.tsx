import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ContentImage from '../../components/ContentImage'
import {
  getAllPixelModels,
  getLatestPixelPriceLogWithPrices,
  getAllProductShopLinksByType,
  getShops,
} from '@/lib/queries'
import type { PixelModel } from '@/lib/types'
import { getMarketPrice, buildArticleJsonLd, getGitDateForFile, buildFallbackShops } from '@/lib/utils/shared-helpers'
import {
  GUIDE_DATE_LABEL,
  GUIDE_PRICE_SLUGS,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
} from '@/lib/data/pixel-guide'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
  SHOP_SECTION_IDS,
} from '@/lib/data/pixel-recommend'
import { buildVendorCardsFromShops } from '@/lib/data/guide-shared'
import ProductCard from '@/app/components/ProductCard'
import RecommendDetailSection from './recommend/components/RecommendDetailSection'
import CompareTableSection from './recommend/components/CompareTableSection'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import ShareBox from '@/app/components/ShareBox'
import VendorCardGrid from '@/app/components/VendorCardGrid'
import GuideModelLinks from '@/app/components/GuideModelLinks'
import CrossCompareCta from '@/app/components/CrossCompareCta'
import { getHeroImage } from '@/lib/data/hero-images'
import AuthorByline from '@/app/components/AuthorByline'
import ContinuousAside from '@/app/components/ContinuousAside'
import HeroMeta from '@/app/components/HeroMeta'
import PopularSection from '@/app/components/support/PopularSection'

export const revalidate = false

const PAGE_TITLE = `【${GUIDE_DATE_LABEL}】中古Google Pixelおすすめ機種｜狙い目の型落ちモデル5選`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古Google Pixelのおすすめ5機種をコスパ・用途別に解説。7年サポートやTensor世代、消しゴムマジック等のAI機能で選ぶ狙い目の型落ちモデルは？最新相場・選び方・購入先比較まで完全網羅します。`
const PAGE_URL = 'https://used-lab.jp/pixel/'

const SERVICE_LINKS = [
  {
    title: '楽天モバイル',
    description: '使った分だけ支払う段階制プラン。20GB以上は2980円で使い放題。中古Pixelとの相性も良好。',
    href: 'https://hb.afl.rakuten.co.jp/hsc/4ebf9db2.7404390b.1d6c2ffe.7ec2aeb6/?link_type=hybrid_url&rafst=rmn',
    image: 'https://hbb.afl.rakuten.co.jp/hsb/4ebf9dc9.4dc93727.1d6c2ffe.7ec2aeb6/?me_id=2101065&me_adv_id=2377896&t=pict',
    rel: 'nofollow sponsored noopener',
  },
  {
    title: 'Widget Club',
    description: 'ホーム画面をカスタマイズできる着せ替えアプリ。Androidにも対応し無料テンプレートも豊富。',
    href: 'https://invite.widget-club.com/c/5031010/1752866/20483?u=https%3A%2F%2Fwidget-club.com%2Fja',
    image: 'https://firebasestorage.googleapis.com/v0/b/widgetclub-c2626.appspot.com/o/banner%2Fcampaign%2Faffiliate_simple_widgetclub.png?alt=media&token=7fd84000-d257-46eb-99f0-89b2f647d926',
    rel: 'nofollow sponsored noopener',
  },
]

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/pixel/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/pixel/',
    images: [{ url: getHeroImage('/pixel/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/pixel/')],
  },
}

function getStorageLabel(model: PixelModel): string {
  if (!model.strage) return ''
  return model.strage.split('/')[0].trim()
}

export default async function PixelGuidePage() {
  const [allModels, allShopLinks, shops] = await Promise.all([
    getAllPixelModels(),
    getAllProductShopLinksByType('pixel'),
    getShops(),
  ])

  const vendorCards = buildVendorCardsFromShops(shops, 'pixel_url', '中古Pixelを探す', { exclude: ['rakuma', 'carrier'] })

  // 相場セクション用: 指定slugのモデル + 最新価格を並列取得
  const priceModels = GUIDE_PRICE_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is PixelModel => m != null)

  // おすすめ機種セクション用（lib/data/pixel-recommend.ts で一元管理）
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is PixelModel => m != null)

  const [latestPrices, recommendPrices] = await Promise.all([
    Promise.all(priceModels.map((m) => getLatestPixelPriceLogWithPrices(m.id))),
    Promise.all(recommendModels.map((m) => getLatestPixelPriceLogWithPrices(m.id))),
  ])

  const fallbackShops = buildFallbackShops(shops, SHOP_SECTION_IDS, 'pixel_url')

  const detailItems = recommendModels.map((model, i) => {
    const meta = RECOMMEND_META[model.slug]
    const modelShopLinks = allShopLinks.filter((l) => l.product_id === model.id)
    return {
      model,
      latestPrice: recommendPrices[i],
      updatedDateStr: recommendPrices[i]?.logged_at?.substring(0, 10) ?? '',
      shopLinks: modelShopLinks,
      fallbackShops,
      label: meta?.label || '',
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
      cameraLabel: meta?.cameraLabel || '-',
      batteryLabel: meta?.batteryLabel || '-',
      targetUser: meta?.targetUser || '-',
    }
  })

  // 歴代モデル一覧セクション用: 全モデルを Pro系 / 無印 / aシリーズ にグルーピング
  const buildModelItem = (m: PixelModel) => ({
    slug: m.slug,
    name: m.model,
    meta: `${m.date ? `${m.date.split('/')[0]}年発売` : ''}${m.cpu ? ` / ${m.cpu}` : ''}`,
  })
  // 発売日の新しい順に並べる（id は必ずしも発売日順ではないため date で判定）
  const byNewest = (a: PixelModel, b: PixelModel) => {
    const t = (m: PixelModel) => (m.date ? new Date(m.date.replace(/\//g, '-')).getTime() : 0)
    return t(b) - t(a)
  }
  const newestFirst = [...allModels].sort(byNewest)
  const proModelItems = newestFirst.filter((m) => /pro/i.test(m.model)).map(buildModelItem)
  const aModelItems = newestFirst.filter((m) => !/pro/i.test(m.model) && /a$/.test(m.model.trim())).map(buildModelItem)
  const standardModelItems = newestFirst.filter((m) => !/pro/i.test(m.model) && !/a$/.test(m.model.trim())).map(buildModelItem)
  const modelLinkCategories = [
    { label: 'Pro / Pro XL', items: proModelItems },
    { label: '無印モデル', items: standardModelItems },
    { label: 'aシリーズ', items: aModelItems },
  ].filter((c) => c.items.length > 0)

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/pixel/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古・型落ちデジタルデバイスを賢く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古Google Pixelおすすめ機種・選び方ガイド' },
    ],
  }

  const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    dateModified: dateStr,
    url: PAGE_URL,
  })


  return (
    <>
    <main>
      <article>
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
            { label: '中古Google Pixelおすすめ機種・選び方まとめ' },
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
              <h1 className="hero-title">
                【{GUIDE_DATE_LABEL}】中古Google Pixel買うならどれがおすすめ？狙い目の型落ちモデル5機種を紹介
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} showAuthor />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/pixel/')}
                  alt="中古Google Pixel購入ガイドのイメージ"
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
              <p>スマホの値上がりや円安の影響で、新品のハイエンドスマホは以前より手が出しづらくなってきましたよね…。</p>
              <p>そこで賢い選択肢になるのが<strong>中古のGoogle Pixel</strong>です。Pixelは消しゴムマジックなどのAI機能とコスパの高さが魅力で、型落ちモデルでも普段使いに不満はでづらく、価格もぐっとお手頃。Pixel 8以降は7年のOS・セキュリティ更新が保証されているのも安心材料です。</p>
              <p>本記事では{GUIDE_DATE_LABEL}時点でのおすすめ機種をご紹介します。記事後半には中古Pixel選びに役立つコンテンツも多数用意しているので、ぜひチェックしてみてください！</p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <div className="toc-wrapper">
            <p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
            <ol className="l-grid l-grid--3col u-list-reset">
              <li><a href="#compare" className="toc-item">おすすめ機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#market-price" className="toc-item">最新相場 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">スペック比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#filter-tool" className="toc-item">診断ツール <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#caution" className="toc-item">注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#where-to-buy" className="toc-item">購入先比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
            </div>
          </div>
        </nav>
        <div className="l-sections">

          {/* ========== おすすめ機種（比較表） ========== */}
          <CompareTableSection
            items={compareItems}
            heading={<>今買うならこれ！おすすめ中古Google Pixel5選【{GUIDE_DATE_LABEL}最新】</>}
            descriptions={[
              <>当サイトでおすすめしている機種は下記の通り。スペックの詳細な比較は<Link prefetch={false} href="/pixel/pixel-spec-table/">Pixelスペック比較表</Link>をご覧ください。</>,
              <>「OS・セキュリティ更新が十分に残っている」「中古価格と性能・AI機能のバランスが良い」ことが判断基準です。</>,
            ]}
          />
          <RecommendDetailSection items={detailItems} />

          {/* ========== 中古Pixelの最新相場 ========== */}
          <section className="l-section" id="market-price" aria-labelledby="heading-market-price">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-market-price">中古Google Pixelの最新相場</h2>
              <p className="m-section-desc">イオシス・GEO・じゃんぱらの価格をもとに中古相場を集計しています。</p>
              <p className="m-section-desc">サポート期間・流通量・価格安定性の3点を基準に、「今買われやすい中古Pixel」を抽出しています。</p>

              <div className="u-list-reset u-mb-2xl l-grid l-grid--2col l-grid--gap-lg">
                {priceModels.map((model, i) => (
                  <ProductCard
                    key={model.id}
                    variant="compact"
                    modelId={model.id}
                    modelName={model.model}
                    imageUrl={model.image ? `/images/pixel/${model.image}` : null}
                    imageFallbackText="Pixel"
                    metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                    priceLabel={`中古相場（${latestPrices[i]?.storage ? `${latestPrices[i].storage}` : getStorageLabel(model)}）`}
                    priceValue={getMarketPrice(latestPrices[i])}
                  />
                ))}
              </div>

              <p className="guide-section-note">歴代Pixelの価格推移と、同じ予算で狙える他ブランドの機種を確認できます</p>
              <div className="guide-section-cta guide-section-cta--row">
                <Link prefetch={false} href="/pixel/price-info/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古Google Pixelの相場・価格推移を見る</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
                <CrossCompareCta />
              </div>
            </div>
          </section>

          {/* ========== スペック比較ガイド ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古Pixelのデータ・スペック比較ガイド</h2>
              <p className="m-section-desc">サポート期間、Tensor性能、バッテリー容量など、機種選びに役立つスペック比較記事をまとめました。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg u-mb-2xl">
                {GUIDE_SPEC_LINKS.map((link) => (
                  <Link prefetch={false} key={link.href} href={link.href} className="m-card m-card--shadow related-link-card m-card--hoverable">
                    <Image src={getHeroImage(link.href)} alt={link.title} className="related-link-card__img" width={400} height={300} loading="lazy" />
                    <div className="related-link-card__body">
                      <p className="related-link-card__title">{link.title}</p>
                      <p className="related-link-card__desc">{link.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 歴代Google Pixel 個別記事リンク集 */}
              <GuideModelLinks
                basePath="/pixel"
                heading="歴代Google Pixel一覧"
                description="各モデルの詳細スペック、中古相場、購入時の注意点を個別にまとめています。"
                categories={modelLinkCategories}
              />
            </div>
          </section>

          {/* ========== 絞り込みツール ========== */}
          <PopularSection
            sectionTitle="条件に合うPixelを絞り込む"
            sectionDescription="予算・ライン・望遠カメラ・写真のAI編集など、ご自身の条件を選ぶことで候補を絞り込めます。"
            imageSrc="/images/content/thumbnail/simulator.jpg"
            imageAlt="Pixel機種絞り込みツール"
            subtitle="条件にチェックを打つだけ！"
            cardTitle="Pixel機種絞り込みツール"
            cardDescription="望遠で撮りたい、ベストテイクや編集マジックを使いたい、といった希望や予算にチェックを打つだけで、条件に合う中古Pixelを絞り込めます。OSアップデートの期限はGoogleの公表値で表示するので、長く使える機種も選べます。"
            buttonText="機種診断スタート"
            buttonHref="/pixel/pixel-filter-search/"
            sectionId="filter-tool"
            headingId="filter-tool"
          />

          {/* ========== 中古Pixelを選ぶ際の確認ポイント ========== */}
          <section className="l-section" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古Google Pixelを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古Pixelを購入する際に確認しておきたいポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古スマホを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box m-card m-card--shadow u-mb-2xl">
                <dl className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">Androidアップデートの保証期間（端末の寿命）</dt>
                    <dd className="glossary-item-desc">
                      Pixel 8以降はOS・セキュリティ更新が7年、Pixel 6/7世代はセキュリティ更新が5年（OSメジャー更新は3年）保証されています。古いモデルは購入後すぐにサポート外になるリスクがあるので注意。
                      <div className="u-mt-sm">詳細：<Link prefetch={false} href="/pixel/used-pixel-support/">中古Pixelのサポート期間の目安</Link></div>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">バッテリーの状態</dt>
                    <dd className="glossary-item-desc">
                      中古Pixelではバッテリーの劣化具合が使い心地に直結します。劣化が進んだ個体は価格が安くても<strong>購入後に交換が必要になるケース</strong>が多く、割高になることも。状態表記のあるショップで購入しましょう。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">Googleアカウント・端末保護機能の解除</dt>
                    <dd className="glossary-item-desc">
                      前の所有者のGoogleアカウントが残っている端末は、端末保護機能（Factory Reset Protection）により使用できません。初期化済み（工場出荷状態）かどうか、確実に確認することが重要です。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ネットワーク利用制限（赤ロム）</dt>
                    <dd className="glossary-item-desc">
                      支払い状況の問題で通信が制限される端末があります。利用制限が「◯」判定（分割払い完済済み）の端末を選び、赤ロム保証の有無も事前にチェックしましょう。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ショップの動作保証</dt>
                    <dd className="glossary-item-desc">
                      中古品はメーカー保証が切れていることが多いため、<strong>動作確認済みの証明</strong>や販売店独自の保証内容が安心材料になります。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">外装状態・ランク表記</dt>
                    <dd className="glossary-item-desc">
                      傷や使用感は価格に影響します。自分が許容できる状態をあらかじめ決めておくと選びやすくなります。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">SIMロック・SIMフリーの確認</dt>
                    <dd className="glossary-item-desc">
                      SIMロック解除済み（SIMフリー）の端末であれば、どのキャリアのSIMも利用できます。格安SIMへの乗り換えを検討している場合は特に重要なポイントです。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">おサイフケータイ（FeliCa）対応の確認</dt>
                    <dd className="glossary-item-desc">
                      国内版のPixel 6以降はおサイフケータイ（FeliCa）に対応していますが、海外版は非対応の場合があります。モバイルSuica等を使いたい方は国内版かどうか確認しましょう。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ストレージ容量（128GB以上が目安）</dt>
                    <dd className="glossary-item-desc">
                      PixelはmicroSDに非対応で後から容量を増やせません。アプリや写真・動画が増えやすい現代では128GB以上を選ぶと安心です。256GBとの価格差が小さい場合は、大きい容量を選んでおくのがおすすめです。
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古Pixelはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古Pixel販売店の比較情報。保証内容、価格、在庫の豊富さなど、各ショップの特徴を一覧表で整理しました。</p>
              <VendorCardGrid cards={vendorCards} />
            </div>
          </section>

          {/* ========== 中古Pixel購入者向けサービス ========== */}
          <section className="l-section" aria-labelledby="heading-service-links">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-service-links">中古Pixel購入者向けサービス</h2>
              <p className="m-section-desc">中古Pixelの購入とセットで検討したいサービスをまとめました。</p>
              <div className="l-grid l-grid--2col l-grid--gap-lg">
                {SERVICE_LINKS.map((service) => (
                  <a
                    key={service.title}
                    href={service.href}
                    target="_blank"
                    rel={service.rel}
                    className="m-card m-card--shadow related-link-card m-card--hoverable"
                    aria-label={service.title}
                  >
                    <ContentImage
                      decoding="async"
                      src={service.image}
                      alt={service.title}
                      className="related-link-card__img"
                      width={120}
                      height={90}
                    />
                    <div className="related-link-card__body">
                      <p className="related-link-card__title">{service.title}</p>
                      <p className="related-link-card__desc">{service.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
          {/* ========== よくある質問 ========== */}
          <FaqSection
            title="中古Google Pixelに関するよくある質問"
            description="中古Pixelの購入を検討している方からよく寄せられる質問をまとめました。"
            items={GUIDE_FAQ_ITEMS}
            className="deferred-render"
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
