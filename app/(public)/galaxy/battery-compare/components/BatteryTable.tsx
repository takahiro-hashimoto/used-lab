'use client'
import ContentImage from '../../../../components/ContentImage'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { parseDate, formatDate } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'

type BatteryModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  battery: string | null
  series: string | null
  iosysUrl: string | null
}

type Props = {
  models: BatteryModel[]
}

type FilterType = 'all' | 's' | 'a' | 'z'

/** series 値（'S' | 'A' | 'Z Flip' | 'Z Fold'）をフィルタ種別に丸める */
function getSeriesCategory(series: string | null): FilterType {
  if (!series) return 'all'
  const s = series.toLowerCase()
  if (s.startsWith('z')) return 'z'
  if (s === 'a') return 'a'
  if (s === 's') return 's'
  return 'all'
}

/** series の表示ラベル */
function seriesLabel(series: string | null): string {
  if (!series) return '-'
  const s = series.toLowerCase()
  if (s === 's') return 'Sシリーズ'
  if (s === 'a') return 'Aシリーズ'
  if (s.startsWith('z')) return `折りたたみ（${series}）`
  return series
}

/** mAh 文字列から数値を取り出す（"5000mAh" → 5000）。取れなければ 0 */
function parseCapacity(battery: string | null): number {
  if (!battery) return 0
  const num = battery.replace(/,/g, '').match(/\d+/)
  return num ? parseInt(num[0], 10) : 0
}

export default function BatteryTable({ models }: Props) {
  const [modelFilter, setModelFilter] = useState<FilterType>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getSeriesCategory(m.series) === modelFilter)
    }

    // バッテリー容量ランキング（大きい順）
    result.sort((a, b) => {
      const diff = parseCapacity(b.battery) - parseCapacity(a.battery)
      if (diff !== 0) return diff
      return parseDate(b.date).getTime() - parseDate(a.date).getTime()
    })

    return result
  }, [models, modelFilter])

  return (
    <section className="l-section" id="battery-ranking" aria-labelledby="heading-battery-ranking">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-battery-ranking">
          歴代Galaxyのバッテリー容量 ランキング
        </h2>
        <p className="m-section-desc">歴代Samsung Galaxyのバッテリー容量（mAh）を、容量が大きい順に並べて比較できます。フラッグシップのSシリーズやミドルレンジのAシリーズ、折りたたみのZシリーズをまとめてチェックできます。</p>
        <p className="m-section-desc">Galaxyのスペックを網羅的に比較したい場合は<Link prefetch={false} href="/galaxy/galaxy-spec-table/">歴代Galaxyスペック比較表</Link>をご覧ください。</p>

        <div className="u-mb-xl" aria-label="絞り込み">
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
        </div>

        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table m-table--sticky-col battery-table">
                <caption className="visually-hidden">歴代Samsung Galaxyバッテリー容量比較表</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル／発売時期</th>
                    <th scope="col">容量</th>
                    <th scope="col">シリーズ</th>
                    <th scope="col">発売日</th>
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
                            <span className="battery-table__date">{formatDate(m.date)} 発売</span>
                          </div>
                        </div>
                      </th>
                      <td className="battery-table__capacity">{m.battery || '-'}</td>
                      <td>{seriesLabel(m.series)}</td>
                      <td>{formatDate(m.date)}</td>
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
