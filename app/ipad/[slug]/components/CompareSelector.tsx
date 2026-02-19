'use client'

import { useState } from 'react'


import Image from 'next/image'
import type { IPadModel } from '@/lib/types'

type Props = {
  currentModel: IPadModel
  allModels: IPadModel[]
  initialCompareId: number
  iosysUrl?: string
}

type CompareRow = {
  section: string
  label: string
  current: string
  compare: string
}

function getFeatureValue(model: IPadModel, key: string): string {
  const val = model[key as keyof IPadModel]
  if (val === true || val === '◯') return '◯'
  if (val === false || val === '×') return '×'
  if (val == null) return '-'
  return String(val).replace(/<br\s*\/?>/g, '\n')
}

function getAntutuTotal(m: IPadModel): string {
  const t = (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0)
  return t > 0 ? t.toLocaleString() : '-'
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

function buildCompareRows(current: IPadModel, compare: IPadModel): CompareRow[] {
  return [
    // サイズ・重量
    { section: 'サイズ・重量', label: 'サイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: 'サイズ・重量', label: '重量', current: current.weight || '-', compare: compare.weight || '-' },
    // ボディ
    { section: 'ボディ', label: 'バッテリー容量', current: current.battery || '-', compare: compare.battery || '-' },
    { section: 'ボディ', label: 'ストレージ容量', current: current.strage?.replace(/ \/ /g, '\n') || '-', compare: compare.strage?.replace(/ \/ /g, '\n') || '-' },
    { section: 'ボディ', label: 'Apple Intelligence', current: getFeatureValue(current, 'apple_intelligence'), compare: getFeatureValue(compare, 'apple_intelligence') },
    { section: 'ボディ', label: 'CPU', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: 'ボディ', label: 'RAM', current: current.ram || '-', compare: compare.ram || '-' },
    // ディスプレイ
    { section: 'ディスプレイ', label: '画面サイズ', current: current.display || '-', compare: compare.display || '-' },
    { section: 'ディスプレイ', label: '画像解像度', current: current.resolution || '-', compare: compare.resolution || '-' },
    { section: 'ディスプレイ', label: 'ディスプレイ種類', current: current.display_type || '-', compare: compare.display_type || '-' },
    { section: 'ディスプレイ', label: 'ProMotion', current: getFeatureValue(current, 'promotion'), compare: getFeatureValue(compare, 'promotion') },
    // カメラ
    { section: 'カメラ', label: '外向きカメラ', current: current.front_camera || '-', compare: compare.front_camera || '-' },
    { section: 'カメラ', label: '内向きカメラ', current: current.in_camera || '-', compare: compare.in_camera || '-' },
    { section: 'カメラ', label: 'センターフレーム', current: getFeatureValue(current, 'center_frame'), compare: getFeatureValue(compare, 'center_frame') },
    { section: 'カメラ', label: 'LiDARスキャナー', current: getFeatureValue(current, 'lidar'), compare: getFeatureValue(compare, 'lidar') },
    // 入力・アクセサリ
    { section: '入力・アクセサリ', label: 'Apple Pencil', current: current.pencil || '-', compare: compare.pencil || '-' },
    { section: '入力・アクセサリ', label: 'キーボード', current: current.keyboard || '-', compare: compare.keyboard || '-' },
    { section: '入力・アクセサリ', label: 'スピーカー', current: current.speaker || '-', compare: compare.speaker || '-' },
    // その他
    { section: 'その他', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: 'その他', label: '充電端子', current: current.port || '-', compare: compare.port || '-' },
    { section: 'その他', label: '認証機能', current: current.certification || '-', compare: compare.certification || '-' },
    { section: 'その他', label: 'SIM', current: current.sim || '-', compare: compare.sim || '-' },
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
              <strong className="compare-model-name">{currentModel.model}</strong>
              <span className="compare-model-note">このモデルを表示中</span>
              {currentModel.image && (
                <Image
                  src={`/images/ipad/${currentModel.image}`}
                  alt={currentModel.model}
                  width={120}
                  height={120}
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
                    <option key={m.id} value={m.id}>{m.model}</option>
                  ))}
              </select>
              <a href={`/ipad/${compareModel.slug}`} className="compare-model-link">
                このモデルの詳細を見る &rsaquo;
              </a>
              {compareModel.image && (
                <Image
                  src={`/images/ipad/${compareModel.image}`}
                  alt={compareModel.model}
                  width={120}
                  height={120}
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
                  {currentModel.model}の購入先 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              ) : (
                <a href="#shops" className="m-btn m-btn--primary m-btn--block">
                  {currentModel.model}の購入先 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              )}
            </td>
            <td>
              <a href={`/ipad/${compareModel.slug}`} className="m-btn m-btn--primary m-btn--block">
                {compareModel.model}の詳細 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
