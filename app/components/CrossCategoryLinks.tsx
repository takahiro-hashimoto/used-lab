import Link from 'next/link'
import { isHiddenPath } from '@/lib/data/feature-flags'

type CategoryInfo = {
  href: string
  title: string
  desc: string
  icon: string
}

const ALL_CATEGORIES: CategoryInfo[] = [
  { href: '/iphone/', title: '中古iPhoneのおすすめ・選び方', desc: 'iPhoneの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-mobile-screen-button' },
  { href: '/pixel/', title: '中古Google Pixelのおすすめ・選び方', desc: 'Google Pixelの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-mobile-screen' },
  { href: '/galaxy/', title: '中古Samsung Galaxyのおすすめ・選び方', desc: 'Samsung Galaxyの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-mobile-screen' },
  { href: '/ipad/', title: '中古iPadのおすすめ・選び方', desc: 'iPadの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-tablet-screen-button' },
  { href: '/macbook/', title: '中古MacBookのおすすめ・選び方', desc: 'MacBookの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-laptop' },
  { href: '/watch/', title: '中古Apple Watchのおすすめ・選び方', desc: 'Apple Watchの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-clock' },
  { href: '/airpods/', title: '中古AirPodsのおすすめ・選び方', desc: 'AirPodsの選び方・おすすめモデルを紹介', icon: 'fa-solid fa-headphones' },
]

type Props = {
  /** 現在のカテゴリパス（除外用） e.g. '/iphone/' */
  currentCategory: string
}

export default function CrossCategoryLinks({ currentCategory }: Props) {
  // 非公開カテゴリは出さない（lib/data/feature-flags.ts）
  const links = ALL_CATEGORIES.filter((c) => c.href !== currentCategory && !isHiddenPath(c.href))

  return (
    <div className="u-mt-2xl">
      <h3
        className="m-section-heading m-section-heading--md u-mb-md"
        style={{ textAlign: 'left' }}
      >
        他のデバイスも検討
      </h3>
      <div className="l-grid l-grid--2col" style={{ marginTop: 'var(--space-md)' }}>
        {links.map((item) => (
          <Link prefetch={false}
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
