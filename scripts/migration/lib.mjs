// Supabase 移行ツールの共通処理
//
// 接続先は2系統。旧DB（現行）と新DB（移行先）を同じコードで扱う。
//   旧: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY
//   新: NEW_SUPABASE_URL        / NEW_SUPABASE_SERVICE_ROLE_KEY
// 新DB側は .env.local に追記して使う（移行が終わったら消してよい）。

import { createHash } from 'node:crypto'

/** PostgREST のデフォルト上限は1000行。全件取るには必ずページングする */
const PAGE = 1000

export function conn(target) {
  // 切り替えの前後どちらでも動くようにする。
  // OLD_* / NEW_* を明示していればそれを使い、無ければ NEXT_PUBLIC_* にフォールバックする。
  // （切り替え後は NEXT_PUBLIC_* が新DBを指すので、旧DBは OLD_* が無いと辿れない）
  const isNew = target === 'new'
  const url = isNew
    ? (process.env.NEW_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)
    : (process.env.OLD_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)
  const key = isNew
    ? (process.env.NEW_SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY)
    : (process.env.OLD_SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (!url || !key) {
    throw new Error(
      isNew
        ? '新DBの接続情報がありません（NEW_SUPABASE_URL / NEW_SUPABASE_SERVICE_ROLE_KEY）。'
        : '旧DBの接続情報がありません（OLD_SUPABASE_URL / OLD_SUPABASE_SERVICE_ROLE_KEY）。',
    )
  }
  return { url: url.replace(/\/$/, ''), headers: { apikey: key, Authorization: `Bearer ${key}` } }
}

/** そのプロジェクトに存在するテーブル名を OpenAPI スキーマから取る */
export async function listTables({ url, headers }) {
  const res = await fetch(`${url}/rest/v1/`, { headers })
  if (!res.ok) throw new Error(`スキーマ取得に失敗: ${res.status}`)
  const spec = await res.json()
  return Object.keys(spec.definitions ?? {}).sort()
}

/** 1テーブルを全件取得（ページング）。順序を固定しないと差分比較が安定しない */
export async function fetchAll({ url, headers }, table, orderCol) {
  const rows = []
  for (let offset = 0; ; offset += PAGE) {
    const order = orderCol ? `&order=${orderCol}.asc` : ''
    const res = await fetch(`${url}/rest/v1/${table}?select=*${order}&limit=${PAGE}&offset=${offset}`, { headers })
    if (!res.ok) throw new Error(`${table} の取得に失敗: ${res.status} ${await res.text()}`)
    const page = await res.json()
    rows.push(...page)
    if (page.length < PAGE) break
  }
  return rows
}

/** 並び順とキー順に依存しない安定ハッシュ。行の中身が同じなら同じ値になる */
export function checksum(rows) {
  const norm = rows
    .map((r) => JSON.stringify(Object.keys(r).sort().map((k) => [k, r[k]])))
    .sort()
  return createHash('sha256').update(norm.join('\n')).digest('hex').slice(0, 16)
}

/** id 列があれば id、無ければ主キーらしき列で並べる */
export function orderColumnOf(rows) {
  if (!rows.length) return null
  const keys = Object.keys(rows[0])
  return ['id', 'slug', 'logged_at'].find((k) => keys.includes(k)) ?? null
}
