import type { Shop } from '@/lib/types'
import type { WatchShopDetailMeta } from '@/lib/data/watch-shop'
import SharedShopDetailSection, { type SpecRow } from '@/app/components/shop/ShopDetailSection'

const specRows: SpecRow[] = [
  { label: '価格', getValue: (s) => s.price },
  { label: '在庫', getValue: (s) => s.stock },
  { label: '保証期間', getValue: (s) => s.support || '-' },
  { label: '独自保証', getValue: (s) => s.extension },
  { label: '実物写真', getValue: (s) => s.photo },
  { label: '配送料', getValue: (s) => s.postage },
]

type Props = {
  items: { shop: Shop; meta: WatchShopDetailMeta }[]
}

export default function ShopDetailSection({ items }: Props) {
  return (
    <SharedShopDetailSection
      productName="Apple Watch"
      items={items}
      specRows={specRows}
      getCtaUrl={(shop) => shop.watch_url || shop.url || '#'}
    />
  )
}
