# Cloudflare 移行メモ

Vercel から Cloudflare Workers（OpenNext アダプタ）へ移す作業の記録と、
残っている手順。コードの対応は済んでいて、あとは Cloudflare 側の設定が中心。

## なぜ移すのか

Vercel Pro には月$20の利用クレジットが含まれ、インフラ費はそこから差し引かれる。
2026年8月14日の請求ではインフラ小計 $19.98 に対しクレジット $19.97 で、
**余裕が $0.01 しかなかった**。月によっては $80 程度まで膨らむことがある。

内訳を見ると Cloudflare でゼロになる項目が大きい。

| 項目 | Vercel | Cloudflare |
|---|---|---|
| Build CPU 31時間 | $6.51 | $0（Paid は6,000分込み） |
| Fast Origin Transfer 56.2GB | $5.90 | $0（下り無料） |
| ISR Writes 607,157 | $3.09 | 約$2.73（R2 Class A） |
| ISR Reads 6,223,122 | $2.60 | 約$2.24（R2 Class B） |
| プラットフォーム | $20.00 | $5.00 |

Build CPU と Origin Transfer だけでインフラの63%を占めており、この2つが消える。

## 対応済み（コード側）

| | 内容 | コミット |
|---|---|---|
| 実行時のファイルシステム依存を排除 | 画像の実在判定をビルド時の一覧参照へ | d4770fc |
| 同上 | critical CSS を readFileSync からビルド時埋め込みへ | 2d3ce36 |
| Next.js のバージョン | 16.1.6 → 16.3.1（OpenNext は >=16.2.11 を要求） | c317b76 |
| proxy.ts の廃止 | Next 16 の proxy は Node.js ランタイム固定で Edge 化不可 | 48f7ed4 |
| Server Action の認証 | proxy に依存しない自衛（セキュリティ修正も兼ねる） | b492bbd |
| 画像最適化 | Cloudflare Images 用ローダー。DEPLOY_TARGET で分岐 | e503bad |

ビルドと配信はローカルで確認済み。
`npm run build:cf` で完走し、`wrangler dev` で全ページ 200 を確認した。

## 残っている手順（Cloudflare 側）

### 1. R2 バケットを作る

`wrangler.jsonc` が `used-lab-next-cache` を参照している。
増分キャッシュ（ISR）の保存先で、これが無いと再検証が動かない。

```bash
npx wrangler r2 bucket create used-lab-next-cache
```

### 2. Image Transformations を有効にする

ゾーンの設定で有効化する。**あわせて変換を許可する配信元を必ず絞る。**
`image-loader.ts` は `next.config` の `remotePatterns` を強制しないため、
絞らないと第三者が任意の外部URLを当ゾーン経由で変換でき、費用を負担させられる。

### 3. 環境変数を登録する

**ビルド時に必要**（Workers Builds の環境変数）

| 変数 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | 全ページのデータ取得 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 同上 |
| `SUPABASE_SERVICE_ROLE_KEY` | 新着情報の取得（公開ページも使う） |
| `NEXT_PUBLIC_ENV` | `production` を入れると GTM が有効になる |
| `DEPLOY_TARGET` | `cloudflare`。`npm run build:cf` が設定するので通常は不要 |

**実行時に必要**（Worker のシークレット）

| 変数 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ISR 再生成 |
| `SUPABASE_SERVICE_ROLE_KEY` | 管理画面・新着情報 |
| `ADMIN_PASSWORD` | 管理画面のログイン |
| `ADMIN_SESSION_TOKEN` | セッション判定 |
| `REVALIDATE_SECRET` | `/api/revalidate-all` の認可 |
| `NEXT_PUBLIC_ENV` | 同上 |

```bash
npx wrangler secret put ADMIN_SESSION_TOKEN
```

**Cloudflare に不要なもの**（価格取得の cron が Vultr で使う）
`RAKUTEN_*` · `SUPABASE_URL` · `OLD_/NEW_SUPABASE_*`（移行スクリプト用・現在は用済み）

### 4. ビルドコマンドを設定する

Workers Builds のビルドコマンドに次を指定する。

```
npm run build:cf
```

`build:assets`（CSS結合・FontAwesomeサブセット・生成物）と
`build:checks`（サイトマップ網羅・本文の鮮度・eslint）も含めて走る。
Node は `.node-version` で 24 に固定してある（ローカルで検証したのがこの版）。
`package.json` の `engines` は `>=22` にしてあるので、Cloudflare 側が 24 を
選べない場合は `.node-version` を 22 に落として再検証する。

### 5. デプロイ後の再検証を移す

いまは GitHub Actions（`revalidate-after-vercel.yml`）が
Vercel のデプロイ成功をトリガーに `/api/revalidate-all` を叩いている。
Cloudflare へ移したらトリガー元を差し替える。`REVALIDATE_SECRET` は共通。

### 6. 切り替え

DNS を Cloudflare へ向ける。切り戻せるよう Vercel 側は残しておく。

## 管理画面はローカル専用

本番（Vercel / Cloudflare）に `ADMIN_ENABLED` を設定しない。設定しなければ
`/admin/*` は 404 になり、管理系 Server Action も一律で拒否される。
本番に `ADMIN_PASSWORD` / `ADMIN_SESSION_TOKEN` を置く必要もなくなる。

`.env.local` に次を追加する。

```
ADMIN_ENABLED=true
REVALIDATE_TARGET=https://used-lab.jp
REVALIDATE_SECRET=（本番と同じ値）
```

`REVALIDATE_TARGET` を設定すると、保存のたびに本番へ同じタグを送って
キャッシュを無効化する。設定しなければローカル完結（本番は古いまま）。
転送に失敗したらフォームにメッセージが出る。データの保存自体は成功している。

## 判断が要る点

### 東京固定実行がなくなる

いまは `vercel.json` の `regions: ["hnd1"]` で関数を東京に固定し、
東京の Supabase の隣で動かしている。Workers はリクエストを受けた
コロケーションで動くため、遠方からのアクセスは再生成のたびに
東京の Supabase まで往復する。日本からのアクセスが大半なら影響は小さい。

### ビルドスキップが無くなる

`vercel.json` の `ignoreCommand` → `scripts/vercel-ignore-build.mjs` は
Vercel 固有。記事以外の変更でビルドを飛ばしていた。
Cloudflare で同等の仕組みが要るかは、ビルド分が無料枠(6,000分)に
収まるかどうかで判断する。31時間/月なら収まる。
