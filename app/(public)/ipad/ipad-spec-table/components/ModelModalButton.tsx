'use client'

import { useState } from 'react'
import ModelModal from './ModelModal'
import type { IPadModel } from '@/lib/types'

type Props = {
  model: IPadModel
  avgPrice: number | null
  iosysUrl: string | null
  className?: string
}

export default function ModelModalButton({ model, avgPrice, iosysUrl, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className={className} onClick={() => setOpen(true)}>
        {model.model}
      </button>
      {open && (
        <ModelModal
          model={model}
          avgPrice={avgPrice}
          iosysUrl={iosysUrl}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
