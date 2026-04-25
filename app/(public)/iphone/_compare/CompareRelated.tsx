/**
 * 比較ページ下部の関連記事セクション
 */

import Link from 'next/link'
import Image from 'next/image'

type RelatedItem = {
  href: string
  image: string
  alt: string
  title: string
  desc: string
}

const ITEMS: RelatedItem[] = [
  {
    href: '/iphone/recommend/',
    image: '/images/content/thumbnail/iphone-setting.webp',
    alt: '中古iPhoneおすすめ機種',
    title: '目的別おすすめ中古iPhone',
    desc: '用途に合った狙い目モデルを厳選紹介',
  },
  {
    href: '/iphone/iphone-spec-table/',
    image: '/images/content/thumbnail/iphone-compare.jpg',
    alt: '歴代iPhoneスペック比較表',
    title: '歴代iPhoneスペック比較表',
    desc: '気になる機種の性能差や違いがひと目でわかる',
  },
  {
    href: '/iphone/iphone-camera/',
    image: '/images/content/thumbnail/iphone-camera.jpg',
    alt: 'iPhoneカメラ性能比較',
    title: 'カメラ性能比較',
    desc: '歴代モデルのカメラ機能の違いがわかる',
  },
  {
    href: '/iphone/battery-compare/',
    image: '/images/content/thumbnail/iphone-battery.jpg',
    alt: 'バッテリー容量比較',
    title: 'バッテリー容量比較ランキング',
    desc: '電池持ちのいいiPhoneがひと目でわかる',
  },
  {
    href: '/iphone/benchmark/',
    image: '/images/content/thumbnail/iphone-setting.webp',
    alt: 'ベンチマーク比較ランキング',
    title: 'ベンチマーク比較ランキング',
    desc: '歴代iPhoneのチップ性能をスコアで比較',
  },
  {
    href: '/iphone/storage-guide/',
    image: '/images/content/thumbnail/iphone-storage.jpg',
    alt: 'ストレージ容量ガイド',
    title: 'ストレージ容量ガイド',
    desc: '用途別のおすすめ容量と中古価格を比較',
  },
]

export default function CompareRelated() {
  return (
    <section className="l-section" id="related" aria-labelledby="heading-related">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-related">
          iPhone選びのヒントになる関連記事
        </h2>
        <p className="m-section-desc">
          スペック以外の観点からもiPhone選びをサポートする記事をまとめました。
        </p>

        <div className="l-grid l-grid--2col l-grid--gap-lg">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              className="m-card m-card--shadow related-link-card m-card--hoverable"
              href={item.href}
            >
              <Image
                alt={item.alt}
                loading="lazy"
                width={400}
                height={300}
                className="related-link-card__img"
                src={item.image}
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
