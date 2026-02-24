import Link from 'next/link'
import { CATEGORIES } from '../field-definitions'
import { getModelCount } from '../actions'

export default async function AdminDashboard() {
  const counts = await Promise.all(
    CATEGORIES.map(async (cat) => ({
      key: cat.key,
      label: cat.label,
      icon: cat.icon,
      count: await getModelCount(cat.key),
    }))
  )

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">ダッシュボード</h1>
      </div>
      <div className="admin-dashboard">
        {counts.map((cat) => (
          <Link key={cat.key} href={`/admin/${cat.key}`} className="admin-dashboard__card">
            <div className="admin-dashboard__icon">
              <i className={`fa-solid ${cat.icon}`} aria-hidden="true" />
            </div>
            <div className="admin-dashboard__label">{cat.label}</div>
            <div className="admin-dashboard__count">{cat.count} 機種</div>
          </Link>
        ))}
      </div>
    </>
  )
}
