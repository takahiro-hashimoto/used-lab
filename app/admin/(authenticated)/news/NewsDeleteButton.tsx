'use client'

import { useTransition } from 'react'

type Props = {
  id: number
  deleteAction: (id: number) => Promise<{ error: string } | void>
}

export default function NewsDeleteButton({ id, deleteAction }: Props) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('この新着情報を削除しますか？')) return
    startTransition(() => {
      deleteAction(id)
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="admin-table__link"
      style={{ color: 'var(--color-negative, #e53e3e)', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {isPending ? '削除中…' : '削除'}
    </button>
  )
}
