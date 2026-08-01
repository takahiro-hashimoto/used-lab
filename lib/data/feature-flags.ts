// ============================================================
// 公開フラグ
//
// Pixel / Galaxy はページ・データとも実装済みだが、まだ公開していない。
// 定義を消してしまうと公開時に書き戻す手間と漏れが出るため、
// 定義は残したまま「外に出る導線」だけをここで一括制御する。
// ============================================================

/**
 * Pixel / Galaxy カテゴリを公開するか。
 *
 * false の間、以下から除外される:
 * - ヘッダーナビ / フッターリンク / サイトマップページ（lib/routes.ts）
 * - sitemap.xml（app/sitemap.ts）
 * - トップページのカテゴリ導線（app/(public)/page.tsx）
 * - 記事下のカテゴリ横断リンク（app/components/CrossCategoryLinks.tsx）
 * - 関連リンク（lib/data/related-links.ts）
 * - llms.txt / llms-full.txt（lib/llms-builder.ts）
 * - iPhone詳細ページの「同じ予算で狙える他のモデル」の横断対象
 *
 * 公開するときは true にするだけでよい（app/(public)/pixel, /galaxy のページ本体が必要）。
 */
export const PUBLISH_ANDROID_CATEGORIES = true

/** 非公開カテゴリのID。公開フラグが立てば空になる */
export const HIDDEN_CATEGORY_IDS: readonly string[] = PUBLISH_ANDROID_CATEGORIES
  ? []
  : ['pixel', 'galaxy']

/** カテゴリIDが非公開か */
export function isHiddenCategory(id: string): boolean {
  return HIDDEN_CATEGORY_IDS.includes(id)
}

/** パスが非公開カテゴリ配下か（"/pixel/xxx/" など） */
export function isHiddenPath(path: string): boolean {
  return HIDDEN_CATEGORY_IDS.some((id) => path.startsWith(`/${id}/`) || path === `/${id}`)
}
