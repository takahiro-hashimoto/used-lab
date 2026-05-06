'use client'

import { useRef } from 'react'
import Link from 'next/link'
import AdminForm from './AdminForm'
import ShopLinksEditor, { type ShopLinksHandle } from './ShopLinksEditor'
import PublishToggleButton from './PublishToggleButton'
import type { FieldDef } from '../field-definitions'
import { CATEGORY_SHOP_IDS } from '../field-definitions'

interface ShopInfo {
  id: number
  shop: string
  shop_key: string
}

interface Props {
  fields: FieldDef[]
  initialData: Record<string, unknown>
  action: (formData: FormData) => Promise<{ error: string } | void>
  categoryKey: string
  categoryIcon: string
  numericId: number
  duplicateHref: string
  publicPageHref: string | null
  hasShopLinks: boolean
  productType?: string
  shops?: ShopInfo[]
  initialLinks?: { shop_id: number; url: string }[]
}

const FORM_ID = 'admin-main-form'

export default function EditPageClient({
  fields,
  initialData,
  action,
  categoryKey,
  categoryIcon,
  numericId,
  duplicateHref,
  publicPageHref,
  hasShopLinks,
  productType,
  shops = [],
  initialLinks = [],
}: Props) {
  const shopLinksRef = useRef<ShopLinksHandle>(null)

  const allowedShopIds = CATEGORY_SHOP_IDS[categoryKey]
  const visibleShops = allowedShopIds
    ? shops.filter((s) => allowedShopIds.includes(s.id))
    : shops
  const visibleInitialLinks = initialLinks.filter((l) =>
    visibleShops.some((s) => s.id === l.shop_id)
  )

  function handleSaveAll() {
    const form = document.getElementById(FORM_ID) as HTMLFormElement | null
    form?.requestSubmit()
    if (hasShopLinks) {
      shopLinksRef.current?.save()
    }
  }

  const modelName = String(initialData.model || initialData.name || `ID: ${numericId}`)
  const hasShow = 'show' in initialData

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className={`fa-solid ${categoryIcon}`} aria-hidden="true" />{' '}
          {modelName} を編集
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {hasShow && (
            <PublishToggleButton
              categoryKey={categoryKey}
              id={numericId}
              initialShow={Number(initialData.show ?? 0)}
            />
          )}
          {publicPageHref && (
            <a
              href={publicPageHref}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn admin-btn--secondary"
            >
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /> 公開ページ
            </a>
          )}
          <Link href={duplicateHref} className="admin-btn admin-btn--secondary">
            <i className="fa-regular fa-copy" aria-hidden="true" /> 複製
          </Link>
          <button type="button" onClick={handleSaveAll} className="admin-btn admin-btn--primary">
            <i className="fa-solid fa-floppy-disk" aria-hidden="true" /> 保存する
          </button>
        </div>
      </div>

      <AdminForm
        formId={FORM_ID}
        fields={fields}
        initialData={initialData}
        action={action}
        categoryKey={categoryKey}
        submitLabel="更新する"
        hideActions
      />

      {hasShopLinks && productType && (
        <ShopLinksEditor
          ref={shopLinksRef}
          productType={productType}
          productId={numericId}
          shops={visibleShops}
          initialLinks={visibleInitialLinks}
          allInitialLinks={initialLinks}
          hideSaveButton
        />
      )}

      <div className="admin-form__actions" style={{ marginTop: '1.5rem' }}>
        <button type="button" onClick={handleSaveAll} className="admin-btn admin-btn--primary">
          <i className="fa-solid fa-floppy-disk" aria-hidden="true" /> 保存する
        </button>
        <Link href={`/admin/${categoryKey}`} className="admin-btn admin-btn--secondary">
          キャンセル
        </Link>
      </div>
    </>
  )
}
