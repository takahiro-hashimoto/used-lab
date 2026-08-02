/**
 * 更新日の記載漏れチェック（push しようとしている変更が対象）
 *
 * lib/data/page-dates.ts は「ページの最終更新日」を手動で管理している。
 * ここを更新し忘れると、本文を書き換えたのに「4月14日更新」と表示され続け、
 * 記事の dateModified（構造化データ）も古いままになる。
 * 表示している情報が事実と違う状態なので、鮮度以前に信頼性の問題になる。
 *
 * 【なぜ「今回の変更ぶん」だけを見るか】
 *   最初は「git の最終コミット日 > PAGE_DATES」で判定したが、
 *   ヘッダー改修や prefetch 一括付与のような本文と無関係な変更まで拾ってしまい、
 *   初回実行で60件の誤検知が出た。これらの日付を上げると「更新していないのに
 *   更新したことにする」ことになり、直したい問題の逆をやってしまう。
 *
 *   そこで push しようとしている範囲（origin/main..HEAD）に絞る。
 *   「今回いじったページなのに日付を触っていない」という、
 *   人が数十秒で判断できる小さなリストだけを出す。
 *
 * 使い方:
 *   npx tsx scripts/check-page-dates.ts             # origin/main..HEAD を検査
 *   npx tsx scripts/check-page-dates.ts --fix       # 該当ページを今日の日付に更新
 *   npx tsx scripts/check-page-dates.ts --range A..B
 *
 * 実行場所は pre-push（scripts/check-pages.sh）。
 * Vercel のビルドは shallow clone で git 履歴が揃わないため build:checks には入れない。
 */

import { execFileSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { PAGE_DATES } from '../lib/data/page-dates'

const PAGE_DATES_FILE = 'lib/data/page-dates.ts'

function git(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf-8' }).trim()
}

/** 検査対象のコミット範囲を決める。上流が無い（初回 push など）ときは null */
function resolveRange(): string | null {
  const explicit = process.argv.indexOf('--range')
  if (explicit >= 0 && process.argv[explicit + 1]) return process.argv[explicit + 1]
  try {
    const upstream = git(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}'])
    return `${upstream}..HEAD`
  } catch {
    return null
  }
}

const range = resolveRange()
if (!range) {
  console.log('⏭  上流ブランチが無いため更新日チェックをスキップしました。')
  process.exit(0)
}

let changed: string[]
try {
  changed = git(['diff', '--name-only', range]).split('\n').filter(Boolean)
} catch {
  console.log('⏭  差分を取得できないため更新日チェックをスキップしました。')
  process.exit(0)
}

if (changed.length === 0) {
  console.log('✅ push する変更がありません。')
  process.exit(0)
}

// PAGE_DATES 自体を今回いじっているなら、日付は意識して触られている
const pageDatesTouched = changed.includes(PAGE_DATES_FILE)

/** 変更ファイル → それが属するページの page.tsx */
function owningPage(file: string): string | null {
  if (!file.startsWith('app/(public)/')) return null
  const page = file.includes('/components/')
    ? `${file.split('/components/')[0]}/page.tsx`
    : file.endsWith('page.tsx')
      ? file
      : null
  return page && existsSync(page) ? page : null
}

const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
const affected = [...new Set(changed.map(owningPage).filter((p): p is string => p != null))]

const stale = affected
  .filter((page) => page in PAGE_DATES)
  .filter((page) => PAGE_DATES[page] !== today)
  .map((page) => ({ page, recorded: PAGE_DATES[page] }))

if (stale.length === 0) {
  console.log('✅ 変更したページの更新日は記載済みです。')
  process.exit(0)
}

if (process.argv.includes('--fix')) {
  let src = readFileSync(PAGE_DATES_FILE, 'utf-8')
  for (const { page } of stale) {
    const escaped = page.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    src = src.replace(
      new RegExp(`('${escaped}':\\s*)'\\d{4}-\\d{2}-\\d{2}'`),
      (_m, prefix: string) => `${prefix}'${today}'`,
    )
  }
  writeFileSync(PAGE_DATES_FILE, src)
  console.log(`✅ ${stale.length}ページの更新日を ${today} にしました（${PAGE_DATES_FILE}）。`)
  process.exit(0)
}

console.error(`\n⚠️  今回変更したページのうち、更新日を触っていないものがあります（${range}）:\n`)
for (const { page, recorded } of stale) {
  console.error(`  ${page.replace('app/(public)/', '')}  （記載: ${recorded}）`)
}
console.error(
  '\n本文を書き換えたなら日付を更新してください: npm run fix:page-dates\n' +
    '表示上の「更新日」と構造化データの dateModified の両方に効きます。\n' +
    '見た目の調整だけで本文を変えていないなら、そのままで問題ありません。\n',
)
// 本文を変えたかどうかは人にしか判断できないので、push は止めずに知らせるだけにする。
// pre-push 側で確認プロンプトを出す。
process.exit(pageDatesTouched ? 0 : 2)
