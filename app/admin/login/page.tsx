import type { Metadata } from 'next'
import { login } from '../actions'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: '管理画面ログイン',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title">管理画面</h1>
        <LoginForm action={login} />
      </div>
    </div>
  )
}
