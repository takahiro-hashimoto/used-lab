import PopularSectionBase from '@/app/components/support/PopularSection'

export default function MacBookPopularSection() {
  return (
    <PopularSectionBase
      sectionTitle="目的別に人気の中古MacBook"
      sectionDescription="目的別におすすめの機種を厳選。今回の記事で購入するべき機種が判断できなかった方はぜひご覧ください。"
      imageSrc="/images/content/thumbnail/macbook-image-04.jpg"
      imageAlt="中古MacBookおすすめ5選のイメージ画像"
      subtitle="目的別におすすめ機種を厳選！"
      cardTitle="中古MacBookおすすめ5選"
      cardDescription="動画編集向け、普段使い向けなど目的別に買うべきモデルを紹介。購入前にチェックすべき項目なども網羅しています。"
      buttonText="おすすめ5機種を見る"
      buttonHref="/macbook/recommend"
      secondaryButtonText="イオシスで中古MacBookを探す"
      secondaryButtonHref="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Fpc%2Fnotepc%2Fmacbook"
    />
  )
}
