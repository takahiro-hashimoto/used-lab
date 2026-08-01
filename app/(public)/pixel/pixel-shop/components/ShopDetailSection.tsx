import type { Shop } from '@/lib/types'
import type { ShopDetailMeta } from '@/lib/data/pixel-shop'
import SharedShopDetailSection, { type SpecRow } from '@/app/components/shop/ShopDetailSection'

const specRows: SpecRow[] = [
  { label: '価格', getValue: (s) => s.price },
  { label: '在庫', getValue: (s) => s.stock },
  { label: '保証期間', getValue: (s) => s.support || '-' },
  { label: '独自保証', getValue: (s) => s.extension },
  { label: '赤ロム保証', getValue: (s) => s.block || '-' },
  { label: '実物写真', getValue: (s) => s.photo },
  { label: 'バッテリー表示', getValue: (s) => s.battery },
  { label: '配送料', getValue: (s) => s.postage },
]

type Props = {
  items: { shop: Shop; meta: ShopDetailMeta }[]
}

export default function ShopDetailSection({ items }: Props) {
  return (
    <SharedShopDetailSection
      productName="Google Pixel"
      items={items}
      specRows={specRows}
      // CTAのURLはPixel検索URL（pixel_url）を優先し、なければデフォルト（url）にフォールバック
      getCtaUrl={(s) => s.pixel_url ?? s.url ?? '#'}
      imageOverrides={{
        carrier: {
          src: '/images/mvno/rakuten-mobile-thumb.jpg',
          alt: '格安SIMで中古Google Pixelをお得に使う',
        },
      }}
      ctaOverrides={{
        carrier: {
          label: 'キャリア認定中古で探す',
          url: '/iphone/mvno/',
        },
      }}
    />
  )
}
