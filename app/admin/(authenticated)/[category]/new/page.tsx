import { notFound } from 'next/navigation'
import { getCategoryByKey } from '../../../field-definitions'
import { createModel } from '../../../actions'
import AdminForm from '../../../components/AdminForm'

type PageProps = {
  params: Promise<{ category: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminNewModelPage({ params, searchParams }: PageProps) {
  const { category } = await params
  const config = getCategoryByKey(category)
  if (!config) notFound()

  const query = await searchParams

  // searchParams から初期データを構築（複製時に使用）
  let initialData: Record<string, unknown> | undefined
  if (Object.keys(query).length > 0) {
    initialData = {}
    for (const field of config.fields) {
      if (field.key === 'id') continue
      const val = query[field.key]
      if (typeof val !== 'string') continue
      if (field.type === 'number') {
        initialData[field.key] = val ? Number(val) : null
      } else if (field.type === 'boolean') {
        initialData[field.key] = val === 'true'
      } else if (field.type === 'json') {
        try { initialData[field.key] = JSON.parse(val) } catch { initialData[field.key] = null }
      } else {
        initialData[field.key] = val || null
      }
    }
  }

  async function handleCreate(formData: FormData) {
    'use server'
    return createModel(category, formData)
  }

  const isDuplicate = !!initialData

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className={`fa-solid ${config.icon}`} aria-hidden="true" /> {config.label} {isDuplicate ? '複製' : '新規登録'}
        </h1>
      </div>
      <AdminForm
        fields={config.fields}
        initialData={initialData}
        action={handleCreate}
        categoryKey={category}
        submitLabel={isDuplicate ? '複製して登録する' : '登録する'}
      />
    </>
  )
}
