'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import type { FieldDef } from '../field-definitions'

interface Props {
  fields: FieldDef[]
  initialData?: Record<string, unknown>
  action: (formData: FormData) => Promise<{ error: string } | void>
  categoryKey: string
  submitLabel: string
}

export default function AdminForm({ fields, initialData, action, categoryKey, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error: string } | null, formData: FormData) => {
      const result = await action(formData)
      if (result && 'error' in result) return result
      return null
    },
    null
  )

  // フィールドをグループごとにまとめる
  const groups = new Map<string, FieldDef[]>()
  for (const field of fields) {
    if (field.key === 'id') continue
    const group = field.group || 'その他'
    if (!groups.has(group)) groups.set(group, [])
    groups.get(group)!.push(field)
  }

  function getInitialValue(key: string): string {
    if (!initialData) return ''
    const val = initialData[key]
    if (val == null) return ''
    if (typeof val === 'object') return JSON.stringify(val, null, 2)
    return String(val)
  }

  function getInitialChecked(key: string): boolean {
    if (!initialData) return false
    return Boolean(initialData[key])
  }

  return (
    <form action={formAction} className="admin-form">
      {state?.error && (
        <div className="admin-form__message admin-form__message--error">{state.error}</div>
      )}

      {Array.from(groups.entries()).map(([groupName, groupFields]) => {
        const booleanFields = groupFields.filter((f) => f.type === 'boolean')
        const otherFields = groupFields.filter((f) => f.type !== 'boolean')

        return (
          <div key={groupName} className="admin-form__group">
            <h2 className="admin-form__group-title">{groupName}</h2>

            {otherFields.length > 0 && (
              <div className="admin-form__grid">
                {otherFields.map((field) => (
                  <label key={field.key} className="admin-field">
                    <span className="admin-field__label">
                      {field.label}
                      {field.required && <span style={{ color: '#dc2626' }}> *</span>}
                    </span>
                    {field.type === 'textarea' || field.type === 'json' ? (
                      <textarea
                        name={field.key}
                        defaultValue={getInitialValue(field.key)}
                        placeholder={field.placeholder}
                        className="admin-field__textarea"
                        rows={field.type === 'json' ? 6 : 3}
                      />
                    ) : field.type === 'select' && field.options ? (
                      <select
                        name={field.key}
                        defaultValue={getInitialValue(field.key)}
                        className="admin-field__select"
                      >
                        <option value="">-- 選択 --</option>
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type === 'number' ? 'number' : 'text'}
                        name={field.key}
                        defaultValue={getInitialValue(field.key)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="admin-field__input"
                      />
                    )}
                  </label>
                ))}
              </div>
            )}

            {booleanFields.length > 0 && (
              <div className="admin-form__checkboxes">
                {booleanFields.map((field) => (
                  <label key={field.key} className="admin-field admin-field--checkbox">
                    <input
                      type="checkbox"
                      name={field.key}
                      defaultChecked={getInitialChecked(field.key)}
                      className="admin-field__checkbox"
                    />
                    <span className="admin-field__label">{field.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )
      })}

      <div className="admin-form__actions">
        <button type="submit" disabled={isPending} className="admin-btn admin-btn--primary">
          {isPending ? '保存中...' : submitLabel}
        </button>
        <Link href={`/admin/${categoryKey}`} className="admin-btn admin-btn--secondary">
          キャンセル
        </Link>
      </div>
    </form>
  )
}
