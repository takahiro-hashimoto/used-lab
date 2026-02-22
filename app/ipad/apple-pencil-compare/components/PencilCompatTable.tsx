'use client'

import { useState, useMemo } from 'react'
import { parseDate, formatDate } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type PencilModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  size: string | null
  cpu: string | null
  pencil: string | null
}

type Props = {
  models: PencilModel[]
  shopLinks: ProductShopLink[]
}

type FilterType = 'all' | 'pro' | 'air' | 'mini' | 'standard'
type PencilFilter = 'all' | 'pro' | 'usbc' | 'gen2' | 'gen1'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro')) return 'pro'
  if (lower.includes('air')) return 'air'
  if (lower.includes('mini')) return 'mini'
  return 'standard'
}

function hasPencil(pencil: string | null, type: string): boolean {
  if (!pencil) return false
  const lower = pencil.toLowerCase()
  switch (type) {
    case 'pro':
      return lower.includes('pro')
    case 'usbc':
      return lower.includes('usb-c') || lower.includes('usb c')
    case 'gen2':
      return lower.includes('第2世代') || lower.includes('2nd')
    case 'gen1':
      return lower.includes('第1世代') || lower.includes('1st')
    default:
      return false
  }
}

function matchPencilFilter(pencil: string | null, filter: PencilFilter): boolean {
  if (filter === 'all') return true
  return hasPencil(pencil, filter)
}

export default function PencilCompatTable({ models, shopLinks }: Props) {
  const [modelFilter, setModelFilter] = useState<FilterType>('all')
  const [pencilFilter, setPencilFilter] = useState<PencilFilter>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    if (pencilFilter !== 'all') {
      result = result.filter((m) => matchPencilFilter(m.pencil, pencilFilter))
    }

    // 発売日が古い順
    result.sort((a, b) => {
      const da = parseDate(a.date).getTime()
      const db = parseDate(b.date).getTime()
      return da - db
    })

    return result
  }, [models, modelFilter, pencilFilter])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const PENCIL_TYPES = [
    { key: 'pro', label: 'Pro' },
    { key: 'usbc', label: 'USB-C' },
    { key: 'gen2', label: '第2世代' },
    { key: 'gen1', label: '第1世代' },
  ]

  return (
    <section className="l-section l-section--bg-subtle" id="compare-table" aria-labelledby="heading-compat">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compat">
          各Apple Pencilの対応機種一覧表
        </h2>
        <p className="m-section-desc">
          各iPadがどのApple Pencilに対応しているかを一覧表にまとめました。
        </p>
        <p className="m-section-desc">
          もっと詳しく各機種を比較したい方は「<a href="/ipad/ipad-spec-table">iPad スペック比較</a>」もご覧ください。
        </p>

        {/* フィルターUI */}
        <div className="spec-filter" aria-label="絞り込み">
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
          <div className="spec-filter__row">
            <span className="spec-filter__label">対応Pencilで絞り込む</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['pro', 'Pro'],
                ['usbc', 'USB-C'],
                ['gen2', '第2世代'],
                ['gen1', '第1世代'],
              ] as [PencilFilter, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${pencilFilter === key ? ' is-active' : ''}`}
                  onClick={() => setPencilFilter(key)}
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
                <caption className="visually-hidden">Apple Pencil対応機種一覧表</caption>
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
                  {/* Apple Pencil対応行 */}
                  {PENCIL_TYPES.map((pt) => (
                    <tr key={pt.key}>
                      <th scope="row" className="spec-compare-table__sticky">{pt.label}</th>
                      {filteredModels.map((m) => (
                        <td key={m.id}>
                          {hasPencil(m.pencil, pt.key) ? (
                            <span className="m-spec-row__circle" aria-label="対応">●</span>
                          ) : (
                            <span className="m-spec-row__dash" aria-label="非対応">ー</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* 在庫確認 */}
                  <tr className="spec-compare-table__action-row">
                    <th scope="row" className="spec-compare-table__sticky">在庫確認</th>
                    {filteredModels.map((m) => {
                      const link = getShopLink(m.id, 1)
                      return (
                        <td key={m.id}>
                          {link ? (
                            <a href={link.url} className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener noreferrer" target="_blank">
                              中古価格を見る
                            </a>
                          ) : '-'}
                        </td>
                      )
                    })}
                  </tr>
                  {/* 詳細情報 */}
                  <tr className="spec-compare-table__action-row">
                    <th scope="row" className="spec-compare-table__sticky">詳細情報</th>
                    {filteredModels.map((m) => (
                      <td key={m.id}>
                        <a href={`/ipad/${m.slug}`} className="m-btn m-btn--amazon m-btn--sm">
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
