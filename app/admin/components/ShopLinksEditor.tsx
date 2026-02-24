'use client'

import { useState, useTransition } from 'react'
import { updateProductShopLinks } from '../actions'

interface ShopInfo {
  id: number
  shop: string
  shop_key: string
}

interface Props {
  productType: string
  productId: number
  shops: ShopInfo[]
  initialLinks: { shop_id: number; url: string }[]
}

export default function ShopLinksEditor({
  productType,
  productId,
  shops,
  initialLinks,
}: Props) {
  // shop_id → url のマップを作成
  const initialMap = new Map(initialLinks.map((l) => [l.shop_id, l.url]))
  const [urls, setUrls] = useState<Map<number, string>>(initialMap)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  function handleUrlChange(shopId: number, value: string) {
    setUrls((prev) => {
      const next = new Map(prev)
      if (value) {
        next.set(shopId, value)
      } else {
        next.delete(shopId)
      }
      return next
    })
  }

  function handleSave() {
    startTransition(async () => {
      setMessage(null)
      const links = Array.from(urls.entries()).map(([shop_id, url]) => ({ shop_id, url }))
      const result = await updateProductShopLinks(productType, productId, links)
      if (result && 'error' in result) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: 'ショップリンクを保存しました' })
        setTimeout(() => setMessage(null), 3000)
      }
    })
  }

  return (
    <div className="admin-form" style={{ marginTop: '2rem' }}>
      <div className="admin-form__group">
        <h2 className="admin-form__group-title">ECショップリンク</h2>

        {message && (
          <div
            className={`admin-form__message ${
              message.type === 'error' ? 'admin-form__message--error' : 'admin-form__message--success'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="admin-form__grid">
          {shops.map((shop) => (
            <label key={shop.id} className="admin-field">
              <span className="admin-field__label">{shop.shop}</span>
              <input
                type="text"
                value={urls.get(shop.id) ?? ''}
                onChange={(e) => handleUrlChange(shop.id, e.target.value)}
                placeholder="https://..."
                className="admin-field__input"
              />
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
          {isPending ? '保存中...' : 'ショップリンクを保存'}
        </button>
      </div>
    </div>
  )
}
