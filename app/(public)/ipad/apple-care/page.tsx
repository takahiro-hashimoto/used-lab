import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import IPadArticleFooter from '@/app/components/ipad/IPadArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

const PAGE_TITLE = 'iPadを買ったらアップルケアに入るべき？必要ではない理由5つを解説'
const PAGE_DESCRIPTION =
  'iPadを買ったときにApple Care+は必要？料金・修理費用・バッテリー交換条件を整理した上で、コスパの観点から加入しなくていい理由を5つ解説します。'
const PAGE_URL = 'https://used-lab.jp/ipad/apple-care/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/ipad/apple-care/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/ipad/apple-care/',
    images: [{ url: getHeroImage('/ipad/apple-care/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/ipad/apple-care/')],
  },
}

export default function IpadAppleCarePage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/ipad/apple-care/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全購入ガイド', item: 'https://used-lab.jp/ipad' },
      { '@type': 'ListItem', position: 3, name: 'アップルケアは必要？' },
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
            <Breadcrumb
              items={[
                { label: '中古iPad完全購入ガイド', href: '/ipad' },
                { label: 'アップルケアは必要？' },
              ]}
            />

            <header className="hero">
              <div className="hero-bg" aria-hidden="true">
                <div className="hero-shape hero-shape-1"></div>
                <div className="hero-shape hero-shape-2"></div>
              </div>
              <div className="hero-inner l-container">
                <div className="hero-content">
                  <h1 className="hero-title" itemProp="headline">
                    iPadを買ったらアップルケアに入るべき？必要ではない理由5つを解説
                  </h1>
                  <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
                </div>
                <div className="hero-visual">
                  <figure className="hero-media">
                    <Image
                      src={getHeroImage('/ipad/apple-care/')}
                      alt="iPadのアップルケア加入を検討するイメージ"
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
                <p>
                  iPadを購入するときに多くの方が悩む「Apple Care+は必要？」という疑問。
                </p>
                <p>
                  万が一の故障や破損に備えて安心を買いたい気持ちは理解できますが、<strong>コスパの観点から見るとApple Care+は必要ないケースがほとんど</strong>です。
                </p>
                <p>
                  本記事ではアップルケアの概要と料金を整理したうえで、加入しなくてよいと考える理由を5つ解説します。
                </p>
                <p className="lead-link">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                  iPadの選び方から知りたい方は「<Link href="/ipad/">中古iPad購入ガイド</Link>」をご覧ください。
                </p>
              </div>
            </div>
          </section>

          {/* 目次 */}
          <nav className="l-section l-section--no-pt" aria-label="目次">
            <div className="l-container">
              <div className="toc-wrapper">
                <p className="toc-title"><i className="fa-solid fa-list" aria-hidden="true"></i> タップできる目次</p>
                <ol className="l-grid l-grid--2col u-list-reset">
                  <li>
                    <a href="#overview" className="toc-item">
                      Apple Care+の概要 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#reasons" className="toc-item">
                      不要だと思う理由5つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#should-join" className="toc-item">
                      それでも入るべき人 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#alternatives" className="toc-item">
                      モバイル保険という選択肢 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#used-ipad" className="toc-item">
                      中古iPadという選択肢 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="toc-item">
                      よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#summary" className="toc-item">
                      まとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </nav>

          {/* 記事本文 */}
          <div className="l-sections" id="content" itemProp="articleBody">

            {/* ── Section 1: 概要 ── */}
            <section className="l-section" id="overview" aria-labelledby="heading-overview">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-overview">
                  Apple Care+ for iPadの概要
                </h2>
                <p className="m-section-desc">まずは簡単にApple Care+ for iPadの概要や損傷時に修理代がどれくらい軽減されるのかを紹介します。</p>
                {/* 特徴 */}
                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card--aside">
                    <div className="media-card__img-wrap">
                      <img
                        alt="Apple Care+ for iPadの概要イメージ"
                        className="media-card__img"
                        width={240}
                        height={160}
                        loading="lazy"
                        src="/images/content/thumbnail/apple-care.jpg"
                      />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">Apple Care+ for iPadの特徴</h3>
                      <p className="media-card__desc">新しく買ったiPadには製品購入後1年間のハードウェア製品限定保証と90日間の無償テクニカルサポートがついています。それに加え、さらにiPadが故障したときの保障を手厚くするために用意されているのがApple Care+ for iPadです。</p>
                      <ul className="info-card__list">
                        <li>月払いまたは2年分一括払い（端末ごとに料金が異なる）</li>
                        <li>新品端末購入から30日以内であれば加入可能</li>
                        <li>保証期間は加入から2年間</li>
                        <li>過失・事故による損傷の修理サービスを提供</li>
                        <li>バッテリーの修理保証あり</li>
                        <li>Apple Pencil・Apple製iPad用キーボードも保証対象</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 料金表 */}
                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                <h3 className="media-card__title" id="heading-price">
                  Apple Care+の料金
                </h3>
                <p className="media-card__desc u-mb-lg">
                  アップルケアの料金は端末によって異なり、それぞれ下記の通り。年間一括払いをした場合、3,000円〜4,000円ほどお得になる計算です。
                </p>
                <div className="m-table-card">
                  <div className="m-table-scroll">
                    <table className="m-table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>月払い（税込）</th>
                          <th>2年一括払い（税込）</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>iPad Pro 13インチ</th>
                          <td>1,100円</td>
                          <td>21,800円</td>
                        </tr>
                        <tr>
                          <th>iPad Pro 11インチ</th>
                          <td>980円</td>
                          <td>19,400円</td>
                        </tr>
                        <tr>
                          <th>iPad Air</th>
                          <td>580円</td>
                          <td>11,800円</td>
                        </tr>
                        <tr>
                          <th>iPad / iPad mini</th>
                          <td>550円</td>
                          <td>10,800円</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="m-footnote u-mt-sm">※2026年4月時点の料金です。実際の価格は公式サイトをご確認ください</p>
                </div>

                {/* 修理費用 */}
                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <h3 className="media-card__title" id="heading-repair-about">iPadの修理費用について</h3>
                  <div className="media-card__desc">
                    <p>端末が故障した場合の修理費用は以下の通り。金額はApple公式サイトの「<a href="https://support.apple.com/ja-jp/ipad/repair" style={{ color: 'var(--color-primary)' }}>iPad の修理サービス</a>」を参照しています。</p>
                    <p>※損傷時の修理費用は超概算という感じなので実際にはここまで修理費用が発生しない場合もあるかと思います。</p>
                  </div>
                  <div className="m-table-card u-mt-sm">
                    <div className="m-table-scroll">
                      <table className="m-table m-table--center">
                        <thead>
                          <tr>
                            <th>端末</th>
                            <th>Apple Care+加入時</th>
                            <th>未加入時</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>iPad Pro 13インチ M4</th>
                            <td>3,700円</td>
                            <td>172,800円</td>
                          </tr>
                          <tr>
                            <th>iPad Pro 11インチ M4</th>
                            <td>3,700円</td>
                            <td>146,800円</td>
                          </tr>
                          <tr>
                            <th>iPad Air 13インチ　M4</th>
                            <td>12,900円</td>
                            <td>102,900円</td>
                          </tr>
                          <tr>
                            <th>iPad 11（A16）</th>
                            <td>3,700円</td>
                            <td>50,800円</td>
                          </tr>
                          <tr>
                            <th>iPad mini 7（A16）</th>
                            <td>3,700円</td>
                            <td>59,800円</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p className="m-footnote u-mt-sm">※2026年4月時点の料金です。実際の価格は公式サイトをご確認ください</p>
                </div>
              </div>
            </section>

            {/* ── Section 2: 不要だと思う理由5つ ── */}
            <section className="l-section" id="reasons" aria-labelledby="heading-reasons">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-reasons">
                  Apple Care+が不要だと思う理由5つ
                </h2>
                <p className="m-section-desc">
                  「数字上は合理的に見える」でも実際には不要なケースがほとんどである理由を5つ解説します。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

                  {/* 理由1: 損益分岐点 */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-broken.jpg" alt="iPadの画面が割れたイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">① 2年間で画面を割る確率は低い</h3>
                      <p className="media-card__desc">
                        「修理が1回起きれば元が取れる」とよく言われますが、そもそも2年間でiPadの修理が必要になるほどの破損が起きる人は多数派ではありません。
                      </p>
                      <p className="media-card__desc">
                        iPhoneと違い、iPadは机やソファの上で使う場面が多く、持ち歩きによる落下リスクが低い端末です。ケースやフィルムで保護していれば、2年間で一度も修理せずに使い終わるケースがほとんどです。
                      </p>
                      <p className="media-card__desc">
                        下の表は「仮に修理が1回発生したとき」の試算です。Apple Care+に加入していれば確かに得になります。しかし<span className="u-marker">修理が発生しなければ、支払った保険料はそのまま損失になります</span>。
                      </p>
                      <div className="m-card m-card--shadow m-table-card u-mt-sm">
                        <div className="m-table-scroll">
                          <table className="m-table m-table--center">
                            <thead>
                              <tr>
                                <th>端末</th>
                                <th>Apple Care+費用<br /><span style={{ fontWeight: 'normal', fontSize: 'var(--text-sm)' }}>2年一括＋修理1回</span></th>
                                <th>未加入の<br />修理費用</th>
                                <th>差額</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>iPad Pro 13インチ M4</th>
                                <td>25,500円</td>
                                <td>172,800円</td>
                                <td className="u-text-accent">▲147,300円</td>
                              </tr>
                              <tr>
                                <th>iPad Pro 11インチ M4</th>
                                <td>23,100円</td>
                                <td>146,800円</td>
                                <td className="u-text-accent">▲123,700円</td>
                              </tr>
                              <tr>
                                <th>iPad Air 13インチ M4</th>
                                <td>24,700円</td>
                                <td>102,900円</td>
                                <td className="u-text-accent">▲78,200円</td>
                              </tr>
                              <tr>
                                <th>iPad 11（A16）</th>
                                <td>14,500円</td>
                                <td>50,800円</td>
                                <td className="u-text-accent">▲36,300円</td>
                              </tr>
                              <tr>
                                <th>iPad mini 7（A16）</th>
                                <td>14,500円</td>
                                <td>59,800円</td>
                                <td className="u-text-accent">▲45,300円</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 理由2: バッテリー無償交換のハードル */}
                  <div className="m-card m-card--shadow m-card--padded" id="battery">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-flame.jpg" alt="iPadのバッテリー残量イメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">② バッテリー無償交換はハードルが高い</h3>
                      <p className="media-card__desc">
                        Apple Care+の保証期間内であれば、バッテリー交換を無償でおこなってくれます。ただし、これには条件があります。
                      </p>
                      <p className="media-card__desc">
                        それは「バッテリー保持容量が本来の容量の80%未満になっていること」です。
                      </p>
                      <p className="media-card__desc">
                        2年間毎日使用したiPad miniのバッテリー保持容量を計測した事例では、使用率は92%程度にとどまっていました。<span className="u-marker">保証期間の2年以内にバッテリー容量が80%を下回るのは、かなりハードな使い方をしても難しい</span>のが実情です。
                      </p>
                    </div>
                  </div>

                  {/* 理由2: 修理費用は無料にはならない */}
                  <div className="m-card m-card--shadow m-card--padded" id="repair-cost">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-image.jpg" alt="iPadの修理イメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">③ 修理費用は無料にはならない</h3>
                      <p className="media-card__desc">
                        Apple Care+に加入していても、修理費用が完全に無料になるわけではありません。
                      </p>
                      <p className="media-card__desc">
                        未加入時と比べて圧倒的に安く済むのは事実ですが、<span className="u-marker">修理のたびに3,700円（画面損傷）または12,900円（その他損傷）の自己負担が発生します</span>。
                      </p>
                      <p className="media-card__desc">
                        iPad Pro 13インチを2年間月払い（1,100円 × 24ヶ月）で加入した場合、支払い総額は26,400円。そこに修理時の自己負担3,700円（画面損傷の場合）が加算されます。保険として考えたとき、この費用対効果が割に合うかは慎重に考えたいところです。
                      </p>
                    </div>
                  </div>

                  {/* 理由3: 自然故障は1年間無償対応 */}
                  <div className="m-card m-card--shadow m-card--padded" id="warranty">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-mini-6-use.webp" alt="iPadを日常使用するイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">④ 自然故障は購入後1年間は無償対応済み</h3>
                      <p className="media-card__desc">
                        Apple Care+に加入していなくても、購入から1年間はAppleの無償ハードウェア保証が適用されます。
                      </p>
                      <p className="media-card__desc">
                        突然画面が映らなくなった・充電できなくなったといった初期不具合や自然故障は、Apple Care+がなくても無料で対応してもらえます。
                      </p>
                      <p className="media-card__desc">
                        Apple Care+が標準保証と異なる点は「2年目以降の保証」と「過失・事故による破損への対応」のみです。落下や水没リスクが低い使い方であれば、Apple Care+の出番はほぼないといえます。
                      </p>
                      <div className="m-card m-card--shadow m-table-card u-mt-sm">
                        <div className="m-table-scroll">
                          <table className="m-table m-table--center">
                            <thead>
                              <tr>
                                <th></th>
                                <th>ハードウェア保証<br />（標準）</th>
                                <th>Apple Care+</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>費用</th>
                                <td>0円</td>
                                <td>10,800〜21,800円</td>
                              </tr>
                              <tr>
                                <th>期間</th>
                                <td>1年間</td>
                                <td>2年間</td>
                              </tr>
                              <tr>
                                <th>技術サポート</th>
                                <td>90日間</td>
                                <td>2年間</td>
                              </tr>
                              <tr>
                                <th>補償内容</th>
                                <td>自然故障のみ</td>
                                <td>過失による破損<br />（紛失・盗難は除く）</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 理由4: 代替保険がある */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-air-5-use.jpg" alt="iPadを使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">⑤ コスパに優れた代替保険サービスがある</h3>
                      <p className="media-card__desc">
                        「それでも保険で安心したい」という方でも、Apple Care+を選ぶ必要はありません。クレジットカードのショッピング保険やモバイル保険など、<span className="u-marker">Apple Care+よりコスパの高い選択肢が存在します</span>。
                      </p>
                      <p className="media-card__desc">
                        詳しくは後述の「<a href="#alternatives" style={{ color: 'var(--color-primary)' }}>モバイル保険という選択肢</a>」をご覧ください。
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* ── Section 4: 入るべき人のケース ── */}
            <section className="l-section" id="should-join" aria-labelledby="heading-should-join">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-should-join">
                  それでもApple Care+に入るべき人のケース
                </h2>
                <p className="m-section-desc">
                  「不要」と断言してきましたが、使い方によっては加入が合理的なケースもあります。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }} className="u-mt-2xl">

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-pro-use.jpg" alt="iPad Proを外出先で使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">iPad Pro（高額モデル）を外出先でヘビー使用する人</h3>
                      <p className="media-card__desc">
                        未加入時の修理費が172,800円にのぼるiPad Pro 13インチは、Apple Care+加入で最も恩恵を受けやすい端末です。カフェや外出先で頻繁に使い、バッグへの出し入れが多い方は落下リスクが高まります。
                      </p>
                      <p className="media-card__desc">
                        月1,100円（2年で26,400円）で最大172,800円の修理費に備えられると考えると、iPad Proへビーユーザーには合理的な選択といえます。
                      </p>
                    </div>
                  </div>

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-children.jpg" alt="子どもがiPadを使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">子どもに持たせる予定がある人</h3>
                      <p className="media-card__desc">
                        子どもが使う場合、落下や液体をこぼす可能性は大人の使用と比べて格段に高くなります。Apple Care+の対象外である紛失・盗難はカバーされませんが、破損リスクが高い環境なら加入を前向きに検討すべきです。
                      </p>
                      <p className="media-card__desc">
                        この場合は比較的価格の低いiPad（無印）を選び、Apple Care+に加入するのが最もコストを抑えた構成になります。
                      </p>
                    </div>
                  </div>

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-mini-6-touch-button.webp" alt="iPadを手に持って操作するイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">過去にスマホ・タブレットを破損させた経験がある人</h3>
                      <p className="media-card__desc">
                        デバイスをよく落とす・過去に修理経験があるという方は、同じことがiPadでも起きる可能性が高いです。自分の扱い方の傾向を正直に振り返って判断しましょう。
                      </p>
                      <p className="media-card__desc">
                        特にiPad ProやiPad Airのような高額モデルを購入する場合は、修理費用が10万円を超えるケースもあるため、Apple Care+の加入を真剣に検討する価値があります。
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* ── Section 5: モバイル保険 ── */}
            <section className="l-section" id="alternatives" aria-labelledby="heading-alternatives">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-alternatives">
                  保険で安心したいならモバイル保険がおすすめ
                </h2>
                <p className="m-section-desc">
                  「それでも万が一に備えたい」という方には、Apple Care+よりコスパに優れたモバイル保険をおすすめします。
                </p>
                <div className="m-card m-card--shadow m-card--padded media-card--aside-footer insurance-card u-mt-xl">
                  <div className="media-card__img-wrap" style={{ minWidth: 0 }}>
                    <a href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMVW2+45VK+691UP" rel="nofollow noopener" target="_blank" style={{ display: 'block' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        loading="lazy"
                        decoding="async"
                        className="insurance-card__banner"
                        alt="モバイル保険"
                        src="https://www20.a8.net/svt/bgt?aid=191201327468&wid=001&eno=01&mid=s00000019424001050000&mc=1"
                      />
                    </a>
                  </div>
                  <div className="media-card__body" style={{ minWidth: 0 }}>
                    <div className="media-card__desc m-rich-text">
                      <h4 className="media-card__title">モバイル保険</h4>
                      <ul className="u-mb-lg m-check-list">
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 月額700円で最大3台まで補償</li>
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 年間10万円まで修理費用を全額補償</li>
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 中古端末・格安スマホも加入OK</li>
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 補償期間に終わりがない（月額払いの間ずっと）</li>
                      </ul>
                      <p>Apple Care+と違い、期間の縛りがないのが最大のメリット。中古iPadを長く使いたい方におすすめです。</p>
                    </div>
                  </div>
                  <div className="media-card__footer" style={{ minWidth: 0 }}>
                    <div className="insurance-card__table-wrap">
                      <table className="m-table insurance-card__table">
                        <thead>
                          <tr>
                            <th scope="col">項目</th>
                            <th scope="col">モバイル保険</th>
                            <th scope="col">Apple Care+</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">月額料金</th>
                            <td><strong>700円</strong></td>
                            <td>550円〜1,100円</td>
                          </tr>
                          <tr>
                            <th scope="row">中古端末</th>
                            <td><strong>加入OK</strong></td>
                            <td>加入不可</td>
                          </tr>
                          <tr>
                            <th scope="row">補償台数</th>
                            <td><strong>最大3台</strong></td>
                            <td>1台のみ</td>
                          </tr>
                          <tr>
                            <th scope="row">補償期間</th>
                            <td><strong>無期限</strong></td>
                            <td>2年（延長可）</td>
                          </tr>
                          <tr>
                            <th scope="row">年間補償額</th>
                            <td>最大10万円</td>
                            <td>回数制限あり</td>
                          </tr>
                          <tr>
                            <th scope="row">リンク</th>
                            <td>
                              <a
                                href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMXFM+45VK+BW0YB&a8ejpredirect=https%3A%2F%2Fmobile-hoken.com%2Flp%2Ftakumi-wp%2F"
                                className="m-btn m-btn--primary m-btn--sm"
                                rel="nofollow noopener"
                                target="_blank"
                                aria-label="モバイル保険の詳細を見る"
                              >
                                詳細を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                              </a>
                            </td>
                            <td>
                              <a
                                href="https://www.apple.com/jp/applecare/"
                                className="m-btn m-btn--primary m-btn--sm"
                                target="_blank"
                                rel="noopener"
                                aria-label="Apple Care+の詳細を見る"
                              >
                                詳細を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="m-callout m-callout--tip u-mt-xl">
                  <span className="m-callout__label">関連記事</span>
                  <p>
                    Apple Care+とモバイル保険をさらに詳しく比較したい方は「<a href="/iphone/mobile-hoken-compare/" style={{ color: 'var(--color-primary)' }}>知らないと損！Apple Care+よりもモバイル保険に加入した方がコスパが高い理由</a>」をご覧ください。
                  </p>
                </div>
              </div>
            </section>

            {/* ── Section: 中古iPadという選択肢 ── */}
            <section className="l-section" id="used-ipad" aria-labelledby="heading-used-ipad">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-used-ipad">
                  買い替えるなら中古iPadの検討もおすすめ
                </h2>
                <p className="m-section-desc">
                  Apple Care+のコスパが悪い理由を整理し、代替となるおすすめサービスをご紹介してきました。
                </p>
                <p className="m-section-desc">
                  しかし、そもそも「新品にこだわる必要があるか」も見直す価値があります。
                </p>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card__img-wrap">
                    <img src="/images/content/photo/ipad-movie.jpg" alt="iPadで動画を視聴するイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                  </div>
                  <div className="media-card__body">
                    <h3 className="media-card__title">新品＋Apple Care+より、中古iPadの方がコスパが高いことも</h3>
                    <p className="media-card__desc">
                      動画視聴・電子書籍・ブラウジング・ノートアプリといったiPadの主な用途は、2〜3世代前の中古モデルでも快適にこなせます。新品にApple Care+を加えた総額と、状態の良い中古を比べると、<span className="u-marker">後者の方がコスパが高いケースは珍しくありません</span>。
                    </p>
                    <p className="media-card__desc">
                      また、モバイル保険はイオシス・じゃんぱら・ゲオなど主要な中古専門店で購入した端末も補償対象。「中古は保険に入れない」という心配も不要です。
                    </p>
                    <p className="lead-link u-mt-sm">
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                      おすすめの中古iPadは「<Link href="/ipad/recommend/">中古iPadのおすすめ機種</Link>」で紹介しています。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── FAQ ── */}
            <FaqSection
              title="Apple Care+ for iPadのよくある質問"
              description="Apple Care+に関するよくある疑問にお答えします。"
              items={[
                {
                  question: 'Apple Care+を2年一括払いした後、保証期間内にiPadを買い替えた場合、次の製品に引き継げますか？',
                  answer: 'Apple Care+の保証は登録したデバイスのシリアル番号に紐付いているため、新しいiPadへの引き継ぎはできません。買い替えたiPadを保証したい場合は、改めてApple Care+に加入する必要があります。',
                },
                {
                  question: 'Apple Care+は2年一括払いにするとどれくらいお得ですか？',
                  answer: '端末によって異なりますが、iPad Pro 11インチの場合は月払い（980円×24ヶ月＝23,520円）と比べて約4,120円安くなります。',
                },
                {
                  question: 'Apple Care+はiPadを購入した後からでも加入できますか？',
                  answer: '新品端末の購入から30日以内であれば加入できます。30日を過ぎると加入できなくなるため、検討中の方は早めに判断しましょう。',
                },
                {
                  question: 'Apple Care+の保証期間を延長することはできますか？',
                  answer: '2年一括払いで加入している場合、保証期間終了後に年単位での継続ができる場合があります。詳細はAppleサポートにご確認ください。',
                },
                {
                  question: 'Apple Care+の保証期間はどうやって確認できますか？',
                  answer: '「設定」→「一般」→「情報」→「保証範囲」から確認できます。',
                },
                {
                  question: 'クレジットカードのショッピング保険があればApple Care+は不要ですか？',
                  answer: 'カードの補償内容によります。購入後90日〜1年程度の破損・盗難をカバーするショッピング保険が付帯しているカードであれば、新品購入直後のリスクはカードで対応できます。ただし補償期間が短い・免責金額がある・請求手続きが煩雑といった制限もあるため、カードの約款を事前に確認した上で判断しましょう。',
                },
                {
                  question: 'Apple Care+に加入するなら月払いと一括払いどちらがお得ですか？',
                  answer: '2年一括払いの方が3,000〜4,000円ほどお得です。ただし、途中で解約した場合は残存期間に応じた返金になるため、長期使用を前提にしている場合は一括払いが有利です。',
                },
              ]}
            />

            {/* ── まとめ ── */}
            <section className="l-section" id="summary" aria-labelledby="heading-summary">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
                  まとめ：iPadにApple Care+は必要ない場合が多い
                </h2>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <h3 className="summary-card__title">この記事のポイント</h3>
                  <dl className="summary-card__dl">
                    <div>
                      <dt className="summary-card__dt">2年間で修理が必要になる確率は低い</dt>
                      <dd className="summary-card__dd">iPadは机やソファでの使用が多く、スマホに比べて落下頻度が低い。ケースとフィルムで保護していれば、2年間一度も修理せずに使い終わるケースがほとんど。</dd>
                    </div>
                    <div>
                      <dt className="summary-card__dt">バッテリー無償交換の条件は厳しい</dt>
                      <dd className="summary-card__dd">無償交換の条件は「容量が80%未満」。通常の使い方では保証期間の2年以内にこの基準を下回ることはまずない。</dd>
                    </div>
                    <div>
                      <dt className="summary-card__dt">修理しても自己負担は残る</dt>
                      <dd className="summary-card__dd">Apple Care+に加入していても、修理のたびに3,700円（画面損傷）・12,900円（その他損傷）の自己負担が発生する。完全無料にはならない。</dd>
                    </div>
                    <div>
                      <dt className="summary-card__dt">自然故障は購入後1年間は無償対応される</dt>
                      <dd className="summary-card__dd">初期不具合や自然故障はAppleの標準保証でカバーされる。Apple Care+がなくても1年間は保護されている。</dd>
                    </div>
                    <div>
                      <dt className="summary-card__dt">コスパを重視するならモバイル保険が優秀</dt>
                      <dd className="summary-card__dd">月額700円で最大3台まとめて補償。中古端末も加入OK。期間の縛りもなく、Apple Care+より柔軟に使える。</dd>
                    </div>
                    <div>
                      <dt className="summary-card__dt">中古iPad＋モバイル保険が最もコスパの良い組み合わせ</dt>
                      <dd className="summary-card__dd">新品＋Apple Care+の総額と比べると、状態の良い中古＋モバイル保険の方が安く上がるケースが多い。</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

          </div>
        </article>
      </main>
      <IPadArticleFooter
        pageUrl={PAGE_URL}
        pageTitle={PAGE_TITLE}
        excludeHref={['/ipad/apple-care/', '/ipad/recommend/']}
      />
    </>
  )
}
