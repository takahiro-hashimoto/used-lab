import type { GalaxyModel } from '@/lib/types'

/**
 * Galaxy のサポート期間を support_until（"YYYY-MM"）から算出する。
 * iPhone のように「発売+7年」を推定するのではなく、
 * Samsung が明示する保証年数（update_years）と終了予定（support_until）を直接使う。
 */
export function getGalaxySupport(model: GalaxyModel): {
  endLabel: string | null
  endYear: number | null
  remainingYears: number | null
} {
  const su = model.support_until
  if (!su) return { endLabel: null, endYear: null, remainingYears: null }

  const [yStr, mStr] = su.split('-')
  const year = parseInt(yStr, 10)
  const month = parseInt(mStr ?? '', 10)
  if (isNaN(year)) return { endLabel: null, endYear: null, remainingYears: null }

  const endLabel = isNaN(month) ? `${year}年` : `${year}年${month}月`

  const now = new Date()
  const endMonthIndex = (isNaN(month) ? 12 : month) - 1
  const remainingMonths =
    (year - now.getFullYear()) * 12 + (endMonthIndex - now.getMonth())
  const remainingYears = Math.max(0, Math.round((remainingMonths / 12) * 10) / 10)

  return { endLabel, endYear: year, remainingYears }
}
