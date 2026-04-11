import { NextRequest, NextResponse } from 'next/server'

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

  // CSP ヘッダーを付与
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://cdn.jsdelivr.net https://www.clarity.ms`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://*.supabase.co https://placehold.co https://*.rakuten.co.jp https://*.a8.net https://firebasestorage.googleapis.com",
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms",
    "frame-src https://www.youtube.com https://docs.google.com",
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)

  return response
}

export const config = {
  matcher: [
    // 静的ファイル・画像・favicon を除く全リクエスト
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
