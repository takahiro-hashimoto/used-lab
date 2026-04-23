import { NextRequest, NextResponse } from 'next/server'

// CSP は静的定義（nonce 不要 — layout.tsx がインラインスクリプトを持たないため）
// 'unsafe-inline' は GTM が注入するカスタム HTML タグのインラインスクリプト対応
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.jsdelivr.net https://www.clarity.ms",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://*.supabase.co https://placehold.co https://*.rakuten.co.jp https://*.a8.net https://firebasestorage.googleapis.com",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms",
  "frame-src https://www.youtube.com https://docs.google.com",
].join('; ')

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin/login はスキップ（認証不要）
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return NextResponse.next()
  }

  // /admin 配下はセッション Cookie を検証
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')?.value
    const expected = process.env.ADMIN_SESSION_TOKEN

    if (!session || !expected || session !== expected) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', CSP)

  return response
}

export const config = {
  matcher: [
    // 静的ファイル・画像・favicon を除く全リクエスト
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
