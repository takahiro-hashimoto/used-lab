import type { Metadata } from 'next'
import { getMvnoPlans, getMvnoProviders } from '@/lib/queries'
import type { MvnoProvider } from '@/lib/types'
import {
  MVNO_PAGE_DATE_LABEL,
  MVNO_PROVIDERS,
  getProviderMeta,
} from '@/lib/data/iphone-mvno'
import Breadcrumb from '@/app/components/Breadcrumb'
import ShareBox from '@/app/components/ShareBox'
import MvnoDiagnosis from './components/MvnoDiagnosis'
import type { DiagnosisProvider } from './components/MvnoDiagnosis'

const PAGE_TITLE = `中古iPhoneの購入と通信契約がセットでできる格安SIM業者まとめ【${MVNO_PAGE_DATE_LABEL}】`
const PAGE_DESCRIPTION = `中古iPhoneとセットで通信契約できる格安SIM・MVNOを徹底比較。楽天モバイル、UQモバイル、ワイモバイル、IIJmio、mineoなど主要7社の料金プランと端末販売の有無をまとめました【${MVNO_PAGE_DATE_LABEL}】`
const PAGE_URL = 'https://used-lab.com/iphone/mvno/'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/iphone/mvno/',
    images: [{ url: '/images/content/sim.webp', width: 360, height: 360, alt: PAGE_TITLE }],
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    images: ['/images/content/sim.webp'],
  },
}

/** network_carriers を短縮表記に変換 */
function formatNetwork(carriers: string | null): string {
  if (!carriers) return '—'
  const map: Record<string, string> = {
    rakuten: '楽天',
    docomo: 'ドコモ',
    au: 'au',
    softbank: 'SB',
  }
  return carriers.split(',').map((c) => map[c.trim()] ?? c.trim()).join('/')
}

/** available_iphones を省略表記に変換 */
function formatIPhones(models: string | null): string {
  if (!models) return '—'
  const arr = models.split(',').map((m) => m.trim())
  if (arr.length <= 3) return arr.join('、')
  return `${arr.slice(0, 3).join('、')} など`
}

/** sim_types をカンマ→読点に変換 */
function formatSimTypes(types: string | null): string {
  if (!types) return '—'
  return types.split(',').map((t) => t.trim()).join('、')
}

export default async function MvnoPage() {
  const [plans, mvnoProviders] = await Promise.all([
    getMvnoPlans(),
    getMvnoProviders(),
  ])

  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const dateDisplay = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // 診断コンポーネント用データ
  const diagnosisProviders: DiagnosisProvider[] = mvnoProviders
    .filter((db) => db.provider_slug !== 'geo-mobile')
    .map((db) => {
      const providerPlans = plans.filter((p) => p.provider_slug === db.provider_slug)
      const prices = providerPlans.map((p) => p.discounted_price ?? p.monthly_price)
      const minPrice = prices.length > 0 ? Math.min(...prices) : null
      const maxPrice = prices.length > 0 ? Math.max(...prices) : null
      const priceRange =
        minPrice !== null
          ? `${minPrice.toLocaleString()}円〜${minPrice !== maxPrice ? maxPrice!.toLocaleString() + '円' : ''}`
          : '—'
      return {
        slug: db.provider_slug,
        name: db.provider_name,
        carriers: db.network_carriers,
        iphones: db.available_iphones,
        battery: db.battery_guarantee_percent,
        warranty: db.warranty_days,
        store: db.store_support,
        discount: db.set_discount_available,
        url: db.official_url,
        minPrice,
        priceRange,
      }
    })

  // DB 事業者に静的メタデータを合成（ゲオモバイルは非表示）
  const providerCards = mvnoProviders
    .filter((db) => db.provider_slug !== 'geo-mobile')
    .map((db) => ({
      db,
      meta: getProviderMeta(db.provider_slug),
      plans: plans.filter((p) => p.provider_slug === db.provider_slug),
    }))


  // JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '中古iPhone完全ガイド', item: 'https://used-lab.com/iphone/' },
      { '@type': 'ListItem', position: 3, name: '格安SIM×中古iPhone' },
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

        {/* パンくず */}
        <Breadcrumb
          items={[
            { label: '中古iPhone完全ガイド', href: '/iphone' },
            { label: '格安SIM×中古iPhone' },
          ]}
        />

        {/* ===== Hero ===== */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <h1 className="hero-title" itemProp="headline">
                中古iPhoneの購入と通信契約が<br />セットでできる格安SIM業者まとめ
              </h1>
              <p className="hero-description" itemProp="description">
                端末購入と回線契約をまとめてお得に。主要{MVNO_PROVIDERS.length}社の料金プラン・端末販売を徹底比較【{MVNO_PAGE_DATE_LABEL}】
              </p>
              <div className="hero-actions">
                <a href="#providers" className="m-btn m-btn--hero-primary">
                  <i className="fa-solid fa-sim-card" aria-hidden="true"></i>
                  <span>格安SIM業者を比較する</span>
                </a>
                <a href="#faq" className="m-btn m-btn--hero-outline">
                  <i className="fa-solid fa-circle-question" aria-hidden="true"></i>
                  <span>よくある質問</span>
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
                  src="/images/content/sim.webp"
                  alt="SIMカードをスマートフォンに挿入するイメージ"
                  className="hero-media__img"
                  width={360}
                  height={360}
                />
              </figure>
            </div>
          </div>
        </header>

        {/* ===== リード文 ===== */}
        <section className="l-section l-section--sm section-lead" aria-label="記事の導入">
          <div className="l-container">
            <div className="lead-box">
              <p>中古iPhoneを安く手に入れたいなら、<strong>端末購入と通信契約をセットでできる格安SIM業者</strong>を活用するのがおすすめです。</p>
              <p>
                楽天モバイルやUQモバイルなどでは認定中古品iPhoneを販売しており、回線契約と同時に購入すると端末割引が適用されるケースもあります。
                また、IIJmioやmineoなどのMVNOも中古iPhoneの取り扱いを行っています。
              </p>
              <p>
                このページでは、<strong>中古iPhoneの端末販売がある格安SIM業者{mvnoProviders.length}社</strong>の料金プランと端末販売の特徴を比較しています。
                それぞれの強みや注意点を把握して、あなたに最適な組み合わせを見つけてください。
              </p>
              <p className="lead-link"><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> 情報を網羅的に得たい方は「<a href="/airpods">中古AirPods購入完全ガイド</a>」も参考にしてみてください！</p>
            </div>
          </div>
        </section>

        {/* ===== 目次 ===== */}
        <nav className="l-section l-section--no-pt" aria-label="目次">
          <div className="l-container">
            <p className="m-section-heading m-section-heading--md">タップできる目次</p>
            <ol className="l-grid l-grid--3col toc-list">
              <li>
                <a href="#pitfall" className="toc-item">
                  単体購入の落とし穴 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#set-contract" className="toc-item">
                  セット契約とは <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#check" className="toc-item">
                  格安SIM診断 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#comparison" className="toc-item">
                  格安SIM業者 比較表 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#providers" className="toc-item">
                  格安SIM業者 詳細 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#separate" className="toc-item">
                  端末を別で買うべきケース <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
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

        {/* ===== 中古スマホ+格安SIM セクション ===== */}
        <section id="pitfall" className="l-section l-section--bg-subtle">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg">
              中古スマホ+格安SIMで、賢く機種変更
            </h2>
            <p className="m-section-desc">
              大手キャリアで新品を買う時代は終わり。中古+格安SIMなら初期費用も月額もグッと抑えられます。
            </p>

            <div className="m-card m-card--shadow m-card--padded">
              <h3 className="post-check-item__heading">
                中古スマホ単体購入の「落とし穴」
              </h3>
              <div className="caution-check-card__text">
                <p>中古スマホを専門店やフリマで購入した場合、通信契約の前に以下の確認が必要になります。SIMに詳しくない人ほど、ここでつまずきがちです。</p>
                <ul>
                  <li><strong>回線との相性確認：</strong>買った端末がドコモ/au/ソフトバンクのどの回線に対応しているか</li>
                  <li><strong>SIMロック解除：</strong>ロックがかかっていたら自分で解除手続きが必要</li>
                  <li><strong>対応バンドの確認：</strong>周波数帯が合わないと電波が入りにくい</li>
                  <li><strong>APN設定：</strong>SIMカードが届いたら自分で初期設定が必要</li>
                </ul>
              </div>
              <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-lg)' }}>
                <span className="m-callout__label">注意</span>
                <p className="m-callout__text">
                  これらを怠ると「SIMを挿したのに圏外」「データ通信ができない」といったトラブルに…
                </p>
              </div>
            </div>

            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="post-check-item__heading">
                セット契約なら、全部おまかせでOK
              </h3>
              <div className="caution-check-card__text">
                <p>セット契約で提供される中古端末は、事業者側で以下の確認・設定がすべて完了しています。</p>
                <ul>
                  <li><strong>動作確認済み：</strong>その回線で使えることが保証されている</li>
                  <li><strong>SIMロック解除済み：</strong>自分で手続きする必要なし</li>
                  <li><strong>SIM挿入済み or APN設定済み：</strong>届いたらすぐ使える</li>
                  <li><strong>バッテリー80%以上保証（認定中古品）：</strong>劣化の心配が少ない</li>
                </ul>
              </div>
              <div className="recommend-card__fit-box recommend-card__fit-box--good" style={{ marginTop: 'var(--space-lg)' }}>
                <p style={{ margin: 0 }}>
                  <strong>つまり、SIMの知識がなくても「届いたらすぐ使える」状態で届きます。</strong>
                </p>
              </div>
            </div>

            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="post-check-item__heading">
                大手キャリアからの乗り換えで、こんなにお得
              </h3>
              <div className="caution-check-card__text">
                <p>今、大手キャリアで新品iPhoneを使っている方。セット契約で中古iPhone+格安SIMに乗り換えると、<strong>初期費用も月額もグッと抑えられます。</strong></p>
              </div>
              <div className="l-grid l-grid--2col l-grid--gap-lg" style={{ marginTop: 'var(--space-lg)' }}>
                <div className="recommend-card__fit-box recommend-card__fit-box--bad" style={{ textAlign: 'center' }}>
                  <p className="text-sm text-muted" style={{ margin: '0 0 var(--space-xs)' }}>大手キャリア＋新品</p>
                  <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: '0 0 var(--space-xs)' }}>月額 8,000円〜</p>
                  <p className="text-sm text-muted" style={{ margin: 0 }}>＋端末代 10万円以上</p>
                </div>
                <div className="recommend-card__fit-box recommend-card__fit-box--good" style={{ textAlign: 'center' }}>
                  <p className="text-sm text-muted" style={{ margin: '0 0 var(--space-xs)' }}>格安SIM＋中古</p>
                  <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: '0 0 var(--space-xs)' }}>月額 1,000円〜</p>
                  <p className="text-sm text-muted" style={{ margin: 0 }}>＋端末代 3〜5万円程度</p>
                </div>
              </div>
              <div className="caution-check-card__text" style={{ marginTop: 'var(--space-lg)' }}>
                <p><strong>2年間で10万円以上の差</strong>がつくことも珍しくありません。浮いたお金で旅行に行くもよし、貯金するもよし。賢く機種変更しましょう。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== セット契約とは セクション ===== */}
        <section id="set-contract" className="l-section">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg">
              中古スマホとSIMをセットで契約できる格安SIM業者とは
            </h2>
            <p className="m-section-desc">
              まずは「セット契約」の定義を明確にしておきましょう。
            </p>

            <div className="m-card m-card--shadow m-card--padded">
              <h3 className="post-check-item__heading">
                「セット契約」の定義
              </h3>
              <div className="caution-check-card__text">
                <p>
                  この記事でいうセット契約とは、<strong>格安SIM業者の公式サイトやサービス上で、中古スマホ（またはリユース端末）と通信回線を同時に申し込める形態</strong>を指します。
                </p>
                <p>具体的には以下のような特徴があります。</p>
                <ul>
                  <li>端末と回線を一度の手続きで申し込める</li>
                  <li>届いた時点でSIMが挿入済み、または初期設定が済んでいる場合が多い</li>
                  <li>端末の動作確認や回線との相性チェックが事業者側で行われている</li>
                </ul>
              </div>
            </div>

            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="post-check-item__heading">
                キャリアショップとの違い
              </h3>
              <div className="caution-check-card__text">
                <p>
                  大手キャリア（ドコモ・au・ソフトバンク）のショップでも端末と回線のセット契約はできますよね。ただし、そこで扱われるのは基本的に<strong>新品端末</strong>であり、中古端末を選べるケースは限られています。
                </p>
                <p>
                  一方、格安SIM業者の中には、自社で認定した中古端末や未使用品を回線とセットで提供しているところがあります。大手キャリアの認定中古品プログラム（au Certified、ソフトバンク認定中古品など）を活用しているケースも多いです。
                </p>
              </div>
            </div>

            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="post-check-item__heading">
                正直に言うと、最安とは限らない
              </h3>
              <div className="caution-check-card__text">
                <p>
                  ここは正直に書いておきますね。<strong>セット契約が常に最安になるわけではありません。</strong>
                </p>
                <p>
                  中古スマホ専門店で端末だけを買い、別途格安SIMを契約したほうが総額では安くなるケースもあります。
                </p>
                <p>
                  <strong>セット契約は「手間を減らす」ことに価値があるのであって、「最も安く買う方法」とは別の話です。</strong>価格を最優先にするなら、端末と回線を分けて検討したほうがいい場合もあります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 格安SIM診断 セクション ===== */}
        <section id="check" className="l-section l-section--bg-subtle">
          <div className="l-container">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: '格安SIM診断 – あなたにピッタリの格安SIM業者を診断',
                description: '7つの質問に答えるだけで、中古iPhoneとセット契約できるおすすめの格安SIM業者がわかる無料診断ツールです。',
                url: `${PAGE_URL}#check`,
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All',
                browserRequirements: 'Requires JavaScript',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'JPY',
                },
                featureList: 'iPhone機種・回線・MNP・データ通信量・店舗サポート・バッテリー保証・保証期間の7項目で診断',
                creator: {
                  '@type': 'Organization',
                  name: 'ユーズドラボ',
                  url: 'https://used-lab.com/',
                },
              }) }}
            />

            <h2 className="m-section-heading m-section-heading--lg" id="heading-check">
              あなたにピッタリの格安SIM診断
            </h2>
            <p className="m-section-desc">
              7つの質問に答えるだけで、あなたに合った格安SIM業者がわかります。
            </p>

            <div className="m-card m-card--shadow m-card--padded">
              <MvnoDiagnosis providers={diagnosisProviders} />
            </div>
          </div>
        </section>

        {/* ===== 格安SIM業者 比較表 セクション ===== */}
        {mvnoProviders.length > 0 && (
        <section id="comparison" className="l-section">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg">
              格安SIM業者{mvnoProviders.length}社 比較表
            </h2>
            <p className="m-section-desc">
              中古スマホとセット契約できる{mvnoProviders.length}社を一覧で比較。気になる事業者をクリックすると詳細へジャンプできます。
            </p>

            <div className="m-card m-card--shadow m-table-card">
              <div className="m-table-scroll">
                <table className="m-table m-table--center" style={{ whiteSpace: 'nowrap' }}>
                  <thead>
                    <tr>
                      <th>項目</th>
                      {mvnoProviders.map((p) => (
                        <th key={p.provider_slug}>{p.provider_name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>ロゴ</strong></td>
                      {mvnoProviders.map((p) => (
                        <td key={p.provider_slug}>
                          <img
                            src={`/images/mvno/${p.provider_slug}.jpg`}
                            alt={`${p.provider_name}のロゴ`}
                            width={120}
                            height={40}
                            style={{ objectFit: 'contain' }}
                          />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td><strong>月額料金</strong></td>
                      {mvnoProviders.map((p) => (
                        <td key={p.provider_slug}>
                          <strong className="text-negative">
                            {p.min_monthly_fee != null ? `${p.min_monthly_fee.toLocaleString()}円〜` : '—'}
                          </strong>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td><strong>回線</strong></td>
                      {mvnoProviders.map((p) => (
                        <td key={p.provider_slug}>{formatNetwork(p.network_carriers)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td><strong>バッテリー保証</strong></td>
                      {mvnoProviders.map((p) => (
                        <td key={p.provider_slug}>
                          {p.battery_guarantee_percent
                            ? <strong className="text-negative">{p.battery_guarantee_percent}%以上</strong>
                            : 'なし'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td><strong>保証期間</strong></td>
                      {mvnoProviders.map((p) => (
                        <td key={p.provider_slug}>
                          {p.warranty_days != null
                            ? <strong className="text-negative">{p.warranty_days}日</strong>
                            : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td><strong>店舗サポート</strong></td>
                      {mvnoProviders.map((p) => (
                        <td key={p.provider_slug}>
                          {p.store_support
                            ? <span className="text-negative">○ あり</span>
                            : '× なし'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td><strong>詳細を見る</strong></td>
                      {mvnoProviders.map((p) => (
                        <td key={p.provider_slug}>
                          <a href={`#${p.provider_slug}`} className="m-btn m-btn--primary m-btn--sm">
                            詳細へ
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* ===== 格安SIM業者 詳細セクション ===== */}
        <section id="providers" className="l-section l-section--bg-subtle">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg">
              中古スマホセット対応の格安SIM業者詳細
            </h2>
            <p className="m-section-desc">
              中古iPhone・中古スマホと通信回線をセットで契約できる事業者をまとめました。<br />
              情報は2026年2月時点の調査に基づいています。
            </p>

            {providerCards.map(({ db, meta, plans: providerPlans }) => (
              <div key={db.provider_slug} className="m-card m-card--shadow recommend-card" id={db.provider_slug}>
                {/* Header */}
                <div className="recommend-card__header">
                  <h3>{db.provider_name}</h3>
                </div>

                {/* Overview: ロゴ + スペック表 */}
                <div className="recommend-card__overview">
                  <figure className="recommend-card__image">
                    <img
                      src={`/images/mvno/${db.provider_slug}-thumb.jpg`}
                      alt={`${db.provider_name}のロゴ`}
                      width={280}
                      height={100}
                      style={{ objectFit: 'contain' }}
                    />
                  </figure>
                  <div className="recommend-card__info">
                    <table className="recommend-card__specs-table">
                      <tbody>
                        <tr>
                          <th>認定プログラム</th>
                          <td>{db.certified_program_name || '—'}</td>
                        </tr>
                        <tr>
                          <th>回線</th>
                          <td>{meta?.network || formatNetwork(db.network_carriers)}</td>
                        </tr>
                        <tr>
                          <th>バッテリー保証</th>
                          <td>{db.battery_guarantee_percent ? `最大容量${db.battery_guarantee_percent}%以上` : 'なし'}</td>
                        </tr>
                        <tr>
                          <th>取扱機種</th>
                          <td>{formatIPhones(db.available_iphones)}</td>
                        </tr>
                        <tr>
                          <th>SIM種別</th>
                          <td>{formatSimTypes(db.sim_types)}</td>
                        </tr>
                        <tr>
                          <th>保証期間</th>
                          <td>{db.warranty_days ? `${db.warranty_days}日間` : '—'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Body */}
                <div className="recommend-card__body">
                  <h4 className="recommend-card__subtitle">
                    {meta?.subtitle || `${db.provider_name}の特徴`}
                  </h4>
                  <p>
                    <strong>{db.provider_name}</strong>では、
                    {db.certified_program_name
                      ? <>「{db.certified_program_name}」として認定された中古iPhoneを取り扱っています。</>
                      : <>中古iPhoneを取り扱っています。</>}
                    {db.used_device_note}
                  </p>
                  <p>
                    回線は<strong>{meta?.network || formatNetwork(db.network_carriers)}</strong>を使用しており、安定した通信が可能です。
                    {db.battery_guarantee_percent != null && (
                      <>バッテリー<strong>最大容量{db.battery_guarantee_percent}%以上</strong>が保証されているので、届いてすぐ快適に使えます。</>
                    )}
                    {db.warranty_days != null && db.warranty_days > 0 && (
                      <><strong>{db.warranty_days}日間の保証</strong>付きで、万が一の初期不良にもしっかり対応してもらえます。</>
                    )}
                  </p>
                  <p>
                    {db.store_support
                      ? <>全国の店舗で<strong>対面サポート</strong>を受けられるので、スマホの設定に不安がある方やシニアの方でも安心して乗り換えられます。</>
                      : <>オンライン完結型なので、自宅から手軽に申し込みができます。</>}
                    {db.set_discount_available && (
                      <>MNP乗り換えの場合は<strong>端末割引</strong>が適用されることがあり、さらにお得に購入できます。</>
                    )}
                  </p>
                </div>

                {/* 料金プラン */}
                {providerPlans.length > 0 && (
                  <div className="recommend-card__price">
                    <p className="recommend-card__price-title">
                      料金プラン（税込）
                      <span className="recommend-card__price-note-inline">※1人・音声+データ</span>
                    </p>
                    <div className="recommend-card__price-grid">
                      {providerPlans.map((plan) => (
                        <div key={plan.id} className="recommend-card__price-card">
                          <div className="recommend-card__price-card-header">
                            <span className="recommend-card__price-card-name">{plan.plan_name}</span>
                          </div>
                          <div className="recommend-card__price-card-body">
                            <span className="recommend-card__price-card-capacity">
                              {plan.is_unlimited
                                ? <em>無制限</em>
                                : <>{plan.data_capacity_gb}<small>GB</small></>}
                            </span>
                            <span className="recommend-card__price-card-amount">
                              {plan.monthly_price.toLocaleString()}<small>円/月</small>
                            </span>
                          </div>
                          {plan.call_included && (
                            <p className="recommend-card__price-card-note">{plan.call_included}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* こんな人におすすめ / 向かない */}
                {meta && (
                  <div className="recommend-card__fit">
                    <div className="l-grid l-grid--2col l-grid--gap-lg">
                      <div className="recommend-card__fit-box recommend-card__fit-box--good">
                        <h4><i className="fa-solid fa-circle-check" aria-hidden="true"></i> こんな人におすすめ</h4>
                        <ul>
                          {meta.goodFor.map((text, i) => (
                            <li key={i}><i className="fa-solid fa-check" aria-hidden="true"></i> {text}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="recommend-card__fit-box recommend-card__fit-box--bad">
                        <h4><i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> こんな人には向かない</h4>
                        <ul>
                          {meta.badFor.map((text, i) => (
                            <li key={i}><i className="fa-solid fa-xmark" aria-hidden="true"></i> {text}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="recommend-card__shops">
                  <div className="recommend-card__shop-btns recommend-card__shop-btns--single">
                    <a
                      href={db.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="m-btn m-btn--primary"
                    >
                      {db.provider_name}の公式サイトを見る
                      <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 端末は別で買うべきケース セクション ===== */}
        <section id="separate" className="l-section">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg">
              端末は別で買うべき人は、どんなケースか
            </h2>
            <p className="m-section-desc">
              セット契約は便利ですが、すべての人に向いているわけではありません。<br />
              以下のようなケースでは、端末と回線を分けて検討したほうが合理的です。
            </p>

            <div className="m-card m-card--shadow m-card--padded">
              <h3 className="post-check-item__heading">欲しい機種が明確に決まっている場合</h3>
              <div className="caution-check-card__text">
                <p>「iPhone 13 Proの256GB、シエラブルーが欲しい」など、機種・容量・カラーまで決まっている場合、セット契約の在庫では見つからない可能性が高いです。</p>
                <p>中古スマホ専門店（イオシス、じゃんぱら、ゲオオンラインなど）で探したほうが選択肢は広くなります。</p>
              </div>
            </div>

            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="post-check-item__heading">価格を最優先にしたい場合</h3>
              <div className="caution-check-card__text">
                <p>中古スマホ専門店では、セールや在庫処分で大幅に値下げされることがあります。セット契約の端末価格と比較して、数千円〜1万円以上の差がつくこともあります。</p>
                <p>時間と手間をかけられるなら、端末と回線を分けて最安を狙うほうがお得になりやすいです。</p>
              </div>
            </div>

            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="post-check-item__heading">すでに使いたい格安SIMが決まっている場合</h3>
              <div className="caution-check-card__text">
                <p>「mineoを使いたい」「IIJmioのギガプランがいい」など、すでに使いたい格安SIMが決まっていて、その事業者が中古端末を扱っていない場合は、端末は別で調達するしかありません。</p>
              </div>
            </div>

            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="post-check-item__heading">長期保証を重視する場合</h3>
              <div className="caution-check-card__text">
                <p>セット契約の保証期間は8日〜90日程度が多いです。一方、中古スマホ専門店では3ヶ月〜6ヶ月の保証がついていることもあります。</p>
                <p>また、別途「スマホ保険」に加入する選択肢もあります。保証を重視するなら、端末を別で買ったほうが選択肢が広がります。</p>
              </div>
            </div>

            <div className="m-card m-card--shadow m-card--padded" style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="post-check-item__heading">端末の状態を細かく確認したい場合</h3>
              <div className="caution-check-card__text">
                <p>中古スマホ専門店の店頭なら、実機を手に取って傷や状態を確認できます。セット契約はオンライン申し込みが基本のため、届くまで実物を確認できません。</p>
                <p>状態にこだわりたい人は、店頭で選んで購入したほうがいいでしょう。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 目的別に人気の中古iPhone ===== */}
        <section id="popular" className="l-section l-section--bg-subtle" aria-labelledby="heading-popular">
          <div className="l-container">
            <h2 className="m-section-heading m-section-heading--lg" id="heading-popular">
              目的別に人気の中古iPhone
            </h2>
            <p className="m-section-desc">
              目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。
            </p>
            <div className="m-card m-card--shadow popular-card">
              <figure className="popular-card-figure">
                <img
                  alt="中古iPhoneおすすめ5選のイメージ画像"
                  loading="lazy"
                  width={400}
                  height={500}
                  className="popular-card-img"
                  src="/images/content/iphone-setting.webp"
                />
              </figure>
              <div className="popular-card-body">
                <p className="popular-card-subtitle">目的別におすすめ機種を厳選！</p>
                <p className="popular-card-title">中古iPhoneおすすめ5選</p>
                <p className="popular-card-desc">
                  カメラ性能を重視する人向け、大画面で動画やSNSを楽しみたい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。
                </p>
                <div>
                  <a className="m-btn m-btn--primary" href="/iphone/recommend">
                    おすすめ5機種を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== よくある質問 ===== */}
        <section id="faq" className="l-section" aria-labelledby="heading-faq">
          <div className="l-container">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  { '@type': 'Question', name: 'セット契約と、端末・SIMを別々に買うのはどちらがお得？', acceptedAnswer: { '@type': 'Answer', text: '手間を考慮するとセット契約、価格最優先なら別々購入がお得です。セット契約は動作確認・SIMロック解除・初期設定が済んだ状態で届くため、失敗リスクが低く手間がかかりません。一方、中古スマホ専門店のセール時期などを狙えば、別々に購入したほうが数千円〜1万円程度安くなるケースもあります。' } },
                  { '@type': 'Question', name: '中古スマホのバッテリーは大丈夫？', acceptedAnswer: { '@type': 'Answer', text: '認定中古品なら80%以上が保証されています。楽天モバイル、UQモバイル、ahamoなどのキャリア認定中古品は、バッテリー最大容量80%以上が保証されています。一般的に80%以上あれば日常使用に問題ありません。' } },
                  { '@type': 'Question', name: 'SIMロック解除は必要？', acceptedAnswer: { '@type': 'Answer', text: 'セット契約なら不要です。セット契約で販売される中古端末は、すでにSIMロック解除済みの状態です。なお、2021年10月以降に発売された端末は、原則SIMロックがかかっていません。' } },
                  { '@type': 'Question', name: '今使っている電話番号は引き継げる？', acceptedAnswer: { '@type': 'Answer', text: 'MNP（携帯電話番号ポータビリティ）で引き継げます。現在契約中のキャリアでMNP予約番号を取得し、新しい格安SIMの申し込み時に入力すれば、同じ電話番号をそのまま使えます。' } },
                  { '@type': 'Question', name: '届いた中古端末に不具合があったらどうする？', acceptedAnswer: { '@type': 'Answer', text: '保証期間内であれば交換・返品が可能です。事業者によって保証期間は異なります（8日〜90日）。届いたらすぐに動作確認を行い、不具合があれば速やかに連絡しましょう。' } },
                  { '@type': 'Question', name: '大手キャリアから格安SIMに乗り換えるデメリットは？', acceptedAnswer: { '@type': 'Answer', text: 'キャリアメール・店舗サポート・通信速度に違いが出る場合があります。ただし、月額料金が大幅に下がるメリットを考えると、多くの人にとっては乗り換えたほうがお得です。' } },
                  { '@type': 'Question', name: 'eSIMと物理SIMはどちらを選べばいい？', acceptedAnswer: { '@type': 'Answer', text: '初めてならeSIMがおすすめです。eSIMはSIMカードの配送を待たずに即日開通できます。iPhone XS以降のモデルはeSIMに対応しています。' } },
                ],
              }) }}
            />

            <h2 className="m-section-heading m-section-heading--lg" id="heading-faq">
              よくある質問
            </h2>
            <p className="m-section-desc">
              中古スマホ×格安SIMのセット契約についてよくある質問をまとめました。
            </p>

            <div className="faq-list">
              <div className="m-card m-card--shadow faq-item">
                <h3 className="faq-question">セット契約と、端末・SIMを別々に買うのはどちらがお得？</h3>
                <div className="faq-answer">
                  <p><strong>手間を考慮するとセット契約、価格最優先なら別々購入がお得です。</strong></p>
                  <p>セット契約は動作確認・SIMロック解除・初期設定が済んだ状態で届くため、失敗リスクが低く手間がかかりません。一方、中古スマホ専門店のセール時期などを狙えば、別々に購入したほうが数千円〜1万円程度安くなるケースもあります。</p>
                </div>
              </div>

              <div className="m-card m-card--shadow faq-item">
                <h3 className="faq-question">中古スマホのバッテリーは大丈夫？</h3>
                <div className="faq-answer">
                  <p><strong>認定中古品なら80%以上が保証されています。</strong></p>
                  <p>楽天モバイル、UQモバイル、ahamoなどのキャリア認定中古品は、バッテリー最大容量80%以上が保証されています。一般的に80%以上あれば日常使用に問題ありません。保証がない事業者の場合は、購入後すぐに「設定」→「バッテリー」→「バッテリーの状態」で確認しましょう。</p>
                </div>
              </div>

              <div className="m-card m-card--shadow faq-item">
                <h3 className="faq-question">SIMロック解除は必要？</h3>
                <div className="faq-answer">
                  <p><strong>セット契約なら不要です。</strong></p>
                  <p>セット契約で販売される中古端末は、すでにSIMロック解除済みの状態です。自分で手続きする必要はありません。なお、2021年10月以降に発売された端末は、原則SIMロックがかかっていません。</p>
                </div>
              </div>

              <div className="m-card m-card--shadow faq-item">
                <h3 className="faq-question">今使っている電話番号は引き継げる？</h3>
                <div className="faq-answer">
                  <p><strong>MNP（携帯電話番号ポータビリティ）で引き継げます。</strong></p>
                  <p>現在契約中のキャリアでMNP予約番号を取得し、新しい格安SIMの申し込み時に入力すれば、同じ電話番号をそのまま使えます。MNP予約番号の有効期限は15日間なので、取得後は早めに申し込みましょう。</p>
                </div>
              </div>

              <div className="m-card m-card--shadow faq-item">
                <h3 className="faq-question">届いた中古端末に不具合があったらどうする？</h3>
                <div className="faq-answer">
                  <p><strong>保証期間内であれば交換・返品が可能です。</strong></p>
                  <p>事業者によって保証期間は異なります（8日〜90日）。届いたらすぐに動作確認を行い、不具合があれば速やかに連絡しましょう。特に保証期間が短い事業者（ワイモバイル8日など）は、届いた当日に確認することをおすすめします。</p>
                </div>
              </div>

              <div className="m-card m-card--shadow faq-item">
                <h3 className="faq-question">大手キャリアから格安SIMに乗り換えるデメリットは？</h3>
                <div className="faq-answer">
                  <p><strong>キャリアメール・店舗サポート・通信速度に違いが出る場合があります。</strong></p>
                  <p>キャリアメール（@docomo.ne.jpなど）は使えなくなります（有料で継続可能な場合あり）。店舗サポートがない、または少ない事業者が多いです。混雑時間帯（昼12時台など）に通信速度が低下することがあります。ただし、月額料金が大幅に下がるメリットを考えると、多くの人にとっては乗り換えたほうがお得です。</p>
                </div>
              </div>

              <div className="m-card m-card--shadow faq-item">
                <h3 className="faq-question">eSIMと物理SIMはどちらを選べばいい？</h3>
                <div className="faq-answer">
                  <p><strong>初めてならeSIMがおすすめです。</strong></p>
                  <p>eSIMはSIMカードの配送を待たずに即日開通できます。iPhone XS以降のモデルはeSIMに対応しています。物理SIMは端末を買い替えたときにSIMカードを差し替えるだけで使えるメリットがあります。どちらも通信品質に違いはありません。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== シェアボックス ===== */}
        <ShareBox url={PAGE_URL} text={PAGE_TITLE} bgSubtle />
      </article>
    </main>
  )
}
