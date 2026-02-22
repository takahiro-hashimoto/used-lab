'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { parseDate, formatDate } from '@/app/components/spec-table-utils'

type BatteryModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  battery: string | null
  video: string | null
  streaming: string | null
  audio: string | null
}

type Props = {
  models: BatteryModel[]
}

type SortOrder = 'new' | 'old' | 'battery-desc' | 'battery-asc'
type FilterType = 'all' | 'promax' | 'pro' | 'plus' | 'standard' | 'se' | 'mini'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro max')) return 'promax'
  if (lower.includes('pro')) return 'pro'
  if (lower.includes('plus')) return 'plus'
  if (lower.includes('se') || lower.includes('16e')) return 'se'
  if (lower.includes('mini')) return 'mini'
  if (lower.includes('air')) return 'standard'
  return 'standard'
}

function parseBatteryMah(battery: string | null): number {
  if (!battery) return 0
  const match = battery.replace(/,/g, '').match(/([\d]+)/)
  return match ? parseInt(match[1], 10) : 0
}

export default function BatteryTable({ models }: Props) {
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
        case 'battery-desc':
          return parseBatteryMah(b.battery) - parseBatteryMah(a.battery)
        case 'battery-asc':
          return parseBatteryMah(a.battery) - parseBatteryMah(b.battery)
      }
    })

    return result
  }, [models, sortOrder, modelFilter])

  return (
    <section className="l-section l-section--bg-subtle" id="battery-ranking" aria-labelledby="heading-battery-ranking">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-battery-ranking">
          歴代iPhoneのバッテリー容量 一覧表
        </h2>
        <p className="m-section-desc">
          歴代iPhoneのバッテリー容量と連続使用時間の目安を一覧で比較できます。
        </p>

        {/* フィルターUI */}
        <div className="spec-filter" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">並び替え</span>
            <div className="spec-filter__tags">
              {([
                ['new', '発売が新しい順'],
                ['old', '発売が古い順'],
                ['battery-desc', 'バッテリー多い順'],
                ['battery-asc', 'バッテリー少ない順'],
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
                ['promax', 'ProMax'],
                ['pro', 'Pro'],
                ['plus', 'Plus'],
                ['standard', '無印'],
                ['se', 'SE'],
                ['mini', 'mini'],
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

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <div className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table battery-table">
                <caption className="visually-hidden">歴代iPhoneバッテリー容量比較表</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル／発売時期</th>
                    <th scope="col">容量</th>
                    <th scope="col">ビデオ再生</th>
                    <th scope="col">ストリーミング</th>
                    <th scope="col">音声再生</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.map((m) => (
                    <tr key={m.id}>
                      <td className="battery-table__model-cell">
                        <div className="battery-table__img-wrap">
                          {m.image && (
                            <img
                              src={`/images/iphone/${m.image}`}
                              alt={m.model}
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="battery-table__model-info">
                          <Link href={`/iphone/${m.slug}`} className="battery-table__model-name">
                            {m.model}
                          </Link>
                          <span className="battery-table__date">{formatDate(m.date)} 発売</span>
                        </div>
                      </td>
                      <td className="battery-table__capacity">{m.battery || '-'}</td>
                      <td>{m.video || '-'}</td>
                      <td>{m.streaming || '-'}</td>
                      <td>{m.audio || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
