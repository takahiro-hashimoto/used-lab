import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import HeroMeta from '@/app/components/HeroMeta'

const PAGE_TITLE = '運営者情報'
const PAGE_DESCRIPTION = 'ユーズドラボの運営者タカヒロのプロフィールや、サイト開設の経緯についてご紹介します。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/profile/' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/profile/',
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
}

/** 受賞歴 */
const AWARDS = [
  {
    description: 'バリューコマースメディアアワード2022年上期にて、総合賞3位＆カテゴリー賞（ショッピング・オークションの部）を受賞。',
    href: 'https://www.valuecommerce.ne.jp/award_result/2022/1h/',
    label: 'バリューコマースメディアアワード2022年上期',
  },
  {
    description: 'A8ネットのエーハチレビュー部レビューコンテストにて、ブログ賞を受賞。',
    href: 'https://a8pr.jp/a8review/announce/?new_contest_id=202207',
    label: 'エーハチレビュー部 2022年07月 ブログ賞',
  },
]

/** 連載・監修実績 */
const EDITORIAL_CREDITS = [
  {
    description: 'Adobe公式サイトにてAcrobat オンラインツールの記事が紹介されました。',
    href: 'https://www.adobe.com/jp/acrobat/roc/blog/work-tip.html',
    label: 'Adobe Acrobat みんなの仕事術',
    type: '記事掲載',
  },
  {
    description: 'ITmedia「Fav-Log」にて連載を担当しました。',
    href: 'https://www.itmedia.co.jp/fav/articles/2303/06/news158.html',
    label: 'ガジェットブロガーが「リモートワークで買ってよかったもの」6選 | ITmedia',
    type: '連載',
  },
  {
    description: 'IT業界向け求人サイト・レバテックのオウンドメディアにて連載を担当しました。',
    href: 'https://levtech.jp/media/article/column/detail_249/',
    label: 'リモートワークの生産性を向上させる最新おすすめガジェット5選 | レバテック',
    type: '連載',
  },
  {
    description: '男の隠れ家（デジタル）にて連載コーナーを担当しました。',
    href: 'https://otokonokakurega.com/meet/ippin/77067/',
    label: 'いま買いたいノートPCスタンドはどっち？ | 男の隠れ家',
    type: '連載',
  },
  {
    description: 'ライフスタイル比較メディア「Ameba Choice」にて記事監修を担当しました。',
    href: 'https://choice.ameba.jp/tablet/kindle/',
    label: 'Kindle端末のおすすめ人気ランキング5選！ | Amebaチョイス',
    type: '監修',
  },
  {
    description: 'WEBメディアPicky\'s様の記事監修を担当しました。',
    href: 'https://picky-s.jp/ipad-osusume/',
    label: 'Appleマニアおすすめ｜どれがいい？iPad全種類の違いを徹底比較 | Picky\'s',
    type: '監修',
  },
  {
    description: 'ライフハッカー様の記事監修を担当しました。',
    href: 'https://www.lifehacker.jp/2021/11/smartwatch_recommend.html',
    label: 'おすすめのスマートウォッチ15選 | ライフハッカー',
    type: '監修',
  },
]

/** 雑誌掲載・インタビュー */
const MAGAZINE_FEATURES = [
  {
    description: 'GoodsPress 2024年3月号にてインタビュー記事が掲載されました。',
    href: 'https://www.goodspress.jp/features/582669/2/',
    label: 'iPadで趣味を遊びつくそう | GoodsPress 2024年3月号',
  },
  {
    description: 'GoodsPress 2023年11月号にてインタビュー記事が掲載されました。',
    href: 'https://www.goodspress.jp/features/565442/',
    label: 'ガジェット好きのカバンの中身 | GoodsPress 2023年11月号',
  },
  {
    description: 'GoodsPress 2022年6月号にてインタビュー記事が掲載されました。',
    href: 'https://www.goodspress.jp/features/451918/2/',
    label: 'ハイスペック仕事部屋拝見 | GoodsPress 2022年6月号',
  },
  {
    description: 'ライター専門誌「ライターマガジン」にブログ運営のインタビュー記事が掲載されました。',
    href: 'https://writermagazine.net/2023/05/386/',
    label: 'ライターマガジン Vol.9 2022年7月号',
  },
  {
    description: 'Incase公式サイトにてインタビュー記事が掲載されました。',
    href: 'https://incasejapan.com/blogs/interview/apple%E8%A3%BD%E5%93%81%E5%A5%BD%E3%81%8D%E3%81%AB%E3%81%AF%E3%81%9F%E3%81%BE%E3%82%89%E3%81%AA%E3%81%84',
    label: 'Apple製品好きにはたまらない | Incase公式',
  },
]

/** サイト紹介（ユーズドラボが紹介された実績） */
const SITE_MENTIONS = [
  {
    description: '中古iPhone・iPadなどを販売されている「にこスマ」に当サイトをご紹介いただきました。',
    href: 'https://www.nicosuma.com/magazine/media-info',
    label: '「にこスマ」を紹介いただいているWebメディア・ブログまとめ',
  },
  {
    description: 'SUUMOのオウンドメディアに部屋を紹介いただきました。',
    href: 'https://suumo.jp/article/oyakudachi/oyaku/chintai/fr_single/hitorigurashi_danshibeya/',
    label: '男性の一人暮らしの部屋をおしゃれにまとめるコツ | SUUMO',
  },
  {
    description: 'エックスサーバーのブログ記事にて「参考になるブロガー」として紹介いただきました。',
    href: 'https://www.xserver.ne.jp/blog/gadget-blog-start-guide',
    label: 'ガジェットブログの始め方を解説！ | エックスサーバー',
  },
  {
    description: 'おすすめゲーミングデバイス比較情報メディアのGameLens様に当ブログを掲載いただきました。',
    href: 'https://mediator-net.jp/useful-site',
    label: 'ゲーム好き必見！暮らしに役立つサイト一覧 | GameLens',
  },
  {
    description: 'AI総研のオウンドメディアにておすすめのメディアとして当サイトを紹介いただきました。',
    href: 'https://metaversesouken.com/ai/ai/webmedia/',
    label: 'おすすめのWebメディア運営会社 | AI総研',
  },
  {
    description: '法人向けSMS配信サービス「SMS-FourS」に当サイトをご紹介いただきました。',
    href: 'https://leafnet.jp/sms-fours/',
    label: '安心・スピーディーなSMS配信はSMS-FourS',
  },
]

const SNS_LINKS = [
  { href: 'https://twitter.com/takahiro_mono', label: 'X（Twitter）', icon: 'fa-brands fa-x-twitter' },
  { href: 'https://www.instagram.com/takahiro_mono', label: 'Instagram', icon: 'fa-brands fa-instagram' },
  { href: 'https://www.youtube.com/@takahiro_mono', label: 'YouTube', icon: 'fa-brands fa-youtube' },
  { href: 'https://www.threads.com/@takahiro_mono', label: 'Threads', icon: 'fa-brands fa-threads' },
  { href: 'https://note.com/takahiro_mono', label: 'note', icon: 'fa-solid fa-pen-nib' },
  { href: 'https://www.pinterest.jp/takahirogadget/', label: 'Pinterest', icon: 'fa-brands fa-pinterest' },
  { href: '/contact/', label: 'お問い合わせ', icon: 'fa-solid fa-envelope' },
]

export default function AboutPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.jp/' },
      { '@type': 'ListItem', position: 2, name: '運営者情報' },
    ],
  }

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'タカヒロ',
    url: 'https://used-lab.jp/profile/',
    image: 'https://used-lab.jp/images/content/thumbnail/my-icon.webp',
    jobTitle: 'プロジェクトマネージャー / ガジェットブロガー',
    description: 'IT企業でWebデザイナー、フロントエンドエンジニア、Webディレクターを経て現在はプロジェクトマネージャー。2015年からガジェットブログ「デジスタ」を運営し、300以上の製品レビュー実績を持つ。',
    knowsAbout: ['iPhone', 'iPad', 'MacBook', 'Apple Watch', 'AirPods', '中古Apple製品', 'ガジェット', 'Web制作'],
    alumniOf: { '@type': 'Organization', name: 'IT企業（Webデザイナーとしてキャリアスタート）' },
    sameAs: [
      'https://twitter.com/takahiro_mono',
      'https://www.instagram.com/takahiro_mono',
      'https://www.youtube.com/@takahiro_mono',
      'https://note.com/takahiro_mono',
      'https://digital-style.jp/',
      'https://nightscape.tokyo/',
      'https://www.amazon.co.jp/shop/takahiro_mono',
      'https://news.google.com/publications/CAAqBwgKMOzgvwsw-fvWAw?hl=ja&gl=JP&ceid=JP:ja',
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="hero-wrapper">
      <Breadcrumb items={[{ label: '運営者情報' }]} />

      <header className="hero hero--simple">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">運営者情報</h1>
            <p className="hero-description">ユーズドラボの運営者タカヒロのプロフィールや、サイト開設の経緯についてご紹介します。</p>
            <HeroMeta dateStr="2026-03-20" dateDisplay="2026年3月20日" />
          </div>
        </div>
      </header>
      </div>

      <div className="l-sections">
      {/* 運営者について */}
      <section className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-user" aria-hidden="true"></i>{' '}
            運営者について
          </h2>
          <p className="m-section-desc">
            ユーズドラボ運営者のプロフィールを簡単にご紹介
          </p>

          <div className="about-profile m-card m-card--shadow m-card--padded">
            <div className="about-profile-inner">
              <div className="about-profile-avatar">
                <Image
                  src="/images/content/thumbnail/my-icon.webp"
                  alt="タカヒロ"
                  width={200}
                  height={200}
                  className="about-profile-img"
                />
              </div>
              <div className="about-profile-info">
                <ul className="about-profile-list">
                  <li><span className="about-profile-label">名前</span>タカヒロ</li>
                  <li><span className="about-profile-label">職業</span>プロジェクトマネージャー / ガジェットブロガー</li>
                  <li><span className="about-profile-label">経歴</span>Webデザイナー → フロントエンドエンジニア → Webディレクター → PM</li>
                  <li><span className="about-profile-label">出身地</span>愛知県</li>
                  <li><span className="about-profile-label">居住地</span>東京都</li>
                  <li><span className="about-profile-label">ブログ歴</span>2015年12月〜（10年以上）</li>
                  <li><span className="about-profile-label">レビュー数</span>300製品以上</li>
                </ul>
                <p className="about-profile-desc">
                  愛知県のIT企業にWebデザイナーとして入社後、フロントエンドエンジニア、Webディレクターと複数職種を経験。現在は東京都内のIT企業でプロジェクトマネージャーとして従事しながら、複数のWebメディアを運営しています。
                </p>
                <p className="about-profile-desc">
                  本サイトのほか、月間40〜45万PVのガジェットブログ「<a href="https://digital-style.jp/" target="_blank" rel="noopener noreferrer">デジスタ</a>」、都内200箇所以上の夜景スポットを紹介する「<a href="https://nightscape.tokyo/" target="_blank" rel="noopener noreferrer">東京夜景ナビ</a>」を運営中。Apple製品は2011年のiPhone 4sから毎年購入しており、その体験を活かして実用的なコンテンツを発信しています。
                </p>
                <div className="about-sns-links">
                  {SNS_LINKS.map((sns) => (
                    <a
                      key={sns.href}
                      href={sns.href}
                      {...(sns.href.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="about-sns-link"
                    >
                      <i className={sns.icon} aria-hidden="true"></i>
                      <span>{sns.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 受賞歴 */}
      <section className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-trophy" aria-hidden="true"></i>{' '}
            受賞歴
          </h2>
          <p className="m-section-desc">
            運営メディア「デジスタ」での受賞実績
          </p>

          <div className="about-media-list">
            {AWARDS.map((award) => (
              <div key={award.label} className="about-media-item m-card m-card--padded m-card--sm">
                <p className="about-media-desc">{award.description}</p>
                <a
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-media-link"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  <span>{award.label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 連載・監修実績 */}
      <section className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-pen-fancy" aria-hidden="true"></i>{' '}
            連載・監修実績
          </h2>
          <p className="m-section-desc">
            外部メディアでの連載・記事監修の実績
          </p>

          <div className="about-media-list">
            {EDITORIAL_CREDITS.map((credit) => (
              <div key={credit.href} className="about-media-item m-card m-card--padded m-card--sm">
                <p className="about-media-desc">
                  <span className="about-media-badge">{credit.type}</span>
                  {credit.description}
                </p>
                <a
                  href={credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-media-link"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  <span>{credit.label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 雑誌掲載・インタビュー */}
      <section className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-book-open" aria-hidden="true"></i>{' '}
            雑誌掲載・インタビュー
          </h2>
          <p className="m-section-desc">
            紙面・Webメディアでのインタビュー掲載実績
          </p>

          <div className="about-media-list">
            {MAGAZINE_FEATURES.map((feature) => (
              <div key={feature.href} className="about-media-item m-card m-card--padded m-card--sm">
                <p className="about-media-desc">{feature.description}</p>
                <a
                  href={feature.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-media-link"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  <span>{feature.label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サイト紹介 */}
      <section className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-newspaper" aria-hidden="true"></i>{' '}
            メディア掲載
          </h2>
          <p className="m-section-desc">
            当サイト・運営者を紹介いただいたメディア一覧
          </p>

          <div className="about-media-list">
            {SITE_MENTIONS.map((media) => (
              <div key={media.href} className="about-media-item m-card m-card--padded m-card--sm">
                <p className="about-media-desc">{media.description}</p>
                <a
                  href={media.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-media-link"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  <span>{media.label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ユーズドラボ開設の経緯 */}
      <section className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-brands fa-apple" aria-hidden="true"></i>{' '}
            ユーズドラボ開設の経緯
          </h2>
          <p className="m-section-desc">
            Apple製品に魅了された経緯とユーズドラボ誕生のきっかけ
          </p>

          <div className="about-history m-card m-card--shadow m-card--padded">
            <div className="u-mb-lg">
              <Image
                src="/images/content/photo/ipad-image.jpg"
                alt="Apple製品のイメージ"
                width={800}
                height={400}
                className="about-history-img"
              />
            </div>
            <div className="about-history-text content-prose">
              <p>
                2011年、大学生で手にしたiPhone 4s。その操作感に衝撃を受け、以来、毎年のように最新のiPhoneへ買い替えるのが恒例になりました。iPhone 12の頃までは、秋の新作発表を徹夜で視聴するほど夢中に。iPadやMacBookも加わり、気づけば日常のデバイスはApple製品一色でした。
              </p>
              <p>
                「便利な活用法や周辺機器を共有したい」との想いから、2015年にブログ「<a href="https://digital-style.jp/" target="_blank" rel="noopener noreferrer">デジスタ</a>」を開設。新モデルが出るたび、ワクワクしながらレビューを精力的に更新してきました。
              </p>
              <p>
                しかし近年、製品の完成度が高まり、最新機種でなくても十分やりたいことが実現できると実感。価格高騰もあり、用途に合った型落ちや中古を賢く選ぶことが最良の選択肢だと考えるようになりました。
              </p>
              <p>
                こうした背景から、2024年8月に本サイトを始動。読者の皆さまが納得してApple製品を選べるよう、分かりやすい情報発信に努めてまいります！
              </p>
            </div>
          </div>

        </div>
      </section>
      </div>

    </main>
  )
}
