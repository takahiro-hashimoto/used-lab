import PopularSection from '@/app/components/support/PopularSection'
import { getShops } from '@/lib/queries'

export default async function WatchPopularSection() {
  const shops = await getShops()
  const iosys = shops.find(s => s.id === 1)

  return (
    <PopularSection
      sectionTitle="目的別に人気の中古Apple Watch"
      sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
      imageSrc="/images/content/thumbnail/watch-image-08.jpg"
      imageAlt="中古Apple Watchおすすめ3選のイメージ画像"
      subtitle="目的別におすすめ機種を厳選！"
      cardTitle="中古Apple Watchおすすめ3選"
      cardDescription="健康管理を重視する人向け、コスパ重視の人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
      buttonText="おすすめ3機種を見る"
      buttonHref="/watch/recommend/"
      secondaryButtonText="イオシスで中古Apple Watchを探す"
      secondaryButtonHref={iosys?.watch_url ?? '#'}
    />
  )
}
