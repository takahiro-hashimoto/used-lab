'use client'

import { useState } from 'react'

// ============================================================
// 埋め込みコードのコピーボタン（スペック比較表・サポート一覧表 共通）
//
// 以前はカテゴリごとに SpecEmbedButton / SupportEmbedButton を置いていた。
// 9ファイルあって差分は iframe の src・title・説明文の3文字列だけで、
// 残りは1文字も違わなかった。ここに集約する。
//
// 分散していたことで実害も出ていた。iMac・Mac mini のサポートページに
// 置いてあったボタンは、MacBook のファイルをコピーしたまま src が
// /embed/macbook/support/ を指しており（/embed/mac/support/ は存在しない・404）、
// コピーした人のサイトに別カテゴリの表が埋まる状態だった。
// props で必ず渡す形にして、コピペで取り残される余地をなくす。
// ============================================================

type Props = {
  /** 埋め込み先のパス。例: '/embed/iphone/spec-table/' */
  embedPath: string
  /** iframe の title 属性。読み上げと埋め込み先の一覧表示で使われる */
  iframeTitle: string
  /** 開いたときの説明文 */
  description: string
  /** ボタンの文言 */
  buttonLabel: string
  /** iframe の高さ(px)。表の行数で変わる */
  height: number
  /** 説明文の下に出す補足。スペック比較表だけ使う */
  notes?: string[]
}

export default function EmbedCodeButton({
  embedPath,
  iframeTitle,
  description,
  buttonLabel,
  height,
  notes,
}: Props) {
  const snippet =
    `<iframe src="https://used-lab.jp${embedPath}" ` +
    `width="100%" height="${height}" style="border:0" loading="lazy" ` +
    `title="${iframeTitle}"></iframe>`

  const [showEmbed, setShowEmbed] = useState(false)
  const [copied, setCopied] = useState(false)

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
        <i className="fa-solid fa-code" aria-hidden="true"></i> {buttonLabel}
      </button>
      {showEmbed && (
        <div className="m-card m-card--shadow m-card--padded u-mt-md">
          <p className="m-section-desc u-text-left">{description}</p>
          {notes && notes.length > 0 && (
            <ul className="m-section-desc u-text-left" style={{ margin: '0 0 0.6rem', paddingLeft: '1.2em', listStyle: 'disc' }}>
              {notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
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
