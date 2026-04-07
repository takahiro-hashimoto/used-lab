import PopularSection from '@/app/components/support/PopularSection'
import { getShops } from '@/lib/queries'

export default async function AirPodsPopularSection() {
  const shops = await getShops()
  const iosys = shops.find(s => s.id === 1)

  return (
    <PopularSection
      sectionTitle="目的別に人気の中古AirPods"
      sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
      imageSrc="/images/content/thumbnail/airpods-image-02.jpg"
      imageAlt="中古AirPodsおすすめのイメージ画像"
      subtitle="目的別におすすめ機種を厳選！"
      cardTitle="中古AirPodsおすすめモデル"
      cardDescription="ノイキャン重視、コスパ重視の人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
      buttonText="おすすめモデルを見る"
      buttonHref="/airpods/recommend/"
      secondaryButtonText="イオシスで中古AirPodsを探す"
      secondaryButtonHref={iosys?.airpods_url ?? '#'}
    />
  )
}
