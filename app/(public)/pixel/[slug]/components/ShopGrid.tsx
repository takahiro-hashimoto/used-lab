import type { PixelModel, Shop, ProductShopLink } from '@/lib/types'
import ModelShopGrid from '@/app/components/model/ModelShopGrid'
import type { SpecRow } from '@/app/components/model/ModelShopGrid'

type Props = {
  shops: Shop[]
  shopLinks: ProductShopLink[]
  model: PixelModel
}

const specRows: SpecRow[] = [
  { label: '保証期間', getValue: (s) => s.support },
  { label: '赤ロム保証', getValue: (s) => s.block },
  { label: 'バッテリー保証', getValue: (s) => s.battery },
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
      memoLink={{ href: '/pixel/', text: '中古Google Pixelはどこで買う？おすすめ機種・選び方ガイド' }}
    />
  )
}
