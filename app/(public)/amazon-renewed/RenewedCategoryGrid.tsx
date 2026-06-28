'use client'

import { useMemo, useState } from 'react'
import { RENEWED_SUBFILTERS } from '@/lib/renewed-filters'
import styles from './amazon-renewed.module.css'

export interface RenewedCardItem {
  asin: string
  title: string
  url: string
  imageUrl: string | null
  priceDisplay: string | null
  subType: string
}

export default function RenewedCategoryGrid({
  items,
  categoryKey,
}: {
  items: RenewedCardItem[]
  categoryKey: string
}) {
  const [active, setActive] = useState('all')

  // 実際に商品が存在するタイプだけ、件数つきで表示する
  const counts = useMemo(() => {
    const m: Record<string, number> = {}
    for (const it of items) m[it.subType] = (m[it.subType] ?? 0) + 1
    return m
  }, [items])

  const filters = (RENEWED_SUBFILTERS[categoryKey] ?? []).filter((f) => counts[f.value] > 0)
  const shown = active === 'all' ? items : items.filter((it) => it.subType === active)

  return (
    <>
      <div className={styles.filterBar}>
        <span className={styles.count}>
          表示件数 <strong>{shown.length}件</strong>
        </span>
        {filters.length > 0 && (
          <label className={styles.filterLabel}>
            絞り込み
            <select
              className={styles.select}
              value={active}
              onChange={(e) => setActive(e.target.value)}
            >
              <option value="all">すべて（{items.length}）</option>
              {filters.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}（{counts[f.value]}）
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="l-grid l-grid--4col">
        {shown.map((it) => (
          <a
            key={it.asin}
            className={`m-card m-card--shadow m-card--hoverable m-card--padded ${styles.card}`}
            href={it.url}
            target="_blank"
            rel="noopener sponsored"
          >
            {it.imageUrl ? (
              // 外部CDN(Amazon)の画像のため素の img を使用
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.thumb} src={it.imageUrl} alt={it.title} width={160} height={130} loading="lazy" />
            ) : (
              <span className={styles.thumb} />
            )}
            <span className={styles.name}>{it.title}</span>
            <span className={`m-price-display m-price-display--sm ${styles.priceRow}`}>
              {it.priceDisplay ?? '価格を見る'}
            </span>
            <span className="m-btn m-btn--amazon m-btn--block">Amazonで見る</span>
          </a>
        ))}
      </div>
    </>
  )
}
