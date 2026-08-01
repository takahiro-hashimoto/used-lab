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
  battery_life: string | null
  battery_life_saver: string | null
  iosysUrl: string | null
}

type Props = {
  models: BatteryModel[]
}

type FilterType = 'all' | 'pro-family' | 'standard-family' | 'a-family'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('fold')) return 'fold'
  if (lower.includes('pro')) return 'pro'
  if (/\d+a\b/.test(lower) || lower.includes(' a ') || /\ba$/.test(lower)) return 'a'
  return 'standard'
}

/** mAh 文字列から数値を取り出す（"4614mAh" → 4614）。取れなければ 0 */
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
      const cat = getModelCategory
      if (modelFilter === 'pro-family') {
        result = result.filter((m) => ['pro', 'fold'].includes(cat(m.model)))
      } else if (modelFilter === 'standard-family') {
        result = result.filter((m) => ['standard'].includes(cat(m.model)))
      } else if (modelFilter === 'a-family') {
        result = result.filter((m) => ['a'].includes(cat(m.model)))
      }
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
          歴代Google Pixelのバッテリー容量 ランキング
        </h2>
        <p className="m-section-desc">歴代Google Pixelのバッテリー容量（mAh）と公称電池持ちの目安を、容量が大きい順に並べて比較できます。</p>
        <p className="m-section-desc">Pixelのスペックを網羅的に比較したい場合は<Link prefetch={false} href="/pixel/pixel-spec-table/">歴代Pixelスペック比較表</Link>をご覧ください。</p>

        <div className="u-mb-xl" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">モデル別</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['pro-family', 'Pro / Fold'],
                ['standard-family', 'スタンダード'],
                ['a-family', 'aシリーズ'],
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
                <caption className="visually-hidden">歴代Google Pixelバッテリー容量比較表</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル／発売時期</th>
                    <th scope="col">容量</th>
                    <th scope="col">通常使用</th>
                    <th scope="col">最大（省電力時）</th>
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
                                src={`/images/pixel/${m.image}`}
                                alt={m.model}
                                loading="lazy"
                              />
                            )}
                          </div>
                          <div className="battery-table__model-info">
                            <Link prefetch={false} href={`/pixel/${m.slug}`} className="battery-table__model-name">
                              {m.model}
                            </Link>
                            <span className="battery-table__date">{formatDate(m.date)} 発売</span>
                          </div>
                        </div>
                      </th>
                      <td className="battery-table__capacity">{m.battery || '-'}</td>
                      <td>{m.battery_life || '-'}</td>
                      <td>{m.battery_life_saver || '-'}</td>
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
