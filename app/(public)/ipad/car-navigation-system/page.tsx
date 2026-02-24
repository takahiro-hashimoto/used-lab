import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import MeritSection from './components/MeritSection'
import CautionSection from './components/CautionSection'

const PAGE_TITLE = 'iPadをカーナビ化するメリットが凄い！地図が古くなる問題をすっきり解消'
const PAGE_DESCRIPTION =
  'iPadをカーナビ代わりに使うメリット5つと注意点2つを実体験をもとに解説。常に最新の地図・渋滞情報・大画面・直感操作など、車載カーナビにはない利点をわかりやすく紹介します。'
const PAGE_URL = 'https://used-lab.com/ipad/car-navigation-system/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/ipad/car-navigation-system/',
    images: [{ url: '/images/content/ipad-car-navi-02.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/ipad-car-navi-02.jpg'],
  },
}

export default function CarNavigationSystemPage() {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPad完全ガイド', item: 'https://used-lab.com/ipad' },
      { '@type': 'ListItem', position: 3, name: 'iPadのカーナビ化' },
    ],
  }

  // JSON-LD: Article
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

        <div className="hero-wrapper">
        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPad完全ガイド', href: '/ipad' },
            { label: 'iPadのカーナビ化' },
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
                iPadをカーナビ化する<br className="sp-only" />メリットが凄い！<br className="sp-only" />地図が古くなる問題をすっきり解消
              </h1>
              <p className="hero-description" itemProp="description">
                常に最新の地図・渋滞情報・大画面・直感操作など、iPad miniのカーナビ化で感じたメリットと注意点を紹介
              </p>
              <div className="hero-actions">
                <a href="#merit" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-thumbs-up" aria-hidden="true"></i>
                  <span>メリットを見る</span>
                </a>
                <a href="#caution" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                  <span>注意点を確認</span>
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
                <Image
                  src="/images/content/ipad-car-navi-02.jpg"
                  alt="iPadをカーナビ化した様子"
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
              <p>「カーナビの地図が古くなって、旅行先で困った経験はありませんか？」</p>
              <p>
                マップの更新にはディーラーに頼むと2〜3万円の費用がかかることも。そこでおすすめなのが<strong>iPad miniをカーナビ代わりに使う方法</strong>です。
              </p>
              <p>
                本記事では<strong>まず結論（メリット・注意点の概要）をお伝え</strong>したうえで、iPadカーナビ化の具体的なメリット5つと注意点2つを実体験をもとに詳しく解説します。
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                中古iPadの選び方全般は「<a href="/ipad">中古iPad完全購入ガイド</a>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次 */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li>
                <a href="#conclusion" className="toc-item">
                  結論：メリット・注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#old-navi-demerit" className="toc-item">
                  古いカーナビのデメリット <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#merit" className="toc-item">
                  メリット5つ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#caution" className="toc-item">
                  注意点 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#recommend-model" className="toc-item">
                  おすすめモデル <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#summary" className="toc-item">
                  まとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* 記事本文 */}
        <div id="content" itemProp="articleBody">
          {/* h2: 結論 */}
          <section className="l-section l-section--bg-subtle" id="conclusion" aria-labelledby="heading-conclusion">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-conclusion">
                結論：iPadカーナビ化はメリットが大きい
              </h2>
              <p className="m-section-desc">
                iPadをカーナビ化して感じたメリットと注意点の概要です。
              </p>

              <div className="l-grid l-grid--2col l-grid--gap-lg" style={{ marginTop: 'var(--space-2xl)' }}>
                {/* メリットカード */}
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="popular-card-title">
                    <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-primary)' }}></i>
                    メリット5つ
                  </h3>
                  <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
                    <li><strong>マップの更新が不要</strong>（常に最新の地図）</li>
                    <li>渋滞情報の精度が高い</li>
                    <li>画面が大きくてみやすい</li>
                    <li>キーボード・音声で直感的に操作</li>
                    <li>音楽や動画の再生もしやすい</li>
                  </ul>
                </div>

                {/* 注意点カード */}
                <div className="m-card m-card--shadow m-card--padded">
                  <h3 className="popular-card-title">
                    <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" style={{ marginRight: 'var(--space-xs)', color: 'var(--color-warning, #e8a300)' }}></i>
                    注意点2つ
                  </h3>
                  <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-sm)' }}>
                    <li><strong>セルラーモデル（GPS搭載）が必須</strong></li>
                    <li>車載ホルダー選びは慎重に</li>
                  </ul>
                  <p className="popular-card-desc" style={{ marginTop: 'var(--space-sm)' }}>
                    Wi-FiモデルはGPS非搭載のためカーナビとしては使えません。
                  </p>
                </div>
              </div>

              <p className="m-section-desc" style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
                ここからはメリット・注意点それぞれの詳細を、実体験をもとに解説していきます。
              </p>
            </div>
          </section>

          {/* h2: 古いカーナビのデメリット */}
          <section className="l-section" id="old-navi-demerit" aria-labelledby="heading-old-navi-demerit">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-old-navi-demerit">
                古いカーナビを使い続けるデメリット
              </h2>
              <p className="m-section-desc">
                iPadカーナビ化のきっかけとなった、古い車載カーナビの問題点を紹介します。
              </p>

              <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-2xl)' }}>
                <p className="popular-card-desc">
                  10年以上前に購入した車載カーナビを使い続けていると、地理情報もかなり大きく変わっており下記のようなデメリットが発生していました。
                </p>
                <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc', marginTop: 'var(--space-md)' }}>
                  <li><strong>目的地を検索してもヒットしない</strong>場合、住所を手入力する必要がある</li>
                  <li>新しい道路を通ると<strong>地図にない道をひた走る状態</strong>になり、経路案内が狂う</li>
                  <li>目的地を入力する画面が使いづらい</li>
                </ul>
                <p className="popular-card-desc" style={{ marginTop: 'var(--space-md)' }}>
                  あまり気にせずにいましたが、改めて振り返ると古くなったカーナビを使い続けるデメリットは想像以上に大きいです。「常に最新のマップを見たい、でも更新には結構な費用がかかる…」という悩みを抱えている方は多いのではないでしょうか。
                </p>
              </div>
            </div>
          </section>

          {/* h2: メリット5つ */}
          <section className="l-section l-section--bg-subtle" id="merit" aria-labelledby="heading-merit">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-merit">
                iPadをカーナビ化して感じたメリット5つ
              </h2>
              <p className="m-section-desc">
                実際にiPad miniをカーナビ化して感じたメリットを5つ紹介します。
              </p>
              <MeritSection />
            </div>
          </section>

          {/* h2: 注意点 */}
          <section className="l-section" id="caution" aria-labelledby="heading-caution">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-caution">
                iPadをカーナビにする際の注意点
              </h2>
              <p className="m-section-desc">
                iPadカーナビ化で押さえておくべき注意点を2つ解説します。
              </p>
              <CautionSection />
            </div>
          </section>

          {/* h2: おすすめモデル */}
          <section className="l-section l-section--bg-subtle" id="recommend-model" aria-labelledby="heading-recommend-model">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend-model">
                iPadのカーナビ化におすすめのモデル
              </h2>
              <p className="m-section-desc">
                iPadは旧モデルでも十分な性能があるため、中古の型落ちモデルでもカーナビ用途には問題ありません。
              </p>

              <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-2xl)' }}>
                <p className="popular-card-desc">
                  特にiPadをカーナビ代わりに使いたいというニーズの方には、<strong>お手頃な中古iPadのセルラーモデルを購入するのがおすすめ</strong>です。必要な機能がはっきりしていれば1世代前の型落ち品でも十分活躍します。
                </p>
              </div>

              <div className="l-grid l-grid--2col l-grid--gap-lg guide-spec-links" style={{ marginTop: 'var(--space-xl)' }}>
                <a className="m-card m-card--shadow related-link-card" href="/ipad/ipad-spec-table/">
                  <span className="related-link-card__icon">
                    <i className="fa-solid fa-table-cells" aria-hidden="true"></i>
                  </span>
                  <h3 className="related-link-card__title">歴代iPadスペック比較表</h3>
                  <p className="related-link-card__desc">
                    歴代iPadのスペックや各世代の進化ポイントをまとめています。型落ちモデル選びの参考に。
                  </p>
                  <span className="related-link-card__arrow">
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
                <a className="m-card m-card--shadow related-link-card" href="/ipad/wifi-cellular/">
                  <span className="related-link-card__icon">
                    <i className="fa-solid fa-signal" aria-hidden="true"></i>
                  </span>
                  <h3 className="related-link-card__title">Wi-Fiモデルとセルラーモデルの違い</h3>
                  <p className="related-link-card__desc">
                    カーナビ化にはセルラーモデルが必須。両モデルの違いを詳しく解説しています。
                  </p>
                  <span className="related-link-card__arrow">
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </div>
          </section>

          {/* h2: まとめ */}
          <section className="l-section" id="summary" aria-labelledby="heading-summary">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-summary">
                まとめ：iPadは車載モニターとして最高のデバイス
              </h2>
              <p className="m-section-desc">
                iPadカーナビ化のメリット5つと注意点2つを実体験をもとに紹介しました。
              </p>

              <div className="lead-box" style={{ marginTop: 'var(--space-2xl)' }}>
                <p>
                  長年使っていたカーナビをiPadに代替してみた結果、<strong>「従来のカーナビは何だったのか？」と思うほど利便性に優れていた</strong>のが正直な感想です。
                </p>
                <p>
                  車載カーナビのすべての機能を代替できるわけではありませんが、多くの方がiPadのカーナビ化でより快適にドライブを楽しめるようになるはずです。
                </p>
                <p>
                  車載カーナビの地図が古くて更新しようか悩んでいるという方は、解決方法のひとつとしてiPadのカーナビ化をぜひ検討してみてください。
                </p>
                <p className="lead-link">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                  中古iPadの購入を検討中の方は「<a href="/ipad">中古iPad完全購入ガイド</a>」をご覧ください。
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
