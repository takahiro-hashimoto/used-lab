# 価格取得スクリプト移植計画

## 概要
GAS（Google Apps Script）の楽天API価格取得スクリプトを Next.js プロジェクト内の Node.js スクリプトとして移植し、GitHub Actions の cron で毎日自動実行する。

## 構成

### 新規作成ファイル
```
scripts/
  fetch-prices.ts          ← メインエントリポイント（全製品を順番に実行）
  lib/
    rakuten-api.ts         ← 楽天API呼び出し共通ロジック
    config.ts              ← 環境変数・定数管理
    supabase-client.ts     ← スクリプト用Supabaseクライアント（Service Role Key使用）
    iphone.ts              ← iPhone価格取得（NGキーワード・マッチング含む）
    ipad.ts                ← iPad価格取得
    watch.ts               ← Watch価格取得
    airpods.ts             ← AirPods価格取得
    utils.ts               ← 共通ユーティリティ（extractMinCapacity, extractMinSize等）
.github/
  workflows/
    fetch-prices.yml       ← GitHub Actions ワークフロー（cron設定）
```

### 変更ファイル
```
.env.local                 ← 楽天API用の環境変数追加
package.json               ← tsx 依存追加 + スクリプト実行コマンド追加
```

## 環境変数（.env.local に追加）
```
RAKUTEN_APP_ID=1062964512439957797
RAKUTEN_AFFILIATE_ID=146d79aa.7a7900a1.146d79ab.cab55273
SUPABASE_SERVICE_ROLE_KEY=（Supabaseダッシュボードから取得）
```

※ `SUPABASE_SERVICE_ROLE_KEY` はフロントエンドから使わないため `NEXT_PUBLIC_` を付けない

## 処理フロー

1. Supabase から `show=1` の全モデルを取得（各製品テーブル）
2. モデルごとに楽天APIで3ショップの価格を取得
3. 取得した価格を各 `*_price_logs` テーブルに INSERT
4. ログ出力で結果を確認

## GitHub Actions 設定
- **実行時間**: 毎日 JST 6:00（UTC 21:00）
- **手動実行**: `workflow_dispatch` で手動トリガーも可能
- **環境変数**: GitHub Secrets に設定
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RAKUTEN_APP_ID`
  - `RAKUTEN_AFFILIATE_ID`

## 楽天APIレートリミット対策
- 各APIリクエスト間に 1.1秒の sleep
- 1モデルあたり最大 3ショップ × 4ページ = 12リクエスト（約13秒）
- GitHub Actions は最大6時間実行可能なので余裕

## GASからの主な変更点
- `UrlFetchApp.fetch` → `fetch`（Node.js native）
- `Utilities.sleep` → `await new Promise(r => setTimeout(r, ms))`
- SpreadsheetApp → Supabase INSERT
- PHP API送信 → 削除（Supabase直接書き込みに統一）
- `console.log` はそのまま使用
- 型安全性を TypeScript で担保

## 依存パッケージ追加
- `tsx` (devDependencies) — TypeScript スクリプトの直接実行
- `dotenv` (devDependencies) — .env.local の読み込み（GitHub Actions では不要だがローカル実行用）
