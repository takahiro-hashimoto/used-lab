/**
 * 記事本文を書く前に読む「DB上の最新機種」一覧
 *
 * カテゴリトップのおすすめ本文などは、型落ち機種を現行機種と比べる構成で書く。
 * その比較対象を記憶や既存本文からコピーすると必ず古くなるため、
 * 本文を生成・更新する前にこのコマンドで DB の実データを確認してから書く。
 *
 *   npm run models:latest              # 全カテゴリ
 *   npm run models:latest -- iphone    # カテゴリ指定
 *
 * 出力されるのは
 *   - いま現行として扱っている基準機種（lib/data/current-models.ts）
 *   - DB 上の新しい機種（発売日の新しい順）
 *   - おすすめとして本文で扱っている機種
 * の3ブロック。この3つを見比べて「何を現行として、何世代ぶんの差として書くか」を決める。
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { CURRENT_MODELS, CURRENT_WATCH_ULTRA } from '../lib/data/current-models'
import { RECOMMEND_SLUGS as IPHONE_SLUGS } from '../lib/data/iphone-recommend'
import { RECOMMEND_SLUGS as IPAD_SLUGS } from '../lib/data/ipad-recommend'
import { RECOMMEND_SLUGS as MACBOOK_SLUGS } from '../lib/data/macbook-recommend'
import { RECOMMEND_SLUGS as WATCH_SLUGS } from '../lib/data/watch-recommend'
import { RECOMMEND_SLUGS as AIRPODS_SLUGS } from '../lib/data/airpods-recommend'
import { RECOMMEND_SLUGS as PIXEL_SLUGS } from '../lib/data/pixel-recommend'
import { RECOMMEND_SLUGS as GALAXY_SLUGS } from '../lib/data/galaxy-recommend'

config({ path: '.env.local' })

type Spec = {
  table: string
  /** 機種名の列。airpods だけ name */
  nameColumn: 'model' | 'name'
  /** 本文で根拠に使う列。存在しない列を混ぜると取得ごと失敗するのでカテゴリ別に持つ */
  columns: string[]
  recommendSlugs: readonly string[]
}

const SPECS: Record<keyof typeof CURRENT_MODELS, Spec> = {
  iphone: {
    table: 'iphone_models', nameColumn: 'model', recommendSlugs: IPHONE_SLUGS,
    columns: ['cpu', 'ram', 'display', 'weight', 'port', 'promotion', 'dynamic_island', 'apple_intelligence', 'video', 'front_camera', 'magsafe', 'strage', 'score_multi'],
  },
  ipad: {
    table: 'ipad_models', nameColumn: 'model', recommendSlugs: IPAD_SLUGS,
    columns: ['cpu', 'ram', 'display', 'weight', 'port', 'promotion', 'apple_intelligence', 'front_camera', 'strage', 'score_multi'],
  },
  macbook: {
    table: 'macbook_models', nameColumn: 'model', recommendSlugs: MACBOOK_SLUGS,
    columns: ['cpu', 'ram', 'display', 'weight', 'port', 'promotion', 'strage', 'battery', 'score_multi'],
  },
  watch: {
    table: 'watch_models', nameColumn: 'model', recommendSlugs: WATCH_SLUGS,
    columns: ['cpu', 'size', 'battery', 'always_on_display', 'fast_charge', 'strage', 'last_watchos'],
  },
  airpods: {
    table: 'airpods_models', nameColumn: 'name', recommendSlugs: AIRPODS_SLUGS,
    columns: ['chip', 'type', 'port', 'anc', 'magsafe'],
  },
  pixel: {
    table: 'pixel_models', nameColumn: 'model', recommendSlugs: PIXEL_SLUGS,
    columns: ['cpu', 'ram', 'display', 'weight', 'refresh_rate', 'battery', 'front_camera', 'strage', 'last_android'],
  },
  galaxy: {
    table: 'galaxy_models', nameColumn: 'model', recommendSlugs: GALAXY_SLUGS,
    columns: ['cpu', 'ram', 'display', 'weight', 'refresh_rate', 'battery', 'front_camera', 'strage', 'last_android'],
  },
}

/** DB の date は "2026/3/11" 表記。並べ替え用に数値化する */
function dateKey(date: string | null): number {
  if (!date) return 0
  const m = date.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/)
  if (!m) return 0
  return Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3])
}

type Row = Record<string, string | number | boolean | null>

function format(row: Row, spec: Spec): string {
  const name = String(row[spec.nameColumn] ?? '')
  const parts = spec.columns
    .filter((c) => row[c] != null && row[c] !== '')
    .map((c) => `${c}=${String(row[c]).replace(/<br\s*\/?>/g, ' / ')}`)
  return `  ${name}（${row.slug} / ${row.date}）\n      ${parts.join(' | ')}`
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.error('Supabase の認証情報（.env.local）が読み込めませんでした。')
    process.exit(1)
  }
  const supabase = createClient(url, key)

  const arg = process.argv[2]
  const categories = (Object.keys(SPECS) as (keyof typeof SPECS)[]).filter((c) => !arg || c === arg)
  if (categories.length === 0) {
    console.error(`不明なカテゴリ: ${arg}\n指定できるのは ${Object.keys(SPECS).join(' / ')} です。`)
    process.exit(1)
  }

  for (const category of categories) {
    const spec = SPECS[category]
    const entry = CURRENT_MODELS[category]
    const { data, error } = await supabase
      .from(spec.table)
      .select(['slug', 'date', spec.nameColumn, ...spec.columns].join(', '))

    console.log(`\n${'='.repeat(70)}\n${category.toUpperCase()}`)
    if (error) {
      console.log(`  取得に失敗しました: ${error.message}`)
      continue
    }
    const rows = ((data ?? []) as unknown as Row[]).sort(
      (a, b) => dateKey(b.date as string) - dateKey(a.date as string),
    )

    console.log(`\n▼ いま現行として本文で扱っている機種（lib/data/current-models.ts）`)
    const basisRow = rows.find((r) => r.slug === entry.basis.slug)
    console.log(basisRow ? format(basisRow, spec) : `  ⚠ slug "${entry.basis.slug}" が DB にありません`)
    if (category === 'watch') {
      const ultraRow = rows.find((r) => r.slug === CURRENT_WATCH_ULTRA.slug)
      console.log(ultraRow ? `  [Ultraライン]\n${format(ultraRow, spec)}` : '')
    }
    console.log(`  最終レビュー: ${entry.reviewedAt} / 記録済みの最新発売日: ${entry.latestReleaseDate}`)

    console.log(`\n▼ DB 上の新しい機種（発売日の新しい順・上位6件）`)
    for (const r of rows.slice(0, 6)) {
      const isNew = dateKey(r.date as string) > dateKey(entry.latestReleaseDate.replace(/-/g, '/'))
      console.log(`${format(r, spec)}${isNew ? '\n      ★ 前回レビュー後に追加された機種' : ''}`)
    }

    console.log(`\n▼ 本文でおすすめとして扱っている機種`)
    for (const slug of spec.recommendSlugs) {
      const r = rows.find((x) => x.slug === slug)
      console.log(r ? format(r, spec) : `  ⚠ slug "${slug}" が DB にありません`)
    }
  }

  console.log(
    `\n${'='.repeat(70)}\n` +
      '本文を書くときは、上の「現行として扱っている機種」と比較する形で論理を組み立てる。\n' +
      '★ が付いた機種があれば、現行の基準を移すかどうかを先に判断すること。\n' +
      '書き終えたら lib/data/current-models.ts の latestReleaseDate / reviewedAt を更新する。\n',
  )
}

main()
