import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import IconCard from '@/app/components/IconCard'
import PopularSection from '@/app/components/support/PopularSection'
import {
  getAllIPadModels,
  getLatestIPadPriceLog,
  getAllProductShopLinksByType,
  getShops,
} from '@/lib/queries'
import type { IPadModel, IPadPriceLog } from '@/lib/types'
import { formatPrice, getMinPrice, buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import {
  GUIDE_DATE_LABEL,
  GUIDE_PRICE_SLUGS,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
  GUIDE_MODEL_LINKS,
} from '@/lib/data/ipad-guide'
import { buildVendorCardsFromShops } from '@/lib/data/guide-shared'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
} from '@/lib/data/ipad-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import ShareBox from '@/app/components/ShareBox'
import VendorCardGrid from '@/app/components/VendorCardGrid'
import GuideModelLinks from '@/app/components/GuideModelLinks'
import { getHeroImage } from '@/lib/data/hero-images'
import ProductCard from '@/app/components/ProductCard'
import AuthorByline from '@/app/components/AuthorByline'
import HeroMeta from '@/app/components/HeroMeta'

export const revalidate = 3600

const PAGE_TITLE = `中古iPad完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${GUIDE_DATE_LABEL}版】`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古iPadの完全購入ガイド。選び方のポイント、モデル別の相場、おすすめ機種をまとめて解説。失敗しない中古iPad選びをサポートします。`
const PAGE_URL = 'https://used-lab.jp/ipad/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/',
    images: [{ url: getHeroImage('/ipad/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/ipad/')],
  },
}

export default async function IPadGuidePage() {
  const [allModels, allShopLinks, shops] = await Promise.all([
    getAllIPadModels(),
    getAllProductShopLinksByType('ipad'),
    getShops(),
  ])

  const vendorCards = buildVendorCardsFromShops(shops, 'ipad_url', '中古iPadを探す', { exclude: ['rakuma'] })

  // 相場セクション用: 指定slugのモデル + 最新価格を並列取得
  const priceModels = GUIDE_PRICE_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is IPadModel => m != null)

  const latestPrices = await Promise.all(
    priceModels.map((m) => getLatestIPadPriceLog(m.id))
  )

  // おすすめ機種セクション用（/ipad/recommend/ と同じデータソース）
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is IPadModel => m != null)

  const recommendPrices = await Promise.all(
    recommendModels.map((m) => getLatestIPadPriceLog(m.id))
  )

  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/page.tsx')

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド' },
    ],
  }

    const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  /** モデルのストレージラベル */
  function getStorageLabel(model: IPadModel): string {
    if (!model.strage) return ''
    const first = model.strage.split('/')[0]
    return first
  }

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

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPad完全購入ガイド' },
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
                中古iPad完全購入ガイド
                選び方・相場・おすすめモデルまとめ【{GUIDE_DATE_LABEL}版】
              </h1>
              <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <Image
                  src={getHeroImage('/ipad/')}
                  alt="中古iPad購入ガイドのイメージ"
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
              <p>「iPadが欲しいけど種類が多すぎてどれを選べばいいかわからない...」そんな悩みはありませんか？</p>
              <p>
                本ページではあなたが納得して中古iPadを選べるよう、<strong>{GUIDE_DATE_LABEL}の最新相場や後悔しないための判断基準</strong>を解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                結論から知りたい方は「<Link href="/ipad/recommend/">おすすめの中古iPadを5機種厳選</Link>」をご覧ください。
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
              <li><a href="#usage" className="toc-item">使い道・活用シーン <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">スペック比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
</div>
          <AuthorByline />
          </div>
        </nav>

        <div className="l-sections" itemProp="articleBody">

          {/* ========== 絞り込みツール ========== */}
          <PopularSection
            sectionId="filter-tool"
            headingId="heading-filter-tool"
            sectionTitle="条件に合うiPadを絞り込む"
            sectionDescription="予算・画面サイズ・Apple Pencil対応・用途など、ご自身の条件を選ぶことで候補を絞り込めます。"
            imageSrc="/images/content/thumbnail/simulator.jpg"
            imageAlt="iPad機種絞り込みツール"
            subtitle="条件にチェックを打つだけ！"
            cardTitle="iPad機種絞り込みツール"
            cardDescription="イラストを描きたい、動画を大画面で楽しみたいなどの希望や予算金額などにチェックを打つだけで、あなたにぴったり合うiPadをシミュレーションすることができます。"
            buttonText="機種診断スタート"
            buttonHref="/ipad/ipad-filter-search/"
          />

          {/* ========== 中古iPadの最新相場 ========== */}
          <section className="l-section" id="market-price" aria-labelledby="heading-market-price">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-market-price">中古iPadの最新相場【毎日更新】</h2>
              <p className="m-section-desc">イオシス・GEO・じゃんぱらの価格を毎日自動で更新。</p>
              <p className="m-section-desc">iPadOSサポート期間・流通量・価格安定性の3点を基準に、「今買われやすい中古iPad」を抽出しています。</p>

              <div className="u-list-reset u-mb-2xl l-grid l-grid--2col l-grid--gap-lg">
                {priceModels.map((model, i) => (
                  <ProductCard
                    key={model.id}
                    variant="compact"
                    modelId={model.id}
                    modelName={model.model}
                    imageUrl={model.image ? `/images/ipad/${model.image}` : null}
                    metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                    priceLabel={`中古相場（${getStorageLabel(model)}）`}
                    priceValue={getMinPrice(latestPrices[i])}
                    shopUrl={allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)?.url}
                  />
                ))}
              </div>

              <p className="guide-section-note">歴代iPadの詳細な価格推移グラフ・相場データをご覧いただけます</p>
              <div className="guide-section-cta">
                <Link href="/ipad/ipad-price-info/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPadの相場・価格推移グラフ</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 中古iPadを選ぶ際の確認ポイント ========== */}
          <section className="l-section" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古iPadを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古iPadを購入する際に確認しておきたい8つのポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古タブレットを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box glossary-box--numbered m-card m-card--shadow">
                <ol className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">iPadOSのサポート期間（端末の寿命）</dt>
                    <dd className="glossary-item-desc">
                      iPadOSサポート期間の目安は発売から6〜7年ほど。古すぎる機種は購入してすぐにサポート外になるリスクがあるので注意。
                      <br />詳細：<Link href="/ipad/used-ipad-support/">中古iPadの寿命とサポート期間の目安</Link>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">Wi-FiモデルかCellularモデルか</dt>
                    <dd className="glossary-item-desc">
                      iPadにはWi-Fi専用モデルとCellular対応モデルがあります。外出先で単体で通信したい場合はCellularモデルを選びましょう。
                      <br />詳細：<Link href="/ipad/wifi-cellular/">Wi-FiモデルとCellularモデルの違い</Link>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">Apple Pencilの対応世代</dt>
                    <dd className="glossary-item-desc">
                      Apple Pencilは世代ごとに対応モデルや機能が異なります。購入前に互換性とやりたいことが実現できるかを確認しましょう。
                      <br />詳細：<Link href="/ipad/apple-pencil-compare/">Apple Pencil対応比較表</Link>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">Face ID か Touch ID か</dt>
                    <dd className="glossary-item-desc">
                      iPad Pro（第3世代以降）はFace ID、それ以外のモデルはTouch ID（トップボタン式またはホームボタン式）を搭載しています。マスク着用時やApple Pencil操作中の使い勝手に差が出るため、自分の利用シーンに合った認証方式を選びましょう。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">USB-C か Lightning か</dt>
                    <dd className="glossary-item-desc">
                      iPad 第10世代以降・iPad Air 第4世代以降・iPad Pro 第3世代以降・iPad mini 第6世代以降はUSB-Cポートを搭載しています。それ以前のモデルはLightning端子です。USB-Cなら外部ストレージやモニターとの接続が容易で、充電器もiPhoneやMacBookと共用しやすくなります。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">バッテリーの状態</dt>
                    <dd className="glossary-item-desc">
                      中古iPadではバッテリーの劣化具合が使い心地に直結します。最大容量80%未満の場合、価格が安くても<strong>購入後に交換が必要になるケース</strong>が多く、割高になることも。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">アクティベーションロックの有無</dt>
                    <dd className="glossary-item-desc">
                      前の所有者のApple IDが残っている端末は使用できません。初期化済みかどうか、確実に確認することが重要です。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ネットワーク利用制限（Cellularモデル）</dt>
                    <dd className="glossary-item-desc">
                      Cellularモデルの中古iPadには、前の所有者の分割払い状況によって通信が制限される「赤ロム」のリスクがあります。赤ロム永久保証付きのショップを選べば安心です。
                      <br />詳細：<Link href="/iphone/network-limit/">ネットワーク制限△のメリット・デメリットを解説</Link>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ショップの動作保証</dt>
                    <dd className="glossary-item-desc">
                      中古品はメーカー保証が切れていることが多いため、販売店独自の保証内容が安心材料になります。
                    </dd>
                  </div>
                </ol>
              </div>

              <p className="guide-section-note">さらに詳しい確認方法や、フリマサイトでの注意点などは以下の記事にまとめています。</p>
              <div className="guide-section-cta">
                <Link href="/ipad/used-ipad-attention/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPadの注意点と選び方</span>
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
                      imageUrl={model.image ? `/images/ipad/${model.image}` : null}
                      metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                      tagLabel={meta?.label || ''}
                      specs={[
                        model.date ? `${model.date.split('/')[0]}年発売` : '',
                        model.cpu || '',
                        model.display ? model.display.split(' ')[0] : '',
                      ]}
                      description={meta?.desc || ''}
                      priceLabel={`中古相場（${getStorageLabel(model)}）`}
                      priceValue={getMinPrice(recommendPrices[i])}
                      shopUrl={allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)?.url}
                      fallbackHref={`/ipad/${model.slug}/`}
                    />
                  )
                })}
              </div>

              <p className="guide-section-note">{GUIDE_DATE_LABEL}現在おすすめの中古iPadはこちらの記事でじっくり解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/ipad/recommend/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPadのおすすめ機種</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古iPadはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古iPad販売店の比較情報。保証内容、価格、在庫の豊富さなど、</p>
              <p className="m-section-desc">各ショップの特徴を一覧表で整理しました。</p>

              <VendorCardGrid cards={vendorCards} />

              <p className="guide-section-note u-mt-2xl">各ショップの詳細やサービス内容の違いは以下の記事で解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/ipad/ipad-shop/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPadを安心して購入できるECサイト</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>

              <div className="m-callout m-callout--tip u-mt-2xl">
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  中古以外にもApple認定整備済製品・Amazon・家電量販店のセールなど、iPadを安く買う方法はさまざまです。新品・中古を含めた全7つの購入先を「<Link href="/ipad/ipad-buy/">iPadを安く買うには？おすすめの購入先7つを比較</Link>」で解説しています。
                </p>
              </div>
            </div>
          </section>

          {/* ========== iPadの使い道・活用シーン ========== */}
          <section className="l-section" id="usage" aria-labelledby="heading-usage">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-usage">iPadの使い道・活用シーン</h2>
              <p className="m-section-desc">「iPadって結局何に使えるの？」という疑問をお持ちの方へ。</p>
              <p className="m-section-desc">iPadは動画やゲームなどのエンタメはもちろん、勉強・仕事の効率化からイラスト制作まで幅広く活躍するデバイスです。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg u-mb-xl">
                <IconCard icon="fa-solid fa-film" title="エンタメ">
                  <ul style={{ paddingLeft: 'var(--space-lg)', listStyle: 'disc', lineHeight: 2, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    <li>大画面での動画視聴（Netflix・Amazon Prime Video・YouTube）</li>
                    <li>電子書籍・マンガ（Kindle・楽天kobo）</li>
                    <li>ゲーム（原神など高グラフィックタイトルに対応）</li>
                    <li>音楽鑑賞（Apple Music・Spotify）</li>
                  </ul>
                </IconCard>
                <IconCard icon="fa-solid fa-palette" title="クリエイティブ">
                  <ul style={{ paddingLeft: 'var(--space-lg)', listStyle: 'disc', lineHeight: 2, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    <li>Apple Pencilを使ったイラスト制作（Procreate・CLIP STUDIO PAINT）</li>
                    <li>写真編集・RAW現像（Lightroom・Snapseed）</li>
                    <li>動画編集（LumaFusion・iMovie）</li>
                    <li>デザイン・バナー作成（Canva・Affinity Designer）</li>
                  </ul>
                </IconCard>
                <IconCard icon="fa-solid fa-graduation-cap" title="勉強・仕事">
                  <ul style={{ paddingLeft: 'var(--space-lg)', listStyle: 'disc', lineHeight: 2, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    <li>手書きノート（GoodNotes・Notability）</li>
                    <li>PDFへの書き込み・教科書のデジタル化</li>
                    <li>Split Viewを使ったながら勉強・マルチタスク</li>
                    <li>プレゼン資料作成・ペーパーレス化</li>
                    <li>SidecarでMacのサブディスプレイとして活用</li>
                  </ul>
                </IconCard>
                <IconCard icon="fa-solid fa-house" title="暮らし・その他">
                  <ul style={{ paddingLeft: 'var(--space-lg)', listStyle: 'disc', lineHeight: 2, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    <li><Link href="/ipad/car-navigation-system/" style={{ color: 'var(--color-primary)' }}>カーナビ代わり</Link>に大画面で地図表示</li>
                    <li>レシピを見ながら料理</li>
                    <li>スマートホームの操作パネル（HomeKit）</li>
                    <li>子供の知育・学習用タブレット</li>
                  </ul>
                </IconCard>
              </div>

              <div className="m-callout m-callout--tip u-mt-2xl">
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  各活用シーンの詳しい解説やおすすめアプリは「<Link href="/ipad/howto-use-ipad/">iPadの便利な使い道22選</Link>」でまとめています。購入前に具体的な使用イメージを確認したい方はぜひご覧ください。
                </p>
              </div>
            </div>
          </section>

          {/* ========== スペック比較ガイド ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古iPadのデータ・スペック比較ガイド</h2>
              <p className="m-section-desc">Apple Pencil対応、Wi-Fi/Cellularの違い、サポート期間など、機種選びに役立つ詳細なスペック比較記事をまとめました。</p>

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

              {/* 歴代iPad 個別記事リンク集 */}
              <GuideModelLinks
                basePath="/ipad"
                heading="歴代iPad 個別記事リンク集"
                description="各モデルの詳細スペック、中古相場、購入時の注意点を個別にまとめています。"
                categories={[
                  { label: 'iPad Pro', items: GUIDE_MODEL_LINKS.pro },
                  { label: 'iPad Air', items: GUIDE_MODEL_LINKS.air },
                  { label: 'iPad（無印）', items: GUIDE_MODEL_LINKS.standard },
                  { label: 'iPad mini', items: GUIDE_MODEL_LINKS.mini },
                ]}
              />
            </div>
          </section>

          {/* ========== よくある質問 ========== */}
          <FaqSection
            title="中古iPadに関するよくある質問"
            description="中古iPadの購入を検討している方からよく寄せられる質問をまとめました。"
            items={GUIDE_FAQ_ITEMS}
          />

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
