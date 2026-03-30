/**
 * iPhone 汎用関連記事リンクセクション
 * - 2機種比較リンク（オプション）
 * - iPhone選びに役立つ記事（固定6件・画像付きカード）
 *
 * iphone-spec-table、[slug] 個別ページなどで共通利用
 */

import Link from 'next/link'
import Image from 'next/image'
import { getHeroImage } from '@/lib/data/hero-images'

type LinkItem = {
  href: string
  title: string
  desc: string
}

type Props = {
  /** セクション見出し */
  heading?: string
  /** セクション説明文 */
  description?: string
  /** 2機種比較リンク（該当モデルに関連するもの） */
  compareLinks?: LinkItem[]
  /** 現在のページを除外するパス */
  excludeHref?: string
}

/** 汎用関連記事（全ページ共通） */
const GENERAL_LINKS: LinkItem[] = [
  { href: '/iphone/recommend/', title: '目的別おすすめ中古iPhone', desc: '用途に合った狙い目モデルを厳選紹介' },
  { href: '/iphone/mvno/', title: '中古iPhoneにおすすめの格安SIM', desc: '中古iPhoneで使える格安SIMを比較' },
  { href: '/iphone/iphone-camera/', title: 'カメラ性能比較', desc: '歴代モデルのカメラ機能の違いがわかる' },
  { href: '/iphone/benchmark/', title: 'ベンチマーク比較ランキング', desc: '歴代iPhoneのチップ性能をスコアで比較' },
  { href: '/iphone/battery-compare/', title: 'バッテリー容量比較ランキング', desc: '電池持ちのいいiPhoneがひと目でわかる' },
  { href: '/iphone/storage-guide/', title: 'ストレージ容量ガイド', desc: '用途別のおすすめ容量と中古価格を比較' },
]

export default function IPhoneRelatedLinks({
  heading = 'iPhone選びのヒントになる関連記事',
  description = 'スペック以外の観点からもiPhone選びをサポートする記事をまとめました。',
  compareLinks,
  excludeHref,
}: Props) {
  const filteredLinks = excludeHref
    ? GENERAL_LINKS.filter((l) => l.href !== excludeHref)
    : GENERAL_LINKS

  return (
    <section className="l-section" id="related" aria-labelledby="heading-related">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-related">
          {heading}
        </h2>
        <p className="m-section-desc">{description}</p>

        {/* 比較記事 */}
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

        {/* 汎用関連記事（画像付きカード） */}
        {compareLinks && compareLinks.length > 0 && (
          <h3
            className="m-section-heading m-section-heading--md"
            style={{ textAlign: 'left', marginBottom: 'var(--space-md)' }}
          >
            iPhone選びに役立つ記事
          </h3>
        )}
        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {filteredLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="m-card m-card--shadow related-link-card m-card--hoverable"
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
                <h3 className="related-link-card__title">{item.title}</h3>
                <p className="related-link-card__desc">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
