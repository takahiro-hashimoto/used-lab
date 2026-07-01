'use client'

import { useState } from 'react'

const SNIPPET =
  '<iframe src="https://used-lab.jp/embed/ipad/support/" ' +
  'width="100%" height="600" style="border:0" loading="lazy" ' +
  'title="iPad iPadOS別サポート機種一覧表 | ユーズドラボ"></iframe>'

export default function SupportEmbedButton() {
  const [showEmbed, setShowEmbed] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="u-mt-xl">
      <button
        type="button"
        className="m-btn m-btn--secondary m-btn--sm"
        onClick={() => setShowEmbed((v) => !v)}
        aria-expanded={showEmbed}
      >
        <i className="fa-solid fa-code" aria-hidden="true"></i> この表を埋め込む
      </button>
      {showEmbed && (
        <div className="m-card m-card--shadow m-card--padded u-mt-md">
          <p className="m-section-desc u-text-left">
            この表をブログやサイトに埋め込めます。下記コードをコピーして貼り付けてください（表は自動更新されます）。
          </p>
          <textarea
            readOnly
            rows={4}
            value={SNIPPET}
            onFocus={(e) => e.currentTarget.select()}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              margin: '0.6rem 0',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '12px',
              lineHeight: 1.5,
              padding: '0.6rem',
              border: '1px solid #ccd2d9',
              borderRadius: '6px',
              background: '#fafbfc',
              resize: 'vertical',
            }}
          />
          <button type="button" className="m-btn m-btn--primary m-btn--sm" onClick={copy}>
            {copied ? 'コピーしました' : 'コードをコピー'}
          </button>
        </div>
      )}
    </div>
  )
}
