import type { Metadata } from 'next'
import { getAllIPadModelsIncludingEnded } from '@/lib/queries'
import IPadOsSupportMatrix from '@/app/(public)/ipad/used-ipad-support/components/IPadOsSupportMatrix'

export const revalidate = false
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function IPadSupportEmbedPage() {
  const models = await getAllIPadModelsIncludingEnded()
  return (
    <div style={{ padding: '0 8px 16px' }}>
      <IPadOsSupportMatrix models={models} hideEmbed />
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>
        出典:{' '}
        <a
          href="https://used-lab.jp/ipad/used-ipad-support/"
          target="_blank"
          rel="noopener noreferrer"
        >
          iPadサポート期間一覧 | ユーズドラボ
        </a>
      </p>
    </div>
  )
}
