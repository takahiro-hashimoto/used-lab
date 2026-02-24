import { notFound } from 'next/navigation'
import { getCategoryByKey } from '../../../field-definitions'
import { createModel } from '../../../actions'
import AdminForm from '../../../components/AdminForm'

type PageProps = {
  params: Promise<{ category: string }>
}

export default async function AdminNewModelPage({ params }: PageProps) {
  const { category } = await params
  const config = getCategoryByKey(category)
  if (!config) notFound()

  async function handleCreate(formData: FormData) {
    'use server'
    return createModel(category, formData)
  }

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className={`fa-solid ${config.icon}`} aria-hidden="true" /> {config.label} 新規登録
        </h1>
      </div>
      <AdminForm
        fields={config.fields}
        action={handleCreate}
        categoryKey={category}
        submitLabel="登録する"
      />
    </>
  )
}
