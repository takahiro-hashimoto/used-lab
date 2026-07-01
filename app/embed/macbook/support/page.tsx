import type { Metadata } from 'next'
import { getAllMacBookModelsIncludingEnded } from '@/lib/queries'
import MacOsSupportMatrix from '@/app/(public)/macbook/used-macbook-support/components/MacOsSupportMatrix'

export const revalidate = false
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function MacBookSupportEmbedPage() {
  const models = await getAllMacBookModelsIncludingEnded()
  return (
    <div style={{ padding: '0 8px 16px' }}>
      <MacOsSupportMatrix models={models} hideEmbed />
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>
        出典:{' '}
        <a
          href="https://used-lab.jp/macbook/used-macbook-support/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MacBookサポート期間一覧 | ユーズドラボ
        </a>
      </p>
    </div>
  )
}
