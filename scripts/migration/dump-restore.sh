#!/usr/bin/env bash
# 旧Supabase → 新Supabase へ public スキーマを移す
#
#   bash scripts/migration/dump-restore.sh
#
# 接続先ホストは .env.local の
#   NEXT_PUBLIC_SUPABASE_URL（旧） / NEW_SUPABASE_URL（新）
# から自動で組み立てる。用意するのは DB パスワード2つだけ。
#
#   .env.local に書いておくか（推奨）
#     OLD_DB_PASSWORD=...
#     NEW_DB_PASSWORD=...
#   書いていなければ実行時に聞く（入力は非表示・履歴に残らない）。
#
# IPv4 のみの回線で Direct connection が繋がらない場合だけ、
# Connect → Session pooler の host / port / user を控えて次を足す:
#     OLD_DB_HOST=... / OLD_DB_PORT=... / OLD_DB_USER=...
#     NEW_DB_HOST=... / NEW_DB_PORT=... / NEW_DB_USER=...
#
# 【Supabase CLI と Docker を使わない理由】
# 公式手順が CLI（Docker必須）なのは auth / storage まで運ぶ場合。
# このプロジェクトは Auth ユーザー0人・Storage バケット0個で、
# 移行対象は public スキーマのみ。素の pg_dump / psql で足りる。
#
# 【ダッシュボードの "Restore to a New Project" を使わない理由】
# あの機能はクローンを「元と同じリージョン」に作るため、東京へは移せない。
set -euo pipefail

cd "$(dirname "$0")/../.."
OUT="scripts/migration/out"
mkdir -p "$OUT"

for cmd in pg_dump psql; do
  command -v "$cmd" >/dev/null || {
    echo "$cmd が見つかりません: brew install postgresql@17" >&2; exit 1; }
done

# https://xxxx.supabase.co → db.xxxx.supabase.co
host_from_url() { sed -E 's#^https?://#db.#; s#/.*$##' <<<"$1"; }

OLD_HOST=${OLD_DB_HOST:-$(host_from_url "${NEXT_PUBLIC_SUPABASE_URL:?NEXT_PUBLIC_SUPABASE_URL が未設定です}")}
NEW_HOST=${NEW_DB_HOST:-$(host_from_url "${NEW_SUPABASE_URL:?NEW_SUPABASE_URL が未設定です}")}
OLD_PORT=${OLD_DB_PORT:-5432}; NEW_PORT=${NEW_DB_PORT:-5432}
OLD_USER=${OLD_DB_USER:-postgres}; NEW_USER=${NEW_DB_USER:-postgres}

ask_secret() { local __v=$1 __i; read -r -s -p "$2: " __i; echo; printf -v "$__v" '%s' "$__i"; }
OLD_PW=${OLD_DB_PASSWORD:-}; NEW_PW=${NEW_DB_PASSWORD:-}
[[ -n "$OLD_PW" ]] || ask_secret OLD_PW "旧DBのパスワード（表示されません）"
[[ -n "$NEW_PW" ]] || ask_secret NEW_PW "新DBのパスワード（表示されません）"

old() { PGPASSWORD="$OLD_PW" "$@" -h "$OLD_HOST" -p "$OLD_PORT" -U "$OLD_USER" -d postgres; }
new() { PGPASSWORD="$NEW_PW" "$@" -h "$NEW_HOST" -p "$NEW_PORT" -U "$NEW_USER" -d postgres; }

hint() {
  echo "  IPv4のみの回線だと Direct connection は繋がりません。" >&2
  echo "  Connect → Session pooler の host / port / user を控えて、.env.local に追記してください:" >&2
  echo "    ${1}_DB_HOST=aws-x-ap-northeast-x.pooler.supabase.com" >&2
  echo "    ${1}_DB_PORT=5432" >&2
  echo "    ${1}_DB_USER=postgres.<プロジェクトref>" >&2
}

echo "▶ 接続確認"
echo "  旧: $OLD_USER@$OLD_HOST:$OLD_PORT"
echo "  新: $NEW_USER@$NEW_HOST:$NEW_PORT"
OLD_VER=$(old psql -tAc 'show server_version') || { echo "  旧DBに接続できません" >&2; hint OLD; exit 1; }
NEW_VER=$(new psql -tAc 'show server_version') || { echo "  新DBに接続できません" >&2; hint NEW; exit 1; }
echo "  OK（旧 Postgres $OLD_VER / 新 Postgres $NEW_VER）"

# 取り違え防止。新DB側にすでにテーブルがあれば止める
EXISTING=$(new psql -tAc "select count(*) from information_schema.tables where table_schema='public'")
if [[ "$EXISTING" != "0" ]]; then
  echo "  新DBの public に既に ${EXISTING} テーブルあります。上書き事故を避けるため中断します。" >&2
  exit 1
fi
echo "  新DBは空。続行します"

echo "▶ ダンプ取得（旧DB・読み取りのみ）"
# --no-owner: 所有者の付け替えを避ける。
# 権限(GRANT)は落とさない。anon / service_role の権限がないと Data API から読めなくなる
old pg_dump --schema=public --no-owner --schema-only > "$OUT/schema.raw.sql"
old pg_dump --schema=public --no-owner --data-only   > "$OUT/data.sql"

# 新プロジェクト側に最初から在って、かつ postgres ユーザーでは実行できない文を落とす。
#   CREATE SCHEMA public            … 新プロジェクトにも最初から在る
#   ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin
#                                   … Supabase プラットフォーム側の設定。
#                                     postgres には変更権限が無く、新側にも同じ設定が入っている
# GRANT USAGE ON SCHEMA public などの権限行は残す（消すと Data API から読めなくなる）。
sed -E \
  -e '/^CREATE SCHEMA public;$/d' \
  -e '/^ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin /d' \
  "$OUT/schema.raw.sql" > "$OUT/schema.sql"
wc -l "$OUT/schema.sql" "$OUT/data.sql"

echo "▶ 新DBへリストア（失敗したら丸ごと巻き戻ります）"
PGPASSWORD="$NEW_PW" psql -h "$NEW_HOST" -p "$NEW_PORT" -U "$NEW_USER" -d postgres \
  --single-transaction --variable ON_ERROR_STOP=1 \
  --file "$OUT/schema.sql" \
  --command 'SET session_replication_role = replica' \
  --file "$OUT/data.sql"

echo "▶ 新旧の概況"
Q_TBL="select count(*) from information_schema.tables where table_schema='public'"
Q_RLS="select count(*) from pg_tables where schemaname='public' and rowsecurity"
Q_POL="select count(*) from pg_policies where schemaname='public'"
printf "  %-12s 旧 %-6s 新 %s\n" "テーブル数" "$(old psql -tAc "$Q_TBL")" "$(new psql -tAc "$Q_TBL")"
printf "  %-12s 旧 %-6s 新 %s\n" "RLS有効"   "$(old psql -tAc "$Q_RLS")" "$(new psql -tAc "$Q_RLS")"
printf "  %-12s 旧 %-6s 新 %s\n" "ポリシー数" "$(old psql -tAc "$Q_POL")" "$(new psql -tAc "$Q_POL")"

echo
echo "▶ 完了。次は中身の突き合わせ:"
echo "    node --env-file=.env.local scripts/migration/snapshot.mjs new"
echo "    node scripts/migration/verify.mjs"
