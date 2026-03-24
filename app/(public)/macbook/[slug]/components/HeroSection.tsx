import ModelHeroSection from '@/app/components/model/ModelHeroSection'
import type { ModelHeroConfig } from '@/app/components/model/ModelHeroSection'
import type { MacBookModel, MacBookPriceLog } from '@/lib/types'

const config: ModelHeroConfig = {
  categoryPath: '/macbook',
  categoryLabel: '中古MacBook完全購入ガイド',
  categoryJsonLd: 'ノートパソコン',
  imageFolder: 'macbook',
  imageWidth: 480,
  imageHeight: 320,
}

type Props = {
  model: MacBookModel
  latestPrice: MacBookPriceLog | null
}

export default function HeroSection({ model }: Props) {
  return <ModelHeroSection model={model} config={config} />
}
