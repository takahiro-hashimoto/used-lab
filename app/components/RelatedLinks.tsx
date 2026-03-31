/**
 * 関連記事リンクセクション（Server Component）
 * - Supabaseからクリック数を取得してソート
 * - クリックデータがない場合はデフォルト順（配列定義順）にフォールバック
 * - 全カテゴリ共通で利用
 */

import { getRelatedLinkClicks } from '@/lib/queries'
import type { RelatedLinkMeta } from '@/lib/data/related-links'
import RelatedLinksClient from './RelatedLinksClient'

type Props = {
  /** カテゴリのサブページ一覧 */
  links: RelatedLinkMeta[]
  /** セクション見出し */
  heading?: string
  /** セクション説明文 */
  description?: string
  /** 除外するパス（自ページ・recommend等） */
  excludeHref?: string | string[]
  /** 現在のページパス（クリック記録のsource） */
  sourcePath: string
  /** 2機種比較リンク（iPhoneのみ） */
  compareLinks?: RelatedLinkMeta[]
  /** グリッドのカラム数（デフォルト: 2） */
  columns?: 2 | 3
}

export default async function RelatedLinks({
  links,
  heading = '関連記事',
  description = '',
  excludeHref,
  sourcePath,
  compareLinks,
  columns,
}: Props) {
  // 除外処理
  const excludes = excludeHref
    ? Array.isArray(excludeHref) ? excludeHref : [excludeHref]
    : []
  const filtered = excludes.length
    ? links.filter((l) => !excludes.includes(l.href))
    : links

  // クリック数を取得してソート
  const clickMap = await getRelatedLinkClicks(sourcePath)
  const sorted = [...filtered].sort((a, b) => {
    const ca = clickMap[a.href] ?? 0
    const cb = clickMap[b.href] ?? 0
    return cb - ca // クリック数降順
  })

  return (
    <RelatedLinksClient
      links={sorted}
      sourcePath={sourcePath}
      heading={heading}
      description={description}
      compareLinks={compareLinks}
      columns={columns}
    />
  )
}
