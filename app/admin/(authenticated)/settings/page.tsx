import { getSiteConfigForAdmin } from '../../actions'
import SiteConfigForm from '../../components/SiteConfigForm'

export default async function AdminSettingsPage() {
  const config = await getSiteConfigForAdmin()

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-header__title">サイト設定</h1>
      </div>
      <SiteConfigForm initial={config} />
    </>
  )
}
