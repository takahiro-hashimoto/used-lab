import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import FaqSection from '@/app/components/support/FaqSection'

const PAGE_TITLE = 'iPadはWi-Fiモデルとセルラーモデルどっちがおすすめ？両者の違い4つを比較'
const PAGE_DESCRIPTION =
  'iPadのWi-Fiモデルとセルラーモデルの違いを4つのポイントで徹底比較。価格差・通信方式・GPS・リセールバリューなど、どちらを選ぶべきか用途別におすすめモデルを解説します。'
const PAGE_URL = 'https://used-lab.com/ipad/wifi-cellular/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/ipad/wifi-cellular/',
    images: [{ url: '/images/ipad/ipad-air-6.jpg', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/ipad/ipad-air-6.jpg'],
  },
}

export default function WifiCellularPage() {
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
      { '@type': 'ListItem', position: 3, name: 'Wi-Fiモデルとセルラーモデルの比較' },
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
            { label: 'Wi-Fiモデルとセルラーモデルの比較' },
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
                iPadはWi-Fiモデルと<br className="sp-only" />セルラーモデルどっちがおすすめ？<br className="sp-only" />両者の違い4つを比較
              </h1>
              <p className="hero-description" itemProp="description">
                通信方式・背面デザイン・GPS・テザリングなど、4つの違いを徹底比較して用途別のおすすめを解説
              </p>
              <div className="hero-actions">
                <a href="#content" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-arrows-left-right" aria-hidden="true"></i>
                  <span>違いを比較する</span>
                </a>
                <a href="#recommendation" className="m-btn m-btn--hero-outline">
                  <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
                  <span>おすすめを確認</span>
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
                  src="/images/ipad/ipad-air-6.jpg"
                  alt="iPadのWi-FiモデルとセルラーモデルのイメージA"
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
                プライベートからビジネスまで幅広く使うことができるAppleのiPadシリーズ。いざ購入しようと思うと「Wi-Fiモデルとセルラーモデルどっちを買ったほうがいいの？」と疑問を感じる方も多いのではないでしょうか。
              </p>
              <p>
                そこで本記事では両者の主な違いを比較した上で、Wi-Fiモデルとセルラーモデルがそれぞれどんな方にオススメなのかを解説します！
              </p>
              <p className="lead-link">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                もっと全体像から知りたい方は「<a href="/ipad">中古iPad購入ガイド</a>」をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* 目次（仮置き） */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--2col toc-list">
              <li>
                <a href="#conclusion" className="toc-item">
                  結論：違いのまとめ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#differences" className="toc-item">
                  4つの違いを比較 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#recommendation" className="toc-item">
                  おすすめはどっち？ <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#recommend-sim" className="toc-item">
                  おすすめSIM <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#faq" className="toc-item">
                  よくある質問 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* 本文 */}
        <div id="content" itemProp="articleBody">

          {/* セクション: まとめ（結論） */}
          <section className="l-section l-section--bg-subtle" id="conclusion" aria-labelledby="heading-conclusion">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-conclusion">
                結論：iPad セルラーモデルとWi-Fiモデルの違い
              </h2>
              <p className="m-section-desc">
                両モデルの違いを一覧表でまとめました。
              </p>

              <div className="m-card m-card--shadow m-table-card">
                <div className="m-table-scroll">
                  <table className="m-table m-table--center">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Wi-Fiモデル</th>
                        <th>セルラーモデル</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>モバイル通信</th>
                        <td>×</td>
                        <td>○</td>
                      </tr>
                      <tr>
                        <th>GPS機能</th>
                        <td>×</td>
                        <td>○</td>
                      </tr>
                      <tr>
                        <th>テザリング機能</th>
                        <td>×</td>
                        <td>○</td>
                      </tr>
                      <tr>
                        <th>デザイン</th>
                        <td>シンプル</td>
                        <td>背面に白いラインあり</td>
                      </tr>
                      <tr>
                        <th>価格差</th>
                        <td>安い</td>
                        <td>約2万円高い</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* セクション: 違い詳細 */}
          <section className="l-section" id="differences" aria-labelledby="heading-differences">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-differences">
                iPad セルラーモデルとWi-Fiモデルの違い詳細
              </h2>
              <p className="m-section-desc">
                通信方式・背面デザイン・GPS・テザリングの各項目を詳しく解説します。
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

                {/* 1. データ通信方式 */}
                <div className="m-card m-card--shadow popular-card">
                  <figure className="popular-card-figure">
                    <img
                      src="/images/content/ipad-wifi-01.webp"
                      alt="データ通信方式の違いイメージ"
                      className="popular-card-img"
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </figure>
                  <div className="popular-card-body">
                    <h3 className="popular-card-title">データ通信方式</h3>
                    <p className="popular-card-desc">
                      Wi-Fiモデルとセルラーモデルの最大の違いはインターネットへの接続方法です。両者には下記のような違いがあります。
                    </p>
                    <p className="popular-card-desc">
                      セルラーモデルは4G LTEや5Gのモバイル回線に対応しているため、SIMカードやeSIMを設定すればWi-Fiがない場所でも単体で通信できます。通勤中の電車内やカフェなど、Wi-Fiスポットが見つからない環境でもすぐにインターネットを利用できるのが大きなメリットです。
                    </p>
                    <div className="m-card" style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                      <div>
                        <p style={{ fontWeight: 700 }}>Cellularモデル</p>
                        <p className="popular-card-desc">通信キャリアと契約してSIMカードを挿すことで、どこでもモバイルデータ通信が可能。eSIMにも対応しており、オンラインで簡単に開通できる</p>
                      </div>
                      <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                      <div>
                        <p style={{ fontWeight: 700 }}>Wi-Fiモデル</p>
                        <p className="popular-card-desc">Wi-Fi環境があるところでしかインターネットに接続することができない。ただしiPhoneのテザリング機能を活用すれば外出先でも利用可能</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 背面デザイン */}
                <div className="m-card m-card--shadow popular-card">
                  <figure className="popular-card-figure">
                    <img
                      src="/images/content/ipad-wifi-02.webp"
                      alt="背面デザインの違いイメージ"
                      className="popular-card-img"
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </figure>
                  <div className="popular-card-body">
                    <h3 className="popular-card-title">背面デザイン</h3>
                    <p className="popular-card-desc">
                      データ通信方式の違いにより、両者のデバイスには見た目にも差が出ています。背面のデザインでどちらの通信方式の端末かを簡単に見分けることが可能です。
                    </p>
                    <p className="popular-card-desc">
                      中古iPadを購入する際にも、この白いアンテナラインの有無を確認すれば、Wi-Fiモデルかセルラーモデルかをすぐに判別できます。フリマアプリで購入するときには写真でチェックしておきましょう。
                    </p>
                    <div className="m-card" style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                      <div>
                        <p style={{ fontWeight: 700 }}>Cellularモデル</p>
                        <p className="popular-card-desc">モバイルデータ通信のアンテナが背面上部に設置されており、白いラインがある</p>
                      </div>
                      <hr style={{ border: 'none', borderTop: '1px dashed var(--color-border-light)' }} />
                      <div>
                        <p style={{ fontWeight: 700 }}>Wi-Fiモデル</p>
                        <p className="popular-card-desc">アンテナが入っておらずすっきりとしたデザインになっている</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. GPS機能搭載 */}
                <div className="m-card m-card--shadow popular-card">
                  <figure className="popular-card-figure">
                    <img
                      src="/images/content/ipad-wifi-03.webp"
                      alt="GPS機能の違いイメージ"
                      className="popular-card-img"
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </figure>
                  <div className="popular-card-body">
                    <h3 className="popular-card-title">GPS機能搭載</h3>
                    <p className="popular-card-desc">
                      正確な位置情報を特定するGPS機能はセルラーモデルのみに搭載されています。iPadをカーナビ代わりに使いたい方や、登山・サイクリングなどでルート記録を残したい方にとっては欠かせない機能です。
                    </p>
                    <p className="popular-card-desc">
                      GPS機能があると下記のようなアプリをiPadから利用することが可能です。
                    </p>
                    <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.8, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                      <li>Googleマップ、Yahoo!カーナビなどマップ情報を活用したアプリ</li>
                      <li>ポケモンGO、ドラクエウォークなど位置情報を活用したアプリ</li>
                      <li>Strava、YAMAPなどアウトドア系のルート記録アプリ</li>
                    </ul>
                    <p className="popular-card-desc">
                      ちなみにWi-FiモデルのiPadでもネット接続をすれば位置情報を取得することは可能です。ただし、Wi-Fiの電波強度を元に位置を推定する仕組みのため、GPS機能を搭載したセルラーモデルと比較すると精度がやや劣ります。特に屋外や移動中はズレが大きくなるので注意が必要です。
                    </p>
                  </div>
                </div>

                {/* 4. テザリング機能の有無 */}
                <div className="m-card m-card--shadow popular-card">
                  <figure className="popular-card-figure">
                    <img
                      src="/images/content/ipad-wifi-04.webp"
                      alt="テザリング機能の違いイメージ"
                      className="popular-card-img"
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </figure>
                  <div className="popular-card-body">
                    <h3 className="popular-card-title">テザリング機能の有無</h3>
                    <p className="popular-card-desc">
                      iPadをWi-Fiの親機として利用するテザリング機能はセルラーモデルのみに搭載されています。
                    </p>
                    <p className="popular-card-desc">
                      iPadはiPhoneに比べるとバッテリー容量が大きいため、外出先で長時間インターネット接続する事が可能です。出先でノートパソコンを使用する機会が多い方には重宝する機能かもしれません。
                    </p>
                    <p className="popular-card-desc">
                      なお、テザリングを利用するにはセルラーモデルで通信キャリアの回線契約が必要です。格安SIMのデータ専用プランでもテザリングに対応しているものが多いので、コストを抑えながら活用することも十分可能です。
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* セクション: それぞれどんな人におすすめ？ */}
          <section className="l-section l-section--bg-subtle" id="recommendation" aria-labelledby="heading-recommendation">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommendation">
                それぞれどんな人におすすめ？
              </h2>
              <p className="m-section-desc">
                用途や予算に合わせて、あなたに合うモデルを診断しましょう。
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

                {/* Wi-Fiモデルがおすすめの人 */}
                <div className="m-card m-card--shadow popular-card">
                  <figure className="popular-card-figure">
                    <img
                      src="/images/content/wifi-image.webp"
                      alt="iPad Wi-Fiモデルの使用イメージ"
                      className="popular-card-img"
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </figure>
                  <div className="popular-card-body">
                    <h3 className="popular-card-title">Wi-Fiモデルがおすすめの人</h3>
                    <p className="popular-card-desc">
                      Wi-FiモデルのiPadは機能が限られている分、安価な価格で購入できるのが魅力の端末。
                    </p>
                    <p className="popular-card-desc">
                      ネット接続できるのはWi-Fi環境下のみというデメリットはiPhoneのテザリング機能で補うことも可能なので、ライトユーザーの方ならWi-Fiモデルを選んでおけば問題ないと思います。
                    </p>
                    <p className="popular-card-desc">
                      また、iPadの<strong>ワイファイモデルとセルラーモデルの価格差は約2万円ほどある</strong>ので、浮いたお金をMagic Keyboardや保護フィルムなどの周辺機器・アクセサリー購入費用に当てれば充実したデジタルライフのスタートを切れるはず。
                    </p>
                    <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                      <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>こんな方におすすめ</p>
                      <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                        <li>使用シーンはほぼ自宅やオフィスに限定される</li>
                        <li>外でiPadを使用する際はスマホのテザリングで十分</li>
                        <li>なるべく安くiPadを購入したい</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* セルラーモデルがおすすめの人 */}
                <div className="m-card m-card--shadow popular-card">
                  <figure className="popular-card-figure">
                    <img
                      src="/images/content/cellular-image.webp"
                      alt="iPad セルラーモデルの使用イメージ"
                      className="popular-card-img"
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </figure>
                  <div className="popular-card-body">
                    <h3 className="popular-card-title">セルラーモデルがおすすめの人</h3>
                    <p className="popular-card-desc">
                      セルラーモデルiPadは端末代金が高いのに加え、毎月の通信料が発生するのがデメリット。
                    </p>
                    <p className="popular-card-desc">
                      しかし、その分幅広いシーンで活躍してくれるため、外出してiPadを使い倒したいという方におすすめです。
                    </p>
                    <p className="popular-card-desc">
                      特に<strong>iPadをカーナビ代わりに使用したい</strong>場合はGPS機能を搭載して位置情報を正確につかめるセルラーモデルが必須になります。
                    </p>
                    <div className="m-card" style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-sm)' }}>
                      <p style={{ fontWeight: 700, marginBottom: 'var(--space-sm)' }}>こんな方におすすめ</p>
                      <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 2, paddingLeft: 'var(--space-lg)', listStyle: 'disc' }}>
                        <li>外出して使用する頻度が多い方（ビジネス用途）</li>
                        <li>iPadをカーナビとして使いたい</li>
                        <li>位置情報を使用するアプリをiPadで楽しみたい</li>
                        <li>積極的にテザリングの親機として使用したい方</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* セクション: おすすめSIM */}
          <section className="l-section" id="recommend-sim" aria-labelledby="heading-recommend-sim">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg" id="heading-recommend-sim">
                iPadセルラーモデル用のおすすめSIM
              </h2>
              <p className="m-section-desc">
                セルラーモデルのiPadと相性が良い、おすすめの格安SIM・通信キャリアを紹介します。
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>

                {/* 1. 楽天モバイル */}
                <div className="m-card m-card--shadow popular-card">
                  <figure className="popular-card-figure">
                    <img
                      src="https://hbb.afl.rakuten.co.jp/hsb/4ebf9dc9.4dc93727.1d6c2ffe.7ec2aeb6/?me_id=2101065&me_adv_id=2377896&t=pict"
                      alt="楽天モバイルのイメージ"
                      className="popular-card-img"
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </figure>
                  <div className="popular-card-body">
                    <p className="popular-card-subtitle">柔軟な料金体系が魅力</p>
                    <h3 className="popular-card-title">楽天モバイル</h3>
                    <p className="popular-card-desc">
                      iPadのセルラーモデルのSIMをコスパ重視で選びたい方におすすめなのが楽天モバイルです。
                    </p>
                    <p className="popular-card-desc">
                      楽天モバイルの特徴は、使った分だけ支払う段階制の料金プラン「Rakuten最強プラン」。月3GBまでなら月額1,078円（税込）、たっぷり使っても<strong>20GB超〜無制限で月額3,278円（税込）</strong>と非常にわかりやすく、iPadの利用頻度に応じて無駄なく通信コストを抑えられます。
                    </p>
                    <p className="popular-card-desc">
                      さらに、楽天ポイントプログラム（SPU）も＋1倍になるため、楽天市場などの利用が多い方にはうれしいメリットも。
                    </p>
                    <p className="popular-card-desc">
                      ただし、都市部以外ではパートナー回線に接続されるケースもあるため、お住まいや活動エリアが楽天回線エリア内か事前に確認しておくのがおすすめです。
                    </p>
                    <p className="popular-card-desc">
                      とにかく「通信費を抑えたい」「月によって使う量が違う」という方には、柔軟性の高い楽天モバイルはiPadのセルラーモデル運用に非常に相性のよい選択肢といえます。
                    </p>
                    <div>
                      <a href="https://hb.afl.rakuten.co.jp/hsc/4ebf9dc9.4dc93727.1d6c2ffe.7ec2aeb6/?link_type=pict&rafst=rmn&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MjM3Nzg5NiwiYW1wIjpmYWxzZX0%3D" className="m-btn m-btn--primary" target="_blank" rel="nofollow sponsored noopener">
                        楽天モバイルをチェック <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. ahamo */}
                <div className="m-card m-card--shadow popular-card">
                  <figure className="popular-card-figure">
                    <img
                      src="https://www28.a8.net/svt/bgt?aid=211010658886&wid=001&eno=01&mid=s00000022488001006000&mc=1"
                      alt="ahamoのイメージ"
                      className="popular-card-img"
                      width={300}
                      height={250}
                      loading="lazy"
                    />
                  </figure>
                  <div className="popular-card-body">
                    <p className="popular-card-subtitle">大容量データを安心して使いたい方向け</p>
                    <h3 className="popular-card-title">ahamo</h3>
                    <p className="popular-card-desc">
                      iPadのセルラーモデルをたっぷり使いたい方におすすめなのが、NTTドコモが提供するオンライン専用プラン「ahamo（アハモ）」です。
                    </p>
                    <p className="popular-card-desc">
                      月額2,970円（税込）で20GBまで使える基本プランに加え、＋1,980円で「大盛りオプション」も追加可能。<strong>最大100GBまで使える</strong>ため、動画視聴やクラウド利用が多いiPadユーザーにも安心の大容量プランです。
                    </p>
                    <p className="popular-card-desc">
                      また、ドコモの高品質な4G／5G回線が全国で利用でき、エリアの広さと安定性も魅力。店舗サポートはありませんが、オンラインで完結できる方にはぴったりの通信サービスです。
                    </p>
                    <div>
                      <a href="https://px.a8.net/svt/ejp?a8mat=3HMOV6+ENI2R6+4TIO+5ZMCH" className="m-btn m-btn--primary" target="_blank" rel="nofollow sponsored noopener">
                        ahamoをチェック <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* セクション: FAQ */}
          <FaqSection
            title="iPad Wi-Fiモデルとセルラーモデルのよくある質問"
            description="Wi-Fiモデルとセルラーモデルに関するよくある疑問にお答えします。"
            items={[
              {
                question: 'iPadのWi-Fiモデルとセルラーモデルの違いはなんですか？',
                answer: 'iPadのWi-Fiモデルは、自宅やカフェなどのWi-Fi環境がある場所でのみインターネット接続が可能です。一方、セルラーモデルはSIMカードを挿入することで、4Gや5Gのモバイル回線を利用して場所を問わず通信ができます。外出先での利用が多い方は、通信の自由度が高いセルラーモデルが便利です。',
              },
              {
                question: 'アイパッドを買うならWi-Fiモデルとセルラーモデルどちらがおすすめですか？',
                answer: '外出先でも頻繁にiPadを使いたい場合はセルラーモデルがおすすめです。どこでも通信できるため、移動中や出張先でもスムーズに使えます。一方、自宅や職場などWi-Fi環境が中心の方はWi-Fiモデルでも十分。スマホのテザリング機能を活用すれば、一時的な外出先でもネット接続が可能です。',
              },
              {
                question: 'Wi-Fiモデルとセルラーモデルは見た目で見分けられますか？',
                answer: 'はい、見分け方は簡単です。セルラーモデルのiPadは本体背面の上部に白いアンテナラインが入っており、Wi-Fiモデルにはありません。また、設定画面に「モバイルデータ通信」の項目があるのもセルラーモデルの特徴です。',
              },
              {
                question: 'セルラーモデルのiPadにおすすめの通信キャリアは？',
                answer: 'データ使用量に応じて料金が変動する楽天モバイルがおすすめです。月3GBまでなら月額1,078円（税込）、たくさん使っても20GB超は月額3,278円（税込）で上限固定。iPadの利用頻度が月によって異なる方にはコスパ抜群の選択肢です。ただし、対応エリアを事前に確認しましょう。',
              },
              {
                question: 'iPadのセルラーモデルを使う際にeSIMは使えますか？',
                answer: 'はい、近年のiPadは物理SIMだけでなくeSIMにも対応しており、通信契約をオンラインで簡単に切り替えることができます。短期旅行やサブ回線にも便利です。',
              },
              {
                question: 'iPadのセルラーモデルはGPS機能に違いがありますか？',
                answer: 'はい、セルラーモデルにはGPSが内蔵されていますが、Wi-Fiモデルには搭載されていません。マップアプリでのナビゲーションや位置情報サービスを多用するなら、セルラーモデルが適しています。',
              },
            ]}
          />

        </div>

        {/* シェアボックス */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
