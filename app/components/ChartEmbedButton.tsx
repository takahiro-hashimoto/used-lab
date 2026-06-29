'use client'

import { useState } from 'react'
import { CHART_EMBED_CONFIG } from '@/lib/chart-embed'

const SITE_URL = 'https://used-lab.jp'

/** 価格推移グラフの「埋め込みコード取得」ボタン＋スニペット（カテゴリ共通） */
export default function ChartEmbedButton({
  category,
  slugs,
  days,
}: {
  category: string
  slugs: string[]
  days: number
}) {
  const [showEmbed, setShowEmbed] = useState(false)
  const [copied, setCopied] = useState(false)

  if (slugs.length === 0) return null

  const conf = CHART_EMBED_CONFIG[category] ?? { label: '中古Apple製品', priceInfoPath: '' }
  const snippet =
    `<iframe src="${SITE_URL}/embed/${category}/chart/?models=${slugs.join(',')}&days=${days}" ` +
    `width="100%" height="420" style="border:0;max-width:680px" loading="lazy" ` +
    `title="${conf.label}の価格推移"></iframe>`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
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
        <i className="fa-solid fa-code" aria-hidden="true"></i> このグラフを埋め込む
      </button>
      {showEmbed && (
        <div className="m-card m-card--shadow m-card--padded u-mt-md">
          <p className="m-section-desc u-text-left">
            選択中のモデル・期間のグラフを、ブログやサイトに埋め込めます。下記コードをコピーして貼り付けてください（相場は自動更新されます）。
          </p>
          <textarea
            readOnly
            rows={4}
            value={snippet}
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
