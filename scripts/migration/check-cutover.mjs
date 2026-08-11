// 切り替え後の確認（読み取りのみ）
//
//   node --env-file=.env.local scripts/migration/check-cutover.mjs
//
// 差し替え漏れで一番怖いのは Vultr の cron が旧DBに書き続けることなので、
// 「価格ログの最新 logged_at が新旧どちらで進んでいるか」を主に見る。

import { conn } from './lib.mjs'

const PRICE_LOGS = [
  'iphone_price_logs', 'ipad_price_logs', 'macbook_price_logs', 'mac_price_logs',
  'watch_price_logs', 'airpods_price_logs', 'galaxy_price_logs', 'pixel_price_logs',
]

async function latest(c, table) {
  const res = await fetch(`${c.url}/rest/v1/${table}?select=logged_at&order=logged_at.desc&limit=1`, { headers: c.headers })
  if (!res.ok) return null
  const j = await res.json()
  return Array.isArray(j) && j[0] ? j[0].logged_at : null
}

const oldC = conn('old')
let newC = null
try { newC = conn('new') } catch { /* 新DB未設定なら旧のみ表示 */ }

console.log('■ 価格ログの最終書き込み\n')
console.log('  テーブル'.padEnd(26) + '旧DB'.padEnd(24) + (newC ? '新DB' : ''))

const stale = []
for (const t of PRICE_LOGS) {
  const a = await latest(oldC, t)
  const b = newC ? await latest(newC, t) : null
  console.log('  ' + t.padEnd(24) + String(a ?? '-').slice(0, 19).padEnd(24) + (newC ? String(b ?? '-').slice(0, 19) : ''))
  if (newC && a && (!b || new Date(a) > new Date(b))) stale.push(t)
}

if (stale.length) {
  console.log('\n⚠ 旧DBのほうが新しいテーブルがあります:')
  stale.forEach((t) => console.log('   - ' + t))
  console.log('   → Vultr の cron がまだ旧DBを向いています。')
  console.log('     /root/used-lab/.env（または run-fetch.sh）の')
  console.log('     NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY を更新してください。')
}

console.log('\n■ アプリが必要とするテーブルの存在確認（新DB）\n')
const REQUIRED = [
  'iphone_models', 'ipad_models', 'macbook_models', 'mac_models', 'watch_models',
  'airpods_models', 'galaxy_models', 'pixel_models',
  'shops', 'product_shop_links', 'site_config', 'news',
  'mvno_providers', 'mvno_plans', 'refurb_products', 'refurb_observations',
  'ipad_accessories', 'ipad_accessory_compatibility', 'ipad_reviews', 'iphone_reviews',
  // sql/related_link_clicks.sql を流していないと存在しない
  'related_link_clicks',
]
const target = newC ?? oldC
const missing = []
for (const t of REQUIRED) {
  const res = await fetch(`${target.url}/rest/v1/${t}?select=*&limit=1`, { headers: target.headers })
  if (!res.ok) missing.push(t)
}
if (missing.length) {
  console.log('  未作成:')
  missing.forEach((t) => console.log('   - ' + t))
} else {
  console.log('  すべて存在します。')
}

console.log('\n■ RPC の存在確認\n')
const rpcRes = await fetch(`${target.url}/rest/v1/rpc/increment_related_link_click`, {
  method: 'POST',
  headers: { ...target.headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({ p_source_path: '/__migration_probe__', p_dest_path: '/__migration_probe__' }),
})
console.log(rpcRes.ok
  ? '  increment_related_link_click: あり（/__migration_probe__ の行が1件増えるので、気になれば削除してください）'
  : `  increment_related_link_click: 無し → sql/related_link_clicks.sql を実行してください`)
