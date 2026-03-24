import type { WatchModel, WatchPriceLog } from '@/lib/types'
import { getVerdict } from '@/lib/utils/watch-helpers'
import ModelPurchaseVerdict from '@/app/components/model/ModelPurchaseVerdict'

type Props = {
  model: WatchModel
  latestPrice: WatchPriceLog | null
}

const SUIT_ICONS: Record<string, string> = {
  'heart-pulse': 'fa-solid fa-heart-pulse',
  'bell': 'fa-solid fa-bell',
  'calendar-check': 'fa-solid fa-calendar-check',
  'boxes-stacked': 'fa-solid fa-boxes-stacked',
  'yen-sign': 'fa-solid fa-yen-sign',
  'bolt': 'fa-solid fa-bolt',
}

export default function PurchaseVerdict({ model, latestPrice }: Props) {
  const v = getVerdict(model, latestPrice)

  return (
    <ModelPurchaseVerdict
      modelName={`中古${model.model}を今買うのはあり？`}
      description="処理性能、サポート寿命、最新相場から導き出した「失敗しないための結論」です。"
      verdict={v}
      topRatings={[
        { icon: 'fa-solid fa-microchip', label: '性能・最新比', value: `${v.performanceRatio}%` },
        { icon: 'fa-solid fa-code-branch', label: 'OS寿命 推定', value: `残り${v.remainingYears}年` },
        { icon: 'fa-solid fa-yen-sign', label: '実質年単価', value: v.annualCost != null ? `¥${v.annualCost.toLocaleString()}` : '-' },
      ]}
      suitIcons={SUIT_ICONS}
    />
  )
}
