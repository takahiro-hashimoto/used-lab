import PopularSectionBase from '@/app/components/support/PopularSection'

export default function WatchPopularSection() {
  return (
    <PopularSectionBase
      sectionTitle="目的別に人気の中古Apple Watch"
      sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
      imageSrc="/images/content/watch-setting.webp"
      imageAlt="中古Apple Watchおすすめ5選のイメージ画像"
      subtitle="目的別におすすめ機種を厳選！"
      cardTitle="中古Apple Watchおすすめ5選"
      cardDescription="健康管理を重視する人向け、コスパ重視の人向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
      buttonText="おすすめ5機種を見る"
      buttonHref="/watch/recommend"
    />
  )
}
