'use client'

import { useActionState } from 'react'

interface Props {
  action: (formData: FormData) => Promise<{ error: string } | void>
}

export default function LoginForm({ action }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error: string } | null, formData: FormData) => {
      const result = await action(formData)
      if (result && 'error' in result) return result
      return null
    },
    null
  )

  return (
    <form action={formAction}>
      {state?.error && (
        <p className="admin-login__error">{state.error}</p>
      )}
      <label className="admin-field">
        <span className="admin-field__label">パスワード</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="admin-field__input"
        />
      </label>
      <button type="submit" disabled={isPending} className="admin-btn admin-btn--primary admin-btn--full">
        {isPending ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  )
}
