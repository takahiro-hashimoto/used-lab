'use client'

import { useState } from 'react'

type Props = {
  url: string
  text: string
  bgSubtle?: boolean
}

export default function ShareBox({ url, text, bgSubtle = false }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`
  const hatenaUrl = `https://b.hatena.ne.jp/entry/s/${url.replace('https://', '')}`

  return (
    <section className={`l-section l-section--sm${bgSubtle ? ' l-section--bg-subtle' : ''}`} aria-label="SNSシェア">
      <div className="l-container">
        <div className="share-box">
          <p className="share-box__lead">
            この記事が役に立ったら<br className="sp-only" />シェアしてください
          </p>
          <p className="share-box__sub">あなたのシェアが誰かの役に立ちます</p>
          <div className="share-box__buttons">
            <a
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn--x"
              aria-label="Xでシェア"
            >
              <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
              <span>ポスト</span>
            </a>
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn--line"
              aria-label="LINEでシェア"
            >
              <i className="fa-brands fa-line" aria-hidden="true"></i>
              <span>LINE</span>
            </a>
            <a
              href={hatenaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn--hatena"
              aria-label="はてなブックマークに追加"
            >
              <span className="share-btn__hatena-icon" aria-hidden="true">B!</span>
              <span>はてブ</span>
            </a>
            <button
              type="button"
              className={`share-btn share-btn--copy${copied ? ' is-copied' : ''}`}
              onClick={handleCopy}
              aria-label="URLをコピー"
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-link'}`} aria-hidden="true"></i>
              <span>{copied ? 'コピー済み' : 'URLコピー'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
