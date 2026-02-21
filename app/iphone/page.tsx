import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getAllIPhoneModels,
  getShops,
  getLatestPriceLog,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { IPhoneModel, IPhonePriceLog, Shop } from '@/lib/types'
import { formatPrice } from '@/lib/utils/shared-helpers'
import {
  GUIDE_DATE_LABEL,
  GUIDE_PRICE_SLUGS,
  GUIDE_SHOP_TABLE_KEYS,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
  GUIDE_MODEL_LINKS,
} from '@/lib/data/iphone-guide'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
  RECOMMEND_COUNT_LABEL,
} from '@/lib/data/iphone-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'

const PAGE_TITLE = `中古iPhone完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${GUIDE_DATE_LABEL}版】`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古iPhoneの完全購入ガイド。選び方のポイント、モデル別の相場、おすすめ機種をまとめて解説。失敗しない中古iPhone選びをサポートします。`
const PAGE_URL = 'https://used-lab.com/iphone/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/iphone/',
    images: [{ url: '/images/iphone/iphone16pro.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/iphone/iphone16pro.jpg'],
  },
}

/** ショップ比較テーブル用のシンボルマッピング */
function getSymbol(value: string | null): string {
  if (!value) return '-'
  return value
}

export default async function IPhoneGuidePage() {
  const [allModels, shops, allShopLinks] = await Promise.all([
    getAllIPhoneModels(),
    getShops(),
    getAllProductShopLinksByType('iphone'),
  ])

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

  // ショップ比較テーブル用
  const shopRows = GUIDE_SHOP_TABLE_KEYS
    .map((key) => shops.find((s) => s.shop_key === key))
    .filter((s): s is Shop => s != null)

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全ガイド' },
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

  /** モデルの最小価格を取得 */
  function getMinPrice(price: IPhonePriceLog | null): string {
    if (!price) return '-'
    const mins = [price.iosys_min, price.geo_min, price.janpara_min].filter(
      (v): v is number => v != null && v > 0
    )
    if (mins.length === 0) return '-'
    return formatPrice(Math.min(...mins))
  }

  /** モデルのストレージラベル */
  function getStorageLabel(model: IPhoneModel): string {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

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
              </h1>
              <p className="hero-description" itemProp="description">
                選び方・相場・おすすめモデルまとめ【{GUIDE_DATE_LABEL}版】
              </p>
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
                  src="https://placehold.co/360x360/1a1a2e/ffffff?text=iPhone+Guide"
                  alt="中古iPhone購入ガイドのイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                />
              </figure>
            </div>
          </div>
        </header>

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
                結論から知りたい方は「<Link href="/iphone/recommend/">【{GUIDE_DATE_LABEL.replace('月', '')}年版】おすすめの中古iPhoneを5機種厳選</Link>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li><a href="#filter-tool" className="toc-item">診断ツール <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#market-price" className="toc-item">最新相場 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#caution" className="toc-item">注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#recommended" className="toc-item">目的別 おすすめ機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#where-to-buy" className="toc-item">購入先比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">スペック比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
          </div>
        </nav>

        <div itemProp="articleBody">

          {/* ========== 絞り込みツール ========== */}
          <section className="l-section l-section--bg-subtle" id="filter-tool" aria-labelledby="heading-filter-tool">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-filter-tool">条件に合うiPhoneを絞り込む</h2>
              <p className="m-section-desc">予算・サイズ・認証方式・充電端子など、ご自身の条件を選ぶことで候補を絞り込めます。</p>

              <div className="guide-tool-card m-card m-card--shadow">
                <div className="guide-tool-card__inner">
                  <div className="guide-tool-card__icon">
                    <i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
                  </div>
                  <div className="guide-tool-card__body">
                    <h3 className="guide-tool-card__title">iPhone機種絞り込みツール</h3>
                    <p className="guide-tool-card__desc">ゲームを快適にプレイしたい、ケーブルを統一したいなどの希望や・予算金額などにチェックを打つだけであなたにぴったり合うiPhoneをシミュレーションすることができます。</p>
                  </div>
                  <div className="guide-tool-card__action">
                    <Link href="/iphone/filter-search/" className="m-btn m-btn--primary">
                      <span>機種診断スタート</span>
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== 中古iPhoneの最新相場 ========== */}
          <section className="l-section" id="market-price" aria-labelledby="heading-market-price">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-market-price">中古iPhoneの最新相場【毎日更新】</h2>
              <p className="m-section-desc">イオシス・GEO・じゃんぱらの価格を毎日自動で更新。</p>
              <p className="m-section-desc">OSサポート期間・流通量・価格安定性の3点を基準に、「今買われやすい中古iPhone」を抽出しています。</p>

              <div className="guide-price-grid l-grid l-grid--2col l-grid--gap-lg">
                {priceModels.map((model, i) => (
                  <div key={model.id} className="guide-price-card m-card m-card--shadow">
                    <figure className="guide-price-card__img">
                      <img
                        src={model.image ? `/images/iphone/${model.image}` : `https://placehold.co/80x80/f5f5f7/1d1d1f?text=${encodeURIComponent(model.model)}`}
                        alt={model.model}
                        width={80}
                        height={80}
                        loading="lazy"
                      />
                    </figure>
                    <div className="guide-price-card__info">
                      <h3 className="guide-price-card__name">{model.model}</h3>
                      <p className="guide-price-card__meta">
                        {model.date ? `${model.date.split('/')[0]}年` : ''} / {model.cpu || ''}
                      </p>
                    </div>
                    <div className="guide-price-card__price">
                      <span className="guide-price-card__label">中古相場（{getStorageLabel(model)}）</span>
                      <span className="guide-price-card__value">{getMinPrice(latestPrices[i])} 〜</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="guide-section-note">2019年以降に発売されたiPhone30機種の詳細な価格推移グラフ・相場データをご覧いただけます</p>
              <div className="guide-section-cta">
                <Link href="/iphone/price-info/" className="m-btn m-btn--primary m-btn--block">
                  <span>iPhoneの中古相場・価格推移グラフ</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 中古iPhoneを選ぶ際の確認ポイント ========== */}
          <section className="l-section l-section--bg-subtle" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古iPhoneを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古iPhoneを購入する際に確認しておきたい6つのポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古スマホを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box glossary-box--numbered m-card m-card--shadow">
                <ol className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">iOSのサポート期間（端末の寿命）</dt>
                    <dd className="glossary-item-desc">
                      iPhoneのiOSサポート期間の目安は発売から7年ほど。古すぎる機種は購入してすぐにiOSサポート外になるリスクがあるので注意。
                      <br />詳細：<Link href="/iphone/used-iphone-support/">中古iPhoneの寿命とサポート期間の目安</Link>
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
                </ol>
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
                    <div key={model.id} className="guide-recommend m-card m-card--shadow">
                      <div className="guide-recommend__inner">
                        <figure className="guide-recommend__img">
                          <img
                            src={model.image ? `/images/iphone/${model.image}` : `https://placehold.co/120x140/f5f5f7/1d1d1f?text=${encodeURIComponent(model.model)}`}
                            alt={model.model}
                            width={120}
                            height={140}
                            loading="lazy"
                          />
                        </figure>
                        <div className="guide-recommend__body">
                          <div className="guide-recommend__header">
                            <span className="guide-recommend__tag">{meta?.label || ''}</span>
                            <h3 className="guide-recommend__name">{model.model}</h3>
                          </div>
                          <ul className="guide-recommend__specs">
                            <li>{model.date ? `${model.date.split('/')[0]}年発売` : ''}</li>
                            <li>{model.cpu || ''}</li>
                            <li>{model.display ? model.display.split(' ')[0] : ''}</li>
                          </ul>
                          <p className="guide-recommend__catch">{meta?.subtitle || ''}</p>
                          <p className="guide-recommend__desc">{meta?.desc || ''}</p>
                        </div>
                        <div className="guide-recommend__aside">
                          <span className="guide-recommend__price-label">中古相場（{getStorageLabel(model)}）</span>
                          <span className="guide-recommend__price-value">{getMinPrice(recommendPrices[i])}〜</span>
                          {(() => {
                            const iosysLink = allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)
                            return iosysLink ? (
                              <a href={iosysLink.url} className="m-btn m-btn--primary m-btn--sm" target="_blank" rel="noopener noreferrer nofollow">
                                <span>在庫情報を見る</span>
                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                              </a>
                            ) : (
                              <Link href={`/iphone/${model.slug}/`} className="m-btn m-btn--primary m-btn--sm">
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

              <p className="guide-section-note">{GUIDE_DATE_LABEL}現在おすすめの中古iPhoneはこちらの記事でじっくり解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/iphone/recommend/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPhoneのおすすめ機種【{GUIDE_DATE_LABEL}版】</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section l-section--bg-subtle" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古iPhoneはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古iPhone販売店の比較情報。保証内容、価格、在庫の豊富さなど、</p>
              <p className="m-section-desc">各ショップの特徴を一覧表で整理しました。</p>

              <div className="m-card m-card--shadow m-table-card">
                <div className="m-table-scroll">
                  <table className="m-table">
                    <caption className="visually-hidden">中古iPhoneショップ比較一覧</caption>
                    <thead>
                      <tr>
                        <th scope="col">ショップ名</th>
                        <th scope="col">価格の安さ</th>
                        <th scope="col">在庫の豊富さ</th>
                        <th scope="col">保証期間</th>
                        <th scope="col">独自保証</th>
                        <th scope="col">赤ロム保証</th>
                        <th scope="col">実物写真</th>
                        <th scope="col">バッテリー<br />最大容量</th>
                        <th scope="col">配送料</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shopRows.map((shop) => (
                        <tr key={shop.id}>
                          <th scope="row">{shop.shop}</th>
                          <td>{getSymbol(shop.price)}</td>
                          <td>{getSymbol(shop.stock)}</td>
                          <td>{getSymbol(shop.support)}</td>
                          <td>
                            {shop.extension_link ? (
                              <Link href={shop.extension_link}>{getSymbol(shop.extension_name || shop.extension)}</Link>
                            ) : (
                              getSymbol(shop.extension)
                            )}
                          </td>
                          <td>{getSymbol(shop.block)}</td>
                          <td>{getSymbol(shop.photo)}</td>
                          <td>{getSymbol(shop.battery)}</td>
                          <td>{getSymbol(shop.postage)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="guide-section-note guide-section-note--mt">各ショップの詳細やサービス内容の違いは以下の記事で解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/iphone/iphone-shop/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古iPhoneを安心して購入できるECサイト</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== スペック比較ガイド ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古iPhoneのデータ・スペック比較ガイド</h2>
              <p className="m-section-desc">カメラ性能、バッテリー寿命、サポート期間など、機種選びに役立つ詳細なスペック比較記事をまとめました。</p>

              <div className="l-grid l-grid--2col l-grid--gap-lg guide-spec-links">
                {GUIDE_SPEC_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="m-card m-card--shadow related-link-card">
                    <span className="related-link-card__icon">
                      <i className={`fa-solid ${link.icon}`} aria-hidden="true"></i>
                    </span>
                    <h3 className="related-link-card__title">{link.title}</h3>
                    <p className="related-link-card__desc">{link.desc}</p>
                    <span className="related-link-card__arrow">
                      <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </span>
                  </Link>
                ))}
              </div>

              {/* 歴代iPhone 個別記事リンク集 */}
              <div className="guide-model-links">
                <h3 className="guide-model-links__heading">歴代iPhone 個別記事別リンク集</h3>
                <p className="guide-model-links__desc">各モデルの詳細スペック、中古相場、購入時の注意点を個別にまとめています。</p>

                <h4 className="guide-model-links__category">Proモデル</h4>
                <div className="l-grid l-grid--3col l-grid--gap-lg guide-model-grid">
                  {GUIDE_MODEL_LINKS.pro.map((item) => (
                    <Link key={item.slug} href={`/iphone/${item.slug}/`} className="guide-model-item m-card">
                      <span className="guide-model-item__name">{item.name}</span>
                      <span className="guide-model-item__meta">{item.meta}</span>
                    </Link>
                  ))}
                </div>

                <h4 className="guide-model-links__category">無印モデル</h4>
                <div className="l-grid l-grid--3col l-grid--gap-lg guide-model-grid">
                  {GUIDE_MODEL_LINKS.standard.map((item) => (
                    <Link key={item.slug} href={`/iphone/${item.slug}/`} className="guide-model-item m-card">
                      <span className="guide-model-item__name">{item.name}</span>
                      <span className="guide-model-item__meta">{item.meta}</span>
                    </Link>
                  ))}
                </div>

                <h4 className="guide-model-links__category">その他（SEなど）</h4>
                <div className="l-grid l-grid--3col l-grid--gap-lg guide-model-grid">
                  {GUIDE_MODEL_LINKS.other.map((item) => (
                    <Link key={item.slug} href={`/iphone/${item.slug}/`} className="guide-model-item m-card">
                      <span className="guide-model-item__name">{item.name}</span>
                      <span className="guide-model-item__meta">{item.meta}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========== よくある質問 ========== */}
          <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">中古iPhoneに関するよくある質問</h2>
              <p className="m-section-desc">中古iPhoneの購入を検討している方からよく寄せられる質問をまとめました。</p>
              <div className="faq-list">
                <div className="m-card faq-item">
                  <h3 className="faq-question">自分に合った中古iPhoneの選び方は？</h3>
                  <div className="faq-answer">
                    <p>用途や予算に応じて最適なモデルは異なります。カメラ重視ならProシリーズ、コスパ重視ならiPhone SE、バランス重視なら無印モデルがおすすめです。「<Link href="/iphone/filter-search/">スマホ機種診断シミュレーター</Link>」で条件を絞り込むと、あなたに合った機種が見つかります。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">iPhoneのスペックを比較したい</h3>
                  <div className="faq-answer">
                    <p>「<Link href="/iphone/iphone-spec-table/">歴代iPhoneのスペック比較表</Link>」で、歴代iPhoneのスペックを並べて比較できます。カメラ性能に特化した比較は「<Link href="/iphone/iphone-camera/">歴代iPhoneのカメラ性能比較</Link>」でご覧いただけます。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古iPhoneを買うベストなタイミングはいつですか？</h3>
                  <div className="faq-answer">
                    <p>新型iPhone発売直後（9〜10月）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。当サイトの<Link href="/iphone/price-info/">価格推移グラフ</Link>で、値下がり傾向を確認してから購入するのがおすすめです。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古iPhoneのランク（A/B/C）の違いは何ですか？</h3>
                  <div className="faq-answer">
                    <p>一般的に、Aランクは傷がほぼない美品、Bランクは軽微な傷がある良品、Cランクは目立つ傷がある並品です。実用上はBランクでも問題なく使用でき、コストパフォーマンスが高いです。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古iPhoneはどこで買うのがおすすめですか？</h3>
                  <div className="faq-answer">
                    <p>信頼性と保証の観点から、<Link href="/iphone/iphone-shop/">イオシス・ゲオ・じゃんぱらなどの大手中古専門店</Link>がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古iPhoneはいつまで使えますか？</h3>
                  <div className="faq-answer">
                    <p>iPhoneはAppleの発売から約6〜7年間iOSアップデートのサポートを受けられます。長く使いたい場合は、発売から3年以内のモデルを選ぶと安心です。詳しくは「<Link href="/iphone/used-iphone-support/">中古iPhoneの寿命とサポート期間の目安</Link>」をご覧ください。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古iPhoneのバッテリー状態は確認できますか？</h3>
                  <div className="faq-answer">
                    <p>はい、iPhoneの「設定」→「バッテリー」→「バッテリーの状態」から最大容量を確認できます。80%以上あれば実用上問題ありません。中古専門店では商品ページにバッテリー状態が記載されていることが多いです。各モデルのバッテリー容量は「<Link href="/iphone/battery-compare/">バッテリー性能比較ランキング</Link>」で確認できます。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">ネットワーク利用制限△の中古iPhoneは買っても大丈夫？</h3>
                  <div className="faq-answer">
                    <p>ネットワーク利用制限△は、前の所有者の分割払いが完了していない状態を示します。△でも通常利用は可能ですが、価格が安い分リスクもあるため、心配な方は○（制限なし）の端末を選ぶのが安心です。詳しくは「<Link href="/iphone/used-iphone-attention/">中古iPhoneの注意点と選び方</Link>」で解説しています。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
      </article>
    </main>
  )
}
