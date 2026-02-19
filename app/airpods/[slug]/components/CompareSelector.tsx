'use client'

import { useState } from 'react'


import Image from 'next/image'
import type { AirPodsModel } from '@/lib/types'

type Props = {
  currentModel: AirPodsModel
  allModels: AirPodsModel[]
  initialCompareId: number
  iosysUrl?: string
}

type CompareRow = {
  section: string
  label: string
  current: string
  compare: string
}

function getBoolValue(val: boolean): string {
  return val ? '◯' : '×'
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

function buildCompareRows(current: AirPodsModel, compare: AirPodsModel): CompareRow[] {
  return [
    // 基本仕様
    { section: '基本仕様', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: '基本仕様', label: 'チップ', current: current.chip || '-', compare: compare.chip || '-' },
    { section: '基本仕様', label: '装着方式', current: current.fit || '-', compare: compare.fit || '-' },
    { section: '基本仕様', label: '操作方法', current: current.control || '-', compare: compare.control || '-' },
    // バッテリー・充電
    { section: 'バッテリー・充電', label: 'バッテリー（本体）', current: current.battery_earphone || '-', compare: compare.battery_earphone || '-' },
    { section: 'バッテリー・充電', label: 'バッテリー（ケース込）', current: current.battery_case || '-', compare: compare.battery_case || '-' },
    { section: 'バッテリー・充電', label: '充電端子', current: current.port || '-', compare: compare.port || '-' },
    { section: 'バッテリー・充電', label: 'MagSafe', current: getBoolValue(current.magsafe), compare: getBoolValue(compare.magsafe) },
    { section: 'バッテリー・充電', label: 'Qi充電', current: getBoolValue(current.qi_charge), compare: getBoolValue(compare.qi_charge) },
    // オーディオ機能
    { section: 'オーディオ機能', label: 'ノイズキャンセリング', current: getBoolValue(current.anc), compare: getBoolValue(compare.anc) },
    { section: 'オーディオ機能', label: '空間オーディオ', current: getBoolValue(current.spatial_audio), compare: getBoolValue(compare.spatial_audio) },
    { section: 'オーディオ機能', label: 'アダプティブオーディオ', current: getBoolValue(current.adaptive_audio), compare: getBoolValue(compare.adaptive_audio) },
    // その他
    { section: 'その他', label: '防水性能', current: current.waterproof || '×', compare: compare.waterproof || '×' },
  ]
}

function CellValue({ value }: { value: string }) {
  if (value === '◯') return <span className="m-rating__icon m-rating__icon--good" aria-label="対応">&#9675;</span>
  if (value === '×') return <span className="m-spec-row__cross" aria-label="非対応">&times;</span>
  const normalized = value.replace(/<br\s*\/?>/g, '\n')
  if (normalized.includes('\n')) {
    return <>{normalized.split('\n').map((line, i) => (
      <span key={i}>{i > 0 && <br />}{line}</span>
    ))}</>
  }
  return <>{normalized}</>
}

function getDisplayName(model: AirPodsModel): string {
  return model.model ? `${model.name}（${model.model}）` : model.name
}

function getShortName(model: AirPodsModel): string {
  return model.name
}

export default function CompareSelector({ currentModel, allModels, initialCompareId, iosysUrl }: Props) {
  const [compareId, setCompareId] = useState(initialCompareId)
  const compareModel = allModels.find((m) => m.id === compareId) || allModels[0]
  const rows = buildCompareRows(currentModel, compareModel)
  const sections = [...new Set(rows.map((r) => r.section))]

  return (
    <div className="m-card m-card--shadow compare-card">
      <table className="compare-table">
        <caption className="visually-hidden">
          {getDisplayName(currentModel)} と {getDisplayName(compareModel)} のスペック比較
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
              <strong className="compare-model-name">{getShortName(currentModel)}</strong>
              <span className="compare-model-note">このモデルを表示中</span>
              {currentModel.image && (
                <Image
                  src={`/images/airpods/${currentModel.image}`}
                  alt={getDisplayName(currentModel)}
                  width={160}
                  height={100}
                  className="compare-model-img"
                />
              )}
            </td>
            <td className="compare-table__header-cell">
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
                    <option key={m.id} value={m.id}>{getShortName(m)}</option>
                  ))}
              </select>
              <a href={`/airpods/${compareModel.slug}`} className="compare-model-link">
                このモデルの詳細を見る &rsaquo;
              </a>
              {compareModel.image && (
                <Image
                  src={`/images/airpods/${compareModel.image}`}
                  alt={getDisplayName(compareModel)}
                  width={160}
                  height={100}
                  className="compare-model-img"
                />
              )}
            </td>
          </tr>
        </thead>

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
              {iosysUrl ? (
                <a href={iosysUrl} target="_blank" rel="noopener noreferrer nofollow" className="m-btn m-btn--primary m-btn--block">
                  {getShortName(currentModel)}の購入先 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              ) : (
                <a href="#shops" className="m-btn m-btn--primary m-btn--block">
                  {getShortName(currentModel)}の購入先 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              )}
            </td>
            <td>
              <a href={`/airpods/${compareModel.slug}`} className="m-btn m-btn--primary m-btn--block">
                {getShortName(compareModel)}の詳細 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
