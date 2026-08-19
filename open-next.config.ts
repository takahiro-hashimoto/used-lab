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
import d1NextTagCache from '@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache'

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  // tagCache を省略すると既定の "dummy" になる。dummy は writeTags が何もせず
  // isStale が常に false を返すため、revalidateTag が完全に無効化される
  // （API は ok を返すのにページが更新されない、という気づきにくい壊れ方をする）。
  // revalidate:false + revalidateTag で運用しているこのサイトでは致命的。
  tagCache: d1NextTagCache,
})
