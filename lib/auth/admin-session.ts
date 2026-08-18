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

/** ログイン済みかどうか。Cookie と ADMIN_SESSION_TOKEN の一致で判定する */
export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)?.value
  const expected = process.env.ADMIN_SESSION_TOKEN

  return !!session && !!expected && session === expected
}

export { COOKIE_NAME as ADMIN_SESSION_COOKIE }
