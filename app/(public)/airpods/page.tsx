import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getAllAirPodsModels,
  getLatestAirPodsPriceLog,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { AirPodsModel, AirPodsPriceLog } from '@/lib/types'
import { formatPrice } from '@/lib/utils/shared-helpers'
import {
  GUIDE_DATE_LABEL,
  GUIDE_PRICE_SLUGS,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
  GUIDE_MODEL_LINKS,
  GUIDE_VENDOR_CARDS,
} from '@/lib/data/airpods-guide'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
  RECOMMEND_COUNT_LABEL,
} from '@/lib/data/airpods-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import VendorCardGrid from '@/app/components/VendorCardGrid'
import GuideModelLinks from '@/app/components/GuideModelLinks'

const PAGE_TITLE = `中古AirPods完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${GUIDE_DATE_LABEL}版】`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古AirPodsの完全購入ガイド。選び方のポイント、モデル別の相場、おすすめ機種をまとめて解説。失敗しない中古AirPods選びをサポートします。`
const PAGE_URL = 'https://used-lab.com/airpods/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/airpods/',
    images: [{ url: '/images/airpods/mtjv3j:a.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/airpods/mtjv3j:a.jpg'],
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
  const [allModels, allShopLinks] = await Promise.all([
    getAllAirPodsModels(),
    getAllProductShopLinksByType('airpods'),
  ])

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

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古AirPods完全ガイド' },
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
                  src="/images/content/airpods-image-01.jpg"
                  alt="中古AirPods購入ガイドのイメージ"
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
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li><a href="#market-price" className="toc-item">最新相場 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#caution" className="toc-item">注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#recommended" className="toc-item">目的別 おすすめ機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#where-to-buy" className="toc-item">購入先比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">関連記事 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
          </div>
        </nav>

        <div itemProp="articleBody">

          {/* ========== 中古AirPodsの最新相場 ========== */}
          <section className="l-section" id="market-price" aria-labelledby="heading-market-price">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-market-price">中古AirPodsの最新相場【毎日更新】</h2>
              <p className="m-section-desc">イオシス・じゃんぱら・eイヤホンの価格を毎日自動で更新。</p>
              <p className="m-section-desc">ファームウェアサポート期間・中古流通量・価格のバランスを基準に、「今買われやすい中古AirPods」を抽出しています。</p>

              <div className="guide-price-grid l-grid l-grid--2col l-grid--gap-lg">
                {priceModels.map((model, i) => (
                  <div key={model.id} className="guide-price-card m-card m-card--shadow">
                    <figure className="guide-price-card__img">
                      <img
                        src={model.image ? `/images/airpods/${model.image}` : `https://placehold.co/80x80/f5f5f7/1d1d1f?text=AirPods`}
                        alt={model.name}
                        width={80}
                        height={80}
                        loading="lazy"
                      />
                    </figure>
                    <div className="guide-price-card__info">
                      <h3 className="guide-price-card__name">{model.name}</h3>
                      <p className="guide-price-card__meta">
                        {model.date ? `${model.date.split('/')[0]}年` : ''} / {model.chip || ''}
                      </p>
                    </div>
                    <div className="guide-price-card__price">
                      <span className="guide-price-card__label">中古相場</span>
                      <span className="guide-price-card__value m-price-display m-price-display--sm m-price-display--primary">{getAirPodsMinPrice(latestPrices[i])} 〜</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="guide-section-note">各モデルの詳細な価格推移グラフ・相場データをご覧いただけます</p>
              <div className="guide-section-cta">
                <Link href="/airpods/price/" className="m-btn m-btn--primary m-btn--block">
                  <span>AirPodsの中古相場・価格推移グラフ</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 中古AirPodsを選ぶ際の確認ポイント ========== */}
          <section className="l-section l-section--bg-subtle" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古AirPodsを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古AirPodsを購入する際に確認しておきたい5つのポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古イヤホンを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box glossary-box--numbered m-card m-card--shadow">
                <ol className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">ファームウェアサポート期間</dt>
                    <dd className="glossary-item-desc">
                      AirPodsのファームウェアサポートは発売から約7年が目安。古すぎるモデルはサポート終了が近いため、新機能が使えなくなるリスクがあります。
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
                      傷や汚れの程度は価格に影響します。カナル型（Pro）の場合はイヤーチップの劣化もチェック。交換用チップは別途購入可能です。
                    </dd>
                  </div>
                </ol>
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
                    <div key={model.id} className="guide-recommend m-card m-card--shadow">
                      <div className="guide-recommend__inner">
                        <figure className="guide-recommend__img">
                          <img
                            src={model.image ? `/images/airpods/${model.image}` : `https://placehold.co/120x140/f5f5f7/1d1d1f?text=AirPods`}
                            alt={model.name}
                            width={120}
                            height={140}
                            loading="lazy"
                          />
                        </figure>
                        <div className="guide-recommend__body">
                          <div className="guide-recommend__header">
                            <h3 className="guide-recommend__name">{model.name}</h3>
                            <span className="guide-recommend__tag">{meta?.label || ''}</span>
                          </div>
                          <ul className="guide-recommend__specs">
                            <li>{model.date ? `${model.date.split('/')[0]}年発売` : ''}</li>
                            <li>{model.chip || ''}</li>
                            <li>{model.fit || ''}</li>
                          </ul>
                          <p className="guide-recommend__desc">{meta?.desc || ''}</p>
                        </div>
                        <div className="guide-recommend__aside">
                          <span className="guide-recommend__price-label">中古相場</span>
                          <span className="guide-recommend__price-value m-price-display m-price-display--md">{getAirPodsMinPrice(recommendPrices[i])}〜</span>
                          {(() => {
                            const iosysLink = allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)
                            return iosysLink ? (
                              <a href={iosysLink.url} className="m-btn m-btn--primary m-btn--sm" target="_blank" rel="noopener noreferrer nofollow">
                                <span>在庫情報を見る</span>
                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                              </a>
                            ) : (
                              <Link href={`/airpods/${model.slug}/`} className="m-btn m-btn--primary m-btn--sm">
                                <span>在庫情報を見る</span>
                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                              </Link>
                            )
                          })()}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="guide-section-note">{GUIDE_DATE_LABEL}現在おすすめの中古AirPodsはこちらの記事でじっくり解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/airpods/recommend/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古AirPodsのおすすめ機種【{GUIDE_DATE_LABEL}版】</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section l-section--bg-subtle" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古AirPodsはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古AirPods販売店の比較情報。保証内容、価格、在庫の豊富さなど、</p>
              <p className="m-section-desc">各ショップの特徴を一覧表で整理しました。</p>

              <VendorCardGrid cards={GUIDE_VENDOR_CARDS} />
            </div>
          </section>

          {/* ========== 関連記事・モデル一覧 ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古AirPodsの関連記事</h2>
              <p className="m-section-desc">価格推移やおすすめモデルなど、中古AirPods選びに役立つ記事をまとめました。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg guide-spec-links">
                {GUIDE_SPEC_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="m-card m-card--shadow related-link-card m-card--hoverable">
                    <img src={link.image} alt={link.title} className="related-link-card__img" width={400} height={300} loading="lazy" />
                    <div className="related-link-card__body">
                      <h3 className="related-link-card__title">{link.title}</h3>
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
          <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">中古AirPodsに関するよくある質問</h2>
              <p className="m-section-desc">中古AirPodsの購入を検討している方からよく寄せられる質問をまとめました。</p>
              <div className="faq-list">
                {GUIDE_FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="m-card faq-item">
                    <h3 className="faq-question">{item.question}</h3>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
