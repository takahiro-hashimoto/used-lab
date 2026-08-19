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
| revalidateTag の有効化 | tagCache 未指定で dummy に落ちていた。D1 を割り当て | 4f689b7 |
| 年表記の TZ 依存 | ビルド環境が UTC だと年始に前年表記になる | 344aeba |

ビルドと配信は本番相当で確認済み。`npm run deploy:cf` で
workers.dev へ配信し、主要10ページで Vercel と突き合わせた。

| 確認項目 | 結果 |
|---|---|
| HTTP ステータス | 10ページすべて 200 |
| 出力サイズの差 | 1〜3% |
| 差の正体 | 画像URLのみ（177個が `/_next/image` → `/cdn-cgi/image`） |
| 計測タグ | GTM-5RVN7KJZ が両環境で一致 |
| DB 接続 | Supabase から実データを取得 |
| revalidateTag | D1 に25タグ記録 → REVALIDATED → HIT |

環境変数の不足は無かった。`NEXT_PUBLIC_GA_ID` はどこからも参照されて
いない残骸で、`NEXT_PUBLIC_ENV` は `build:cf` がビルド時に埋め込む。
Worker のシークレットに入れる必要があるのは Supabase の3件と
`REVALIDATE_SECRET` だけで、いずれも登録済み。

## 進捗（2026-08-19 移行完了）

切り替え済み。`used-lab.jp` は Cloudflare Workers が配信している。

| | 項目 | 状態 |
|---|---|---|
| ✅ | Workers Paid 加入 | Free の CPU 10ms 制限では SSR が Error 1102 を出す |
| ✅ | R2 バケット | `used-lab-next-cache` |
| ✅ | D1 + tagCache | `used-lab-next-tag-cache`。revalidateTag 動作確認済み |
| ✅ | Worker のシークレット | 4件（Supabase 3件 + REVALIDATE_SECRET） |
| ✅ | ネームサーバー移行 | Xserver → Cloudflare |
| ✅ | Image Transformations | ソースは used-lab.jp / cf.used-lab.jp に限定 |
| ✅ | 画像 | AVIF 4件を WebP 化して全件通過 |
| ✅ | www → apex | アプリ側のリダイレクトへ移設 |
| ✅ | 本番切替 | ルート方式（下記） |

切替後の実測。

```
server: cloudflare / cf-ray: …-NRT（東京）
主要17ページ 200 ／ /admin/ 404 ／ /api/revalidate-all/ 405
画像 32/32 が webp
価格 DB の最新値と一致
www 308 → apex（末尾スラッシュ保持）
revalidateTag → REVALIDATED → HIT
```

### 切替はカスタムドメインではなくルートで行った

カスタムドメインは既存の A レコードがあると登録できず
（`Hostname 'used-lab.jp' already has externally managed DNS records`）、
先に削除する必要がある。削除から追加までの間ドメインが解決できず、
切り戻しも同じ手順を逆にたどるため二度停止する。

かわりにルートを使った。停止時間がない。

```
1. ルートを追加   used-lab.jp/*      → Worker
2. ルートを追加   www.used-lab.jp/*  → Worker
   ※ DNS がグレーの間は待機状態。本番は Vercel のまま
3. A レコードを 🟠 プロキシ済みへ    ← ここで切替
4. www の CNAME も 🟠 へ
```

**切り戻しはトグルをグレーに戻すだけ。** レコードの再作成が要らず数秒で戻る。
Vercel を残しておく限りこの退路が使える。

### 残っている後始末

| 項目 | 前提 |
|---|---|
| `cf.used-lab.jp` を削除 | Worker のドメインタブ + Images のソース設定、2箇所 |
| Vercel プロジェクトを停止 | 数日運用して問題がないこと |
| `revalidate-after-vercel.yml` を削除 | Vercel 停止時。Cloudflare では不要（後述） |
| `scripts/vercel-ignore-build.mjs` と `vercel.json` を削除 | 同上 |
| GitHub Secrets 4件を削除 | RAKUTEN_APP_ID / RAKUTEN_AFFILIATE_ID / SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY |

### 管理画面に Zero Trust は入れない

Cloudflare Access で本番の `/admin/` を守る構成も検討したが採らなかった。

反映は `lib/admin/forward-revalidate.ts` で解決済みで、ローカルで保存すると
同じタグが本番へ転送される（Cloudflare 版でも動作確認済み）。本番に管理画面を
置く必要がない。

入れる場合は `ADMIN_ENABLED=true` にすることになり、「本番では管理系
Server Action を一律拒否」という防壁が外れる。Server Action はアクションIDで
解決され公開ルートへの POST でも走るため、Access のパス制限だけでは塞げず、
`Cf-Access-Authenticated-User-Email` の検証を別途足す必要がある。
外出先から編集したくなったら、その実装込みで検討すること。

## 残っている手順（Cloudflare 側）

### 1. R2 バケットと D1 を作る（作成済み）

| リソース | 名前 | 用途 |
|---|---|---|
| R2 | `used-lab-next-cache` | 増分キャッシュ（ISR）本体の保存先 |
| D1 | `used-lab-next-tag-cache` | revalidateTag のタグ管理 |

```bash
npx wrangler r2 bucket create used-lab-next-cache
npx wrangler d1 create used-lab-next-tag-cache
```

**D1 を落とすと revalidateTag が黙って無効になる。**
`open-next.config.ts` で `tagCache` を指定しないと既定の `"dummy"` になり、
`writeTags` は何もせず `isStale` は常に `false` を返す。API は `{"ok":true}`
を返すのにページが二度と再生成されない、という気づきにくい壊れ方をする。

バインディング名 `NEXT_TAG_CACHE_D1` はアダプタ側の固定値で変更不可。

### 2. Image Transformations を有効にする

ゾーンの設定で有効化する。**あわせて変換を許可する配信元を必ず絞る。**
`image-loader.ts` は `next.config` の `remotePatterns` を強制しないため、
絞らないと第三者が任意の外部URLを当ゾーン経由で変換でき、費用を負担させられる。

### 3. 環境変数を登録する

ビルドは手元で走らせるので、ビルド時の値は `.env.local` と
`build:cf` が渡す環境変数でまかなえる。Cloudflare 側に登録が要るのは
**実行時に読むものだけ**。

**Worker のシークレット（登録済み・これで足りる）**

| 変数 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ISR 再生成時のデータ取得 |
| `SUPABASE_SERVICE_ROLE_KEY` | 新着情報の取得（公開ページも使う） |
| `REVALIDATE_SECRET` | `/api/revalidate-all` の認可 |

```bash
npx wrangler secret put REVALIDATE_SECRET
```

**要らないもの**

| 変数 | 理由 |
|---|---|
| `NEXT_PUBLIC_ENV` | `build:cf` がビルド時に `production` を埋め込む |
| `NEXT_PUBLIC_GA_ID` | どこからも参照されていない残骸。GTM は layout に直書き |
| `ADMIN_PASSWORD` / `ADMIN_SESSION_TOKEN` | 管理画面はローカル専用にしたので Worker では動かない |
| `RAKUTEN_*` | 価格取得は Vultr の cron が担う |
| `AMAZON_CREATORS_*` | アフィリエイトリンクを全非表示中 |
| `REVALIDATE_TARGET` | ローカル管理画面が本番へ転送するための値 |

GTM が実際に出ているかは、両環境の出力を比べれば確かめられる。

```bash
curl -s https://used-lab.jp/ | grep -o 'GTM-[A-Z0-9]*' | head -1
```

### 4. デプロイは必ず `npm run deploy:cf` を使う

```bash
npm run deploy:cf
```

**`wrangler deploy` を直接使ってはいけない。** R2 への増分キャッシュ投入と
D1 のテーブル作成（`CREATE TABLE revalidations`）が両方スキップされ、
revalidateTag が動かないまま配信される。

`deploy:cf` は `build:cf` を先に走らせる。`opennextjs-cloudflare deploy` は
「Deploy a *built* app」で、単体ではビルドせず既存の `.open-next` を配るため。
実際にこれを踏み、古い成果物が配られて populate-cache が tagCache 名を
照合できず「Tag cache does not need populating」とだけ出て D1 テーブルが
作られなかった。

`build:assets`（CSS結合・FontAwesomeサブセット・生成物）と
`build:checks`（サイトマップ網羅・本文の鮮度・eslint）も含めて走る。
Node は `.node-version` で 24 に固定してある。

### 5. デプロイ後の再検証は不要

Vercel では GitHub Actions（`revalidate-after-vercel.yml`）が
デプロイ成功をトリガーに `/api/revalidate-all` を叩いていた。Vercel の
ISR キャッシュが `.next/cache` 経由でデプロイをまたいで残るためだった。

**Cloudflare では要らない。** `deploy:cf` の populate-cache が
ビルド成果物で R2 を上書きするので、デプロイ直後から中身が新しい。
実測でも、再検証を呼ぶ前の時点でページが最新値になっていた。

Vercel を止めた時点で `revalidate-after-vercel.yml` は発火しなくなるので、
そのタイミングで削除する。併存期間中は Vercel 側に必要なので残す。

他の2経路はドメイン指定なので、切り替えれば自動で Worker に向く。

| 経路 | 宛先 | 切替後 |
|---|---|---|
| Vultr cron（`run-fetch.sh`） | `https://used-lab.jp/api/revalidate-all/` | そのまま動く |
| ローカル管理画面（`REVALIDATE_TARGET`） | 同上 | そのまま動く |
| GitHub Actions | Vercel の deployment_status | 発火しなくなる → 削除 |

### 6. 切り替え

DNS を Cloudflare へ向ける。切り戻せるよう Vercel 側は残しておく。

#### 6-1. ネームサーバー移行（配信は Vercel のまま）

先にドメインを Cloudflare のゾーンに載せる。`/cdn-cgi/image/` は
ゾーンが無いと 404 になるため、画像の検証にはこれが前提になる。

Cloudflare にサイトを追加すると既存レコードを自動で取り込むが、
**A / CNAME が「プロキシ済み」で入る。両方グレー（DNS のみ）に落とす。**
オレンジのままだと配信が Cloudflare 経由に変わってしまい、
ネームサーバーを移すだけのつもりが実質の切り替えになる。

used-lab.jp で最終的に残したのはこの2件だけ。

| 種別 | 名前 | 内容 | プロキシ |
|---|---|---|---|
| A | used-lab.jp | 216.198.79.1 | DNS のみ |
| CNAME | www | 3007ff3f0a519587.vercel-dns-017.com | DNS のみ |

削除したもの。

| レコード | 理由 |
|---|---|
| A `*` → 162.43.94.9 | Xserver のエラーページ（678バイト・noindex）を返すだけ |
| MX | 宛先が `used-lab.jp` = Vercel の IP。メールは元から届かない |
| SPF / DKIM | Xserver からの送信前提。送信していない |
| `_adsp._domainkey` | ADSP は廃止規格（RFC 5617 は Historic）。取り込まれもしない |

問い合わせは Google フォーム（`/contact/`）で、`@used-lab.jp` のメールは
どこでも使っていない。

切替前に、Cloudflare の権威サーバへ直接引いて中身を検証しておくとよい。

```bash
dig +short A used-lab.jp @quinton.ns.cloudflare.com   # → 216.198.79.1
```

#### 6-2. ルート追加 → プロキシ有効化（ここが実際の切替）

Worker に `used-lab.jp` を紐付ける。カスタムドメインではなくルートを使う
理由と手順は「進捗」の節に書いた。要点だけ再掲する。

- カスタムドメインは既存 A レコードの削除が必要で、その間サイトが停止する
- ルートなら DNS のトグルだけで切り替わり、戻すのも同じくトグル1つ
- ルートは DNS がグレーの間は待機状態なので、先に用意しておける

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

### ビルドスキップの仕組みごと不要になる

`vercel.json` の `ignoreCommand` → `scripts/vercel-ignore-build.mjs` は
Vercel 固有。push のたびに走るビルドを、記事以外の変更なら飛ばすためのもの。

Cloudflare では `npm run deploy:cf` を叩いたときだけビルドが走るので、
判定の仕組み自体が要らない。**Vercel を止めた時点で
`scripts/vercel-ignore-build.mjs` と `vercel.json` ごと削除する。**

このスクリプトには 2026-08-19 に直したバグがある（`VERCEL_GIT_PREVIOUS_SHA`
を見ずに `HEAD^..HEAD` だけを見ていたため、複数コミットをまとめて push
すると手前のコミットの変更ごとスキップされた）。移行後は消える前提だが、
併存期間中は必要なので直してある。
