// 旧DBと新DBのスナップショットを突き合わせる
//
//   node scripts/migration/verify.mjs
//
// 差分があれば終了コード1で落ちる。切り替え前のゲートとして使う。

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = join(dirname(fileURLToPath(import.meta.url)), 'out')
const read = (t) => {
  try {
    return JSON.parse(readFileSync(join(outDir, `snapshot-${t}.json`), 'utf8'))
  } catch {
    console.error(`snapshot-${t}.json がありません。先に snapshot.mjs ${t} を実行してください。`)
    process.exit(1)
  }
}

const oldSnap = read('old')
const newSnap = read('new')

console.log(`旧: ${oldSnap.url}`)
console.log(`新: ${newSnap.url}\n`)

const names = [...new Set([...Object.keys(oldSnap.tables), ...Object.keys(newSnap.tables)])].sort()
const problems = []

for (const t of names) {
  const a = oldSnap.tables[t]
  const b = newSnap.tables[t]

  if (!b) { problems.push(`${t}: 新DBに存在しない`); console.log(`✗ ${t.padEnd(34)} 新DBに無い`); continue }
  if (!a) { console.log(`+ ${t.padEnd(34)} 新DBのみ（移行後に作ったものなら想定内）`); continue }
  if (a.error || b.error) { problems.push(`${t}: 取得エラー`); console.log(`✗ ${t.padEnd(34)} 取得エラー`); continue }

  if (a.count !== b.count) {
    problems.push(`${t}: 件数 ${a.count} → ${b.count}`)
    console.log(`✗ ${t.padEnd(34)} 件数ちがい ${a.count} → ${b.count}`)
  } else if (a.checksum !== b.checksum) {
    // 件数は同じだが中身が違う。相場ログは移行中も cron が書くのでズレて当然
    const volatile = t.endsWith('_price_logs')
    const mark = volatile ? '△' : '✗'
    if (!volatile) problems.push(`${t}: 件数は同じだが内容が違う`)
    console.log(`${mark} ${t.padEnd(34)} 内容ちがい（${a.count}行）${volatile ? ' ※価格ログは更新され得るので要目視' : ''}`)
  } else {
    console.log(`✓ ${t.padEnd(34)} ${String(a.count).padStart(5)}行 一致`)
  }
}

console.log()
if (problems.length) {
  console.log(`要対応 ${problems.length}件:`)
  problems.forEach((p) => console.log('  - ' + p))
  process.exit(1)
}
console.log('全テーブル一致。切り替えに進めます。')
