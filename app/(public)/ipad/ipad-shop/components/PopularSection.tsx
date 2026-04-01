import PopularSectionBase from '@/app/components/support/PopularSection'

export default function PopularSection() {
  return (
    <PopularSectionBase
      sectionTitle="目的別に人気の中古iPad"
      sectionDescription="目的別におすすめの機種を厳選。購入すべき中古iPadをさくっと知りたい方はぜひご覧ください。"
      imageSrc="/images/content/thumbnail/ipad-image-03.jpg"
      imageAlt="中古iPadおすすめ5選のイメージ画像"
      subtitle="目的別におすすめ機種を厳選！"
      cardTitle="中古iPadおすすめ5選"
      cardDescription="イラスト制作向け、動画視聴向け、勉強・ノート用途向けなど目的別に買うべきモデルを紹介。Apple Pencil対応やサポート期間など購入前にチェックすべき項目も網羅しています。"
      buttonText="おすすめ5機種を見る"
      buttonHref="/ipad/recommend/"
      secondaryButtonText="イオシスで中古iPadを探す"
      secondaryButtonHref="https://px.a8.net/svt/ejp?a8mat=3TJB56+6S3SCI+ZFU+BW0YB&a8ejpredirect=https%3A%2F%2Fiosys.co.jp%2Fitems%2Ftablet%2Fios%2Fipad"
    />
  )
}
