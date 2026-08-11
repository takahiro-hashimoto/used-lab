// 移行前後の突き合わせ用スナップショットを取る（読み取りのみ）
//
//   node --env-file=.env.local scripts/migration/snapshot.mjs old
//   node --env-file=.env.local scripts/migration/snapshot.mjs new
//
// scripts/migration/out/snapshot-<target>.json に出力する。
// 全テーブルの件数と、行の中身から作った安定ハッシュを記録するので、
// リストア後に verify.mjs で「1行も欠けていないか」を確認できる。

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { conn, listTables, fetchAll, checksum, orderColumnOf } from './lib.mjs'

const target = process.argv[2]
if (target !== 'old' && target !== 'new') {
  console.error('使い方: node --env-file=.env.local scripts/migration/snapshot.mjs <old|new>')
  process.exit(1)
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), 'out')
mkdirSync(outDir, { recursive: true })

const c = conn(target)
console.log(`[${target}] ${c.url}`)

const tables = await listTables(c)
const snapshot = { target, url: c.url, tables: {} }

for (const t of tables) {
  try {
    // 1行だけ先に取って並び順に使える列を決める
    const probe = await fetchAll(c, `${t}?limit=1`.replace('?limit=1', ''), null).catch(() => [])
    const orderCol = orderColumnOf(probe)
    const rows = orderCol ? await fetchAll(c, t, orderCol) : probe
    snapshot.tables[t] = { count: rows.length, checksum: checksum(rows), orderCol }
    console.log(`  ${t.padEnd(34)} ${String(rows.length).padStart(5)}行  ${snapshot.tables[t].checksum}`)
  } catch (e) {
    snapshot.tables[t] = { error: String(e.message ?? e) }
    console.log(`  ${t.padEnd(34)} 取得失敗: ${e.message ?? e}`)
  }
}

const file = join(outDir, `snapshot-${target}.json`)
writeFileSync(file, JSON.stringify(snapshot, null, 2))
console.log(`\n${tables.length}テーブル → ${file}`)
