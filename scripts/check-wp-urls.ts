/**
 * Supabase全テーブルのテキストフィールドにWordPress URLが残っていないかチェック
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const TABLES = [
  'iphone_models',
  'ipad_models',
  'macbook_models',
  'watch_models',
  'airpods_models',
  'product_shop_links',
  'iphone_reviews',
  'ipad_reviews',
  'news',
]

const WP_PATTERN = /wp-content|used-lab\.jp\/wp-|siteguard/i

async function checkTable(table: string) {
  const { data, error } = await supabase.from(table).select('*')
  if (error) {
    console.log(`  ⚠️  ${table}: 取得エラー (${error.message})`)
    return []
  }

  const hits: { table: string; id: unknown; field: string; value: string }[] = []

  for (const row of data ?? []) {
    for (const [field, value] of Object.entries(row)) {
      if (value == null) continue
      const str = typeof value === 'object' ? JSON.stringify(value) : String(value)
      if (WP_PATTERN.test(str)) {
        hits.push({ table, id: row.id, field, value: str.slice(0, 200) })
      }
    }
  }

  return hits
}

async function main() {
  console.log('\n🔍 Supabase内のWordPress URL チェック開始\n')
  const allHits: ReturnType<typeof checkTable> extends Promise<infer T> ? T : never = []

  for (const table of TABLES) {
    process.stdout.write(`  チェック中: ${table} ... `)
    const hits = await checkTable(table)
    if (hits.length === 0) {
      console.log('✅ クリーン')
    } else {
      console.log(`❌ ${hits.length}件ヒット`)
      allHits.push(...hits)
    }
  }

  if (allHits.length === 0) {
    console.log('\n✅ WordPress URLは見つかりませんでした')
    return
  }

  console.log('\n' + '='.repeat(60))
  console.log('❌ 発見されたWordPress URL')
  console.log('='.repeat(60))

  for (const hit of allHits) {
    console.log(`\nテーブル : ${hit.table}`)
    console.log(`ID       : ${hit.id}`)
    console.log(`フィールド: ${hit.field}`)
    console.log(`内容     : ${hit.value}`)
  }
}

main().catch(console.error)
