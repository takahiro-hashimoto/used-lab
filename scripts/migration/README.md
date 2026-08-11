# Supabase 東京リージョン移行 手順書

ソウル（ap-northeast-2）→ 東京（ap-northeast-1）へプロジェクトを移す。
Supabase はリージョンを後から変更できないため、**新プロジェクトを作ってデータを移す**。

読者向けページは全て静的（`revalidate: false`）なので、**読者側のダウンタイムは発生しない**。
止まるのは管理画面の書き込みと、Vultr cron の価格ログ取得だけ。

---

## 事前に把握しておくこと

| 項目 | 内容 |
|---|---|
| 移行対象 | 33テーブル / 約23,000行（スペック・相場ログ・サイト設定） |
| 個人情報 | **無し**（同意の取り直しやポリシー改訂は不要） |
| RPC | `increment_related_link_click` … **現行DBには存在しない**（後述） |
| 接続先を持つ場所 | ① ローカル `.env.local` ② Vercel 環境変数 ③ **Vultr の cron** |

③ の差し替え漏れが最大のリスク。旧DBに価格ログが書かれ続けても画面上は正常に見える。

---

## 手順

### 1. 移行前スナップショット（旧DB）

```bash
node --env-file=.env.local scripts/migration/snapshot.mjs old
```

`scripts/migration/out/snapshot-old.json` に全テーブルの件数とハッシュを記録する。

### 2. 東京に新プロジェクトを作成

Supabase ダッシュボード → New project → Region に **Northeast Asia (Tokyo) / ap-northeast-1** を選ぶ。
※ 作成後のリージョン変更はできないので、ここだけは間違えないこと。

### 3. データを移す

準備（初回のみ）:

```bash
brew install postgresql@17
```

Supabase CLI と Docker は不要。移行対象が public スキーマだけのため
（Auth ユーザー0人 / Storage バケット0個 / 管理画面は ADMIN_PASSWORD 認証）。

実行すると host / port / user / パスワードを対話で聞かれる。
値は各プロジェクトの **Connect ボタン → Direct connection → Connection parameters** にある。

```bash
bash scripts/migration/dump-restore.sh
```

- パスワードは画面に表示されず、シェル履歴にも残らない
- 接続文字列(URI)ではなく個別パラメータで渡すので、**記号入りパスワードのURLエンコードが不要**
- IPv4のみの回線では Direct connection が繋がらない。その場合は **Session pooler** の host / port を入力する
- 実行前に新DBが空か確認し、空でなければ中断する（取り違え防止）
- `--single-transaction` なので、失敗したら丸ごと巻き戻る
- 最後にテーブル数 / RLS有効数 / ポリシー数を新旧で並べて表示する

続いて、旧DBに存在しないため運ばれないものを流す。

```
sql/related_link_clicks.sql   ← 現行DBに未適用。新DBでは必ず流す（後述）
```

### 4. 新DBの接続情報を控える

`.env.local` に**追記**する（旧の行はまだ消さない）。

```
NEW_SUPABASE_URL=https://<新プロジェクト>.supabase.co
NEW_SUPABASE_SERVICE_ROLE_KEY=<新プロジェクトの service_role キー>
```

### 5. 移行後スナップショット＋突き合わせ

```bash
node --env-file=.env.local scripts/migration/snapshot.mjs new
node scripts/migration/verify.mjs
```

全テーブルが `✓ 一致` になれば中身は完全に同じ。差分があれば終了コード1で落ちる。

- `*_price_logs` だけは移行中も cron が書くのでズレることがある。`△` は目視で判断
- ここが通るまで接続先は切り替えない

### 6. 接続先を切り替える（3箇所すべて）

| 場所 | 変更するもの |
|---|---|
| ローカル `.env.local` | `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` |
| Vercel（Project Settings → Environment Variables） | 同上。Production / Preview / Development すべて |
| **Vultr の cron** | `/root/used-lab/.env`（または `run-fetch.sh`）内の同じ3つ |

Vercel は環境変数を変えただけでは再ビルドされないことがある。
`vercel.json` の `ignoreCommand` が `app/` `lib/` などの変更しか見ないため、
**ダッシュボードから手動で Redeploy** する。

> Usage への影響: 再デプロイ1回ぶん（117ページを1回生成）のみ。
> `revalidate` は全ページ `false` のままなので、時間経過による再生成は発生しない。

### 7. 切り替え後の確認

```bash
node --env-file=.env.local scripts/migration/check-cutover.mjs
```

- 価格ログの最終書き込みが**新DB側で進んでいるか**（旧が新しければ cron の差し替え漏れ）
- アプリが必要とするテーブルが新DBに揃っているか
- `increment_related_link_click` が新DBに存在するか

翌朝、cron が回ったあとにもう一度実行して、新DB側の `logged_at` が更新されていることを確認する。

### 8. 後片付け

- `.env.local` から `NEW_SUPABASE_*` を削除
- 1〜2週間ほど旧プロジェクトを残し、問題がなければ削除
- `scripts/migration/out/` は履歴として残しても、消してもよい

---

## 移行前に見つかった既存の不具合

**`sql/related_link_clicks.sql` が現行DBに適用されていない。**

- `related_link_clicks` テーブルが存在しない
- `increment_related_link_click` RPC も存在しない
- `/api/related-click` は `supabase.rpc()` の戻り値のエラーを見ていないため、
  **毎回失敗しているのに `{ok:true}` を返している**
- `lib/queries.ts` の関連リンククリック数の取得も同様に失敗している

つまり関連リンクのクリック計測は最初から一度も動いていない。
移行のついでに新DBで `sql/related_link_clicks.sql` を流せば動き出す。
計測が不要なら、逆に `/api/related-click` と呼び出し側を消すほうが素直。
