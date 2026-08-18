import type { Metadata } from 'next'
import { login } from '../actions'
import LoginForm from './LoginForm'
import { notFound } from 'next/navigation'
import { isAdminEnabled } from '@/lib/auth/admin-session'

/**
 * 管理画面は静的生成しない。
 *
 * 認証は Cookie を見るので本来動的だが、ADMIN_ENABLED が未設定だと
 * hasAdminSession() が Cookie を触る前に false を返すため、動的である
 * 手がかりが消えて Next がビルド時に事前生成しようとする。
 * その結果 requireAdmin() が 'admin disabled' を投げてビルドが落ちた。
 */
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: '管理画面ログイン',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  // 管理画面が無効な環境ではログイン画面も出さない
  if (!isAdminEnabled()) {
    notFound()
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title">管理画面</h1>
        <LoginForm action={login} />
      </div>
    </div>
  )
}
