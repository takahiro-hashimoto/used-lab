'use client'
import ContentImage from '../../../../components/ContentImage'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { parseDate, formatDate, BoolCell } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'

type ChargingModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  battery: string | null
  series: string | null
  wired_charging: string | null
  wireless_charging: string | null
  reverse_charging: boolean
  port: string | null
  iosysUrl: string | null
}

type Props = {
  models: ChargingModel[]
}

type FilterType = 'all' | 's' | 'a' | 'z'
type FeatureFilter = 'all' | 'wireless' | 'reverse'

/** series 値（'S' | 'A' | 'Z Flip' | 'Z Fold'）をフィルタ種別に丸める */
function getSeriesCategory(series: string | null): FilterType {
  if (!series) return 'all'
  const s = series.toLowerCase()
  if (s.startsWith('z')) return 'z'
  if (s === 'a') return 'a'
  if (s === 's') return 's'
  return 'all'
}

export default function ChargingTable({ models }: Props) {
  const [modelFilter, setModelFilter] = useState<FilterType>('all')
  const [featureFilter, setFeatureFilter] = useState<FeatureFilter>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getSeriesCategory(m.series) === modelFilter)
    }

    switch (featureFilter) {
      case 'wireless':
        result = result.filter((m) => !!m.wireless_charging)
        break
      case 'reverse':
        result = result.filter((m) => m.reverse_charging)
        break
    }

    result.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())

    return result
  }, [models, modelFilter, featureFilter])

  return (
    <section className="l-section" id="charging" aria-labelledby="heading-charging">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-charging">
          歴代Galaxyの充電方法一覧
        </h2>
        <p className="m-section-desc">
          各モデルの有線充電の出力・ワイヤレス充電・Wireless PowerShare（リバースワイヤレス充電）の対応状況を一覧で確認できます。
        </p>

        <div className="spec-filter u-mb-xl" aria-label="絞り込み">
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
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="spec-filter__row">
            <span className="spec-filter__label">機能別</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['wireless', 'ワイヤレス充電対応'],
                ['reverse', 'Wireless PowerShare対応'],
              ] as [FeatureFilter, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${featureFilter === key ? ' is-active' : ''}`}
                  onClick={() => setFeatureFilter(key)}
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
          <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table m-table--sticky-col battery-table">
                <caption className="visually-hidden">歴代Samsung Galaxy充電方法一覧</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル／バッテリー容量</th>
                    <th scope="col">発売日</th>
                    <th scope="col">充電端子</th>
                    <th scope="col">有線充電</th>
                    <th scope="col">ワイヤレス充電</th>
                    <th scope="col">Wireless PowerShare</th>
                    <th scope="col">中古価格</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.map((m) => (
                    <tr key={m.id}>
                      <th scope="row" className="battery-table__model-cell bench-table__sticky">
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
                            <Link prefetch={false} href={`/galaxy/${m.slug}/`} className="battery-table__model-name">{m.model}</Link>
                            <span className="battery-table__date">容量: {m.battery || '-'}</span>
                          </div>
                        </div>
                      </th>
                      <td>{formatDate(m.date)}</td>
                      <td>{m.port || '-'}</td>
                      <td>{m.wired_charging || '-'}</td>
                      <td>{m.wireless_charging || '-'}</td>
                      <td><BoolCell value={m.reverse_charging} /></td>
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
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </StickyTableWrapper>
        )}
      </div>
    </section>
  )
}
