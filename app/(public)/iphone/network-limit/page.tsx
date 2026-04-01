import type { Metadata } from 'next'
import Image from 'next/image'
import RatingMark from '@/app/components/RatingMark'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import IPhoneRelatedLinks from '@/app/components/iphone/IPhoneRelatedLinks'
import AuthorByline from '@/app/components/AuthorByline'
import { buildArticleJsonLd, getGitDateForFile } from '@/lib/utils/shared-helpers'
import HeroMeta from '@/app/components/HeroMeta'

const PAGE_TITLE = '意外と良い選択肢？ネットワーク制限△の中古iPhone・iPadを買うメリット・デメリットを解説'
const PAGE_DESCRIPTION =
  'ネットワーク制限△の中古iPhone・iPadは買っても大丈夫？赤ロムリスクや○△×の違い、メリット・デメリットをわかりやすく解説。赤ロム永久保証付きの安心ショップも紹介します。'
const PAGE_URL = 'https://used-lab.com/iphone/network-limit/'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/iphone/network-limit/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/iphone/network-limit/',
    images: [{ url: '/images/content/thumbnail/iphone-image-02.jpg', width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/thumbnail/iphone-image-02.jpg'],
  },
}

export default function NetworkLimitPage() {
  const { dateStr, dateDisplay } = getGitDateForFile('app/(public)/iphone/network-limit/page.tsx')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全購入ガイド', item: 'https://used-lab.com/iphone/' },
      { '@type': 'ListItem', position: 3, name: 'ネットワーク制限△のメリット・デメリット' },
    ],
  }

    const articleJsonLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    dateStr,
    url: PAGE_URL,
  })

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'ネットワーク制限△の端末が赤ロムになる確率はどれくらい？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '人気中古ECショップのイオシスが発信している情報では、2021〜2022年の2年間に販売したネットワーク制限△の端末が赤ロムになった確率は0.15%でした。',
        },
      },
      {
        '@type': 'Question',
        name: 'ネットワーク制限○△×はどうやって判定するの？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '端末のIMEI（製造番号）を各キャリアの確認ページに入力することで、制限の状況を確認できます。ドコモ、au、ソフトバンク、楽天モバイルそれぞれに確認ページがあります。',
        },
      },
      {
        '@type': 'Question',
        name: 'SIMフリー端末ならネットワーク制限の影響はない？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'いいえ、SIMフリーでもネットワーク制限がかかる可能性はあります。SIMロック解除とは別の問題で、端末自体の分割支払い状況がキャリアで管理されているため影響を受ける場合があります。',
        },
      },
      {
        '@type': 'Question',
        name: 'ネットワーク制限△の中古端末を買うときの注意点は？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '「赤ロム保証」が付いているかどうかを確認するのが大切です。保証があれば、仮に後から赤ロムになった場合でも返品や交換の対応を受けられます。',
        },
      },
      {
        '@type': 'Question',
        name: '総務省が赤ロムを原則禁止にするって本当？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '総務省は端末代金の未払いなど金銭的な問題に起因するネットワーク利用制限について、中古端末の新しい所有者には責任がないという考えに基づき原則禁止とする方向で調整を進めています。将来的にネットワーク制限△のリスクはさらに低下する見通しです。',
        },
      },
      {
        '@type': 'Question',
        name: 'ネットワーク制限とアクティベーションロックは別物？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、まったく別の問題です。ネットワーク制限はキャリアが通信を制限する仕組みで、アクティベーションロックはApple IDに紐づく盗難防止機能です。アクティベーションロックが解除されていない端末は初期設定すらできないため、購入前に必ず確認しましょう。',
        },
      },
    ],
  }

  return (
    <main>
      <article itemScope itemType="https://schema.org/Article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
                    src="/images/content/thumbnail/iphone-image-02.jpg"
                    alt="ネットワーク制限△の中古iPhone解説イメージ"
                    className="hero-media__img"
                    width={360}
                    height={360}
                    priority
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
                中古iPhoneの全体像を把握したい方は「<a href="/iphone">中古iPhone完全購入ガイド</a>」をご覧ください。
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
          <AuthorByline />
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

              <div className="recommend-card__fit" style={{ marginTop: 'var(--space-xl)' }}>
                <div className="l-grid l-grid--2col l-grid--gap-lg">
                  <div className="recommend-card__fit-box recommend-card__fit-box--good">
                    <h4>
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> こんな人におすすめ
                    </h4>
                    <ul>
                      <li><i className="fa-solid fa-check" aria-hidden="true"></i> とにかく安く中古端末を手に入れたい（同スペック比で5,000〜10,000円安い）</li>
                      <li><i className="fa-solid fa-check" aria-hidden="true"></i> 赤ロム永久保証のECサイトで購入できる</li>
                      <li><i className="fa-solid fa-check" aria-hidden="true"></i> サブ機や子供用として使う予定</li>
                      <li><i className="fa-solid fa-check" aria-hidden="true"></i> 多少のリスクよりコスパを重視する</li>
                    </ul>
                  </div>
                  <div className="recommend-card__fit-box recommend-card__fit-box--bad">
                    <h4>
                      <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> こんな人には向かない
                    </h4>
                    <ul>
                      <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 赤ロム化のリスクを一切取りたくない</li>
                      <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> 万が一の交換手続きが面倒に感じる</li>
                      <li><i className="fa-solid fa-xmark" aria-hidden="true"></i> フリマアプリで保証なしの購入を検討している</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="m-card m-card--padded" style={{ marginTop: 'var(--space-md)', border: 'none' }}>
                <h3 className="m-sub-heading m-sub-heading--no-mt">ネットワーク制限△のスマホはどれくらい安い？</h3>
                <p style={{ marginTop: 'var(--space-md)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  実際にネットワーク制限△と通常の中古iPhoneの価格を比較してみると、同スペック・同ランクの製品で5,000円ほどお手頃な場合が多いようです。
                </p>
                <p style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  また、赤ロム永久保証のある中古ECサイトなら、万が一のトラブルが起きても同スペックの中古端末に無料交換してもらえるため、金銭面でのマイナスになるリスクもほとんどありません。
                </p>
                <figure style={{ marginTop: 'var(--space-md)' }}>
                  <Image
                    src="/images/content/photo/network-limit-compare.webp"
                    alt="ネットワーク制限△と通常の中古iPhoneの価格比較"
                    width={1200}
                    height={675}
                    className="u-pc-crop-16x9"
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}
                  />
                  <figcaption style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-xs)' }}>
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
                  <a href="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fiphone" className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
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
                  <a href="https://px.a8.net/svt/ejp?a8mat=3NCKMH+63P0JM+4O7U+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.nicosuma.com%2Fiphone" className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
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
                  <a href="https://px.a8.net/svt/ejp?a8mat=3TB2U4+C4ESQQ+4J34+BW0YB&a8ejpredirect=https%3A%2F%2Fec.geo-online.co.jp%2Fshop%2Fc%2Fc1001%2F" className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
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
                  <a href="https://click.linksynergy.com/deeplink?id=N*L98MVOv3Q&mid=43860&murl=https%3A%2F%2Fused.sofmap.com%2Fr%2Fcategory%2Fiphone%2Fiphone_linklist" className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
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
                  <a href="https://www.janpara.co.jp/" className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
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
                  <a href="https://amzn.to/4ePUzhA" className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                </article>
              </div>

              <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-xl)' }}>
                <span className="m-callout__label">memo</span>
                <p>
                  各ショップの特徴や選び方を詳しく知りたい方は「<a href="/iphone/iphone-shop/" style={{ color: 'var(--color-primary)' }}>中古iPhoneはどこで買うのが正解？おすすめサイト・ショップ比較</a>」をご覧ください。
                </p>
              </div>
            </div>
          </section>

          {/* よくある質問 */}
          <section className="l-section" id="faq" aria-labelledby="heading-faq">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
                ネットワーク制限に関するよくある質問
              </h2>

              <div className="faq-list">
                <div className="m-card faq-item">
                  <h3 className="faq-question">ネットワーク制限△の端末が赤ロムになる確率はどれくらい？</h3>
                  <div className="faq-answer m-rich-text m-rich-text--muted">
                    <p>人気中古ECショップのイオシスが発信している情報では、2021〜2022年の2年間に販売したネットワーク制限△の端末が赤ロムになった確率は<strong>0.15%</strong>でした。ここまで低い確率なら過度に不安になる必要はなさそうです。</p>
                    <p className="lead-link" style={{ marginTop: 'var(--space-sm)' }}>
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                      <a href="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fspecial%2Fnetwork_sankaku" target="_blank" rel="nofollow noopener noreferrer">ネットワーク利用制限▲って？ | 中古スマホ販売の【イオシス】</a>
                    </p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">ネットワーク制限○△×はどうやって判定するの？</h3>
                  <div className="faq-answer m-rich-text m-rich-text--muted">
                    <p>端末のIMEI（製造番号）を各キャリアの確認ページに入力することで判定できます。IMEIはiPhoneの場合「設定」→「一般」→「情報」から確認可能です。フリマで購入する際は、出品者からキャリア名とIMEIを聞いて事前にチェックしましょう。</p>
                    <ul>
                      <li><a href="https://nw-restriction.nttdocomo.co.jp/top.php" rel="nofollow noopener" target="_blank">ドコモ ネットワーク利用制限照会</a></li>
                      <li><a href="https://au-cs0.kddi.com/FtHome" rel="nofollow noopener" target="_blank">au ネットワーク利用制限照会</a></li>
                      <li><a href="https://ct11.my.softbank.jp/WBF/icv" rel="nofollow noopener" target="_blank">ソフトバンク/Y!mobile ネットワーク利用制限照会</a></li>
                      <li><a href="https://network.mobile.rakuten.co.jp/restriction/" rel="nofollow noopener" target="_blank">楽天モバイル ネットワーク利用制限照会</a></li>
                    </ul>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">SIMフリー端末ならネットワーク制限の影響はない？</h3>
                  <div className="faq-answer m-rich-text m-rich-text--muted">
                    <p>いいえ、SIMフリーでもネットワーク制限がかかる可能性はあります。SIMロック解除とは別の問題で、端末自体の分割支払い状況がキャリアで管理されているため影響を受ける場合があります。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">ネットワーク制限△の中古端末を買うときの注意点は？</h3>
                  <div className="faq-answer m-rich-text m-rich-text--muted">
                    <p>「赤ロム保証」が付いているかどうかを確認するのが大切です。保証があれば、仮に後から赤ロムになった場合でも返品や交換の対応を受けられるため安心して購入できます。</p>
                    <p className="lead-link">
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                      <a href="/iphone/used-iphone-attention/">中古iPhoneを買う際の注意点まとめ</a>
                    </p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">総務省が赤ロムを原則禁止にするって本当？</h3>
                  <div className="faq-answer m-rich-text m-rich-text--muted">
                    <p>はい。総務省は端末代金の未払いなど金銭的な問題に起因するネットワーク利用制限について、中古端末の新しい所有者には責任がないという考えに基づき原則禁止とする方向で調整を進めています。盗難や不正契約による制限は引き続き維持されますが、将来的にネットワーク制限△のリスクはさらに低下する見通しです。</p>
                  </div>
                </div>
                <div className="m-card faq-item">
                  <h3 className="faq-question">ネットワーク制限とアクティベーションロックは別物？</h3>
                  <div className="faq-answer m-rich-text m-rich-text--muted">
                    <p>はい、まったく別の問題です。ネットワーク制限はキャリアが通信を制限する仕組みで、アクティベーションロックはApple IDに紐づく盗難防止機能です。アクティベーションロックが解除されていない端末は初期設定すらできないため、購入前に必ず確認しましょう。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 目的別に人気の中古iPhone */}
          <section className="l-section" id="popular" aria-labelledby="heading-popular">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">目的別に人気の中古iPhone</h2>
              <p className="m-section-desc">目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。</p>
              <div className="m-card m-card--shadow popular-card">
                <figure className="popular-card-figure">
                  <Image alt="中古iPhoneおすすめ5選のイメージ画像" loading="lazy" width={400} height={500} className="popular-card-img" src="/images/content/thumbnail/iphone-setting.webp" />
                </figure>
                <div className="popular-card-body">
                  <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                  <p className="popular-card-title">中古iPhoneおすすめ5選</p>
                <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>                  <p className="popular-card-desc">カメラ性能を重視する人向け、大画面で動画やSNSを楽しみたい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。</p>
                  <div className="popular-card-buttons">
                    <a className="m-btn m-btn--primary" href="/iphone/recommend/">おすすめ5機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                    <a className="m-btn m-btn--secondary" href="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fsmartphone%2Fiphone" target="_blank" rel="noopener noreferrer">
                      イオシスで中古iPhoneを探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <IPhoneRelatedLinks excludeHref={["/iphone/network-limit/", "/iphone/recommend/"]} />
          <ShareBox url={PAGE_URL} text={PAGE_TITLE} />
        </div>
      </article>
    </main>
  )
}
