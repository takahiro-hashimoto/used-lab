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
  // enableCacheInterception は試して戻した（2026-08-21）。
  // 理屈の上ではキャッシュ済みページを Next 本体を通さず返して速くなるはず
  // だったが、実測では全ページが4〜10倍遅くなった（トップ 0.09s→1.4s、
  // price-info 0.3s→3〜6s。連続リクエストでも改善せず）。
  // このサイトのページはRSCペイロード込みで最大2.6MBと大きく、
  // インターセプタ経由の配信が合わないと見られる。有効化するなら必ず
  // 前後で応答時間を実測すること。
  // tagCache を省略すると既定の "dummy" になる。dummy は writeTags が何もせず
  // isStale が常に false を返すため、revalidateTag が完全に無効化される
  // （API は ok を返すのにページが更新されない、という気づきにくい壊れ方をする）。
  // revalidate:false + revalidateTag で運用しているこのサイトでは致命的。
  tagCache: d1NextTagCache,
})
