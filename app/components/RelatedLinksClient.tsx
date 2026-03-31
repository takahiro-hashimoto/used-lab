'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getHeroImage } from '@/lib/data/hero-images'
import type { RelatedLinkMeta } from '@/lib/data/related-links'

type Props = {
  links: RelatedLinkMeta[]
  sourcePath: string
  heading: string
  description: string
  /** 2機種比較リンク（iPhoneのみ） */
  compareLinks?: RelatedLinkMeta[]
  /** グリッドのカラム数（デフォルト: 2） */
  columns?: 2 | 3
}

export default function RelatedLinksClient({
  links,
  sourcePath,
  heading,
  description,
  compareLinks,
  columns = 2,
}: Props) {
  function handleClick(destPath: string) {
    if (typeof navigator?.sendBeacon === 'function') {
      navigator.sendBeacon(
        '/api/related-click',
        JSON.stringify({ source: sourcePath, dest: destPath })
      )
    }
  }

  return (
    <section className="l-section" id="related" aria-labelledby="heading-related">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-related">
          {heading}
        </h2>
        <p className="m-section-desc">{description}</p>

        {/* 比較記事（iPhoneのみ） */}
        {compareLinks && compareLinks.length > 0 && (
          <>
            <h3
              className="m-section-heading m-section-heading--md"
              style={{ textAlign: 'left', marginBottom: 'var(--space-md)' }}
            >
              2機種比較
            </h3>
            <div className="l-grid l-grid--2col l-grid--gap-lg" style={{ marginBottom: 'var(--space-2xl)' }}>
              {compareLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="m-card m-card--shadow m-card--hoverable"
                  style={{ padding: 'var(--space-md) var(--space-lg)', display: 'block', textDecoration: 'none' }}
                  onClick={() => handleClick(item.href)}
                >
                  <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* 比較記事ありの場合のサブ見出し */}
        {compareLinks && compareLinks.length > 0 && (
          <h3
            className="m-section-heading m-section-heading--md"
            style={{ textAlign: 'left', marginBottom: 'var(--space-md)' }}
          >
            関連記事
          </h3>
        )}

        <div className={`l-grid l-grid--${columns}col l-grid--gap-lg`}>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="m-card m-card--shadow related-link-card m-card--hoverable"
              onClick={() => handleClick(item.href)}
            >
              <Image
                src={getHeroImage(item.href)}
                alt={item.title}
                className="related-link-card__img"
                width={400}
                height={300}
                loading="lazy"
              />
              <div className="related-link-card__body">
                <p className="related-link-card__title">{item.title}</p>
                <p className="related-link-card__desc">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
