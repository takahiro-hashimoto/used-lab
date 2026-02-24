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

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className={`fa-solid ${config.icon}`} aria-hidden="true" />{' '}
          {String((model as Record<string, unknown>).model || (model as Record<string, unknown>).name || `ID: ${numericId}`)} を編集
        </h1>
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
