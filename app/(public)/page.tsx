import type { Metadata } from 'next'
import { HIDDEN_CATEGORY_IDS } from '@/lib/data/feature-flags'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  getAllIPhoneModelsIncludingEnded,
  getAllIPadModelsIncludingEnded,
  getAllMacBookModelsIncludingEnded,
  getAllMacModelsIncludingEnded,
  getAllWatchModelsIncludingEnded,
  getAllAirPodsModelsIncludingEnded,
  getAllPixelModelsIncludingEnded,
  getAllGalaxyModelsIncludingEnded,
  getLatestPriceUpdateDate,
} from '@/lib/queries'
import { PRODUCT_CATEGORIES } from '@/lib/routes'
import IconCard from '@/app/components/IconCard'
import { placeholder } from '@/lib/placeholder'
import NewsSection from '@/app/(public)/_components/NewsSection'
import { getHeroImage } from '@/lib/data/hero-images'
import { hasModelImage } from '@/lib/generated/model-images'

export const revalidate = false

export const metadata: Metadata = {
  title: '中古・型落ちデジタルデバイスのおすすめ機種と賢い選び方を解説',
  description: '中古iPhone・iPad・MacBook・Apple Watch・AirPodsの価格推移・スペック比較・おすすめ機種を毎日更新。中古・型落ちデジタルデバイス選びに必要な情報をワンストップで提供します。',
  alternates: { canonical: '/' },
  openGraph: {
    title: '中古・型落ちデジタルデバイスのおすすめ機種と賢い選び方を解説 | ユーズドラボ',
    description: '中古iPhone・iPad・MacBook・Apple Watch・AirPodsの価格推移・スペック比較・おすすめ機種を毎日更新。',
    url: '/',
    images: [{ url: getHeroImage('/'), width: 1200, height: 630, alt: '中古・型落ちデジタルデバイスのおすすめ機種と賢い選び方を解説 | ユーズドラボ' }],
  },
}

/** カテゴリごとの画像ベースパス */
const CATEGORY_IMAGE_BASE: Record<string, string> = {
  iphone: '/images/iphone/',
  pixel: '/images/pixel/',
  galaxy: '/images/galaxy/',
  ipad: '/images/ipad/',
  macbook: '/images/macbook/',
  mac: '/images/mac/',
  watch: '/images/watch/',
  airpods: '/images/airpods/',
}

export default async function HomePage() {
  // 全モデル（サポート切れ含む）＋価格更新日を並列取得
  const [allIPhoneModels, allPixelModels, allGalaxyModels, allIPadModels, allMacBookModels, allMacModels, allWatchModels, allAirPodsModels, latestPriceDate] = await Promise.all([
    getAllIPhoneModelsIncludingEnded(),
    getAllPixelModelsIncludingEnded(),
    getAllGalaxyModelsIncludingEnded(),
    getAllIPadModelsIncludingEnded(),
    getAllMacBookModelsIncludingEnded(),
    getAllMacModelsIncludingEnded(),
    getAllWatchModelsIncludingEnded(),
    getAllAirPodsModelsIncludingEnded(),
    getLatestPriceUpdateDate(),
  ])

  // 価格更新日のフォーマット（例: 2026/4/1）
  const priceUpdateLabel = latestPriceDate
    ? (() => {
        const [y, m, d] = latestPriceDate.split('-')
        return `${y}年${Number(m)}月${Number(d)}日`
      })()
    : null

  // モデル数（サポート切れ含む）
  const modelCounts: Record<string, number> = {
    iphone: allIPhoneModels.length,
    pixel: allPixelModels.length,
    galaxy: allGalaxyModels.length,
    ipad: allIPadModels.length,
    macbook: allMacBookModels.length,
    mac: allMacModels.length,
    watch: allWatchModels.length,
    airpods: allAirPodsModels.length,
  }

  // カテゴリカード用: 現役モデル（last_xxx === null）のうち画像があるものを採用。
  // 画像未登録の機種が先頭にあるとプレースホルダーになってしまうため、m.image で絞る。
  const categoryImages: Record<string, string | null> = {
    iphone: (() => { const m = allIPhoneModels.find(m => !m.last_ios && m.image); return m?.image ? `${CATEGORY_IMAGE_BASE.iphone}${m.image}` : null })(),
    pixel: (() => { const m = allPixelModels.find(m => !m.last_android && m.image); return m?.image ? `${CATEGORY_IMAGE_BASE.pixel}${m.image}` : null })(),
    galaxy: (() => { const m = allGalaxyModels.find(m => !m.last_android && m.image); return m?.image ? `${CATEGORY_IMAGE_BASE.galaxy}${m.image}` : null })(),
    ipad: (() => { const m = allIPadModels.find(m => !m.last_ipados && m.image); return m?.image ? `${CATEGORY_IMAGE_BASE.ipad}${m.image}` : null })(),
    macbook: (() => { const m = allMacBookModels.find(m => !m.last_macos && m.image); return m?.image ? `${CATEGORY_IMAGE_BASE.macbook}${m.image}` : null })(),
    // デスクトップMacは機種画像を配置中。実ファイルが無いあいだは
    // 404の壊れた画像ではなくプレースホルダーを出す（配置すれば自動で切り替わる）
    mac: (() => { const m = allMacModels.find(m => !m.last_macos && m.image); if (!hasModelImage('mac', m?.image)) return null; return `${CATEGORY_IMAGE_BASE.mac}${m!.image}` })(),
    watch: (() => { const m = allWatchModels.find(m => !m.last_watchos && m.image); return m?.image ? `${CATEGORY_IMAGE_BASE.watch}${m.image}` : null })(),
    airpods: (() => { const m = allAirPodsModels.find(m => m.image); return m?.image ? `${CATEGORY_IMAGE_BASE.airpods}${m.image}` : null })(),
  }

  // カテゴリを Apple / Android の2グループに分割して表示
  const pickCategories = (ids: string[]) =>
    ids
      .map((id) => PRODUCT_CATEGORIES.find((c) => c.id === id))
      .filter((c): c is (typeof PRODUCT_CATEGORIES)[number] => Boolean(c))
  // pickCategories は PRODUCT_CATEGORIES（非公開カテゴリ除外済み）から引くので、
  // 'mac' は PUBLISH_MAC_CATEGORY が立つまで自動的に落ちる
  const appleCategories = pickCategories(['iphone', 'ipad', 'macbook', 'mac', 'watch', 'airpods'])
  // 非公開のあいだは空配列になり、セクションごと描画されない（lib/data/feature-flags.ts）
  const androidCategories = pickCategories(HIDDEN_CATEGORY_IDS.length > 0 ? [] : ['pixel', 'galaxy'])

  const renderCategoryCard = (cat: (typeof PRODUCT_CATEGORIES)[number]) => (
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
      <Link prefetch={false} href={`${cat.basePath}/`} className="m-btn m-btn--primary m-btn--block u-w-full">
        おすすめ機種をチェック <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </Link>
    </article>
  )

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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1200px"
        />
        <div className="hero--top__overlay" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-content hero-content--center">
            <h1 className="hero-title hero-title--top">
              中古・型落ちデジタルデバイスを賢く選ぶ。
            </h1>
            <p className="hero-subtitle--top">
              中古・型落ちデジタルデバイスのおすすめ機種と賢い選び方を解説
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
          {/* Apple製品 */}
          <h2 className="m-section-heading m-section-heading--lg">中古Apple製品を探す</h2>
          <p className="m-section-desc">気になる製品カテゴリを選んで、選び方・おすすめ機種・中古相場をチェック</p>
          {/* Apple製品は6カテゴリ。5colだと5+1でAirPodsが1枚だけ孤立するため3col（3+3）にする */}
          <div className="l-grid l-grid--3col l-grid--gap-lg">
            {appleCategories.map(renderCategoryCard)}
          </div>

          {/* Androidスマホ。非公開のあいだは見出しごと出さない */}
          {androidCategories.length > 0 && (
            <>
              <h2 className="m-section-heading m-section-heading--lg" style={{ marginTop: 'var(--space-3xl)' }}>
                中古Androidスマホを探す
              </h2>
              {/* Apple 側と対になる説明文。Android は Google / Samsung が機種ごとの
                  OSアップデート提供年数を公表しており、サポート期限を推定ではなく
                  実値で出せる（Apple 側は発売日からの推定）。そこを差として書く */}
              <p className="m-section-desc">
                Pixel・Galaxyそれぞれの選び方とおすすめ機種、メーカー公表のサポート期限と中古相場をチェック
              </p>
              {/* Apple側と同じ 3col。列数が違うとカード幅が揃わず、
                  2枚しかない Android 側だけ極端に細くなる */}
              <div className="l-grid l-grid--3col l-grid--gap-lg">
                {androidCategories.map(renderCategoryCard)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── サイトの特徴 ── */}
      <section id="features" className="l-section">
        <div className="l-container">
          <h2 className="m-section-heading m-section-heading--lg">ユーズドラボの特徴</h2>
          <p className="m-section-desc">中古・型落ちデジタルデバイス選びに必要な情報をワンストップで提供します</p>

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
      <section className="l-section deferred-render">
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
                <Link prefetch={false} href="/profile/" className="top-about-card__text-link">
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
