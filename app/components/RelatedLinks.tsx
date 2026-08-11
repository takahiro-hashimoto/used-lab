/**
 * 関連記事リンクセクション（Server Component）
 * - 並び順は各カテゴリの配列定義順
 * - 全カテゴリ共通で利用
 */

import { ReactNode } from 'react'
import type { RelatedLinkMeta } from '@/lib/data/related-links'
import { isHiddenPath } from '@/lib/data/feature-flags'
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
  /** 2機種比較リンク（iPhoneのみ） */
  compareLinks?: RelatedLinkMeta[]
  /** グリッドのカラム数（デフォルト: 2） */
  columns?: 2 | 3
  /** セクション末尾に追加するコンテンツ */
  children?: ReactNode
}

export default async function RelatedLinks({
  links,
  heading = '関連記事',
  description = '',
  excludeHref,
  compareLinks,
  columns,
  children,
}: Props) {
  // 除外処理。
  // カテゴリ横断のリンク（MacBook から /mac/ など）が混ざるため、
  // 自ページの除外に加えて非公開カテゴリへのリンクもここで落とす。
  // これをやらないと未公開のページへの導線が記事下に出てしまう
  const excludes = excludeHref
    ? Array.isArray(excludeHref) ? excludeHref : [excludeHref]
    : []
  const filtered = links.filter(
    (l) => !excludes.includes(l.href) && !isHiddenPath(l.href),
  )

  return (
    <RelatedLinksClient
      links={filtered}
      heading={heading}
      description={description}
      compareLinks={compareLinks}
      columns={columns}
    >
      {children}
    </RelatedLinksClient>
  )
}
