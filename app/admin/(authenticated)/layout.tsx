import Link from 'next/link'
import { CATEGORIES } from '../field-definitions'
import LogoutButton from '../components/LogoutButton'

export default function AuthenticatedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-header__inner">
          <Link href="/admin" className="admin-header__logo">
            管理画面
          </Link>
          <nav className="admin-header__nav">
            {CATEGORIES.map((cat) => (
              <Link key={cat.key} href={`/admin/${cat.key}`} className="admin-header__link">
                <i className={`fa-solid ${cat.icon}`} aria-hidden="true" />
                <span>{cat.label}</span>
              </Link>
            ))}
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
