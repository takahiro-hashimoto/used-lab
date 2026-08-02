/**
 * コンテンツ鮮度チェック
 *
 * 新機種が発売されたときに「記事の比較対象が古いまま残る」事故を防ぐ。
 * lib/data/current-models.ts（サイト全体で参照する現行機種の唯一の定義）と
 * Supabase 上の実データを突合し、ズレていればエラーで終了する。
 *
 * 使い方:
 *   npx tsx scripts/check-content-freshness.ts
 *
 * build 時は npm run build:checks から自動実行される。
 *
 * DB に接続できない環境（オフライン等）ではスキップして正常終了する。
 * ビルドを止めるのは「DB に接続できて、かつ内容がズレている」ときだけ。
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { CURRENT_MODELS, CURRENT_WATCH_ULTRA, type CurrentModel } from '../lib/data/current-models'
import { RECOMMEND_SLUGS as IPHONE_SLUGS } from '../lib/data/iphone-recommend'
import { RECOMMEND_SLUGS as IPAD_SLUGS } from '../lib/data/ipad-recommend'
import { RECOMMEND_SLUGS as MACBOOK_SLUGS } from '../lib/data/macbook-recommend'
import { RECOMMEND_SLUGS as WATCH_SLUGS } from '../lib/data/watch-recommend'
import { RECOMMEND_SLUGS as AIRPODS_SLUGS } from '../lib/data/airpods-recommend'
import { RECOMMEND_SLUGS as PIXEL_SLUGS } from '../lib/data/pixel-recommend'
import { RECOMMEND_SLUGS as GALAXY_SLUGS } from '../lib/data/galaxy-recommend'

config({ path: '.env.local' })

// ---------- カテゴリごとのテーブル定義 ----------
type TableSpec = {
  table: string
  /** チップ名が入っている列。airpods だけ chip、他は cpu */
  chipColumn: 'cpu' | 'chip'
  /** score_multi 列を持つか（watch / airpods は Geekbench 列を持たない） */
  hasScore: boolean
  /** そのカテゴリのおすすめ機種 slug を持つファイル */
  recommendFile: string
  /** おすすめ機種の slug 一覧 */
  recommendSlugs: readonly string[]
}

const TABLES: Record<keyof typeof CURRENT_MODELS, TableSpec> = {
  iphone: { table: 'iphone_models', chipColumn: 'cpu', hasScore: true, recommendFile: 'lib/data/iphone-recommend.ts', recommendSlugs: IPHONE_SLUGS },
  ipad: { table: 'ipad_models', chipColumn: 'cpu', hasScore: true, recommendFile: 'lib/data/ipad-recommend.ts', recommendSlugs: IPAD_SLUGS },
  macbook: { table: 'macbook_models', chipColumn: 'cpu', hasScore: true, recommendFile: 'lib/data/macbook-recommend.ts', recommendSlugs: MACBOOK_SLUGS },
  watch: { table: 'watch_models', chipColumn: 'cpu', hasScore: false, recommendFile: 'lib/data/watch-recommend.ts', recommendSlugs: WATCH_SLUGS },
  airpods: { table: 'airpods_models', chipColumn: 'chip', hasScore: false, recommendFile: 'lib/data/airpods-recommend.ts', recommendSlugs: AIRPODS_SLUGS },
  pixel: { table: 'pixel_models', chipColumn: 'cpu', hasScore: true, recommendFile: 'lib/data/pixel-recommend.ts', recommendSlugs: PIXEL_SLUGS },
  galaxy: { table: 'galaxy_models', chipColumn: 'cpu', hasScore: true, recommendFile: 'lib/data/galaxy-recommend.ts', recommendSlugs: GALAXY_SLUGS },
}

/** DB の date は "2026/3/11" や "2026/03/11" 形式。比較用に YYYY-MM-DD へ正規化する */
function normalizeDate(date: string | null): string | null {
  if (!date) return null
  const m = date.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/)
  if (!m) return null
  return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`
}

const errors: string[] = []

function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.log('⏭  Supabase の認証情報が無いためコンテンツ鮮度チェックをスキップしました。')
    return Promise.resolve()
  }
  const supabase: Supabase = createClient(url, key)

  return Promise.all(
    (Object.keys(CURRENT_MODELS) as (keyof typeof CURRENT_MODELS)[]).map(async (category) => {
      const spec = TABLES[category]
      const entry = CURRENT_MODELS[category]
      const { data, error } = await supabase
        .from(spec.table)
        .select(`slug, date, ${spec.chipColumn}${spec.hasScore ? ', score_multi' : ''}`)

      if (error) {
        errors.push(`[${category}] ${spec.table} の取得に失敗しました: ${error.message}`)
        return
      }
      const rows = (data ?? []) as unknown as Record<string, string | number | null>[]
      if (rows.length === 0) {
        errors.push(`[${category}] ${spec.table} が空です。`)
        return
      }

      // --- 1. 基準機種が DB に実在するか ---
      const basis = rows.find((r) => r.slug === entry.basis.slug)
      if (!basis) {
        errors.push(
          `[${category}] 基準機種 slug "${entry.basis.slug}" が ${spec.table} に見つかりません。\n` +
            `   → lib/data/current-models.ts の ${category}.basis.slug を修正してください。`,
        )
        return
      }

      // --- 2. チップ名が DB と一致するか ---
      const dbChip = String(basis[spec.chipColumn] ?? '')
      if (dbChip && dbChip !== entry.basis.chip) {
        errors.push(
          `[${category}] 基準機種のチップ名が DB と不一致です。\n` +
            `   current-models.ts: "${entry.basis.chip}" / DB: "${dbChip}"\n` +
            `   → lib/data/current-models.ts の ${category}.basis.chip を修正してください。`,
        )
      }

      // --- 3. ベンチマークスコアが DB 実値と一致するか ---
      if (spec.hasScore) {
        const dbScore = Number(basis.score_multi ?? 0)
        if (entry.basis.score !== dbScore) {
          errors.push(
            `[${category}] 基準機種のスコアが DB 実値とズレています（買い時判定の性能比がずれます）。\n` +
              `   current-models.ts: ${entry.basis.score} / DB(score_multi): ${dbScore}\n` +
              `   → lib/data/current-models.ts の ${category}.basis.score を ${dbScore} に修正してください。`,
          )
        }
      }

      // --- 4. DB に新機種が入っていないか（本文見直しのトリガー） ---
      const latestInDb = rows
        .map((r) => ({ slug: String(r.slug), date: normalizeDate(r.date as string | null) }))
        .filter((r): r is { slug: string; date: string } => r.date != null)
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug < b.slug ? -1 : 1))[0]

      if (latestInDb && latestInDb.date > entry.latestReleaseDate) {
        errors.push(
          `[${category}] DB に新しい機種が追加されています（前回レビュー: ${entry.reviewedAt}）。\n` +
            `   最新: ${latestInDb.slug}（${latestInDb.date}） / 記録済み: ${entry.latestReleaseDate}\n` +
            `   → 次のファイルの「現行機種との比較」記述を見直してください:\n` +
            entry.reviewTargets.map((f) => `     - ${f}`).join('\n') +
            `\n   → 見直しが終わったら lib/data/current-models.ts の ${category} の\n` +
            `      latestReleaseDate を "${latestInDb.date}" に、reviewedAt を本日の日付に更新してください。\n` +
            `      基準機種そのものを新機種へ移すかどうかも、このタイミングで判断してください。`,
        )
      }

      // --- 5. おすすめ機種 slug が DB に実在するか ---
      const slugs = new Set(rows.map((r) => String(r.slug)))
      for (const slug of spec.recommendSlugs) {
        if (!slugs.has(slug)) {
          errors.push(
            `[${category}] おすすめ機種 slug "${slug}" が ${spec.table} に存在しません。\n` +
              `   → ${spec.recommendFile} の RECOMMEND_SLUGS を修正してください。`,
          )
        }
      }
    }),
  ).then(() => {
    // --- 6. Apple Watch Ultra の基準機種（Series とは別ライン） ---
    return checkUltra(supabase)
  })
}

type Supabase = ReturnType<typeof createClient>

async function checkUltra(supabase: Supabase) {
  const { data, error } = await supabase.from('watch_models').select('slug, cpu')
  if (error) return
  const rows = (data ?? []) as unknown as { slug: string; cpu: string | null }[]
  const ultra: CurrentModel = CURRENT_WATCH_ULTRA
  const row = rows.find((r) => r.slug === ultra.slug)
  if (!row) {
    errors.push(
      `[watch/ultra] 基準機種 slug "${ultra.slug}" が watch_models に見つかりません。\n` +
        `   → lib/data/current-models.ts の CURRENT_WATCH_ULTRA.slug を修正してください。`,
    )
  } else if (row.cpu && row.cpu !== ultra.chip) {
    errors.push(
      `[watch/ultra] チップ名が DB と不一致です。current-models.ts: "${ultra.chip}" / DB: "${row.cpu}"`,
    )
  }
}

main()
  .then(() => {
    if (errors.length > 0) {
      console.error('\n❌ コンテンツの比較対象が古くなっている可能性があります:\n')
      for (const e of errors) console.error(`  ${e}\n`)
      console.error(
        '「最新の◯◯」「現行の◯◯」は文字列で直書きせず、\n' +
          'lib/data/current-models.ts の値を参照してください。\n',
      )
      process.exit(1)
    }
    console.log('✅ 現行機種の定義と DB の内容は一致しています。')
  })
  .catch((e) => {
    // ネットワーク断などでビルドを落とさない。内容のズレだけをエラーにする
    console.log(`⏭  コンテンツ鮮度チェックをスキップしました（${e instanceof Error ? e.message : e}）`)
  })
