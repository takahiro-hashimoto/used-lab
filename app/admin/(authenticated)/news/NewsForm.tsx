'use client'

import { useActionState } from 'react'

type Props = {
  action: (formData: FormData) => Promise<{ error: string } | void>
  initialData?: { date: string; content: string; published: boolean }
  submitLabel: string
}

export default function NewsForm({ action, initialData, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error: string } | null, formData: FormData) => {
      const result = await action(formData)
      return result ?? null
    },
    null
  )

  // デフォルト日付: 今日 (YYYY-MM-DD)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <form action={formAction} className="admin-form">
      {state?.error && (
        <div className="admin-form__error">
          <i className="fa-solid fa-circle-exclamation" aria-hidden="true" /> {state.error}
        </div>
      )}

      <div className="admin-form__group">
        <h3 className="admin-form__group-title">新着情報</h3>

        <div className="admin-form__field">
          <label htmlFor="date" className="admin-form__label">
            日付 <span className="admin-form__required">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={initialData?.date || today}
            required
            className="admin-form__input"
          />
        </div>

        <div className="admin-form__field">
          <label htmlFor="content" className="admin-form__label">
            内容 <span className="admin-form__required">*</span>
          </label>
          <input
            type="text"
            id="content"
            name="content"
            defaultValue={initialData?.content || ''}
            required
            placeholder="例: iPhone 16eの中古価格データを追加しました"
            className="admin-form__input"
          />
        </div>

        <div className="admin-form__field">
          <label className="admin-form__label">
            <input
              type="checkbox"
              name="published"
              defaultChecked={initialData?.published ?? true}
            />{' '}
            公開する
          </label>
        </div>
      </div>

      <div className="admin-form__actions">
        <button type="submit" disabled={isPending} className="admin-btn admin-btn--primary">
          {isPending ? '保存中…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
