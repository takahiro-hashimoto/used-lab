import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryByKey } from '../../field-definitions'
import { getModels } from '../../actions'

type PageProps = {
  params: Promise<{ category: string }>
}

export default async function AdminCategoryPage({ params }: PageProps) {
  const { category } = await params
  const config = getCategoryByKey(category)
  if (!config) notFound()

  const models = await getModels(category)

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">
          <i className={`fa-solid ${config.icon}`} aria-hidden="true" /> {config.label}
        </h1>
        <Link href={`/admin/${category}/new`} className="admin-btn admin-btn--primary">
          <i className="fa-solid fa-plus" aria-hidden="true" /> 新規登録
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {config.listColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {models.length === 0 ? (
              <tr>
                <td colSpan={config.listColumns.length + 1} style={{ textAlign: 'center', padding: '2rem' }}>
                  データがありません
                </td>
              </tr>
            ) : (
              models.map((model: Record<string, unknown>) => (
                <tr key={model.id as number}>
                  {config.listColumns.map((col) => (
                    <td key={col}>
                      {String(model[col] ?? '-')}
                    </td>
                  ))}
                  <td>
                    <Link href={`/admin/${category}/${model.id}`} className="admin-table__link">
                      編集
                    </Link>
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
