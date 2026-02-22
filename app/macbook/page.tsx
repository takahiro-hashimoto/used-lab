import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getAllMacBookModels,
  getAllProductShopLinksByType,
} from '@/lib/queries'
import type { MacBookModel } from '@/lib/types'
import {
  GUIDE_DATE_LABEL,
  GUIDE_SPEC_LINKS,
  GUIDE_FAQ_ITEMS,
  GUIDE_MODEL_LINKS,
  GUIDE_VENDOR_CARDS,
} from '@/lib/data/macbook-guide'
import {
  RECOMMEND_SLUGS,
  RECOMMEND_META,
  RECOMMEND_COUNT_LABEL,
} from '@/lib/data/macbook-recommend'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import VendorCardGrid from '@/app/components/VendorCardGrid'
import GuideModelLinks from '@/app/components/GuideModelLinks'

const PAGE_TITLE = `中古MacBook完全購入ガイド | 選び方・相場・おすすめモデルまとめ【${GUIDE_DATE_LABEL}版】`
const PAGE_DESCRIPTION = `${GUIDE_DATE_LABEL}版・中古MacBookの完全購入ガイド。選び方のポイント、モデル別の相場、おすすめ機種をまとめて解説。失敗しない中古MacBook選びをサポートします。`
const PAGE_URL = 'https://used-lab.com/macbook/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/macbook/',
    images: [{ url: '/images/macbook/mba-13-2024.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/macbook/mba-13-2024.jpg'],
  },
}

export default async function MacBookGuidePage() {
  const [allModels, allShopLinks] = await Promise.all([
    getAllMacBookModels(),
    getAllProductShopLinksByType('macbook'),
  ])

  // おすすめ機種セクション用
  const recommendModels = RECOMMEND_SLUGS
    .map((slug) => allModels.find((m) => m.slug === slug))
    .filter((m): m is MacBookModel => m != null)

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全ガイド' },
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
                中古MacBook完全購入ガイド
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
                  src="/images/macbook/mba-13-2024.jpg"
                  alt="中古MacBook購入ガイドのイメージ"
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
              <p>「MacBookが欲しいけど、新品は高すぎる...中古は状態が心配...」そんな悩みはありませんか？</p>
              <p>
                本ページではあなたが納得して中古MacBookを選べるよう、<strong>{GUIDE_DATE_LABEL}の最新相場や後悔しないための判断基準</strong>を解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                結論から知りたい方は「<Link href="/macbook/recommend/">【{GUIDE_DATE_LABEL.replace('月', '')}年版】おすすめの中古MacBookを{RECOMMEND_COUNT_LABEL}厳選</Link>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li><a href="#caution" className="toc-item">注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#recommended" className="toc-item">目的別 おすすめ機種 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#where-to-buy" className="toc-item">購入先比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#spec-compare" className="toc-item">スペック比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
              <li><a href="#faq" className="toc-item">よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i></a></li>
            </ol>
          </div>
        </nav>

        <div itemProp="articleBody">

          {/* ========== 中古MacBookを選ぶ際の確認ポイント ========== */}
          <section className="l-section l-section--bg-subtle" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">中古MacBookを選ぶ際の確認ポイント</h2>
              <p className="m-section-desc">中古MacBookを購入する際に確認しておきたい6つのポイントをまとめました。</p>
              <p className="m-section-desc">特に初めて中古Macを買う方は、トラブルを避けるためにも一度確認しておくことをおすすめします。</p>

              <div className="glossary-box glossary-box--numbered m-card m-card--shadow">
                <ol className="glossary-list">
                  <div className="glossary-item">
                    <dt className="glossary-item-title">macOSのサポート期間（端末の寿命）</dt>
                    <dd className="glossary-item-desc">
                      MacBookのmacOSサポート期間の目安は発売から約7年。Intelモデルは既にサポートが終了しているものが多いため、Appleシリコン（M1以降）搭載モデルを選びましょう。
                      <br />詳細：<Link href="/macbook/used-macbook-support/">中古MacBookの寿命とサポート期間の目安</Link>
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
                      MacBookはストレージの後から増設ができません。Web閲覧・事務作業なら256GB、写真や動画を扱うなら512GB以上を選びましょう。購入後に容量不足で後悔するケースが多いポイントです。
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
                </ol>
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
                  return (
                    <div key={model.id} className="guide-recommend m-card m-card--shadow">
                      <div className="guide-recommend__inner">
                        <figure className="guide-recommend__img">
                          <img
                            src={model.image ? `/images/macbook/${model.image}` : `https://placehold.co/120x140/f5f5f7/1d1d1f?text=${encodeURIComponent(model.model)}`}
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
                            <li>{model.size || ''}</li>
                          </ul>
                          <p className="guide-recommend__catch">{meta?.subtitle || ''}</p>
                          <p className="guide-recommend__desc">{meta?.desc || ''}</p>
                        </div>
                        <div className="guide-recommend__aside">
                          {(() => {
                            const iosysLink = allShopLinks.find((l) => l.product_id === model.id && l.shop_id === 1)
                            return iosysLink ? (
                              <a href={iosysLink.url} className="m-btn m-btn--primary m-btn--sm" target="_blank" rel="noopener noreferrer nofollow">
                                <span>在庫情報を見る</span>
                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                              </a>
                            ) : (
                              <Link href={`/macbook/${model.slug}/`} className="m-btn m-btn--primary m-btn--sm">
                                <span>詳細を見る</span>
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

              <p className="guide-section-note">{GUIDE_DATE_LABEL}現在おすすめの中古MacBookはこちらの記事でじっくり解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/macbook/recommend/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古MacBookのおすすめ機種【{GUIDE_DATE_LABEL}版】</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== 購入先比較 ========== */}
          <section className="l-section l-section--bg-subtle" id="where-to-buy" aria-labelledby="heading-where-to-buy">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-where-to-buy">中古MacBookはどこで買う？ショップ比較一覧</h2>
              <p className="m-section-desc">中古MacBook販売店の比較情報。保証内容、価格、在庫の豊富さなど、</p>
              <p className="m-section-desc">各ショップの特徴を一覧表で整理しました。</p>

              <VendorCardGrid cards={GUIDE_VENDOR_CARDS} />

              <p className="guide-section-note guide-section-note--mt">各ショップの詳細やサービス内容の違いは以下の記事で解説しています。</p>
              <div className="guide-section-cta">
                <Link href="/macbook/macbook-shop/" className="m-btn m-btn--primary m-btn--block">
                  <span>中古MacBookを安心して購入できるECサイト</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========== スペック比較ガイド ========== */}
          <section className="l-section" id="spec-compare" aria-labelledby="heading-spec-compare">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-compare">中古MacBookのデータ・スペック比較ガイド</h2>
              <p className="m-section-desc">チップ性能、ポート構成、サポート期間など、機種選びに役立つ詳細なスペック比較記事をまとめました。</p>

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

              {/* 歴代MacBook 個別記事リンク集 */}
              <GuideModelLinks
                basePath="/macbook"
                heading="歴代MacBook 個別記事リンク集"
                description="各モデルの詳細スペック、中古相場、購入時の注意点を個別にまとめています。"
                categories={[
                  { label: 'MacBook Air 13インチ', items: GUIDE_MODEL_LINKS.air13 },
                  { label: 'MacBook Air 15インチ', items: GUIDE_MODEL_LINKS.air15 },
                  { label: 'MacBook Pro 14インチ', items: GUIDE_MODEL_LINKS.pro14 },
                  { label: 'MacBook Pro 16インチ', items: GUIDE_MODEL_LINKS.pro16 },
                  { label: 'MacBook Pro 13インチ', items: GUIDE_MODEL_LINKS.pro13 },
                ]}
              />
            </div>
          </section>

          {/* ========== よくある質問 ========== */}
          <section className="l-section l-section--bg-subtle" id="faq" aria-labelledby="heading-faq">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">中古MacBookに関するよくある質問</h2>
              <p className="m-section-desc">中古MacBookの購入を検討している方からよく寄せられる質問をまとめました。</p>
              <div className="faq-list">
                <div className="m-card faq-item">
                  <h3 className="faq-question">自分に合った中古MacBookの選び方は？</h3>
                  <div className="faq-answer">
                    <p>用途や予算に応じて最適なモデルは異なります。Web閲覧・事務作業メインならMacBook Air M2、長期利用ならMacBook Air M3、大画面なら15インチ Air、動画編集やプログラミングならMacBook Proがおすすめです。詳しくは「<Link href="/macbook/recommend/">中古MacBookのおすすめ機種</Link>」をご覧ください。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">MacBook AirとMacBook Proの違いは？</h3>
                  <div className="faq-answer">
                    <p>MacBook Airはファンレスで軽量・静音、日常作業に最適です。MacBook Proはファン搭載で長時間の高負荷作業に強く、ProMotionディスプレイやHDMI・SDカードスロットなど接続端子が豊富です。「<Link href="/macbook/macbook-spec-table/">歴代MacBookスペック比較表</Link>」で詳しく比較できます。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古MacBookを買うベストなタイミングはいつですか？</h3>
                  <div className="faq-answer">
                    <p>新型MacBook発表直後（例年6月のWWDCや秋のイベント後）は旧モデルの価格が下がりやすい傾向があります。また、年末年始や決算期（3月）もセールが行われることが多いです。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">AppleシリコンとIntelどちらを選ぶべき？</h3>
                  <div className="faq-answer">
                    <p>2026年現在、IntelモデルはmacOSサポートが終了しているか、残りわずかです。Appleシリコン（M1以降）搭載モデルを選ぶことを強くおすすめします。詳しくは「<Link href="/macbook/used-macbook-support/">macOSサポート期間一覧表</Link>」をご覧ください。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古MacBookはどこで買うのがおすすめですか？</h3>
                  <div className="faq-answer">
                    <p>信頼性と保証の観点から、<Link href="/macbook/macbook-shop/">イオシス・ゲオ・じゃんぱらなどの大手中古専門店</Link>がおすすめです。これらの店舗では動作確認済みの端末を扱い、初期不良保証も付いています。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古MacBookはいつまで使えますか？</h3>
                  <div className="faq-answer">
                    <p>MacBookはAppleの発売から約7年間macOSアップデートのサポートを受けられます。長く使いたい場合は、発売から3年以内のモデルを選ぶと安心です。詳しくは「<Link href="/macbook/used-macbook-support/">中古MacBookの寿命とサポート期間の目安</Link>」をご覧ください。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">中古MacBookのバッテリー状態は確認できますか？</h3>
                  <div className="faq-answer">
                    <p>はい、MacBookの「システム情報」→「電源」からバッテリーの充放電回数や状態を確認できます。充放電回数1,000回以下が目安です。中古専門店では商品ページにバッテリー状態が記載されていることもあります。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">ストレージ容量はどれくらい必要ですか？</h3>
                  <div className="faq-answer">
                    <p>Web閲覧・事務作業メインなら256GBで十分です。写真や動画を扱うなら512GB以上がおすすめです。MacBookはストレージの後から増設ができないため、用途に合った容量を最初に選ぶことが重要です。</p>
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
