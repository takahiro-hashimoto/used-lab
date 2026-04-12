import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAllMacBookModels,
  getLatestMacBookPriceLog,
  getAllProductShopLinksByType,
  getShops,
} from '@/lib/queries'
import type { MacBookModel, MacBookPriceLog } from '@/lib/types'
import {
  GUIDE_DATE_LABEL,
  GUIDE_PRICE_SLUGS,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
  GUIDE_MODEL_LINKS,
} from '@/lib/data/macbook-guide'
import { buildVendorCardsFromShops } from '@/lib/data/guide-shared'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
  RECOMMEND_COUNT_LABEL,
} from '@/lib/data/macbook-recommend'
import ProductCard from '@/app/components/ProductCard'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import ShareBox from '@/app/components/ShareBox'
import VendorCardGrid from '@/app/components/VendorCardGrid'
import GuideModelLinks from '@/app/components/GuideModelLinks'
import { getHeroImage } from '@/lib/data/hero-images'
import AuthorByline from '@/app/components/AuthorByline'
import ContinuousAside from '@/app/components/ContinuousAside'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 3600

const PAGE_TITLE = `中古MacBook完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${GUIDE_DATE_LABEL}版】`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古MacBookの完全購入ガイド。選び方のポイント、モデル別の相場、おすすめ機種をまとめて解説。失敗しない中古MacBook選びをサポートします。`
const PAGE_URL = 'https://used-lab.jp/macbook/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/',
    images: [{ url: getHeroImage('/macbook/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/macbook/')],
  },
}

export default async function MacBookGuidePage() {
  const [allModels, allShopLinks, shops] = await Promise.all([
    getAllMacBookModels(),
    getAllProductShopLinksByType('macbook'),
    getShops(),
  ])

  const vendorCards = buildVendorCardsFromShops(shops, 'macbook_url', '中古MacBookを探す', { exclude: ['rakuma'] })

  // 相場セクション用: 指定slugのモデル + 最新価格を並列取得
  const priceModels = GUIDE_PRICE_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is MacBookModel => m != null)

  const latestPrices = await Promise.all(
    priceModels.map((m) => getLatestMacBookPriceLog(m.id))
  )

  // おすすめ機種セクション用
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is MacBookModel => m != null)

  const recommendPrices = await Promise.all(
    recommendModels.map((m) => getLatestMacBookPriceLog(m.id))
  )

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド' },
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
            { label: '中古MacBook完全購入ガイド' },
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
                中古MacBook完全購入ガイド | 選び方・相場・おすすめモデルまとめ【{GUIDE_DATE_LABEL}版】
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp showAuthor />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/macbook/')}
                  alt="中古MacBook購入ガイドのイメージ"
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
              <p>「MacBookが欲しいけど、新品は高すぎる...中古は状態が心配...」そんな悩みはありませんか？</p>
              <p>
                本ページではあなたが納得して中古MacBookを選べるよう、<strong>{GUIDE_DATE_LABEL}の最新相場や後悔しないための判断基準</strong>を解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                結論から知りたい方は「<Link href="/macbook/recommend/">【{GUIDE_DATE_LABEL}版】おすすめの中古MacBookを{RECOMMEND_COUNT_LABEL}厳選</Link>」をご覧ください。
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
              <li><a href="#market-price" className="toc-item">最新相場 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#caution" className="toc-item">注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#recommended" className="toc-item">目的別 おすすめ機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#where-to-buy" className="toc-item">購入先比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#compare-devices" className="toc-item">他デバイスとの比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">スペック比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#related" className="toc-item">関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
</div>
          </div>
        </nav>
        <div className="l-sections">

          {/* ========== 中古MacBookの最新相場 ========== */}
          <section className="l-section" id="market-price" aria-labelledby="heading-market-price">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-market-price">中古MacBookの最新相場【毎日更新】</h2>
              <p className="m-section-desc">楽天市場の中古ショップから価格を毎日自動で更新。</p>
              <p className="m-section-desc">各モデルの最小構成（最小メモリ・最小ストレージ）での最安値を基準にしています。</p>

              <div className="u-list-reset u-mb-2xl l-grid l-grid--2col l-grid--gap-lg">
                {priceModels.map((model, i) => {
                  const price = latestPrices[i]
                  const minPrice = price?.min1_price
                  const storageLabel = model.strage?.match(/(\d+(?:GB|TB))/)?.[1] || ''
                  const iosysLink = allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)
                  return (
                    <ProductCard
                      key={model.id}
                      variant="compact"
                      modelId={model.id}
                      modelName={model.model.replace(/（\d{4}）/, '')}
                      imageUrl={model.image ? `/images/macbook/${model.image}` : null}
                      metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                      priceLabel={`中古相場（${storageLabel}）`}
                      priceValue={minPrice ? `¥${minPrice.toLocaleString()}` : '-'}
                      shopUrl={iosysLink?.url}
                    />
                  )
                })}
              </div>

              <p className="guide-section-note">Apple Silicon搭載MacBook全{allModels.length}機種の詳細な価格推移グラフ・相場データをご覧いただけます</p>
              <div className="guide-section-cta">
                <Link href="/macbook/price-info/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古MacBookの相場・価格推移グラフ</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 中古MacBookを選ぶ際の確認ポイント ========== */}
          <section className="l-section" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古MacBookを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古MacBookを購入する際に確認しておきたい6つのポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古Macを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box m-card m-card--shadow u-mb-2xl">
                <dl className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">macOSのサポート期間（端末の寿命）</dt>
                    <dd className="glossary-item-desc">
                      MacBookのmacOSサポート期間の目安は発売から約7年。Intelモデルは既にサポートが終了しているものが多いため、Appleシリコン（M1以降）搭載モデルを選びましょう。
                      <div className="u-mt-sm">詳細：<Link href="/macbook/used-macbook-support/">中古MacBookの寿命とサポート期間の目安</Link></div>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">バッテリーの充放電回数</dt>
                    <dd className="glossary-item-desc">
                      MacBookのバッテリーは約1,000回の充放電で設計寿命を迎えます。充放電回数が多い端末は<strong>バッテリー持ちが大幅に短くなる</strong>ため、購入前に回数を確認しましょう。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">Appleシリコン vs Intel</dt>
                    <dd className="glossary-item-desc">
                      2020年以降のAppleシリコン（M1〜）モデルは、Intel搭載モデルと比べて性能・バッテリー持ち・macOSサポート期間のすべてで優れています。中古でもAppleシリコンモデルを強くおすすめします。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ストレージ容量の確認</dt>
                    <dd className="glossary-item-desc">
                      MacBookはストレージの後から増設ができません。Web閲覧・事務作業なら256GB、写真や動画を扱うなら512GB以上を選びましょう。購入後に容量不足で後悔するケースが多いポイントです。詳しくは<Link href="/macbook/storage-guide/">ストレージ容量ガイド</Link>をご覧ください。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ショップの動作保証</dt>
                    <dd className="glossary-item-desc">
                      中古品はメーカー保証が切れていることが多いため、販売店独自の保証内容が安心材料になります。キーボードやディスプレイの不具合が保証対象かどうかも確認しましょう。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">外装状態・ランク表記</dt>
                    <dd className="glossary-item-desc">
                      天板やパームレストの傷は価格に影響します。MacBookはアルミ筐体のため小傷がつきやすい製品です。自分が許容できる状態をあらかじめ決めておくと選びやすくなります。
                    </dd>
                  </div>
                </dl>
              </div>

              <p className="guide-section-note">さらに詳しい確認方法やフリマサイトでの注意点などは以下の記事にまとめています。</p>
              <div className="guide-section-cta">
                <Link href="/macbook/used-macbook-attention/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古MacBookの注意点と選び方</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 目的別・おすすめ機種 ========== */}
          <section className="l-section" id="recommended" aria-labelledby="heading-recommended">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommended">目的別・おすすめ機種</h2>
              <p className="m-section-desc">{GUIDE_DATE_LABEL}現在、中古市場で選択肢として検討されることが多い機種の例を、目的別に整理しました。</p>
              <p className="m-section-desc">それぞれの「特徴」と「選ばれる理由の傾向」をまとめています。</p>

              <div className="guide-recommend-list">
                {recommendModels.map((model, i) => {
                  const meta = RECOMMEND_META[model.slug]
                  const price = recommendPrices[i]
                  const minPrice = price?.min1_price
                  const storageLabel = model.strage?.match(/(\d+(?:GB|TB))/)?.[1] || ''
                  const iosysLink = allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)
                  return (
                    <ProductCard
                      key={model.id}
                      variant="detail"
                      modelId={model.id}
                      modelName={model.model}
                      imageUrl={model.image ? `/images/macbook/${model.image}` : null}
                      metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                      tagLabel={meta?.label || ''}
                      specs={[
                        model.date ? `${model.date.split('/')[0]}年発売` : '',
                        model.cpu || '',
                        model.size || '',
                      ]}
                      description={meta?.desc || ''}
                      priceLabel={minPrice ? `中古相場（${storageLabel}）` : ''}
                      priceValue={minPrice ? `¥${minPrice.toLocaleString()}` : ''}
                      shopUrl={iosysLink?.url}
                      fallbackHref={`/macbook/${model.slug}/`}
                      fallbackText="詳細を見る"
                    />
                  )
                })}
              </div>

              <p className="guide-section-note">{GUIDE_DATE_LABEL}現在おすすめの中古MacBookはこちらの記事でじっくり解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/macbook/recommend/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古MacBookのおすすめ機種</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古MacBookはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古MacBook販売店の比較情報。保証内容、価格、在庫の豊富さなど、</p>
              <p className="m-section-desc">各ショップの特徴を一覧表で整理しました。</p>

              <VendorCardGrid cards={vendorCards} />

              <p className="guide-section-note u-mt-2xl">各ショップの詳細やサービス内容の違いは以下の記事で解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/macbook/macbook-shop/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古MacBookを安心して購入できるECサイト</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>

            </div>
          </section>

          {/* ========== 他のデバイスとの比較 ========== */}
          <section className="l-section" id="compare-devices" aria-labelledby="heading-compare-devices">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-compare-devices">MacBookと他デバイスの比較</h2>
              <p className="m-section-desc">「iPadとどっちがいい？」「Windowsから乗り換えるべき？」といった疑問に答える比較記事をまとめました。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg">
                <Link href="/macbook/air-pro-compare/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/macbook/air-pro-compare/')} alt="MacBook AirとProの比較" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <p className="related-link-card__title">MacBook AirとProどっちがいい？</p>
                    <p className="related-link-card__desc">冷却方式・チップ性能・ディスプレイ・ポート・中古価格の5観点で違いを解説。用途別おすすめ早見表付き。</p>
                  </div>
                </Link>
                <Link href="/macbook/ipad-macbook-compare/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/macbook/ipad-macbook-compare/')} alt="MacBookとiPadの比較" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <p className="related-link-card__title">MacBookとiPadどっちを買う？</p>
                    <p className="related-link-card__desc">作業効率・携帯性・価格・Apple Pencil対応など、用途別に両者の違いをわかりやすく比較。タブレットかノートPCか迷っている方に。</p>
                  </div>
                </Link>
                <Link href="/macbook/windows-mac-compare/" className="m-card m-card--shadow related-link-card m-card--hoverable">
                  <Image src={getHeroImage('/macbook/windows-mac-compare/')} alt="MacとWindowsの比較" className="related-link-card__img" width={400} height={300} loading="lazy" />
                  <div className="related-link-card__body">
                    <p className="related-link-card__title">MacとWindowsどっちがいい？</p>
                    <p className="related-link-card__desc">操作性・対応ソフト・コスト・互換性など初心者にもわかりやすく解説。Windowsからの乗り換えを検討中の方にもおすすめ。</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== スペック比較ガイド ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古MacBookのデータ・スペック比較ガイド</h2>
              <p className="m-section-desc">チップ性能、ポート構成、サポート期間など、機種選びに役立つ詳細なスペック比較記事をまとめました。</p>

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

              {/* 歴代MacBook 個別記事リンク集 */}
              <div className="guide-model-links">
                <h3 className="guide-model-links__heading">歴代MacBook 個別記事リンク集</h3>
                <p className="guide-model-links__desc">各モデルの詳細スペック、中古相場、購入時の注意点を個別にまとめています。</p>
              </div>

              <GuideModelLinks
                basePath="/macbook"
                categories={[
                  { label: 'MacBook Pro 14インチ', items: GUIDE_MODEL_LINKS.pro14 },
                  { label: 'MacBook Pro 16インチ', items: GUIDE_MODEL_LINKS.pro16 },
                  { label: 'MacBook Pro 13インチ', items: GUIDE_MODEL_LINKS.pro13 },
                ]}
              />

              <GuideModelLinks
                basePath="/macbook"
                categories={[
                  { label: 'MacBook Air 13インチ', items: GUIDE_MODEL_LINKS.air13 },
                  { label: 'MacBook Air 15インチ', items: GUIDE_MODEL_LINKS.air15 },
                ]}
              />
            </div>
          </section>

          {/* ========== よくある質問 ========== */}
          <FaqSection
            title="中古MacBookに関するよくある質問"
            description="中古MacBookの購入を検討している方からよく寄せられる質問をまとめました。"
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
