import type { IPadModel, Shop, ProductShopLink } from '@/lib/types'
import ModelShopGrid from '@/app/components/model/ModelShopGrid'
import type { SpecRow } from '@/app/components/model/ModelShopGrid'

type Props = {
  shops: Shop[]
  shopLinks: ProductShopLink[]
  model: IPadModel
}

const specRows: SpecRow[] = [
  { label: '保証期間', getValue: (s) => s.support },
  { label: '赤ロム保証', getValue: (s) => s.block },
  { label: '実物写真', getValue: (s) => s.photo },
  { label: '配送料', getValue: (s) => s.postage },
]

export default function ShopGrid({ shops, shopLinks, model }: Props) {
  return (
    <ModelShopGrid
      shops={shops}
      shopLinks={shopLinks}
      modelName={model.model}
      ctaLabel={model.model}
      description="赤ロム保証"
      specRows={specRows}
      memoLink={{ href: '/ipad/ipad-shop/', text: '中古iPadはどこで買う？おすすめECサイトまとめ' }}
    />
  )
}
