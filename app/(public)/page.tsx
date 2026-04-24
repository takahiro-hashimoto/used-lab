import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  getAllIPhoneModels,
  getAllIPadModels,
  getAllMacBookModels,
  getAllWatchModels,
  getAllAirPodsModels,
  getLatestPriceUpdateDate,
} from '@/lib/queries'
import { PRODUCT_CATEGORIES } from '@/lib/routes'
import IconCard from '@/app/components/IconCard'
import { placeholder } from '@/lib/placeholder'
import NewsSection from '@/app/(public)/_components/NewsSection'
import { getHeroImage } from '@/lib/data/hero-images'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '中古Apple製品のおすすめ機種・賢い選び方・安く買う方法を解説 | ユーズドラボ',
  description: '中古iPhone・iPad・MacBook・Apple Watch・AirPodsの価格推移・スペック比較・おすすめ機種を毎日更新。中古Apple製品選びに必要な情報をワンストップで提供します。',
  alternates: { canonical: '/' },
  openGraph: {
    title: '中古Apple製品のおすすめ機種・賢い選び方・安く買う方法を解説 | ユーズドラボ',
    description: '中古iPhone・iPad・MacBook・Apple Watch・AirPodsの価格推移・スペック比較・おすすめ機種を毎日更新。',
    url: '/',
    images: [{ url: getHeroImage('/'), width: 1200, height: 630, alt: '中古Apple製品のおすすめ機種・賢い選び方・安く買う方法を解説 | ユーズドラボ' }],
  },
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
  // 全モデル＋新着情報＋価格更新日を並列取得
  const [iPhoneModels, iPadModels, macBookModels, watchModels, airPodsModels, latestPriceDate] = await Promise.all([
    getAllIPhoneModels(),
    getAllIPadModels(),
    getAllMacBookModels(),
    getAllWatchModels(),
    getAllAirPodsModels(),
    getLatestPriceUpdateDate(),
  ])

  // 価格更新日のフォーマット（例: 2026/4/1）
  const priceUpdateLabel = latestPriceDate
    ? (() => {
        const [y, m, d] = latestPriceDate.split('-')
        return `${y}年${Number(m)}月${Number(d)}日`
      })()
    : null

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
          sizes="(max-width: 768px) 100vw, 360px"
        />
        <div className="hero--top__overlay" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-content hero-content--center">
            <h1 className="hero-title hero-title--top">
              中古Apple製品を賢く選ぶ。
            </h1>
            <p className="hero-subtitle--top">
              中古Apple製品のおすすめ機種・賢い選び方・安く買う方法を解説
            </p>
            {priceUpdateLabel && (
              <p className="hero-freshness">
                <i className="fa-solid fa-rotate" aria-hidden="true"></i>
                中古価格データの最終更新日：{priceUpdateLabel}
              </p>
            )}
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
            <Suspense fallback={
              <div className="top-news-card m-card m-card--shadow m-card--padded">
                <h2 className="top-card-heading">新着情報</h2>
                <p className="news-list__empty">読み込み中...</p>
              </div>
            }>
              <NewsSection />
            </Suspense>

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
                  <p className="top-about-card__role">ガジェットブロガー</p>
                </div>
                <p className="top-about-card__desc">
                  2011年のiPhone 4sから毎年Apple製品を購入し続けているガジェットブロガー。姉妹サイトのガジェットブログ「デジスタ」では300製品以上をレビュー、最高月間PVは60万。GoodsPress誌インタビュー掲載、ITmedia「Fav-Log」連載など多数のメディア実績あり。
                </p>
                <Link href="/profile/" className="top-about-card__text-link">
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
