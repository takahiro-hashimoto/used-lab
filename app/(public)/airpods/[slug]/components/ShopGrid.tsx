import type { AirPodsModel, Shop, ProductShopLink } from '@/lib/types'
import ModelShopGrid from '@/app/components/model/ModelShopGrid'
import type { SpecRow } from '@/app/components/model/ModelShopGrid'

type Props = {
  shops: Shop[]
  shopLinks: ProductShopLink[]
  model: AirPodsModel
}

const specRows: SpecRow[] = [
  { label: '保証期間', getValue: (s) => s.support },
  { label: '実物写真', getValue: (s) => s.photo },
  { label: '配送料', getValue: (s) => s.postage },
]

export default function ShopGrid({ shops, shopLinks, model }: Props) {
  return (
    <ModelShopGrid
      shops={shops}
      shopLinks={shopLinks}
      modelName={`${model.name}（${model.model}）`}
      ctaLabel={model.name}
      description="配送料"
      specRows={specRows}
    />
  )
}
