import { notFound } from 'next/navigation'
import { getNewsItems, updateNewsItem } from '../../../actions'
import NewsForm from '../NewsForm'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminEditNewsPage({ params }: PageProps) {
  const { id } = await params
  const numericId = parseInt(id, 10)
  if (isNaN(numericId)) notFound()

  const items = await getNewsItems()
  const item = items.find((i) => i.id === numericId)
  if (!item) notFound()

  async function handleUpdate(formData: FormData) {
    'use server'
    return updateNewsItem(numericId, formData)
  }

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className="fa-solid fa-bullhorn" aria-hidden="true" /> 新着情報 編集
        </h1>
      </div>
      <NewsForm
        action={handleUpdate}
        initialData={{
          date: item.date,
          content: item.content,
          published: item.published,
        }}
        submitLabel="更新する"
      />
    </>
  )
}
