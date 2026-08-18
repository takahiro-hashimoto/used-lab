// ============================================================
// Cloudflare Workers 向けのビルド設定（OpenNext アダプタ）
//
// キャッシュは R2 方式にする。もう一方の Static Assets 方式は
// 読み取り専用で再検証ができず、このサイトの運用と両立しない
// （管理画面の保存とデプロイ後に revalidateTag でタグを明示無効化しており、
//   時間経過による自動再生成に頼っていない。CLAUDE.md 参照）。
// ============================================================
import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
})
