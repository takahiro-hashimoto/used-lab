import ModelHeroSection from '@/app/components/model/ModelHeroSection'
import type { ModelHeroConfig } from '@/app/components/model/ModelHeroSection'
import type { IPhoneModel, IPhonePriceLog } from '@/lib/types'

const config: ModelHeroConfig = {
  categoryPath: '/iphone',
  categoryLabel: '中古iPhone完全購入ガイド',
  categoryJsonLd: 'スマートフォン',
  imageFolder: 'iphone',
}

type Props = {
  model: IPhoneModel
  latestPrice: IPhonePriceLog | null
  dateStr: string
  dateDisplay: string
}

export default function HeroSection({ model, dateStr, dateDisplay }: Props) {
  return <ModelHeroSection model={model} config={config} dateStr={dateStr} dateDisplay={dateDisplay} />
}
