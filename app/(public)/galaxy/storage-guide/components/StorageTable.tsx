'use client'
import ContentImage from '../../../../components/ContentImage'

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
  strage: string | null
  series: string | null
  microsd: boolean
  storageLabel: string | null
  avgMin: number | null
  iosysUrl: string | null
}

type Props = {
  models: StorageModel[]
}

type SortOrder = 'new' | 'old' | 'storage-desc' | 'storage-asc' | 'price-asc' | 'price-desc'
type FilterType = 'all' | 's' | 'a' | 'z'

function getSeriesCategory(series: string | null): FilterType {
  if (!series) return 'a'
  if (series === 'S') return 's'
  if (series === 'A') return 'a'
  if (series.startsWith('Z')) return 'z'
  return 'a'
}

const GALAXY_STORAGE_STEPS = [32, 64, 128, 256, 512, 1024]

export default function StorageTable({ models }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('new')
  const [modelFilter, setModelFilter] = useState<FilterType>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getSeriesCategory(m.series) === modelFilter)
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
          歴代Samsung Galaxyのストレージ容量・microSD対応・中古相場 一覧表
        </h2>
        <p className="m-section-desc">
          歴代Galaxyの容量ラインナップ・microSD対応の有無と、最小容量での中古相場を一覧で比較できます。
        </p>

        {/* フィルターUI */}
        <fieldset className="spec-filter u-mb-xl">
          <legend className="visually-hidden">テーブルの絞り込み</legend>
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
                  aria-pressed={sortOrder === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="spec-filter__row">
            <span className="spec-filter__label">シリーズ別</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['s', 'Sシリーズ'],
                ['a', 'Aシリーズ'],
                ['z', '折りたたみ（Z）'],
              ] as [FilterType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${modelFilter === key ? ' is-active' : ''}`}
                  onClick={() => setModelFilter(key)}
                  aria-pressed={modelFilter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <div className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table battery-table">
                <caption className="visually-hidden">歴代Samsung Galaxyストレージ容量・microSD対応・中古相場一覧表</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル／発売時期</th>
                    <th scope="col">ストレージ容量</th>
                    <th scope="col">microSD</th>
                    <th scope="col">中古相場（税込）</th>
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
                              <ContentImage
                                src={`/images/galaxy/${m.image}`}
                                alt={m.model}
                                loading="lazy"
                              />
                            )}
                          </div>
                          <div className="battery-table__model-info">
                            <Link prefetch={false} href={`/galaxy/${m.slug}`} className="battery-table__model-name">
                              {m.model}
                            </Link>
                            <span className="battery-table__date">{formatDate(m.date)} 発売</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="storage-tags">
                          {expandStorageRange(m.strage, GALAXY_STORAGE_STEPS).map((opt) => (
                            <span key={opt} className="storage-tag">{opt}</span>
                          ))}
                          {!m.strage && '-'}
                        </div>
                      </td>
                      <td>
                        {m.microsd ? (
                          <span style={{ color: '#10b981', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            <i className="fa-solid fa-circle-check" aria-hidden="true"></i> 対応
                          </span>
                        ) : (
                          <span style={{ color: '#9ca3af', whiteSpace: 'nowrap' }}>
                            <i className="fa-solid fa-xmark" aria-hidden="true"></i> 非対応
                          </span>
                        )}
                      </td>
                      <td className="storage-price-cell">
                        <div className="storage-price-cell__inner">
                          {m.storageLabel && (
                            <span className="storage-price-label">{m.storageLabel}</span>
                          )}
                          {m.avgMin != null ? (
                            <span className="storage-price-value">
                              {formatPrice(m.avgMin)}
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
                            aria-label={`${m.model}をイオシスで探す（新しいタブで開く）`}
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
            表示価格は最小容量での実勢相場（中央値）です。容量が大きいモデルは上記より高くなります。
            microSD対応モデル（主にAシリーズ）なら後から容量を増やせるので、本体容量が少なくても安く済ませやすいです。
            詳しい価格推移は「<Link prefetch={false} href="/galaxy/price-info/">Galaxy中古価格相場グラフ</Link>」で確認できます。
          </p>
        </div>
      </div>
    </section>
  )
}
