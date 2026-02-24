'use client'

import { useState } from 'react'


import Image from 'next/image'
import type { MacBookModel } from '@/lib/types'

type Props = {
  currentModel: MacBookModel
  allModels: MacBookModel[]
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

function buildCompareRows(current: MacBookModel, compare: MacBookModel): CompareRow[] {
  return [
    // 基本仕様
    { section: '基本仕様', label: 'サイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: '基本仕様', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: '基本仕様', label: '重さ', current: current.weight || '-', compare: compare.weight || '-' },
    { section: '基本仕様', label: 'ストレージ', current: current.strage || '-', compare: compare.strage || '-' },
    { section: '基本仕様', label: 'カラー', current: current.color || '-', compare: compare.color || '-' },
    // 処理性能
    { section: '処理性能', label: 'CPU', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: '処理性能', label: 'メモリ', current: current.ram || '-', compare: compare.ram || '-' },
    // ディスプレイ
    { section: 'ディスプレイ', label: 'ディスプレイ', current: current.display || '-', compare: compare.display || '-' },
    { section: 'ディスプレイ', label: '解像度', current: current.resolution || '-', compare: compare.resolution || '-' },
    { section: 'ディスプレイ', label: '輝度', current: current.luminance || '-', compare: compare.luminance || '-' },
    { section: 'ディスプレイ', label: 'ProMotion', current: getBoolValue(current.promotion), compare: getBoolValue(compare.promotion) },
    // その他
    { section: 'その他', label: 'バッテリー', current: current.battery || '-', compare: compare.battery || '-' },
    { section: 'その他', label: 'カメラ', current: current.camera || '-', compare: compare.camera || '-' },
    { section: 'その他', label: 'センターフレーム', current: getBoolValue(current.center_frame), compare: getBoolValue(compare.center_frame) },
    { section: 'その他', label: 'インターフェイス', current: current.port || '-', compare: compare.port || '-' },
    { section: 'その他', label: 'SDカードスロット', current: getBoolValue(current.slot), compare: getBoolValue(compare.slot) },
    { section: 'その他', label: 'HDMIポート', current: getBoolValue(current.hdmi), compare: getBoolValue(compare.hdmi) },
    { section: 'その他', label: 'MagSafe', current: getBoolValue(current.magsafe), compare: getBoolValue(compare.magsafe) },
    { section: 'その他', label: 'スピーカー', current: current.speaker || '-', compare: compare.speaker || '-' },
    { section: 'その他', label: '冷却ファン', current: getBoolValue(current.fan), compare: getBoolValue(compare.fan) },
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

export default function CompareSelector({ currentModel, allModels, initialCompareId, iosysUrl }: Props) {
  const [compareId, setCompareId] = useState(initialCompareId)
  const compareModel = allModels.find((m) => m.id === compareId) || allModels[0]
  const rows = buildCompareRows(currentModel, compareModel)
  const sections = [...new Set(rows.map((r) => r.section))]

  return (
    <div className="m-card m-card--shadow compare-card">
      <table className="compare-table">
        <caption className="visually-hidden">
          {currentModel.model} と {compareModel.model} のスペック比較
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
              <strong className="compare-model-name">{currentModel.shortname || currentModel.model}</strong>
              <span className="compare-model-note">このモデルを表示中</span>
              {currentModel.image && (
                <Image
                  src={`/images/macbook/${currentModel.image}`}
                  alt={currentModel.model}
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
                    <option key={m.id} value={m.id}>{m.shortname || m.model}</option>
                  ))}
              </select>
              <a href={`/macbook/${compareModel.slug}`} className="compare-model-link">
                このモデルの詳細を見る &rsaquo;
              </a>
              {compareModel.image && (
                <Image
                  src={`/images/macbook/${compareModel.image}`}
                  alt={compareModel.model}
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
                  {currentModel.shortname || currentModel.model}の購入先 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              ) : (
                <a href="#shops" className="m-btn m-btn--primary m-btn--block">
                  {currentModel.shortname || currentModel.model}の購入先 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              )}
            </td>
            <td>
              <a href={`/macbook/${compareModel.slug}`} className="m-btn m-btn--primary m-btn--block">
                {compareModel.shortname || compareModel.model}の詳細 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
