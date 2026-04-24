/**
 * 比較ロジックヘルパー
 * PHPの $get_comparison_data を TypeScript に移植
 */

import type { IPhoneModel } from '@/lib/types'
import type { SpecDefinition } from './spec-definitions'

export type ComparisonResult = {
  label: string
  icon: string
  desc: string
  left: ComparisonValue
  right: ComparisonValue
  isDraw: boolean
}

export type ComparisonValue = {
  raw: string | number | boolean | null
  display: string
  isWin: boolean
  badge: string
}

/** IPhoneModel からキーで値を取得 */
function getModelValue(model: IPhoneModel, key: string): string | number | boolean | null {
  return (model as unknown as Record<string, unknown>)[key] as string | number | boolean | null ?? null
}

/** 数値を抽出 */
function extractNumber(val: string | number | boolean | null): number {
  if (val == null || val === '' || typeof val === 'boolean') return 0
  if (typeof val === 'number') return val
  const cleaned = String(val).replace(/[^0-9.]/g, '')
  return parseFloat(cleaned) || 0
}

/** 日付文字列 "YYYY/M/DD" → Date */
function parseDate(val: string | null): Date | null {
  if (!val) return null
  const parts = val.split('/')
  if (parts.length < 2) return null
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2] || '1'))
}

/** 日付を "YYYY年M月D日" にフォーマット */
function formatDateJa(val: string | null): string {
  const d = parseDate(val)
  if (!d) return '-'
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

/** boolean を◎/✕ に（ショップページと同じ表記） */
function formatBool(val: boolean | null): string {
  if (val === true) return '◎'
  if (val === false) return '✕'
  return '-'
}

/**
 * 2モデルのスペック値を比較し、勝敗バッジ付き結果を返す
 */
export function compareSpec(
  spec: SpecDefinition,
  modelL: IPhoneModel,
  modelR: IPhoneModel,
): ComparisonResult | null {
  const valL = getModelValue(modelL, spec.key)
  const valR = getModelValue(modelR, spec.key)

  // 両方 null/空なら表示しない
  if ((valL == null || valL === '') && (valR == null || valR === '')) return null

  const result: ComparisonResult = {
    label: spec.label,
    icon: spec.icon,
    desc: spec.desc,
    left: { raw: valL, display: '-', isWin: false, badge: '' },
    right: { raw: valR, display: '-', isWin: false, badge: '' },
    isDraw: false,
  }

  switch (spec.type) {
    case 'numeric':
    case 'numeric-min':
      return compareNumeric(spec, valL, valR, result)
    case 'date':
      return compareDate(valL, valR, result)
    case 'boolean':
      return compareBoolean(valL, valR, result)
    case 'text':
    default:
      return compareText(spec.key, valL, valR, result)
  }
}

function compareNumeric(
  spec: SpecDefinition,
  valL: string | number | boolean | null,
  valR: string | number | boolean | null,
  result: ComparisonResult,
): ComparisonResult {
  const numL = extractNumber(valL)
  const numR = extractNumber(valR)
  const unit = spec.unit || ''

  if (valL != null && valL !== '') {
    result.left.display = numL.toLocaleString() + (unit ? ` ${unit}` : '')
  }
  if (valR != null && valR !== '') {
    result.right.display = numR.toLocaleString() + (unit ? ` ${unit}` : '')
  }

  if (numL > 0 && numR > 0 && numL !== numR) {
    const isMin = spec.type === 'numeric-min'
    result.left.isWin = isMin ? numL < numR : numL > numR
    result.right.isWin = isMin ? numR < numL : numR > numL

    if (spec.showRate) {
      const rate = numL >= numR ? (numL / numR) : (numR / numL)
      if (rate > 1.01) {
        const badge = `約${rate.toFixed(2)}倍`
        if (result.left.isWin) result.left.badge = badge
        else result.right.badge = badge
      }
    } else {
      const diff = Math.abs(numL - numR)
      const diffStr = Number.isInteger(diff) ? diff.toLocaleString() : diff.toFixed(1)
      const prefix = isMin ? '-' : '+'
      const badge = `${prefix}${diffStr}${unit ? ` ${unit}` : ''}`
      if (result.left.isWin) result.left.badge = badge
      else result.right.badge = badge
    }
  } else {
    result.isDraw = true
  }

  return result
}

function compareDate(
  valL: string | number | boolean | null,
  valR: string | number | boolean | null,
  result: ComparisonResult,
): ComparisonResult {
  const strL = typeof valL === 'string' ? valL : null
  const strR = typeof valR === 'string' ? valR : null
  const dateL = parseDate(strL)
  const dateR = parseDate(strR)

  result.left.display = formatDateJa(strL)
  result.right.display = formatDateJa(strR)

  if (dateL && dateR && dateL.getTime() !== dateR.getTime()) {
    result.left.isWin = dateL > dateR
    result.right.isWin = dateR > dateL
    if (result.left.isWin) result.left.badge = '新しい'
    else result.right.badge = '新しい'
  } else {
    result.isDraw = true
  }

  return result
}

function compareBoolean(
  valL: string | number | boolean | null,
  valR: string | number | boolean | null,
  result: ComparisonResult,
): ComparisonResult {
  const boolL = valL === true
  const boolR = valR === true

  result.left.display = formatBool(typeof valL === 'boolean' ? valL : null)
  result.right.display = formatBool(typeof valR === 'boolean' ? valR : null)

  if (boolL && !boolR) {
    result.left.isWin = true
  } else if (boolR && !boolL) {
    result.right.isWin = true
  } else {
    result.isDraw = true
  }

  return result
}

function compareText(
  key: string,
  valL: string | number | boolean | null,
  valR: string | number | boolean | null,
  result: ComparisonResult,
): ComparisonResult {
  const strL = valL != null ? String(valL) : ''
  const strR = valR != null ? String(valR) : ''

  result.left.display = strL || '-'
  result.right.display = strR || '-'

  // USB-C は便利バッジ
  if (strL.includes('USB-C')) result.left.badge = '便利'
  if (strR.includes('USB-C')) result.right.badge = '便利'

  // ◯/× の勝敗判定
  const hasCircleL = strL.includes('◯')
  const hasCircleR = strR.includes('◯')
  const hasCrossL = strL.includes('×')
  const hasCrossR = strR.includes('×')

  if (hasCircleL && hasCrossR) {
    result.left.isWin = true
  } else if (hasCircleR && hasCrossL) {
    result.right.isWin = true
  } else if (strL === strR) {
    result.isDraw = true
  }

  return result
}

/**
 * モデル名から "iPhone" プレフィックスを除去した短縮名を返す
 */
export function getShortName(model: IPhoneModel): string {
  return model.model.replace(/^iPhone\s*/i, '').trim()
}

/**
 * advance データから統合フィーチャーリストを取得
 */
export function getAdvanceFeatures(model: IPhoneModel): string[] {
  if (!model.advance) return []
  const isPro = model.model.toLowerCase().includes('pro')
  const features: string[] = []

  if (model.advance.all_models?.features) {
    features.push(...model.advance.all_models.features)
  }
  if (isPro && model.advance.pro_only?.features) {
    features.push(...model.advance.pro_only.features)
  }
  if (!isPro && model.advance.standard_only?.features) {
    features.push(...model.advance.standard_only.features)
  }

  return [...new Set(features)]
}

/**
 * 価格レンジ計算（3店舗の最安値平均・最高値平均）
 */
export function calcAvgPriceRange(log: {
  iosys_min: number | null
  iosys_max: number | null
  geo_min: number | null
  geo_max: number | null
  janpara_min: number | null
  janpara_max: number | null
} | null): { min: number | null; max: number | null; avg: number | null } {
  if (!log) return { min: null, max: null, avg: null }

  const mins = [log.iosys_min, log.geo_min, log.janpara_min].filter((v): v is number => v != null && v > 0)
  const maxes = [log.iosys_max, log.geo_max, log.janpara_max].filter((v): v is number => v != null && v > 0)

  if (mins.length === 0 || maxes.length === 0) return { min: null, max: null, avg: null }

  const avgMin = Math.round(mins.reduce((a, b) => a + b, 0) / mins.length / 100) * 100
  const avgMax = Math.round(maxes.reduce((a, b) => a + b, 0) / maxes.length / 100) * 100
  const avg = Math.round((avgMin + avgMax) / 2 / 100) * 100

  return { min: avgMin, max: avgMax, avg }
}
