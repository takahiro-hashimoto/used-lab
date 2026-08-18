import { cookies } from 'next/headers'

// ============================================================
// 管理画面のセッション判定
//
// 以前は proxy.ts（Next 15 までの middleware）が /admin/:path* を
// 一括で守っていたが、2つの理由でやめた。
//
// 1. Server Action を守れない
//    Server Action はアクションIDで解決され、どのルートへの POST でも
//    実行される。app/admin/actions.ts は公開ページ（/news/ とトップの
//    新着情報）からも参照されるため、/admin 以外へ POST されると
//    proxy を通らなかった。
//    Next.js 公式も proxy 任せを明確に否定している。
//    https://nextjs.org/docs/app/api-reference/file-conventions/proxy
//
// 2. Cloudflare で動かない
//    Next.js 16 の proxy は Node.js ランタイム固定で Edge 指定が
//    仕様上できず（runtime を設定するとエラー）、OpenNext が対応しない。
//
// 判定はここだけに置く。レイアウトと各 Server Action の両方から使う。
// ============================================================

const COOKIE_NAME = 'admin_session'

/**
 * 管理画面を有効にするか。ADMIN_ENABLED=true のときだけ動く。
 *
 * 本番（Vercel / Cloudflare）にはこの変数を設定しない。管理画面は
 * ローカルからのみ操作する方針で、本番では /admin/* を 404 にし、
 * 管理系 Server Action も一律で拒否する。
 * これにより「アクションIDが漏れれば公開ルート経由で叩ける」という
 * Server Action 固有のリスクが本番から完全に消える。
 *
 * NODE_ENV では判定できない。next build はローカルでも production に
 * なるため、ローカルの本番ビルドと本番環境を区別できない。
 */
export function isAdminEnabled(): boolean {
  return process.env.ADMIN_ENABLED === 'true'
}

/** ログイン済みかどうか。Cookie と ADMIN_SESSION_TOKEN の一致で判定する */
export async function hasAdminSession(): Promise<boolean> {
  if (!isAdminEnabled()) return false

  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)?.value
  const expected = process.env.ADMIN_SESSION_TOKEN

  return !!session && !!expected && session === expected
}

export { COOKIE_NAME as ADMIN_SESSION_COOKIE }
