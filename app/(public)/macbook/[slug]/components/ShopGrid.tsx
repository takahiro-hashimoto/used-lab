import type { MacBookModel, Shop, ProductShopLink } from '@/lib/types'
import ModelShopGrid from '@/app/components/model/ModelShopGrid'
import type { SpecRow } from '@/app/components/model/ModelShopGrid'

type Props = {
  shops: Shop[]
  shopLinks: ProductShopLink[]
  model: MacBookModel
}

const specRows: SpecRow[] = [
  { label: '保証期間', getValue: (s) => s.support },
  { label: '実物写真', getValue: (s) => s.photo },
  { label: '配送料', getValue: (s) => s.postage },
]

export default function ShopGrid({ shops, shopLinks, model }: Props) {
  const ctaLabel = (model.shortname || model.model)
    .replace(/MacBook Air/g, 'MBA')
    .replace(/MacBook Pro/g, 'MBP')

  return (
    <ModelShopGrid
      shops={shops}
      shopLinks={shopLinks}
      modelName={model.model}
      ctaLabel={ctaLabel}
      description="実物写真"
      specRows={specRows}
      memoLink={{ href: '/macbook/macbook-shop/', text: '中古MacBookはどこで買う？おすすめECサイトまとめ' }}
    />
  )
}
