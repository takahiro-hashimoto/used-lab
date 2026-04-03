import Link from 'next/link'

type CategoryInfo = {
  href: string
  title: string
  desc: string
  icon: string
}

const ALL_CATEGORIES: CategoryInfo[] = [
  { href: '/iphone/', title: '中古iPhone全モデル比較', desc: 'iPhoneの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-mobile-screen-button' },
  { href: '/ipad/', title: '中古iPad全モデル比較', desc: 'iPadの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-tablet-screen-button' },
  { href: '/macbook/', title: '中古MacBook全モデル比較', desc: 'MacBookの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-laptop' },
  { href: '/watch/', title: '中古Apple Watch全モデル比較', desc: 'Apple Watchの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-clock' },
  { href: '/airpods/', title: '中古AirPods全モデル比較', desc: 'AirPodsの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-headphones' },
]

type Props = {
  /** 現在のカテゴリパス（除外用） e.g. '/iphone/' */
  currentCategory: string
}

export default function CrossCategoryLinks({ currentCategory }: Props) {
  const links = ALL_CATEGORIES.filter((c) => c.href !== currentCategory)

  return (
    <div className="u-mt-2xl">
      <h3
        className="m-section-heading m-section-heading--md u-mb-md"
        style={{ textAlign: 'left' }}
      >
        他のApple製品も検討
      </h3>
      <div className="l-grid l-grid--2col" style={{ marginTop: 'var(--space-md)' }}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="m-card m-card--shadow related-link-card related-link-card--icon m-card--hoverable"
          >
            <span className="related-link-card__icon m-icon-box m-icon-box--sm">
              <i className={item.icon} aria-hidden="true" />
            </span>
            <p className="related-link-card__title">{item.title}</p>
            <p className="related-link-card__desc">{item.desc}</p>
            <span className="related-link-card__arrow">
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
