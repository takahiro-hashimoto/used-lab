'use client'

import { useState, useTransition } from 'react'
import { updateAccessoryCompatibility } from '../actions'

interface Props {
  accessoryId: number
  ipadModels: { id: number; model: string }[]
  initialCompatibleIds: number[]
}

export default function CompatibilityEditor({
  accessoryId,
  ipadModels,
  initialCompatibleIds,
}: Props) {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set(initialCompatibleIds))
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  function handleToggle(modelId: number) {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(modelId)) {
        next.delete(modelId)
      } else {
        next.add(modelId)
      }
      return next
    })
  }

  function handleSave() {
    startTransition(async () => {
      setMessage(null)
      const result = await updateAccessoryCompatibility(accessoryId, Array.from(checkedIds))
      if (result && 'error' in result) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: '対応モデルを保存しました' })
        setTimeout(() => setMessage(null), 3000)
      }
    })
  }

  return (
    <div className="admin-form" style={{ marginTop: '2rem' }}>
      <div className="admin-form__group">
        <h2 className="admin-form__group-title">対応 iPad モデル</h2>

        {message && (
          <div
            className={`admin-form__message ${
              message.type === 'error' ? 'admin-form__message--error' : 'admin-form__message--success'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="admin-form__checkboxes">
          {ipadModels.map((model) => (
            <label key={model.id} className="admin-field admin-field--checkbox">
              <input
                type="checkbox"
                checked={checkedIds.has(model.id)}
                onChange={() => handleToggle(model.id)}
                className="admin-field__checkbox"
              />
              <span className="admin-field__label">{model.model}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="admin-form__actions">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="admin-btn admin-btn--primary"
        >
          {isPending ? '保存中...' : '対応モデルを保存'}
        </button>
      </div>
    </div>
  )
}
