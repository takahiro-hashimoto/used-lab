import PopularSection from '@/app/components/support/PopularSection'
import { getShops } from '@/lib/queries'

export default async function MacBookPopularSection() {
  const shops = await getShops()
  const iosys = shops.find(s => s.id === 1)

  return (
    <PopularSection
      sectionTitle="目的別に人気の中古MacBook"
      sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
      imageSrc="/images/content/thumbnail/macbook-image-04.jpg"
      imageAlt="中古MacBookおすすめ4選のイメージ画像"
      subtitle="目的別におすすめ機種を厳選！"
      cardTitle="中古MacBookおすすめ4選"
      cardDescription="クリエイティブ作業向け、コスパ重視の人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
      buttonText="おすすめ4機種を見る"
      buttonHref="/macbook/recommend/"
      secondaryButtonText="イオシスで中古MacBookを探す"
      secondaryButtonHref={iosys?.macbook_url ?? '#'}
    />
  )
}
