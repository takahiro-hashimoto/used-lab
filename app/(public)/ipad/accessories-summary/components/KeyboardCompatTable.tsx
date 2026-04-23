'use client'

import { useState, useMemo } from 'react'
import { parseDate, formatDate } from '@/app/components/spec-table-utils'
import RatingMark from '@/app/components/RatingMark'

type KeyboardModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  size: string | null
  cpu: string | null
  keyboards: SerializedAccessory[]
}

type SerializedAccessory = {
  id: number
  name: string
  image: string | null
  model_number: string | null
  release_date: string | null
  iosys_url: string | null
  amazon_url: string | null
}

type Props = {
  models: KeyboardModel[]
  keyboardAccessories: SerializedAccessory[]
}

type FilterType = 'all' | 'pro' | 'air' | 'mini' | 'standard'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro')) return 'pro'
  if (lower.includes('air')) return 'air'
  if (lower.includes('mini')) return 'mini'
  return 'standard'
}

function hasKeyboard(keyboards: SerializedAccessory[], keyboardId: number): boolean {
  return keyboards.some((k) => k.id === keyboardId)
}

export default function KeyboardCompatTable({ models, keyboardAccessories }: Props) {
  const [modelFilter, setModelFilter] = useState<FilterType>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    // 発売日が古い順
    result.sort((a, b) => {
      const da = parseDate(a.date).getTime()
      const db = parseDate(b.date).getTime()
      return da - db
    })

    return result
  }, [models, modelFilter])

  return (
    <section className="l-section" id="compare-table" aria-labelledby="heading-compat">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compat">
          各iPadのMagic Keyboard対応一覧表
        </h2>
        <p className="m-section-desc">
          各iPadモデルがどのキーボードに対応しているかを一覧表にまとめました。<br />
          型番とあわせてチェックすることで、間違いのない購入ができます。
        </p>
        {/* フィルターUI */}
        <div className="u-mb-xl" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">機種絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['pro', 'Pro'],
                ['air', 'Air'],
                ['standard', '無印'],
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
              <table className="m-table spec-compare-table">
                <caption className="visually-hidden">iPad × Magic Keyboard対応機種一覧表</caption>
                <thead>
                  <tr>
                    <th scope="col" className="spec-compare-table__sticky">モデル名</th>
                    {filteredModels.map((m) => (
                      <th key={m.id} scope="col">{m.model}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* 外観 */}
                  <tr>
                    <th scope="row" className="spec-compare-table__sticky">外観</th>
                    {filteredModels.map((m) => (
                      <td key={m.id}>
                        {m.image && (
                          <img
                            src={`/images/ipad/${m.image}`}
                            alt={m.model}
                            width={50}
                            height={65}
                            loading="lazy"
                            className="spec-compare-table__cell-img"
                          />
                        )}
                        {m.size || '-'}
                      </td>
                    ))}
                  </tr>
                  {/* 基本情報 */}
                  <tr>
                    <th scope="row" className="spec-compare-table__sticky">基本情報</th>
                    {filteredModels.map((m) => (
                      <td key={m.id}>
                        {formatDate(m.date)} 発売<br />
                        {m.cpu || '-'}
                      </td>
                    ))}
                  </tr>
                  {/* キーボード対応行 */}
                  {keyboardAccessories.map((kb) => (
                    <tr key={kb.id}>
                      <th scope="row" className="spec-compare-table__sticky"><a href={`#kb-${kb.id}`} className="spec-compare-table__kb-link">{kb.name.replace(/（.*?）/g, '').trim()}</a><br /><span className="spec-compare-table__sub">{kb.model_number}</span></th>
                      {filteredModels.map((m) => (
                        <td key={m.id}>
                          {hasKeyboard(m.keyboards, kb.id) ? (
                            <RatingMark mark="◯" size="sm" />
                          ) : (
                            <RatingMark mark="×" size="sm" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* 詳細情報 */}
                  <tr className="spec-compare-table__action-row">
                    <th scope="row" className="spec-compare-table__sticky">詳細情報</th>
                    {filteredModels.map((m) => (
                      <td key={m.id}>
                        <a href={`/ipad/${m.slug}`} className="m-btn m-btn--primary m-btn--sm">
                          商品詳細を見る
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
