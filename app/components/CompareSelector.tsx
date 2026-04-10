'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import RatingMark from '@/app/components/RatingMark'

type CompareRow = {
  section: string
  label: string
  current: string
  compare: string
}

type ShopLink = { product_id: number; shop_id: number; url: string }

type Props = {
  currentModel: { id: number; slug: string; image: string | null }
  allModels: { id: number; slug: string; image: string | null }[]
  initialCompareId: number
  iosysUrl?: string
  /** モデル個別URLがない場合に使うイオシスカテゴリURL */
  fallbackIosysUrl?: string
  shopLinks?: ShopLink[]
  imagePath: string
  detailPath: string
  imageWidth?: number
  imageHeight?: number
  getCurrentName: () => string
  getCompareName: (model: any) => string
  getOptionLabel: (model: any) => string
  getCaption: (current: any, compare: any) => string
  buildRows: (current: any, compare: any) => CompareRow[]
}

function CellValue({ value }: { value: string }) {
  if (value === '◯') return <RatingMark mark="◯" size="sm" />
  if (value === '×') return <RatingMark mark="×" size="sm" />
  const normalized = value.replace(/<br\s*\/?>/g, '\n')
  if (normalized.includes('\n')) {
    return <>{normalized.split('\n').map((line, i) => (
      <span key={i}>{i > 0 && <br />}{line}</span>
    ))}</>
  }
  return <>{normalized}</>
}

export default function CompareSelector({
  currentModel,
  allModels,
  initialCompareId,
  iosysUrl,
  fallbackIosysUrl,
  shopLinks = [],
  imagePath,
  detailPath,
  imageWidth = 120,
  imageHeight = 120,
  getCurrentName,
  getCompareName,
  getOptionLabel,
  getCaption,
  buildRows,
}: Props) {
  const [compareId, setCompareId] = useState(initialCompareId)
  const compareModel = useMemo(() => allModels.find((m) => m.id === compareId) || allModels[0], [allModels, compareId])
  const rows = useMemo(() => buildRows(currentModel, compareModel), [currentModel, compareModel, buildRows])
  const sections = useMemo(() => [...new Set(rows.map((r) => r.section))], [rows])

  const currentName = getCurrentName()
  const compareName = getCompareName(compareModel)
  const currentIosysUrl = iosysUrl || fallbackIosysUrl
  const compareIosysUrl = shopLinks.find((l) => l.product_id === compareModel.id && l.shop_id === 1)?.url || fallbackIosysUrl

  const sentinelRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    const table = tableRef.current
    if (!sentinel || !table) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        table.classList.toggle('is-stuck', !entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="m-card m-card--shadow compare-card">
      <div ref={sentinelRef} style={{ height: 1, marginBottom: -1 }} />
      <table ref={tableRef} className="compare-table">
        <caption className="visually-hidden">
          {getCaption(currentModel, compareModel)}
        </caption>
        <colgroup>
          <col className="compare-table__col-label" />
          <col />
          <col />
        </colgroup>

        <thead>
          <tr>
            <th></th>
            <td className="compare-table__header-cell">
              <div className="compare-header-info">
                <strong className="compare-model-name">{currentName}</strong>
                <span className="compare-model-note">このモデルを表示中</span>
              </div>
            </td>
            <td className="compare-table__header-cell">
              <div className="compare-header-info">
                <label htmlFor="compare-model-select" className="visually-hidden">比較するモデルを選択</label>
                <select
                  className="compare-select"
                  id="compare-model-select"
                  value={compareId}
                  onChange={(e) => setCompareId(Number(e.target.value))}
                >
                  {allModels
                    .filter((m) => m.id !== currentModel.id)
                    .map((m) => (
                      <option key={m.id} value={m.id}>{getOptionLabel(m)}</option>
                    ))}
                </select>
                <a href={`/${detailPath}/${compareModel.slug}`} className="compare-model-link">
                  このモデルの詳細を見る &rsaquo;
                </a>
              </div>
            </td>
          </tr>
        </thead>

        <tbody className="compare-table__image-row">
          <tr>
            <th></th>
            <td className="compare-table__image-cell">
              {currentModel.image && (
                <Image
                  src={`/images/${imagePath}/${currentModel.image}`}
                  alt={currentName}
                  width={imageWidth}
                  height={imageHeight}
                  className="compare-model-img"
                />
              )}
            </td>
            <td className="compare-table__image-cell">
              {compareModel.image && (
                <Image
                  src={`/images/${imagePath}/${compareModel.image}`}
                  alt={compareName}
                  width={imageWidth}
                  height={imageHeight}
                  className="compare-model-img"
                />
              )}
            </td>
          </tr>
        </tbody>

        {sections.map((section) => {
          const sectionRows = rows.filter((r) => r.section === section)
          return (
            <tbody key={section}>
              <tr>
                <th colSpan={3} className="compare-category-cell">
                  <span className="compare-category">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {section}
                  </span>
                </th>
              </tr>
              {sectionRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td><CellValue value={row.current} /></td>
                  <td><CellValue value={row.compare} /></td>
                </tr>
              ))}
            </tbody>
          )
        })}

        <tfoot>
          <tr className="compare-table__action-row">
            <th></th>
            <td>
              {currentIosysUrl ? (
                <a href={currentIosysUrl} target="_blank" rel="noopener noreferrer nofollow" className="m-btn m-btn--primary m-btn--block">
                  中古価格を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              ) : (
                <a href="#shops" className="m-btn m-btn--primary m-btn--block">
                  {currentName}の購入先 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              )}
            </td>
            <td>
              {compareIosysUrl ? (
                <a href={compareIosysUrl} target="_blank" rel="noopener noreferrer nofollow" className="m-btn m-btn--primary m-btn--block">
                  中古価格を見る <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              ) : (
                <a href={`/${detailPath}/${compareModel.slug}`} className="m-btn m-btn--primary m-btn--block">
                  {compareName}の詳細 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
