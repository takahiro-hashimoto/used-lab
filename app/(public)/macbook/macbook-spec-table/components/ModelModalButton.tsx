'use client'

import { useState } from 'react'
import ModelModal from './ModelModal'
import type { MacBookModel } from '@/lib/types'

type Props = {
  model: MacBookModel
  avgPrice: number | null
  iosysUrl: string | null
  className?: string
}

export default function ModelModalButton({ model, avgPrice, iosysUrl, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className={className} onClick={() => setOpen(true)}>
        {model.shortname || model.model}
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
