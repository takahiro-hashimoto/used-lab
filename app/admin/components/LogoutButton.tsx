'use client'

import { logout } from '../actions'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="admin-header__logout">
        ログアウト
      </button>
    </form>
  )
}
