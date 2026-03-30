import type { Metadata } from 'next'
import Link from 'next/link'
import IconCard from '@/app/components/IconCard'
import {
  getAllWatchModels,
  getLatestWatchPriceLog,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { WatchModel, WatchPriceLog } from '@/lib/types'
import { formatPrice, getMinPrice } from '@/lib/utils/shared-helpers'
import {
  GUIDE_DATE_LABEL,
  GUIDE_PRICE_SLUGS,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
  GUIDE_MODEL_LINKS,
  GUIDE_VENDOR_CARDS,
} from '@/lib/data/watch-guide'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
  RECOMMEND_COUNT_LABEL,
} from '@/lib/data/watch-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import VendorCardGrid from '@/app/components/VendorCardGrid'
import GuideModelLinks from '@/app/components/GuideModelLinks'
import ProductCard from '@/app/components/ProductCard'
import { getHeroImage } from '@/lib/data/hero-images'

const PAGE_TITLE = `中古Apple Watch完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${GUIDE_DATE_LABEL}版】`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古Apple Watchの完全購入ガイド。選び方のポイント、モデル別の相場、おすすめ機種をまとめて解説。失敗しない中古Apple Watch選びをサポートします。`
const PAGE_URL = 'https://used-lab.com/watch/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/watch/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/watch/',
    images: [{ url: '/images/watch/watch-9.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/watch/watch-9.jpg'],
  },
}

export default async function WatchGuidePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllWatchModels(),
    getAllProductShopLinksByType('watch'),
  ])

  // 相場セクション用: 指定slugのモデル + 最新価格を並列取得
  const priceModels = GUIDE_PRICE_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is WatchModel => m != null)

  const latestPrices = await Promise.all(
    priceModels.map((m) => getLatestWatchPriceLog(m.id))
  )

  // おすすめ機種セクション用
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is WatchModel => m != null)

  const recommendPrices = await Promise.all(
    recommendModels.map((m) => getLatestWatchPriceLog(m.id))
  )

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古Apple Watch完全購入ガイド' },
    ],
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: dateStr,
    dateModified: dateStr,
    author: { '@type': 'Organization', name: 'ユーズドラボ', url: 'https://used-lab.com/' },
    publisher: { '@type': 'Organization', name: 'ユーズドラボ' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GUIDE_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  /** モデルのサイズラベル */
  function getSizeLabel(model: WatchModel): string {
    if (!model.size) return ''
    const first = model.size.split('/')[0]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古Apple Watch完全購入ガイド' },
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
                中古Apple Watch完全購入ガイド
                選び方・相場・おすすめモデルまとめ【{GUIDE_DATE_LABEL}版】
              </h1>
              <div className="hero-actions">
                <a href="#recommended" className="m-btn m-btn--hero-primary">
                  <i className="fa-regular fa-star" aria-hidden="true"></i>
                  <span>おすすめモデルを見る</span>
                </a>
                <a href="#caution" className="m-btn m-btn--hero-outline">
                  <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
                  <span>選び方を確認</span>
                </a>
              </div>
              <div className="hero-meta">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <span>
                  更新日: <time dateTime={dateStr} itemProp="dateModified">{dateDisplay}</time> | 当記事のリンクには広告が含まれています
                </span>
                <meta itemProp="datePublished" content={dateStr} />
              </div>
            </div>
            <div className="hero-visual">
              <figure className="hero-media">
                <img
                  src="/images/content/thumbnail/apple-watch-image.jpg"
                  alt="中古Apple Watch購入ガイドのイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
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
              <p>「Apple Watchが気になるけど、新品は高いし中古は不安...」そんな悩みはありませんか？</p>
              <p>
                本ページではあなたが納得して中古Apple Watchを選べるよう、<strong>{GUIDE_DATE_LABEL}の最新相場や後悔しないための判断基準</strong>を解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                結論から知りたい方は「<Link href="/watch/recommend/">【{GUIDE_DATE_LABEL}版】おすすめの中古Apple Watchを{RECOMMEND_COUNT_LABEL}厳選</Link>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="toc-title">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li><a href="#filter-tool" className="toc-item">診断ツール <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#market-price" className="toc-item">最新相場 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#caution" className="toc-item">注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#recommended" className="toc-item">目的別 おすすめ機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#where-to-buy" className="toc-item">購入先比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#usage" className="toc-item">できること・活用シーン <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">スペック比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
          </div>
        </nav>

        <div className="l-sections" itemProp="articleBody">

          {/* ========== 絞り込みツール ========== */}
          <section className="l-section" id="filter-tool" aria-labelledby="heading-filter-tool">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-filter-tool">条件に合うApple Watchを絞り込む</h2>
              <p className="m-section-desc">予算・ケースサイズ・健康センサー・バッテリー持ちなど、ご自身の条件を選ぶことで候補を絞り込めます。</p>

              <div className="m-card m-card--shadow popular-card">
                <figure className="popular-card-figure">
                  <img
                    src="/images/content/thumbnail/simulator.jpg"
                    alt="Apple Watch機種絞り込みツール"
                    className="popular-card-img"
                    width={400}
                    height={500}
                    loading="lazy"
                  />
                </figure>
                <div className="popular-card-body">
                  <p className="popular-card-subtitle">条件にチェックを打つだけ！</p>
                  <p className="popular-card-title">Apple Watch機種絞り込みツール</p>
                  <p className="popular-card-desc">健康管理をしっかりしたい、バッテリーが長持ちしてほしいなどの希望や予算にチェックを打つだけで、あなたにぴったり合うApple Watchをシミュレーションすることができます。</p>
                  <div>
                    <Link href="/watch/watch-filter-search/" className="m-btn m-btn--primary">
                      機種診断スタート <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== 中古Apple Watchの最新相場 ========== */}
          <section className="l-section" id="market-price" aria-labelledby="heading-market-price">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-market-price">中古Apple Watchの最新相場【毎日更新】</h2>
              <p className="m-section-desc">イオシス・GEO・じゃんぱらの価格を毎日自動で更新。</p>
              <p className="m-section-desc">watchOSサポート期間・流通量・価格安定性の3点を基準に、「今買われやすい中古Apple Watch」を抽出しています。</p>

              <div className="price-card-grid l-grid l-grid--2col l-grid--gap-lg">
                {priceModels.map((model, i) => (
                  <ProductCard
                    key={model.id}
                    variant="compact"
                    modelId={model.id}
                    modelName={model.model}
                    imageUrl={model.image ? `/images/watch/${model.image}` : null}
                    metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                    priceLabel={`中古相場（${getSizeLabel(model)}）`}
                    priceValue={getMinPrice(latestPrices[i])}
                    shopUrl={allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)?.url}
                  />
                ))}
              </div>

              <p className="guide-section-note">歴代Apple Watchの詳細な価格推移グラフ・相場データをご覧いただけます</p>
              <div className="guide-section-cta">
                <Link href="/watch/watch-price-info/" className="m-btn m-btn--primary m-btn--block">
                  <span>Apple Watchの中古相場・価格推移グラフ</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 中古Apple Watchを選ぶ際の確認ポイント ========== */}
          <section className="l-section" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古Apple Watchを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古Apple Watchを購入する際に確認しておきたい6つのポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古スマートウォッチを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box glossary-box--numbered m-card m-card--shadow">
                <ol className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">watchOSのサポート期間（端末の寿命）</dt>
                    <dd className="glossary-item-desc">
                      OSサポート期間の目安は発売から約5年。古すぎるモデルは購入してすぐにサポート外になるリスクがあるので注意。
                      <br />詳細：<Link href="/watch/used-watch-support/">中古Apple Watchの寿命とサポート期間の目安</Link>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">バッテリーの状態</dt>
                    <dd className="glossary-item-desc">
                      Apple Watchはバッテリー容量が小さいため、劣化の影響がiPhoneより大きくなります。最大容量80%未満の場合、<strong>1日持たなくなるケース</strong>が多く、交換費用も割高です。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">アクティベーションロックの有無</dt>
                    <dd className="glossary-item-desc">
                      前の所有者のApple IDが残っている端末は使用できません。初期化済みかどうか、確実に確認することが重要です。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ケースサイズの確認</dt>
                    <dd className="glossary-item-desc">
                      Apple Watchはモデルごとに40mm / 44mm / 41mm / 45mm / 49mmなどサイズが異なります。手首の太さや好みに合ったサイズを選びましょう。バンドの互換性にも影響します。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">iPhoneとの互換性</dt>
                    <dd className="glossary-item-desc">
                      Apple Watchの利用にはiPhoneが必要です。最新のwatchOSを使うには対応するiOSバージョンが求められるため、お使いのiPhoneとの互換性を事前に確認しましょう。
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">GPSモデルかセルラーモデルか</dt>
                    <dd className="glossary-item-desc">
                      GPSモデルはiPhoneが近くにある前提で動作し、セルラーモデルはApple Watch単体で通話やデータ通信が可能です。常にiPhoneを持ち歩くならGPSモデルで十分。セルラーは別途キャリア契約が必要です。
                      <br />詳細：<Link href="/watch/gps-cellular-compare/">GPSモデルとセルラーモデルの違い</Link>
                    </dd>
                  </div>
                  <div className="glossary-item">
                    <dt className="glossary-item-title">外装状態・ランク表記</dt>
                    <dd className="glossary-item-desc">
                      ケースやディスプレイの傷は価格に影響します。Apple Watchは日常的に腕に着けるため、傷がつきやすい製品です。自分が許容できる状態をあらかじめ決めておくと選びやすくなります。
                    </dd>
                  </div>
                </ol>
              </div>

              <p className="guide-section-note">さらに詳しい確認方法やフリマサイトでの注意点などは以下の記事にまとめています。</p>
              <div className="guide-section-cta">
                <Link href="/watch/used-watch-attention/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古Apple Watchの注意点と選び方</span>
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
                      imageUrl={model.image ? `/images/watch/${model.image}` : null}
                      metaText={`${model.date ? `${model.date.split('/')[0]}年` : ''} / ${model.cpu || ''}`}
                      tagLabel={meta?.label || ''}
                      specs={[
                        model.date ? `${model.date.split('/')[0]}年発売` : '',
                        model.cpu || '',
                        model.size || '',
                      ]}
                      description={meta?.desc || ''}
                      priceLabel={`中古相場（${getSizeLabel(model)}）`}
                      priceValue={getMinPrice(recommendPrices[i])}
                      shopUrl={allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)?.url}
                      fallbackHref={`/watch/${model.slug}/`}
                    />
                  )
                })}
              </div>

              <p className="guide-section-note">{GUIDE_DATE_LABEL}現在おすすめの中古Apple Watchはこちらの記事でじっくり解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/watch/recommend/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古Apple Watchのおすすめ機種【{GUIDE_DATE_LABEL}版】</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古Apple Watchはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古Apple Watch販売店の比較情報。保証内容、価格、在庫の豊富さなど、</p>
              <p className="m-section-desc">各ショップの特徴を一覧表で整理しました。</p>

              <VendorCardGrid cards={GUIDE_VENDOR_CARDS} />

              <p className="guide-section-note guide-section-note--mt">各ショップの詳細やサービス内容の違いは以下の記事で解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/watch/watch-shop/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古Apple Watchを安心して購入できるECサイト</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== できること・活用シーン ========== */}
          <section className="l-section" id="usage" aria-labelledby="heading-usage">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-usage">Apple Watchのできること・活用シーン</h2>
              <p className="m-section-desc">「Apple Watchって何ができるの？」という疑問をお持ちの方へ。</p>
              <p className="m-section-desc">Apple Watchは通知や決済などの日常機能に加え、健康管理やApple製品との連携まで幅広く活躍するデバイスです。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg" style={{ marginBottom: 'var(--space-xl)' }}>
                <IconCard icon="fa-solid fa-clock" title="基本機能">
                  <ul style={{ paddingLeft: 'var(--space-lg)', listStyle: 'disc', lineHeight: 2, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    <li>iPhoneの通知確認・LINEやメッセージの閲覧</li>
                    <li>電話の発着信・Siriでのタイマー操作</li>
                    <li>経路案内（徒歩ナビ）・振動アラーム</li>
                    <li>文字盤カスタマイズ・バンド交換</li>
                    <li>iPhoneカメラのリモート撮影</li>
                  </ul>
                </IconCard>
                <IconCard icon="fa-solid fa-heart-pulse" title="健康・フィットネス">
                  <ul style={{ paddingLeft: 'var(--space-lg)', listStyle: 'disc', lineHeight: 2, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    <li>フィットネスアプリで1日の活動量を管理</li>
                    <li>ワークアウト記録（ランニング・ウォーキング・水泳など）</li>
                    <li>睡眠トラッキング・睡眠の質チェック</li>
                    <li>心拍数モニタリング・心電図（ECG）</li>
                    <li>血中酸素濃度（SpO2）測定・転倒検出</li>
                  </ul>
                </IconCard>
                <IconCard icon="fa-solid fa-credit-card" title="決済・電子マネー">
                  <ul style={{ paddingLeft: 'var(--space-lg)', listStyle: 'disc', lineHeight: 2, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    <li>Suica・PASMOで改札をタッチ通過</li>
                    <li>Apple Payでコンビニ・店舗の電子決済</li>
                    <li>PayPay・楽天ペイなどQRコード決済</li>
                  </ul>
                </IconCard>
                <IconCard icon="fa-brands fa-apple" title="Apple製品連携">
                  <ul style={{ paddingLeft: 'var(--space-lg)', listStyle: 'disc', lineHeight: 2, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    <li>「iPhoneを探す」で遠隔から音を鳴らす</li>
                    <li>置き忘れ防止通知</li>
                    <li>iPhone・MacBookのロック解除</li>
                    <li>AirPodsの再生コントロール</li>
                  </ul>
                </IconCard>
              </div>

              <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
                <span className="m-callout__label">memo</span>
                <p className="m-callout__text">
                  各機能の詳しい解説は「<Link href="/watch/how-to-use-apple-watch/">Apple Watchのできること25選</Link>」でまとめています。購入前に具体的な使用イメージを確認したい方はぜひご覧ください。
                </p>
              </div>
            </div>
          </section>

          {/* ========== スペック比較ガイド ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古Apple Watchのデータ・スペック比較ガイド</h2>
              <p className="m-section-desc">健康センサー、バッテリー性能、サポート期間など、機種選びに役立つ詳細なスペック比較記事をまとめました。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg guide-spec-links">
                {GUIDE_SPEC_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="m-card m-card--shadow related-link-card m-card--hoverable">
                    <img src={getHeroImage(link.href)} alt={link.title} className="related-link-card__img" width={400} height={300} loading="lazy" />
                    <div className="related-link-card__body">
                      <h3 className="related-link-card__title">{link.title}</h3>
                      <p className="related-link-card__desc">{link.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 歴代Apple Watch 個別記事リンク集 */}
              <GuideModelLinks
                basePath="/watch"
                heading="歴代Apple Watch 個別記事リンク集"
                description="各モデルの詳細スペック、中古相場、購入時の注意点を個別にまとめています。"
                categories={[
                  { label: 'Seriesモデル', items: GUIDE_MODEL_LINKS.series },
                  { label: 'Ultraモデル', items: GUIDE_MODEL_LINKS.ultra },
                  { label: 'SEモデル', items: GUIDE_MODEL_LINKS.se },
                ]}
              />
            </div>
          </section>

          {/* ========== よくある質問 ========== */}
          <section className="l-section" id="faq" aria-labelledby="heading-faq">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">中古Apple Watchに関するよくある質問</h2>
              <p className="m-section-desc">中古Apple Watchの購入を検討している方からよく寄せられる質問をまとめました。</p>
              <div className="faq-list">
                <div className="m-card faq-item">
                  <h3 className="faq-question">自分に合った中古Apple Watchの選び方は？</h3>
                  <div className="faq-answer">
                    <p>用途や予算に応じて最適なモデルは異なります。万能モデルならSeries 9、コスパ重視ならSE 第3世代、アウトドア・バッテリー重視ならUltra 2がおすすめです。「<Link href="/watch/watch-filter-search/">Apple Watch機種絞り込みツール</Link>」で条件を絞り込むと、あなたに合った機種が見つかります。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">Apple Watchのスペックを比較したい</h3>
                  <div className="faq-answer">
                    <p>「<Link href="/watch/watch-spec-table/">歴代Apple Watchスペック比較表</Link>」で、歴代Apple Watchのスペックを並べて比較できます。チップ性能、ケースサイズ、健康センサーの対応状況などを一覧で確認できます。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古Apple Watchを買うベストなタイミングはいつですか？</h3>
                  <div className="faq-answer">
                    <p>新型Apple Watch発売直後（9〜10月）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。当サイトの<Link href="/watch/watch-price-info/">価格推移グラフ</Link>で、値下がり傾向を確認してから購入するのがおすすめです。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">Apple WatchのGPSモデルとCellularモデルの違いは？</h3>
                  <div className="faq-answer">
                    <p>GPSモデルはiPhoneと接続して使う基本モデルです。CellularモデルはiPhoneがなくても単体で通話やデータ通信が可能です。ただしCellular利用には別途通信契約が必要で、中古価格も高めです。大半の方はGPSモデルで十分です。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古Apple Watchはどこで買うのがおすすめですか？</h3>
                  <div className="faq-answer">
                    <p>信頼性と保証の観点から、<Link href="/watch/watch-shop/">イオシス・ゲオ・じゃんぱらなどの大手中古専門店</Link>がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古Apple Watchはいつまで使えますか？</h3>
                  <div className="faq-answer">
                    <p>Apple WatchはAppleの発売から約5年間watchOSアップデートのサポートを受けられます。長く使いたい場合は、発売から2〜3年以内のモデルを選ぶと安心です。詳しくは「<Link href="/watch/used-watch-support/">中古Apple Watchの寿命とサポート期間の目安</Link>」をご覧ください。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古Apple Watchのバッテリー状態は確認できますか？</h3>
                  <div className="faq-answer">
                    <p>はい、Apple Watchの「設定」→「バッテリー」→「バッテリーの状態」から最大容量を確認できます。80%以上あれば実用上問題ありません。Apple Watchはバッテリー容量が小さいため、80%を下回ると1日持たなくなることがあります。中古専門店では商品ページにバッテリー状態が記載されていることが多いです。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">Apple WatchはどのiPhoneと組み合わせて使えますか？</h3>
                  <div className="faq-answer">
                    <p>最新のwatchOSを利用するには、対応するiOS以降を搭載したiPhoneが必要です。古いiPhoneを使っている場合は、Apple Watchとの互換性を事前に確認しましょう。詳しくは「<Link href="/watch/used-watch-support/">watchOSサポート期間一覧表</Link>」をご覧ください。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">Apple認定整備済製品と中古Apple Watchの違いは？</h3>
                  <div className="faq-answer">
                    <p>Apple認定整備済製品はAppleが検品・部品交換・クリーニングを行い、バッテリーと外装が新品に交換済みで1年間のApple保証が付きます。ただし、Apple Watchの整備済製品は入荷が少なく選択肢が限られます。中古ショップなら旧モデルを含め機種が豊富で、価格も手頃です。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">おすすめしない中古Apple Watchはどれ？</h3>
                  <div className="faq-answer">
                    <p>Series 4以前のモデルはwatchOSサポートが終了しており、新しいアプリや機能が使えなくなっています。また、Series 3は動作が重く実用的ではありません。長く使いたいなら、Series 7以降またはSE 第2世代以降を選ぶのが安心です。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">Apple Watchのバンドは他のモデルでも使い回せますか？</h3>
                  <div className="faq-answer">
                    <p>Apple Watchのバンドは同じケースサイズ系統であれば世代をまたいで互換性があります。38mm/40mm/41mm系と42mm/44mm/45mm系でそれぞれ共通です。Ultra（49mm）は45mm系バンドも装着可能ですが、Ultra専用バンドは他モデルには使えません。中古で購入する場合はバンドが付属しないケースもあるため、別途購入が必要か事前に確認しましょう。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">Apple Watchのケース素材（アルミ・ステンレス・チタン）の違いは？</h3>
                  <div className="faq-answer">
                    <p>アルミニウムは軽量で価格が手頃なエントリー素材です。ステンレススチールはアルミより重厚感があり傷に強く、サファイアクリスタルガラスを搭載。チタニウムはUltraシリーズに採用されており、軽さと耐久性を両立しています。中古市場ではアルミモデルが最も流通量が多く、ステンレスやチタンは希少なぶん価格も高めです。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
