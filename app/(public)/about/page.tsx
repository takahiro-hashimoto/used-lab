import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'

const PAGE_TITLE = '運営者情報'
const PAGE_DESCRIPTION = 'ユーズドラボの運営者タカヒロのプロフィールや、サイト開設の経緯についてご紹介します。'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ユーズドラボ`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
    url: '/about/',
  },
  twitter: {
    title: `${PAGE_TITLE} | ユーズドラボ`,
    description: PAGE_DESCRIPTION,
  },
}

const MEDIA_MENTIONS = [
  {
    description: 'ライフスタイル比較メディア「Abema Choice」の記事の監修をさせていただきました。',
    href: 'https://choice.ameba.jp/tablet/kindle/',
    label: 'Kindle端末のおすすめ人気ランキング5選！ | Amebaチョイス',
  },
  {
    description: '資産運用や家計の見直しなど、お金に関する総合サービス「@ネクスト」に当サイトを紹介いただきました。',
    href: 'https://at-next.jp/',
    label: 'お金の疑問や悩みを解決する、オールインワンサービス @next',
  },
  {
    description: '中古iPhone・iPadなどを販売されている「にこスマ」に当サイトをご紹介いただきました。',
    href: 'https://www.nicosuma.com/magazine/media-info',
    label: '「にこスマ」を紹介いただいているWebメディア・ブログまとめ',
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
  { href: 'https://twitter.com/takahiro_mono', label: 'Twitter', icon: 'fa-brands fa-x-twitter' },
  { href: 'https://www.instagram.com/takahiro_mono', label: 'Instagram', icon: 'fa-brands fa-instagram' },
  { href: 'https://www.youtube.com/@takahiro_mono', label: 'YouTube', icon: 'fa-brands fa-youtube' },
  { href: 'https://note.com/takahiro_mono', label: 'note', icon: 'fa-solid fa-pen-nib' },
  { href: '/contact/', label: 'お問い合わせ', icon: 'fa-solid fa-envelope' },
]

export default function AboutPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '中古Apple製品を安く買う', item: 'https://used-lab.com/' },
      { '@type': 'ListItem', position: 2, name: '運営者情報' },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="hero-wrapper">
      <Breadcrumb items={[{ label: '運営者情報' }]} />

      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">運営者情報</h1>
            <p className="hero-description">
              初めまして！ユーズドラボを運営しています、タカヒロです！<br />
              このページでは僕自身のことやブログの歩みについて紹介していきます。
            </p>
          </div>
        </div>
      </header>
      </div>

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
                  src="/images/content/my-icon.webp"
                  alt="タカヒロ"
                  width={200}
                  height={200}
                  className="about-profile-img"
                />
              </div>
              <div className="about-profile-info">
                <ul className="about-profile-list">
                  <li><span className="about-profile-label">名前</span>タカヒロ</li>
                  <li><span className="about-profile-label">職業</span>Webディレクター / ブロガー</li>
                  <li><span className="about-profile-label">出身地</span>愛知県</li>
                  <li><span className="about-profile-label">居住地</span>東京都</li>
                  <li><span className="about-profile-label">趣味</span>カメラ、旅行、ドライブ、読書</li>
                </ul>
                <p className="about-profile-desc">
                  都内のIT企業でWebディレクターとして働く傍ら、メディア運営を行っています。本サイトのほか、「<a href="https://digital-style.jp/" target="_blank" rel="noopener noreferrer">ガジェットブログ・デジスタ</a>」「<a href="https://nightscape.tokyo/" target="_blank" rel="noopener noreferrer">東京夜景ナビ</a>」など、複数のWebメディアを運営中です。
                </p>
                <p className="about-profile-desc">
                  当サイトでは、みなさまが失敗せず、賢く中古Apple製品を選べるような情報発信を心がけています。信頼できるショップの紹介や製品レビューなど、実用的なコンテンツを通じて、後悔しないガジェット選びをお手伝いできれば幸いです！
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

      {/* メディア掲載 */}
      <section className="l-section l-section--bg-subtle">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">
            <i className="fa-solid fa-newspaper" aria-hidden="true"></i>{' '}
            メディア掲載
          </h2>
          <p className="m-section-desc">
            当サイトを紹介・掲載いただいたメディア一覧
          </p>

          <div className="about-media-list">
            {MEDIA_MENTIONS.map((media) => (
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
            <div className="about-history-inner">
              <div className="about-history-image">
                <Image
                  src="/images/content/ipad-image.jpg"
                  alt="Apple製品のイメージ"
                  width={400}
                  height={300}
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

        </div>
      </section>

    </main>
  )
}
