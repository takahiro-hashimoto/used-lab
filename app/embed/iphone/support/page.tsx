import type { Metadata } from 'next'
import { getAllIPhoneModelsIncludingEnded } from '@/lib/queries'
import IosSupportMatrix from '@/app/(public)/iphone/used-iphone-support/components/IosSupportMatrix'

export const revalidate = false
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function IPhoneSupportEmbedPage() {
  const models = await getAllIPhoneModelsIncludingEnded()
  return (
    <div style={{ padding: '0 8px 16px' }}>
      <IosSupportMatrix models={models} hideEmbed />
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>
        出典:{' '}
        <a
          href="https://used-lab.jp/iphone/used-iphone-support/"
          target="_blank"
          rel="noopener noreferrer"
        >
          iPhoneサポート期間一覧 | ユーズドラボ
        </a>
      </p>
    </div>
  )
}
