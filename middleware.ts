import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin/login はスキップ（認証不要）
  if (pathname === '/admin/login') {
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

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
