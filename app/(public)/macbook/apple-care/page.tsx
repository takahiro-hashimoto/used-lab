import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import MacBookArticleFooter from '@/app/components/macbook/MacBookArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'

const PAGE_TITLE = 'MacBookを買ったらアップルケアに入るべき？必要ではない理由5つを解説'
const PAGE_DESCRIPTION =
  'MacBookを買ったときにApple Care+は必要？料金・修理費用・バッテリー交換条件を整理した上で、コスパの観点から加入しなくていい理由を5つ解説します。'
const PAGE_URL = 'https://used-lab.jp/macbook/apple-care/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/macbook/apple-care/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/macbook/apple-care/',
    images: [{ url: getHeroImage('/macbook/apple-care/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/macbook/apple-care/')],
  },
}

export default function MacbookAppleCarePage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/macbook/apple-care/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古MacBook完全購入ガイド', item: 'https://used-lab.jp/macbook' },
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
                { label: '中古MacBook完全購入ガイド', href: '/macbook' },
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
                    MacBookを買ったらアップルケアに入るべき？必要ではない理由5つを解説
                  </h1>
                  <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
                </div>
                <div className="hero-visual">
                  <figure className="hero-media">
                    <Image
                      src={getHeroImage('/macbook/apple-care/')}
                      alt="MacBookのアップルケア加入を検討するイメージ"
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
                  MacBookを購入するときに多くの方が悩む「Apple Care+は必要？」という疑問。
                </p>
                <p>
                  MacBookで最も注意すべきリスクは落下よりも「液体損傷」です。コーヒーやお茶をこぼすと修理費が数十万円になることもあります。一方でApple Care+の修理自己負担額は外装損傷で12,900円、その他の損傷では37,100円と他デバイスより高く、<strong>MシリーズはSoCにメモリ・ストレージが統合されているため修理＝ロジックボード交換</strong>になりやすく、修理費が極めて高額になる構造です。
                </p>
                <p>
                  それでも「気をつけて使えば液体損傷リスクは低い」という方は、コスパの観点からApple Care+を見直す価値があります。本記事ではアップルケアの概要と料金を整理したうえで、加入しなくてよいと考える理由を5つ解説します。
                </p>
                <p className="lead-link">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                  MacBookの選び方から知りたい方は「<Link href="/macbook/">中古MacBook購入ガイド</Link>」をご覧ください。
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
                    <a href="#used-macbook" className="toc-item">
                      中古MacBookという選択肢 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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
                  Apple Care+ for Macの概要
                </h2>
                <p className="m-section-desc">まずは簡単にApple Care+ for Macの概要や損傷時に修理代がどれくらい軽減されるのかを紹介します。</p>

                {/* 特徴 */}
                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card--aside">
                    <div className="media-card__img-wrap">
                      <img
                        alt="Apple Care+ for Macの概要イメージ"
                        className="media-card__img"
                        width={240}
                        height={160}
                        loading="lazy"
                        src="/images/content/thumbnail/apple-care.jpg"
                      />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">Apple Care+ for Macの特徴</h3>
                      <p className="media-card__desc">新しく買ったMacBookには製品購入後1年間のハードウェア製品限定保証と90日間の無償テクニカルサポートがついています。それに加え、さらにMacBookが故障したときの保障を手厚くするために用意されているのがApple Care+ for Macです。</p>
                      <ul className="info-card__list">
                        <li>月払いまたは2年分一括払い（端末ごとに料金が異なる）</li>
                        <li>新品端末購入から1年以内であれば加入可能（Macは期間が長い）</li>
                        <li>保証期間は加入から3年間（Macは3年保証）</li>
                        <li>過失・事故による損傷の修理サービスを提供</li>
                        <li>バッテリーの修理保証あり</li>
                        <li>液体による損傷も補償対象</li>
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
                    アップルケアの料金は端末によって異なり、それぞれ下記の通り。年間一括払いをした場合、数千円お得になる計算です。
                  </p>
                  <div className="m-table-card">
                    <div className="m-table-scroll">
                      <table className="m-table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>年払い（税込）</th>
                            <th>3年一括払い（税込）</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>MacBook Pro 16インチ</th>
                            <td>23,400円</td>
                            <td>62,800円</td>
                          </tr>
                          <tr>
                            <th>MacBook Pro 14インチ</th>
                            <td>16,500円</td>
                            <td>44,800円</td>
                          </tr>
                          <tr>
                            <th>MacBook Air 15インチ</th>
                            <td>12,800円</td>
                            <td>24,800円</td>
                          </tr>
                          <tr>
                            <th>MacBook Air 13インチ</th>
                            <td>10,800円</td>
                            <td>29,800円</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p class="m-footnote u-mt-sm">※2026年4月時点の料金です。実際の価格は公式サイトをご確認ください</p>
                </div>

                {/* 修理費用 */}
                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <h3 className="media-card__title" id="heading-repair-about">MacBookの修理費用について</h3>
                  <div className="media-card__desc">
                    <p>バッテリー交換が必要になった時の費用は以下の通り。金額はApple公式サイトの「<a href="https://support.apple.com/ja-jp/mac/repair" style={{ color: 'var(--color-primary)' }}>Macの修理サービス</a>」を参照しています。</p>
                  </div>
                  <div className="m-table-card">
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
                            <th>MacBook Pro 16</th>
                            <td>0円</td>
                            <td>42,500円</td>
                          </tr>
                          <tr>
                            <th>MacBook Pro 14</th>
                            <td>0円</td>
                            <td>39,500円</td>
                          </tr>
                          <tr>
                            <th>MacBook Air 15</th>
                            <td>0円</td>
                            <td>33,800円</td>
                          </tr>
                          <tr>
                            <th>MacBook Air 13</th>
                            <td>0円</td>
                            <td>30,800円</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p class="m-footnote u-mt-sm">※2026年4月時点の料金です。実際の価格は公式サイトをご確認ください</p>
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

                  {/* 理由①: 損益分岐点 */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/macbook-image.jpg" alt="MacBookのイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">① 3年間で修理が必要になる確率は低い</h3>
                      <p className="media-card__desc">
                        「修理が1回起きれば元が取れる」とよく言われますが、そもそも3年間でMacBookの修理が必要になるほどの破損が起きる人は多数派ではありません。
                      </p>
                      <p className="media-card__desc">
                        MacBookは机の上で使う場面がほとんどで、持ち歩いても鞄に入れた状態での移動が多く、落下リスクはスマートフォンより低い端末です。ケースに入れていれば、3年間で一度も修理せずに使い終わるケースがほとんどです。
                      </p>
                      <p className="media-card__desc">
                        ただし注意点として、<strong>MacBookはApple Care+加入時でも外装損傷の自己負担額が12,900円、その他の損傷（ロジックボード等）では37,100円</strong>と、iPhoneやiPadの3,700円と比べて数倍になります。また、MシリーズMacはSoC・メモリ・ストレージが一体化しており、部分修理が難しく修理費が高額になりやすい構造です。
                      </p>
                      <p className="media-card__desc">
                        MacBookの場合、Apple公式サイトには損傷修理費の目安が掲載されていないため、バッテリー交換費用を基準に試算します。下の表は「3年間でバッテリー交換が1回発生したとき」の比較です。<span className="u-marker">MacBook Proでは、Apple Care+はバッテリー交換だけでは元が取れない計算になります</span>。
                      </p>
                      <div className="m-card m-card--shadow m-table-card u-mt-sm">
                        <div className="m-table-scroll">
                          <table className="m-table m-table--center">
                            <thead>
                              <tr>
                                <th>端末</th>
                                <th>Apple Care+費用<br /><span style={{ fontWeight: 'normal', fontSize: 'var(--text-sm)' }}>3年一括（バッテリー交換は無償）</span></th>
                                <th>未加入での<br />バッテリー交換費</th>
                                <th>差額</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>MacBook Pro 16インチ</th>
                                <td>62,800円</td>
                                <td>42,500円</td>
                                <td>+20,300円（割高）</td>
                              </tr>
                              <tr>
                                <th>MacBook Pro 14インチ</th>
                                <td>44,800円</td>
                                <td>39,500円</td>
                                <td>+5,300円（割高）</td>
                              </tr>
                              <tr>
                                <th>MacBook Air 15インチ</th>
                                <td>24,800円</td>
                                <td>33,800円</td>
                                <td className="u-text-accent">▲9,000円</td>
                              </tr>
                              <tr>
                                <th>MacBook Air 13インチ</th>
                                <td>29,800円</td>
                                <td>30,800円</td>
                                <td className="u-text-accent">▲1,000円</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 理由②: バッテリー無償交換のハードル */}
                  <div className="m-card m-card--shadow m-card--padded" id="battery">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/review-macbook-14inch-2021-magsafe-port.jpg" alt="MacBookのバッテリー残量イメージ" className="media-card__img" width={800} height={450} loading="lazy" />
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
                        MacBookのバッテリーは品質が高く、通常の使い方では劣化が緩やかです。<span className="u-marker">保証期間の3年以内にバッテリー容量が80%を下回るのは、かなりハードな使い方をしても難しい</span>のが実情です。
                      </p>
                    </div>
                  </div>

                  {/* 理由③: 修理費用は無料にはならない */}
                  <div className="m-card m-card--shadow m-card--padded" id="repair-cost">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/macbook-edit.webp" alt="MacBookの修理イメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">③ 修理費用は無料にはならない</h3>
                      <p className="media-card__desc">
                        Apple Care+に加入していても、修理費用が完全に無料になるわけではありません。
                      </p>
                      <p className="media-card__desc">
                        未加入時と比べて圧倒的に安く済むのは事実ですが、<span className="u-marker">外装損傷なら12,900円、その他（ロジックボード等）なら37,100円の自己負担が発生します</span>。
                      </p>
                      <p className="media-card__desc">
                        MacBook Pro 16インチを3年間月払い（2,100円×36ヶ月）で加入した場合、支払い総額は75,600円。そこに修理時の自己負担12,900円（外装損傷の場合）が加算されます。保険として考えたとき、この費用対効果が割に合うかは慎重に考えたいところです。
                      </p>
                    </div>
                  </div>

                  {/* 理由④: 自然故障は1年間無償対応 */}
                  <div className="m-card m-card--shadow m-card--padded" id="warranty">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/use-macbook.jpg" alt="MacBookを日常使用するイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
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
                        Apple Care+が標準保証と異なる点は「2年目以降の保証」と「過失・事故による破損への対応」のみです。落下や液体リスクが低い使い方であれば、Apple Care+の出番はほぼないといえます。
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
                                <td>24,800〜62,800円</td>
                              </tr>
                              <tr>
                                <th>期間</th>
                                <td>1年間</td>
                                <td>3年間</td>
                              </tr>
                              <tr>
                                <th>技術サポート</th>
                                <td>90日間</td>
                                <td>3年間</td>
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

                  {/* 理由⑤: 代替保険がある */}
                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/macbook-peep-prevention-filter-front-02.jpg" alt="MacBookを使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
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
                <p className="m-section-desc">
                  「不要」と断言してきましたが、使い方によっては加入が合理的なケースもあります。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }} className="u-mt-2xl">

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/review-macbook-14inch-2021-sdcard-slot.jpg" alt="MacBook Proを使用するイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">MacBook Pro（高額モデル）を外出先でヘビー使用する人</h3>
                      <p className="media-card__desc">
                        MシリーズMacBookはSoC・メモリ・ストレージが一体化しているため、損傷時はロジックボード交換になりやすく、修理費が非常に高額になります。特にMacBook Pro 16インチは本体価格も高く、万が一の損傷リスクを考えるとApple Care+の恩恵が最も大きい端末です。
                      </p>
                      <p className="media-card__desc">
                        カフェや外出先で頻繁に使い、バッグへの出し入れが多い方は衝撃・液体損傷リスクが高まります。3年一括（62,800円）で加入しておけば、自己負担12,900円〜37,100円で修理対応できます。
                      </p>
                    </div>
                  </div>

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/mx-keys-mini-for-mac-use-03-1024x683.webp" alt="飲み物の近くでMacBookを使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">液体をこぼす頻度が高い環境で使う人</h3>
                      <p className="media-card__desc">
                        飲み物を飲みながら作業する習慣がある方や、子どもがいる環境でMacBookを使う方は液体による損傷リスクがあります。MacBookは水没すると修理費が非常に高額になるため、Apple Care+の加入を真剣に検討する価値があります。
                      </p>
                    </div>
                  </div>

                  <div className="m-card m-card--shadow m-card--padded">
                    <div className="media-card__img-wrap">
                      <img src="/images/content/photo/iphone-broken.jpg" alt="iPhoneの画面がひび割れする様子" className="media-card__img" width={800} height={450} loading="lazy" />
                    </div>
                    <div className="media-card__body">
                      <h3 className="media-card__title">過去にPCや電子機器を破損させた経験がある人</h3>
                      <p className="media-card__desc">
                        デバイスをよく落とす・過去に修理経験があるという方は、同じことがMacBookでも起きる可能性が高いです。
                      </p>
                      <p className="media-card__desc">
                        特にMacBook ProやMacBook Airのような高額モデルを購入する場合は、修理費用が10万円を超えるケースもあるため、Apple Care+の加入を真剣に検討する価値があります。
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
                      <p>Apple Care+と違い、期間の縛りがないのが最大のメリット。中古MacBookを長く使いたい方におすすめです。</p>
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
                            <td>1,200円〜2,100円</td>
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
                            <td>3年（延長可）</td>
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
              </div>
            </section>

            {/* ── Section 5: 中古MacBookという選択肢 ── */}
            <section className="l-section" id="used-macbook" aria-labelledby="heading-used-macbook">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-used-macbook">
                  買い替えるなら中古MacBookの検討もおすすめ
                </h2>
                <p className="m-section-desc">
                  Apple Care+のコスパが悪い理由を整理し、代替となるおすすめサービスをご紹介してきました。
                </p>
                <p className="m-section-desc">
                  しかし、そもそも「新品にこだわる必要があるか」も見直す価値があります。
                </p>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <div className="media-card__img-wrap">
                    <img src="/images/content/photo/review-macbook-14inch-2021-summary.jpg" alt="中古MacBookを使うイメージ" className="media-card__img" width={800} height={450} loading="lazy" />
                  </div>
                  <div className="media-card__body">
                    <h3 className="media-card__title">新品＋Apple Care+より、中古MacBookの方がコスパが高いことも</h3>
                    <p className="media-card__desc">
                      ドキュメント作成・Web閲覧・動画視聴・プログラミングといったMacBookの主な用途は、1〜2世代前の中古モデルでも快適にこなせます。新品にApple Care+を加えた総額と、状態の良い中古を比べると、<span className="u-marker">後者の方がコスパが高いケースは珍しくありません</span>。
                    </p>
                    <p className="media-card__desc">
                      また、モバイル保険はイオシス・じゃんぱら・ゲオなど主要な中古専門店で購入した端末も補償対象。「中古は保険に入れない」という心配も不要です。
                    </p>
                    <p className="lead-link u-mt-sm">
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                      おすすめの中古MacBookは「<Link href="/macbook/recommend/">中古MacBookのおすすめ機種</Link>」で紹介しています。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── FAQ ── */}
            <FaqSection
              title="Apple Care+ for Macのよくある質問"
              description="Apple Care+に関するよくある疑問にお答えします。"
              items={[
                {
                  question: 'Apple Care+を3年一括払いした後、保証期間内にMacBookを買い替えた場合、次の製品に引き継げますか？',
                  answer: 'Apple Care+の保証は登録したデバイスのシリアル番号に紐付いているため、新しいMacBookへの引き継ぎはできません。',
                },
                {
                  question: 'MacBookのApple Care+は何年間保証されますか？',
                  answer: 'MacBook向けのApple Care+ for Macは3年間の保証です（iPhoneやiPadの2年間より長い）。',
                },
                {
                  question: 'Apple Care+はMacBookを購入した後からでも加入できますか？',
                  answer: 'Macの場合、新品端末の購入から1年以内であれば加入できます（iPhoneやiPadの30日より長い）。',
                },
                {
                  question: 'Apple Care+の保証期間はどうやって確認できますか？',
                  answer: 'Appleメニュー→「このMacについて」→「システム情報」から確認できます。または support.apple.com/my-support にアクセスして確認できます。',
                },
                {
                  question: '水没・液体損傷はApple Care+で補償されますか？',
                  answer: 'はい。Apple Care+では過失・事故による損傷として液体による損傷も補償対象です（自己負担12,900〜37,100円）。未加入の場合は修理費が非常に高額になるため、使用環境によっては加入を検討する価値があります。',
                },
              ]}
            />

            {/* ── まとめ ── */}
            <section className="l-section" id="summary" aria-labelledby="heading-summary">
              <div className="l-container">
                <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
                  まとめ：MacBookにApple Care+は必要ない場合が多い
                </h2>

                <div className="m-card m-card--shadow m-card--padded u-mt-2xl">
                  <h3 className="summary-card__title">この記事のポイント</h3>
                  <dl className="summary-card__dl">
                    <div>
                      <dt className="summary-card__dt">3年間で修理が必要になる確率は低い</dt>
                      <dd className="summary-card__dd">MacBookは机での使用が中心で、スマートフォンに比べて落下頻度が低い。ケースに入れて持ち歩けば3年間修理不要で使い終わるケースがほとんど。</dd>
                    </div>
                    <div>
                      <dt className="summary-card__dt">バッテリー無償交換の条件は厳しい</dt>
                      <dd className="summary-card__dd">無償交換の条件は「容量が80%未満」。通常の使い方では保証期間の3年以内にこの基準を下回ることはまずない。</dd>
                    </div>
                    <div>
                      <dt className="summary-card__dt">修理しても自己負担は残る</dt>
                      <dd className="summary-card__dd">Apple Care+に加入していても、修理のたびに12,900円（外装損傷）または37,100円（その他の損傷）の自己負担が発生する。完全無料にはならない。</dd>
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
                      <dt className="summary-card__dt">中古MacBook＋モバイル保険が最もコスパの良い組み合わせ</dt>
                      <dd className="summary-card__dd">新品＋Apple Care+の総額と比べると、状態の良い中古＋モバイル保険の方が安く上がるケースが多い。</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

          </div>
        </article>
      </main>
      <MacBookArticleFooter
        pageUrl={PAGE_URL}
        pageTitle={PAGE_TITLE}
        excludeHref={['/macbook/apple-care/', '/macbook/recommend/']}
      />
    </>
  )
}
