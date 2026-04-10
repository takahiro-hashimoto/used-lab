import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAllIPhoneModels,
  getLatestPriceLog,
  getAllProductShopLinksByType,
  getShops,
} from '@/lib/queries'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'
import { formatPrice, getMinPrice, buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import {
  GUIDE_DATE_LABEL,
  GUIDE_PRICE_SLUGS,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
  GUIDE_MODEL_LINKS,
  GUIDE_COMPARE_LINKS,
} from '@/lib/data/iphone-guide'
import { buildVendorCardsFromShops } from '@/lib/data/guide-shared'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
} from '@/lib/data/iphone-recommend'
import ProductCard from '@/app/components/ProductCard'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import ShareBox from '@/app/components/ShareBox'
import VendorCardGrid from '@/app/components/VendorCardGrid'
import GuideModelLinks from '@/app/components/GuideModelLinks'
import { getHeroImage } from '@/lib/data/hero-images'
import AuthorByline from '@/app/components/AuthorByline'
import ContinuousAside from '@/app/components/ContinuousAside'
import HeroMeta from '@/app/components/HeroMeta'
import PopularSection from '@/app/components/support/PopularSection'

export const revalidate = 3600

const PAGE_TITLE = `中古iPhone完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${GUIDE_DATE_LABEL}版】`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古iPhoneの完全購入ガイド。選び方のポイント、モデル別の相場、おすすめ機種をまとめて解説。失敗しない中古iPhone選びをサポートします。`
const PAGE_URL = 'https://used-lab.jp/iphone/'

const SERVICE_LINKS = [
  {
    title: 'Widget Club',
    description: 'ホーム画面をお洒落にカスタマイズできる着せ替えアプリ。無料テンプレートも豊富。',
    href: 'https://invite.widget-club.com/c/5031010/1752866/20483?u=https%3A%2F%2Fwidget-club.com%2Fja',
    image: 'https://firebasestorage.googleapis.com/v0/b/widgetclub-c2626.appspot.com/o/banner%2Fcampaign%2Faffiliate_simple_widgetclub.png?alt=media&token=7fd84000-d257-46eb-99f0-89b2f647d926',
    rel: 'sponsored noopener',
  },
  {
    title: 'アプリポ',
    description: 'iPhone向け無料アイコン素材サイト。ホーム画面のカスタム素材が豊富に揃っています。',
    href: 'https://applipo.ne.jp/app/iphone-icon-change-sozai-download/',
    image: '/images/content/thumbnail/apripo-1.webp',
    rel: 'noopener',
  },
  {
    title: '楽天モバイル',
    description: '使った分だけ支払う段階制プラン。20GB以上は2980円で使い放題。',
    href: 'https://hb.afl.rakuten.co.jp/hsc/4ebf9db2.7404390b.1d6c2ffe.7ec2aeb6/?link_type=hybrid_url&rafst=rmn',
    image: 'https://hbb.afl.rakuten.co.jp/hsb/4ebf9dc9.4dc93727.1d6c2ffe.7ec2aeb6/?me_id=2101065&me_adv_id=2377896&t=pict',
    rel: 'nofollow sponsored noopener',
  },
  {
    title: 'モバイル保険',
    description: '中古端末も補償対象。月額700円で3台まで補償、年間10万円まで修理代をカバー。',
    href: 'https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMVW2+45VK+BW8O2',
    image: 'https://www22.a8.net/svt/bgt?aid=191201327468&wid=001&eno=01&mid=s00000019424001056000&mc=1',
    rel: 'nofollow sponsored noopener',
  },
]

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/',
    images: [{ url: getHeroImage('/iphone/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/iphone/')],
  },
}

export default async function IPhoneGuidePage() {
  const [allModels, allShopLinks, shops] = await Promise.all([
    getAllIPhoneModels(),
    getAllProductShopLinksByType('iphone'),
    getShops(),
  ])

  const vendorCards = buildVendorCardsFromShops(shops, 'url', '中古iPhoneを探す', { exclude: ['rakuma', 'carrier'] })

  // 相場セクション用: 指定slugのモデル + 最新価格を並列取得
  const priceModels = GUIDE_PRICE_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is IPhoneModel => m != null)

  const latestPrices = await Promise.all(
    priceModels.map((m) => getLatestPriceLog(m.id))
  )

  // おすすめ機種セクション用（/iphone/recommend/ と同じデータソース）
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is IPhoneModel => m != null)

  const recommendPrices = await Promise.all(
    recommendModels.map((m) => getLatestPriceLog(m.id))
  )

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド' },
    ],
  }

    const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })


  /** モデルのストレージラベル */
  function getStorageLabel(model: IPhoneModel): string {
    if (!model.strage) return ''
    const first = model.strage.split('/')[0]
    return first
  }

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
            { label: '中古iPhone完全購入ガイド' },
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
                中古iPhone完全購入ガイド
                選び方・相場・おすすめモデルまとめ【{GUIDE_DATE_LABEL}版】
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp showAuthor />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/iphone/')}
                  alt="中古iPhone購入ガイドのイメージ"
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
              <p>「新品は高すぎて手が出ない、でも中古は失敗しそうで怖い...」そんな悩みはありませんか？</p>
              <p>
                本ページではあなたが納得して中古iPhoneを選べるよう、<strong>{GUIDE_DATE_LABEL}の最新相場や後悔しないための判断基準</strong>を解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                結論から知りたい方は「<Link href="/iphone/recommend/">【{GUIDE_DATE_LABEL}版】おすすめ中古iPhoneを5機種</Link>」をご覧ください。
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
              <li><a href="#filter-tool" className="toc-item">診断ツール <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#market-price" className="toc-item">最新相場 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#caution" className="toc-item">注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#recommended" className="toc-item">目的別 おすすめ機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#where-to-buy" className="toc-item">購入先比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">スペック比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#heading-sim" className="toc-item">格安SIMセット <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
            </div>
          </div>
        </nav>
        <div className="l-sections">

          {/* ========== 絞り込みツール ========== */}
          <PopularSection
            sectionTitle="条件に合うiPhoneを絞り込む"
            sectionDescription="予算・サイズ・認証方式・充電端子など、ご自身の条件を選ぶことで候補を絞り込めます。"
            imageSrc="/images/content/thumbnail/simulator.jpg"
            imageAlt="iPhone機種絞り込みツール"
            subtitle="条件にチェックを打つだけ！"
            cardTitle="iPhone機種絞り込みツール"
            cardDescription="ゲームを快適にプレイしたい、ケーブルを統一したいなどの希望や・予算金額などにチェックを打つだけであなたにぴったり合うiPhoneをシミュレーションすることができます。"
            buttonText="機種診断スタート"
            buttonHref="/iphone/filter-search/"
            sectionId="filter-tool"
            headingId="filter-tool"
          />

          {/* ========== 中古iPhoneの最新相場 ========== */}
          <section className="l-section" id="market-price" aria-labelledby="heading-market-price">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-market-price">中古iPhoneの最新相場【毎日更新】</h2>
              <p className="m-section-desc">イオシス・GEO・じゃんぱらの価格を毎日自動で更新。</p>
              <p className="m-section-desc">OSサポート期間・流通量・価格安定性の3点を基準に、「今買われやすい中古iPhone」を抽出しています。</p>

              <div className="u-list-reset u-mb-2xl l-grid l-grid--2col l-grid--gap-lg">
                {priceModels.map((model, i) => (
                  <ProductCard
                    key={model.id}
                    variant="compact"
                    modelId={model.id}
                    modelName={model.model}
                    imageUrl={model.image ? `/images/iphone/${model.image}` : null}
                    metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                    priceLabel={`中古相場（${latestPrices[i]?.storage ? `${latestPrices[i].storage}` : getStorageLabel(model)}）`}
                    priceValue={getMinPrice(latestPrices[i])}
                    shopUrl={allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)?.url}
                  />
                ))}
              </div>

              <p className="guide-section-note">2019年以降に発売されたiPhone30機種の詳細な価格推移グラフ・相場データをご覧いただけます</p>
              <div className="guide-section-cta">
                <Link href="/iphone/price-info/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPhoneの相場・価格推移グラフ</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 中古iPhoneを選ぶ際の確認ポイント ========== */}
          <section className="l-section" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古iPhoneを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古iPhoneを購入する際に確認しておきたい6つのポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古スマホを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box m-card m-card--shadow u-mb-2xl">
                <dl className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">iOSのサポート期間（端末の寿命）</dt>
                    <dd className="glossary-item-desc">
                      iPhoneのiOSサポート期間の目安は発売から7年ほど。古すぎる機種は購入してすぐにiOSサポート外になるリスクがあるので注意。
                      <div className="u-mt-sm">詳細：<Link href="/iphone/used-iphone-support/">中古iPhoneの寿命とサポート期間の目安</Link></div>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">バッテリーの状態</dt>
                    <dd className="glossary-item-desc">
                      中古iPhoneではバッテリーの劣化具合が使い心地に直結します。最大容量80%未満の場合、価格が安くても<strong>購入後に交換が必要になるケース</strong>が多く、割高になることも。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">アクティベーションロックの有無</dt>
                    <dd className="glossary-item-desc">
                      前の所有者のApple IDが残っている端末は使用できません。初期化済みかどうか、確実に確認することが重要です。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ネットワーク利用制限（赤ロム）</dt>
                    <dd className="glossary-item-desc">
                      支払い状況の問題で通信が制限される端末があります。利用制限の状態や、保証の有無は事前にチェックしましょう。
                      <p className="lead-link u-mt-xs">
                        <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                        <a href="/iphone/network-limit/">ネットワーク制限△のメリット・デメリットを解説</a>
                      </p>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ショップの動作保証</dt>
                    <dd className="glossary-item-desc">
                      中古品はメーカー保証が切れていることが多いため、販売店独自の保証内容が安心材料になります。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">外装状態・ランク表記</dt>
                    <dd className="glossary-item-desc">
                      傷や使用感は価格に影響します。自分が許容できる状態をあらかじめ決めておくと選びやすくなります。
                    </dd>
                  </div>
                </dl>
              </div>

              <p className="guide-section-note">さらに詳しい確認方法や、フリマサイトでの注意点などは以下の記事にまとめています。</p>
              <div className="guide-section-cta">
                <Link href="/iphone/used-iphone-attention/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPhoneの注意点と選び方</span>
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
                  return (
                    <ProductCard
                      key={model.id}
                      variant="detail"
                      modelId={model.id}
                      modelName={model.model}
                      imageUrl={model.image ? `/images/iphone/${model.image}` : null}
                      metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                      tagLabel={meta?.label || ''}
                      specs={[
                        model.date ? `${model.date.split('/')[0]}年発売` : '',
                        model.cpu || '',
                        model.display ? model.display.split(' ')[0] : '',
                      ]}
                      description={meta?.desc || ''}
                      priceLabel={`中古相場（${recommendPrices[i]?.storage ? `${recommendPrices[i].storage}` : getStorageLabel(model)}）`}
                      priceValue={getMinPrice(recommendPrices[i])}
                      shopUrl={allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)?.url}
                      fallbackHref={`/iphone/${model.slug}/`}
                    />
                  )
                })}
              </div>

              <p className="guide-section-note">{GUIDE_DATE_LABEL}現在おすすめの中古iPhoneはこちらの記事でじっくり解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/iphone/recommend/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPhoneのおすすめ機種</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古iPhoneはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古iPhone販売店の比較情報。保証内容、価格、在庫の豊富さなど、各ショップの特徴を一覧表で整理しました。</p>
              <VendorCardGrid cards={vendorCards} />

              <p className="guide-section-note u-mt-2xl">各ショップの詳細やサービス内容の違いは以下の記事で解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/iphone/iphone-shop/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPhoneを安心して購入できるECサイト</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 格安SIM セット購入バナー ========== */}
          <PopularSection
            sectionTitle="中古iPhone&格安SIMをまとめて乗り換え"
            sectionDescription={<><p className="m-section-desc">中古iPhoneと通信回線をまとめて契約できる格安SIM業者を比較。</p><p className="m-section-desc">端末選びから回線契約まで一度に済ませたい方におすすめです。</p></>}
            imageSrc="/images/content/thumbnail/sim.webp"
            imageAlt="中古iPhoneの購入と通信契約が一緒にできる格安SIM業者まとめ"
            subtitle="回線契約と端末購入を一度に！"
            cardTitle="中古iPhoneの購入と通信契約が一緒にできる格安SIM業者まとめ"
            cardDescription="楽天モバイル・UQモバイル・ワイモバイルなど、中古iPhoneと通信回線をセットで契約できる事業者を比較。あなたに最適な業者が見つかる診断機能付き。"
            buttonText="セット対応業者を見る"
            buttonHref="/iphone/mvno/"
            sectionId="sim"
            headingId="heading-sim"
          />

          {/* ========== スペック比較ガイド ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古iPhoneのデータ・スペック比較ガイド</h2>
              <p className="m-section-desc">カメラ性能、バッテリー寿命、サポート期間など、機種選びに役立つ詳細なスペック比較記事をまとめました。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg u-mb-2xl">
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

              {/* 歴代iPhone 個別記事リンク集 */}
              <GuideModelLinks
                basePath="/iphone"
                heading="歴代iPhone 個別記事別リンク集"
                description="各モデルの詳細スペック、中古相場、購入時の注意点を個別にまとめています。"
                categories={[
                  { label: 'Proモデル', items: GUIDE_MODEL_LINKS.pro },
                  { label: '無印モデル', items: GUIDE_MODEL_LINKS.standard },
                  { label: 'その他（SEなど）', items: GUIDE_MODEL_LINKS.other },
                ]}
              />

              {/* 2機種比較リンク */}
              <div className="guide-model-links">
                <h3 className="guide-model-links__heading">2機種比較</h3>
                <p className="guide-model-links__desc">気になる2機種の違いをスペック・カメラ・バッテリー・中古価格で徹底比較。</p>
                <div className="l-grid l-grid--3col l-grid--gap-md">
                  {GUIDE_COMPARE_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className="guide-model-item m-card">
                      <span className="guide-model-item__name">
                        {link.title}
                      </span>
                      <span className="guide-model-item__meta">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========== 中古iPhone購入者向けサービス ========== */}
          <section className="l-section" aria-labelledby="heading-service-links">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-service-links">中古iPhone購入者向けサービス</h2>
              <p className="m-section-desc">中古iPhoneの購入とセットで検討したいサービスをまとめました。</p>
              <div className="l-grid l-grid--2col l-grid--gap-lg">
                {SERVICE_LINKS.map((service) => (
                  <a
                    key={service.title}
                    href={service.href}
                    target="_blank"
                    rel={service.rel}
                    className="m-card m-card--shadow related-link-card m-card--hoverable"
                    aria-label={`${service.title}（新しいタブで開く）`}
                  >
                    <img
                      decoding="async"
                      src={service.image}
                      alt={service.title}
                      className="related-link-card__img"
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
            title="中古iPhoneに関するよくある質問"
            description="中古iPhoneの購入を検討している方からよく寄せられる質問をまとめました。"
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
