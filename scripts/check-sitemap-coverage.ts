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
import { join, relative, dirname } from 'path'
import { fileURLToPath } from 'url'
import { getAllStaticRoutes } from '../lib/routes'

// ---------- 除外リスト ----------
// サイトマップに載せなくてよいパス（開発用ページ等）
const EXCLUDED = new Set([
  '/styleguide/',
  '/search/',
  '/airpods/recommend/',
  '/ipad/recommend/',
  '/iphone/recommend/',
  '/macbook/recommend/',
  '/watch/recommend/',
  // 2機種比較ページ（PV僅少のため非公開＝noindex・サイトマップ除外）
  '/iphone/iphone13-13pro-compare/',
  '/iphone/iphone13-14-compare/',
  '/iphone/iphone13pro-14pro-compare/',
  '/iphone/iphone14-14pro-compare/',
  '/iphone/iphone14-15-compare/',
  '/iphone/iphone14pro-15pro-compare/',
  '/iphone/iphone15-15pro-compare/',
  '/iphone/iphone15-16-compare/',
  '/iphone/iphone15pro-16pro-compare/',
  '/iphone/iphone16-16pro-compare/',
  '/iphone/iphone16e-se3-compare/',
  '/iphone/iphone16plus-air-compare/',
])

// ---------- ファイルシステムからルート収集 ----------

const APP_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'app', '(public)')

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

console.log('[build:checks] Checking sitemap coverage...')
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
