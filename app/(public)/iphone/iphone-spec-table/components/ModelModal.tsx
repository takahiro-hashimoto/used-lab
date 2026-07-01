'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import type { IPhoneModel } from '@/lib/types'

function estimateSupportEnd(date: string | null, lastIos: string | null): string {
  if (lastIos !== null) return '終了'
  if (!date) return '-'
  const endYear = new Date(date).getFullYear() + 6
  return `${endYear}年頃まで`
}

function formatDisplaySize(display: string | null): string {
  return display ?? '-'
}

function formatCameraConfig(frontCamera: string | null): string {
  if (!frontCamera) return '-'
  const count = (frontCamera.match(/[+＋]/g) || []).length + 1
  if (count >= 3) return 'トリプル'
  if (count === 2) return 'デュアル'
  return 'シングル'
}

function formatPort(port: string | null): string {
  if (!port) return '-'
  if (port.toLowerCase().includes('usb')) return 'USB-C'
  if (port.toLowerCase().includes('lightning')) return 'Lightning'
  return port
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const d = new Date(date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
}

function getFeatureTags(m: IPhoneModel): string[] {
  const tags: string[] = []
  if (m.dynamic_island) tags.push('Dynamic Island')
  if (m.promotion) tags.push('ProMotion')
  if (m.action_button) tags.push('アクションボタン')
  if (m.camera_control) tags.push('カメラコントロール')
  return tags.slice(0, 4)
}

type Props = {
  model: IPhoneModel
  avgPrice: number | null
  iosysUrl: string | null
  onClose: () => void
}

export default function ModelModal({ model, avgPrice, iosysUrl, onClose }: Props) {
  const supported = model.last_ios === null
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
              src={`/images/iphone/${model.image}`}
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
                  <i className="fa-solid fa-shield-halved" aria-hidden="true" /> OSサポート {estimateSupportEnd(model.date, model.last_ios)}
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
              <span className="ifd-result-card__price-value">¥{avgPrice.toLocaleString()}〜</span>
            </div>
          )}

          <dl className="ifd-result-card__specs">
            <div><dt>発売日</dt><dd>{formatReleaseDate(model.date)}</dd></div>
            {model.cpu && <div><dt>CPU</dt><dd>{model.cpu}</dd></div>}
            <div><dt>画面</dt><dd>{formatDisplaySize(model.display)}</dd></div>
            {model.weight && <div><dt>重量</dt><dd>{model.weight}</dd></div>}
            <div><dt>カメラ構成</dt><dd>{formatCameraConfig(model.front_camera)}</dd></div>
            <div><dt>充電ポート</dt><dd>{formatPort(model.port)}</dd></div>
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
          <Link href={`/iphone/${model.slug}/`} className="m-btn m-btn--primary" onClick={onClose}>
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
