import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'
import RatingMark from '@/app/components/RatingMark'
import InsuranceCostTabs from './InsuranceCostTabs'

const PAGE_TITLE = '知らないと損！Apple Care+よりもモバイル保険に加入した方がコスパが高い理由を解説'
const PAGE_DESCRIPTION =
  'Apple Care+とモバイル保険を徹底比較。月額700円で3台まで補償できるモバイル保険がコスパ面で優れている理由や、逆にApple Care+が有利なケースをわかりやすく解説します。'
const PAGE_URL = 'https://used-lab.jp/iphone/mobile-hoken-compare/'

const FAQ_ITEMS = [
  {
    question: 'モバイル保険の月額料金はいくらですか？',
    answer: 'モバイル保険の月額料金は700円です。主端末1台・副端末2台の合計3台を一つの契約で補償できます。',
  },
  {
    question: 'モバイル保険はApple Care+の代わりになりますか？',
    answer:
      'スマートフォンの破損修理という観点では代替になります。ただし、バッテリー無料交換・エクスプレス交換サービス・海外での保証はApple Care+にしかない強みです。紛失補償も必要な場合はApple Care+（盗難・紛失プラン）が有利です。',
  },
  {
    question: 'モバイル保険は中古iPhoneでも加入できますか？',
    answer:
      'はい。法人が運営する販売店（オンラインショップ含む）で購入し、購入時点で3カ月以上の製品保証が確認できる中古端末であれば加入できます。格安SIM（MVNO）で購入したSIMフリー端末も対象です。Apple Care+は新品購入から30日以内という制限があるため、中古端末には実質加入できません。',
  },
  {
    question: 'モバイル保険で補償される修理費用はいくらまでですか？',
    answer:
      '主端末は年間100,000円まで修理費用を全額補償、副端末は年間30,000円まで補償されます。免責金額（自己負担額）はなく、補償上限内であれば修理費用をそのまま請求できます。',
  },
  {
    question: '全損・水没した場合も補償されますか？',
    answer:
      'はい。水没による故障や修理不能な全損状態も補償対象です。主端末であれば年間100,000円を上限に修理費用（または端末の時価額）が補償されます。Apple Care+も過失による損傷は補償対象ですが、1回あたり3,700円〜の免責金額（自己負担）が発生します。',
  },
  {
    question: 'モバイル保険はいつでも解約できますか？',
    answer:
      'はい、月単位でいつでも途中解約が可能です。マイページから手続きでき、違約金もありません。Apple Care+は一括払いで加入した場合、解約時に残存期間分の返金が受けられますが手続きが必要です。',
  },
  {
    question: 'モバイル保険はiPhone以外の端末も補償できますか？',
    answer:
      'はい。スマートフォン・タブレット・スマートウォッチ・ノートPC・携帯ゲーム機・モバイルルーターなど、Wi-Fiに接続して持ち運べる機器が補償対象です。家族の端末も契約に含めることができます。',
  },
  {
    question: '機種変更したらモバイル保険の手続きはどうすればいいですか？',
    answer:
      'マイページ上で補償対象の端末を切り替えるだけで完了します。Apple Care+のように新規契約する必要はなく、手続きが非常に簡単です。',
  },
]

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/mobile-hoken-compare/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/mobile-hoken-compare/',
    images: [{ url: getHeroImage('/iphone/mobile-hoken-compare/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/iphone/mobile-hoken-compare/')],
  },
}

export default function MobileHokenComparePage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/mobile-hoken-compare/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.jp/iphone/' },
      { '@type': 'ListItem', position: 3, name: 'Apple Care+よりモバイル保険がコスパ高い理由' },
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
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

          <div className="hero-wrapper">
            <Breadcrumb
              items={[
                { label: '中古iPhone完全購入ガイド', href: '/iphone' },
                { label: 'Apple Care+よりモバイル保険がコスパ高い理由' },
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
                    知らないと損！Apple Care+よりもモバイル保険に加入した方がコスパが高い理由を解説
                  </h1>
                  <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
                </div>
                <div className="hero-visual">
                  <figure className="hero-media">
                    <Image
                      src={getHeroImage('/iphone/mobile-hoken-compare/')}
                      alt="Apple Care+とモバイル保険の比較イメージ"
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
                <p>iPhoneやiPadなどのApple製品を購入する際に必ず聞かれるApple Care+加入の有無。</p>
                <p>
                  液晶画面が割れた・水没してしまったときの修理費用の負担を軽くしたい、Apple Care+は少し高く感じるのでもう少しお手頃にスマホ保険に入りたい、と考えている方にぜひ比較検討してほしい保険があります。それが今回紹介する<strong>モバイル保険</strong>。
                </p>
                <p>
                  Apple Care+よりも優れている点が多数あり、<span className="u-marker">総合的にコストパフォーマンスが高い保険</span>だと考えます。本記事ではその理由をじっくり解説していくので、保険加入する際の判断材料としてぜひご活用ください。
                </p>
                <p className="lead-link">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                  中古iPhoneの選び方は「<a href="/iphone">中古iPhone完全購入ガイド</a>」もご覧ください。
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
                  <li>
                    <a href="#apple-care-overview" className="toc-item">
                      Apple Care+の内容 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#mobile-hoken-overview" className="toc-item">
                      モバイル保険の内容 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#compare" className="toc-item">
                      徹底比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#mobile-hoken-good" className="toc-item">
                      モバイル保険の良い点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#apple-care-good" className="toc-item">
                      Apple Care+の良い点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#summary" className="toc-item">
                      まとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="toc-item">
                      よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </nav>

          <div className="l-sections" id="content" itemProp="articleBody">

            {/* ── Section 1: Apple Care+の概要 ── */}
            <section className="l-section" id="apple-care-overview" aria-labelledby="heading-apple-care-overview">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-apple-care-overview">
                  Apple Care+の主なサービス内容
                </h2>
                <p className="m-section-desc">
                  新しく買ったApple製品には製品購入後1年間のハードウェア製品限定保証と90日間の無償テクニカルサポートがついています。それに加え、さらに端末が故障したときの保証を手厚くするために用意されているのがApple Care+です。
                </p>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card__body">
                    <h3 className="media-card__title">Apple Care+の主なサービス内容</h3>
                    <div className="m-table-card u-mt-sm">
                      <div className="m-table-scroll">
                        <table className="m-table m-table--center">
                          <tbody>
                            <tr>
                              <th>料金</th>
                              <td>月払い or 一括払いで料金は端末ごとに異なる</td>
                            </tr>
                            <tr>
                              <th>加入条件</th>
                              <td>新品の端末を購入して30日以内であること</td>
                            </tr>
                            <tr>
                              <th>保証期間</th>
                              <td>iPhone・Apple Watch・iPad → 加入から2年間 / MacBook・iMac → 加入から3年間</td>
                            </tr>
                            <tr>
                              <th>サポート内容</th>
                              <td>過失・事故による修理代金の軽減 / バッテリーの修理保証 / 海外保証 / エクスプレス交換など</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card__body">
                    <h3 className="media-card__title">iPhone 15シリーズのApple Care+料金</h3>
                    <p className="media-card__desc">
                      料金は一括払いの方がお得になっており約27,000円〜34,800円、各種修理がお手頃に実施できるのが特徴です。そこそこ高額な料金ですが、修理代金は全額保証してもらえるわけではありません。
                    </p>
                    <div className="m-table-card u-mt-sm">
                      <div className="m-table-scroll">
                        <table className="m-table m-table--center">
                          <thead>
                            <tr>
                              <th></th>
                              <th>月払い</th>
                              <th>2年一括</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>iPhone 15 Pro / Pro Max</th>
                              <td>1,740円</td>
                              <td>34,800円</td>
                            </tr>
                            <tr>
                              <th>iPhone 15 Plus / iPhone 14 Plus</th>
                              <td>1,540円</td>
                              <td>31,800円</td>
                            </tr>
                            <tr>
                              <th>iPhone 15 / iPhone 14</th>
                              <td>1,540円</td>
                              <td>26,800円</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card__body">
                    <h3 className="media-card__title">iPhone 15 Pro Maxの修理費用（Apple Care+加入時・未加入時）</h3>
                    <div className="m-table-card u-mt-sm">
                      <div className="m-table-scroll">
                        <table className="m-table m-table--center">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Apple Care+未加入</th>
                              <th>Apple Care+加入済み</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>画面のひび割れ</th>
                              <td>56,800円</td>
                              <td>3,700円</td>
                            </tr>
                            <tr>
                              <th>背面ガラスの損傷</th>
                              <td>29,800円</td>
                              <td>3,700円</td>
                            </tr>
                            <tr>
                              <th>バッテリー交換</th>
                              <td>15,800円</td>
                              <td>0円</td>
                            </tr>
                            <tr>
                              <th>背面カメラ修理</th>
                              <td>38,800円</td>
                              <td>12,900円</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 2: モバイル保険の概要 ── */}
            <section className="l-section" id="mobile-hoken-overview" aria-labelledby="heading-mobile-hoken-overview">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-mobile-hoken-overview">
                  モバイル保険の主なサービス内容
                </h2>
                <p className="m-section-desc">
                  モバイル保険は、さくら少額短期保険株式会社が提供するスマホ保険です。月額700円で主端末1台・副端末2台を補償でき、免責金額なしで修理費用を全額補償してくれるのが大きな強み。Apple Care+と比べると料金のお手頃さや守備範囲の広さが際立ちます。
                </p>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card__body">
                    <h3 className="media-card__title">モバイル保険の主なサービス内容</h3>
                    <div className="m-table-card u-mt-sm">
                      <div className="m-table-scroll">
                        <table className="m-table m-table--center">
                          <tbody>
                            <tr>
                              <th>料金</th>
                              <td>月額700円</td>
                            </tr>
                            <tr>
                              <th>加入条件</th>
                              <td>購入から1年未満の端末（販売店の保証が3ヶ月以上あれば中古品もOK）</td>
                            </tr>
                            <tr>
                              <th>補償期間</th>
                              <td>加入期間中ずっと</td>
                            </tr>
                            <tr>
                              <th>免責金額</th>
                              <td>なし（修理費用を全額補償）</td>
                            </tr>
                            <tr>
                              <th>サポート内容</th>
                              <td>主端末1台・副端末2台を補償対象にできる / 主端末 → 年間100,000円まで修理代を全額補償 / 副端末 → 年間30,000円まで修理代を補償<br />※補償対象はスマートフォン・タブレット・スマートウォッチ・ノートPC・携帯ゲーム機・モバイルルーターなど</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 3: 徹底比較 ── */}
            <section className="l-section" id="compare" aria-labelledby="heading-compare">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
                  モバイル保険とApple Care+を徹底比較
                </h2>
                <p className="m-section-desc">
                  AppleCare+とモバイル保険のサービス概要を簡単に説明してきましたが、両者の違いをもう少し細かく比較表に落とし込むとこんな形になります。
                </p>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="m-table-card">
                    <div className="m-table-scroll">
                      <table className="m-table m-table--center">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Apple Care+</th>
                            <th>モバイル保険</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>価格</th>
                            <td>端末ごとに異なる</td>
                            <td>月額700円</td>
                          </tr>
                          <tr>
                            <th>加入タイミング</th>
                            <td>購入から30日以内</td>
                            <td>購入から1年未満</td>
                          </tr>
                          <tr>
                            <th>保証端末数</th>
                            <td>端末ごとに加入</td>
                            <td>同時に3台まで</td>
                          </tr>
                          <tr>
                            <th>中古品の保証</th>
                            <td><RatingMark mark="×" size="sm" /></td>
                            <td><RatingMark mark="◯" size="sm" /></td>
                          </tr>
                          <tr>
                            <th>保証期間</th>
                            <td>購入から2年間</td>
                            <td>加入中ずっと</td>
                          </tr>
                          <tr>
                            <th>免責金額（自己負担）</th>
                            <td>3,700円〜/回</td>
                            <td>なし</td>
                          </tr>
                          <tr>
                            <th>全損・水没</th>
                            <td>補償対象</td>
                            <td>補償対象</td>
                          </tr>
                          <tr>
                            <th>盗難・紛失</th>
                            <td>+2,000円で対象</td>
                            <td>盗難のみ補償</td>
                          </tr>
                          <tr>
                            <th>バッテリー交換</th>
                            <td><RatingMark mark="◯" size="sm" /></td>
                            <td><RatingMark mark="×" size="sm" /></td>
                          </tr>
                          <tr>
                            <th>エクスプレス交換サービス</th>
                            <td><RatingMark mark="◯" size="sm" /></td>
                            <td><RatingMark mark="×" size="sm" /></td>
                          </tr>
                          <tr>
                            <th>海外での保証</th>
                            <td><RatingMark mark="◯" size="sm" /></td>
                            <td><RatingMark mark="×" size="sm" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Section 4: モバイル保険が優れている点 ── */}
            <section className="l-section" id="mobile-hoken-good" aria-labelledby="heading-mobile-hoken-good">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-mobile-hoken-good">
                  モバイル保険の方が優れている点
                </h2>
                <p className="m-section-desc">
                  まずはモバイル保険が優れている点を4点解説していきます。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }} className="u-mt-2xl">

                  {/* ① 保険料と補償のバランス */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/mobile-hoken/iphone13-mini-use.jpg" alt="iPhoneを使用する様子" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">① 月々の保険料と補償内容のバランスが良い</h3>
                      <p className="media-card__desc">
                        モバイル保険の月額保険料と補償内容はシンプルで明快。月額700円で主端末は年間10万円まで修理代を全額補償、副端末は年間3万円まで補償されます。
                      </p>
                      <p className="media-card__desc">
                        モバイル保険に2年間加入した場合の保険料は<strong>16,800円でApple Care+よりも1万円以上お手頃</strong>です。年間10万円の補償が受けられれば画面割れ・水没・全損といった深刻なトラブルが発生しても問題なく、<span className="u-marker">免責金額なしで修理費用が全額補償される点もApple Care+にはない強みです</span>。
                      </p>
                      <p className="media-card__desc">
                        保険料・補償内容・修理が発生する確率のバランスを考えると、モバイル保険の方がコスパが良いといえるでしょう。
                      </p>
                      <InsuranceCostTabs />
                    </div>
                  </div>

                  {/* ② 一契約で3台 */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/mobile-hoken/ipad-image.avif" alt="iPadとiPhone" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">② 一契約で3台の端末を補償できる</h3>
                      <p className="media-card__desc">
                        Apple Care+は一つの端末ごとに保険を結ぶ必要があります。それに対してモバイル保険は<span className="u-marker">主端末1台、副端末2台を一つの契約で補償</span>することが可能です。
                      </p>
                      <p className="media-card__desc">
                        主端末・副端末で補償してもらえる範囲は異なりますが、モバイル保険に加入しておけば手持ちの端末を安心して利用できる環境が整います。
                      </p>
                      <ul className="m-check-list u-mt-sm">
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 主端末 → 年間100,000円まで修理代を補償</li>
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 副端末 → 年間30,000円まで修理代を補償</li>
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 補償対象：スマートフォン・タブレット・スマートウォッチ・ノートPC・携帯ゲーム機・モバイルルーターなど</li>
                      </ul>
                      <p className="media-card__desc u-mt-sm">
                        iPhone・iPad・MacBookそれぞれにApple Care+を加入した場合と比べると、よりお手頃な保険であることが際立ちます。また、<span className="u-marker">家族が持っているスマートフォンなども保証の対象にできる</span>ので、「3台も補償対象にしたい端末がない」という状況にも陥りにくいです。
                      </p>
                    </div>
                  </div>

                  {/* ③ 機種変更時の対応 */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/mobile-hoken/compare-iphone.jpg" alt="iPhoneを2台手に持つ様子" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">③ 機種変更時の対応が楽</h3>
                      <p className="media-card__desc">
                        Apple Care+は所有する端末一台につき一契約なので、機種変更した場合は新規契約が必要になります。
                      </p>
                      <p className="media-card__desc">
                        それに対してモバイル保険は<span className="u-marker">マイページ上で補償対象の端末を切り替えるだけ</span>で乗り換えが済んでしまいます。毎年iPhoneを買い替えるような方にとって、この手軽さは大きなメリットです。
                      </p>
                    </div>
                  </div>

                  {/* ④ 中古端末も対象 */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/mobile-hoken/apple-watch-image-1-1.jpg" alt="iPadを手に持つ様子" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">④ 中古端末も保証対象にできる</h3>
                      <p className="media-card__desc">
                        Apple Care+の加入期限はデバイス購入後30日までとなっており、実質中古端末を買った場合は加入することができません。
                      </p>
                      <p className="media-card__desc">
                        それに対してモバイル保険は、<span className="u-marker">法人が運営している販売店（オンラインショップを含む）で購入し、その時点において3カ月以上の製品保証が確認できる中古端末</span>であれば保険に加入することができます。Apple製品は高価なので格安SIM（MVNO）やSIMフリー端末として中古iPhoneを購入する方も多く、「Apple Care+に入れないから保険をあきらめていた」という方にとってこの点はとても魅力的です。
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* ── Section 5: Apple Care+が優れている点 ── */}
            <section className="l-section" id="apple-care-good" aria-labelledby="heading-apple-care-good">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-apple-care-good">
                  Apple Care+の方が優れている点
                </h2>
                <p className="m-section-desc">
                  ここからはApple Care+の方が優れている点を3つ紹介します。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }} className="u-mt-2xl">

                  {/* バッテリー交換 */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/mobile-hoken/anker-3in1-stand-image-02.jpg" alt="Apple Watchを手に持つ様子" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">バッテリー交換が無料で依頼できる</h3>
                      <p className="media-card__desc">
                        iPhoneやMacBookは繰り返し使用していくうちにバッテリーが徐々に劣化していきます。Apple Care+に加入すると、対象端末のバッテリーを無償交換してくれるので、「最近バッテリーの減りが早いぞ？」となった時にその恩恵を受けることができます。
                      </p>
                      <p className="media-card__desc">
                        ただし無償交換には「<strong>バッテリー保持容量が本来の容量の80%未満になっていること</strong>」という条件があります。
                        <span className="u-marker">結構ハードな使い方をしていないと保証期間内に上記の条件を満たすのは難しい</span>というのが正直なところ。決して気軽に無料交換に応じてもらえるわけではないという点には注意しましょう。
                      </p>
                    </div>
                  </div>

                  {/* 盗難・紛失 */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/mobile-hoken/incase-arc-daypack-wear-02.jpg" alt="バッグを背負う様子" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">盗難・紛失のケアが厚い</h3>
                      <p className="media-card__desc">
                        モバイル保険は紛失した際の補償がありませんが、Apple Care+は盗難・紛失を保証することができます（月額+2,000円のプラン）。海外旅行中のトラブルも保証範囲なので、端末の修理以外にも幅広いトラブルを保証しようと思うとApple Care+のほうがよいでしょう。
                      </p>
                      <p className="media-card__desc">
                        ただし、盗難・紛失に対する保証が利用可能な国は、オーストラリア・オーストリア・フランス・ドイツ・イタリア・日本・米国・英国など限定されており、どこに行っても保証対象というわけではない点は注意が必要です。
                      </p>
                    </div>
                  </div>

                  {/* エクスプレス交換 */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/mobile-hoken/ipad-mini-use-outdoor-02.jpg" alt="iPadを操作する様子" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">エクスプレス交換サービスがある</h3>
                      <p className="media-card__desc">
                        即日直せる修理内容であればあまり気にすることはありませんが、故障内容によっては数日間、端末が手元にない状態もありえます。
                      </p>
                      <p className="media-card__desc">
                        Apple Care+に加入しておくと、すぐに代替機を発送してもらうことができ、最短翌日には壊れていない端末を使い始めることができます。端末が手元にない時間を最小限に抑えたい方には大きなメリットです。
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* ── Section 6: まとめ ── */}
            <section className="l-section" id="summary" aria-labelledby="heading-summary">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
                  モバイル保険とApple Care+の比較 まとめ
                </h2>
                <p className="m-section-desc">
                  Apple Care+とモバイル保険の良い点・イマイチな点を解説してきました。両者の保険を全く同じ条件で比較することはできませんが、それぞれ下記のような方におすすめです。
                </p>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <dl className="summary-card__dl">
                    <div>
                      <dt className="summary-card__dt">モバイル保険がおすすめの方</dt>
                      <dd className="summary-card__dd">お手頃な保険料で複数端末を補償したい方 / 中古端末に補償をかけたい方 / 修理費用を全額補償してほしい方 / 機種変更のたびに再契約が面倒に感じる方</dd>
                    </div>
                    <div>
                      <dt className="summary-card__dt">Apple Care+がおすすめの方</dt>
                      <dd className="summary-card__dd">保険料が高くても一つ一つの端末を手厚く保証したい方 / バッテリー無料交換サービスを受けたい方 / エクスプレス交換サービスを利用したい方 / 盗難・紛失にも幅広く備えたい方</dd>
                    </div>
                  </dl>
                  <p className="media-card__desc u-mt-sm">
                    月々の保険料の安さ・保証範囲の広さなどを鑑みると<span className="u-marker">モバイル保険のほうがコスパが高い</span>というのが本記事の結論。途中解約も月単位でいつでも可能なので気軽に試しやすく、「Apple Care+は魅力的だけど保険料がネック…」という方にはぜひ検討してほしいスマホ保険です。
                  </p>
                </div>

                {/* モバイル保険カード */}
                <div className="m-card m-card--shadow m-card--padded media-card--aside-footer insurance-card u-mt-xl">
                  <div className="media-card__img-wrap" style={{ minWidth: 0 }}>
                    <a href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMVW2+45VK+5YRHE" rel="nofollow noopener" target="_blank" style={{ display: 'block' }}>
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
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 中古端末も加入OK</li>
                        <li><i className="fa-solid fa-check" aria-hidden="true"></i> 補償期間に終わりがない（月額払いの間ずっと）</li>
                      </ul>
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
                            <td>1,540円〜1,740円</td>
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
                            <td>最大10万円（全額）</td>
                            <td>回数制限あり（自己負担あり）</td>
                          </tr>
                          <tr>
                            <th scope="row">リンク</th>
                            <td>
                              <a
                                href="https://px.a8.net/svt/ejp?a8mat=35U3VZ+7QMVW2+45VK+5YRHE"
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
                                href="https://www.apple.com/jp/support/products/"
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
              </div>
            </section>

            {/* ── FAQ ── */}
            <FaqSection
              title="Apple Care+・モバイル保険に関するよくある質問"
              description=""
              items={FAQ_ITEMS}
            />

          </div>
        </article>
      </main>
      <IPhoneArticleFooter
        pageUrl={PAGE_URL}
        pageTitle={PAGE_TITLE}
        excludeHref={['/iphone/mobile-hoken-compare/', '/iphone/apple-care/']}
      />
    </>
  )
}
