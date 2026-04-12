import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

const PAGE_TITLE = 'iPhoneを買ったらアップルケアに入るべき？必要ではない理由5つを解説'
const PAGE_DESCRIPTION =
  'iPhoneを買ったときにApple Care+は必要？料金・修理費用・バッテリー交換条件を整理した上で、コスパの観点から加入しなくていい理由を5つ解説します。'
const PAGE_URL = 'https://used-lab.jp/iphone/apple-care/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/apple-care/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/apple-care/',
    images: [{ url: getHeroImage('/iphone/apple-care/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/iphone/apple-care/')],
  },
}

export default function IphoneAppleCarePage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/apple-care/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.jp/iphone' },
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
                { label: '中古iPhone完全購入ガイド', href: '/iphone' },
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
                    iPhoneを買ったらアップルケアに入るべき？必要ではない理由5つを解説
                  </h1>
                  <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
                </div>
                <div className="hero-visual">
                  <figure className="hero-media">
                    <Image
                      src={getHeroImage('/iphone/apple-care/')}
                      alt="iPhoneのアップルケア加入を検討するイメージ"
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
                  iPhoneを購入するときに多くの方が悩む「Apple Care+は必要？」という疑問。
                </p>
                <p>
                  iPhoneは常に持ち歩くデバイスのため、落下・水没リスクが他のApple製品より高いのは事実です。しかし多くの方がケースとフィルムで保護しており、<strong>実際に修理が必要な破損に至るケースは思ったより少ない</strong>のが現状です。
                </p>
                <p>
                  また、平均2〜3年で機種変更するユーザーが多いiPhoneでは、2年保証をフルに使い切れずに乗り換えてしまうケースも珍しくありません。コスパの観点から見ると、Apple Care+が必要ないケースがほとんどです。
                </p>
                <p>
                  本記事ではアップルケアの概要と料金を整理したうえで、加入しなくてよいと考える理由を5つ解説します。
                </p>
                <p className="lead-link">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                  iPhoneの選び方から知りたい方は「<Link href="/iphone/">中古iPhone購入ガイド</Link>」をご覧ください。
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
                    <a href="#used-iphone" className="toc-item">
                      中古iPhoneという選択肢 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
                  Apple Care+ for iPhoneの概要
                </h2>
                <p className="m-section-desc">まずは簡単にApple Care+ for iPhoneの概要や損傷時に修理代がどれくらい軽減されるのかを紹介します。</p>

                {/* 特徴 */}
                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card--aside">
                    <div className="media-card__img-wrap">
                      <img
                        alt="Apple Care+ for iPhoneの概要イメージ"
                        className="media-card__img"
                        width={240}
                        height={160}
                        loading="lazy"
                        src="/images/content/thumbnail/apple-care.jpg"
                      />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">Apple Care+ for iPhoneの特徴</h3>
                      <p className="media-card__desc">新しく買ったiPhoneには製品購入後1年間のハードウェア製品限定保証と90日間の無償テクニカルサポートがついています。それに加え、さらにiPhoneが故障したときの保障を手厚くするために用意されているのがApple Care+ for iPhoneです。</p>
                      <ul className="info-card__list">
                        <li>月払いまたは2年分一括払い（端末ごとに料金が異なる）</li>
                        <li>新品端末購入から30日以内であれば加入可能</li>
                        <li>保証期間は加入から2年間</li>
                        <li>過失・事故による損傷の修理サービスを提供</li>
                        <li>バッテリーの修理保証あり</li>
                        <li>Apple Watch・AirPodsは対象外（iPhoneのみ）</li>
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
                    アップルケアの料金は端末によって異なり、それぞれ下記の通り。年間一括払いをした場合、3,000円〜5,000円ほどお得になる計算です。
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
                            <th>iPhone 17 Pro</th>
                            <td>1,580円</td>
                            <td>31,800円</td>
                          </tr>
                          <tr>
                            <th>iPhone 17</th>
                            <td>1,180円</td>
                            <td>23,800円</td>
                          </tr>
                          <tr>
                            <th>iPhone 17e</th>
                            <td>980円</td>
                            <td>19,800円</td>
                          </tr>
                          <tr>
                            <th>iPhone SE</th>
                            <td>580円</td>
                            <td>11,800円</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p className="m-footnote u-mt-sm">※2026年4月時点の料金です。実際の価格は公式サイトをご確認ください</p>
                </div>

                {/* 修理費用 */}
                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <h3 className="media-card__title" id="heading-repair-about">iPhoneの修理費用について</h3>
                  <div className="media-card__desc">
                    <p>フロント画面のひび割れが起きた場合やバッテリー交換が必要になった時の費用は以下の通り。金額はApple公式サイトの「<a href="https://support.apple.com/ja-jp/iphone/repair" style={{ color: 'var(--color-primary)' }}>iPhoneの修理サービス</a>」を参照しています。</p>
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
                            <th>iPhone 17 Pro（画面損傷）</th>
                            <td>3,700円</td>
                            <td>53,800円</td>
                          </tr>
                          <tr>
                            <th>iPhone 17（画面損傷）</th>
                            <td>3,700円</td>
                            <td>53,800円</td>
                          </tr>
                          <tr>
                            <th>iPhone 17e（画面損傷）</th>
                            <td>3,700円</td>
                            <td>38,800円</td>
                          </tr>
                          <tr>
                            <th>iPhone SE（画面損傷）</th>
                            <td>3,700円</td>
                            <td>19,400円</td>
                          </tr>
                          <tr>
                            <th>バッテリー交換（全機種）</th>
                            <td>無償※</td>
                            <td>11,200〜19,400円</td>
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
                      <img src="/images/content/photo/iphone-camera-lens.jpeg" alt="iPhoneの画面が割れたイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">① 2年間で画面を割る確率は思ったより低い</h3>
                      <p className="media-card__desc">
                        「修理が1回起きれば元が取れる」とよく言われますが、そもそも2年間でiPhoneの修理が必要になるほどの破損が起きる人は多数派ではありません。ケースとフィルムで保護している方が多く、日常的な落下でも画面が割れないケースが増えています。
                      </p>
                      <p className="media-card__desc">
                        さらにiPhoneは平均2〜3年での機種変更が多く、2年の保証期間を使い切る前に乗り換えてしまうケースも珍しくありません。途中解約では残存期間の返金はありますが、手続きの手間を考えるとコスパはさらに悪化します。
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
                                <th>iPhone 17 Pro</th>
                                <td>35,500円</td>
                                <td>53,800円</td>
                                <td className="u-text-accent">▲18,300円</td>
                              </tr>
                              <tr>
                                <th>iPhone 17</th>
                                <td>27,500円</td>
                                <td>53,800円</td>
                                <td className="u-text-accent">▲26,300円</td>
                              </tr>
                              <tr>
                                <th>iPhone 17e</th>
                                <td>23,500円</td>
                                <td>38,800円</td>
                                <td className="u-text-accent">▲15,300円</td>
                              </tr>
                              <tr>
                                <th>iPhone SE</th>
                                <td>15,500円</td>
                                <td>19,400円</td>
                                <td className="u-text-accent">▲3,900円</td>
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
                      <img src="/images/content/photo/iphone-cable.jpg" alt="iPhoneのバッテリー残量イメージ" className="media-card__img" width={800} height={450} loading="lazy" />
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
                        2年間毎日使用したiPhoneのバッテリー保持容量を計測した事例では、使用率は90%程度にとどまっていました。<span className="u-marker">保証期間の2年以内にバッテリー容量が80%を下回るのは、かなりハードな使い方をしても難しい</span>のが実情です。
                      </p>
                    </div>
                  </div>

                  {/* 理由3: 修理費用は無料にはならない */}
                  <div className="m-card m-card--shadow m-card--padded" id="repair-cost">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/apple-watch-find-iphone.jpg" alt="iPhoneの修理イメージ" className="media-card__img" width={800} height={450} loading="lazy" />
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
                        iPhone 17 Proを2年間月払い（1,580円×24ヶ月）で加入した場合、支払い総額は37,920円。そこに修理時の自己負担3,700円（画面損傷の場合）が加算されます。保険として考えたとき、この費用対効果が割に合うかは慎重に考えたいところです。
                      </p>
                    </div>
                  </div>

                  {/* 理由4: 自然故障は1年間無償対応 */}
                  <div className="m-card m-card--shadow m-card--padded" id="warranty">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/Anker-620-MagGo-Phone-Grip-glip-02-1024x683.webp" alt="iPhoneを日常使用するイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
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
                                <td>11,800〜31,800円</td>
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

                  {/* 理由5: 代替保険がある */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-image.jpg" alt="iPhoneを使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
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

            {/* ── Section 3: 入るべき人のケース ── */}
            <section className="l-section" id="should-join" aria-labelledby="heading-should-join">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-should-join">
                  それでもApple Care+に入るべき人のケース
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }} className="u-mt-2xl">

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/casefinity-floast-air-4.jpg" alt="iPhone Proを外出先で使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">iPhone Pro（高額モデル）を外出先でヘビー使用する人</h3>
                      <p className="media-card__desc">
                        未加入時の修理費が53,800円にのぼるiPhone 17 Proは、Apple Care+加入で最も恩恵を受けやすい端末です。常に持ち歩き、バッグへの出し入れが多い方は落下リスクが高まります。
                      </p>
                      <p className="media-card__desc">
                        月1,580円（2年で37,920円）で最大53,800円の修理費に備えられると考えると、iPhoneヘビーユーザーには合理的な選択といえます。
                      </p>
                    </div>
                  </div>

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/ipad-children.jpg" alt="子どもがiPhoneを使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">子どもに持たせる予定がある人</h3>
                      <p className="media-card__desc">
                        子どもが使う場合、落下や液体をこぼす可能性は大人の使用と比べて格段に高くなります。Apple Care+の対象外である紛失・盗難はカバーされませんが、破損リスクが高い環境なら加入を前向きに検討すべきです。
                      </p>
                      <p className="media-card__desc">
                        この場合は比較的価格の低いiPhone SEを選び、Apple Care+に加入するのが最もコストを抑えた構成になります。
                      </p>
                    </div>
                  </div>

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/iphone-broken.jpg" alt="画面割れしたiPhone" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">過去にスマホを破損させた経験がある人</h3>
                      <p className="media-card__desc">
                        デバイスをよく落とす・過去に修理経験があるという方は、同じことがiPhoneでも起きる可能性が高いです。自分の扱い方の傾向を正直に振り返って判断しましょう。
                      </p>
                      <p className="media-card__desc">
                        特にiPhone 17 ProやiPhone 17のような高額モデルを購入する場合は、修理費用が5万円を超えるケースもあるため、Apple Care+の加入を真剣に検討する価値があります。
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* ── Section 4: モバイル保険 ── */}
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
                      <p>Apple Care+と違い、期間の縛りがないのが最大のメリット。中古iPhoneを長く使いたい方におすすめです。</p>
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
                            <td>550円〜1,580円</td>
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

            {/* ── Section 5: 中古iPhoneという選択肢 ── */}
            <section className="l-section" id="used-iphone" aria-labelledby="heading-used-iphone">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-used-iphone">
                  買い替えるなら中古iPhoneの検討もおすすめ
                </h2>
                <p className="m-section-desc">
                  Apple Care+のコスパが悪い理由を整理し、代替となるおすすめサービスをご紹介してきました。
                </p>
                <p className="m-section-desc">
                  しかし、そもそも「新品にこだわる必要があるか」も見直す価値があります。
                </p>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card__img-wrap">
                    <img src="/images/content/photo/casefinity-floast-air-2.jpg" alt="iPhoneを手に取る様子" className="media-card__img" width={800} height={450} loading="lazy" />
                  </div>
                  <div className="media-card__body">
                    <h3 className="media-card__title">新品＋Apple Care+より、中古iPhoneの方がコスパが高いことも</h3>
                    <p className="media-card__desc">
                      動画視聴・SNS・カメラ・ゲームといったiPhoneの主な用途は、1〜2世代前の中古モデルでも快適にこなせます。新品にApple Care+を加えた総額と、状態の良い中古を比べると、<span className="u-marker">後者の方がコスパが高いケースは珍しくありません</span>。
                    </p>
                    <p className="media-card__desc">
                      また、モバイル保険はイオシス・じゃんぱら・ゲオなど主要な中古専門店で購入した端末も補償対象。「中古は保険に入れない」という心配も不要です。
                    </p>
                    <p className="lead-link u-mt-sm">
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                      おすすめの中古iPhoneは「<Link href="/iphone/recommend/">中古iPhoneのおすすめ機種</Link>」で紹介しています。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── FAQ ── */}
            <FaqSection
              title="Apple Care+ for iPhoneのよくある質問"
              description="Apple Care+に関するよくある疑問にお答えします。"
              items={[
                {
                  question: 'Apple Care+を2年一括払いした後、保証期間内にiPhoneを買い替えた場合、次の製品に引き継げますか？',
                  answer: 'Apple Care+の保証は登録したデバイスのシリアル番号に紐付いているため、新しいiPhoneへの引き継ぎはできません。買い替えたiPhoneを保証したい場合は、改めてApple Care+に加入する必要があります。',
                },
                {
                  question: 'Apple Care+は2年一括払いにするとどれくらいお得ですか？',
                  answer: '端末によって異なりますが、iPhone 16 Proの場合は月払い（1,280円×24ヶ月＝30,720円）と比べて約4,920円安くなります。',
                },
                {
                  question: 'Apple Care+はiPhoneを購入した後からでも加入できますか？',
                  answer: '新品端末の購入から30日以内であれば加入できます。30日を過ぎると加入できなくなるため、検討中の方は早めに判断しましょう。',
                },
                {
                  question: 'Apple Care+の保証期間はどうやって確認できますか？',
                  answer: '「設定」→「一般」→「情報」→「保証範囲」から確認できます。',
                },
                {
                  question: 'Apple Care+は画面割れ以外にも対応していますか？',
                  answer: 'はい。過失・事故による破損（水没・背面ガラス破損など）も対象です。ただし紛失・盗難は対象外です。',
                },
              ]}
            />

            {/* ── まとめ ── */}
            <section className="l-section" id="summary" aria-labelledby="heading-summary">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
                  まとめ：iPhoneにApple Care+は必要ない場合が多い
                </h2>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <h3 className="summary-card__title">この記事のポイント</h3>
                  <dl className="summary-card__dl">
                    <div>
                      <dt className="summary-card__dt">2年間で修理が必要になる確率は低い</dt>
                      <dd className="summary-card__dd">ケースとフィルムで保護していれば、2年間一度も修理せずに使い終わるケースがほとんど。修理が発生しなければ保険料はそのまま損失になる。</dd>
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
                      <dt className="summary-card__dt">中古iPhone＋モバイル保険が最もコスパの良い組み合わせ</dt>
                      <dd className="summary-card__dd">新品＋Apple Care+の総額と比べると、状態の良い中古＋モバイル保険の方が安く上がるケースが多い。</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

          </div>
        </article>
      </main>
      <IPhoneArticleFooter
        pageUrl={PAGE_URL}
        pageTitle={PAGE_TITLE}
        excludeHref={['/iphone/apple-care/', '/iphone/recommend/']}
      />
    </>
  )
}
