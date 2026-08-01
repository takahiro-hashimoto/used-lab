'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import type { GalaxyModel } from '@/lib/types'

function formatSupportEnd(supportUntil: string | null): string {
  if (!supportUntil) return '-'
  const [y, m] = supportUntil.split('-')
  return m ? `${y}年${parseInt(m, 10)}月まで` : `${y}年頃まで`
}

function formatDisplaySize(display: string | null): string {
  return display ?? '-'
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const [y, m] = date.split('/')
  return m ? `${y}年${parseInt(m, 10)}月` : `${y}年`
}

function getFeatureTags(m: GalaxyModel): string[] {
  const tags: string[] = []
  if (m.series) tags.push(`${m.series}シリーズ`)
  if (m.galaxy_ai) tags.push('Galaxy AI')
  if (m.s_pen) tags.push('S Pen対応')
  if (m.dex) tags.push('Samsung DeX')
  return tags.slice(0, 4)
}

type Props = {
  model: GalaxyModel
  avgPrice: number | null
  iosysUrl: string | null
  onClose: () => void
}

export default function ModelModal({ model, avgPrice, iosysUrl, onClose }: Props) {
  const supported = model.last_android === null
  const tags = getFeatureTags(model)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="model-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${model.model} の概要`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="model-modal">
        {/* ヘッダー */}
        <div className="model-modal__header">
          {model.image && (
            <Image
              src={`/images/galaxy/${model.image}`}
              alt={model.model}
              width={72}
              height={72}
              className="model-modal__img"
            />
          )}
          <div className="model-modal__header-info">
            <p className="model-modal__title">{model.model}</p>
            <div>
              {supported ? (
                <span className="ifd-tag ifd-tag--supported">
                  <i className="fa-solid fa-shield-halved" aria-hidden="true" /> サポート {formatSupportEnd(model.support_until)}
                </span>
              ) : (
                <span className="ifd-tag ifd-tag--ended">
                  <i className="fa-solid fa-circle-xmark" aria-hidden="true" /> サポート終了
                </span>
              )}
            </div>
          </div>
          <button className="model-modal__close" onClick={onClose} aria-label="閉じる">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        {/* ボディ */}
        <div className="model-modal__body">
          {avgPrice != null && (
            <div className="ifd-result-card__price u-mb-md">
              <span className="ifd-result-card__price-label">中古価格相場</span>
              <span className="ifd-result-card__price-value">¥{avgPrice.toLocaleString()}</span>
            </div>
          )}

          <dl className="ifd-result-card__specs">
            <div><dt>発売日</dt><dd>{formatReleaseDate(model.date)}</dd></div>
            {model.cpu && <div><dt>チップ</dt><dd>{model.cpu}</dd></div>}
            {model.series && <div><dt>シリーズ</dt><dd>{model.series}</dd></div>}
            {model.model_number && <div><dt>型番</dt><dd>{model.model_number}</dd></div>}
            <div><dt>画面</dt><dd>{formatDisplaySize(model.display)}</dd></div>
            {model.weight && <div><dt>重量</dt><dd>{model.weight}</dd></div>}
            {model.main_camera && <div><dt>メインカメラ</dt><dd>{model.main_camera}</dd></div>}
            {model.port && <div><dt>充電ポート</dt><dd>{model.port}</dd></div>}
            {model.battery && <div><dt>バッテリー</dt><dd>{model.battery}</dd></div>}
          </dl>

          {tags.length > 0 && (
            <div className="ifd-result-card__feature-tags u-mt-md">
              {tags.map((tag) => (
                <span key={tag} className="ifd-feature-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="model-modal__footer">
          <Link prefetch={false} href={`/galaxy/${model.slug}/`} className="m-btn m-btn--primary" onClick={onClose}>
            詳細記事を見る <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
          {iosysUrl && (
            <a href={iosysUrl} className="m-btn m-btn--secondary" target="_blank" rel="nofollow noopener noreferrer">
              イオシスで探す <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
