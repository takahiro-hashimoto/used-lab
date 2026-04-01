/**
 * サイトマップの掲載漏れチェックスクリプト
 *
 * app/(public)/ 配下の全 page.tsx から導出されるルートと、
 * lib/routes.ts の静的ルート定義を突合し、漏れがあればエラーで終了する。
 *
 * 使い方:
 *   npx tsx scripts/check-sitemap-coverage.ts
 *
 * ビルド前に自動実行したい場合は package.json の build を
 *   "build": "tsx scripts/check-sitemap-coverage.ts && next build"
 * に変更する。
 */

import { readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { getAllStaticRoutes } from '../lib/routes'

// ---------- 除外リスト ----------
// サイトマップに載せなくてよいパス（開発用ページ等）
const EXCLUDED = new Set(['/styleguide/'])

// ---------- ファイルシステムからルート収集 ----------

const APP_DIR = join(__dirname, '..', 'app', '(public)')

function collectPageRoutes(dir: string, routes: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (!statSync(full).isDirectory()) {
      if (entry === 'page.tsx' || entry === 'page.ts') {
        const rel = '/' + relative(APP_DIR, dir).replace(/\\/g, '/') + '/'
        const normalized = rel === '//' ? '/' : rel
        routes.push(normalized)
      }
      continue
    }
    // [slug] 等の動的ルートはスキップ（DB から生成されるため）
    if (entry.startsWith('[')) continue
    // _で始まるディレクトリ（共通コンポーネント等）はスキップ
    if (entry.startsWith('_')) continue
    // components ディレクトリはスキップ
    if (entry === 'components') continue
    collectPageRoutes(full, routes)
  }
  return routes
}

// ---------- メイン ----------

const fsRoutes = collectPageRoutes(APP_DIR)
const registeredPaths = new Set(getAllStaticRoutes().map((r) => r.path))

const missing = fsRoutes.filter(
  (route) => !registeredPaths.has(route) && !EXCLUDED.has(route),
)

if (missing.length > 0) {
  console.error('\n❌ サイトマップ未登録のページがあります:\n')
  for (const m of missing.sort()) {
    console.error(`  - ${m}`)
  }
  console.error(
    '\n→ lib/routes.ts の PRODUCT_CATEGORIES または UTILITY_PAGES に追加してください。',
  )
  console.error(
    '  意図的に除外する場合は scripts/check-sitemap-coverage.ts の EXCLUDED に追加してください。\n',
  )
  process.exit(1)
} else {
  console.log('✅ 全ページがサイトマップに登録済みです。')
}
