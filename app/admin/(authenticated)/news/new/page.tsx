import { createNewsItem } from '../../../actions'
import NewsForm from '../NewsForm'

export default function AdminNewNewsPage() {
  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className="fa-solid fa-bullhorn" aria-hidden="true" /> 新着情報 新規追加
        </h1>
      </div>
      <NewsForm action={createNewsItem} submitLabel="登録する" />
    </>
  )
}
