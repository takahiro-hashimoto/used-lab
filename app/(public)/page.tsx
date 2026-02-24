import Link from 'next/link'
import {
  getAllIPhoneModels,
  getAllIPadModels,
  getAllMacBookModels,
  getAllWatchModels,
  getAllAirPodsModels,
} from '@/lib/queries'
import { PRODUCT_CATEGORIES } from '@/lib/routes'
import { RECENT_ARTICLES } from '@/lib/data/recent-articles'

/** カテゴリアイコンマッピング */
const CATEGORY_ICONS: Record<string, string> = {
  iphone: 'fa-mobile-screen',
  ipad: 'fa-tablet-screen-button',
  macbook: 'fa-laptop',
  watch: 'fa-clock',
  airpods: 'fa-headphones',
}

/** カテゴリごとの画像ベースパス */
const CATEGORY_IMAGE_BASE: Record<string, string> = {
  iphone: '/images/iphone/',
  ipad: '/images/ipad/',
  macbook: '/images/macbook/',
  watch: '/images/watch/',
  airpods: '/images/airpods/',
}

export default async function HomePage() {
  // 全モデルを並列取得
  const [iPhoneModels, iPadModels, macBookModels, watchModels, airPodsModels] = await Promise.all([
    getAllIPhoneModels(),
    getAllIPadModels(),
    getAllMacBookModels(),
    getAllWatchModels(),
    getAllAirPodsModels(),
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
      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="hero-inner l-container">
          <div className="hero-content">
            <h1 className="hero-title">
              中古Apple製品を賢く選ぶなら<br />ユーズドラボ
            </h1>
            <p className="hero-description">
              iPhone・iPad・MacBook・Apple Watch・AirPodsの中古相場を毎日更新。
            </p>
            <p className="hero-description">
              スペック比較・おすすめモデル・購入先情報をまとめて、あなたのベストな1台探しをサポートします。
            </p>
            <div className="hero-actions">
              <a href="#categories" className="m-btn m-btn--hero-primary">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                <span>製品を探す</span>
              </a>
              <a href="#features" className="m-btn m-btn--hero-outline">
                <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
                <span>サイトの特徴</span>
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-media">
              <img
                src="/images/content/logo-used-lab.webp"
                alt="ユーズドラボ"
                className="hero-media__img"
                width={360}
                height={360}
              />
            </figure>
          </div>
        </div>
      </header>

      {/* ── カテゴリナビ ── */}
      <section id="categories" className="l-section l-section--bg-subtle">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">製品カテゴリから探す</h2>
          <p className="m-section-desc">気になる製品カテゴリを選んで、選び方・おすすめ機種・中古相場をチェック</p>

          <div className="l-grid l-grid--5col" style={{ gap: 'var(--space-md)' }}>
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link key={cat.id} href={`${cat.basePath}/`} className="top-category-card m-card m-card--shadow">
                <figure className="top-category-card__img">
                  <img
                    src={categoryImages[cat.id] || `https://placehold.co/120x120/f5f5f7/1d1d1f?text=${encodeURIComponent(cat.label)}`}
                    alt={cat.label}
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                </figure>
                <h3 className="top-category-card__title">{cat.label}</h3>
                <p className="top-category-card__desc">{cat.desc}</p>
                <span className="top-category-card__count">{modelCounts[cat.id]}モデル掲載中</span>
                <span className="top-category-card__cta m-btn m-btn--primary m-btn--sm">
                  <span>詳しく見る</span>
                  <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </span>
              </Link>
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
            <div className="m-card m-card--shadow criteria-card">
              <div className="criteria-card__head">
                <span className="criteria-card__icon criteria-card__icon--blue">
                  <i className="fa-solid fa-chart-line" aria-hidden="true"></i>
                </span>
                <h3 className="criteria-card__title">毎日更新の価格データ</h3>
              </div>
              <p className="criteria-card__desc">
                イオシス・ゲオ・じゃんぱらなど主要ショップの中古価格を毎日自動収集。値下がりトレンドや買い時がひと目でわかる価格推移グラフを全モデルに掲載。
              </p>
            </div>
            <div className="m-card m-card--shadow criteria-card">
              <div className="criteria-card__head">
                <span className="criteria-card__icon criteria-card__icon--green">
                  <i className="fa-solid fa-table-cells" aria-hidden="true"></i>
                </span>
                <h3 className="criteria-card__title">全モデル網羅のスペック比較</h3>
              </div>
              <p className="criteria-card__desc">
                CPU・ディスプレイ・カメラ・バッテリーなど、歴代モデルの全スペックを一覧表で比較可能。気になる機種同士の性能差がすぐにわかります。
              </p>
            </div>
            <div className="m-card m-card--shadow criteria-card">
              <div className="criteria-card__head">
                <span className="criteria-card__icon criteria-card__icon--red">
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                </span>
                <h3 className="criteria-card__title">目的別のおすすめガイド</h3>
              </div>
              <p className="criteria-card__desc">
                コスパ重視・カメラ性能・コンパクトさなど、重視するポイント別に狙い目の型落ちモデルを厳選。購入先の比較や注意点もあわせて解説しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 新着記事 ── */}
      <section id="new-articles" className="l-section l-section--bg-subtle">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">新着記事</h2>
          <p className="m-section-desc">最近公開・更新した記事をピックアップ</p>

          <div className="l-grid l-grid--2col" style={{ gap: 'var(--space-md)' }}>
            {RECENT_ARTICLES.map((article) => (
              <Link key={article.href} href={article.href} className="top-new-article m-card m-card--shadow">
                <figure className="top-new-article__thumb">
                  <img src={article.image} alt="" width={300} height={170} loading="lazy" />
                </figure>
                <div className="top-new-article__body">
                  <span className="top-new-article__meta">
                    <span className="top-new-article__date">{article.date}</span>
                    <span className="top-new-article__category">{article.category}</span>
                  </span>
                  <h3 className="top-new-article__title">{article.title}</h3>
                  <p className="top-new-article__desc">{article.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 運営者情報 ── */}
      <section id="about" className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">運営者情報</h2>
          <p className="m-section-desc">ユーズドラボを運営しているタカヒロです</p>

          <div className="about-profile m-card m-card--shadow m-card--padded">
            <div className="about-profile-inner">
              <div className="about-profile-avatar">
                <img
                  src="/images/content/my-icon.webp"
                  alt="タカヒロ"
                  className="about-profile-img"
                  width={120}
                  height={120}
                  loading="lazy"
                />
              </div>
              <div className="about-profile-info">
                <p className="about-profile-desc" style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-text)' }}>タカヒロ</p>
                <p className="about-profile-desc">
                  都内のIT企業でWebディレクターとして働く傍ら、メディア運営を行っています。本サイトのほか、「ガジェットブログ・デジスタ」「東京夜景ナビ」など、複数のWebメディアを運営中です。
                </p>
                <p className="about-profile-desc">
                  当サイトでは、みなさまが失敗せず、賢く中古Apple製品を選べるような情報発信を心がけています。信頼できるショップの紹介や製品レビューなど、実用的なコンテンツを通じて、後悔しないガジェット選びをお手伝いできれば幸いです！
                </p>
                <Link href="/about/" className="m-btn m-btn--primary m-btn--sm" style={{ marginTop: 'var(--space-md)' }}>
                  <span>運営者情報をもっと見る</span>
                  <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
