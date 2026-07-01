import type { Metadata } from 'next'
import { getAllWatchModelsIncludingEnded } from '@/lib/queries'
import WatchOsSupportMatrix from '@/app/(public)/watch/used-watch-support/components/WatchOsSupportMatrix'

export const revalidate = false
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function WatchSupportEmbedPage() {
  const models = await getAllWatchModelsIncludingEnded()
  return (
    <div style={{ padding: '0 8px 16px' }}>
      <WatchOsSupportMatrix models={models} hideEmbed />
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>
        出典:{' '}
        <a
          href="https://used-lab.jp/watch/used-watch-support/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apple Watchサポート期間一覧 | ユーズドラボ
        </a>
      </p>
    </div>
  )
}
