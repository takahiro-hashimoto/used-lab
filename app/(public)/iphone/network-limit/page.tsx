import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import RatingMark from '@/app/components/RatingMark'
import Breadcrumb from '@/app/components/Breadcrumb'
import FaqSection from '@/app/components/support/FaqSection'
import IPhoneArticleFooter from '@/app/components/iphone/IPhoneArticleFooter'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'
import { getHeroImage } from '@/lib/data/hero-images'
import { getShops } from '@/lib/queries'

export const revalidate = false

const PAGE_TITLE = '意外と良い選択肢？ネットワーク制限△の中古iPhone・iPadを買うメリット・デメリットを解説'
const PAGE_DESCRIPTION =
  'ネットワーク制限△の中古iPhone・iPadは買っても大丈夫？赤ロムリスクや○△×の違い、メリット・デメリットをわかりやすく解説。赤ロム永久保証付きの安心ショップも紹介します。'
const PAGE_URL = 'https://used-lab.jp/iphone/network-limit/'

const FAQ_ITEMS = [
  {
    question: 'ネットワーク制限△の端末が赤ロムになる確率はどれくらい？',
    answer: '人気中古ECショップのイオシスが発信している情報では、2021〜2022年の2年間に販売したネットワーク制限△の端末が赤ロムになった確率は0.15%でした。ここまで低い確率なら過度に不安になる必要はなさそうです。\n<a href="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fspecial%2Fnetwork_sankaku" rel="nofollow">ネットワーク利用制限▲って？ | 中古スマホ販売の【イオシス】</a>',
  },
  {
    question: 'ネットワーク制限○△×はどうやって判定するの？',
    answer: '端末のIMEI（製造番号）を各キャリアの確認ページに入力することで判定できます。IMEIはiPhoneの場合「設定」→「一般」→「情報」から確認可能です。フリマで購入する際は、出品者からキャリア名とIMEIを聞いて事前にチェックしましょう。',
  },
  {
    question: 'SIMフリー端末ならネットワーク制限の影響はない？',
    answer: 'いいえ、SIMフリーでもネットワーク制限がかかる可能性はあります。SIMロック解除とは別の問題で、端末自体の分割支払い状況がキャリアで管理されているため影響を受ける場合があります。',
  },
  {
    question: 'ネットワーク制限△の中古端末を買うときの注意点は？',
    answer: '「赤ロム保証」が付いているかどうかを確認するのが大切です。保証があれば、仮に後から赤ロムになった場合でも返品や交換の対応を受けられるため安心して購入できます。',
  },
  {
    question: '総務省が赤ロムを原則禁止にするって本当？',
    answer: 'はい。総務省は端末代金の未払いなど金銭的な問題に起因するネットワーク利用制限について、中古端末の新しい所有者には責任がないという考えに基づき原則禁止とする方向で調整を進めています。盗難や不正契約による制限は引き続き維持されますが、将来的にネットワーク制限△のリスクはさらに低下する見通しです。',
  },
  {
    question: 'ネットワーク制限とアクティベーションロックは別物？',
    answer: 'はい、まったく別の問題です。ネットワーク制限はキャリアが通信を制限する仕組みで、アクティベーションロックはApple IDに紐づく盗難防止機能です。アクティベーションロックが解除されていない端末は初期設定すらできないため、購入前に必ず確認しましょう。',
  },
]

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/network-limit/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/network-limit/',
    images: [{ url: getHeroImage('/iphone/network-limit/'), width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [getHeroImage('/iphone/network-limit/')],
  },
}

export default async function NetworkLimitPage() {
  const shops = await getShops()
  const shopUrlMap: Record<number, string> = {}
  for (const s of shops) {
    if (s.url) shopUrlMap[s.id] = s.url
  }
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/network-limit/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.jp/iphone/' },
      { '@type': 'ListItem', position: 3, name: 'ネットワーク制限△のメリット・デメリット' },
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
              { label: 'ネットワーク制限△のメリット・デメリット' },
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
                  ネットワーク制限△の中古iPhone・iPadを買うメリット・デメリットを解説
                </h1>
                <HeroMeta dateStr={dateStr} dateDisplay={dateDisplay} withItemProp />
              </div>
              <div className="hero-visual">
                <figure className="hero-media">
                  <Image
                    src={getHeroImage('/iphone/network-limit/')}
                    alt="ネットワーク制限△の中古iPhone解説イメージ"
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
                中古のiPhoneやiPadを探していると目にする「ネットワーク制限△」の表記。不安に感じる方も多いですが、実は赤ロム永久保証付きのショップで購入すればリスクはほぼゼロで、相場より安く手に入るメリットがあります。
              </p>
              <p>
                本記事ではネットワーク制限「○・△・×」の違いからメリット・デメリット、安心して購入できるおすすめショップまでわかりやすく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古iPhoneの全体像を把握したい方は「<Link href="/iphone">中古iPhone完全購入ガイド</Link>」をご覧ください。
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
                <a href="#meaning" className="toc-item">
                  ネットワーク制限△の意味 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#merit-demerit" className="toc-item">
                  メリット・デメリット <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#shop" className="toc-item">
                  赤ロム保証ショップ比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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

        {/* メインコンテンツ */}
        <div className="l-sections" id="content" itemProp="articleBody">

          {/* ネットワーク制限△の意味 */}
          <section className="l-section" id="meaning" aria-labelledby="heading-meaning">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-meaning">
                ネットワーク制限△の意味
              </h2>
              <p className="m-section-desc">
                市場に出回る中古スマホ・タブレットは3つの種類に分類されます。<br />
                ネットワーク利用制限△の端末は、分割支払いが継続中なのに売却された製品であるということになります。
              </p>

              <div className="m-card m-card--padded glossary-box">
                <div className="glossary-item">
                  <h3 className="glossary-item-title">
                    ネットワーク利用制限 ○（通称：白ロム）
                  </h3>
                  <p className="glossary-item-desc">
                    SIMカードを挿入すれば問題なく使用できる端末。端末内部のロムに前の持ち主の契約情報が残っていない「真っ白な状態」であることから白ロムと呼ばれます。
                  </p>
                </div>
                <div className="glossary-item">
                  <h3 className="glossary-item-title">
                    ネットワーク利用制限 △
                  </h3>
                  <p className="glossary-item-desc">
                    現時点ではネットワークの利用が可能ですが、端末の分割支払いが継続中であり、今後の支払い状況によっては利用制限がかけられる可能性がある状態。将来的に赤ロムになるリスクがあるため注意が必要です。
                  </p>
                </div>
                <div className="glossary-item">
                  <h3 className="glossary-item-title">
                    ネットワーク利用制限 ×（通称：赤ロム）
                  </h3>
                  <p className="glossary-item-desc">
                    不正な契約や盗難品、端末代金の未払いなどの理由により、キャリアから利用制限がかけられた状態の端末。自分のSIMカードを挿入しても通話やデータ通信ができません。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* メリット・デメリット */}
          <section className="l-section" id="merit-demerit" aria-labelledby="heading-merit-demerit">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-merit-demerit">
                ネットワーク制限△の中古スマホを買うメリット・デメリット
              </h2>
              <p className="m-section-desc">
                わざわざネットワーク制限△を買うメリットなんてないと思う方も多いでしょう。しかし、実は魅力的な点も。
              </p>

              <div className="u-mb-xl">
                <div className="l-grid l-grid--2col l-grid--gap-lg">
                  <div className="recommend-card__fit-box recommend-card__fit-box--good">
                    <p className="recommend-card__fit-title">
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> こんな人におすすめ
                    </p>
                    <ul>
                      <li><i className="fa-solid fa-check" aria-hidden="true"></i> とにかく安く中古端末を手に入れたい（同スペック比で5,000〜10,000円安い）</li>
                      <li><i className="fa-solid fa-check" aria-hidden="true"></i> 赤ロム永久保証のECサイトで購入できる</li>
                      <li><i className="fa-solid fa-check" aria-hidden="true"></i> サブ機や子供用として使う予定</li>
                      <li><i className="fa-solid fa-check" aria-hidden="true"></i> 多少のリスクよりコスパを重視する</li>
                    </ul>
                  </div>
                  <div className="recommend-card__fit-box recommend-card__fit-box--bad">
                    <p className="recommend-card__fit-title">
                      <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> こんな人には向かない
                    </p>
                    <ul>
                      <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 赤ロム化のリスクを一切取りたくない</li>
                      <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 万が一の交換手続きが面倒に感じる</li>
                      <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> フリマアプリで保証なしの購入を検討している</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="m-card m-card--shadow m-card--padded u-mt-md">
                <h3 className="m-sub-heading m-sub-heading--no-mt">ネットワーク制限△のスマホはどれくらい安い？</h3>
                <p className="u-mt-md" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  実際にネットワーク制限△と通常の中古iPhoneの価格を比較してみると、同スペック・同ランクの製品で5,000円ほどお手頃な場合が多いようです。
                </p>
                <p className="u-mt-sm" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  また、赤ロム永久保証のある中古ECサイトなら、万が一のトラブルが起きても同スペックの中古端末に無料交換してもらえるため、金銭面でのマイナスになるリスクもほとんどありません。
                </p>
                <figure className="u-mt-md">
                  <Image
                    src="/images/content/photo/network-limit-compare.webp"
                    alt="ネットワーク制限△と通常の中古iPhoneの価格比較"
                    width={1200}
                    height={675}
                    className="u-pc-crop-16x9"
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}
                  />
                  <figcaption className="u-mt-xs" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    ネットワーク制限△と通常（○）の中古iPhoneの価格比較
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* 赤ロム保証ショップ */}
          <section className="l-section" id="shop" aria-labelledby="heading-shop">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-shop">
                赤ロム永久保証のおすすめ中古ECサイト
              </h2>
              <p className="m-section-desc">
                ネットワーク制限△の中古端末を購入なら赤ロム保証のECショップを選ぶのが大事。<br />
                ここではおすすめのショップを紹介します。
              </p>

              <div className="l-grid l-grid--3col l-grid--gap-lg">
                <article className="m-card m-card--shadow m-vendor-card">
                  <div className="m-vendor-card__header">
                    <h3 className="m-vendor-card__name">イオシス</h3>
                    <span className="m-tag">保証延長サービス</span>
                  </div>
                  <dl className="m-vendor-card__specs">
                    <div className="m-spec-row"><dt>価格</dt><dd><RatingMark mark="◎" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>保証期間</dt><dd>3ヶ月</dd></div>
                    <div className="m-spec-row"><dt>赤ロム保証</dt><dd>永久保証</dd></div>
                    <div className="m-spec-row"><dt>バッテリー保証</dt><dd><RatingMark mark="×" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>実物写真</dt><dd><RatingMark mark="×" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>配送料</dt><dd>640円</dd></div>
                  </dl>
                  <a href={shopUrlMap[1] ?? '#'} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                </article>

                <article className="m-card m-card--shadow m-vendor-card">
                  <div className="m-vendor-card__header">
                    <h3 className="m-vendor-card__name">にこスマ</h3>
                    <span className="m-tag">にこスマあんしん保険</span>
                  </div>
                  <dl className="m-vendor-card__specs">
                    <div className="m-spec-row"><dt>価格</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>保証期間</dt><dd>1年間</dd></div>
                    <div className="m-spec-row"><dt>赤ロム保証</dt><dd>永久保証</dd></div>
                    <div className="m-spec-row"><dt>バッテリー保証</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>実物写真</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>配送料</dt><dd><span className="m-spec-row__free">無料</span></dd></div>
                  </dl>
                  <a href={shopUrlMap[2] ?? '#'} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                </article>

                <article className="m-card m-card--shadow m-vendor-card">
                  <div className="m-vendor-card__header">
                    <h3 className="m-vendor-card__name">ゲオ</h3>
                    <span className="m-tag">ゲオ中古モバイル保証</span>
                  </div>
                  <dl className="m-vendor-card__specs">
                    <div className="m-spec-row"><dt>価格</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>保証期間</dt><dd>30日間</dd></div>
                    <div className="m-spec-row"><dt>赤ロム保証</dt><dd>永久保証</dd></div>
                    <div className="m-spec-row"><dt>バッテリー保証</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>実物写真</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>配送料</dt><dd>550円</dd></div>
                  </dl>
                  <a href={shopUrlMap[3] ?? '#'} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                </article>

                <article className="m-card m-card--shadow m-vendor-card">
                  <div className="m-vendor-card__header">
                    <h3 className="m-vendor-card__name">リコレ</h3>
                    <span className="m-tag">ビック月額スマホ保証</span>
                  </div>
                  <dl className="m-vendor-card__specs">
                    <div className="m-spec-row"><dt>価格</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>保証期間</dt><dd>30日間</dd></div>
                    <div className="m-spec-row"><dt>赤ロム保証</dt><dd>3年間</dd></div>
                    <div className="m-spec-row"><dt>バッテリー保証</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>実物写真</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>配送料</dt><dd>550円</dd></div>
                  </dl>
                  <a href={shopUrlMap[4] ?? '#'} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                </article>

                <article className="m-card m-card--shadow m-vendor-card">
                  <div className="m-vendor-card__header">
                    <h3 className="m-vendor-card__name">じゃんぱら</h3>
                    <span className="m-tag">じゃんぱらあんしん保証</span>
                  </div>
                  <dl className="m-vendor-card__specs">
                    <div className="m-spec-row"><dt>価格</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>保証期間</dt><dd>3ヶ月</dd></div>
                    <div className="m-spec-row"><dt>赤ロム保証</dt><dd>永久保証</dd></div>
                    <div className="m-spec-row"><dt>バッテリー保証</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>実物写真</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>配送料</dt><dd>770円</dd></div>
                  </dl>
                  <a href={shopUrlMap[6] ?? '#'} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                </article>

                <article className="m-card m-card--shadow m-vendor-card">
                  <div className="m-vendor-card__header">
                    <h3 className="m-vendor-card__name">Amazon整備済み品</h3>
                  </div>
                  <dl className="m-vendor-card__specs">
                    <div className="m-spec-row"><dt>価格</dt><dd><RatingMark mark="◯" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>保証期間</dt><dd>3ヶ月</dd></div>
                    <div className="m-spec-row"><dt>赤ロム保証</dt><dd>出品者による</dd></div>
                    <div className="m-spec-row"><dt>バッテリー保証</dt><dd><RatingMark mark="×" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>実物写真</dt><dd><RatingMark mark="×" size="sm" /></dd></div>
                    <div className="m-spec-row"><dt>配送料</dt><dd><span className="m-spec-row__free">無料</span></dd></div>
                  </dl>
                  <a href={shopUrlMap[7] ?? '#'} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                </article>
              </div>

              <div className="m-callout m-callout--tip u-mt-xl">
                <span className="m-callout__label">memo</span>
                <p>
                  各ショップの特徴や選び方を詳しく知りたい方は「<Link href="/iphone/iphone-shop/" style={{ color: 'var(--color-primary)' }}>中古iPhoneはどこで買うのが正解？おすすめサイト・ショップ比較</Link>」をご覧ください。
                </p>
              </div>
            </div>
          </section>

          {/* よくある質問 */}
          <FaqSection
            title="ネットワーク制限に関するよくある質問"
            description=""
            items={FAQ_ITEMS}
          />


        </div>
      </article>
    </main>
    <IPhoneArticleFooter
            pageUrl={PAGE_URL}
            pageTitle={PAGE_TITLE}
            excludeHref={["/iphone/network-limit/", "/iphone/recommend/"]}
          />
    </>
  )
}
