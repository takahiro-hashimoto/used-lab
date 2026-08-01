import Link from 'next/link'
import { PUBLISH_ANDROID_CATEGORIES } from '@/lib/data/feature-flags'

/**
 * 横断比較ページへのボタン。
 *
 * カテゴリトップは1ブランド内で完結してしまうため、「同じ予算なら他ブランドで
 * 何が買えるか」に進める出口を相場セクションに置く。
 * 相場ページへのCTAと横並びにする想定なので、ボタン単体を返し、
 * 説明文と .guide-section-cta の囲みは呼び出し側が持つ。
 *
 * 3ブランド比較が主題なので、Android カテゴリが非公開の間は出さない。
 */
export default function CrossCompareCta() {
  if (!PUBLISH_ANDROID_CATEGORIES) return null

  return (
    <Link
      prefetch={false}
      href="/smartphone-compare/"
      className="m-btn m-btn--secondary m-btn--block"
    >
      <span>中古スマホを価格帯別に横断比較</span>
      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </Link>
  )
}
