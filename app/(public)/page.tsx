import Image from 'next/image'
import Link from 'next/link'
import {
  getAllIPhoneModels,
  getAllIPadModels,
  getAllMacBookModels,
  getAllWatchModels,
  getAllAirPodsModels,
} from '@/lib/queries'
import { PRODUCT_CATEGORIES } from '@/lib/routes'
import { getPublishedNews } from '@/app/admin/actions'
import IconCard from '@/app/components/IconCard'
import HeroSearch from '@/app/components/HeroSearch'
import { placeholder } from '@/lib/placeholder'

/** カテゴリごとの画像ベースパス */
const CATEGORY_IMAGE_BASE: Record<string, string> = {
  iphone: '/images/iphone/',
  ipad: '/images/ipad/',
  macbook: '/images/macbook/',
  watch: '/images/watch/',
  airpods: '/images/airpods/',
}

export default async function HomePage() {
  // 全モデル＋新着情報を並列取得
  const [iPhoneModels, iPadModels, macBookModels, watchModels, airPodsModels, newsItems] = await Promise.all([
    getAllIPhoneModels(),
    getAllIPadModels(),
    getAllMacBookModels(),
    getAllWatchModels(),
    getAllAirPodsModels(),
    getPublishedNews(),
  ])

  // モデル数
  const modelCounts: Record<string, number> = {
    iphone: iPhoneModels.length,
    ipad: iPadModels.length,
    macbook: macBookModels.length,
    watch: watchModels.length,
    airpods: airPodsModels.length,
  }

  // カテゴリカード用: 最新モデルの画像（配列先頭 = 最新）
  const categoryImages: Record<string, string | null> = {
    iphone: iPhoneModels[0]?.image ? `${CATEGORY_IMAGE_BASE.iphone}${iPhoneModels[0].image}` : null,
    ipad: iPadModels[0]?.image ? `${CATEGORY_IMAGE_BASE.ipad}${iPadModels[0].image}` : null,
    macbook: macBookModels[0]?.image ? `${CATEGORY_IMAGE_BASE.macbook}${macBookModels[0].image}` : null,
    watch: watchModels[0]?.image ? `${CATEGORY_IMAGE_BASE.watch}${watchModels[0].image}` : null,
    airpods: airPodsModels[0]?.image ? `${CATEGORY_IMAGE_BASE.airpods}${airPodsModels[0].image}` : null,
  }

  return (
    <main>
      {/* ── Hero ── */}
      <header className="hero hero--top">
        <Image
          src="/images/content/photo/pc-main.jpg"
          alt=""
          className="hero--top__bg"
          fill
          priority
        />
        <div className="hero--top__overlay" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-content hero-content--center">
            <p className="hero-title hero-title--top">
              中古Apple製品を賢く選ぶ。
            </p>
            <h1 className="hero-subtitle--top">
              中古Apple製品のおすすめ機種・賢い選び方・安く買う方法を解説
            </h1>
            <HeroSearch />
          </div>
        </div>
      </header>

      <div className="l-sections">
      {/* ── カテゴリナビ ── */}
      <section id="categories" className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">製品カテゴリから探す</h2>
          <p className="m-section-desc">気になる製品カテゴリを選んで、選び方・おすすめ機種・中古相場をチェック</p>

          <div className="l-grid l-grid--5col l-grid--gap-lg">
            {PRODUCT_CATEGORIES.map((cat) => (
              <article key={cat.id} className="m-card m-card--shadow listing-pick-card">
                <figure className="listing-pick-card__figure">
                  <Image
                    src={categoryImages[cat.id] || placeholder(200, 200, cat.label)}
                    alt={`中古${cat.label}の写真`}
                    className="listing-pick-card__img"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                </figure>
                <div className="listing-pick-card__body">
                  <h3 className="listing-pick-card__name">{cat.label}</h3>
                  <p className="listing-pick-card__release">{modelCounts[cat.id]}モデル掲載中</p>
                  <p className="listing-pick-card__desc">{cat.desc}</p>
                </div>
                <Link href={`${cat.basePath}/`} className="m-btn m-btn--primary m-btn--block u-w-full">
                  ガイドを見る <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── サイトの特徴 ── */}
      <section id="features" className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">ユーズドラボの特徴</h2>
          <p className="m-section-desc">中古Apple製品選びに必要な情報をワンストップで提供します</p>

          <div className="l-grid l-grid--3col l-grid--gap-lg">
            <IconCard icon="fa-solid fa-chart-line" title="毎日更新の価格データ">
              <p>イオシス・ゲオ・じゃんぱらなど主要ショップの中古価格を毎日自動収集。値下がりトレンドや買い時がひと目でわかる価格推移グラフを全モデルに掲載。</p>
            </IconCard>
            <IconCard icon="fa-solid fa-table-cells" title="歴代モデルのスペック比較">
              <p>CPU・ディスプレイ・カメラ・バッテリーなど、歴代モデルの全スペックを一覧表で比較可能。気になる機種同士の性能差がすぐにわかります。</p>
            </IconCard>
            <IconCard icon="fa-solid fa-star" title="目的別のおすすめガイド">
              <p>コスパ重視・カメラ性能・コンパクトさなど、重視するポイント別に狙い目の型落ちモデルを厳選。購入先の比較や注意点もあわせて解説しています。</p>
            </IconCard>
          </div>
        </div>
      </section>

      {/* ── 新着情報 + 運営者情報（2カラム） ── */}
      <section className="l-section">
        <div className="l-container">
          <div className="top-bottom-grid">
            {/* 新着情報 */}
            <div className="top-news-card m-card m-card--shadow m-card--padded">
              <h2 className="top-card-heading">新着情報</h2>
              {newsItems.length > 0 ? (
                <dl className="news-list">
                  {newsItems.map((item) => (
                    <div key={item.id} className="news-list__item">
                      <dt className="news-list__date">
                        <time dateTime={item.date}>{item.date.replace(/-/g, '.')}</time>
                      </dt>
                      <dd className="news-list__content" dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="news-list__empty">新着情報はありません</p>
              )}
            </div>

            {/* 運営者情報 */}
            <div className="top-about-card m-card m-card--shadow m-card--padded">
              <h2 className="top-card-heading">運営者情報</h2>
              <div className="top-about-card__body">
                <div className="top-about-card__avatar">
                  <Image
                    src="/images/content/thumbnail/my-icon.webp"
                    alt="タカヒロ"
                    className="about-profile-img"
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <p className="top-about-card__name">タカヒロ</p>
                </div>
                <p className="top-about-card__desc">
                  都内のIT企業でWebディレクターとして働く傍ら、メディア運営を行っています。中古Apple製品選びに役立つ情報を発信しています。
                </p>
                <Link href="/about/" className="top-about-card__text-link">
                  運営者情報を見る <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </Link>
                <div className="top-about-card__links">
                  {[
                    { href: 'https://twitter.com/takahiro_mono', label: 'Twitter', icon: 'fa-brands fa-x-twitter' },
                    { href: 'https://www.instagram.com/takahiro_mono', label: 'Instagram', icon: 'fa-brands fa-instagram' },
                    { href: 'https://www.youtube.com/@takahiro_mono', label: 'YouTube', icon: 'fa-brands fa-youtube' },
                    { href: 'https://note.com/takahiro_mono', label: 'note', icon: 'fa-solid fa-pen-nib' },
                    { href: '/contact/', label: 'お問い合わせ', icon: 'fa-solid fa-envelope' },
                  ].map((sns) => (
                    <a
                      key={sns.href}
                      href={sns.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="top-about-card__icon-link"
                      aria-label={sns.label}
                      title={sns.label}
                    >
                      <i className={sns.icon} aria-hidden="true"></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}
