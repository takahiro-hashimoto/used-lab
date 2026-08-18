import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CATEGORIES } from '../field-definitions'
import LogoutButton from '../components/LogoutButton'
import { hasAdminSession } from '@/lib/auth/admin-session'

/**
 * (authenticated) 配下の全ページの入口。以前は proxy.ts が
 * /admin/:path* をまとめて守っていた（廃止の理由は
 * lib/auth/admin-session.ts のコメントを参照）。
 *
 * ログイン画面は (authenticated) の外にあるので、ここは通らない。
 * Server Action 側は actions.ts の requireAdmin() が別途守っている。
 * ページの描画とアクションの実行はそれぞれ独立に検証すること。
 */
export default async function AuthenticatedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!(await hasAdminSession())) {
    redirect('/admin/login')
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-header__inner">
          <Link prefetch={false} href="/admin" className="admin-header__logo">
            管理画面
          </Link>
          <nav className="admin-header__nav">
            <Link prefetch={false} href="/admin/news" className="admin-header__link">
              <i className="fa-solid fa-bullhorn" aria-hidden="true" />
              <span>新着情報</span>
            </Link>
            {CATEGORIES.map((cat) => (
              <Link prefetch={false} key={cat.key} href={`/admin/${cat.key}`} className="admin-header__link">
                <i className={`fa-solid ${cat.icon}`} aria-hidden="true" />
                <span>{cat.label}</span>
              </Link>
            ))}
            <Link prefetch={false} href="/admin/settings" className="admin-header__link">
              <i className="fa-solid fa-gear" aria-hidden="true" />
              <span>サイト設定</span>
            </Link>
          </nav>
          <LogoutButton />
        </div>
      </header>
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
