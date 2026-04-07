'use client'

import { useTransition, useState } from 'react'
import { setPublish } from '../actions'

type Props = {
  categoryKey: string
  id: number
  initialShow: number
}

export default function PublishToggleButton({ categoryKey, id, initialShow }: Props) {
  const [show, setShow] = useState(initialShow === 1)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleToggle() {
    const next: 0 | 1 = show ? 0 : 1
    startTransition(async () => {
      const result = await setPublish(categoryKey, id, next)
      if (result?.error) {
        setError(result.error)
      } else {
        setShow(!show)
        setError(null)
      }
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={`admin-btn ${show ? 'admin-btn--danger' : 'admin-btn--primary'}`}
      >
        <i className={`fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" />
        {isPending ? ' 更新中…' : show ? ' 非公開にする' : ' 公開する'}
      </button>
      <span
        style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 600,
          background: show ? '#dcfce7' : '#f1f5f9',
          color: show ? '#16a34a' : '#64748b',
        }}
      >
        {show ? '公開中' : '非公開'}
      </span>
      {error && <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>}
    </div>
  )
}
