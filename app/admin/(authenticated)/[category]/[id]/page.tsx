import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryByKey } from '../../../field-definitions'
import {
  getModelById, updateModel,
  getIPadModelsForSelect, getAccessoryCompatibility,
  getShopsForAdmin, getProductShopLinksForAdmin,
} from '../../../actions'
import AdminForm from '../../../components/AdminForm'
import CompatibilityEditor from '../../../components/CompatibilityEditor'
import ShopLinksEditor from '../../../components/ShopLinksEditor'

type PageProps = {
  params: Promise<{ category: string; id: string }>
}

export default async function AdminEditModelPage({ params }: PageProps) {
  const { category, id } = await params
  const config = getCategoryByKey(category)
  if (!config) notFound()

  const numericId = parseInt(id, 10)
  if (isNaN(numericId)) notFound()

  const model = await getModelById(category, numericId)
  if (!model) notFound()

  // アクセサリの場合は互換性データも取得
  const isAccessory = category === 'ipad-accessories'
  const [ipadModels, compatibleIds] = isAccessory
    ? await Promise.all([getIPadModelsForSelect(), getAccessoryCompatibility(numericId)])
    : [[], []]

  // 製品カテゴリの場合はショップリンクデータも取得
  const hasShopLinks = !!config.productType
  const [shops, shopLinks] = hasShopLinks
    ? await Promise.all([getShopsForAdmin(), getProductShopLinksForAdmin(config.productType!, numericId)])
    : [[], []]

  async function handleUpdate(formData: FormData) {
    'use server'
    return updateModel(category, numericId, formData)
  }

  // 複製用: idを除いたデータをクエリパラメータに変換
  const duplicateParams = new URLSearchParams()
  const modelData = model as Record<string, unknown>
  for (const field of config.fields) {
    if (field.key === 'id') continue
    const val = modelData[field.key]
    if (val != null) {
      duplicateParams.set(field.key, typeof val === 'object' ? JSON.stringify(val) : String(val))
    }
  }

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className={`fa-solid ${config.icon}`} aria-hidden="true" />{' '}
          {String(modelData.model || modelData.name || `ID: ${numericId}`)} を編集
        </h1>
        <Link href={`/admin/${category}/new?${duplicateParams.toString()}`} className="admin-btn admin-btn--secondary">
          <i className="fa-regular fa-copy" aria-hidden="true" /> このページを複製
        </Link>
      </div>
      <AdminForm
        fields={config.fields}
        initialData={model as Record<string, unknown>}
        action={handleUpdate}
        categoryKey={category}
        submitLabel="更新する"
      />
      {hasShopLinks && (
        <ShopLinksEditor
          productType={config.productType!}
          productId={numericId}
          shops={shops}
          initialLinks={shopLinks}
        />
      )}
      {isAccessory && (
        <CompatibilityEditor
          accessoryId={numericId}
          ipadModels={ipadModels}
          initialCompatibleIds={compatibleIds}
        />
      )}
    </>
  )
}
