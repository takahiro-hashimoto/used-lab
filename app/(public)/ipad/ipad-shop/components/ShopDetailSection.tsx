import type { Shop } from '@/lib/types'
import type { IPadShopDetailMeta } from '@/lib/data/ipad-shop'
import SharedShopDetailSection, { type SpecRow } from '@/app/components/shop/ShopDetailSection'

const specRows: SpecRow[] = [
  { label: '価格', getValue: (s) => s.price },
  { label: '在庫', getValue: (s) => s.stock },
  { label: '保証期間', getValue: (s) => s.support || '-' },
  { label: '独自保証', getValue: (s) => s.extension },
  { label: '赤ロム保証', getValue: (s) => s.block || '-' },
  { label: '実物写真', getValue: (s) => s.photo },
  { label: '配送料', getValue: (s) => s.postage },
]

type Props = {
  items: { shop: Shop; meta: IPadShopDetailMeta }[]
}

export default function ShopDetailSection({ items }: Props) {
  return (
    <SharedShopDetailSection
      productName="iPad"
      items={items}
      specRows={specRows}
      getCtaUrl={(shop) => shop.ipad_url || shop.url || '#'}
      ctaOverrides={{
        apple: {
          label: 'Apple整備済み品で中古iPadを探す',
          url: '/amazon-renewed/#ipad',
        },
      }}
    />
  )
}
