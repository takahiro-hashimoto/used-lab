'use client'

import { useState, useEffect, useRef } from 'react'

export type SampleImage = {
  label: string
  src: string
  alt: string
  type?: 'image' | 'youtube' | 'tweet'
}

type SupportedModels = {
  title: string
  models: string[]
}

type Props = {
  id?: string
  title: string
  description: React.ReactNode
  detail?: React.ReactNode
  supportedModels?: SupportedModels
  samples?: SampleImage[]
  samplesLayout?: 'tabs' | 'grid'
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (id: string, el: HTMLElement, options?: Record<string, string>) => Promise<HTMLElement>
      }
    }
  }
}

function TweetEmbed({ tweetId }: { tweetId: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''

    const render = () => {
      if (window.twttr && containerRef.current) {
        window.twttr.widgets.createTweet(tweetId, containerRef.current, { lang: 'ja', align: 'center' })
      }
    }

    if (window.twttr) {
      render()
    } else {
      const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')
      if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://platform.twitter.com/widgets.js'
        script.async = true
        script.onload = render
        document.head.appendChild(script)
      } else {
        existing.addEventListener('load', render)
      }
    }
  }, [tweetId])

  return <div ref={containerRef} className="camera-feature-card__tweet" />
}

export default function CameraFeatureCard({ id, title, description, detail, supportedModels, samples, samplesLayout = 'tabs' }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const [modelsOpen, setModelsOpen] = useState(false)

  return (
    <div className="camera-feature-card m-card m-card--shadow" id={id}>
      <div className="camera-feature-card__body">
        <h3 className="camera-feature-card__title">{title}</h3>
        <div className="camera-feature-card__desc">{description}</div>
        {detail && <div className="camera-feature-card__detail">{detail}</div>}
      </div>

      {samples && samples.length > 0 && (
        <div className="camera-feature-card__samples">
          {/* タブ（gridモードではSPのみ表示） */}
          {samples.length > 1 && (
            <div className={`camera-feature-card__tabs${samplesLayout === 'grid' ? ' camera-feature-card__tabs--sp-only' : ''}`} role="tablist">
              {samples.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={activeTab === i}
                  className={`camera-feature-card__tab${activeTab === i ? ' is-active' : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* gridモード: PC横並び */}
          {samplesLayout === 'grid' && (
            <div className="camera-feature-card__grid" style={{ '--grid-cols': samples.length } as React.CSSProperties}>
              {samples.map((s, i) => (
                <figure key={i} className="camera-feature-card__grid-item">
                  {s.type === 'tweet' ? (
                    <TweetEmbed tweetId={s.src} />
                  ) : s.type === 'youtube' ? (
                    <div className="camera-feature-card__video">
                      <iframe
                        src={`https://www.youtube.com/embed/${s.src}`}
                        title={s.alt}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <img src={s.src} alt={s.alt} className="camera-feature-card__img" loading="lazy" />
                  )}
                  {s.type !== 'tweet' && (
                    <figcaption className="camera-feature-card__caption">{s.label}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          {/* タブパネル（gridモードではSPのみ表示） */}
          <figure className={`camera-feature-card__figure${samplesLayout === 'grid' ? ' camera-feature-card__figure--sp-only' : ''}`} role="tabpanel">
            {samples[activeTab].type === 'youtube' ? (
              <div className="camera-feature-card__video">
                <iframe
                  src={`https://www.youtube.com/embed/${samples[activeTab].src}`}
                  title={samples[activeTab].alt}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : samples[activeTab].type === 'tweet' ? (
              <TweetEmbed key={samples[activeTab].src} tweetId={samples[activeTab].src} />
            ) : (
              <img
                src={samples[activeTab].src}
                alt={samples[activeTab].alt}
                className="camera-feature-card__img"
                loading="lazy"
              />
            )}
            {samples[activeTab].type !== 'tweet' && (
              <figcaption className="camera-feature-card__caption">
                {samples[activeTab].alt}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      {supportedModels && supportedModels.models.length > 0 && (
        <div className="camera-feature-card__models">
          <button
            className="camera-feature-card__models-toggle"
            onClick={() => setModelsOpen(!modelsOpen)}
            aria-expanded={modelsOpen}
          >
            <span>{supportedModels.title}</span>
            <span className="camera-feature-card__models-icon">{modelsOpen ? '-' : '+'}</span>
          </button>
          {modelsOpen && (
            <div className="camera-feature-card__models-list">
              {supportedModels.models.map((name, i) => (
                <span key={name} className="camera-feature-card__model-text">
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
