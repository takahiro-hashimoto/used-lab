import { notFound } from 'next/navigation'
import { getCategoryByKey } from '../../../field-definitions'
import {
  getModelById, updateModel,
  getIPadModelsForSelect, getAccessoryCompatibility,
  getShopsForAdmin, getProductShopLinksForAdmin,
} from '../../../actions'
import EditPageClient from '../../../components/EditPageClient'
import CompatibilityEditor from '../../../components/CompatibilityEditor'

const PUBLIC_PAGE_CATEGORIES = new Set(['iphone', 'ipad', 'macbook', 'watch', 'airpods'])

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

  const isAccessory = category === 'ipad-accessories'
  const [ipadModels, compatibleIds] = isAccessory
    ? await Promise.all([getIPadModelsForSelect(), getAccessoryCompatibility(numericId)])
    : [[], []]

  const hasShopLinks = !!config.productType
  const [shops, shopLinks] = hasShopLinks
    ? await Promise.all([getShopsForAdmin(), getProductShopLinksForAdmin(config.productType!, numericId)])
    : [[], []]

  async function handleUpdate(formData: FormData) {
    'use server'
    return updateModel(category, numericId, formData)
  }

  const modelData = model as Record<string, unknown>

  const duplicateParams = new URLSearchParams()
  for (const field of config.fields) {
    if (field.key === 'id') continue
    const val = modelData[field.key]
    if (val != null) {
      duplicateParams.set(field.key, typeof val === 'object' ? JSON.stringify(val) : String(val))
    }
  }

  const slug = typeof modelData.slug === 'string' ? modelData.slug : null
  const publicPageHref =
    PUBLIC_PAGE_CATEGORIES.has(category) && slug ? `/${category}/${slug}/` : null

  return (
    <>
      <EditPageClient
        fields={config.fields}
        initialData={modelData}
        action={handleUpdate}
        categoryKey={category}
        categoryIcon={config.icon}
        numericId={numericId}
        duplicateHref={`/admin/${category}/new?${duplicateParams.toString()}`}
        publicPageHref={publicPageHref}
        hasShopLinks={hasShopLinks}
        productType={config.productType}
        shops={shops}
        initialLinks={shopLinks}
      />
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
