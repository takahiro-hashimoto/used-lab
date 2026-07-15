# used-lab-next 開発ガイド（Claude Code 用）

このファイルは Claude Code が毎セッション自動で読み込む。開発を始める前に必ず目を通すこと。

## 最重要ルール：Vercel Usage（ISR Write Units）を爆増させない

過去に `getSiteConfig` へ `revalidate: 300` を付けたことで、全カテゴリ layout 経由で
配下全ページの ISR 再生成間隔が5分に短縮され、Write Units が日30万超に爆増した
（通常はほぼゼロ）。同じ事故を繰り返さないため、キャッシュ設定を触る変更では
**必ず以下を確認してから実装・提案する**。

### やってはいけないこと

- `unstable_cache` に**短い時間ベース revalidate（数分〜数時間）を付けない**。
  特に layout や複数ページから共有される query は厳禁。
  **共有 query の最短 revalidate が配下ページ全体の再生成間隔を支配する。**
- ページの `export const revalidate` を安易に数値化しない。基本は `false`。
- fetch の `next.revalidate` を短く設定しない。

### 正しいやり方

- **設定・フラグ系（即時反映が必要なデータ）** は `revalidate: false` にし、更新は
  管理画面の Server Action から `revalidateTag(tag, 'max')`（`app/admin/actions.ts` の
  `purgeTag`）で明示的に無効化する。時間経過による自動再生成に頼らない。
- **「今この瞬間」の期間判定**（キャンペーンの開始/終了など）は、サーバの revalidate では
  なく**クライアント側タイマー**で行う。ページHTMLは無期限キャッシュのまま維持できる。
  実例: `app/components/StickyCta.tsx`（開始・終了の両境界で自動切替）。
- **価格ログ系 query は `revalidate: 86400`（1日1回）が基準**。これより短くしない。

### 変更時のチェックリスト（revalidate 系を触るとき必須）

1. その query / ページは**何ページから使われるか**（layout 共有か？）
2. この設定で**何ページが何分ごとに再生成されるか**を見積もる
3. 即時反映が必要なら revalidate ではなく **purgeTag（タグ無効化）** で解決できないか
4. 見積もりの結果を変更提案時に必ずユーザーへ伝える

## その他の運用メモ

- dev server は外部管理（port 3000・別プロジェクトのこともある）。検証は
  `next start` を別ポートで行う。
- 価格取得は Vultr 固定IPの cron 経由（楽天API 2026新仕様 accessKey+Origin 対応）。
- Amazon アフィリエイトリンクは違反警告(83441-JP)対応で全非表示中（復活可能な形で処理）。
- 完了報告は簡潔に。
