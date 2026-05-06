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
      <label className={`publish-toggle ${isPending ? 'publish-toggle--pending' : ''}`}>
        <input
          type="checkbox"
          checked={show}
          onChange={handleToggle}
          disabled={isPending}
          className="publish-toggle__input"
        />
        <span className="publish-toggle__track">
          <span className="publish-toggle__thumb" />
        </span>
        <span className="publish-toggle__label">
          {isPending ? '更新中…' : show ? '公開中' : '非公開'}
        </span>
      </label>
      {error && <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>}
    </div>
  )
}
