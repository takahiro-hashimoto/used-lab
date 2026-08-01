import PopularSection from '@/app/components/support/PopularSection'
import { getShops } from '@/lib/queries'

export default async function GalaxyPopularSection() {
  const shops = await getShops()
  const iosys = shops.find(s => s.id === 1)

  return (
    <PopularSection
      sectionTitle="目的別に人気の中古Galaxy"
      sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
      imageSrc="/images/galaxy-article/samsung-galaxy-0.jpg"
      imageAlt="中古Samsung Galaxyおすすめのイメージ画像"
      subtitle="目的別におすすめ機種を厳選！"
      cardTitle="中古Samsung Galaxyおすすめ機種"
      cardDescription="カメラ・望遠を重視する人向け、コスパ重視でAシリーズを狙う人向け、折りたたみに挑戦したい人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
      buttonText="おすすめ機種を見る"
      buttonHref="/galaxy/"
      secondaryButtonText="イオシスで中古Galaxyを探す"
      secondaryButtonHref={iosys?.galaxy_url ?? iosys?.url ?? '#'}
    />
  )
}
