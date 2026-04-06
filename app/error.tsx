'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main>
      <div className="hero-wrapper">
        <header className="hero hero--simple">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
          </div>
          <div className="hero-inner l-container">
            <div className="hero-content">
              <p className="hero-subtitle--top">500 Internal Server Error</p>
              <h1 className="hero-title">エラーが発生しました</h1>
              <p className="hero-description">
                申し訳ございません。ページの表示中にエラーが発生しました。
              </p>
            </div>
          </div>
        </header>
      </div>

      <div className="l-sections">
        <section className="l-section">
          <div className="l-container" style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary, #666)' }}>
              時間をおいて再度お試しいただくか、トップページからお探しください。
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
                className="m-btn m-btn--primary"
              >
                もう一度試す
              </button>
              <Link href="/" className="m-btn m-btn--outline">
                トップページへ戻る
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
