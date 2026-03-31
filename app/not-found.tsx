import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/app/components/Breadcrumb'
import { PRODUCT_CATEGORIES } from '@/lib/routes'
import { placeholder } from '@/lib/placeholder'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。URLが正しいかご確認ください。',
  robots: { index: false, follow: true },
}

/** カテゴリごとの代表画像（静的） */
const CATEGORY_IMAGES: Record<string, string> = {
  iphone: '/images/iphone/iphone16pro.jpg',
  ipad: '/images/ipad/ipad-air-6.jpg',
  macbook: '/images/macbook/mba-13-2024.jpg',
  watch: '/images/watch/watch-10.jpg',
  airpods: '/images/airpods/max-2024.jpg',
}

export default function NotFound() {
  return (
      <main>
        <div className="hero-wrapper">
          <Breadcrumb items={[{ label: 'ページが見つかりません' }]} />
          <header className="hero hero--simple">
            <div className="hero-bg" aria-hidden="true">
              <div className="hero-shape hero-shape-1"></div>
              <div className="hero-shape hero-shape-2"></div>
            </div>
            <div className="hero-inner l-container">
              <div className="hero-content">
                <p className="hero-subtitle--top">404 Not Found</p>
                <h1 className="hero-title">ページが見つかりません</h1>
                <p className="hero-description">
                  お探しのページは移動または削除された可能性があります。
                </p>
              </div>
            </div>
          </header>
        </div>

        <div className="l-sections">
          {/* カテゴリから探す */}
          <section className="l-section">
            <div className="l-container">
              <h2 className="m-section-heading m-section-heading--lg">製品カテゴリから探す</h2>
              <p className="m-section-desc">気になる製品カテゴリを選んで、選び方・おすすめ機種・中古相場をチェック</p>

              <div className="l-grid l-grid--5col l-grid--gap-lg">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <article key={cat.id} className="m-card m-card--shadow listing-pick-card">
                    <figure className="listing-pick-card__figure">
                      <Image
                        src={CATEGORY_IMAGES[cat.id] || placeholder(200, 200, cat.label)}
                        alt={`中古${cat.label}の写真`}
                        className="listing-pick-card__img"
                        width={200}
                        height={200}
                        loading="lazy"
                      />
                    </figure>
                    <div className="listing-pick-card__body">
                      <h3 className="listing-pick-card__name">{cat.label}</h3>
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

        </div>
      </main>
  )
}
