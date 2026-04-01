import { createNewsItem } from '../../../actions'
import NewsForm from '../NewsForm'

type Props = {
  searchParams: Promise<{ content?: string; published?: string }>
}

export default async function AdminNewNewsPage({ searchParams }: Props) {
  const params = await searchParams
  const initialData = params.content
    ? { date: '', content: params.content, published: params.published !== '0' }
    : undefined

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className="fa-solid fa-bullhorn" aria-hidden="true" /> 新着情報 新規追加
        </h1>
      </div>
      <NewsForm action={createNewsItem} initialData={initialData} submitLabel="登録する" />
    </>
  )
}
