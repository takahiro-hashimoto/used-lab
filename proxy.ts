import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return NextResponse.next()
  }

  const session = request.cookies.get('admin_session')?.value
  const expected = process.env.ADMIN_SESSION_TOKEN

  if (!session || !expected || session !== expected) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
