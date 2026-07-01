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
  video: string | null
  streaming: string | null
  audio: string | null
  iosysUrl: string | null
}

type Props = {
  models: BatteryModel[]
}

type FilterType = 'all' | 'pro-family' | 'standard-family' | 'se-family'

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


export default function BatteryTable({ models }: Props) {
  const [modelFilter, setModelFilter] = useState<FilterType>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      const cat = getModelCategory
      if (modelFilter === 'pro-family') {
        result = result.filter((m) => ['promax', 'pro'].includes(cat(m.model)))
      } else if (modelFilter === 'standard-family') {
        result = result.filter((m) => ['plus', 'standard', 'mini'].includes(cat(m.model)))
      } else if (modelFilter === 'se-family') {
        result = result.filter((m) => ['se'].includes(cat(m.model)))
      }
    }

    result.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())

    return result
  }, [models, modelFilter])

  return (
    <section className="l-section" id="battery-ranking" aria-labelledby="heading-battery-ranking">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-battery-ranking">
          歴代iPhoneのバッテリー容量 一覧表
        </h2>
        <p className="m-section-desc">歴代iPhoneのバッテリー容量と連続使用時間の目安を一覧で比較できます。</p>
        <p className="m-section-desc">iPhoneのスペックを網羅的に比較したい場合は<Link href="/iphone/iphone-spec-table/">歴代iPhoneスペック比較表</Link>をご覧ください。</p>

        <div className="u-mb-xl" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">モデル別絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['pro-family', 'Pro'],
                ['standard-family', 'スタンダード'],
                ['se-family', '廉価モデル'],
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
                <caption className="visually-hidden">歴代iPhoneバッテリー容量比較表</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル／発売時期</th>
                    <th scope="col">容量</th>
                    <th scope="col">ビデオ再生</th>
                    <th scope="col">ストリーミング</th>
                    <th scope="col">音声再生</th>
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
                        </div>
                      </th>
                      <td className="battery-table__capacity">{m.battery || '-'}</td>
                      <td>{m.video || '-'}</td>
                      <td>{m.streaming || '-'}</td>
                      <td>{m.audio || '-'}</td>
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
