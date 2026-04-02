'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { parseDate, formatDate } from '@/app/components/spec-table-utils'
import { parseMaxStorageGb, expandStorageRange, formatPrice } from '@/lib/utils/storage-helpers'

export type StorageModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  cpu: string | null
  strage: string | null
  storageLabel: string | null
  avgMin: number | null
  iosysUrl: string | null
}

type Props = {
  models: StorageModel[]
}

type SortOrder = 'new' | 'old' | 'storage-desc' | 'storage-asc' | 'price-asc' | 'price-desc'
type FilterType = 'all' | 'pro' | 'air'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro')) return 'pro'
  return 'air'
}

const MACBOOK_STORAGE_STEPS = [128, 256, 512, 1024, 2048, 4096, 8192]

export default function StorageTable({ models }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('new')
  const [modelFilter, setModelFilter] = useState<FilterType>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    result.sort((a, b) => {
      switch (sortOrder) {
        case 'new':
          return parseDate(b.date).getTime() - parseDate(a.date).getTime()
        case 'old':
          return parseDate(a.date).getTime() - parseDate(b.date).getTime()
        case 'storage-desc':
          return parseMaxStorageGb(b.strage) - parseMaxStorageGb(a.strage)
        case 'storage-asc':
          return parseMaxStorageGb(a.strage) - parseMaxStorageGb(b.strage)
        case 'price-asc':
          return (a.avgMin ?? Infinity) - (b.avgMin ?? Infinity)
        case 'price-desc':
          return (b.avgMin ?? 0) - (a.avgMin ?? 0)
      }
    })

    return result
  }, [models, sortOrder, modelFilter])

  return (
    <section className="l-section" id="storage-list" aria-labelledby="heading-storage-list">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-storage-list">
          歴代MacBookのストレージ容量・中古最安価格 一覧表
        </h2>
        <p className="m-section-desc">
          歴代MacBookの容量ラインナップと最小容量での中古最安価格を一覧で比較できます。
        </p>

        <div className="u-mb-xl" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">並び替え</span>
            <div className="spec-filter__tags">
              {([
                ['new', '発売が新しい順'],
                ['old', '発売が古い順'],
                ['storage-desc', '容量が多い順'],
                ['storage-asc', '容量が少ない順'],
                ['price-asc', '価格が安い順'],
                ['price-desc', '価格が高い順'],
              ] as [SortOrder, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${sortOrder === key ? ' is-active' : ''}`}
                  onClick={() => setSortOrder(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="spec-filter__row">
            <span className="spec-filter__label">機種絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['air', 'Air'],
                ['pro', 'Pro'],
              ] as [FilterType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${modelFilter === key ? ' is-active' : ''}`}
                  onClick={() => setModelFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <div className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table battery-table">
                <caption className="visually-hidden">歴代MacBookストレージ容量・中古最安価格一覧表</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル／発売時期</th>
                    <th scope="col">ストレージ容量</th>
                    <th scope="col">中古最安（税込）</th>
                    <th scope="col">中古価格</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.map((m) => (
                    <tr key={m.id}>
                      <td className="battery-table__model-cell">
                        <div className="battery-table__model-inner">
                          <div className="battery-table__img-wrap">
                            {m.image && (
                              <img
                                src={`/images/macbook/${m.image}`}
                                alt={m.model}
                                loading="lazy"
                              />
                            )}
                          </div>
                          <div className="battery-table__model-info">
                            <Link href={`/macbook/${m.slug}`} className="battery-table__model-name">
                              {m.model}
                            </Link>
                            <span className="battery-table__date">{formatDate(m.date)} 発売{m.cpu ? ` / ${m.cpu}` : ''}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="storage-tags">
                          {expandStorageRange(m.strage, MACBOOK_STORAGE_STEPS).map((opt) => (
                            <span key={opt} className="storage-tag">{opt}</span>
                          ))}
                          {!m.strage && '-'}
                        </div>
                      </td>
                      <td className="storage-price-cell">
                        <div className="storage-price-cell__inner">
                          {m.storageLabel && (
                            <span className="storage-price-label">{m.storageLabel}</span>
                          )}
                          {m.avgMin != null ? (
                            <span className="storage-price-value">
                              {formatPrice(m.avgMin)}〜
                            </span>
                          ) : (
                            <span className="storage-price-na">-</span>
                          )}
                        </div>
                      </td>
                      <td>
                        {m.iosysUrl ? (
                          <a
                            href={m.iosysUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="m-btn m-btn--primary m-btn--sm"
                          >
                            イオシスで探す
                          </a>
                        ) : (
                          <span className="storage-price-na">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            表示価格は最小容量での最安値です。容量が大きいモデルは上記より高くなります。
            詳細は「<Link href="/macbook/price-info/">MacBook中古価格相場グラフ</Link>」で確認できます。
          </p>
        </div>
      </div>
    </section>
  )
}
