# 新モデル追加チェックリスト

新しいApple製品モデルがリリースされ、DBにデータを追加した後に必要な作業の一覧。
カテゴリ（iPhone / iPad / MacBook / Watch / AirPods）ごとにセクション分けしている。

> **AI向け補足**: このチェックリストは `docs/NEW_MODEL_CHECKLIST.md` に配置。
> 各項目にはファイルパスを記載しているので、Grep/Readで該当箇所を確認し、
> 漏れがないかを自動検証できる。

---

## 共通作業（全カテゴリ共通）

### 1. DB にモデルを INSERT
- [ ] 対象テーブルにレコードを追加（`sql/` 配下に INSERT 文を保存）
- [ ] `show` フラグを `true` に設定（個別ページを公開する場合）
- [ ] `slug` が URL規則に沿っているか確認（例: `17pro`, `mini-7`, `series11`）

### 2. 個別モデルページの動作確認
- [ ] `/[category]/[slug]/` でページが正常に表示されるか確認
- [ ] OGP・メタ情報が正しく生成されているか確認
- [ ] 画像ファイルが `public/images/` 配下に配置されているか

### 3. 関連記事リンク（必要な場合のみ）
- **ファイル**: `lib/data/related-links.ts`
- [ ] 新しいサブページ（比較記事など）を作成した場合のみ、該当カテゴリのリンク配列に追加

---

## iPhone

### A. おすすめページ
- **ファイル**: `lib/data/iphone-recommend.ts`
- [ ] `RECOMMEND_SLUGS` 配列を更新（おすすめに含める場合）
- [ ] `RECOMMEND_META` に新モデルのメタ情報を追加（label, desc, good/bad, cameraLabel, batteryLabel, targetUser）

### B. 購入ガイドページ
- **ファイル**: `lib/data/iphone-guide.ts`
- [ ] `GUIDE_PRICE_SLUGS` に追加（中古相場セクションに表示する場合）
- [ ] `GUIDE_COMPARE_LINKS` に比較ページリンクを追加（比較記事を作成した場合）
- [ ] `GUIDE_MODEL_LINKS` の `pro` / `standard` / `other` 配列に追加

### C. 2機種比較ページ
- **ファイル**: `app/(public)/iphone/_compare/config.ts`
- [ ] `COMPARE_PAGES` に新しい比較ペアを追加（slug, leftSlug, rightSlug, title, description）
- **ファイル**: `app/(public)/iphone/_compare/spec-definitions.ts`
- [ ] 新機能がある場合、スペック定義の説明文を更新

### D. 歴代スペック比較表 — 進化タイムライン
- **ファイル**: `app/(public)/iphone/iphone-spec-table/components/EvolutionTimeline.tsx`
- [ ] `FLAGSHIP_TIMELINE` に新世代のエントリを追加（date, title, columns with models and features）
- [ ] SE系の場合は `SE_TIMELINE` に追加

### E. サポート期間一覧表
- **ファイル**: `app/(public)/iphone/used-iphone-support/components/LifespanTable.tsx`
- [ ] `LIFESPAN_DATA` 配列の先頭に新シリーズを追加
- [ ] models 配列に全バリエーション（無印, Plus, Pro, Pro Max等）を記載
- [ ] osEnd, repairEnd の推定日を設定

### F. ベンチマークページ
- **ファイル**: `app/(public)/iphone/benchmark/page.tsx`
- [ ] FAQ の内容に新チップの言及が必要か確認（例: A19チップの記述追加）
- [ ] DB にベンチマークスコアが登録されていれば自動表示される

### G. ストレージガイド
- **ファイル**: `app/(public)/iphone/storage-guide/page.tsx`
- [ ] FAQ で新モデルの容量ラインナップに触れる必要があるか確認

### H. 価格情報ページ
- **ファイル**: `lib/data/iphone-price-info.ts`
- [ ] FAQ の内容更新が必要か確認（年号の更新など）

---

## iPad

### A. おすすめページ
- **ファイル**: `lib/data/ipad-recommend.ts`
- [ ] `RECOMMEND_SLUGS` 配列を更新
- [ ] `RECOMMEND_META` にメタ情報を追加

### B. 購入ガイドページ
- **ファイル**: `lib/data/ipad-guide.ts`
- [ ] `GUIDE_PRICE_SLUGS` に追加
- [ ] `GUIDE_MODEL_LINKS` の該当ライン（pro / air / normal / mini）に追加

### C. 歴代スペック比較表 — 進化タイムライン
- **ファイル**: `app/(public)/ipad/ipad-spec-table/components/EvolutionTimeline.tsx`
- [ ] 該当タイムライン（`PRO_TIMELINE` / `NORMAL_TIMELINE` / `MINI_TIMELINE`）に新エントリを追加

### D. サポート期間一覧表
- **ファイル**: `app/(public)/ipad/used-ipad-support/components/LifespanTable.tsx`（存在する場合）
- [ ] `LIFESPAN_DATA` に新シリーズを追加

### E. ベンチマーク / ストレージガイド / 価格情報
- **ファイル**: `app/(public)/ipad/benchmark/page.tsx`
- **ファイル**: `app/(public)/ipad/storage-guide/page.tsx`
- **ファイル**: `lib/data/ipad-price-info.ts`
- [ ] FAQ 内容に新モデル・新チップへの言及が必要か確認

### F. Apple Pencil比較・その他特集ページ
- **ファイル**: `app/(public)/ipad/apple-pencil-compare/page.tsx`
- [ ] 新モデルの Pencil 対応情報を追加（該当する場合）

---

## MacBook

### A. おすすめページ
- **ファイル**: `lib/data/macbook-recommend.ts`
- [ ] `RECOMMEND_SLUGS` / `RECOMMEND_META` を更新

### B. 購入ガイドページ
- **ファイル**: `lib/data/macbook-guide.ts`
- [ ] `GUIDE_PRICE_SLUGS` に追加
- [ ] `GUIDE_MODEL_LINKS` の該当ライン（air13 / air15 / pro14 / pro16）に追加

### C. 歴代スペック比較表 — 進化タイムライン
- **ファイル**: `app/(public)/macbook/macbook-spec-table/components/EvolutionTimeline.tsx`
- [ ] 該当タイムラインに新エントリを追加

### D. Air vs Pro 比較
- **ファイル**: `app/(public)/macbook/air-pro-compare/page.tsx`
- [ ] 最新モデルへの言及更新が必要か確認

### E. チップ世代比較
- **ファイル**: `app/(public)/macbook/benchmark/components/ChipGenerationCompare.tsx`
- [ ] 新チップ世代（例: M5）が追加される場合、チップ抽出ロジックと見出しを更新

### F. 価格情報 / ストレージガイド
- **ファイル**: `lib/data/macbook-price-info.ts`
- **ファイル**: `app/(public)/macbook/storage-guide/page.tsx`
- [ ] FAQ 内容に新モデルの情報が必要か確認

---

## Apple Watch

### A. おすすめページ
- **ファイル**: `lib/data/watch-recommend.ts`
- [ ] `RECOMMEND_SLUGS` / `RECOMMEND_META` を更新

### B. 購入ガイドページ
- **ファイル**: `lib/data/watch-guide.ts`
- [ ] `GUIDE_PRICE_SLUGS` に追加
- [ ] `GUIDE_MODEL_LINKS` の該当ライン（series / se / ultra）に追加

### C. 歴代スペック比較表 — 進化タイムライン
- **ファイル**: `app/(public)/watch/watch-spec-table/components/EvolutionTimeline.tsx`
- [ ] `SERIES_TIMELINE` / `SE_TIMELINE` / `ULTRA_TIMELINE` に新エントリを追加

### D. サポート期間一覧表
- **ファイル**: `app/(public)/watch/used-watch-support/components/LifespanTable.tsx`
- [ ] `LIFESPAN_DATA` に新シリーズを追加

### E. GPS vs Cellular 比較
- **ファイル**: `app/(public)/watch/gps-cellular-compare/page.tsx`
- [ ] 新モデルのセルラー対応情報を更新（該当する場合）

### F. 常時表示スペック表
- **ファイル**: `app/(public)/watch/apple-watch-always-lit/components/SpecTableSection.tsx`
- [ ] 新モデルの常時表示対応情報を追加

### G. 価格情報
- **ファイル**: `lib/data/watch-price-info.ts`
- [ ] FAQ 内容の更新確認

---

## AirPods

### A. おすすめページ
- **ファイル**: `lib/data/airpods-recommend.ts`
- [ ] `RECOMMEND_SLUGS` / `RECOMMEND_META` を更新

### B. 購入ガイドページ
- **ファイル**: `lib/data/airpods-guide.ts`
- [ ] ガイド内のモデルリスト・リンクを更新

### C. 価格情報
- **ファイル**: `lib/data/airpods-price-info.ts`
- [ ] FAQ 内容の更新確認

---

## レガシーモデル対応（サポート終了時）

モデルのサポートが終了した場合の追加作業:

- **ファイル**: `lib/data/legacy-iphones.ts`
- **ファイル**: `lib/data/legacy-ipads.ts`
- **ファイル**: `lib/data/legacy-macbooks.ts`
- **ファイル**: `lib/data/legacy-watches.ts`
- [ ] サポート終了モデルをレガシーデータファイルに追加
- [ ] DB の `show` フラグを見直し（非表示にする場合）

---

## AI による自動チェック方法

以下のコマンド/手順で、漏れがないか機械的に確認できる。

### 1. DB登録済みモデルとハードコーディングの突合
```bash
# DBのslug一覧を取得し、各ハードコードファイルに含まれるか確認
# 例: iphone の場合
grep -oP "'[a-z0-9\-]+'" lib/data/iphone-guide.ts | sort -u
grep -oP "'[a-z0-9\-]+'" lib/data/iphone-recommend.ts | sort -u
```

### 2. EvolutionTimeline に最新モデルが含まれているか
```bash
# 各カテゴリの EvolutionTimeline.tsx で最新年のエントリがあるか確認
grep -n "202[5-9]" app/(public)/iphone/iphone-spec-table/components/EvolutionTimeline.tsx
grep -n "202[5-9]" app/(public)/ipad/ipad-spec-table/components/EvolutionTimeline.tsx
grep -n "202[5-9]" app/(public)/watch/watch-spec-table/components/EvolutionTimeline.tsx
grep -n "202[5-9]" app/(public)/macbook/macbook-spec-table/components/EvolutionTimeline.tsx
```

### 3. LifespanTable に最新モデルが含まれているか
```bash
grep -n "202[5-9]" app/(public)/iphone/used-iphone-support/components/LifespanTable.tsx
grep -n "202[5-9]" app/(public)/watch/used-watch-support/components/LifespanTable.tsx
```

### 4. GUIDE_MODEL_LINKS に新モデルの slug があるか
```bash
# 新モデルのslugで検索（例: 18pro）
grep -r "18pro" lib/data/
```

### 5. ComparePages に新比較ペアがあるか（iPhone のみ）
```bash
grep "slug:" app/(public)/iphone/_compare/config.ts
```

---

## 備考

- **自動反映される箇所**: DB の `show=true` のモデルは、スペック比較表・ベンチマークランキング・価格情報グラフなどで自動的に表示される。個別ページ（`/[category]/[slug]/`）も自動生成される。
- **手動更新が必要な箇所**: 上記チェックリストの各項目（おすすめ選定、ガイド文、タイムライン、サポート期間、比較ページ設定など）。
- **ビルド確認**: 全更新後に `next build` を実行し、静的生成エラーがないことを確認する。
