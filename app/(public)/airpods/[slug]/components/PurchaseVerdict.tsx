import type { AirPodsModel } from '@/lib/types'
import { getVerdict, calculateFirmwareLifespan } from '@/lib/utils/airpods-helpers'
import ModelPurchaseVerdict from '@/app/components/model/ModelPurchaseVerdict'

type Props = {
  model: AirPodsModel
}

const SUIT_ICONS: Record<string, string> = {
  headphones: 'fa-solid fa-headphones',
  'calendar-check': 'fa-solid fa-calendar-check',
  'yen-sign': 'fa-solid fa-yen-sign',
  'boxes-stacked': 'fa-solid fa-boxes-stacked',
  'volume-xmark': 'fa-solid fa-volume-xmark',
  cube: 'fa-solid fa-cube',
}

export default function PurchaseVerdict({ model }: Props) {
  const v = getVerdict(model)
  const fwLife = calculateFirmwareLifespan(model.date)

  return (
    <ModelPurchaseVerdict
      modelName={`中古${model.name}（${model.model}）を今買うのはあり？`}
      description="サポート寿命、搭載チップの世代から導き出した「失敗しないための結論」です。"
      verdict={v}
      topRatings={[
        { icon: 'fa-solid fa-clock-rotate-left', label: '発売からの経過', value: `${v.yearsPassed}年` },
        { icon: 'fa-solid fa-code-branch', label: 'サポート期間 推定', value: fwLife.isSupported ? `残り${v.remainingYears}年` : '終了' },
        { icon: 'fa-solid fa-microchip', label: '搭載チップ', value: model.chip || '-' },
      ]}
      suitIcons={SUIT_ICONS}
    />
  )
}
