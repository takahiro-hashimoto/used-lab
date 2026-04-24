# price-info 系 運用チェックリスト

5カテゴリ（iPhone / iPad / MacBook / Watch / AirPods）の price-info ページに共通する確認観点。

---

## 実行コマンド早見表

| 目的 | コマンド |
|---|---|
| price-info 共通ヘルパーのスモークテスト | `npm run verify:price-info` |
| サイトマップ網羅確認（必須） | `npm run verify:required` |
| 内部リンク確認 | `npm run verify:seo` |
| 全確認を一括実行 | `npm run verify:full` |
| ビルド前検証（CI と同じ） | `npm run build:checks` |

---

## 最低確認項目

### 1. 更新日の整合

UI 表示・metadata・JSON-LD の3箇所が同じ日付ソースから組み立てられているか確認する。

- **UI表示** (`dateDisplay`): HeroMeta に渡す日本語形式の日付
- **metadata** (`title`/`description`): `PRICE_INFO_UPDATE_MONTH` 定数
- **JSON-LD** (`dateModified`): `buildPageDates()` が返す `dateModified` (価格ログ由来)
- **整合確認**: `buildPageDates()` の `dateSource` が `'price_logs'` であること。`'now'` の場合は価格ログが空。

実装: すべて `buildPageDates(modelsData)` の返り値を使う。分散して手書きしない。

---

### 2. JSON-LD の必須項目

`buildWebApplicationJsonLd()` が受け取る引数が正しく渡されているか確認する。

必須:
- `name` — ページ固有のタイトル（例: `中古iPhone価格比較ダッシュボード`）
- `description` — ページ固有の説明文
- `url` — `PAGE_URL` 定数（`https://used-lab.jp/...`）
- `modelCount` — `modelsData.length`
- `lowestPrice` — `rankingData[0]?.currentPrice ?? 0`
- `highestPrice` — `rankingData[rankingData.length - 1]?.currentPrice ?? 0`
- `dateModified` — `buildPageDates()` の返り値

---

### 3. ランキング・初期選択の件数

| 確認観点 | 正常値 |
|---|---|
| 最安値ランキング (`rankingData`) | `modelsData.length` と同数 |
| 値下がりランキング (`priceDropRanking`) | 0〜10件（`priceChange < 0` のモデルのみ） |
| チャート初期選択 (`initialSelected`) | 1〜2件（シリーズごとに1機種ずつ） |

`buildRankingData` / `buildPriceDropRanking` / `buildInitialSelected` はすべて
`lib/utils/price-info-helpers.ts` に定義。変更は1ファイルで完結する。

---

### 4. metadata と h1 の整合

`generateMetadata()` の `title` と、ページ内 `<h1>` に表示される文字列が一致していること。

両方とも `buildPriceInfoTitle(categoryLabel, modelCount, PRICE_INFO_UPDATE_MONTH)` から生成する。
`PRICE_INFO_UPDATE_MONTH` は `lib/data/{category}-price-info.ts` に定義。

---

### 5. 価格データがない場合の挙動

- `buildDailyPrices([])` → 空配列を返す（クラッシュしない）
- `prices.length === 0` のモデルは `modelsData` に追加されない（各ページの `if (prices.length === 0) continue`）
- `buildPageDates()` の `dateSource` が `'now'` になる（ログ確認の目安）

---

## ヘルパー一覧と所在

| 関数 | ファイル | 用途 |
|---|---|---|
| `buildDailyPrices` | `lib/utils/price-info-helpers.ts` | 価格ログを日毎に集約 |
| `buildRankingData` | 同上 | 価格安い順のコピーを返す |
| `buildPriceDropRanking` | 同上 | 値下がりランキング（上限10件） |
| `buildInitialSelected` | 同上 | チャートの初期選択ID |
| `buildPageDates` | 同上 | UI/JSON-LD 用の日付を一括組み立て |
| `buildPriceInfoTitle` | `lib/utils/price-info-meta.ts` | メタタイトルの組み立て |
| `buildPriceInfoMetadata` | 同上 | metadata オブジェクト全体の組み立て |
| `buildBreadcrumbJsonLd` | `lib/utils/price-info-jsonld.ts` | パンくず JSON-LD |
| `buildWebApplicationJsonLd` | 同上 | WebApplication JSON-LD |
| `buildFaqJsonLd` | 同上 | FAQPage JSON-LD |

---

## 新カテゴリ追加時の手順

1. `app/(public)/{category}/price-info/page.tsx` を既存ページからコピーして調整
2. 上記ヘルパーをすべて import して使う（ローカル実装は作らない）
3. `lib/data/{category}-price-info.ts` に `PRICE_INFO_UPDATE_MONTH` / `CHART_COLORS` / `FAQ_ITEMS` を定義
4. `npm run verify:price-info` でスモークテストが通ることを確認
5. `npm run verify:required` でサイトマップ網羅を確認
