import FaqSectionBase from '@/app/components/support/FaqSection'
import type { FaqItem } from '@/app/components/support/FaqSection'

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'iPhoneの寿命は一般的にどのくらいですか？',
    answer:
      'iPhoneの寿命は約7年が一つの目安です。iOSのアップデートは発売から約6〜7年間提供される傾向があり、アップデート終了後はセキュリティリスクが高まるためです。またAppleでは販売終了から5年以上7年未満の製品を「ビンテージ製品」、7年以上を「オブソリート製品」と定義しており、オブソリート製品に指定されるとAppleでの修理やサポートが受けられなくなります。',
  },
  {
    question: 'iOSのサポートが終了したiPhoneは使い続けても大丈夫？',
    answer:
      '使用自体は可能ですが、メイン端末としての利用はおすすめしません。サブ端末としてWi-Fi環境でのみ使用するなど、用途を限定するのがベターです。iOSのサポートが終了するとセキュリティアップデートが届かなくなるため、不正アクセスやウイルス感染のリスクが高まります。また銀行アプリや決済アプリが非対応になるケースもあり、日常利用に支障が出る可能性があります。',
  },
  {
    question: 'バッテリーが劣化してきたら買い替えた方がいい？',
    answer:
      'すぐに買い替える必要はありません。iPhoneのバッテリーは約500回の充電サイクルで最大容量が80%程度まで低下するとされています。80%を下回ると電池の減りが早くなり、パフォーマンスにも影響が出るため、まずはバッテリー交換を検討しましょう。ただし発売から5年以上経過しているモデルの場合は、バッテリーを交換しても他のパーツの劣化やiOSサポート終了が近い場合があるため買い替えの方がおすすめです。',
  },
]

export default function IPhoneFaqSection() {
  return (
    <FaqSectionBase
      title="iPhoneの寿命に関するよくある質問"
      description="iPhoneの寿命やサポートに関して、よく寄せられる質問をまとめました。"
      items={FAQ_ITEMS}
    />
  )
}
