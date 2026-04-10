import Link from 'next/link'
import type { MacBookModel, MacBookPriceLog } from '@/lib/types'
import { getVerdict } from '@/lib/utils/macbook-helpers'
import ModelPurchaseVerdict from '@/app/components/model/ModelPurchaseVerdict'

type Props = {
  model: MacBookModel
  latestPrice: MacBookPriceLog | null
}

const SUIT_ICONS: Record<string, string> = {
  'laptop-code': 'fa-solid fa-laptop-code',
  'laptop': 'fa-solid fa-laptop',
  'calendar-check': 'fa-solid fa-calendar-check',
  'boxes-stacked': 'fa-solid fa-boxes-stacked',
  'plug': 'fa-solid fa-plug',
  'battery-three-quarters': 'fa-solid fa-battery-three-quarters',
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
    >
      <div className="m-callout m-callout--tip u-mt-xl">
        <span className="m-callout__label">おすすめ</span>
        <p className="m-callout__text">他のモデルと迷っている方は<Link href="/macbook/recommend/">おすすめ中古MacBook機種まとめ【目的別】</Link>も参考にしてください。予算・用途別に狙い目モデルを厳選しています。</p>
      </div>
    </ModelPurchaseVerdict>
  )
}
