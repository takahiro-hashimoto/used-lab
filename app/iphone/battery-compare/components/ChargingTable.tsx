'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { parseDate, formatDate, BoolCell } from '@/app/components/spec-table-utils'

type ChargingModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  battery: string | null
  port: string | null
  magsafe: boolean
}

type Props = {
  models: ChargingModel[]
}

type FilterType = 'all' | 'promax' | 'pro' | 'plus' | 'standard' | 'se' | 'mini'
type FeatureFilter = 'all' | 'magsafe' | 'usbc' | 'lightning'

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

function hasQiCharging(model: ChargingModel): boolean {
  return model.magsafe || model.port?.toLowerCase().includes('lightning') === true
}

export default function ChargingTable({ models }: Props) {
  const [modelFilter, setModelFilter] = useState<FilterType>('all')
  const [featureFilter, setFeatureFilter] = useState<FeatureFilter>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    switch (featureFilter) {
      case 'magsafe':
        result = result.filter((m) => m.magsafe)
        break
      case 'usbc':
        result = result.filter((m) => m.port?.toLowerCase().includes('usb'))
        break
      case 'lightning':
        result = result.filter((m) => m.port?.toLowerCase().includes('lightning'))
        break
    }

    result.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())

    return result
  }, [models, modelFilter, featureFilter])

  return (
    <section className="l-section" id="charging" aria-labelledby="heading-charging">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-charging">
          歴代iPhoneのコネクタ・充電方法一覧
        </h2>
        <p className="m-section-desc">
          各モデルの充電ポートやワイヤレス充電の対応状況を一覧で確認できます。
        </p>

        {/* フィルターUI */}
        <div className="spec-filter" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">機種別の絞り込み</span>
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
          <div className="spec-filter__row">
            <span className="spec-filter__label">機能別の絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['magsafe', 'MagSafe対応'],
                ['usbc', 'USB-C対応'],
                ['lightning', 'Lightning対応'],
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

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <div className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table battery-table">
                <caption className="visually-hidden">歴代iPhoneコネクタ・充電方法一覧</caption>
                <thead>
                  <tr>
                    <th scope="col">モデル／バッテリー容量</th>
                    <th scope="col">発売日</th>
                    <th scope="col">充電ポート</th>
                    <th scope="col">MagSafe</th>
                    <th scope="col">Qi充電</th>
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
                          <span className="battery-table__date">容量: {m.battery || '-'}</span>
                        </div>
                      </td>
                      <td>{formatDate(m.date)}</td>
                      <td>{m.port || '-'}</td>
                      <td><BoolCell value={m.magsafe} /></td>
                      <td><BoolCell value={hasQiCharging(m)} /></td>
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
