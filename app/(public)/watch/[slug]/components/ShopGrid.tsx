import type { WatchModel, Shop, ProductShopLink } from '@/lib/types'
import ModelShopGrid from '@/app/components/model/ModelShopGrid'
import type { SpecRow } from '@/app/components/model/ModelShopGrid'

type Props = {
  shops: Shop[]
  shopLinks: ProductShopLink[]
  model: WatchModel
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
      modelName={model.model}
      ctaLabel={model.model}
      description="実物写真"
      specRows={specRows}
      memoLink={{ href: '/watch/watch-shop/', text: '中古Apple Watchはどこで買う？おすすめECサイトまとめ' }}
    />
  )
}
