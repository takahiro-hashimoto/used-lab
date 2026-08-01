import PopularSection from '@/app/components/support/PopularSection'
import { getShops } from '@/lib/queries'

export default async function PixelPopularSection() {
  const shops = await getShops()
  const iosys = shops.find(s => s.id === 1)

  return (
    <PopularSection
      sectionTitle="目的別に人気の中古Pixel"
      sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
      imageSrc="/images/pixel-article/google-pixel1.jpg"
      imageAlt="中古Google Pixelおすすめのイメージ画像"
      subtitle="目的別におすすめ機種を厳選！"
      cardTitle="中古Google Pixelおすすめ機種"
      cardDescription="カメラのAI機能を重視する人向け、コスパ重視でaシリーズを狙う人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
      buttonText="おすすめ機種を見る"
      buttonHref="/pixel/"
      secondaryButtonText="イオシスで中古Pixelを探す"
      secondaryButtonHref={iosys?.pixel_url ?? iosys?.url ?? '#'}
    />
  )
}
