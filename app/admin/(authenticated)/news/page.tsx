import Link from 'next/link'
import { getNewsItems, deleteNewsItem } from '../../actions'
import NewsDeleteButton from './NewsDeleteButton'

export default async function AdminNewsPage() {
  const items = await getNewsItems()

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className="fa-solid fa-bullhorn" aria-hidden="true" /> 新着情報
        </h1>
        <Link href="/admin/news/new" className="admin-btn admin-btn--primary">
          <i className="fa-solid fa-plus" aria-hidden="true" /> 新規追加
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>id</th>
              <th>日付</th>
              <th>内容</th>
              <th>公開</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  データがありません
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.content}
                  </td>
                  <td>{item.published ? '✅' : '—'}</td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/admin/news/${item.id}`} className="admin-table__link">
                      編集
                    </Link>
                    <Link href={`/admin/news/new?content=${encodeURIComponent(item.content)}&published=${item.published ? '1' : '0'}`} className="admin-table__link">
                      複製
                    </Link>
                    <NewsDeleteButton id={item.id} deleteAction={deleteNewsItem} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
