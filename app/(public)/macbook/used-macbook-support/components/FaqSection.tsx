import FaqSectionBase from '@/app/components/support/FaqSection'
import type { FaqItem } from '@/app/components/support/FaqSection'

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'MacBookの寿命は一般的にどのくらいですか？',
    answer:
      'MacBookの寿命は、最新OSのアップデートが提供される発売から約7〜8年が大きな目安となります。これにはAppleのソフトウェアサポートだけでなく、修理受付が終了する「オブソリート製品」への分類（販売終了から7年）が深く関わっています。ただし、インテル製チップ搭載モデルに関しては、Appleシリコンへの移行が進んだことで、従来よりも早くOSサポートが打ち切られる傾向にあるため、注意が必要です。',
  },
  {
    question: 'macOSのサポートが終了したMacBookは使い続けても大丈夫？',
    answer:
      '物理的に使うことは可能ですが、インターネットに接続しての利用はおすすめしません。OSの更新が止まるとセキュリティの脆弱性が放置され、ウイルス感染や個人情報漏洩のリスクが急増します。また、Safariなどのブラウザが最新のウェブサイトを正しく表示できなくなったり、銀行系アプリやクリエイティブソフトが次第に非対応になったりするため、実用面でも限界がすぐにやってきます。',
  },
  {
    question: 'インテル版MacとAppleシリコン（M1/M2以降）で寿命に差はありますか？',
    answer:
      'はい、現在は明確な差があります。Appleは現在、自社製チップ（Appleシリコン）に最適化した機能開発（Apple Intelligenceなど）に注力しており、インテル版Macはスペックに余裕があっても新機能から除外されるケースが増えています。インテル版は「中古で安く買える」というメリットはありますが、OSサポートの残り期間を考えると、長く使い続けるための「寿命」という点ではAppleシリコン搭載モデルに軍配が上がります。',
  },
  {
    question: 'バッテリーが劣化してきたら買い替えた方がいい？',
    answer:
      '判断基準は「そのMacがAppleシリコン（M1以降）かどうか」です。M1/M2/M3モデルの場合、基本性能が非常に高いため、バッテリー交換（約2〜3万円）をして使い続ける価値が十分にあります。インテル版モデルの場合、バッテリー交換費用を出すのであれば、その予算を中古のM1 MacBook Airなどの購入資金に充てた方が、今後のサポート期間や動作速度の面で圧倒的にコスパが良くなります。',
  },
]

export default function MacBookFaqSection() {
  return (
    <FaqSectionBase
      title="MacBookの寿命に関するよくある質問"
      description="MacBookの寿命やサポートに関して、よく寄せられる質問をまとめました。"
      items={FAQ_ITEMS}
    />
  )
}
